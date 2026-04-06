import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Phạm Thanh Tùng",
  description: "Blog cá nhân về hành trình phát triển du lịch nông nghiệp.",
};

export default function BlogPage() {
  return (
    <div className="pt-[90px]">
      <section className="bg-beige py-16 border-b border-earth/10">
        <div className="container-main text-center">
          <p className="section-label mb-3">Nhật Ký</p>
          <h1
            className="font-serif text-charcoal mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Blog
          </h1>
          <div className="w-12 h-0.5 bg-primary mx-auto" />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-main text-center">
          <p className="font-sans text-muted mb-6">Sắp ra mắt — đang cập nhật nội dung.</p>
          <Link href="/" className="btn-navy">Về Trang Chủ</Link>
        </div>
      </section>
    </div>
  );
}
