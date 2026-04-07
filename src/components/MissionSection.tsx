"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { missions } from "@/lib/data";

const easeOut = [0.22, 1, 0.36, 1] as const;

function MissionBlock({
  b,
  i,
}: {
  b: (typeof missions)[number];
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  const imgDir = b.imgRight ? 1 : -1; // image slides from right if imgRight
  const textDir = b.imgRight ? -1 : 1;

  return (
    <div className={`${b.bg} py-20 md:py-28 lg:py-32`}>
      <div className="container-main">
        <div
          ref={ref}
          className={`flex flex-col ${b.imgRight ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-16`}
        >
          {/* Image — slides in from its side */}
          <motion.div
            className="relative w-full lg:w-1/2 flex-shrink-0"
            initial={{ opacity: 0, x: imgDir * 70 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: easeOut }}
          >
            <div
              className="img-shadow w-full aspect-[4/3] overflow-hidden relative"
              style={{ maxWidth: 520 }}
            >
              <Image
                src={b.img}
                alt={b.imgAlt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
            </div>
          </motion.div>

          {/* Text — slides in from opposite side with stagger */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: textDir * 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          >
            <motion.p
              className="gold-shine-subtle font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-3"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
            >
              {b.label}
            </motion.p>
            <motion.h2
              className="font-serif text-charcoal mb-5"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: easeOut }}
            >
              {b.title}
            </motion.h2>
            <motion.div
              className="w-12 h-0.5 bg-primary mb-6"
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.55, ease: easeOut }}
              style={{ transformOrigin: "left" }}
            />
            <motion.p
              className="font-sans text-muted leading-relaxed text-base mb-8 text-justify"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: easeOut }}
            >
              {b.body}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.72, ease: easeOut }}
            >
              <Link href="/lien-he" className="btn-lienhe">
                <span className="gold-shine">Liên Hệ Tư Vấn</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function MissionSection() {
  return (
    <section id="ve-toi">
      {missions.map((b, i) => (
        <MissionBlock key={i} b={b} i={i} />
      ))}
    </section>
  );
}
