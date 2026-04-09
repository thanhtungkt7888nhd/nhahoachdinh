"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig, NavLink } from "@/lib/data";
import { HiMenu, HiX } from "react-icons/hi";
import clsx from "clsx";

const easeOut = [0.22, 1, 0.36, 1] as const;

const dropdownItemStyle: React.CSSProperties = {
  display: "block",
  padding: "10px 20px",
  fontFamily: "var(--font-nunito)",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "#EDE0C4",
  transition: "color 0.15s",
  whiteSpace: "nowrap",
};

function DesktopDropdown({ link, scrolled, index }: { link: NavLink; scrolled: boolean; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!link.children) {
    return (
      <motion.div
        key={link.href}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 + index * 0.07, duration: 0.5, ease: easeOut }}
      >
        <Link
          href={link.href}
          className={clsx(
            "font-sans font-semibold text-xs uppercase tracking-[0.2em] relative group transition-opacity hover:opacity-75",
            scrolled ? "gold-shine-subtle" : "gold-shine"
          )}
        >
          {link.label}
          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 + index * 0.07, duration: 0.5, ease: easeOut }}
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={clsx(
          "font-sans font-semibold text-xs uppercase tracking-[0.2em] relative group transition-opacity hover:opacity-75 flex items-center gap-1 cursor-pointer",
          scrolled ? "gold-shine-subtle" : "gold-shine"
        )}
        style={{ backgroundColor: "transparent", border: "none", padding: 0 }}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {link.label}
        <span style={{ fontSize: "12px", lineHeight: 1 }}>▾</span>
        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: easeOut }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              background: "#0D1A0C",
              border: "1px solid rgba(196,154,40,0.25)",
              borderRadius: "10px",
              padding: "8px 0",
              minWidth: "220px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              zIndex: 100,
            }}
          >
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                style={dropdownItemStyle}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#D4B050"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#EDE0C4"; }}
                onClick={() => setOpen(false)}
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(0,0,0,0)",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "0 0 0 rgba(0,0,0,0)",
        paddingTop: scrolled ? "12px" : "20px",
        paddingBottom: scrolled ? "12px" : "20px",
      }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      <div className="container-main flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <motion.span
            className="font-serif text-[1.44rem] font-semibold tracking-wide"
            animate={{ color: scrolled ? "#1C2A1C" : "#ffffff" }}
            transition={{ duration: 0.3 }}
          >
            {siteConfig.name}
          </motion.span>
          <span className={scrolled ? "gold-shine-subtle font-sans text-[11.5px] uppercase tracking-[0.3em] mt-0.5" : "gold-shine font-sans text-[11.5px] uppercase tracking-[0.3em] mt-0.5"}>
            {siteConfig.tagline}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l, i) => (
            <DesktopDropdown key={l.href} link={l} scrolled={scrolled} index={i} />
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4, ease: easeOut }}
          >
            <Link href="/lien-he" className="btn-lienhe text-xs py-2 px-5">
              <span className="gold-shine">Liên Hệ</span>
            </Link>
          </motion.div>
        </nav>

        {/* Mobile hamburger */}
        <motion.button
          onClick={() => setOpen(!open)}
          className={clsx("md:hidden", scrolled ? "text-charcoal" : "text-white")}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <HiX size={26} />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <HiMenu size={26} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden bg-white border-t border-earth/10 shadow-lg overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
          >
            <nav className="container-main py-5 flex flex-col gap-4">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: easeOut }}
                >
                  {l.children ? (
                    <div>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === l.href ? null : l.href)}
                        className="font-sans font-semibold text-xs uppercase tracking-[0.2em] text-charcoal hover:text-primary transition-colors py-1 flex items-center gap-1 w-full text-left cursor-pointer"
                        style={{ backgroundColor: "transparent", border: "none" }}
                      >
                        {l.label}
                        <span style={{ fontSize: "12px", transition: "transform 0.2s", transform: mobileExpanded === l.href ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === l.href && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: easeOut }}
                            style={{ overflow: "hidden" }}
                          >
                            <div style={{ borderLeft: "2px solid #C49A28", marginLeft: "8px", paddingLeft: "12px", marginTop: "4px" }}>
                              {l.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => { setOpen(false); setMobileExpanded(null); }}
                                  className="font-sans text-xs uppercase tracking-[0.15em] text-charcoal hover:text-primary transition-colors py-1 block"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-sans font-semibold text-xs uppercase tracking-[0.2em] text-charcoal hover:text-primary transition-colors py-1 block"
                    >
                      {l.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
