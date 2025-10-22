// src/pages/LessonABCD.jsx
import React from "react";

export default function LessonABCD() {
  return (
    <main className="container lesson">
      <h1>🔤 ABCD Song</h1>
      <p>Let’s sing the alphabet together!</p>

      {/* 유튜브 임베드 예시 */}
      <div className="video">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/eegWzglBMh0"
          title="ABCD Song"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </main>
  );
}
