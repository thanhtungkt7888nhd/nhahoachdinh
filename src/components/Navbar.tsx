"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar({ user }: { user?: { name?: string | null; email: string } | null }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <div>
            <div className="font-bold text-[#2d6a4f] text-sm leading-none">HOẠCH ĐỊNH</div>
            <div className="text-[10px] text-stone-500 leading-none">Phạm Thanh Tùng</div>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm text-stone-600">
          <Link href="/#tinh-nang" className="hover:text-[#2d6a4f] transition-colors">Tính năng</Link>
          <Link href="/gia-ca" className="hover:text-[#2d6a4f] transition-colors">Bảng giá</Link>
          <Link href="/#lien-he" className="hover:text-[#2d6a4f] transition-colors">Liên hệ</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm px-4 py-2 rounded-lg bg-[#2d6a4f] text-white hover:bg-[#1b4332] transition-colors"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dang-nhap"
                className="text-sm px-4 py-2 rounded-lg border border-stone-300 hover:border-[#2d6a4f] hover:text-[#2d6a4f] transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                href="/dang-ky"
                className="text-sm px-4 py-2 rounded-lg bg-[#2d6a4f] text-white hover:bg-[#1b4332] transition-colors"
              >
                Dùng thử miễn phí
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-stone-600" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-4 flex flex-col gap-3 text-sm">
          <Link href="/#tinh-nang" onClick={() => setOpen(false)}>Tính năng</Link>
          <Link href="/gia-ca" onClick={() => setOpen(false)}>Bảng giá</Link>
          <Link href="/#lien-he" onClick={() => setOpen(false)}>Liên hệ</Link>
          {user ? (
            <Link href="/dashboard" className="bg-[#2d6a4f] text-white px-4 py-2 rounded-lg text-center">Dashboard</Link>
          ) : (
            <>
              <Link href="/dang-nhap" className="border border-stone-300 px-4 py-2 rounded-lg text-center">Đăng nhập</Link>
              <Link href="/dang-ky" className="bg-[#2d6a4f] text-white px-4 py-2 rounded-lg text-center">Dùng thử miễn phí</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
