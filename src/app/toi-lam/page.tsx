"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FadeUp, SlideIn, StaggerParent, StaggerChild } from "@/components/animations";

const easeOut = [0.22, 1, 0.36, 1] as const;

function SectionDivider() {
  return <div className="w-12 h-0.5 bg-primary mt-5 mb-6" />;
}

function ImageBlock({
  src, alt, aspect = "4/3", position = "center center",
}: {
  src: string; alt: string; aspect?: string; position?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-sm img-shadow w-full" style={{ aspectRatio: aspect }}>
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 hover:scale-105" style={{ objectPosition: position }} sizes="(max-width: 768px) 100vw, 50vw" />
    </div>
  );
}

const services = [
  {
    num: "01", title: "Một Giờ Mentor Giải Cứu", icon: "⚡",
    desc: "Dành cho: bạn đang bế tắc, cần cắt đứt ngay nút thắt tư duy đang kìm hãm dự án.",
    detail: "Chỉ với một giờ làm việc trực tiếp 1-on-1, mình sẽ giúp cắt đứt nút thắt tư duy đang khiến bạn bế tắc.\n\nĐôi khi, một câu nói đúng thời điểm sẽ cứu bạn khỏi việc đốt tiền oan uổng.\n\nKết quả: thoát kẹt ngay trong 60 phút với định hướng rõ ràng.\n\nHình thức: Online, 1-on-1 trực tiếp với Phạm Thanh Tùng.",
  },
  {
    num: "02", title: "Khảo Sát Thực Địa & Định Hướng", icon: "🗺️",
    desc: "Dành cho: bạn có đất nhưng chưa biết bắt đầu từ đâu.",
    detail: "Mình trực tiếp xách ba lô đến giẫm chân lên mảnh đất của bạn. Quan sát địa thế, đọc vị khu đất và phác thảo ngay định hướng phát triển chia theo từng giai đoạn.\n\nDựa trên chính nguồn lực thực tế bạn đang có — tuyệt đối không vẽ vời ảo tưởng.\n\nBạn sẽ ra về với một bản đồ hành động rõ ràng, khả thi và được cá nhân hóa hoàn toàn.",
  },
  {
    num: "03", title: "Cố Vấn Chiến Lược Dài Hạn", icon: "🧭",
    desc: "Dành cho: bạn muốn có người đồng hành từ lúc còn là ý tưởng sơ khai đến khi vận hành ra dòng tiền ổn định.",
    detail: "Mình đóng vai trò là điểm neo tư duy — bạn luôn có người kéo lại khi đi lệch hướng.\n\nĐồng hành sát cánh từ lúc thai nghén ý tưởng, vượt rào cản pháp lý, thiết kế quy hoạch cho đến khi vận hành ra dòng tiền ổn định.\n\nĐây là gói hợp tác sâu nhất và có giá trị lâu dài nhất mình cung cấp.",
  },
  {
    num: "04", title: "Member Hội Đồng Nhà Hoạch Định", icon: "🏛️",
    desc: "Sinh hoạt chuyên sâu hàng tháng — cập nhật tri thức, giải phẫu bài toán thực tế.",
    detail: "Sân chơi dành riêng cho cộng đồng tinh hoa. Mỗi tháng chúng ta sinh hoạt online kín để cập nhật tri thức mới nhất về Farmstay thế giới, ngách kinh doanh, chính sách.\n\nVà trực tiếp giải phẫu các bài toán thực tế của hội viên — cùng nhau phân tích, phản biện và tìm ra giải pháp.\n\nĐây là cộng đồng của những người làm thật, kết nối với mạng lưới hàng nghìn chủ farm chất lượng cao nhất Việt Nam.",
  },
  {
    num: "05", title: "Tư Vấn Vĩ Mô Cấp Địa Phương", icon: "🌐",
    desc: "Dành riêng cho Lãnh đạo cấp Xã, Huyện, Tỉnh.",
    detail: "Về khai phóng nguồn lực nông thôn, phát triển du lịch nông nghiệp và chuyển đổi số.\n\nMình đã và đang làm việc trực tiếp với nhiều địa phương trên toàn quốc — từ Quảng Nam, Đắk Lắk, Phú Yên, Bình Định, Hà Tĩnh đến Quảng Trị.\n\nKhi chính quyền và cộng đồng cùng đi một hướng, sức mạnh tổng lực tạo ra là không thể đo đếm.",
  },
];

const tangTac = [
  {
    num: "01", title: "Nền Tảng Chuyên Môn", color: "#C8A84B",
    items: ["Dezicor — kiến trúc & quy hoạch chuẩn quốc tế", "Defarm — tư vấn chiến lược & thiết kế farmstay", "Dehome — thiết kế nhà ở cá nhân hóa"],
    desc: "Nơi mình rèn năng lực và kiểm chứng tư duy chiến lược qua từng dự án thực tế.",
    img: "/images/event-bds-594.jpg",
    imgPos: "center 30%",
  },
  {
    num: "02", title: "Cộng Đồng Thực Hành", color: "#C8A84B",
    items: ["Cấy Nền Farmstay", "FSA Farmstay", "Khởi Nghiệp Farmstay → Hiệp hội Farmstay VN"],
    desc: "Trao tri thức, đồng hành chiến lược. Mỗi farmstay bền vững là một mảnh ghép trong bức tranh lớn.",
    img: "/images/event-bds-527.jpg",
    imgPos: "center 35%",
  },
  {
    num: "03", title: "Vùng Đất & Địa Phương", color: "#C8A84B",
    items: ["Làng Đại Bình — Nông Sơn, Quảng Nam", "Làng sinh thái Bình Thuận", "Tư vấn huyện, tỉnh về chiến lược du lịch nông nghiệp"],
    desc: "Từ một ngôi làng có thể thay đổi tư duy cả một vùng.",
    img: "/images/field-portrait-1.jpg",
    imgPos: "center 20%",
  },
  {
    num: "04", title: "Nhận Thức Quốc Gia", color: "#C8A84B",
    items: ["Xuyên Việt Farmstay — hành trình thực địa hằng năm", "Cộng đồng trực tuyến & bài viết chiến lược", "Thay đổi thói quen tiêu dùng, du lịch farm"],
    desc: "Tác động để thay đổi nhận thức của cả một thế hệ.",
    img: "/images/event-bds-591.jpg",
    imgPos: "center 25%",
  },
  {
    num: "05", title: "Tri Thức Hệ Thống", color: "#C8A84B",
    items: ["Farmstay Update — chương trình thường niên tháng 3", "Kho tri thức chuẩn cho toàn ngành", "Tổ chức tham chiếu cho chính sách & đầu tư"],
    desc: "Một quốc gia muốn hùng cường phải có tri thức được hệ thống hóa — không chỉ kinh nghiệm rời rạc.",
    img: "/images/event-bds-1056.jpg",
    imgPos: "center 20%",
  },
];

export default function ToiLam() {
  const [openServiceIdx, setOpenServiceIdx] = useState<number | null>(null);

  return (
    <div className="pt-[88px]">

      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}>
        <div className="absolute inset-0">
          <Image src="/images/event-bds-589.jpg" alt="Phạm Thanh Tùng trên sân khấu" fill className="object-cover object-top opacity-30" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C2A1C]/95 via-[#1C2A1C]/70 to-[#1C2A1C]/40" />
        </div>
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #C8A84B 0%, transparent 55%)", opacity: 0.07 }}
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

        <div className="container-main relative z-10 py-24">
          <motion.p className="gold-shine font-sans font-semibold uppercase tracking-[0.3em] text-sm mb-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}>
            Tôi Làm
          </motion.p>
          <motion.h1 className="font-serif text-white leading-tight mb-6"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease: easeOut }}>
            Nhà Hoạch Định<br />
            <span className="gold-shine">Tạo Tác Động</span>
          </motion.h1>
          <motion.div className="w-12 h-0.5 bg-primary mb-7"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: easeOut }} style={{ transformOrigin: "left" }} />
          <motion.p className="font-sans text-white/70 leading-relaxed mb-3 max-w-xl"
            style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.75, ease: easeOut }}>
            Đây là bài viết chia sẻ những gì mình đã thực chứng — không nói những thứ chưa làm được.
            Nguyên tắc làm nghề của mình là: tuyệt đối không nói những điều chưa thực hiện được,
            chỉ chia sẻ những điều đã chứng minh thành công.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 mt-8"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1, ease: easeOut }}>
            <Link href="/lien-he" className="btn-lienhe"><span className="gold-shine">Kích Hoạt Hợp Tác</span></Link>
            <Link href="/ve-toi" className="btn-white">Về Tôi</Link>
          </motion.div>
        </div>
      </section>

      {/* ── 1. BỐI CẢNH THỜI ĐẠI ── */}
      <section className="py-24 md:py-32 relative overflow-hidden"
        style={{
          background: [
            "radial-gradient(ellipse 70% 50% at 80% 30%, rgba(160,110,40,0.06) 0%, transparent 60%)",
            "linear-gradient(150deg, #F2E8D0 0%, #EDE0C0 100%)",
          ].join(", "),
        }}>
        <div className="container-main max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">
            <SlideIn direction="left" className="w-full lg:w-1/2">
              <ImageBlock src="/images/event-bds-1023.jpg" alt="Hội thảo BĐS Du lịch Nông nghiệp" aspect="4/3" position="center 30%" />
            </SlideIn>
            <div className="w-full lg:w-1/2">
              <FadeUp>
                <p className="gold-shine-subtle font-sans font-semibold uppercase tracking-[0.22em] text-xs mb-2">Chương 01</p>
                <h2 className="font-serif text-charcoal leading-tight mb-2" style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)" }}>
                  Bối Cảnh Thời Đại —<br />Tại Sao Lúc Này?
                </h2>
                <SectionDivider />
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="font-sans text-muted leading-relaxed mb-5" style={{ fontSize: "1.15rem" }}>
                  Thế giới đang tái cấu trúc. Khí hậu cực đoan, bất ổn địa chính trị, chuỗi cung ứng
                  toàn cầu bị xáo trộn — dòng vốn đầu tư xanh đang tìm kiếm những vùng trũng an toàn và bền vững.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="font-sans text-muted leading-relaxed mb-5" style={{ fontSize: "1.15rem" }}>
                  Đúng lúc đó, <strong className="text-charcoal">Việt Nam đang ngồi trên một kho báu chưa được khai mở đúng cách.</strong>
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="font-sans text-muted leading-relaxed mb-7" style={{ fontSize: "1.15rem" }}>
                  Câu hỏi không phải là có nên làm nông nghiệp hay không — mà là: <em>làm thế nào để nông nghiệp
                  trở thành đòn bẩy đưa Việt Nam thành cường quốc?</em>
                </p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <div className="px-6 py-5 border-l-[3px] font-serif italic text-charcoal/80" style={{ borderColor: "#C8A84B", fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}>
                  &ldquo;Cửa sổ cơ hội này chỉ còn khoảng 20 năm. Và mình đã chọn dành cả sự nghiệp để trả lời câu hỏi đó.&rdquo;
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SỰ THỨC TỈNH ── */}
      <section className="py-24 md:py-32" style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}>
        <div className="container-main max-w-6xl">
          <div className="flex flex-col lg:flex-row-reverse gap-14 lg:gap-20 items-center">
            <SlideIn direction="right" className="w-full lg:w-[45%]">
              <ImageBlock src="/images/field-portrait-1.jpg" alt="Phạm Thanh Tùng tại farmstay thực địa" aspect="3/4" position="center 20%" />
            </SlideIn>
            <div className="w-full lg:w-[55%]">
              <FadeUp>
                <p className="gold-shine font-sans font-semibold uppercase tracking-[0.22em] text-xs mb-2">Chương 02</p>
                <h2 className="font-serif text-white leading-tight mb-2" style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)" }}>
                  Mình Là Ai —<br />Sự Thức Tỉnh Của Một Kiến Trúc Sư
                </h2>
                <div className="w-12 h-0.5 bg-primary mt-5 mb-6" />
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="font-sans text-white/70 leading-relaxed mb-5" style={{ fontSize: "1.15rem" }}>
                  Tại sao một người xuất thân là kiến trúc sư lại không ngoan ngoãn ngồi vẽ nhà, mà ngày ngày
                  nói chuyện về chiến lược dòng tiền, sinh kế nông dân và tầm nhìn quốc gia?
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="font-sans text-white/70 leading-relaxed mb-5" style={{ fontSize: "1.15rem" }}>
                  Câu trả lời bắt đầu từ giai đoạn 2019–2020 — thời hoàng kim của trào lưu <em>bỏ phố về rừng</em>.
                  Đó là sự bùng nổ mang tính bản năng nhưng thiếu vắng hoàn toàn nền tảng lý luận. Hàng loạt cá nhân
                  nhân danh từ khóa <strong className="text-white">Farmstay</strong> để ngụy trang cho hoạt động đầu cơ,
                  phân lô bán nền trái phép, băm nát địa hình, tiêu diệt cảnh quan sinh thái tự nhiên.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="font-sans text-white/70 leading-relaxed mb-7" style={{ fontSize: "1.15rem" }}>
                  Đứng trước sự tàn phá đó, mình nhận ra một sự thật cay đắng: một bản vẽ kiến trúc dù đẹp đến mấy
                  cũng trở nên vô nghĩa nếu đặt trên vùng đất sai chiến lược và thiếu sinh kế cho người dân bản địa.
                </p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <div className="p-6 border rounded-sm" style={{ borderColor: "rgba(200,168,75,0.35)", background: "rgba(200,168,75,0.06)" }}>
                  <p className="gold-shine font-serif italic" style={{ fontSize: "clamp(1.4rem, 2vw, 1.6rem)" }}>
                    &ldquo;Mình quyết định bước ra khỏi giới hạn của một kiến trúc sư — để trở thành Nhà Hoạch Định, dùng tư duy vĩ mô để bẻ lái và tạo tác động lên toàn ngành Farmstay và Du lịch nông nghiệp Việt Nam.&rdquo;
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. GÓC NHÌN CHIẾN LƯỢC ── */}
      <section className="py-24 md:py-32 relative overflow-hidden"
        style={{
          background: [
            "radial-gradient(ellipse 60% 40% at 15% 20%, rgba(160,110,40,0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 50% at 85% 75%, rgba(130,90,30,0.06) 0%, transparent 55%)",
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(180,140,60,0.04) 0%, transparent 70%)",
            "linear-gradient(160deg, #F5EAD5 0%, #EFE2C6 40%, #F2E8D0 70%, #EDE0C0 100%)",
          ].join(", "),
        }}>
        {/* Vân giấy dó — SVG noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.18]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "300px 300px",
          }} />
        <div className="container-main relative z-10">
          <div className="text-center mb-14">
            <FadeUp>
              <p className="font-sans font-semibold uppercase tracking-[0.22em] text-sm mb-2" style={{ color: "#8B6914" }}>Chương 03</p>
              <h2 className="font-serif text-charcoal" style={{ fontSize: "clamp(2.6rem, 4.2vw, 4rem)" }}>Mình Thấy Gì — Góc Nhìn Chiến Lược</h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mt-5" />
            </FadeUp>
          </div>

          {/* 3.1 — 3 lợi thế */}
          <FadeUp className="mb-16">
            <h3 className="font-serif text-charcoal text-2xl mb-8 text-center">3.1 — Việt Nam Sở Hữu 3 Lợi Thế Tuyệt Đối</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Địa Lợi", body: "Trung tâm Đông Nam Á, đường bờ biển 3.260km, trong vòng 5 giờ bay có thể tới mọi nơi ở Châu Á. Vị trí cho phép xuất khẩu nông sản tươi nhanh nhất và đón dòng khách thuận tiện nhất." },
                { label: "Thiên Thời", body: "Khí hậu nhiệt đới đa dạng, dược liệu đỉnh thế giới — Sâm Ngọc Linh, Trầm hương, Hồi, Quế, hơn 300 mỏ khoáng nóng lộ thiên, hệ thống thác — sông — suối dày đặc." },
                { label: "Nhân Hòa", body: "54 dân tộc cùng chung sống, chính trị ổn định — một kho tàng văn hóa bản địa mà không nơi nào trên thế giới có thể sao chép." },
              ].map((item, i) => (
                <motion.div key={i}
                  className="p-8 relative overflow-hidden group"
                  style={{
                    background: "rgba(245,234,200,0.55)",
                    border: "1px solid rgba(160,110,40,0.22)",
                    backdropFilter: "blur(2px)",
                  }}
                  whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
                  {/* Số thứ tự kiểu bút lông */}
                  <span className="block font-serif font-bold mb-4 select-none" style={{ fontSize: "2.8rem", lineHeight: 1, color: "rgba(160,110,40,0.18)", letterSpacing: "-0.02em" }}>
                    {["一", "二", "三"][i]}
                  </span>
                  <p className="font-sans font-semibold uppercase tracking-widest text-xs mb-3" style={{ color: "#8B6914" }}>{item.label}</p>
                  <p className="font-sans text-charcoal/75 leading-relaxed" style={{ fontSize: "1.05rem" }}>{item.body}</p>
                  <motion.div className="absolute bottom-0 left-0 h-px" style={{ background: "linear-gradient(90deg, #C8A84B, #8B6914)" }}
                    initial={{ width: 0 }} whileHover={{ width: "100%" }} transition={{ duration: 0.4 }} />
                </motion.div>
              ))}
            </div>
          </FadeUp>

          {/* 3.2 — Đang bỏ phí */}
          <FadeUp className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-serif text-charcoal text-2xl mb-6">3.2 — Nhưng Chúng Ta Đang Bỏ Phí</h3>
                <div className="space-y-5">
                  {[
                    "Bán nông sản thô, chưa chế biến sâu. Sâm Ngọc Linh — Quốc Bảo — vẫn đang bán củ tươi, trong khi Hàn Quốc xây cả ngành công nghiệp tỷ đô từ duy nhất một loại sâm.",
                    "Farmstay nhỏ lẻ, thiếu hệ thống, thiếu chiến lược — đa số làm vì thấy đó là trào lưu chứ không phải tư duy kinh doanh.",
                    "Luật Đất đai mới mở ra cơ hội — nhưng cũng kéo theo dòng vốn của các tập đoàn bất động sản. Nếu không liên minh kịp, các chủ farmstay nhỏ lẻ sẽ bị ép mua ép bán.",
                  ].map((text, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: "rgba(200,168,75,0.15)", color: "#C8A84B" }}>!</div>
                      <p className="font-sans text-muted leading-relaxed" style={{ fontSize: "1.05rem" }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <SlideIn direction="right">
                <ImageBlock src="/images/event-bds-496.jpg" alt="Hội thảo BĐS Du lịch Nông nghiệp quy mô lớn" aspect="4/3" position="center 40%" />
              </SlideIn>
            </div>
          </FadeUp>

          {/* 3.3 — Du lịch = Marketing */}
          <FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <SlideIn direction="left">
                <ImageBlock src="/images/event-bds-483.jpg" alt="Phạm Thanh Tùng diễn thuyết trước hàng trăm người" aspect="4/3" position="center 25%" />
              </SlideIn>
              <div>
                <h3 className="font-serif text-charcoal text-2xl mb-4">3.3 — Du Lịch Nông Nghiệp Là Chiến Lược Marketing Đỉnh Cao Cho Quốc Gia</h3>
                <p className="font-sans text-charcoal/75 leading-relaxed mb-4" style={{ fontSize: "1.05rem" }}>
                  Khi khách quốc tế đến một farmstay có Sâm Ngọc Linh, Trầm hương, trái cây đặc sản — họ ăn tại vườn,
                  uống ly nước sâm tại nguồn — họ mới thấm thía giá trị thật. Sản phẩm lúc đó trở thành &ldquo;quà tặng văn hóa&rdquo;.
                </p>
                <p className="font-sans text-charcoal/75 leading-relaxed mb-6" style={{ fontSize: "1.05rem" }}>
                  Khách mua bằng niềm tin và cảm xúc — giá trị nhân lên gấp bội. Đây chính là <strong className="text-charcoal">xuất khẩu tại chỗ</strong>,
                  không cần chở hàng đi, hàng tự đến tay người mua.
                </p>
                <div className="p-5 border-l-[3px] font-serif italic text-charcoal/75" style={{ borderColor: "#C8A84B", fontSize: "1.15rem" }}>
                  &ldquo;An ninh lương thực là an ninh quốc gia. Nắm giữ nguồn lương thực sạch và dược liệu quý giúp Việt Nam có ưu thế đặc biệt trong đàm phán quốc tế.&rdquo;
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 4. THÀNH TÍCH THỰC CHỨNG ── */}
      <section className="py-24 md:py-32" style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}>
        <div className="container-main">
          <div className="text-center mb-14">
            <FadeUp>
              <p className="gold-shine font-sans font-semibold uppercase tracking-[0.22em] text-sm mb-2">Chương 04</p>
              <h2 className="font-serif text-white" style={{ fontSize: "clamp(2.6rem, 4.2vw, 4rem)" }}>Mình Đã Làm Gì — Thành Tích Thực Chứng</h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mt-5 mb-3" />
              <p className="font-sans text-white/50 text-sm italic">Những con số nói thay lời.</p>
            </FadeUp>
          </div>

          {/* Stats grid */}
          <StaggerParent className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { num: "100+", label: "Dự Án Farmstay & Sinh Thái", sub: "Từ cao nguyên Tây Bắc đến đồng bằng Cửu Long" },
              { num: "3.000+", label: "Hecta Đất Chi Phối", sub: "Trên toàn quốc" },
              { num: "40+", label: "Tọa Đàm Cấp Tỉnh/Bộ", sub: "BNI · VCCI · Bộ NN&PTNT" },
              { num: "150+", label: "Bài Viết Chuyên Đề", sub: "Về farmstay & du lịch nông nghiệp" },
            ].map((s, i) => (
              <StaggerChild key={i}>
                <div className="text-center p-6 border rounded-sm" style={{ borderColor: "rgba(200,168,75,0.2)", background: "rgba(200,168,75,0.04)" }}>
                  <p className="gold-shine font-serif font-bold mb-1" style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)" }}>{s.num}</p>
                  <p className="font-sans text-white/60 text-xs uppercase tracking-widest leading-relaxed mb-1">{s.label}</p>
                  <p className="font-sans text-white/35 text-[10px] leading-relaxed">{s.sub}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>

          {/* Xuyên Việt image + text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-14">
            <FadeUp>
              <h3 className="gold-shine font-serif text-2xl mb-6">Dấu Ấn Xuyên Việt Farmstay — 4 Mùa Hành Trình</h3>
              <div className="space-y-4">
                {[
                  { year: "2021", title: "Mùa Khai Phá", desc: "Đặt nền móng kết nối cộng đồng farmstay toàn quốc lần đầu tiên" },
                  { year: "2023", title: "Mùa Bứt Phá", desc: "2.000km · 10 ngày · 19 tỉnh · 90 thành viên" },
                  { year: "2024", title: "Mùa Di Sản", desc: "2.000km · 15 ngày · 15 tỉnh · 70 thành viên — điểm nhấn đấu giá Sâm Ngọc Linh, tôn vinh di sản Tây Nguyên" },
                  { year: "2025", title: "Mùa Tiếp Nối", desc: "Mở rộng tầm nhìn, lan tỏa giá trị du lịch nông nghiệp ra cộng đồng quốc tế" },
                ].map((s, i) => (
                  <div key={i} className="flex gap-4 p-4 border rounded-sm" style={{ borderColor: "rgba(200,168,75,0.18)", background: "rgba(255,255,255,0.02)" }}>
                    <span className="gold-shine font-serif font-bold text-xl flex-shrink-0 w-12">{s.year}</span>
                    <div>
                      <p className="font-sans text-white/80 text-sm font-semibold mb-0.5">{s.title}</p>
                      <p className="font-sans text-white/50 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-5 border-l-[3px] font-sans text-white/60 text-sm leading-relaxed" style={{ borderColor: "#C8A84B" }}>
                Ngoài ra, mình đã xuất bản <strong className="text-white/80">cuốn &ldquo;Hướng Dẫn Thiết Lập Farmstay&rdquo;</strong> — cẩm nang bản lề đầu tiên tại Việt Nam định nghĩa rõ ràng thế nào là Farmstay, từ nền tảng của ngành nông nghiệp Hoa Kỳ.
              </div>
            </FadeUp>
            <div className="space-y-4">
              <SlideIn direction="right">
                <ImageBlock src="/images/event-bds-534.jpg" alt="Phạm Thanh Tùng đứng trên sân khấu chia sẻ" aspect="16/10" position="center 15%" />
              </SlideIn>
              <SlideIn direction="right" delay={0.15}>
                <ImageBlock src="/images/event-bds-604.jpg" alt="Phạm Thanh Tùng trên sân khấu tròn" aspect="16/10" position="center 10%" />
              </SlideIn>
            </div>
          </div>

          {/* Photo gallery strip */}
          <FadeUp>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[
                { src: "event-bds-488.jpg", pos: "center 20%" },
                { src: "event-bds-508.jpg", pos: "center 25%" },
                { src: "event-bds-519.jpg", pos: "center 20%" },
                { src: "event-bds-597.jpg", pos: "center 20%" },
                { src: "event-bds-609.jpg", pos: "center 20%" },
                { src: "event-bds-1036.jpg", pos: "center 20%" },
              ].map((img, i) => (
                <div key={i} className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "1/1" }}>
                  <Image src={`/images/${img.src}`} alt={`Hoạt động thực địa ${i+1}`} fill className="object-cover hover:scale-110 transition-transform duration-500" style={{ objectPosition: img.pos }} sizes="15vw" />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 5. HỆ SINH THÁI 5 TẦNG ── */}
      <section className="py-24 md:py-32 relative overflow-hidden"
        style={{
          background: [
            "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(140,100,30,0.06) 0%, transparent 55%)",
            "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(160,120,40,0.05) 0%, transparent 55%)",
            "linear-gradient(140deg, #F4EAD5 0%, #EEE0C4 50%, #F0E5CE 100%)",
          ].join(", "),
        }}>
        <div className="container-main">
          <div className="text-center mb-14">
            <FadeUp>
              <p className="gold-shine-subtle font-sans font-semibold uppercase tracking-[0.22em] text-sm mb-2">Chương 05</p>
              <h2 className="font-serif text-charcoal" style={{ fontSize: "clamp(2.6rem, 4.2vw, 4rem)" }}>Mình Đang Làm Gì — Hệ Sinh Thái Hành Động</h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mt-5 mb-3" />
              <p className="font-sans text-muted text-sm max-w-xl mx-auto">Mình không làm một mình. Mình đang xây một hệ sinh thái 5 tầng tác động — từ cá nhân đến quốc gia.</p>
            </FadeUp>
          </div>
          <div className="space-y-8">
            {tangTac.map((t, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white border border-earth/10 overflow-hidden rounded-sm">
                  <div className={`p-8 md:p-10 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="flex items-center gap-4 mb-5">
                      <span className="gold-shine-subtle font-serif text-5xl font-bold">Tầng {t.num}</span>
                      <div className="w-8 h-px bg-primary" />
                    </div>
                    <h3 className="font-serif text-charcoal text-2xl mb-4">{t.title}</h3>
                    <ul className="space-y-2 mb-5">
                      {t.items.map((item, j) => (
                        <li key={j} className="flex gap-3">
                          <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="font-sans text-charcoal/80" style={{ fontSize: "1.05rem" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="font-sans text-muted italic border-l-2 pl-4" style={{ borderColor: "#C8A84B", fontSize: "1.05rem" }}>{t.desc}</p>
                  </div>
                  <div className={`relative h-64 lg:h-full min-h-[260px] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <Image src={t.img} alt={t.title} fill className="object-cover" style={{ objectPosition: t.imgPos ?? "center center" }} sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. 4 NĂNG LỰC CỐT LÕI ── */}
      <section className="py-24 md:py-32" style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}>
        <div className="container-main">
          <div className="text-center mb-14">
            <FadeUp>
              <p className="gold-shine font-sans font-semibold uppercase tracking-[0.22em] text-sm mb-2">Chương 06</p>
              <h2 className="font-serif text-white" style={{ fontSize: "clamp(2.6rem, 4.2vw, 4rem)" }}>Mình Có Thể Làm Gì Cho Bạn — 4 Năng Lực Cốt Lõi</h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mt-5" />
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
            {[
              {
                num: "6.1", title: "Hoạch Định Chiến Lược & Phối Trộn Nguồn Lực",
                body: "Năng lực lõi của mình là đọc vị địa thế — mạch nước, hướng gió, thổ nhưỡng, trầm tích văn hóa — để tìm ra chìa khóa độc nhất của mảnh đất đó. Từ đó sắp xếp các nguồn lực đang ngổn ngang (tiền, đất, chất xám) vào đúng vị trí ngay từ vạch xuất phát.",
                result: "Lộ trình phát triển bài bản, điểm kỳ vọng hợp lý, an toàn tài sản và sinh dòng tiền ổn định.",
              },
              {
                num: "6.2", title: "Khai Vấn Con Người & Định Hướng Nội Lực",
                body: "Triết lý của mình: tầm vóc của dự án luôn bị giới hạn bởi biên độ tư duy của người chủ. Mình dùng những câu hỏi trực diện để giúp bạn tìm ra chất riêng — không áp đặt giải pháp từ bên ngoài.",
                result: "Bạn phải tự tìm ra mô hình kinh doanh bám rễ vào chính mong muốn sâu thẳm của mình.",
              },
              {
                num: "6.3", title: "Kết Nối Hệ Sinh Thái Thực Chiến",
                body: "Khi hợp tác với mình, bạn đang nhận chiếc chìa khóa bước vào trung tâm cộng đồng du lịch nông nghiệp tử tế lớn nhất Việt Nam — mạng lưới hàng nghìn chủ farm, hàng chục chuyên gia thực chiến.",
                result: "Không cô đơn trên hành trình xây dựng farmstay.",
              },
              {
                num: "6.4", title: "Chiến Lược Thương Hiệu & Hệ Thống Vận Hành",
                body: "Xây dựng câu chuyện thương hiệu độc bản — Marketing chỉ là bước thực thi phần ngọn. Triển khai đóng gói sản phẩm và tiếp cận thị trường thực tế.",
                result: "Tư vấn xây dựng bộ máy vận hành để dự án từng bước tự động hóa.",
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="p-8 border rounded-sm h-full flex flex-col" style={{ borderColor: "rgba(200,168,75,0.2)", background: "rgba(200,168,75,0.04)" }}>
                  <p className="gold-shine font-sans text-xs font-semibold uppercase tracking-widest mb-3">{item.num}</p>
                  <h3 className="font-serif text-white text-lg mb-4">{item.title}</h3>
                  <p className="font-sans text-white/65 leading-relaxed mb-4 flex-1" style={{ fontSize: "1.05rem" }}>{item.body}</p>
                  <div className="flex gap-2 mt-auto pt-4 border-t" style={{ borderColor: "rgba(200,168,75,0.15)" }}>
                    <div className="w-1 flex-shrink-0 rounded-full bg-primary" />
                    <p className="font-sans text-primary/80 text-xs leading-relaxed italic">{item.result}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Teaching photo */}
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <ImageBlock src="/images/event-bds-1058.jpg" alt="Phạm Thanh Tùng tại talkshow BĐS Du lịch Nông nghiệp" aspect="16/9" position="center 30%" />
              </div>
              <div className="space-y-4">
                <ImageBlock src="/images/event-bds-614.jpg" alt="Phạm Thanh Tùng thuyết trình" aspect="4/3" position="center 15%" />
                <ImageBlock src="/images/event-bds-489.jpg" alt="Phạm Thanh Tùng với cộng đồng" aspect="4/3" position="center 25%" />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 7. BẠN CÓ PHẢI NGƯỜI MÌNH TÌM? ── */}
      <section className="relative py-28 md:py-36 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #141e14 100%)" }}>
        {/* Subtle radial glow */}
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,168,75,0.07) 0%, transparent 70%)" }}
          animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

        <div className="container-main max-w-5xl relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <FadeUp>
              <p className="gold-shine font-sans font-semibold uppercase tracking-[0.3em] text-xs mb-4">Chương 07</p>
              <h2 className="font-serif text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
                Bạn Có Phải Người Mình Tìm?
              </h2>
              <div className="w-16 h-px mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #C8A84B, transparent)" }} />
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tương Thích */}
            <FadeUp>
              <div className="relative h-full rounded-sm overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(78,112,64,0.18) 0%, rgba(78,112,64,0.06) 100%)",
                  border: "1px solid rgba(78,112,64,0.35)",
                }}>
                {/* Top accent line */}
                <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent, #4E7040, #7ab35e, #4E7040, transparent)" }} />
                <div className="p-8 md:p-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
                    style={{ background: "rgba(78,112,64,0.2)", border: "1px solid rgba(78,112,64,0.4)" }}>
                    <span className="text-base">✦</span>
                    <span className="font-sans font-semibold uppercase tracking-[0.2em] text-xs" style={{ color: "#7ab35e" }}>
                      Tương Thích
                    </span>
                  </div>
                  <ul className="space-y-5">
                    {[
                      { icon: "🌿", text: "Làm nông nghiệp sạch, du lịch tử tế và muốn để lại di sản xanh" },
                      { icon: "🕰️", text: "Sẵn sàng chơi dài hạn — không tìm kiếm giải pháp mì ăn liền" },
                      { icon: "🌏", text: "Có khát vọng đóng góp vào bức tranh lớn hơn chính dự án của mình" },
                    ].map((item, i) => (
                      <motion.li key={i} className="flex gap-4 items-start"
                        initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}>
                        <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                        <span className="font-sans text-white/75 text-sm leading-relaxed">{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>

            {/* Không Phù Hợp */}
            <FadeUp delay={0.15}>
              <div className="relative h-full rounded-sm overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(139,48,48,0.18) 0%, rgba(139,48,48,0.06) 100%)",
                  border: "1px solid rgba(139,48,48,0.35)",
                }}>
                {/* Top accent line */}
                <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, transparent, #8B3030, #c45c5c, #8B3030, transparent)" }} />
                <div className="p-8 md:p-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
                    style={{ background: "rgba(139,48,48,0.2)", border: "1px solid rgba(139,48,48,0.4)" }}>
                    <span className="text-base">✦</span>
                    <span className="font-sans font-semibold uppercase tracking-[0.2em] text-xs" style={{ color: "#c45c5c" }}>
                      Không Phù Hợp
                    </span>
                  </div>
                  <ul className="space-y-5">
                    {[
                      { icon: "📉", text: "Tư duy đầu cơ, lướt sóng, tàn phá thiên nhiên để lấy lợi nhuận ngắn hạn" },
                      { icon: "🚫", text: "Bất chấp hệ lụy môi trường và văn hóa bản địa" },
                      { icon: "💸", text: "Chỉ muốn kiếm tiền nhanh mà không có cam kết với đất và người" },
                    ].map((item, i) => (
                      <motion.li key={i} className="flex gap-4 items-start"
                        initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}>
                        <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                        <span className="font-sans text-white/75 text-sm leading-relaxed">{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Bottom quote */}
          <FadeUp delay={0.3}>
            <p className="text-center font-serif text-white/40 italic mt-12 text-sm"
              style={{ fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}>
              &ldquo;Mình không làm việc với tất cả mọi người — mình chỉ đồng hành với những người đúng.&rdquo;
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 8. CÁC GÓI ĐỒNG HÀNH ── */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}>
        <div className="container-main">
          <FadeUp className="text-center mb-12">
            <p className="gold-shine font-sans font-semibold uppercase tracking-[0.22em] text-sm mb-2">Chương 08</p>
            <h2 className="font-serif text-white" style={{ fontSize: "clamp(2.6rem, 4.2vw, 4rem)" }}>Các Gói Đồng Hành</h2>
            <div className="w-12 h-0.5 bg-primary mx-auto mt-5 mb-4" />
            <p className="font-sans text-white/50 text-sm max-w-xl mx-auto">
              Từ giờ đến năm 2030, mình chỉ tập trung vào 5 vai trò.
            </p>
          </FadeUp>

          {/* 5 buttons */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-2">
            {services.map((s, i) => (
              <button key={i}
                onClick={() => setOpenServiceIdx(openServiceIdx === i ? null : i)}
                className="group text-center px-4 py-6 border transition-all duration-300 rounded-sm focus:outline-none"
                style={{ borderColor: openServiceIdx === i ? "#C8A84B" : "rgba(200,168,75,0.2)", background: openServiceIdx === i ? "rgba(200,168,75,0.08)" : "transparent" }}>
                <div className="mx-auto mb-3 w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    background: "linear-gradient(135deg, #1C2A1C, #1D3A1D) padding-box, linear-gradient(135deg, #8a6a1a 0%, #C8A84B 35%, #f5e07a 55%, #C8A84B 75%, #8a6a1a 100%) border-box",
                    border: "1.5px solid transparent",
                    boxShadow: "0 0 10px rgba(200,168,75,0.18), inset 0 0 6px rgba(200,168,75,0.06)",
                  }}>
                  {s.icon}
                </div>
                <p className="gold-shine font-serif font-bold mb-1" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>{s.num}</p>
                <p className="font-sans text-white/50 text-xs uppercase tracking-widest leading-relaxed group-hover:text-white/70 transition-colors">{s.title}</p>
                <motion.div className="mx-auto mt-3 text-primary/60" animate={{ rotate: openServiceIdx === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 10.5L2.5 5h11L8 10.5z" /></svg>
                </motion.div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {openServiceIdx !== null && (
              <motion.div key={openServiceIdx}
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                <div className="mt-4 p-8 md:p-10 border rounded-sm" style={{ borderColor: "rgba(200,168,75,0.25)", background: "rgba(200,168,75,0.05)" }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #1C2A1C, #1D3A1D) padding-box, linear-gradient(135deg, #8a6a1a 0%, #C8A84B 35%, #f5e07a 55%, #C8A84B 75%, #8a6a1a 100%) border-box",
                        border: "1.5px solid transparent",
                        boxShadow: "0 0 14px rgba(200,168,75,0.22), inset 0 0 8px rgba(200,168,75,0.07)",
                      }}>
                      {services[openServiceIdx].icon}
                    </div>
                    <div>
                      <span className="gold-shine font-serif font-bold" style={{ fontSize: "clamp(2.4rem, 3.8vw, 3.2rem)" }}>{services[openServiceIdx].num}</span>
                      <p className="font-sans text-white/70 text-sm uppercase tracking-widest">{services[openServiceIdx].title}</p>
                    </div>
                  </div>
                  <p className="font-sans text-white/60 mb-6 italic" style={{ fontSize: "1.05rem" }}>{services[openServiceIdx].desc}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 mb-8">
                    {services[openServiceIdx].detail.split("\n\n").map((para, j) => (
                      <motion.div key={j} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: j * 0.08, ease: [0.22, 1, 0.36, 1] }} className="flex gap-3">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <p className="font-sans text-white/70 leading-relaxed" style={{ fontSize: "1.05rem" }}>{para}</p>
                      </motion.div>
                    ))}
                  </div>
                  <Link href="/lien-he" className="btn-lienhe inline-flex">
                    <span className="gold-shine">Liên Hệ Đăng Ký</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── 9. LỜI HIỆU TRIỆU ── */}
      <section className="relative py-32 overflow-hidden" style={{ background: "#1C2A1C" }}>
        <div className="absolute inset-0">
          <Image src="/images/event-bds-589.jpg" alt="Phạm Thanh Tùng trên sân khấu" fill className="object-cover object-top opacity-20" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(28,42,28,0.7), #1C2A1C)" }} />
        </div>
        <motion.div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 50% 40%, #C8A84B 0%, transparent 60%)", opacity: 0.08 }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

        <div className="container-main relative z-10 max-w-3xl text-center">
          <FadeUp>
            <p className="gold-shine font-sans font-semibold uppercase tracking-[0.3em] text-sm mb-5">Chương 09 — Lời Hiệu Triệu</p>
            <h2 className="font-serif text-white leading-snug mb-6" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              Mình Không Cần Nhiều Người —<br />
              <span className="gold-shine">Mình Cần Đúng Người</span>
            </h2>
            <div className="w-12 h-0.5 bg-primary mx-auto mb-8" />
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-sans text-white/65 leading-relaxed mb-6">
              Sứ mệnh của mình là tác động để định vị Việt Nam trở thành Quốc gia Du lịch Nông nghiệp
              hàng đầu trên bản đồ toàn cầu — nơi chúng ta xuất khẩu nông sản tại chỗ với giá trị thặng dư
              cực cao, nơi mỗi ngôi làng là một sản phẩm du lịch độc bản.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p className="font-sans text-white/65 leading-relaxed mb-10">
              Những ai dám mơ về một bức tranh lớn hơn, sẵn sàng đi đường dài và tin rằng nông nghiệp
              Việt Nam xứng đáng được thế giới nhìn nhận đúng giá trị — hãy nhấn nút kích hoạt.
            </p>
          </FadeUp>
          <FadeUp delay={0.35}>
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <Link href="/lien-he" className="btn-lienhe"><span className="gold-shine">Kích Hoạt Hợp Tác</span></Link>
              <Link href="/sach-farmstay" className="btn-white">Sách Farmstay</Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.5}>
            <p className="font-sans text-white/20 text-xs tracking-widest">
              #nhahoachdinh &nbsp;·&nbsp; #farmstayupdate &nbsp;·&nbsp; #xuyenvietfarmstay &nbsp;·&nbsp; #quocgiadulichnongnghiep
            </p>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
