import type { Metadata } from "next";
import XVFOverview from "./XVFOverview";

export const metadata: Metadata = {
  title: "Xuyên Việt Farmstay | Phạm Thanh Tùng",
  description:
    "4 mùa hành trình xuyên Việt — kết nối cộng đồng farmstay, giao thương nông nghiệp và truyền cảm hứng du lịch nông nghiệp bền vững toàn quốc.",
  alternates: {
    canonical: "https://nhahoachdinh.com/xuyen-viet-farmstay",
  },
};

export default function XVFPage() {
  return <XVFOverview />;
}
