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

export type JournalStop = {
  name: string;
  province: string;
  desc: string;
  image?: string; // path to image, e.g. "/images/xvf-2025-stop-01.jpg"
  tags?: string[];
};

export type JournalConfig = {
  year: string;
  edition: string; // "Lần 1", "Lần 2", ...
  route: string;
  dateRange?: string; // e.g. "15 ngày, tháng 3/2025"
  stats: { num: string; label: string }[];
  summary: string;
  stops: JournalStop[];
  prevYear?: { year: string; href: string };
  nextYear?: { year: string; href: string };
};

function SectionDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "2rem 0", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(196,154,40,0.4))" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-xvf-icon.png" alt="" width={28} height={28} style={{ opacity: 0.4, objectFit: "contain", flexShrink: 0 }} />
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(196,154,40,0.4))" }} />
    </div>
  );
}

export default function XVFJournalClient({ config }: { config: JournalConfig }) {
  const { year, edition, route, dateRange, stats, summary, stops, prevYear, nextYear } = config;

  return (
    <>
      <style>{`
        @keyframes gold-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
        .xvf-page-bg {
          background-color: #0A1208;
          background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='24,2 46,24 24,46 2,24' fill='none' stroke='rgba(196,154,40,0.12)' stroke-width='0.8'/%3E%3Cpolygon points='24,10 38,24 24,38 10,24' fill='none' stroke='rgba(196,154,40,0.08)' stroke-width='0.8'/%3E%3Cpolygon points='24,18 30,24 24,30 18,24' fill='none' stroke='rgba(196,154,40,0.05)' stroke-width='0.8'/%3E%3Ccircle cx='24' cy='24' r='1' fill='rgba(196,154,40,0.1)'/%3E%3C/svg%3E");
          background-size: 48px 48px;
        }
        .xvf-pattern-squares {
          background-image: url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1' y='1' width='42' height='42' fill='none' stroke='rgba(255,255,255,0.055)' stroke-width='0.8'/%3E%3Crect x='7' y='7' width='30' height='30' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='0.8'/%3E%3Crect x='14' y='14' width='16' height='16' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='0.8'/%3E%3Ccircle cx='22' cy='22' r='1.2' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E");
          background-size: 44px 44px;
        }
      `}</style>

      <div
        className="xvf-page-bg"
        style={{
          marginTop: "72px",
          minHeight: "100vh",
        }}
      >
        {/* ══ HERO ══ */}
        <section
          className="xvf-pattern-squares"
          style={{ padding: "5rem 1.5rem 3.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}
        >
          <style>{`
            .xvf-pattern-squares {
              background-image: url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1' y='1' width='42' height='42' fill='none' stroke='rgba(255,255,255,0.055)' stroke-width='0.8'/%3E%3Crect x='7' y='7' width='30' height='30' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='0.8'/%3E%3Crect x='14' y='14' width='16' height='16' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='0.8'/%3E%3Ccircle cx='22' cy='22' r='1.2' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E");
              background-size: 44px 44px;
            }
          `}</style>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-xvf-horizontal-white.png" alt="Xuyên Việt Farmstay" height={50} style={{ objectFit: "contain" }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              color: "#C49A28",
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "var(--font-nunito)",
              marginBottom: "1rem",
            }}
          >
            HÀNH TRÌNH · {edition} · {year}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              ...goldShimmerStyle,
              fontFamily: "'ClashGrotesk-Bold', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            Xuyên Việt Farmstay {year}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              color: "#D4C8A4",
              fontFamily: "var(--font-nunito)",
              fontSize: "13px",
              marginBottom: "0.5rem",
            }}
          >
            {route}
          </motion.p>
          {dateRange && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                color: "rgba(212,200,164,0.5)",
                fontFamily: "var(--font-nunito)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                marginBottom: "2rem",
              }}
            >
              {dateRange}
            </motion.p>
          )}
        </section>

        {/* ══ STATS BAR ══ */}
        <div
          style={{
            background: "rgba(13,26,12,0.85)",
            borderTop: "1px solid rgba(196,154,40,0.2)",
            borderBottom: "1px solid rgba(196,154,40,0.2)",
            padding: "1.5rem 1rem",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
              textAlign: "center",
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{ padding: "0.75rem", borderRight: i < stats.length - 1 ? "1px solid rgba(196,154,40,0.15)" : "none" }}>
                <div style={{ ...goldShimmerStyle, fontFamily: "var(--font-alegreya)", fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.15rem" }}>
                  {s.num}
                </div>
                <div style={{ color: "#D4C8A4", fontFamily: "var(--font-nunito)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ TÓM TẮT HÀNH TRÌNH ══ */}
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "3.5rem 1.5rem 0" }}>
          <p style={{
            fontFamily: "var(--font-alegreya)",
            fontStyle: "italic",
            fontSize: "1.05rem",
            color: "#D4C8A4",
            lineHeight: 1.9,
            textAlign: "center",
          }}>
            {summary}
          </p>
        </div>

        {/* ══ CÁC ĐIỂM DỪNG ══ */}
        {stops.length > 0 && (
          <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 1.5rem" }}>
            <SectionDivider />

            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ color: "#C49A28", fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "var(--font-nunito)", marginBottom: "0.5rem" }}>
                NHẬT KÝ HÀNH TRÌNH
              </p>
              <h2 style={{ fontFamily: "var(--font-alegreya)", color: "#EDE0C4", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700 }}>
                Những Nơi Chúng Tôi Đã Đi Qua
              </h2>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}>
              {stops.map((stop, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  style={{
                    background: "rgba(13,26,12,0.8)",
                    border: "1px solid rgba(196,154,40,0.18)",
                    borderRadius: "14px",
                    overflow: "hidden",
                  }}
                >
                  {/* Ảnh */}
                  {stop.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={stop.image}
                      alt={stop.name}
                      style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
                    />
                  ) : (
                    <div style={{
                      width: "100%",
                      height: "180px",
                      background: "rgba(196,154,40,0.06)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      borderBottom: "1px solid rgba(196,154,40,0.12)",
                    }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/logo-xvf-icon.png" alt="" width={36} height={36} style={{ opacity: 0.2, objectFit: "contain" }} />
                      <span style={{ color: "rgba(196,154,40,0.3)", fontFamily: "var(--font-nunito)", fontSize: "10px", letterSpacing: "0.15em" }}>
                        ẢNH SẮP CÓ
                      </span>
                    </div>
                  )}

                  {/* Nội dung */}
                  <div style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                      <h3 style={{ color: "#EDE0C4", fontFamily: "var(--font-alegreya)", fontSize: "1rem", fontWeight: 700, margin: 0 }}>
                        {stop.name}
                      </h3>
                      <span style={{
                        color: "#C49A28",
                        fontFamily: "var(--font-nunito)",
                        fontSize: "9px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        background: "rgba(196,154,40,0.1)",
                        padding: "2px 8px",
                        borderRadius: "100px",
                        flexShrink: 0,
                        marginLeft: "0.5rem",
                      }}>
                        {stop.province}
                      </span>
                    </div>
                    <p style={{ color: "rgba(212,200,164,0.7)", fontFamily: "var(--font-nunito)", fontSize: "12px", lineHeight: 1.7, margin: "0 0 0.75rem" }}>
                      {stop.desc}
                    </p>
                    {stop.tags && stop.tags.length > 0 && (
                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                        {stop.tags.map((tag) => (
                          <span key={tag} style={{
                            color: "rgba(196,154,40,0.6)",
                            fontFamily: "var(--font-nunito)",
                            fontSize: "9px",
                            letterSpacing: "0.1em",
                            border: "1px solid rgba(196,154,40,0.2)",
                            padding: "2px 8px",
                            borderRadius: "100px",
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Placeholder khi chưa có nội dung */}
        {stops.length === 0 && (
          <div style={{ maxWidth: "600px", margin: "4rem auto", padding: "0 1.5rem", textAlign: "center" }}>
            <SectionDivider />
            <p style={{ color: "rgba(212,200,164,0.4)", fontFamily: "var(--font-alegreya)", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.8 }}>
              Nội dung hành trình đang được biên soạn từ Cẩm Nang {year}.<br />
              Sẽ có ảnh và mô tả chi tiết từng điểm đến.
            </p>
          </div>
        )}

        {/* ══ ĐIỀU HƯỚNG NĂM ══ */}
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.5rem 5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {prevYear ? (
            <Link href={prevYear.href} style={{
              color: "rgba(196,154,40,0.7)",
              fontFamily: "var(--font-nunito)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              ← {prevYear.year}
            </Link>
          ) : <div />}

          <Link href="/xuyen-viet-farmstay" style={{
            color: "#C49A28",
            fontFamily: "var(--font-nunito)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "1px solid rgba(196,154,40,0.3)",
            padding: "8px 20px",
            borderRadius: "100px",
          }}>
            Về Trang XVF
          </Link>

          {nextYear ? (
            <Link href={nextYear.href} style={{
              color: "rgba(196,154,40,0.7)",
              fontFamily: "var(--font-nunito)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}>
              {nextYear.year} →
            </Link>
          ) : <div />}
        </div>
      </div>
    </>
  );
}
