// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LessonGreetings from "./pages/LessonGreetings.jsx";
import LessonABCDShort from "./pages/LessonABCDShort.jsx";
import LessonABCDLong from "./pages/LessonABCDLong.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* 인사 레슨 */}
      <Route path="/lesson/greetings" element={<LessonGreetings />} />

      {/* ABCD – 유튜브 영상 두 버전 */}
      <Route path="/lesson/abcd-short" element={<LessonABCDShort />} />
      <Route path="/lesson/abcd-long" element={<LessonABCDLong />} />

      {/* 정의 안 된 경로는 홈으로 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
