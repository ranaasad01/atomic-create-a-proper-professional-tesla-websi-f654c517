"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Leaf, Star, ChevronRight } from 'lucide-react';
import { vehicles, energyProducts, BRAND_NAME } from "@/lib/data";
import { heroEntrance, fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

const statItems = [
  { value: "1M+", label: "home.stats.superchargers" },
  { value: "50B+", label: "home.stats.milesDriven" },
  { value: "99%", label: "home.stats.uptime" },
  { value: "405mi", label: "home.stats.maxRange" },
];

const valueProps = [
  {
    icon: Zap,
    title: "home.value.performance.title",
    description: "home.value.performance.desc",
  },
  {
    icon: Leaf,
    title: "home.value.sustainability.title",
    description: "home.value.sustainability.desc",
  },
  {
    icon: Shield,
    title: "home.value.safety.title",
    description: "home.value.safety.desc",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah M.",
    role: "home.testimonials.t1.role",
    quote: "home.testimonials.t1.quote",
    rating: 5,
    vehicle: "Model 3",
  },
  {
    id: "t2",
    name: "James K.",
    role: "home.testimonials.t2.role",
    quote: "home.testimonials.t2.quote",
    rating: 5,
    vehicle: "Model Y",
  },
  {
    id: "t3",
    name: "Priya L.",
    role: "home.testimonials.t3.role",
    quote: "home.testimonials.t3.quote",
    rating: 5,
    vehicle: "Model S",
  },
];

const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -6,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const glowPulse: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden"
      >
        {/* Background glow */}
        <motion.div
          variants={glowPulse}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[var(--brand-accent)]/8 blur-[120px]" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--brand-accent)]/5 blur-[80px]" />
        </motion.div>

        {/* Hero image */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="relative w-full max-w-5xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-[0_8px_80px_rgba(0,0,0,0.6)] border border-white/8"
        >
          <img
            src="https://www.teslarati.com/wp-content/uploads/2024/05/model-s-logo.jpeg"
            alt={t("home.hero.imageAlt")}
            className="w-full h-[420px] md:h-[560px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
        </motion.div>

        {/* Hero text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl mx-auto"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-accent)] mb-4"
          >
            {t("home.hero.eyebrow")}
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-[1.05] mb-6"
          >
            {t("home.hero.headline")}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed text-pretty mb-10 max-w-xl mx-auto"
          >
            {t("home.hero.subheadline")}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--brand-accent)] text-white font-semibold text-sm hover:bg-[var(--brand-accent-hover)] transition-all duration-300 shadow-[0_0_30px_rgba(227,25,55,0.4)] hover:shadow-[0_0_40px_rgba(227,25,55,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
            >
              {t("home.hero.cta.primary")}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/energy"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-[var(--text-primary)] font-semibold text-sm hover:bg-white/8 hover:border-white/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
            >
              {t("home.hero.cta.secondary")}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="stats"
          className="border-y border-white/8 bg-[var(--bg-secondary)]"
        >
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {statItems.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] font-medium">
                    {t(stat.label)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── FEATURED VEHICLES ────────────────────────────────────────────── */}
      <Reveal>
        <section id="vehicles" className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)] mb-3">
                    {t("home.vehicles.eyebrow")}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
                    {t("home.vehicles.heading")}
                  </h2>
                </div>
                <Link
                  href="/vehicles"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-accent)] hover:gap-3 transition-all duration-200"
                >
                  {t("home.vehicles.viewAll")}
                  <ChevronRight size={16} />
                </Link>
              </div>
            </Reveal>

            {/* Bento grid: first card large, rest smaller */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {vehicles.slice(0, 6).map((vehicle, i) => (
                <Reveal key={vehicle.id} delay={i * 0.07}>
                  <motion.div
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    className={`group relative rounded-2xl overflow-hidden border border-white/8 bg-[var(--bg-secondary)] shadow-[0_2px_4px_rgba(0,0,0,0.2),0_12px_40px_-8px_rgba(0,0,0,0.4)] cursor-pointer ${
                      i === 0 ? "md:col-span-2 lg:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden ${
                        i === 0 ? "h-72 md:h-80" : "h-52"
                      }`}
                    >
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold tracking-tight">
                            {vehicle.name}
                          </h3>
                          <p className="text-sm text-[var(--brand-accent)] font-medium mt-0.5">
                            {vehicle.tagline}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-[var(--text-secondary)] bg-white/8 px-3 py-1 rounded-full border border-white/10">
                          {vehicle.startingPrice}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-5">
                        {[
                          { label: t("home.vehicles.range"), value: vehicle.range },
                          { label: t("home.vehicles.topSpeed"), value: vehicle.topSpeed },
                          { label: t("home.vehicles.zeroSixty"), value: vehicle.zeroToSixty },
                        ].map((spec) => (
                          <div
                            key={spec.label}
                            className="bg-white/5 rounded-xl p-3 text-center border border-white/8"
                          >
                            <p className="text-base font-bold">{spec.value}</p>
                            <p className="text-[10px] text-[var(--text-muted)] mt-0.5 uppercase tracking-wide">
                              {spec.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Link
                          href="/vehicles"
                          className="flex-1 text-center py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-sm font-semibold hover:bg-[var(--brand-accent-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                        >
                          {t("home.vehicles.order")}
                        </Link>
                        <Link
                          href="/vehicles"
                          className="flex-1 text-center py-2.5 rounded-full border border-white/20 text-[var(--text-primary)] text-sm font-semibold hover:bg-white/8 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                        >
                          {t("home.vehicles.configure")}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="features"
          className="py-24 md:py-32 px-6 bg-[var(--bg-secondary)] border-y border-white/8"
        >
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)] mb-3">
                  {t("home.value.eyebrow")}
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance mb-4">
                  {t("home.value.heading")}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed text-pretty">
                  {t("home.value.subheading")}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {valueProps.map((vp, i) => {
                const Icon = vp.icon;
                return (
                  <Reveal key={vp.title} delay={i * 0.1}>
                    <motion.div
                      variants={cardHover}
                      initial="rest"
                      whileHover="hover"
                      className="relative rounded-2xl p-8 border border-white/8 bg-[var(--bg-primary)] shadow-[0_2px_4px_rgba(0,0,0,0.15),0_8px_32px_-8px_rgba(0,0,0,0.3)] overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[var(--brand-accent)]/5 blur-3xl pointer-events-none group-hover:bg-[var(--brand-accent)]/10 transition-all duration-500" />
                      <div className="w-12 h-12 rounded-xl bg-[var(--brand-accent)]/15 border border-[var(--brand-accent)]/20 flex items-center justify-center mb-6">
                        <Icon size={22} className="text-[var(--brand-accent)]" />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight mb-3">
                        {t(vp.title)}
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                        {t(vp.description)}
                      </p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── ENERGY PRODUCTS ──────────────────────────────────────────────── */}
      <Reveal>
        <section id="energy" className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)] mb-3">
                    {t("home.energy.eyebrow")}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
                    {t("home.energy.heading")}
                  </h2>
                </div>
                <Link
                  href="/energy"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-accent)] hover:gap-3 transition-all duration-200"
                >
                  {t("home.energy.viewAll")}
                  <ChevronRight size={16} />
                </Link>
              </div>
            </Reveal>

            {/* Asymmetric layout: large left + two stacked right */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {energyProducts.slice(0, 1).map((product) => (
                <Reveal key={product.id} className="lg:col-span-3">
                  <motion.div
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[var(--bg-secondary)] shadow-[0_2px_4px_rgba(0,0,0,0.2),0_12px_40px_-8px_rgba(0,0,0,0.4)] h-full"
                  >
                    <div className="relative h-64 lg:h-80 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    <div className="p-7">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)] mb-2">
                        {product.tagline}
                      </p>
                      <h3 className="text-2xl font-bold tracking-tight mb-3">
                        {product.name}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                        {product.description}
                      </p>
                      <div className="flex gap-3">
                        <Link
                          href="/energy"
                          className="px-5 py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-sm font-semibold hover:bg-[var(--brand-accent-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                        >
                          {t("home.energy.order")}
                        </Link>
                        <Link
                          href="/energy"
                          className="px-5 py-2.5 rounded-full border border-white/20 text-[var(--text-primary)] text-sm font-semibold hover:bg-white/8 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                        >
                          {t("home.energy.learn")}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}

              <div className="lg:col-span-2 flex flex-col gap-5">
                {energyProducts.slice(1, 3).map((product, i) => (
                  <Reveal key={product.id} delay={i * 0.1}>
                    <motion.div
                      variants={cardHover}
                      initial="rest"
                      whileHover="hover"
                      className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[var(--bg-secondary)] shadow-[0_2px_4px_rgba(0,0,0,0.2),0_12px_40px_-8px_rgba(0,0,0,0.4)] flex flex-col"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      </div>
                      <div className="p-5 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)] mb-1">
                          {product.tagline}
                        </p>
                        <h3 className="text-lg font-bold tracking-tight mb-2">
                          {product.name}
                        </h3>
                        <p className="text-[var(--text-secondary)] text-xs leading-relaxed mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <Link
                          href="/energy"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-accent)] hover:gap-3 transition-all duration-200"
                        >
                          {t("home.energy.learnMore")}
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="testimonials"
          className="py-24 md:py-32 px-6 bg-[var(--bg-secondary)] border-y border-white/8"
        >
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="text-center mb-16 max-w-2xl mx-auto">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)] mb-3">
                  {t("home.testimonials.eyebrow")}
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-balance">
                  {t("home.testimonials.heading")}
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.1}>
                  <motion.div
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    className="rounded-2xl p-7 border border-white/8 bg-[var(--bg-primary)] shadow-[0_2px_4px_rgba(0,0,0,0.15),0_8px_32px_-8px_rgba(0,0,0,0.3)] flex flex-col gap-5"
                  >
                    <div className="flex gap-1">
                      {Array.from({ length: item.rating }).map((_, si) => (
                        <Star
                          key={si}
                          size={14}
                          className="fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                        />
                      ))}
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 italic">
                      "{t(item.quote)}"
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-white/8">
                      <div className="w-9 h-9 rounded-full bg-[var(--brand-accent)]/20 border border-[var(--brand-accent)]/30 flex items-center justify-center text-sm font-bold text-[var(--brand-accent)]">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {t(item.role)} · {item.vehicle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="cta" className="py-24 md:py-36 px-6 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[var(--brand-accent)]/10 blur-[100px]" />
          </div>
          <div className="relative max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-accent)] mb-4">
                {t("home.cta.eyebrow")}
              </p>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance mb-6">
                {t("home.cta.heading")}
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed text-pretty mb-10 max-w-xl mx-auto">
                {t("home.cta.subheading")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/vehicles"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-[var(--brand-accent)] text-white font-semibold text-sm hover:bg-[var(--brand-accent-hover)] transition-all duration-300 shadow-[0_0_40px_rgba(227,25,55,0.45)] hover:shadow-[0_0_60px_rgba(227,25,55,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                >
                  {t("home.cta.primary")}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-white/20 text-[var(--text-primary)] font-semibold text-sm hover:bg-white/8 hover:border-white/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                >
                  {t("home.cta.secondary")}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>
    </main>
  );
}