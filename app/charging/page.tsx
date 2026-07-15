"use client";

import { motion, type Variants } from "framer-motion";
import { Zap, Clock, MapPin, ChevronRight, Wifi, Shield, Star, Navigation } from 'lucide-react';
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const benefits = [
  {
    icon: Zap,
    title: "charging.benefit1.title",
    stat: "250 kW",
    statLabel: "charging.benefit1.statLabel",
    description: "charging.benefit1.description",
  },
  {
    icon: Clock,
    title: "charging.benefit2.title",
    stat: "15 min",
    statLabel: "charging.benefit2.statLabel",
    description: "charging.benefit2.description",
  },
  {
    icon: MapPin,
    title: "charging.benefit3.title",
    stat: "50,000+",
    statLabel: "charging.benefit3.statLabel",
    description: "charging.benefit3.description",
  },
];

const steps = [
  {
    number: "01",
    title: "charging.step1.title",
    description: "charging.step1.description",
    icon: Navigation,
  },
  {
    number: "02",
    title: "charging.step2.title",
    description: "charging.step2.description",
    icon: MapPin,
  },
  {
    number: "03",
    title: "charging.step3.title",
    description: "charging.step3.description",
    icon: Zap,
  },
  {
    number: "04",
    title: "charging.step4.title",
    description: "charging.step4.description",
    icon: Wifi,
  },
];

const networkStats = [
  { value: "50,000+", label: "charging.stat1" },
  { value: "100+", label: "charging.stat2" },
  { value: "99.9%", label: "charging.stat3" },
  { value: "24/7", label: "charging.stat4" },
];

const chargerTypes = [
  {
    name: "charging.type1.name",
    speed: "charging.type1.speed",
    time: "charging.type1.time",
    description: "charging.type1.description",
    icon: Zap,
    highlight: true,
  },
  {
    name: "charging.type2.name",
    speed: "charging.type2.speed",
    time: "charging.type2.time",
    description: "charging.type2.description",
    icon: Shield,
    highlight: false,
  },
  {
    name: "charging.type3.name",
    speed: "charging.type3.speed",
    time: "charging.type3.time",
    description: "charging.type3.description",
    icon: Star,
    highlight: false,
  },
];

// SVG world map dots — simplified supercharger density representation
const superchargerDots = [
  // North America
  { cx: 18, cy: 32 }, { cx: 20, cy: 30 }, { cx: 22, cy: 28 }, { cx: 24, cy: 30 },
  { cx: 26, cy: 32 }, { cx: 19, cy: 35 }, { cx: 23, cy: 34 }, { cx: 25, cy: 36 },
  { cx: 21, cy: 38 }, { cx: 17, cy: 36 }, { cx: 28, cy: 30 }, { cx: 16, cy: 33 },
  { cx: 27, cy: 35 }, { cx: 22, cy: 40 }, { cx: 20, cy: 42 }, { cx: 24, cy: 44 },
  // Europe
  { cx: 48, cy: 24 }, { cx: 50, cy: 22 }, { cx: 52, cy: 24 }, { cx: 54, cy: 26 },
  { cx: 49, cy: 27 }, { cx: 51, cy: 25 }, { cx: 53, cy: 23 }, { cx: 47, cy: 26 },
  { cx: 55, cy: 24 }, { cx: 50, cy: 29 }, { cx: 52, cy: 28 }, { cx: 48, cy: 30 },
  // Asia
  { cx: 68, cy: 28 }, { cx: 70, cy: 26 }, { cx: 72, cy: 28 }, { cx: 74, cy: 30 },
  { cx: 69, cy: 32 }, { cx: 71, cy: 30 }, { cx: 73, cy: 27 }, { cx: 75, cy: 29 },
  { cx: 67, cy: 30 }, { cx: 76, cy: 32 }, { cx: 78, cy: 34 }, { cx: 65, cy: 32 },
  // Australia
  { cx: 74, cy: 52 }, { cx: 76, cy: 50 }, { cx: 78, cy: 52 }, { cx: 75, cy: 54 },
  // South America
  { cx: 28, cy: 50 }, { cx: 30, cy: 52 }, { cx: 26, cy: 54 }, { cx: 29, cy: 56 },
];

export default function ChargingPage() {
  const t = useTranslations();

  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1641659376402-3d2f48a91ed7?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={t("charging.hero.imageAlt")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--bg-primary)]" />
        </div>

        {/* Animated glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--brand-accent)]/10 blur-[120px]" />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[var(--brand-accent)]/40 bg-[var(--brand-accent)]/10 text-[var(--brand-accent)] text-xs font-semibold uppercase tracking-widest"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {t("charging.hero.badge")}
          </motion.span>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 text-balance">
            {t("charging.hero.title")}
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            {t("charging.hero.subtitle")}
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              href="#find-charger"
              className="px-8 py-3.5 rounded-full bg-[var(--brand-accent)] text-white font-semibold text-sm hover:bg-[var(--brand-accent-hover)] transition-all duration-300 shadow-[0_0_30px_rgba(227,25,55,0.4)] hover:shadow-[0_0_40px_rgba(227,25,55,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
            >
              {t("charging.hero.cta1")}
            </Link>
            <Link
              href="#how-to-charge"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {t("charging.hero.cta2")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">{t("charging.hero.scroll")}</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── Network Stats ── */}
      <Reveal>
        <section className="py-20 border-b border-white/8">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {networkStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-[var(--brand-accent)] mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">
                    {t(stat.label)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── World Map SVG Teaser ── */}
      <Reveal>
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
                {t("charging.map.title")}
              </h2>
              <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
                {t("charging.map.subtitle")}
              </p>
            </div>

            {/* Animated SVG Map */}
            <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-[var(--bg-secondary)] shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-accent)]/5 to-transparent pointer-events-none" />
              <svg
                viewBox="0 0 100 60"
                className="w-full h-auto"
                aria-label={t("charging.map.svgAlt")}
                role="img"
              >
                {/* Ocean background */}
                <rect width="100" height="60" fill="rgba(10,10,20,0.8)" />

                {/* Simplified continent shapes */}
                {/* North America */}
                <path
                  d="M10,20 L30,18 L32,22 L34,28 L30,38 L26,44 L22,46 L18,44 L14,40 L10,34 L8,28 Z"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.3"
                />
                {/* South America */}
                <path
                  d="M22,46 L30,44 L32,50 L30,58 L26,58 L22,54 Z"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.3"
                />
                {/* Europe */}
                <path
                  d="M44,16 L56,14 L58,18 L56,24 L52,28 L46,28 L44,24 Z"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.3"
                />
                {/* Africa */}
                <path
                  d="M46,28 L56,26 L58,32 L56,44 L52,50 L48,50 L44,44 L44,34 Z"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.3"
                />
                {/* Asia */}
                <path
                  d="M58,14 L82,12 L84,18 L82,26 L78,32 L70,34 L62,32 L58,28 L56,22 Z"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.3"
                />
                {/* Australia */}
                <path
                  d="M70,46 L80,44 L82,50 L80,56 L74,56 L70,52 Z"
                  fill="rgba(255,255,255,0.06)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.3"
                />

                {/* Supercharger dots */}
                {superchargerDots.map((dot, i) => (
                  <motion.circle
                    key={i}
                    cx={dot.cx}
                    cy={dot.cy}
                    r="0.7"
                    fill="var(--brand-accent)"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02, duration: 0.4 }}
                  />
                ))}

                {/* Pulse rings on key hubs */}
                {[
                  { cx: 22, cy: 32 },
                  { cx: 51, cy: 25 },
                  { cx: 71, cy: 29 },
                ].map((hub, i) => (
                  <motion.circle
                    key={`hub-${i}`}
                    cx={hub.cx}
                    cy={hub.cy}
                    r="2"
                    fill="none"
                    stroke="var(--brand-accent)"
                    strokeWidth="0.4"
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{ opacity: 0, scale: 3 }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      delay: i * 0.8,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </svg>

              {/* Map legend */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-[var(--brand-accent)]" />
                <span className="text-xs text-white/70">{t("charging.map.legend")}</span>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Benefits Grid ── */}
      <Reveal>
        <section className="py-24 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
                {t("charging.benefits.title")}
              </h2>
              <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto leading-relaxed">
                {t("charging.benefits.subtitle")}
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    variants={fadeInUp}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="group relative rounded-2xl border border-white/8 bg-[var(--bg-primary)] p-8 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.2),0_16px_40px_-12px_rgba(0,0,0,0.3)] hover:border-[var(--brand-accent)]/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20 flex items-center justify-center mb-6">
                        <Icon className="w-6 h-6 text-[var(--brand-accent)]" />
                      </div>

                      <div className="text-4xl font-bold text-white mb-1 tracking-tight">
                        {benefit.stat}
                      </div>
                      <div className="text-xs text-[var(--brand-accent)] uppercase tracking-widest font-semibold mb-4">
                        {t(benefit.statLabel)}
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-3">
                        {t(benefit.title)}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        {t(benefit.description)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Charger Types ── */}
      <Reveal>
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
                {t("charging.types.title")}
              </h2>
              <p className="text-[var(--text-secondary)] text-lg max-w-xl leading-relaxed">
                {t("charging.types.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {chargerTypes.map((type, i) => {
                const Icon = type.icon;
                return (
                  <Reveal key={type.name} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                        type.highlight
                          ? "bg-[var(--brand-accent)] border-[var(--brand-accent)] shadow-[0_0_40px_rgba(227,25,55,0.3)]"
                          : "bg-[var(--bg-secondary)] border-white/8 hover:border-white/16"
                      }`}
                    >
                      {type.highlight && (
                        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider">
                          {t("charging.types.popular")}
                        </div>
                      )}

                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                          type.highlight ? "bg-white/20" : "bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${type.highlight ? "text-white" : "text-[var(--brand-accent)]"}`}
                        />
                      </div>

                      <h3
                        className={`text-xl font-bold mb-1 ${type.highlight ? "text-white" : "text-[var(--text-primary)]"}`}
                      >
                        {t(type.name)}
                      </h3>
                      <div
                        className={`text-sm font-semibold mb-1 ${type.highlight ? "text-white/80" : "text-[var(--brand-accent)]"}`}
                      >
                        {t(type.speed)}
                      </div>
                      <div
                        className={`text-xs uppercase tracking-wider mb-4 ${type.highlight ? "text-white/60" : "text-[var(--text-muted)]"}`}
                      >
                        {t(type.time)}
                      </div>
                      <p
                        className={`text-sm leading-relaxed ${type.highlight ? "text-white/80" : "text-[var(--text-secondary)]"}`}
                      >
                        {t(type.description)}
                      </p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── How to Charge Timeline ── */}
      <Reveal>
        <section id="how-to-charge" className="py-24 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
                {t("charging.howto.title")}
              </h2>
              <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto leading-relaxed">
                {t("charging.howto.subtitle")}
              </p>
            </div>

            <div className="relative max-w-3xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--brand-accent)]/60 via-[var(--brand-accent)]/20 to-transparent hidden md:block" />

              <div className="space-y-10">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <Reveal key={step.number} delay={i * 0.1}>
                      <motion.div
                        whileHover={{ x: 6, transition: { duration: 0.2 } }}
                        className="relative flex gap-6 md:gap-10 items-start group"
                      >
                        {/* Step indicator */}
                        <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--brand-accent)]/40 group-hover:border-[var(--brand-accent)] flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(227,25,55,0.1)] group-hover:shadow-[0_0_30px_rgba(227,25,55,0.25)] z-10">
                          <Icon className="w-6 h-6 text-[var(--brand-accent)]" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-3 pb-2">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold text-[var(--brand-accent)] uppercase tracking-widest">
                              {step.number}
                            </span>
                            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                              {t(step.title)}
                            </h3>
                          </div>
                          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                            {t(step.description)}
                          </p>
                        </div>
                      </motion.div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Find a Charger CTA ── */}
      <Reveal>
        <section id="find-charger" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative rounded-3xl overflow-hidden border border-white/8 bg-[var(--bg-secondary)] shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://a-us.storyblok.com/f/1006159/810x471/7da591874c/tesla-charging-station.jpg/m/1620x0/filters:quality(90)"
                  alt={t("charging.cta.imageAlt")}
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-secondary)] via-[var(--bg-secondary)]/80 to-transparent" />
              </div>

              {/* Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-accent)]/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 p-12 md:p-16 max-w-2xl">
                <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/30 text-[var(--brand-accent)] text-xs font-semibold uppercase tracking-widest">
                  {t("charging.cta.badge")}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
                  {t("charging.cta.title")}
                </h2>
                <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                  {t("charging.cta.subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--brand-accent)] text-white font-semibold text-sm hover:bg-[var(--brand-accent-hover)] transition-all duration-300 shadow-[0_0_30px_rgba(227,25,55,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                  >
                    {t("charging.cta.button1")}
                    <ChevronRight className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    {t("charging.cta.button2")}
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── App Promo ── */}
      <Reveal>
        <section className="py-24 bg-[var(--bg-secondary)] border-t border-white/8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text */}
              <div>
                <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)]">
                  {t("charging.app.eyebrow")}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
                  {t("charging.app.title")}
                </h2>
                <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                  {t("charging.app.description")}
                </p>

                <ul className="space-y-4 mb-10">
                  {(["charging.app.feature1", "charging.app.feature2", "charging.app.feature3", "charging.app.feature4"] as const).map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)]" />
                      </div>
                      <span className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        {t(key)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-6 py-3 rounded-xl bg-[var(--bg-primary)] border border-white/10 text-white text-sm font-semibold hover:border-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                  >
                    {t("charging.app.appStore")}
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-6 py-3 rounded-xl bg-[var(--bg-primary)] border border-white/10 text-white text-sm font-semibold hover:border-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                  >
                    {t("charging.app.googlePlay")}
                  </motion.a>
                </div>
              </div>

              {/* App mockup */}
              <div className="relative flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="w-64 h-[520px] rounded-[2.5rem] bg-[var(--bg-primary)] border-2 border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)] overflow-hidden relative">
                    <img
                      src="https://i.redd.it/k07oondv7tab1.jpg"
                      alt={t("charging.app.mockupAlt")}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay UI elements */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    <div className="absolute bottom-6 left-4 right-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-white text-xs font-semibold">{t("charging.app.mockup.charging")}</span>
                          <span className="text-[var(--brand-accent)] text-xs font-bold">78%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[var(--brand-accent)] rounded-full"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "78%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-white/50 text-xs">{t("charging.app.mockup.timeLeft")}</span>
                          <span className="text-white/70 text-xs">22 min</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Glow behind phone */}
                  <div className="absolute inset-0 -z-10 bg-[var(--brand-accent)]/10 blur-[60px] rounded-full scale-75" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}