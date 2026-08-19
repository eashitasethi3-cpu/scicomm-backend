const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

function toRegistration(s) {
  return {
    id: s.id,
    studentId: s.student_id,
    examId: s.exam_id,
    registeredBy: s.registered_by,
    createdAt: s.created_at
  };
}

// GET /api/registered-students?studentId=&examId=
router.get('/', requireAuth, async (req, res) => {
  const { studentId, examId } = req.query;
  const clauses = [];
  const params = [];
  if (studentId) { params.push(studentId); clauses.push(`student_id = $${params.length}`); }
  if (examId) { params.push(examId); clauses.push(`exam_id = $${params.length}`); }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const result = await db.query(`SELECT * FROM registered_students ${where} ORDER BY created_at DESC`, params);
  res.json(result.rows.map(toRegistration));
});

// POST /api/registered-students  (body: { studentId, examId })
// Students may only register themselves; teacher/school/principal/admin may register anyone.
router.post('/', requireAuth, async (req, res) => {
  const { studentId, examId } = req.body;
  if (!studentId || !examId) return res.status(400).json({ error: 'studentId and examId are required' });
  if (req.user.role === 'student' && req.user.id !== studentId) {
    return res.status(403).json({ error: 'Students can only register themselves' });
  }

  try {
    const result = await db.query(
      `INSERT INTO registered_students (student_id, exam_id, registered_by)
       VALUES ($1,$2,$3)
       ON CONFLICT (student_id, exam_id) DO NOTHING RETURNING *`,
      [studentId, examId, req.user.name]
    );
    if (result.rows[0]) return res.status(201).json(toRegistration(result.rows[0]));

    // Already registered — return the existing row instead of erroring.
    const existing = await db.query(
      'SELECT * FROM registered_students WHERE student_id = $1 AND exam_id = $2',
      [studentId, examId]
    );
    res.status(200).json(toRegistration(existing.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// DELETE /api/registered-students/:id
router.delete('/:id', requireAuth, async (req, res) => {
  const result = await db.query('DELETE FROM registered_students WHERE id = $1 RETURNING id', [req.params.id]);
  if (!result.rows[0]) return res.status(404).json({ error: 'Registration not found' });
  res.json({ ok: true });
});

module.exports = router;
