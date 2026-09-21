import { Link } from "react-router-dom";
import LegacyScripts from "../components/LegacyScripts";

export default function AdminRegister() {
  return (
    <>
      <div className="auth-wrapper admin-bg">
        <div className="hero-orb orb-1" style={{background: "#334155"}}></div>
        <div className="hero-orb orb-2" style={{background: "#4f46e5"}}></div>
        <div className="auth-card">
          <div className="text-center mb-4">
            <div className="auth-icon admin">
              <i className="bi bi-person-fill-add"></i>
            </div>
            <span className="badge-soft badge-soft-primary mb-2">ADMIN ACCESS</span>
            <h3 className="fw-bold mb-1">Register as Admin</h3>
            <p className="text-muted">Create an admin account to monitor student progress</p>
          </div>
          <div className="alert-inline" id="adminRegisterAlert"></div>
          <form id="adminRegisterForm" noValidate>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" id="name" className="form-control" placeholder="Enter your full name" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Admin Email</label>
              <input type="email" id="email" className="form-control" placeholder="admin@learnsphere.com" required />
            </div>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input type="password" id="password" className="form-control" placeholder="At least 6 characters" required minLength="6" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Confirm Password</label>
                <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm password" required minLength="6" />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Admin Invite Code</label>
              <input type="text" id="inviteCode" className="form-control" placeholder="Enter the invite code" required />
              <small className="text-muted">Ask your institution's super admin for this code.</small>
            </div>
            <button type="submit" id="adminRegisterSubmit" className="btn w-100 py-2 mb-3 text-white fw-semibold" style={{background: "linear-gradient(135deg,#0f172a,#334155)", borderRadius: "12px"}}>Create Admin Account <i className="bi bi-arrow-right ms-1"></i></button>
            <p className="text-center text-muted mb-0">Already an admin? <Link to="/admin-login" className="fw-semibold" style={{color: "var(--primary)"}}>Login</Link></p>
            <p className="text-center mt-3 mb-0">
              <Link to="/" className="small text-muted"><i className="bi bi-arrow-left me-1"></i> Back to Home</Link>
            </p>
          </form>
          <div className="text-center mt-3">
            <small className="text-muted">Demo invite code: <b>LEARNSPHERE2026</b></small>
          </div>
        </div>
      </div>
      <LegacyScripts sources={["/legacy/js/api.js", "/legacy/js/admin-register.js"]} />
    </>
  );
}
