import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/auth";

const PLANS = [
  {
    name: "Dùng Thử",
    price: "Miễn phí",
    subtitle: "Cho lần đầu tiên",
    color: "stone",
    features: [
      "1 báo cáo hoạch định",
      "Tóm tắt 1 kịch bản (Cân bằng)",
      "Phân tích SWOT cơ bản",
      "Không xuất PDF",
    ],
    cta: "Bắt Đầu Miễn Phí",
    href: "/dang-ky",
    highlight: false,
  },
  {
    name: "Báo Cáo Đầy Đủ",
    price: "1.000.000đ",
    subtitle: "Mỗi báo cáo",
    color: "green",
    features: [
      "Không giới hạn số báo cáo",
      "Đầy đủ 3 kịch bản (Thận trọng / Cân bằng / Lạc quan)",
      "Phân tích tài chính chi tiết 5 năm",
      "Gợi ý thiết kế không gian + Lộ trình",
      "Xuất báo cáo PDF chuyên nghiệp",
      "Biểu đồ doanh thu trực quan",
    ],
    cta: "Mua Báo Cáo",
    href: "/dang-ky",
    highlight: true,
  },
  {
    name: "Tư Vấn Trực Tiếp",
    price: "Liên hệ PTT",
    subtitle: "Tùy theo dự án",
    color: "amber",
    features: [
      "Tất cả tính năng Báo cáo đầy đủ",
      "Gặp trực tiếp Phạm Thanh Tùng",
      "Phân tích thực địa dự án",
      "Tư vấn chiến lược chuyên sâu",
      "Kết nối kiến trúc sư, nhà thầu",
      "Hỗ trợ trong suốt quá trình",
    ],
    cta: "Liên Hệ Ngay",
    href: "tel:+840985024660",
    highlight: false,
  },
];

export default async function PricingPage() {
  const user = await getSession();
  return (
    <>
      <Navbar user={user} />
      <div className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-stone-800 mb-4">Bảng Giá</h1>
          <p className="text-stone-500 max-w-xl mx-auto">
            Bắt đầu miễn phí với lần đầu tiên. Chỉ trả tiền khi bạn thấy giá trị thực sự từ phân tích.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border-2 flex flex-col ${
                plan.highlight
                  ? "border-[#2d6a4f] bg-[#f0fdf4] shadow-lg relative"
                  : "border-stone-200 bg-white"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2d6a4f] text-white text-xs font-bold px-4 py-1 rounded-full">
                  PHỔ BIẾN NHẤT
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-stone-800 mb-1">{plan.name}</h3>
                <div className="text-3xl font-bold text-[#2d6a4f] mb-1">{plan.price}</div>
                <div className="text-stone-400 text-sm">{plan.subtitle}</div>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
                    <span className="text-[#2d6a4f] mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block text-center font-semibold py-3 rounded-xl transition-colors ${
                  plan.highlight
                    ? "bg-[#2d6a4f] hover:bg-[#1b4332] text-white"
                    : plan.color === "amber"
                    ? "bg-[#d4a017] hover:bg-[#b8860b] text-white"
                    : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-stone-50 rounded-2xl p-8 text-center border border-stone-100">
          <h3 className="text-xl font-bold text-stone-800 mb-3">Câu Hỏi Thường Gặp</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left mt-6 max-w-3xl mx-auto">
            {[
              {
                q: "Lần dùng thử có đầy đủ không?",
                a: "Lần đầu bạn sẽ thấy tóm tắt kịch bản cân bằng và phân tích SWOT cơ bản. Đủ để đánh giá xem phần mềm có phù hợp không.",
              },
              {
                q: "Sau khi mua, tôi có thể xem lại không?",
                a: "Có, báo cáo được lưu trên tài khoản của bạn và có thể xem, tải về bất cứ lúc nào.",
              },
              {
                q: "Thanh toán bằng gì?",
                a: "Chuyển khoản ngân hàng, Momo, ZaloPay. Sau khi thanh toán báo cáo sẽ được mở khóa ngay.",
              },
              {
                q: "Tư vấn trực tiếp gồm những gì?",
                a: "Gặp trực tiếp anh Phạm Thanh Tùng để phân tích dự án, thực địa (nếu cần) và xây dựng chiến lược chi tiết hơn.",
              },
            ].map((faq) => (
              <div key={faq.q}>
                <div className="font-semibold text-stone-700 text-sm mb-1">{faq.q}</div>
                <div className="text-stone-500 text-sm">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
