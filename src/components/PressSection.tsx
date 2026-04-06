"use client";

import { motion } from "framer-motion";
import { pressItems } from "@/lib/data";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/animations";

export default function PressSection() {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
    >
      <div className="container-main">
        <FadeUp className="text-center mb-12">
          <p className="gold-shine font-sans font-semibold uppercase tracking-[0.25em] text-sm mb-3">
            Truyền Thông
          </p>
          <h2
            className="font-serif text-white"
            style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)" }}
          >
            Được Nhắc Đến Trên Báo Chí
          </h2>
          <div className="w-10 h-0.5 bg-primary mx-auto mt-5" />
        </FadeUp>

        <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pressItems.map((p, i) => (
            <StaggerChild key={i}>
              <motion.a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-6 border rounded-sm relative overflow-hidden"
                style={{ borderColor: "rgba(200,168,75,0.18)", background: "rgba(255,255,255,0.03)" }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(200,168,75,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(200,168,75,0.18)")}
              >
                {/* Publication name */}
                <p className="gold-shine font-sans font-semibold uppercase tracking-[0.18em] text-xs">
                  {p.name}
                </p>

                {/* Article title */}
                <p className="font-serif text-white/75 text-sm leading-snug group-hover:text-white/95 transition-colors duration-300 flex-1">
                  {p.title}
                </p>

                {/* Read arrow */}
                <span className="inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-widest text-primary/50 group-hover:text-primary transition-colors duration-300 mt-1">
                  Đọc bài
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </span>

                {/* Bottom line reveal */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.35 }}
                />
              </motion.a>
            </StaggerChild>
          ))}
        </StaggerParent>
      </div>
    </section>
  );
}
