import { Link } from "react-router-dom";
import LegacyScripts from "../components/LegacyScripts";

export default function StudentDashboard() {
  return (
    <>
      {/* Sidebar */}
      <div className="dash-sidebar">
        <div className="brand-row">
          <span className="brand-mark">
            <i className="bi bi-mortarboard-fill"></i>
          </span>
          <span className="brand-text">LearnSphere</span>
        </div>
        <Link to="/student-dashboard" className="nav-item active"><i className="bi bi-grid-1x2-fill"></i> Dashboard</Link>
        <a href="#my-courses" className="nav-item"><i className="bi bi-journal-bookmark-fill"></i> My Courses</a>
        <a href="#progress" className="nav-item"><i className="bi bi-graph-up-arrow"></i> Progress</a>
        <a href="#certificate" className="nav-item"><i className="bi bi-award-fill"></i> Certificates</a>
        <Link to="/account-settings" className="nav-item"><i className="bi bi-gear-fill"></i> Account Settings</Link>
        <button className="nav-item" data-logout="" data-logout-redirect="../index.html"><i className="bi bi-box-arrow-right"></i> Logout</button>
      </div>
      {/* Main */}
      <div className="dash-main">
        <div className="topbar flex-wrap gap-3">
          <div>
            <h4 className="fw-bold mb-0" id="welcomeName">Welcome back 👋</h4>
            <p className="text-muted mb-0">Here's how your learning is progressing today.</p>
          </div>
          <div className="avatar-chip">
            <div className="av" id="userAvatar">··</div>
            <div>
              <div className="fw-600 small" id="userName"></div>
              <small className="text-muted" id="userMeta"></small>
            </div>
          </div>
        </div>
        {/* Completion banner (shown dynamically when a course is at 100%) */}
        <div className="card-surface p-3 px-4 mb-4 d-none flex-wrap justify-content-between align-items-center gap-2" id="completionBanner" style={{borderLeft: "5px solid var(--success)"}}>
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-trophy-fill fs-3 text-warning"></i>
            <div>
              <div className="fw-600">You completed <b id="completionCourseName">a course</b> 🎉</div>
              <small className="text-muted">Your certificate is ready to view.</small>
            </div>
          </div>
          <button className="btn btn-gradient-primary btn-sm" id="viewCertBtn">View Certificate</button>
        </div>
        {/* Metric cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3 col-6">
            <div className="metric-card grad-1">
              <div className="metric-icon">
                <i className="bi bi-journal-bookmark"></i>
              </div>
              <p>Enrolled Courses</p>
              <h2 className="skeleton" id="statEnrolled">--</h2>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="metric-card grad-4">
              <div className="metric-icon">
                <i className="bi bi-check2-circle"></i>
              </div>
              <p>Completed</p>
              <h2 className="skeleton" id="statCompleted">--</h2>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="metric-card grad-3">
              <div className="metric-icon">
                <i className="bi bi-hourglass-split"></i>
              </div>
              <p>In Progress</p>
              <h2 className="skeleton" id="statInProgress">--</h2>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="metric-card grad-2">
              <div className="metric-icon">
                <i className="bi bi-award"></i>
              </div>
              <p>Certificates</p>
              <h2 className="skeleton" id="statCertificates">--</h2>
            </div>
          </div>
        </div>
        {/* My Courses */}
        <div className="d-flex justify-content-between align-items-center mb-3" id="my-courses">
          <h5 className="fw-bold mb-0">My Courses</h5>
        </div>
        <div className="row g-4 mb-4" id="progress">
          <div className="col-12" id="coursesEmptyState" style={{display: "none"}}>
            <div className="card-surface p-4 text-center text-muted">You haven't enrolled in any courses yet. <a href="../index.html#courses">Browse courses</a></div>
          </div>
          {/* course-progress-card elements are injected here by JS */}
        </div>
        {/* Certificates */}
        <div className="card-surface p-4 mb-5" id="certificate">
          <h5 className="fw-bold mb-3">My Certificates</h5>
          <div id="certificatesList">
            <p className="text-muted mb-0">No certificates earned yet — keep learning!</p>
          </div>
        </div>
      </div>
      {/* Certificate Modal (toggled via JS) */}
      <div className="modal-overlay" id="certModal">
        <div className="modal-box">
          <span className="modal-close" id="closeCertModal">×</span>
          <div className="icon-tile mx-auto mb-3" style={{background: "var(--gradient-accent)", width: "64px", height: "64px", fontSize: "28px"}}>
            <i className="bi bi-award-fill"></i>
          </div>
          <h4 className="fw-bold" id="modalGreeting">Congratulations!</h4>
          <p className="text-muted mb-2">You have successfully completed</p>
          <h5 className="mb-3" style={{color: "var(--primary)"}} id="modalCourseName">—</h5>
          <span className="badge-soft badge-soft-success">Certificate Ready</span>
        </div>
      </div>
      <LegacyScripts sources={["/legacy/js/api.js", "/legacy/js/student-dashboard.js"]} />
    </>
  );
}
