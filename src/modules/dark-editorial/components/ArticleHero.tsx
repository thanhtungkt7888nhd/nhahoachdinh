/**
 * ArticleHero — Hero section bài viết, dùng CSS variables.
 * Props: post (Article type), backHref (link breadcrumb), backLabel.
 */

import Image from "next/image";
import Link  from "next/link";
import type { Article } from "../lib/types";

interface Props {
  post:       Article;
  backHref?:  string;
  backLabel?: string;
}

export default function ArticleHero({
  post,
  backHref  = "/blog",
  backLabel = "← Bài viết",
}: Props) {
  return (
    <section style={{
      position: "relative",
      width: "100%",
      height: "clamp(380px, 68vh, 680px)",
    }}>
      {/* Ảnh cover */}
      <Image
        src={post.cover}
        alt={post.title}
        fill priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 40%" }}
      />

      {/* Gradient overlay — 2 tầng */}
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 45%, transparent 75%)",
          "linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 60%)",
        ].join(", "),
      }} />

      {/* Content overlay */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "clamp(1.5rem, 5vw, 3.5rem)",
        maxWidth: "1100px", margin: "0 auto", left: 0, right: 0,
      }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: "1.25rem" }}>
          <Link href={backHref} style={{
            fontSize: "0.65rem", letterSpacing: "0.2em",
            color: "var(--de-fg-muted)",
            textDecoration: "none", textTransform: "uppercase",
            fontFamily: "var(--de-font-sans)",
          }}>
            {backLabel}
          </Link>
        </div>

        {/* Category badge (nếu có) */}
        {post.category && (
          <div style={{ marginBottom: "1rem" }}>
            <span style={{
              display: "inline-block",
              fontSize: "0.58rem", letterSpacing: "0.3em",
              fontFamily: "var(--de-font-sans)",
              fontWeight: 700, textTransform: "uppercase",
              color: "var(--de-accent)",
              background: "rgba(0,0,0,0.4)",
              padding: "0.28rem 0.8rem", borderRadius: 3,
              border: "1px solid color-mix(in srgb, var(--de-accent) 40%, transparent)",
              backdropFilter: "blur(8px)",
            }}>
              {post.category}
            </span>
          </div>
        )}

        {/* Tiêu đề */}
        <h1 style={{
          fontFamily: "var(--de-font-serif)",
          fontSize: "clamp(1.7rem, 4.5vw, 3.2rem)",
          fontWeight: 400, lineHeight: 1.2,
          color: "var(--de-fg)",
          marginBottom: "1.25rem",
          maxWidth: "820px",
          textShadow: "0 2px 20px rgba(0,0,0,0.6)",
          letterSpacing: "-0.01em",
        }}>
          {post.title}
        </h1>

        {/* Meta row */}
        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "center",
          gap: "0.5rem 1.5rem",
          fontFamily: "var(--de-font-sans)",
        }}>
          {post.region && (
            <span style={{
              fontSize: "0.6rem", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "var(--de-accent)",
              borderBottom: "1px solid color-mix(in srgb, var(--de-accent) 30%, transparent)",
              padding: "0.15rem 0",
            }}>
              {post.region}
            </span>
          )}
          {post.readingTime && (
            <span style={{ fontSize: "0.72rem", color: "var(--de-fg-muted)" }}>
              {post.readingTime} đọc
            </span>
          )}
          <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>
            {formatDate(post.date)}
          </span>
          {post.author && (
            <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)" }}>
              {post.author}
            </span>
          )}
        </div>
      </div>

      {/* Fade bottom → blend vào nền */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "120px",
        background: "linear-gradient(to bottom, transparent, var(--de-bg))",
        pointerEvents: "none",
      }} />
    </section>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" });
}
