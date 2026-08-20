// purge-default-questions.js
//
// One-time cleanup script: permanently deletes the auto-seeded "default"
// science questions (the 6 starter statements, the "Scientific careers..."
// illustration question, and the 39-statement survey bank) from the
// science_questions table.
//
// Run this ONCE, on the same machine/environment where DATABASE_URL points
// at your Railway Postgres instance (same setup as seed.js / migrate.js).
//
//   node purge-default-questions.js
//
// It only deletes rows whose text matches one of the known default
// statements below (case/whitespace-insensitive exact match) — any
// question an Admin has actually written stays untouched.
//
// Pair this with the updated scicomm-website-fixed.html, which disables
// the auto-reseeding logic, so these won't come back after this runs.

require('dotenv').config();
const db = require('./db');

const DEFAULT_TEXTS = [
  // Starter bank
  'I enjoy conducting experiments to test my own ideas.',
  'Plants play a vital role in balancing our ecosystem.',
  'Understanding atoms helps me make sense of the world around me.',
  'I am curious about how the planets and the solar system work.',
  'The water cycle explains why rain keeps returning to Earth.',
  'Electricity and energy are essential to modern scientific progress.',
  // Career illustration question
  'Scientific careers are more useful for the advancement of society.',
  // Rationality
  'Traditional society hampers the growth of science.',
  'Science is suitable for all students regardless of gender.',
  'Studying science is not everybody\u2019s cup of tea.',
  'Traditional beliefs should be accepted even when they are against scientific research.',
  'Studying science subjects enhances our intellect.',
  'Scientists do not live a normal family life.',
  // Open-mindedness
  'Science makes us dependent on machines.',
  'Sharing knowledge with others is harmful.',
  'Any new idea can be criticized in the absence of facts.',
  'Science subjects have infinite opportunities.',
  'Science is responsible for low moral standards.',
  'Positive criticism is useful for the advancement of knowledge.',
  'The opinion of a novice (new or inexperienced person) should be rejected even if supported by evidence.',
  'Scientific advancements have only adverse effects on mankind.',
  'Study of science helps in generating new ideas.',
  'One may feel offended by a person who has different thinking.',
  // Confidence in Scientific Method
  'Enough evidence should be collected before accepting an idea.',
  'Testing of knowledge should follow proper procedures.',
  'One should be honest and truthful in collecting and recording data.',
  'Data can be manipulated according to need.',
  'One should suspend decision in the absence of sufficient data.',
  'The known is the basis for knowing the unknown.',
  'A questioning attitude helps in defining a problem.',
  'Any hypothesis should be accepted or rejected on the basis of sufficient evidence.',
  'Knowledge should be considered tentative.',
  // Curiosity
  'One should explore the unknown.',
  'There is no conclusion that is final or ultimate.',
  'There is a scientific cause for everything that takes place in this world.',
  'To conduct enquiry is the task of scientists and not of common people.',
  'One should be interested in knowing the \u201cwhy\u201d of natural phenomena.',
  'One should search for reality behind appearances.',
  // Aversion to Superstition
  'A scientist should report discoveries even if they contradict religion.',
  'Use of lemon and green chilies protects from the evil eye.',
  'Ghosts exist.',
  'For solving a problem, one should consult an astrologer.',
  'There is nothing like fate; a person makes his or her own fate.',
  'Praying or reciting mantras before an exam helps to score more marks.',
  'If a black cat crosses one\u2019s path, it brings bad luck.',
];

// Mirrors the frontend's sqNormalizeText(): lowercase, strip curly/straight
// quotes and punctuation, collapse whitespace — so this matches rows even
// if punctuation/quote characters drifted slightly.
function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[\u2018\u2019\u201c\u201d'"]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function purge() {
  const client = db.pool;
  const { rows } = await client.query('SELECT id, text FROM science_questions');

  const targets = new Set(DEFAULT_TEXTS.map(normalize));
  const toDelete = rows.filter(r => targets.has(normalize(r.text)));

  if (!toDelete.length) {
    console.log('No matching default questions found — nothing to delete.');
  } else {
    console.log(`Deleting ${toDelete.length} default question(s):`);
    for (const row of toDelete) {
      console.log(`  - [${row.id}] ${row.text}`);
      await client.query('DELETE FROM science_questions WHERE id = $1', [row.id]);
    }
    console.log('✅ Done.');
  }

  // Also clear the (now-unused, but harmless to reset) seeding flags so
  // nothing downstream mistakenly thinks default content is pending.
  await client.query(
    `UPDATE settings SET value = 'true'
     WHERE key IN ('scienceQuestionsSeeded','careerQuestionSeeded','surveyQuestionsSeeded')`
  );

  await client.end();
}

purge().catch((err) => {
  console.error('Purge failed:', err);
  process.exit(1);
});
