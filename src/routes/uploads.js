const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// IMPORTANT: Render's free web-service disk is EPHEMERAL — it is wiped on every
// redeploy and every time the service spins down from inactivity and restarts.
// Anything written with diskStorage() below will eventually vanish while the
// database still points at it. Keep this endpoint only for files you don't
// need to survive a restart (e.g. a paper the admin downloads right after
// upload). For anything that must persist (like science-question images),
// use POST /api/uploads/image below instead, which returns a base64 data URL
// that gets stored directly in Postgres and survives restarts/redeploys.
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'uploads')),
  filename: (req, file, cb) => {
    const safeExt = path.extname(file.originalname).slice(0, 10);
    cb(null, crypto.randomBytes(16).toString('hex') + safeExt);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB, matches typical exam paper size
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.png', '.jpg', '.jpeg', '.doc', '.docx'];
    if (allowed.includes(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error('Unsupported file type'));
  }
});

// POST /api/uploads/exam-paper  (teacher/admin only)
// Disk-based — see the ephemeral-storage warning above.
router.post('/exam-paper', requireAuth, requireRole('teacher', 'admin'), upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.status(201).json({
    name: req.file.originalname,
    url: `/uploads/${req.file.filename}`
  });
});

// POST /api/uploads/image  (teacher/admin only)
// Memory-based (no disk write) — returns a base64 data URL the client stores
// directly in a DB column (e.g. science_questions.image). This is what keeps
// question images alive across Render restarts/redeploys.
const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB, matches express.json() body limit in index.js
  fileFilter: (req, file, cb) => {
    const allowed = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
    if (allowed.includes(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error('Unsupported image type'));
  }
});

router.post('/image', requireAuth, requireRole('teacher', 'admin'), imageUpload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const base64 = req.file.buffer.toString('base64');
  const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
  res.status(201).json({ name: req.file.originalname, image: dataUrl });
});

module.exports = router;
