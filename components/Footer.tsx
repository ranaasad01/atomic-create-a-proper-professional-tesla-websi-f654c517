"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface FooterLink {
  label: string;
  href: string;
  type: "route" | "anchor";
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    heading: "footer.col.vehicles",
    links: [
      { label: "footer.link.modelS", href: "/vehicles", type: "route" },
      { label: "footer.link.model3", href: "/vehicles", type: "route" },
      { label: "footer.link.modelX", href: "/vehicles", type: "route" },
      { label: "footer.link.modelY", href: "/vehicles", type: "route" },
      { label: "footer.link.cybertruck", href: "/vehicles", type: "route" },
      { label: "footer.link.roadster", href: "/vehicles", type: "route" },
    ],
  },
  {
    heading: "footer.col.energy",
    links: [
      { label: "footer.link.powerwall", href: "/energy", type: "route" },
      { label: "footer.link.solarRoof", href: "/energy", type: "route" },
      { label: "footer.link.solarPanels", href: "/energy", type: "route" },
      { label: "footer.link.megapack", href: "/energy", type: "route" },
    ],
  },
  {
    heading: "footer.col.charging",
    links: [
      { label: "footer.link.supercharger", href: "/charging", type: "route" },
      { label: "footer.link.homeCharging", href: "/charging", type: "route" },
      { label: "footer.link.destinationCharging", href: "/charging", type: "route" },
    ],
  },
  {
    heading: "footer.col.company",
    links: [
      { label: "footer.link.about", href: "/about", type: "route" },
      { label: "footer.link.careers", href: "/about", type: "route" },
      { label: "footer.link.press", href: "/about", type: "route" },
      { label: "footer.link.investors", href: "/about", type: "route" },
    ],
  },
];

export function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

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
  };

  const getLinkHref = (href: string, type: "route" | "anchor") => {
    if (type === "anchor") {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {footerColumns.map((col, colIdx) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: colIdx * 0.08, duration: 0.5 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
                {t(col.heading)}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={getLinkHref(link.href, link.type)}
                      onClick={(e) => handleLinkClick(e, link.href, link.type)}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] rounded"
                    >
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            {t("footer.copyright")}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {(["footer.privacy", "footer.legal", "footer.contact", "footer.careers"] as const).map(
              (key) => (
                <Link
                  key={key}
                  href="/about"
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-200"
                >
                  {t(key)}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}