// ============================================================
// Shared validation for identity fields collected from students
// (full name, school name, school address) at sign-in / exam time.
//
// Goal: block obviously-fake placeholder input ("abc", "xyz", "test",
// keyboard mashing, repeated characters) without being so strict that
// real names/addresses get rejected. This is a heuristic filter, not
// a verified-identity check — it catches lazy junk, not determined
// fraud.
// ============================================================

// Common placeholder / filler values people type when a field is
// required but they don't want to bother. Matched against the fully
// trimmed + lowercased value, so "ABC" / " abc " / "Abc" all match.
const JUNK_VALUES = new Set([
  'abc', 'abcd', 'abcde', 'abcdef', 'xyz', 'xyzabc', 'abc xyz', 'abcxyz',
  'test', 'testing', 'test123', 'sample', 'demo', 'dummy', 'example',
  'asdf', 'asdfgh', 'asdfghjkl', 'qwerty', 'qwertyuiop', 'zxcv',
  'na', 'n/a', 'none', 'nil', 'nothing', 'null', 'undefined',
  'xx', 'xxx', 'xxxx', 'xxxxx', 'pending', 'tbd', 'unknown', 'fake',
  'random', 'blah', 'foo', 'bar', 'foobar', 'lorem', 'lorem ipsum',
  '123', '1234', '12345', '123456', 'school', 'address', 'name',
  'my school', 'myschool', 'your school', 'school name', 'first last',
  'first name', 'last name', 'student name', 'full name'
]);

function normalize(str) {
  return (str || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

// Catches "aaaaaa", "xxxxxxxx", "111111" etc. (ignoring spaces/punctuation).
function isRepeatedChar(str) {
  const stripped = str.replace(/[^a-z0-9]/gi, '');
  return stripped.length >= 3 && /^(.)\1+$/.test(stripped);
}

// Catches straight keyboard-row mashing like "qwertyuiop", "asdfghjkl".
const KEYBOARD_RUNS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm', '1234567890'];
function isKeyboardMash(str) {
  const stripped = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
  if (stripped.length < 4) return false;
  return KEYBOARD_RUNS.some(run => run.includes(stripped) || stripped.includes(run.slice(0, 4)));
}

/**
 * Validates a person's full name.
 * Returns an error message string if invalid, or null if valid.
 */
function validateHumanName(raw) {
  const v = (raw || '').trim();
  if (v.length < 3) return 'Please enter your full name (at least 3 characters).';
  if (v.length > 80) return 'That name looks too long — please double-check it.';

  const norm = normalize(v);
  if (JUNK_VALUES.has(norm)) return 'Please enter your real full name, not a placeholder.';
  if (isRepeatedChar(norm)) return 'Please enter your real full name.';
  if (isKeyboardMash(norm)) return 'Please enter your real full name.';

  if (!/^[a-zA-Z][a-zA-Z .'-]*$/.test(v)) {
    return 'Name can only contain letters, spaces, and . \' -';
  }
  // A name that's almost entirely non-letters (after allowed punctuation) is suspicious.
  const letters = (v.match(/[a-zA-Z]/g) || []).length;
  if (letters < 3) return 'Please enter your real full name.';

  return null;
}

/**
 * Validates a school name. Slightly more permissive on characters
 * (schools legitimately use &, numbers, commas) but still blocks junk.
 */
function validateSchoolName(raw) {
  const v = (raw || '').trim();
  if (v.length < 5) return 'Please enter the full school name (at least 5 characters).';
  if (v.length > 150) return 'That school name looks too long — please double-check it.';

  const norm = normalize(v);
  if (JUNK_VALUES.has(norm)) return 'Please enter your real school name, not a placeholder.';
  if (isRepeatedChar(norm)) return 'Please enter your real school name.';
  if (isKeyboardMash(norm)) return 'Please enter your real school name.';

  const letters = (v.match(/[a-zA-Z]/g) || []).length;
  if (letters < 4) return 'Please enter a valid school name.';

  return null;
}

/**
 * Validates a school address. Addresses are free-form, so this just
 * enforces a sane minimum length/content and blocks junk — it does
 * NOT verify the address is real (no geocoding here).
 */
function validateAddress(raw) {
  const v = (raw || '').trim();
  if (v.length < 10) {
    return "Please enter the school's full address (street/area, city, state) — at least 10 characters.";
  }
  if (v.length > 250) return 'That address looks too long — please double-check it.';

  const norm = normalize(v);
  if (JUNK_VALUES.has(norm)) return 'Please enter the real school address, not a placeholder.';
  if (isRepeatedChar(norm)) return 'Please enter the real school address.';
  if (isKeyboardMash(norm)) return 'Please enter the real school address.';

  const letters = (v.match(/[a-zA-Z]/g) || []).length;
  if (letters < 6) return 'Please enter a valid address.';

  // Addresses that are a single word (no space at all) are almost always junk
  // ("abcdefghij") rather than a real address, which normally has multiple parts.
  if (!/\s/.test(v)) return "Please enter the school's full address, including area/city.";

  return null;
}

/**
 * Normalizes an address into a comparison key so that formatting/punctuation
 * differences ("Sector-8, Ambala" vs "sector 8 ambala") don't create separate
 * groups. This is intentionally simple (no geocoding) — exact-ish text match
 * after stripping punctuation/case/extra whitespace. Addresses that differ
 * more substantially (abbreviations, missing PIN code, typos) will NOT match
 * automatically and are exactly what the Admin merge tool is for.
 */
function normalizeAddressKey(addr) {
  return (addr || '')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')   // strip punctuation
    .replace(/\s+/g, ' ')
    .trim();
}

module.exports = {
  validateHumanName,
  validateSchoolName,
  validateAddress,
  normalizeAddressKey,
};
