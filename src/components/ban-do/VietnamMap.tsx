"use client";

/**
 * VietnamMap — Bản đồ SVG tương tác 63 tỉnh thành Việt Nam
 * Hỗ trợ chọn tỉnh, hover, keyboard navigation và accessibility.
 */

import React, { useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VietnamMapProps {
  /** Slug tỉnh đang được chọn (hoặc null nếu chưa chọn) */
  activeProvince: string | null;
  /** Callback khi người dùng click hoặc nhấn Enter/Space trên tỉnh */
  onProvinceClick: (slug: string, name: string) => void;
  /** Danh sách slug những tỉnh có dự án */
  provincesWithProjects: string[];
}

interface ProvinceData {
  slug: string;
  name: string;
  /** SVG path data */
  d: string;
  projectCount?: number;
}

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const COLORS = {
  default: { fill: "#EDE7DC", stroke: "#D4CDB8" },
  hasProject: { fill: "#2D4A2B", stroke: "#1E3319" },
  hover: { fill: "#A0522D", stroke: "#8B4423" },
  active: { fill: "#7A3820", stroke: "#5C2A18" },
  sea: { fill: "#D6E8F0", stroke: "#B8D4E0" },
  islandStroke: "rgba(45,74,43,0.6)",
  islandFill: "rgba(200,230,200,0.15)",
  islandText: "rgba(45,74,43,0.8)",
} as const;

// ---------------------------------------------------------------------------
// Province path data (approximate polygons — geographic positions correct)
// Coordinate system: viewBox "80 20 480 900"
// Northern cluster: y ≈ 20–300
// Central cluster:  y ≈ 300–620
// Southern cluster: y ≈ 620–900
// ---------------------------------------------------------------------------

const PROVINCES: ProvinceData[] = [
  // ── BẮC BỘ ──────────────────────────────────────────────────────────────
  {
    slug: "ha-giang",
    name: "Hà Giang",
    d: "M175,22 L220,22 L235,55 L215,80 L180,75 L160,55 Z",
  },
  {
    slug: "cao-bang",
    name: "Cao Bằng",
    d: "M235,22 L290,22 L305,50 L285,80 L245,75 L235,55 Z",
  },
  {
    slug: "lang-son",
    name: "Lạng Sơn",
    d: "M290,30 L340,25 L360,60 L335,95 L300,90 L285,70 Z",
  },
  {
    slug: "bac-kan",
    name: "Bắc Kạn",
    d: "M230,80 L265,75 L280,105 L260,130 L225,125 L215,105 Z",
  },
  {
    slug: "tuyen-quang",
    name: "Tuyên Quang",
    d: "M185,78 L228,78 L228,110 L210,130 L185,120 L170,100 Z",
  },
  {
    slug: "lao-cai",
    name: "Lào Cai",
    d: "M120,30 L175,22 L175,70 L155,95 L120,85 L105,60 Z",
  },
  {
    slug: "yen-bai",
    name: "Yên Bái",
    d: "M130,88 L180,78 L195,118 L175,145 L135,140 L120,115 Z",
  },
  {
    slug: "phu-tho",
    name: "Phú Thọ",
    d: "M165,130 L205,120 L215,148 L200,165 L165,162 L150,148 Z",
  },
  {
    slug: "vinh-phuc",
    name: "Vĩnh Phúc",
    d: "M205,148 L235,140 L248,162 L232,178 L205,175 L198,163 Z",
  },
  {
    slug: "son-la",
    name: "Sơn La",
    d: "M90,100 L140,90 L160,130 L148,170 L108,178 L82,155 Z",
  },
  {
    slug: "lai-chau",
    name: "Lai Châu",
    d: "M82,30 L120,30 L120,88 L100,110 L78,100 L68,65 Z",
  },
  {
    slug: "dien-bien",
    name: "Điện Biên",
    d: "M68,68 L105,62 L105,110 L88,138 L60,130 L50,100 Z",
  },
  {
    slug: "hoa-binh",
    name: "Hòa Bình",
    d: "M148,168 L200,162 L210,200 L192,225 L155,220 L138,200 Z",
  },
  {
    slug: "thai-nguyen",
    name: "Thái Nguyên",
    d: "M262,92 L300,88 L310,120 L292,145 L258,140 L248,118 Z",
  },
  {
    slug: "bac-giang",
    name: "Bắc Giang",
    d: "M298,108 L338,100 L348,132 L325,155 L295,150 L285,128 Z",
  },
  {
    slug: "bac-ninh",
    name: "Bắc Ninh",
    d: "M282,148 L312,142 L318,168 L298,180 L278,172 Z",
  },
  {
    slug: "ha-noi",
    name: "Hà Nội",
    d: "M228,158 L278,150 L285,185 L268,210 L228,208 L215,188 Z",
  },
  {
    slug: "hung-yen",
    name: "Hưng Yên",
    d: "M290,178 L320,172 L325,198 L305,215 L283,208 Z",
  },
  {
    slug: "hai-duong",
    name: "Hải Dương",
    d: "M315,148 L355,140 L365,170 L342,190 L312,185 Z",
  },
  {
    slug: "hai-phong",
    name: "Hải Phòng",
    d: "M348,155 L390,148 L398,180 L370,198 L342,190 Z",
  },
  {
    slug: "quang-ninh",
    name: "Quảng Ninh",
    d: "M335,95 L400,80 L425,118 L400,155 L360,158 L330,130 Z",
  },
  {
    slug: "ha-nam",
    name: "Hà Nam",
    d: "M252,210 L288,205 L292,232 L270,248 L245,242 Z",
  },
  {
    slug: "thai-binh",
    name: "Thái Bình",
    d: "M305,200 L348,195 L352,225 L325,240 L298,232 Z",
  },
  {
    slug: "nam-dinh",
    name: "Nam Định",
    d: "M268,248 L310,240 L315,268 L290,282 L260,275 Z",
  },
  {
    slug: "ninh-binh",
    name: "Ninh Bình",
    d: "M232,250 L268,248 L268,278 L248,295 L222,285 Z",
  },

  // ── TRUNG BỘ ─────────────────────────────────────────────────────────────
  {
    slug: "thanh-hoa",
    name: "Thanh Hóa",
    d: "M175,290 L270,285 L278,335 L255,360 L185,355 L158,325 Z",
  },
  {
    slug: "nghe-an",
    name: "Nghệ An",
    d: "M152,358 L258,352 L265,415 L240,440 L168,435 L138,400 Z",
  },
  {
    slug: "ha-tinh",
    name: "Hà Tĩnh",
    d: "M168,438 L242,435 L248,490 L225,510 L175,505 L155,472 Z",
  },
  {
    slug: "quang-binh",
    name: "Quảng Bình",
    d: "M178,508 L230,505 L235,555 L215,572 L182,568 L165,542 Z",
  },
  {
    slug: "quang-tri",
    name: "Quảng Trị",
    d: "M192,572 L235,568 L240,608 L220,622 L195,618 L180,598 Z",
  },
  {
    slug: "thua-thien-hue",
    name: "Thừa Thiên Huế",
    d: "M202,622 L248,618 L255,660 L232,675 L205,670 L192,650 Z",
  },
  {
    slug: "da-nang",
    name: "Đà Nẵng",
    d: "M250,658 L285,655 L290,690 L268,702 L245,698 Z",
  },
  {
    slug: "quang-nam",
    name: "Quảng Nam",
    d: "M205,675 L265,670 L278,730 L252,748 L208,742 L190,710 Z",
  },
  {
    slug: "quang-ngai",
    name: "Quảng Ngãi",
    d: "M222,748 L275,742 L280,788 L258,802 L225,798 L210,775 Z",
  },
  {
    slug: "binh-dinh",
    name: "Bình Định",
    d: "M238,800 L285,795 L290,840 L268,858 L238,852 L222,830 Z",
  },
  {
    slug: "phu-yen",
    name: "Phú Yên",
    d: "M255,858 L295,852 L300,892 L278,908 L252,902 Z",
  },
  {
    slug: "khanh-hoa",
    name: "Khánh Hòa",
    d: "M265,908 L308,900 L315,948 L290,965 L262,958 Z",
  },
  {
    slug: "ninh-thuan",
    name: "Ninh Thuận",
    d: "M278,965 L320,958 L325,995 L302,1010 L275,1005 Z",
  },
  {
    slug: "binh-thuan",
    name: "Bình Thuận",
    d: "M285,1008 L338,998 L348,1055 L320,1075 L285,1068 Z",
  },

  // ── TÂY NGUYÊN ───────────────────────────────────────────────────────────
  {
    slug: "kon-tum",
    name: "Kon Tum",
    d: "M148,720 L210,715 L218,775 L195,800 L148,792 L128,758 Z",
  },
  {
    slug: "gia-lai",
    name: "Gia Lai",
    d: "M150,798 L215,792 L222,855 L200,878 L152,872 L132,838 Z",
  },
  {
    slug: "dak-lak",
    name: "Đắk Lắk",
    d: "M148,878 L218,872 L225,938 L200,960 L148,952 L125,918 Z",
  },
  {
    slug: "dak-nong",
    name: "Đắk Nông",
    d: "M155,958 L208,952 L215,1010 L192,1030 L155,1025 Z",
  },
  {
    slug: "lam-dong",
    name: "Lâm Đồng",
    d: "M200,958 L268,950 L278,1025 L252,1048 L200,1042 L188,1010 Z",
  },

  // ── ĐÔNG NAM BỘ ──────────────────────────────────────────────────────────
  {
    slug: "binh-phuoc",
    name: "Bình Phước",
    d: "M155,1025 L215,1018 L225,1075 L200,1095 L155,1090 Z",
  },
  {
    slug: "tay-ninh",
    name: "Tây Ninh",
    d: "M128,1090 L180,1085 L185,1128 L158,1145 L125,1140 Z",
  },
  {
    slug: "binh-duong",
    name: "Bình Dương",
    d: "M200,1088 L250,1080 L258,1125 L232,1142 L198,1138 Z",
  },
  {
    slug: "dong-nai",
    name: "Đồng Nai",
    d: "M248,1075 L322,1065 L332,1130 L305,1150 L245,1145 Z",
  },
  {
    slug: "ho-chi-minh",
    name: "Hồ Chí Minh",
    d: "M210,1140 L285,1132 L295,1185 L260,1205 L208,1200 L195,1172 Z",
  },
  {
    slug: "ba-ria-vung-tau",
    name: "Bà Rịa - Vũng Tàu",
    d: "M298,1142 L355,1132 L362,1180 L335,1200 L295,1195 Z",
  },

  // ── ĐỒNG BẰNG SÔNG CỬU LONG ─────────────────────────────────────────────
  {
    slug: "long-an",
    name: "Long An",
    d: "M158,1195 L215,1188 L222,1240 L198,1258 L155,1252 Z",
  },
  {
    slug: "tien-giang",
    name: "Tiền Giang",
    d: "M218,1200 L280,1192 L285,1240 L258,1258 L215,1252 Z",
  },
  {
    slug: "ben-tre",
    name: "Bến Tre",
    d: "M265,1242 L315,1235 L320,1278 L295,1295 L260,1290 Z",
  },
  {
    slug: "dong-thap",
    name: "Đồng Tháp",
    d: "M140,1248 L195,1242 L200,1292 L178,1310 L138,1305 Z",
  },
  {
    slug: "vinh-long",
    name: "Vĩnh Long",
    d: "M200,1255 L248,1250 L252,1292 L228,1308 L198,1302 Z",
  },
  {
    slug: "tra-vinh",
    name: "Trà Vinh",
    d: "M248,1255 L295,1248 L298,1292 L272,1310 L245,1305 Z",
  },
  {
    slug: "an-giang",
    name: "An Giang",
    d: "M100,1285 L148,1278 L155,1325 L132,1342 L98,1338 Z",
  },
  {
    slug: "can-tho",
    name: "Cần Thơ",
    d: "M175,1310 L222,1305 L228,1348 L205,1365 L172,1360 Z",
  },
  {
    slug: "hau-giang",
    name: "Hậu Giang",
    d: "M152,1358 L202,1352 L208,1395 L185,1412 L150,1408 Z",
  },
  {
    slug: "soc-trang",
    name: "Sóc Trăng",
    d: "M222,1348 L272,1342 L278,1388 L252,1405 L218,1400 Z",
  },
  {
    slug: "kien-giang",
    name: "Kiên Giang",
    d: "M80,1330 L130,1322 L138,1378 L112,1400 L78,1395 Z",
  },
  {
    slug: "bac-lieu",
    name: "Bạc Liêu",
    d: "M168,1408 L228,1402 L232,1445 L205,1462 L165,1458 Z",
  },
  {
    slug: "ca-mau",
    name: "Cà Mau",
    d: "M138,1455 L205,1448 L210,1500 L175,1522 L135,1518 Z",
  },
];

// ---------------------------------------------------------------------------
// Helper: get fill color for a province
// ---------------------------------------------------------------------------

function getProvinceFill(
  slug: string,
  activeProvince: string | null,
  hoveredProvince: string | null,
  provincesWithProjects: string[]
): string {
  if (slug === activeProvince) return COLORS.active.fill;
  if (slug === hoveredProvince) return COLORS.hover.fill;
  if (provincesWithProjects.includes(slug)) return COLORS.hasProject.fill;
  return COLORS.default.fill;
}

function getProvinceStroke(
  slug: string,
  activeProvince: string | null,
  hoveredProvince: string | null,
  provincesWithProjects: string[]
): string {
  if (slug === activeProvince) return COLORS.active.stroke;
  if (slug === hoveredProvince) return COLORS.hover.stroke;
  if (provincesWithProjects.includes(slug)) return COLORS.hasProject.stroke;
  return COLORS.default.stroke;
}

// ---------------------------------------------------------------------------
// Sub-component: a single province path
// ---------------------------------------------------------------------------

interface ProvincePathProps {
  province: ProvinceData;
  isActive: boolean;
  isHovered: boolean;
  hasProject: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
  projectCount: number;
}

function ProvincePath({
  province,
  isActive,
  isHovered,
  hasProject,
  onEnter,
  onLeave,
  onClick,
  projectCount,
}: ProvincePathProps) {
  /** Xử lý keyboard: Enter hoặc Space kích hoạt click */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  const fill = isActive
    ? COLORS.active.fill
    : isHovered
    ? COLORS.hover.fill
    : hasProject
    ? COLORS.hasProject.fill
    : COLORS.default.fill;

  const stroke = isActive
    ? COLORS.active.stroke
    : isHovered
    ? COLORS.hover.stroke
    : hasProject
    ? COLORS.hasProject.stroke
    : COLORS.default.stroke;

  const ariaLabel =
    projectCount > 0
      ? `${province.name} — ${projectCount} dự án`
      : province.name;

  return (
    <path
      d={province.d}
      fill={fill}
      stroke={stroke}
      strokeWidth={0.5}
      data-province-slug={province.slug}
      data-province-name={province.name}
      role="button"
      aria-label={ariaLabel}
      aria-pressed={isActive}
      tabIndex={0}
      style={{
        cursor: "pointer",
        transition: "fill 250ms ease, stroke 250ms ease",
        outline: "none",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onFocus={onEnter}
      onBlur={onLeave}
    />
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function VietnamMap({
  activeProvince,
  onProvinceClick,
  provincesWithProjects,
}: VietnamMapProps) {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  /** Đếm dự án cho mỗi tỉnh (demo: mỗi tỉnh có project tính là 1) */
  const getProjectCount = useCallback(
    (slug: string) => {
      return provincesWithProjects.includes(slug) ? 1 : 0;
    },
    [provincesWithProjects]
  );

  return (
    <div
      className="vietnam-map-wrapper"
      style={{ position: "relative", width: "100%", maxWidth: 480 }}
    >
      {/* ARIA live region cho screen reader */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
        }}
      >
        {activeProvince
          ? `Đang xem tỉnh: ${
              PROVINCES.find((p) => p.slug === activeProvince)?.name ?? activeProvince
            }`
          : "Chưa chọn tỉnh nào"}
      </div>

      <svg
        viewBox="40 10 440 1540"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Bản đồ Việt Nam — 63 tỉnh thành"
        role="img"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            path, rect {
              transition: none !important;
            }
          }
        `}</style>

        {/* Nền biển Đông */}
        <rect x="40" y="10" width="440" height="1540" fill={COLORS.sea.fill} />

        {/* Tất cả tỉnh thành */}
        {PROVINCES.map((province) => (
          <ProvincePath
            key={province.slug}
            province={province}
            isActive={activeProvince === province.slug}
            isHovered={hoveredProvince === province.slug}
            hasProject={provincesWithProjects.includes(province.slug)}
            projectCount={getProjectCount(province.slug)}
            onEnter={() => setHoveredProvince(province.slug)}
            onLeave={() => setHoveredProvince(null)}
            onClick={() => onProvinceClick(province.slug, province.name)}
          />
        ))}

        {/* ── Hoàng Sa (Paracel Islands) ─────────────────────────────── */}
        <g aria-label="Quần đảo Hoàng Sa">
          <rect
            x="370"
            y="480"
            width="60"
            height="35"
            fill={COLORS.islandFill}
            stroke={COLORS.islandStroke}
            strokeWidth={1}
            strokeDasharray="4 3"
            rx={3}
          />
          <text
            x="400"
            y="494"
            textAnchor="middle"
            fontSize={8}
            fontStyle="italic"
            fill={COLORS.islandText}
            fontFamily="serif"
          >
            Hoàng Sa
          </text>
          <text
            x="400"
            y="505"
            textAnchor="middle"
            fontSize={6.5}
            fontStyle="italic"
            fill={COLORS.islandText}
            fontFamily="serif"
            opacity={0.75}
          >
            (Việt Nam)
          </text>
        </g>

        {/* ── Trường Sa (Spratly Islands) ────────────────────────────── */}
        <g aria-label="Quần đảo Trường Sa">
          <rect
            x="390"
            y="880"
            width="65"
            height="35"
            fill={COLORS.islandFill}
            stroke={COLORS.islandStroke}
            strokeWidth={1}
            strokeDasharray="4 3"
            rx={3}
          />
          <text
            x="422"
            y="894"
            textAnchor="middle"
            fontSize={8}
            fontStyle="italic"
            fill={COLORS.islandText}
            fontFamily="serif"
          >
            Trường Sa
          </text>
          <text
            x="422"
            y="906"
            textAnchor="middle"
            fontSize={6.5}
            fontStyle="italic"
            fill={COLORS.islandText}
            fontFamily="serif"
            opacity={0.75}
          >
            (Việt Nam)
          </text>
        </g>

        {/* ── Chú thích (legend) ─────────────────────────────────────── */}
        <g transform="translate(50, 1490)" aria-label="Chú thích màu sắc">
          {/* Tỉnh không có dự án */}
          <rect
            x={0}
            y={0}
            width={14}
            height={14}
            fill={COLORS.default.fill}
            stroke={COLORS.default.stroke}
            strokeWidth={0.5}
          />
          <text x={18} y={11} fontSize={9} fill="#4A4A4A" fontFamily="sans-serif">
            Chưa có dự án
          </text>

          {/* Tỉnh có dự án */}
          <rect
            x={0}
            y={20}
            width={14}
            height={14}
            fill={COLORS.hasProject.fill}
            stroke={COLORS.hasProject.stroke}
            strokeWidth={0.5}
          />
          <text x={18} y={31} fontSize={9} fill="#4A4A4A" fontFamily="sans-serif">
            Có dự án
          </text>

          {/* Đang chọn */}
          <rect
            x={0}
            y={40}
            width={14}
            height={14}
            fill={COLORS.active.fill}
            stroke={COLORS.active.stroke}
            strokeWidth={0.5}
          />
          <text x={18} y={51} fontSize={9} fill="#4A4A4A" fontFamily="sans-serif">
            Đang chọn
          </text>
        </g>
      </svg>
    </div>
  );
}
