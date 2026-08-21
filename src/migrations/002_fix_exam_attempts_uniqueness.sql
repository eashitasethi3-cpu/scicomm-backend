-- ============================================================
-- Fixes exam_attempts so different students don't overwrite each
-- other's results. Safe to run on the existing Railway database —
-- does not delete any current rows.
--
-- Root cause: every student authenticates through ONE shared login
-- (student@scicomm.in), so student_id was identical for every
-- student. The old UNIQUE (exam_id, student_id) constraint meant
-- only ONE attempt could ever exist per exam — each new student's
-- submission silently overwrote the previous student's row.
-- ============================================================

-- 1. Drop the old constraint that collapsed every student into one row per exam.
ALTER TABLE exam_attempts DROP CONSTRAINT IF EXISTS exam_attempts_exam_id_student_id_key;

-- 2. Allow exam_id to be null (needed for non-exam surveys like the S.A.S,
--    which has no row in the `exams` table) and add a slug column for those.
ALTER TABLE exam_attempts ALTER COLUMN exam_id DROP NOT NULL;
ALTER TABLE exam_attempts ADD COLUMN IF NOT EXISTS exam_slug TEXT;
ALTER TABLE exam_attempts ADD CONSTRAINT exam_attempts_has_exam_ref
  CHECK (exam_id IS NOT NULL OR exam_slug IS NOT NULL);

-- 3. Add the real per-student identity key (roll no + school + name), and
--    backfill it for any existing rows from their stored student details.
ALTER TABLE exam_attempts ADD COLUMN IF NOT EXISTS submission_key TEXT;
UPDATE exam_attempts
SET submission_key = LOWER(TRIM(COALESCE(roll_no, '') || '|' || COALESCE(school, '') || '|' || COALESCE(student_name, '')))
WHERE submission_key IS NULL;
ALTER TABLE exam_attempts ALTER COLUMN submission_key SET NOT NULL;

-- 4. New uniqueness rule: one attempt per real student (by submission_key) per
--    exam/survey (by exam_id or exam_slug), instead of per shared login id.
CREATE UNIQUE INDEX IF NOT EXISTS idx_attempts_unique
  ON exam_attempts (COALESCE(exam_id::text, exam_slug), submission_key);
