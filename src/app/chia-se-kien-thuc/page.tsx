import type { Metadata } from "next";
import KnowledgeGrid from "@/components/KnowledgeGrid";

export const metadata: Metadata = {
  title: "Chia Sẻ Kiến Thức Farmstay & Du Lịch Nông Nghiệp",
  description:
    "75+ bài viết chuyên sâu về phát triển farmstay, quy hoạch vùng đất, chiến lược đầu tư, vận hành và du lịch nông nghiệp bền vững tại Việt Nam — bởi Phạm Thanh Tùng.",
  keywords: [
    "kiến thức farmstay", "bài viết farmstay", "hướng dẫn làm farmstay",
    "tư vấn đầu tư farmstay", "du lịch nông nghiệp Việt Nam",
    "thiết kế farmstay", "quy hoạch farmstay", "vận hành farmstay",
  ],
  alternates: { canonical: "https://nhahoachdinh.com/chia-se-kien-thuc" },
  openGraph: {
    title: "Chia Sẻ Kiến Thức Farmstay | Phạm Thanh Tùng",
    description: "75+ bài viết thực chiến về farmstay & du lịch nông nghiệp từ chuyên gia 9 năm kinh nghiệm.",
    url: "https://nhahoachdinh.com/chia-se-kien-thuc",
    type: "website",
  },
};

export default function KnowledgePage() {
  return (
    <div className="pt-[90px]">
      {/* Page Hero */}
      <section className="bg-beige py-16 border-b border-earth/10">
        <div className="container-main text-center">
          <p className="section-label mb-3">Kiến Thức</p>
          <h1
            className="font-serif text-charcoal mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Chia Sẻ Kiến Thức
          </h1>
          <div className="w-12 h-0.5 bg-primary mx-auto mb-6" />
          <p className="font-sans text-muted mt-4 max-w-xl mx-auto leading-relaxed text-sm italic font-serif">
            &ldquo;Khi mình chia sẻ kiến thức mình có với người khác, mình học lại kiến thức
            đó thêm một lần nữa.&rdquo;
          </p>
        </div>
      </section>

      <KnowledgeGrid showHeading={false} />
    </div>
  );
}
