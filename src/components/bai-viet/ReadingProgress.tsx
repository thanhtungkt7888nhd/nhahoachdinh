"use client";
/**
 * ReadingProgress — Thanh tiến độ đọc bài, hiện ở đầu trang.
 * Client component vì cần scroll event.
 */
import { useEffect, useState } from "react";

const GOLD = "#C49A28";

export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "3px", background: "rgba(255,255,255,0.06)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${GOLD}, #E8C84A)`,
          transition: "width 0.1s linear",
          boxShadow: `0 0 8px ${GOLD}60`,
        }}
      />
    </div>
  );
}
