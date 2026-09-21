import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";

export default function Home() {
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-glass py-3">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
            <span className="brand-mark">
              <i className="bi bi-mortarboard-fill"></i>
            </span>
            <span className="brand-text">LearnSphere</span>
          </Link>
          <button className="navbar-toggler border-0 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <i className="bi bi-list fs-2 text-white"></i>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav mx-auto gap-lg-2 my-3 my-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#courses">Courses</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#why-us">Why Us</a>
              </li>
              <li className="nav-item">
                <Link to="/admin-login" className="nav-link">Admin</Link>
              </li>
            </ul>
            <div className="d-flex gap-2 flex-wrap">
              <Link to="/login" className="btn btn-outline-brand btn-sm">Login</Link>
              <Link to="/register" className="btn btn-gradient-primary btn-sm">Get Started <i className="bi bi-arrow-right ms-1"></i></Link>
            </div>
          </div>
        </div>
      </nav>
      <header className="hero-section">
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
        <div className="container position-relative">
          <div className="row align-items-center gy-5 pt-5">
            <div className="col-lg-6">
              <span className="glass hero-badge"><i className="bi bi-stars me-1"></i> Track every course, live</span>
              <h1 className="hero-title">Learning, elevated <br /> for the <span className="hero-underline">modern</span> student</h1>
              <p className="hero-desc">
                LearnSphere connects students and administrators on one platform —
          enroll in courses, track progress in real time, and manage learners
          with a dashboard built for clarity.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/register" className="btn btn-gradient-accent btn-lg"><i className="bi bi-rocket-takeoff me-2"></i> Get Started</Link>
                <Link to="/admin-login" className="btn btn-ghost-light btn-lg"><i className="bi bi-shield-lock me-2"></i> Admin Login</Link>
              </div>
              <div className="d-flex flex-wrap gap-3 mt-3">
                <Link to="/login" className="hero-textlink">Student Login <i className="bi bi-box-arrow-in-right"></i></Link>
                <span className="text-white-50">/</span>
                <Link to="/register" className="hero-textlink">Register <i className="bi bi-person-plus"></i></Link>
              </div>
              <div className="row mt-5 pt-3 g-4">
                <div className="col-4">
                  <h3 className="counter-white mb-0">12K+</h3>
                  <p className="stat-label mb-0">Active Learners</p>
                </div>
                <div className="col-4">
                  <h3 className="counter-white mb-0">340+</h3>
                  <p className="stat-label mb-0">Courses</p>
                </div>
                <div className="col-4">
                  <h3 className="counter-white mb-0">97%</h3>
                  <p className="stat-label mb-0">Satisfaction</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-illustration">
                <div className="browser-mock main-card" style={{width: "100%", maxWidth: "420px"}}>
                  <div className="chrome">
                    <span className="r"></span>
                    <span className="y"></span>
                    <span className="g"></span>
                    <span className="url"><i className="bi bi-lock-fill me-1"></i> learnsphere.app/dashboard</span>
                  </div>
                  <div className="screen">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="mini-avatar">PS</div>
                      <div>
                        <div className="fw-600 text-white">UI/UX Design Fundamentals</div>
                        <small className="text-white-50">Priya Sharma · Live Session</small>
                      </div>
                    </div>
                    <div className="progress-track mb-2">
                      <div className="progress-fill" style={{width: "72%"}}></div>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <small className="text-white-50">72% complete</small>
                      <small className="text-white-50">Module 5/7</small>
                    </div>
                    <div className="row g-2">
                      <div className="col-4">
                        <div className="glass rounded-3 p-2 text-center">
                          <div className="fw-700 text-white">4</div>
                          <small className="text-white-50" style={{fontSize: "10px"}}>Courses</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="glass rounded-3 p-2 text-center">
                          <div className="fw-700 text-white">1</div>
                          <small className="text-white-50" style={{fontSize: "10px"}}>Done</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="glass rounded-3 p-2 text-center">
                          <div className="fw-700 text-white">1</div>
                          <small className="text-white-50" style={{fontSize: "10px"}}>Cert.</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="glass hero-card float-card float-1">
                  <i className="bi bi-award-fill text-warning fs-4"></i>
                  <div>
                    <div className="fw-600 text-white small">Certificate Earned</div>
                    <small className="text-white-50">Data Science with Python</small>
                  </div>
                </div>
                <div className="glass hero-card float-card float-2">
                  <i className="bi bi-graph-up-arrow text-info fs-4"></i>
                  <div>
                    <div className="fw-600 text-white small">Progress +34%</div>
                    <small className="text-white-50">Last 30 days</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <svg className="hero-wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" fill="#f6f7fb"></path>
        </svg>
      </header>
      {/* ============================= FEATURED COURSES ============================= */}
      <section className="py-5" id="courses">
        <div className="container py-4">
          <div className="text-center mx-auto mb-5" style={{maxWidth: "640px"}}>
            <span className="section-eyebrow"><i className="bi bi-collection"></i> Handpicked</span>
            <h2 className="section-title">Popular Courses</h2>
            <p className="section-sub">Programs chosen by our learning team this month.</p>
          </div>
          <div className="row g-4">
            <CourseCard
              image="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80"
              badge="Development"
              badgeClass="badge-soft-primary"
              title="Full Stack Development"
              description="HTML, CSS, JS & Backend Basics"
            />
            <CourseCard
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80"
              badge="Data"
              badgeClass="badge-soft-info"
              title="Data Science"
              description="Python, ML & Visualization"
            />
            <CourseCard
              image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80"
              badge="Design"
              badgeClass="badge-soft-accent"
              title="UI / UX Design"
              description="Wireframes & Prototyping"
            />
            <CourseCard
              image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80"
              badge="Security"
              badgeClass="badge-soft-warning"
              title="Cyber Security"
              description="Ethical Hacking & Defense"
            />
          </div>
        </div>
      </section>
      {/* ============================= WHY US ============================= */}
      <section className="py-5 bg-surface-alt" id="why-us">
        <div className="container py-4">
          <div className="text-center mx-auto mb-5" style={{maxWidth: "640px"}}>
            <span className="section-eyebrow"><i className="bi bi-graph-up"></i> Why LearnSphere</span>
            <h2 className="section-title">Built for real progress tracking</h2>
            <p className="section-sub">Everything students and admins need, in one clean dashboard.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card-surface p-4 text-center h-100">
                <div className="icon-tile mx-auto mb-3" style={{background: "var(--gradient-primary)"}}>
                  <i className="bi bi-speedometer2"></i>
                </div>
                <h6>Live Progress Tracking</h6>
                <p className="text-muted small mb-0">See exact completion percentage for every enrolled course.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-surface p-4 text-center h-100">
                <div className="icon-tile mx-auto mb-3" style={{background: "var(--gradient-info)"}}>
                  <i className="bi bi-person-workspace"></i>
                </div>
                <h6>Admin Oversight</h6>
                <p className="text-muted small mb-0">Admins can view every registered student and their course progress.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-surface p-4 text-center h-100">
                <div className="icon-tile mx-auto mb-3" style={{background: "var(--gradient-accent)"}}>
                  <i className="bi bi-patch-check"></i>
                </div>
                <h6>Certificates</h6>
                <p className="text-muted small mb-0">Earn a certificate the moment a course reaches 100%.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============================= CALL TO ACTION ============================= */}
      <section className="cta-section py-5" style={{background: "var(--gradient-hero)"}}>
        <div className="container py-4 text-center">
          <h2 className="text-white mb-3">Ready to start your learning journey?</h2>
          <p className="text-white-50 mx-auto mb-4" style={{maxWidth: "560px"}}>Join thousands of learners building real skills with LearnSphere.</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/register" className="btn btn-gradient-accent btn-lg"><i className="bi bi-person-plus me-2"></i> Create Free Account</Link>
            <Link to="/login" className="btn btn-ghost-light btn-lg"><i className="bi bi-box-arrow-in-right me-2"></i> Student Login</Link>
          </div>
        </div>
      </section>
      {/* ============================= FOOTER ============================= */}
      <footer className="footer-section pt-5 pb-4">
        <div className="container">
          <div className="row g-4 pb-4">
            <div className="col-lg-4">
              <Link to="/" className="navbar-brand d-flex align-items-center gap-2 mb-3">
                <span className="brand-mark">
                  <i className="bi bi-mortarboard-fill"></i>
                </span>
                <span className="brand-text text-white">LearnSphere</span>
              </Link>
              <p className="text-white-50">A modern learning platform for students and institutions.</p>
              <div className="d-flex gap-2 mt-3">
                <a href="#" className="footer-social">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="footer-social">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className="footer-social">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="footer-social">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
            <div className="col-6 col-lg-4">
              <h6 className="text-white mb-3">Platform</h6>
              <ul className="list-unstyled footer-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">Student Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/admin-login">Admin Login</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-lg-4">
              <h6 className="text-white mb-3">Support</h6>
              <ul className="list-unstyled footer-links">
                <li>
                  <Link to="/forgot-password">Forgot Password</Link>
                </li>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="border-secondary opacity-25" />
          <div className="d-flex flex-wrap justify-content-between align-items-center pt-3">
            <small className="text-white-50">© 2026 LearnSphere. All rights reserved.</small>
            <small className="text-white-50">Designed for modern learning institutions.</small>
          </div>
        </div>
      </footer>
    </>
  );
}
