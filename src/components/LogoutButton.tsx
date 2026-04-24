"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm px-3 py-1.5 border border-stone-200 rounded-lg text-stone-600 hover:text-red-600 hover:border-red-200 transition-colors"
    >
      Đăng xuất
    </button>
  );
}
