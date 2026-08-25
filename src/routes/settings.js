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

// GET /api/settings/sas-reveal — unlike GET /api/settings above (admin/teacher
// only), this is readable by ANY authenticated user, including students. It
// only ever returns the one non-sensitive timestamp needed to gate the
// Science Attitude Survey's "hang tight" waiting room, so students never see
// other settings (e.g. studentPassword) through this route.
router.get('/sas-reveal', requireAuth, async (req, res) => {
  const result = await db.query(`SELECT value FROM settings WHERE key = 'sasRevealAt'`);
  res.json({ revealAt: result.rows[0] ? result.rows[0].value : null });
});

// PATCH /api/settings/sas-reveal (admin only) — sets or clears the
// synchronized moment the Science Attitude Survey unlocks for every student
// at once. Body: { revealAt: <ISO string> } to set a wait, or { revealAt: null }
// to clear it (survey opens immediately for anyone who starts it).
router.patch('/sas-reveal', requireAuth, requireRole('admin'), async (req, res) => {
  const revealAt = req.body.revealAt || null;
  await db.query(
    `INSERT INTO settings (key, value) VALUES ('sasRevealAt', $1)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
    [JSON.stringify(revealAt)]
  );
  res.json({ ok: true, revealAt });
});

module.exports = router;
