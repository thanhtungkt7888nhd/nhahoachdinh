"use client";
/**
 * Sidebar — Cột phải sticky trên desktop: bài đọc nhiều + tag cloud + đăng ký.
 * Chỉ render trên desktop ≥1024px (hidden lg:block).
 */

import Link from "next/link";
import type { NhatKyEntry } from "@/lib/nhat-ky";

interface SidebarProps {
  topEntries: NhatKyEntry[];
  allTags: string[];
}

const GOLD  = "#C49A28";
const TERRA = "#A0522D";
const CREAM = "#EDE0C4";
const GREEN = "#2D4A2B";

export default function Sidebar({ topEntries, allTags }: SidebarProps) {
  return (
    <aside className="hidden lg:block" style={{ width: 272, flexShrink: 0 }}>
      <div className="sticky" style={{ top: "6rem" }}>

        {/* Đọc nhiều tháng này */}
        <section className="mb-8">
          <p
            className="font-sans font-bold uppercase mb-4"
            style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(196,154,40,0.6)" }}
          >
            Đọc nhiều tháng này
          </p>
          <div className="flex flex-col gap-4">
            {topEntries.map((entry, idx) => (
              <Link key={entry.slug} href={`/toi-lam/nhat-ky/${entry.slug}`} className="group block">
                <div className="flex items-start gap-3">
                  <span
                    className="font-serif flex-shrink-0"
                    style={{ fontSize: "1.1rem", color: "rgba(196,154,40,0.3)", lineHeight: 1 }}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <p
                      className="font-serif leading-snug transition-colors duration-200 group-hover:text-[#D4B050]"
                      style={{ fontSize: "0.85rem", color: CREAM }}
                    >
                      {entry.title}
                    </p>
                    <p
                      className="font-sans mt-0.5"
                      style={{ fontSize: "0.65rem", color: "rgba(237,224,196,0.35)", letterSpacing: "0.08em" }}
                    >
                      {entry.readingTime} đọc
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(196,154,40,0.1)", marginBottom: "2rem" }} />

        {/* Tag cloud */}
        <section className="mb-8">
          <p
            className="font-sans font-bold uppercase mb-4"
            style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(196,154,40,0.6)" }}
          >
            Theo thẻ
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`/toi-lam/nhat-ky?tag=${encodeURIComponent(tag)}`}
                className="font-sans transition-all duration-200"
                style={{
                  fontSize: "0.68rem",
                  color: "rgba(45,74,43,0.85)",
                  background: "rgba(45,74,43,0.15)",
                  border: "1px solid rgba(45,74,43,0.25)",
                  padding: "0.2rem 0.65rem",
                  borderRadius: 3,
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(45,74,43,0.3)";
                  e.currentTarget.style.color = "#7EAA7E";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(45,74,43,0.15)";
                  e.currentTarget.style.color = "rgba(45,74,43,0.85)";
                }}
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(196,154,40,0.1)", marginBottom: "2rem" }} />

        {/* Đăng ký bản tin */}
        <section>
          <p
            className="font-sans font-bold uppercase mb-2"
            style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(196,154,40,0.6)" }}
          >
            Nhận bản tin
          </p>
          <p
            className="font-sans mb-3"
            style={{ fontSize: "0.75rem", color: "rgba(237,224,196,0.4)", lineHeight: 1.65 }}
          >
            Bài mới vài tuần một lần — không spam.
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email của bạn"
              className="font-sans rounded px-3 py-2 outline-none"
              style={{
                fontSize: "0.78rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(196,154,40,0.2)",
                color: CREAM,
              }}
            />
            <button
              className="font-sans font-semibold uppercase rounded px-3 py-2 transition-all duration-200"
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                background: "rgba(45,74,43,0.3)",
                border: `1px solid rgba(45,74,43,0.5)`,
                color: "#7EAA7E",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = GREEN; e.currentTarget.style.color = CREAM; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(45,74,43,0.3)"; e.currentTarget.style.color = "#7EAA7E"; }}
            >
              Đăng ký
            </button>
          </div>
        </section>

      </div>
    </aside>
  );
}
