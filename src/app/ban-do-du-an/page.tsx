/**
 * /ban-do-du-an — Trang bản đồ dự án tương tác.
 * Server shell + MapClient (client interactive layer).
 */

import type { Metadata } from "next";
import { getAllProjects, getProvinceGroups, getProvincesWithProjects } from "@/lib/ban-do";
import MapClient from "./MapClient";

export const metadata: Metadata = {
  title: "Bản Đồ Dự Án — Phạm Thanh Tùng · Nhà Hoạch Định",
  description:
    "Bản đồ tương tác 16+ tỉnh thành, 100+ dự án farmstay Việt Nam do Phạm Thanh Tùng tư vấn và hoạch định từ 2015 đến nay.",
  alternates: { canonical: "https://nhahoachdinh.vn/ban-do-du-an" },
  openGraph: {
    title: "Bản Đồ Dự Án — Dấu chân hoạch định",
    description: "16+ tỉnh · 100+ dự án · 3.000+ ha · 9+ năm.",
    url: "https://nhahoachdinh.vn/ban-do-du-an",
    type: "website",
  },
};

export default function BanDoDuAnPage() {
  const allProjects           = getAllProjects();
  const provinceGroups        = getProvinceGroups();
  const provincesWithProjects = getProvincesWithProjects();

  // JSON-LD ItemList các dự án
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dự án farmstay Phạm Thanh Tùng",
    description: "16+ tỉnh, 100+ dự án farmstay được hoạch định bởi Phạm Thanh Tùng",
    numberOfItems: allProjects.length,
    itemListElement: allProjects.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: p.name,
      url: `https://nhahoachdinh.vn/du-an/${p.id}`,
      description: p.excerpt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MapClient
        allProjects={allProjects}
        provinceGroups={provinceGroups}
        provincesWithProjects={provincesWithProjects}
        initialProvince={null}
      />
    </>
  );
}
