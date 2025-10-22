// src/components/YouTubeEmbed.jsx
import React from "react";

export default function YouTubeEmbed({ id, title = "YouTube video" }) {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%", // 16:9
        height: 0,
        overflow: "hidden",
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,.3)",
      }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&controls=1&showinfo=0&fs=1&autoplay=0&enablejsapi=1&origin=${window.location.origin}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />
    </div>
  );
}
