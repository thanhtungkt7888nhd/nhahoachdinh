/**
 * ArticleCard — Card trong trang listing.
 * Hover: scale ảnh + border glow + translateY.
 * CSS-only hover (Server Component — không dùng event handler).
 */

import Link  from "next/link";
import Image from "next/image";
import type { Article } from "../lib/types";

interface Props {
  post:     Article;
  hrefBase: string; // e.g. "/chia-se-kien-thuc" hoặc "/blog"
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function ArticleCard({ post, hrefBase }: Props) {
  const href = `${hrefBase}/${post.slug}`;

  return (
    <>
      <style>{`
        .de-card {
          display: flex; flex-direction: column;
          overflow: hidden; border-radius: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--de-border);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .de-card:hover {
          border-color: color-mix(in srgb, var(--de-accent) 25%, transparent);
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.35);
        }
        .de-card:hover .de-card-img { transform: scale(1.05); }
        .de-card-img { transition: transform 0.5s ease; }
        .de-card-title:hover { color: var(--de-accent-2) !important; }
      `}</style>

      <article className="de-card">
        {/* Ảnh */}
        <Link href={href} style={{ display: "block", position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="de-card-img"
            style={{ objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
          }} />
          {post.category && (
            <span style={{
              position: "absolute", bottom: 10, left: 12,
              fontFamily: "var(--de-font-sans)",
              fontSize: "0.55rem", letterSpacing: "0.25em",
              fontWeight: 700, textTransform: "uppercase",
              color: "var(--de-accent)",
              background: "rgba(0,0,0,0.45)",
              padding: "0.22rem 0.65rem", borderRadius: 3,
              border: "1px solid color-mix(in srgb, var(--de-accent) 40%, transparent)",
              backdropFilter: "blur(6px)",
            }}>
              {post.category}
            </span>
          )}
        </Link>

        {/* Nội dung */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "1.25rem 1.25rem 1rem" }}>
          <h2 style={{
            fontFamily: "var(--de-font-serif)",
            fontSize: "clamp(0.95rem, 1.5vw, 1.08rem)",
            fontWeight: 400, lineHeight: 1.45,
            color: "var(--de-fg)", marginBottom: "0.65rem",
          }}>
            <Link href={href} className="de-card-title" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}>
              {post.title}
            </Link>
          </h2>

          {post.excerpt && (
            <p style={{
              fontFamily: "var(--de-font-sans)",
              fontSize: "0.82rem", lineHeight: 1.7,
              color: "var(--de-fg-muted)",
              marginBottom: "1rem", flex: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {post.excerpt}
            </p>
          )}

          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontFamily: "var(--de-font-sans)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "0.75rem",
          }}>
            <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>
              {formatDate(post.date)}
            </span>
            {post.readingTime && (
              <span style={{ fontSize: "0.68rem", color: "color-mix(in srgb, var(--de-warm) 65%, transparent)" }}>
                {post.readingTime} đọc
              </span>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
