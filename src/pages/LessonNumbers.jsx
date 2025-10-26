import React from "react";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";

export default function LessonNumbers() {
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
      <h2>🔢 Numbers Song</h2>
      <YouTube videoId="PD3mdU1e1-8" opts={opts} onEnd={onEnd} />
      <p>Let's count numbers in English together!</p>
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>
    </div>
  );
}
