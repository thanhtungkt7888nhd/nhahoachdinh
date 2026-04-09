import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tư Vấn / Cố Vấn | Phạm Thanh Tùng",
};

export default function TuVanPage() {
  return (
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
      <h1
        style={{
          fontFamily: "var(--font-alegreya)",
          color: "#EDE0C4",
          fontSize: "clamp(2rem,4vw,3rem)",
          fontWeight: 700,
          marginBottom: "1rem",
        }}
      >
        Tư Vấn / Cố Vấn
      </h1>
      <p style={{ color: "#D4C8A4", fontFamily: "var(--font-nunito)", fontSize: "14px", marginBottom: "2.5rem" }}>
        Đang cập nhật · Sắp ra mắt
      </p>
      <Link
        href="/"
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
        ← Trang Chủ
      </Link>
    </div>
  );
}
