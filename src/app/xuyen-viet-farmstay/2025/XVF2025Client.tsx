"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

/* ─── Shared style helpers ─── */
const goldShimmerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg,#6A4C10 0%,#A07820 20%,#C49A28 35%,#D4B050 50%,#C49A28 65%,#A07820 80%,#6A4C10 100%)",
  backgroundSize: "300% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "gold-shimmer 5s linear infinite",
};

const sectionLabel: React.CSSProperties = {
  color: "#C49A28",
  fontSize: "9px",
  letterSpacing: "0.35em",
  textTransform: "uppercase" as const,
  fontFamily: "var(--font-nunito)",
  marginBottom: "0.75rem",
  display: "block",
};

const sectionTitle: React.CSSProperties = {
  fontFamily: "var(--font-alegreya)",
  color: "#EDE0C4",
  fontSize: "clamp(1.6rem,2.5vw,2.4rem)",
  fontWeight: 700,
  marginBottom: "0",
};

const dividerStyle: React.CSSProperties = {
  width: "2.5rem",
  height: "2px",
  background: "#C49A28",
  margin: "1rem auto 2rem",
};

/* ─── Logo helpers ─── */
// Icon X đơn — dùng cho decorative, dividers, section headers
function XMark({ size = 28, style = {} }: { size?: number; style?: React.CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-xvf-icon.png"
      alt=""
      width={size}
      height={size}
      style={{ display: "inline-block", flexShrink: 0, objectFit: "contain", ...style }}
      aria-hidden="true"
    />
  );
}

// Logo ngang màu (icon + "uyên Việt FARMSTAY") — dùng nền sáng hoặc card
function LogoColor({ height = 60, style = {} }: { height?: number; style?: React.CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-xvf-horizontal-color.png"
      alt="Xuyên Việt Farmstay"
      height={height}
      style={{ display: "block", objectFit: "contain", ...style }}
    />
  );
}

// Logo ngang trắng — dùng nền tối
function LogoWhite({ height = 60, style = {} }: { height?: number; style?: React.CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-xvf-horizontal-white.png"
      alt="Xuyên Việt Farmstay"
      height={height}
      style={{ display: "block", objectFit: "contain", ...style }}
    />
  );
}

// Wordmark dài "Xuyên Việt Farmstay"
function LogoWordmark({ height = 48, style = {} }: { height?: number; style?: React.CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-xvf-wordmark.png"
      alt="Xuyên Việt Farmstay"
      height={height}
      style={{ display: "block", objectFit: "contain", ...style }}
    />
  );
}

/* ─── CTA Button ─── */
function XuyenVietBtn({ onClick, href, style = {} }: { onClick?: () => void; href?: string; style?: React.CSSProperties }) {
  const base: React.CSSProperties = {
    background: "#C49A28",
    color: "#0A1208",
    fontFamily: "var(--font-nunito)",
    fontWeight: 700,
    fontSize: "12px",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    padding: "14px 36px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    display: "inline-block",
    textDecoration: "none",
    ...style,
  };
  if (href) return <Link href={href} style={base}>Xuyên Việt Ngay ✕</Link>;
  return <button onClick={onClick} style={base}>Xuyên Việt Ngay ✕</button>;
}

/* ─── Section wrapper ─── */
function Section({ id, children, style = {} }: { id?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section
      id={id}
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "5rem 1.5rem",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

/* ─── Goals data ─── */
const goals = [
  {
    num: "01",
    title: "Truyền Cảm Hứng Toàn Quốc",
    desc: "Lan tỏa phong trào farmstay bền vững từ Nam ra Bắc, đánh thức nhận thức về du lịch nông nghiệp Việt Nam.",
  },
  {
    num: "02",
    title: "Học Hỏi Thực Tiễn",
    desc: "Tham quan và học trực tiếp từ các chủ farm, farmstay hàng đầu trải dài khắp các tỉnh thành trên cả nước.",
  },
  {
    num: "03",
    title: "Kết Nối Giao Thương",
    desc: "Mở rộng mạng lưới đối tác, tạo cơ hội hợp tác đầu tư và kinh doanh giữa các chủ farm và nhà đầu tư.",
  },
  {
    num: "04",
    title: "Chiến Lược & Chiến Thuật",
    desc: "Nhận insights trực tiếp từ Nhà Hoạch Định Phạm Thanh Tùng — chiến lược vận hành, marketing và phát triển farmstay.",
  },
  {
    num: "05",
    title: "Làn Sóng Truyền Thông",
    desc: "Tạo làn sóng nội dung mạnh mẽ về du lịch nông nghiệp, đưa farmstay Việt Nam lên bản đồ du lịch quốc tế.",
  },
  {
    num: "06",
    title: "Cơ Hội Đầu Tư BĐS",
    desc: "Khám phá và nắm bắt tiềm năng đầu tư bất động sản du lịch nông nghiệp tại các vùng giàu tiềm năng.",
  },
];

/* ─── Benefits data ─── */
const benefits = [
  {
    title: "Nhận Thức Quốc Gia",
    desc: "Đặt nền móng xây dựng Việt Nam thành Quốc gia Du lịch Nông nghiệp — mô hình mà thế giới đang hướng đến.",
  },
  {
    title: "Đánh Thức Nhà Đầu Tư",
    desc: "Nâng cao nhận thức đầu tư vào farmstay và nông nghiệp bền vững — lĩnh vực còn nhiều dư địa phát triển.",
  },
  {
    title: "Khóa Học Thực Chiến",
    desc: "Học hỏi trực tiếp từ những người đang làm — không lý thuyết, không xa xôi, chỉ là kinh nghiệm thực tế.",
  },
  {
    title: "Kết Nối Sâu Sắc",
    desc: "Cùng nhau 15 ngày xuyên Việt — mối quan hệ được tạo ra trong hành trình khác hẳn mọi sự kiện thông thường.",
  },
  {
    title: "Giao Thương Mở Rộng",
    desc: "Tạo ra những hợp đồng, quan hệ đối tác thực sự giữa chủ farm, nhà đầu tư và doanh nhân nông nghiệp.",
  },
  {
    title: "Truyền Cảm Hứng",
    desc: "Mỗi thành viên trở về với một nguồn năng lượng mới — đủ để thay đổi cách nhìn và cách làm farmstay.",
  },
];

/* ─── Timeline data ─── */
const timeline = [
  {
    year: "2023",
    label: "Lần 1",
    route: "HCM → Hà Nội",
    highlight: "Khởi đầu lịch sử",
    desc: "Chuyến xuyên Việt đầu tiên trong lịch sử ngành farmstay Việt Nam. Đặt nền móng cho phong trào du lịch nông nghiệp.",
    status: "done",
  },
  {
    year: "2024",
    label: "Lần 2",
    route: "Hà Nội → HCM",
    highlight: "Mở rộng kết nối",
    desc: "Hành trình ngược chiều, mở rộng mạng lưới với hàng trăm chủ farm và nhà đầu tư trên toàn quốc.",
    status: "done",
  },
  {
    year: "2025",
    label: "Lần 3 · Hiện tại",
    route: "QL1A · 35 farm · 15 ngày",
    highlight: "Quy mô lớn nhất",
    desc: "Hành trình xuyên Việt quy mô nhất từ trước tới nay: 15 ngày, 35 điểm đón, hơn 16 tỉnh thành dọc Quốc lộ 1A.",
    status: "current",
  },
];

/* ─── Sponsorship packages ─── */
const donDoanPackages = [
  {
    name: "Đón Đoàn Thăm Quan",
    desc: "Farmstay đón tiếp đoàn XVF tham quan mô hình, giao lưu chia sẻ kinh nghiệm.",
    benefits: ["Xuất hiện trong tất cả tài liệu chương trình", "Logo trên backdrop chụp ảnh đoàn", "Được giới thiệu trực tiếp với 30–50 thành viên", "Nội dung truyền thông sau hành trình"],
  },
  {
    name: "Đón Đoàn Ăn Trưa",
    desc: "Tài trợ bữa trưa cho toàn đoàn XVF với đặc sản địa phương.",
    benefits: ["Tên thương hiệu gắn với bữa ăn", "Nội dung ẩm thực được chia sẻ rộng rãi", "Cơ hội PR sản phẩm đặc sản vùng miền", "Kết nối trực tiếp với thành viên"],
  },
  {
    name: "Đón Đoàn Lưu Trú",
    desc: "Farmstay tài trợ chỗ nghỉ qua đêm cho toàn bộ đoàn hành trình.",
    benefits: ["Trải nghiệm sản phẩm farmstay thực tế", "Testimonial chất lượng từ 30–50 người có tầm ảnh hưởng", "Nội dung video/ảnh chất lượng cao", "Gói truyền thông dài hạn sau hành trình"],
  },
];

const hienVatPackages = [
  {
    name: "Gói Hiện Vật 5 Triệu",
    value: "5.000.000 VNĐ",
    items: ["Hiện vật trị giá 5 triệu phục vụ đoàn hành trình", "Logo trong tài liệu chương trình", "Mention trên kênh truyền thông XVF"],
  },
  {
    name: "Gói Hiện Vật 10 Triệu",
    value: "10.000.000 VNĐ",
    items: ["Hiện vật trị giá 10 triệu phục vụ đoàn", "Logo nổi bật trong toàn bộ tài liệu", "Bài viết riêng giới thiệu thương hiệu tài trợ", "Mention liên tục trên các kênh truyền thông"],
  },
];

const hienKimPackages = [
  {
    name: "Gói Hiện Kim 5 Triệu",
    value: "5.000.000 VNĐ",
    items: ["Hỗ trợ chi phí vận hành hành trình", "Logo trong tài liệu chương trình", "Cảm ơn công khai trên kênh truyền thông XVF"],
  },
  {
    name: "Gói Hiện Kim 10 Triệu",
    value: "10.000.000 VNĐ",
    items: ["Hỗ trợ đáng kể chi phí vận hành", "Logo nổi bật trong toàn bộ tài liệu và backdrop", "Bài viết riêng giới thiệu nhà tài trợ", "Cảm ơn công khai và liên tục trên tất cả kênh"],
  },
];

/* ══════════════════════════════════════════════════ */
export default function XVF2025Client() {
  const sponsorRef = useRef<HTMLDivElement>(null);
  const scrollToSponsor = () => sponsorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <style>{`
        @keyframes gold-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 14px rgba(196,154,40,0.25); }
          50% { box-shadow: 0 0 30px rgba(196,154,40,0.55); }
        }

        /* XVF Brand Pattern 1: nested squares (dùng ở Hero & Lịch sử) */
        .xvf-pattern-squares {
          background-image: url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1' y='1' width='42' height='42' fill='none' stroke='rgba(255,255,255,0.055)' stroke-width='0.8'/%3E%3Crect x='7' y='7' width='30' height='30' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='0.8'/%3E%3Crect x='14' y='14' width='16' height='16' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='0.8'/%3E%3Ccircle cx='22' cy='22' r='1.2' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E");
          background-size: 44px 44px;
        }

        /* XVF Brand Pattern 2: diamonds (dùng ở Tài trợ & Bottom CTA) */
        .xvf-pattern-diamonds {
          background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='24,2 46,24 24,46 2,24' fill='none' stroke='rgba(255,255,255,0.055)' stroke-width='0.8'/%3E%3Cpolygon points='24,10 38,24 24,38 10,24' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='0.8'/%3E%3Cpolygon points='24,18 30,24 24,30 18,24' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='0.8'/%3E%3Ccircle cx='24' cy='24' r='1' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E");
          background-size: 48px 48px;
        }

        /* Light version cho section nền sáng hơn */
        .xvf-pattern-squares-gold {
          background-image: url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1' y='1' width='42' height='42' fill='none' stroke='rgba(196,154,40,0.12)' stroke-width='0.8'/%3E%3Crect x='7' y='7' width='30' height='30' fill='none' stroke='rgba(196,154,40,0.08)' stroke-width='0.8'/%3E%3Crect x='14' y='14' width='16' height='16' fill='none' stroke='rgba(196,154,40,0.05)' stroke-width='0.8'/%3E%3Ccircle cx='22' cy='22' r='1.2' fill='rgba(196,154,40,0.1)'/%3E%3C/svg%3E");
          background-size: 44px 44px;
        }

        .xvf-pattern-diamonds-gold {
          background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='24,2 46,24 24,46 2,24' fill='none' stroke='rgba(196,154,40,0.12)' stroke-width='0.8'/%3E%3Cpolygon points='24,10 38,24 24,38 10,24' fill='none' stroke='rgba(196,154,40,0.08)' stroke-width='0.8'/%3E%3Cpolygon points='24,18 30,24 24,30 18,24' fill='none' stroke='rgba(196,154,40,0.05)' stroke-width='0.8'/%3E%3Ccircle cx='24' cy='24' r='1' fill='rgba(196,154,40,0.1)'/%3E%3C/svg%3E");
          background-size: 48px 48px;
        }

        .xvf25-btn-ghost {
          background: transparent;
          color: #EDE0C4;
          font-family: var(--font-nunito);
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 14px 32px;
          border-radius: 6px;
          border: 1px solid rgba(196,154,40,0.5);
          cursor: pointer;
          display: inline-block;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .xvf25-btn-ghost:hover {
          border-color: #C49A28;
          color: #C49A28;
        }
      `}</style>

      <div
        style={{
          marginTop: "72px",
          background: "linear-gradient(180deg, #060E05 0%, #0A1208 30%, #0D1A0C 100%)",
          minHeight: "100vh",
        }}
      >
        {/* ══ HERO ══ */}
        <section className="xvf-pattern-squares" style={{ padding: "6rem 1.5rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          {/* Background X marks */}
          <div style={{ position: "absolute", top: "2rem", left: "5%", opacity: 0.06 }}><XMark size={80} /></div>
          <div style={{ position: "absolute", bottom: "2rem", right: "5%", opacity: 0.06 }}><XMark size={60} /></div>
          <div style={{ position: "absolute", top: "40%", right: "12%", opacity: 0.04 }}><XMark size={100} /></div>

          {/* Logo ngang trắng — nhận diện thương hiệu đầu trang */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}
          >
            <LogoWhite height={56} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={sectionLabel}
          >
            HÀNH TRÌNH · LẦN 3 · 2025
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              ...goldShimmerStyle,
              fontFamily: "var(--font-alegreya)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Xuyên Việt Farmstay 2025
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={dividerStyle}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              color: "#D4C8A4",
              fontFamily: "var(--font-alegreya)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              maxWidth: "600px",
              margin: "0 auto 2rem",
            }}
          >
            &ldquo;Xuyên Việt Farmstay không chỉ là một hành trình — đây là cam kết với Du lịch Nông nghiệp Việt Nam.&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ marginBottom: "2.5rem" }}
          >
            <span
              style={{
                display: "inline-block",
                border: "1px solid rgba(196,154,40,0.45)",
                color: "#D4B050",
                fontFamily: "var(--font-nunito)",
                fontSize: "9px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                padding: "6px 18px",
                borderRadius: "100px",
              }}
            >
              QL1A · 35 FARM · 15 NGÀY · 16+ TỈNH THÀNH
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <XuyenVietBtn href="/xuyen-viet-farmstay/2026" />
            <button onClick={scrollToSponsor} className="xvf25-btn-ghost">
              Trở Thành Nhà Tài Trợ
            </button>
          </motion.div>
        </section>

        {/* ══ STATS BAR ══ */}
        <div
          style={{
            background: "rgba(13,26,12,0.85)",
            borderTop: "1px solid rgba(196,154,40,0.2)",
            borderBottom: "1px solid rgba(196,154,40,0.2)",
            padding: "2rem 1.5rem",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              textAlign: "center",
              gap: "0",
            }}
          >
            {[
              { num: "15", label: "Ngày Hành Trình" },
              { num: "35+", label: "Farm & Farmstay" },
              { num: "16+", label: "Tỉnh Thành" },
              { num: "3", label: "Mùa Liên Tiếp" },
            ].map((s, i, arr) => (
              <div
                key={i}
                style={{
                  padding: "1rem",
                  borderRight: i < arr.length - 1 ? "1px solid rgba(196,154,40,0.15)" : "none",
                }}
              >
                <div style={{ ...goldShimmerStyle, fontFamily: "var(--font-alegreya)", fontSize: "2rem", fontWeight: 700, marginBottom: "0.2rem" }}>
                  {s.num}
                </div>
                <div style={{ color: "#D4C8A4", fontFamily: "var(--font-nunito)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ THÔNG ĐIỆP NHÀ SÁNG LẬP ══ */}
        <section style={{ padding: "5rem 1.5rem", borderBottom: "1px solid rgba(196,154,40,0.1)" }}>
          <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
              <XMark size={22} />
              <span style={sectionLabel}>Thông Điệp Nhà Sáng Lập</span>
              <XMark size={22} />
            </div>

            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: "var(--font-alegreya)",
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                color: "#EDE0C4",
                lineHeight: 1.8,
                margin: "0 0 2rem",
                padding: "2rem",
                background: "rgba(196,154,40,0.06)",
                border: "1px solid rgba(196,154,40,0.2)",
                borderRadius: "16px",
                position: "relative",
              }}
            >
              <span style={{ ...goldShimmerStyle, fontSize: "3rem", lineHeight: 0.5, display: "block", marginBottom: "0.5rem" }}>&ldquo;</span>
              Khi tôi bắt đầu hành trình Xuyên Việt Farmstay lần đầu tiên vào năm 2023, tôi chỉ có một câu hỏi trong đầu: &ldquo;Liệu du lịch nông nghiệp có thể trở thành bản sắc của Việt Nam?&rdquo;

              <br /><br />
              Ba năm sau, câu trả lời là có. Không phải vì chúng tôi nói — mà vì hàng trăm chủ farm, nhà đầu tư và người yêu nông nghiệp đã cùng nhau đi. Cùng nhau học. Cùng nhau xây dựng.

              <br /><br />
              Xuyên Việt Farmstay 2025 là lần thứ 3 — và là lần lớn nhất. 35 điểm đón, 15 ngày, trải dài từ Nam ra Bắc theo Quốc lộ 1A. Đây không còn là hành trình của một người. Đây là hành trình của cả một ngành.
              <span style={{ ...goldShimmerStyle, fontSize: "3rem", lineHeight: 0.5, display: "block", marginTop: "0.5rem", textAlign: "right" }}>&rdquo;</span>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p style={{ ...goldShimmerStyle, fontFamily: "var(--font-alegreya)", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.25rem" }}>
                Phạm Thanh Tùng
              </p>
              <p style={{ color: "#D4C8A4", fontFamily: "var(--font-nunito)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Nhà Sáng Lập · Nhà Hoạch Định Farmstay
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══ TÊN & Ý NGHĨA ══ */}
        <Section>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            {/* Left: big X */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
                <LogoColor height={100} />
                <div style={{ width: "3rem", height: "1px", background: "rgba(196,154,40,0.3)" }} />
                <XMark size={72} style={{ opacity: 0.85 }} />
              </div>
            </motion.div>

            {/* Right: text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span style={sectionLabel}>Tên Chương Trình</span>
              <h2 style={{ ...sectionTitle, marginBottom: "1rem" }}>
                Hành Trình<br />
                <span style={goldShimmerStyle}>Xuyên Việt Farmstay</span>
              </h2>
              <p style={{ color: "#D4C8A4", fontFamily: "var(--font-nunito)", fontSize: "14px", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                <strong style={{ color: "#EDE0C4" }}>Xuyên Việt</strong> — hành trình xuyên suốt chiều dài đất nước, từ Hồ Chí Minh ra Hà Nội.
              </p>
              <p style={{ color: "#D4C8A4", fontFamily: "var(--font-nunito)", fontSize: "14px", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                <strong style={{ color: "#EDE0C4" }}>Farmstay</strong> — mô hình du lịch nông nghiệp kết hợp lưu trú, là tương lai của ngành du lịch bền vững Việt Nam.
              </p>
              <p style={{ color: "#D4C8A4", fontFamily: "var(--font-nunito)", fontSize: "14px", lineHeight: 1.8 }}>
                Khi ghép lại, <strong style={{ color: "#C49A28" }}>Xuyên Việt Farmstay</strong> là tuyên ngôn: chúng ta đi qua toàn bộ Việt Nam để chứng minh rằng du lịch nông nghiệp có thể trở thành bản sắc quốc gia.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* X mark divider */}
        <div style={{ textAlign: "center", padding: "0 0 2rem", opacity: 0.3 }}>
          <XMark size={36} />
        </div>

        {/* ══ 6 MỤC TIÊU ══ */}
        <section style={{ background: "rgba(6,14,5,0.6)", borderTop: "1px solid rgba(196,154,40,0.1)", borderBottom: "1px solid rgba(196,154,40,0.1)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                <XMark size={18} />
                <span style={sectionLabel}>6 Mục Tiêu Chính</span>
                <XMark size={18} />
              </div>
              <h2 style={sectionTitle}>Chúng Tôi Đến Để Làm Gì?</h2>
              <div style={dividerStyle} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {goals.map((g, i) => (
                <motion.div
                  key={g.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{
                    background: "rgba(13,26,12,0.8)",
                    border: "1px solid rgba(196,154,40,0.18)",
                    borderRadius: "14px",
                    padding: "1.75rem",
                    display: "flex",
                    gap: "1.25rem",
                  }}
                >
                  <div style={{ flexShrink: 0 }}>
                    <span style={{ ...goldShimmerStyle, fontFamily: "var(--font-alegreya)", fontSize: "2.2rem", fontWeight: 700 }}>
                      {g.num}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ color: "#EDE0C4", fontFamily: "var(--font-alegreya)", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                      {g.title}
                    </h3>
                    <p style={{ color: "rgba(212,200,164,0.75)", fontFamily: "var(--font-nunito)", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
                      {g.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <XuyenVietBtn href="/xuyen-viet-farmstay/2026" />
            </div>
          </div>
        </section>

        {/* ══ LỢI ÍCH CỘNG ĐỒNG ══ */}
        <Section>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "0.5rem" }}>
              <XMark size={18} />
              <span style={sectionLabel}>Lợi Ích Cho Cộng Đồng</span>
              <XMark size={18} />
            </div>
            <h2 style={sectionTitle}>Tác Động Lan Toả</h2>
            <div style={dividerStyle} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{
                  padding: "1.5rem",
                  borderLeft: "3px solid #C49A28",
                  background: "rgba(13,26,12,0.5)",
                  borderRadius: "0 12px 12px 0",
                }}
              >
                <h3 style={{ color: "#EDE0C4", fontFamily: "var(--font-alegreya)", fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {b.title}
                </h3>
                <p style={{ color: "rgba(212,200,164,0.75)", fontFamily: "var(--font-nunito)", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ══ LỊCH SỬ ══ */}
        <section className="xvf-pattern-squares-gold" style={{ background: "rgba(6,14,5,0.5)", borderTop: "1px solid rgba(196,154,40,0.1)", borderBottom: "1px solid rgba(196,154,40,0.1)", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                <XMark size={18} />
                <span style={sectionLabel}>Lịch Sử & Nguồn Gốc</span>
                <XMark size={18} />
              </div>
              <h2 style={sectionTitle}>3 Mùa Hành Trình</h2>
              <div style={dividerStyle} />
            </div>

            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              <div style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "2px",
                background: "rgba(196,154,40,0.2)",
                transform: "translateX(-50%)",
              }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                {timeline.map((t, i) => (
                  <motion.div
                    key={t.year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 3rem 1fr",
                      gap: "0",
                      alignItems: "center",
                    }}
                  >
                    {/* Left content or spacer */}
                    <div style={{ textAlign: "right", padding: "0 1.5rem 0 0", opacity: i % 2 === 0 ? 1 : 0 }}>
                      {i % 2 === 0 && (
                        <div style={{
                          background: "rgba(13,26,12,0.9)",
                          border: t.status === "current" ? "1px solid rgba(196,154,40,0.5)" : "1px solid rgba(196,154,40,0.18)",
                          borderRadius: "14px",
                          padding: "1.5rem",
                          animation: t.status === "current" ? "glow-pulse 3s ease-in-out infinite" : "none",
                        }}>
                          <span style={{ ...goldShimmerStyle, fontFamily: "var(--font-alegreya)", fontSize: "2.5rem", fontWeight: 700 }}>{t.year}</span>
                          <p style={{ color: "#C49A28", fontFamily: "var(--font-nunito)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0.25rem 0 0.5rem" }}>{t.label}</p>
                          <p style={{ color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontSize: "12px", fontWeight: 700, marginBottom: "0.25rem" }}>{t.route}</p>
                          <p style={{ color: "rgba(212,200,164,0.7)", fontFamily: "var(--font-nunito)", fontSize: "12px", lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
                        </div>
                      )}
                    </div>

                    {/* Center dot */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: t.status === "current" ? "#C49A28" : "rgba(196,154,40,0.4)",
                        border: "2px solid rgba(196,154,40,0.5)",
                        flexShrink: 0,
                        zIndex: 1,
                      }} />
                    </div>

                    {/* Right content or spacer */}
                    <div style={{ padding: "0 0 0 1.5rem", opacity: i % 2 === 1 ? 1 : 0 }}>
                      {i % 2 === 1 && (
                        <div style={{
                          background: "rgba(13,26,12,0.9)",
                          border: t.status === "current" ? "1px solid rgba(196,154,40,0.5)" : "1px solid rgba(196,154,40,0.18)",
                          borderRadius: "14px",
                          padding: "1.5rem",
                        }}>
                          <span style={{ ...goldShimmerStyle, fontFamily: "var(--font-alegreya)", fontSize: "2.5rem", fontWeight: 700 }}>{t.year}</span>
                          <p style={{ color: "#C49A28", fontFamily: "var(--font-nunito)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0.25rem 0 0.5rem" }}>{t.label}</p>
                          <p style={{ color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontSize: "12px", fontWeight: 700, marginBottom: "0.25rem" }}>{t.route}</p>
                          <p style={{ color: "rgba(212,200,164,0.7)", fontFamily: "var(--font-nunito)", fontSize: "12px", lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
              <p style={{ color: "rgba(212,200,164,0.6)", fontFamily: "var(--font-alegreya)", fontStyle: "italic", marginBottom: "1.5rem" }}>
                Hành trình tiếp theo — Xuyên Việt Farmstay 2026 — đang được lên kế hoạch.
              </p>
              <XuyenVietBtn href="/xuyen-viet-farmstay/2026" />
            </div>
          </div>
        </section>

        {/* ══ ĐƠN VỊ TỔ CHỨC ══ */}
        <Section>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            {/* Defarm */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: "rgba(13,26,12,0.8)",
                border: "1px solid rgba(196,154,40,0.2)",
                borderRadius: "16px",
                padding: "2.5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: "1rem", right: "1rem", opacity: 0.08 }}>
                <XMark size={60} />
              </div>
              <span style={sectionLabel}>Đơn Vị Tổ Chức</span>
              <div style={{ marginBottom: "0.75rem" }}>
                <LogoWordmark height={36} />
              </div>
              <p style={{ color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontSize: "13px", lineHeight: 1.8, marginBottom: "0.75rem" }}>
                Công ty Cổ phần Defarm — đơn vị tổ chức chính thức của chuỗi Xuyên Việt Farmstay.
              </p>
              <p style={{ color: "rgba(212,200,164,0.6)", fontFamily: "var(--font-nunito)", fontSize: "12px", marginBottom: "1.25rem" }}>
                Defarm chuyên về tư vấn, đào tạo và phát triển hệ sinh thái farmstay tại Việt Nam.
              </p>
              <a
                href="https://defarm.vn"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#C49A28",
                  fontFamily: "var(--font-nunito)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(196,154,40,0.4)",
                  paddingBottom: "2px",
                }}
              >
                defarm.vn →
              </a>
            </motion.div>

            {/* Nhà Hoạch Định */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                background: "rgba(13,26,12,0.8)",
                border: "1px solid rgba(196,154,40,0.2)",
                borderRadius: "16px",
                padding: "2.5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: "1rem", right: "1rem", opacity: 0.08 }}>
                <XMark size={60} />
              </div>
              <span style={sectionLabel}>Thương Hiệu Chỉ Đạo</span>
              <h3 style={{
                ...goldShimmerStyle,
                fontFamily: "var(--font-alegreya)",
                fontSize: "1.8rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}>
                Nhà Hoạch Định
              </h3>
              <p style={{ color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontSize: "13px", lineHeight: 1.8, marginBottom: "0.75rem" }}>
                Thương hiệu cá nhân của Phạm Thanh Tùng — Nhà Hoạch Định Chiến Lược Farmstay.
              </p>
              <p style={{ color: "rgba(212,200,164,0.6)", fontFamily: "var(--font-nunito)", fontSize: "12px", marginBottom: "1.25rem" }}>
                Định hướng toàn bộ chiến lược, nội dung và giá trị cốt lõi của hành trình Xuyên Việt Farmstay.
              </p>
              <Link
                href="/"
                style={{
                  color: "#C49A28",
                  fontFamily: "var(--font-nunito)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(196,154,40,0.4)",
                  paddingBottom: "2px",
                }}
              >
                nhahoachdinh.com →
              </Link>
            </motion.div>
          </div>
        </Section>

        {/* X mark divider */}
        <div style={{ textAlign: "center", padding: "0 0 3rem", opacity: 0.25 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
            <div style={{ flex: 1, maxWidth: "200px", height: "1px", background: "rgba(196,154,40,0.2)" }} />
            <XMark size={32} />
            <div style={{ flex: 1, maxWidth: "200px", height: "1px", background: "rgba(196,154,40,0.2)" }} />
          </div>
        </div>

        {/* ══ KÊU GỌI TÀI TRỢ ══ */}
        <section
          id="tai-tro"
          ref={sponsorRef}
          className="xvf-pattern-diamonds"
          style={{
            background: "rgba(6,14,5,0.7)",
            borderTop: "1px solid rgba(196,154,40,0.15)",
            padding: "6rem 1.5rem",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                <XMark size={18} />
                <span style={sectionLabel}>Kêu Gọi Tài Trợ</span>
                <XMark size={18} />
              </div>
              <h2 style={sectionTitle}>Cùng Nhau Xây Dựng<br />Du Lịch Nông Nghiệp Việt Nam</h2>
              <div style={dividerStyle} />
            </div>

            {/* Thư mời */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: "var(--font-alegreya)",
                fontStyle: "italic",
                fontSize: "1.05rem",
                color: "#D4C8A4",
                lineHeight: 1.9,
                maxWidth: "720px",
                margin: "0 auto 4rem",
                textAlign: "center",
                padding: "2rem",
                background: "rgba(196,154,40,0.05)",
                border: "1px solid rgba(196,154,40,0.18)",
                borderRadius: "14px",
              }}
            >
              Kính thưa Quý Đối Tác,
              <br /><br />
              Xuyên Việt Farmstay là hành trình duy nhất tại Việt Nam kết nối hàng trăm chủ farm, nhà đầu tư và doanh nhân nông nghiệp trong một chuyến đi xuyên quốc gia.
              <br /><br />
              Chúng tôi trân trọng mời Quý đối tác đồng hành cùng hành trình này — không chỉ để hỗ trợ về mặt vật chất, mà còn để cùng nhau tạo ra một di sản cho ngành du lịch nông nghiệp Việt Nam.
              <br /><br />
              <strong style={{ color: "#EDE0C4", fontStyle: "normal" }}>Phạm Thanh Tùng</strong>
              <br />
              <span style={{ fontSize: "12px", letterSpacing: "0.1em", fontStyle: "normal", textTransform: "uppercase", color: "#C49A28" }}>Nhà Sáng Lập Xuyên Việt Farmstay</span>
            </motion.div>

            {/* Nhóm 1: Đón đoàn */}
            <div style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <XMark size={20} />
                <h3 style={{ ...sectionTitle, fontSize: "1.3rem" }}>Nhóm 1 · Tài Trợ Đón Đoàn</h3>
              </div>
              <p style={{ color: "rgba(212,200,164,0.65)", fontFamily: "var(--font-nunito)", fontSize: "14px", marginBottom: "2rem", maxWidth: "680px", lineHeight: 1.9 }}>
                Farmstay và trang trại dọc tuyến đường xuyên Việt từng năm hãy đón tiếp đoàn XVF, ban đầu với tinh thần của những người bạn với nhau. Chúng tôi, đơn vị tổ chức thông thường là chi trả chi phí đầy đủ. Tuy nhiên, nếu các điểm đến muốn là <strong style={{ color: "#EDE0C4" }}>NHÀ TÀI TRỢ</strong> thì hình thức tài trợ có mấy cách như sau:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
                {donDoanPackages.map((pkg, i) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{
                      background: "rgba(13,26,12,0.9)",
                      border: "1px solid rgba(196,154,40,0.25)",
                      borderRadius: "14px",
                      padding: "1.75rem",
                    }}
                  >
                    <h4 style={{ color: "#EDE0C4", fontFamily: "var(--font-alegreya)", fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                      {pkg.name}
                    </h4>
                    <p style={{ color: "rgba(212,200,164,0.65)", fontFamily: "var(--font-nunito)", fontSize: "12px", lineHeight: 1.7, marginBottom: "1rem" }}>
                      {pkg.desc}
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {pkg.benefits.map((b) => (
                        <li key={b} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                          <XMark size={12} style={{ marginTop: "2px", flexShrink: 0 }} />
                          <span style={{ color: "rgba(212,200,164,0.75)", fontFamily: "var(--font-nunito)", fontSize: "12px", lineHeight: 1.6 }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Nhóm 2: Hiện vật */}
            <div style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <XMark size={20} />
                <h3 style={{ ...sectionTitle, fontSize: "1.3rem" }}>Nhóm 2 · Tài Trợ Hiện Vật</h3>
              </div>
              <p style={{ color: "rgba(212,200,164,0.65)", fontFamily: "var(--font-nunito)", fontSize: "13px", marginBottom: "2rem", maxWidth: "600px" }}>
                Tài trợ sản phẩm, hàng hóa phục vụ trực tiếp cho đoàn hành trình Xuyên Việt Farmstay.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
                {hienVatPackages.map((pkg, i) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{
                      background: "rgba(13,26,12,0.9)",
                      border: "1px solid rgba(196,154,40,0.25)",
                      borderRadius: "14px",
                      padding: "1.75rem",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {i === 1 && (
                      <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                        <span style={{
                          background: "rgba(196,154,40,0.2)",
                          color: "#C49A28",
                          fontFamily: "var(--font-nunito)",
                          fontSize: "9px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          padding: "3px 10px",
                          borderRadius: "100px",
                          border: "1px solid rgba(196,154,40,0.35)",
                        }}>
                          PHỔ BIẾN
                        </span>
                      </div>
                    )}
                    <p style={{ ...goldShimmerStyle, fontFamily: "var(--font-alegreya)", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                      {pkg.value}
                    </p>
                    <h4 style={{ color: "#EDE0C4", fontFamily: "var(--font-alegreya)", fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>
                      {pkg.name}
                    </h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {pkg.items.map((item) => (
                        <li key={item} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                          <XMark size={12} style={{ marginTop: "2px", flexShrink: 0 }} />
                          <span style={{ color: "rgba(212,200,164,0.75)", fontFamily: "var(--font-nunito)", fontSize: "12px", lineHeight: 1.6 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Nhóm 3: Hiện kim */}
            <div style={{ marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <XMark size={20} />
                <h3 style={{ ...sectionTitle, fontSize: "1.3rem" }}>Nhóm 3 · Tài Trợ Hiện Kim</h3>
              </div>
              <p style={{ color: "rgba(212,200,164,0.65)", fontFamily: "var(--font-nunito)", fontSize: "13px", marginBottom: "2rem", maxWidth: "600px" }}>
                Tài trợ tài chính trực tiếp cho chi phí vận hành hành trình Xuyên Việt Farmstay 2025.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
                {hienKimPackages.map((pkg, i) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{
                      background: "rgba(13,26,12,0.9)",
                      border: "1px solid rgba(196,154,40,0.25)",
                      borderRadius: "14px",
                      padding: "1.75rem",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {i === 1 && (
                      <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                        <span style={{
                          background: "rgba(196,154,40,0.2)",
                          color: "#C49A28",
                          fontFamily: "var(--font-nunito)",
                          fontSize: "9px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          padding: "3px 10px",
                          borderRadius: "100px",
                          border: "1px solid rgba(196,154,40,0.35)",
                        }}>
                          PHỔ BIẾN
                        </span>
                      </div>
                    )}
                    <p style={{ ...goldShimmerStyle, fontFamily: "var(--font-alegreya)", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                      {pkg.value}
                    </p>
                    <h4 style={{ color: "#EDE0C4", fontFamily: "var(--font-alegreya)", fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem" }}>
                      {pkg.name}
                    </h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {pkg.items.map((item) => (
                        <li key={item} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                          <XMark size={12} style={{ marginTop: "2px", flexShrink: 0 }} />
                          <span style={{ color: "rgba(212,200,164,0.75)", fontFamily: "var(--font-nunito)", fontSize: "12px", lineHeight: 1.6 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                textAlign: "center",
                padding: "3rem",
                background: "rgba(13,26,12,0.8)",
                border: "1px solid rgba(196,154,40,0.3)",
                borderRadius: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                <LogoWhite height={64} />
              </div>
              <h3 style={{ ...sectionTitle, fontSize: "1.4rem", textAlign: "center", marginBottom: "0.5rem" }}>Liên Hệ Để Tài Trợ</h3>
              <p style={{ color: "rgba(212,200,164,0.7)", fontFamily: "var(--font-nunito)", fontSize: "13px", maxWidth: "520px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
                Mọi thắc mắc và đăng ký thành <strong style={{ color: "#EDE0C4" }}>NHÀ TÀI TRỢ</strong> vui lòng liên hệ trực tiếp qua trang Liên Hệ hoặc số điện thoại BTC: <strong style={{ color: "#C49A28" }}>0333 889 873</strong>
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <XuyenVietBtn href="/lien-he" style={{ background: "#C49A28", color: "#0A1208" }} />
                <Link
                  href="/xuyen-viet-farmstay"
                  className="xvf25-btn-ghost"
                  style={{
                    color: "#EDE0C4",
                    fontFamily: "var(--font-nunito)",
                    fontWeight: 600,
                    fontSize: "12px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    padding: "14px 32px",
                    borderRadius: "6px",
                    border: "1px solid rgba(196,154,40,0.5)",
                    cursor: "pointer",
                    display: "inline-block",
                    textDecoration: "none",
                  }}
                >
                  ← Về Trang XVF
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ BOTTOM CTA ══ */}
        <section className="xvf-pattern-diamonds-gold" style={{ padding: "6rem 1.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.06, pointerEvents: "none" }}>
            <XMark size={360} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
              <LogoWordmark height={40} />
            </div>
            <p style={sectionLabel}>Hành Trình Tiếp Theo</p>
            <h2 style={{ ...sectionTitle, fontSize: "clamp(1.8rem, 3vw, 3rem)", marginBottom: "1rem" }}>
              Xuyên Việt Farmstay 2026
              <br />
              <span style={goldShimmerStyle}>Đang Mở Đăng Ký</span>
            </h2>
            <div style={dividerStyle} />
            <p style={{ color: "rgba(212,200,164,0.7)", fontFamily: "var(--font-nunito)", fontSize: "14px", maxWidth: "480px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
              Lần 4 của hành trình Xuyên Việt Farmstay. Hãy là một phần của lịch sử ngành du lịch nông nghiệp Việt Nam.
            </p>
            <XuyenVietBtn href="/xuyen-viet-farmstay/2026" style={{ fontSize: "13px", padding: "16px 44px" }} />
          </motion.div>
        </section>
      </div>
    </>
  );
}
