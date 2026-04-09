import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xuyên Việt Farmstay 2025 | Phạm Thanh Tùng",
};

const goldShimmerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg,#6A4C10 0%,#A07820 20%,#C49A28 35%,#D4B050 50%,#C49A28 65%,#A07820 80%,#6A4C10 100%)",
  backgroundSize: "300% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "gold-shimmer 5s linear infinite",
};

export default function XVF2025Page() {
  return (
    <>
      <style>{`
        @keyframes gold-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
      `}</style>
      <div
        style={{
          marginTop: "72px",
          background: "#0A1208",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ ...goldShimmerStyle, fontFamily: "var(--font-alegreya)", fontSize: "5rem", fontWeight: 700, marginBottom: "1rem" }}>
          2025
        </div>
        <h1 style={{ fontFamily: "var(--font-alegreya)", color: "#EDE0C4", fontSize: "clamp(1.8rem,3vw,2.5rem)", fontWeight: 700, marginBottom: "1rem" }}>
          Xuyên Việt Farmstay 2025
        </h1>
        <p style={{ color: "#D4C8A4", fontFamily: "var(--font-nunito)", fontSize: "14px", marginBottom: "2.5rem" }}>
          Trang đang được xây dựng · Sắp ra mắt
        </p>
        <Link
          href="/xuyen-viet-farmstay"
          style={{
            color: "#C49A28",
            fontFamily: "var(--font-nunito)",
            fontSize: "12px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "1px solid rgba(196,154,40,0.4)",
            padding: "10px 24px",
            borderRadius: "6px",
          }}
        >
          ← Quay Lại
        </Link>
      </div>
    </>
  );
}
