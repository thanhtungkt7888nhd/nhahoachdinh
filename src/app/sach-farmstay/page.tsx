import type { Metadata } from "next";
import BookPageClient from "./BookPageClient";

export const metadata: Metadata = {
  title: "Sách Farmstay — Hướng Dẫn Thiết Lập Farmstay Bền Vững",
  description: "Cẩm nang thực chiến từ 9 năm kinh nghiệm. Đặt mua sách trực tiếp với giao hàng toàn quốc.",
  openGraph: {
    title: "Sách Farmstay — Phạm Thanh Tùng",
    description: "Cẩm nang thiết lập farmstay thực chiến",
    url: "https://nhahoachdinh.com/sach-farmstay",
  },
};

export default function SachFarmstayPage() {
  return <BookPageClient />;
}
