const express = require('express');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

function toExam(e, includeAnswers) {
  const questions = includeAnswers
    ? e.questions
    : (e.questions || []).map(q => ({ question: q.question, options: q.options })); // hide `correct` from students
  return {
    id: e.id, title: e.title, type: e.type, duration: e.duration,
    targetClass: e.target_class, date: e.exam_date, school: e.school,
    questions, status: e.status, uploadedBy: e.uploaded_by,
    examCode: e.exam_code, examPassword: e.exam_password,
    paperFile: e.paper_file_url, createdAt: e.created_at
  };
}

// GET /api/exams  — students get questions WITHOUT correct answers; teacher/admin get full
router.get('/', requireAuth, async (req, res) => {
  const result = await db.query('SELECT * FROM exams ORDER BY created_at DESC');
  const canSeeAnswers = ['admin', 'teacher'].includes(req.user.role);
  res.json(result.rows.map(e => toExam(e, canSeeAnswers)));
});

router.get('/:id', requireAuth, async (req, res) => {
  const result = await db.query('SELECT * FROM exams WHERE id = $1', [req.params.id]);
  if (!result.rows[0]) return res.status(404).json({ error: 'Exam not found' });
  const canSeeAnswers = ['admin', 'teacher'].includes(req.user.role);
  res.json(toExam(result.rows[0], canSeeAnswers));
});

// POST /api/exams  (teacher/admin only)
router.post('/', requireAuth, requireRole('teacher', 'admin'), async (req, res) => {
  const { title, type, duration, targetClass, date, school, questions, examCode, examPassword, paperFile } = req.body;
  if (!title || !type || !duration) return res.status(400).json({ error: 'title, type, duration required' });

  const result = await db.query(
    `INSERT INTO exams (title, type, duration, target_class, exam_date, school, questions, uploaded_by, exam_code, exam_password, paper_file_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
    [title, type, duration, targetClass || null, date || null, school || null,
     JSON.stringify(questions || []), req.user.name, examCode || null, examPassword || null, paperFile || null]
  );
  res.status(201).json(toExam(result.rows[0], true));
});

// PATCH /api/exams/:id  (teacher/admin, e.g. change duration/status)
router.patch('/:id', requireAuth, requireRole('teacher', 'admin'), async (req, res) => {
  const fields = { duration: 'duration', status: 'status', target_class: 'targetClass' };
  const sets = [];
  const params = [];
  for (const [col, key] of Object.entries(fields)) {
    if (req.body[key] !== undefined) { params.push(req.body[key]); sets.push(`${col} = $${params.length}`); }
  }
  if (!sets.length) return res.status(400).json({ error: 'No updatable fields provided' });
  params.push(req.params.id);
  const result = await db.query(`UPDATE exams SET ${sets.join(', ')} WHERE id = $${params.length} RETURNING *`, params);
  if (!result.rows[0]) return res.status(404).json({ error: 'Exam not found' });
  res.json(toExam(result.rows[0], true));
});

// DELETE /api/exams/:id
router.delete('/:id', requireAuth, requireRole('teacher', 'admin'), async (req, res) => {
  await db.query('DELETE FROM exams WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
