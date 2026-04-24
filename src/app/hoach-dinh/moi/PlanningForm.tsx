"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PROVINCES = [
  "Hà Nội","TP. Hồ Chí Minh","Đà Nẵng","Đà Lạt – Lâm Đồng","Hội An – Quảng Nam",
  "Nha Trang – Khánh Hòa","Phú Quốc – Kiên Giang","Sapa – Lào Cai","Mộc Châu – Sơn La",
  "Hà Giang","Ninh Bình","Hạ Long – Quảng Ninh","Vũng Tàu – Bà Rịa","Mũi Né – Bình Thuận",
  "Buôn Ma Thuột – Đắk Lắk","Pleiku – Gia Lai","Hòa Bình","Thái Nguyên","Bắc Ninh","Cần Thơ",
  "An Giang","Đồng Tháp","Bến Tre","Tiền Giang","Kon Tum","Nghệ An","Thanh Hóa","Thừa Thiên Huế",
  "Quảng Bình","Phú Yên","Bình Định","Quảng Ngãi","Khác",
];

const ACTIVITIES_LIST = [
  { id: "harvest", label: "Thu hoạch nông sản" },
  { id: "cooking", label: "Nấu ăn cùng nông dân" },
  { id: "animals", label: "Chăm sóc vật nuôi" },
  { id: "trekking", label: "Trekking / Đi bộ thiên nhiên" },
  { id: "kayak", label: "Kayak / Bơi lội" },
  { id: "fishing", label: "Câu cá" },
  { id: "bonfire", label: "Lửa trại / Nướng BBQ" },
  { id: "yoga", label: "Yoga / Thiền định" },
  { id: "craft", label: "Workshop thủ công địa phương" },
  { id: "teambuilding", label: "Teambuilding doanh nghiệp" },
  { id: "cycling", label: "Đạp xe / Xe địa hình" },
  { id: "stargazing", label: "Ngắm sao / Thiên văn" },
];

const STEP_LABELS = ["Thông Tin Cơ Bản", "Ngân Sách & Tài Chính", "Điều Kiện Tự Nhiên", "Mục Tiêu & Khách Hàng"];

type FormData = {
  name: string; province: string; area: string; tourismType: string; terrain: string;
  budget: string; fundingSource: string; targetPayback: string; targetRevenue: string;
  climate: string; waterSource: string; existingCrops: string; infrastructure: string; landscape: string;
  targetGuests: string; roomCount: string; serviceLevel: string; activities: string[];
};

const INIT: FormData = {
  name: "", province: "", area: "", tourismType: "farmstay", terrain: "flatland",
  budget: "", fundingSource: "self", targetPayback: "5", targetRevenue: "",
  climate: "tropical", waterSource: "well", existingCrops: "", infrastructure: "", landscape: "",
  targetGuests: "family", roomCount: "10", serviceLevel: "mid", activities: [],
};

function RadioGroup({ label, name, options, value, onChange }: {
  label: string; name: string;
  options: { value: string; label: string; desc?: string }[];
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>
      <div className="grid gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-start gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-colors ${
              value === opt.value ? "border-[#2d6a4f] bg-[#f0fdf4]" : "border-stone-200 hover:border-stone-300"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="mt-0.5 accent-[#2d6a4f]"
            />
            <div>
              <div className="text-sm font-medium text-stone-700">{opt.label}</div>
              {opt.desc && <div className="text-xs text-stone-400">{opt.desc}</div>}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function Input({ label, type = "text", required, placeholder, value, onChange, hint }: {
  label: string; type?: string; required?: boolean; placeholder?: string;
  value: string; onChange: (v: string) => void; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:border-transparent"
      />
      {hint && <p className="text-xs text-stone-400 mt-1">{hint}</p>}
    </div>
  );
}

export default function PlanningForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INIT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(key: keyof FormData, val: string | string[]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function toggleActivity(id: string) {
    set("activities", form.activities.includes(id)
      ? form.activities.filter((a) => a !== id)
      : [...form.activities, id]);
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Có lỗi xảy ra");
        return;
      }
      router.push(`/hoach-dinh/${data.id}`);
    } catch {
      setError("Không kết nối được server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/dashboard" className="text-sm text-stone-500 hover:text-stone-700">← Dashboard</a>
          <div className="text-sm font-medium text-stone-700">Tạo Hoạch Định Mới</div>
          <div className="text-sm text-stone-400">Bước {step + 1}/4</div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex">
            {STEP_LABELS.map((label, i) => (
              <div
                key={i}
                className={`flex-1 py-3 text-xs text-center border-b-2 transition-colors ${
                  i === step
                    ? "border-[#2d6a4f] text-[#2d6a4f] font-semibold"
                    : i < step
                    ? "border-[#40916c] text-[#40916c]"
                    : "border-transparent text-stone-400"
                }`}
              >
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {error && (
          <div className="mb-6 bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 space-y-6">
          <div className="pb-2 border-b border-stone-100">
            <h2 className="text-xl font-bold text-stone-800">Bước {step + 1}: {STEP_LABELS[step]}</h2>
          </div>

          {/* STEP 1 */}
          {step === 0 && (
            <>
              <Input label="Tên dự án" required placeholder="Vd: Farmstay Hoa Vàng" value={form.name} onChange={(v) => set("name", v)} />
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Tỉnh / Thành phố <span className="text-red-400">*</span></label>
                <select
                  className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] bg-white"
                  value={form.province}
                  onChange={(e) => set("province", e.target.value)}
                  required
                >
                  <option value="">-- Chọn tỉnh/thành --</option>
                  {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <Input label="Diện tích đất (ha)" type="number" required placeholder="Vd: 3.5" value={form.area} onChange={(v) => set("area", v)} hint="1 ha = 10,000 m²" />
              <RadioGroup
                label="Loại hình du lịch"
                name="tourismType"
                value={form.tourismType}
                onChange={(v) => set("tourismType", v)}
                options={[
                  { value: "farmstay", label: "Farmstay", desc: "Lưu trú kết hợp trải nghiệm nông trại" },
                  { value: "eco", label: "Du lịch sinh thái", desc: "Khai thác tài nguyên thiên nhiên bền vững" },
                  { value: "agri", label: "Du lịch nông nghiệp", desc: "Trải nghiệm canh tác, thu hoạch nông sản" },
                  { value: "nature", label: "Du lịch thiên nhiên", desc: "Khám phá rừng, núi, biển, suối..." },
                ]}
              />
              <RadioGroup
                label="Địa hình"
                name="terrain"
                value={form.terrain}
                onChange={(v) => set("terrain", v)}
                options={[
                  { value: "flatland", label: "Đồng bằng" },
                  { value: "highland", label: "Đồi núi" },
                  { value: "coastal", label: "Ven biển" },
                  { value: "riverside", label: "Ven sông / Hồ" },
                ]}
              />
            </>
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <>
              <Input label="Ngân sách đầu tư (VNĐ)" type="number" required placeholder="Vd: 3000000000" value={form.budget} onChange={(v) => set("budget", v)} hint="Nhập số tiền dự kiến toàn bộ dự án" />
              <RadioGroup
                label="Nguồn vốn"
                name="fundingSource"
                value={form.fundingSource}
                onChange={(v) => set("fundingSource", v)}
                options={[
                  { value: "self", label: "Vốn tự có 100%" },
                  { value: "loan", label: "Vay ngân hàng hoàn toàn" },
                  { value: "mixed", label: "Kết hợp tự có + vay" },
                ]}
              />
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Thời gian hoàn vốn mong muốn</label>
                <select
                  className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] bg-white"
                  value={form.targetPayback}
                  onChange={(e) => set("targetPayback", e.target.value)}
                >
                  {[3, 4, 5, 6, 7, 8, 10].map((y) => <option key={y} value={y}>{y} năm</option>)}
                </select>
              </div>
              <Input label="Doanh thu mục tiêu mỗi năm (VNĐ)" type="number" required placeholder="Vd: 1500000000" value={form.targetRevenue} onChange={(v) => set("targetRevenue", v)} hint="Để trống nếu chưa xác định" />
            </>
          )}

          {/* STEP 3 */}
          {step === 2 && (
            <>
              <RadioGroup
                label="Khí hậu"
                name="climate"
                value={form.climate}
                onChange={(v) => set("climate", v)}
                options={[
                  { value: "tropical", label: "Nhiệt đới (miền Nam, miền Trung thấp)" },
                  { value: "subtropical", label: "Á nhiệt đới (miền Bắc)" },
                  { value: "highland", label: "Khí hậu cao nguyên (mát quanh năm)" },
                ]}
              />
              <RadioGroup
                label="Nguồn nước chính"
                name="waterSource"
                value={form.waterSource}
                onChange={(v) => set("waterSource", v)}
                options={[
                  { value: "river", label: "Sông / Suối" },
                  { value: "lake", label: "Hồ / Ao" },
                  { value: "well", label: "Giếng khoan" },
                  { value: "mixed", label: "Nhiều nguồn kết hợp" },
                ]}
              />
              <Input label="Cây trồng / Vật nuôi hiện có" placeholder="Vd: Cà phê, bơ, gà ta, cá..." value={form.existingCrops} onChange={(v) => set("existingCrops", v)} />
              <Input label="Cơ sở hạ tầng hiện có" placeholder="Vd: Đường bê tông 200m, điện lưới, chưa có nước sạch..." value={form.infrastructure} onChange={(v) => set("infrastructure", v)} />
              <Input label="Cảnh quan nổi bật" placeholder="Vd: Đồi chè, thác nước, hồ nhân tạo, rừng thông..." value={form.landscape} onChange={(v) => set("landscape", v)} />
            </>
          )}

          {/* STEP 4 */}
          {step === 3 && (
            <>
              <RadioGroup
                label="Đối tượng khách chính"
                name="targetGuests"
                value={form.targetGuests}
                onChange={(v) => set("targetGuests", v)}
                options={[
                  { value: "family", label: "Gia đình" },
                  { value: "couple", label: "Cặp đôi" },
                  { value: "corporate", label: "Nhóm doanh nghiệp (teambuilding)" },
                  { value: "school", label: "Học sinh / Sinh viên" },
                  { value: "mixed", label: "Đa dạng đối tượng" },
                ]}
              />
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Số phòng / Cabin dự kiến</label>
                <input
                  type="number"
                  min={1}
                  value={form.roomCount}
                  onChange={(e) => set("roomCount", e.target.value)}
                  className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
                />
              </div>
              <RadioGroup
                label="Tiêu chuẩn dịch vụ"
                name="serviceLevel"
                value={form.serviceLevel}
                onChange={(v) => set("serviceLevel", v)}
                options={[
                  { value: "budget", label: "Bình dân", desc: "Giá 300k–600k/đêm, tập trung trải nghiệm" },
                  { value: "mid", label: "Trung cấp", desc: "Giá 700k–1.5tr/đêm, balance chất lượng & giá" },
                  { value: "luxury", label: "Cao cấp", desc: "Giá 1.8tr–5tr/đêm, thiết kế & dịch vụ premium" },
                ]}
              />
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Hoạt động trải nghiệm muốn triển khai</label>
                <div className="grid grid-cols-2 gap-2">
                  {ACTIVITIES_LIST.map((act) => (
                    <label
                      key={act.id}
                      className={`flex items-center gap-2 border rounded-xl px-3 py-2.5 cursor-pointer text-sm transition-colors ${
                        form.activities.includes(act.id)
                          ? "border-[#2d6a4f] bg-[#f0fdf4] text-[#2d6a4f]"
                          : "border-stone-200 hover:border-stone-300 text-stone-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.activities.includes(act.id)}
                        onChange={() => toggleActivity(act.id)}
                        className="accent-[#2d6a4f]"
                      />
                      {act.label}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="px-6 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-600 hover:border-stone-300 disabled:opacity-40 transition-colors"
            >
              ← Quay lại
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 0 && (!form.name || !form.province || !form.area)) {
                    setError("Vui lòng điền đầy đủ thông tin cơ bản");
                    return;
                  }
                  if (step === 1 && !form.budget) {
                    setError("Vui lòng nhập ngân sách đầu tư");
                    return;
                  }
                  setError("");
                  setStep((s) => s + 1);
                }}
                className="px-8 py-2.5 bg-[#2d6a4f] hover:bg-[#1b4332] text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Tiếp theo →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-2.5 bg-[#d4a017] hover:bg-[#b8860b] disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                {loading ? "Đang phân tích..." : "Tạo Hoạch Định →"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
