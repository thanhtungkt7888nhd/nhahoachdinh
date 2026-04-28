import type { Metadata } from "next";
import TuVanClient from "./TuVanClient";

export const metadata: Metadata = {
  title: "Tư Vấn / Cố Vấn — Gói Đồng Hành Farmstay",
  description:
    "5 gói đồng hành thực chiến: từ 1 giờ mentor giải cứu, khảo sát thực địa, cố vấn chiến lược dài hạn đến tư vấn vĩ mô cấp địa phương. Phạm Thanh Tùng — Nhà Hoạch Định Farmstay.",
  keywords: [
    "tư vấn farmstay", "cố vấn chiến lược", "Phạm Thanh Tùng", "mentor farmstay",
    "đầu tư farmstay", "hoạch định du lịch nông nghiệp",
  ],
  alternates: { canonical: "https://nhahoachdinh.vn/toi-lam/tu-van" },
  openGraph: {
    title: "Tư Vấn / Cố Vấn — Phạm Thanh Tùng · Nhà Hoạch Định",
    description: "5 gói đồng hành từ 1-on-1 mentor đến cố vấn chiến lược 12 tháng cho chủ farmstay.",
    url: "https://nhahoachdinh.vn/toi-lam/tu-van",
    images: [{ url: "https://nhahoachdinh.vn/og-home.jpg", width: 1200, height: 630, alt: "Tư Vấn Farmstay — Phạm Thanh Tùng" }],
  },
};

export default function TuVanPage() {
  return <TuVanClient />;
}
