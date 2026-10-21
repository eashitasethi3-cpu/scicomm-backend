const express = require('express');
const rateLimit = require('express-rate-limit');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');
const { validateHumanName } = require('../validation');

const router = express.Router();

// Make sure the table exists even if `npm run migrate` hasn't been re-run yet.
db.query(`
  CREATE TABLE IF NOT EXISTS parent_registrations (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_name    TEXT NOT NULL,
    student_name   TEXT NOT NULL,
    student_class  TEXT NOT NULL,
    mobile         TEXT NOT NULL,
    email          TEXT NOT NULL,
    status         TEXT NOT NULL DEFAULT 'new',
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`).catch((err) => console.error('parent_registrations init failed:', err.message));

// Public endpoint, so throttle it: 10 submissions per IP per hour.
const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'Too many submissions from this connection. Please try again later.' },
});

const CLASS_RE = /^[a-zA-Z0-9 .\-/]{1,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function toRow(r) {
  return {
    id: r.id,
    parentName: r.parent_name,
    studentName: r.student_name,
    studentClass: r.student_class,
    mobile: r.mobile,
    email: r.email,
    status: r.status,
    createdAt: r.created_at,
  };
}

// POST /api/parent-registrations  (public)
router.post('/', submitLimiter, async (req, res) => {
  const body = req.body || {};
  const parentName = String(body.parentName || '').trim();
  const studentName = String(body.studentName || '').trim();
  const studentClass = String(body.studentClass || '').trim();
  const mobile = String(body.mobile || '').replace(/[\s-]/g, '');
  const email = String(body.email || '').trim().toLowerCase();

  const parentErr = validateHumanName(parentName);
  if (parentErr) return res.status(400).json({ error: "Parent's name: " + parentErr });
  const studentErr = validateHumanName(studentName);
  if (studentErr) return res.status(400).json({ error: "Student's name: " + studentErr });
  if (!studentClass || !CLASS_RE.test(studentClass)) {
    return res.status(400).json({ error: "Please select the student's class." });
  }
  // Indian mobile: 10 digits starting 6-9, optional +91 / 0 prefix.
  const digits = mobile.replace(/^(\+91|91|0)(?=\d{10}$)/, '');
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.' });
  }
  if (email.length > 120 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  try {
    const result = await db.query(
      `INSERT INTO parent_registrations (parent_name, student_name, student_class, mobile, email)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [parentName, studentName, studentClass, digits, email]
    );
    res.status(201).json({ ok: true, id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save your registration. Please try again.' });
  }
});

// GET /api/parent-registrations  (admin only)
router.get('/', requireAuth, requireRole('admin'), async (req, res) => {
  const result = await db.query('SELECT * FROM parent_registrations ORDER BY created_at DESC');
  res.json(result.rows.map(toRow));
});

// PATCH /api/parent-registrations/:id  (admin only) — body: { status: 'new' | 'contacted' }
router.patch('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const status = req.body && req.body.status;
  if (!['new', 'contacted'].includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const result = await db.query(
    'UPDATE parent_registrations SET status = $1 WHERE id = $2 RETURNING *',
    [status, req.params.id]
  );
  if (!result.rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json(toRow(result.rows[0]));
});

// DELETE /api/parent-registrations/:id  (admin only)
router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const result = await db.query('DELETE FROM parent_registrations WHERE id = $1 RETURNING id', [req.params.id]);
  if (!result.rows[0]) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

module.exports = router;
