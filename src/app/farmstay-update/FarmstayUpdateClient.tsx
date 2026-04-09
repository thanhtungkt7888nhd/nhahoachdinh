"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/* ─── Color tokens ─── */
const C = {
  bg: "#081A08",
  bgCard: "rgba(12,32,10,0.92)",
  green: "#4CAF50",
  greenDark: "#2E7D32",
  orange: "#E64A19",
  orangeLight: "#FF7043",
  yellow: "#FFC107",
  cream: "#F0EAD6",
  creamMuted: "rgba(240,234,214,0.65)",
  border: "rgba(76,175,80,0.2)",
  borderOrange: "rgba(230,74,25,0.35)",
};

const heading: React.CSSProperties = {
  fontFamily: "var(--font-alegreya)",
  color: C.cream,
  fontWeight: 700,
};

const label: React.CSSProperties = {
  fontFamily: "var(--font-nunito)",
  fontSize: "9px",
  letterSpacing: "0.35em",
  textTransform: "uppercase" as const,
  color: C.green,
  display: "block",
  marginBottom: "0.6rem",
};

const body: React.CSSProperties = {
  fontFamily: "var(--font-nunito)",
  color: C.creamMuted,
  fontSize: "13px",
  lineHeight: 1.8,
};

/* ─── Divider ─── */
function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", padding: "2.5rem 0", maxWidth: "500px", margin: "0 auto" }}>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${C.green}44)` }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/LOGO Farmstay Update 01.png" alt="" width={24} height={24} style={{ opacity: 0.35, objectFit: "contain" }} />
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${C.green}44)` }} />
    </div>
  );
}

/* ─── Badge ─── */
function Badge({ children, color = "green" }: { children: React.ReactNode; color?: "green" | "orange" | "yellow" }) {
  const bg = color === "green" ? "rgba(76,175,80,0.15)" : color === "orange" ? "rgba(230,74,25,0.15)" : "rgba(255,193,7,0.15)";
  const fg = color === "green" ? C.green : color === "orange" ? C.orangeLight : C.yellow;
  const border = color === "green" ? "rgba(76,175,80,0.3)" : color === "orange" ? "rgba(230,74,25,0.3)" : "rgba(255,193,7,0.3)";
  return (
    <span style={{ background: bg, color: fg, border: `1px solid ${border}`, fontFamily: "var(--font-nunito)", fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "100px", display: "inline-block" }}>
      {children}
    </span>
  );
}

const GOALS = [
  { num: "01", title: "Cập Nhật Tri Thức", desc: "Kiến thức chuyên sâu về luật đất đai, xu hướng thị trường, farmstay từ chuyên gia hàng đầu." },
  { num: "02", title: "Kết Nối Giao Thương", desc: "Gặp gỡ chủ farmstay, nhà đầu tư, chuyên gia — mở rộng quan hệ và cơ hội hợp tác." },
  { num: "03", title: "Học Hỏi Thực Tiễn", desc: "Tham quan Sản Việt Farm, rút ra bài học thực chiến cho mô hình của chính bạn." },
  { num: "04", title: "Quảng Bá Sản Phẩm", desc: "Giới thiệu farmstay đến cộng đồng du lịch nông nghiệp toàn quốc." },
  { num: "05", title: "Truyền Cảm Hứng", desc: "Lan tỏa năng lượng tích cực, tinh thần đổi mới và khởi nghiệp trong ngành." },
  { num: "06", title: "Cơ Hội Đầu Tư", desc: "Gặp nhà đầu tư tiềm năng, mở rộng quy mô và liên kết chuỗi du lịch nông nghiệp." },
];

const HISTORY = [
  { year: "2020", title: "Gặp Mặt Farmstay Việt Nam", desc: "25/11/2020 tại Greenfield Farmstay, Vũng Tàu — bước chân đầu tiên kết nối cộng đồng farmstay." },
  { year: "2022", title: "Offline Toàn Quốc Lần 1", desc: "15-16/10/2022 tại Phan Gia Xanh Garden, Khánh Hòa — quy mô toàn quốc đầu tiên." },
  { year: "2023", title: "Kết Nối 3 Miền", desc: "15-16/3/2023 — mở rộng kết nối giữa ba miền Bắc–Trung–Nam." },
  { year: "2023", title: "Cộng Đồng Du Lịch NN Lần 3", desc: "20-22/12/2023 — quy mô lớn nhất từ trước đến nay, gắn kết cộng đồng farmstay cả nước." },
  { year: "2025", title: "Farmstay Update 2025", desc: "03-05/01/2025 tại Sản Việt Farm — 70+ khách mời, 8 diễn giả hàng đầu. Cột mốc lịch sử ngành." },
  { year: "2026", title: "Farmstay Update 2026", desc: "13-15/03/2026 tại Sản Việt Farm — Lớn hơn, chuyên nghiệp hơn và nhiều giá trị hơn.", active: true },
];

const SCHEDULE_2026 = [
  {
    day: "Ngày Tập Trung",
    date: "Thứ Sáu · 13/03",
    items: [
      { time: "Sáng", act: "Đón thành viên tham gia, hội quân tại Sản Việt Farm" },
      { time: "Trưa", act: "Dùng bữa trưa tập thể" },
      { time: "Chiều", act: "Chuyên đề khởi động — Mr. Nguyễn Minh Thành mổ xẻ quá trình hình thành Sản Việt Farm" },
      { time: "Tối", act: "Bữa tối Welcome, thiết lập mạng lưới làm quen, nhận khu vực lưu trú" },
    ],
  },
  {
    day: "Ngày Thứ Nhất",
    date: "Thứ Bảy · 14/03",
    items: [
      { time: "08:00", act: "Chuyên đề 1 — Doanh nghiệp dẫn dắt kinh tế địa phương bằng mô hình du lịch nông nghiệp" },
      { time: "10:00", act: "Chuyên đề 2 — Tác động lan tỏa của Farmstay đến giá trị Bất động sản" },
      { time: "13:30", act: "Chuyên đề 3 — Sứ mệnh làm Farmstay trong làng du lịch cộng đồng" },
      { time: "16:00", act: "Chuyên đề 4 — Xuất khẩu văn hóa bằng thương hiệu cá nhân" },
      { time: "19:00", act: "Gala Dinner — Nhạc cụ đồng bào và Diễn xướng văn hóa" },
    ],
  },
  {
    day: "Ngày Thứ Hai",
    date: "Chủ Nhật · 15/03",
    items: [
      { time: "08:00", act: "Chuyên đề 5 — Trà Mi bản địa Việt Nam, giá trị sử dụng và tiềm năng phát triển" },
      { time: "10:00", act: "Chuyên đề 6 — Câu chuyện vĩ đại về Future Coffee Farm" },
      { time: "13:30", act: "Chuyên đề 7 — Cơ hội xuất khẩu nông sản Việt Nam ra toàn cầu" },
      { time: "16:00", act: "Chuyên đề 8 — Pháp lý đất đa mục đích dành cho Farmstay mở rộng" },
      { time: "17:30", act: "Bế mạc · Chụp ảnh lưu niệm · Chia tay" },
    ],
  },
];

const SPEAKERS_2026 = [
  { name: "Phạm Thanh Tùng", role: "Host · Nhà Hoạch Định", topic: "Dẫn Chương Trình", desc: "Phó viện trưởng Viện Kinh tế & Du lịch Nông nghiệp. Founder Defarm, Mastery, HTX Du Lịch NN Việt Nam." },
  { name: "TS. Ngô Kiều Oanh", role: "Nhà sáng lập Trang trại Đồng Quê Ba Vì", topic: "Chuyên Đề 1", desc: "Chuyên gia tư vấn độc lập du lịch nông nghiệp, 40+ năm kinh nghiệm nghiên cứu hệ thống kinh tế." },
  { name: "PGS.TS Nguyễn Minh Ngọc", role: "Chuyên gia BĐS · 20 năm kinh nghiệm", topic: "Chuyên Đề 2", desc: "Tiên phong nghiên cứu BĐS nông nghiệp đa dụng và BĐS sinh thái tại Việt Nam." },
  { name: "MBA Nguyễn Đức Dũng", role: "\"Gã Du Nông\" · Konke Ruộng Farmstay", topic: "Chuyên Đề 3", desc: "Chủ tịch HTX Du Lịch Cộng Đồng Làng Kon Vơng Kia, Phó Chủ tịch Hiệp hội Du lịch Quảng Ngãi." },
  { name: "Phan Nguyên", role: "Founder Sun Media GL, Gia Lai", topic: "Chuyên Đề 4", desc: "20 năm báo chí & truyền thông, Huy chương Vàng quốc gia Happy Vietnam 2024." },
  { name: "TS. Lương Văn Dũng", role: "Giám đốc TT Đa dạng Sinh học · ĐH Đà Lạt", topic: "Chuyên Đề 5", desc: "Nhà thực vật học uy tín, phát hiện quần thể sồi ba cạnh tại VQG Bidoup – Núi Bà." },
  { name: "Nguyễn Văn Tới", role: "Founder Future Coffee Farm, Bảo Lộc", topic: "Chuyên Đề 6", desc: "Tiên phong Fine Robusta Việt Nam, xuất khẩu cà phê sang Nhật Bản, Mỹ, Đức, Bỉ." },
  { name: "Trần Danh Mạnh", role: "CEO FruitShare VietNam", topic: "Chuyên Đề 7", desc: "Chuyên gia xuất khẩu nông sản sang EU và Mỹ, 8+ năm kinh nghiệm trong ngành." },
  { name: "ThS. Trần Công Thủy", role: "Founder ThuyLand.Group", topic: "Chuyên Đề 8", desc: "Chuyên gia pháp lý đất đai, cựu cán bộ Bộ QP và Bộ TN&MT, tiên phong UAV và 3D LIDAR." },
];

export default function FarmstayUpdateClient() {
  return (
    <>
      <style>{`
        @keyframes fsu-shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
        @keyframes fsu-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes fsu-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(230,74,25,0.35), 0 4px 16px rgba(230,74,25,0.2); }
          50% { box-shadow: 0 0 0 6px rgba(230,74,25,0), 0 4px 24px rgba(230,74,25,0.45); }
        }
        .fsu-page-bg {
          background-image: url("/images/PATTERN%20FARMSTAY%20UPDATE%2001.png");
          background-size: cover;
          background-attachment: fixed;
          background-position: center;
        }
        .fsu-pattern-hero {
          background-image: url("/images/PATTERN%20FARMSTAY%20UPDATE%2002.png");
          background-size: cover;
          background-position: center;
        }
        .fsu-green-shimmer {
          background: linear-gradient(90deg,#1B5E20 0%,#388E3C 20%,#66BB6A 40%,#81C784 50%,#66BB6A 60%,#388E3C 80%,#1B5E20 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fsu-shimmer 5s linear infinite;
        }
        .fsu-orange-shimmer {
          background: linear-gradient(90deg,#BF360C 0%,#D84315 20%,#FF5722 40%,#FF8A65 50%,#FF5722 60%,#D84315 80%,#BF360C 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fsu-shimmer 4s linear infinite;
        }
        .fsu-card:hover { border-color: rgba(76,175,80,0.4) !important; transform: translateY(-2px); transition: all 0.25s ease; }
        .fsu-speaker-card:hover { border-color: rgba(230,74,25,0.4) !important; transform: translateY(-2px); transition: all 0.25s ease; }
        .fsu-register-btn {
          display: inline-block;
          background: linear-gradient(135deg, ${C.orange} 0%, #BF360C 100%);
          color: #fff;
          font-family: var(--font-nunito);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 14px 40px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          animation: fsu-glow 2.5s ease-in-out infinite;
        }
        .fsu-register-btn:hover { opacity: 0.9; }
      `}</style>

      <div className="fsu-page-bg" style={{ marginTop: "72px", minHeight: "100vh" }}>

        {/* ══ HERO ══ */}
        <section className="fsu-pattern-hero" style={{ padding: "5rem 1.5rem 4rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/LOGO Farmstay Update 01.png" alt="Farmstay Update" height={90} style={{ objectFit: "contain", filter: "drop-shadow(0 4px 20px rgba(76,175,80,0.25))" }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            style={{ ...label, fontSize: "10px", letterSpacing: "0.3em", marginBottom: "1rem" }}
          >
            SỰ KIỆN THƯỜNG NIÊN · DU LỊCH NÔNG NGHIỆP VIỆT NAM
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="fsu-green-shimmer"
            style={{ ...heading, fontSize: "clamp(2.2rem,5vw,4rem)", marginBottom: "1rem", animation: "fsu-shimmer 5s linear infinite, fsu-pulse 4s ease-in-out infinite" }}
          >
            Farmstay Update
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ color: C.creamMuted, fontFamily: "var(--font-alegreya)", fontStyle: "italic", fontSize: "clamp(0.95rem,1.8vw,1.2rem)", maxWidth: "640px", margin: "0 auto 2rem", lineHeight: 1.7 }}
          >
            Nơi hội tụ những người tiên phong — cập nhật tri thức, kết nối giao thương và cùng nhau xây dựng ngành Du lịch Nông nghiệp Việt Nam.
          </motion.p>

          {/* Event badges */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}
          >
            <Badge color="green">2025 · Đã diễn ra</Badge>
            <Badge color="orange">2026 · 13–15/03/2026</Badge>
            <Badge color="yellow">Sản Việt Farm · Khánh Hòa</Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}
          >
            <Link href="/lien-he" className="fsu-register-btn">Đăng Ký Tham Dự →</Link>
            <a
              href="#chuong-trinh"
              style={{ display: "inline-block", color: C.cream, fontFamily: "var(--font-nunito)", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "14px 32px", borderRadius: "8px", border: `1px solid ${C.border}`, textDecoration: "none" }}
            >
              Xem Chi Tiết
            </a>
          </motion.div>
        </section>

        {/* ══ STATS BAR ══ */}
        <div style={{ background: "rgba(8,26,8,0.9)", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "1.5rem 1rem" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", textAlign: "center" }}>
            {[
              { num: "2+", label: "Mùa" },
              { num: "200+", label: "Thành Viên" },
              { num: "16+", label: "Diễn Giả" },
              { num: "8", label: "Chuyên Đề 2026" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "0.75rem", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
                <div className="fsu-orange-shimmer" style={{ fontFamily: "var(--font-alegreya)", fontSize: "1.9rem", fontWeight: 700, marginBottom: "0.1rem" }}>{s.num}</div>
                <div style={{ color: C.creamMuted, fontFamily: "var(--font-nunito)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ VỀ CHƯƠNG TRÌNH ══ */}
        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "4rem 1.5rem 0" }}>
          <Divider />
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={label}>Giới Thiệu Chương Trình</span>
            <h2 style={{ ...heading, fontSize: "clamp(1.5rem,2.5vw,2.2rem)" }}>Farmstay Update Là Gì?</h2>
            <div style={{ width: "2.5rem", height: "2px", background: C.orange, margin: "0.75rem auto 0" }} />
          </div>
          <p style={{ ...body, fontSize: "14px", textAlign: "center", lineHeight: 1.9 }}>
            Farmstay Update là chương trình thường niên <strong style={{ color: C.cream }}>2 ngày offline</strong> — nơi tập hợp những người yêu thích và đam mê Du lịch Nông nghiệp. Khác với các sự kiện thông thường, Farmstay Update mang đến <strong style={{ color: C.cream }}>góc nhìn đa chiều</strong> từ xuất nhập khẩu, bất động sản, quy hoạch quốc gia, đến các mô hình farmstay thành công thực tế trên toàn quốc.
          </p>
          <p style={{ ...body, fontSize: "14px", textAlign: "center", lineHeight: 1.9, marginTop: "1rem" }}>
            Đây là không gian kết nối để bạn mở rộng quan hệ kinh doanh, tìm kiếm cơ hội hợp tác và <strong style={{ color: C.cream }}>cùng nhau định vị Việt Nam trở thành Quốc gia Du lịch Nông nghiệp.</strong>
          </p>
        </section>

        {/* ══ 6 MỤC TIÊU ══ */}
        <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={label}>6 Mục Tiêu Chính</span>
            <h2 style={{ ...heading, fontSize: "clamp(1.4rem,2.5vw,2rem)" }}>Những Gì Bạn Nhận Được</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {GOALS.map((g, i) => (
              <motion.div
                key={i}
                className="fsu-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "1.5rem" }}
              >
                <div style={{ color: C.orange, fontFamily: "var(--font-alegreya)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.6rem" }}>{g.num}</div>
                <h3 style={{ ...heading, fontSize: "0.95rem", marginBottom: "0.5rem" }}>{g.title}</h3>
                <p style={{ ...body, fontSize: "12px" }}>{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ══ LỊCH SỬ ══ */}
        <section style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem 4rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={label}>Hành Trình Hình Thành</span>
            <h2 style={{ ...heading, fontSize: "clamp(1.4rem,2.5vw,2rem)" }}>Từ 2020 Đến Nay</h2>
          </div>
          <div style={{ position: "relative", paddingLeft: "2rem" }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: "7px", top: 0, bottom: 0, width: "2px", background: `linear-gradient(to bottom, ${C.green}44, ${C.orange}44)` }} />
            {HISTORY.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                style={{ position: "relative", marginBottom: "2rem" }}
              >
                {/* Dot */}
                <div style={{ position: "absolute", left: "-1.75rem", top: "4px", width: "12px", height: "12px", borderRadius: "50%", background: h.active ? C.orange : C.green, border: `2px solid ${C.bg}`, boxShadow: h.active ? `0 0 10px ${C.orange}88` : "none" }} />
                <div style={{ background: h.active ? "rgba(230,74,25,0.08)" : C.bgCard, border: `1px solid ${h.active ? C.borderOrange : C.border}`, borderRadius: "10px", padding: "1rem 1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.3rem" }}>
                    <span style={{ ...label, fontSize: "10px", marginBottom: 0, color: h.active ? C.orangeLight : C.green }}>{h.year}</span>
                    {h.active && <Badge color="orange">Sắp Diễn Ra</Badge>}
                  </div>
                  <h3 style={{ ...heading, fontSize: "0.95rem", marginBottom: "0.25rem" }}>{h.title}</h3>
                  <p style={{ ...body, fontSize: "12px", margin: 0 }}>{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ CHI TIẾT 2026 ══ */}
        <section id="chuong-trinh" style={{ background: "rgba(8,26,8,0.6)", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={label}>Mùa 2 · Năm 2026</span>
              <h2 style={{ ...heading, fontSize: "clamp(1.6rem,2.5vw,2.4rem)" }}>
                <span className="fsu-orange-shimmer">Farmstay Update 2026</span>
              </h2>
              <p style={{ color: C.creamMuted, fontFamily: "var(--font-nunito)", fontSize: "13px", marginTop: "0.5rem" }}>
                13–15 tháng 3 năm 2026 · Sản Việt Farm · Khánh Hòa
              </p>
            </div>

            {/* Info cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
              {[
                { title: "Thời Gian", detail: "13–15/03/2026", sub: "3 ngày 2 đêm" },
                { title: "Địa Điểm", detail: "Sản Việt Farm", sub: "Ninh Hòa, Khánh Hòa" },
                { title: "Chi Phí", detail: "8.100.000đ", sub: "Bao gồm lưu trú & ăn uống" },
                { title: "Diễn Giả", detail: "8 Chuyên Đề", sub: "Chuyên gia hàng đầu" },
              ].map((c, i) => (
                <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.borderOrange}`, borderRadius: "12px", padding: "1.25rem", textAlign: "center" }}>
                  <span style={label}>{c.title}</span>
                  <div style={{ color: C.cream, fontFamily: "var(--font-alegreya)", fontSize: "1.1rem", fontWeight: 700 }}>{c.detail}</div>
                  <div style={{ ...body, fontSize: "11px", marginTop: "0.2rem" }}>{c.sub}</div>
                </div>
              ))}
            </div>

            {/* Schedule */}
            <h3 style={{ ...heading, fontSize: "1.1rem", marginBottom: "1.5rem", textAlign: "center" }}>Lịch Trình Chương Trình</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              {SCHEDULE_2026.map((d, di) => (
                <motion.div
                  key={di}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: di * 0.1 }}
                  style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "12px", overflow: "hidden" }}
                >
                  <div style={{ background: "rgba(76,175,80,0.12)", borderBottom: `1px solid ${C.border}`, padding: "0.75rem 1rem" }}>
                    <div style={{ color: C.green, fontFamily: "var(--font-nunito)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>{d.day}</div>
                    <div style={{ color: C.cream, fontFamily: "var(--font-alegreya)", fontSize: "1rem", fontWeight: 700 }}>{d.date}</div>
                  </div>
                  <div style={{ padding: "0.75rem" }}>
                    {d.items.map((item, ii) => (
                      <div key={ii} style={{ display: "flex", gap: "0.6rem", padding: "0.5rem 0", borderBottom: ii < d.items.length - 1 ? `1px solid rgba(76,175,80,0.08)` : "none" }}>
                        <span style={{ color: C.orange, fontFamily: "var(--font-nunito)", fontSize: "9px", letterSpacing: "0.05em", minWidth: "36px", marginTop: "2px", flexShrink: 0 }}>{item.time}</span>
                        <p style={{ ...body, fontSize: "11.5px", margin: 0, lineHeight: 1.5 }}>{item.act}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ DIỄN GIẢ ══ */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 1.5rem" }}>
          <Divider />
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={label}>Farmstay Update 2026</span>
            <h2 style={{ ...heading, fontSize: "clamp(1.4rem,2.5vw,2rem)" }}>Diễn Giả Chuyên Đề</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {SPEAKERS_2026.map((s, i) => (
              <motion.div
                key={i}
                className="fsu-speaker-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                style={{ background: C.bgCard, border: `1px solid ${C.borderOrange}`, borderRadius: "14px", padding: "1.5rem", position: "relative" }}
              >
                <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
                  <Badge color="orange">{s.topic}</Badge>
                </div>
                <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(230,74,25,0.12)", border: `1px solid ${C.borderOrange}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
                  <span style={{ color: C.orangeLight, fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "14px" }}>{s.name.charAt(0)}</span>
                </div>
                <h3 style={{ ...heading, fontSize: "0.95rem", marginBottom: "0.2rem", paddingRight: "4rem" }}>{s.name}</h3>
                <p style={{ color: C.orange, fontFamily: "var(--font-nunito)", fontSize: "10px", letterSpacing: "0.05em", marginBottom: "0.6rem" }}>{s.role}</p>
                <p style={{ ...body, fontSize: "12px", margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ TÀI TRỢ ══ */}
        <section style={{ background: "rgba(8,26,8,0.6)", borderTop: `1px solid ${C.border}`, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={label}>Kêu Gọi Tài Trợ</span>
              <h2 style={{ ...heading, fontSize: "clamp(1.4rem,2.5vw,2rem)", animation: "fsu-shimmer 5s linear infinite, fsu-pulse 3.5s ease-in-out infinite" }} className="fsu-green-shimmer">
                Cùng Nhau Tạo Nên Sự Kiện Farmstay Lớn Nhất Năm
              </h2>
            </div>

            {/* Thư mời */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "2rem", marginBottom: "2.5rem" }}
            >
              <p style={{ ...body, fontSize: "13.5px", fontStyle: "italic", lineHeight: 2, textAlign: "center", marginBottom: "1.25rem" }}>
                Một ý tưởng dù tốt đến mấy, một hành trình dù được lên kế hoạch kỹ lưỡng đến đâu, đều có thể sẽ không toàn vẹn khi không có sự tham gia của tinh thần <strong style={{ color: C.cream }}>"mạnh thường quân"</strong>.
              </p>
              <p style={{ ...body, fontSize: "13.5px", fontStyle: "italic", lineHeight: 2, textAlign: "center" }}>
                Farmstay Update 2026 sẽ toàn vẹn và thành công hơn nếu có sự đồng hành của Quý Nhà Tài Trợ — giúp cho rất nhiều bên cùng có lợi, tạo ra làn sóng phát triển Du lịch Nông nghiệp Việt Nam mạnh mẽ hơn!
              </p>
              <p style={{ color: C.cream, fontFamily: "var(--font-nunito)", fontWeight: 700, textAlign: "center", marginTop: "1.25rem", fontSize: "13px" }}>Nhà Hoạch Định · Phạm Thanh Tùng</p>
            </motion.div>

            {/* 2 nhóm tài trợ */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
              {[
                {
                  title: "Nhóm 1 · Tài Trợ Hiện Vật",
                  color: "green" as const,
                  desc: "Dành cho các mạnh thường quân có sản phẩm, dịch vụ phục vụ trực tiếp thành viên trong sự kiện.",
                  examples: ["Sản phẩm lều trại, cắm trại", "Sản phẩm chăm sóc sức khỏe", "Sản phẩm ăn uống, nước uống", "Dịch vụ in ấn, truyền thông"],
                  benefit: "Logo xuất hiện trên backdrop, standee và tất cả ấn phẩm sự kiện."
                },
                {
                  title: "Nhóm 2 · Tài Trợ Hiện Kim",
                  color: "orange" as const,
                  desc: "Dành cho các mạnh thường quân muốn logo, nhãn hiệu xuất hiện trong sự kiện dù bản thân không tham gia được.",
                  examples: ["Kim cương · Vàng · Bạc · Đồng hành", "Tùy theo mức đóng góp", "Quyền lợi truyền thông đặc biệt", "Nhận diện thương hiệu toàn sự kiện"],
                  benefit: "Được ghi nhận trân trọng trong Cẩm nang và trên tất cả kênh truyền thông."
                }
              ].map((pkg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ background: C.bgCard, border: `1px solid ${pkg.color === "green" ? C.border : C.borderOrange}`, borderRadius: "14px", padding: "1.75rem" }}
                >
                  <h3 style={{ ...heading, fontSize: "1rem", marginBottom: "0.5rem" }}>{pkg.title}</h3>
                  <p style={{ ...body, fontSize: "12.5px", marginBottom: "1rem" }}>{pkg.desc}</p>
                  <ul style={{ margin: "0 0 1rem", padding: "0 0 0 1.25rem" }}>
                    {pkg.examples.map((ex, j) => (
                      <li key={j} style={{ ...body, fontSize: "12px", marginBottom: "0.25rem" }}>{ex}</li>
                    ))}
                  </ul>
                  <p style={{ color: pkg.color === "green" ? C.green : C.orangeLight, fontFamily: "var(--font-nunito)", fontSize: "11px", fontStyle: "italic" }}>✦ {pkg.benefit}</p>
                </motion.div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <Link href="/lien-he" className="fsu-register-btn">Liên Hệ Đăng Ký Tài Trợ →</Link>
            </div>
          </div>
        </section>

        {/* ══ ĐƠN VỊ TỔ CHỨC ══ */}
        <section style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem" }}>
          <Divider />
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={label}>Đơn Vị Tổ Chức</span>
            <h2 style={{ ...heading, fontSize: "clamp(1.3rem,2vw,1.8rem)" }}>Đứng Sau Farmstay Update</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {[
              {
                name: "Defarm",
                role: "Đơn Vị Tổ Chức",
                desc: "Công ty Cổ phần Defarm — sứ mệnh tập hợp nguồn lực đưa Việt Nam trở thành Quốc gia Farmstay. Đơn vị tư vấn, thiết kế, quản trị farmstay tốt nhất Đông Nam Á.",
                link: "https://defarm.vn",
                linkLabel: "defarm.vn",
              },
              {
                name: "Nhà Hoạch Định",
                role: "Thương Hiệu Chỉ Đạo",
                desc: "Phạm Thanh Tùng — Nhà hoạch định với khả năng tạo tác động đổi thay các vùng đất. Host và Founder của Farmstay Update, Xuyên Việt Farmstay.",
                link: "https://nhahoachdinh.com",
                linkLabel: "nhahoachdinh.com",
              },
            ].map((org, i) => (
              <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "1.75rem" }}>
                <h3 style={{ ...heading, fontSize: "1.1rem", marginBottom: "0.25rem" }}>{org.name}</h3>
                <span style={label}>{org.role}</span>
                <p style={{ ...body, fontSize: "12.5px", marginBottom: "1rem" }}>{org.desc}</p>
                <a href={org.link} target="_blank" rel="noopener noreferrer" style={{ color: C.green, fontFamily: "var(--font-nunito)", fontSize: "11px", letterSpacing: "0.1em" }}>↗ {org.linkLabel}</a>
              </div>
            ))}
          </div>
        </section>

        {/* ══ BOTTOM CTA ══ */}
        <section className="fsu-pattern-hero" style={{ padding: "5rem 1.5rem", textAlign: "center", borderTop: `1px solid ${C.border}` }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ maxWidth: "560px", margin: "0 auto" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/LOGO Farmstay Update 01.png" alt="" height={60} style={{ objectFit: "contain", opacity: 0.85, marginBottom: "1.5rem" }} />
            <h2 style={{ ...heading, fontSize: "clamp(1.4rem,2.5vw,2rem)", marginBottom: "1rem" }}>
              Bạn Có Sẵn Sàng Tham Gia?
            </h2>
            <p style={{ ...body, fontSize: "13.5px", marginBottom: "2rem" }}>
              Farmstay Update 2026 — 13 đến 15 tháng 3 năm 2026 tại Sản Việt Farm, Khánh Hòa. Hạn đăng ký: <strong style={{ color: C.cream }}>05/03/2026</strong>.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/lien-he" className="fsu-register-btn">Đăng Ký Ngay · 8.100.000đ</Link>
            </div>
            <p style={{ color: "rgba(240,234,214,0.35)", fontFamily: "var(--font-nunito)", fontSize: "10px", letterSpacing: "0.1em", marginTop: "1.5rem" }}>
              Mọi thắc mắc liên hệ qua trang Liên Hệ hoặc số điện thoại BTC: 0333 889 873
            </p>
          </motion.div>
        </section>

      </div>
    </>
  );
}
