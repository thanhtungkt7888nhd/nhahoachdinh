/**
 * lib/ban-do.ts
 * Load và filter dữ liệu dự án farmstay từ content/du-an/projects.json.
 * Dùng cho trang bản đồ tương tác /ban-do-du-an.
 */

import projectsData from "../../content/du-an/projects.json";

export type Region = "bac" | "trung" | "tay-nguyen" | "nam";

export interface Project {
  id: string;
  name: string;
  province: string;
  provinceName: string;
  region: Region;
  regionLabel: string;
  location: string;
  year: string;
  scale: string;
  type: string;
  role: string;
  cover: string;
  excerpt: string;
  body: string;
}

/** Tất cả dự án. */
export function getAllProjects(): Project[] {
  return projectsData.projects as Project[];
}

/** Dự án theo tỉnh (province slug). */
export function getProjectsByProvince(provinceSlug: string): Project[] {
  return getAllProjects().filter((p) => p.province === provinceSlug);
}

/** Danh sách tỉnh có dự án (unique). */
export function getProvincesWithProjects(): string[] {
  return [...new Set(getAllProjects().map((p) => p.province))];
}

/** Dự án theo region. */
export function getProjectsByRegion(region: Region): Project[] {
  return getAllProjects().filter((p) => p.region === region);
}

/** Một dự án theo id. */
export function getProjectById(id: string): Project | null {
  return getAllProjects().find((p) => p.id === id) ?? null;
}

/** Nhóm tất cả tỉnh có dự án theo vùng, kèm số lượng. */
export interface ProvinceGroup {
  region: Region;
  regionLabel: string;
  provinces: Array<{
    slug: string;
    name: string;
    count: number;
  }>;
}

export function getProvinceGroups(): ProvinceGroup[] {
  const all = getAllProjects();
  const order: Region[] = ["bac", "trung", "tay-nguyen", "nam"];

  return order.map((region) => {
    const regionProjects = all.filter((p) => p.region === region);
    const byProvince = new Map<string, { name: string; count: number }>();

    regionProjects.forEach((p) => {
      const existing = byProvince.get(p.province);
      if (existing) {
        existing.count++;
      } else {
        byProvince.set(p.province, { name: p.provinceName, count: 1 });
      }
    });

    const regionLabel = regionProjects[0]?.regionLabel ?? region;

    return {
      region,
      regionLabel,
      provinces: [...byProvince.entries()].map(([slug, { name, count }]) => ({
        slug,
        name,
        count,
      })),
    };
  }).filter((g) => g.provinces.length > 0);
}
