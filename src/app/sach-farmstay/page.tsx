"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/animations";

const easeOut = [0.22, 1, 0.36, 1] as const;

const chapters = [
  { num: "01", title: "Tư Duy Nền Tảng", desc: "Nhận thức đúng về farmstay — không phải resort thu nhỏ, không phải homestay đơn thuần." },
  { num: "02", title: "Chọn Đất & Đọc Vị", desc: "Tiêu chí vàng lựa chọn quỹ đất — địa hình, thổ nhưỡng, kết nối hạ tầng và tiềm năng sinh thái." },
  { num: "03", title: "Hoạch Định Chiến Lược", desc: "Xây dựng mô hình kinh doanh bền vững từ ngày đầu — tránh đốt tiền sai chỗ." },
  { num: "04", title: "Thiết Kế Sinh Thái", desc: "Nguyên lý thiết kế thuận tự nhiên — tôn trọng địa hình, cảnh quan và văn hóa bản địa." },
  { num: "05", title: "Vận Hành & Dòng Tiền", desc: "Tạo nhiều nguồn doanh thu đa dạng — lưu trú, ẩm thực, trải nghiệm và sản phẩm địa phương." },
  { num: "06", title: "Marketing & Thương Hiệu", desc: "Kể câu chuyện có chiều sâu văn hóa — cách xây dựng thương hiệu farmstay độc bản." },
];

export default function SachFarmstay() {
  return (
    <div className="pt-[88px]">

      {/* Hero */}
      <section
        className="relative min-h-[70vh] flex items-center py-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 65% 40%, #C8A84B 0%, transparent 55%)", opacity: 0.08 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.07, 0.13, 0.07] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container-main relative z-10 max-w-4xl">
          <motion.p
            className="gold-shine font-sans font-semibold uppercase tracking-[0.25em] text-sm mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
          >
            Tác Phẩm
          </motion.p>
          <motion.h1
            className="font-serif text-white leading-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: easeOut }}
          >
            Hướng Dẫn Thiết Lập Farmstay
          </motion.h1>
          <motion.div
            className="w-12 h-0.5 bg-primary mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: easeOut }}
            style={{ transformOrigin: "left" }}
          />
          <motion.p
            className="font-sans text-white/70 leading-relaxed text-base mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.6, ease: easeOut }}
          >
            Cuốn cẩm nang thực chiến từ hơn 12 năm kinh nghiệm tư vấn, thiết kế và vận hành
            hơn 50 dự án farmstay trên khắp Việt Nam. Không lý thuyết hào nhoáng — chỉ là những
            bài học máu và nước mắt được đúc kết thành hệ thống.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: easeOut }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/lien-he" className="btn-lienhe">
              <span className="gold-shine">Đặt Mua Sách</span>
            </Link>
            <Link href="/ve-toi" className="btn-white">Về Tác Giả</Link>
          </motion.div>
        </div>
      </section>

      {/* Nội dung sách */}
      <section className="bg-beige py-24 md:py-32">
        <div className="container-main">
          <div className="text-center mb-14">
            <FadeUp>
              <p className="gold-shine-subtle font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-2">Nội Dung</p>
              <h2 className="font-serif text-charcoal" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                Những Gì Bạn Sẽ Học Được
              </h2>
              <div className="w-12 h-0.5 bg-primary mx-auto mt-5" />
            </FadeUp>
          </div>
          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((c, i) => (
              <StaggerChild key={i}>
                <motion.div
                  className="p-8 bg-white border border-earth/10 relative overflow-hidden group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <span className="gold-shine-subtle font-serif text-4xl font-bold block mb-4">{c.num}</span>
                  <h3 className="font-serif text-charcoal text-lg mb-3">{c.title}</h3>
                  <p className="font-sans text-muted text-sm leading-relaxed">{c.desc}</p>
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

      {/* Quote tác giả */}
      <section
        className="py-24 text-center"
        style={{ background: "linear-gradient(135deg, #1C2A1C 0%, #1D3A1D 100%)" }}
      >
        <div className="container-main max-w-3xl">
          <FadeUp>
            <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm mb-8">Lời Tác Giả</p>
            <p
              className="font-serif text-white/90 italic leading-relaxed mb-10"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
            >
              &ldquo;Tôi viết cuốn sách này không phải để bán sách — mà để ngăn bạn mắc những sai lầm
              tôi đã chứng kiến hàng trăm người vấp phải. Mỗi trang là một bài học thực địa,
              không phải lý thuyết sách vở.&rdquo;
            </p>
            <p className="gold-shine font-sans font-semibold text-sm uppercase tracking-widest">
              Phạm Thanh Tùng — Nhà Hoạch Định
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-beige py-20 text-center">
        <div className="container-main max-w-xl">
          <FadeUp>
            <h2 className="font-serif text-charcoal mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
              Sở Hữu Ngay Hôm Nay
            </h2>
            <div className="w-10 h-0.5 bg-primary mx-auto mb-6" />
            <p className="font-sans text-muted text-sm leading-relaxed mb-8">
              Liên hệ trực tiếp để đặt mua sách hoặc nhận tư vấn từ tác giả.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/lien-he" className="btn-lienhe">
                <span className="gold-shine">Liên Hệ Đặt Sách</span>
              </Link>
              <Link href="/chia-se-kien-thuc" className="btn-navy">Đọc Bài Viết Miễn Phí</Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
