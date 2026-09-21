import { Link } from "react-router-dom";
import LegacyScripts from "../components/LegacyScripts";

export default function AdminDashboard() {
  return (
    <>
      {/* Sidebar */}
      <div className="dash-sidebar admin">
        <div className="brand-row">
          <span className="brand-mark" style={{background: "linear-gradient(135deg,#0f172a,#334155)"}}>
            <i className="bi bi-shield-lock-fill"></i>
          </span>
          <span className="brand-text">LearnSphere</span>
        </div>
        <Link to="/admin-dashboard" className="nav-item active"><i className="bi bi-grid-1x2-fill"></i> Dashboard</Link>
        <a href="#students" className="nav-item"><i className="bi bi-people-fill"></i> Students</a>
        <a href="#courses" className="nav-item"><i className="bi bi-journal-bookmark-fill"></i> Courses</a>
        <a href="#reports" className="nav-item"><i className="bi bi-bar-chart-fill"></i> Reports</a>
        <Link to="/account-settings" className="nav-item"><i className="bi bi-gear-fill"></i> Account Settings</Link>
        <button className="nav-item" data-logout="" data-logout-redirect="../index.html"><i className="bi bi-box-arrow-right"></i> Logout</button>
      </div>
      {/* Main */}
      <div className="dash-main">
        <div className="topbar flex-wrap gap-3">
          <div>
            <h4 className="fw-bold mb-0">Admin Overview</h4>
            <p className="text-muted mb-0">Track student registrations and course completion at a glance.</p>
          </div>
          <div className="avatar-chip">
            <div className="av" style={{background: "linear-gradient(135deg,#0f172a,#334155)"}} id="adminAvatar">AD</div>
            <div>
              <div className="fw-600 small" id="adminName">Admin</div>
              <small className="text-muted">Super Admin</small>
            </div>
          </div>
        </div>
        {/* Metric cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3 col-6">
            <div className="metric-card grad-1">
              <div className="metric-icon">
                <i className="bi bi-people-fill"></i>
              </div>
              <p>Total Students</p>
              <h2 className="skeleton" id="mTotalStudents">--</h2>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="metric-card grad-2">
              <div className="metric-icon">
                <i className="bi bi-journal-bookmark"></i>
              </div>
              <p>Total Courses</p>
              <h2 className="skeleton" id="mTotalCourses">--</h2>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="metric-card grad-3">
              <div className="metric-icon">
                <i className="bi bi-hourglass-split"></i>
              </div>
              <p>Total Enrollments</p>
              <h2 className="skeleton" id="mTotalEnrollments">--</h2>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="metric-card grad-4">
              <div className="metric-icon">
                <i className="bi bi-award"></i>
              </div>
              <p>Certificates Issued</p>
              <h2 className="skeleton" id="mCertificates">--</h2>
            </div>
          </div>
        </div>
        {/* Course-wise summary */}
        <div className="card-surface p-4 mb-4" id="courses">
          <h5 className="fw-bold mb-3">Course-wise Enrollment</h5>
          <div className="table-responsive">
            <table className="table table-clean mb-0">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Enrolled</th>
                  <th>Completed</th>
                  <th>Avg. Progress</th>
                </tr>
              </thead>
              <tbody id="courseStatsBody">
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">Loading…</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Registered students */}
        <div className="card-surface p-4 mb-5" id="students">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <h5 className="fw-bold mb-0">Registered Students</h5>
            <span className="badge-soft badge-soft-primary" id="totalRegBadge">0 total</span>
          </div>
          <div className="table-responsive">
            <table className="table table-clean mb-0">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Degree / Year</th>
                  <th>Course</th>
                  <th>Progress</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="registrationsBody">
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">Loading…</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Reports summary */}
        <div className="card-surface p-4 mb-5" id="reports">
          <h5 className="fw-bold mb-3">Monthly Report Summary</h5>
          <p className="mb-1 small fw-600">Overall Course Completion Rate</p>
          <div className="mini-progress mb-3" style={{width: "100%"}}>
            <span id="reportCompletionBar" style={{width: "0%", background: "var(--gradient-accent)"}}></span>
          </div>
          <small className="text-muted" id="reportCompletionLabel">0% of enrollments completed</small>
        </div>
      </div>
      <LegacyScripts sources={["/legacy/js/api.js", "/legacy/js/admin-dashboard.js"]} />
    </>
  );
}
