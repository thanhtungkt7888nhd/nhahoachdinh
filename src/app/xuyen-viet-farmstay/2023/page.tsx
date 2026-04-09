import type { Metadata } from "next";
import XVFJournalClient, { type JournalConfig } from "../XVFJournalClient";

export const metadata: Metadata = {
  title: "Xuyên Việt Farmstay 2023 | Phạm Thanh Tùng · Nhà Hoạch Định",
  description:
    "Nhật ký hành trình Xuyên Việt Farmstay lần 1 — 2023: Những farmstay và trang trại đầu tiên trên tuyến đường xuyên Việt.",
  keywords: ["Xuyên Việt Farmstay 2023", "farmstay Việt Nam", "hành trình 2023", "Phạm Thanh Tùng"],
  alternates: { canonical: "https://nhahoachdinh.com/xuyen-viet-farmstay/2023" },
  openGraph: {
    title: "Xuyên Việt Farmstay 2023 — Lần 1 · Hành Trình Đầu Tiên",
    description: "Nhật ký hành trình lần 1: những farmstay và trang trại đầu tiên trên tuyến đường xuyên Việt.",
    url: "https://nhahoachdinh.com/xuyen-viet-farmstay/2023",
  },
};

const config: JournalConfig = {
  year: "2023",
  edition: "Lần 1",
  route: "Hành trình xuyên Việt — Lần đầu tiên",
  dateRange: "Năm 2023",
  stats: [
    { num: "Lần 1", label: "Hành Trình" },
    { num: "20+", label: "Farm" },
    { num: "10+", label: "Tỉnh Thành" },
  ],
  summary:
    "Lần đầu tiên đặt chân lên hành trình xuyên Việt để tìm kiếm và kết nối với những farmstay, trang trại dọc tuyến đường Bắc – Nam. Đây là nơi mà ý tưởng Xuyên Việt Farmstay được chứng minh là có thể trở thành hiện thực.",
  stops: [],
  nextYear: { year: "2024", href: "/xuyen-viet-farmstay/2024" },
};

export default function XVF2023Page() {
  return <XVFJournalClient config={config} />;
}
