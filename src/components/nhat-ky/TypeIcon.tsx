/**
 * TypeIcon — Icon và nhãn cho 4 thể loại nhật ký.
 * Dùng SVG stroke-only, màu đất nung hoặc xanh rêu tùy context.
 */

import type { EntryType } from "@/lib/nhat-ky";

interface TypeIconProps {
  type: EntryType;
  size?: "sm" | "md";
}

const TYPE_CONFIG: Record<EntryType, { icon: string; label: string }> = {
  "quan-sat":   { icon: "◉", label: "QUAN SÁT" },
  "cau-hoi":    { icon: "?", label: "CÂU HỎI" },
  "trich-dan":  { icon: "\u201C", label: "TRÍCH DẪN" },
  "hien-truong":{ icon: "◈", label: "HIỆN TRƯỜNG" },
};

const TERRA = "#A0522D";

export default function TypeIcon({ type, size = "sm" }: TypeIconProps) {
  const cfg = TYPE_CONFIG[type] ?? TYPE_CONFIG["quan-sat"];
  const fontSize = size === "md" ? "0.75rem" : "0.65rem";

  return (
    <span
      className="inline-flex items-center gap-1.5 font-sans font-bold uppercase"
      style={{
        color: TERRA,
        fontSize,
        letterSpacing: "0.2em",
      }}
    >
      <span style={{ fontSize: size === "md" ? "0.9rem" : "0.75rem" }}>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}
