"use client";
/**
 * MapClient — Phần tương tác của trang bản đồ dự án.
 * Quản lý state chọn tỉnh và phối hợp VietnamMap ↔ ProjectPanel.
 */

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VietnamMap from "@/components/ban-do/VietnamMap";
import ProjectPanel from "@/components/ban-do/ProjectPanel";
import StatsHeader from "@/components/ban-do/StatsHeader";
import type { Project, ProvinceGroup } from "@/lib/ban-do";

interface MapClientProps {
  allProjects: Project[];
  provinceGroups: ProvinceGroup[];
  provincesWithProjects: string[];
  initialProvince?: string | null;
}

const FOREST = "#0A1208";
const TERRA  = "#A0522D";
const CREAM  = "#EDE0C4";

export default function MapClient({
  allProjects,
  provinceGroups,
  provincesWithProjects,
  initialProvince = null,
}: MapClientProps) {
  const router = useRouter();
  const [activeProvince, setActiveProvince] = useState<string | null>(initialProvince);
  const [activeName, setActiveName]         = useState<string | null>(null);

  // Khi mount với initialProvince, tìm tên tỉnh
  useEffect(() => {
    if (initialProvince) {
      for (const g of provinceGroups) {
        const found = g.provinces.find((p) => p.slug === initialProvince);
        if (found) { setActiveName(found.name); break; }
      }
    }
  }, [initialProvince, provinceGroups]);

  const activeProjects = activeProvince
    ? allProjects.filter((p) => p.province === activeProvince)
    : [];

  function handleProvinceClick(slug: string, name: string) {
    setActiveProvince(slug);
    setActiveName(name);
    // Cập nhật URL không reload trang
    router.replace(`/toi-lam/ban-do-du-an/${slug}`, { scroll: false });
  }

  function handleClearSelection() {
    setActiveProvince(null);
    setActiveName(null);
    router.replace("/toi-lam/ban-do-du-an", { scroll: false });
  }

  return (
    <div style={{ background: FOREST, minHeight: "100vh" }}>

      {/* ── Header ── */}
      <header
        className="px-6 text-center border-b"
        style={{
          paddingTop: "clamp(5.5rem, 10vw, 8rem)",
          paddingBottom: "3rem",
          borderColor: "rgba(196,154,40,0.12)",
          background: "linear-gradient(180deg, #030806 0%, #0A1208 100%)",
        }}
      >
        <p
          className="font-sans font-bold uppercase mb-4"
          style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: TERRA }}
        >
          Bản Đồ Tác Động
        </p>

        <h1
          className="font-serif font-normal mx-auto mb-4"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
            lineHeight: 1.18,
            color: CREAM,
            maxWidth: 560,
            letterSpacing: "-0.015em",
          }}
        >
          Dấu chân hoạch định —<br />
          16 tỉnh, 100+ dự án
        </h1>

        <p
          className="font-sans mx-auto mb-8"
          style={{
            fontSize: "0.9rem",
            color: "rgba(237,224,196,0.45)",
            maxWidth: 360,
            lineHeight: 1.7,
          }}
        >
          Mỗi điểm là một vùng đất đã cùng đi qua.
        </p>

        <div
          className="mx-auto mb-8"
          style={{
            height: 1, width: 48,
            background: `linear-gradient(90deg, transparent, ${TERRA}, transparent)`,
          }}
          aria-hidden="true"
        />

        <StatsHeader />
      </header>

      {/* ── Map + Panel ── */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: "calc(100vh - 24rem)" }}>

        {/* Cột trái: bản đồ SVG */}
        <div
          className="lg:sticky lg:top-0 flex items-center justify-center p-4 lg:p-8"
          style={{
            flex: "0 0 60%",
            height: "auto",
            minHeight: "55vw",
            maxHeight: "100vh",
            background: FOREST,
          }}
        >
          <div style={{ width: "100%", maxWidth: 520, position: "relative" }}>
            <VietnamMap
              activeProvince={activeProvince}
              onProvinceClick={handleProvinceClick}
              provincesWithProjects={provincesWithProjects}
            />

            {/* Legend */}
            <div
              className="flex items-center gap-5 mt-4 justify-center font-sans"
              style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(237,224,196,0.4)" }}
              aria-label="Chú thích màu sắc bản đồ"
            >
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block rounded-sm"
                  style={{ width: 10, height: 10, background: "#2D4A2B", flexShrink: 0 }}
                  aria-hidden="true"
                />
                Có dự án
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block rounded-sm"
                  style={{ width: 10, height: 10, background: "#EDE7DC", border: "1px solid #D4CDB8", flexShrink: 0 }}
                  aria-hidden="true"
                />
                Chưa có dự án
              </span>
            </div>
          </div>
        </div>

        {/* Cột phải: panel */}
        <div
          className="lg:overflow-y-auto"
          style={{
            flex: "0 0 40%",
            minHeight: "60vh",
            maxHeight: "100vh",
            background: "#F7F4EF",
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          <ProjectPanel
            activeProvince={activeProvince}
            activeName={activeName}
            projects={activeProjects}
            provinceGroups={provinceGroups}
            onProvinceSelect={handleProvinceClick}
            onClearSelection={handleClearSelection}
          />
        </div>

      </div>

      {/* Fallback no-JS: danh sách tỉnh + dự án dạng text */}
      <noscript>
        <div className="px-6 py-12" style={{ background: "#F7F4EF" }}>
          <h2 className="font-serif text-2xl mb-6" style={{ color: "#1A1A16" }}>
            Danh sách dự án theo tỉnh
          </h2>
          {provinceGroups.map((group) => (
            <div key={group.region} className="mb-8">
              <h3 className="font-sans font-bold uppercase mb-3" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#8A8070" }}>
                {group.regionLabel}
              </h3>
              {group.provinces.map((prov) => {
                const projects = allProjects.filter((p) => p.province === prov.slug);
                return (
                  <div key={prov.slug} className="mb-4">
                    <p className="font-serif font-medium" style={{ fontSize: "1rem", color: "#1A1A16" }}>
                      {prov.name} ({prov.count} dự án)
                    </p>
                    <ul className="mt-1 pl-4 list-disc">
                      {projects.map((p) => (
                        <li key={p.id} className="font-sans text-sm" style={{ color: "#5A5450" }}>
                          {p.name} — {p.year} — {p.type}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </noscript>

    </div>
  );
}
