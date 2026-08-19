const express = require('express');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

function toAttempt(a) {
  return {
    id: a.id, examId: a.exam_id, studentId: a.student_id, studentName: a.student_name,
    rollNo: a.roll_no, section: a.section, school: a.school,
    score: a.score, total: a.total, pct: a.pct, date: a.created_at, answers: a.answers
  };
}

// POST /api/exam-attempts  (student submits an exam)
// Grading happens server-side from the stored `correct` answers — never trust a client-submitted score.
router.post('/', requireAuth, async (req, res) => {
  const { examId, studentName, rollNo, section, school, answers } = req.body;
  if (!examId || !Array.isArray(answers)) return res.status(400).json({ error: 'examId and answers[] required' });

  const examRes = await db.query('SELECT * FROM exams WHERE id = $1', [examId]);
  const exam = examRes.rows[0];
  if (!exam) return res.status(404).json({ error: 'Exam not found' });

  const questions = exam.questions || [];
  let score = 0;
  questions.forEach((q, i) => { if (answers[i] === q.correct) score++; });
  const total = questions.length;
  const pct = total ? Math.round((score / total) * 100) : null;

  try {
    const result = await db.query(
      `INSERT INTO exam_attempts (exam_id, student_id, student_name, roll_no, section, school, score, total, pct, answers)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (exam_id, student_id) DO UPDATE
         SET score = EXCLUDED.score, total = EXCLUDED.total, pct = EXCLUDED.pct, answers = EXCLUDED.answers
       RETURNING *`,
      [examId, req.user.id, studentName, rollNo, section, school, score, total, pct, JSON.stringify(answers)]
    );
    res.status(201).json({ ok: true, submitted: toAttempt(result.rows[0]) }); // score intentionally not surfaced to student
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record attempt' });
  }
});

// GET /api/exam-attempts  (admin only — matches "only Admin can view results")
router.get('/', requireAuth, requireRole('admin'), async (req, res) => {
  const { examId } = req.query;
  const result = examId
    ? await db.query('SELECT * FROM exam_attempts WHERE exam_id = $1 ORDER BY created_at DESC', [examId])
    : await db.query('SELECT * FROM exam_attempts ORDER BY created_at DESC');
  res.json(result.rows.map(toAttempt));
});

module.exports = router;
