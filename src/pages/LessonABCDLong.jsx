// src/pages/LessonABCDLong.jsx
import React from "react";
import YouTubeWithProgress from "../components/YouTubeWithProgress";

export default function LessonABCDLong() {
  return (
    <YouTubeWithProgress
      videoId="QLXSkaJnoJI"                 // 긴 버전 예시
      storageKey="ecA1_abcd_long_progress"
      autoReturnOnEnd={true}
      fillScreen={true}                     // 화면 가득 채우기
      showNativeControls={false}            // 커스텀 바 보이게
    />
  );
}
