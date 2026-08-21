require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

async function run() {
  const sql = fs.readFileSync(
    path.join(__dirname, 'migrations', '002_fix_exam_attempts_uniqueness.sql'),
    'utf8'
  );
  console.log('Applying exam_attempts fix-up migration...');
  await pool.query(sql);
  console.log('✅ Migration applied. Different students will no longer overwrite each other\'s results.');
  await pool.end();
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
