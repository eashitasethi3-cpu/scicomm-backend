const express = require('express');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/settings  (admin/teacher — non-sensitive settings only in a real app you'd filter this)
router.get('/', requireAuth, requireRole('admin', 'teacher'), async (req, res) => {
  const result = await db.query('SELECT key, value FROM settings');
  const obj = {};
  result.rows.forEach(r => { obj[r.key] = r.value; });
  res.json(obj);
});

// PATCH /api/settings  (admin only — e.g. { studentPassword: "newpass" })
router.patch('/', requireAuth, requireRole('admin'), async (req, res) => {
  const entries = Object.entries(req.body || {});
  for (const [key, value] of entries) {
    await db.query(
      `INSERT INTO settings (key, value) VALUES ($1,$2)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
      [key, JSON.stringify(value)]
    );
  }
  res.json({ ok: true });
});

// GET /api/settings/sas-wait — unlike GET /api/settings above (admin/teacher
// only), this is readable by ANY authenticated user, including students. It
// only ever returns the one non-sensitive number needed to gate the Science
// Attitude Survey's "hang tight" waiting room, so students never see other
// settings (e.g. studentPassword) through this route.
//
// This is a DURATION (seconds), not a shared clock deadline — every student
// who clicks "Start Exam" gets their own fresh countdown of this length,
// starting from the moment THEY click it, rather than everyone counting down
// to one fixed moment (which would make late arrivals see less time left).
router.get('/sas-wait', requireAuth, async (req, res) => {
  const result = await db.query(`SELECT value FROM settings WHERE key = 'sasWaitSeconds'`);
  res.json({ waitSeconds: result.rows[0] ? result.rows[0].value : 0 });
});

// PATCH /api/settings/sas-wait (admin only) — sets or clears the wait
// duration in seconds. Body: { waitSeconds: <integer> }. 0 clears any wait
// (survey opens immediately for anyone who starts it).
router.patch('/sas-wait', requireAuth, requireRole('admin'), async (req, res) => {
  const waitSeconds = Math.max(0, parseInt(req.body.waitSeconds, 10) || 0);
  await db.query(
    `INSERT INTO settings (key, value) VALUES ('sasWaitSeconds', $1)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
    [JSON.stringify(waitSeconds)]
  );
  res.json({ ok: true, waitSeconds });
});

module.exports = router;
