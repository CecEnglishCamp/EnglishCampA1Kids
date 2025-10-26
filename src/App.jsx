// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// 기존 페이지
import Home from "./pages/Home.jsx";
import LessonGreetings from "./pages/LessonGreetings.jsx";
import LessonABCDShort from "./pages/LessonABCDShort.jsx";
import LessonABCDLong from "./pages/LessonABCDLong.jsx";

// 새로 추가한 3개
import LessonColors from "./pages/LessonColors.jsx";
import LessonNumbers from "./pages/LessonNumbers.jsx";
import LessonFamily from "./pages/LessonFamily.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* 기존 레슨 */}
      <Route path="/lesson/greetings" element={<LessonGreetings />} />
      <Route path="/lesson/abcd-short" element={<LessonABCDShort />} />
      <Route path="/lesson/abcd-long" element={<LessonABCDLong />} />

      {/* 새 레슨 */}
      <Route path="/lesson/colors" element={<LessonColors />} />
      <Route path="/lesson/numbers" element={<LessonNumbers />} />
      <Route path="/lesson/family" element={<LessonFamily />} />

      {/* 정의 안 된 경로는 홈으로 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
