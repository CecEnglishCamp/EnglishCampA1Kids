import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import YouTubeEmbed from "../components/YouTubeEmbed.jsx";

export default function Lesson() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch("/courses/english-camp-a1.json")
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(setCourse)
      .catch(console.error);
  }, []);

  const lesson = useMemo(
    () => course?.lessons?.find(l => l.id === id),
    [course, id]
  );

  if (!course) return <div className="container">Loading…</div>;
  if (!lesson) return (
    <div className="container">
      <p>Lesson not found.</p>
      <Link to="/" style={{ color: "#93c5fd" }}>← Back to Home</Link>
    </div>
  );

  return (
    <div className="container">
      <Link to="/" style={{ color: "#93c5fd" }}>← Back</Link>
      <h1 className="title" style={{ marginTop: 8 }}>{lesson.title}</h1>
      <YouTubeEmbed id={lesson.yt} title={lesson.title} />
      <p style={{ marginTop: 12, opacity: .85 }}>{lesson.desc}</p>
    </div>
  );
}
