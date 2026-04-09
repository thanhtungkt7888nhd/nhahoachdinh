import type { Metadata } from "next";
import XVFMainClient from "./XVFMainClient";

export const metadata: Metadata = {
  title: "Xuyên Việt Farmstay | Phạm Thanh Tùng · Nhà Hoạch Định",
  description:
    "Hành trình Xuyên Việt Farmstay — 3 mùa liên tiếp, 100+ farm, 30+ tỉnh thành. Tìm hiểu chương trình, mục tiêu, lý do và cách đồng hành cùng chúng tôi.",
  keywords: ["Xuyên Việt Farmstay", "du lịch nông nghiệp", "farmstay Việt Nam", "Phạm Thanh Tùng", "Defarm"],
  alternates: { canonical: "https://nhahoachdinh.com/xuyen-viet-farmstay" },
  openGraph: {
    title: "Xuyên Việt Farmstay — Hành Trình Du Lịch Nông Nghiệp Việt Nam",
    description: "3 mùa liên tiếp, 100+ farm, 30+ tỉnh thành. Cùng Phạm Thanh Tùng xây dựng Du lịch Nông nghiệp Việt Nam.",
    url: "https://nhahoachdinh.com/xuyen-viet-farmstay",
  },
};

export default function XVFPage() {
  return <XVFMainClient />;
}
