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

module.exports = router;
