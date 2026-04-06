"use client";

import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import MissionSection from "@/components/MissionSection";
import CompaniesSection from "@/components/CompaniesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PressSection from "@/components/PressSection";
import KnowledgeGrid from "@/components/KnowledgeGrid";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/animations";
import { siteConfig } from "@/lib/data";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <MissionSection />
      <CompaniesSection />
      <TestimonialsSection />
      <PressSection />
      <KnowledgeGrid limit={6} showHeading={true} />

      {/* CTA — dark full-width */}
      <section
        className="relative py-28 flex items-center justify-center text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
      >
        {/* Animated gold orb */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 60% 40%, #C8A84B 0%, transparent 60%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-main relative z-10 max-w-2xl">
          <FadeUp>
            <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-5">Bắt Đầu Hành Trình</p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2
              className="font-serif text-white mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Hãy Cùng Nhau Xây Dựng Điều Gì Đó Bền Vững
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <motion.div
              className="w-12 h-0.5 bg-primary mx-auto mb-7"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
              style={{ transformOrigin: "center" }}
            />
          </FadeUp>
          <FadeUp delay={0.35}>
            <p className="font-sans text-white/60 leading-relaxed mb-10 text-sm">
              Bạn có một vùng đất, một ý tưởng, hay một dự án cần định hướng?
              Hãy để chúng ta cùng nhau trao đổi.
            </p>
          </FadeUp>
          <FadeUp delay={0.45}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/lien-he" className="btn-lienhe"><span className="gold-shine">Liên Hệ Ngay</span></Link>
              <Link href="/chia-se-kien-thuc" className="btn-white">Đọc Kiến Thức</Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.6}>
            <p className="font-sans text-white/30 text-xs mt-10 tracking-widest">
              {siteConfig.phone} &nbsp;·&nbsp; {siteConfig.email}
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
