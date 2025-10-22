// src/components/YouTubeWithProgress.jsx
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";

// ⏱ 시간 포맷 함수
function fmt(t = 0) {
  t = Math.max(0, Math.floor(t));
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * YouTubeWithProgress
 * - videoId: YouTube 영상 ID
 * - storageKey: localStorage 키 (진행도 저장용)
 * - autoReturnOnEnd: 끝나면 홈으로 자동 이동
 * - showNativeControls: 기본 유튜브 컨트롤 표시 여부
 * - fillScreen: 화면 전체 채우기
 */
export default function YouTubeWithProgress({
  videoId,
  storageKey,
  autoReturnOnEnd = true,
  showNativeControls = false,
  fillScreen = true,
}) {
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const pollRef = useRef(null);

  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [resumed, setResumed] = useState(false);

  // 🎬 YouTube 옵션 설정
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,               // 모바일 자동재생 보장
      rel: 0,                // 추천영상 차단
      modestbranding: 1,     // 로고 최소화
      controls: showNativeControls ? 1 : 0,
      fs: 0,                 // 유튜브 자체 전체화면 버튼 숨김
      playsinline: 1,        // 모바일 인라인 재생
    },
  };

  // 🎥 진행도 자동 저장
  const startPolling = () => {
    stopPolling();
    pollRef.current = setInterval(async () => {
      if (!playerRef.current) return;
      const p = playerRef.current;
      const ct = await p.getCurrentTime();
      const dt = await p.getDuration();
      if (!isNaN(ct)) {
        setCurrent(ct);
        try {
          localStorage.setItem(storageKey, String(ct));
        } catch {}
      }
      if (!isNaN(dt) && dt !== duration) {
        setDuration(dt);
      }
    }, 500);
  };

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  // ✅ 준비 완료 시 (재생 길이 가져오기 + 이전 진행도 복원)
  const onReady = async (e) => {
    playerRef.current = e.target;

    try {
      const dt = await e.target.getDuration();
      if (dt) setDuration(dt);
    } catch {}

    const saved = parseFloat(localStorage.getItem(storageKey) || "0");
    if (!isNaN(saved) && saved > 3) {
      try {
        await e.target.seekTo(saved, true);
        setResumed(true);
      } catch {}
    }

    startPolling();
  };

  // 🎞️ 상태 변화 (재생, 종료 등)
  const onStateChange = (e) => {
    const YT = window.YT?.PlayerState;
    if (!YT) return;

    if (e.data === YT.PLAYING) {
      try {
        playerRef.current?.unMute?.();
      } catch {}
    }

    if (e.data === YT.ENDED) {
      try {
        localStorage.removeItem(storageKey);
      } catch {}
      stopPolling();
      if (autoReturnOnEnd) {
        setTimeout(() => navigate("/", { replace: true }), 500);
      }
    }
  };

  // 🧭 스크롤 잠금 (몰입형 전체화면)
  useEffect(() => {
    if (!fillScreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [fillScreen]);

  // 🔘 진행바 클릭 시 이동
  const handleSeek = (val) => {
    const t = parseFloat(val);
    setCurrent(t);
    playerRef.current?.seekTo?.(t, true);
  };

  // 🖥 화면 비율 감지 (16:9 기준으로 꽉 채우기)
  const isWide = window.innerWidth / window.innerHeight >= 16 / 9;
  const iframeStyle = isWide
    ? {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100vw",
        height: "56.25vw", // 9/16 = 0.5625
        transform: "translate(-50%, -50%)",
      }
    : {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "177.78vh", // 16/9 = 1.7778
        height: "100vh",
        transform: "translate(-50%, -50%)",
      };

  // 🧩 전체 레이아웃
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0b1324",
        display: "flex",
        flexDirection: "column",
        zIndex: 10,
      }}
    >
      {/* 🎬 유튜브 영상 */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          style={iframeStyle}
        />
      </div>

      {/* ⏱ 진행 바 */}
      <div
        style={{
          padding: "12px 24px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "#cfd8e3",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        <span style={{ minWidth: 56, textAlign: "right" }}>{fmt(current)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step="0.1"
          value={current}
          onChange={(e) => handleSeek(e.target.value)}
          style={{
            flex: 1,
            accentColor: "#60a5fa",
            cursor: "pointer",
          }}
        />
        <span style={{ minWidth: 56 }}>{fmt(duration)}</span>
      </div>

      {/* 🔄 재개 안내 문구 */}
      {resumed && (
        <div
          style={{
            padding: "0 24px 12px",
            fontSize: 14,
            opacity: 0.7,
          }}
        >
          Resumed from {fmt(current)}.
        </div>
      )}
    </div>
  );
}
