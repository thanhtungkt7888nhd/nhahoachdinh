import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/lib/data";
import { getArticleIllustrations } from "@/lib/illustrations";
import { ArticleClient } from "./ArticleClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} - Phạm Thanh Tùng`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const articleIndex = articles.findIndex((a) => a.slug === slug);
  if (articleIndex === -1) notFound();

  const article = articles[articleIndex];
  const svgs = getArticleIllustrations(articleIndex, 3);

  return (
    <ArticleClient
      article={article}
      articleIndex={articleIndex}
      illustrations={svgs}
    />
  );
}
