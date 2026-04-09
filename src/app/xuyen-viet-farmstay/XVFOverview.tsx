"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const goldShimmerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg,#6A4C10 0%,#A07820 20%,#C49A28 35%,#D4B050 50%,#C49A28 65%,#A07820 80%,#6A4C10 100%)",
  backgroundSize: "300% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "gold-shimmer 5s linear infinite",
};

const seasons = [
  {
    year: "2023",
    badge: "HOÀN THÀNH",
    badgeColor: "green" as const,
    route: "TP.HCM → Đà Nẵng → Hà Nội",
    desc: "Hành trình đầu tiên — khởi nguồn của phong trào farmstay xuyên Việt. Lần đầu tiên kết nối chủ farm từ Nam ra Bắc.",
    href: "/xuyen-viet-farmstay/2023",
    stats: ["Lần đầu tiên", "Nam → Bắc"],
    cta: false,
  },
  {
    year: "2024",
    badge: "HOÀN THÀNH",
    badgeColor: "green" as const,
    route: "Hà Nội → TP.HCM",
    desc: "Hành trình thứ hai — mở rộng kết nối. Đoàn xuất phát từ Hà Nội hành trình về phương Nam, gặp gỡ thêm nhiều chủ farm và nhà đầu tư.",
    href: "/xuyen-viet-farmstay/2024",
    stats: ["15 ngày", "Bắc → Nam"],
    cta: false,
  },
  {
    year: "2025",
    badge: "HOÀN THÀNH",
    badgeColor: "green" as const,
    route: "QL1A · 15 ngày · 35 điểm đón",
    desc: "Hành trình quy mô nhất — đi theo Quốc lộ 1A, ghé 35 farm và farmstay trên toàn quốc. Câu lạc bộ Du Lịch Nông Nghiệp Việt Nam được thành lập.",
    href: "/xuyen-viet-farmstay/2025",
    stats: ["35 điểm đón", "15 ngày"],
    cta: false,
  },
  {
    year: "2026",
    badge: "ĐANG MỞ ĐĂNG KÝ",
    badgeColor: "gold" as const,
    route: "Lộ trình sắp được công bố",
    desc: "Lần 4 — hành trình của những người đã sẵn sàng. Đăng ký quan tâm để nhận thông tin ưu tiên trước khi mở chính thức.",
    href: "/xuyen-viet-farmstay/2026",
    stats: ["Lần 4", "Đang lên kế hoạch"],
    cta: true,
  },
];

const badgeStyles = {
  green: {
    background: "rgba(40,120,60,0.3)",
    border: "1px solid rgba(40,150,70,0.5)",
    color: "#6ee87a",
  },
  gold: {
    background: "rgba(196,154,40,0.2)",
    border: "1px solid rgba(196,154,40,0.6)",
    color: "#D4B050",
  },
};

export default function XVFOverview() {
  return (
    <>
      <style>{`
        @keyframes gold-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
      `}</style>

      <div
        style={{
          marginTop: "72px",
          background: "linear-gradient(180deg, #060E05 0%, #0A1208 40%, #0D1A0C 100%)",
          minHeight: "100vh",
        }}
      >
        {/* HERO */}
        <section style={{ padding: "6rem 1.5rem 4rem", textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              color: "#C49A28",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "var(--font-nunito)",
              marginBottom: "1.5rem",
            }}
          >
            HÀNH TRÌNH FARMSTAY · TOÀN QUỐC
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              ...goldShimmerStyle,
              fontFamily: "var(--font-alegreya)",
              fontSize: "clamp(2.5rem,5vw,4.5rem)",
              fontWeight: 700,
              marginBottom: "1.5rem",
            }}
          >
            Xuyên Việt Farmstay
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              width: "3rem",
              height: "2px",
              background: "#C49A28",
              margin: "0 auto 1.5rem",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              color: "#D4C8A4",
              fontFamily: "var(--font-alegreya)",
              fontStyle: "italic",
              fontSize: "1.2rem",
              marginBottom: "2.5rem",
            }}
          >
            Kết nối · Học hỏi · Truyền cảm hứng · Giao thương
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              href="/xuyen-viet-farmstay/2026"
              style={{
                display: "inline-block",
                background: "#C49A28",
                color: "#0A1208",
                fontFamily: "var(--font-nunito)",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "14px 32px",
                borderRadius: "6px",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              Đăng Ký XVF 2026 →
            </Link>
          </motion.div>
        </section>

        {/* STATS BAR */}
        <section
          style={{
            background: "rgba(13,26,12,0.8)",
            borderTop: "1px solid rgba(196,154,40,0.2)",
            borderBottom: "1px solid rgba(196,154,40,0.2)",
            padding: "2rem 0",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              textAlign: "center",
            }}
          >
            {[
              { num: "4 Mùa", label: "Hành Trình Liên Tiếp" },
              { num: "35+", label: "Farm & Farmstay Tham Quan" },
              { num: "16+", label: "Tỉnh Thành Trên Cả Nước" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "1rem",
                  borderRight: i < 2 ? "1px solid rgba(196,154,40,0.2)" : "none",
                }}
              >
                <div
                  style={{
                    ...goldShimmerStyle,
                    fontFamily: "var(--font-alegreya)",
                    fontSize: "2.2rem",
                    fontWeight: 700,
                    marginBottom: "0.25rem",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    color: "#D4C8A4",
                    fontFamily: "var(--font-nunito)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section style={{ maxWidth: "860px", margin: "0 auto", padding: "5rem 1.5rem" }}>
          {/* Section title */}
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                color: "#C49A28",
                fontSize: "9px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontFamily: "var(--font-nunito)",
                marginBottom: "0.75rem",
              }}
            >
              4 MÙA HÀNH TRÌNH
            </p>
            <h2
              style={{
                fontFamily: "var(--font-alegreya)",
                color: "#EDE0C4",
                fontSize: "clamp(1.8rem,3vw,2.8rem)",
                fontWeight: 700,
              }}
            >
              Từ Ý Tưởng Đến Phong Trào
            </h2>
          </div>

          {/* Timeline items */}
          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: "20px",
                top: 0,
                bottom: 0,
                width: "1px",
                borderLeft: "2px dashed rgba(196,154,40,0.4)",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {seasons.map((s, i) => (
                <motion.div
                  key={s.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: "40px",
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: s.badgeColor === "gold" ? "#C49A28" : "#2D7A40",
                        border: "2px solid rgba(196,154,40,0.6)",
                        boxShadow: s.badgeColor === "gold" ? "0 0 12px rgba(196,154,40,0.5)" : "none",
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    style={{
                      flex: 1,
                      background: "rgba(13,26,12,0.6)",
                      border: `1px solid ${s.badgeColor === "gold" ? "rgba(196,154,40,0.3)" : "rgba(196,154,40,0.12)"}`,
                      borderRadius: "12px",
                      padding: "1.5rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                      <span
                        style={{
                          ...goldShimmerStyle,
                          fontFamily: "var(--font-alegreya)",
                          fontSize: "1.8rem",
                          fontWeight: 700,
                        }}
                      >
                        {s.year}
                      </span>
                      <span
                        style={{
                          ...badgeStyles[s.badgeColor],
                          fontFamily: "var(--font-nunito)",
                          fontSize: "9px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          padding: "3px 10px",
                          borderRadius: "100px",
                        }}
                      >
                        {s.badge}
                      </span>
                    </div>

                    <p
                      style={{
                        color: "#C49A28",
                        fontFamily: "var(--font-nunito)",
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {s.route}
                    </p>

                    <p
                      style={{
                        color: "#D4C8A4",
                        fontFamily: "var(--font-nunito)",
                        fontSize: "14px",
                        lineHeight: 1.7,
                        marginBottom: "1rem",
                      }}
                    >
                      {s.desc}
                    </p>

                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: s.cta ? "1rem" : 0 }}>
                      {s.stats.map((st) => (
                        <span
                          key={st}
                          style={{
                            background: "rgba(196,154,40,0.1)",
                            border: "1px solid rgba(196,154,40,0.2)",
                            color: "#EDE0C4",
                            fontFamily: "var(--font-nunito)",
                            fontSize: "10px",
                            letterSpacing: "0.1em",
                            padding: "3px 10px",
                            borderRadius: "100px",
                          }}
                        >
                          {st}
                        </span>
                      ))}
                    </div>

                    {s.cta && (
                      <Link
                        href={s.href}
                        style={{
                          display: "inline-block",
                          background: "#C49A28",
                          color: "#0A1208",
                          fontFamily: "var(--font-nunito)",
                          fontWeight: 700,
                          fontSize: "11px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          padding: "10px 24px",
                          borderRadius: "6px",
                          textDecoration: "none",
                        }}
                      >
                        Đăng Ký Quan Tâm →
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer mini */}
        <footer
          style={{
            borderTop: "1px solid rgba(196,154,40,0.15)",
            padding: "2rem 1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#D4C8A4",
              fontFamily: "var(--font-nunito)",
              fontSize: "12px",
              letterSpacing: "0.1em",
            }}
          >
            © Phạm Thanh Tùng · Nhà Hoạch Định Farmstay Việt Nam ·{" "}
            <Link href="/" style={{ color: "#C49A28", textDecoration: "none" }}>
              nhahoachdinh.com
            </Link>
          </p>
        </footer>
      </div>
    </>
  );
}
