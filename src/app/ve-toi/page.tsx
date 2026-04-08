import type { Metadata } from "next";
import VeToiClient from "./VeToiClient";

export const metadata: Metadata = {
  title: "Về Tôi — Phạm Thanh Tùng",
  description: "Hành trình từ nông thôn Khánh Hòa đến nhà hoạch định farmstay hàng đầu. 9 năm kinh nghiệm, 50+ dự án, sứ mệnh phát triển nông nghiệp xanh bền vững.",
  keywords: ["Phạm Thanh Tùng", "nhà hoạch định farmstay", "tư vấn farmstay", "về tôi", "farmstay Việt Nam", "nông nghiệp xanh"],
  alternates: { canonical: "https://nhahoachdinh.com/ve-toi" },
  openGraph: {
    title: "Về Tôi — Phạm Thanh Tùng | Nhà Hoạch Định Farmstay",
    description: "Hành trình 9 năm từ nông thôn đến nhà hoạch định 50+ dự án farmstay trên toàn Việt Nam.",
    url: "https://nhahoachdinh.com/ve-toi",
    images: [{ url: "https://nhahoachdinh.com/og-home.jpg", width: 1200, height: 630, alt: "Phạm Thanh Tùng" }],
  },
};

export default function VeToiPage() {
  return <VeToiClient />;
}
