import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/data";
import { FaFacebook, FaYoutube, FaPinterest } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-main py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block group mb-5">
              <h3 className="gold-shine font-serif text-2xl font-medium mb-2 group-hover:opacity-80 transition-opacity">{siteConfig.name}</h3>
              <p className="gold-shine font-sans font-semibold uppercase tracking-[0.2em] text-sm group-hover:opacity-80 transition-opacity">{siteConfig.tagline}</p>
            </Link>
            <p className="font-sans text-sm text-white/60 leading-relaxed max-w-xs text-justify">
              {siteConfig.vision}
            </p>
            <div className="flex gap-4 mt-7">
              {[
                { href: siteConfig.social.facebook, Icon: FaFacebook, label: "Facebook" },
                { href: siteConfig.social.youtube,  Icon: FaYoutube,  label: "YouTube" },
                { href: siteConfig.social.pinterest,Icon: FaPinterest,label: "Pinterest" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary transition-colors rounded-full"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="section-label text-white/40 mb-5">Điều Hướng</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-sans text-sm text-white/60 hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label text-white/40 mb-5">Liên Hệ</p>
            <div className="space-y-3 font-sans text-sm text-white/60">
              <p>{siteConfig.address}</p>
              <p>
                <a href={`tel:${siteConfig.phone.replace(/\s/g,"")}`} className="hover:text-primary transition-colors">
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-main py-5 flex flex-col sm:flex-row justify-between items-center gap-2 font-sans text-xs text-white/30">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Thiết kế theo phong cách Savory.global</p>
        </div>
      </div>
    </footer>
  );
}
