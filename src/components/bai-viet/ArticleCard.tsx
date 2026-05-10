/**
 * ArticleCard — Card bài viết trong trang listing.
 * Layout: ảnh 16/9 → cua badge → tiêu đề → excerpt → meta.
 * Hover: scale ảnh + glow border.
 */

import Link from "next/link";
import Image from "next/image";
import { CUA_CONFIG, type Post } from "@/lib/posts";

interface ArticleCardProps {
  post: Post;
}

const CREAM = "#EDE0C4";
const GOLD  = "#C49A28";
const TERRA = "#A0522D";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const href = `/chia-se-kien-thuc/${post.slug}`;
  const cua  = CUA_CONFIG[post.cua] ?? CUA_CONFIG.di;

  return (
    <>
      <style>{`
        .article-card {
          display: flex; flex-direction: column;
          overflow: hidden; border-radius: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(196,154,40,0.1);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .article-card:hover {
          border-color: rgba(196,154,40,0.25);
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.35);
        }
        .article-card:hover .card-img {
          transform: scale(1.05);
        }
        .card-img {
          transition: transform 0.5s ease;
        }
        .article-card-title:hover { color: #D4B050 !important; }
      `}</style>

      <article className="article-card">
        {/* Ảnh cover */}
        <Link
          href={href}
          style={{ display: "block", position: "relative", aspectRatio: "16/9", overflow: "hidden" }}
        >
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="card-img"
            style={{ objectFit: "cover" }}
          />
          {/* Gradient */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(10,18,8,0.75) 0%, transparent 55%)",
          }} />
          {/* Cua badge */}
          <span style={{
            position: "absolute", bottom: 10, left: 12,
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "0.55rem", letterSpacing: "0.25em",
            fontWeight: 700, textTransform: "uppercase",
            color: cua.color, background: cua.bg,
            padding: "0.22rem 0.65rem", borderRadius: 3,
            border: `1px solid ${cua.color}40`,
            backdropFilter: "blur(6px)",
          }}>
            {cua.label}
          </span>
        </Link>

        {/* Nội dung */}
        <div style={{
          display: "flex", flexDirection: "column", flex: 1,
          padding: "1.25rem 1.25rem 1rem",
        }}>
          {/* Tiêu đề */}
          <h2 style={{
            fontFamily: "var(--font-serif, Georgia, serif)",
            fontSize: "clamp(0.95rem, 1.5vw, 1.08rem)",
            fontWeight: 400, lineHeight: 1.45,
            color: CREAM, marginBottom: "0.65rem",
          }}>
            <Link
              href={href}
              className="article-card-title"
              style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
            >
              {post.title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "0.82rem", lineHeight: 1.7,
            color: "rgba(237,224,196,0.45)",
            marginBottom: "1rem", flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {post.excerpt}
          </p>

          {/* Footer */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontFamily: "var(--font-sans, sans-serif)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "0.75rem",
          }}>
            <span style={{ fontSize: "0.68rem", color: "rgba(237,224,196,0.3)", letterSpacing: "0.04em" }}>
              {formatDate(post.date)}
            </span>
            <span style={{ fontSize: "0.68rem", color: "rgba(160,82,45,0.65)", letterSpacing: "0.03em" }}>
              {post.readingTime} đọc
            </span>
          </div>
        </div>
      </article>
    </>
  );
}
