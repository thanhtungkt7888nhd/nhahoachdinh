import type { Metadata } from "next";
import XVFJournalClient, { type JournalConfig } from "../XVFJournalClient";

export const metadata: Metadata = {
  title: "Xuyên Việt Farmstay 2025 | Phạm Thanh Tùng · Nhà Hoạch Định",
  description:
    "Nhật ký hành trình Xuyên Việt Farmstay lần 3 — 2025: 15 ngày, 35+ farm, 16+ tỉnh thành dọc tuyến đường xuyên Việt.",
  keywords: [
    "Xuyên Việt Farmstay 2025", "hành trình farmstay Việt Nam", "du lịch nông nghiệp",
    "Phạm Thanh Tùng", "Defarm", "XVF 2025",
  ],
  alternates: { canonical: "https://nhahoachdinh.com/xuyen-viet-farmstay/2025" },
  openGraph: {
    title: "Xuyên Việt Farmstay 2025 — Lần 3 · 35 Farm · 15 Ngày",
    description: "Nhật ký hành trình lần 3: 15 ngày, 35 điểm đón, hơn 16 tỉnh thành dọc tuyến đường xuyên Việt.",
    url: "https://nhahoachdinh.com/xuyen-viet-farmstay/2025",
    images: [{ url: "https://nhahoachdinh.com/og-home.jpg", width: 1200, height: 630 }],
  },
};

const config: JournalConfig = {
  year: "2025",
  edition: "Lần 3",
  route: "Hồ Chí Minh → Hà Nội · Dọc Quốc lộ 1A",
  dateRange: "15 ngày · Tháng 3/2025",
  stats: [
    { num: "15", label: "Ngày" },
    { num: "35+", label: "Farm" },
    { num: "16+", label: "Tỉnh Thành" },
    { num: "QL1A", label: "Tuyến Đường" },
  ],
  summary:
    "Hành trình xuyên Việt quy mô nhất từ trước đến nay — 15 ngày di chuyển từ Hồ Chí Minh ra Hà Nội, ghé thăm hơn 35 farmstay và trang trại trải dài hơn 16 tỉnh thành dọc Quốc lộ 1A. Mỗi điểm dừng là một câu chuyện, một con người, một mảnh ghép trong bức tranh du lịch nông nghiệp Việt Nam.",
  stops: [],
  prevYear: { year: "2024", href: "/xuyen-viet-farmstay/2024" },
};

export default function XVF2025Page() {
  return <XVFJournalClient config={config} />;
}
