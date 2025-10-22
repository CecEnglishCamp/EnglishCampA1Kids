// src/pages/LessonGreetings.jsx
import React, { useEffect, useMemo, useState } from "react";
import ProgressBar from "../components/ProgressBar.jsx";

const STORAGE_KEY = "eca1:greetings:progress";

const PHRASES = [
  { en: "Hello!", ko: "안녕하세요!", slow: 0.9 },
  { en: "Hi!", ko: "안녕!", slow: 1.0 },
  { en: "Good morning!", ko: "좋은 아침!", slow: 0.95 },
  { en: "Good afternoon!", ko: "좋은 오후!", slow: 0.95 },
  { en: "Good evening!", ko: "좋은 저녁!", slow: 0.95 },
  { en: "Nice to meet you!", ko: "만나서 반가워요!", slow: 0.95 },
];

export default function LessonGreetings() {
  const [idx, setIdx] = useState(0);
  const [heardOk, setHeardOk] = useState(false);

  // 진행도 복원
  useEffect(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY) || 0);
    if (!Number.isNaN(saved) && saved >= 0 && saved < PHRASES.length) {
      setIdx(saved);
    }
  }, []);

  // 진행도 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(idx));
  }, [idx]);

  const progress = useMemo(
    () => Math.round(((idx + 1) / PHRASES.length) * 100),
    [idx]
  );

  const current = PHRASES[idx];

  const speak = () => {
    if (!window.speechSynthesis) return alert("TTS를 지원하지 않는 브라우저예요.");
    const u = new SpeechSynthesisUtterance(current.en);
    u.lang = "en-US";
    u.rate = current.slow ?? 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  // 매우 간단한 “따라 말하기”: Web Speech API SpeechRecognition
  const listen = () => {
    const R = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!R) return alert("음성 인식을 지원하지 않는 브라우저예요.");
    const rec = new R();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => {
      const said = e.results[0][0].transcript.toLowerCase().trim();
      const target = current.en.toLowerCase().replace(/[!.,?]/g, "");
      setHeardOk(said.includes(target.replace(/[!.,?]/g, "").split(" ")[0])); // 아주 느슨한 매칭
    };
    rec.onerror = () => setHeardOk(false);
    rec.start();
  };

  const next = () => {
    setHeardOk(false);
    setIdx((i) => Math.min(i + 1, PHRASES.length - 1));
  };
  const prev = () => {
    setHeardOk(false);
    setIdx((i) => Math.max(i - 1, 0));
  };

  return (
    <main className="container lesson">
      <div className="lesson-header">
        <h1>👋 Greetings & Hello!</h1>
        <ProgressBar value={progress} />
      </div>

      <div className="card big">
        <p className="hint">{current.ko}</p>
        <h2 className="line">{current.en}</h2>

        <div className="row gap">
          <button className="btn" onClick={speak}>▶️ 듣기</button>
          <button className="btn" onClick={listen}>🎤 따라 말하기</button>
          {heardOk && <span className="ok">✅ Good!</span>}
        </div>

        <div className="row spread">
          <button className="btn ghost" onClick={prev} disabled={idx === 0}>
            ← 이전
          </button>
          <button
            className="btn primary"
            onClick={next}
            disabled={idx === PHRASES.length - 1}
          >
            다음 →
          </button>
        </div>
      </div>
    </main>
  );
}
