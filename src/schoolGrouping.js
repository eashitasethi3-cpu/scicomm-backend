// ============================================================
// Groups exam_attempts rows into "the same physical school", so
// that the same school submitting under slightly different name
// spellings (full name vs short name, punctuation differences, etc.)
// shows up as ONE entry in the Archive instead of several.
//
// Two layers, in order of precedence:
//   1. Admin merges (school_groups / school_aliases tables) — explicit,
//      always wins, handles cases text-matching can't (typos, very
//      different phrasing, missing PIN code, etc.)
//   2. Automatic address-based matching — attempts whose school_address
//      normalizes to the same text are grouped together automatically,
//      even if the typed school NAME differs (full vs short form).
// ============================================================

const db = require('./db');
const { normalizeAddressKey } = require('./validation');

// Academic-session label (India-style, April–March), mirrors the frontend's
// academicYearOf() so year filtering lines up between admin and public views.
function academicYearOf(dateInput) {
  const d = new Date(dateInput);
  if (isNaN(d)) return null;
  const y = d.getFullYear();
  const m = d.getMonth() + 1; // 1-12
  const startYear = m >= 4 ? y : y - 1;
  return startYear + '-' + String(startYear + 1).slice(-2);
}

// Returns Map(rawKey -> { groupId, canonicalName, canonicalAddress }) for
// every raw school-address key an Admin has explicitly merged into a group.
async function getSchoolAliasMap() {
  const result = await db.query(
    `SELECT sa.raw_key, sa.group_id, sg.canonical_name, sg.canonical_address
     FROM school_aliases sa
     JOIN school_groups sg ON sg.id = sa.group_id`
  );
  const map = new Map();
  for (const row of result.rows) {
    map.set(row.raw_key, {
      groupId: row.group_id,
      canonicalName: row.canonical_name,
      canonicalAddress: row.canonical_address,
    });
  }
  return map;
}

// Groups a flat list of attempt rows (each with .school / .school_address /
// .pct / .created_at etc.) into per-school buckets.
// Returns an array of { key, name, address, attempts: [...] }.
function groupAttempts(attempts, aliasMap) {
  const groups = new Map();

  for (const a of attempts) {
    const address = a.school_address || a.schoolAddress || '';
    const rawKey = normalizeAddressKey(address) || normalizeAddressKey(a.school || 'unknown school');
    const alias = aliasMap.get(rawKey);

    const key = alias ? 'g:' + alias.groupId : 'a:' + rawKey;
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        name: alias ? alias.canonicalName : (a.school || 'Unknown School'),
        address: alias ? alias.canonicalAddress : address,
        attempts: [],
      });
    }
    const g = groups.get(key);
    g.attempts.push(a);

    // For non-aliased groups, prefer the longest school-name variant seen as
    // the representative display name (a reasonable proxy for "the full name"
    // vs an abbreviation, since abbreviations are almost always shorter).
    if (!alias && a.school && a.school.trim().length > (g.name || '').length) {
      g.name = a.school.trim();
    }
  }

  return [...groups.values()];
}

function avg(nums) {
  const vals = nums.filter(n => typeof n === 'number' && !isNaN(n));
  if (!vals.length) return 0;
  return Math.round(vals.reduce((s, n) => s + n, 0) / vals.length);
}

module.exports = { academicYearOf, getSchoolAliasMap, groupAttempts, avg };
