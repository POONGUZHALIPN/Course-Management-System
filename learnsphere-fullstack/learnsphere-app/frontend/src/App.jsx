import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoursePlayer from "./pages/CoursePlayer";
import ForgotPassword from "./pages/ForgotPassword";
import AccountSettings from "./pages/AccountSettings";

/**
 * Every real page gets two routes: a clean path ("/login") and a ".html"
 * alias ("/login.html"). The alias exists because the original vanilla-JS
 * files navigate with things like:
 *
 *   window.location.href = "student-dashboard.html";
 *
 * That line was left completely untouched when the pages were converted
 * (see PART 25 of the conversion notes — the business logic isn't
 * rewritten, only the HTML/markup layer moves into React). Registering
 * both paths means that old navigation still lands on the right component
 * without editing a single line of the legacy scripts.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/index.html" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/login.html" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/register.html" element={<Register />} />

      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-login.html" element={<AdminLogin />} />

      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/admin-register.html" element={<AdminRegister />} />

      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/student-dashboard.html" element={<StudentDashboard />} />

      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-dashboard.html" element={<AdminDashboard />} />

      <Route path="/course-player" element={<CoursePlayer />} />
      <Route path="/course-player.html" element={<CoursePlayer />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/forgot-password.html" element={<ForgotPassword />} />

      <Route path="/account-settings" element={<AccountSettings />} />
      <Route path="/account-settings.html" element={<AccountSettings />} />

      {/* Unknown path -> Home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
