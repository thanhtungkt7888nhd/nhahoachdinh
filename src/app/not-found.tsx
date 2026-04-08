"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const shimmerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg,#6A4C10 0%,#A07820 20%,#C49A28 35%,#D4B050 50%,#C49A28 65%,#A07820 80%,#6A4C10 100%)",
  backgroundSize: "300% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "gold-shimmer 5s linear infinite",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #060E05 0%, #0A1208 50%, #0D1A0C 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold hairline top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg,transparent,rgba(196,154,40,0.55) 30%,rgba(212,176,80,0.85) 50%,rgba(196,154,40,0.55) 70%,transparent)",
          backgroundSize: "200% auto",
          animation: "gold-shimmer 4s linear infinite",
          zIndex: 10,
        }}
      />

      {/* Gold hairline bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg,transparent,rgba(196,154,40,0.55) 30%,rgba(212,176,80,0.85) 50%,rgba(196,154,40,0.55) 70%,transparent)",
          backgroundSize: "200% auto",
          animation: "gold-shimmer 4s linear infinite",
          zIndex: 10,
        }}
      />

      {/* Ambient gold glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,154,40,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "2rem",
          maxWidth: "520px",
        }}
      >
        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease }}
        >
          <p
            style={{
              fontFamily: "var(--font-alegreya)",
              fontSize: "clamp(6rem, 20vw, 10rem)",
              fontWeight: 700,
              lineHeight: 1,
              marginBottom: "0.25rem",
              ...shimmerStyle,
            }}
          >
            404
          </p>
        </motion.div>

        {/* Gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          style={{
            height: "1px",
            width: "3rem",
            margin: "0 auto 1.75rem",
            background: "linear-gradient(90deg, transparent, rgba(196,154,40,0.7), transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Main message */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          style={{
            fontFamily: "var(--font-alegreya)",
            fontSize: "clamp(1.35rem, 3vw, 1.9rem)",
            fontWeight: 400,
            color: "#EDE0C4",
            marginBottom: "0.9rem",
            letterSpacing: "-0.01em",
          }}
        >
          Trang bạn tìm không tồn tại
        </motion.h1>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          style={{
            fontFamily: "var(--font-nunito)",
            fontSize: "0.9rem",
            color: "rgba(237,224,196,0.5)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          Có thể đường dẫn đã thay đổi hoặc trang chưa được tạo.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55, ease }}
          style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "11px 24px",
              background: "rgba(196,154,40,0.1)",
              border: "1px solid rgba(196,154,40,0.4)",
              borderRadius: "8px",
              color: "#D4B050",
              fontFamily: "var(--font-nunito)",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(196,154,40,0.18)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(196,154,40,0.65)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(196,154,40,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(196,154,40,0.4)";
            }}
          >
            ← Về Trang Chủ
          </Link>

          <Link
            href="/chia-se-kien-thuc"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "11px 24px",
              background: "transparent",
              border: "1px solid rgba(196,154,40,0.2)",
              borderRadius: "8px",
              color: "rgba(237,224,196,0.65)",
              fontFamily: "var(--font-nunito)",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(196,154,40,0.07)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(196,154,40,0.38)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#EDE0C4";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(196,154,40,0.2)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(237,224,196,0.65)";
            }}
          >
            Xem Bài Viết
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
