const express = require('express');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// `viewerRole` decides how much of the exam this specific requester gets to see:
//  - 'admin'         → full questions + correct answers, any time (open or closed)
//  - 'full'          → full questions + correct answers, but ONLY once status === 'open' AND revealed
//  - 'questionsOnly' → questions + options but NOT correct answers, ONLY once status === 'open' AND revealed
//  - 'waiting'       → exam is open (students can register/enter details) but Admin's reveal_at
//                      buffer hasn't passed yet — question content withheld, same as 'hidden'
//  - 'hidden'        → no question content at all (used before Admin opens the test)
function toExam(e, viewerRole) {
  let questions;
  if (viewerRole === 'hidden' || viewerRole === 'waiting') {
    questions = []; // exam exists and is listed, but its content is not sent to the browser at all
  } else if (viewerRole === 'admin' || viewerRole === 'full') {
    questions = e.questions;
  } else {
    questions = (e.questions || []).map(q => ({ question: q.question, options: q.options })); // hide `correct`
  }
  const withholdEverything = viewerRole === 'hidden' || viewerRole === 'waiting';
  return {
    id: e.id, title: e.title, type: e.type, duration: e.duration,
    targetClass: e.target_class, date: e.exam_date, school: e.school,
    questions, status: e.status, uploadedBy: e.uploaded_by,
    examCode: e.exam_code, examPassword: e.exam_password,
    // The paper file (for paper-upload exams) IS the question content for
    // that exam type, so it gets withheld under the exact same conditions.
    paperFile: withholdEverything ? null : e.paper_file_url,
    // Sent to everyone (even while withheld) so the client can render an
    // accurate "questions unlock at..." countdown instead of just "soon".
    revealAt: e.reveal_at,
    createdAt: e.created_at
  };
}

// Only Admin can see an exam's actual question content while it's closed —
// this applies to teachers too, not just students. Everyone (including the
// teacher who uploaded it) only sees the questions once Admin opens the test
// AND, if Admin set a reveal_at holdback, only once that moment has passed.
// This is enforced here (server-side, using the server's clock) rather than
// only in the UI, so a student can't see questions early just by opening
// devtools/network tab or hitting the API directly before reveal_at.
function viewerRoleFor(exam, user) {
  if (user.role === 'admin') return 'admin';
  if (exam.status !== 'open') return 'hidden';
  if (exam.reveal_at && new Date(exam.reveal_at) > new Date()) return 'waiting';
  return user.role === 'teacher' ? 'full' : 'questionsOnly';
}

// GET /api/exams  — question content is withheld entirely for non-admins until Admin opens each exam
router.get('/', requireAuth, async (req, res) => {
  const result = await db.query('SELECT * FROM exams ORDER BY created_at DESC');
  res.json(result.rows.map(e => toExam(e, viewerRoleFor(e, req.user))));
});

router.get('/:id', requireAuth, async (req, res) => {
  const result = await db.query('SELECT * FROM exams WHERE id = $1', [req.params.id]);
  if (!result.rows[0]) return res.status(404).json({ error: 'Exam not found' });
  res.json(toExam(result.rows[0], viewerRoleFor(result.rows[0], req.user)));
});

// POST /api/exams  (teacher/admin only)
router.post('/', requireAuth, requireRole('teacher', 'admin'), async (req, res) => {
  const { title, type, duration, targetClass, date, school, questions, examCode, examPassword, paperFile } = req.body;
  if (!title || !type || !duration) return res.status(400).json({ error: 'title, type, duration required' });

  // Every newly-created exam starts CLOSED, regardless of who created it —
  // students can only see/attempt questions once Admin explicitly opens it via
  // PATCH /api/exams/:id { status: 'open' }. This is hardcoded here (not taken
  // from req.body) so a teacher can never publish a test live by accident.
  const result = await db.query(
    `INSERT INTO exams (title, type, duration, target_class, exam_date, school, questions, uploaded_by, exam_code, exam_password, paper_file_url, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'closed') RETURNING *`,
    [title, type, duration, targetClass || null, date || null, school || null,
     JSON.stringify(questions || []), req.user.name, examCode || null, examPassword || null, paperFile || null]
  );
  // The teacher/admin who just uploaded it gets the full content back in this
  // response (they just typed it themselves — nothing new is being revealed),
  // even though a later GET while it's closed would hide it from a teacher.
  res.status(201).json(toExam(result.rows[0], req.user.role === 'admin' ? 'admin' : 'full'));
});

// PATCH /api/exams/:id  (e.g. change duration/status)
// Opening/closing a test (i.e. deciding when students can start it) is
// deliberately Admin-only — a teacher may still adjust other fields like
// duration for their own exam, but cannot start/stop it themselves.
router.patch('/:id', requireAuth, requireRole('teacher', 'admin'), async (req, res) => {
  if (req.body.status !== undefined && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only Admin can open or close a test' });
  }
  // Same reasoning as `status`: only Admin decides the synchronized moment
  // questions unlock for everyone, never a teacher.
  if (req.body.revealAt !== undefined && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only Admin can set when questions are revealed' });
  }
  const fields = { duration: 'duration', status: 'status', target_class: 'targetClass', reveal_at: 'revealAt' };
  const sets = [];
  const params = [];
  for (const [col, key] of Object.entries(fields)) {
    if (req.body[key] !== undefined) { params.push(req.body[key]); sets.push(`${col} = $${params.length}`); }
  }
  if (!sets.length) return res.status(400).json({ error: 'No updatable fields provided' });
  params.push(req.params.id);
  const result = await db.query(`UPDATE exams SET ${sets.join(', ')} WHERE id = $${params.length} RETURNING *`, params);
  if (!result.rows[0]) return res.status(404).json({ error: 'Exam not found' });
  res.json(toExam(result.rows[0], viewerRoleFor(result.rows[0], req.user)));
});

// DELETE /api/exams/:id
router.delete('/:id', requireAuth, requireRole('teacher', 'admin'), async (req, res) => {
  await db.query('DELETE FROM exams WHERE id = $1', [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
