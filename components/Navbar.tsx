"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from 'lucide-react';
import { navLinks } from "@/lib/data";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    type: "route" | "anchor"
  ) => {
    if (type === "anchor" && pathname === "/") {
      e.preventDefault();
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const getLinkHref = (href: string, type: "route" | "anchor") => {
    if (type === "anchor") {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--bg-primary)]/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] rounded flex-shrink-0"
            aria-label={t("nav.logoAlt")}
          >
            <TeslaLogo />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-0.5 overflow-x-auto"
            aria-label={t("nav.ariaLabel")}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getLinkHref(link.href, link.type)}
                onClick={(e) => handleLinkClick(e, link.href, link.type)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] ${
                  pathname === link.href
                    ? "text-[var(--text-primary)] bg-white/10"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/8"
                }`}
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/vehicles"
              className="px-5 py-2 text-sm font-semibold rounded-full bg-[var(--brand-accent)] text-white hover:bg-[var(--brand-accent-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] shadow-[0_0_20px_rgba(227,25,55,0.3)] whitespace-nowrap"
            >
              {t("nav.orderNow")}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 bg-[var(--bg-primary)]/98 backdrop-blur-xl border-b border-white/8 shadow-2xl md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLinkHref(link.href, link.type)}
                  onClick={(e) => handleLinkClick(e, link.href, link.type)}
                  className={`px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] ${
                    pathname === link.href
                      ? "text-[var(--text-primary)] bg-white/10"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/8"
                  }`}
                >
                  {t(link.label)}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/8 mt-2">
                <Link
                  href="/vehicles"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-3 text-sm font-semibold rounded-full bg-[var(--brand-accent)] text-white hover:bg-[var(--brand-accent-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] shadow-[0_0_20px_rgba(227,25,55,0.3)]"
                >
                  {t("nav.orderNow")}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TeslaLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 342 512"
      fill="currentColor"
      className="text-[var(--brand-accent)]"
      aria-hidden="true"
    >
      <path d="M171 0C76.6 0 0 76.6 0 171c0 27.9 6.7 54.2 18.6 77.4L171 512l152.4-263.6C335.3 225.2 342 198.9 342 171 342 76.6 265.4 0 171 0zm0 48.7c67.4 0 122.3 54.9 122.3 122.3 0 67.4-54.9 122.3-122.3 122.3S48.7 238.4 48.7 171c0-67.4 54.9-122.3 122.3-122.3z" />
    </svg>
  );
}
