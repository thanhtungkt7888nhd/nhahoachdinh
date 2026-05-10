import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Không tìm thấy trang",
  description: "Trang bạn tìm kiếm không tồn tại.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-stone-400">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900">
        Không tìm thấy trang
      </h1>
      <p className="mt-4 max-w-md text-stone-500">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
      >
        Về trang chủ
      </Link>
    </main>
  );
}
