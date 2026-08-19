# SCICOMM Backend

A real backend + PostgreSQL database for the SCICOMM Scientific Rating Platform, replacing the
original `localStorage`-only version. Built with Node.js, Express, and PostgreSQL.

## What changed vs. the original app

| Original (`localStorage`) | This backend |
|---|---|
| Data lives only in one browser | Shared PostgreSQL database, accessible from any device |
| Plaintext passwords | Passwords hashed with bcrypt (12 rounds) |
| No real authentication | JWT access tokens (2h) + refresh tokens (30 days) |
| Anyone can read/write anything via devtools | Role-based access control enforced server-side (student/teacher/school/principal/admin) |
| Exam correct answers sent to every student's browser | Correct answers stripped from the API response for students |
| Exam score computed client-side (spoofable) | Score computed server-side from the stored answer key |
| Exam papers stored as giant base64 strings in `localStorage` | Uploaded as real files, served from `/uploads/<file>` |
| No backups | Postgres, easy to back up / point at a managed provider |

## Project layout

```
src/
  index.js          — Express app entry point
  db.js             — PostgreSQL connection pool
  schema.sql         — Full database schema
  migrate.js         — Applies schema.sql to DATABASE_URL
  seed.js             — Loads the same demo data the original app shipped with
  middleware/auth.js — JWT verification + role guards
  routes/
    auth.js           — register / login / student-login / refresh / logout / me
    users.js           — admin user management
    ratings.js          — the rating feed (create/list/vote/delete)
    exams.js             — exam CRUD
    examAttempts.js       — exam submission + admin-only results
    settings.js            — shared student password etc.
    uploads.js               — exam paper file upload
```

## 1. Run it locally

Requires Node 18+ and a PostgreSQL database (local install, or a free one from Render/Railway/Supabase).

```bash
cd scicomm-backend
cp .env.example .env
# edit .env: set DATABASE_URL to your Postgres connection string,
# and JWT_SECRET to a random string (openssl rand -hex 32)

npm install
npm run migrate   # creates all tables
npm run seed       # loads demo users + ratings (same as the original app's seed data)
npm start           # starts the API on http://localhost:4000
```

Check it's alive: `curl http://localhost:4000/api/health`

Demo admin login after seeding: `admin@scicomm.in` / whatever you set `SEED_ADMIN_PASSWORD` to
in `.env` (defaults to `admin@123` — **change this immediately in any real deployment**).

## 2. Deploy to Render (recommended, has a free tier)

1. Push this `scicomm-backend` folder to a GitHub repo.
2. In the Render dashboard: **New → Blueprint**, point it at the repo. Render reads `render.yaml`
   and provisions both the web service and a managed Postgres database automatically.
3. Render will ask you to set `SEED_ADMIN_PASSWORD` (marked `sync: false` in the blueprint) —
   pick a strong password.
4. After the first deploy, open the Render **Shell** for the web service and run:
   ```bash
   npm run migrate
   npm run seed
   ```
5. Your API is live at `https://scicomm-api.onrender.com` (or whatever Render names it).
6. Update `CORS_ORIGIN` in the Render dashboard to your actual frontend domain once you know it
   (comma-separated if you have more than one), instead of `*`.

**Note on file uploads on Render's free tier:** the filesystem is ephemeral — anything in
`/uploads` is wiped on redeploy or restart. For exam paper uploads to survive long-term, swap the
`multer` disk storage in `src/routes/uploads.js` for an S3-compatible bucket (Render, Cloudflare
R2, and AWS S3 all work) or upgrade to a Render paid plan with a persistent disk. I can wire this
up if you want — just say the word.

### Alternative: Railway / Fly.io
Same idea — provision a Postgres addon, set `DATABASE_URL` and `JWT_SECRET` as env vars, run
`npm run migrate && npm run seed` once, then `npm start`.

## 3. Connect your existing HTML frontend

The frontend currently reads/writes everything through two functions:
```js
function getDB() { return JSON.parse(localStorage.getItem(DB_KEY)) || {...}; }
function saveDB(db) { localStorage.setItem(DB_KEY, JSON.stringify(db)); }
```
To use this backend for real, those calls need to become `fetch()` calls to the API below
(with a JWT attached), instead of reading/writing `localStorage`. This is a genuine rewrite of
~40 call sites in the 4,000-line HTML file — I did **not** touch your HTML file yet, since doing
that safely means going through the login, rating, exam, and admin flows one at a time and
testing each. Happy to do that next as a follow-up — just say "wire up the frontend" and I'll do
the full integration.

In the meantime, here's the shape every future call takes:

```js
const API = 'https://scicomm-api.onrender.com';
let accessToken = localStorage.getItem('scicomm_token'); // only the token, not the data, lives client-side

async function api(path, options = {}) {
  const res = await fetch(API + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers
    }
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
  return res.json();
}

// login
const { user, accessToken: token } = await api('/api/auth/login', {
  method: 'POST', body: JSON.stringify({ email, password })
});
accessToken = token;
localStorage.setItem('scicomm_token', token);
```

## API reference

All endpoints are prefixed `/api`. Send `Authorization: Bearer <accessToken>` for anything
marked 🔒.

### Auth
| Method | Path | Notes |
|---|---|---|
| POST | `/auth/register` | student / teacher / school / principal only (not admin) |
| POST | `/auth/login` | |
| POST | `/auth/student-login` | shared student password flow |
| POST | `/auth/refresh` | exchange a refresh token for a new access token |
| POST | `/auth/logout` | revokes a refresh token |
| GET  | `/auth/me` 🔒 | current user |

### Ratings
| Method | Path | Notes |
|---|---|---|
| GET | `/ratings?category=&school=&student=` | public |
| GET | `/ratings/:id` | public |
| POST | `/ratings` 🔒 | teacher/admin only |
| PATCH | `/ratings/:id/vote` | public, +1 vote |
| DELETE | `/ratings/:id` 🔒 | admin or original author |

### Exams
| Method | Path | Notes |
|---|---|---|
| GET | `/exams` 🔒 | students get questions **without** `correct` answers |
| GET | `/exams/:id` 🔒 | |
| POST | `/exams` 🔒 | teacher/admin |
| PATCH | `/exams/:id` 🔒 | teacher/admin (duration/status/class) |
| DELETE | `/exams/:id` 🔒 | teacher/admin |

### Exam attempts
| Method | Path | Notes |
|---|---|---|
| POST | `/exam-attempts` 🔒 | student submits answers; **server** grades it |
| GET | `/exam-attempts?examId=` 🔒 | admin only |

### Users
| Method | Path | Notes |
|---|---|---|
| GET | `/users?role=` 🔒 | admin only |
| GET | `/users/:id` 🔒 | self or admin |
| PATCH | `/users/:id` 🔒 | self or admin |
| DELETE | `/users/:id` 🔒 | admin |

### Settings
| Method | Path | Notes |
|---|---|---|
| GET | `/settings` 🔒 | admin/teacher |
| PATCH | `/settings` 🔒 | admin only, e.g. `{ "studentPassword": "new" }` |

### Uploads
| Method | Path | Notes |
|---|---|---|
| POST | `/uploads/exam-paper` 🔒 | teacher/admin, multipart `file` field, returns `{ name, url }` |

### Science questions (Scientific Attitude survey question bank)
| Method | Path | Notes |
|---|---|---|
| GET | `/science-questions?school=&className=` 🔒 | fields: `{ id, text, type, category, image, school, className }` |
| GET | `/science-questions/:id` 🔒 | |
| POST | `/science-questions` 🔒 | teacher/admin, create one |
| PUT | `/science-questions/:id` 🔒 | teacher/admin, update one |
| PUT | `/science-questions/bulk` 🔒 | teacher/admin, body `{ questions: [...] }` — items with a matching existing `id` are updated, everything else is inserted |
| DELETE | `/science-questions/:id` 🔒 | teacher/admin |

### Registered students (student ↔ exam registration link)
| Method | Path | Notes |
|---|---|---|
| GET | `/registered-students?studentId=&examId=` 🔒 | fields: `{ id, studentId, examId }` |
| POST | `/registered-students` 🔒 | body `{ studentId, examId }` — students may only register themselves |
| DELETE | `/registered-students/:id` 🔒 | |

## Security notes

- Passwords are hashed with bcrypt; nothing plaintext touches the database.
- JWTs are short-lived (2h); refresh tokens are stored server-side so they can be revoked.
- Exam correct-answers never reach a student's browser, and scores are computed server-side —
  the original app trusted the client's own score calculation, which anyone could edit in devtools.
- Rate limiting is applied to `/api/auth/*` to slow down brute-force login attempts.
- Change `SEED_ADMIN_PASSWORD` and `JWT_SECRET` before any real deployment — the values in
  `.env.example` are placeholders only.
