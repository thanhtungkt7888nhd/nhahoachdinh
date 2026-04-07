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

// =====================
// Shared sub-components
// =====================

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
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-beige/40">
      <div
        className="h-full transition-all duration-100"
        style={{ width: `${progress}%`, background: "#C8A84B" }}
      />
    </div>
  );
}

function AuthorSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-16 pt-10 border-t border-earth/20"
    >
      <div className="flex gap-5 items-start">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: "rgba(28,42,28,0.08)",
            border: "2px solid #C8A84B",
          }}
        >
          <span
            className="text-2xl font-serif font-bold"
            style={{ color: "#C8A84B" }}
          >
            T
          </span>
        </div>
        <div>
          <p
            className="font-serif text-lg font-semibold mb-1"
            style={{ color: "#3D2B1F" }}
          >
            Phạm Thanh Tùng
          </p>
          <p
            className="text-xs font-sans uppercase tracking-widest mb-2"
            style={{ color: "#C8A84B" }}
          >
            Nhà Hoạch Định · Chuyên gia Farmstay
          </p>
          <p className="font-sans text-sm text-muted leading-relaxed max-w-xl">
            Hơn 12 năm hoạch định và phát triển farmstay trên toàn Việt Nam.
            Sáng lập DEFARM, MASTERY và Xuyên Việt Farmstay. Tác giả bộ sách
            &ldquo;Farmstay — Từ Đất Đến Giấc Mơ&rdquo;.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function RelatedArticles({
  current,
  allArticles,
}: {
  current: Article;
  allArticles: Article[];
}) {
  const related = allArticles
    .filter(
      (a) => a.slug !== current.slug && a.category === current.category
    )
    .slice(0, 3);
  if (related.length === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-12 pt-8 border-t border-earth/20"
    >
      <h3 className="font-serif text-xl mb-5" style={{ color: "#3D2B1F" }}>
        Bài Viết Liên Quan
      </h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {related.map((a) => (
          <Link
            key={a.slug}
            href={`/chia-se-kien-thuc/${a.slug}`}
            className="group block"
          >
            <div
              className="p-4 rounded-lg transition-colors"
              style={{ border: "1px solid rgba(61,43,31,0.12)", background: "rgba(245,234,213,0.4)" }}
            >
              <span
                className="text-[10px] font-sans uppercase tracking-widest mb-2 block"
                style={{ color: "#C8A84B" }}
              >
                {a.category}
              </span>
              <p
                className="font-sans text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors"
                style={{ color: "#3D2B1F" }}
              >
                {a.title}
              </p>
              <span className="text-xs text-muted font-sans mt-2 block">
                {a.readTime} phút đọc
              </span>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

function Illustration({
  svg,
  className = "",
}: {
  svg: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

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

// ==========================
// Layout 1: Hero Full Width
// ==========================
function Layout1({ article, illustrations: svgs }: ArticleClientProps) {
  return (
    <div className="pt-[90px]">
      <ReadingProgress />
      <section
        className="relative py-20 text-center"
        style={{ background: "linear-gradient(180deg,#1C2A1C 0%,#2a3d2a 100%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container-main max-w-3xl"
        >
          <div className="flex justify-center items-center gap-2 text-xs font-sans mb-5">
            <Link href="/chia-se-kien-thuc" className="text-beige/60 hover:text-primary transition-colors">
              Chia Sẻ Kiến Thức
            </Link>
            <span className="text-beige/30">/</span>
            <span style={{ color: "#C8A84B" }}>{article.category}</span>
          </div>
          <h1
            className="font-serif leading-tight mb-5"
            style={{ fontSize: "clamp(1.8rem,3.5vw,3rem)", color: "#F5EAD5" }}
          >
            {article.title}
          </h1>
          <div className="w-16 h-0.5 mx-auto mb-5" style={{ background: "#C8A84B" }} />
          <div className="flex justify-center items-center gap-4 text-xs font-sans" style={{ color: "rgba(245,234,213,0.5)" }}>
            <time>{new Date(article.date).toLocaleDateString("vi-VN")}</time>
            <span>·</span>
            <span>{article.readTime} phút đọc</span>
          </div>
        </motion.div>
      </section>

      <div className="container-main max-w-3xl py-8">
        <Illustration svg={svgs[0]} className="w-full max-w-md mx-auto opacity-80" />
      </div>

      <section className="pb-20 bg-white">
        <div className="container-main max-w-3xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-serif text-xl leading-relaxed mb-10 italic py-4 pl-6 pr-4 rounded-r"
            style={{ color: "#3D2B1F", borderLeft: "4px solid #C8A84B", background: "rgba(28,42,28,0.04)" }}
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

          <Illustration svg={svgs[1]} className="w-full max-w-sm mx-auto my-10 opacity-75" />
          <Illustration svg={svgs[2]} className="w-full max-w-sm mx-auto my-8 opacity-70" />

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

// ==========================
// Layout 2: Magazine Split
// ==========================
function Layout2({ article, illustrations: svgs }: ArticleClientProps) {
  return (
    <div className="pt-[90px]">
      <ReadingProgress />
      <div className="w-full border-b border-earth/10 py-6" style={{ background: "#F5EAD5" }}>
        <Illustration svg={svgs[0]} className="w-full max-w-lg mx-auto opacity-85" />
      </div>
      <div className="container-main py-4">
        <div className="flex items-center gap-2 text-xs font-sans text-muted">
          <Link href="/chia-se-kien-thuc" className="hover:text-primary transition-colors">Chia Sẻ Kiến Thức</Link>
          <span>/</span>
          <span style={{ color: "#C8A84B" }}>{article.category}</span>
        </div>
      </div>
      <div className="container-main pb-20">
        <div className="flex flex-col md:flex-row gap-10">
          <aside className="md:w-[30%] md:sticky md:top-[100px] md:self-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-lg p-6"
              style={{ border: "1px solid rgba(61,43,31,0.15)", background: "rgba(245,234,213,0.5)" }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest mb-4"
                style={{ background: "#1C2A1C", color: "#C8A84B" }}
              >
                {article.category}
              </span>
              <h2 className="font-serif text-lg leading-snug mb-4" style={{ color: "#3D2B1F" }}>
                {article.title}
              </h2>
              <div className="w-8 h-0.5 mb-4" style={{ background: "#C8A84B" }} />
              <div className="space-y-2 text-xs font-sans text-muted">
                <p><span className="font-medium" style={{ color: "#3D2B1F" }}>Ngày đăng:</span> {new Date(article.date).toLocaleDateString("vi-VN")}</p>
                <p><span className="font-medium" style={{ color: "#3D2B1F" }}>Thời gian đọc:</span> {article.readTime} phút</p>
                <p><span className="font-medium" style={{ color: "#3D2B1F" }}>Tác giả:</span> Phạm Thanh Tùng</p>
              </div>
              <div className="mt-6 pt-4 border-t border-earth/15">
                <BackButton />
              </div>
            </motion.div>
            <Illustration svg={svgs[1]} className="mt-6 opacity-75" />
          </aside>
          <main className="md:w-[70%]">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="font-sans text-lg text-muted leading-relaxed mb-8 italic pl-5"
              style={{ borderLeft: "4px solid #C8A84B" }}
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
            <Illustration svg={svgs[2]} className="w-full max-w-xs my-8 opacity-70" />
            <AuthorSection />
            <RelatedArticles current={article} allArticles={articles} />
          </main>
        </div>
      </div>
    </div>
  );
}

// ==========================
// Layout 3: Editorial Dark
// ==========================
function Layout3({ article, illustrations: svgs }: ArticleClientProps) {
  return (
    <div className="pt-[90px]">
      <ReadingProgress />
      <section className="py-24" style={{ background: "#1C2A1C" }}>
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
          <h1
            className="font-serif leading-tight mb-6"
            style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "#F5EAD5" }}
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

      <div className="border-b py-6" style={{ background: "#F5EAD5", borderColor: "rgba(200,168,75,0.3)" }}>
        <div className="container-main max-w-4xl flex items-center gap-6">
          <div className="flex-1 h-px" style={{ background: "rgba(200,168,75,0.3)" }} />
          <Illustration svg={svgs[0]} className="w-32 opacity-80" />
          <div className="flex-1 h-px" style={{ background: "rgba(200,168,75,0.3)" }} />
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container-main max-w-4xl">
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10 px-6 py-4 rounded"
            style={{ borderLeft: "4px solid #C8A84B", background: "#F5EAD5" }}
          >
            <p className="font-serif text-lg italic" style={{ color: "#3D2B1F" }}>
              {article.excerpt}
            </p>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="article-content article-content--editorial"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="my-10 p-4 rounded-lg" style={{ border: "2px solid #C8A84B", background: "#F5EAD5" }}>
            <Illustration svg={svgs[1]} className="w-full max-w-xs mx-auto opacity-80" />
          </div>
          <div className="my-10 p-4 rounded-lg" style={{ border: "2px solid #C8A84B", background: "#F5EAD5" }}>
            <Illustration svg={svgs[2]} className="w-full max-w-xs mx-auto opacity-80" />
          </div>

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

// ==========================
// Layout 4: Card Grid Intro
// ==========================
function Layout4({ article, illustrations: svgs }: ArticleClientProps) {
  const keyPoints = article.content
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && s.length < 200)
    .slice(0, 3);

  return (
    <div className="pt-[90px]">
      <ReadingProgress />
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
            className="font-serif leading-tight mb-4"
            style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "#3D2B1F" }}
          >
            {article.title}
          </h1>
          <div className="w-12 h-0.5 mb-4" style={{ background: "#C8A84B" }} />
          <div className="flex items-center gap-4 text-xs text-muted font-sans">
            <time>{new Date(article.date).toLocaleDateString("vi-VN")}</time>
            <span>·</span>
            <span>{article.readTime} phút đọc</span>
          </div>
        </motion.div>
      </section>

      {keyPoints.length > 0 && (
        <section className="py-10 bg-white border-b border-earth/10">
          <div className="container-main max-w-3xl">
            <p className="section-label mb-5">Điểm Chính</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {keyPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 rounded-lg"
                  style={{ border: "1px solid rgba(61,43,31,0.15)", background: "rgba(245,234,213,0.4)" }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{ background: "#1C2A1C", border: "2px solid #C8A84B" }}
                  >
                    <span className="font-serif text-lg font-bold" style={{ color: "#C8A84B" }}>{i + 1}</span>
                  </div>
                  <p className="font-sans text-sm leading-snug line-clamp-3" style={{ color: "#3D2B1F" }}>{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container-main max-w-3xl py-8">
        <div className="flex items-center gap-6">
          <div className="flex-1 h-px bg-earth/20" />
          <Illustration svg={svgs[0]} className="w-28 opacity-80" />
          <div className="flex-1 h-px bg-earth/20" />
        </div>
      </div>

      <section className="pb-20 bg-white">
        <div className="container-main max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <div className="flex flex-wrap justify-center gap-6 my-10">
            {[svgs[1], svgs[2]].map((svg, i) => (
              <Illustration
                key={i}
                svg={svg}
                className="w-32 h-32 rounded-full overflow-hidden opacity-80"
              />
            ))}
          </div>
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

// ==========================
// Layout 5: Minimal Essay
// ==========================
function Layout5({ article, illustrations: svgs }: ArticleClientProps) {
  return (
    <div className="pt-[90px]">
      <ReadingProgress />
      <section className="py-16 bg-white border-b border-earth/10">
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
          <div className="w-12 h-px mx-auto mb-5" style={{ background: "#C8A84B" }} />
          <div className="flex justify-center items-center gap-4 text-xs text-muted font-sans">
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
            <span>{article.title.substring(0, 30)}…</span>
          </div>
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center py-8 px-6 mb-10"
          >
            <p className="font-serif text-xl italic leading-relaxed" style={{ color: "#3D2B1F" }}>
              &ldquo;{article.excerpt}&rdquo;
            </p>
          </motion.blockquote>

          <Illustration svg={svgs[0]} className="w-full max-w-xs mx-auto my-8 opacity-70" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="article-content article-content--essay"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <Illustration svg={svgs[1]} className="w-full max-w-xs mx-auto my-8 opacity-70" />
          <Illustration svg={svgs[2]} className="w-full max-w-xs mx-auto my-8 opacity-70" />

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

// ==========================
// Main exported client component
// ==========================
export function ArticleClient({
  article,
  articleIndex,
  illustrations,
}: ArticleClientProps) {
  const layoutIndex = articleIndex % 5;
  const props = { article, articleIndex, illustrations };

  if (layoutIndex === 0) return <Layout1 {...props} />;
  if (layoutIndex === 1) return <Layout2 {...props} />;
  if (layoutIndex === 2) return <Layout3 {...props} />;
  if (layoutIndex === 3) return <Layout4 {...props} />;
  return <Layout5 {...props} />;
}
