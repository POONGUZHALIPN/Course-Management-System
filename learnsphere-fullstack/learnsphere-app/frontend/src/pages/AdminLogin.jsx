import { Link } from "react-router-dom";
import LegacyScripts from "../components/LegacyScripts";

export default function AdminLogin() {
  return (
    <>
      <div className="auth-wrapper admin-bg">
        <div className="hero-orb orb-1" style={{background: "#334155"}}></div>
        <div className="hero-orb orb-2" style={{background: "#4f46e5"}}></div>
        <div className="auth-card">
          <div className="text-center mb-4">
            <div className="auth-icon admin">
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            <span className="badge-soft badge-soft-primary mb-2">ADMIN ACCESS</span>
            <h3 className="fw-bold mb-1">Admin Portal</h3>
            <p className="text-muted">Sign in to manage students and courses</p>
          </div>
          <div className="alert-inline" id="adminLoginAlert"></div>
          <form id="adminLoginForm" noValidate>
            <div className="mb-3">
              <label className="form-label">Admin Email</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-envelope text-muted"></i>
                </span>
                <input type="email" id="adminEmail" className="form-control border-start-0" placeholder="admin@learnsphere.com" required />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input type="password" id="adminPassword" className="form-control border-start-0" placeholder="Enter your password" required />
              </div>
            </div>
            <button type="submit" id="adminLoginSubmit" className="btn w-100 py-2 mb-3 text-white fw-semibold" style={{background: "linear-gradient(135deg,#0f172a,#334155)", borderRadius: "12px"}}>Login as Admin <i className="bi bi-arrow-right ms-1"></i></button>
            <p className="text-center text-muted mb-0">Not an admin? <Link to="/login" className="fw-semibold" style={{color: "var(--primary)"}}>Student Login</Link></p>
            <p className="text-center mt-3 mb-0">New admin? <Link to="/admin-register" className="fw-semibold" style={{color: "var(--primary)"}}>Register here</Link></p>
            <p className="text-center mt-4 mb-0">
              <Link to="/" className="small text-muted"><i className="bi bi-arrow-left me-1"></i> Back to Home</Link>
            </p>
          </form>
          <div className="text-center mt-3">
            <small className="text-muted">Demo login: <b>admin@learnsphere.com</b> / <b>admin123</b></small>
          </div>
        </div>
      </div>
      <LegacyScripts sources={["/legacy/js/api.js", "/legacy/js/admin-login.js"]} />
    </>
  );
}
