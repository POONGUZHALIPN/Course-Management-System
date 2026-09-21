import { Link } from "react-router-dom";
import LegacyScripts from "../components/LegacyScripts";

export default function Register() {
  return (
    <>
      <div className="auth-wrapper py-5">
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
        <div className="auth-card" style={{maxWidth: "560px"}}>
          <div className="text-center mb-4">
            <div className="auth-icon">
              <i className="bi bi-person-plus-fill"></i>
            </div>
            <h3 className="fw-bold mb-1">Create your account</h3>
            <p className="text-muted">Join LearnSphere and start tracking your progress</p>
          </div>
          <div className="alert-inline" id="registerAlert"></div>
          <form id="registerForm" noValidate>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" id="name" className="form-control" placeholder="Enter your full name" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" id="email" className="form-control" placeholder="you@example.com" required />
            </div>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Degree Program</label>
                <select className="form-select" id="degree" required>
                  <option value="">Select Degree</option>
                  <option>B.Tech / B.E</option>
                  <option>B.Sc</option>
                  <option>B.C.A</option>
                  <option>M.Tech / M.E</option>
                  <option>M.Sc</option>
                  <option>M.C.A</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Year of Study</label>
                <select className="form-select" id="year" required>
                  <option value="">Select Year</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>Graduated</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Course to Enroll</label>
              <select className="form-select" id="course" required>
                <option value="">Choose Course</option>
                <option>Full Stack Development</option>
                <option>Data Science</option>
                <option>UI / UX Design</option>
                <option>Cyber Security</option>
                <option>Cloud Computing</option>
                <option>Artificial Intelligence</option>
              </select>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input type="password" id="password" className="form-control" placeholder="Create password (min 6 chars)" required minLength="6" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Confirm Password</label>
                <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm password" required minLength="6" />
              </div>
            </div>
            <button type="submit" id="registerSubmit" className="btn btn-gradient-accent w-100 py-2 mb-3">Create Account <i className="bi bi-arrow-right ms-1"></i></button>
            <p className="text-center text-muted mb-0">Already have an account? <Link to="/login" className="fw-semibold" style={{color: "var(--primary)"}}>Login</Link></p>
            <p className="text-center mt-3 mb-0">
              <Link to="/" className="small text-muted"><i className="bi bi-arrow-left me-1"></i> Back to Home</Link>
            </p>
          </form>
        </div>
      </div>
      <LegacyScripts sources={["/legacy/js/api.js", "/legacy/js/register.js"]} />
    </>
  );
}
