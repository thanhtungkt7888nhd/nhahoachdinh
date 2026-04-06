"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/data";
import { HiMenu, HiX } from "react-icons/hi";
import clsx from "clsx";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
            <motion.div
              key={l.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: easeOut }}
            >
              <Link
                href={l.href}
                className={clsx(
                  "font-sans font-semibold text-xs uppercase tracking-[0.2em] relative group transition-opacity",
                  scrolled ? "gold-shine-subtle hover:opacity-75" : "text-white hover:text-primary"
                )}
              >
                {l.label}
                {/* Underline hover */}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
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
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-sans font-semibold text-xs uppercase tracking-[0.2em] text-charcoal hover:text-primary transition-colors py-1 block"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
