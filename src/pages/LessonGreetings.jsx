// src/pages/LessonGreetings.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LessonGreetings() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Preparing voice…");
  const navTimerRef = useRef(null);

  // 1) 브라우저의 보이스 목록이 준비될 때까지 기다림
  const waitForVoices = () =>
    new Promise((resolve) => {
      const have = () => speechSynthesis.getVoices()?.length > 0;
      if (have()) return resolve();
      const id = setInterval(() => {
        if (have()) {
          clearInterval(id);
          resolve();
        }
      }, 100);
      // 안전장치: 2초 후에는 강행
      setTimeout(() => {
        clearInterval(id);
        resolve();
      }, 2000);
    });

  // 2) 여자 보이스 고르기 (이름/키워드로 필터)
  const pickFemale = () => {
    const vs = speechSynthesis.getVoices() || [];
    const prefers = [
      "female",
      "google uk english female",
      "google us english",
      "samantha",
      "karen",
      "victoria",
      "tessa",
      "zira",
      "jenny",
      "aria",
      "zoe",
    ];

    // 여성 키워드/이름 우선
    const fem =
      vs.find((v) =>
        prefers.some((k) => v.name.toLowerCase().includes(k))
      ) ||
      // 남성 보이스 몇 개는 제외
      vs.find(
        (v) =>
          !/(male|daniel|fred|alex)/i.test(v.name) &&
          /(en)/i.test(v.lang || "")
      ) ||
      vs[0];

    return fem || null;
  };

  // 3) 안내 멘트 (필요시 수정)
  const msg =
    "Welcome to English Camp A one. Please go back and tap the ABCD song to start!";

  useEffect(() => {
    let cancelled = false;

    const speakTTS = async () => {
      setStatus("Loading voice...");
      await waitForVoices();
      if (cancelled) return;

      const voice = pickFemale();

      // 보이스를 못 찾거나 TTS가 막히는 환경 대비 → mp3로 대체 가능
      if (!voice) {
        playFallbackAudio();
        return;
      }

      setStatus("Speaking...");
      speechSynthesis.cancel(); // 이전 재생 취소

      const u = new SpeechSynthesisUtterance(msg);
      u.lang = "en-US";
      u.rate = 0.95;
      u.pitch = 1.1;
      u.volume = 1;
      u.voice = voice;

      u.onend = () => {
        if (!cancelled) {
          setStatus("Done. Returning home…");
          navigate("/", { replace: true });
        }
      };
      u.onerror = () => {
        if (!cancelled) playFallbackAudio();
      };

      speechSynthesis.speak(u);

      // 안전장치: 12초 이상 걸리면 홈으로 (onend 누락 대비)
      navTimerRef.current = setTimeout(() => {
        if (!cancelled) navigate("/", { replace: true });
      }, 12000);
    };

    const playFallbackAudio = () => {
      // public/audio/greetings/welcome.mp3 가 있으면 자동 재생
      // 없으면 바로 홈으로 이동
      const url = "/audio/greetings/welcome.mp3";
      const audio = new Audio(url);
      audio.onended = () => navigate("/", { replace: true });
      audio.onerror = () => navigate("/", { replace: true });
      audio.play().catch(() => navigate("/", { replace: true }));
    };

    speakTTS();

    return () => {
      cancelled = true;
      speechSynthesis.cancel();
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
    };
  }, [navigate]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>👋 Greetings & Hello!</h1>
      <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>
        {status}
      </p>
      <p style={{ marginTop: "0.5rem", opacity: 0.6 }}>
        (A female voice will speak a short message, then return to the home page.)
      </p>
    </div>
  );
}
