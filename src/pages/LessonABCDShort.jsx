// src/pages/LessonABCDShort.jsx
import React from "react";
import YouTubeWithProgress from "../components/YouTubeWithProgress";

export default function LessonABCDShort() {
  return (
    <YouTubeWithProgress
      videoId="wfWQf6gkf5M"                  // 짧은 버전(요청하신 링크)
      storageKey="ecA1_abcd_short_progress"
      autoReturnOnEnd={true}
      fillScreen={true}                      // 화면 가득 채우기 + 진행바 보임
      showNativeControls={false}            // 커스텀 바만 사용
    />
  );
}
