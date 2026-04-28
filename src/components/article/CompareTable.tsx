"use client";

/**
 * CompareTable — Bảng so sánh 2 cột editorial (A vs B)
 * Dùng khi muốn đặt hai phương án / mô hình / chiến lược cạnh nhau.
 */

interface CompareRow {
  label: string;
  a: string;
  b: string;
}

interface CompareTableProps {
  colA: string;
  colB: string;
  rows: CompareRow[];
  title?: string;
  tagA?: string;
  tagB?: string;
}

const TERRA = "#A0522D";
const GOLD  = "#C49A28";
const CREAM = "#EDE0C4";

export default function CompareTable({
  colA,
  colB,
  rows,
  title,
  tagA = "Phương án A",
  tagB = "Phương án B",
}: CompareTableProps) {
  return (
    <div
      className="my-8 rounded-xl overflow-hidden"
      style={{
        background: "rgba(10,18,8,0.7)",
        border: "1px solid rgba(196,154,40,0.15)",
      }}
    >
      {title && (
        <div
          className="px-6 py-3 border-b"
          style={{
            borderColor: "rgba(196,154,40,0.15)",
            background: "rgba(6,12,6,0.5)",
          }}
        >
          <p
            className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold"
            style={{ color: "rgba(196,154,40,0.65)" }}
          >
            {title}
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(196,154,40,0.12)" }}>
              <th
                className="px-5 py-3 font-sans text-[10px] uppercase tracking-[0.2em] font-semibold w-[30%]"
                style={{ color: "rgba(237,224,196,0.35)", background: "rgba(4,8,4,0.4)" }}
              >
                Tiêu chí
              </th>
              <th
                className="px-5 py-3 font-sans text-[10px] uppercase tracking-[0.2em] font-semibold"
                style={{
                  color: TERRA,
                  background: "rgba(160,82,45,0.07)",
                  borderLeft: "1px solid rgba(160,82,45,0.15)",
                }}
              >
                {colA}
                {tagA && (
                  <span
                    className="ml-2 font-normal normal-case tracking-normal"
                    style={{ color: "rgba(160,82,45,0.55)", fontSize: "9px" }}
                  >
                    · {tagA}
                  </span>
                )}
              </th>
              <th
                className="px-5 py-3 font-sans text-[10px] uppercase tracking-[0.2em] font-semibold"
                style={{
                  color: GOLD,
                  background: "rgba(196,154,40,0.07)",
                  borderLeft: "1px solid rgba(196,154,40,0.15)",
                }}
              >
                {colB}
                {tagB && (
                  <span
                    className="ml-2 font-normal normal-case tracking-normal"
                    style={{ color: "rgba(196,154,40,0.45)", fontSize: "9px" }}
                  >
                    · {tagB}
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  borderBottom: "1px solid rgba(196,154,40,0.07)",
                  background: idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                }}
              >
                <td
                  className="px-5 py-3 font-sans font-medium"
                  style={{ color: "rgba(237,224,196,0.6)", fontSize: "0.78rem" }}
                >
                  {row.label}
                </td>
                <td
                  className="px-5 py-3 font-sans"
                  style={{
                    color: "rgba(237,224,196,0.75)",
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                    borderLeft: "1px solid rgba(160,82,45,0.1)",
                  }}
                >
                  {row.a}
                </td>
                <td
                  className="px-5 py-3 font-sans"
                  style={{
                    color: CREAM,
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                    borderLeft: "1px solid rgba(196,154,40,0.1)",
                  }}
                >
                  {row.b}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
