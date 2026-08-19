const express = require('express');
const db = require('../db');
const { requireAuth, requireRole, optionalAuth } = require('../middleware/auth');

const router = express.Router();

function toRating(r) {
  return {
    id: r.id, studentName: r.student_name, category: r.category, topic: r.topic,
    review: r.review, stars: r.stars, curiosity: r.curiosity, attitude: r.attitude,
    comm: r.comm, research: r.research, innovation: r.innovation,
    authorId: r.author_id, authorName: r.author_name, authorRole: r.author_role,
    school: r.school, votes: r.votes, date: r.created_at
  };
}

// GET /api/ratings  (public feed, optional filters: category, school, student)
router.get('/', optionalAuth, async (req, res) => {
  const { category, school, student } = req.query;
  const clauses = [];
  const params = [];
  if (category && category !== 'all') { params.push(category); clauses.push(`category = $${params.length}`); }
  if (school) { params.push(school.toLowerCase()); clauses.push(`LOWER(school) = $${params.length}`); }
  if (student) { params.push(student); clauses.push(`student_name = $${params.length}`); }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const result = await db.query(`SELECT * FROM ratings ${where} ORDER BY created_at DESC`, params);
  res.json(result.rows.map(toRating));
});

// GET /api/ratings/:id
router.get('/:id', async (req, res) => {
  const result = await db.query('SELECT * FROM ratings WHERE id = $1', [req.params.id]);
  if (!result.rows[0]) return res.status(404).json({ error: 'Rating not found' });
  res.json(toRating(result.rows[0]));
});

// POST /api/ratings  (teacher/admin only, matches app logic)
router.post('/', requireAuth, requireRole('teacher', 'admin'), async (req, res) => {
  const { studentName, category, topic, review, stars, curiosity, attitude, comm, research, innovation, school } = req.body;
  if (!studentName || !category || !topic || !review || !stars) {
    return res.status(400).json({ error: 'studentName, category, topic, review, stars are required' });
  }
  const result = await db.query(
    `INSERT INTO ratings (student_name, category, topic, review, stars, curiosity, attitude, comm, research, innovation, author_id, author_name, author_role, school)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
    [studentName, category, topic, review, stars, curiosity ?? null, attitude ?? null, comm ?? null,
     research ?? null, innovation ?? null, req.user.id, req.user.name, req.user.role, school || '']
  );
  res.status(201).json(toRating(result.rows[0]));
});

// PATCH /api/ratings/:id/vote  (anyone, increments vote count)
router.patch('/:id/vote', async (req, res) => {
  const result = await db.query(
    'UPDATE ratings SET votes = votes + 1 WHERE id = $1 RETURNING *',
    [req.params.id]
  );
  if (!result.rows[0]) return res.status(404).json({ error: 'Rating not found' });
  res.json(toRating(result.rows[0]));
});

// DELETE /api/ratings/:id  (admin only, or the original author)
router.delete('/:id', requireAuth, async (req, res) => {
  const existing = await db.query('SELECT author_id FROM ratings WHERE id = $1', [req.params.id]);
  if (!existing.rows[0]) return res.status(404).json({ error: 'Rating not found' });
  const isOwner = existing.rows[0].author_id === req.user.id;
  if (req.user.role !== 'admin' && !isOwner) return res.status(403).json({ error: 'Forbidden' });

  await db.query('DELETE FROM ratings WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
