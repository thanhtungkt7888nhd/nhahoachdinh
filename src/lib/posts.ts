/**
 * lib/posts.ts
 * Đọc và parse các file .md trong /content/posts/{cua}/ để hiển thị bài viết.
 * Pattern clone từ lib/nhat-ky.ts — reuse gray-matter + reading-time.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// Màu sắc theo cửa — khớp với design system
export const CUA_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  nghi:  { label: "NGHĨ",   color: "#534AB7", bg: "rgba(83,74,183,0.15)" },
  lam:   { label: "LÀM",    color: "#0F6E56", bg: "rgba(15,110,86,0.15)" },
  di:    { label: "ĐI",     color: "#993C1D", bg: "rgba(153,60,29,0.15)" },
  noi:   { label: "NỐI",    color: "#185FA5", bg: "rgba(24,95,165,0.15)" },
};

export type Cua = "nghi" | "lam" | "di" | "noi";

export interface Post {
  slug:        string;
  title:       string;
  date:        string;
  excerpt:     string;
  cua:         Cua;
  muc_con:     string;
  vung:        string;
  tags:        string[];
  tac_gia:     string;
  tac_gia_slug:string;
  template:    string;
  cover:       string;
  readingTime: string;
  content:     string;
}

/** Đọc tất cả bài viết từ content/posts/, sắp theo ngày mới nhất. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const cuaDirs = ["nghi", "lam", "di", "noi"];
  const all: Post[] = [];

  for (const cua of cuaDirs) {
    const dir = path.join(POSTS_DIR, cua);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const post = parsePost(path.join(dir, file), cua as Cua);
      if (post) all.push(post);
    }
  }

  // Bài không phân cua (flat trong posts/)
  const rootFiles = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  for (const file of rootFiles) {
    const post = parsePost(path.join(POSTS_DIR, file), null);
    if (post) all.push(post);
  }

  return all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Đọc một bài theo slug — tìm trong tất cả cua subfolders. */
export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(POSTS_DIR)) return null;

  const cuaDirs = ["nghi", "lam", "di", "noi", ""];
  for (const cua of cuaDirs) {
    const dir = cua ? path.join(POSTS_DIR, cua) : POSTS_DIR;
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    const match = files.find((f) => f.replace(/\.md$/, "") === slug);
    if (match) {
      return parsePost(path.join(dir, match), cua as Cua | null);
    }
  }
  return null;
}

/** Lọc bài theo cua. */
export function getPostsByCua(cua: Cua): Post[] {
  return getAllPosts().filter((p) => p.cua === cua);
}

/** Lấy tất cả slugs để generateStaticParams. */
export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/** Lấy bài liên quan (cùng cua, loại trừ bài hiện tại). */
export function getRelatedPosts(current: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== current.slug && p.cua === current.cua)
    .slice(0, limit);
}

/** Lấy tất cả tags duy nhất. */
export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((p) => p.tags);
  return [...new Set(tags)].sort();
}

/** Parse một file .md thành Post. */
function parsePost(filepath: string, cuaOverride: Cua | null): Post | null {
  try {
    const raw = fs.readFileSync(filepath, "utf-8");
    const { data, content } = matter(raw);
    const filename = path.basename(filepath);
    const slug = filename.replace(/\.md$/, "");
    const rt = readingTime(content);

    const cua = (data.cua ?? cuaOverride ?? "nghi") as Cua;

    // Cover: dùng từ frontmatter, hoặc tạo từ tags/cua
    return {
      slug,
      title:        _cleanTitle(data.title ?? "Không có tiêu đề"),
      date:         data.date ?? new Date().toISOString().split("T")[0],
      excerpt:      data.excerpt ?? "",
      cua,
      muc_con:      data.muc_con ?? "",
      vung:         data.vung ?? "",
      tags:         Array.isArray(data.tags) ? data.tags : [],
      tac_gia:      data.tac_gia ?? "Nhà Hoạch Định",
      tac_gia_slug: data.tac_gia_slug ?? "nha-hoach-dinh",
      template:     data.template ?? "c",
      cover: data.cover || _defaultCover(data.tags ?? [], cua, slug),
      readingTime:  `${Math.ceil(rt.minutes)} phút`,
      content,
    };
  } catch {
    return null;
  }
}

/** Ảnh cover đẹp theo cua — dùng ảnh thật từ Unsplash ID cố định, đẹp cho farmstay VN. */
const CUA_COVER_POOL: Record<Cua, string[]> = {
  nghi: [
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=630&fit=crop&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop&q=80",
  ],
  lam: [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=630&fit=crop&q=80",
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=630&fit=crop&q=80",
  ],
  di: [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&h=630&fit=crop&q=80",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=630&fit=crop&q=80",
  ],
  noi: [
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=630&fit=crop&q=80",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=630&fit=crop&q=80",
  ],
};

/** Tạo cover URL — pick từ pool theo cua + seed từ slug để nhất quán. */
function _defaultCover(tags: string[], cua: Cua, slug = ""): string {
  const pool = CUA_COVER_POOL[cua] ?? CUA_COVER_POOL.di;
  // Seed từ slug để cùng bài luôn ra cùng ảnh
  let seed = 0;
  for (let i = 0; i < slug.length; i++) seed += slug.charCodeAt(i);
  return pool[seed % pool.length];
}

/** Xóa ký tự # đầu tiêu đề nếu AI để sót. */
function _cleanTitle(title: string): string {
  return title.replace(/^#+\s*/, "").trim();
}
