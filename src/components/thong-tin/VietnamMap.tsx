"use client";

/**
 * VietnamMap — Bản đồ Việt Nam 34 tỉnh sáp nhập 2025
 * Layout 2 cột: map (trái) + tiêu đề & legend 2×4 (phải)
 * Toàn bộ nằm gọn trong 1 viewport
 */

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import provinceData from "../../../public/data/vietnam-provinces.json";

// Mapping 34 tỉnh 2025 → 8 vùng (theo Nghị quyết 202/2025/QH15)
const PROVINCE_TO_VUNG: Record<string, string> = {
  // Tây Bắc
  "lao-cai":     "tay-bac",
  "dien-bien":   "tay-bac",
  "lai-chau":    "tay-bac",
  "son-la":      "tay-bac",
  // Đông Bắc
  "tuyen-quang": "dong-bac",
  "thai-nguyen": "dong-bac",
  "cao-bang":    "dong-bac",
  "lang-son":    "dong-bac",
  "quang-ninh":  "dong-bac",
  // Đồng Bằng Bắc Bộ
  "ha-noi":      "dong-bang-bac-bo",
  "phu-tho":     "dong-bang-bac-bo",
  "bac-ninh":    "dong-bang-bac-bo",
  "hai-phong":   "dong-bang-bac-bo",
  "hung-yen":    "dong-bang-bac-bo",
  "ninh-binh":   "dong-bang-bac-bo",
  // Bắc Trung Bộ
  "thanh-hoa":   "bac-trung-bo",
  "nghe-an":     "bac-trung-bo",
  "ha-tinh":     "bac-trung-bo",
  "quang-tri":   "bac-trung-bo",
  "hue":         "bac-trung-bo",
  // Nam Trung Bộ
  "da-nang":     "nam-trung-bo",
  "quang-ngai":  "nam-trung-bo",
  "khanh-hoa":   "nam-trung-bo",
  // Tây Nguyên
  "gia-lai":     "tay-nguyen",
  "dak-lak":     "tay-nguyen",
  "lam-dong":    "tay-nguyen",
  // Đông Nam Bộ
  "dong-nai":    "dong-nam-bo",
  "tay-ninh":    "dong-nam-bo",
  "ho-chi-minh": "dong-nam-bo",
  // Đồng Bằng Cửu Long
  "dong-thap":   "dong-bang-cuu-long",
  "an-giang":    "dong-bang-cuu-long",
  "vinh-long":   "dong-bang-cuu-long",
  "can-tho":     "dong-bang-cuu-long",
  "ca-mau":      "dong-bang-cuu-long",
};

const VUNG_META: Record<string, { color: string; label: string; hint: string }> = {
  "tay-bac":            { color: "#2C5F24", label: "Tây Bắc",            hint: "Lào Cai · Điện Biên · Sơn La" },
  "dong-bac":           { color: "#4A8C3A", label: "Đông Bắc",           hint: "Tuyên Quang · Thái Nguyên · Quảng Ninh" },
  "dong-bang-bac-bo":   { color: "#7A9E3E", label: "Đồng Bằng Bắc Bộ",  hint: "Hà Nội · Hải Phòng · Ninh Bình" },
  "bac-trung-bo":       { color: "#8B7A2E", label: "Bắc Trung Bộ",       hint: "Thanh Hóa · Nghệ An · TP. Huế" },
  "nam-trung-bo":       { color: "#2E7A7A", label: "Nam Trung Bộ",       hint: "Đà Nẵng · Quảng Ngãi · Khánh Hòa" },
  "tay-nguyen":         { color: "#5A5E2E", label: "Tây Nguyên",         hint: "Gia Lai · Đắk Lắk · Lâm Đồng" },
  "dong-nam-bo":        { color: "#8B4A2E", label: "Đông Nam Bộ",        hint: "TP. HCM · Đồng Nai · Tây Ninh" },
  "dong-bang-cuu-long": { color: "#3A7A58", label: "Đồng Bằng Cửu Long", hint: "Cần Thơ · An Giang · Cà Mau" },
};

const HOVER_COLOR  = "#C8A84B";
const STROKE_COLOR = "rgba(255,255,255,0.65)";
const STROKE_HOVER = "rgba(200,168,75,0.95)";

// 2×4 grid order
const VUNG_GRID = [
  ["tay-bac",          "nam-trung-bo"],
  ["dong-bac",         "tay-nguyen"],
  ["dong-bang-bac-bo", "dong-nam-bo"],
  ["bac-trung-bo",     "dong-bang-cuu-long"],
];

type Province = { slug: string; name: string; paths: { id: string; d: string }[] };
const provinces = provinceData as Province[];

export default function VietnamMap() {
  const router = useRouter();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [hoveredVung, setHoveredVung] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string } | null>(null);

  const handlePathEnter = useCallback(
    (slug: string, name: string, vung: string, e: React.MouseEvent<SVGPathElement>) => {
      setHoveredSlug(slug);
      setHoveredVung(vung);
      const svg = (e.currentTarget as SVGPathElement).ownerSVGElement;
      if (!svg) return;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      const sp = pt.matrixTransform(svg.getScreenCTM()!.inverse());
      setTooltip({ x: ((sp.x + 5) / 710) * 100, y: ((sp.y + 5) / 730) * 100, name });
    },
    []
  );

  const handleLeave = useCallback(() => {
    setHoveredSlug(null);
    setHoveredVung(null);
    setTooltip(null);
  }, []);

  const navTo = useCallback((slug: string) => {
    const v = PROVINCE_TO_VUNG[slug];
    if (v) router.push(`/thong-tin/vung/${v}`);
  }, [router]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-start">

      {/* ── Bản đồ SVG ── */}
      <div className="relative shrink-0 w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[360px] xl:max-w-[420px]">
        <svg
          viewBox="-5 -5 710 730"
          className="h-auto w-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.22))" }}
        >
          {provinces.map((prov) => {
            const vung  = PROVINCE_TO_VUNG[prov.slug] ?? "tay-bac";
            const meta  = VUNG_META[vung];
            const isH   = hoveredSlug === prov.slug;
            const isVH  = hoveredVung === vung && !isH;
            const fill  = isH ? HOVER_COLOR : isVH ? meta.color + "CC" : meta.color;

            return prov.paths.map(({ id, d }) => (
              <path
                key={id} d={d} fill={fill}
                stroke={isH ? STROKE_HOVER : STROKE_COLOR}
                strokeWidth={isH ? 1.0 : 0.6}
                strokeLinejoin="round"
                className="cursor-pointer"
                style={{ transition: "fill 0.12s ease" }}
                onMouseEnter={(e) => handlePathEnter(prov.slug, prov.name, vung, e)}
                onMouseLeave={handleLeave}
                onClick={() => navTo(prov.slug)}
              />
            ));
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-20 px-3 py-1.5 rounded whitespace-nowrap"
            style={{
              left: `${tooltip.x}%`, top: `${tooltip.y}%`,
              transform: "translate(-50%,-110%)",
              background: "rgba(14,22,10,0.93)",
              border: "1px solid rgba(45,74,43,0.35)",
              backdropFilter: "blur(6px)",
            }}
          >
            <p className="font-serif font-bold" style={{ color: "#C8A84B", fontSize: "0.78rem" }}>
              {tooltip.name}
            </p>
            <p className="font-sans" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem" }}>
              Nhấn để khám phá
            </p>
          </div>
        )}
      </div>

      {/* ── Cột phải: tiêu đề + legend 2×4 ── */}
      <div className="flex-1 min-w-0">

        {/* Tiêu đề */}
        <p className="font-sans font-semibold uppercase mb-2 tracking-[0.3em]"
           style={{ fontSize: "10px", color: "rgba(45,74,43,0.6)" }}>
          Khám phá theo vùng đất
        </p>
        <h2 className="font-serif leading-tight mb-1"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", color: "#1C2A1C" }}>
          Bản đồ Nông nghiệp Du lịch
        </h2>
        <div style={{ width: 32, height: 1, background: "linear-gradient(90deg,#C8A84B,transparent)", marginBottom: 16 }} />
        <p className="font-sans mb-5 leading-relaxed"
           style={{ fontSize: "0.82rem", color: "rgba(28,42,28,0.5)", maxWidth: 340 }}>
          Nhấn vào từng vùng để khám phá các bài viết, farmstay và trải nghiệm đặc trưng.
        </p>

        {/* Legend — 2×4 grid */}
        <p className="font-sans font-semibold uppercase mb-3 tracking-[0.22em]"
           style={{ fontSize: "9px", color: "rgba(28,42,28,0.35)" }}>
          8 Vùng · 34 Tỉnh Thành
        </p>
        <div className="grid grid-cols-2 gap-x-5 gap-y-1">
          {VUNG_GRID.map((row, ri) =>
            row.map((key, ci) => {
              const meta    = VUNG_META[key];
              const isActive = hoveredVung === key;
              return (
                <button
                  key={key}
                  className="text-left flex items-start gap-2 px-2 py-1.5 rounded transition-all duration-150"
                  style={{
                    background: isActive ? "rgba(45,74,43,0.08)" : "transparent",
                    border: `1px solid ${isActive ? "rgba(45,74,43,0.22)" : "transparent"}`,
                  }}
                  onClick={() => router.push(`/thong-tin/vung/${key}`)}
                  onMouseEnter={() => setHoveredVung(key)}
                  onMouseLeave={() => setHoveredVung(null)}
                  // suppress unused warnings
                  data-row={ri} data-col={ci}
                >
                  <span className="shrink-0 mt-[3px] rounded-sm"
                        style={{ width: 10, height: 10, background: meta.color,
                                 boxShadow: isActive ? `0 0 5px ${meta.color}80` : "none",
                                 transition: "box-shadow 0.15s" }} />
                  <div className="min-w-0">
                    <p className="font-sans font-semibold leading-tight truncate"
                       style={{ fontSize: "0.78rem",
                                color: isActive ? "#1C2A1C" : "rgba(28,42,28,0.72)" }}>
                      {meta.label}
                    </p>
                    <p className="font-sans leading-tight mt-0 truncate"
                       style={{ fontSize: "0.64rem", color: "rgba(28,42,28,0.38)" }}>
                      {meta.hint}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        <p className="font-sans mt-4"
           style={{ fontSize: "0.68rem", color: "rgba(28,42,28,0.3)", fontStyle: "italic" }}>
          * Dữ liệu theo 34 tỉnh thành sáp nhập 2025
        </p>
      </div>

    </div>
  );
}
