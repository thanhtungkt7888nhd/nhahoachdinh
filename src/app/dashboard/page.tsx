import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import LogoutButton from "@/components/LogoutButton";

const TOURISM_LABELS: Record<string, string> = {
  farmstay: "Farmstay",
  eco: "Du lịch sinh thái",
  agri: "Du lịch nông nghiệp",
  nature: "Du lịch thiên nhiên",
};

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect("/dang-nhap");

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { inputs: true },
  });

  const canCreateFree = projects.length === 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paidProjects = projects.filter((p: any) => p.status === "completed");

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <div>
              <div className="font-bold text-[#2d6a4f] text-sm leading-none">HOẠCH ĐỊNH</div>
              <div className="text-[10px] text-stone-500 leading-none">Phạm Thanh Tùng</div>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-600 hidden sm:block">
              Xin chào, <strong>{user.name || user.email}</strong>
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Freemium notice */}
        {!canCreateFree && user.plan === "free" && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-amber-800 text-sm">Bạn đã dùng 1 lần miễn phí</div>
              <div className="text-amber-700 text-xs mt-0.5">Mua báo cáo tiếp theo với giá 1.000.000đ để xem đầy đủ phân tích.</div>
            </div>
            <Link href="/gia-ca" className="text-xs bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 whitespace-nowrap">
              Xem Bảng Giá
            </Link>
          </div>
        )}

        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-stone-800">Dự Án Của Tôi</h1>
          <Link
            href="/hoach-dinh/moi"
            className="flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <span>+</span> Tạo Mới
          </Link>
        </div>

        {/* Projects list */}
        {projects.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <div className="text-5xl mb-4">🌱</div>
            <p className="font-medium text-stone-600 mb-2">Chưa có dự án nào</p>
            <p className="text-sm mb-6">Tạo hoạch định đầu tư đầu tiên của bạn – hoàn toàn miễn phí!</p>
            <Link
              href="/hoach-dinh/moi"
              className="inline-flex bg-[#2d6a4f] text-white px-6 py-3 rounded-xl hover:bg-[#1b4332] transition-colors font-semibold"
            >
              Tạo Hoạch Định Đầu Tiên
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {projects.map((p: any) => (
              <div key={p.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-stone-800">{p.name}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        p.status === "completed"
                          ? p.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {p.status === "completed" ? (p.isPaid ? "Đầy đủ" : "Miễn phí") : "Đang xử lý"}
                    </span>
                  </div>
                  {p.inputs && (
                    <div className="text-sm text-stone-500">
                      {TOURISM_LABELS[p.inputs.tourismType]} · {p.inputs.province} · {p.inputs.area} ha
                    </div>
                  )}
                  <div className="text-xs text-stone-400 mt-1">
                    {new Date(p.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/hoach-dinh/${p.id}`}
                    className="text-sm px-4 py-2 border border-stone-200 rounded-lg hover:border-[#2d6a4f] hover:text-[#2d6a4f] transition-colors"
                  >
                    Xem phân tích
                  </Link>
                  {p.status === "completed" && p.isPaid && (
                    <Link
                      href={`/hoach-dinh/${p.id}/bao-cao`}
                      className="text-sm px-4 py-2 bg-[#2d6a4f] text-white rounded-lg hover:bg-[#1b4332] transition-colors"
                    >
                      Xuất PDF
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {paidProjects.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-stone-100 p-4 text-center">
              <div className="text-2xl font-bold text-[#2d6a4f]">{projects.length}</div>
              <div className="text-xs text-stone-500 mt-1">Tổng dự án</div>
            </div>
            <div className="bg-white rounded-xl border border-stone-100 p-4 text-center">
              <div className="text-2xl font-bold text-[#2d6a4f]">{paidProjects.length}</div>
              <div className="text-xs text-stone-500 mt-1">Đã hoàn thành</div>
            </div>
            <div className="bg-white rounded-xl border border-stone-100 p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{projects.length - paidProjects.length}</div>
              <div className="text-xs text-stone-500 mt-1">Dùng thử</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
