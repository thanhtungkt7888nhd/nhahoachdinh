"use client";
/**
 * ReadingProgress — Thanh tiến độ đọc bài.
 * Dùng CSS variable --de-accent (set bởi theme).
 * Client component — cần scroll event.
 */
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? Math.min(100, (el.scrollTop / total) * 100) : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: "3px", background: "rgba(255,255,255,0.06)", pointerEvents: "none",
    }}>
      <div style={{
        height: "100%",
        width: `${pct}%`,
        background: "linear-gradient(90deg, var(--de-accent), var(--de-accent-2))",
        transition: "width 0.1s linear",
        boxShadow: "0 0 8px color-mix(in srgb, var(--de-accent) 60%, transparent)",
      }} />
    </div>
  );
}
