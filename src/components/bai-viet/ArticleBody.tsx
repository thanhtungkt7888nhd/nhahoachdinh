/**
 * ArticleBody — Render markdown HTML thành prose đẹp kiểu premium publication.
 * Post-process HTML để detect tiêu đề ALL CAPS (MỞ BÀI, BỐI CẢNH...) → section header.
 */

interface ArticleBodyProps {
  html: string;
}

/**
 * Chuyển các đoạn ALL CAPS (tiêu đề phần do AI viết) thành section header đẹp.
 * VD: <p>MỞ BÀI</p> → <div class="section-title">MỞ BÀI</div>
 */
function processHtml(html: string): string {
  // Regex: <p> chứa toàn chữ HOA + khoảng trắng + dấu &amp; và ký tự đặc biệt, dài 3–60 ký tự
  return html.replace(
    /<p>([A-ZĐÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ\s&;]{3,60})<\/p>/g,
    (_, text) => `<div class="section-title">${text}</div>`
  );
}

export default function ArticleBody({ html }: ArticleBodyProps) {
  const processed = processHtml(html);

  return (
    <>
      <style>{`
        /* ── Layout prose ── */
        .article-prose {
          color: rgba(237,224,196,0.82);
          line-height: 1.9;
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
          font-family: var(--font-sans, sans-serif);
        }

        /* ── Section title (MỞ BÀI, BỐI CẢNH...) ── */
        .article-prose .section-title {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.45em;
          color: #C49A28;
          text-transform: uppercase;
          margin: 3.5em 0 1.4em;
          padding-bottom: 0.75em;
          position: relative;
          border-bottom: 1px solid rgba(196,154,40,0.15);
        }
        .article-prose .section-title::before {
          content: '';
          position: absolute;
          bottom: -1px; left: 0;
          width: 36px; height: 2px;
          background: #C49A28;
          border-radius: 2px;
        }
        .article-prose .section-title:first-child {
          margin-top: 0;
        }

        /* ── Paragraphs ── */
        .article-prose p {
          margin-bottom: 1.5em;
        }

        /* ── Drop cap đoạn đầu sau section-title ── */
        .article-prose .section-title + p::first-letter {
          float: left;
          font-size: 3.6em;
          line-height: 0.82;
          font-family: var(--font-serif, Georgia, serif);
          color: #C49A28;
          margin-right: 0.1em;
          margin-top: 0.06em;
          font-weight: 400;
        }

        /* ── Headings từ markdown ── */
        .article-prose h2 {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          font-weight: 500;
          color: #C49A28;
          margin: 2.8em 0 0.9em;
          padding-bottom: 0.4em;
          border-bottom: 1px solid rgba(196,154,40,0.18);
          letter-spacing: 0.01em;
        }
        .article-prose h3 {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          font-weight: 500;
          color: #A0522D;
          margin: 2em 0 0.6em;
        }
        .article-prose h4 {
          font-size: 0.82rem;
          font-weight: 700;
          color: rgba(237,224,196,0.9);
          margin: 1.5em 0 0.4em;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* ── Inline ── */
        .article-prose strong {
          color: #EDE0C4;
          font-weight: 600;
        }
        .article-prose em {
          color: rgba(237,224,196,0.88);
          font-style: italic;
        }
        .article-prose a {
          color: #C49A28;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-thickness: 1px;
        }
        .article-prose a:hover { color: #E8C84A; }

        /* ── Blockquote ── */
        .article-prose blockquote {
          border-left: 3px solid #A0522D;
          margin: 2em 0;
          padding: 1em 1.5em;
          background: rgba(160,82,45,0.07);
          border-radius: 0 6px 6px 0;
          color: rgba(237,224,196,0.72);
          font-style: italic;
          font-size: 1.05em;
          line-height: 1.7;
        }
        .article-prose blockquote p { margin-bottom: 0; }

        /* ── Lists ── */
        .article-prose ul, .article-prose ol {
          margin: 1em 0 1.5em;
          padding-left: 1.4em;
        }
        .article-prose li { margin-bottom: 0.55em; }
        .article-prose ul li::marker { color: #A0522D; }
        .article-prose ol li::marker { color: #C49A28; font-weight: 700; }

        /* ── Code ── */
        .article-prose code {
          background: rgba(255,255,255,0.07);
          padding: 0.15em 0.45em;
          border-radius: 3px;
          font-size: 0.85em;
          color: rgba(237,224,196,0.9);
        }
        .article-prose pre {
          background: rgba(0,0,0,0.35);
          padding: 1.25em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.8em 0;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .article-prose pre code { background: none; padding: 0; }

        /* ── HR ── */
        .article-prose hr {
          border: none;
          border-top: 1px solid rgba(196,154,40,0.12);
          margin: 3em 0;
        }

        /* ── Tables ── */
        .article-prose table {
          width: 100%; border-collapse: collapse;
          margin: 1.5em 0; font-size: 0.9em;
        }
        .article-prose th {
          background: rgba(196,154,40,0.1);
          color: #C49A28;
          font-weight: 600;
          padding: 0.6em 1em;
          border-bottom: 1px solid rgba(196,154,40,0.2);
          text-align: left;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .article-prose td {
          padding: 0.55em 1em;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: rgba(237,224,196,0.75);
        }
        .article-prose tr:last-child td { border-bottom: none; }
      `}</style>

      <div
        className="article-prose"
        dangerouslySetInnerHTML={{ __html: processed }}
      />
    </>
  );
}
