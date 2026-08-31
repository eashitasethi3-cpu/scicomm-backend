const express = require('express');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');
const { normalizeAddressKey } = require('../validation');
const { academicYearOf, getSchoolAliasMap, groupAttempts, avg } = require('../schoolGrouping');

const router = express.Router();

// ------------------------------------------------------------------
// GET /api/archive/summary?year=2026-27   (PUBLIC — no auth required)
//
// Anyone visiting the site can see the Archive at a school-summary
// level: which schools took part in a session, how many attempts,
// average %. No student names, roll numbers, individual scores, or
// exam identity are exposed here — that stays Admin-only.
// ------------------------------------------------------------------
router.get('/summary', async (req, res) => {
  const { year } = req.query;
  try {
    const result = await db.query('SELECT school, school_address, pct, created_at FROM exam_attempts');
    const aliasMap = await getSchoolAliasMap();

    const rows = year
      ? result.rows.filter(r => academicYearOf(r.created_at) === year)
      : result.rows;

    const groups = groupAttempts(rows, aliasMap);
    const schools = groups
      .map(g => ({
        schoolName: g.name || 'Unknown School',
        attemptCount: g.attempts.length,
        avgPct: avg(g.attempts.map(a => a.pct)),
      }))
      .sort((a, b) => a.schoolName.localeCompare(b.schoolName));

    res.json({ year: year || null, schools });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load archive summary' });
  }
});

// ------------------------------------------------------------------
// GET /api/archive/schools?year=2026-27   (ADMIN — full detail)
//
// Same grouping as /summary, but returns the group `key` too, so the
// Admin UI can drill into a group's full attempt list.
// ------------------------------------------------------------------
router.get('/schools', requireAuth, requireRole('admin'), async (req, res) => {
  const { year } = req.query;
  try {
    const result = await db.query('SELECT * FROM exam_attempts');
    const aliasMap = await getSchoolAliasMap();

    const rows = year
      ? result.rows.filter(r => academicYearOf(r.created_at) === year)
      : result.rows;

    const groups = groupAttempts(rows, aliasMap);
    const schools = groups
      .map(g => ({
        key: g.key,
        schoolName: g.name || 'Unknown School',
        schoolAddress: g.address || '',
        attemptCount: g.attempts.length,
        avgPct: avg(g.attempts.map(a => a.pct)),
      }))
      .sort((a, b) => a.schoolName.localeCompare(b.schoolName));

    res.json({ year: year || null, schools });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load archive' });
  }
});

// ------------------------------------------------------------------
// GET /api/archive/schools/:key/attempts?year=2026-27   (ADMIN — full detail)
// Full per-student attempt rows for one grouped school entry.
// ------------------------------------------------------------------
router.get('/schools/:key/attempts', requireAuth, requireRole('admin'), async (req, res) => {
  const { year } = req.query;
  const { key } = req.params;
  try {
    const result = await db.query('SELECT * FROM exam_attempts ORDER BY created_at DESC');
    const aliasMap = await getSchoolAliasMap();

    const rows = year
      ? result.rows.filter(r => academicYearOf(r.created_at) === year)
      : result.rows;

    const groups = groupAttempts(rows, aliasMap);
    const group = groups.find(g => g.key === key);
    if (!group) return res.json({ schoolName: null, schoolAddress: null, attempts: [] });

    const toAttempt = a => ({
      id: a.id, examId: a.exam_id || a.exam_slug, studentName: a.student_name,
      rollNo: a.roll_no, section: a.section, school: a.school, schoolAddress: a.school_address,
      score: a.score, total: a.total, pct: a.pct, date: a.created_at,
    });

    res.json({
      schoolName: group.name,
      schoolAddress: group.address,
      attempts: group.attempts.map(toAttempt),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load school results' });
  }
});

// ------------------------------------------------------------------
// GET /api/archive/raw-schools   (ADMIN — duplicate-merge management)
//
// Lists every distinct (school name, school address) pair students have
// actually typed, with a count and whether it's already part of an
// Admin merge. Used to power a "merge duplicate schools" tool.
// ------------------------------------------------------------------
router.get('/raw-schools', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const result = await db.query('SELECT school, school_address FROM exam_attempts');
    const aliasMap = await getSchoolAliasMap();

    const byKey = new Map();
    for (const row of result.rows) {
      const rawKey = normalizeAddressKey(row.school_address) || normalizeAddressKey(row.school || 'unknown school');
      if (!byKey.has(rawKey)) {
        byKey.set(rawKey, { rawKey, sampleName: row.school || 'Unknown School', sampleAddress: row.school_address || '', count: 0 });
      }
      const entry = byKey.get(rawKey);
      entry.count++;
      if ((row.school || '').length > entry.sampleName.length) entry.sampleName = row.school;
    }

    const entries = [...byKey.values()].map(e => {
      const alias = aliasMap.get(e.rawKey);
      return {
        ...e,
        mergedInto: alias ? { groupId: alias.groupId, canonicalName: alias.canonicalName, canonicalAddress: alias.canonicalAddress } : null,
      };
    }).sort((a, b) => a.sampleName.localeCompare(b.sampleName));

    res.json({ schools: entries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load school list' });
  }
});

// ------------------------------------------------------------------
// POST /api/archive/merge   (ADMIN)
// Body: { rawKeys: string[], canonicalName: string, canonicalAddress: string }
// Merges the given raw school-address keys into one canonical school entry.
// ------------------------------------------------------------------
router.post('/merge', requireAuth, requireRole('admin'), async (req, res) => {
  const { rawKeys, canonicalName, canonicalAddress } = req.body;
  if (!Array.isArray(rawKeys) || rawKeys.length < 2) {
    return res.status(400).json({ error: 'Select at least two school entries to merge' });
  }
  if (!canonicalName || !canonicalName.trim() || !canonicalAddress || !canonicalAddress.trim()) {
    return res.status(400).json({ error: 'canonicalName and canonicalAddress are required' });
  }

  try {
    // Grab current sample name/address for each raw key so the alias rows
    // stay self-descriptive even if attempts data changes later.
    const rawRes = await db.query('SELECT school, school_address FROM exam_attempts');
    const sampleByKey = new Map();
    for (const row of rawRes.rows) {
      const rk = normalizeAddressKey(row.school_address) || normalizeAddressKey(row.school || 'unknown school');
      if (!sampleByKey.has(rk)) sampleByKey.set(rk, { name: row.school, address: row.school_address });
    }

    const groupRes = await db.query(
      `INSERT INTO school_groups (canonical_name, canonical_address) VALUES ($1, $2) RETURNING id`,
      [canonicalName.trim(), canonicalAddress.trim()]
    );
    const groupId = groupRes.rows[0].id;

    for (const rawKey of rawKeys) {
      const sample = sampleByKey.get(rawKey) || {};
      await db.query(
        `INSERT INTO school_aliases (raw_key, group_id, sample_name, sample_address) VALUES ($1, $2, $3, $4)
         ON CONFLICT (raw_key) DO UPDATE SET group_id = EXCLUDED.group_id, sample_name = EXCLUDED.sample_name, sample_address = EXCLUDED.sample_address`,
        [rawKey, groupId, sample.name || null, sample.address || null]
      );
    }

    res.status(201).json({ ok: true, groupId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to merge schools' });
  }
});

// ------------------------------------------------------------------
// DELETE /api/archive/merge/:rawKey   (ADMIN)
// Removes one raw key from its merged group, reverting it back to its
// own automatic (address-based) grouping.
// ------------------------------------------------------------------
router.delete('/merge/:rawKey', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    await db.query('DELETE FROM school_aliases WHERE raw_key = $1', [req.params.rawKey]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to unmerge school' });
  }
});

module.exports = router;
