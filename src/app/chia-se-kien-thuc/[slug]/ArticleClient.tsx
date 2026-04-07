"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { articles } from "@/lib/data";
import { articleImages } from "@/lib/articleImages";
import { useEffect, useState } from "react";

type Article = (typeof articles)[0];

interface ArticleClientProps {
  article: Article;
  articleIndex: number;
  illustrations: string[];
}

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── GAM ĐẬM palette ──────────────────────────────────────────────────────
   near-black forest  #0A1208 / #060C05
   bronze gold        #C49A28 / #D4B050
   deep cream         #EDE0C4 / #DDD0B4
────────────────────────────────────────────────────────────────────────── */
const DARK_BG   = "#0A1208";
const PANEL_BG  = "#0D1A0C";
const CREAM     = "#EDE0C4";
const CREAM_MUT = "#D4C8A4";
const GOLD      = "#C49A28";
const GOLD_BR   = "#D4B050";

// Gold shimmer — vàng đồng trên nền tối
const shimmerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg,#6A4C10 0%,#A07820 20%,#C49A28 35%,#D4B050 50%,#C49A28 65%,#A07820 80%,#6A4C10 100%)",
  backgroundSize: "300% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "gold-shimmer 5s linear infinite",
};

// ── Split content at <ol> section boundaries ────────────────────────────────
function splitAtSections(html: string): string[] {
  return html.split(/(?=<ol>)/).filter((s) => s.trim());
}

// ── Reading progress — gold hairline ────────────────────────────────────────
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-px"
      style={{ background: "rgba(196,154,40,0.15)" }}
    >
      <div
        className="h-full transition-none"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg,#6A4C10,${GOLD},${GOLD_BR})`,
        }}
      />
    </div>
  );
}

// ── Breadcrumb ───────────────────────────────────────────────────────────────
function Breadcrumb({ category }: { category: string }) {
  return (
    <nav className="flex items-center gap-2 mb-7" aria-label="breadcrumb">
      <Link
        href="/chia-se-kien-thuc"
        className="font-sans text-[10px] uppercase tracking-[0.2em] transition-colors hover:opacity-70"
        style={{ color: `rgba(237,224,196,0.4)` }}
      >
        Chia Sẻ Kiến Thức
      </Link>
      <span className="text-xs" style={{ color: `rgba(196,154,40,0.45)` }}>
        ·
      </span>
      <span
        className="font-sans text-[10px] uppercase tracking-[0.2em]"
        style={{ color: GOLD }}
      >
        {category}
      </span>
    </nav>
  );
}

// ── Section divider — gold trên nền tối ─────────────────────────────────────
function SectionDivider({ ornate = false }: { ornate?: boolean }) {
  if (ornate) {
    return (
      <div className="flex items-center gap-3 my-10">
        <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(196,154,40,0.4))" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div className="w-1 h-1 rounded-full" style={{ background: "rgba(196,154,40,0.45)" }} />
          <div
            style={{
              width: 6, height: 6,
              border: "1px solid rgba(196,154,40,0.65)",
              transform: "rotate(45deg)",
              background: "transparent",
            }}
          />
          <div className="w-1 h-1 rounded-full" style={{ background: "rgba(196,154,40,0.45)" }} />
        </div>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(196,154,40,0.4), transparent)" }} />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4 my-9">
      <div className="flex-1 h-px" style={{ background: "rgba(196,154,40,0.2)" }} />
      <div className="w-1 h-1 rounded-full" style={{ background: "rgba(196,154,40,0.5)" }} />
      <div className="flex-1 h-px" style={{ background: "rgba(196,154,40,0.2)" }} />
    </div>
  );
}

// ── Pull quote — trích dẫn lớn, nổi bật giữa bài ───────────────────────────
function PullQuote({ text }: { text: string }) {
  const sentence = text.split(/[.!?]/)[0]?.trim() ?? text;
  const display = sentence.length > 110 ? sentence.slice(0, 110) + "…" : sentence;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease }}
      viewport={{ once: true }}
      className="my-14 text-center px-4 py-10"
      style={{
        background: "linear-gradient(135deg, #0D1A0C 0%, #111F0F 60%, #0A1208 100%)",
        borderRadius: "12px",
        border: "1px solid rgba(196,154,40,0.18)",
      }}
    >
      {/* Top rule */}
      <div
        className="mx-auto mb-5"
        style={{
          height: "1px",
          width: "3rem",
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }}
      />
      {/* Dấu nháy lớn */}
      <div
        className="font-serif leading-none mb-3"
        style={{ fontSize: "4rem", color: "rgba(196,154,40,0.3)", lineHeight: 0.8 }}
      >
        "
      </div>
      {/* Text quote */}
      <p
        className="font-serif italic mx-auto"
        style={{
          fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
          color: CREAM,
          lineHeight: 1.65,
          maxWidth: "520px",
          letterSpacing: "-0.01em",
        }}
      >
        {display}
      </p>
      {/* Bottom rule với author */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <div style={{ height: "1px", width: "2rem", background: "rgba(196,154,40,0.4)" }} />
        <div
          className="font-sans uppercase"
          style={{ fontSize: "8px", letterSpacing: "0.3em", color: `rgba(196,154,40,0.65)` }}
        >
          Phạm Thanh Tùng
        </div>
        <div style={{ height: "1px", width: "2rem", background: "rgba(196,154,40,0.4)" }} />
      </div>
    </motion.div>
  );
}

// ── Key insight callout — viền vàng đồng trên nền tối ───────────────────────
function KeyInsightBox({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease }}
      viewport={{ once: true }}
      className="my-10"
      style={{
        padding: "1.25rem 1.5rem",
        borderLeft: `2px solid rgba(196,154,40,0.7)`,
        background:
          "linear-gradient(90deg, rgba(196,154,40,0.07) 0%, rgba(10,20,8,0.6) 100%)",
        borderRadius: "0 10px 10px 0",
      }}
    >
      <p
        className="font-sans text-[9px] uppercase tracking-[0.3em] mb-2"
        style={{ color: `rgba(196,154,40,0.85)` }}
      >
        Điểm Cốt Lõi
      </p>
      <p
        className="font-serif italic leading-relaxed"
        style={{ fontSize: "1.02rem", color: CREAM_MUT, lineHeight: 1.75 }}
      >
        {text}
      </p>
    </motion.div>
  );
}

// ── Content renderer — scroll-reveal, alternating dark/light headings ────────
function ArticleContent({
  content,
  excerpt,
}: {
  content: string;
  illustrations: string[];
  articleTitle: string;
  excerpt: string;
}) {
  const sections = splitAtSections(content);
  const total = sections.length;
  const plainExcerpt = excerpt.replace(/<[^>]+>/g, "");

  // Pre-compute class cho từng section: ol-heading-light | ol-heading-dark | ''
  let olCounter = 0;
  const sectionMeta = sections.map((s) => {
    const isOl = s.trimStart().startsWith("<ol>");
    if (isOl) olCounter++;
    return { isOl, olIdx: isOl ? olCounter : 0 };
  });

  const pullQuoteAt = Math.max(1, Math.floor(total * 0.4));
  const insightAt   = Math.max(pullQuoteAt + 1, Math.floor(total * 0.65));

  return (
    <div className="article-content article-drop-cap">
      {sections.map((section, i) => {
        const { isOl, olIdx } = sectionMeta[i];
        // Odd ol → dark forest (lighter), Even ol → near-black (darker)
        const headingClass = isOl
          ? olIdx % 2 === 1 ? "ol-heading-light" : "ol-heading-dark"
          : "";

        return (
          <motion.div
            key={i}
            className={headingClass}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: i === 0 ? 0 : 0.04 }}
            viewport={{ once: true, margin: "-40px 0px" }}
          >
            <div dangerouslySetInnerHTML={{ __html: section }} />

            {i === pullQuoteAt - 1 && <PullQuote text={plainExcerpt} />}
            {i === insightAt - 1    && <KeyInsightBox text={plainExcerpt} />}

            {i < total - 1 && i !== pullQuoteAt - 1 && i !== insightAt - 1 && (
              <SectionDivider ornate={i % 2 === 1} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

// ── CTA — GAM ĐẬM: nền tối, viền vàng, chữ kem ─────────────────────────────
function ArticleCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      viewport={{ once: true }}
      className="mt-16 mb-4"
    >
      {/* Divider with label */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px" style={{ background: "rgba(196,154,40,0.25)" }} />
        <span
          className="font-sans text-[9px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(196,154,40,0.65)" }}
        >
          Tư Vấn
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(196,154,40,0.25)" }} />
      </div>

      {/* CTA card */}
      <div
        style={{
          border: "1px solid rgba(196,154,40,0.22)",
          borderRadius: "12px",
          background: `linear-gradient(160deg, ${PANEL_BG} 0%, #0A1208 100%)`,
          padding: "2rem 2.25rem",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p
              className="font-sans text-[10px] uppercase tracking-[0.28em] mb-2"
              style={{ color: GOLD }}
            >
              Phạm Thanh Tùng · Nhà Hoạch Định Farmstay
            </p>
            <h3
              className="font-serif font-normal leading-snug mb-2"
              style={{
                fontSize: "clamp(1.1rem,2vw,1.4rem)",
                color: CREAM,
              }}
            >
              Bạn Đang Có Ý Định Làm Farmstay?
            </h3>
            <p
              className="font-sans text-sm leading-relaxed"
              style={{ color: `rgba(237,224,196,0.6)`, maxWidth: 380 }}
            >
              Đặt lịch tư vấn 1-1 cùng chuyên gia đã đồng hành hơn 50 dự
              án trên khắp Việt Nam.
            </p>
          </div>
          <Link
            href="/lien-he"
            className="shrink-0 inline-block font-sans text-[11px] font-semibold uppercase tracking-[0.22em] px-7 py-3.5 transition-all duration-300"
            style={{
              background: GOLD,
              color: DARK_BG,
              border: `1px solid ${GOLD}`,
              borderRadius: "8px",
            }}
          >
            Đặt Lịch Tư Vấn
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ── Author section — GAM ĐẬM ────────────────────────────────────────────────
function AuthorSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      viewport={{ once: true }}
      className="mt-12 pt-8"
      style={{ borderTop: "1px solid rgba(196,154,40,0.18)" }}
    >
      <p
        className="font-sans text-[9px] uppercase tracking-[0.28em] mb-5"
        style={{ color: "rgba(196,154,40,0.65)" }}
      >
        Tác Giả
      </p>
      <div className="flex items-start gap-5">
        {/* Portrait */}
        <div className="shrink-0">
          <div
            style={{
              width: 52,
              height: 52,
              border: `1px solid rgba(196,154,40,0.4)`,
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/portrait-main.jpg"
              alt="Phạm Thanh Tùng"
              width={52}
              height={52}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <p
            className="font-serif text-base mb-0.5"
            style={{ color: CREAM, fontWeight: 500 }}
          >
            Phạm Thanh Tùng
          </p>
          <p
            className="font-sans text-[10px] uppercase tracking-[0.15em] mb-3"
            style={{ color: GOLD }}
          >
            Nhà Hoạch Định · Chuyên gia Farmstay
          </p>
          <p
            className="font-sans text-sm leading-relaxed"
            style={{ color: `rgba(237,224,196,0.6)`, maxWidth: 460 }}
          >
            Hơn 9 năm hoạch định và phát triển farmstay trên toàn Việt Nam.
            Sáng lập DEFARM, MASTERY và Xuyên Việt Farmstay. Tác giả bộ
            sách{" "}
            <em style={{ color: CREAM_MUT }}>Farmstay Bền Vững</em>.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Related articles — minimal cards GAM ĐẬM ────────────────────────────────
function RelatedArticles({
  current,
  allArticles,
}: {
  current: Article;
  allArticles: Article[];
}) {
  const related = allArticles
    .filter((a) => a.slug !== current.slug && a.category === current.category)
    .slice(0, 3);
  if (related.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      viewport={{ once: true }}
      className="mt-12 pt-8"
      style={{ borderTop: "1px solid rgba(196,154,40,0.18)" }}
    >
      <p
        className="font-sans text-[9px] uppercase tracking-[0.28em] mb-5"
        style={{ color: "rgba(196,154,40,0.65)" }}
      >
        Bài Viết Liên Quan
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {related.map((a) => (
          <Link
            key={a.slug}
            href={`/chia-se-kien-thuc/${a.slug}`}
            className="group block"
          >
            <div
              className="px-4 py-4 transition-all duration-200"
              style={{
                border: "1px solid rgba(196,154,40,0.15)",
                borderRadius: "10px",
                background: "rgba(12,20,10,0.6)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(196,154,40,0.38)";
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(18,32,16,0.8)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(196,154,40,0.15)";
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(12,20,10,0.6)";
              }}
            >
              <span
                className="font-sans text-[9px] uppercase tracking-[0.2em] mb-2 block"
                style={{ color: "rgba(196,154,40,0.65)" }}
              >
                {a.category}
              </span>
              <p
                className="font-sans text-sm leading-snug line-clamp-2"
                style={{ color: CREAM_MUT }}
              >
                {a.title}
              </p>
              <span
                className="text-[10px] font-sans mt-2 block"
                style={{ color: "rgba(237,224,196,0.35)" }}
              >
                {a.readTime} phút đọc
              </span>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

// ── Back link ────────────────────────────────────────────────────────────────
function BackLink() {
  return (
    <div
      className="mt-10 pt-6"
      style={{ borderTop: "1px solid rgba(196,154,40,0.1)" }}
    >
      <Link
        href="/chia-se-kien-thuc"
        className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.22em] transition-all group"
        style={{ color: "rgba(237,224,196,0.38)" }}
      >
        <span className="group-hover:-translate-x-1 transition-transform inline-block">
          ←
        </span>
        Tất Cả Bài Viết
      </Link>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN ARTICLE LAYOUT — GAM ĐẬM · Deep Forest · Vàng Đồng · Kem Đậm
// ════════════════════════════════════════════════════════════════════════════
export function ArticleClient({
  article,
  articleIndex,
  illustrations,
}: ArticleClientProps) {
  const featureImage =
    articleImages[articleIndex] ??
    articleImages[articleIndex % articleImages.length];

  return (
    <div
      style={{
        background: `linear-gradient(180deg, ${DARK_BG} 0%, #0C1A0A 50%, ${DARK_BG} 100%)`,
      }}
    >
      <ReadingProgress />

      {/* ── HEADER — Magazine Dark Split · GAM ĐẬM ──────────────────────── */}
      <header>
        <div
          className="relative overflow-hidden"
          style={{ marginTop: "72px" }}
        >
          {/* Grid container */}
          <div
            className="flex flex-col md:grid"
            style={{ gridTemplateColumns: "1fr 1fr", minHeight: "56vh" }}
          >
            {/* ── LEFT — dark forest, kem text ──────────────────────────── */}
            <motion.div
              className="relative flex flex-col justify-center px-8 py-14 lg:px-14"
              style={{
                background: `linear-gradient(160deg, ${PANEL_BG} 0%, #0A1208 100%)`,
                order: 2,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              {/* Thin gold vertical line */}
              <div
                className="absolute left-0 top-12 bottom-12 hidden md:block"
                style={{
                  width: "1px",
                  background:
                    "linear-gradient(180deg,transparent,rgba(196,154,40,0.5) 30%,rgba(196,154,40,0.5) 70%,transparent)",
                }}
              />

              <Breadcrumb category={article.category} />

              {/* Title */}
              <motion.h1
                className="font-serif font-normal leading-tight mb-5"
                style={{
                  fontSize: "clamp(1.45rem, 2.5vw, 2.5rem)",
                  color: CREAM,
                  letterSpacing: "-0.015em",
                  maxWidth: "26ch",
                }}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease }}
              >
                {article.title}
              </motion.h1>

              {/* Gold rule */}
              <motion.div
                className="mb-6"
                style={{
                  height: "1px",
                  width: "2rem",
                  background: `linear-gradient(90deg, ${GOLD}, rgba(196,154,40,0.2))`,
                }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease }}
              />

              {/* Meta */}
              <motion.div
                className="flex flex-wrap items-center gap-x-3 gap-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.65, ease }}
              >
                <span
                  className="font-sans text-[11px] font-medium"
                  style={{ color: GOLD, letterSpacing: "0.04em" }}
                >
                  Phạm Thanh Tùng
                </span>
                <span style={{ color: "rgba(196,154,40,0.4)" }}>·</span>
                <time
                  dateTime={article.date}
                  className="font-sans text-[11px]"
                  style={{ color: "rgba(237,224,196,0.45)", letterSpacing: "0.03em" }}
                >
                  {new Date(article.date).toLocaleDateString("vi-VN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span style={{ color: "rgba(196,154,40,0.4)" }}>·</span>
                <span
                  className="font-sans text-[11px]"
                  style={{ color: "rgba(237,224,196,0.45)", letterSpacing: "0.03em" }}
                >
                  {article.readTime} phút đọc
                </span>
              </motion.div>
            </motion.div>

            {/* ── RIGHT — full-bleed photo với overlay tối hơn ──────────── */}
            <div
              className="relative overflow-hidden"
              style={{ minHeight: "40vw", order: 1 }}
            >
              {/* Overlays */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{ background: "rgba(0,0,0,0.38)" }}
              />
              <div
                className="absolute inset-0 z-10 pointer-events-none hidden md:block"
                style={{
                  background:
                    "linear-gradient(90deg,#0D1A0C 0%,rgba(13,26,12,0.3) 18%,transparent 50%)",
                }}
              />
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(0deg,rgba(10,18,8,0.7) 0%,transparent 38%)",
                }}
              />
              <Image
                src={featureImage}
                alt={`Phạm Thanh Tùng — ${article.title}`}
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Gold hairline bottom — shimmer */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg,transparent,rgba(196,154,40,0.55) 30%,rgba(212,176,80,0.85) 50%,rgba(196,154,40,0.55) 70%,transparent)",
              backgroundSize: "200% auto",
              animation: "gold-shimmer 4s linear infinite",
            }}
          />
        </div>
      </header>

      {/* ── BODY ─────────────────────────────────────────────────────────── */}
      <main style={{ background: "transparent" }}>
        <div className="container-main max-w-[720px] pt-14 pb-28">

          {/* ── Lead excerpt ─── */}
          {article.excerpt && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="mb-10"
            >
              <p
                className="font-sans text-[9px] uppercase tracking-[0.32em] mb-3"
                style={{ color: "rgba(196,154,40,0.65)" }}
              >
                Tóm Lược
              </p>
              <div
                className="font-serif italic leading-relaxed"
                style={{
                  fontSize: "1.03rem",
                  color: CREAM_MUT,
                  paddingLeft: "1.2rem",
                  borderLeft: `1px solid rgba(196,154,40,0.5)`,
                  lineHeight: 1.85,
                }}
                dangerouslySetInnerHTML={{ __html: article.excerpt }}
              />
            </motion.div>
          )}

          {/* ── Section divider ─── */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,40,0.2)" }} />
            <div className="w-1 h-1 rounded-full" style={{ background: "rgba(196,154,40,0.5)" }} />
            <div className="flex-1 h-px" style={{ background: "rgba(196,154,40,0.2)" }} />
          </div>

          {/* ── Main content ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease }}
          >
            <ArticleContent
              content={article.content}
              illustrations={[]}
              articleTitle={article.title}
              excerpt={article.excerpt}
            />
          </motion.div>

          {/* CTA */}
          <ArticleCTA />

          {/* Author */}
          <AuthorSection />

          {/* Related */}
          <RelatedArticles current={article} allArticles={articles} />

          {/* Back */}
          <BackLink />
        </div>
      </main>
    </div>
  );
}
