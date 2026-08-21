/**
 * LearnSphere backend — ZERO external dependencies.
 * Uses only Node's built-in `http`, `fs`, `path`, `crypto`, `url` modules,
 * plus a ~70-line mini router/response-helper shim below so the route
 * handlers can stay written in a familiar Express-like style.
 *
 * Because there are no npm packages required, `npm install` has nothing
 * to download — you can even skip it and just run `node server.js`.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const DB_PATH = path.join(ROOT, 'data', 'db.json');
const CONTENT_PATH = path.join(ROOT, 'data', 'courseContent.json');

// Anyone registering as an admin must know this invite code first.
// Change it to whatever you like — it's just a simple demo safeguard.
const ADMIN_INVITE_CODE = 'LEARNSPHERE2026';

// =============================================================================
// Mini router / response-helper shim (replaces Express + cookie-parser)
// =============================================================================
const routes = []; // { method, regex, paramNames, handlers: [...] }

function registerRoute(method, pattern, handlers) {
    const paramNames = [];
    const regexStr = pattern
        .split('/')
        .map(segment => {
            if (segment.startsWith(':')) {
                paramNames.push(segment.slice(1));
                return '([^/]+)';
            }
            return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        })
        .join('/');
    routes.push({ method, regex: new RegExp(`^${regexStr}$`), paramNames, handlers });
}

const app = {
    get: (pattern, ...handlers) => registerRoute('GET', pattern, handlers),
    post: (pattern, ...handlers) => registerRoute('POST', pattern, handlers)
};

// Runs a chain of (req, res, next) middleware/handlers in order — this is
// what lets routes like app.get(path, requireAuth('student'), handler)
// actually apply the auth check before running the real handler.
function runChain(handlers, req, res) {
    let i = 0;
    function next() {
        const fn = handlers[i++];
        if (!fn) return; // chain ended without a response — shouldn't happen
        fn(req, res, next);
    }
    next();
}

function parseCookies(req) {
    const header = req.headers.cookie;
    const cookies = {};
    if (!header) return cookies;
    header.split(';').forEach(pair => {
        const idx = pair.indexOf('=');
        if (idx === -1) return;
        const key = pair.slice(0, idx).trim();
        const val = pair.slice(idx + 1).trim();
        cookies[key] = decodeURIComponent(val);
    });
    return cookies;
}

function readJsonBody(req) {
    return new Promise((resolve) => {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            if (data.length > 5 * 1024 * 1024) req.destroy(); // 5MB safety cap
        });
        req.on('end', () => {
            if (!data) return resolve({});
            try { resolve(JSON.parse(data)); }
            catch (e) { resolve({}); }
        });
        req.on('error', () => resolve({}));
    });
}

function enhanceResponse(res) {
    res._statusCode = 200;
    res.status = function (code) { res._statusCode = code; return res; };
    res.json = function (obj) {
        const body = JSON.stringify(obj);
        res.writeHead(res._statusCode, {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(body)
        });
        res.end(body);
    };
    res.cookie = function (name, value, opts = {}) {
        let str = `${name}=${encodeURIComponent(value)}; Path=/`;
        if (opts.httpOnly) str += '; HttpOnly';
        if (opts.sameSite) str += `; SameSite=${opts.sameSite.charAt(0).toUpperCase()}${opts.sameSite.slice(1)}`;
        if (opts.maxAge) str += `; Max-Age=${Math.floor(opts.maxAge / 1000)}`;
        appendSetCookie(res, str);
        return res;
    };
    res.clearCookie = function (name) {
        appendSetCookie(res, `${name}=; Path=/; Max-Age=0`);
        return res;
    };
    return res;
}

function appendSetCookie(res, cookieStr) {
    const existing = res.getHeader('Set-Cookie');
    if (!existing) {
        res.setHeader('Set-Cookie', [cookieStr]);
    } else if (Array.isArray(existing)) {
        res.setHeader('Set-Cookie', [...existing, cookieStr]);
    } else {
        res.setHeader('Set-Cookie', [existing, cookieStr]);
    }
}

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.mp4': 'video/mp4',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function serveStatic(req, res, pathname) {
    let filePath = path.join(PUBLIC_DIR, decodeURIComponent(pathname));

    // Prevent path traversal outside the public/ folder
    if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403);
        return res.end('Forbidden');
    }

    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
        }
        if (stats.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        fs.readFile(filePath, (readErr, content) => {
            if (readErr) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('404 Not Found');
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });
    });
}

// =============================================================================
// Tiny JSON "database" helpers
// =============================================================================
function readDB() {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}
function writeDB(db) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}
function readCourseContent() {
    return JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf-8'));
}

// =============================================================================
// Password hashing (Node's built-in crypto)
// =============================================================================
function hashPassword(password, salt) {
    salt = salt || crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}
function verifyPassword(password, stored) {
    const [salt, hash] = stored.split(':');
    const check = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(check, 'hex'));
}

// =============================================================================
// In-memory session store: token -> { role, id, expires }
// =============================================================================
const sessions = new Map();
const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

function createSession(role, id) {
    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, { role, id, expires: Date.now() + SESSION_TTL_MS });
    return token;
}
function getSession(token) {
    if (!token) return null;
    const s = sessions.get(token);
    if (!s) return null;
    if (Date.now() > s.expires) {
        sessions.delete(token);
        return null;
    }
    return s;
}
function destroySession(token) {
    sessions.delete(token);
}

// Password-reset codes: email -> { code, role, expires }
const resetCodes = new Map();
const RESET_TTL_MS = 1000 * 60 * 15; // 15 minutes

function requireAuth(role) {
    return (req, res, next) => {
        const session = getSession(req.cookies.ls_session);
        if (!session || (role && session.role !== role)) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        req.session = session;
        next();
    };
}

function setSessionCookie(res, token) {
    res.cookie('ls_session', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: SESSION_TTL_MS
    });
}

function courseCircumference() {
    // matches the SVG rings used on the frontend (r = 36)
    return 2 * Math.PI * 36;
}

function publicStudent(student) {
    const { passwordHash, ...rest } = student;
    return rest;
}

// Recompute a course enrollment's progress/status from its modules + quiz state.
// Modules are worth 80% of the total (split evenly), the quiz is worth the final 20%.
function recomputeCourseState(courseState, courseName) {
    const content = readCourseContent()[courseName];
    const totalModules = content ? content.modules.length : 0;
    const completedCount = (courseState.completedModules || []).length;

    const moduleProgress = totalModules ? (completedCount / totalModules) * 80 : 0;
    const quizProgress = courseState.quizPassed ? 20 : 0;
    const progress = Math.round(moduleProgress + quizProgress);

    courseState.progress = Math.min(100, progress);
    if (courseState.quizPassed) {
        courseState.status = 'Completed';
    } else if (completedCount > 0) {
        courseState.status = 'Active';
    } else {
        courseState.status = 'Not Started';
    }
    return courseState;
}

function makeEnrollment(courseName) {
    const state = {
        course: courseName,
        completedModules: [],
        quizPassed: false,
        quizScore: null,
        quizAttempts: 0,
        progress: 0,
        status: 'Not Started'
    };
    return recomputeCourseState(state, courseName);
}

// =============================================================================
// AUTH: Student register / login
// =============================================================================
app.post('/api/register', (req, res) => {
    const { name, email, password, degree, year, course } = req.body || {};

    if (!name || !email || !password || !degree || !year || !course) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const db = readDB();
    const emailLower = String(email).toLowerCase().trim();

    if (db.students.some(s => s.email.toLowerCase() === emailLower)) {
        return res.status(409).json({ error: 'An account with this email already exists.' });
    }
    if (!db.courseCatalog.includes(course)) {
        return res.status(400).json({ error: 'Please choose a valid course.' });
    }

    const newStudent = {
        id: 'stu_' + crypto.randomBytes(6).toString('hex'),
        name: name.trim(),
        email: emailLower,
        passwordHash: hashPassword(password),
        degree,
        year,
        createdAt: new Date().toISOString(),
        courses: [makeEnrollment(course)]
    };

    db.students.push(newStudent);
    writeDB(db);

    res.status(201).json({ message: 'Account created successfully.' });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const db = readDB();
    const emailLower = String(email).toLowerCase().trim();
    const student = db.students.find(s => s.email.toLowerCase() === emailLower);

    if (!student || !verifyPassword(password, student.passwordHash)) {
        return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = createSession('student', student.id);
    setSessionCookie(res, token);
    res.json({ message: 'Login successful', user: { name: student.name } });
});

// =============================================================================
// AUTH: Admin login / register
// =============================================================================
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const db = readDB();
    const emailLower = String(email).toLowerCase().trim();
    const admin = db.admins.find(a => a.email.toLowerCase() === emailLower);

    if (!admin || !verifyPassword(password, admin.passwordHash)) {
        return res.status(401).json({ error: 'Invalid admin credentials.' });
    }

    const token = createSession('admin', admin.id);
    setSessionCookie(res, token);
    res.json({ message: 'Login successful', user: { name: admin.name } });
});

app.post('/api/admin/register', (req, res) => {
    const { name, email, password, inviteCode } = req.body || {};

    if (!name || !email || !password || !inviteCode) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (inviteCode !== ADMIN_INVITE_CODE) {
        return res.status(403).json({ error: 'Invalid admin invite code.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const db = readDB();
    const emailLower = String(email).toLowerCase().trim();

    if (db.admins.some(a => a.email.toLowerCase() === emailLower)) {
        return res.status(409).json({ error: 'An admin account with this email already exists.' });
    }

    const newAdmin = {
        id: 'adm_' + crypto.randomBytes(6).toString('hex'),
        name: name.trim(),
        email: emailLower,
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString()
    };

    db.admins.push(newAdmin);
    writeDB(db);

    res.status(201).json({ message: 'Admin account created successfully.' });
});

app.post('/api/logout', (req, res) => {
    if (req.cookies.ls_session) destroySession(req.cookies.ls_session);
    res.clearCookie('ls_session');
    res.json({ message: 'Logged out' });
});

app.get('/api/me', (req, res) => {
    const session = getSession(req.cookies.ls_session);
    if (!session) return res.status(401).json({ error: 'Not authenticated' });

    const db = readDB();
    if (session.role === 'student') {
        const student = db.students.find(s => s.id === session.id);
        if (!student) return res.status(401).json({ error: 'Not authenticated' });
        return res.json({ role: 'student', name: student.name });
    }
    const admin = db.admins.find(a => a.id === session.id);
    if (!admin) return res.status(401).json({ error: 'Not authenticated' });
    res.json({ role: 'admin', name: admin.name });
});

// =============================================================================
// STUDENT dashboard data
// =============================================================================
app.get('/api/student/dashboard', requireAuth('student'), (req, res) => {
    const db = readDB();
    const student = db.students.find(s => s.id === req.session.id);
    if (!student) return res.status(404).json({ error: 'Student not found.' });

    const content = readCourseContent();
    const circumference = courseCircumference();
    const courses = student.courses.map(c => {
        recomputeCourseState(c, c.course);
        const totalModules = content[c.course] ? content[c.course].modules.length : 0;
        return {
            ...c,
            modulesTotal: totalModules,
            modulesDone: (c.completedModules || []).length,
            circumference,
            dashoffset: circumference * (1 - c.progress / 100)
        };
    });
    writeDB(db); // persist any recomputed progress values

    const completed = courses.filter(c => c.progress >= 100);
    const inProgress = courses.filter(c => c.progress > 0 && c.progress < 100);

    res.json({
        student: publicStudent(student),
        courses,
        stats: {
            enrolled: courses.length,
            completed: completed.length,
            inProgress: inProgress.length,
            certificates: completed.length
        },
        latestCertificate: completed.length ? completed[completed.length - 1] : null
    });
});

// =============================================================================
// COURSE CONTENT (modules + quiz) for the logged-in student
// =============================================================================
app.get('/api/courses/:course/content', requireAuth('student'), (req, res) => {
    const courseName = decodeURIComponent(req.params.course);
    const content = readCourseContent()[courseName];
    if (!content) return res.status(404).json({ error: 'Course not found.' });

    const db = readDB();
    const student = db.students.find(s => s.id === req.session.id);
    const enrollment = student && student.courses.find(c => c.course === courseName);
    if (!enrollment) return res.status(403).json({ error: 'You are not enrolled in this course.' });

    recomputeCourseState(enrollment, courseName);
    writeDB(db);

    // Never send correct answers to the client.
    const quizQuestions = content.quiz.questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options
    }));

    res.json({
        course: courseName,
        modules: content.modules,
        completedModules: enrollment.completedModules,
        quiz: {
            questions: quizQuestions,
            passRatio: content.quiz.passRatio
        },
        quizPassed: enrollment.quizPassed,
        quizScore: enrollment.quizScore,
        quizAttempts: enrollment.quizAttempts,
        progress: enrollment.progress,
        status: enrollment.status
    });
});

app.post('/api/student/courses/:course/modules/:moduleId/complete', requireAuth('student'), (req, res) => {
    const courseName = decodeURIComponent(req.params.course);
    const moduleId = req.params.moduleId;

    const content = readCourseContent()[courseName];
    if (!content) return res.status(404).json({ error: 'Course not found.' });
    if (!content.modules.some(m => m.id === moduleId)) {
        return res.status(404).json({ error: 'Module not found.' });
    }

    const db = readDB();
    const student = db.students.find(s => s.id === req.session.id);
    const enrollment = student && student.courses.find(c => c.course === courseName);
    if (!enrollment) return res.status(403).json({ error: 'You are not enrolled in this course.' });

    if (!enrollment.completedModules.includes(moduleId)) {
        enrollment.completedModules.push(moduleId);
    }
    recomputeCourseState(enrollment, courseName);
    writeDB(db);

    res.json({
        completedModules: enrollment.completedModules,
        progress: enrollment.progress,
        status: enrollment.status,
        allModulesComplete: enrollment.completedModules.length >= content.modules.length
    });
});

app.post('/api/student/courses/:course/quiz/submit', requireAuth('student'), (req, res) => {
    const courseName = decodeURIComponent(req.params.course);
    const { answers } = req.body || {};

    const content = readCourseContent()[courseName];
    if (!content) return res.status(404).json({ error: 'Course not found.' });
    if (!Array.isArray(answers) || answers.length !== content.quiz.questions.length) {
        return res.status(400).json({ error: 'Please answer every question before submitting.' });
    }

    const db = readDB();
    const student = db.students.find(s => s.id === req.session.id);
    const enrollment = student && student.courses.find(c => c.course === courseName);
    if (!enrollment) return res.status(403).json({ error: 'You are not enrolled in this course.' });

    if (enrollment.completedModules.length < content.modules.length) {
        return res.status(400).json({ error: 'Complete all modules before taking the final quiz.' });
    }

    let correctCount = 0;
    const results = content.quiz.questions.map((q, i) => {
        const isCorrect = answers[i] === q.correct;
        if (isCorrect) correctCount++;
        return { id: q.id, correct: q.correct, selected: answers[i], isCorrect };
    });

    const total = content.quiz.questions.length;
    const scoreRatio = correctCount / total;
    const passed = scoreRatio >= content.quiz.passRatio;

    enrollment.quizAttempts = (enrollment.quizAttempts || 0) + 1;
    enrollment.quizScore = correctCount;
    if (passed) enrollment.quizPassed = true;

    recomputeCourseState(enrollment, courseName);
    writeDB(db);

    res.json({
        correctCount,
        total,
        passed,
        progress: enrollment.progress,
        status: enrollment.status,
        results
    });
});

// =============================================================================
// ADMIN dashboard data
// =============================================================================
app.get('/api/admin/overview', requireAuth('admin'), (req, res) => {
    const db = readDB();
    const students = db.students;

    const totalStudents = students.length;
    const totalCourses = db.courseCatalog.length;

    let totalEnrollments = 0;
    let certificatesIssued = 0;
    const courseMap = {}; // name -> { enrolled, completed, progressSum }

    students.forEach(s => {
        s.courses.forEach(c => {
            recomputeCourseState(c, c.course);
            totalEnrollments++;
            if (c.progress >= 100) certificatesIssued++;

            if (!courseMap[c.course]) {
                courseMap[c.course] = { course: c.course, enrolled: 0, completed: 0, progressSum: 0 };
            }
            courseMap[c.course].enrolled++;
            courseMap[c.course].progressSum += c.progress;
            if (c.progress >= 100) courseMap[c.course].completed++;
        });
    });
    writeDB(db);

    const courseStats = Object.values(courseMap).map(c => ({
        course: c.course,
        enrolled: c.enrolled,
        completed: c.completed,
        avgProgress: Math.round(c.progressSum / c.enrolled)
    }));

    // one row per student-course enrollment, for the registrations table
    const registrations = [];
    students.forEach(s => {
        s.courses.forEach(c => {
            registrations.push({
                studentId: s.id,
                name: s.name,
                degree: s.degree,
                year: s.year,
                course: c.course,
                progress: c.progress,
                status: c.status
            });
        });
    });
    registrations.sort((a, b) => (a.name > b.name ? 1 : -1));

    res.json({
        stats: { totalStudents, totalCourses, totalEnrollments, certificatesIssued },
        courseStats,
        registrations
    });
});

// =============================================================================
// FORGOT / RESET PASSWORD — one-time code instead of an emailed link
// =============================================================================
app.post('/api/forgot-password', (req, res) => {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const db = readDB();
    const emailLower = String(email).toLowerCase().trim();
    const student = db.students.find(s => s.email.toLowerCase() === emailLower);
    const admin = db.admins.find(a => a.email.toLowerCase() === emailLower);

    // Always respond the same way whether or not the account exists,
    // to avoid leaking which emails are registered.
    if (!student && !admin) {
        return res.json({
            message: 'If that email exists in our system, a reset code has been generated.'
        });
    }

    const code = String(crypto.randomInt(100000, 999999));
    resetCodes.set(emailLower, {
        code,
        role: student ? 'student' : 'admin',
        expires: Date.now() + RESET_TTL_MS
    });

    // In production this code would be emailed/texted. For this demo build
    // (no email server configured) we return it directly in the response
    // so the flow can be tested end-to-end offline.
    res.json({
        message: 'Reset code generated.',
        demoCode: code
    });
});

app.post('/api/reset-password', (req, res) => {
    const { email, code, password } = req.body || {};
    if (!email || !code || !password) {
        return res.status(400).json({ error: 'Email, code, and new password are required.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const emailLower = String(email).toLowerCase().trim();
    const entry = resetCodes.get(emailLower);
    if (!entry || Date.now() > entry.expires) {
        resetCodes.delete(emailLower);
        return res.status(400).json({ error: 'This code is invalid or has expired. Please request a new one.' });
    }
    if (entry.code !== String(code).trim()) {
        return res.status(400).json({ error: 'Incorrect code. Please check and try again.' });
    }

    const db = readDB();
    if (entry.role === 'student') {
        const student = db.students.find(s => s.email === emailLower);
        if (!student) return res.status(404).json({ error: 'Account not found.' });
        student.passwordHash = hashPassword(password);
    } else {
        const admin = db.admins.find(a => a.email === emailLower);
        if (!admin) return res.status(404).json({ error: 'Account not found.' });
        admin.passwordHash = hashPassword(password);
    }
    writeDB(db);
    resetCodes.delete(emailLower);

    res.json({ message: 'Password reset successfully.' });
});

// =============================================================================
// CHANGE PASSWORD (while logged in — no code needed, uses the session)
// =============================================================================
app.post('/api/change-password', requireAuth(), (req, res) => {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current and new password are required.' });
    }
    if (newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters.' });
    }

    const db = readDB();
    const account = req.session.role === 'student'
        ? db.students.find(s => s.id === req.session.id)
        : db.admins.find(a => a.id === req.session.id);

    if (!account) return res.status(404).json({ error: 'Account not found.' });
    if (!verifyPassword(currentPassword, account.passwordHash)) {
        return res.status(401).json({ error: 'Current password is incorrect.' });
    }

    account.passwordHash = hashPassword(newPassword);
    writeDB(db);
    res.json({ message: 'Password updated successfully.' });
});

// =============================================================================
// HTTP server: route dispatch + static file fallback
// =============================================================================
const server = http.createServer(async (req, res) => {
    enhanceResponse(res);
    req.cookies = parseCookies(req);

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (req.method === 'POST' || req.method === 'PUT') {
        req.body = await readJsonBody(req);
    } else {
        req.body = {};
    }

    // Try API routes first
    for (const route of routes) {
        if (route.method !== req.method) continue;
        const match = pathname.match(route.regex);
        if (!match) continue;

        req.params = {};
        route.paramNames.forEach((name, i) => { req.params[name] = match[i + 1]; });

        return runChain(route.handlers, req, res);
    }

    // Root serves index.html; everything else falls through to static files
    if (pathname === '/') {
        return serveStatic(req, res, '/index.html');
    }
    if (req.method === 'GET') {
        return serveStatic(req, res, pathname);
    }

    res.status(404).json({ error: 'Not found' });
});

server.listen(PORT, () => {
    console.log(`LearnSphere server running at http://localhost:${PORT}`);
    console.log('(No external packages required — pure Node.js.)');
});
