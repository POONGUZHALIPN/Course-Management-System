import { Link } from "react-router-dom";
import LegacyScripts from "../components/LegacyScripts";

export default function Login() {
  return (
    <>
      <div className="auth-wrapper">
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
        <div className="auth-card">
          <div className="text-center mb-4">
            <div className="auth-icon">
              <i className="bi bi-mortarboard-fill"></i>
            </div>
            <h3 className="fw-bold mb-1">Welcome back, Learner</h3>
            <p className="text-muted">Login to continue your learning journey</p>
          </div>
          <div className="alert-inline" id="loginAlert"></div>
          <form id="loginForm" noValidate>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-envelope text-muted"></i>
                </span>
                <input type="email" id="email" className="form-control border-start-0" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input type="password" id="password" className="form-control border-start-0" placeholder="Enter your password" required />
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="remember" />
                <label className="form-check-label small" htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="small fw-semibold" style={{color: "var(--primary)"}}>Forgot Password?</Link>
            </div>
            <button type="submit" id="loginSubmit" className="btn btn-gradient-primary w-100 py-2 mb-3">Login <i className="bi bi-arrow-right ms-1"></i></button>
            <p className="text-center text-muted mb-2">Don't have an account? <Link to="/register" className="fw-semibold" style={{color: "var(--primary)"}}>Register</Link></p>
            <p className="text-center mb-0">
              <Link to="/admin-login" className="small text-muted"><i className="bi bi-shield-lock me-1"></i> Login as Admin instead</Link>
            </p>
          </form>
          <p className="text-center mt-4 mb-0">
            <Link to="/" className="small text-muted"><i className="bi bi-arrow-left me-1"></i> Back to Home</Link>
          </p>
          <div className="text-center mt-3">
            <small className="text-muted">Demo login: <b>aarav@example.com</b> / <b>password123</b></small>
          </div>
        </div>
      </div>
      <LegacyScripts sources={["/legacy/js/api.js", "/legacy/js/login.js"]} />
    </>
  );
}
