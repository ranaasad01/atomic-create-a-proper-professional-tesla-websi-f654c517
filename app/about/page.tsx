"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, Zap, Car, Activity } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { heroEntrance, staggerContainer, fadeInUp } from "@/lib/motion";

// ─── Inline data ────────────────────────────────────────────────────────────

interface Milestone {
  year: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
}

const milestones: Milestone[] = [
  {
    year: "2003",
    title: "Founded in Silicon Valley",
    body: "Martin Eberhard and Marc Tarpenning incorporate Tesla Motors in San Carlos, California, with a mission to prove that electric vehicles could be better than gasoline-powered cars.",
    image: "https://i0.wp.com/www.americamagazine.org/wp-content/uploads/2018/12/AP_8404240445-402101-scaled.jpg?fit=1200%2C788&ssl=1",
    imageAlt: "Tesla founding team in Silicon Valley",
  },
  {
    year: "2008",
    title: "Roadster Ignites the Revolution",
    body: "The original Tesla Roadster becomes the first highway-legal serial production all-electric vehicle to use lithium-ion battery cells, achieving over 200 miles of range per charge.",
    image: "https://comrise.com/wp-content/uploads/2024/06/%E7%89%B9%E6%96%AF%E6%8B%89-roadster.png",
    imageAlt: "Original Tesla Roadster 2008",
  },
  {
    year: "2012",
    title: "Model S Redefines the Sedan",
    body: "Model S launches to critical acclaim, winning Motor Trend Car of the Year and earning the highest safety rating ever recorded by NHTSA. It proves luxury and sustainability are not mutually exclusive.",
    image: "https://i.ytimg.com/vi/wcVPnN2_-jw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB8HTAplpifVUm-INWaoZx03pcZdg",
    imageAlt: "Tesla Model S 2012 launch event",
  },
  {
    year: "2016",
    title: "Autopilot and the Gigafactory",
    body: "Tesla opens Gigafactory Nevada, the world's largest building by footprint, to produce battery cells at scale. Autopilot hardware ships in every vehicle, laying the groundwork for full self-driving capability.",
    image: "https://cdn.motor1.com/images/mgl/9qzyy/s3/tesla-giga-new-york-tesla-gigafactory-2.jpg",
    imageAlt: "Tesla Gigafactory Nevada aerial view",
  },
  {
    year: "2020",
    title: "One Million Vehicles Delivered",
    body: "Tesla surpasses one million cumulative vehicle deliveries and joins the S&P 500, becoming the most valuable automaker in history. The Shanghai Gigafactory reaches full production capacity.",
    image: "https://m.tichetech.com/news/ea39d83b8c08cab1d4c7147f8e1769f15370dc48bf8099701da3c8a7eacb0096.webp/d?imageMogr2/thumbnail/900x/quality/80/format/webp/strip|imageSlim",
    imageAlt: "Tesla one million deliveries milestone",
  },
  {
    year: "2023",
    title: "Cybertruck Arrives",
    body: "After years of anticipation, Cybertruck enters production at Gigafactory Texas. Built with an exoskeleton of ultra-hard 30X cold-rolled stainless steel, it redefines what a truck can be.",
    image: "https://static01.nyt.com/images/2023/12/01/multimedia/30JPtesla-truck-print-mlwq/30tesla-truck-01-mlwq-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
    imageAlt: "Cybertruck production at Gigafactory Texas",
  },
];

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  duration: number;
}

const stats: Stat[] = [
  {
    icon: <Car className="w-6 h-6" />,
    value: 5000000,
    suffix: "+",
    label: "Vehicles Delivered",
    duration: 2200,
  },
  {
    icon: <Zap className="w-6 h-6" />,
    value: 50000,
    suffix: "+",
    label: "Superchargers Worldwide",
    duration: 1800,
  },
  {
    icon: <Activity className="w-6 h-6" />,
    value: 15,
    suffix: " GWh",
    label: "Energy Deployed",
    duration: 1600,
  },
];

// ─── Animated counter ────────────────────────────────────────────────────────

function AnimatedCounter({
  value,
  suffix,
  duration,
}: {
  value: number;
  suffix: string;
  duration: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  const formatted =
    value >= 1000000
      ? (count / 1000000).toFixed(1) + "M"
      : value >= 1000
      ? (count / 1000).toFixed(0) + "K"
      : count.toString();

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

// ─── Pull-quote card variant ─────────────────────────────────────────────────

const quoteReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const t = useTranslations();

  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://misc.pagesuite.com/3630c326-c935-42f5-b0da-daebc36b7646/images/IMG_LA-fi_tesla_fremont_2_1_1Q3JFSPL.jpg"
            alt={t("about.hero.imageAlt")}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--bg-primary)]" />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--brand-accent)]/10 blur-[120px]" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          variants={heroEntrance}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-accent)] mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t("about.hero.eyebrow")}
          </motion.p>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] text-balance mb-8">
            {t("about.hero.heading")}
          </h1>

          <motion.p
            className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            {t("about.hero.subheading")}
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <span className="text-xs text-white/40 uppercase tracking-widest">
            {t("about.hero.scrollLabel")}
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── Mission statement ── */}
      <Reveal>
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-4xl font-light leading-relaxed text-[var(--text-secondary)] text-pretty">
              {t("about.mission.statement")}
            </p>
          </div>
        </section>
      </Reveal>

      {/* ── Animated stats row ── */}
      <Reveal>
        <section className="py-16 border-y border-white/8 bg-[var(--bg-secondary)]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-white/10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="flex flex-col items-center text-center px-8 gap-3"
                >
                  <span className="text-[var(--brand-accent)]">{stat.icon}</span>
                  <span className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={stat.duration}
                    />
                  </span>
                  <span className="text-sm text-[var(--text-muted)] uppercase tracking-widest">
                    {t(`about.stat.${stat.label.toLowerCase().replace(/ /g, "_")}`)}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Timeline ── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-accent)] mb-4">
                {t("about.timeline.eyebrow")}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                {t("about.timeline.heading")}
              </h2>
            </div>
          </Reveal>

          <div className="space-y-28">
            {milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <Reveal key={milestone.year} delay={0.05}>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
                      isEven ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                      <img
                        src={milestone.image}
                        alt={milestone.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-5">
                      <span className="text-6xl md:text-7xl font-bold tracking-tight text-[var(--brand-accent)]/20 leading-none select-none">
                        {milestone.year}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight -mt-4">
                        {milestone.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
                        {milestone.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Leadership philosophy / pull-quote ── */}
      <Reveal>
        <section className="py-24 md:py-32 px-6 bg-[var(--bg-secondary)]">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Left: label + quote */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-accent)] mb-6">
                  {t("about.philosophy.eyebrow")}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-balance">
                  {t("about.philosophy.heading")}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
                  {t("about.philosophy.body")}
                </p>
              </div>

              {/* Right: pull-quote card */}
              <motion.blockquote
                variants={quoteReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 shadow-[0_4px_32px_rgba(0,0,0,0.3)]"
              >
                <span className="absolute -top-5 left-8 text-7xl text-[var(--brand-accent)]/30 font-serif leading-none select-none">
                  &ldquo;
                </span>
                <p className="text-xl md:text-2xl font-light leading-relaxed text-[var(--text-primary)] text-pretty mt-4">
                  {t("about.philosophy.quote")}
                </p>
                <footer className="mt-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                    <img
                      src="https://freight.cargo.site/t/original/i/6e90ef32471e05d8bfd029d6d5877119439b23c2989a55cf182b99c54303f4fa/MS_Musk_Elon_CloseUp.jpg"
                      alt={t("about.philosophy.quoteAuthorAlt")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {t("about.philosophy.quoteAuthor")}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {t("about.philosophy.quoteRole")}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Values grid ── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-accent)] mb-4">
                {t("about.values.eyebrow")}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                {t("about.values.heading")}
              </h2>
            </div>
          </Reveal>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              {
                titleKey: "about.values.innovation.title",
                bodyKey: "about.values.innovation.body",
                accent: true,
              },
              {
                titleKey: "about.values.safety.title",
                bodyKey: "about.values.safety.body",
                accent: false,
              },
              {
                titleKey: "about.values.sustainability.title",
                bodyKey: "about.values.sustainability.body",
                accent: false,
              },
              {
                titleKey: "about.values.performance.title",
                bodyKey: "about.values.performance.body",
                accent: false,
              },
              {
                titleKey: "about.values.transparency.title",
                bodyKey: "about.values.transparency.body",
                accent: false,
              },
              {
                titleKey: "about.values.impact.title",
                bodyKey: "about.values.impact.body",
                accent: true,
              },
            ].map((card) => (
              <motion.div
                key={card.titleKey}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`rounded-2xl p-8 border transition-all duration-300 ${
                  card.accent
                    ? "bg-[var(--brand-accent)]/8 border-[var(--brand-accent)]/20"
                    : "bg-white/4 border-white/8 hover:bg-white/6 hover:border-white/14"
                } shadow-[0_2px_16px_rgba(0,0,0,0.2)]`}
              >
                <h3 className="text-lg font-bold mb-3 tracking-tight">
                  {t(card.titleKey)}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                  {t(card.bodyKey)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Careers CTA banner ── */}
      <Reveal>
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://nathanpetersen.com/2022/11/29/tesla-internship-experience-phd-student-edition-summer-2022/images/img-07.jpg"
                  alt={t("about.careers.imageAlt")}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
              </div>

              {/* Glow */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--brand-accent)]/15 blur-[80px] rounded-full pointer-events-none z-0" />

              <div className="relative z-10 px-10 md:px-16 py-16 md:py-20 max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-accent)] mb-4">
                  {t("about.careers.eyebrow")}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white text-balance mb-5">
                  {t("about.careers.heading")}
                </h2>
                <p className="text-white/70 leading-relaxed mb-8 text-pretty">
                  {t("about.careers.body")}
                </p>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--brand-accent)] text-white font-semibold text-sm hover:bg-[var(--brand-accent-hover)] transition-all duration-200 shadow-[0_0_24px_rgba(227,25,55,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
                  >
                    {t("about.careers.cta")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}