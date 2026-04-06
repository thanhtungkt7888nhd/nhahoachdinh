import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles } from "@/lib/data";

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
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <div className="pt-[90px]">
      {/* Hero */}
      <section className="bg-beige py-16 border-b border-earth/10">
        <div className="container-main max-w-3xl">
          <div className="flex items-center gap-2 text-sm text-muted font-sans mb-4">
            <Link href="/chia-se-kien-thuc" className="hover:text-primary transition-colors">
              Chia Sẻ Kiến Thức
            </Link>
            <span>/</span>
            <span className="text-primary">{article.category}</span>
          </div>
          <h1
            className="font-serif text-charcoal leading-snug mb-4"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
          >
            {article.title}
          </h1>
          <div className="w-10 h-0.5 bg-primary mb-5" />
          <div className="flex items-center gap-4 text-xs text-muted font-sans">
            <time>{new Date(article.date).toLocaleDateString("vi-VN")}</time>
            <span>·</span>
            <span>{article.readTime} phút đọc</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container-main max-w-3xl">
          <p className="font-sans text-lg text-muted leading-relaxed mb-8 border-l-4 border-primary pl-6 italic">
            {article.excerpt}
          </p>

          {/* TODO: thêm nội dung bài viết đầy đủ (MDX hoặc CMS) */}
          <div className="bg-beige border border-earth/10 rounded p-8 text-center text-muted font-sans">
            <p className="mb-4">Nội dung bài viết đang được cập nhật.</p>
            <p className="text-sm">
              Kết nối với CMS (Contentful, Sanity) hoặc dùng MDX để thêm nội dung đầy đủ.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-earth/10">
            <Link href="/chia-se-kien-thuc" className="btn-navy text-sm">
              ← Quay Lại Danh Sách
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
