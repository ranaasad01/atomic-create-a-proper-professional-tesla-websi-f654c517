"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown, ArrowRight, Zap, Gauge, Clock } from 'lucide-react';
import { vehicles, type Vehicle } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

const heroText: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroSub: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

const heroButtons: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
  },
};

const specsRow: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.45 },
  },
};

const sideNavItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.6 + i * 0.07 },
  }),
};

interface VehicleExtra {
  id: string;
  accentColor: string;
  gradient: string;
  overlayOpacity: string;
  textDark: boolean;
}

const vehicleExtras: Record<string, VehicleExtra> = {
  "model-s": {
    id: "model-s",
    accentColor: "#C0C0C0",
    gradient: "from-slate-900/80 via-slate-900/40 to-transparent",
    overlayOpacity: "opacity-60",
    textDark: false,
  },
  "model-3": {
    id: "model-3",
    accentColor: "#FFFFFF",
    gradient: "from-zinc-900/85 via-zinc-900/35 to-transparent",
    overlayOpacity: "opacity-50",
    textDark: false,
  },
  "model-x": {
    id: "model-x",
    accentColor: "#A0A0A0",
    gradient: "from-black/90 via-black/50 to-transparent",
    overlayOpacity: "opacity-70",
    textDark: false,
  },
  "model-y": {
    id: "model-y",
    accentColor: "#E31937",
    gradient: "from-neutral-900/80 via-neutral-900/30 to-transparent",
    overlayOpacity: "opacity-55",
    textDark: false,
  },
  cybertruck: {
    id: "cybertruck",
    accentColor: "#C8D8E8",
    gradient: "from-slate-950/85 via-slate-950/40 to-transparent",
    overlayOpacity: "opacity-65",
    textDark: false,
  },
  roadster: {
    id: "roadster",
    accentColor: "#E31937",
    gradient: "from-red-950/80 via-red-950/30 to-transparent",
    overlayOpacity: "opacity-60",
    textDark: false,
  },
};

function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return activeId;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

interface SpecBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function SpecBadge({ icon, label, value }: SpecBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 min-w-[100px]">
      <div className="text-white/60 mb-0.5">{icon}</div>
      <span className="text-white text-lg font-bold leading-none tracking-tight">
        {value}
      </span>
      <span className="text-white/55 text-xs font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

interface VehicleSectionProps {
  vehicle: Vehicle;
  index: number;
  t: ReturnType<typeof useTranslations>;
}

function VehicleSection({ vehicle, index, t }: VehicleSectionProps) {
  const extra = vehicleExtras[vehicle.id] ?? vehicleExtras["model-s"];
  const isEven = index % 2 === 0;

  return (
    <section
      id={vehicle.id}
      className="relative w-full h-screen min-h-[600px] flex flex-col overflow-hidden"
      aria-label={vehicle.name}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://www.teslarati.com/wp-content/uploads/2024/05/model-s-logo.jpeg";
          }}
        />
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${extra.gradient}`}
        />
        <div className={`absolute inset-0 bg-black ${extra.overlayOpacity}`} />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col justify-end h-full pb-20 px-8 md:px-16 lg:px-24 ${
          isEven ? "items-start" : "items-end text-right"
        }`}
      >
        <motion.div
          key={vehicle.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`flex flex-col gap-4 max-w-xl ${
            isEven ? "items-start" : "items-end"
          }`}
        >
          {/* Tagline pill */}
          <motion.div variants={heroSub}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/15 backdrop-blur-sm border border-white/20 text-white/80">
              {vehicle.tagline}
            </span>
          </motion.div>

          {/* Model name */}
          <motion.h2
            variants={heroText}
            className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none"
          >
            {vehicle.name}
          </motion.h2>

          {/* Starting price */}
          <motion.p
            variants={heroSub}
            className="text-white/70 text-base font-medium"
          >
            {t("vehicles.startingAt")}{" "}
            <span className="text-white font-bold">{vehicle.startingPrice}</span>
          </motion.p>

          {/* Specs row */}
          <motion.div
            variants={specsRow}
            className={`flex flex-wrap gap-3 mt-2 ${
              isEven ? "justify-start" : "justify-end"
            }`}
          >
            <SpecBadge
              icon={<Zap size={14} />}
              label={t("vehicles.spec.range")}
              value={vehicle.range}
            />
            <SpecBadge
              icon={<Clock size={14} />}
              label={t("vehicles.spec.zeroSixty")}
              value={vehicle.zeroToSixty}
            />
            <SpecBadge
              icon={<Gauge size={14} />}
              label={t("vehicles.spec.topSpeed")}
              value={vehicle.topSpeed}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={heroButtons}
            className={`flex flex-wrap gap-3 mt-4 ${
              isEven ? "justify-start" : "justify-end"
            }`}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={vehicle.orderHref}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[var(--brand-accent)] text-white font-semibold text-sm shadow-[0_0_24px_rgba(227,25,55,0.4)] hover:bg-[var(--brand-accent-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
              >
                {t("vehicles.cta.order")}
                <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={vehicle.configureHref}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white font-semibold text-sm hover:bg-white/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                {t("vehicles.cta.configure")}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator (only first section) */}
      {index === 0 && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-widest font-medium">
            {t("vehicles.scrollExplore")}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

export default function VehiclesPage() {
  const t = useTranslations();
  const vehicleIds = vehicles.map((v) => v.id);
  const activeId = useActiveSection(vehicleIds);
  const [sideNavVisible, setSideNavVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSideNavVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative">
      {/* Page Hero Banner */}
      <Reveal>
        <div className="relative bg-[var(--bg-primary)] pt-32 pb-16 px-8 md:px-16 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--brand-accent)]/10 rounded-full blur-[80px]" />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[var(--brand-accent)] text-xs font-semibold uppercase tracking-[0.2em] mb-4"
          >
            {t("vehicles.eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-[var(--text-primary)] leading-none mb-6"
          >
            {t("vehicles.pageTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.22 }}
            className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto leading-relaxed"
          >
            {t("vehicles.pageSubtitle")}
          </motion.p>

          {/* Quick jump pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.38 }}
            className="flex flex-wrap justify-center gap-2 mt-10"
          >
            {vehicles.map((v) => (
              <motion.button
                key={v.id}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection(v.id)}
                className="px-4 py-1.5 rounded-full text-sm font-medium border border-white/15 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-white/30 hover:bg-white/8 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
              >
                {v.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </Reveal>

      {/* Sticky Side Navigation */}
      <AnimatePresence>
        {sideNavVisible && (
          <motion.nav
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
            aria-label={t("vehicles.sideNav.ariaLabel")}
          >
            {vehicles.map((v, i) => (
              <motion.button
                key={v.id}
                custom={i}
                variants={sideNavItem}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.1, x: 4 }}
                onClick={() => scrollToSection(v.id)}
                title={v.name}
                aria-label={v.name}
                className={`group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] rounded-full`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    activeId === v.id
                      ? "w-8 h-2 bg-[var(--brand-accent)] shadow-[0_0_10px_rgba(227,25,55,0.6)]"
                      : "w-2 h-2 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
                <span
                  className={`text-xs font-semibold transition-all duration-200 ${
                    activeId === v.id
                      ? "opacity-100 text-white"
                      : "opacity-0 group-hover:opacity-70 text-white/70"
                  }`}
                >
                  {v.name}
                </span>
              </motion.button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Vehicle Sections */}
      <div className="w-full">
        {vehicles.map((vehicle, index) => (
          <VehicleSection
            key={vehicle.id}
            vehicle={vehicle}
            index={index}
            t={t}
          />
        ))}
      </div>

      {/* Compare Section */}
      <Reveal>
        <section className="bg-[var(--bg-secondary)] py-24 px-6 md:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[var(--brand-accent)] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                {t("vehicles.compare.eyebrow")}
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--text-primary)] mb-4">
                {t("vehicles.compare.title")}
              </h2>
              <p className="text-[var(--text-secondary)] text-base max-w-lg mx-auto leading-relaxed">
                {t("vehicles.compare.subtitle")}
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/4">
                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                      {t("vehicles.compare.col.model")}
                    </th>
                    <th className="text-center px-4 py-4 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                      {t("vehicles.compare.col.range")}
                    </th>
                    <th className="text-center px-4 py-4 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                      {t("vehicles.compare.col.zeroSixty")}
                    </th>
                    <th className="text-center px-4 py-4 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                      {t("vehicles.compare.col.topSpeed")}
                    </th>
                    <th className="text-center px-4 py-4 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                      {t("vehicles.compare.col.price")}
                    </th>
                    <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                      {t("vehicles.compare.col.action")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((v, i) => (
                    <motion.tr
                      key={v.id}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.45 }}
                      className="border-b border-white/5 hover:bg-white/4 transition-colors duration-150 group"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-1 h-8 rounded-full bg-[var(--brand-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          <div>
                            <p className="text-[var(--text-primary)] font-bold text-sm">
                              {v.name}
                            </p>
                            <p className="text-[var(--text-muted)] text-xs mt-0.5">
                              {v.tagline}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className="text-[var(--text-primary)] font-semibold text-sm">
                          {v.range}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className="text-[var(--text-primary)] font-semibold text-sm">
                          {v.zeroToSixty}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className="text-[var(--text-primary)] font-semibold text-sm">
                          {v.topSpeed}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className="text-[var(--text-primary)] font-semibold text-sm">
                          {v.startingPrice}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.96 }}
                          className="inline-block"
                        >
                          <Link
                            href={v.orderHref}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--brand-accent)] text-white text-xs font-semibold hover:bg-[var(--brand-accent-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                          >
                            {t("vehicles.cta.order")}
                            <ArrowRight size={12} />
                          </Link>
                        </motion.div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Bottom CTA */}
      <Reveal>
        <section className="bg-[var(--bg-primary)] py-28 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[var(--brand-accent)]/8 rounded-full blur-[100px]" />
          </div>
          <div className="relative max-w-2xl mx-auto">
            <p className="text-[var(--brand-accent)] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              {t("vehicles.bottomCta.eyebrow")}
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[var(--text-primary)] mb-6 leading-none">
              {t("vehicles.bottomCta.title")}
            </h2>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-10">
              {t("vehicles.bottomCta.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#order"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--brand-accent)] text-white font-semibold text-sm shadow-[0_0_30px_rgba(227,25,55,0.35)] hover:bg-[var(--brand-accent-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                >
                  {t("vehicles.bottomCta.primaryBtn")}
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/energy"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-[var(--text-primary)] font-semibold text-sm hover:bg-white/8 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {t("vehicles.bottomCta.secondaryBtn")}
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}