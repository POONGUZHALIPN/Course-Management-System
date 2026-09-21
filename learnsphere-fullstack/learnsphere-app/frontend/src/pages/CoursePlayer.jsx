import { Link } from "react-router-dom";
import LegacyScripts from "../components/LegacyScripts";

export default function CoursePlayer() {
  return (
    <>
      <nav className="navbar navbar-glass px-3 py-3">
        <div className="container-fluid">
          <Link to="/student-dashboard" className="text-white fw-600"><i className="bi bi-arrow-left me-2"></i> Back to Dashboard</Link>
          <span className="brand-text" id="navCourseTitle">Course</span>
        </div>
      </nav>
      <div className="player-wrap">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3 mt-4">
          <div>
            <h3 className="fw-bold mb-1" id="courseTitle">Loading…</h3>
            <span className="badge-soft badge-soft-primary" id="courseStatusBadge">Loading</span>
          </div>
          <div className="text-end">
            <div className="fw-700" id="courseProgressPct">0%</div>
            <small className="text-muted">Course progress</small>
          </div>
        </div>
        <div className="progress mb-4" style={{height: "10px", borderRadius: "10px"}}>
          <div className="progress-bar" id="courseProgressBar" style={{width: "0%", background: "var(--gradient-primary)"}}></div>
        </div>
        <div className="row g-4">
          {/* Module list */}
          <div className="col-lg-4">
            <h6 className="fw-bold mb-3">Learning Path</h6>
            <div id="moduleList"></div>
            <div className="card-surface p-3 mt-3" id="quizLauncher" style={{display: "none"}}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="bi bi-patch-question fs-4" style={{color: "var(--primary)"}}></i>
                <div className="fw-600">Final Quiz</div>
              </div>
              <p className="text-muted small mb-2" id="quizStatusText">All modules complete — take the quiz to earn your certificate.</p>
              <button className="btn btn-gradient-primary btn-sm w-100" id="startQuizBtn">Take the Quiz</button>
            </div>
          </div>
          {/* Content area */}
          <div className="col-lg-8">
            {/* Module viewer */}
            <div className="card-surface p-4" id="moduleViewer">
              <span className="badge-soft badge-soft-info mb-2" id="moduleTypeBadge">Reading</span>
              <h4 className="fw-bold" id="moduleTitle">—</h4>
              <div id="moduleVideoWrap" style={{display: "none"}} className="mb-3">
                <video controls id="moduleVideo"></video>
              </div>
              <p className="text-muted" id="moduleContent" style={{lineHeight: "1.8"}}>Loading module…</p>
              <button className="btn btn-gradient-accent" id="markCompleteBtn">Mark Complete & Continue <i className="bi bi-arrow-right ms-1"></i></button>
            </div>
            {/* Quiz viewer */}
            <div className="card-surface p-4" id="quizViewer" style={{display: "none"}}>
              <h4 className="fw-bold mb-1">Final Quiz</h4>
              <p className="text-muted mb-4">Answer all questions, then submit. You need to pass to earn your certificate.</p>
              <div id="quizQuestions"></div>
              <button className="btn btn-gradient-primary" id="submitQuizBtn">Submit Quiz</button>
            </div>
            {/* Quiz result */}
            <div className="card-surface p-4 text-center" id="quizResult" style={{display: "none"}}>
              <div className="icon-tile mx-auto mb-3" id="resultIcon" style={{width: "64px", height: "64px", fontSize: "28px"}}>
                <i className="bi bi-award-fill"></i>
              </div>
              <h4 className="fw-bold" id="resultTitle">—</h4>
              <p className="text-muted mb-3" id="resultSubtitle">—</p>
              <div id="resultActions"></div>
            </div>
          </div>
        </div>
      </div>
      <LegacyScripts sources={["/legacy/js/api.js", "/legacy/js/course-player.js"]} />
    </>
  );
}
