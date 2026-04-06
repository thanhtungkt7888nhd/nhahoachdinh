"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/data";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax: background moves slower than scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Content fades out slightly on scroll
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(29,58,29,0.60) 0%, rgba(29,58,29,0.35) 60%, rgba(28,42,28,0.70) 100%), url('/images/hero-bg.jpg')",
          backgroundColor: "#1D3A1D",
          y: bgY,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Tagline */}
        <motion.p
          className="gold-shine font-sans font-semibold uppercase tracking-[0.35em] text-sm mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
        >
          {siteConfig.tagline}
        </motion.p>

        {/* Name — large reveal */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            className="font-serif text-white leading-none"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              textShadow: "3px 3px 12px rgba(0,0,0,0.3)",
            }}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.4, ease: easeOut }}
          >
            {siteConfig.name}
          </motion.h1>
        </div>

        {/* Vision */}
        <motion.p
          className="font-serif text-white/90 mb-10 max-w-2xl mx-auto"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
            textShadow: "1px 1px 6px rgba(0,0,0,0.4)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: easeOut }}
        >
          {siteConfig.vision}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: easeOut }}
        >
          <Link href="#ve-toi" className="btn-white">
            Tìm Hiểu Thêm
          </Link>
          <Link href="/lien-he" className="btn-lienhe">
            <span className="gold-shine">Liên Hệ Ngay</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Cuộn xuống</span>
        <motion.div
          className="w-px h-10 bg-white/40"
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
