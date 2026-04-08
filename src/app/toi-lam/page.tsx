import type { Metadata } from "next";
import ToiLamClient from "./ToiLamClient";

export const metadata: Metadata = {
  title: "Tôi Làm — Dịch Vụ Hoạch Định Farmstay | Phạm Thanh Tùng",
  description: "Dịch vụ tư vấn, thiết kế và vận hành farmstay toàn diện. Từ hoạch định chiến lược, thiết kế sinh thái đến đào tạo đội ngũ và xây dựng thương hiệu bền vững.",
  keywords: ["dịch vụ farmstay", "tư vấn thiết kế farmstay", "hoạch định farmstay", "đào tạo farmstay", "Phạm Thanh Tùng dịch vụ"],
  alternates: { canonical: "https://nhahoachdinh.com/toi-lam" },
  openGraph: {
    title: "Dịch Vụ Hoạch Định Farmstay — Phạm Thanh Tùng",
    description: "Tư vấn, thiết kế và vận hành farmstay toàn diện — từ chiến lược đến dòng tiền.",
    url: "https://nhahoachdinh.com/toi-lam",
    images: [{ url: "https://nhahoachdinh.com/og-home.jpg", width: 1200, height: 630, alt: "Dịch vụ Farmstay Phạm Thanh Tùng" }],
  },
};

export default function ToiLamPage() {
  return <ToiLamClient />;
}
