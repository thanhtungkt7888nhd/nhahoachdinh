"use client";
/**
 * EntryCard — Card hiển thị một bài nhật ký trong feed.
 * Layout: meta → tiêu đề → excerpt → link "Đọc tiếp →"
 */

import Link from "next/link";
import EntryMeta from "./EntryMeta";
import type { NhatKyEntry } from "@/lib/nhat-ky";

interface EntryCardProps {
  entry: NhatKyEntry;
}

const CREAM  = "#EDE0C4";
const TERRA  = "#A0522D";

export default function EntryCard({ entry }: EntryCardProps) {
  const href = `/toi-lam/nhat-ky/${entry.slug}`;

  return (
    <article>
      <EntryMeta
        date={entry.date}
        type={entry.type}
        location={entry.location}
        readingTime={entry.readingTime}
      />

      <h2 className="mt-3 mb-2 font-serif font-normal leading-snug" style={{
        fontSize: "clamp(1.35rem, 2.2vw, 1.65rem)",
        color: CREAM,
        letterSpacing: "-0.01em",
      }}>
        <Link
          href={href}
          className="transition-colors duration-200"
          style={{ color: "inherit" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#D4B050")}
          onMouseLeave={(e) => (e.currentTarget.style.color = CREAM)}
        >
          {entry.title}
        </Link>
      </h2>

      <p
        className="font-sans line-clamp-2 mb-4"
        style={{
          fontSize: "0.97rem",
          lineHeight: 1.75,
          color: "rgba(237,224,196,0.55)",
        }}
      >
        {entry.excerpt}
      </p>

      <Link
        href={href}
        className="font-sans font-medium inline-flex items-center gap-1.5 transition-all duration-200"
        style={{
          fontSize: "0.78rem",
          letterSpacing: "0.05em",
          color: TERRA,
          textDecorationLine: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#C4723D";
          e.currentTarget.style.textDecorationLine = "underline";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = TERRA;
          e.currentTarget.style.textDecorationLine = "none";
        }}
      >
        Đọc tiếp
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
