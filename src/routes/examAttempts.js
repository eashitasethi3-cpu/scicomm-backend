const express = require('express');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');
const { validateHumanName, validateSchoolName, validateAddress } = require('../validation');

const router = express.Router();

// UUIDs (real exams) vs plain slugs (e.g. 'science-attitude', which has no row
// in the `exams` table at all — it's a fixed survey, not an uploaded paper).
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function toAttempt(a) {
  return {
    id: a.id, examId: a.exam_id || a.exam_slug, studentId: a.student_id, studentName: a.student_name,
    rollNo: a.roll_no, section: a.section, school: a.school, schoolAddress: a.school_address,
    score: a.score, total: a.total, pct: a.pct, date: a.created_at, answers: a.answers,
    timeTakenSeconds: a.time_taken_seconds
  };
}

// POST /api/exam-attempts  (student submits an exam OR the S.A.S survey)
// Grading of real exams happens server-side from the stored `correct` answers —
// never trust a client-submitted score. The S.A.S survey has no right/wrong
// answers, so for that one we trust the client's completion count instead.
router.post('/', requireAuth, async (req, res) => {
  const { examId, studentName, rollNo, section, school, schoolAddress, answers, timeTakenSeconds } = req.body;
  if (!examId || !Array.isArray(answers)) return res.status(400).json({ error: 'examId and answers[] required' });

  // Name / school / address are compulsory and must pass basic sanity checks
  // (real-looking values, not placeholder junk like "abc"/"xyz"/"test"). This
  // is a heuristic filter, not identity verification.
  const nameErr = validateHumanName(studentName);
  if (nameErr) return res.status(400).json({ error: nameErr });
  const schoolErr = validateSchoolName(school);
  if (schoolErr) return res.status(400).json({ error: schoolErr });
  const addressErr = validateAddress(schoolAddress);
  if (addressErr) return res.status(400).json({ error: addressErr });

  // All students authenticate through ONE shared login (student@scicomm.in), so
  // req.user.id is identical for every student and can't identify who actually
  // took the exam. Build a key from the details the student typed in instead,
  // so different students taking the same exam/survey don't overwrite each other.
  const submissionKey = [rollNo, school, studentName]
    .map(v => (v || '').trim().toLowerCase())
    .join('|');
  if (!submissionKey.replace(/\|/g, '')) {
    return res.status(400).json({ error: 'studentName, rollNo, or school required to identify the attempt' });
  }

  const isRealExam = UUID_RE.test(examId);

  try {
    let examId_, examSlug, score, total, pct, answersJson;

    if (isRealExam) {
      const examRes = await db.query('SELECT * FROM exams WHERE id = $1', [examId]);
      const exam = examRes.rows[0];
      if (!exam) return res.status(404).json({ error: 'Exam not found' });

      const questions = exam.questions || [];
      score = 0;
      questions.forEach((q, i) => { if (answers[i] === q.correct) score++; });
      total = questions.length;
      pct = total ? Math.round((score / total) * 100) : null;
      examId_ = examId;
      examSlug = null;
      answersJson = JSON.stringify(answers);
    } else {
      // Ungraded survey (e.g. the Scientific Attitude Study). `answers` here is
      // already the readable [{question, selected}] breakdown the client built —
      // there's no answer key to grade against, so we just record completion.
      const answeredCount = answers.filter(a => a && a.selected && a.selected !== 'Not answered').length;
      score = answeredCount;
      total = answers.length;
      pct = total ? Math.round((answeredCount / total) * 100) : null;
      examId_ = null;
      examSlug = examId;
      answersJson = JSON.stringify(answers);
    }

    const result = await db.query(
      `INSERT INTO exam_attempts (exam_id, exam_slug, student_id, student_name, roll_no, section, school, school_address, score, total, pct, answers, submission_key, time_taken_seconds)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       ON CONFLICT (COALESCE(exam_id::text, exam_slug), submission_key) DO UPDATE
         SET score = EXCLUDED.score, total = EXCLUDED.total, pct = EXCLUDED.pct, answers = EXCLUDED.answers,
             time_taken_seconds = EXCLUDED.time_taken_seconds, school_address = EXCLUDED.school_address
       RETURNING *`,
      [examId_, examSlug, req.user.id, studentName, rollNo, section, school, schoolAddress, score, total, pct, answersJson, submissionKey, timeTakenSeconds || null]
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
  let result;
  if (examId && UUID_RE.test(examId)) {
    result = await db.query('SELECT * FROM exam_attempts WHERE exam_id = $1 ORDER BY created_at DESC', [examId]);
  } else if (examId) {
    result = await db.query('SELECT * FROM exam_attempts WHERE exam_slug = $1 ORDER BY created_at DESC', [examId]);
  } else {
    result = await db.query('SELECT * FROM exam_attempts ORDER BY created_at DESC');
  }
  res.json(result.rows.map(toAttempt));
});

module.exports = router;
