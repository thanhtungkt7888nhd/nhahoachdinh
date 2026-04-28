/**
 * /toi-lam/nhat-ky/rss.xml — RSS feed cho nhật ký nhà hoạch định.
 * Tự sinh từ getAllEntries(), valid RSS 2.0.
 */

import RSS from "rss";
import { getAllEntries } from "@/lib/nhat-ky";

const SITE_URL = "https://nhahoachdinh.vn";

export async function GET() {
  const entries = getAllEntries();

  const feed = new RSS({
    title: "Nhật Ký Nhà Hoạch Định — Phạm Thanh Tùng",
    description:
      "Quan sát, câu hỏi, đoạn sách và ghi chú thực địa từ hành trình hoạch định farmstay Việt Nam.",
    feed_url: `${SITE_URL}/toi-lam/nhat-ky/rss.xml`,
    site_url: SITE_URL,
    language: "vi",
    ttl: 60,
    copyright: `© ${new Date().getFullYear()} Phạm Thanh Tùng`,
  });

  entries.forEach((entry) => {
    feed.item({
      title: entry.title,
      description: entry.excerpt,
      url: `${SITE_URL}/toi-lam/nhat-ky/${entry.slug}`,
      date: entry.date,
      categories: [entry.type, ...entry.tags],
      author: "Phạm Thanh Tùng",
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
