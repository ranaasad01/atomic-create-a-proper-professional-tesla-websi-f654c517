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
      return pathname === "/" ? href : `/${href}`;
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
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] rounded"
            aria-label={t("nav.logoAlt")}
          >
            <TeslaLogo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label={t("nav.ariaLabel")}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getLinkHref(link.href, link.type)}
                onClick={(e) => handleLinkClick(e, link.href, link.type)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] ${
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
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/vehicles"
              className="px-5 py-2 text-sm font-semibold rounded-full bg-[var(--brand-accent)] text-white hover:bg-[var(--brand-accent-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] shadow-[0_0_20px_rgba(227,25,55,0.3)]"
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
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 bg-[var(--bg-primary)]/98 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1" aria-label={t("nav.mobileAriaLabel")}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={getLinkHref(link.href, link.type)}
                    onClick={(e) => handleLinkClick(e, link.href, link.type)}
                    className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 ${
                      pathname === link.href
                        ? "text-[var(--text-primary)] bg-white/10"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/8"
                    }`}
                  >
                    {t(link.label)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <Link
                  href="/vehicles"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-3 text-sm font-semibold rounded-full bg-[var(--brand-accent)] text-white hover:bg-[var(--brand-accent-hover)] transition-all duration-200"
                >
                  {t("nav.orderNow")}
                </Link>
              </motion.div>
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
      width="80"
      height="28"
      viewBox="0 0 342 35"
      fill="currentColor"
      className="text-[var(--text-primary)]"
      aria-hidden="true"
    >
      <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 7-7h-31.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v7h30.3l-31.2 21.5v7.2h39.2a9.7 9.7 0 0 0 7-7h-32l17.4-21.9zM85.3 7h26a9.8 9.8 0 0 0 7-7H78.3a9.8 9.8 0 0 0 7 7zm-3.9 9.8h30.8a9.7 9.7 0 0 0 7-7H74.4a9.7 9.7 0 0 0 7 7zm3.9 18h26a9.8 9.8 0 0 0 7-7H78.3a9.8 9.8 0 0 0 7 7zM163 34.8h6.8V0H163v34.8z" />
    </svg>
  );
}