/**
 * ArticleBody — Render markdown content thành prose đẹp.
 * Nhận HTML string đã xử lý qua remark pipeline (server side).
 */

interface ArticleBodyProps {
  html: string;
}

const CREAM = "#EDE0C4";
const GOLD  = "#C49A28";
const TERRA = "#A0522D";

export default function ArticleBody({ html }: ArticleBodyProps) {
  return (
    <>
      <style>{`
        .article-prose {
          color: rgba(237,224,196,0.8);
          line-height: 1.85;
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
        }
        .article-prose p {
          margin-bottom: 1.4em;
        }
        .article-prose h2 {
          font-family: var(--font-serif, serif);
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          font-weight: 500;
          color: ${GOLD};
          margin: 2.5em 0 0.8em;
          padding-bottom: 0.4em;
          border-bottom: 1px solid rgba(196,154,40,0.2);
          letter-spacing: 0.02em;
        }
        .article-prose h3 {
          font-family: var(--font-serif, serif);
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-weight: 500;
          color: ${TERRA};
          margin: 2em 0 0.6em;
        }
        .article-prose h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(237,224,196,0.9);
          margin: 1.5em 0 0.4em;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .article-prose strong {
          color: ${CREAM};
          font-weight: 600;
        }
        .article-prose em {
          color: rgba(237,224,196,0.9);
          font-style: italic;
        }
        .article-prose a {
          color: ${GOLD};
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .article-prose blockquote {
          border-left: 3px solid ${TERRA};
          margin: 1.8em 0;
          padding: 0.8em 1.2em;
          background: rgba(160,82,45,0.06);
          border-radius: 0 4px 4px 0;
          color: rgba(237,224,196,0.75);
          font-style: italic;
        }
        .article-prose blockquote p {
          margin-bottom: 0;
        }
        .article-prose ul, .article-prose ol {
          margin: 1em 0 1.4em;
          padding-left: 1.5em;
        }
        .article-prose li {
          margin-bottom: 0.5em;
        }
        .article-prose ul li::marker {
          color: ${TERRA};
        }
        .article-prose ol li::marker {
          color: ${GOLD};
          font-weight: 600;
        }
        .article-prose code {
          background: rgba(255,255,255,0.06);
          padding: 0.15em 0.4em;
          border-radius: 3px;
          font-size: 0.85em;
          color: rgba(237,224,196,0.9);
        }
        .article-prose pre {
          background: rgba(0,0,0,0.3);
          padding: 1.2em;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1.5em 0;
        }
        .article-prose pre code {
          background: none;
          padding: 0;
        }
        .article-prose hr {
          border: none;
          border-top: 1px solid rgba(196,154,40,0.15);
          margin: 2.5em 0;
        }
        /* Tiêu đề viết IN HOA (không có markdown) */
        .article-prose p:has(+ p):first-line {}
        /* Đoạn văn bản viết tắt kiểu pipeline (MỞ BÀI, BỐI CẢNH...) */
        .article-prose p > strong:only-child,
        .article-prose p:first-child {
          /* Không overwrite */
        }
      `}</style>
      <div
        className="article-prose font-sans"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
