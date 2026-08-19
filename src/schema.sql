-- ============================================================
-- SCICOMM database schema (PostgreSQL)
-- Mirrors the data model already used by the frontend's
-- localStorage db: { users, ratings, exams, examAttempts, settings }
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto; -- for gen_random_uuid()

-- ---------- USERS ----------
CREATE TABLE IF NOT EXISTS users (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  email          TEXT NOT NULL UNIQUE,
  password_hash  TEXT NOT NULL,
  role           TEXT NOT NULL CHECK (role IN ('admin','teacher','student','school','principal')),
  phone          TEXT DEFAULT '',
  address        TEXT DEFAULT '',
  school_name    TEXT,               -- for role = school / principal / student
  principal_name TEXT,               -- for role = school
  school_id      UUID REFERENCES users(id) ON DELETE SET NULL, -- for role = principal, links to the school user
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (LOWER(email));
CREATE INDEX IF NOT EXISTS idx_users_role  ON users (role);

-- ---------- RATINGS ----------
CREATE TABLE IF NOT EXISTS ratings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name  TEXT NOT NULL,
  category      TEXT NOT NULL CHECK (category IN ('curiosity','attitude','paper','tool','general')),
  topic         TEXT NOT NULL,
  review        TEXT NOT NULL,
  stars         INT  NOT NULL CHECK (stars BETWEEN 1 AND 5),
  curiosity     INT  CHECK (curiosity  BETWEEN 0 AND 10),
  attitude      INT  CHECK (attitude   BETWEEN 0 AND 10),
  comm          INT  CHECK (comm      BETWEEN 0 AND 10),
  research      INT  CHECK (research   BETWEEN 0 AND 10),
  innovation    INT  CHECK (innovation BETWEEN 0 AND 10),
  author_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  author_name   TEXT,
  author_role   TEXT,
  school        TEXT DEFAULT '',
  votes         INT  NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ratings_student ON ratings (student_name);
CREATE INDEX IF NOT EXISTS idx_ratings_school  ON ratings (LOWER(school));
CREATE INDEX IF NOT EXISTS idx_ratings_category ON ratings (category);

-- ---------- EXAMS ----------
CREATE TABLE IF NOT EXISTS exams (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT NOT NULL,
  type           TEXT NOT NULL,
  duration       INT  NOT NULL,          -- minutes
  target_class   TEXT,
  exam_date      DATE,
  school         TEXT,
  questions      JSONB NOT NULL DEFAULT '[]',   -- [{question, options[], correct}]
  status         TEXT NOT NULL DEFAULT 'open',  -- open | closed
  uploaded_by    TEXT,
  exam_code      TEXT,
  exam_password  TEXT,
  paper_file_url TEXT,                    -- stored file reference (S3 key / URL), not base64 in DB
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_exams_status ON exams (status);

-- ---------- EXAM ATTEMPTS ----------
CREATE TABLE IF NOT EXISTS exam_attempts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id       UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id    UUID REFERENCES users(id) ON DELETE SET NULL,
  student_name  TEXT,
  roll_no       TEXT,
  section       TEXT,
  school        TEXT,
  score         INT,
  total         INT,
  pct           INT,
  answers       JSONB DEFAULT '[]',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (exam_id, student_id)   -- one attempt per student per exam
);

CREATE INDEX IF NOT EXISTS idx_attempts_exam ON exam_attempts (exam_id);

-- ---------- SETTINGS (single row, key/value) ----------
CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

-- ---------- SCIENCE QUESTIONS (Scientific Attitude survey question bank) ----------
-- Mirrors the frontend's question shape: { id, text, type, category, image, school, className }
CREATE TABLE IF NOT EXISTS science_questions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text         TEXT NOT NULL,
  type         TEXT,                          -- illustration theme, e.g. 'flask' | 'auto' | 'career'
  category     TEXT,                          -- survey subscale, e.g. 'Rationality', 'Curiosity'
  image        TEXT,                          -- base64 data: URL or empty string
  school       TEXT,                          -- '' = shown to all schools
  class_name   TEXT,                          -- '' = shown to all classes; may be a single grade or a range like '9-12'
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_science_questions_category ON science_questions (category);
CREATE INDEX IF NOT EXISTS idx_science_questions_class    ON science_questions (class_name);

-- ---------- REGISTERED STUDENTS (student <-> exam registration link) ----------
CREATE TABLE IF NOT EXISTS registered_students (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  exam_id       UUID REFERENCES exams(id) ON DELETE CASCADE,
  registered_by TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, exam_id)
);

-- ---------- REFRESH TOKENS (for auth session revocation) ----------
CREATE TABLE IF NOT EXISTS refresh_tokens (
  token      TEXT PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
