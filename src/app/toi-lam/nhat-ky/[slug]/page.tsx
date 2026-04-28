/**
 * /nhat-ky/[slug] — Trang chi tiết bài nhật ký.
 * Server component — MDX render qua next-mdx-remote/rsc.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllEntries,
  getEntryBySlug,
  getEntriesByType,
  type EntryType,
} from "@/lib/nhat-ky";
import TypeIcon from "@/components/nhat-ky/TypeIcon";
import BookQuote from "@/components/nhat-ky/BookQuote";
import FieldBadge from "@/components/nhat-ky/FieldBadge";
import ShareButtons from "@/components/nhat-ky/ShareButtons";

const SITE_URL = "https://nhahoachdinh.vn";
const FOREST   = "#060C08";
const CREAM    = "#EDE0C4";
const TERRA    = "#A0522D";
const GOLD     = "#C49A28";
const GREEN    = "#2D4A2B";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllEntries().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) return {};
  const url = `${SITE_URL}/toi-lam/nhat-ky/${slug}`;
  return {
    title: `${entry.title} — Nhật Ký`,
    description: entry.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: entry.title,
      description: entry.excerpt,
      url,
      type: "article",
      publishedTime: entry.date,
      authors: ["Phạm Thanh Tùng"],
    },
  };
}

function formatDateLong(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" });
}

/** MDX components — blockquote thông minh theo loại bài */
function getMDXComponents(type: EntryType, book?: { title: string; author: string }) {
  return {
    blockquote: ({ children }: { children: React.ReactNode }) => {
      if (type === "trich-dan" && book) {
        return (
          <BookQuote author={book.author} bookTitle={book.title}>
            {children}
          </BookQuote>
        );
      }
      return (
        <blockquote style={{
          borderLeft: `2px solid ${TERRA}`,
          margin: "2rem 0",
          padding: "1rem 1.5rem",
          background: "rgba(160,82,45,0.08)",
          borderRadius: "0 6px 6px 0",
          fontStyle: "italic",
          color: "#DDD0B4",
        }}>
          {children}
        </blockquote>
      );
    },
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong style={{ color: GOLD, fontWeight: 600 }}>{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em style={{ color: "#B8C8B4", fontStyle: "italic" }}>{children}</em>
    ),
  };
}

export default async function NhatKyDetailPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) notFound();

  const allOfType  = getEntriesByType(entry.type);
  const related    = allOfType.filter((e) => e.slug !== slug).slice(0, 2);
  const allEntries = getAllEntries();
  const currentIdx = allEntries.findIndex((e) => e.slug === slug);
  const prevEntry  = currentIdx < allEntries.length - 1 ? allEntries[currentIdx + 1] : null;
  const nextEntry  = currentIdx > 0 ? allEntries[currentIdx - 1] : null;

  const mdxComponents = getMDXComponents(entry.type, entry.book);
  const shareUrl      = `${SITE_URL}/toi-lam/nhat-ky/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: entry.title,
    description: entry.excerpt,
    url: shareUrl,
    datePublished: entry.date,
    inLanguage: "vi",
    author: {
      "@type": "Person",
      name: "Phạm Thanh Tùng",
      url: `${SITE_URL}/ve-toi`,
    },
    publisher: { "@type": "Person", name: "Phạm Thanh Tùng", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": shareUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ background: FOREST, minHeight: "100vh" }}>
        <article
          className="mx-auto px-6"
          style={{
            maxWidth: 680,
            paddingTop: "clamp(7rem, 14vw, 9.5rem)",
            paddingBottom: "5rem",
          }}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8" aria-label="Breadcrumb">
            <Link
              href="/toi-lam/nhat-ky"
              className="font-sans nhatky-nav-link"
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                color: "rgba(237,224,196,0.35)",
                textTransform: "uppercase",
              }}
            >
              Nhật Ký
            </Link>
            <span style={{ color: "rgba(160,82,45,0.4)", fontSize: "0.68rem" }}>·</span>
            <TypeIcon type={entry.type} size="sm" />
          </nav>

          {/* Tiêu đề */}
          <h1
            className="font-serif font-normal mb-5"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.75rem)",
              lineHeight: 1.15,
              color: CREAM,
              letterSpacing: "-0.02em",
            }}
          >
            {entry.title}
          </h1>

          {/* Meta */}
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5 font-sans"
            style={{ fontSize: "0.72rem", color: "rgba(237,224,196,0.4)", letterSpacing: "0.08em" }}
          >
            <span>Phạm Thanh Tùng</span>
            <span style={{ color: "rgba(160,82,45,0.4)" }}>·</span>
            <time dateTime={entry.date}>{formatDateLong(entry.date)}</time>
            <span style={{ color: "rgba(160,82,45,0.4)" }}>·</span>
            <span>{entry.readingTime} đọc</span>
          </div>

          {/* Đường kẻ đất nung */}
          <div
            className="mb-8"
            style={{ width: 48, height: 1, background: `linear-gradient(90deg, ${TERRA}, rgba(160,82,45,0.2))` }}
            aria-hidden="true"
          />

          {/* FieldBadge cho hiện trường */}
          {entry.type === "hien-truong" && entry.location && (
            <FieldBadge
              location={entry.location}
              coordinates={entry.coordinates}
              date={entry.date}
            />
          )}

          {/* MDX Content */}
          <div className="nhatky-content">
            <MDXRemote source={entry.content} components={mdxComponents} />
          </div>

          {/* Đường kẻ + chữ ký */}
          <div
            className="mt-12 mb-4"
            style={{ height: 1, background: "rgba(196,154,40,0.1)" }}
            aria-hidden="true"
          />
          <p
            className="font-serif italic text-right mb-10"
            style={{ fontSize: "0.9rem", color: "rgba(237,224,196,0.35)" }}
          >
            — Phạm Thanh Tùng
          </p>

          {/* Share — client component */}
          <ShareButtons url={shareUrl} />

          {/* Related */}
          {related.length > 0 && (
            <section className="mb-12">
              <p
                className="font-sans font-bold uppercase mb-5"
                style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(196,154,40,0.5)" }}
              >
                Cùng thể loại
              </p>
              <div className="flex flex-col gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/toi-lam/nhat-ky/${r.slug}`}
                    className="group flex items-start gap-4 p-4 rounded-lg nhatky-related-card"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(196,154,40,0.08)",
                    }}
                  >
                    <div className="flex-1">
                      <TypeIcon type={r.type} size="sm" />
                      <p
                        className="font-serif mt-1.5 leading-snug group-hover:text-[#D4B050] transition-colors duration-200"
                        style={{ fontSize: "0.95rem", color: CREAM }}
                      >
                        {r.title}
                      </p>
                      <p
                        className="font-sans mt-1"
                        style={{ fontSize: "0.7rem", color: "rgba(237,224,196,0.35)", letterSpacing: "0.06em" }}
                      >
                        {r.readingTime} đọc →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Prev / Next nav */}
          <nav
            className="flex items-start justify-between gap-4 font-sans"
            style={{ paddingTop: "2rem", borderTop: "1px solid rgba(196,154,40,0.1)" }}
            aria-label="Điều hướng bài"
          >
            {prevEntry ? (
              <Link
                href={`/toi-lam/nhat-ky/${prevEntry.slug}`}
                className="flex-1 nhatky-nav-link"
                style={{ fontSize: "0.78rem", color: "rgba(237,224,196,0.4)" }}
              >
                <span style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.15em", marginBottom: 3, color: "rgba(237,224,196,0.2)", textTransform: "uppercase" }}>← Bài Trước</span>
                {prevEntry.title}
              </Link>
            ) : <div />}

            {nextEntry && (
              <Link
                href={`/toi-lam/nhat-ky/${nextEntry.slug}`}
                className="flex-1 text-right nhatky-nav-link"
                style={{ fontSize: "0.78rem", color: "rgba(237,224,196,0.4)" }}
              >
                <span style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.15em", marginBottom: 3, color: "rgba(237,224,196,0.2)", textTransform: "uppercase" }}>Bài Sau →</span>
                {nextEntry.title}
              </Link>
            )}
          </nav>

        </article>
      </main>
    </>
  );
}
