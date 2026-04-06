import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/data";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaYoutube } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Liên Hệ - Phạm Thanh Tùng",
  description: "Liên hệ với Phạm Thanh Tùng để tư vấn phát triển farmstay và du lịch nông nghiệp.",
};

const contactDetails = [
  { icon: FaPhone,         label: "Điện Thoại", value: siteConfig.phone,   href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  { icon: FaEnvelope,      label: "Email",       value: siteConfig.email,   href: `mailto:${siteConfig.email}` },
  { icon: FaMapMarkerAlt,  label: "Địa Chỉ",     value: siteConfig.address, href: null },
];

export default function ContactPage() {
  return (
    <div className="pt-[90px]">
      {/* Hero */}
      <section className="bg-beige py-16 border-b border-earth/10">
        <div className="container-main text-center">
          <p className="section-label mb-3">Kết Nối</p>
          <h1
            className="font-serif text-charcoal mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Liên Hệ
          </h1>
          <div className="w-12 h-0.5 bg-primary mx-auto mb-6" />
          <p className="font-sans text-muted mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Hãy để chúng ta cùng nhau thảo luận về dự án của bạn.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <h2
                className="font-serif text-charcoal text-2xl mb-2"
              >
                Thông Tin Liên Hệ
              </h2>
              <div className="w-10 h-0.5 bg-primary mb-8" />

              <div className="space-y-6 mb-10">
                {contactDetails.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0 rounded">
                      <item.icon className="text-primary" size={16} />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-xs uppercase tracking-widest text-muted mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="font-sans text-charcoal hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-sans text-charcoal">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div>
                <p className="font-sans font-semibold text-xs uppercase tracking-widest text-muted mb-4">
                  Mạng Xã Hội
                </p>
                <div className="flex gap-3">
                  {[
                    { href: siteConfig.social.facebook, Icon: FaFacebook, label: "Facebook" },
                    { href: siteConfig.social.youtube,  Icon: FaYoutube,  label: "YouTube" },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 bg-primary flex items-center justify-center text-white hover:bg-earth transition-colors rounded"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-serif text-charcoal text-2xl mb-2">
                Gửi Tin Nhắn
              </h2>
              <div className="w-10 h-0.5 bg-primary mb-8" />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
