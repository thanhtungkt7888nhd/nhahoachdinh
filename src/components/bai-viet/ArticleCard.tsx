/**
 * ArticleCard — Card hiển thị bài viết trong trang listing.
 * Layout: ảnh cover → cua badge → tiêu đề → excerpt → meta.
 */

import Link from "next/link";
import Image from "next/image";
import { CUA_CONFIG, type Post } from "@/lib/posts";

interface ArticleCardProps {
  post: Post;
}

const FOREST = "#0A1208";
const CREAM  = "#EDE0C4";
const TERRA  = "#A0522D";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const href = `/chia-se-kien-thuc/${post.slug}`;
  const cua  = CUA_CONFIG[post.cua] ?? CUA_CONFIG.di;

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-lg"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(196,154,40,0.1)" }}
    >
      {/* Ảnh cover */}
      <Link href={href} className="block overflow-hidden" style={{ aspectRatio: "16/9", position: "relative" }}>
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
          className="group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(10,18,8,0.7) 0%, transparent 60%)",
          }}
        />
        {/* Cua badge overlay */}
        <span
          className="absolute bottom-3 left-3 font-sans font-bold uppercase"
          style={{
            fontSize: "0.6rem", letterSpacing: "0.2em",
            color: cua.color, background: cua.bg,
            padding: "0.2rem 0.6rem", borderRadius: 3,
            backdropFilter: "blur(4px)",
          }}
        >
          {cua.label}
        </span>
      </Link>

      {/* Nội dung */}
      <div className="flex flex-col flex-1 p-4">
        <h2
          className="font-serif font-normal leading-snug mb-2"
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)", color: CREAM }}
        >
          <Link
            href={href}
            className="article-card-title-link"
            style={{ color: "inherit" }}
          >
            {post.title}
          </Link>
        </h2>

        <p
          className="font-sans line-clamp-2 mb-3 flex-1"
          style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "rgba(237,224,196,0.5)" }}
        >
          {post.excerpt}
        </p>

        {/* Footer meta */}
        <div
          className="flex items-center justify-between font-sans"
          style={{ fontSize: "0.7rem", color: "rgba(237,224,196,0.35)", letterSpacing: "0.05em" }}
        >
          <span>{formatDate(post.date)}</span>
          <span style={{ color: "rgba(160,82,45,0.6)" }}>{post.readingTime} đọc</span>
        </div>
      </div>
    </article>
  );
}
