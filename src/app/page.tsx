import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/auth";

const FEATURES = [
  {
    icon: "📋",
    title: "Form Hoạch Định Thông Minh",
    desc: "Nhập thông tin địa điểm, ngân sách, điều kiện tự nhiên – hệ thống phân tích và đưa ra gợi ý chiến lược phù hợp.",
  },
  {
    icon: "📊",
    title: "Phân Tích 3 Kịch Bản",
    desc: "Thận trọng – Cân bằng – Lạc quan. ROI, điểm hòa vốn, dự báo doanh thu 5 năm với biểu đồ trực quan.",
  },
  {
    icon: "🧭",
    title: "Chiến Lược Định Vị",
    desc: "Phân tích SWOT, định vị thương hiệu, phân khúc khách mục tiêu phù hợp với tiềm năng thực tế dự án.",
  },
  {
    icon: "🏗️",
    title: "Gợi Ý Thiết Kế Không Gian",
    desc: "Danh sách hạng mục xây dựng, ước tính chi phí theo từng khu vực dựa trên quy mô và chuẩn dịch vụ.",
  },
  {
    icon: "🗺️",
    title: "Lộ Trình Triển Khai",
    desc: "Kế hoạch chi tiết theo 3 giai đoạn từ chuẩn bị pháp lý đến vận hành chính thức.",
  },
  {
    icon: "📄",
    title: "Xuất Báo Cáo PDF",
    desc: "Báo cáo chuyên nghiệp mang thương hiệu PTT, sẵn sàng trình bày với nhà đầu tư, ngân hàng, đối tác.",
  },
];

const TESTIMONIALS = [
  {
    name: "Nguyễn Minh Phúc",
    role: "Chủ Farmstay Đà Lạt",
    text: "Phần mềm giúp tôi nhìn rõ được bức tranh tài chính trước khi đổ tiền vào. Kịch bản thận trọng rất hữu ích!",
  },
  {
    name: "Trần Thị Lan",
    role: "Kiến trúc sư",
    text: "Dùng để tư vấn sơ bộ cho khách hàng rất tiện. Phần gợi ý thiết kế không gian tôi hay dùng nhất.",
  },
  {
    name: "Lê Hoàng Nam",
    role: "Nhà đầu tư",
    text: "ROI và break-even được tính tự động, rõ ràng. Tiết kiệm nhiều thời gian so với tự làm Excel.",
  },
];

export default async function HomePage() {
  const user = await getSession();

  return (
    <>
      <Navbar user={user} />

      <section className="bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#40916c] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm mb-6">
            <span>🌿</span> Công cụ hoạch định hàng đầu cho Farmstay & Eco-tourism Việt Nam
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Hoạch Định Đầu Tư <br />
            <span className="text-[#d8f3dc]">Farmstay & Du Lịch Xanh</span>
          </h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-10">
            Nhập dữ liệu dự án, nhận ngay phân tích chiến lược, tài chính và lộ trình triển khai
            từ chuyên gia <strong>Phạm Thanh Tùng</strong> – Nhà Hoạch Định.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={user ? "/hoach-dinh/moi" : "/dang-ky"}
              className="bg-[#d4a017] hover:bg-[#b8860b] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              {user ? "Tạo Hoạch Định Mới" : "Dùng Thử Miễn Phí"}
            </Link>
            <Link
              href="/gia-ca"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors border border-white/20"
            >
              Xem Bảng Giá
            </Link>
          </div>
          <p className="mt-4 text-green-200 text-sm">Lần đầu hoàn toàn miễn phí – không cần thẻ tín dụng</p>
        </div>
      </section>

      <section className="bg-white border-b border-stone-100 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "4 bước", label: "Form nhập liệu" },
            { value: "3 kịch bản", label: "Phân tích tài chính" },
            { value: "7 hạng mục", label: "Phân tích & gợi ý" },
            { value: "PDF", label: "Báo cáo chuyên nghiệp" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-[#2d6a4f]">{s.value}</div>
              <div className="text-sm text-stone-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="tinh-nang" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">Tính Năng Nổi Bật</h2>
            <p className="text-stone-500">Mọi thứ bạn cần để hoạch định một dự án du lịch xanh thành công</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-stone-800 mb-2">{f.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f0fdf4] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">Cách Thức Hoạt Động</h2>
            <p className="text-stone-500">Chỉ 4 bước đơn giản để có ngay bản hoạch định chiến lược</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Thông Tin Cơ Bản", desc: "Địa điểm, diện tích, loại hình, địa hình" },
              { step: "02", title: "Ngân Sách & Tài Chính", desc: "Vốn đầu tư, mục tiêu doanh thu, thời gian hoàn vốn" },
              { step: "03", title: "Điều Kiện Tự Nhiên", desc: "Khí hậu, nguồn nước, cây trồng, hạ tầng" },
              { step: "04", title: "Mục Tiêu & Khách", desc: "Đối tượng khách, số phòng, tiêu chuẩn dịch vụ" },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-[#2d6a4f] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <h4 className="font-semibold text-stone-700 mb-2">{s.title}</h4>
                <p className="text-stone-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={user ? "/hoach-dinh/moi" : "/dang-ky"}
              className="inline-flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              Bắt Đầu Ngay →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">Khách Hàng Nói Gì</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
                <p className="text-stone-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-stone-800 text-sm">{t.name}</div>
                  <div className="text-stone-400 text-xs">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lien-he" className="bg-[#1b4332] text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6">🌿</div>
          <h2 className="text-3xl font-bold mb-4">Phạm Thanh Tùng – Nhà Hoạch Định</h2>
          <p className="text-green-200 leading-relaxed mb-8">
            Chuyên gia tư vấn hoạch định đầu tư Farmstay, du lịch sinh thái và nông nghiệp tại Việt Nam.
            Với kinh nghiệm thực tế từ nhiều dự án, tôi xây dựng công cụ này để giúp nhà đầu tư
            và chủ dự án nhìn thấy bức tranh toàn cảnh trước khi xuống tiền.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+840985024660"
              className="bg-white text-[#1b4332] font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors"
            >
              📞 0985 024 660 / 0914 339 066
            </a>
            <Link
              href="/gia-ca"
              className="bg-[#d4a017] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#b8860b] transition-colors"
            >
              Xem Bảng Giá
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-stone-900 text-stone-400 py-8 px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} HOẠCH ĐỊNH – Phạm Thanh Tùng Nhà Hoạch Định</p>
        <p className="mt-1">Phần mềm hoạch định đầu tư Farmstay & Du lịch xanh Việt Nam</p>
      </footer>
    </>
  );
}
