// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ title, subtitle, onClick }) {
  return (
    <div
      className="lesson-card"
      onClick={onClick}
      style={{
        background: "rgba(255,255,255,0.03)",
        borderRadius: 16,
        padding: 24,
        cursor: "pointer",
        transition: "transform .15s ease, background .15s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
    >
      <div
        style={{
          display: "inline-block",
          fontSize: 12,
          padding: "4px 10px",
          borderRadius: 999,
          background: "rgba(0,180,120,.15)",
          color: "rgb(140, 255, 220)",
          marginBottom: 10,
        }}
      >
        Lesson
      </div>
      <h3 style={{ fontSize: 28, margin: "6px 0 8px" }}>{title}</h3>
      <p style={{ opacity: 0.8, margin: 0 }}>{subtitle}</p>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontSize: 48, marginBottom: 8 }}>English Camp A1 Kids</h1>
      <p style={{ opacity: 0.9, marginBottom: 28 }}>
        Welcome! Pick a lesson to start. 🎉
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 22,
        }}
      >
        {/* 기존 3개 */}
        <Card
          title="Greetings & Hello!"
          subtitle="Say Hello / Hi / How are you?"
          onClick={() => navigate("/lesson/greetings")}
        />
        <Card
          title="ABCD Kids Song (Short)"
          subtitle="Quick & fun alphabet song video."
          onClick={() => navigate("/lesson/abcd-short")}
        />
        <Card
          title="ABCD Song (Long)"
          subtitle="Longer version with variations."
          onClick={() => navigate("/lesson/abcd-long")}
        />

        {/* 새 3개 */}
        <Card
          title="Colors"
          subtitle="Learn colors with a fun song."
          onClick={() => navigate("/lesson/colors")}
        />
        <Card
          title="Numbers"
          subtitle="Count 1 to 10 in English."
          onClick={() => navigate("/lesson/numbers")}
        />
        <Card
          title="Family"
          subtitle="Learn family members."
          onClick={() => navigate("/lesson/family")}
        />
      </div>
    </div>
  );
}
