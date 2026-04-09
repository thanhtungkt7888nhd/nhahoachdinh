import type { Metadata } from "next";
import FarmstayUpdateClient from "./FarmstayUpdateClient";

export const metadata: Metadata = {
  title: "Farmstay Update | Phạm Thanh Tùng · Nhà Hoạch Định",
  description:
    "Farmstay Update — sự kiện thường niên 2 ngày offline về Du lịch Nông nghiệp Việt Nam. Cập nhật tri thức, kết nối giao thương, học hỏi từ chuyên gia hàng đầu. Farmstay Update 2026: 13–15/03/2026 tại Sản Việt Farm, Khánh Hòa.",
  keywords: [
    "Farmstay Update", "Farmstay Update 2026", "du lịch nông nghiệp", "sự kiện farmstay",
    "Phạm Thanh Tùng", "Defarm", "Sản Việt Farm", "offline farmstay toàn quốc",
  ],
  alternates: { canonical: "https://nhahoachdinh.vn/farmstay-update" },
  openGraph: {
    title: "Farmstay Update 2026 — Sự Kiện Du Lịch Nông Nghiệp Lớn Nhất Năm",
    description: "13–15/03/2026 · Sản Việt Farm · Khánh Hòa. 8 chuyên đề, diễn giả hàng đầu, 2 ngày kết nối giao thương.",
    url: "https://nhahoachdinh.vn/farmstay-update",
    images: [{ url: "https://nhahoachdinh.vn/og-home.jpg", width: 1200, height: 630 }],
  },
};

export default function FarmstayUpdatePage() {
  return <FarmstayUpdateClient />;
}
