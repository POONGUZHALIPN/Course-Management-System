import LegacyScripts from "../components/LegacyScripts";

export default function AccountSettings() {
  return (
    <>
      <div className="auth-wrapper">
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
        <div className="auth-card">
          <div className="text-center mb-4">
            <div className="auth-icon">
              <i className="bi bi-person-gear"></i>
            </div>
            <h3 className="fw-bold mb-1">Account Settings</h3>
            <p className="text-muted mb-0">Signed in as <b id="currentUserName">…</b></p>
          </div>
          <div className="alert-inline" id="changeAlert"></div>
          <form id="changePasswordForm" noValidate>
            <div className="mb-3">
              <label className="form-label">Current Password</label>
              <input type="password" id="currentPassword" className="form-control" placeholder="Enter your current password" required />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input type="password" id="newPassword" className="form-control" placeholder="At least 6 characters" required minLength="6" />
            </div>
            <div className="mb-4">
              <label className="form-label">Confirm New Password</label>
              <input type="password" id="confirmNewPassword" className="form-control" placeholder="Confirm new password" required minLength="6" />
            </div>
            <button type="submit" id="changeSubmit" className="btn btn-gradient-primary w-100 py-2">Update Password <i className="bi bi-check2-circle ms-1"></i></button>
          </form>
          <p className="text-center mt-4 mb-0">
            <a href="#" id="backToDashboard" className="small text-muted"><i className="bi bi-arrow-left me-1"></i> Back to Dashboard</a>
          </p>
        </div>
      </div>
      <LegacyScripts sources={["/legacy/js/api.js", "/legacy/js/account-settings.js"]} />
    </>
  );
}
