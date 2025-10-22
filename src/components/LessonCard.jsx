import { Link } from "react-router-dom";

export default function LessonCard({ lesson }) {
  return (
    <Link to={`/lesson/${lesson.id}`} className="card">
      <div className="badge">Lesson</div>
      <h3 style={{ margin: "8px 0 6px", fontSize: 20, fontWeight: 800 }}>{lesson.title}</h3>
      <p style={{ margin: 0, opacity: .8, fontSize: 14 }}>{lesson.desc || "Let's learn!"}</p>
    </Link>
  );
}
