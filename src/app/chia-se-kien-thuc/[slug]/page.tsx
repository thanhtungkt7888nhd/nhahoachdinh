/**
 * /chia-se-kien-thuc/[slug] — Trang bài viết chi tiết.
 * Layout: Reading progress → Hero → (Content 2 cột + Sidebar) → CTA.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { remark }      from "remark";
import remarkGfm       from "remark-gfm";
import remarkRehype    from "remark-rehype";
import rehypeRaw       from "rehype-raw";
import rehypeStringify from "rehype-stringify";

import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import ArticleHero     from "@/components/bai-viet/ArticleHero";
import ArticleBody     from "@/components/bai-viet/ArticleBody";
import ArticleMeta     from "@/components/bai-viet/ArticleMeta";
import ReadingProgress from "@/components/bai-viet/ReadingProgress";

const SITE_URL = "https://nhahoachdinh.vn";
const FOREST   = "#0A1208";
const CREAM    = "#EDE0C4";
const GOLD     = "#C49A28";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${SITE_URL}/chia-se-kien-thuc/${slug}`;
  return {
    title: `${post.title} — Nhà Hoạch Định`,
    description: post.excerpt || `Bài viết từ Nhà Hoạch Định về farmstay Việt Nam.`,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.tac_gia],
      images: post.cover ? [{ url: post.cover, width: 1200, height: 630 }] : [],
    },
  };
}

async function markdownToHtml(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);
  return result.toString();
}

export default async function ArticleSlugPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html    = await markdownToHtml(post.content);
  const related = getRelatedPosts(post, 3);

  return (
    <>
      {/* Reading progress bar — fixed top */}
      <ReadingProgress />

      <main style={{ background: FOREST, minHeight: "100vh" }}>

        {/* ── Hero ── */}
        <ArticleHero post={post} />

        {/* ── Layout CSS responsive ── */}
        <style>{`
          .article-layout {
            max-width: 1100px;
            margin: 0 auto;
            padding: 3.5rem clamp(1rem, 5vw, 2.5rem) 6rem;
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          @media (min-width: 1024px) {
            .article-layout {
              grid-template-columns: 1fr 300px;
              gap: 4rem;
            }
          }
          .article-sidebar-inner {
            position: static;
          }
          @media (min-width: 1024px) {
            .article-sidebar-inner {
              position: sticky;
              top: 2rem;
            }
          }
        `}</style>

        {/* ── Content + Sidebar ── */}
        <div className="article-layout">

          {/* Nội dung bài */}
          <article style={{ minWidth: 0 }}>

            {/* Excerpt nổi bật */}
            {post.excerpt && (
              <p style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontSize: "clamp(1rem, 1.6vw, 1.1rem)",
                color: "rgba(237,224,196,0.62)",
                lineHeight: 1.8,
                fontStyle: "italic",
                borderLeft: "3px solid #A0522D",
                paddingLeft: "1.25rem",
                marginBottom: "2.5rem",
                marginTop: 0,
              }}>
                {post.excerpt}
              </p>
            )}

            <ArticleBody html={html} />

            {/* Divider cuối bài */}
            <div style={{
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(196,154,40,0.1)",
              display: "flex", flexWrap: "wrap", gap: "0.5rem",
            }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.7rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: 3,
                    background: "rgba(160,82,45,0.1)",
                    border: "1px solid rgba(160,82,45,0.2)",
                    color: "rgba(237,224,196,0.6)",
                    fontFamily: "var(--font-sans, sans-serif)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside>
            <div className="article-sidebar-inner">
              <ArticleMeta post={post} related={related} />
            </div>
          </aside>
        </div>

        {/* ── CTA Footer ── */}
        <section style={{
          background: "rgba(196,154,40,0.04)",
          borderTop: "1px solid rgba(196,154,40,0.1)",
          padding: "4rem clamp(1rem, 5vw, 3rem)",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "0.6rem", letterSpacing: "0.35em",
            textTransform: "uppercase", color: GOLD,
            marginBottom: "0.75rem",
          }}>
            Khám phá thêm
          </p>
          <h2 style={{
            fontFamily: "var(--font-serif, Georgia, serif)",
            fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
            color: CREAM, fontWeight: 400,
            marginBottom: "2rem", lineHeight: 1.3,
          }}>
            Đọc thêm về farmstay Việt Nam
          </h2>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
            <Link
              href="/chia-se-kien-thuc"
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                padding: "0.75rem 2rem", borderRadius: 4,
                background: "rgba(196,154,40,0.15)",
                border: "1px solid rgba(196,154,40,0.3)",
                color: GOLD, textDecoration: "none",
                fontSize: "0.82rem", letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
            >
              Tất cả bài viết →
            </Link>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-sans, sans-serif)",
                padding: "0.75rem 2rem", borderRadius: 4,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(237,224,196,0.1)",
                color: "rgba(237,224,196,0.5)", textDecoration: "none",
                fontSize: "0.82rem",
              }}
            >
              Trang chủ
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}
