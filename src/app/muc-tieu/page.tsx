import type { Metadata } from "next";
import ToiLamClient from "@/app/toi-lam/ToiLamClient";

export const metadata: Metadata = {
  title: "Mục Tiêu Của Tôi | Phạm Thanh Tùng · Nhà Hoạch Định",
  description:
    "Tầm nhìn, sứ mệnh và các tầng tác động của Phạm Thanh Tùng — từ nền tảng chuyên môn, cộng đồng thực hành đến nhận thức quốc gia về du lịch nông nghiệp bền vững.",
  keywords: [
    "mục tiêu Phạm Thanh Tùng", "tầm nhìn farmstay", "sứ mệnh nhà hoạch định",
    "du lịch nông nghiệp Việt Nam", "chiến lược farmstay",
  ],
  alternates: { canonical: "https://nhahoachdinh.com/muc-tieu" },
  openGraph: {
    title: "Mục Tiêu Của Tôi — Phạm Thanh Tùng · Nhà Hoạch Định",
    description: "Tầng tác, tầm nhìn và con đường mình đang đi để Việt Nam trở thành quốc gia Du lịch Nông nghiệp.",
    url: "https://nhahoachdinh.com/muc-tieu",
    images: [{ url: "https://nhahoachdinh.com/og-home.jpg", width: 1200, height: 630 }],
  },
};

export default function MucTieuPage() {
  return <ToiLamClient />;
}
