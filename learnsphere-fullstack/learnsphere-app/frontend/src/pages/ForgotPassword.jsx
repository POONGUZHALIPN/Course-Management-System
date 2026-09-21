import { Link } from "react-router-dom";
import LegacyScripts from "../components/LegacyScripts";

export default function ForgotPassword() {
  return (
    <>
      <div className="auth-wrapper">
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
        <div className="auth-card">
          <div className="text-center mb-4">
            <div className="auth-icon">
              <i className="bi bi-key-fill"></i>
            </div>
            <h3 className="fw-bold mb-1">Forgot Password?</h3>
            <p className="text-muted mb-2" id="stepDescription">Enter your registered email and we'll send you a reset code</p>
            <div>
              <span className="step-dot active" id="dot1"></span>
              <span className="step-dot" id="dot2"></span>
            </div>
          </div>
          <div className="alert-inline" id="forgotAlert"></div>
          {/* STEP 1: request a code */}
          <form id="requestCodeForm" noValidate>
            <div className="mb-4">
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-envelope text-muted"></i>
                </span>
                <input type="email" id="email" className="form-control border-start-0" placeholder="Enter your registered email" required />
              </div>
            </div>
            <button type="submit" id="requestCodeSubmit" className="btn btn-gradient-primary w-100 py-2 mb-3">Send Reset Code <i className="bi bi-send ms-1"></i></button>
            <p className="text-center text-muted mb-0">Remembered your password? <Link to="/login" className="fw-semibold" style={{color: "var(--primary)"}}>Back to Login</Link></p>
          </form>
          {/* STEP 2: enter code + new password */}
          <form id="resetForm" className="d-none" noValidate>
            <div className="code-display" id="demoCodeDisplay" style={{display: "none"}}></div>
            <p className="text-center text-muted small mb-3" id="demoCodeCaption" style={{display: "none"}}>
              No email server is configured in this demo — your code is shown above.
        In production this would be emailed instead.
            </p>
            <div className="mb-3">
              <label className="form-label">6-Digit Reset Code</label>
              <input type="text" id="code" className="form-control text-center" style={{letterSpacing: "6px", fontWeight: "700"}} maxLength="6" placeholder="••••••" required />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input type="password" id="newPassword" className="form-control" placeholder="At least 6 characters" required minLength="6" />
            </div>
            <div className="mb-4">
              <label className="form-label">Confirm New Password</label>
              <input type="password" id="confirmNewPassword" className="form-control" placeholder="Confirm new password" required minLength="6" />
            </div>
            <button type="submit" id="resetSubmit" className="btn btn-gradient-primary w-100 py-2 mb-2">Reset Password <i className="bi bi-check2-circle ms-1"></i></button>
            <button type="button" id="resendCodeBtn" className="btn btn-outline-brand w-100 py-2 mb-3">Resend Code</button>
            <p className="text-center mb-0">
              <a href="#" id="backToStep1" className="small text-muted"><i className="bi bi-arrow-left me-1"></i> Use a different email</a>
            </p>
          </form>
        </div>
      </div>
      <LegacyScripts sources={["/legacy/js/api.js", "/legacy/js/forgot-password.js"]} />
    </>
  );
}
