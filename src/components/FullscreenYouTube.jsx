// src/components/FullscreenYouTube.jsx
import React, { useRef, useState } from "react";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";

export default function FullscreenYouTube({ videoId }) {
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const [needsTap, setNeedsTap] = useState(false);

  const opts = {
    width: "100%",
    playerVars: {
      rel: 0,
      modestbranding: 1,
      controls: 0,
      autoplay: 1,   // 자동재생 시도
      fs: 1,
      playsinline: 1,
      origin: window.location.origin,
    },
  };

  const tryFullscreenAndPlay = async () => {
    try {
      const player = playerRef.current;
      if (!player) return;
      const iframe = player.getIframe();

      // 자동재생 차단 대비: 처음엔 mute로 재생 → 잠시 뒤 unmute
      player.mute();
      player.playVideo();

      if (iframe.requestFullscreen) {
        await iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }

      setTimeout(() => player.unMute(), 800);
    } catch (e) {
      // 사용자 제스처 필요 → 큰 버튼 노출
      setNeedsTap(true);
    }
  };

  const onReady = (e) => {
    playerRef.current = e.target;
    // 로드 직후 전체화면+재생 시도
    tryFullscreenAndPlay();
  };

  const onEnd = () => {
    // 끝나면 홈으로 복귀
    navigate("/", { replace: true });
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} onEnd={onEnd} />
      {needsTap && (
        <div
          onClick={tryFullscreenAndPlay}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
        >
          ▶ Tap to play full-screen
        </div>
      )}
    </div>
  );
}
