"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Shield, Eye, Cpu, Navigation, ChevronRight, Play, AlertTriangle, TrendingUp, Zap, Camera, Check, Wifi } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer, heroEntrance, scaleIn } from "@/lib/motion";

// ─── Types ──────────────────────────────────────────────────────────────────

interface StatItem {
  value: string;
  numericValue: number;
  suffix: string;
  prefix: string;
  label: string;
}

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ComparisonMetric {
  label: string;
  tesla: number;
  human: number;
  industry: number;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const safetyStats: StatItem[] = [
  { value: "10x", numericValue: 10, suffix: "x", prefix: "", label: "Safer than average driver" },
  { value: "487M+", numericValue: 487, suffix: "M+", prefix: "", label: "Autopilot miles driven" },
  { value: "99.9%", numericValue: 99.9, suffix: "%", prefix: "", label: "Intervention-free trips" },
  { value: "40%", numericValue: 40, suffix: "%", prefix: "", label: "Reduction in accidents" },
];

const featureCards: FeatureCard[] = [
  {
    icon: <Camera className="w-6 h-6" />,
    title: "8 Cameras",
    description: "360° visibility up to 250 meters, providing a complete picture of the surrounding environment.",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Neural Network",
    description: "Custom AI chip delivering 144 TOPS of processing power for real-time scene understanding.",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Radar Sensing",
    description: "All-weather detection capability that sees through rain, fog, dust, and even the car ahead.",
  },
  {
    icon: <Navigation className="w-6 h-6" />,
    title: "Ultrasonic Sensors",
    description: "Close-range detection for parking, low-speed maneuvering, and obstacle identification.",
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    title: "Over-the-Air Updates",
    description: "Continuous improvement delivered wirelessly — your car gets smarter every day.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Redundant Systems",
    description: "Fail-safe architecture with multiple independent systems ensuring maximum reliability.",
  },
];

const fsdFeatures: string[] = [
  "Auto Lane Change",
  "Autopark",
  "Summon",
  "Traffic Light & Stop Sign Control",
  "Autosteer on City Streets",
  "Navigate on Autopilot",
  "Auto Lane Change on Highway",
  "Smart Summon",
];

const comparisonMetrics: ComparisonMetric[] = [
  { label: "Accidents per Mile", tesla: 15, human: 100, industry: 78 },
  { label: "Reaction Time", tesla: 8, human: 100, industry: 65 },
  { label: "Attention Span", tesla: 95, human: 40, industry: 55 },
];

const videoHighlights = [
  {
    icon: <Navigation className="w-5 h-5" />,
    title: "Navigate on Autopilot",
    description: "Automatically change lanes, take exits, and navigate complex interchanges.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Collision Avoidance",
    description: "Active safety features that detect and respond to potential hazards faster than any human.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Continuous Learning",
    description: "Every mile driven contributes to a global neural network that improves for all Tesla owners.",
  },
];

// ─── Animated Counter ────────────────────────────────────────────────────────

interface AnimatedCounterProps {
  target: number;
  suffix: string;
  prefix: string;
  duration?: number;
  isDecimal?: boolean;
}

function AnimatedCounter({ target, suffix, prefix, duration = 2000, isDecimal = false }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  const display = isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString("en-US");

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AutopilotPage() {
  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">

      {/* ── 1. CINEMATIC HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1920&q=80"
            alt="Tesla on a highway at night"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[var(--bg-primary)]" />
        </div>

        {/* Hero content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto"
        >
          {/* Pill label */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--brand-accent)]/20 border border-[var(--brand-accent)]/40 text-[var(--brand-accent)] text-xs font-semibold uppercase tracking-widest">
              <Zap className="w-3 h-3" />
              Full Self-Driving
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={heroEntrance}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-none"
          >
            The Future of
            <br />
            <span className="text-[var(--brand-accent)]">Driving</span> Is Here
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Tesla Autopilot and Full Self-Driving capability use a suite of cameras,
            ultrasonic sensors, and AI to navigate the world.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vehicles"
              className="btn-primary px-8 py-3 text-base"
            >
              Order FSD
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <button
              className="btn-secondary px-8 py-3 text-base flex items-center gap-2"
              onClick={() => {
                const el = document.getElementById("video-showcase");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Play className="w-4 h-4" />
              Watch Demo
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── 2. SAFETY STATS BAR ───────────────────────────────────────────── */}
      <section className="bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {safetyStats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-[var(--brand-accent)] mb-2">
                  <AnimatedCounter
                    target={stat.numericValue}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    duration={1800 + i * 200}
                    isDecimal={stat.numericValue === 99.9}
                  />
                </div>
                <p className="text-sm text-[var(--text-secondary)] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. TECHNOLOGY FEATURES ────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)] mb-3">
              Sensor Suite
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-4">
              How Autopilot Sees the World
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              A comprehensive array of sensors and AI processing gives Tesla vehicles
              superhuman perception of their surroundings.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <div className="card-base p-6 group hover:border-[var(--brand-accent)]/40 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20 flex items-center justify-center text-[var(--brand-accent)] mb-4 group-hover:bg-[var(--brand-accent)]/20 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{card.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{card.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FSD CAPABILITIES ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Feature list */}
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)] mb-3">
                Full Self-Driving
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-6">
                Full Self-Driving
                <br />
                <span className="text-[var(--brand-accent)]">Capability</span>
              </h2>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                FSD Capability is the most advanced driver assistance system available.
                It handles the complexities of modern driving so you can focus on what matters.
              </p>
              <ul className="space-y-3">
                {fsdFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[var(--brand-accent)]/15 border border-[var(--brand-accent)]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[var(--brand-accent)]" />
                    </div>
                    <span className="text-[var(--text-secondary)] text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/vehicles" className="btn-primary inline-flex items-center gap-2">
                  Configure Your Tesla
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            {/* Right: FSD visualization */}
            <Reveal delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="FSD visualization"
                  className="w-full h-[480px] object-cover"
                />
                {/* Overlay graphics */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* HUD elements */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="px-3 py-1.5 rounded-full bg-[var(--brand-accent)]/20 border border-[var(--brand-accent)]/40 text-[var(--brand-accent)] text-xs font-bold uppercase tracking-wider">
                      FSD Active
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-black/50 border border-white/10 text-white/70 text-xs font-medium">
                      v12.3.4
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Speed", value: "65 mph" },
                      { label: "Following", value: "2.1s" },
                      { label: "Lane", value: "Center" },
                    ].map((item) => (
                      <div key={item.label} className="bg-black/60 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center">
                        <div className="text-white font-bold text-sm">{item.value}</div>
                        <div className="text-white/50 text-xs mt-0.5">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. SAFETY COMPARISON ──────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)] mb-3">
              Safety Data
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-4">
              Safety By the Numbers
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Independent data consistently shows Tesla Autopilot outperforms human drivers
              across every key safety metric.
            </p>
          </Reveal>

          <div className="space-y-10">
            {comparisonMetrics.map((metric, i) => (
              <Reveal key={metric.label} delay={i * 0.1}>
                <div className="card-base p-6">
                  <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-5">
                    {metric.label}
                  </h3>
                  <div className="space-y-4">
                    {/* Tesla */}
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-[var(--text-muted)] w-28 flex-shrink-0">Tesla Autopilot</span>
                      <div className="flex-1 h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[var(--brand-accent)] rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${metric.tesla}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 + i * 0.1 }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[var(--brand-accent)] w-10 text-right">{metric.tesla}%</span>
                    </div>
                    {/* Human */}
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-[var(--text-muted)] w-28 flex-shrink-0">Human Driver</span>
                      <div className="flex-1 h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-white/30 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${metric.human}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.35 + i * 0.1 }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[var(--text-secondary)] w-10 text-right">{metric.human}%</span>
                    </div>
                    {/* Industry */}
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-[var(--text-muted)] w-28 flex-shrink-0">Industry Avg</span>
                      <div className="flex-1 h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-white/15 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${metric.industry}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 + i * 0.1 }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[var(--text-muted)] w-10 text-right">{metric.industry}%</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Disclaimer */}
          <Reveal delay={0.3}>
            <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
              <AlertTriangle className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Data based on Tesla Safety Report Q4 2023. Lower accident rate is better;
                higher attention and reaction scores are better. Autopilot requires active driver supervision.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. VIDEO SHOWCASE ─────────────────────────────────────────────── */}
      <section id="video-showcase" className="py-24 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)] mb-3">
              In Action
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-4">
              See Autopilot in Action
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Watch how Tesla&apos;s AI navigates complex real-world scenarios with precision and confidence.
            </p>
          </Reveal>

          {/* Video player */}
          <Reveal>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-[var(--shadow-card)] mb-10 group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1280&q=80"
                alt="Autopilot demo video thumbnail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-[var(--brand-accent)] flex items-center justify-center shadow-[0_0_40px_rgba(227,25,55,0.5)]"
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </motion.div>
              </div>
              {/* Duration badge */}
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-medium">
                4:32
              </div>
            </div>
          </Reveal>

          {/* Feature highlight cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoHighlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="card-base p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20 flex items-center justify-center text-[var(--brand-accent)] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{item.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. ORDERING CTA ───────────────────────────────────────────────── */}
      <section className="relative py-28 px-6 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-accent)] via-[#b01229] to-[var(--bg-primary)]" />
        <div className="absolute inset-0 bg-[var(--bg-primary)]/40" />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--brand-accent)]/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">
              Upgrade Today
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
              Add Full Self-Driving
              <br />
              to Your Tesla
            </h2>
            <p className="text-white/70 text-lg mb-3">
              The most advanced driver assistance system available.
            </p>
            <div className="inline-flex items-center gap-2 mb-10">
              <span className="text-3xl font-black text-white">$8,000</span>
              <span className="text-white/60 text-sm">one-time purchase</span>
              <span className="text-white/40 mx-2">or</span>
              <span className="text-2xl font-bold text-white">$99</span>
              <span className="text-white/60 text-sm">/month</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vehicles"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-[var(--brand-accent)] font-bold text-sm hover:bg-white/90 transition-all duration-200 shadow-lg"
              >
                Order Now
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/vehicles"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 text-white font-semibold text-sm border border-white/20 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
