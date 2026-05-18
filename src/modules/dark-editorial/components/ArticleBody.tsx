/**
 * ArticleBody — Render HTML từ markdown với typography premium.
 * Kỹ thuật đặc biệt:
 *   1. Phát hiện ALL CAPS paragraph → section title đẹp
 *   2. Drop cap chữ đầu sau section title
 *   3. Toàn bộ màu dùng CSS variables → không cần đổi khi đổi theme
 */

interface Props { html: string }

/**
 * Post-process HTML: <p>ALL CAPS</p> → <div class="de-section-title">
 */
function processHtml(raw: string): string {
  const CAPS_CHARS =
    "A-ZĐÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ";
  const re = new RegExp(`<p>([${CAPS_CHARS}\\s&;]{3,60})<\\/p>`, "g");
  return raw.replace(re, (_, text) => `<div class="de-section-title">${text}</div>`);
}

export default function ArticleBody({ html }: Props) {
  const processed = processHtml(html);

  return (
    <>
      <style>{`
        /* ── Prose container ── */
        .de-prose {
          color: color-mix(in srgb, var(--de-fg) 82%, transparent);
          line-height: 1.9;
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
          font-family: var(--de-font-sans);
        }

        /* ── Section title (ALL CAPS từ AI) ── */
        .de-prose .de-section-title {
          font-family: var(--de-font-sans);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.45em;
          color: var(--de-accent);
          text-transform: uppercase;
          margin: 3.5em 0 1.4em;
          padding-bottom: 0.75em;
          position: relative;
          border-bottom: 1px solid var(--de-border);
        }
        .de-prose .de-section-title::before {
          content: '';
          position: absolute;
          bottom: -1px; left: 0;
          width: 36px; height: 2px;
          background: var(--de-accent);
          border-radius: 2px;
        }
        .de-prose .de-section-title:first-child { margin-top: 0; }

        /* ── Paragraphs ── */
        .de-prose p { margin-bottom: 1.5em; }

        /* ── Drop cap — đoạn đầu sau section title ── */
        .de-prose .de-section-title + p::first-letter {
          float: left;
          font-size: 3.6em;
          line-height: 0.82;
          font-family: var(--de-font-serif);
          color: var(--de-accent);
          margin-right: 0.1em;
          margin-top: 0.06em;
          font-weight: 400;
        }

        /* ── Headings từ markdown ── */
        .de-prose h2 {
          font-family: var(--de-font-serif);
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          font-weight: 500;
          color: var(--de-accent);
          margin: 2.8em 0 0.9em;
          padding-bottom: 0.4em;
          border-bottom: 1px solid var(--de-border);
        }
        .de-prose h3 {
          font-family: var(--de-font-serif);
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          font-weight: 500;
          color: var(--de-warm);
          margin: 2em 0 0.6em;
        }
        .de-prose h4 {
          font-size: 0.82rem; font-weight: 700;
          color: var(--de-fg);
          margin: 1.5em 0 0.4em;
          text-transform: uppercase; letter-spacing: 0.1em;
        }

        /* ── Inline ── */
        .de-prose strong { color: var(--de-fg); font-weight: 600; }
        .de-prose em     { color: color-mix(in srgb, var(--de-fg) 88%, transparent); font-style: italic; }
        .de-prose a      { color: var(--de-accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
        .de-prose a:hover { color: var(--de-accent-2); }

        /* ── Blockquote ── */
        .de-prose blockquote {
          border-left: 3px solid var(--de-warm);
          margin: 2em 0; padding: 1em 1.5em;
          background: color-mix(in srgb, var(--de-warm) 7%, transparent);
          border-radius: 0 6px 6px 0;
          color: color-mix(in srgb, var(--de-fg) 72%, transparent);
          font-style: italic; font-size: 1.05em; line-height: 1.7;
        }
        .de-prose blockquote p { margin-bottom: 0; }

        /* ── Lists ── */
        .de-prose ul, .de-prose ol { margin: 1em 0 1.5em; padding-left: 1.4em; }
        .de-prose li               { margin-bottom: 0.55em; }
        .de-prose ul li::marker    { color: var(--de-warm); }
        .de-prose ol li::marker    { color: var(--de-accent); font-weight: 700; }

        /* ── Code ── */
        .de-prose code { background: rgba(255,255,255,0.07); padding: 0.15em 0.45em; border-radius: 3px; font-size: 0.85em; }
        .de-prose pre  { background: rgba(0,0,0,0.35); padding: 1.25em; border-radius: 8px; overflow-x: auto; margin: 1.8em 0; border: 1px solid rgba(255,255,255,0.06); }
        .de-prose pre code { background: none; padding: 0; }

        /* ── HR ── */
        .de-prose hr { border: none; border-top: 1px solid var(--de-border); margin: 3em 0; }

        /* ── Tables ── */
        .de-prose table { width: 100%; border-collapse: collapse; margin: 1.5em 0; font-size: 0.9em; }
        .de-prose th    { background: color-mix(in srgb, var(--de-accent) 10%, transparent); color: var(--de-accent); font-weight: 600; padding: 0.6em 1em; border-bottom: 1px solid var(--de-border); text-align: left; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; }
        .de-prose td    { padding: 0.55em 1em; border-bottom: 1px solid rgba(255,255,255,0.05); color: color-mix(in srgb, var(--de-fg) 75%, transparent); }
        .de-prose tr:last-child td { border-bottom: none; }
      `}</style>

      <div className="de-prose" dangerouslySetInnerHTML={{ __html: processed }} />
    </>
  );
}
