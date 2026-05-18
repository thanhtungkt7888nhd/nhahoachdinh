/**
 * Content Adapters — Chuyển đổi từ nhiều nguồn sang Article chuẩn.
 *
 * Dùng adapter phù hợp với nguồn bài của từng web:
 *   fromMarkdownFile()  ← bài .md trong thư mục content/
 *   fromNotionPage()    ← bài từ Notion database (cần @notionhq/client)
 *   fromApiResponse()   ← bài từ REST API / headless CMS
 *   fromRawFrontmatter() ← bài từ gray-matter parse
 */

import type { Article } from "./types";

// ──────────────────────────────────────────────
// Adapter 1: Markdown file (gray-matter + reading-time)
// ──────────────────────────────────────────────

/**
 * Chuyển kết quả gray-matter parse thành Article chuẩn.
 * Dùng khi đọc file .md từ content/ directory.
 */
export function fromMarkdownFrontmatter(
  slug:    string,
  data:    Record<string, unknown>,
  content: string,
  coverFallback: string,
): Article {
  const readingTime = estimateReadingTime(content);
  return {
    slug,
    title:       String(data.title       ?? slug),
    date:        String(data.date        ?? new Date().toISOString().slice(0, 10)),
    content,
    cover:       String(data.cover       ?? coverFallback),
    excerpt:     data.excerpt ? String(data.excerpt) : undefined,
    author:      data.tac_gia ? String(data.tac_gia) : (data.author ? String(data.author) : undefined),
    category:    data.cua     ? String(data.cua)     : (data.category ? String(data.category) : undefined),
    tags:        Array.isArray(data.tags) ? data.tags.map(String) : [],
    region:      data.vung    ? String(data.vung)    : (data.region ? String(data.region) : undefined),
    readingTime: `${readingTime} phút`,
  };
}

// ──────────────────────────────────────────────
// Adapter 2: Notion page (cần cài @notionhq/client)
// ──────────────────────────────────────────────

/**
 * Chuyển Notion page properties thành Article.
 * pageProps: kết quả từ notion.pages.retrieve()
 * mdContent:  nội dung đã convert sang markdown (dùng notion-to-md)
 */
export function fromNotionPage(
  pageProps: Record<string, unknown>,
  mdContent: string,
  coverFallback: string,
): Article {
  const props = pageProps as Record<string, { title?: Array<{plain_text: string}>; rich_text?: Array<{plain_text: string}>; date?: {start: string}; url?: string; multi_select?: Array<{name: string}>; select?: {name: string} }>;

  const getText = (key: string) =>
    props[key]?.title?.[0]?.plain_text ??
    props[key]?.rich_text?.[0]?.plain_text ?? "";

  return {
    slug:       slugify(getText("Tiêu đề") || getText("Title") || getText("Name")),
    title:      getText("Tiêu đề") || getText("Title") || getText("Name"),
    date:       props["Ngày"]?.date?.start ?? props["Date"]?.date?.start ?? new Date().toISOString().slice(0,10),
    content:    mdContent,
    cover:      props["Ảnh"]?.url ?? coverFallback,
    excerpt:    getText("Tóm tắt") || getText("Excerpt") || undefined,
    author:     getText("Tác giả") || getText("Author") || undefined,
    category:   props["Danh mục"]?.select?.name ?? props["Category"]?.select?.name ?? undefined,
    tags:       props["Tags"]?.multi_select?.map((t) => t.name) ?? [],
    readingTime: `${estimateReadingTime(mdContent)} phút`,
  };
}

// ──────────────────────────────────────────────
// Adapter 3: REST API / Headless CMS
// ──────────────────────────────────────────────

/**
 * Map từ REST API response.
 * fieldMap: ánh xạ field của API sang Article fields.
 */
export function fromApiResponse(
  data: Record<string, unknown>,
  fieldMap: Partial<Record<keyof Article, string>> = {},
  coverFallback = "",
): Article {
  const get = (key: string) => data[key];
  const map = (field: keyof Article, defaultKey: string) =>
    fieldMap[field] ? get(fieldMap[field]!) : get(defaultKey);

  const content = String(map("content", "content") ?? "");
  return {
    slug:        String(map("slug",    "slug")    ?? ""),
    title:       String(map("title",   "title")   ?? ""),
    date:        String(map("date",    "date")     ?? new Date().toISOString().slice(0,10)),
    content,
    cover:       String(map("cover",   "cover")   ?? coverFallback),
    excerpt:     map("excerpt",  "excerpt")  ? String(map("excerpt",  "excerpt"))  : undefined,
    author:      map("author",   "author")   ? String(map("author",   "author"))   : undefined,
    category:    map("category", "category") ? String(map("category", "category")) : undefined,
    tags:        Array.isArray(map("tags", "tags")) ? (map("tags", "tags") as string[]) : [],
    readingTime: `${estimateReadingTime(content)} phút`,
  };
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).filter(w => /\w/.test(w)).length;
  return Math.max(1, Math.round(words / 200));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
