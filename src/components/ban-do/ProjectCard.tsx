"use client";
/**
 * ProjectCard — Card dự án trong panel bản đồ.
 * Hiển thị ảnh cover, năm, quy mô, loại hình, excerpt, vai trò, link chi tiết.
 */

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/ban-do";

interface ProjectCardProps {
  project: Project;
}

const TERRA = "#A0522D";
const CREAM = "#EDE0C4";
const GOLD  = "#C49A28";

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="rounded-xl overflow-hidden"
      style={{
        background: "#FAFAF8",
        border: "1px solid #E8E2D8",
      }}
    >
      {/* Ảnh cover */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image
          src={project.cover}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)"
        }} />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Eyebrow meta */}
        <div
          className="flex flex-wrap items-center gap-2 mb-2 font-sans uppercase"
          style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: "#8A8070" }}
        >
          <span>{project.year}</span>
          <span style={{ color: "#D4CDB8" }}>·</span>
          <span>{project.scale}</span>
          <span style={{ color: "#D4CDB8" }}>·</span>
          <span>{project.type}</span>
        </div>

        {/* Tên dự án */}
        <h3
          className="font-serif font-medium leading-snug mb-2"
          style={{ fontSize: "1.05rem", color: "#1A1A16", letterSpacing: "-0.01em" }}
        >
          {project.name}
        </h3>

        {/* Excerpt */}
        <p
          className="font-sans line-clamp-2 mb-3"
          style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "#6B6560" }}
        >
          {project.excerpt}
        </p>

        {/* Role badge + link */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span
            className="font-sans font-medium"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              color: TERRA,
              background: "rgba(160,82,45,0.08)",
              border: "1px solid rgba(160,82,45,0.2)",
              padding: "0.2rem 0.7rem",
              borderRadius: 3,
            }}
          >
            {project.role}
          </span>

          <Link
            href={`/du-an/${project.id}`}
            className="font-sans font-semibold inline-flex items-center gap-1 transition-colors duration-200"
            style={{ fontSize: "0.72rem", letterSpacing: "0.08em", color: TERRA }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#8B4513")}
            onMouseLeave={(e) => (e.currentTarget.style.color = TERRA)}
          >
            Xem chi tiết
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
