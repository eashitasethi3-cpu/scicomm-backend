const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

function publicUser(u) {
  return {
    id: u.id, name: u.name, email: u.email, role: u.role,
    phone: u.phone, address: u.address,
    schoolName: u.school_name, principalName: u.principal_name, schoolId: u.school_id,
    createdAt: u.created_at
  };
}

// GET /api/users  (admin only — powers the admin panel's user table)
router.get('/', requireAuth, requireRole('admin'), async (req, res) => {
  const { role } = req.query;
  const result = role
    ? await db.query('SELECT * FROM users WHERE role = $1 ORDER BY created_at DESC', [role])
    : await db.query('SELECT * FROM users ORDER BY created_at DESC');
  res.json(result.rows.map(publicUser));
});

// GET /api/users/:id
router.get('/:id', requireAuth, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const result = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
  if (!result.rows[0]) return res.status(404).json({ error: 'User not found' });
  res.json(publicUser(result.rows[0]));
});

// PATCH /api/users/:id  (self or admin — update profile fields)
router.patch('/:id', requireAuth, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const fields = { name: 'name', phone: 'phone', address: 'address', school_name: 'schoolName', principal_name: 'principalName' };
  const sets = [];
  const params = [];
  for (const [col, key] of Object.entries(fields)) {
    if (req.body[key] !== undefined) { params.push(req.body[key]); sets.push(`${col} = $${params.length}`); }
  }
  if (req.body.password) {
    const hash = await bcrypt.hash(req.body.password, 12);
    params.push(hash); sets.push(`password_hash = $${params.length}`);
  }
  if (!sets.length) return res.status(400).json({ error: 'No updatable fields provided' });
  params.push(req.params.id);
  const result = await db.query(`UPDATE users SET ${sets.join(', ')} WHERE id = $${params.length} RETURNING *`, params);
  if (!result.rows[0]) return res.status(404).json({ error: 'User not found' });
  res.json(publicUser(result.rows[0]));
});

// DELETE /api/users/:id  (admin only)
router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  await db.query('DELETE FROM users WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
