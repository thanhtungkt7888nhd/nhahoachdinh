"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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
  paymentMethod: "qr";
}
interface AddrItem { code: number; name: string; districts?: AddrItem[]; wards?: AddrItem[]; }

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (n: number) => new Intl.NumberFormat("vi-VN").format(n) + "₫";
const genOrderId = () => `NHD-${Date.now().toString().slice(-8)}`;
const qrUrl = (amount: number, orderId: string) =>
  `https://img.vietqr.io/image/${BANK_ID}-${ACCT_NO}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(orderId)}&accountName=${encodeURIComponent(ACCT_NAME)}`;

// ── Static data ───────────────────────────────────────────────────────────────
// Cấu trúc 5 phần theo nội dung thực của sách
const parts = [
  {
    num: "I",
    title: "Nền Tảng Tư Duy",
    subtitle: "Cơ sở để bạn quyết định",
    color: "#C49A28",
    items: [
      "Farmstay 4D là gì — định nghĩa chuẩn quốc tế, không phải cảm tính",
      "Farmstay trên thế giới & tại Việt Nam — bức tranh toàn cảnh",
      "5 sai lầm phổ biến khiến farmstay thất bại trước khi mở cửa",
      "Farmstay có phù hợp với bạn? — 10 câu hỏi sàng lọc thực tế",
      "Gia đình: yếu tố quyết định thành bại — thường bị bỏ qua nhất",
      "Đánh giá nguồn lực tổng thể — đất, vốn, con người, thời gian",
      "Tầm nhìn 3 – 5 – 10 – 50 năm: xây hôm nay, sống được mai sau",
    ],
  },
  {
    num: "II",
    title: "Lên Kế Hoạch",
    subtitle: "Từ ý tưởng đến số liệu",
    color: "#A07820",
    items: [
      "Khảo sát thực địa trước khi vẽ bản đồ — quy trình 7 bước",
      "Pháp lý & giấy phép kinh doanh farmstay theo NĐ 44/2014",
      "Lập mô hình tài chính: ROI, break-even, dòng tiền theo mùa",
      "Mẫu kế hoạch kinh doanh farmstay đầy đủ (template có sẵn)",
    ],
  },
  {
    num: "III",
    title: "Thiết Kế & Xây Dựng",
    subtitle: "Vẽ đúng trước khi xây",
    color: "#8A6518",
    items: [
      "Quy hoạch tổng thể — triết lý hoà quyện cảnh quan, không áp đặt",
      "Phân khu chức năng cốt lõi: đón tiếp, lưu trú, canh tác, trải nghiệm",
      "Thiết kế khu lưu trú — bungalow, glamping, container, nhà sàn",
      "Hạ tầng kỹ thuật: điện mặt trời, nước sạch, xử lý nước thải",
      "Tại sao farmstay cần hiên rộng — và cách thiết kế đúng",
      "Lựa chọn vật liệu xây dựng theo vật liệu sẵn có tại địa phương",
    ],
  },
  {
    num: "IV",
    title: "Vận Hành Mỗi Ngày",
    subtitle: "Mỗi ngày là nghệ thuật",
    color: "#7A5510",
    items: [
      "Quy trình check-in / check-out chuẩn — tạo ấn tượng đầu & cuối",
      "Hệ thống vận hành — hồn của mô hình farmstay bền vững",
      "Mô hình Farm-to-Table: kết nối bữa ăn với vườn rau của chính bạn",
      "Checklist 50 điểm kiểm tra trước khi đón khách đầu tiên",
      "Soft opening — cách thử nghiệm đúng để tránh sai lầm đắt giá",
      "Hoạt động trải nghiệm 4 mùa — tạo lý do để khách quay lại",
    ],
  },
  {
    num: "V",
    title: "Tiếp Thị & Phát Triển",
    subtitle: "Phải tự kể câu chuyện của mình",
    color: "#6A4C10",
    items: [
      "Xây dựng thương hiệu cá nhân & thương hiệu farmstay song song",
      "Chiến lược 3 kênh: OTA (Booking, Agoda, Airbnb) + mạng xã hội + cộng đồng",
      "Customer Journey Map — hiểu hành trình cảm xúc của khách từng bước",
      "30+ ý tưởng marketing thực chiến không tốn nhiều ngân sách",
      "Nhận diện & quản lý rủi ro — 7 loại rủi ro thường gặp nhất",
    ],
  },
];

// Legacy: kept for type compat — không dùng trực tiếp nữa
const chapters = parts.map((p, i) => ({
  num: String(i + 1).padStart(2, "0"),
  title: p.title,
  desc: p.subtitle,
}));

const testimonials = [
  { name: "Nguyễn Minh Tuấn", role: "Chủ Farmstay Đắk Nông", content: "Cuốn sách này giúp mình tránh được hàng trăm triệu sai lầm ngay từ bước lựa chọn đất. Đọc xong mới hiểu tại sao nhiều farmstay thất bại không phải vì thiếu tiền mà vì thiếu tư duy đúng.", avatar: "MT" },
  { name: "Trần Thị Hương", role: "Nhà đầu tư Farmstay Lâm Đồng", content: "Tôi đã đọc nhiều sách về du lịch nông nghiệp nhưng không có cuốn nào đi vào thực chiến như thế này. Phần về dòng tiền và vận hành thực sự là kim chỉ nam cho dự án của tôi.", avatar: "TH" },
  { name: "Lê Thanh Bình", role: "Founder Farmstay Hội An", content: "Sau khi áp dụng nguyên lý thiết kế trong sách, lượng khách đặt phòng tăng 40% chỉ trong 3 tháng. Cách kể chuyện thương hiệu theo văn hóa bản địa thực sự có tác dụng.", avatar: "LB" },
];

const faqs = [
  { q: "Sách được giao trong bao lâu?", a: "Toàn quốc 2–4 ngày làm việc qua GHN Express. Khu vực nội thành Hà Nội và TP.HCM thường nhận trong 1–2 ngày." },
  { q: "Thanh toán bằng ngân hàng nào cũng được không?", a: "Được. Mã QR dùng chuẩn VietQR — quét bằng app của bất kỳ ngân hàng nào tại Việt Nam đều thanh toán được." },
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

// ── MicButton ─────────────────────────────────────────────────────────────────
function MicButton({ isListening, onClick }: { isListening: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      title={isListening ? "Đang nghe... Nhấn để dừng" : "Nhấn để nói tiếng Việt"}
      animate={isListening ? { scale: [1, 1.15, 1] } : { scale: 1 }}
      transition={isListening ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : {}}
      style={{
        position: "absolute",
        right: 10,
        top: "50%",
        transform: "translateY(-50%)",
        background: isListening ? "rgba(196,154,40,0.18)" : "transparent",
        border: isListening ? "1px solid rgba(196,154,40,0.4)" : "none",
        borderRadius: 6,
        cursor: "pointer",
        padding: "5px 6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: isListening ? "#D4B050" : "rgba(196,154,40,0.35)",
        transition: "color 0.2s, background 0.2s",
        zIndex: 2,
      }}
    >
      {isListening ? (
        /* Sóng âm khi đang nghe */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2"  y="9"  width="3" height="6" rx="1.5" opacity="0.5"/>
          <rect x="7"  y="6"  width="3" height="12" rx="1.5" opacity="0.75"/>
          <rect x="12" y="3"  width="3" height="18" rx="1.5"/>
          <rect x="17" y="6"  width="3" height="12" rx="1.5" opacity="0.75"/>
        </svg>
      ) : (
        /* Mic icon */
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8"  y1="23" x2="16" y2="23"/>
        </svg>
      )}
    </motion.button>
  );
}

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

  // Voice input
  const [listeningField, setListeningField] = useState<keyof FormData | null>(null);
  const recognitionRef = useRef<unknown>(null);

  const startListening = useCallback((field: keyof FormData) => {
    // Dừng nếu đang nghe cùng field
    if (listeningField === field) {
      (recognitionRef.current as { stop: () => void } | null)?.stop();
      setListeningField(null);
      return;
    }
    const SR = (window as unknown as Record<string, unknown>).SpeechRecognition
            || (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    if (!SR) {
      alert("Trình duyệt chưa hỗ trợ nhập giọng nói.\nVui lòng dùng Chrome hoặc Edge.");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new (SR as new () => any)();
    recognition.lang = "vi-VN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setListeningField(field);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      const text: string = e.results[0][0].transcript;
      setForm(f => ({ ...f, [field]: text }));
      setErrors(prev => ({ ...prev, [field]: undefined }));
    };
    recognition.onend = () => setListeningField(null);
    recognition.onerror = () => setListeningField(null);
    recognitionRef.current = recognition;
    recognition.start();
  }, [listeningField]);

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
    setScreen("qr");
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
          Cảm ơn bạn đã thanh toán. Đơn hàng sẽ được xử lý và giao trong 2–4 ngày làm việc.
        </p>
        {trackingCode && <p style={{ color: "rgba(196,154,40,0.8)", fontSize: "0.85rem", textAlign: "center", marginBottom: "1.5rem" }}>Mã vận đơn GHN: <strong style={{ color: "#C49A28" }}>{trackingCode}</strong></p>}
        <p style={{ color: "rgba(237,224,196,0.45)", fontSize: "0.8rem", textAlign: "center", maxWidth: "360px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
          Nếu chưa chuyển khoản, vui lòng liên hệ Zalo <strong style={{ color: "#C49A28" }}>0935 396 705</strong> để được hỗ trợ.
        </p>
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

      {/* ── STATS BAR ───────────────────────────────────────────────────────── */}
      <section style={{ background: "#060E05", padding: "2.5rem 0", borderTop: "1px solid rgba(196,154,40,0.12)", borderBottom: "1px solid rgba(196,154,40,0.12)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", textAlign: "center" }}>
            {[
              { num: "9+", label: "Năm kinh nghiệm thực chiến" },
              { num: "50+", label: "Dự án farmstay đã tư vấn" },
              { num: "3.000+", label: "Học viên đã đào tạo" },
              { num: "280", label: "Trang kiến thức hệ thống" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "0.5rem" }}>
                <p style={{ fontFamily: "var(--font-alegreya)", fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "#D4B050", marginBottom: "0.25rem", lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.72rem", color: "rgba(237,224,196,0.5)", lineHeight: 1.4, letterSpacing: "0.03em" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MỤC LỤC THỰC TẾ ────────────────────────────────────────────────── */}
      <section style={{ background: "#0D1A0C", padding: "6rem 0", borderTop: "1px solid rgba(196,154,40,0.1)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <FadeUp>
              <p style={{ color: "rgba(196,154,40,0.7)", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Mục Lục</p>
              <h2 style={{ fontFamily: "var(--font-alegreya)", fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "#EDE0C4", marginBottom: "0.75rem" }}>
                Những Gì Bạn Sẽ Nắm Được
              </h2>
              <p style={{ fontFamily: "var(--font-nunito)", color: "rgba(237,224,196,0.5)", fontSize: "0.9rem", marginBottom: "1.5rem", maxWidth: 520, margin: "0 auto 1.5rem" }}>
                5 phần · 15 chương · Đầy đủ từ tư duy đến vận hành
              </p>
              <div style={{ width: 48, height: 1, background: "linear-gradient(90deg,transparent,#C49A28,transparent)", margin: "0 auto" }} />
            </FadeUp>
          </div>

          <StaggerParent className="space-y-5">
            {parts.map((part, pi) => (
              <StaggerChild key={pi}>
                <motion.div
                  style={{
                    border: "1px solid rgba(196,154,40,0.15)",
                    borderRadius: 14,
                    overflow: "hidden",
                    background: "rgba(13,26,12,0.6)",
                  }}
                  whileHover={{ borderColor: "rgba(196,154,40,0.35)" }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Part header */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                    padding: "1.5rem 2rem",
                    borderBottom: "1px solid rgba(196,154,40,0.08)",
                    background: "rgba(196,154,40,0.03)",
                  }}>
                    <span style={{
                      minWidth: 44,
                      height: 44,
                      borderRadius: "50%",
                      border: `1.5px solid ${part.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-alegreya)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: part.color,
                    }}>{part.num}</span>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-alegreya)", fontSize: "1.15rem", color: "#EDE0C4", margin: 0, lineHeight: 1.3 }}>
                        Phần {part.num}: {part.title}
                      </h3>
                      <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.78rem", color: "rgba(196,154,40,0.65)", margin: "3px 0 0", letterSpacing: "0.05em" }}>
                        {part.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Chapter items */}
                  <ul style={{ margin: 0, padding: "1rem 1.5rem", listStyle: "none" }}>
                    {part.items.map((item, ii) => (
                      <li key={ii} style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.75rem",
                        padding: "0.6rem 0.5rem",
                        borderBottom: ii < part.items.length - 1 ? "1px solid rgba(196,154,40,0.05)" : "none",
                      }}>
                        <span style={{ color: part.color, fontSize: "0.55rem", marginTop: "0.45em", flexShrink: 0, opacity: 0.7 }}>◆</span>
                        <span style={{ fontFamily: "var(--font-nunito)", fontSize: "0.88rem", color: "rgba(237,224,196,0.7)", lineHeight: 1.65 }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerChild>
            ))}
          </StaggerParent>

          {/* Appendix note */}
          <FadeUp delay={0.3}>
            <div style={{ marginTop: "2.5rem", padding: "1.25rem 2rem", border: "1px solid rgba(196,154,40,0.1)", borderRadius: 12, background: "rgba(196,154,40,0.03)", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              <span style={{ color: "#C49A28", fontSize: "1.1rem", marginTop: "1px" }}>+</span>
              <div>
                <p style={{ fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "0.82rem", color: "#C49A28", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Phụ Lục Thực Hành</p>
                <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.85rem", color: "rgba(237,224,196,0.55)", lineHeight: 1.7, margin: 0 }}>
                  Template mẫu kế hoạch kinh doanh đầy đủ · Worksheet phân tích tài chính 5 năm · Glossary thuật ngữ Anh–Việt chuyên ngành farmstay
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── DÀNH CHO AI ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#0A1208", padding: "6rem 0", borderTop: "1px solid rgba(196,154,40,0.08)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <FadeUp>
              <p style={{ color: "rgba(196,154,40,0.7)", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Đối Tượng</p>
              <h2 style={{ fontFamily: "var(--font-alegreya)", fontSize: "clamp(1.8rem,3vw,2.8rem)", color: "#EDE0C4", marginBottom: "0.5rem" }}>
                Sách Này Dành Cho Bạn Nếu...
              </h2>
              <div style={{ width: 48, height: 1, background: "linear-gradient(90deg,transparent,#C49A28,transparent)", margin: "0 auto" }} />
            </FadeUp>
          </div>
          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: "🌱",
                title: "Bạn đang có đất và muốn làm farmstay",
                desc: "Chưa biết bắt đầu từ đâu, lo ngại về pháp lý, thiết kế và vốn đầu tư ban đầu.",
              },
              {
                icon: "📐",
                title: "Bạn đã mở farmstay nhưng chưa hiệu quả",
                desc: "Khách thưa, dòng tiền không ổn định, vận hành rối — cần hệ thống lại từ gốc.",
              },
              {
                icon: "💼",
                title: "Bạn là nhà đầu tư tìm cơ hội mới",
                desc: "Muốn đánh giá tiềm năng dự án farmstay trước khi rót vốn một cách có căn cứ.",
              },
              {
                icon: "🎓",
                title: "Bạn đang học về du lịch nông nghiệp",
                desc: "Cần tài liệu thực chiến kết hợp lý thuyết chuẩn quốc tế và case study Việt Nam.",
              },
            ].map((item, i) => (
              <StaggerChild key={i}>
                <motion.div
                  style={{ display: "flex", gap: "1.25rem", padding: "1.5rem", background: "rgba(196,154,40,0.03)", border: "1px solid rgba(196,154,40,0.1)", borderRadius: 12 }}
                  whileHover={{ borderColor: "rgba(196,154,40,0.28)", y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <span style={{ fontSize: "1.8rem", flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-alegreya)", fontSize: "1.05rem", color: "#EDE0C4", marginBottom: "0.5rem", lineHeight: 1.35 }}>{item.title}</h3>
                    <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.85rem", color: "rgba(237,224,196,0.55)", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                  </div>
                </motion.div>
              </StaggerChild>
            ))}
          </StaggerParent>

          {/* Not for */}
          <FadeUp delay={0.2}>
            <div style={{ marginTop: "2rem", padding: "1.25rem 2rem", border: "1px solid rgba(196,154,40,0.08)", borderRadius: 12, background: "rgba(237,224,196,0.01)" }}>
              <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.82rem", color: "rgba(237,224,196,0.35)", margin: 0, lineHeight: 1.75 }}>
                <span style={{ color: "rgba(196,154,40,0.5)", fontWeight: 600 }}>Sách không phù hợp nếu</span> bạn đang tìm kiếm một công thức làm giàu nhanh hay mô hình copy-paste. Farmstay bền vững đòi hỏi sự cam kết, tình yêu với đất đai và tư duy dài hạn.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── AUTHOR BIO ──────────────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg,#0A1208 0%,#0D2010 100%)", padding: "6rem 0", borderTop: "1px solid rgba(196,154,40,0.08)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>
            <FadeUp>
              <div style={{ textAlign: "center" }}>
              <p style={{ color: "rgba(196,154,40,0.7)", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "2rem" }}>Tác Giả</p>
              {/* Avatar placeholder */}
              <div style={{ width: 90, height: 90, borderRadius: "50%", border: "2px solid rgba(196,154,40,0.4)", background: "rgba(196,154,40,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontFamily: "var(--font-alegreya)", fontSize: "2rem", color: "#C49A28" }}>PTT</div>
              <h2 style={{ fontFamily: "var(--font-alegreya)", fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "#EDE0C4", marginBottom: "0.35rem" }}>Phạm Thanh Tùng</h2>
              <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.82rem", color: "rgba(196,154,40,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2rem" }}>Nhà Hoạch Định Farmstay & Du Lịch Nông Nghiệp</p>
              <div style={{ height: 1, width: 48, background: "linear-gradient(90deg,transparent,#C49A28,transparent)", margin: "0 auto 2rem" }} />
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div style={{ maxWidth: 680, textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-alegreya)", color: "rgba(237,224,196,0.88)", fontStyle: "italic", fontSize: "clamp(1.05rem,1.8vw,1.35rem)", lineHeight: 1.85, marginBottom: "2.5rem" }}>
                &ldquo;Tôi viết cuốn sách này với nước mắt lẫn cười. Nước mắt vì chứng kiến quá nhiều gia đình đổ hết tiền tích cóp vào một giấc mơ farmstay rồi thất bại. Nụ cười vì tôi biết — nếu được trang bị đúng — giấc mơ đó hoàn toàn thực hiện được.&rdquo;
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", maxWidth: 600, margin: "0 auto 2rem" }}>
                {[
                  { label: "Sáng lập", value: "DEFARM · MASTERY" },
                  { label: "Dự án", value: "Xuyên Việt Farmstay" },
                  { label: "Cộng đồng", value: "Farmstay Update" },
                ].map((item, i) => (
                  <div key={i} style={{ padding: "1rem", border: "1px solid rgba(196,154,40,0.12)", borderRadius: 10, background: "rgba(196,154,40,0.03)" }}>
                    <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.68rem", color: "rgba(196,154,40,0.55)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.35rem" }}>{item.label}</p>
                    <p style={{ fontFamily: "var(--font-alegreya)", fontSize: "0.95rem", color: "#EDE0C4" }}>{item.value}</p>
                  </div>
                ))}
              </div>

              <p style={{ fontFamily: "var(--font-nunito)", color: "rgba(237,224,196,0.5)", fontSize: "0.88rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                Hơn 9 năm tư vấn và đồng hành cùng 50+ dự án farmstay từ Hà Giang đến Cà Mau. Người sáng lập DEFARM — tổ chức đào tạo và tư vấn phát triển farmstay bền vững đầu tiên tại Việt Nam. Tác giả bộ sách <em style={{ color: "rgba(196,154,40,0.8)" }}>Farmstay Bền Vững</em>.
              </p>
              <a
                href="/ve-toi"
                style={{ display: "inline-block", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C49A28", textDecoration: "none", borderBottom: "1px solid rgba(196,154,40,0.3)", paddingBottom: "2px" }}
              >
                Xem Hồ Sơ Đầy Đủ →
              </a>
              </div>
            </FadeUp>
          </div>
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

      {/* ── TRUST BADGES ────────────────────────────────────────────────────── */}
      <section style={{ background: "#060E05", padding: "2rem 0", borderTop: "1px solid rgba(196,154,40,0.08)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.5rem 3rem" }}>
            {[
              { icon: "🔒", text: "Thanh toán an toàn" },
              { icon: "🚚", text: "Giao hàng toàn quốc" },
              { icon: "↩️", text: "Đổi sách nếu lỗi in" },
              { icon: "⚡", text: "Xử lý trong 24h" },
            ].map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1rem" }}>{b.icon}</span>
                <span style={{ fontFamily: "var(--font-nunito)", fontSize: "0.78rem", color: "rgba(237,224,196,0.45)", letterSpacing: "0.05em" }}>{b.text}</span>
              </div>
            ))}
          </div>
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
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(prev => ({ ...prev, name: undefined })); }}
                    placeholder="Nguyễn Văn A"
                    style={{ ...(errors.name ? inputErrorStyle : inputStyle), paddingRight: 42 }}
                  />
                  <MicButton isListening={listeningField === "name"} onClick={() => startListening("name")} />
                </div>
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
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    value={form.street}
                    onChange={e => { setForm(f => ({ ...f, street: e.target.value })); setErrors(prev => ({ ...prev, street: undefined })); }}
                    placeholder="123 Đường Lê Lợi"
                    style={{ ...(errors.street ? inputErrorStyle : inputStyle), paddingRight: 42 }}
                  />
                  <MicButton isListening={listeningField === "street"} onClick={() => startListening("street")} />
                </div>
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
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Ghi chú (tùy chọn)</label>
                  <motion.button
                    type="button"
                    onClick={() => startListening("note")}
                    title={listeningField === "note" ? "Đang nghe... Nhấn để dừng" : "Nhấn để nói ghi chú"}
                    animate={listeningField === "note" ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={listeningField === "note" ? { duration: 1, repeat: Infinity } : {}}
                    style={{
                      display: "flex", alignItems: "center", gap: "5px",
                      background: listeningField === "note" ? "rgba(196,154,40,0.15)" : "transparent",
                      border: listeningField === "note" ? "1px solid rgba(196,154,40,0.35)" : "1px solid rgba(196,154,40,0.15)",
                      borderRadius: 6, cursor: "pointer", padding: "4px 10px",
                      color: listeningField === "note" ? "#D4B050" : "rgba(196,154,40,0.45)",
                      fontFamily: "var(--font-nunito)", fontSize: "10px", letterSpacing: "0.08em",
                      transition: "all 0.2s",
                    }}
                  >
                    {listeningField === "note" ? (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="2" y="9" width="3" height="6" rx="1.5" opacity="0.5"/>
                        <rect x="7" y="6" width="3" height="12" rx="1.5" opacity="0.75"/>
                        <rect x="12" y="3" width="3" height="18" rx="1.5"/>
                        <rect x="17" y="6" width="3" height="12" rx="1.5" opacity="0.75"/>
                      </svg>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                        <line x1="12" y1="19" x2="12" y2="23"/>
                        <line x1="8" y1="23" x2="16" y2="23"/>
                      </svg>
                    )}
                    {listeningField === "note" ? "Đang nghe..." : "Nói"}
                  </motion.button>
                </div>
                <textarea
                  value={form.note}
                  onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                  placeholder="Nói hoặc gõ yêu cầu đặc biệt, ký tặng, v.v..."
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", border: listeningField === "note" ? "1px solid rgba(196,154,40,0.45)" : inputStyle.border }}
                />
              </div>

              {/* Payment method — QR only */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.9rem 1.1rem", border: "1px solid rgba(196,154,40,0.25)", borderRadius: 10, background: "rgba(196,154,40,0.05)" }}>
                <span style={{ fontSize: "1.3rem" }}>📱</span>
                <div>
                  <p style={{ color: "#D4B050", fontFamily: "var(--font-nunito)", fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>Chuyển Khoản VietQR</p>
                  <p style={{ color: "rgba(237,224,196,0.45)", fontFamily: "var(--font-nunito)", fontSize: "0.72rem", margin: "2px 0 0" }}>Quét mã bằng app ngân hàng bất kỳ — xác nhận tức thì</p>
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
                  "Tiến Hành Thanh Toán QR"
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

      {/* ── STICKY MOBILE CTA ───────────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "0.85rem 1.25rem",
          background: "rgba(6,14,5,0.95)",
          borderTop: "1px solid rgba(196,154,40,0.2)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
        className="md:hidden"
      >
        <div>
          <p style={{ fontFamily: "var(--font-alegreya)", fontSize: "1.2rem", color: "#D4B050", margin: 0, lineHeight: 1 }}>{fmt(PRICE)}</p>
          <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.68rem", color: "rgba(237,224,196,0.4)", margin: "2px 0 0" }}>+ phí ship {fmt(SHIPPING)}</p>
        </div>
        <button
          onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
          style={{ flexShrink: 0, background: "linear-gradient(135deg,#C49A28,#D4B050)", color: "#0A1208", fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "12px 24px", borderRadius: 8, border: "none", cursor: "pointer" }}
        >
          Đặt Mua Ngay
        </button>
      </div>

      {/* Keyframes for spinner */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
