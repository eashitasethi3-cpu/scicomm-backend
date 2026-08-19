```js
const express = require('express');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Valid PostgreSQL UUID format
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Convert database question to frontend format
function toQuestion(q) {
  if (!q) return null;

  return {
    id: q.id,
    text: q.text,
    type: q.type,
    category: q.category,
    school: q.school,
    className: q.class_name,
    createdAt: q.created_at,
    updatedAt: q.updated_at
  };
}

// Prevent invalid IDs from reaching PostgreSQL
router.param('id', (req, res, next, id) => {
  if (!UUID_RE.test(id)) {
    return res.status(404).json({ error: 'Question not found' });
  }

  next();
});

// GET /api/science-questions
// Optional filters: ?school=&className=
router.get('/', requireAuth, async (req, res) => {
  try {
    const { school, className } = req.query;

    const clauses = [];
    const params = [];

    if (school) {
      params.push(school);
      clauses.push(`school = $${params.length}`);
    }

    if (className) {
      params.push(className);
      clauses.push(`class_name = $${params.length}`);
    }

    const whereClause = clauses.length
      ? `WHERE ${clauses.join(' AND ')}`
      : '';

    const result = await db.query(
      `SELECT id, text, type, category, school, class_name, created_at, updated_at
       FROM science_questions
       ${whereClause}
       ORDER BY created_at ASC`,
      params
    );

    res.json(result.rows.map(toQuestion));
  } catch (err) {
    console.error('Error fetching science questions:', err);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// GET /api/science-questions/:id
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, text, type, category, school, class_name, created_at, updated_at
       FROM science_questions
       WHERE id = $1`,
      [req.params.id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(toQuestion(result.rows[0]));
  } catch (err) {
    console.error('Error fetching question:', err);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

// POST /api/science-questions
// Teacher/admin only
router.post(
  '/',
  requireAuth,
  requireRole('teacher', 'admin'),
  async (req, res) => {
    try {
      const {
        text,
        type,
        category,
        school,
        className
      } = req.body;

      if (!text || !text.trim()) {
        return res.status(400).json({
          error: 'text is required'
        });
      }

      const result = await db.query(
        `INSERT INTO science_questions
          (text, type, category, school, class_name)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, text, type, category, school, class_name, created_at, updated_at`,
        [
          text.trim(),
          type || null,
          category || null,
          school || null,
          className || null
        ]
      );

      res.status(201).json(toQuestion(result.rows[0]));
    } catch (err) {
      console.error('Error creating question:', err);
      res.status(500).json({ error: 'Failed to create question' });
    }
  }
);

// PUT /api/science-questions/bulk
// Teacher/admin only
router.put(
  '/bulk',
  requireAuth,
  requireRole('teacher', 'admin'),
  async (req, res) => {
    const { questions } = req.body;

    if (!Array.isArray(questions)) {
      return res.status(400).json({
        error: 'questions[] required'
      });
    }

    const client = await db.pool.connect();

    try {
      await client.query('BEGIN');

      const saved = [];

      for (const q of questions) {
        if (!q || !q.text || !q.text.trim()) {
          saved.push(null);
          continue;
        }

        let row = null;

        // Update existing question if UUID is valid
        if (q.id && UUID_RE.test(q.id)) {
          const updateResult = await client.query(
            `UPDATE science_questions
             SET
               text = $1,
               type = $2,
               category = $3,
               school = $4,
               class_name = $5,
               updated_at = NOW()
             WHERE id = $6
             RETURNING id, text, type, category, school, class_name, created_at, updated_at`,
            [
              q.text.trim(),
              q.type || null,
              q.category || null,
              q.school || null,
              q.className || null,
              q.id
            ]
          );

          row = updateResult.rows[0] || null;
        }

        // Insert new question
        if (!row) {
          const insertResult = await client.query(
            `INSERT INTO science_questions
              (text, type, category, school, class_name)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, text, type, category, school, class_name, created_at, updated_at`,
            [
              q.text.trim(),
              q.type || null,
              q.category || null,
              q.school || null,
              q.className || null
            ]
          );

          row = insertResult.rows[0];
        }

        saved.push(row);
      }

      await client.query('COMMIT');

      res.json(saved.map(toQuestion));
    } catch (err) {
      await client.query('ROLLBACK');

      console.error('Bulk save failed:', err);

      res.status(500).json({
        error: 'Bulk save failed'
      });
    } finally {
      client.release();
    }
  }
);

// PUT /api/science-questions/:id
// Teacher/admin only
router.put(
  '/:id',
  requireAuth,
  requireRole('teacher', 'admin'),
  async (req, res) => {
    try {
      const {
        text,
        type,
        category,
        school,
        className
      } = req.body;

      if (!text || !text.trim()) {
        return res.status(400).json({
          error: 'text is required'
        });
      }

      const result = await db.query(
        `UPDATE science_questions
         SET
           text = $1,
           type = $2,
           category = $3,
           school = $4,
           class_name = $5,
           updated_at = NOW()
         WHERE id = $6
         RETURNING id, text, type, category, school, class_name, created_at, updated_at`,
        [
          text.trim(),
          type || null,
          category || null,
          school || null,
          className || null,
          req.params.id
        ]
      );

      if (!result.rows[0]) {
        return res.status(404).json({
          error: 'Question not found'
        });
      }

      res.json(toQuestion(result.rows[0]));
    } catch (err) {
      console.error('Error updating question:', err);

      res.status(500).json({
        error: 'Failed to update question'
      });
    }
  }
);

// DELETE /api/science-questions/:id
// Teacher/admin only
router.delete(
  '/:id',
  requireAuth,
  requireRole('teacher', 'admin'),
  async (req, res) => {
    try {
      const result = await db.query(
        `DELETE FROM science_questions
         WHERE id = $1
         RETURNING id`,
        [req.params.id]
      );

      if (!result.rows[0]) {
        return res.status(404).json({
          error: 'Question not found'
        });
      }

      res.json({
        ok: true
      });
    } catch (err) {
      console.error('Error deleting question:', err);

      res.status(500).json({
        error: 'Failed to delete question'
      });
    }
  }
);

module.exports = router;
```
