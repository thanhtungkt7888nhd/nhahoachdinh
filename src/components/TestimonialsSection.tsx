"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "@/lib/data";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";

export default function TestimonialsSection() {
  const [ref, api] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);

  return (
    <section
      className="relative min-h-[70vh] flex items-center py-24 overflow-hidden"
      style={{
        background: "linear-gradient(105deg, rgba(29,58,29,0.95) 0%, rgba(40,72,30,0.90) 100%)",
        backgroundColor: "#1D3A1D",
      }}
    >
      {/* Decorative gradient left */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
      {/* Decorative gradient right */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

      <div className="container-main relative z-20 w-full">
        <div className="text-center mb-14">
          <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-4">Phản Hồi</p>
          <h2
            className="font-serif text-white"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            Họ Nói Gì Về Tôi
          </h2>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-5" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div ref={ref} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((t, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0 px-10">
                  <div className="text-center">
                    <FaQuoteLeft className="gold-shine text-4xl mx-auto mb-7" />
                    <p
                      className="font-serif text-white/90 italic mb-10 leading-relaxed text-justify"
                      style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
                    >
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mb-3">
                        <span className="font-serif text-primary text-xl font-bold">{t.name[0]}</span>
                      </div>
                      <p className="gold-shine font-sans font-semibold uppercase tracking-widest text-sm">
                        {t.name}
                      </p>
                      <p className="font-sans text-white/50 text-xs mt-1 tracking-wide">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={prev} aria-label="Prev"
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-colors rounded-full">
            <HiChevronLeft size={20} />
          </button>
          <button onClick={next} aria-label="Next"
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-primary hover:text-primary transition-colors rounded-full">
            <HiChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
