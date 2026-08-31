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

-- Lets Admin open a test for registration/entry while still holding back the
-- actual question content until a specific synchronized moment (e.g. "open
-- now, but don't show questions to any student until 2:45 PM"). NULL means
-- no holdback — questions are visible as soon as status = 'open', same as
-- before this column existed.
ALTER TABLE exams ADD COLUMN IF NOT EXISTS reveal_at TIMESTAMPTZ;

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
  -- How many seconds the student spent from opening the exam/survey to submitting it.
  time_taken_seconds INT,
  -- Identifies the actual individual student who took the exam, independent of
  -- which login account made the request. Needed because every student signs
  -- in through ONE shared account (student@scicomm.in), so student_id above is
  -- identical for every student and cannot be used to tell them apart.
  submission_key  TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (exam_id IS NOT NULL OR exam_slug IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_attempts_exam ON exam_attempts (exam_id);

-- Safety net for databases that already had an exam_attempts table before this
-- version of the schema (e.g. the live Railway DB): adds any columns/rules
-- that a plain CREATE TABLE IF NOT EXISTS would have skipped, so this file can
-- be re-run safely no matter what order it runs in relative to other migrations.
ALTER TABLE exam_attempts ALTER COLUMN exam_id DROP NOT NULL;
ALTER TABLE exam_attempts ADD COLUMN IF NOT EXISTS exam_slug TEXT;
ALTER TABLE exam_attempts ADD COLUMN IF NOT EXISTS submission_key TEXT;
ALTER TABLE exam_attempts ADD COLUMN IF NOT EXISTS time_taken_seconds INT;
UPDATE exam_attempts
SET submission_key = LOWER(TRIM(COALESCE(roll_no, '') || '|' || COALESCE(school, '') || '|' || COALESCE(student_name, '')))
WHERE submission_key IS NULL;
ALTER TABLE exam_attempts ALTER COLUMN submission_key SET NOT NULL;
ALTER TABLE exam_attempts DROP CONSTRAINT IF EXISTS exam_attempts_exam_id_student_id_key;
ALTER TABLE exam_attempts DROP CONSTRAINT IF EXISTS exam_attempts_has_exam_ref;
ALTER TABLE exam_attempts ADD CONSTRAINT exam_attempts_has_exam_ref
  CHECK (exam_id IS NOT NULL OR exam_slug IS NOT NULL);

-- One attempt per real student per exam/survey. Uses an expression index (rather
-- than a plain UNIQUE column list) so it works whether the attempt is tied to a
-- real exam_id or to a text exam_slug like 'science-attitude'.
CREATE UNIQUE INDEX IF NOT EXISTS idx_attempts_unique
  ON exam_attempts (COALESCE(exam_id::text, exam_slug), submission_key);

-- The physical address of the school a student typed at exam/survey time.
-- Required going forward (enforced in the API layer, not a NOT NULL here,
-- so older rows recorded before this column existed don't break). Used
-- together with `school` to auto-group the same physical school in the
-- Archive even when the name is typed in full vs. shortened.
ALTER TABLE exam_attempts ADD COLUMN IF NOT EXISTS school_address TEXT;

-- ---------- SCHOOL GROUPS (Admin-managed merge of duplicate school entries) ----------
-- Lets Admin explicitly say "these different typed name/address variants are
-- actually the same physical school" when automatic address-text matching
-- doesn't catch it (typos, very different phrasing, abbreviations in the
-- address itself, missing PIN code, etc.). Automatic matching (same
-- normalized address) already handles the common "full name vs short name"
-- case without needing a manual merge at all.
CREATE TABLE IF NOT EXISTS school_groups (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_name     TEXT NOT NULL,
  canonical_address  TEXT NOT NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Each row maps one "raw" normalized-address key (as typed by students, one
-- key per distinct normalized address text) to the school_groups entry Admin
-- decided it belongs to. Looked up at Archive-render time to fold that raw
-- key's attempts into the merged group instead of its own bucket.
CREATE TABLE IF NOT EXISTS school_aliases (
  raw_key         TEXT PRIMARY KEY,
  group_id        UUID NOT NULL REFERENCES school_groups(id) ON DELETE CASCADE,
  sample_name     TEXT,
  sample_address  TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- GALLERY IMAGES (public site photo gallery, admin-managed) ----------
CREATE TABLE IF NOT EXISTS gallery_images (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url          TEXT NOT NULL,       -- e.g. '/uploads/<filename>', served by the backend's static /uploads route
  uploaded_by  UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

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
