"use client";
import Link from "next/link";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import type { PlanResult, Scenario } from "@/lib/planning-engine";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Project = {
  id: string;
  name: string;
  isPaid: boolean;
  status: string;
};

function ScenarioCard({ scenario, active, onClick }: {
  scenario: Scenario;
  active: boolean;
  onClick: () => void;
}) {
  const colors = {
    conservative: { bg: "bg-blue-50", border: "border-blue-400", badge: "bg-blue-100 text-blue-700" },
    balanced: { bg: "bg-green-50", border: "border-[#2d6a4f]", badge: "bg-green-100 text-green-700" },
    optimistic: { bg: "bg-amber-50", border: "border-amber-400", badge: "bg-amber-100 text-amber-700" },
  };
  const c = colors[scenario.type];

  return (
    <button
      onClick={onClick}
      className={`text-left rounded-2xl border-2 p-5 transition-all ${active ? c.border + " " + c.bg + " shadow-md" : "border-stone-200 bg-white hover:border-stone-300"}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${c.badge}`}>{scenario.name}</span>
        <span className="text-xs text-stone-400">Lấp đầy {scenario.occupancyRate}%</span>
      </div>
      <div className="text-xl font-bold text-stone-800">{formatCurrency(scenario.yearlyRevenue)}</div>
      <div className="text-xs text-stone-500 mb-3">Doanh thu năm 1</div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="text-stone-400">Lợi nhuận</div>
          <div className="font-semibold text-stone-700">{formatCurrency(scenario.yearlyProfit)}/năm</div>
        </div>
        <div>
          <div className="text-stone-400">ROI</div>
          <div className="font-semibold text-stone-700">{scenario.roi}%</div>
        </div>
        <div>
          <div className="text-stone-400">Hòa vốn</div>
          <div className="font-semibold text-stone-700">{scenario.breakEvenMonths} tháng</div>
        </div>
        <div>
          <div className="text-stone-400">Giá phòng tb</div>
          <div className="font-semibold text-stone-700">{formatCurrency(scenario.avgRoomPrice)}</div>
        </div>
      </div>
    </button>
  );
}

export default function ResultView({
  project,
  result,
  isFree,
}: {
  project: Project;
  result: PlanResult | null;
  isFree: boolean;
}) {
  const [activeScenario, setActiveScenario] = useState(1);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-stone-500">Đang tải kết quả phân tích...</p>
      </div>
    );
  }

  const scenario = result.scenarios[activeScenario];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="text-sm text-stone-500 hover:text-stone-700">← Dashboard</Link>
          <div className="text-sm font-semibold text-stone-800 truncate max-w-xs">{project.name}</div>
          <div className="flex items-center gap-2">
            {isFree ? (
              <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">Dùng thử</span>
            ) : (
              <Link
                href={`/hoach-dinh/${project.id}/bao-cao`}
                className="text-xs bg-[#2d6a4f] text-white px-4 py-1.5 rounded-lg hover:bg-[#1b4332]"
              >
                Xuất PDF
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Freemium Banner */}
        {isFree && (
          <div className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-bold text-lg mb-1">Bạn đang xem bản dùng thử</div>
              <p className="text-green-200 text-sm">Nâng cấp để xem đầy đủ 3 kịch bản, phân tích tài chính chi tiết và xuất báo cáo PDF.</p>
            </div>
            <Link
              href="/gia-ca"
              className="whitespace-nowrap bg-[#d4a017] hover:bg-[#b8860b] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Mua Báo Cáo Đầy Đủ – 1.000.000đ
            </Link>
          </div>
        )}

        {/* Positioning */}
        <section className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2"><span>🧭</span> Chiến Lược Định Vị</h2>
          <div className="bg-[#f0fdf4] rounded-xl p-5 mb-4">
            <div className="text-xl font-bold text-[#2d6a4f] mb-1">{result.positioning.brand}</div>
            <div className="text-[#40916c] italic mb-3">&ldquo;{result.positioning.tagline}&rdquo;</div>
            <p className="text-stone-600 text-sm leading-relaxed">{result.positioning.description}</p>
          </div>
          <div>
            <div className="text-sm font-medium text-stone-600 mb-1">Phân khúc khách mục tiêu:</div>
            <div className="text-sm text-stone-700 bg-stone-50 rounded-lg px-4 py-2">{result.positioning.targetSegment}</div>
          </div>
        </section>

        {/* SWOT */}
        <section className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2"><span>📊</span> Phân Tích SWOT</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { key: "strengths", label: "Điểm mạnh (S)", icon: "💪", color: "green" },
              { key: "weaknesses", label: "Điểm yếu (W)", icon: "⚠️", color: "amber" },
              { key: "opportunities", label: "Cơ hội (O)", icon: "🚀", color: "blue" },
              { key: "threats", label: "Rủi ro (T)", icon: "🛡️", color: "red" },
            ].map(({ key, label, icon, color }) => (
              <div
                key={key}
                className={`rounded-xl p-4 border ${
                  color === "green" ? "bg-green-50 border-green-100" :
                  color === "amber" ? "bg-amber-50 border-amber-100" :
                  color === "blue" ? "bg-blue-50 border-blue-100" :
                  "bg-red-50 border-red-100"
                }`}
              >
                <div className="font-semibold text-sm mb-3">{icon} {label}</div>
                <ul className="space-y-1.5">
                  {(result.swot[key as keyof typeof result.swot] as string[]).map((item, i) => (
                    <li key={i} className="text-xs text-stone-600 flex items-start gap-1.5">
                      <span className="mt-0.5 flex-shrink-0">•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Scenarios */}
        <section className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2"><span>💰</span> Phân Tích 3 Kịch Bản Đầu Tư</h2>
          {isFree ? (
            <>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <ScenarioCard scenario={result.scenarios[1]} active={true} onClick={() => {}} />
                {[0, 2].map((i) => (
                  <div key={i} className="relative rounded-2xl border-2 border-stone-200 p-5 overflow-hidden">
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                      <div className="text-center">
                        <div className="text-2xl mb-2">🔒</div>
                        <div className="text-xs font-semibold text-stone-600">Kịch bản {i === 0 ? "Thận trọng" : "Lạc quan"}</div>
                        <div className="text-xs text-stone-400">Nâng cấp để xem</div>
                      </div>
                    </div>
                    <div className="opacity-20">
                      <ScenarioCard scenario={result.scenarios[i]} active={false} onClick={() => {}} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 rounded-xl p-4 text-center text-sm text-amber-700 border border-amber-100">
                Mua báo cáo đầy đủ để xem cả 3 kịch bản + biểu đồ doanh thu 5 năm
              </div>
            </>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {result.scenarios.map((s, i) => (
                  <ScenarioCard key={i} scenario={s} active={i === activeScenario} onClick={() => setActiveScenario(i)} />
                ))}
              </div>
              {/* Chart */}
              <div className="border-t border-stone-100 pt-6">
                <div className="text-sm font-semibold text-stone-700 mb-4">
                  Dự báo doanh thu 5 năm – Kịch bản {scenario.name}
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={scenario.revenueByYear}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" tickFormatter={(v) => `Năm ${v}`} tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}tr`} tick={{ fontSize: 12 }} />
                    <Tooltip
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      formatter={(value: any, name: any) => [
                        formatCurrency(Number(value)),
                        name === "revenue" ? "Doanh thu" : name === "cost" ? "Chi phí" : "Lợi nhuận",
                      ]}
                      labelFormatter={(l) => `Năm ${l}`}
                    />
                    <Legend formatter={(v) => v === "revenue" ? "Doanh thu" : v === "cost" ? "Chi phí" : "Lợi nhuận"} />
                    <Area type="monotone" dataKey="revenue" stroke="#2d6a4f" fill="#d8f3dc" strokeWidth={2} />
                    <Area type="monotone" dataKey="cost" stroke="#d4a017" fill="#fef9c3" strokeWidth={2} />
                    <Area type="monotone" dataKey="profit" stroke="#40916c" fill="#b7e4c7" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </section>

        {/* Space Design */}
        <section className={`bg-white rounded-2xl border border-stone-100 shadow-sm p-6 ${isFree ? "relative overflow-hidden" : ""}`}>
          {isFree && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
              <div className="text-center">
                <div className="text-3xl mb-3">🔒</div>
                <div className="font-semibold text-stone-700 mb-2">Gợi Ý Thiết Kế Không Gian</div>
                <div className="text-sm text-stone-400 mb-4">Nâng cấp để xem chi tiết các hạng mục xây dựng</div>
                <Link href="/gia-ca" className="bg-[#2d6a4f] text-white text-sm px-5 py-2 rounded-lg">Nâng cấp ngay</Link>
              </div>
            </div>
          )}
          <h2 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2"><span>🏗️</span> Gợi Ý Thiết Kế Không Gian</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {result.spaceDesign.map((space, i) => (
              <div key={i} className={`rounded-xl border p-4 ${space.priority === "high" ? "border-[#2d6a4f]/30 bg-[#f0fdf4]" : "border-stone-100 bg-stone-50"}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-stone-700 text-sm">{space.category}</div>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${space.priority === "high" ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"}`}>
                    {space.priority === "high" ? "Ưu tiên cao" : "Tùy chọn"}
                  </div>
                </div>
                <ul className="space-y-1 mb-3">
                  {space.items.map((item, j) => (
                    <li key={j} className="text-xs text-stone-600 flex items-start gap-1.5">
                      <span className="text-[#2d6a4f] mt-0.5">✓</span>{item}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-stone-400">Ước tính: <span className="font-semibold text-stone-600">{formatCurrency(space.estimatedCost)}</span></div>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className={`bg-white rounded-2xl border border-stone-100 shadow-sm p-6 ${isFree ? "relative overflow-hidden" : ""}`}>
          {isFree && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
              <div className="text-center">
                <div className="text-3xl mb-3">🔒</div>
                <div className="font-semibold text-stone-700 mb-2">Lộ Trình Triển Khai</div>
                <div className="text-sm text-stone-400 mb-4">Kế hoạch chi tiết 3 giai đoạn</div>
                <Link href="/gia-ca" className="bg-[#2d6a4f] text-white text-sm px-5 py-2 rounded-lg">Nâng cấp ngay</Link>
              </div>
            </div>
          )}
          <h2 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2"><span>🗺️</span> Lộ Trình Triển Khai</h2>
          <div className="space-y-4">
            {result.roadmap.map((phase) => (
              <div key={phase.phase} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#2d6a4f] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {phase.phase}
                </div>
                <div className="flex-1 pb-4 border-b border-stone-100 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-stone-800">{phase.title}</div>
                    <div className="text-xs text-stone-400">{phase.duration}</div>
                  </div>
                  <ul className="space-y-1 mb-2">
                    {phase.tasks.map((task, i) => (
                      <li key={i} className="text-sm text-stone-600 flex items-start gap-1.5">
                        <span className="text-[#2d6a4f] mt-0.5 flex-shrink-0">•</span>{task}
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs text-stone-400">Ngân sách giai đoạn: <span className="font-semibold text-stone-600">{formatCurrency(phase.budget)}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activities */}
        <section className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2"><span>🎯</span> Hoạt Động Trải Nghiệm Gợi Ý</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {result.recommendedActivities.slice(0, isFree ? 3 : undefined).map((act, i) => (
              <div key={i} className="border border-stone-100 rounded-xl p-4 hover:border-[#2d6a4f]/30 transition-colors">
                <div className="font-semibold text-stone-700 text-sm mb-1">{act.name}</div>
                <p className="text-xs text-stone-500 mb-2">{act.description}</p>
                <div className="flex gap-2 text-xs">
                  <span className="bg-stone-100 text-stone-500 px-2 py-0.5 rounded">🗓 {act.season}</span>
                  <span className="bg-[#f0fdf4] text-[#2d6a4f] px-2 py-0.5 rounded">👤 {act.targetGuest}</span>
                </div>
              </div>
            ))}
            {isFree && result.recommendedActivities.length > 3 && (
              <div className="border border-stone-100 rounded-xl p-4 flex items-center justify-center text-center">
                <div>
                  <div className="text-xl mb-2">🔒</div>
                  <div className="text-xs text-stone-500">+{result.recommendedActivities.length - 3} hoạt động khác</div>
                  <Link href="/gia-ca" className="text-xs text-[#2d6a4f] hover:underline">Nâng cấp để xem</Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#1b4332] text-white rounded-2xl p-8 text-center">
          <div className="text-2xl mb-3">🌿</div>
          <h3 className="text-xl font-bold mb-2">Cần Tư Vấn Chuyên Sâu Hơn?</h3>
          <p className="text-green-200 text-sm mb-6">
            Gặp trực tiếp Phạm Thanh Tùng để phân tích thực địa, xây dựng chiến lược và kết nối đội ngũ triển khai.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+840985024660" className="inline-block bg-[#d4a017] hover:bg-[#b8860b] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              📞 0985 024 660
            </a>
            <a href="tel:+840914339066" className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-colors border border-white/30">
              📞 0914 339 066
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
