"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { articles } from "@/lib/data";
import { useEffect, useState } from "react";

type Article = (typeof articles)[0];

interface ArticleClientProps {
  article: Article;
  articleIndex: number;
  illustrations: string[];
}

// ── Reading progress bar ──────────────────────────────────────────────────────
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px]" style={{ background: "rgba(200,168,75,0.15)" }}>
      <motion.div
        className="h-full"
        style={{ width: `${progress}%`, background: "linear-gradient(90deg,#9A7A2E,#C8A84B,#F0D075,#C8A84B)" }}
      />
    </div>
  );
}

// ── Back button ───────────────────────────────────────────────────────────────
function BackButton() {
  return (
    <Link
      href="/chia-se-kien-thuc"
      className="inline-flex items-center gap-2 text-sm font-sans text-muted hover:text-primary transition-colors group"
    >
      <span className="group-hover:-translate-x-1 transition-transform">←</span>
      Quay Lại Chia Sẻ Kiến Thức
    </Link>
  );
}

// ── CTA box ───────────────────────────────────────────────────────────────────
function ArticleCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      viewport={{ once: true }}
      className="my-14 rounded-2xl overflow-hidden relative"
      style={{ background: "linear-gradient(135deg,#1C2A1C 0%,#2A4028 100%)", border: "1px solid rgba(200,168,75,0.3)" }}
    >
      <div className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(200,168,75,0.12) 0%,transparent 70%)", transform: "translate(20%,-20%)" }} />
      <div className="relative z-10 px-8 py-10 text-center">
        <p className="font-sans text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#C8A84B" }}>
          Tư Vấn Cùng Chuyên Gia
        </p>
        <h3 className="font-serif mb-3" style={{ fontSize: "clamp(1.25rem,2.5vw,1.75rem)", color: "#F5EAD5" }}>
          Bạn Đang Có Ý Định Làm Farmstay?
        </h3>
        <p className="font-sans text-sm leading-relaxed mb-7 max-w-md mx-auto" style={{ color: "rgba(245,234,213,0.65)" }}>
          Đặt lịch tư vấn 1-1 để nhận lộ trình rõ ràng từ người đã đồng hành hơn 50 dự án farmstay trên khắp Việt Nam.
        </p>
        <Link href="/lien-he" className="btn-lienhe">
          <span className="gold-shine">Đặt Lịch Tư Vấn Ngay</span>
        </Link>
      </div>
    </motion.div>
  );
}

// ── Author section ────────────────────────────────────────────────────────────
function AuthorSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-12 pt-8 border-t border-earth/20"
    >
      <div className="flex gap-5 items-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-serif font-bold text-xl"
          style={{ background: "#1C2A1C", border: "2px solid #C8A84B", color: "#C8A84B" }}
        >
          T
        </div>
        <div>
          <p className="font-serif text-base font-semibold mb-0.5" style={{ color: "#3D2B1F" }}>Phạm Thanh Tùng</p>
          <p className="text-[10px] font-sans uppercase tracking-widest mb-1.5" style={{ color: "#C8A84B" }}>
            Nhà Hoạch Định · Chuyên gia Farmstay
          </p>
          <p className="font-sans text-sm text-muted leading-relaxed max-w-xl">
            Hơn 9 năm hoạch định và phát triển farmstay trên toàn Việt Nam.
            Sáng lập DEFARM, MASTERY và Xuyên Việt Farmstay, Farmstay Update.
            Tác giả bộ sách &ldquo;Farmstay Bền Vững&rdquo;.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Related articles ──────────────────────────────────────────────────────────
function RelatedArticles({ current, allArticles }: { current: Article; allArticles: Article[] }) {
  const related = allArticles.filter((a) => a.slug !== current.slug && a.category === current.category).slice(0, 3);
  if (related.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-12 pt-8 border-t border-earth/20"
    >
      <p className="font-sans text-xs uppercase tracking-[0.2em] mb-5" style={{ color: "#C8A84B" }}>Bài Viết Liên Quan</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {related.map((a) => (
          <Link key={a.slug} href={`/chia-se-kien-thuc/${a.slug}`} className="group block">
            <div
              className="p-4 transition-all duration-200 group-hover:shadow-md"
              style={{ border: "1px solid rgba(61,43,31,0.12)", background: "rgba(245,234,213,0.4)", borderRadius: "0.5rem" }}
            >
              <span className="text-[10px] font-sans uppercase tracking-widest mb-2 block" style={{ color: "#C8A84B" }}>
                {a.category}
              </span>
              <p className="font-sans text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors" style={{ color: "#3D2B1F" }}>
                {a.title}
              </p>
              <span className="text-xs text-muted font-sans mt-2 block">{a.readTime} phút đọc</span>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LAYOUT 1 — Dark Hero + Clean Reading Column
// ══════════════════════════════════════════════════════════════════════════════
function Layout1({ article }: ArticleClientProps) {
  return (
    <div className="pt-[90px]">
      <ReadingProgress />

      {/* Hero */}
      <section
        className="relative py-24 text-center overflow-hidden"
        style={{ background: "linear-gradient(160deg,#111e11 0%,#1C2A1C 55%,#1a2e1a 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 65% 55% at 50% 90%,rgba(200,168,75,0.10) 0%,transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,rgba(200,168,75,0.4),transparent)" }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="container-main max-w-3xl relative z-10"
        >
          {/* Breadcrumb */}
          <div className="flex justify-center items-center gap-2 text-xs font-sans mb-6">
            <Link href="/chia-se-kien-thuc" className="text-beige/50 hover:text-primary transition-colors">
              Chia Sẻ Kiến Thức
            </Link>
            <span className="text-beige/25">/</span>
            <span style={{ color: "#C8A84B" }}>{article.category}</span>
          </div>

          {/* Title */}
          <h1
            className="font-serif leading-tight mb-6"
            style={{ fontSize: "clamp(1.8rem,3.8vw,3.2rem)", color: "#F5EAD5", textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
          >
            {article.title}
          </h1>

          {/* Gold line */}
          <motion.div
            className="mx-auto mb-6"
            style={{ height: "1px", background: "linear-gradient(90deg,transparent,#C8A84B 30%,#F0D075 50%,#C8A84B 70%,transparent)", maxWidth: "8rem" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />

          {/* Meta */}
          <div className="flex justify-center items-center gap-3 text-xs font-sans" style={{ color: "rgba(245,234,213,0.4)" }}>
            <time>{new Date(article.date).toLocaleDateString("vi-VN")}</time>
            <span>·</span>
            <span>{article.readTime} phút đọc</span>
            <span>·</span>
            <span>Phạm Thanh Tùng</span>
          </div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="bg-white pb-24">
        <div className="container-main max-w-2xl pt-12">
          {/* Lead excerpt */}
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-serif text-lg leading-relaxed italic py-5 px-6 mb-10"
            style={{ color: "#3D2B1F", borderLeft: "3px solid #C8A84B", background: "rgba(245,234,213,0.5)", borderRadius: "0 0.5rem 0.5rem 0" }}
          >
            {article.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <ArticleCTA />
          <AuthorSection />
          <RelatedArticles current={article} allArticles={articles} />
          <div className="mt-10 pt-6 border-t border-earth/10">
            <BackButton />
          </div>
        </div>
      </section>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LAYOUT 2 — Magazine Split (sticky sidebar + main content)
// ══════════════════════════════════════════════════════════════════════════════
function Layout2({ article }: ArticleClientProps) {
  return (
    <div className="pt-[90px]">
      <ReadingProgress />

      {/* Minimal top header */}
      <section className="py-16 border-b border-earth/10" style={{ background: "#F5EAD5" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-main max-w-4xl"
        >
          <div className="flex items-center gap-2 text-xs font-sans text-muted mb-4">
            <Link href="/chia-se-kien-thuc" className="hover:text-primary transition-colors">Chia Sẻ Kiến Thức</Link>
            <span>/</span>
            <span style={{ color: "#C8A84B" }}>{article.category}</span>
          </div>
          <h1
            className="font-serif leading-tight"
            style={{ fontSize: "clamp(1.7rem,3.2vw,2.8rem)", color: "#3D2B1F" }}
          >
            {article.title}
          </h1>
          <div className="w-10 h-0.5 mt-5" style={{ background: "#C8A84B" }} />
        </motion.div>
      </section>

      {/* 2-column layout */}
      <div className="container-main max-w-4xl py-12 pb-24">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <aside className="md:w-[28%] md:sticky md:top-[100px] md:self-start shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-xl"
              style={{ border: "1px solid rgba(200,168,75,0.3)", background: "rgba(245,234,213,0.5)" }}
            >
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest mb-4"
                style={{ background: "#1C2A1C", color: "#C8A84B" }}>
                {article.category}
              </span>
              <p className="font-sans text-xs text-muted mb-1">Ngày đăng</p>
              <p className="font-sans text-sm font-medium mb-3" style={{ color: "#3D2B1F" }}>
                {new Date(article.date).toLocaleDateString("vi-VN")}
              </p>
              <p className="font-sans text-xs text-muted mb-1">Thời gian đọc</p>
              <p className="font-serif text-2xl font-bold mb-3" style={{ color: "#C8A84B" }}>{article.readTime}<span className="text-sm font-sans font-normal text-muted"> phút</span></p>
              <p className="font-sans text-xs text-muted mb-1">Tác giả</p>
              <p className="font-sans text-sm font-medium mb-5" style={{ color: "#3D2B1F" }}>Phạm Thanh Tùng</p>
              <div className="pt-4 border-t border-earth/15">
                <BackButton />
              </div>
            </motion.div>

            {/* Sidebar CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 p-5 rounded-xl text-center"
              style={{ background: "#1C2A1C", border: "1px solid rgba(200,168,75,0.25)" }}
            >
              <p className="font-sans text-[10px] uppercase tracking-widest mb-2" style={{ color: "#C8A84B" }}>Tư vấn 1-1</p>
              <p className="font-serif text-sm text-beige/80 leading-snug mb-4">Đặt lịch cùng chuyên gia farmstay</p>
              <Link href="/lien-he" className="inline-block w-full text-center py-2 rounded-full text-xs font-sans font-semibold uppercase tracking-widest"
                style={{ background: "rgba(200,168,75,0.15)", color: "#C8A84B", border: "1px solid rgba(200,168,75,0.4)" }}>
                Liên Hệ Ngay
              </Link>
            </motion.div>
          </aside>

          {/* Main */}
          <main className="md:flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="font-serif text-lg text-muted leading-relaxed mb-8 italic pl-5"
              style={{ borderLeft: "3px solid #C8A84B" }}
            >
              {article.excerpt}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            <AuthorSection />
            <RelatedArticles current={article} allArticles={articles} />
          </main>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LAYOUT 3 — Editorial Dark (bold heading, numbered sections)
// ══════════════════════════════════════════════════════════════════════════════
function Layout3({ article }: ArticleClientProps) {
  return (
    <div className="pt-[90px]">
      <ReadingProgress />

      {/* Full-bleed dark hero */}
      <section className="py-28" style={{ background: "#1C2A1C" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container-main max-w-4xl"
        >
          <div className="flex items-center gap-2 text-xs font-sans mb-6">
            <Link href="/chia-se-kien-thuc" className="text-beige/50 hover:text-primary transition-colors">
              Chia Sẻ Kiến Thức
            </Link>
            <span className="text-beige/20">/</span>
            <span style={{ color: "#C8A84B" }}>{article.category}</span>
          </div>

          {/* Big gold number accent */}
          <p className="font-serif font-bold leading-none mb-2" style={{ fontSize: "clamp(4rem,10vw,8rem)", color: "rgba(200,168,75,0.12)", lineHeight: 1 }}>
            ❝
          </p>

          <h1
            className="font-serif leading-tight mb-6 -mt-8"
            style={{ fontSize: "clamp(2rem,4vw,3.4rem)", color: "#F5EAD5" }}
          >
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-sans" style={{ color: "rgba(245,234,213,0.4)" }}>
            <time>{new Date(article.date).toLocaleDateString("vi-VN")}</time>
            <span>·</span>
            <span>{article.readTime} phút đọc</span>
            <span>·</span>
            <span>Phạm Thanh Tùng</span>
          </div>
        </motion.div>
      </section>

      {/* Gold divider line */}
      <div style={{ height: "2px", background: "linear-gradient(90deg,#1C2A1C,#C8A84B 40%,#F0D075 50%,#C8A84B 60%,#F5EAD5)" }} />

      <section className="py-16 bg-white">
        <div className="container-main max-w-3xl">
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10 px-6 py-5 rounded-r-xl"
            style={{ borderLeft: "4px solid #C8A84B", background: "#F5EAD5" }}
          >
            <p className="font-serif text-lg italic leading-relaxed" style={{ color: "#3D2B1F" }}>{article.excerpt}</p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="article-content article-content--editorial"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <ArticleCTA />
          <AuthorSection />
          <RelatedArticles current={article} allArticles={articles} />
          <div className="mt-10 pt-6 border-t border-earth/10">
            <BackButton />
          </div>
        </div>
      </section>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LAYOUT 4 — Card Grid Intro + Full Content
// ══════════════════════════════════════════════════════════════════════════════
function Layout4({ article }: ArticleClientProps) {
  // Extract short key-point sentences from content
  const keyPoints = article.content
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && s.length < 180)
    .slice(0, 3);

  return (
    <div className="pt-[90px]">
      <ReadingProgress />

      {/* Warm beige header */}
      <section className="py-16 border-b border-earth/15" style={{ background: "#F5EAD5" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-main max-w-3xl"
        >
          <div className="flex items-center gap-2 text-xs font-sans text-muted mb-4">
            <Link href="/chia-se-kien-thuc" className="hover:text-primary transition-colors">Chia Sẻ Kiến Thức</Link>
            <span>/</span>
            <span style={{ color: "#C8A84B" }}>{article.category}</span>
          </div>
          <h1
            className="font-serif leading-tight mb-5"
            style={{ fontSize: "clamp(1.8rem,3.2vw,2.9rem)", color: "#3D2B1F" }}
          >
            {article.title}
          </h1>
          <div className="w-12 h-0.5 mb-4" style={{ background: "#C8A84B" }} />
          <div className="flex items-center gap-3 text-xs text-muted font-sans">
            <time>{new Date(article.date).toLocaleDateString("vi-VN")}</time>
            <span>·</span>
            <span>{article.readTime} phút đọc</span>
          </div>
        </motion.div>
      </section>

      {/* Key points grid */}
      {keyPoints.length > 0 && (
        <section className="py-10 bg-white border-b border-earth/10">
          <div className="container-main max-w-3xl">
            <p className="font-sans text-xs uppercase tracking-[0.2em] mb-6" style={{ color: "#C8A84B" }}>
              Điểm Nổi Bật
            </p>
            <div className="grid gap-5 sm:grid-cols-3">
              {keyPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-xl"
                  style={{ border: "1px solid rgba(61,43,31,0.12)", background: "rgba(245,234,213,0.4)" }}
                >
                  {/* Gold circle number */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center mb-4 font-serif font-bold text-base"
                    style={{ background: "#1C2A1C", border: "1.5px solid #C8A84B", color: "#C8A84B" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="font-sans text-sm leading-snug line-clamp-3" style={{ color: "#3D2B1F" }}>{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-24 bg-white">
        <div className="container-main max-w-2xl pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <ArticleCTA />
          <AuthorSection />
          <RelatedArticles current={article} allArticles={articles} />
          <div className="mt-10 pt-6 border-t border-earth/10">
            <BackButton />
          </div>
        </div>
      </section>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LAYOUT 5 — Minimal Essay (centred, drop-cap, gold accent)
// ══════════════════════════════════════════════════════════════════════════════
function Layout5({ article }: ArticleClientProps) {
  return (
    <div className="pt-[90px]">
      <ReadingProgress />

      {/* Centred white header */}
      <section className="py-20 bg-white border-b border-earth/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-main max-w-2xl text-center"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest mb-5"
            style={{ background: "#1C2A1C", color: "#C8A84B" }}
          >
            {article.category}
          </span>
          <h1
            className="font-serif leading-tight mb-5"
            style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", color: "#3D2B1F" }}
          >
            {article.title}
          </h1>
          <div className="mx-auto mb-5" style={{ height: "1px", background: "linear-gradient(90deg,transparent,#C8A84B,transparent)", maxWidth: "6rem" }} />
          <div className="flex justify-center items-center gap-3 text-xs text-muted font-sans">
            <time>{new Date(article.date).toLocaleDateString("vi-VN")}</time>
            <span>·</span>
            <span>Phạm Thanh Tùng</span>
            <span>·</span>
            <span>{article.readTime} phút đọc</span>
          </div>
        </motion.div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-main max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-sans text-muted mb-8">
            <Link href="/chia-se-kien-thuc" className="hover:text-primary transition-colors">Chia Sẻ Kiến Thức</Link>
            <span>/</span>
            <span className="text-charcoal/60">{article.title.substring(0, 32)}…</span>
          </div>

          {/* Big quote */}
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center py-8 px-4 mb-10"
          >
            <p className="font-serif text-xl italic leading-relaxed" style={{ color: "#3D2B1F" }}>
              &ldquo;{article.excerpt}&rdquo;
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="article-content article-content--essay"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <ArticleCTA />
          <AuthorSection />
          <RelatedArticles current={article} allArticles={articles} />
          <div className="mt-10 pt-6 border-t border-earth/10">
            <BackButton />
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Main exported component ───────────────────────────────────────────────────
export function ArticleClient({ article, articleIndex, illustrations }: ArticleClientProps) {
  const layoutIndex = articleIndex % 5;
  const props = { article, articleIndex, illustrations };

  if (layoutIndex === 0) return <Layout1 {...props} />;
  if (layoutIndex === 1) return <Layout2 {...props} />;
  if (layoutIndex === 2) return <Layout3 {...props} />;
  if (layoutIndex === 3) return <Layout4 {...props} />;
  return <Layout5 {...props} />;
}
