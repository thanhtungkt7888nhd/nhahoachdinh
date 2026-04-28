/**
 * StatsHeader — 4 con số thống kê: tỉnh, dự án, ha, năm.
 * Server component — không animation (đứng im có phẩm giá).
 */

const CREAM   = "#EDE0C4";
const TERRA   = "#A0522D";

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "16+",     label: "tỉnh thành" },
  { value: "100+",    label: "dự án" },
  { value: "3.000+",  label: "ha đất" },
  { value: "9+",      label: "năm kinh nghiệm" },
];

export default function StatsHeader() {
  return (
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 lg:gap-x-12">
      {STATS.map((stat, idx) => (
        <div key={idx} className="text-center">
          <p
            className="font-serif font-normal"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              color: CREAM,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {stat.value}
          </p>
          <p
            className="font-sans uppercase mt-1"
            style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(237,224,196,0.4)" }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
