/**
 * /ban-do-du-an/[province-slug] — Deep-link vào tỉnh cụ thể.
 * Render MapClient với tỉnh được chọn sẵn từ URL.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProjects,
  getProvinceGroups,
  getProvincesWithProjects,
  getProjectsByProvince,
} from "@/lib/ban-do";
import MapClient from "../MapClient";

interface Props {
  params: Promise<{ "province-slug": string }>;
}

export async function generateStaticParams() {
  return getProvincesWithProjects().map((slug) => ({ "province-slug": slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "province-slug": slug } = await params;
  const projects = getProjectsByProvince(slug);
  if (projects.length === 0) return {};

  const provinceName = projects[0].provinceName;
  const url          = `https://nhahoachdinh.vn/ban-do-du-an/${slug}`;

  return {
    title: `${provinceName} — Dự án farmstay · Phạm Thanh Tùng`,
    description: `${projects.length} dự án farmstay tại ${provinceName} do Phạm Thanh Tùng hoạch định và tư vấn.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Dự án tại ${provinceName}`,
      description: `${projects.length} dự án · ${provinceName}`,
      url,
      type: "website",
    },
  };
}

export default async function ProvinceDeepLinkPage({ params }: Props) {
  const { "province-slug": slug } = await params;

  // Validate tỉnh tồn tại
  const allProjects = getAllProjects();
  const exists      = allProjects.some((p) => p.province === slug);
  if (!exists) notFound();

  const provinceGroups        = getProvinceGroups();
  const provincesWithProjects = getProvincesWithProjects();

  return (
    <MapClient
      allProjects={allProjects}
      provinceGroups={provinceGroups}
      provincesWithProjects={provincesWithProjects}
      initialProvince={slug}
    />
  );
}
