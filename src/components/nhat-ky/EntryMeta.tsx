/**
 * EntryMeta — Dòng metadata (ngày · thể loại · địa điểm) cho mỗi bài nhật ký.
 */

import TypeIcon from "./TypeIcon";
import type { EntryType } from "@/lib/nhat-ky";

interface EntryMetaProps {
  date: string;
  type: EntryType;
  location?: string;
  readingTime?: string;
}

/** Format ngày thành "22 · 04 · 2026" */
function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd} · ${mm} · ${yyyy}`;
}

const CREAM_DIM = "rgba(237,224,196,0.4)";
const TERRA_DIM = "rgba(160,82,45,0.5)";

export default function EntryMeta({ date, type, location, readingTime }: EntryMetaProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans uppercase"
      style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: CREAM_DIM }}
    >
      <time dateTime={date}>{formatDate(date)}</time>
      <span style={{ color: TERRA_DIM }}>·</span>
      <TypeIcon type={type} size="sm" />
      {location && (
        <>
          <span style={{ color: TERRA_DIM }}>·</span>
          <span style={{ color: "rgba(160,82,45,0.75)" }}>{location}</span>
        </>
      )}
      {readingTime && (
        <>
          <span style={{ color: TERRA_DIM }}>·</span>
          <span>{readingTime} đọc</span>
        </>
      )}
    </div>
  );
}
