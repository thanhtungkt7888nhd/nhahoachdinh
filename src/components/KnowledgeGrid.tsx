"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { articles, type Article } from "@/lib/data";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/animations";

const categories = ["Tất Cả", "Chiến Lược", "Marketing", "Thiết Kế", "Tài Chính", "Đất Đai", "Cộng Đồng"];
const easeOut = [0.22, 1, 0.36, 1] as const;

interface Props { limit?: number; showHeading?: boolean; }

export default function KnowledgeGrid({ limit, showHeading = true }: Props) {
  const displayed = limit ? articles.slice(0, limit) : articles;

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
              &ldquo;Khi tôi chia sẻ kiến thức mình có với người khác, tôi học lại kiến thức đó thêm một lần nữa.&rdquo;
            </p>

            {/* Filter tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-10">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat}
                  className="font-sans font-semibold text-xs uppercase tracking-wider px-4 py-2 rounded-lg
                             bg-charcoal/5 text-charcoal/60 hover:bg-primary/20 hover:text-primary transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.4, ease: easeOut }}
                  whileTap={{ scale: 0.96 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </FadeUp>
        )}

        <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayed.map((a) => (
            <StaggerChild key={a.slug}>
              <ArticleCard article={a} />
            </StaggerChild>
          ))}
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
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </span>
      </Link>
    </motion.div>
  );
}
