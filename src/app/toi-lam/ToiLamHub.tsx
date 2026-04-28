"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import LandscapeHeroBg from "@/components/ui/LandscapeHeroBg";

const easeOut = [0.22, 1, 0.36, 1] as const;

const cards = [
  {
    num: "01",
    title: "Mục Tiêu\nCủa Tôi",
    subtitle: "Tầm nhìn & sứ mệnh",
    desc: "Định vị Việt Nam trở thành Quốc gia Du lịch Nông nghiệp độc đáo nhất thế giới — hành trình bắt đầu từ một kiến trúc sư.",
    href: "/toi-lam/muc-tieu",
    img: "/images/portrait-stage-1.jpg",
    imgPos: "center 25%",
    accent: "#C8A84B",
  },
  {
    num: "02",
    title: "Xuyên Việt\nFarmstay",
    subtitle: "Hành trình thực địa",
    desc: "4 mùa kết nối — 2.000km xuyên Việt, 45–50 trang trại, hàng trăm chủ farm cùng chung một hệ giá trị.",
    href: "/toi-lam/xuyen-viet-farmstay",
    img: "/images/outdoor-1-mountain-tea.jpg",
    imgPos: "center 40%",
    accent: "#7ab35e",
  },
  {
    num: "03",
    title: "Farmstay\nUpdate",
    subtitle: "Tri thức hệ thống",
    desc: "Hội thảo thường niên cập nhật tri thức farmstay mới nhất — nơi chuyên gia gặp nhà đầu tư, lý luận gặp thực tiễn.",
    href: "/toi-lam/farmstay-update",
    img: "/images/event-farmstay-update.jpg",
    imgPos: "center 30%",
    accent: "#C8A84B",
  },
  {
    num: "04",
    title: "Tư Vấn /\nCố Vấn",
    subtitle: "Đồng hành chiến lược",
    desc: "Từ 1 giờ mentor giải cứu đến cố vấn dài hạn — mình đồng hành từ lúc còn là ý tưởng đến khi ra dòng tiền ổn định.",
    href: "/toi-lam/tu-van",
    img: "/images/outdoor-2-garden-speaking.jpg",
    imgPos: "center 30%",
    accent: "#C8A84B",
  },
];

export default function ToiLamHub() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Phong cảnh cố định */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <LandscapeHeroBg />
      </div>

      <div className="pt-[88px]" style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO nhỏ ── */}
        <section className="py-16 md:py-20 text-center">
          <motion.p
            className="gold-shine font-sans font-semibold uppercase tracking-[0.3em] text-xs mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
          >
            Phạm Thanh Tùng
          </motion.p>
          <motion.h1
            className="font-serif text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
          >
            Tôi Làm
          </motion.h1>
          <motion.div
            className="mx-auto w-12 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #C8A84B, transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
          />
          <motion.p
            className="font-sans text-white/55 mt-5 max-w-md mx-auto"
            style={{ fontSize: "0.95rem", lineHeight: 1.75 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
          >
            {"Những gì mình đang xây dựng — không nói những thứ chưa làm\u00A0được."}
          </motion.p>
        </section>

        {/* ── 4 CARDS ── */}
        <section className="pb-24 px-4 md:px-6 lg:px-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15 + i * 0.1, ease: easeOut }}
              >
                <Link href={card.href} className="group block relative overflow-hidden rounded-sm"
                  style={{ aspectRatio: "16/10" }}
                >
                  {/* Ảnh nền */}
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: card.imgPos }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Lớp tối gradient */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(160deg, rgba(8,16,8,0.55) 0%, rgba(8,16,8,0.85) 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(160deg, rgba(8,16,8,0.65) 0%, rgba(8,16,8,0.92) 100%)",
                    }}
                  />

                  {/* Viền vàng hover */}
                  <div
                    className="absolute inset-0 border border-transparent group-hover:border-[rgba(200,168,75,0.4)] rounded-sm transition-all duration-500"
                  />

                  {/* Nội dung */}
                  <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-8">
                    {/* Top — số thứ tự + subtitle */}
                    <div className="flex items-start justify-between">
                      <span
                        className="font-serif font-bold"
                        style={{ fontSize: "clamp(2.4rem, 4vw, 3.2rem)", color: "rgba(200,168,75,0.25)", lineHeight: 1 }}
                      >
                        {card.num}
                      </span>
                      <span
                        className="font-sans font-semibold uppercase tracking-[0.18em] text-[10px] px-3 py-1 rounded-full"
                        style={{ background: "rgba(200,168,75,0.15)", color: "#C8A84B", border: "1px solid rgba(200,168,75,0.3)" }}
                      >
                        {card.subtitle}
                      </span>
                    </div>

                    {/* Bottom — tiêu đề + mô tả + arrow */}
                    <div>
                      <h2
                        className="font-serif text-white leading-tight mb-3 whitespace-pre-line"
                        style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)" }}
                      >
                        {card.title}
                      </h2>
                      <p
                        className="font-sans text-white/55 leading-relaxed mb-5 max-w-xs"
                        style={{ fontSize: "0.88rem" }}
                      >
                        {card.desc}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-sans font-semibold uppercase tracking-[0.2em] text-[11px] transition-colors duration-300"
                          style={{ color: "#C8A84B" }}
                        >
                          Khám phá
                        </span>
                        <motion.span
                          className="inline-block"
                          initial={false}
                          whileHover={{ x: 4 }}
                          style={{ color: "#C8A84B", fontSize: 14 }}
                        >
                          →
                        </motion.span>
                      </div>

                      {/* Gold line bottom — mở rộng khi hover */}
                      <div
                        className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500"
                        style={{ background: "linear-gradient(90deg, #C8A84B, rgba(200,168,75,0.2))" }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
