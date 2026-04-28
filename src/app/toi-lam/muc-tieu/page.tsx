import type { Metadata } from "next";
import ToiLamClient from "@/app/toi-lam/ToiLamClient";

export const metadata: Metadata = {
  title: "Mục Tiêu Của Tôi — Tầm Nhìn & Sứ Mệnh",
  description: "Tầm nhìn, sứ mệnh và các tầng tác động của Phạm Thanh Tùng — từ nền tảng chuyên môn, cộng đồng thực hành đến nhận thức quốc gia về du lịch nông nghiệp bền vững.",
  alternates: { canonical: "https://nhahoachdinh.vn/toi-lam/muc-tieu" },
  openGraph: {
    title: "Mục Tiêu Của Tôi — Phạm Thanh Tùng",
    description: "Tầng tác, tầm nhìn và con đường mình đang đi để Việt Nam trở thành quốc gia Du lịch Nông nghiệp.",
    url: "https://nhahoachdinh.vn/toi-lam/muc-tieu",
  },
};

export default function MucTieuPage() {
  return <ToiLamClient />;
}
