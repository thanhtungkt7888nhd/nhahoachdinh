"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

// Gold shimmer — vàng đồng trên nền tối
const shimmerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg,#6A4C10 0%,#A07820 20%,#C49A28 35%,#D4B050 50%,#C49A28 65%,#A07820 80%,#6A4C10 100%)",
  backgroundSize: "300% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "gold-shimmer 5s linear infinite",
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY  = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen grid overflow-hidden"
      style={{ gridTemplateColumns: "1fr 1fr" }}
    >
      {/* ── LEFT — GAM ĐẬM: deep forest near-black ─────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col justify-center px-10 py-32 lg:px-16"
        style={{
          background: "linear-gradient(160deg, #0D1A0C 0%, #0A1208 100%)",
          y: textY,
        }}
      >
        {/* Đường vàng dọc bên trái */}
        <div
          className="absolute left-0 top-16 bottom-16"
          style={{
            width: "1px",
            background:
              "linear-gradient(180deg,transparent,rgba(196,154,40,0.55) 30%,rgba(196,154,40,0.55) 70%,transparent)",
          }}
        />

        {/* Tag */}
        <motion.p
          className="font-sans font-semibold uppercase mb-6"
          style={{ fontSize: "10px", letterSpacing: "0.32em", color: "#C49A28" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          {siteConfig.tagline} · Farmstay Việt Nam
        </motion.p>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
        >
          <h1
            className="font-serif leading-none mb-7"
            style={{ fontSize: "clamp(2.6rem, 5vw, 5rem)", color: "#EDE0C4" }}
          >
            Phạm
            <br />
            Thanh{" "}
            <span style={{ ...shimmerStyle }}>Tùng</span>
          </h1>
        </motion.div>

        {/* Thin gold rule */}
        <motion.div
          className="mb-6"
          style={{
            height: "1px",
            width: "2.5rem",
            background: "linear-gradient(90deg,#C49A28,rgba(196,154,40,0.2))",
          }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease }}
        />

        {/* Vision */}
        <motion.p
          className="font-sans leading-relaxed mb-9 max-w-sm text-justify"
          style={{ fontSize: "0.95rem", color: "rgba(237,224,196,0.7)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease }}
        >
          {siteConfig.vision}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease }}
        >
          {/* Primary — vàng đồng đặc */}
          <Link
            href="/lien-he"
            className="inline-block font-sans font-semibold uppercase text-xs tracking-[0.2em] px-7 py-3.5 transition-all duration-300"
            style={{
              background: "#C49A28",
              color: "#0A1208",
              border: "1px solid #C49A28",
              borderRadius: "8px",
            }}
          >
            Liên Hệ Ngay
          </Link>
          {/* Secondary — outline kem */}
          <Link
            href="/ve-toi"
            className="inline-block font-sans font-semibold uppercase text-xs tracking-[0.2em] px-7 py-3.5 transition-all duration-300"
            style={{
              background: "transparent",
              color: "#EDE0C4",
              border: "1px solid rgba(237,224,196,0.3)",
              borderRadius: "8px",
            }}
          >
            Tìm Hiểu Thêm
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-start gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{ color: "rgba(196,154,40,0.45)" }}
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.3em]">Cuộn xuống</span>
          <motion.div
            className="w-px h-8"
            style={{ background: "rgba(196,154,40,0.5)" }}
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* ── RIGHT — full-bleed photo với overlay tối ─────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Overlay tối 35% */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.35)" }}
        />
        {/* Fade trái từ dark */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg,#0D1A0C 0%,rgba(13,26,12,0.3) 20%,transparent 50%)",
          }}
        />
        {/* Fade dưới lên */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg,rgba(10,18,8,0.65) 0%,transparent 40%)",
          }}
        />

        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <Image
            src="/images/outdoor-4-waterfall.jpg"
            alt="Phạm Thanh Tùng"
            fill
            className="object-cover object-center"
            priority
            sizes="50vw"
          />
        </motion.div>
      </div>

      {/* ── Gold hairline bottom — shimmer ─────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg,transparent,rgba(196,154,40,0.6) 30%,rgba(212,176,80,0.9) 50%,rgba(196,154,40,0.6) 70%,transparent)",
          backgroundSize: "200% auto",
          animation: "gold-shimmer 4s linear infinite",
        }}
      />
    </section>
  );
}
