/**
 * /nhat-ky/the-loai/[type] — Trang lọc bài theo thể loại.
 * Redirect sang /toi-lam/nhat-ky?type=[type] bằng cách render lại feed.
 */

import { redirect } from "next/navigation";
import type { EntryType } from "@/lib/nhat-ky";

interface Props {
  params: Promise<{ type: string }>;
}

const VALID_TYPES: EntryType[] = ["quan-sat", "cau-hoi", "trich-dan", "hien-truong"];

export async function generateStaticParams() {
  return VALID_TYPES.map((type) => ({ type }));
}

export default async function TheLoaiPage({ params }: Props) {
  const { type } = await params;
  // Redirect sang feed page với filter query
  redirect(`/toi-lam/nhat-ky?type=${type}`);
}
