"use client";

import { motion } from "framer-motion";
import { pressItems } from "@/lib/data";
import { FadeUp } from "@/components/animations";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function PressSection() {
  return (
    <section className="bg-white py-14 border-y border-earth/10">
      <div className="container-main">
        <FadeUp>
          <p className="text-center section-label text-charcoal/30 mb-10">
            Được Nhắc Đến Trên Báo Chí
          </p>
        </FadeUp>

        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {pressItems.map((p, i) => (
            <motion.a
              key={i}
              href={p.href}
              className="font-serif text-xl font-medium text-charcoal/20 hover:text-primary transition-colors duration-300"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: easeOut }}
              whileHover={{ scale: 1.08, color: "#C8A84B" }}
            >
              {p.name}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
