"use client";
/**
 * ProjectPanel — Panel bên phải bản đồ, 3 chế độ:
 * 1. Mặc định: danh sách tỉnh theo vùng
 * 2. Tỉnh có dự án: list dự án
 * 3. Tỉnh chưa có dự án: thông báo + CTA
 */

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { Project, ProvinceGroup } from "@/lib/ban-do";

interface ProjectPanelProps {
  activeProvince: string | null;
  activeName: string | null;
  projects: Project[];
  provinceGroups: ProvinceGroup[];
  onProvinceSelect: (slug: string, name: string) => void;
  onClearSelection: () => void;
}

const TERRA = "#A0522D";
const FOREST = "#2D4A2B";
const CREAM  = "#EDE0C4";

const REGION_LABELS: Record<string, string> = {
  "bac":        "BẮC",
  "trung":      "TRUNG",
  "tay-nguyen": "TÂY NGUYÊN",
  "nam":        "NAM",
};

export default function ProjectPanel({
  activeProvince,
  activeName,
  projects,
  provinceGroups,
  onProvinceSelect,
  onClearSelection,
}: ProjectPanelProps) {

  // Tìm region của tỉnh đang chọn
  const activeGroup = provinceGroups.find((g) =>
    g.provinces.some((p) => p.slug === activeProvince)
  );

  const hasProjects = activeProvince !== null && projects.length > 0;
  const noProjects  = activeProvince !== null && projects.length === 0;

  const totalHa = projects.reduce((sum, p) => {
    const match = p.scale.match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);

  return (
    <div
      className="h-full overflow-y-auto"
      style={{ background: "#F7F4EF" }}
      role="region"
      aria-label="Thông tin dự án theo tỉnh"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">

        {/* ── Chế độ 1: Chưa chọn tỉnh ── */}
        {!activeProvince && (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-7"
          >
            <p
              className="font-sans font-bold uppercase mb-2"
              style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(160,82,45,0.6)" }}
            >
              Bản đồ tác động
            </p>
            <h2
              className="font-serif font-normal mb-1"
              style={{ fontSize: "1.5rem", color: "#1A1A16", lineHeight: 1.2 }}
            >
              Chọn một tỉnh
            </h2>
            <p
              className="font-sans mb-7"
              style={{ fontSize: "0.82rem", color: "#8A8070", lineHeight: 1.65 }}
            >
              để xem các dự án farmstay đã triển khai.
            </p>

            {/* Danh sách tỉnh theo vùng */}
            <div className="flex flex-col gap-6">
              {provinceGroups.map((group) => (
                <div key={group.region}>
                  <p
                    className="font-sans font-bold uppercase mb-3"
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.28em",
                      color: "#A8A090",
                      borderBottom: "1px solid #E8E2D8",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    {REGION_LABELS[group.region] ?? group.regionLabel}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {group.provinces.map((prov) => (
                      <button
                        key={prov.slug}
                        onClick={() => onProvinceSelect(prov.slug, prov.name)}
                        className="flex items-center justify-between text-left transition-colors duration-150 rounded px-2 py-1.5 group"
                        style={{ background: "transparent" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(160,82,45,0.06)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <span
                          className="font-sans font-medium flex items-center gap-2"
                          style={{ fontSize: "0.82rem", color: "#3A3630" }}
                        >
                          <span
                            className="inline-block rounded-sm flex-shrink-0"
                            style={{ width: 8, height: 8, background: FOREST }}
                            aria-hidden="true"
                          />
                          {prov.name}
                        </span>
                        <span
                          className="font-sans"
                          style={{ fontSize: "0.68rem", color: "#A8A090" }}
                        >
                          {prov.count} dự án
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p
              className="font-sans italic mt-6"
              style={{ fontSize: "0.75rem", color: "#B0A898", lineHeight: 1.65 }}
            >
              Hoặc click trực tiếp vào tỉnh trên bản đồ.
            </p>
          </motion.div>
        )}

        {/* ── Chế độ 2: Tỉnh có dự án ── */}
        {hasProjects && (
          <motion.div
            key={`province-${activeProvince}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header panel */}
            <div
              className="px-7 py-6 border-b"
              style={{ borderColor: "#E8E2D8" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  {activeGroup && (
                    <p
                      className="font-sans font-bold uppercase mb-1"
                      style={{ fontSize: "0.58rem", letterSpacing: "0.28em", color: TERRA }}
                    >
                      {REGION_LABELS[activeGroup.region] ?? activeGroup.regionLabel}
                    </p>
                  )}
                  <h2
                    className="font-serif font-normal"
                    style={{ fontSize: "1.75rem", color: "#1A1A16", lineHeight: 1.15 }}
                  >
                    {activeName}
                  </h2>
                  <p
                    className="font-sans mt-1"
                    style={{ fontSize: "0.78rem", color: "#8A8070" }}
                  >
                    {projects.length} dự án
                    {totalHa > 0 && <span> · {totalHa.toLocaleString("vi-VN")} ha</span>}
                  </p>
                </div>
                <button
                  onClick={onClearSelection}
                  className="flex-shrink-0 font-sans transition-colors duration-150"
                  style={{ fontSize: "0.7rem", color: "#A8A090", letterSpacing: "0.08em" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = TERRA)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#A8A090")}
                  aria-label="Quay lại danh sách tỉnh"
                >
                  ← Danh sách
                </button>
              </div>
            </div>

            {/* Project cards */}
            <div className="p-5 flex flex-col gap-5">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Chế độ 3: Tỉnh chưa có dự án ── */}
        {noProjects && (
          <motion.div
            key={`empty-${activeProvince}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-7"
          >
            <button
              onClick={onClearSelection}
              className="font-sans mb-6 block transition-colors duration-150"
              style={{ fontSize: "0.72rem", color: "#A8A090" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = TERRA)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#A8A090")}
            >
              ← Quay lại
            </button>

            <h2
              className="font-serif font-normal mb-3"
              style={{ fontSize: "1.5rem", color: "#1A1A16" }}
            >
              {activeName}
            </h2>

            <p
              className="font-sans mb-6"
              style={{ fontSize: "0.88rem", color: "#8A8070", lineHeight: 1.7 }}
            >
              Chưa có dự án tại <strong style={{ color: "#3A3630" }}>{activeName}</strong>.
            </p>

            <div
              className="rounded-xl p-5"
              style={{ background: "#F0EDE8", border: "1px solid #E8E2D8" }}
            >
              <p
                className="font-serif italic mb-4"
                style={{ fontSize: "0.95rem", color: "#5A5450", lineHeight: 1.7 }}
              >
                Bạn có dự án tại đây? Cùng nhau hoạch định con đường phát triển bền vững.
              </p>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 font-sans font-semibold uppercase transition-all duration-200 rounded px-5 py-2.5"
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  background: FOREST,
                  color: CREAM,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#3A6038")}
                onMouseLeave={(e) => (e.currentTarget.style.background = FOREST)}
              >
                Liên hệ đồng hành
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
