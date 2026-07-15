"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Zap, Home, ArrowRight, Check, TrendingDown, Shield, Leaf, Battery, ChevronDown, ChevronUp } from 'lucide-react';
import { energyProducts } from "@/lib/data";
import { fadeInUp, staggerContainer, heroEntrance, scaleIn } from "@/lib/motion";
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

const productIcons: Record<string, React.ReactNode> = {
  powerwall: <Battery className="w-6 h-6" />,
  "solar-roof": <Home className="w-6 h-6" />,
  "solar-panels": <Sun className="w-6 h-6" />,
};

const productSpecs: Record<string, { label: string; value: string }[]> = {
  powerwall: [
    { label: "Capacity", value: "13.5 kWh" },
    { label: "Power", value: "11.5 kW peak" },
    { label: "Efficiency", value: "90%" },
    { label: "Warranty", value: "10 years" },
  ],
  "solar-roof": [
    { label: "Durability", value: "3x stronger" },
    { label: "Warranty", value: "25 years" },
    { label: "Efficiency", value: "Up to 22%" },
    { label: "Coverage", value: "Whole roof" },
  ],
  "solar-panels": [
    { label: "Output", value: "Up to 425W" },
    { label: "Efficiency", value: "Up to 22.8%" },
    { label: "Warranty", value: "25 years" },
    { label: "Profile", value: "Low-profile" },
  ],
};

const wholeHomeSteps = [
  {
    icon: <Sun className="w-5 h-5" />,
    title: "Solar Capture",
    description: "Solar panels or Solar Roof tiles convert sunlight into clean electricity throughout the day.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
  },
  {
    icon: <Battery className="w-5 h-5" />,
    title: "Powerwall Storage",
    description: "Excess energy is stored in Powerwall for use at night, during peak hours, or outages.",
    color: "text-[var(--brand-accent)]",
    bg: "bg-[var(--brand-accent)]/10",
    border: "border-[var(--brand-accent)]/20",
  },
  {
    icon: <Home className="w-5 h-5" />,
    title: "Home Power",
    description: "Your home runs on clean energy 24/7. The Tesla app gives you real-time visibility and control.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Grid Export",
    description: "Sell surplus energy back to the grid or participate in virtual power plant programs.",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
  },
];

const savingsData = [
  { month: "Jan", grid: 180, solar: 40 },
  { month: "Feb", grid: 165, solar: 55 },
  { month: "Mar", grid: 140, solar: 80 },
  { month: "Apr", grid: 110, solar: 110 },
  { month: "May", grid: 80, solar: 140 },
  { month: "Jun", grid: 50, solar: 170 },
  { month: "Jul", grid: 30, solar: 190 },
  { month: "Aug", grid: 35, solar: 185 },
  { month: "Sep", grid: 60, solar: 160 },
  { month: "Oct", grid: 95, solar: 125 },
  { month: "Nov", grid: 140, solar: 80 },
  { month: "Dec", grid: 175, solar: 45 },
];

const maxBarValue = 220;

const benefits = [
  {
    icon: <TrendingDown className="w-5 h-5" />,
    title: "Reduce Energy Bills",
    description: "Generate your own electricity and dramatically cut monthly utility costs.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Outage Protection",
    description: "Powerwall automatically keeps your home powered when the grid goes down.",
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: "Zero Emissions",
    description: "Power your home and car with 100% clean, renewable solar energy.",
  },
];

const faqs = [
  {
    question: "How much can I save with Tesla Solar?",
    answer:
      "Most homeowners save between $1,000 and $2,500 per year depending on their energy usage, local utility rates, and available sunlight. Tesla's solar calculator can give you a personalized estimate.",
  },
  {
    question: "What happens during a power outage?",
    answer:
      "Powerwall detects grid outages and automatically disconnects from the grid, becoming your home's main energy source within milliseconds. Your lights, appliances, and devices keep running seamlessly.",
  },
  {
    question: "Can I add Powerwall without solar?",
    answer:
      "Yes. Powerwall can be installed as a standalone battery system, charging from the grid during off-peak hours when electricity rates are lower, then discharging during peak hours.",
  },
  {
    question: "Are there tax incentives available?",
    answer:
      "The federal Investment Tax Credit (ITC) allows you to deduct 30% of the cost of your solar system from your federal taxes. Many states and utilities offer additional incentives.",
  },
];

export default function EnergyPage() {
  const t = useTranslations();
  const [activeProduct, setActiveProduct] = useState<string>("powerwall");
  const [monthlyBill, setMonthlyBill] = useState<number>(200);
  const [roofSize, setRoofSize] = useState<number>(1500);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const estimatedAnnualSavings = Math.round(monthlyBill * 0.7 * 12);
  const estimatedSystemSize = Math.round(roofSize / 100);
  const paybackYears = Math.round((estimatedSystemSize * 3000) / (estimatedAnnualSavings || 1));

  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://s3.amazonaws.com/solarassets/wp-content/uploads/2019/07/tesla-solar-roof.png"
            alt={t("energy.hero.imageAlt")}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[var(--bg-primary)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-400/8 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-400 text-xs font-semibold uppercase tracking-widest">
                <Sun className="w-3.5 h-3.5" />
                {t("energy.hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              variants={heroEntrance}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white text-balance leading-[0.95]"
            >
              {t("energy.hero.title")}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed text-pretty"
            >
              {t("energy.hero.subtitle")}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link
                href="#products"
                className="px-8 py-3.5 rounded-full bg-[var(--brand-accent)] text-white font-semibold text-sm hover:bg-[var(--brand-accent-hover)] transition-all duration-300 shadow-[0_0_30px_rgba(227,25,55,0.35)] hover:shadow-[0_0_40px_rgba(227,25,55,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
              >
                {t("energy.hero.cta.explore")}
              </Link>
              <Link
                href="#calculator"
                className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                {t("energy.hero.cta.savings")}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs tracking-widest uppercase">{t("energy.hero.scroll")}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS STRIP ── */}
      <Reveal>
        <section className="border-y border-white/8 bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "6M+", label: t("energy.stats.homes") },
              { value: "30%", label: t("energy.stats.taxCredit") },
              { value: "25yr", label: t("energy.stats.warranty") },
              { value: "100%", label: t("energy.stats.clean") },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[var(--brand-accent)] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── PRODUCTS GRID ── */}
      <section id="products" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                {t("energy.products.heading")}
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] text-lg max-w-2xl mx-auto text-pretty">
                {t("energy.products.subheading")}
              </p>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {energyProducts.map((product, i) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                id={product.id}
                className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[var(--bg-secondary)] hover:border-white/16 transition-all duration-500 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.4)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_16px_48px_-8px_rgba(0,0,0,0.6)] cursor-pointer"
                onClick={() => setActiveProduct(product.id)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Product image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/80 text-xs font-medium">
                      {productIcons[product.id]}
                      {product.tagline}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Animated spec callouts */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {(productSpecs[product.id] ?? []).map((spec, si) => (
                      <motion.div
                        key={spec.label}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + si * 0.06, duration: 0.4 }}
                        className="rounded-xl bg-white/4 border border-white/6 p-3"
                      >
                        <div className="text-base font-bold text-[var(--brand-accent)]">
                          {spec.value}
                        </div>
                        <div className="text-xs text-[var(--text-muted)] mt-0.5">{spec.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3">
                    <Link
                      href={product.orderHref}
                      className="flex-1 text-center px-4 py-2.5 rounded-full bg-[var(--brand-accent)] text-white text-sm font-semibold hover:bg-[var(--brand-accent-hover)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t("energy.product.order")}
                    </Link>
                    <Link
                      href={product.learnHref}
                      className="flex-1 text-center px-4 py-2.5 rounded-full border border-white/15 text-[var(--text-secondary)] text-sm font-semibold hover:border-white/30 hover:text-[var(--text-primary)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t("energy.product.learn")}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHOLE-HOME ENERGY DIAGRAM ── */}
      <Reveal>
        <section className="py-24 md:py-32 bg-[var(--bg-secondary)] border-y border-white/8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: copy */}
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)] mb-4">
                  {t("energy.wholehome.eyebrow")}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance mb-6">
                  {t("energy.wholehome.heading")}
                </h2>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10 text-pretty">
                  {t("energy.wholehome.body")}
                </p>

                <div className="space-y-4">
                  {benefits.map((b, i) => (
                    <Reveal key={b.title} delay={i * 0.1}>
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-white/3 border border-white/6">
                        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--brand-accent)]/15 flex items-center justify-center text-[var(--brand-accent)]">
                          {b.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-sm mb-1">{b.title}</div>
                          <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                            {b.description}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Right: diagram */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden border border-white/8 bg-[var(--bg-primary)] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_16px_48px_-8px_rgba(0,0,0,0.5)]">
                  {/* House illustration */}
                  <div className="relative h-64 mb-8">
                    <img
                      src="https://regenpower.com/wp-content/uploads/2021/08/tesla-scaled-1024x640.jpg"
                      alt={t("energy.wholehome.imageAlt")}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-[var(--bg-primary)]/80 to-transparent" />

                    {/* Floating energy indicators */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/30 backdrop-blur-sm"
                    >
                      <Sun className="w-3.5 h-3.5 text-yellow-400" />
                      <span className="text-yellow-400 text-xs font-semibold">8.4 kW</span>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.8 }}
                      className="absolute bottom-8 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-accent)]/20 border border-[var(--brand-accent)]/30 backdrop-blur-sm"
                    >
                      <Battery className="w-3.5 h-3.5 text-[var(--brand-accent)]" />
                      <span className="text-[var(--brand-accent)] text-xs font-semibold">94%</span>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1.4 }}
                      className="absolute bottom-8 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-400/20 border border-green-400/30 backdrop-blur-sm"
                    >
                      <Zap className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400 text-xs font-semibold">{t("energy.diagram.exporting")}</span>
                    </motion.div>
                  </div>

                  {/* Flow steps */}
                  <div className="grid grid-cols-2 gap-3">
                    {wholeHomeSteps.map((step, i) => (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className={`rounded-xl border p-3 ${step.bg} ${step.border}`}
                      >
                        <div className={`mb-1.5 ${step.color}`}>{step.icon}</div>
                        <div className="text-xs font-semibold mb-0.5">{step.title}</div>
                        <div className="text-xs text-[var(--text-muted)] leading-relaxed hidden lg:block">
                          {step.description}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── SAVINGS CALCULATOR ── */}
      <section id="calculator" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)] mb-4">
                {t("energy.calculator.eyebrow")}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                {t("energy.calculator.heading")}
              </h2>
              <p className="mt-4 text-[var(--text-secondary)] text-lg max-w-xl mx-auto text-pretty">
                {t("energy.calculator.subheading")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Inputs */}
            <Reveal>
              <div className="rounded-2xl border border-white/8 bg-[var(--bg-secondary)] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.4)]">
                <h3 className="text-lg font-bold mb-6">{t("energy.calculator.inputs.heading")}</h3>

                <div className="space-y-8">
                  {/* Monthly bill slider */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">
                        {t("energy.calculator.inputs.monthlyBill")}
                      </label>
                      <span className="text-lg font-bold text-[var(--brand-accent)]">
                        ${monthlyBill}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={600}
                      step={10}
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none bg-white/10 accent-[var(--brand-accent)] cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1.5">
                      <span>$50</span>
                      <span>$600</span>
                    </div>
                  </div>

                  {/* Roof size slider */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">
                        {t("energy.calculator.inputs.roofSize")}
                      </label>
                      <span className="text-lg font-bold text-[var(--brand-accent)]">
                        {roofSize.toLocaleString("en-US")} sq ft
                      </span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={4000}
                      step={100}
                      value={roofSize}
                      onChange={(e) => setRoofSize(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none bg-white/10 accent-[var(--brand-accent)] cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1.5">
                      <span>500 sq ft</span>
                      <span>4,000 sq ft</span>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    {
                      label: t("energy.calculator.result.annualSavings"),
                      value: `$${estimatedAnnualSavings.toLocaleString("en-US")}`,
                      color: "text-green-400",
                    },
                    {
                      label: t("energy.calculator.result.systemSize"),
                      value: `${estimatedSystemSize} kW`,
                      color: "text-yellow-400",
                    },
                    {
                      label: t("energy.calculator.result.payback"),
                      value: `${paybackYears} yrs`,
                      color: "text-blue-400",
                    },
                  ].map((r) => (
                    <div
                      key={r.label}
                      className="rounded-xl bg-white/4 border border-white/6 p-4 text-center"
                    >
                      <div className={`text-xl font-bold ${r.color}`}>{r.value}</div>
                      <div className="text-xs text-[var(--text-muted)] mt-1 leading-tight">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[var(--text-muted)] mt-4 leading-relaxed">
                  {t("energy.calculator.disclaimer")}
                </p>
              </div>
            </Reveal>

            {/* Chart */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/8 bg-[var(--bg-secondary)] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">{t("energy.calculator.chart.heading")}</h3>
                  <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
                      {t("energy.calculator.chart.grid")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
                      {t("energy.calculator.chart.solar")}
                    </span>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="flex items-end gap-1.5 h-48">
                  {savingsData.map((d, i) => (
                    <motion.div
                      key={d.month}
                      className="flex-1 flex flex-col items-center gap-0.5"
                      initial={{ opacity: 0, scaleY: 0 }}
                      whileInView={{ opacity: 1, scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.5, ease: "easeOut" }}
                      style={{ transformOrigin: "bottom" }}
                    >
                      <div className="w-full flex flex-col gap-0.5" style={{ height: "180px" }}>
                        {/* Grid bar */}
                        <div
                          className="w-full rounded-t-sm bg-white/15 mt-auto"
                          style={{ height: `${(d.grid / maxBarValue) * 100}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Stacked bars (proper) */}
                <div className="flex items-end gap-1.5 h-48 -mt-48 relative z-10">
                  {savingsData.map((d, i) => (
                    <div key={d.month} className="flex-1 flex flex-col justify-end" style={{ height: "180px" }}>
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 + 0.2, duration: 0.5, ease: "easeOut" }}
                        style={{
                          height: `${(d.solar / maxBarValue) * 100}%`,
                          transformOrigin: "bottom",
                        }}
                        className="w-full rounded-t-sm bg-yellow-400/70"
                      />
                    </div>
                  ))}
                </div>

                {/* Month labels */}
                <div className="flex gap-1.5 mt-2">
                  {savingsData.map((d) => (
                    <div key={d.month} className="flex-1 text-center text-xs text-[var(--text-muted)]">
                      {d.month}
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-green-400/8 border border-green-400/15 flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <p className="text-xs text-[var(--text-secondary)]">
                    {t("energy.calculator.chart.note")}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <Reveal>
        <section className="py-24 md:py-32 bg-[var(--bg-secondary)] border-t border-white/8">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                {t("energy.faq.heading")}
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={faq.question} delay={i * 0.06}>
                  <div className="rounded-xl border border-white/8 bg-[var(--bg-primary)] overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-inset"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span className="font-semibold text-sm leading-snug">{faq.question}</span>
                      <span className="flex-shrink-0 text-[var(--text-muted)]">
                        {openFaq === i ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    </button>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="px-6 pb-5"
                      >
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal>
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[var(--brand-accent)]/8 blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)] mb-4">
              {t("energy.cta.eyebrow")}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">
              {t("energy.cta.heading")}
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-10 text-pretty">
              {t("energy.cta.body")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#quote"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-[var(--brand-accent)] text-white font-semibold hover:bg-[var(--brand-accent-hover)] transition-all duration-300 shadow-[0_0_30px_rgba(227,25,55,0.35)] hover:shadow-[0_0_50px_rgba(227,25,55,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
              >
                {t("energy.cta.button.quote")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/vehicles"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-white/15 text-[var(--text-secondary)] font-semibold hover:border-white/30 hover:text-[var(--text-primary)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                {t("energy.cta.button.vehicles")}
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}