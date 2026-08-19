const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const ACCESS_TOKEN_TTL = '2h';
const REFRESH_TOKEN_TTL_DAYS = 30;

function signAccessToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_TTL }
  );
}

async function issueRefreshToken(userId) {
  const token = crypto.randomBytes(48).toString('hex');
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);
  await db.query(
    'INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES ($1,$2,$3)',
    [token, userId, expiresAt]
  );
  return token;
}

function publicUser(u) {
  return {
    id: u.id, name: u.name, email: u.email, role: u.role,
    phone: u.phone, address: u.address,
    schoolName: u.school_name, principalName: u.principal_name, schoolId: u.school_id
  };
}

// ---------------- REGISTER ----------------
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, address, schoolName, principalName } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'name, email, password, role are required' });
    }
    const allowedRoles = ['student', 'teacher', 'school', 'principal']; // admin is never self-registered
    if (!allowedRoles.includes(role)) return res.status(400).json({ error: 'Invalid role' });

    const existing = await db.query('SELECT id FROM users WHERE LOWER(email) = LOWER($1)', [email]);
    if (existing.rows.length) return res.status(409).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 12);
    const result = await db.query(
      `INSERT INTO users (name, email, password_hash, role, phone, address, school_name, principal_name)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [name, email, hash, role, phone || '', address || '', schoolName || null, principalName || null]
    );
    const user = result.rows[0];
    const accessToken = signAccessToken(user);
    const refreshToken = await issueRefreshToken(user.id);
    res.status(201).json({ user: publicUser(user), accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// ---------------- LOGIN ----------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const result = await db.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

    const accessToken = signAccessToken(user);
    const refreshToken = await issueRefreshToken(user.id);
    res.json({ user: publicUser(user), accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// ---------------- SHARED STUDENT LOGIN ----------------
// The frontend has a single shared student email/password (kept in `settings`).
// This endpoint checks the submitted password against settings.studentPassword,
// and logs the caller in as (or creates) the shared student account.
router.post('/student-login', async (req, res) => {
  try {
    const { password } = req.body;
    const settingsRes = await db.query("SELECT value FROM settings WHERE key = 'studentPassword'");
    const expected = settingsRes.rows[0]?.value ?? 'scicomm2026';
    if (password !== expected) return res.status(401).json({ error: 'Incorrect student password' });

    const SHARED_EMAIL = 'student@scicomm.in';
    let result = await db.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [SHARED_EMAIL]);
    let user = result.rows[0];
    if (!user) {
      const hash = await bcrypt.hash(crypto.randomBytes(16).toString('hex'), 12);
      const inserted = await db.query(
        `INSERT INTO users (name, email, password_hash, role) VALUES ($1,$2,$3,'student') RETURNING *`,
        ['Student', SHARED_EMAIL, hash]
      );
      user = inserted.rows[0];
    }
    const accessToken = signAccessToken(user);
    const refreshToken = await issueRefreshToken(user.id);
    res.json({ user: publicUser(user), accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Student login failed' });
  }
});

// ---------------- REFRESH ----------------
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'refreshToken required' });

    const result = await db.query(
      'SELECT * FROM refresh_tokens WHERE token = $1 AND expires_at > now()',
      [refreshToken]
    );
    const row = result.rows[0];
    if (!row) return res.status(401).json({ error: 'Invalid or expired refresh token' });

    const userRes = await db.query('SELECT * FROM users WHERE id = $1', [row.user_id]);
    const user = userRes.rows[0];
    if (!user) return res.status(401).json({ error: 'User no longer exists' });

    const accessToken = signAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Refresh failed' });
  }
});

// ---------------- LOGOUT ----------------
router.post('/logout', async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) await db.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);
  res.json({ ok: true });
});

// ---------------- CURRENT USER ----------------
router.get('/me', requireAuth, async (req, res) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
  if (!result.rows[0]) return res.status(404).json({ error: 'User not found' });
  res.json({ user: publicUser(result.rows[0]) });
});

module.exports = router;
