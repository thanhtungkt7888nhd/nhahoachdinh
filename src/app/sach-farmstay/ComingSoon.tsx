"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

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

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Gửi email đăng ký — có thể nối API sau, tạm thời chỉ lưu cục bộ
    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => {}); // silent if no API yet
    } catch { /* silent */ }
    setDone(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #060E05 0%, #0A1208 50%, #0D1A0C 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <motion.div
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,154,40,0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Gold hairline top */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "1px",
          background: "linear-gradient(90deg,transparent,rgba(196,154,40,0.5) 30%,rgba(212,176,80,0.8) 50%,rgba(196,154,40,0.5) 70%,transparent)",
          backgroundSize: "200% auto",
          animation: "gold-shimmer 4s linear infinite",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 560, width: "100%", textAlign: "center" }}>

        {/* Tag */}
        <motion.p
          style={{ color: "#C49A28", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "2rem" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          Phạm Thanh Tùng · Nhà Hoạch Định
        </motion.p>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
        >
          <h1
            style={{
              fontFamily: "var(--font-alegreya)",
              fontSize: "clamp(2rem,5vw,3.2rem)",
              color: "#EDE0C4",
              lineHeight: 1.2,
              marginBottom: "0.5rem",
            }}
          >
            Farmstay Bền Vững
          </h1>
          <h2
            style={{
              fontFamily: "var(--font-alegreya)",
              fontSize: "clamp(1.1rem,2.5vw,1.6rem)",
              lineHeight: 1.3,
              marginBottom: "2rem",
              ...shimmerStyle,
            }}
          >
            Hướng Dẫn Thiết Lập
          </h2>
        </motion.div>

        {/* Divider */}
        <motion.div
          style={{
            height: "1px",
            width: "3rem",
            background: "linear-gradient(90deg,transparent,#C49A28,transparent)",
            margin: "0 auto 1.75rem",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease }}
        />

        {/* "Sắp Ra Mắt" badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          style={{ marginBottom: "1.75rem" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C49A28",
              border: "1px solid rgba(196,154,40,0.3)",
              borderRadius: 100,
              padding: "7px 18px",
              background: "rgba(196,154,40,0.07)",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#D4B050" }}
            />
            Sắp Ra Mắt
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          style={{
            fontFamily: "var(--font-nunito)",
            color: "rgba(237,224,196,0.55)",
            fontSize: "0.92rem",
            lineHeight: 1.85,
            marginBottom: "2.5rem",
            maxWidth: 440,
            margin: "0 auto 2.5rem",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease }}
        >
          Cuốn cẩm nang thực chiến từ hơn 9 năm hoạch định 50+ dự án farmstay trên toàn Việt Nam.
          Đang trong quá trình hoàn thiện — sắp ra mắt chính thức.
        </motion.p>

        {/* Notify form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease }}
        >
          {done ? (
            <div
              style={{
                padding: "1rem 2rem",
                border: "1px solid rgba(196,154,40,0.25)",
                borderRadius: 12,
                background: "rgba(196,154,40,0.05)",
                maxWidth: 400,
                margin: "0 auto 2.5rem",
              }}
            >
              <p style={{ fontFamily: "var(--font-nunito)", color: "#D4B050", fontSize: "0.88rem", margin: 0 }}>
                ✓ &nbsp;Đã ghi nhận. Bạn sẽ được thông báo khi sách ra mắt!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleNotify}
              style={{
                display: "flex",
                gap: "0.6rem",
                maxWidth: 420,
                margin: "0 auto 2.5rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email của bạn"
                required
                style={{
                  flex: 1,
                  minWidth: 200,
                  background: "rgba(237,224,196,0.05)",
                  border: "1px solid rgba(196,154,40,0.2)",
                  borderRadius: 8,
                  color: "#EDE0C4",
                  padding: "11px 16px",
                  fontSize: "0.88rem",
                  outline: "none",
                  fontFamily: "var(--font-nunito)",
                }}
              />
              <button
                type="submit"
                style={{
                  flexShrink: 0,
                  background: "linear-gradient(135deg,#C49A28,#D4B050)",
                  color: "#0A1208",
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "11px 22px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Thông Báo Tôi
              </button>
            </form>
          )}
        </motion.div>

        {/* Back + Zalo */}
        <motion.div
          style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-nunito)",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(237,224,196,0.45)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(237,224,196,0.15)",
              paddingBottom: "2px",
              transition: "color 0.2s",
            }}
          >
            ← Về Trang Chủ
          </Link>
          <a
            href="https://zalo.me/0935396705"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-nunito)",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(196,154,40,0.6)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(196,154,40,0.2)",
              paddingBottom: "2px",
            }}
          >
            Liên Hệ Zalo →
          </a>
        </motion.div>
      </div>

      {/* Gold hairline bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "1px",
          background: "linear-gradient(90deg,transparent,rgba(196,154,40,0.4) 40%,rgba(196,154,40,0.4) 60%,transparent)",
        }}
      />
    </div>
  );
}
