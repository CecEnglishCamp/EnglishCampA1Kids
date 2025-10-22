// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container">
      <h1>English Camp A1 Kids</h1>
      <p>Welcome! Pick a lesson to start. 🎉</p>

      <div className="cards">
        <Link to="/lesson/greetings" className="card">
          <small className="pill">Lesson</small>
          <h3>Greetings & Hello!</h3>
          <p>Say Hello / Hi / How are you?</p>
        </Link>

        {/* 왼쪽: 짧은 ABCD (유튜브) */}
        <Link to="/lesson/abcd-short" className="card">
          <small className="pill">Lesson</small>
          <h3>ABCD Kids Song (Short)</h3>
          <p>Quick & fun alphabet song video.</p>
        </Link>

        {/* 오른쪽: 긴 ABCD (유튜브) */}
        <Link to="/lesson/abcd-long" className="card">
          <small className="pill">Lesson</small>
          <h3>ABCD Song (Long)</h3>
          <p>Longer version with variations.</p>
        </Link>
      </div>
    </main>
  );
}
