# LearnSphere — Student/Admin Course Management System

Two folders, one project:

```
learnsphere-app/
  backend/     Node.js API (zero external dependencies)
  frontend/    React + React Router site (Vite)
```

The old plain-HTML version has been fully replaced by the React app in
`frontend/` — there's no separate static copy kept around anymore, so
there's nothing duplicated between the two folders.

## 1. Requirements

- [Node.js](https://nodejs.org) v18 or newer (includes npm)

## 2. Running it — day-to-day development

Two terminals:

**Terminal 1 — backend (the API):**
```bash
cd backend
node server.js
```
No `npm install` needed here — the backend has zero dependencies, it's
built entirely on Node's own built-in modules. Leave it running on
`http://localhost:3000`.

**Terminal 2 — frontend (the site):**
```bash
cd frontend
npm install
npm run dev
```
Open the URL it prints — normally `http://localhost:5173`. Vite
automatically forwards any `/api/...` call to the backend on port 3000
(see `frontend/vite.config.js`), so the browser only ever talks to one
address and logins/sessions work normally.

> **About that `npm install`:** this is the one place in the project that
> does pull in a real number of packages — Vite + React + React Router is
> a genuine frontend build toolchain, so its `node_modules` will be
> bigger than the backend's (which has none at all). That's expected and
> is a different situation from the earlier Express bloat — there's no
> way to get React Router-based routing without a build tool like Vite
> somewhere in the picture.

## 3. Running it — one single server (no separate dev servers)

If you'd rather run **one** thing instead of two terminals — e.g. to hand
someone a build, or just to keep it simple day-to-day — build the
frontend once, then let the backend serve it:

```bash
cd frontend
npm install
npm run build
cd ../backend
node server.js
```
Now everything is on `http://localhost:3000` — the backend serves the
built React app *and* the API from the same address. Re-run
`npm run build` any time you change something in `frontend/`.

## 4. Demo accounts

**Student**
| Email | Password |
|---|---|
| aarav@example.com | password123 |
| sneha@example.com | password123 |
| rahul@example.com | password123 |
| priya@example.com | password123 |
| meera@example.com | password123 |

**Admin**
| Email | Password |
|---|---|
| admin@learnsphere.com | admin123 |

You can also register a new student, or a new admin (Admin Login →
"Register here", invite code **`LEARNSPHERE2026`** — change
`ADMIN_INVITE_CODE` at the top of `backend/server.js` to set your own).

## 5. What's inside

**`backend/`** — a single-file Node HTTP server (`server.js`) with a
mini router built on Node's own `http` module (no Express, no
cookie-parser — genuinely zero packages to install):
- Student/admin registration & login, session cookies
- A real course learning path: modules (reading + a video lesson) →
  final quiz → certificate on passing (`data/courseContent.json`)
- Admin dashboard data: every registered student and their live progress
- Forgot-password as a 6-digit one-time code (no email server needed —
  the code is shown directly on the page for this demo)
- Change-password while logged in (session-based, separate from the
  code-based reset flow)
- `data/db.json` is the "database" — plain JSON, read/written with `fs`

**`frontend/`** — a React + React Router site, converted page-for-page
from the original HTML:
```
frontend/
  index.html                Loads Bootstrap/icons/fonts/theme once, globally
  vite.config.js             Dev-server proxy: /api -> http://localhost:3000
  public/
    css/theme.css, page-extras.css
    legacy/js/                The original vanilla-JS files, unchanged —
                                api.js, login.js, student-dashboard.js, etc.
                                still do all the real work (fetch calls,
                                DOM updates, form handling)
  src/
    main.jsx, App.jsx          Routes for every page (+ .html aliases, since
                                the legacy scripts still navigate with
                                window.location.href = "student-dashboard.html")
    components/
      LegacyScripts.jsx         Loads the legacy/js files against the
                                  React-rendered page, once, in order
      CourseCard.jsx             Reusable course card (Home page)
    pages/
      Home, Login, Register, AdminLogin, AdminRegister,
      StudentDashboard, AdminDashboard, CoursePlayer,
      ForgotPassword, AccountSettings
```

Every page's routing works two ways: `<Link>` for in-app navigation, and
the original `.html`-suffixed paths still resolve correctly for the
legacy scripts' own `window.location.href` redirects — nothing in
`legacy/js/` had to be rewritten to make routing work.

## 6. Notes for going further

- Sessions and password-reset codes live in memory in `server.js` —
  restarting the backend logs everyone out. Fine for local/demo use; for
  production, back these with Redis or a database table.
- `db.json`/`courseContent.json` are plain JSON files — swap the
  `readDB()`/`writeDB()` functions in `server.js` for real database calls
  when you outgrow local file storage.
- Passwords are hashed with `scrypt` (Node's built-in `crypto`).
