import type { Metadata } from "next";
import ToiLamHub from "./ToiLamHub";

export const metadata: Metadata = {
  title: "Tôi Làm — Hoạch Định Farmstay",
  description: "Những gì Phạm Thanh Tùng đang làm: Mục tiêu, Xuyên Việt Farmstay, Farmstay Update, Tư Vấn & Cố Vấn.",
  alternates: { canonical: "https://nhahoachdinh.vn/toi-lam" },
  openGraph: {
    title: "Tôi Làm — Hoạch Định Farmstay",
    description: "Những gì Phạm Thanh Tùng đang làm: Mục tiêu, Xuyên Việt Farmstay, Farmstay Update, Tư Vấn & Cố Vấn.",
    url: "https://nhahoachdinh.vn/toi-lam",
    images: [{ url: "https://nhahoachdinh.vn/og-home.jpg", width: 1200, height: 630, alt: "Tôi Làm — Phạm Thanh Tùng" }],
  },
};

export default function ToiLamPage() {
  return <ToiLamHub />;
}
