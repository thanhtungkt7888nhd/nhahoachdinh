"use client";
/**
 * ShareButtons — Nút chia sẻ bài nhật ký (Facebook, Zalo, Copy link).
 * Client component vì cần clipboard API.
 */

import { useState } from "react";

interface ShareButtonsProps {
  url: string;
}

const TERRA  = "#A0522D";
const GREEN  = "#2D4A2B";
const CREAM  = "#EDE0C4";

export default function ShareButtons({ url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: không làm gì
    }
  }

  const btnBase: React.CSSProperties = {
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    color: "rgba(45,74,43,0.8)",
    background: "rgba(45,74,43,0.1)",
    border: "1px solid rgba(45,74,43,0.25)",
    padding: "0.35rem 0.9rem",
    borderRadius: 3,
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: "var(--font-sans, sans-serif)",
  };

  return (
    <div
      className="flex items-center gap-3 mb-12 pb-8"
      style={{ borderBottom: "1px solid rgba(196,154,40,0.1)" }}
    >
      <span
        className="font-sans uppercase mr-2"
        style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: "rgba(237,224,196,0.3)" }}
      >
        Chia sẻ
      </span>

      {[
        {
          label: "Facebook",
          href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        },
        {
          label: "Zalo",
          href: `https://zalo.me/share/url?url=${encodeURIComponent(url)}`,
        },
      ].map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={btnBase}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, { background: GREEN, color: CREAM, borderColor: GREEN });
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, {
              background: "rgba(45,74,43,0.1)",
              color: "rgba(45,74,43,0.8)",
              borderColor: "rgba(45,74,43,0.25)",
            });
          }}
        >
          {label}
        </a>
      ))}

      <button
        onClick={handleCopy}
        style={{ ...btnBase, ...(copied ? { background: GREEN, color: CREAM, borderColor: GREEN } : {}) }}
        aria-label="Sao chép liên kết"
        onMouseEnter={(e) => {
          if (!copied) Object.assign(e.currentTarget.style, { background: GREEN, color: CREAM, borderColor: GREEN });
        }}
        onMouseLeave={(e) => {
          if (!copied) Object.assign(e.currentTarget.style, {
            background: "rgba(45,74,43,0.1)",
            color: "rgba(45,74,43,0.8)",
            borderColor: "rgba(45,74,43,0.25)",
          });
        }}
      >
        {copied ? "✓ Đã sao chép" : "Sao chép link"}
      </button>
    </div>
  );
}
