"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/animations";

// ── Config ────────────────────────────────────────────────────────────────────
const PRICE    = parseInt(process.env.NEXT_PUBLIC_BOOK_PRICE   ?? "350000");
const SHIPPING = parseInt(process.env.NEXT_PUBLIC_SHIPPING_FEE ?? "30000");
const BANK_ID  = process.env.NEXT_PUBLIC_BANK_ID      ?? "MB";
const ACCT_NO  = process.env.NEXT_PUBLIC_ACCOUNT_NO   ?? "CHUACAUHINH";
const ACCT_NAME= process.env.NEXT_PUBLIC_ACCOUNT_NAME ?? "PHAM THANH TUNG";

// ── Types ─────────────────────────────────────────────────────────────────────
type Screen = "page" | "qr" | "success";
interface FormData {
  name: string; phone: string; email: string;
  street: string;
  province: string; provinceCode: string;
  district: string; districtCode: string;
  ward: string; wardCode: string;
  quantity: number; note: string;
  paymentMethod: "qr" | "cod";
}
interface AddrItem { code: number; name: string; districts?: AddrItem[]; wards?: AddrItem[]; }

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";
const genOrderId = () => `NHD-${Date.now().toString().slice(-8)}`;
const qrUrl = (amount: number, orderId: string) =>
  `https://img.vietqr.io/image/${BANK_ID}-${ACCT_NO}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(orderId)}&accountName=${encodeURIComponent(ACCT_NAME)}`;

// ── Static data ───────────────────────────────────────────────────────────────
const chapters = [
  { num: "01", title: "Tư Duy Nền Tảng", desc: "Nhận thức đúng về farmstay — không phải resort thu nhỏ, không phải homestay đơn thuần." },
  { num: "02", title: "Chọn Đất & Đọc Vị", desc: "Tiêu chí vàng lựa chọn quỹ đất — địa hình, thổ nhưỡng, kết nối hạ tầng và tiềm năng sinh thái." },
  { num: "03", title: "Hoạch Định Chiến Lược", desc: "Xây dựng mô hình kinh doanh bền vững từ ngày đầu — tránh đốt tiền sai chỗ." },
  { num: "04", title: "Thiết Kế Sinh Thái", desc: "Nguyên lý thiết kế thuận tự nhiên — tôn trọng địa hình, cảnh quan và văn hóa bản địa." },
  { num: "05", title: "Vận Hành & Dòng Tiền", desc: "Tạo nhiều nguồn doanh thu đa dạng — lưu trú, ẩm thực, trải nghiệm và sản phẩm địa phương." },
  { num: "06", title: "Marketing & Thương Hiệu", desc: "Kể câu chuyện có chiều sâu văn hóa — cách xây dựng thương hiệu farmstay độc bản." },
];

const testimonials = [
  { name: "Nguyễn Minh Tuấn", role: "Chủ Farmstay Đắk Nông", content: "Cuốn sách này giúp mình tránh được hàng trăm triệu sai lầm ngay từ bước lựa chọn đất. Đọc xong mới hiểu tại sao nhiều farmstay thất bại không phải vì thiếu tiền mà vì thiếu tư duy đúng.", avatar: "MT" },
  { name: "Trần Thị Hương", role: "Nhà đầu tư Farmstay Lâm Đồng", content: "Tôi đã đọc nhiều sách về du lịch nông nghiệp nhưng không có cuốn nào đi vào thực chiến như thế này. Phần về dòng tiền và vận hành thực sự là kim chỉ nam cho dự án của tôi.", avatar: "TH" },
  { name: "Lê Thanh Bình", role: "Founder Farmstay Hội An", content: "Sau khi áp dụng nguyên lý thiết kế trong sách, lượng khách đặt phòng tăng 40% chỉ trong 3 tháng. Cách kể chuyện thương hiệu theo văn hóa bản địa thực sự có tác dụng.", avatar: "LB" },
];

const faqs = [
  { q: "Sách được giao trong bao lâu?", a: "Toàn quốc 2–4 ngày làm việc qua GHN Express. Khu vực nội thành Hà Nội và TP.HCM thường nhận trong 1–2 ngày." },
  { q: "Có thể thanh toán khi nhận hàng không?", a: "Có. Chọn COD (Thanh toán khi nhận hàng) trong form đặt mua. Shipper sẽ thu tiền khi giao." },
  { q: "Sách có mấy trang? Bìa cứng hay bìa mềm?", a: "Sách khoảng 280 trang, khổ A5, bìa cứng ép kim vàng. Giấy kem cao cấp, in màu toàn bộ ảnh minh họa thực tế." },
  { q: "Nếu muốn mua số lượng lớn (trên 10 cuốn) để tặng?", a: "Liên hệ trực tiếp qua Zalo 0935 396 705 để được báo giá ưu đãi và có thể yêu cầu ký tặng cá nhân." },
  { q: "Có bản ebook/PDF không?", a: "Hiện tại chỉ có bản in. Bản số hóa đang trong kế hoạch phát hành trong năm 2025." },
];

// ── Inline style helpers ──────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  background: "rgba(237,224,196,0.05)",
  border: "1px solid rgba(196,154,40,0.2)",
  borderRadius: 8,
  color: "#EDE0C4",
  padding: "12px 16px",
  width: "100%",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s",
};
const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  border: "1px solid rgba(232,112,112,0.6)",
};
const labelStyle: React.CSSProperties = {
  display: "block",
  color: "rgba(196,154,40,0.7)",
  fontSize: "10px",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  marginBottom: "6px",
  fontFamily: "var(--font-nunito)",
  fontWeight: 600,
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function BookPageClient() {
  const [screen, setScreen] = useState<Screen>("page");
  const [orderId, setOrderId] = useState("");
  const [trackingCode, setTrackingCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const formRef = useRef<HTMLDivElement>(null);

  // Address cascade
  const [provinces, setProvinces] = useState<AddrItem[]>([]);
  const [districts, setDistricts] = useState<AddrItem[]>([]);
  const [wards, setWards] = useState<AddrItem[]>([]);
  const [addrLoading, setAddrLoading] = useState(false);

  // FAQ open state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // QR countdown
  const [countdown, setCountdown] = useState(15 * 60);

  const [form, setForm] = useState<FormData>({
    name: "", phone: "", email: "", street: "",
    province: "", provinceCode: "",
    district: "", districtCode: "",
    ward: "", wardCode: "",
    quantity: 1, note: "", paymentMethod: "qr",
  });

  // Load provinces
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then(r => r.json())
      .then((data: AddrItem[]) => setProvinces(data))
      .catch(() => {});
  }, []);

  const onProvinceChange = async (code: string, name: string) => {
    setForm(f => ({ ...f, province: name, provinceCode: code, district: "", districtCode: "", ward: "", wardCode: "" }));
    setErrors(prev => ({ ...prev, province: undefined }));
    setDistricts([]); setWards([]);
    if (!code) return;
    setAddrLoading(true);
    try {
      const res = await fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
      const data = await res.json();
      setDistricts(data.districts ?? []);
    } catch { /* silent */ }
    setAddrLoading(false);
  };

  const onDistrictChange = async (code: string, name: string) => {
    setForm(f => ({ ...f, district: name, districtCode: code, ward: "", wardCode: "" }));
    setErrors(prev => ({ ...prev, district: undefined }));
    setWards([]);
    if (!code) return;
    setAddrLoading(true);
    try {
      const res = await fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
      const data = await res.json();
      setWards(data.wards ?? []);
    } catch { /* silent */ }
    setAddrLoading(false);
  };

  // QR countdown
  useEffect(() => {
    if (screen !== "qr") return;
    setCountdown(15 * 60);
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [screen]);

  // Validation
  function validate(f: FormData) {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!f.name.trim()) e.name = "Vui lòng nhập họ tên";
    if (!/^(0[3|5|7|8|9])[0-9]{8}$/.test(f.phone.replace(/\s/g, ""))) e.phone = "Số điện thoại không hợp lệ (10 số VN)";
    if (!f.street.trim()) e.street = "Vui lòng nhập số nhà / tên đường";
    if (!f.provinceCode) e.province = "Vui lòng chọn Tỉnh / Thành phố";
    if (!f.districtCode) e.district = "Vui lòng chọn Quận / Huyện";
    if (!f.wardCode) e.ward = "Vui lòng chọn Phường / Xã";
    return e;
  }

  // Submit
  const handleSubmit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setErrors({});
    setSubmitting(true);
    const id = genOrderId();
    setOrderId(id);
    const total = PRICE * form.quantity + SHIPPING;
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, orderId: id, total }),
      });
      const data = await res.json();
      if (data.trackingCode) setTrackingCode(data.trackingCode);
    } catch { /* silent */ }
    setSubmitting(false);
    if (form.paymentMethod === "qr") setScreen("qr");
    else setScreen("success");
  };

  const handlePaymentDone = async () => {
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, orderId, total: PRICE * form.quantity + SHIPPING, paymentConfirmed: true }),
      });
    } catch { /* silent */ }
    setScreen("success");
  };

  const total = PRICE * form.quantity + SHIPPING;
  const minutes = String(Math.floor(countdown / 60)).padStart(2, "0");
  const seconds = String(countdown % 60).padStart(2, "0");

  // ── Success screen ──────────────────────────────────────────────────────────
  if (screen === "success") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #0A1208 0%, #0D1A0C 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", border: "2px solid #C49A28", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", color: "#C49A28", fontSize: "2rem" }}>✓</div>
        <h1 style={{ fontFamily: "var(--font-alegreya)", fontSize: "clamp(1.8rem,3vw,2.6rem)", color: "#EDE0C4", textAlign: "center", marginBottom: "1rem" }}>Đặt Hàng Thành Công!</h1>
        <div style={{ height: "1px", width: "3rem", background: "linear-gradient(90deg,transparent,#C49A28,transparent)", margin: "0 auto 1.5rem" }} />
        <div style={{ background: "rgba(196,154,40,0.06)", border: "1px solid rgba(196,154,40,0.2)", borderRadius: "12px", padding: "1.5rem 2rem", maxWidth: "400px", margin: "0 auto 2rem" }}>
          <p style={{ color: "rgba(196,154,40,0.7)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Mã Đơn Hàng</p>
          <p style={{ fontFamily: "var(--font-alegreya)", fontSize: "1.5rem", color: "#D4B050", letterSpacing: "0.05em" }}>{orderId}</p>
          <div style={{ height: "1px", background: "rgba(196,154,40,0.15)", margin: "1rem 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ color: "rgba(237,224,196,0.6)", fontSize: "0.85rem" }}>Sách Farmstay × {form.quantity}</span>
            <span style={{ color: "#EDE0C4", fontSize: "0.85rem" }}>{fmt(PRICE * form.quantity)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ color: "rgba(237,224,196,0.6)", fontSize: "0.85rem" }}>Phí vận chuyển</span>
            <span style={{ color: "#EDE0C4", fontSize: "0.85rem" }}>{fmt(SHIPPING)}</span>
          </div>
          <div style={{ height: "1px", background: "rgba(196,154,40,0.15)", margin: "0.75rem 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#EDE0C4", fontWeight: 600, fontSize: "0.95rem" }}>Tổng cộng</span>
            <span style={{ color: "#C49A28", fontWeight: 600, fontSize: "0.95rem" }}>{fmt(PRICE * form.quantity + SHIPPING)}</span>
          </div>
        </div>
        <p style={{ color: "rgba(237,224,196,0.55)", fontSize: "0.85rem", textAlign: "center", maxWidth: "380px", margin: "0 auto 1.5rem", lineHeight: 1.7 }}>
          {form.paymentMethod === "cod"
            ? "Đơn hàng của bạn đã được ghi nhận. Shipper sẽ liên hệ trong 1–3 ngày làm việc."
            : "Cảm ơn bạn đã thanh toán. Đơn hàng sẽ được xử lý và giao trong 2–4 ngày làm việc."}
        </p>
        {trackingCode && <p style={{ color: "rgba(196,154,40,0.8)", fontSize: "0.85rem", textAlign: "center", marginBottom: "1.5rem" }}>Mã vận đơn GHN: <strong style={{ color: "#C49A28" }}>{trackingCode}</strong></p>}
        {form.paymentMethod === "qr" && (
          <p style={{ color: "rgba(237,224,196,0.45)", fontSize: "0.8rem", textAlign: "center", maxWidth: "360px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
            Nếu chưa chuyển khoản, vui lòng liên hệ Zalo <strong style={{ color: "#C49A28" }}>0935 396 705</strong> để được hỗ trợ.
          </p>
        )}
        <div style={{ textAlign: "center" }}>
          <Link href="/" style={{ display: "inline-block", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "12px 28px", background: "transparent", color: "#EDE0C4", border: "1px solid rgba(237,224,196,0.25)", borderRadius: "8px", textDecoration: "none" }}>
            Về Trang Chủ
          </Link>
        </div>
      </motion.div>
    </div>
  );

  // ── Main page (with QR modal overlay if screen === "qr") ───────────────────
  return (
    <div style={{ background: "#0A1208", minHeight: "100vh" }}>

      {/* QR Modal Overlay */}
      <AnimatePresence>
        {screen === "qr" && (
          <motion.div
            key="qr-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35 }}
              style={{ background: "#0D1A0C", border: "1px solid rgba(196,154,40,0.3)", borderRadius: 16, padding: "2rem", maxWidth: 400, width: "100%", textAlign: "center" }}
            >
              <p style={{ color: "rgba(196,154,40,0.7)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.5rem", fontFamily: "var(--font-nunito)", fontWeight: 600 }}>Chuyển Khoản Ngân Hàng</p>
              <h2 style={{ fontFamily: "var(--font-alegreya)", fontSize: "1.5rem", color: "#EDE0C4", marginBottom: "0.5rem" }}>Quét Mã QR Thanh Toán</h2>
              <p style={{ color: "rgba(237,224,196,0.45)", fontSize: "0.78rem", marginBottom: "1.25rem" }}>Quét bằng app ngân hàng bất kỳ</p>

              {/* QR Image */}
              <div style={{ background: "#fff", borderRadius: 12, padding: "1rem", display: "inline-block", marginBottom: "1.25rem" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl(total, orderId)}
                  alt="QR thanh toán"
                  width={200}
                  height={200}
                  style={{ display: "block", borderRadius: 8 }}
                />
              </div>

              {/* Amount */}
              <div style={{ marginBottom: "0.75rem" }}>
                <span style={{ color: "rgba(237,224,196,0.55)", fontSize: "0.82rem" }}>Số tiền: </span>
                <span style={{ color: "#D4B050", fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-alegreya)" }}>{fmt(total)}</span>
              </div>

              {/* Order code */}
              <div style={{ background: "rgba(196,154,40,0.06)", border: "1px solid rgba(196,154,40,0.15)", borderRadius: 8, padding: "0.6rem 1rem", marginBottom: "1rem" }}>
                <p style={{ color: "rgba(196,154,40,0.6)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "3px" }}>Nội dung chuyển khoản</p>
                <p style={{ color: "#D4B050", fontWeight: 700, letterSpacing: "0.05em", fontSize: "1rem" }}>{orderId}</p>
              </div>

              {/* Countdown */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <span style={{ color: "rgba(237,224,196,0.45)", fontSize: "0.8rem" }}>Mã hết hạn sau:</span>
                <span style={{ fontFamily: "var(--font-alegreya)", fontSize: "1.2rem", color: countdown < 60 ? "#E87070" : "#C49A28", fontWeight: 600 }}>
                  {minutes}:{seconds}
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={handlePaymentDone}
                style={{ width: "100%", background: "linear-gradient(135deg,#C49A28,#D4B050)", color: "#0A1208", fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", padding: "14px 24px", borderRadius: 8, border: "none", cursor: "pointer", marginBottom: "0.75rem" }}
              >
                Tôi Đã Chuyển Khoản
              </button>

              <button
                onClick={() => setScreen("page")}
                style={{ background: "transparent", border: "none", color: "rgba(237,224,196,0.4)", fontSize: "0.82rem", cursor: "pointer", textDecoration: "underline", fontFamily: "var(--font-nunito)" }}
              >
                Huỷ, quay lại
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        style={{ position: "relative", minHeight: "75vh", display: "flex", alignItems: "center", padding: "7rem 0 5rem", overflow: "hidden", background: "linear-gradient(135deg, #0D1A0C 0%, #0A1208 100%)" }}
      >
        {/* Ambient glow */}
        <motion.div
          style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(circle at 65% 40%, #C8A84B 0%, transparent 60%)", opacity: 0.07 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
          <motion.p
            style={{ color: "#C49A28", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.25rem" }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            Tác Phẩm
          </motion.p>
          <motion.h1
            style={{ fontFamily: "var(--font-alegreya)", fontSize: "clamp(2.2rem,5vw,4rem)", color: "#EDE0C4", lineHeight: 1.15, marginBottom: "1.25rem", maxWidth: 700 }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.35 }}
          >
            Hướng Dẫn Thiết Lập<br />Farmstay Bền Vững
          </motion.h1>
          <motion.div
            style={{ width: 48, height: 2, background: "linear-gradient(90deg,#C49A28,#D4B050)", marginBottom: "1.5rem", transformOrigin: "left" }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.p
            style={{ color: "rgba(237,224,196,0.65)", fontFamily: "var(--font-nunito)", lineHeight: 1.8, fontSize: "1rem", maxWidth: 580, marginBottom: "2.5rem" }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.6 }}
          >
            Cuốn cẩm nang thực chiến từ hơn 9 năm kinh nghiệm tư vấn, thiết kế và vận hành hơn 50 dự án farmstay trên khắp Việt Nam. Không lý thuyết hào nhoáng — chỉ là những bài học máu và nước mắt được đúc kết thành hệ thống.
          </motion.p>
          <motion.div
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}
          >
            <button
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "linear-gradient(135deg,#C49A28,#D4B050)", color: "#0A1208", fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 32px", borderRadius: 8, border: "none", cursor: "pointer" }}
            >
              Đặt Mua Ngay
            </button>
            <Link
              href="/ve-toi"
              style={{ background: "transparent", color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 32px", borderRadius: 8, border: "1px solid rgba(237,224,196,0.2)", textDecoration: "none", display: "inline-block" }}
            >
              Về Tác Giả
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CHAPTER GRID ────────────────────────────────────────────────────── */}
      <section style={{ background: "#0D1A0C", padding: "6rem 0", borderTop: "1px solid rgba(196,154,40,0.1)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <FadeUp>
              <p style={{ color: "rgba(196,154,40,0.7)", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Nội Dung</p>
              <h2 style={{ fontFamily: "var(--font-alegreya)", fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "#EDE0C4", marginBottom: "1.25rem" }}>
                Những Gì Bạn Sẽ Học Được
              </h2>
              <div style={{ width: 48, height: 1, background: "linear-gradient(90deg,transparent,#C49A28,transparent)", margin: "0 auto" }} />
            </FadeUp>
          </div>
          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((c, i) => (
              <StaggerChild key={i}>
                <motion.div
                  style={{ padding: "2rem", background: "rgba(237,224,196,0.02)", border: "1px solid rgba(196,154,40,0.12)", borderRadius: 12, position: "relative", overflow: "hidden", cursor: "default" }}
                  whileHover={{ y: -4, borderColor: "rgba(196,154,40,0.3)" }}
                  transition={{ duration: 0.25 }}
                >
                  <span style={{ fontFamily: "var(--font-alegreya)", fontSize: "2.5rem", fontWeight: 700, color: "rgba(196,154,40,0.35)", display: "block", marginBottom: "1rem" }}>{c.num}</span>
                  <h3 style={{ fontFamily: "var(--font-alegreya)", fontSize: "1.1rem", color: "#EDE0C4", marginBottom: "0.75rem" }}>{c.title}</h3>
                  <p style={{ fontFamily: "var(--font-nunito)", color: "rgba(237,224,196,0.5)", fontSize: "0.85rem", lineHeight: 1.7 }}>{c.desc}</p>
                  <motion.div
                    style={{ position: "absolute", bottom: 0, left: 0, height: 2, background: "linear-gradient(90deg,#C49A28,#D4B050)" }}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.35 }}
                  />
                </motion.div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── AUTHOR QUOTE ────────────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg,#0A1208 0%,#0D2010 100%)", padding: "6rem 0", textAlign: "center", borderTop: "1px solid rgba(196,154,40,0.08)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 2rem" }}>
          <FadeUp>
            <p style={{ color: "#C49A28", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "2rem" }}>Lời Tác Giả</p>
            <p style={{ fontFamily: "var(--font-alegreya)", color: "rgba(237,224,196,0.88)", fontStyle: "italic", fontSize: "clamp(1.1rem,2vw,1.45rem)", lineHeight: 1.8, marginBottom: "2rem" }}>
              &ldquo;Tôi viết cuốn sách này không phải để bán sách — mà để ngăn bạn mắc những sai lầm tôi đã chứng kiến hàng trăm người vấp phải. Mỗi trang là một bài học thực địa, không phải lý thuyết sách vở.&rdquo;
            </p>
            <div style={{ height: 1, width: 48, background: "linear-gradient(90deg,transparent,#C49A28,transparent)", margin: "0 auto 1.25rem" }} />
            <p style={{ color: "#C49A28", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Phạm Thanh Tùng — Nhà Hoạch Định
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <section style={{ background: "#0D1A0C", padding: "6rem 0", borderTop: "1px solid rgba(196,154,40,0.1)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <FadeUp>
              <p style={{ color: "rgba(196,154,40,0.7)", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Phản Hồi</p>
              <h2 style={{ fontFamily: "var(--font-alegreya)", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#EDE0C4" }}>
                Bạn Đọc Nói Gì
              </h2>
            </FadeUp>
          </div>
          <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <StaggerChild key={i}>
                <div style={{ background: "rgba(237,224,196,0.02)", border: "1px solid rgba(196,154,40,0.12)", borderRadius: 12, padding: "2rem" }}>
                  {/* Stars */}
                  <div style={{ color: "#C49A28", fontSize: "0.85rem", marginBottom: "1rem", letterSpacing: "0.1em" }}>★★★★★</div>
                  <p style={{ fontFamily: "var(--font-nunito)", color: "rgba(237,224,196,0.65)", fontSize: "0.88rem", lineHeight: 1.75, marginBottom: "1.5rem", fontStyle: "italic" }}>
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(196,154,40,0.15)", border: "1px solid rgba(196,154,40,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C49A28", fontFamily: "var(--font-alegreya)", fontWeight: 700, fontSize: "0.9rem", flexShrink: 0 }}>
                      {t.avatar}
                    </div>
                    <div>
                      <p style={{ color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "0.88rem" }}>{t.name}</p>
                      <p style={{ color: "rgba(196,154,40,0.6)", fontFamily: "var(--font-nunito)", fontSize: "0.75rem" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "#0A1208", padding: "6rem 0", borderTop: "1px solid rgba(196,154,40,0.1)" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 2rem" }}>
          <FadeUp>
            <div style={{ background: "rgba(196,154,40,0.04)", border: "1px solid rgba(196,154,40,0.25)", borderRadius: 16, padding: "2.5rem", textAlign: "center" }}>
              <p style={{ color: "rgba(196,154,40,0.7)", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Giá Bìa</p>
              <div style={{ fontFamily: "var(--font-alegreya)", fontSize: "clamp(2.5rem,5vw,3.5rem)", color: "#D4B050", marginBottom: "0.5rem" }}>
                {fmt(PRICE)}
              </div>
              <p style={{ color: "rgba(237,224,196,0.45)", fontSize: "0.82rem", marginBottom: "2rem" }}>+ Phí vận chuyển {fmt(SHIPPING)} (toàn quốc)</p>
              <div style={{ height: 1, background: "rgba(196,154,40,0.15)", marginBottom: "1.5rem" }} />
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", textAlign: "left" }}>
                {[
                  "280 trang, khổ A5 bìa cứng ép kim",
                  "In màu toàn bộ ảnh minh họa thực tế",
                  "Giấy kem cao cấp, đóng gáy chắc chắn",
                  "Giao hàng GHN Express toàn quốc",
                  "Bảo hành đổi sách nếu lỗi in ấn",
                ].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.65rem", fontFamily: "var(--font-nunito)", color: "rgba(237,224,196,0.7)", fontSize: "0.875rem" }}>
                    <span style={{ color: "#C49A28", marginTop: "2px", flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                style={{ width: "100%", background: "linear-gradient(135deg,#C49A28,#D4B050)", color: "#0A1208", fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "15px 24px", borderRadius: 8, border: "none", cursor: "pointer" }}
              >
                Đặt Mua Ngay
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── ORDER FORM ──────────────────────────────────────────────────────── */}
      <section
        ref={formRef}
        id="order-form"
        style={{ background: "#0D1A0C", padding: "6rem 0", borderTop: "2px solid rgba(196,154,40,0.25)" }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <FadeUp>
              <p style={{ color: "rgba(196,154,40,0.7)", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Đặt Hàng</p>
              <h2 style={{ fontFamily: "var(--font-alegreya)", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#EDE0C4", marginBottom: "0.75rem" }}>
                Điền Thông Tin Đặt Mua
              </h2>
              <div style={{ height: 1, width: 48, background: "linear-gradient(90deg,transparent,#C49A28,transparent)", margin: "0 auto" }} />
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

              {/* Name */}
              <div>
                <label style={labelStyle}>Họ và tên *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(prev => ({ ...prev, name: undefined })); }}
                  placeholder="Nguyễn Văn A"
                  style={errors.name ? inputErrorStyle : inputStyle}
                />
                {errors.name && <p style={{ color: "#E87070", fontSize: "11px", marginTop: "4px" }}>{errors.name}</p>}
              </div>

              {/* Phone + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Số điện thoại *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(prev => ({ ...prev, phone: undefined })); }}
                    placeholder="0912 345 678"
                    style={errors.phone ? inputErrorStyle : inputStyle}
                  />
                  {errors.phone && <p style={{ color: "#E87070", fontSize: "11px", marginTop: "4px" }}>{errors.phone}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Email (tùy chọn)</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="email@example.com"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Street */}
              <div>
                <label style={labelStyle}>Số nhà / Tên đường *</label>
                <input
                  type="text"
                  value={form.street}
                  onChange={e => { setForm(f => ({ ...f, street: e.target.value })); setErrors(prev => ({ ...prev, street: undefined })); }}
                  placeholder="123 Đường Lê Lợi"
                  style={errors.street ? inputErrorStyle : inputStyle}
                />
                {errors.street && <p style={{ color: "#E87070", fontSize: "11px", marginTop: "4px" }}>{errors.street}</p>}
              </div>

              {/* Province */}
              <div>
                <label style={labelStyle}>Tỉnh / Thành phố *</label>
                <div style={{ position: "relative" }}>
                  <select
                    value={form.provinceCode}
                    onChange={e => {
                      const opt = e.target.options[e.target.selectedIndex];
                      onProvinceChange(e.target.value, opt.text);
                    }}
                    style={{ ...( errors.province ? inputErrorStyle : inputStyle), appearance: "none", paddingRight: 36 }}
                  >
                    <option value="">— Chọn tỉnh / thành phố —</option>
                    {provinces.map(p => (
                      <option key={p.code} value={p.code}>{p.name}</option>
                    ))}
                  </select>
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(196,154,40,0.5)", pointerEvents: "none", fontSize: "0.75rem" }}>▼</span>
                </div>
                {errors.province && <p style={{ color: "#E87070", fontSize: "11px", marginTop: "4px" }}>{errors.province}</p>}
              </div>

              {/* District */}
              <div>
                <label style={labelStyle}>Quận / Huyện *</label>
                <div style={{ position: "relative" }}>
                  <select
                    value={form.districtCode}
                    onChange={e => {
                      const opt = e.target.options[e.target.selectedIndex];
                      onDistrictChange(e.target.value, opt.text);
                    }}
                    disabled={!form.provinceCode || addrLoading}
                    style={{ ...(errors.district ? inputErrorStyle : inputStyle), appearance: "none", paddingRight: 36, opacity: (!form.provinceCode || addrLoading) ? 0.5 : 1 }}
                  >
                    <option value="">
                      {addrLoading ? "Đang tải..." : (form.provinceCode ? "— Chọn quận / huyện —" : "— Chọn tỉnh trước —")}
                    </option>
                    {districts.map(d => (
                      <option key={d.code} value={d.code}>{d.name}</option>
                    ))}
                  </select>
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(196,154,40,0.5)", pointerEvents: "none", fontSize: "0.75rem" }}>▼</span>
                </div>
                {errors.district && <p style={{ color: "#E87070", fontSize: "11px", marginTop: "4px" }}>{errors.district}</p>}
              </div>

              {/* Ward */}
              <div>
                <label style={labelStyle}>Phường / Xã *</label>
                <div style={{ position: "relative" }}>
                  <select
                    value={form.wardCode}
                    onChange={e => {
                      const opt = e.target.options[e.target.selectedIndex];
                      setForm(f => ({ ...f, ward: opt.text, wardCode: e.target.value }));
                      setErrors(prev => ({ ...prev, ward: undefined }));
                    }}
                    disabled={!form.districtCode || addrLoading}
                    style={{ ...(errors.ward ? inputErrorStyle : inputStyle), appearance: "none", paddingRight: 36, opacity: (!form.districtCode || addrLoading) ? 0.5 : 1 }}
                  >
                    <option value="">
                      {addrLoading ? "Đang tải..." : (form.districtCode ? "— Chọn phường / xã —" : "— Chọn quận trước —")}
                    </option>
                    {wards.map(w => (
                      <option key={w.code} value={w.code}>{w.name}</option>
                    ))}
                  </select>
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(196,154,40,0.5)", pointerEvents: "none", fontSize: "0.75rem" }}>▼</span>
                </div>
                {errors.ward && <p style={{ color: "#E87070", fontSize: "11px", marginTop: "4px" }}>{errors.ward}</p>}
              </div>

              {/* Quantity */}
              <div>
                <label style={labelStyle}>Số lượng</label>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, quantity: Math.max(1, f.quantity - 1) }))}
                    style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(196,154,40,0.1)", border: "1px solid rgba(196,154,40,0.2)", color: "#C49A28", fontSize: "1.2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                  >−</button>
                  <span style={{ fontFamily: "var(--font-alegreya)", fontSize: "1.5rem", color: "#EDE0C4", minWidth: 30, textAlign: "center" }}>{form.quantity}</span>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, quantity: f.quantity + 1 }))}
                    style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(196,154,40,0.1)", border: "1px solid rgba(196,154,40,0.2)", color: "#C49A28", fontSize: "1.2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                  >+</button>
                  <span style={{ color: "rgba(237,224,196,0.5)", fontSize: "0.85rem" }}>
                    Tổng: <strong style={{ color: "#D4B050" }}>{fmt(PRICE * form.quantity)}</strong>
                  </span>
                </div>
              </div>

              {/* Note */}
              <div>
                <label style={labelStyle}>Ghi chú (tùy chọn)</label>
                <textarea
                  value={form.note}
                  onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                  placeholder="Yêu cầu đặc biệt, ký tặng, v.v..."
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              {/* Payment method */}
              <div>
                <label style={labelStyle}>Phương thức thanh toán</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {/* QR */}
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, paymentMethod: "qr" }))}
                    style={{
                      padding: "1rem",
                      borderRadius: 10,
                      border: form.paymentMethod === "qr" ? "2px solid #C49A28" : "1px solid rgba(196,154,40,0.2)",
                      background: form.paymentMethod === "qr" ? "rgba(196,154,40,0.08)" : "rgba(237,224,196,0.02)",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>📱</div>
                    <p style={{ color: form.paymentMethod === "qr" ? "#D4B050" : "#EDE0C4", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "0.8rem", marginBottom: "0.25rem" }}>Chuyển Khoản QR</p>
                    <p style={{ color: "rgba(237,224,196,0.4)", fontFamily: "var(--font-nunito)", fontSize: "0.7rem" }}>VietQR mọi ngân hàng</p>
                  </button>
                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, paymentMethod: "cod" }))}
                    style={{
                      padding: "1rem",
                      borderRadius: 10,
                      border: form.paymentMethod === "cod" ? "2px solid #C49A28" : "1px solid rgba(196,154,40,0.2)",
                      background: form.paymentMethod === "cod" ? "rgba(196,154,40,0.08)" : "rgba(237,224,196,0.02)",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>💵</div>
                    <p style={{ color: form.paymentMethod === "cod" ? "#D4B050" : "#EDE0C4", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "0.8rem", marginBottom: "0.25rem" }}>COD</p>
                    <p style={{ color: "rgba(237,224,196,0.4)", fontFamily: "var(--font-nunito)", fontSize: "0.7rem" }}>Nhận hàng rồi thanh toán</p>
                  </button>
                </div>
              </div>

              {/* Order summary */}
              <div style={{ background: "rgba(196,154,40,0.04)", border: "1px solid rgba(196,154,40,0.15)", borderRadius: 10, padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ color: "rgba(237,224,196,0.6)", fontFamily: "var(--font-nunito)", fontSize: "0.85rem" }}>Sách Farmstay × {form.quantity}</span>
                  <span style={{ color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontSize: "0.85rem" }}>{fmt(PRICE * form.quantity)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ color: "rgba(237,224,196,0.6)", fontFamily: "var(--font-nunito)", fontSize: "0.85rem" }}>Phí vận chuyển</span>
                  <span style={{ color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontSize: "0.85rem" }}>{fmt(SHIPPING)}</span>
                </div>
                <div style={{ height: 1, background: "rgba(196,154,40,0.15)", marginBottom: "0.75rem" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "1rem" }}>Tổng cộng</span>
                  <span style={{ color: "#C49A28", fontFamily: "var(--font-alegreya)", fontWeight: 700, fontSize: "1.2rem" }}>{fmt(total)}</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  width: "100%",
                  background: submitting ? "rgba(196,154,40,0.4)" : "linear-gradient(135deg,#C49A28,#D4B050)",
                  color: "#0A1208",
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "16px 24px",
                  borderRadius: 8,
                  border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {submitting ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" style={{ animation: "spin 1s linear infinite" }}>
                      <circle cx="8" cy="8" r="6" fill="none" stroke="#0A1208" strokeWidth="2" strokeDasharray="20 15" />
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  form.paymentMethod === "qr" ? "Tiến hành thanh toán QR" : "Xác nhận đặt hàng COD"
                )}
              </button>

              <p style={{ color: "rgba(237,224,196,0.35)", fontFamily: "var(--font-nunito)", fontSize: "0.75rem", textAlign: "center", lineHeight: 1.6 }}>
                Bằng cách đặt hàng, bạn đồng ý với chính sách giao hàng và đổi trả của chúng tôi.
                Hỗ trợ: Zalo <strong style={{ color: "rgba(196,154,40,0.6)" }}>0935 396 705</strong>
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section style={{ background: "#0A1208", padding: "6rem 0", borderTop: "1px solid rgba(196,154,40,0.1)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <FadeUp>
              <p style={{ color: "rgba(196,154,40,0.7)", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>FAQ</p>
              <h2 style={{ fontFamily: "var(--font-alegreya)", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#EDE0C4" }}>
                Câu Hỏi Thường Gặp
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    background: openFaq === i ? "rgba(196,154,40,0.05)" : "rgba(237,224,196,0.02)",
                    border: openFaq === i ? "1px solid rgba(196,154,40,0.25)" : "1px solid rgba(196,154,40,0.1)",
                    borderRadius: 10,
                    overflow: "hidden",
                    transition: "all 0.2s",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%",
                      padding: "1.1rem 1.5rem",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "0.92rem", color: "#EDE0C4", textAlign: "left" }}>{faq.q}</span>
                    <span style={{ color: "#C49A28", fontSize: "1rem", flexShrink: 0, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: "hidden" }}
                      >
                        <p style={{ fontFamily: "var(--font-nunito)", color: "rgba(237,224,196,0.6)", fontSize: "0.875rem", lineHeight: 1.75, padding: "0 1.5rem 1.25rem" }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg,#0D1A0C 0%,#0A1208 100%)", padding: "5rem 0", borderTop: "1px solid rgba(196,154,40,0.1)", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 2rem" }}>
          <FadeUp>
            <h2 style={{ fontFamily: "var(--font-alegreya)", fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#EDE0C4", marginBottom: "1rem" }}>
              Sở Hữu Ngay Hôm Nay
            </h2>
            <div style={{ height: 1, width: 48, background: "linear-gradient(90deg,transparent,#C49A28,transparent)", margin: "0 auto 1.25rem" }} />
            <p style={{ fontFamily: "var(--font-nunito)", color: "rgba(237,224,196,0.5)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "2rem" }}>
              Đầu tư {fmt(PRICE)} để tránh những sai lầm triệu đô trong hành trình xây dựng farmstay của bạn.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "linear-gradient(135deg,#C49A28,#D4B050)", color: "#0A1208", fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 32px", borderRadius: 8, border: "none", cursor: "pointer" }}
              >
                Đặt Mua Sách
              </button>
              <Link
                href="/chia-se-kien-thuc"
                style={{ background: "transparent", color: "#EDE0C4", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "14px 32px", borderRadius: 8, border: "1px solid rgba(237,224,196,0.2)", textDecoration: "none", display: "inline-block" }}
              >
                Đọc Bài Viết Miễn Phí
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Keyframes for spinner */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
