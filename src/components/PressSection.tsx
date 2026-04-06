"use client";

import { motion } from "framer-motion";
import { pressItems } from "@/lib/data";
import { FadeUp } from "@/components/animations";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function PressSection() {
  return (
    <section className="bg-white py-16 border-y border-earth/10">
      <div className="container-main">
        <FadeUp>
          <p className="text-center section-label text-charcoal/30 mb-10">
            Được Nhắc Đến Trên Báo Chí
          </p>
        </FadeUp>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12 md:gap-y-6">
          {pressItems.map((p, i) => (
            <motion.a
              key={i}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-serif text-base font-medium text-charcoal/25 hover:text-primary transition-colors duration-300"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.45, ease: easeOut }}
              whileHover={{ scale: 1.06 }}
            >
              {/* Bullet accent */}
              <span
                className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors duration-300 flex-shrink-0"
              />
              {p.name}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
