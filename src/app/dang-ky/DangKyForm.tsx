"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DangKyForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Có lỗi xảy ra");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Không kết nối được server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">Họ và tên</label>
        <input
          type="text"
          required
          className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
          placeholder="Phạm Thanh Tùng"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
        <input
          type="email"
          required
          className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
          placeholder="email@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">Số điện thoại</label>
        <input
          type="tel"
          className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
          placeholder="0912 345 678"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">Mật khẩu</label>
        <input
          type="password"
          required
          minLength={6}
          className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
          placeholder="Tối thiểu 6 ký tự"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#2d6a4f] hover:bg-[#1b4332] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {loading ? "Đang tạo tài khoản..." : "Tạo Tài Khoản Miễn Phí"}
      </button>
      <p className="text-xs text-stone-400 text-center">
        Bằng cách đăng ký, bạn đồng ý với điều khoản sử dụng của chúng tôi.
      </p>
    </form>
  );
}
