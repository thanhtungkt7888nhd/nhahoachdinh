/**
 * /chia-se-kien-thuc — Trang listing bài viết.
 * Filter theo cua (NGHĨ/LÀM/ĐI/NỐI), pagination đơn giản.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, CUA_CONFIG, type Cua } from "@/lib/posts";
import ArticleCard from "@/components/bai-viet/ArticleCard";

const SITE_URL = "https://nhahoachdinh.vn";
const FOREST   = "#0A1208";
const CREAM    = "#EDE0C4";
const GOLD     = "#C49A28";
const TERRA    = "#A0522D";

export const metadata: Metadata = {
  title: "Chia Sẻ Kiến Thức Farmstay — Nhà Hoạch Định",
  description:
    "Góc chia sẻ chiến lược, kiến thức thực chiến về farmstay và du lịch nông nghiệp Việt Nam từ Phạm Thanh Tùng — 9 năm kinh nghiệm.",
  alternates: { canonical: `${SITE_URL}/chia-se-kien-thuc` },
  openGraph: {
    title: "Chia Sẻ Kiến Thức Farmstay",
    description: "Chiến lược và kiến thức thực chiến về farmstay Việt Nam.",
    url: `${SITE_URL}/chia-se-kien-thuc`,
    type: "website",
  },
};

const CUA_TABS = [
  { key: "all", label: "Tất Cả" },
  { key: "nghi", label: "NGHĨ" },
  { key: "lam",  label: "LÀM" },
  { key: "di",   label: "ĐI" },
  { key: "noi",  label: "NỐI" },
];

interface Props {
  searchParams: Promise<{ cua?: string; page?: string }>;
}

export default async function ChiaSePage({ searchParams }: Props) {
  const { cua: cuaFilter = "all", page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10));
  const perPage = 12;

  const allPosts = getAllPosts();
  const filtered = cuaFilter === "all"
    ? allPosts
    : allPosts.filter((p) => p.cua === cuaFilter);

  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const posts = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <main style={{ background: FOREST, minHeight: "100vh" }}>
      {/* === Header === */}
      <section
        style={{
          padding: "clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 3rem) 3rem",
          maxWidth: "1100px", margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p
          className="font-sans uppercase"
          style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: GOLD, marginBottom: "1rem" }}
        >
          Nhà Hoạch Định · Chia Sẻ Kiến Thức
        </p>
        <h1
          className="font-serif"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, color: CREAM, marginBottom: "1rem" }}
        >
          Kiến Thức Farmstay Việt Nam
        </h1>
        <p
          className="font-sans"
          style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)", color: "rgba(237,224,196,0.55)", maxWidth: "560px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}
        >
          Chiến lược, kinh nghiệm thực chiến và góc nhìn từ 9 năm hoạch định farmstay khắp Việt Nam.
        </p>

        {/* === Filter tabs === */}
        <div className="flex flex-wrap justify-center gap-2">
          {CUA_TABS.map(({ key, label }) => {
            const cuaCfg = key !== "all" ? CUA_CONFIG[key as Cua] : null;
            const isActive = cuaFilter === key;
            return (
              <Link
                key={key}
                href={key === "all" ? "/chia-se-kien-thuc" : `/chia-se-kien-thuc?cua=${key}`}
                className="font-sans font-bold uppercase"
                style={{
                  fontSize: "0.65rem", letterSpacing: "0.2em",
                  padding: "0.4rem 1rem", borderRadius: 3,
                  textDecoration: "none",
                  background: isActive
                    ? (cuaCfg?.bg ?? "rgba(196,154,40,0.2)")
                    : "rgba(255,255,255,0.04)",
                  color: isActive
                    ? (cuaCfg?.color ?? GOLD)
                    : "rgba(237,224,196,0.5)",
                  border: `1px solid ${isActive ? (cuaCfg?.color ?? GOLD) + "60" : "rgba(196,154,40,0.1)"}`,
                  transition: "all 0.2s",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* === Grid bài viết === */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(1rem, 5vw, 3rem) 5rem" }}>
        {posts.length === 0 ? (
          <p className="font-sans text-center" style={{ color: "rgba(237,224,196,0.35)", padding: "4rem 0" }}>
            Chưa có bài viết nào.
          </p>
        ) : (
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}
          >
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* === Pagination === */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2" style={{ marginTop: "3rem" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/chia-se-kien-thuc?${cuaFilter !== "all" ? `cua=${cuaFilter}&` : ""}page=${p}`}
                className="font-sans"
                style={{
                  padding: "0.4rem 0.8rem", borderRadius: 3,
                  background: p === currentPage ? "rgba(196,154,40,0.2)" : "rgba(255,255,255,0.04)",
                  color: p === currentPage ? GOLD : "rgba(237,224,196,0.4)",
                  border: `1px solid ${p === currentPage ? "rgba(196,154,40,0.3)" : "rgba(196,154,40,0.08)"}`,
                  fontSize: "0.8rem", textDecoration: "none",
                }}
              >
                {p}
              </Link>
            ))}
          </div>
        )}

        {/* === Tổng số bài === */}
        <p
          className="font-sans text-center"
          style={{ marginTop: "1.5rem", fontSize: "0.7rem", color: "rgba(237,224,196,0.25)", letterSpacing: "0.05em" }}
        >
          {total} bài viết
        </p>
      </section>
    </main>
  );
}
