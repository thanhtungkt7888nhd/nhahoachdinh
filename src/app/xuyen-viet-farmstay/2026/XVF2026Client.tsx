"use client";

import { useState, useRef } from "react";
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

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(10,18,8,0.8)",
  border: "1px solid rgba(196,154,40,0.3)",
  borderRadius: "8px",
  padding: "12px 16px",
  color: "#EDE0C4",
  fontFamily: "var(--font-nunito)",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const goals = [
  { num: "01", title: "Truyền cảm hứng toàn quốc", desc: "Lan tỏa phong trào farmstay bền vững từ Nam ra Bắc" },
  { num: "02", title: "Học hỏi thực tiễn", desc: "Tham quan và học từ các chủ farm hàng đầu Việt Nam" },
  { num: "03", title: "Kết nối giao thương", desc: "Mở rộng mạng lưới đối tác và cơ hội hợp tác đầu tư" },
  { num: "04", title: "Chiến lược từ chuyên gia", desc: "Nhận insights trực tiếp từ Nhà Hoạch Định Phạm Thanh Tùng" },
  { num: "05", title: "Truyền thông nông nghiệp", desc: "Tạo làn sóng nội dung về du lịch nông nghiệp Việt Nam" },
  { num: "06", title: "Cơ hội đầu tư BĐS", desc: "Khám phá tiềm năng đầu tư bất động sản du lịch nông nghiệp" },
];

const timelineItems = [
  { year: "2023", badge: "HOÀN THÀNH", badgeColor: "green" as const, desc: "HCM → Hà Nội · Lần đầu tiên" },
  { year: "2024", badge: "HOÀN THÀNH", badgeColor: "green" as const, desc: "Hà Nội → HCM · Mở rộng kết nối" },
  { year: "2025", badge: "HOÀN THÀNH", badgeColor: "green" as const, desc: "QL1A · 15 ngày · 35 điểm đón" },
  { year: "2026", badge: "ĐANG MỞ", badgeColor: "gold" as const, desc: "Lần 4 · Sắp công bố lộ trình" },
];

export default function XVF2026Client() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", role: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  const scrollToTimeline = () => timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.phone || !form.email || !form.role) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/xvf-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Đã xảy ra lỗi, vui lòng thử lại.");
      }
    } catch {
      setError("Đã xảy ra lỗi, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes gold-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 12px rgba(196,154,40,0.3); }
          50% { box-shadow: 0 0 24px rgba(196,154,40,0.6); }
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
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "var(--font-nunito)",
              marginBottom: "1.5rem",
            }}
          >
            HÀNH TRÌNH · LẦN 4 · 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              ...goldShimmerStyle,
              fontFamily: "'ClashGrotesk-Bold', sans-serif",
              fontSize: "clamp(2.5rem,5vw,4rem)",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Xuyên Việt Farmstay 2026
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              width: "2rem",
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
              fontSize: "1.1rem",
              marginBottom: "1.5rem",
            }}
          >
            Du lịch nông nghiệp · Kết nối giao thương · Truyền cảm hứng toàn quốc
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ marginBottom: "2rem" }}
          >
            <span
              style={{
                display: "inline-block",
                border: "1px solid #C49A28",
                color: "#D4B050",
                fontFamily: "var(--font-nunito)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "6px 16px",
                borderRadius: "100px",
              }}
            >
              ĐĂNG KÝ SỚM — NHẬN THÔNG TIN ƯU TIÊN
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <button
              onClick={scrollToForm}
              style={{
                background: "#C49A28",
                color: "#0A1208",
                fontFamily: "var(--font-nunito)",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "14px 32px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Đăng Ký Quan Tâm
            </button>
            <button
              onClick={scrollToTimeline}
              style={{
                background: "transparent",
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
              }}
            >
              Tìm Hiểu Thêm
            </button>
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
              { num: "35+", label: "Farm & Farmstay" },
              { num: "16+", label: "Tỉnh Thành" },
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
        <section
          id="timeline"
          ref={timelineRef}
          style={{ maxWidth: "1000px", margin: "0 auto", padding: "5rem 1.5rem" }}
        >
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
                fontFamily: "'ClashGrotesk-Bold', sans-serif",
                color: "#EDE0C4",
                fontSize: "clamp(1.6rem,2.5vw,2.4rem)",
                fontWeight: 700,
              }}
            >
              Lịch Sử Xuyên Việt Farmstay
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {timelineItems.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: "rgba(13,26,12,0.7)",
                  border: t.badgeColor === "gold"
                    ? "1px solid rgba(196,154,40,0.5)"
                    : "1px solid rgba(196,154,40,0.15)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  textAlign: "center",
                  animation: t.badgeColor === "gold" ? "glow-pulse 2s ease-in-out infinite" : "none",
                }}
              >
                <div style={{ ...goldShimmerStyle, fontFamily: "var(--font-alegreya)", fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  {t.year}
                </div>
                <span
                  style={{
                    display: "inline-block",
                    background: t.badgeColor === "gold" ? "rgba(196,154,40,0.2)" : "rgba(40,120,60,0.3)",
                    border: t.badgeColor === "gold" ? "1px solid rgba(196,154,40,0.6)" : "1px solid rgba(40,150,70,0.5)",
                    color: t.badgeColor === "gold" ? "#D4B050" : "#6ee87a",
                    fontFamily: "var(--font-nunito)",
                    fontSize: "8px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    borderRadius: "100px",
                    marginBottom: "0.75rem",
                  }}
                >
                  {t.badge}
                </span>
                <p
                  style={{
                    color: "#D4C8A4",
                    fontFamily: "var(--font-nunito)",
                    fontSize: "12px",
                    lineHeight: 1.6,
                    marginTop: "0.5rem",
                  }}
                >
                  {t.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MỤC TIÊU */}
        <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
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
              6 MỤC TIÊU
            </p>
            <h2
              style={{
                fontFamily: "var(--font-alegreya)",
                color: "#EDE0C4",
                fontSize: "clamp(1.6rem,2.5vw,2.4rem)",
                fontWeight: 700,
              }}
            >
              Những Gì Bạn Nhận Được
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {goals.map((g, i) => (
              <motion.div
                key={g.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  background: "#0D1A0C",
                  border: "1px solid rgba(196,154,40,0.15)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  transition: "border-color 0.2s",
                  cursor: "default",
                }}
                whileHover={{ borderColor: "rgba(196,154,40,0.4)" } as never}
              >
                <div
                  style={{
                    ...goldShimmerStyle,
                    fontFamily: "var(--font-alegreya)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                  }}
                >
                  {g.num}
                </div>
                <h3
                  style={{
                    color: "#EDE0C4",
                    fontFamily: "var(--font-alegreya)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  {g.title}
                </h3>
                <p
                  style={{
                    color: "#D4C8A4",
                    fontFamily: "var(--font-nunito)",
                    fontSize: "13px",
                    lineHeight: 1.6,
                  }}
                >
                  {g.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FORM */}
        <section
          id="dang-ky"
          style={{ padding: "2rem 1.5rem 6rem" }}
        >
          <div
            ref={formRef}
            style={{
              maxWidth: "560px",
              margin: "0 auto",
              background: "rgba(13,26,12,0.9)",
              border: "1px solid rgba(196,154,40,0.25)",
              borderRadius: "16px",
              padding: "2.5rem",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
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
                ĐĂNG KÝ QUAN TÂM
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-alegreya)",
                  color: "#EDE0C4",
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                }}
              >
                Nhận Thông Tin Ưu Tiên
              </h2>
              <p
                style={{
                  color: "#D4C8A4",
                  fontFamily: "var(--font-nunito)",
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              >
                Điền thông tin để được thông báo ngay khi chương trình mở chính thức
              </p>
            </div>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <p style={{ color: "#D4B050", fontFamily: "var(--font-nunito)", fontSize: "15px", fontWeight: 600 }}>
                  ✓ Đã nhận thông tin! Chúng tôi sẽ liên hệ sớm.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontSize: "12px", letterSpacing: "0.1em", display: "block", marginBottom: "6px" }}>
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div>
                  <label style={{ color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontSize: "12px", letterSpacing: "0.1em", display: "block", marginBottom: "6px" }}>
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle}
                    placeholder="0912 345 678"
                  />
                </div>

                <div>
                  <label style={{ color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontSize: "12px", letterSpacing: "0.1em", display: "block", marginBottom: "6px" }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label style={{ color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontSize: "12px", letterSpacing: "0.1em", display: "block", marginBottom: "6px" }}>
                    Bạn là? *
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    style={{ ...inputStyle, appearance: "none" }}
                  >
                    <option value="">— Chọn vai trò —</option>
                    <option value="Chủ farm / farmstay">Chủ farm / farmstay</option>
                    <option value="Nhà đầu tư nông nghiệp">Nhà đầu tư nông nghiệp</option>
                    <option value="Người muốn học & trải nghiệm">Người muốn học &amp; trải nghiệm</option>
                    <option value="Đối tác / nhà tài trợ">Đối tác / nhà tài trợ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                {error && (
                  <p style={{ color: "#ff6b6b", fontFamily: "var(--font-nunito)", fontSize: "13px" }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: loading ? "rgba(196,154,40,0.5)" : "#C49A28",
                    color: "#0A1208",
                    fontFamily: "var(--font-nunito)",
                    fontWeight: 700,
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "14px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    marginTop: "0.5rem",
                  }}
                >
                  {loading ? "Đang gửi..." : "GỬI ĐĂNG KÝ QUAN TÂM"}
                </button>

                <p
                  style={{
                    color: "#D4C8A4",
                    fontFamily: "var(--font-nunito)",
                    fontSize: "11px",
                    textAlign: "center",
                    lineHeight: 1.6,
                  }}
                >
                  🔒 Thông tin của bạn được bảo mật · Chỉ dùng để thông báo về chương trình
                </p>
              </form>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
