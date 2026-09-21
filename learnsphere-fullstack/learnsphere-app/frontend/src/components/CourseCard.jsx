import { Link } from "react-router-dom";

function CourseCard({ image, badge, badgeClass, title, description, to = "/register" }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="course-card card-surface card-hover-lift h-100 p-4">
        <div className="course-thumb" style={{ backgroundImage: `url('${image}')` }}>
          <span className={`badge-soft ${badgeClass} thumb-badge`}>{badge}</span>
        </div>
        <h5 className="mb-1">{title}</h5>
        <small className="text-muted d-block mb-3">{description}</small>
        <Link to={to} className="btn btn-gradient-primary w-100 btn-sm">
          Enroll Now
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
