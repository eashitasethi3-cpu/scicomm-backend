// count-questions.js
// Quick check: how many rows are actually in science_questions right now.
// Run with: node src/count-questions.js

require('dotenv').config();
const db = require('./db');

async function count() {
  const result = await db.pool.query('SELECT id, text FROM science_questions ORDER BY created_at ASC');
  console.log(`Total questions in database: ${result.rows.length}`);
  result.rows.forEach((r, i) => console.log(`  ${i + 1}. [${r.id}] ${r.text}`));
  await db.pool.end();
}

count().catch((err) => {
  console.error('Count failed:', err);
  process.exit(1);
});
