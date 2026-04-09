"use client";

import { motion } from "framer-motion";
import { companies } from "@/lib/data";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/animations";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function CompaniesSection() {
  return (
    <section
      id="viec-toi-lam"
      className="relative py-24 md:py-32 bg-navy text-white overflow-hidden"
    >
      {/* Subtle gradient orbs — static */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #C8A84B 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4E7040 0%, transparent 50%)",
        }}
      />

      <div className="container-main relative z-10">
        {/* Heading */}
        <FadeUp className="text-center mb-16">
          <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-4">Vai Trò</p>
          <h2
            className="gold-shine font-serif"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Các Tổ Chức Mình Dẫn Dắt
          </h2>
          <motion.div
            className="w-12 h-0.5 bg-primary mx-auto mt-5"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
            style={{ transformOrigin: "center" }}
          />
        </FadeUp>

        {/* Cards — stagger in */}
        <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((c, i) => (
            <StaggerChild key={i}>
              <motion.a
                href={c.href}
                className="group relative border border-white/10 p-8 flex flex-col h-full
                           hover:border-primary/60 transition-colors duration-300"
                whileHover={{ y: -6, transition: { duration: 0.3, ease: easeOut } }}
              >
                {/* Number accent */}
                <span className="font-serif text-white/5 text-8xl absolute top-2 right-4 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon box */}
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/25 transition-colors duration-300">
                  <span className="font-serif font-bold text-primary text-xl">
                    {c.name.slice(0, 2)}
                  </span>
                </div>

                <h3 className="font-serif text-white text-xl mb-1 group-hover:text-primary transition-colors duration-300">
                  {c.name}
                </h3>
                <p className="section-label text-primary/70 text-[10px] mb-3">{c.role}</p>
                <p className="font-sans text-white/50 text-sm leading-relaxed text-justify">{c.description}</p>

                {/* Bottom border reveal on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4, ease: easeOut }}
                />
              </motion.a>
            </StaggerChild>
          ))}
        </StaggerParent>
      </div>
    </section>
  );
}
