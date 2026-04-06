"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FadeUp, SlideIn, StaggerParent, StaggerChild } from "@/components/animations";

const easeOut = [0.22, 1, 0.36, 1] as const;

const teachers: { stt: string; name: string; desc: string; img?: string }[] = [
  { stt: "01", name: "GS. Phan Văn Trường", desc: "Triết lý cho đi vô điều kiện — nền tảng tổ chức cộng đồng dựa trên sự tử tế và lòng vị tha." },
  { stt: "02", name: "Thầy Giản Tư Trung", desc: "Tư duy quản trị mục tiêu cuộc đời — kinh doanh là hành trình tu thân, không chỉ là kiếm tiền." },
  { stt: "03", name: "Anh Tạ Minh Trãi", desc: "Tư duy sáng tạo bứt phá — phá vỡ giới hạn để dám nghĩ đến những đại dự án mang tầm quốc gia." },
  { stt: "04", name: "Thầy Phạm Thành Long", desc: "Kỷ luật thép và thói quen của người chiến thắng — liên tục vượt qua giới hạn của ngày hôm qua." },
  { stt: "05", name: "Anh Trần Đình Tú", desc: "Quản trị công ty bài bản — mọi quyết định đầu tư, nhân sự hôm nay đều trổ quả trong tương lai." },
  { stt: "06", name: "Cộng Đồng Làng Farmstay VN", desc: "Đồng sáng lập — hàng nghìn chủ Farm là người thầy thực tiễn sâu sắc nhất." },
  { stt: "07", name: "Tổ Chức BNI", desc: "Hiểu thấu hệ thống vận hành toàn cầu — nền tảng Giáo dục là cốt lõi thành công." },
  { stt: "08", name: "Anh Nguyễn An Nam", desc: "Đả thông tư tưởng tâm linh — giúp tâm trí tĩnh tại, đôi chân vững trên mặt đất." },
  { stt: "09", name: "Người Vợ — Nguyễn Thị Thanh Huyền", desc: "Người đồng hành bền bỉ, kỷ luật yêu thương phía sau những quyết định táo bạo nhất." },
  { stt: "10", name: "Con Trai — Phạm Nguyên Khuê", desc: "Dạy tình yêu vô điều kiện — nâng tâm bao dung với nhân sự, cộng đồng và nhân loại.", img: "/images/portrait-con-trai-nguyen-khue.jpg" },
  { stt: "11", name: "Bố — Phạm Văn Thu", desc: "Khí chất đàn ông — giới hạn lớn nhất không nằm ở hoàn cảnh mà ở chính bản thân mình.", img: "/images/portrait-bo-pham-van-thu.jpg" },
  { stt: "12", name: "Mẹ — Dương Thị Hoa", desc: "Tư duy kinh doanh và kế hoạch từ những việc nhỏ nhất — bài học quy hoạch quản trị rủi ro đầu đời." },
  { stt: "13", name: "Học Trò & Nhân Sự", desc: "Những câu hỏi hóc búa, sự tận tụy, lòng trung thành — chất liệu vô giá để mài giũa hệ thống tư duy." },
];

const principles = [
  {
    icon: "🌱",
    title: "Tận Dụng Nội Lực",
    body: "Phát triển dựa trên tiềm năng vốn có — thiên nhiên, văn hóa, con người địa phương. Không sao chép giải pháp chung chung.",
  },
  {
    icon: "♻️",
    title: "Bền Vững & Hài Hòa",
    body: "Mọi nhát cuốc, mọi viên gạch đặt xuống đều bắt nguồn từ sự phát triển bền vững và tôn trọng tối thượng với môi trường.",
  },
  {
    icon: "👥",
    title: "Trọng Tâm Cộng Đồng",
    body: "Đào tạo, trao quyền người dân địa phương. Nâng tầm con người là chìa khóa duy nhất cho sự phát triển không thể phá vỡ.",
  },
  {
    icon: "🔗",
    title: "Mô Hình Tích Hợp",
    body: "Kinh tế — sinh thái — cộng đồng đan xen thành khối thống nhất. Không có gì tồn tại đơn lẻ trong hệ sinh thái bền vững.",
  },
];

const services = [
  {
    title: "Một Giờ Mentor Giải Cứu",
    desc: "Trực tuyến — cắt đứt nút thắt tư duy đang khiến bạn bế tắc và đốt tiền vô ích.",
    icon: "⚡",
  },
  {
    title: "Khảo Sát Thực Địa",
    desc: "Trực tiếp đến mảnh đất của bạn — đọc vị, phác thảo định hướng tàn nhẫn và khả thi nhất.",
    icon: "🗺️",
  },
  {
    title: "Cố Vấn Chiến Lược Dài Hạn",
    desc: "Đồng hành từ thai nghén đến khi dự án vận hành ra dòng tiền ổn định dương.",
    icon: "🧭",
  },
  {
    title: "Member Hội Đồng Nhà Hoạch Định",
    desc: "Sân chơi chuyên sâu hàng tháng — cập nhật tri thức, giải phẫu bài toán thực tế.",
    icon: "🏛️",
  },
];

function SectionDivider() {
  return <div className="w-12 h-0.5 bg-primary mt-5 mb-6" />;
}

export default function VeToi() {
  const teachersRef = useRef<HTMLDivElement>(null);
  const teachersInView = useInView(teachersRef, { once: true, margin: "-60px 0px" });

  return (
    <div className="pt-[88px]">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
      >
        {/* BG orb */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 70% 40%, #C8A84B 0%, transparent 55%)", opacity: 0.08 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.07, 0.13, 0.07] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container-main relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20 py-20">

            {/* Portrait */}
            <motion.div
              className="w-full lg:w-2/5 flex-shrink-0"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: easeOut }}
            >
              <div className="relative mx-auto" style={{ maxWidth: 420 }}>
                <div className="aspect-[3/4] relative overflow-hidden rounded-sm img-shadow">
                  <Image
                    src="/images/portrait-chandung.jpg"
                    alt="Phạm Thanh Tùng — Nhà Hoạch Định"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 90vw, 420px"
                    priority
                  />
                  {/* Gold overlay bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-navy/70 to-transparent" />
                </div>
                {/* Gold frame accent */}
                <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 border border-primary/30 rounded-sm pointer-events-none" />
              </div>
            </motion.div>

            {/* Text */}
            <div className="w-full lg:w-3/5 text-white">
              <motion.p
                className="gold-shine font-sans font-semibold uppercase tracking-[0.25em] text-sm mb-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
              >
                Mình Là Ai
              </motion.p>
              <motion.h1
                className="font-serif text-white leading-tight mb-2"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.45, ease: easeOut }}
              >
                Phạm Thanh Tùng
              </motion.h1>
              <motion.p
                className="gold-shine font-serif italic mb-6"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.55, ease: easeOut }}
              >
                Nhà Hoạch Định
              </motion.p>
              <motion.div
                className="w-12 h-0.5 bg-primary mb-7"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.7, ease: easeOut }}
                style={{ transformOrigin: "left" }}
              />
              <motion.p
                className="font-sans text-white/70 leading-relaxed text-base mb-8"
                style={{ maxWidth: 560 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.8, ease: easeOut }}
              >
                Người tạo tác động để Việt Nam định vị là Quốc gia Du lịch Nông nghiệp độc đáo nhất thế giới.
                Hành trình bắt đầu từ một kiến trúc sư — vươn tới tầm nhìn kiến tạo hệ sinh thái quốc gia.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1, ease: easeOut }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/lien-he" className="btn-lienhe">
                  <span className="gold-shine">Liên Hệ Tư Vấn</span>
                </Link>
                <Link href="#triet-ly" className="btn-white">Triết Lý Của Tôi</Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DANH XƯNG NHÀ HOẠCH ĐỊNH ───────────────────────────── */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-main max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <FadeUp>
                <p className="gold-shine-subtle font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-2">
                  Danh Xưng
                </p>
                <h2 className="font-serif text-charcoal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                  Vượt Ra Khỏi Bản Vẽ Kiến Trúc
                </h2>
                <SectionDivider />
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="font-sans text-muted leading-relaxed mb-5">
                  Danh xưng <strong className="text-charcoal">Nhà Hoạch Định</strong> không phải tự tôn hay đánh bóng tên tuổi,
                  mà xác lập một vai trò vượt ra ngoài giới hạn của nhà tư vấn hay người thợ vẽ bản vẽ đơn thuần.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <p className="font-sans text-muted leading-relaxed mb-5">
                  Tôi là người có khả năng thay đổi và tác động trực tiếp đến sự phát triển các vùng đất từ cấp làng, xã, huyện
                  đến cấp tỉnh — đồng thời định hướng chiến lược vĩ mô cho các tổ chức kinh tế, văn hóa và cộng đồng.
                </p>
              </FadeUp>
              <FadeUp delay={0.35}>
                <p className="font-sans text-muted leading-relaxed">
                  Công tác hoạch định nhắm cụ thể vào việc bóc tách, giải phẫu và tận dụng triệt để thế mạnh nội tại
                  độc bản của địa phương về thiên nhiên, văn hóa, con người để phát triển.
                </p>
              </FadeUp>
            </div>

            <div className="lg:w-1/2">
              <SlideIn direction="right" delay={0.2}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm img-shadow">
                  <Image
                    src="/images/portrait-nhahoachdinh.jpg"
                    alt="Phạm Thanh Tùng diễn thuyết"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </SlideIn>
              {/* Quote block */}
              <FadeUp delay={0.4}>
                <blockquote
                  className="mt-8 pl-5 border-l-2 border-primary font-serif text-charcoal/80 italic"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
                >
                  "Một bản vẽ kiến trúc dù lung linh đến mấy cũng trở nên vô nghĩa nếu đặt trên
                  một vùng đất sai chiến lược và thiếu vắng sinh kế cho người dân bản địa."
                </blockquote>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
      >
        <div className="container-main">
          <FadeUp>
            <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm text-center mb-12">
              Những Con Số Thực Chứng
            </p>
          </FadeUp>
          <StaggerParent className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "50+", label: "Dự án Farmstay & Sinh thái" },
              { num: "3.000+", label: "Hecta Đất Chi Phối" },
              { num: "40+", label: "Tọa Đàm Cấp Tỉnh / Bộ" },
              { num: "150+", label: "Bài Viết Chuyên Đề" },
            ].map((s, i) => (
              <StaggerChild key={i}>
                <div>
                  <p className="gold-shine font-serif font-bold mb-2" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                    {s.num}
                  </p>
                  <p className="font-sans text-white/50 text-xs uppercase tracking-widest">{s.label}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── SỰ THỨC TỈNH ─────────────────────────────────────────── */}
      <section className="bg-beige py-24 md:py-32">
        <div className="container-main max-w-3xl text-center">
          <FadeUp>
            <p className="gold-shine-subtle font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-2">
              Hành Trình
            </p>
            <h2 className="font-serif text-charcoal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
              Sự Thức Tỉnh Đẫm Máu 2019–2020
            </h2>
            <SectionDivider />
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-sans text-muted leading-relaxed mb-6">
              Thời điểm hoàng kim của trào lưu <em>bỏ phố về rừng</em> — một sự bùng nổ mang tính bản năng nhưng thiếu vắng
              hoàn toàn nền tảng lý luận và tư duy quản trị. Hàng loạt cá nhân nhân danh từ khóa <strong>Farmstay</strong> để
              ngụy trang cho hoạt động đầu cơ, phân lô bán nền trái phép, băm nát địa hình, tiêu diệt cảnh quan sinh thái.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="font-sans text-muted leading-relaxed mb-6">
              Đứng trước sự tàn phá khủng khiếp đó, tôi nhận ra: <em>Một bản vẽ kiến trúc dù lung linh đến mấy cũng trở thành
              vô nghĩa nếu đặt trên vùng đất sai chiến lược.</em> Tôi quyết định bước ra khỏi ranh giới an toàn của một kiến trúc sư
              để dùng tư duy vĩ mô tác động, bẻ lái và thiết lập lại luật chơi chân chính cho toàn ngành Farmstay Việt Nam.
            </p>
          </FadeUp>
          <FadeUp delay={0.35}>
            <div
              className="mx-auto mt-4 px-8 py-6 border-l-2 border-primary text-left font-serif text-charcoal/80 italic"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
            >
              "Tôi dùng tư duy vĩ mô để tác động, bẻ lái và thiết lập lại luật chơi chân chính
              cho toàn ngành Farmstay và Du lịch nông nghiệp Việt Nam."
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── NHỮNG NGƯỜI THẦY ─────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-main">
          <div className="text-center mb-14">
            <FadeUp>
              <p className="gold-shine-subtle font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-2">
                Tri Ân
              </p>
              <h2 className="font-serif text-charcoal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                13 Người Thầy Vĩ Đại
              </h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mt-5 mb-4" />
              <p className="font-sans text-muted text-sm max-w-xl mx-auto">
                Không một cây cổ thụ nào vươn cao mà không có bộ rễ cắm sâu vào lòng đất mẹ.
              </p>
            </FadeUp>
          </div>

          <div ref={teachersRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((t, i) => (
              <motion.div
                key={i}
                className="group relative border border-earth/10 bg-beige/40 hover:bg-beige transition-colors duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={teachersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.06, ease: easeOut }}
              >
                {/* Ảnh thật nếu có */}
                {t.img && (
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={t.img}
                      alt={t.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-beige/90 via-beige/20 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <span className="gold-shine-subtle font-serif text-3xl font-bold block mb-3">{t.stt}</span>
                  <h3 className="font-serif text-charcoal text-base font-medium mb-2">{t.name}</h3>
                  <p className="font-sans text-muted text-sm leading-relaxed">{t.desc}</p>
                </div>
                {/* Bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRIẾT LÝ & SỨ MỆNH ──────────────────────────────────── */}
      <section
        id="triet-ly"
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 30% 60%, #C8A84B 0%, transparent 50%)", opacity: 0.07 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-main relative z-10">
          <div className="text-center mb-14">
            <FadeUp>
              <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-2">
                Nguyên Tắc Bất Di Bất Dịch
              </p>
              <h2 className="font-serif text-white" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                Triết Lý Làm Nghề
              </h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mt-5" />
            </FadeUp>
          </div>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {principles.map((p, i) => (
              <StaggerChild key={i}>
                <div className="p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 group">
                  <span className="text-3xl mb-4 block">{p.icon}</span>
                  <h3 className="font-serif text-white text-xl mb-3">{p.title}</h3>
                  <p className="font-sans text-white/60 text-sm leading-relaxed">{p.body}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>

          {/* Sứ mệnh quốc gia */}
          <FadeUp>
            <div className="max-w-3xl mx-auto text-center">
              <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-4">
                Sứ Mệnh Cả Đời
              </p>
              <p
                className="font-serif text-white/90 leading-relaxed italic"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
              >
                "Nâng tầm ngành du lịch nông nghiệp Việt Nam vươn lên mức độ ảnh hưởng toàn cầu.
                Định vị Việt Nam trở thành Quốc gia Du lịch Nông nghiệp độc đáo nhất trong mắt bạn bè thế giới."
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CÁC GÓI ĐỒNG HÀNH ───────────────────────────────────── */}
      <section className="bg-beige py-24 md:py-32">
        <div className="container-main">
          <div className="text-center mb-14">
            <FadeUp>
              <p className="gold-shine-subtle font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-2">
                Hợp Tác
              </p>
              <h2 className="font-serif text-charcoal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                Các Gói Đồng Hành
              </h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mt-5 mb-4" />
              <p className="font-sans text-muted text-sm max-w-xl mx-auto">
                Dành cho những người làm việc nghiêm túc, có khát vọng làm nông nghiệp sạch và muốn để lại di sản xanh.
              </p>
            </FadeUp>
          </div>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <StaggerChild key={i}>
                <motion.div
                  className="group p-8 bg-white border border-earth/10 relative overflow-hidden cursor-pointer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="text-3xl mb-4 block">{s.icon}</span>
                  <h3 className="font-serif text-charcoal text-xl mb-3">{s.title}</h3>
                  <p className="font-sans text-muted text-sm leading-relaxed">{s.desc}</p>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.35 }}
                  />
                </motion.div>
              </StaggerChild>
            ))}
          </StaggerParent>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section
        className="py-28 flex items-center justify-center text-center"
        style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
      >
        <div className="container-main max-w-2xl">
          <FadeUp>
            <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-5">
              Kích Hoạt Hợp Tác
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="font-serif text-white mb-5" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              Sẵn Sàng Bước Vào Cuộc Chơi Lớn?
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <div className="w-12 h-0.5 bg-primary mx-auto mb-7" />
          </FadeUp>
          <FadeUp delay={0.35}>
            <p className="font-sans text-white/60 leading-relaxed mb-10 text-sm">
              Nếu bạn cùng chung hệ giá trị và đã sẵn sàng cho một hành trình mang tầm vóc di sản —
              hãy nhấn nút kích hoạt liên hệ.
            </p>
          </FadeUp>
          <FadeUp delay={0.45}>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/lien-he" className="btn-lienhe">
                <span className="gold-shine">Liên Hệ Ngay</span>
              </Link>
              <Link href="/" className="btn-white">Về Trang Chủ</Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
