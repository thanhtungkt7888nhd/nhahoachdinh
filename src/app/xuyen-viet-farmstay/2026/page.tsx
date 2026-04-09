import type { Metadata } from "next";
import XVF2026Client from "./XVF2026Client";

export const metadata: Metadata = {
  title: "Đăng Ký Xuyên Việt Farmstay 2026 | Phạm Thanh Tùng",
  description:
    "Xuyên Việt Farmstay 2026 — lần thứ 4. Hành trình du lịch nông nghiệp, kết nối giao thương và truyền cảm hứng toàn quốc. Đăng ký quan tâm để nhận thông tin ưu tiên.",
  alternates: {
    canonical: "https://nhahoachdinh.com/xuyen-viet-farmstay/2026",
  },
};

export default function XVF2026Page() {
  return <XVF2026Client />;
}
