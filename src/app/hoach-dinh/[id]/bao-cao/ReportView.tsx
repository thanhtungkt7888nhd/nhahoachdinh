"use client";
import { useRef } from "react";
import { formatCurrency } from "@/lib/utils";
import type { PlanResult } from "@/lib/planning-engine";

type Project = { id: string; name: string; createdAt: Date };

export default function ReportView({ project, result }: { project: Project; result: PlanResult }) {
  const reportRef = useRef<HTMLDivElement>(null);

  function handlePrint() {
    window.print();
  }

  const balanced = result.scenarios[1];

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Print controls - hidden when printing */}
      <div className="print:hidden bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href={`/hoach-dinh/${project.id}`} className="text-sm text-stone-500 hover:text-stone-700">← Kết quả</a>
          <span className="text-sm font-medium text-stone-700">Xem trước Báo Cáo PDF</span>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            🖨️ In / Lưu PDF
          </button>
        </div>
      </div>

      {/* Report */}
      <div ref={reportRef} className="max-w-4xl mx-auto py-8 px-4 print:py-0 print:px-0">
        <div className="bg-white shadow-lg print:shadow-none">
          {/* Cover */}
          <div className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white p-12 text-center">
            <div className="text-4xl mb-4">🌿</div>
            <div className="text-xs uppercase tracking-widest text-green-300 mb-2">Báo Cáo Hoạch Định Đầu Tư</div>
            <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
            <div className="text-green-200 italic text-lg mb-8">&ldquo;{result.positioning.tagline}&rdquo;</div>
            <div className="border-t border-white/20 pt-6 text-sm text-green-300">
              <div className="font-bold text-white text-base mb-1">PHẠM THANH TÙNG – NHÀ HOẠCH ĐỊNH</div>
              <div>Ngày lập: {new Date(project.createdAt).toLocaleDateString("vi-VN")}</div>
            </div>
          </div>

          <div className="p-10 space-y-10">
            {/* Positioning */}
            <section>
              <h2 className="text-xl font-bold text-[#2d6a4f] border-b-2 border-[#2d6a4f] pb-2 mb-4">1. CHIẾN LƯỢC ĐỊNH VỊ</h2>
              <div className="bg-[#f0fdf4] rounded-xl p-6">
                <div className="text-xl font-bold text-[#2d6a4f] mb-1">{result.positioning.brand}</div>
                <div className="text-[#40916c] italic mb-4">&ldquo;{result.positioning.tagline}&rdquo;</div>
                <p className="text-stone-700 mb-4">{result.positioning.description}</p>
                <div className="text-sm"><strong>Phân khúc khách mục tiêu:</strong> {result.positioning.targetSegment}</div>
              </div>
            </section>

            {/* SWOT */}
            <section>
              <h2 className="text-xl font-bold text-[#2d6a4f] border-b-2 border-[#2d6a4f] pb-2 mb-4">2. PHÂN TÍCH SWOT</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "strengths", label: "Điểm mạnh (S)", color: "green" },
                  { key: "weaknesses", label: "Điểm yếu (W)", color: "amber" },
                  { key: "opportunities", label: "Cơ hội (O)", color: "blue" },
                  { key: "threats", label: "Rủi ro (T)", color: "red" },
                ].map(({ key, label, color }) => (
                  <div key={key} className={`rounded-xl p-4 border ${
                    color === "green" ? "bg-green-50 border-green-100" :
                    color === "amber" ? "bg-amber-50 border-amber-100" :
                    color === "blue" ? "bg-blue-50 border-blue-100" :
                    "bg-red-50 border-red-100"
                  }`}>
                    <div className="font-bold text-sm mb-3">{label}</div>
                    <ul className="space-y-1.5">
                      {(result.swot[key as keyof typeof result.swot] as string[]).map((item, i) => (
                        <li key={i} className="text-xs text-stone-700 flex items-start gap-1.5">
                          <span className="mt-0.5">•</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Scenarios */}
            <section>
              <h2 className="text-xl font-bold text-[#2d6a4f] border-b-2 border-[#2d6a4f] pb-2 mb-4">3. PHÂN TÍCH TÀI CHÍNH – 3 KỊCH BẢN</h2>
              <div className="grid grid-cols-3 gap-4">
                {result.scenarios.map((s) => (
                  <div key={s.type} className={`rounded-xl p-4 border ${
                    s.type === "balanced" ? "border-[#2d6a4f] bg-[#f0fdf4]" : "border-stone-200"
                  }`}>
                    <div className="font-bold text-sm mb-3 text-[#2d6a4f]">{s.name}</div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-stone-500">Lấp đầy</span><span className="font-semibold">{s.occupancyRate}%</span></div>
                      <div className="flex justify-between"><span className="text-stone-500">Doanh thu/năm</span><span className="font-semibold">{formatCurrency(s.yearlyRevenue)}</span></div>
                      <div className="flex justify-between"><span className="text-stone-500">Chi phí/năm</span><span className="font-semibold">{formatCurrency(s.yearlyCost)}</span></div>
                      <div className="flex justify-between border-t pt-2"><span className="text-stone-500">Lợi nhuận/năm</span><span className="font-bold text-[#2d6a4f]">{formatCurrency(s.yearlyProfit)}</span></div>
                      <div className="flex justify-between"><span className="text-stone-500">ROI</span><span className="font-bold">{s.roi}%</span></div>
                      <div className="flex justify-between"><span className="text-stone-500">Hòa vốn</span><span className="font-bold">{s.breakEvenMonths} tháng</span></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 5-year table */}
              <div className="mt-6">
                <div className="text-sm font-semibold text-stone-700 mb-3">Dự báo doanh thu 5 năm – Kịch bản Cân bằng</div>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#2d6a4f] text-white">
                      <th className="p-2 text-left">Năm</th>
                      <th className="p-2 text-right">Doanh thu</th>
                      <th className="p-2 text-right">Chi phí</th>
                      <th className="p-2 text-right">Lợi nhuận</th>
                    </tr>
                  </thead>
                  <tbody>
                    {balanced.revenueByYear.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-stone-50" : "bg-white"}>
                        <td className="p-2">Năm {row.year}</td>
                        <td className="p-2 text-right">{formatCurrency(row.revenue)}</td>
                        <td className="p-2 text-right">{formatCurrency(row.cost)}</td>
                        <td className="p-2 text-right font-semibold text-[#2d6a4f]">{formatCurrency(row.profit)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Space Design */}
            <section>
              <h2 className="text-xl font-bold text-[#2d6a4f] border-b-2 border-[#2d6a4f] pb-2 mb-4">4. GỢI Ý THIẾT KẾ KHÔNG GIAN</h2>
              <div className="space-y-4">
                {result.spaceDesign.map((space, i) => (
                  <div key={i} className="rounded-xl border border-stone-100 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold text-stone-800">{space.category}</div>
                      <div className="text-xs text-stone-400">Ước tính: <strong>{formatCurrency(space.estimatedCost)}</strong></div>
                    </div>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {space.items.map((item, j) => (
                        <li key={j} className="text-xs text-stone-600 flex items-start gap-1">
                          <span className="text-[#2d6a4f]">✓</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Roadmap */}
            <section>
              <h2 className="text-xl font-bold text-[#2d6a4f] border-b-2 border-[#2d6a4f] pb-2 mb-4">5. LỘ TRÌNH TRIỂN KHAI</h2>
              <div className="space-y-4">
                {result.roadmap.map((phase) => (
                  <div key={phase.phase} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#2d6a4f] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {phase.phase}
                    </div>
                    <div className="flex-1 border-b border-stone-100 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-stone-800">{phase.title}</div>
                        <div className="text-xs text-stone-400">{phase.duration} · {formatCurrency(phase.budget)}</div>
                      </div>
                      <ul className="grid grid-cols-2 gap-1">
                        {phase.tasks.map((task, i) => (
                          <li key={i} className="text-xs text-stone-600 flex items-start gap-1">
                            <span className="text-[#2d6a4f] mt-0.5">•</span>{task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Activities */}
            <section>
              <h2 className="text-xl font-bold text-[#2d6a4f] border-b-2 border-[#2d6a4f] pb-2 mb-4">6. HOẠT ĐỘNG TRẢI NGHIỆM GỢI Ý</h2>
              <div className="grid grid-cols-2 gap-4">
                {result.recommendedActivities.map((act, i) => (
                  <div key={i} className="border border-stone-100 rounded-xl p-3">
                    <div className="font-semibold text-stone-700 text-sm mb-1">{act.name}</div>
                    <p className="text-xs text-stone-500 mb-2">{act.description}</p>
                    <div className="text-xs text-stone-400">{act.season} · {act.targetGuest}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer */}
            <div className="bg-[#1b4332] text-white rounded-xl p-6 text-center">
              <div className="font-bold mb-1">PHẠM THANH TÙNG – NHÀ HOẠCH ĐỊNH</div>
              <p className="text-green-300 text-sm">Chuyên gia tư vấn hoạch định đầu tư Farmstay & Du lịch xanh Việt Nam</p>
              <p className="text-green-300 text-sm mt-1">📞 0985 024 660 / 0914 339 066</p>
              <p className="text-green-400 text-xs mt-2">Báo cáo được tạo tự động bởi phần mềm HOẠCH ĐỊNH · nhahoachdinh.vn</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}
