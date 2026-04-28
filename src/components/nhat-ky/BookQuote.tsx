/**
 * BookQuote — Blockquote đặc biệt cho bài loại "trich-dan".
 * Nền #1C2A1C, viền trái 2px đất nung, serif italic 22px.
 */

interface BookQuoteProps {
  children: React.ReactNode;
  author?: string;
  bookTitle?: string;
}

const TERRA = "#A0522D";

export default function BookQuote({ children, author, bookTitle }: BookQuoteProps) {
  return (
    <blockquote
      className="my-8 rounded-r-lg"
      style={{
        background: "rgba(20,36,18,0.8)",
        borderLeft: `2px solid ${TERRA}`,
        padding: "1.4rem 1.75rem",
      }}
    >
      <div
        className="font-serif italic leading-relaxed"
        style={{
          fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
          color: "#DDD0B4",
          fontWeight: 300,
        }}
      >
        {children}
      </div>
      {(author || bookTitle) && (
        <footer
          className="mt-4 font-sans"
          style={{ fontSize: "0.78rem", color: "rgba(237,224,196,0.4)", letterSpacing: "0.05em" }}
        >
          {author && <span>— {author}</span>}
          {author && bookTitle && <span> · </span>}
          {bookTitle && <cite style={{ fontStyle: "italic" }}>{bookTitle}</cite>}
        </footer>
      )}
    </blockquote>
  );
}
