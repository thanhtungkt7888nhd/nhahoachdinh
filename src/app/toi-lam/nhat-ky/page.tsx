/**
 * /nhat-ky — Trang feed nhật ký nhà hoạch định.
 * Danh sách bài, filter 4 thể loại, sidebar desktop.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { getAllEntries, getAllTags, getTopEntriesThisMonth } from "@/lib/nhat-ky";
import EntryCard from "@/components/nhat-ky/EntryCard";
import Sidebar from "@/components/nhat-ky/Sidebar";

export const metadata: Metadata = {
  title: "Nhật Ký Nhà Hoạch Định — Phạm Thanh Tùng",
  description:
    "Quan sát, câu hỏi, đoạn sách và ghi chú thực địa — những mảnh nhỏ từ hành trình hoạch định farmstay.",
  alternates: { canonical: "https://nhahoachdinh.vn/toi-lam/nhat-ky" },
  openGraph: {
    title: "Nhật Ký Nhà Hoạch Định",
    description: "Những mảnh ghi chép ngắn từ 9+ năm hoạch định farmstay Việt Nam.",
    url: "https://nhahoachdinh.vn/toi-lam/nhat-ky",
    type: "website",
  },
};

const FOREST  = "#060C08";
const GOLD    = "#C49A28";
const CREAM   = "#EDE0C4";
const TERRA   = "#A0522D";
const GREEN   = "#2D4A2B";

const TYPES = [
  { key: "all",          label: "Tất cả" },
  { key: "quan-sat",     label: "◉ Quan Sát" },
  { key: "cau-hoi",      label: "? Câu Hỏi" },
  { key: "trich-dan",    label: "\u201C Trích Dẫn" },
  { key: "hien-truong",  label: "◈ Hiện Trường" },
];

const PER_PAGE = 10;

interface Props {
  searchParams: Promise<{ type?: string; page?: string }>;
}

export default async function NhatKyPage({ searchParams }: Props) {
  const { type = "all", page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10));

  const allEntries   = getAllEntries();
  const topEntries   = getTopEntriesThisMonth();
  const allTags      = getAllTags();

  const filtered = type === "all"
    ? allEntries
    : allEntries.filter((e) => e.type === type);

  const total    = filtered.length;
  const start    = (currentPage - 1) * PER_PAGE;
  const entries  = filtered.slice(start, start + PER_PAGE);
  const hasPrev  = currentPage > 1;
  const hasNext  = start + PER_PAGE < total;

  return (
    <main style={{ background: FOREST, minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section
        className="px-6 text-center border-b"
        style={{
          paddingTop: "clamp(6rem, 12vw, 9rem)",
          paddingBottom: "3.5rem",
          borderColor: "rgba(196,154,40,0.12)",
          background: `linear-gradient(180deg, #030806 0%, ${FOREST} 100%)`,
        }}
      >
        <p
          className="font-sans font-bold uppercase mb-5"
          style={{ fontSize: "0.62rem", letterSpacing: "0.4em", color: TERRA }}
        >
          Nhật Ký
        </p>

        <h1
          className="font-serif font-normal mx-auto"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3rem)",
            lineHeight: 1.18,
            color: CREAM,
            maxWidth: 560,
            letterSpacing: "-0.015em",
            marginBottom: "1.1rem",
          }}
        >
          Những mảnh ghi chép<br />của Nhà Hoạch Định
        </h1>

        <div className="mx-auto mb-6" style={{
          height: 1, width: 48,
          background: `linear-gradient(90deg, transparent, ${TERRA}, transparent)`,
        }} />

        <p
          className="font-sans mx-auto mb-8"
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.75,
            color: "rgba(237,224,196,0.5)",
            maxWidth: 420,
          }}
        >
          Quan sát, câu hỏi, đoạn sách, ghi chú thực địa — không thêm không bớt.
        </p>

        {/* Filter chips — trong hero */}
        <div className="flex flex-wrap justify-center gap-2">
          {TYPES.map(({ key, label }) => {
            const isActive = type === key;
            const href = key === "all" ? "/toi-lam/nhat-ky" : `/toi-lam/nhat-ky?type=${key}`;
            return (
              <Link
                key={key}
                href={href}
                className="font-sans font-semibold uppercase transition-all duration-200"
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.18em",
                  padding: "0.4rem 1rem",
                  borderRadius: 3,
                  background: isActive ? GREEN : "rgba(45,74,43,0.08)",
                  border: `1px solid ${isActive ? "rgba(45,74,43,0.8)" : "rgba(45,74,43,0.25)"}`,
                  color: isActive ? CREAM : "rgba(237,224,196,0.45)",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Body: feed + sidebar ── */}
      <div
        className="mx-auto px-5"
        style={{
          maxWidth: 1100,
          paddingTop: "4rem",
          paddingBottom: "5rem",
          display: "flex",
          gap: "4.5rem",
          alignItems: "flex-start",
        }}
      >
        {/* Feed */}
        <div style={{ flex: 1, minWidth: 0, maxWidth: 680 }}>
          {entries.length === 0 ? (
            <p className="font-sans" style={{ color: "rgba(237,224,196,0.4)", fontSize: "0.9rem" }}>
              Chưa có bài nào trong thể loại này.
            </p>
          ) : (
            <div>
              {entries.map((entry, idx) => (
                <div key={entry.slug}>
                  <EntryCard entry={entry} />

                  {/* Separator — đường mảnh căn giữa */}
                  {idx < entries.length - 1 && (
                    <div
                      className="my-12 mx-auto"
                      style={{
                        width: 48, height: 1,
                        background: `linear-gradient(90deg, transparent, rgba(160,82,45,0.4), transparent)`,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {(hasPrev || hasNext) && (
            <div
              className="flex items-center justify-between mt-16 pt-8 font-sans"
              style={{ borderTop: "1px solid rgba(196,154,40,0.1)" }}
            >
              {hasPrev ? (
                <Link
                  href={`/toi-lam/nhat-ky?${type !== "all" ? `type=${type}&` : ""}page=${currentPage - 1}`}
                  className="transition-colors duration-200"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.08em", color: TERRA }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C4723D"}
                  onMouseLeave={(e) => e.currentTarget.style.color = TERRA}
                >
                  ← Trang trước
                </Link>
              ) : <span />}
              {hasNext && (
                <Link
                  href={`/toi-lam/nhat-ky?${type !== "all" ? `type=${type}&` : ""}page=${currentPage + 1}`}
                  className="transition-colors duration-200"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.08em", color: TERRA }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C4723D"}
                  onMouseLeave={(e) => e.currentTarget.style.color = TERRA}
                >
                  Trang sau →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar topEntries={topEntries} allTags={allTags} />
      </div>

    </main>
  );
}
