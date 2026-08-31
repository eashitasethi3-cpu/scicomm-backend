const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const db = require('../db');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Same uploads folder used by routes/uploads.js (exam papers) — files are
// served back out via the app.use('/uploads', express.static(...)) line in
// index.js, so a saved file at /uploads/<filename> is reachable at
// {API_BASE}/uploads/<filename>.
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const safeExt = path.extname(file.originalname).slice(0, 10);
    cb(null, crypto.randomBytes(16).toString('hex') + safeExt);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB per photo
  fileFilter: (req, file, cb) => {
    const allowed = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
    if (allowed.includes(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error('Unsupported image type — please upload a PNG, JPG, WEBP, or GIF.'));
  }
});

// GET /api/gallery — PUBLIC. Anyone visiting the site sees the same photos,
// no login required. Admin-only actions (upload/delete) are enforced below.
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id, url, created_at FROM gallery_images ORDER BY created_at DESC');
    res.json(result.rows.map(r => ({ id: r.id, url: r.url, date: r.created_at })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load gallery' });
  }
});

// POST /api/gallery  (Admin only) — one image per request, field name "file".
router.post('/', requireAuth, requireRole('admin'), upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `/uploads/${req.file.filename}`;
  try {
    const result = await db.query(
      `INSERT INTO gallery_images (url, uploaded_by) VALUES ($1, $2) RETURNING id, url, created_at`,
      [url, req.user.id]
    );
    const row = result.rows[0];
    res.status(201).json({ id: row.id, url: row.url, date: row.created_at });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save photo' });
  }
});

// DELETE /api/gallery/:id  (Admin only)
router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const result = await db.query('DELETE FROM gallery_images WHERE id = $1 RETURNING url', [req.params.id]);
    const row = result.rows[0];
    if (row && row.url) {
      const filePath = path.join(uploadsDir, path.basename(row.url));
      fs.unlink(filePath, () => {}); // best-effort cleanup; ignore if already gone
    }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
});

module.exports = router;
