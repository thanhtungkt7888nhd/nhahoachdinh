/**
 * /chia-se-kien-thuc/[slug] — Trang bài viết chi tiết.
 * Layout: Hero → (Content + Sidebar) → CTA footer.
 * Markdown render qua remark pipeline, không cần MDX.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { remark }         from "remark";
import remarkGfm          from "remark-gfm";
import remarkRehype       from "remark-rehype";
import rehypeRaw          from "rehype-raw";
import rehypeStringify    from "rehype-stringify";

import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import ArticleHero from "@/components/bai-viet/ArticleHero";
import ArticleBody from "@/components/bai-viet/ArticleBody";
import ArticleMeta from "@/components/bai-viet/ArticleMeta";

const SITE_URL = "https://nhahoachdinh.vn";
const FOREST   = "#0A1208";
const CREAM    = "#EDE0C4";
const GOLD     = "#C49A28";
const TERRA    = "#A0522D";

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
    description: post.excerpt || `Bài viết về ${post.cua} từ Nhà Hoạch Định.`,
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

/** Chuyển markdown → HTML string (server-side). */
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
    <main style={{ background: FOREST, minHeight: "100vh" }}>
      {/* === Hero === */}
      <ArticleHero post={post} />

      {/* === Content + Sidebar === */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "3rem clamp(1rem, 5vw, 3rem) 5rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
        }}
        className="lg:grid-cols-[1fr_280px]"
      >
        {/* Nội dung */}
        <article style={{ minWidth: 0 }}>
          {/* Excerpt nổi bật */}
          {post.excerpt && (
            <p
              className="font-sans"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                color: "rgba(237,224,196,0.65)",
                lineHeight: 1.75,
                borderLeft: `3px solid ${TERRA}`,
                paddingLeft: "1.2rem",
                marginBottom: "2.5rem",
                fontStyle: "italic",
              }}
            >
              {post.excerpt}
            </p>
          )}

          <ArticleBody html={html} />
        </article>

        {/* Sidebar */}
        <div>
          <div style={{ position: "sticky", top: "2rem" }}>
            <ArticleMeta post={post} related={related} />
          </div>
        </div>
      </div>

      {/* === CTA Footer === */}
      <section
        style={{
          background: "rgba(196,154,40,0.05)",
          borderTop: "1px solid rgba(196,154,40,0.12)",
          padding: "3rem clamp(1rem, 5vw, 3rem)",
          textAlign: "center",
        }}
      >
        <p
          className="font-sans uppercase"
          style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: GOLD, marginBottom: "0.75rem" }}
        >
          Khám phá thêm
        </p>
        <h2
          className="font-serif"
          style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: CREAM, fontWeight: 400, marginBottom: "1.5rem" }}
        >
          Đọc thêm bài viết về farmstay Việt Nam
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/chia-se-kien-thuc"
            className="font-sans"
            style={{
              padding: "0.7rem 1.8rem", borderRadius: 4,
              background: "rgba(196,154,40,0.15)",
              border: "1px solid rgba(196,154,40,0.3)",
              color: GOLD, textDecoration: "none",
              fontSize: "0.85rem", letterSpacing: "0.05em",
            }}
          >
            Tất cả bài viết →
          </Link>
          <Link
            href="/"
            className="font-sans"
            style={{
              padding: "0.7rem 1.8rem", borderRadius: 4,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(237,224,196,0.1)",
              color: "rgba(237,224,196,0.6)", textDecoration: "none",
              fontSize: "0.85rem",
            }}
          >
            Trang chủ
          </Link>
        </div>
      </section>
    </main>
  );
}
