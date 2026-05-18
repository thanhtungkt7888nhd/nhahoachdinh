/**
 * Kiểu dữ liệu chuẩn cho Dark Editorial Module.
 * Mọi nguồn bài (Markdown, Notion, API...) phải convert sang Article.
 */

export interface Article {
  // Bắt buộc
  slug:        string;
  title:       string;
  date:        string;   // "YYYY-MM-DD"
  content:     string;   // Markdown text
  cover:       string;   // URL ảnh

  // Tuỳ chọn
  excerpt?:     string;
  author?:      string;
  category?:    string;   // badge trên hero + card
  tags?:        string[];
  region?:      string;   // địa danh / vùng
  readingTime?: string;   // "8 phút"
  relatedSlugs?: string[];
}

export interface ArticleListItem extends Omit<Article, "content"> {}
