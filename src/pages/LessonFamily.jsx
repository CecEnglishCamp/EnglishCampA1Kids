import React from "react";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";

export default function LessonFamily() {
  const navigate = useNavigate();
  const opts = {
    height: "480",
    width: "100%",
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
    },
  };
  const onEnd = () => navigate("/");

  return (
    <div className="lesson-page">
      <h2>👨‍👩‍👧‍👦 Family Song</h2>
      <YouTube videoId="IEJGolgL048" opts={opts} onEnd={onEnd} />
      <p>Meet the family! Let's sing about Mom, Dad, Brother, and Sister.</p>
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>
    </div>
  );
}
