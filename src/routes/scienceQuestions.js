const express = require('express');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Real Postgres UUIDs always look like this. Questions created client-side
// while a save was failing (e.g. during the CORS outage) got a temporary,
// browser-generated placeholder id instead of a real one. Passing that
// placeholder straight into a `WHERE id = $n` clause against a UUID column
// crashes Postgres with error 22P02 ("invalid input syntax for type uuid"),
// which rolled back the entire save (single or bulk) instead of just
// treating that question as new. This regex lets us tell real ids apart
// from leftover placeholders so we can INSERT instead of crashing.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function toQuestion(q) {
  if (!q) return null;
  return {
    id: q.id,
    text: q.text,
    type: q.type,
    category: q.category,
    image: q.image,
    school: q.school,
    className: q.class_name,
    createdAt: q.created_at,
    updatedAt: q.updated_at
  };
}

// Guards every /:id route below. A non-UUID id (a leftover client-side
// placeholder, see UUID_RE comment above) would otherwise crash the query
// with Postgres error 22P02. Treat it the same as "not found" instead —
// clean 404, no crash.
router.param('id', (req, res, next, id) => {
  if (!UUID_RE.test(id)) return res.status(404).json({ error: 'Question not found' });
  next();
});

// GET /api/science-questions?school=&className=
router.get('/', requireAuth, async (req, res) => {
  const { school, className } = req.query;
  const clauses = [];
  const params = [];
  if (school) { params.push(school); clauses.push(`school = $${params.length}`); }
  if (className) { params.push(className); clauses.push(`class_name = $${params.length}`); }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const result = await db.query(`SELECT * FROM science_questions ${where} ORDER BY created_at ASC`, params);
  res.json(result.rows.map(toQuestion));
});

router.get('/:id', requireAuth, async (req, res) => {
  const result = await db.query('SELECT * FROM science_questions WHERE id = $1', [req.params.id]);
  if (!result.rows[0]) return res.status(404).json({ error: 'Question not found' });
  res.json(toQuestion(result.rows[0]));
});

// POST /api/science-questions  (teacher/admin only) — matches sqPersistOne() adding a new question
router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  const { text, type, category, image, school, className } = req.body;
  if (!text) return res.status(400).json({ error: 'text is required' });
  const result = await db.query(
    `INSERT INTO science_questions (text, type, category, image, school, class_name)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [text, type || null, category || null, image || null, school || null, className || null]
  );
  res.status(201).json(toQuestion(result.rows[0]));
});

// PUT /api/science-questions/bulk  (teacher/admin only) — matches sqPersistAll(db), used for the
// one-time starter/career/survey seeding and for the category-migration pass. Each item with a
// matching existing id is updated in place; anything else (no id, or an id that no longer exists,
// e.g. a fresh client-generated id) is inserted as a new row. Order of the response matches the
// order of the request so the frontend can reconcile ids 1:1, though in practice it just reloads
// the full list afterward.
router.put('/bulk', requireAuth, requireRole('admin'), async (req, res) => {
  const { questions } = req.body;
  if (!Array.isArray(questions)) return res.status(400).json({ error: 'questions[] required' });

  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    const saved = [];
    for (const q of questions) {
      if (!q || !q.text) { saved.push(null); continue; }
      let row = null;
      if (q.id && UUID_RE.test(q.id)) {
        // Use COALESCE for image so a payload that omits the field (e.g. a
        // partial resync from the frontend) never wipes out a previously
        // saved image. To intentionally clear an image, send image: '' —
        // that still overwrites, since '' is not null.
        const imageParam = Object.prototype.hasOwnProperty.call(q, 'image') ? (q.image ?? null) : null;
        const upd = await client.query(
          `UPDATE science_questions
           SET text=$1, type=$2, category=$3, image=COALESCE($4, image), school=$5, class_name=$6, updated_at=now()
           WHERE id=$7 RETURNING *`,
          [q.text, q.type || null, q.category || null, imageParam, q.school || null, q.className || null, q.id]
        );
        row = upd.rows[0] || null;
      }
      if (!row) {
        const ins = await client.query(
          `INSERT INTO science_questions (text, type, category, image, school, class_name)
           VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
          [q.text, q.type || null, q.category || null, q.image || null, q.school || null, q.className || null]
        );
        row = ins.rows[0];
      }
      saved.push(row);
    }
    await client.query('COMMIT');
    res.json(saved.map(toQuestion));
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Bulk save failed' });
  } finally {
    client.release();
  }
});

// PUT /api/science-questions/:id  (teacher/admin only) — matches sqPersistOne() editing an existing question
router.put('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const { text, type, category, image, school, className } = req.body;
  if (!text) return res.status(400).json({ error: 'text is required' });
  // Same COALESCE protection as the bulk endpoint: omitting `image` from the
  // payload leaves the existing image untouched instead of nulling it out.
  const imageParam = Object.prototype.hasOwnProperty.call(req.body, 'image') ? (image ?? null) : null;
  const result = await db.query(
    `UPDATE science_questions
     SET text=$1, type=$2, category=$3, image=COALESCE($4, image), school=$5, class_name=$6, updated_at=now()
     WHERE id=$7 RETURNING *`,
    [text, type || null, category || null, imageParam, school || null, className || null, req.params.id]
  );
  if (!result.rows[0]) return res.status(404).json({ error: 'Question not found' });
  res.json(toQuestion(result.rows[0]));
});

// DELETE /api/science-questions/:id  (teacher/admin only) — matches sqPersistDelete(id)
router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const result = await db.query('DELETE FROM science_questions WHERE id = $1 RETURNING id', [req.params.id]);
  if (!result.rows[0]) return res.status(404).json({ error: 'Question not found' });
  res.json({ ok: true });
});

module.exports = router;
