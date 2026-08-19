require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./db');

async function seed() {
  const client = db.pool;

  // Default studentPassword setting
  await client.query(
    `INSERT INTO settings (key, value) VALUES ('studentPassword', '"scicomm2026"')
     ON CONFLICT (key) DO NOTHING`
  );

  const existingAdmin = await client.query("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
  if (existingAdmin.rows.length) {
    console.log('Admin already exists — skipping seed (DB already initialized).');
    await client.end();
    return;
  }

  const users = [
    { name: 'Dr. Neha Kapoor', email: 'neha.kapoor@scicomm.in', role: 'teacher', password: 'science@123', phone: '9876543210', address: '12 MG Road, Delhi' },
    { name: 'Rohan Sinha', email: 'rohan.sinha@scicomm.in', role: 'student', password: 'science@123', phone: '9123456789', address: '45 Lajpat Nagar, Delhi' },
    { name: 'Admin', email: 'admin@scicomm.in', role: 'admin', password: process.env.SEED_ADMIN_PASSWORD || 'admin@123', phone: '', address: '' },
    { name: 'Delhi Public School', email: 'dps@school.in', role: 'school', password: 'school@123', phone: '01123456789', address: 'Mathura Road, New Delhi - 110003', schoolName: 'Delhi Public School', principalName: 'Mr. Rajiv Sharma' },
    { name: 'Mr. Rajiv Sharma', email: 'principal@dps.in', role: 'principal', password: 'principal@123', phone: '9988776655', address: 'Mathura Road, New Delhi - 110003', schoolName: 'Delhi Public School' },
  ];

  const idByEmail = {};
  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 12);
    const result = await client.query(
      `INSERT INTO users (name, email, password_hash, role, phone, address, school_name, principal_name)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      [u.name, u.email, hash, u.role, u.phone || '', u.address || '', u.schoolName || null, u.principalName || null]
    );
    idByEmail[u.email] = result.rows[0].id;
  }

  const ratings = [
    { studentName: 'Priya Mehra', category: 'curiosity', topic: 'Quantum Biology Research Presentation', review: 'Priya demonstrated exceptional curiosity about quantum effects in biological systems. Her questions were insightful and showed deep reading beyond the syllabus.', stars: 5, curiosity: 9, attitude: 8, comm: 9, research: 8, innovation: 9, authorEmail: 'neha.kapoor@scicomm.in', school: 'Delhi Public School' },
    { studentName: 'Rahul Singh', category: 'attitude', topic: 'Lab Conduct & Scientific Rigor', review: 'Rahul maintains excellent scientific attitude — meticulous documentation, proper controls, and always questions assumptions.', stars: 4, curiosity: 7, attitude: 10, comm: 7, research: 8, innovation: 6, authorEmail: 'neha.kapoor@scicomm.in', school: 'Delhi Public School' },
    { studentName: 'Sneha Gupta', category: 'paper', topic: 'Machine Learning in Drug Discovery — Review Paper', review: 'Well-structured literature review with strong synthesis of multiple sources.', stars: 4, curiosity: 8, attitude: 7, comm: 8, research: 9, innovation: 7, authorEmail: 'admin@scicomm.in', school: '' },
    { studentName: 'Arjun Kapoor', category: 'tool', topic: 'Python Data Analysis Script for Chemistry Lab', review: 'Created a remarkably useful data pipeline for titration analysis.', stars: 5, curiosity: 8, attitude: 8, comm: 7, research: 7, innovation: 10, authorEmail: 'admin@scicomm.in', school: '' },
    { studentName: 'Meera Iyer', category: 'general', topic: 'Overall Semester Performance', review: 'Consistent performer across all scientific modules.', stars: 3, curiosity: 6, attitude: 8, comm: 5, research: 7, innovation: 6, authorEmail: 'neha.kapoor@scicomm.in', school: 'Delhi Public School' },
    { studentName: 'Priya Mehra', category: 'paper', topic: 'Bioluminescence in Deep Sea Organisms', review: 'A follow-up paper showing great improvement in academic writing.', stars: 5, curiosity: 10, attitude: 9, comm: 8, research: 9, innovation: 8, authorEmail: 'admin@scicomm.in', school: 'Delhi Public School' },
  ];

  for (const r of ratings) {
    const authorId = idByEmail[r.authorEmail];
    const authorRow = await client.query('SELECT name, role FROM users WHERE id = $1', [authorId]);
    const author = authorRow.rows[0];
    await client.query(
      `INSERT INTO ratings (student_name, category, topic, review, stars, curiosity, attitude, comm, research, innovation, author_id, author_name, author_role, school)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [r.studentName, r.category, r.topic, r.review, r.stars, r.curiosity, r.attitude, r.comm, r.research, r.innovation,
       authorId, author.name, author.role, r.school]
    );
  }

  console.log('✅ Seed complete. Admin login: admin@scicomm.in /', process.env.SEED_ADMIN_PASSWORD || 'admin@123');
  console.log('⚠️  Change the admin password immediately after first login in production.');
  await client.end();
}

seed().catch((err) => { console.error('Seed failed:', err); process.exit(1); });
