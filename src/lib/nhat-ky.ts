/**
 * lib/nhat-ky.ts
 * Đọc và parse các file MDX trong /content/nhat-ky/ để hiển thị nhật ký.
 * Trả về metadata (frontmatter) và nội dung thô — không render MDX ở đây.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const NHAT_KY_DIR = path.join(process.cwd(), "content/nhat-ky");

export type EntryType = "quan-sat" | "cau-hoi" | "trich-dan" | "hien-truong";

export interface BookInfo {
  title: string;
  author: string;
}

export interface NhatKyEntry {
  slug: string;
  title: string;
  date: string;
  type: EntryType;
  location?: string;
  coordinates?: string;
  book?: BookInfo;
  excerpt: string;
  tags: string[];
  readingTime: string;
  content: string;
}

/** Đọc tất cả bài nhật ký, sắp theo ngày mới nhất trước. */
export function getAllEntries(): NhatKyEntry[] {
  if (!fs.existsSync(NHAT_KY_DIR)) return [];

  const files = fs
    .readdirSync(NHAT_KY_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((filename) => parseEntry(filename))
    .filter(Boolean)
    .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()) as NhatKyEntry[];
}

/** Đọc một bài theo slug. */
export function getEntryBySlug(slug: string): NhatKyEntry | null {
  const files = fs.existsSync(NHAT_KY_DIR)
    ? fs.readdirSync(NHAT_KY_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    : [];

  const filename = files.find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!filename) return null;
  return parseEntry(filename);
}

/** Lọc bài theo thể loại. */
export function getEntriesByType(type: EntryType): NhatKyEntry[] {
  return getAllEntries().filter((e) => e.type === type);
}

/** Lấy tất cả tags duy nhất từ toàn bộ bài. */
export function getAllTags(): string[] {
  const tags = getAllEntries().flatMap((e) => e.tags);
  return [...new Set(tags)].sort();
}

/** Lấy 3 bài đọc nhiều nhất trong tháng hiện tại (mock: 3 bài gần nhất). */
export function getTopEntriesThisMonth(): NhatKyEntry[] {
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const thisMonthEntries = getAllEntries().filter((e) => e.date.startsWith(thisMonth));
  return (thisMonthEntries.length >= 3 ? thisMonthEntries : getAllEntries()).slice(0, 3);
}

/** Parse một file MDX thành NhatKyEntry. */
function parseEntry(filename: string): NhatKyEntry | null {
  try {
    const filepath = path.join(NHAT_KY_DIR, filename);
    const raw = fs.readFileSync(filepath, "utf-8");
    const { data, content } = matter(raw);
    const slug = filename.replace(/\.mdx?$/, "");
    const rt = readingTime(content);

    return {
      slug,
      title: data.title ?? "Không có tiêu đề",
      date: data.date ?? new Date().toISOString().split("T")[0],
      type: (data.type as EntryType) ?? "quan-sat",
      location: data.location,
      coordinates: data.coordinates,
      book: data.book,
      excerpt: data.excerpt ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTime: `${Math.ceil(rt.minutes)} phút`,
      content,
    };
  } catch {
    return null;
  }
}
