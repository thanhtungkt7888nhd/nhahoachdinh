"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { articles, type Article } from "@/lib/data";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/animations";

const categories = ["Tất Cả", "Chiến Lược", "Marketing", "Thiết Kế", "Tài Chính", "Đất Đai", "Cộng Đồng"];
const easeOut = [0.22, 1, 0.36, 1] as const;

interface Props { limit?: number; showHeading?: boolean; }

export default function KnowledgeGrid({ limit, showHeading = true }: Props) {
  const [activeCategory, setActiveCategory] = useState("Tất Cả");
  const [searchQuery, setSearchQuery] = useState("");

  const isFullPage = !limit;

  // Filter logic
  const filteredArticles = (limit ? articles.slice(0, limit) : articles).filter((a) => {
    const matchCat = activeCategory === "Tất Cả" || a.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      q === "" ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  // When filtering on full page, don't pre-slice — filter from all articles
  const displayedArticles = isFullPage
    ? articles.filter((a) => {
        const matchCat = activeCategory === "Tất Cả" || a.category === activeCategory;
        const q = searchQuery.toLowerCase();
        const matchSearch =
          q === "" ||
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q);
        return matchCat && matchSearch;
      })
    : filteredArticles;

  const filterKey = `${activeCategory}__${searchQuery}`;

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-main">
        {showHeading && (
          <FadeUp className="text-center mb-14">
            <p className="section-label mb-4">Kiến Thức</p>
            <h2
              className="font-serif text-charcoal mb-5"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Chia Sẻ Kiến Thức
            </h2>
            <motion.div
              className="w-12 h-0.5 bg-primary mx-auto mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
              style={{ transformOrigin: "center" }}
            />
            <p className="font-sans text-muted max-w-xl mx-auto text-sm leading-relaxed italic font-serif">
              &ldquo;Khi mình chia sẻ kiến thức mình có với người khác, mình học lại kiến thức đó thêm một lần nữa.&rdquo;
            </p>

            {/* Filter tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-10">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="font-sans font-semibold text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition-colors"
                  style={
                    activeCategory === cat
                      ? { background: "var(--color-primary, #7A5C2E)", color: "#fff" }
                      : undefined
                  }
                  data-active={activeCategory === cat}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.4, ease: easeOut }}
                  whileTap={{ scale: 0.96 }}
                  aria-pressed={activeCategory === cat}
                >
                  <span
                    className={
                      activeCategory === cat
                        ? ""
                        : "font-sans font-semibold text-xs uppercase tracking-wider bg-charcoal/5 text-charcoal/60 hover:bg-primary/20 hover:text-primary"
                    }
                  >
                    {cat}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Search input — only on full page */}
            {isFullPage && (
              <div className="mt-6 max-w-md mx-auto">
                <div
                  className="relative flex items-center"
                  style={{ borderRadius: "10px", overflow: "hidden" }}
                >
                  {/* Magnifying glass icon */}
                  <span
                    className="absolute left-4 pointer-events-none"
                    style={{ color: "rgba(122,92,46,0.5)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm bài viết..."
                    className="font-sans w-full text-sm"
                    style={{
                      paddingLeft: "2.75rem",
                      paddingRight: "1rem",
                      paddingTop: "0.65rem",
                      paddingBottom: "0.65rem",
                      background: "#f9f7f3",
                      border: "1px solid rgba(122,92,46,0.2)",
                      borderRadius: "10px",
                      color: "#2c2c2c",
                      outline: "none",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(122,92,46,0.55)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(196,154,40,0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(122,92,46,0.2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </FadeUp>
        )}

        <StaggerParent key={filterKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.length > 0 ? (
            displayedArticles.map((a) => (
              <StaggerChild key={a.slug}>
                <ArticleCard article={a} />
              </StaggerChild>
            ))
          ) : (
            <div
              className="col-span-full text-center py-20"
              style={{ color: "rgba(44,44,44,0.45)" }}
            >
              <p className="font-serif text-xl mb-2">Không tìm thấy bài viết</p>
              <p className="font-sans text-sm">Thử thay đổi từ khoá hoặc chọn danh mục khác.</p>
            </div>
          )}
        </StaggerParent>

        {limit && articles.length > limit && (
          <FadeUp delay={0.3} className="text-center mt-14">
            <Link href="/chia-se-kien-thuc" className="btn-navy">
              Xem Tất Cả Bài Viết
            </Link>
          </FadeUp>
        )}
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: easeOut }}>
      <Link href={`/chia-se-kien-thuc/${article.slug}`} className="group flex flex-col">
        {/* Image */}
        <div className="img-shadow w-full aspect-[16/10] overflow-hidden relative mb-5">
          <Image
            src={article.image}
            alt={article.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-108"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent transition-opacity duration-300 group-hover:opacity-70" />
          <div className="absolute bottom-3 left-4">
            <span className="font-sans font-semibold text-[10px] uppercase tracking-wider text-white bg-primary px-3 py-1">
              {article.category}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 font-sans text-xs text-muted mb-2">
          <time>{new Date(article.date).toLocaleDateString("vi-VN")}</time>
          <span>·</span>
          <span>{article.readTime} phút đọc</span>
        </div>

        {/* Title */}
        <h3
          className="font-serif text-charcoal leading-snug mb-3 group-hover:text-primary transition-colors duration-300"
          style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)" }}
        >
          {article.title}
        </h3>

        <p className="font-sans text-muted text-sm leading-relaxed flex-1 line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        {/* Arrow with slide animation */}
        <span className="font-sans font-semibold text-xs uppercase tracking-[0.2em] text-primary group-hover:text-brown transition-colors duration-300 flex items-center gap-2">
          Đọc Thêm
          <span>→</span>
        </span>
      </Link>
    </motion.div>
  );
}
