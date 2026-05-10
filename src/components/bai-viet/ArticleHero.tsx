/**
 * ArticleHero — Hero section bài viết.
 * Ảnh cover full-width, gradient overlay nhiều tầng, tiêu đề + meta overlay.
 */

import Image from "next/image";
import Link from "next/link";
import { CUA_CONFIG, type Post } from "@/lib/posts";

interface ArticleHeroProps {
  post: Post;
}

const CREAM = "#EDE0C4";
const GOLD  = "#C49A28";

export default function ArticleHero({ post }: ArticleHeroProps) {
  const cua = CUA_CONFIG[post.cua] ?? CUA_CONFIG.di;

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(380px, 68vh, 680px)",
      }}
    >
      {/* Ảnh cover */}
      <Image
        src={post.cover}
        alt={post.title}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 40%" }}
      />

      {/* Gradient overlay: 3 tầng để nền thật sâu */}
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "linear-gradient(to top, rgba(6,12,8,0.97) 0%, rgba(6,12,8,0.6) 45%, transparent 75%)",
          "linear-gradient(to right, rgba(6,12,8,0.3) 0%, transparent 60%)",
        ].join(", "),
      }} />

      {/* Nội dung overlay */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "clamp(1.5rem, 5vw, 3.5rem)",
        maxWidth: "1100px", margin: "0 auto", left: 0, right: 0,
      }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: "1.25rem" }}>
          <Link
            href="/chia-se-kien-thuc"
            style={{
              fontSize: "0.65rem", letterSpacing: "0.2em",
              color: "rgba(237,224,196,0.45)",
              textDecoration: "none", textTransform: "uppercase",
              fontFamily: "var(--font-sans, sans-serif)",
            }}
          >
            ← Chia sẻ kiến thức
          </Link>
        </div>

        {/* Cua badge */}
        <div style={{ marginBottom: "1rem" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: "0.58rem", letterSpacing: "0.3em",
              fontFamily: "var(--font-sans, sans-serif)",
              fontWeight: 700, textTransform: "uppercase",
              color: cua.color, background: cua.bg,
              padding: "0.28rem 0.8rem", borderRadius: 3,
              border: `1px solid ${cua.color}50`,
              backdropFilter: "blur(8px)",
            }}
          >
            {cua.label}
          </span>
        </div>

        {/* Tiêu đề */}
        <h1
          style={{
            fontFamily: "var(--font-serif, Georgia, serif)",
            fontSize: "clamp(1.7rem, 4.5vw, 3.2rem)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: CREAM,
            marginBottom: "1.25rem",
            maxWidth: "820px",
            textShadow: "0 2px 20px rgba(0,0,0,0.6)",
            letterSpacing: "-0.01em",
          }}
        >
          {post.title}
        </h1>

        {/* Meta row */}
        <div
          style={{
            display: "flex", flexWrap: "wrap", alignItems: "center",
            gap: "0.5rem 1.5rem",
            fontFamily: "var(--font-sans, sans-serif)",
          }}
        >
          {post.vung && (
            <span style={{
              fontSize: "0.6rem", letterSpacing: "0.2em",
              textTransform: "uppercase", color: GOLD,
              padding: "0.15rem 0",
              borderBottom: `1px solid ${GOLD}40`,
            }}>
              {post.vung.replace(/-/g, " ")}
            </span>
          )}
          <span style={{ fontSize: "0.72rem", color: "rgba(237,224,196,0.5)" }}>
            {post.readingTime} đọc
          </span>
          <span style={{ fontSize: "0.72rem", color: "rgba(237,224,196,0.35)" }}>
            {formatDate(post.date)}
          </span>
          <span style={{
            fontSize: "0.68rem", color: "rgba(237,224,196,0.4)",
            letterSpacing: "0.05em",
          }}>
            {post.tac_gia}
          </span>
        </div>
      </div>

      {/* Fade bottom vào nền */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "120px",
        background: "linear-gradient(to bottom, transparent, #0A1208)",
        pointerEvents: "none",
      }} />
    </section>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" });
}
