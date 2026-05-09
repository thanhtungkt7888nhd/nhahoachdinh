/**
 * ArticleMeta — Sidebar thông tin: tác giả, tags, bài liên quan.
 * Sticky trên desktop, hiển thị dưới content trên mobile.
 */

import Link from "next/link";
import { CUA_CONFIG, type Post } from "@/lib/posts";

interface ArticleMetaProps {
  post:    Post;
  related: Post[];
}

const CREAM = "#EDE0C4";
const GOLD  = "#C49A28";
const TERRA = "#A0522D";

export default function ArticleMeta({ post, related }: ArticleMetaProps) {
  const cua = CUA_CONFIG[post.cua] ?? CUA_CONFIG.di;

  return (
    <aside
      className="font-sans"
      style={{ fontSize: "0.8rem", color: "rgba(237,224,196,0.55)" }}
    >
      {/* === Tác giả === */}
      <div
        style={{
          padding: "1.25rem",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(196,154,40,0.1)",
          borderRadius: 8,
          marginBottom: "1.25rem",
        }}
      >
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: "0.5rem" }}>
          Tác giả
        </p>
        <p style={{ color: CREAM, fontWeight: 600, marginBottom: "0.25rem" }}>{post.tac_gia}</p>
        <p style={{ lineHeight: 1.6 }}>Nhà Hoạch Định Farmstay · 9 năm kinh nghiệm</p>
      </div>

      {/* === Thông tin bài === */}
      <div
        style={{
          padding: "1.25rem",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(196,154,40,0.1)",
          borderRadius: 8,
          marginBottom: "1.25rem",
        }}
      >
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: "0.75rem" }}>
          Thông tin bài
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Thời gian đọc</span>
            <span style={{ color: CREAM }}>{post.readingTime}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Ngày đăng</span>
            <span style={{ color: CREAM }}>{formatDate(post.date)}</span>
          </div>
          {post.vung && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Vùng</span>
              <span style={{ color: CREAM, textTransform: "capitalize" }}>{post.vung.replace(/-/g, " ")}</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Cửa</span>
            <span style={{ color: cua.color, fontWeight: 600 }}>{cua.label}</span>
          </div>
        </div>
      </div>

      {/* === Tags === */}
      {post.tags.length > 0 && (
        <div
          style={{
            padding: "1.25rem",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(196,154,40,0.1)",
            borderRadius: 8,
            marginBottom: "1.25rem",
          }}
        >
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: "0.75rem" }}>
            Tags
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "0.2rem 0.6rem",
                  borderRadius: 3,
                  background: "rgba(160,82,45,0.1)",
                  border: "1px solid rgba(160,82,45,0.2)",
                  color: "rgba(237,224,196,0.7)",
                  fontSize: "0.7rem",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* === Bài liên quan === */}
      {related.length > 0 && (
        <div
          style={{
            padding: "1.25rem",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(196,154,40,0.1)",
            borderRadius: 8,
          }}
        >
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD, marginBottom: "0.75rem" }}>
            Bài liên quan
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/chia-se-kien-thuc/${r.slug}`}
                style={{ textDecoration: "none" }}
              >
                <p
                  style={{ color: "rgba(237,224,196,0.75)", lineHeight: 1.5, fontSize: "0.8rem" }}
                  className="related-link-title"
                >
                  {r.title}
                </p>
                <p style={{ color: "rgba(237,224,196,0.35)", fontSize: "0.7rem", marginTop: "0.2rem" }}>
                  {r.readingTime} đọc
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}
