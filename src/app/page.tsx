import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import MissionSection from "@/components/MissionSection";
import Link from "next/link";
import { FadeUp } from "@/components/animations";
import { siteConfig } from "@/lib/data";

// ── Dynamic import cho heavy/below-fold components
const CompaniesSection   = dynamic(() => import("@/components/CompaniesSection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));
const PressSection       = dynamic(() => import("@/components/PressSection"));
const KnowledgeGrid      = dynamic(() => import("@/components/KnowledgeGrid"));

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

      {/* CTA — Magazine Dark Light, editorial split */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #FAF6EE 0%, #F2E8D5 100%)" }}
      >
        {/* Gold hairline top */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: "1px",
            background: "linear-gradient(90deg,transparent,rgba(200,168,75,0.5) 30%,rgba(240,208,117,0.7) 50%,rgba(200,168,75,0.5) 70%,transparent)",
          }}
        />

        <div className="container-main max-w-5xl py-24 md:py-32">
          <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20">

            {/* Left — main message */}
            <div className="flex-1">
              <FadeUp>
                <p
                  className="font-sans font-semibold uppercase mb-5"
                  style={{ fontSize: "10px", letterSpacing: "0.32em", color: "#C8A84B" }}
                >
                  Bắt Đầu Hành Trình
                </p>
              </FadeUp>
              <FadeUp delay={0.12}>
                <h2
                  className="font-serif leading-tight mb-6"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1C2A1C" }}
                >
                  Hãy Cùng Nhau
                  <br />
                  Xây Dựng Điều Gì
                  <br />
                  <span style={{
                    background: "linear-gradient(90deg,#7A5C1A 0%,#B8902A 20%,#C8A84B 35%,#E8C860 50%,#C8A84B 65%,#B8902A 80%,#7A5C1A 100%)",
                    backgroundSize: "300% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "gold-shimmer 5s linear infinite",
                  }}>Đó Bền Vững</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.22}>
                <div
                  className="mb-7"
                  style={{
                    height: "1px",
                    width: "2.5rem",
                    background: "linear-gradient(90deg,#C8A84B,rgba(200,168,75,0.2))",
                  }}
                />
              </FadeUp>
              <FadeUp delay={0.3}>
                <p
                  className="font-sans leading-relaxed mb-9 max-w-sm text-justify"
                  style={{ fontSize: "0.95rem", color: "rgba(28,42,28,0.6)" }}
                >
                  Bạn có một vùng đất, một ý tưởng, hay một dự án cần định hướng?
                  Hãy để chúng ta cùng nhau trao đổi.
                </p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <div className="flex flex-wrap gap-3">
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
                    href="/chia-se-kien-thuc"
                    className="inline-block font-sans font-semibold uppercase text-xs tracking-[0.2em] px-7 py-3.5 transition-all duration-300"
                    style={{
                      background: "transparent",
                      color: "#1C2A1C",
                      border: "1px solid rgba(28,42,28,0.25)",
                      borderRadius: "3px",
                    }}
                  >
                    Đọc Kiến Thức
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Right — contact detail card */}
            <FadeUp delay={0.3} className="lg:w-72 shrink-0">
              <div
                className="px-7 py-8"
                style={{
                  border: "1px solid rgba(200,168,75,0.2)",
                  borderRadius: "3px",
                  background: "rgba(255,255,255,0.45)",
                }}
              >
                <p
                  className="font-sans uppercase mb-5"
                  style={{ fontSize: "9px", letterSpacing: "0.3em", color: "rgba(200,168,75,0.7)" }}
                >
                  Liên Hệ Trực Tiếp
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.15em] mb-1" style={{ color: "rgba(28,42,28,0.4)" }}>Điện Thoại</p>
                    <p className="font-serif text-base" style={{ color: "#1C2A1C" }}>{siteConfig.phone}</p>
                  </div>
                  <div style={{ height: "1px", background: "rgba(200,168,75,0.15)" }} />
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.15em] mb-1" style={{ color: "rgba(28,42,28,0.4)" }}>Email</p>
                    <p className="font-serif text-sm" style={{ color: "#1C2A1C" }}>{siteConfig.email}</p>
                  </div>
                  <div style={{ height: "1px", background: "rgba(200,168,75,0.15)" }} />
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.15em] mb-1" style={{ color: "rgba(28,42,28,0.4)" }}>Chuyên Môn</p>
                    <p className="font-sans text-xs leading-relaxed" style={{ color: "rgba(28,42,28,0.6)" }}>
                      Hoạch định & phát triển Farmstay<br />
                      Tư vấn 1-1 · Đào tạo nhóm
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Gold hairline bottom */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "1px",
            background: "linear-gradient(90deg,transparent,rgba(200,168,75,0.4) 30%,rgba(200,168,75,0.6) 50%,rgba(200,168,75,0.4) 70%,transparent)",
          }}
        />
      </section>
    </>
  );
}
