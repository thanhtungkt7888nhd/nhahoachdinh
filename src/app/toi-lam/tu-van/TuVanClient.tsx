"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandscapeHeroBg from "@/components/ui/LandscapeHeroBg";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/animations";

const easeOut = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    num: "01",
    title: "Một Giờ Mentor Giải Cứu",
    icon: "⚡",
    tag: "Online · 1-on-1",
    desc: "Dành cho: bạn đang bế tắc, cần cắt đứt ngay nút thắt tư duy đang kìm hãm dự án.",
    detail: [
      "Chỉ với một giờ làm việc trực tiếp 1-on-1, mình sẽ giúp cắt đứt nút thắt tư duy đang khiến bạn bế tắc.",
      "Đôi khi, một câu nói đúng thời điểm sẽ cứu bạn khỏi việc đốt tiền oan uổng.",
      "Kết quả: thoát kẹt ngay trong 60 phút với định hướng rõ ràng.",
      "Hình thức: Online, 1-on-1 trực tiếp với Phạm Thanh Tùng.",
    ],
  },
  {
    num: "02",
    title: "Khảo Sát Thực Địa & Định Hướng",
    icon: "🗺️",
    tag: "Trực tiếp tại đất",
    desc: "Dành cho: bạn có đất nhưng chưa biết bắt đầu từ đâu.",
    detail: [
      "Mình trực tiếp xách ba lô đến giẫm chân lên mảnh đất của bạn. Quan sát địa thế, đọc vị khu đất và phác thảo ngay định hướng phát triển chia theo từng giai đoạn.",
      "Dựa trên chính nguồn lực thực tế bạn đang có — tuyệt đối không vẽ vời ảo tưởng.",
      "Bạn sẽ ra về với một bản đồ hành động rõ ràng, khả thi và được cá nhân hóa hoàn toàn.",
    ],
  },
  {
    num: "03",
    title: "Cố Vấn Chiến Lược Dài Hạn",
    icon: "🧭",
    tag: "3–12 tháng",
    desc: "Dành cho: bạn muốn có người đồng hành từ lúc còn là ý tưởng sơ khai đến khi vận hành ra dòng tiền ổn định.",
    detail: [
      "Mình đóng vai trò là điểm neo tư duy — bạn luôn có người kéo lại khi đi lệch hướng.",
      "Đồng hành sát cánh từ lúc thai nghén ý tưởng, vượt rào cản pháp lý, thiết kế quy hoạch cho đến khi vận hành ra dòng tiền ổn định.",
      "Đây là gói hợp tác sâu nhất và có giá trị lâu dài nhất mình cung cấp.",
    ],
  },
  {
    num: "04",
    title: "Member Hội Đồng Nhà Hoạch Định",
    icon: "🏛️",
    tag: "Sinh hoạt hàng tháng",
    desc: "Sân chơi dành riêng cho cộng đồng tinh hoa — cập nhật tri thức, giải phẫu bài toán thực tế.",
    detail: [
      "Mỗi tháng chúng ta sinh hoạt online kín để cập nhật tri thức mới nhất về Farmstay thế giới, ngách kinh doanh, chính sách.",
      "Trực tiếp giải phẫu các bài toán thực tế của hội viên — cùng nhau phân tích, phản biện và tìm ra giải pháp.",
      "Cộng đồng của những người làm thật, kết nối với mạng lưới hàng nghìn chủ farm chất lượng cao nhất Việt Nam.",
    ],
  },
  {
    num: "05",
    title: "Tư Vấn Vĩ Mô Cấp Địa Phương",
    icon: "🌐",
    tag: "Dành cho lãnh đạo địa phương",
    desc: "Dành riêng cho Lãnh đạo cấp Xã, Huyện, Tỉnh muốn khai phóng nguồn lực nông thôn.",
    detail: [
      "Về khai phóng nguồn lực nông thôn, phát triển du lịch nông nghiệp và chuyển đổi số cấp địa phương.",
      "Mình đã và đang làm việc trực tiếp với nhiều địa phương trên toàn quốc — từ Quảng Nam, Đắk Lắk, Phú Yên, Bình Định, Hà Tĩnh đến Quảng Trị.",
      "Khi chính quyền và cộng đồng cùng đi một hướng, sức mạnh tổng lực tạo ra là không thể đo đếm.",
    ],
  },
];

export default function TuVanClient() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Phong cảnh cố định */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <LandscapeHeroBg />
      </div>

      <div className="pt-[88px]" style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO ── */}
        <section className="py-20 md:py-28 text-center px-4">
          <div className="container-main max-w-2xl">
            <motion.p
              className="gold-shine font-sans font-semibold uppercase tracking-[0.3em] text-xs mb-4"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            >
              Tôi Làm · Tư Vấn / Cố Vấn
            </motion.p>
            <motion.h1
              className="font-serif text-white leading-tight mb-5"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            >
              Các Gói Đồng Hành
            </motion.h1>
            <motion.div
              className="mx-auto w-12 h-px mb-6"
              style={{ background: "linear-gradient(90deg, transparent, #C8A84B, transparent)" }}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
            />
            <motion.p
              className="font-sans text-white/65 leading-relaxed"
              style={{ fontSize: "1rem" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
            >
              Từ năm 2024 đến 2030, mình tập trung vào 5 vai trò đồng hành.
              Mỗi gói được thiết kế cho một nhu cầu cụ thể —
              không có gói nào là tốt hơn gói nào, chỉ có gói nào phù hợp với bạn nhất.
            </motion.p>
          </div>
        </section>

        {/* ── 5 DỊCH VỤ ── */}
        <section className="pb-16 md:pb-20 px-4">
          <div className="container-main max-w-4xl">

            {/* Buttons chọn — 3 cột mobile, 5 cột desktop */}
            <StaggerParent className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-3 mb-4">
              {services.map((s, i) => (
                <StaggerChild key={i}>
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="group text-center px-2 py-4 md:px-3 md:py-5 border transition-all duration-300 rounded-sm focus:outline-none w-full"
                    style={{
                      borderColor: openIdx === i ? "#C8A84B" : "rgba(200,168,75,0.22)",
                      background: openIdx === i ? "rgba(8,16,6,0.72)" : "rgba(8,16,6,0.45)",
                    }}
                  >
                    <div
                      className="mx-auto mb-2.5 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl"
                      style={{
                        background: "linear-gradient(135deg, #1C2A1C, #1D3A1D) padding-box, linear-gradient(135deg, #8a6a1a 0%, #C8A84B 50%, #8a6a1a 100%) border-box",
                        border: "1.5px solid transparent",
                        boxShadow: "0 0 10px rgba(200,168,75,0.15)",
                      }}
                    >
                      {s.icon}
                    </div>
                    <p className="gold-shine font-serif font-bold mb-1" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>{s.num}</p>
                    <p className="font-sans text-white/50 text-[9px] md:text-[10px] uppercase tracking-wider leading-relaxed group-hover:text-white/70 transition-colors line-clamp-2">
                      {s.title}
                    </p>
                    <motion.div
                      className="mx-auto mt-2 text-primary/60"
                      animate={{ rotate: openIdx === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
                        <path d="M7 9.5L1.5 4h11L7 9.5z" />
                      </svg>
                    </motion.div>
                  </button>
                </StaggerChild>
              ))}
            </StaggerParent>

            {/* Panel mở rộng */}
            <AnimatePresence mode="wait">
              {openIdx !== null && (
                <motion.div
                  key={openIdx}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <div
                    className="mt-3 p-6 md:p-10 border rounded-sm"
                    style={{
                      borderColor: "rgba(200,168,75,0.28)",
                      background: "rgba(8,14,6,0.78)",
                    }}
                  >
                    {/* Header gói */}
                    <div className="flex flex-wrap items-start gap-4 mb-5">
                      <div
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #1C2A1C, #1D3A1D) padding-box, linear-gradient(135deg, #8a6a1a 0%, #C8A84B 50%, #8a6a1a 100%) border-box",
                          border: "1.5px solid transparent",
                          boxShadow: "0 0 14px rgba(200,168,75,0.2)",
                        }}
                      >
                        {services[openIdx].icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="gold-shine font-serif font-bold block" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1 }}>
                          {services[openIdx].num}
                        </span>
                        <p className="font-sans text-white/75 text-sm uppercase tracking-widest mt-0.5">
                          {services[openIdx].title}
                        </p>
                        <span
                          className="inline-block mt-2 px-3 py-0.5 rounded-full font-sans text-[10px] uppercase tracking-wider"
                          style={{ background: "rgba(200,168,75,0.12)", color: "#C8A84B", border: "1px solid rgba(200,168,75,0.25)" }}
                        >
                          {services[openIdx].tag}
                        </span>
                      </div>
                    </div>

                    {/* Mô tả */}
                    <p className="font-sans text-white/55 italic mb-5" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                      {services[openIdx].desc}
                    </p>

                    <div className="border-t mb-5" style={{ borderColor: "rgba(200,168,75,0.15)" }} />

                    {/* Chi tiết */}
                    <div className="space-y-3.5 mb-7">
                      {services[openIdx].detail.map((para, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, x: -14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: j * 0.07, ease: easeOut }}
                          className="flex gap-3"
                        >
                          <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <p className="font-sans text-white/75 leading-relaxed" style={{ fontSize: "0.97rem" }}>{para}</p>
                        </motion.div>
                      ))}
                    </div>

                    <Link href="/lien-he" className="btn-lienhe inline-flex">
                      <span className="gold-shine">Liên Hệ Đăng Ký</span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 text-center px-4">
          <FadeUp>
            <p className="gold-shine font-sans font-semibold uppercase tracking-[0.25em] text-xs mb-4">
              Không chắc gói nào phù hợp?
            </p>
            <h2 className="font-serif text-white mb-5" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
              Hãy nói chuyện trực tiếp
            </h2>
            <p className="font-sans text-white/55 max-w-sm mx-auto mb-8 leading-relaxed" style={{ fontSize: "0.95rem" }}>
              Mình sẽ lắng nghe tình huống cụ thể của bạn và đề xuất cách đồng hành phù hợp nhất.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/lien-he" className="btn-lienhe">
                <span className="gold-shine">Liên Hệ Ngay</span>
              </Link>
              <Link href="/toi-lam" className="btn-white">
                ← Quay lại Tôi Làm
              </Link>
            </div>
          </FadeUp>
        </section>

      </div>
    </div>
  );
}
