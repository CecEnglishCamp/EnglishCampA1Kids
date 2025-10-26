import React from "react";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";

export default function LessonColors() {
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
      <h2>🎨 Colors Song</h2>
      <YouTube videoId="2lC63C_CN4E" opts={opts} onEnd={onEnd} />
      <p>Let's learn colors in English!</p>
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back to Home
      </button>
    </div>
  );
}
