require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const ratingsRoutes = require('./routes/ratings');
const examsRoutes = require('./routes/exams');
const examAttemptsRoutes = require('./routes/examAttempts');
const usersRoutes = require('./routes/users');
const settingsRoutes = require('./routes/settings');
const uploadsRoutes = require('./routes/uploads');
const archiveRoutes = require('./routes/archive');
const scienceQuestionsRoutes = require('./routes/scienceQuestions');
const registeredStudentsRoutes = require('./routes/registeredStudents');
const path = require('path');
const fs = require('fs');

const app = express();

// Ensure the uploads folder exists before multer tries to write to it.
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
}));
app.use(express.json({ limit: '5mb' })); // exam papers, question sets etc.

// Basic protection against brute-force login/register spam.
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50 });
app.use('/api/auth', authLimiter);

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.use('/api/auth', authRoutes);
app.use('/api/ratings', ratingsRoutes);
app.use('/api/exams', examsRoutes);
app.use('/api/exam-attempts', examAttemptsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/archive', archiveRoutes);
app.use('/api/science-questions', scienceQuestionsRoutes);
app.use('/api/registered-students', registeredStudentsRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`SCICOMM API listening on port ${PORT}`));
