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
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id         UUID REFERENCES exams(id) ON DELETE CASCADE, -- NULL for non-exam surveys (see exam_slug)
  exam_slug       TEXT,          -- e.g. 'science-attitude' for the S.A.S survey, which isn't a row in `exams`
  student_id      UUID REFERENCES users(id) ON DELETE SET NULL,
  student_name    TEXT,
  roll_no         TEXT,
  section         TEXT,
  school          TEXT,
  score           INT,
  total           INT,
  pct             INT,
  answers         JSONB DEFAULT '[]',
  -- Identifies the actual individual student who took the exam, independent of
  -- which login account made the request. Needed because every student signs
  -- in through ONE shared account (student@scicomm.in), so student_id above is
  -- identical for every student and cannot be used to tell them apart.
  submission_key  TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (exam_id IS NOT NULL OR exam_slug IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_attempts_exam ON exam_attempts (exam_id);
-- One attempt per real student per exam/survey. Uses an expression index (rather
-- than a plain UNIQUE column list) so it works whether the attempt is tied to a
-- real exam_id or to a text exam_slug like 'science-attitude'.
CREATE UNIQUE INDEX IF NOT EXISTS idx_attempts_unique
  ON exam_attempts (COALESCE(exam_id::text, exam_slug), submission_key);

-- ---------- SETTINGS (single row, key/value) ----------
CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

-- ---------- REFRESH TOKENS (for auth session revocation) ----------
CREATE TABLE IF NOT EXISTS refresh_tokens (
  token      TEXT PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
