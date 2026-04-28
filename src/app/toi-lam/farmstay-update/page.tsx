import type { Metadata } from "next";
import FarmstayUpdateClient from "@/app/farmstay-update/FarmstayUpdateClient";

export const metadata: Metadata = {
  title: "Farmstay Update — Hội Thảo Tri Thức",
  description: "Hội thảo thường niên cập nhật tri thức farmstay mới nhất — nơi chuyên gia gặp nhà đầu tư.",
  alternates: { canonical: "https://nhahoachdinh.vn/toi-lam/farmstay-update" },
};

export default function FarmstayUpdatePage() {
  return <FarmstayUpdateClient />;
}
