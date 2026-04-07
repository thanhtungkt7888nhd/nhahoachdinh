"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

// Ánh kim sweep trên nền sáng
const shimmerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg,#7A5C1A 0%,#B8902A 20%,#C8A84B 35%,#E8C860 50%,#C8A84B 65%,#B8902A 80%,#7A5C1A 100%)",
  backgroundSize: "300% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "gold-shimmer 5s linear infinite",
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen grid overflow-hidden"
      style={{ gridTemplateColumns: "1fr 1fr" }}
    >
      {/* ── LEFT — cream light, Magazine split ─────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col justify-center px-10 py-32 lg:px-16"
        style={{
          background: "linear-gradient(160deg, #FAF6EE 0%, #F5EAD5 100%)",
          y: textY,
        }}
      >
        {/* Đường vàng dọc bên trái — thay cho heavy border */}
        <div
          className="absolute left-0 top-16 bottom-16"
          style={{
            width: "1px",
            background:
              "linear-gradient(180deg,transparent,rgba(200,168,75,0.5) 30%,rgba(200,168,75,0.5) 70%,transparent)",
          }}
        />

        {/* Tag */}
        <motion.p
          className="font-sans font-semibold uppercase mb-6"
          style={{
            fontSize: "10px",
            letterSpacing: "0.32em",
            color: "#C8A84B",
          }}
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
            className="font-serif leading-none mb-1"
            style={{ fontSize: "clamp(2.6rem, 5vw, 5rem)", color: "#1C2A1C" }}
          >
            Phạm
            <br />
            Thanh
          </h1>
          <h1
            className="font-serif leading-none mb-7"
            style={{ fontSize: "clamp(2.6rem, 5vw, 5rem)", ...shimmerStyle }}
          >
            Tùng
          </h1>
        </motion.div>

        {/* Thin gold rule */}
        <motion.div
          className="mb-6"
          style={{
            height: "1px",
            width: "2.5rem",
            background: "linear-gradient(90deg,#C8A84B,rgba(200,168,75,0.2))",
          }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease }}
        />

        {/* Vision */}
        <motion.p
          className="font-sans leading-relaxed mb-9 max-w-sm"
          style={{ fontSize: "0.95rem", color: "rgba(28,42,28,0.65)" }}
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
          <Link
            href="/lien-he"
            className="inline-block font-sans font-semibold uppercase text-xs tracking-[0.2em] px-7 py-3.5 transition-all duration-300"
            style={{
              background: "#1C2A1C",
              color: "#C8A84B",
              border: "1px solid #1C2A1C",
              borderRadius: "3px",
            }}
          >
            Liên Hệ Ngay
          </Link>
          <Link
            href="/ve-toi"
            className="inline-block font-sans font-semibold uppercase text-xs tracking-[0.2em] px-7 py-3.5 transition-all duration-300"
            style={{
              background: "transparent",
              color: "#1C2A1C",
              border: "1px solid rgba(28,42,28,0.25)",
              borderRadius: "3px",
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
          style={{ color: "rgba(28,42,28,0.35)" }}
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.3em]">Cuộn xuống</span>
          <motion.div
            className="w-px h-8"
            style={{ background: "rgba(200,168,75,0.5)" }}
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* ── RIGHT — full-bleed photo ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* 10% black overlay — gam đậm nhẹ */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.10)" }}
        />
        {/* Fade từ trái vào */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg,#F5EAD5 0%,rgba(245,234,213,0.3) 20%,transparent 50%)",
          }}
        />
        {/* Fade từ dưới lên */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg,rgba(250,246,238,0.6) 0%,transparent 40%)",
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

      {/* ── Gold hairline bottom ─────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg,transparent,rgba(200,168,75,0.6) 30%,rgba(240,208,117,0.8) 50%,rgba(200,168,75,0.6) 70%,transparent)",
          backgroundSize: "200% auto",
          animation: "gold-shimmer 4s linear infinite",
        }}
      />
    </section>
  );
}
