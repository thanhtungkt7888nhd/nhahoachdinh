import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/lib/data";
import { getArticleIllustrations } from "@/lib/illustrations";
import { ArticleClient } from "./ArticleClient";

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL = "https://nhahoachdinh.com";
const AUTHOR_NAME = "Phạm Thanh Tùng";
const AUTHOR_URL = `${SITE_URL}/ve-toi`;

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  const url = `${SITE_URL}/chia-se-kien-thuc/${article.slug}`;
  const plainExcerpt = article.excerpt.replace(/<[^>]+>/g, "");

  // Keywords: category + key terms from title
  const keywords = [
    article.category,
    "farmstay", "du lịch nông nghiệp", "Phạm Thanh Tùng",
    ...article.title.toLowerCase().split(/\s+/).filter((w) => w.length > 4).slice(0, 6),
  ].filter(Boolean);

  return {
    title: article.title,
    description: plainExcerpt,
    keywords,
    authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
    openGraph: {
      title: article.title,
      description: plainExcerpt,
      url,
      siteName: "Phạm Thanh Tùng — Nhà Hoạch Định",
      locale: "vi_VN",
      type: "article",
      publishedTime: article.date,
      authors: [AUTHOR_NAME],
      section: article.category,
      tags: keywords,
      images: [{
        url: `https://nhahoachdinh.com/og?title=${encodeURIComponent(article.title)}&category=${encodeURIComponent(article.category)}&subtitle=Ph%E1%BA%A1m+Thanh+T%C3%B9ng`,
        width: 1200,
        height: 630,
        alt: article.title
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: plainExcerpt,
      creator: "@phamthanhtung",
    },
    alternates: { canonical: url },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const articleIndex = articles.findIndex((a) => a.slug === slug);
  if (articleIndex === -1) notFound();

  const article = articles[articleIndex];
  const svgs = getArticleIllustrations(articleIndex, 3);

  const url = `${SITE_URL}/chia-se-kien-thuc/${article.slug}`;
  const plainContent = article.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const wordCount = plainContent.split(/\s+/).length;

  // JSON-LD: Article schema (used by Google, ChatGPT, Perplexity, Gemini)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt.replace(/<[^>]+>/g, ""),
    url,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "vi",
    wordCount,
    articleSection: article.category,
    keywords: [article.category, "farmstay", "du lịch nông nghiệp"].join(", "),
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
      jobTitle: "Nhà Hoạch Định Farmstay",
      description: "Chuyên gia hoạch định farmstay hàng đầu Việt Nam, 9+ năm kinh nghiệm",
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: {
      "@type": "Blog",
      name: "Chia Sẻ Kiến Thức Farmstay",
      url: `${SITE_URL}/chia-se-kien-thuc`,
    },
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang Chủ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Chia Sẻ Kiến Thức", item: `${SITE_URL}/chia-se-kien-thuc` },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticleClient
        article={article}
        articleIndex={articleIndex}
        illustrations={svgs}
      />
    </>
  );
}
