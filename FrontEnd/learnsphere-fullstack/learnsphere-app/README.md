# LearnSphere — Full-Stack Student/Admin Learning Platform

> **Update:** Rebuilt on **zero external dependencies** — no Express, no
> cookie-parser, nothing to download. It's pure Node.js now, so
> `npm install` has nothing to fetch and there's no bulky `node_modules`
> folder full of hundreds of files. See "Why no npm install?" below.

A student learning dashboard with a real Node.js backend: student
registration and login, an actual course learning path (modules + a graded
quiz) that unlocks a certificate on passing, an admin view of every
registered student's progress, admin registration, and a one-time-code
password reset flow — all backed by a simple JSON file database.

## 1. Requirements

- [Node.js](https://nodejs.org) v18 or newer — that's it, nothing else.

## 2. Run it

**No `npm install` needed.** Just run the server directly:

```bash
node server.js
```

Or, if you'd rather not touch a terminal at all:
- **Windows:** double-click `start.bat`
- **Mac/Linux:** double-click `start.sh` (or run `./start.sh` in Terminal)

Either way, once you see `LearnSphere server running`, open your browser to:

```
http://localhost:3000
```

## 2b. Why no `npm install`?

The earlier version used the Express framework plus a cookie-parsing
library. Express itself is small, but `npm install` also downloads every
package *those* packages depend on — which is where the "100+ files"
came from. This version replaces Express with a ~100-line router built
directly on Node's own `http` module (included with Node, nothing to
download), so the whole project is just the files you already have.
`npm install` still works if you run it — it will just say there's
nothing to install.

## 2c. About "another form, not just command prompt"

A real backend (one where a student's progress is saved and an admin can
see it from a different login) has to be *some* process listening for
requests — there's no way around running it, whether that's written in
JavaScript, Python, or anything else. What this version removes is the
**setup** step (no install, no package manager). Starting it is now just
one double-click (`start.bat` / `start.sh`) instead of typing two
commands — that's about as close to "no command prompt" as a real
multi-user backend can get.

If you'd instead prefer something that opens by literally double-clicking
an HTML file with **no server at all**, that's also possible — but it
means trading away the "admin sees real student data" feature, since
without a server there's no shared place for that data to live (it would
be per-browser only, using localStorage). Let me know if you'd rather
have that trade-off and I'll build that version instead.

One server serves both the front-end pages and the `/api/...` backend
routes from the same origin — no CORS issues, no second server to run.

## 3. Demo accounts

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

You can also register a brand-new student from the Register page, or a
brand-new **admin** from the Admin Login page → "Register here" (see
invite code below). Both are saved to `data/db.json` immediately.

**Admin invite code:** `LEARNSPHERE2026`
Anyone registering as an admin must enter this code — it's a simple
demo safeguard so random visitors can't self-promote to admin. Change
`ADMIN_INVITE_CODE` at the top of `server.js` to set your own.

## 4. The actual course-taking experience

Each of the 6 courses now has real content, not just a progress bar:

- **Learning path** — 3 modules per course (a mix of reading lessons and a
  video lesson). Click through them in order, read/watch, then
  "Mark Complete & Continue."
  - The video modules use a sample placeholder clip (clearly labeled as
    such) — swap `videoUrl` in `data/courseContent.json` for your own
    recorded lessons.
- **Final quiz** — unlocks once all modules are complete. 5 multiple-choice
  questions per course, need 60% to pass.
- **Certificate** — passing the quiz marks the course "Completed," shows a
  certificate on the student dashboard, and is what the admin dashboard
  counts as "Certificates Issued."
- Progress is weighted: modules make up 80% of the course (split evenly),
  the quiz is worth the final 20% — so progress only hits 100% after
  passing the quiz, not just finishing the reading.

All of this content lives in `data/courseContent.json` — add a course by
adding a new top-level key there whose name matches an entry in
`courseCatalog` inside `data/db.json`.

## 5. Password reset — now a code, not a link

Clicking a link that was supposedly "emailed" was confusing to test
locally, so this now works like a one-time-passcode (OTP) flow instead,
entirely on one page:

1. Enter your email on **Forgot Password** → a 6-digit code is generated.
2. Since there's no email server configured in this demo, the code is
   shown directly on the page (clearly marked as a demo stand-in for a
   real email/SMS).
3. Enter that code plus your new password, right there on the same page
   — no navigating to a separate link, so nothing to break.

Codes expire after 15 minutes. For changing your password while already
**logged in**, use the sidebar's "Account Settings" instead — that uses
your session, not a code, and is a completely separate flow.

## 6. What's actually wired up (API summary)

- `POST /api/register` — student sign-up
- `POST /api/login`, `POST /api/admin/login` — sign in, sets a secure
  session cookie
- `POST /api/admin/register` — admin sign-up, requires the invite code
- `GET /api/me` — who's currently logged in
- `POST /api/logout` — clears the session
- `GET /api/student/dashboard` — the logged-in student's real courses,
  progress, and stats
- `GET /api/courses/:course/content` — that course's modules + quiz
  questions (answers withheld) + the student's progress in it
- `POST /api/student/courses/:course/modules/:moduleId/complete` — marks
  a module done and recalculates progress
- `POST /api/student/courses/:course/quiz/submit` — grades the quiz,
  flips the course to "Completed" on a pass
- `GET /api/admin/overview` — totals, course-wise stats, and the full
  registered-students table, computed live from the same database
- `POST /api/forgot-password` — generates a reset code
- `POST /api/reset-password` — verifies the code and sets a new password
- `POST /api/change-password` — session-based password change (no code)

## 7. Project structure

```
learnsphere-app/
  server.js                 Pure Node.js HTTP server + all API routes (no dependencies)
  package.json
  start.bat                 Windows: double-click to run, no terminal typing needed
  start.sh                  Mac/Linux: double-click-equivalent starter
  data/
    db.json                 JSON "database" (students, admins, course catalog)
    courseContent.json      Modules + quiz questions for every course
  public/
    index.html
    css/theme.css
    js/
      api.js                 shared fetch helper, toasts, form helpers
      login.js
      register.js
      admin-login.js
      admin-register.js
      forgot-password.js
      account-settings.js
      student-dashboard.js
      admin-dashboard.js
      course-player.js
    pages/
      login.html
      register.html
      admin-login.html
      admin-register.html
      student-dashboard.html
      admin-dashboard.html
      course-player.html
      forgot-password.html
      account-settings.html
```

## 8. Notes for going further

- The "database" is two JSON files read/written with `fs`
  (`data/db.json` for accounts/enrollments, `data/courseContent.json`
  for course material). Dependency-free by design — swap `readDB()` /
  `writeDB()` in `server.js` for a real database when you're ready to
  go beyond local demo use.
- Sessions and reset codes live in in-memory `Map`s in `server.js`.
  Fine for local use, but restarting the server logs everyone out and
  clears any pending reset codes. For production, back these with
  Redis or a database table instead.
- Passwords are hashed with `scrypt` (Node's built-in `crypto`, no
  external dependency needed).
