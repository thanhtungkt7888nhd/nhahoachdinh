import type { MetadataRoute } from "next";
import { articles } from "@/lib/data";

const BASE = "https://nhahoachdinh.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/ve-toi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/toi-lam`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/chia-se-kien-thuc`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/lien-he`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/sach-farmstay`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => {
    const d = new Date(article.date);
    return {
      url: `${BASE}/chia-se-kien-thuc/${article.slug}`,
      lastModified: isNaN(d.getTime()) ? new Date("2025-01-01") : d,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...articlePages];
}
