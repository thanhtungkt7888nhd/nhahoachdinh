import type { Metadata } from "next";
import XVF2025Client from "./XVF2025Client";

export const metadata: Metadata = {
  title: "Xuyên Việt Farmstay 2025 | Phạm Thanh Tùng · Nhà Hoạch Định",
  description:
    "Hành trình Xuyên Việt Farmstay lần 3 — 2025: 15 ngày, 35+ farm, 16+ tỉnh thành dọc Quốc lộ 1A. Giới thiệu chương trình, mục tiêu, lợi ích và thông tin tài trợ.",
  keywords: [
    "Xuyên Việt Farmstay 2025", "hành trình farmstay Việt Nam", "du lịch nông nghiệp",
    "Phạm Thanh Tùng", "Defarm", "tài trợ farmstay", "XVF 2025",
  ],
  alternates: { canonical: "https://nhahoachdinh.com/xuyen-viet-farmstay/2025" },
  openGraph: {
    title: "Xuyên Việt Farmstay 2025 — Lần 3 · 35 Farm · 15 Ngày",
    description: "Hành trình xuyên Việt quy mô nhất: 15 ngày, 35 điểm đón, hơn 16 tỉnh thành dọc QL1A. Cùng Phạm Thanh Tùng xây dựng Du lịch Nông nghiệp Việt Nam.",
    url: "https://nhahoachdinh.com/xuyen-viet-farmstay/2025",
    images: [{ url: "https://nhahoachdinh.com/og-home.jpg", width: 1200, height: 630 }],
  },
};

export default function XVF2025Page() {
  return <XVF2025Client />;
}
