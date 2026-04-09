"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/animations";

const stats = [
  { number: 9,   suffix: "+", label: "Năm Kinh Nghiệm"         },
  { number: 100, suffix: "+", label: "Dự Án Farmstay & Du Lịch" },
  { number: 480, suffix: "+", label: "Bài Viết Chuyên Đề"        },
  { number: 30,  suffix: "+", label: "Tỉnh Thành Hợp Tác"        },
];

function CountUp({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const duration = 1800; // ms
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className="bg-beige py-20 md:py-24">
      <div className="container-main" ref={ref}>
        <StaggerParent className="flex flex-wrap justify-center gap-x-[5vw] gap-y-12">
          {stats.map((s) => (
            <StaggerChild key={s.label}>
              <div className="text-center min-w-[140px]">
                <div
                  className="gold-shine-subtle font-serif leading-none mb-2"
                  style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
                >
                  <CountUp target={s.number} suffix={s.suffix} start={inView} />
                </div>
                <p className="section-label tracking-[0.2em]" style={{ color: "#546A4A" }}>
                  {s.label}
                </p>
              </div>
            </StaggerChild>
          ))}
        </StaggerParent>

        {/* Decorative line */}
        <FadeUp delay={0.5}>
          <div className="mt-16 flex items-center gap-4 justify-center opacity-30">
            <div className="h-px flex-1 max-w-[120px] bg-current" />
            <div className="w-1.5 h-1.5 rounded-full bg-current" />
            <div className="h-px flex-1 max-w-[120px] bg-current" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
