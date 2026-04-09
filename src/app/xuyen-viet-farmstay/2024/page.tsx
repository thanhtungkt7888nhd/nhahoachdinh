import type { Metadata } from "next";
import XVFJournalClient, { type JournalConfig } from "../XVFJournalClient";

export const metadata: Metadata = {
  title: "Xuyên Việt Farmstay 2024 | Phạm Thanh Tùng · Nhà Hoạch Định",
  description:
    "Nhật ký hành trình Xuyên Việt Farmstay lần 2 — 2024: Mở rộng tuyến đường, thêm nhiều farmstay và tỉnh thành mới.",
  keywords: ["Xuyên Việt Farmstay 2024", "farmstay Việt Nam", "hành trình 2024", "Phạm Thanh Tùng"],
  alternates: { canonical: "https://nhahoachdinh.com/xuyen-viet-farmstay/2024" },
  openGraph: {
    title: "Xuyên Việt Farmstay 2024 — Lần 2 · Mở Rộng Hành Trình",
    description: "Nhật ký hành trình lần 2: mở rộng tuyến đường, thêm nhiều farmstay và tỉnh thành mới.",
    url: "https://nhahoachdinh.com/xuyen-viet-farmstay/2024",
  },
};

const config: JournalConfig = {
  year: "2024",
  edition: "Lần 2",
  route: "Hành trình xuyên Việt — Mùa thứ hai",
  dateRange: "Năm 2024",
  stats: [
    { num: "Lần 2", label: "Hành Trình" },
    { num: "30+", label: "Farm" },
    { num: "15+", label: "Tỉnh Thành" },
  ],
  summary:
    "Mùa thứ hai, hành trình được mở rộng hơn với nhiều điểm dừng mới, nhiều tỉnh thành hơn và mạng lưới farmstay dày đặc hơn dọc tuyến đường xuyên Việt. Từng bước xây dựng bản đồ du lịch nông nghiệp Việt Nam.",
  stops: [],
  prevYear: { year: "2023", href: "/xuyen-viet-farmstay/2023" },
  nextYear: { year: "2025", href: "/xuyen-viet-farmstay/2025" },
};

export default function XVF2024Page() {
  return <XVFJournalClient config={config} />;
}
