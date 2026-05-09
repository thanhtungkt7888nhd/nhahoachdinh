/**
 * ArticleHero — Hero section cho trang bài viết.
 * Ảnh cover full-width 60vh, gradient overlay, tiêu đề + cua badge.
 */

import Image from "next/image";
import { CUA_CONFIG, type Post } from "@/lib/posts";

interface ArticleHeroProps {
  post: Post;
}

const CREAM = "#EDE0C4";
const GOLD  = "#C49A28";

export default function ArticleHero({ post }: ArticleHeroProps) {
  const cua = CUA_CONFIG[post.cua] ?? CUA_CONFIG.di;

  return (
    <section style={{ position: "relative", width: "100%", height: "clamp(320px, 60vh, 600px)" }}>
      {/* Cover image */}
      <Image
        src={post.cover}
        alt={post.title}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />

      {/* Dark gradient overlay — bottom heavy */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(6,12,8,0.92) 0%, rgba(6,12,8,0.5) 50%, rgba(6,12,8,0.2) 100%)",
        }}
      />

      {/* Content overlay */}
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "clamp(1.5rem, 5vw, 3rem)",
          maxWidth: "1100px", margin: "0 auto", left: 0, right: 0,
        }}
      >
        {/* Cua badge */}
        <span
          className="font-sans font-bold uppercase"
          style={{
            display: "inline-block", width: "fit-content",
            fontSize: "0.6rem", letterSpacing: "0.25em",
            color: cua.color, background: cua.bg,
            padding: "0.25rem 0.75rem", borderRadius: 3,
            border: `1px solid ${cua.color}40`,
            backdropFilter: "blur(8px)",
            marginBottom: "1rem",
          }}
        >
          {cua.label}
        </span>

        {/* Tiêu đề */}
        <h1
          className="font-serif"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 3rem)",
            fontWeight: 400,
            lineHeight: 1.25,
            color: CREAM,
            marginBottom: "1rem",
            maxWidth: "820px",
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}
        >
          {post.title}
        </h1>

        {/* Quick meta */}
        <div
          className="font-sans flex flex-wrap gap-4"
          style={{ fontSize: "0.75rem", color: "rgba(237,224,196,0.6)", letterSpacing: "0.05em" }}
        >
          {post.vung && (
            <span style={{ color: GOLD, textTransform: "uppercase", fontSize: "0.65rem", letterSpacing: "0.15em" }}>
              {post.vung.replace(/-/g, " ")}
            </span>
          )}
          <span>{post.readingTime} đọc</span>
          <span>{formatDate(post.date)}</span>
        </div>
      </div>
    </section>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" });
}
