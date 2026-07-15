"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { TrendingUp, DollarSign, BarChart2, FileText, Download, ExternalLink, Calendar, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer, heroEntrance } from "@/lib/motion";

// ─── Types ──────────────────────────────────────────────────────────────────

interface FinancialStat {
  id: string;
  icon: React.ReactNode;
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  year: string;
  trend: "up" | "down";
  trendValue: string;
}

interface EarningsRow {
  quarter: string;
  revenue: string;
  eps: string;
}

interface FilingRow {
  id: string;
  type: "10-K" | "10-Q" | "8-K" | "Proxy";
  title: string;
  date: string;
}

interface BoardMember {
  name: string;
  title: string;
}

interface GovernanceLink {
  label: string;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const financialStats: FinancialStat[] = [
  {
    id: "revenue",
    icon: <DollarSign className="w-6 h-6" />,
    prefix: "$",
    value: 96.8,
    suffix: "B",
    decimals: 1,
    label: "Total Revenue",
    year: "FY2023",
    trend: "up",
    trendValue: "+19% YoY",
  },
  {
    id: "deliveries",
    icon: <TrendingUp className="w-6 h-6" />,
    prefix: "",
    value: 1.81,
    suffix: "M",
    decimals: 2,
    label: "Vehicles Delivered",
    year: "FY2023",
    trend: "up",
    trendValue: "+38% YoY",
  },
  {
    id: "fcf",
    icon: <BarChart2 className="w-6 h-6" />,
    prefix: "$",
    value: 4.4,
    suffix: "B",
    decimals: 1,
    label: "Free Cash Flow",
    year: "FY2023",
    trend: "down",
    trendValue: "-27% YoY",
  },
  {
    id: "margin",
    icon: <FileText className="w-6 h-6" />,
    prefix: "",
    value: 18.2,
    suffix: "%",
    decimals: 1,
    label: "Gross Margin",
    year: "FY2023",
    trend: "down",
    trendValue: "-7.3pp YoY",
  },
];

const earningsRows: EarningsRow[] = [
  { quarter: "Q4 2023", revenue: "$25.17B", eps: "$0.71" },
  { quarter: "Q3 2023", revenue: "$23.35B", eps: "$0.66" },
  { quarter: "Q2 2023", revenue: "$24.93B", eps: "$0.78" },
  { quarter: "Q1 2023", revenue: "$23.33B", eps: "$0.73" },
  { quarter: "Q4 2022", revenue: "$24.32B", eps: "$1.07" },
  { quarter: "Q3 2022", revenue: "$21.45B", eps: "$1.05" },
];

const filings: FilingRow[] = [
  { id: "f1", type: "10-K", title: "Annual Report — Fiscal Year 2023", date: "Feb 26, 2024" },
  { id: "f2", type: "10-Q", title: "Quarterly Report — Q3 2023", date: "Oct 23, 2023" },
  { id: "f3", type: "8-K", title: "Earnings Release — Q4 2023", date: "Jan 24, 2024" },
  { id: "f4", type: "Proxy", title: "Proxy Statement — Annual Meeting 2023", date: "May 15, 2023" },
  { id: "f5", type: "10-Q", title: "Quarterly Report — Q2 2023", date: "Jul 24, 2023" },
  { id: "f6", type: "8-K", title: "Earnings Release — Q3 2023", date: "Oct 18, 2023" },
  { id: "f7", type: "10-K", title: "Annual Report — Fiscal Year 2022", date: "Feb 27, 2023" },
  { id: "f8", type: "10-Q", title: "Quarterly Report — Q1 2023", date: "Apr 24, 2023" },
];

const boardMembers: BoardMember[] = [
  { name: "Elon Musk", title: "CEO & Technoking" },
  { name: "Robyn Denholm", title: "Chair of the Board" },
  { name: "Ira Ehrenpreis", title: "Independent Director" },
  { name: "James Murdoch", title: "Independent Director" },
  { name: "JB Straubel", title: "Independent Director" },
];

const governanceLinks: GovernanceLink[] = [
  { label: "Code of Business Ethics" },
  { label: "Corporate Governance Guidelines" },
  { label: "Audit Committee Charter" },
  { label: "Compensation Committee Charter" },
];

const ALL_FILING_TYPES = ["All", "10-K", "10-Q", "8-K", "Proxy"] as const;
type FilingFilter = (typeof ALL_FILING_TYPES)[number];

// ─── Animated Counter Hook ───────────────────────────────────────────────────

function useCountUp(
  target: number,
  decimals: number,
  duration: number,
  triggered: boolean
): string {
  const [display, setDisplay] = useState("0");
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [triggered, target, decimals, duration]);

  return display;
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({ stat }: { stat: FinancialStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCountUp(stat.value, stat.decimals, 1500, inView);

  return (
    <div
      ref={ref}
      className="card-base p-8 flex flex-col gap-4 group hover:border-[var(--brand-accent)]/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-xl bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20 flex items-center justify-center text-[var(--brand-accent)]">
          {stat.icon}
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
            stat.trend === "up"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {stat.trend === "up" ? (
            <ArrowUp className="w-3 h-3" />
          ) : (
            <ArrowDown className="w-3 h-3" />
          )}
          {stat.trendValue}
        </span>
      </div>

      <div>
        <div className="text-4xl font-black tracking-tight text-[var(--text-primary)]">
          <span className="text-[var(--brand-accent)]">{stat.prefix}</span>
          {count}
          <span className="text-[var(--brand-accent)]">{stat.suffix}</span>
        </div>
        <p className="text-[var(--text-secondary)] text-sm mt-1">{stat.label}</p>
      </div>

      <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest">
        {stat.year}
      </span>
    </div>
  );
}

// ─── Sparkline SVG ───────────────────────────────────────────────────────────

function Sparkline() {
  const points =
    "0,60 15,52 30,55 45,40 60,42 75,30 90,28 105,20 120,22 135,12 150,8";
  return (
    <svg
      viewBox="0 0 150 70"
      className="w-full h-16"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polygon
        points={`0,60 ${points} 150,70 0,70`}
        fill="url(#sparkGrad)"
      />
    </svg>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function InvestorsPage() {
  const [activeFilter, setActiveFilter] = useState<FilingFilter>("All");

  const filteredFilings =
    activeFilter === "All"
      ? filings
      : filings.filter((f) => f.type === activeFilter);

  const typeBadgeColor: Record<string, string> = {
    "10-K": "bg-blue-500/15 text-blue-400 border-blue-500/25",
    "10-Q": "bg-purple-500/15 text-purple-400 border-purple-500/25",
    "8-K": "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
    Proxy: "bg-green-500/15 text-green-400 border-green-500/25",
  };

  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[var(--brand-accent)]/6 blur-[120px] pointer-events-none" />

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
            TSLA · NASDAQ
          </motion.p>
          <motion.h1
            variants={heroEntrance}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none"
          >
            Investor
            <br />
            <span className="gradient-text-accent">Relations</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Tesla is committed to transparency and delivering long-term value
            for our shareholders.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="#sec-filings"
              className="btn-primary px-8 py-3 text-base"
            >
              View SEC Filings
            </Link>
            <Link
              href="#earnings"
              className="btn-secondary px-8 py-3 text-base"
            >
              Q4 2023 Earnings
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STOCK TICKER ─────────────────────────────────────────────────── */}
      <Reveal>
        <section className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="card-base p-8 border-[var(--border-medium)]">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                {/* Left: ticker */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-4 flex-wrap">
                    <span className="text-5xl font-black tracking-tight text-[var(--text-primary)]">
                      TSLA
                    </span>
                    <span className="text-3xl font-bold text-[var(--text-primary)]">
                      $248.42
                    </span>
                    <span className="flex items-center gap-1 text-green-400 font-semibold text-lg">
                      <ArrowUp className="w-5 h-5" />
                      +$12.34 (+5.23%)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                      NASDAQ
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      As of market close
                    </span>
                  </div>
                  {/* Sparkline */}
                  <div className="mt-4 w-full max-w-xs">
                    <Sparkline />
                  </div>
                </div>

                {/* Right: mini stats */}
                <div className="grid grid-cols-2 gap-4 lg:gap-6 shrink-0">
                  {[
                    { label: "Market Cap", value: "$789B" },
                    { label: "P/E Ratio", value: "72.4x" },
                    { label: "52W High", value: "$299.29" },
                    { label: "52W Low", value: "$138.80" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col gap-1 px-5 py-4 rounded-xl bg-white/4 border border-white/8"
                    >
                      <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-xl font-bold text-[var(--text-primary)]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── FINANCIAL HIGHLIGHTS ─────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-accent)] mb-3">
                Performance
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Financial Highlights
              </h2>
              <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
                Key metrics demonstrating Tesla&apos;s continued growth and
                operational excellence.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialStats.map((stat, i) => (
              <Reveal key={stat.id} delay={i * 0.1}>
                <StatCard stat={stat} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUARTERLY EARNINGS ───────────────────────────────────────────── */}
      <section id="earnings" className="px-6 py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-accent)] mb-3">
                Results
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Quarterly Earnings
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="card-base overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 px-6 py-4 border-b border-[var(--border-subtle)] bg-white/3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Quarter
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Revenue
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  EPS
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                  Downloads
                </span>
              </div>

              {earningsRows.map((row, i) => (
                <div
                  key={row.quarter}
                  className={`grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center px-6 py-5 border-b border-[var(--border-subtle)] last:border-0 transition-colors duration-200 hover:bg-white/3 ${
                    i % 2 === 0 ? "bg-transparent" : "bg-white/2"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[var(--brand-accent)] shrink-0" />
                    <span className="font-semibold text-[var(--text-primary)]">
                      {row.quarter}
                    </span>
                  </div>
                  <span className="text-[var(--text-secondary)] font-medium">
                    {row.revenue}
                  </span>
                  <span className="text-[var(--text-secondary)] font-medium">
                    {row.eps}
                  </span>
                  <div className="flex items-center gap-2">
                    {["Release", "Webcast", "Slides"].map((doc) => (
                      <button
                        key={doc}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/6 border border-white/10 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-all duration-200"
                        aria-label={`Download ${doc} for ${row.quarter}`}
                      >
                        <Download className="w-3 h-3" />
                        <span className="hidden sm:inline">{doc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SEC FILINGS ──────────────────────────────────────────────────── */}
      <section id="sec-filings" className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-accent)] mb-3">
                Regulatory
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                SEC Filings
              </h2>
            </div>
          </Reveal>

          {/* Filter tabs */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-8">
              {ALL_FILING_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeFilter === type
                      ? "bg-[var(--brand-accent)] text-white shadow-[0_0_20px_var(--brand-accent-glow)]"
                      : "bg-white/6 text-[var(--text-secondary)] border border-white/10 hover:bg-white/10 hover:text-[var(--text-primary)]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="card-base overflow-hidden">
              {filteredFilings.length === 0 ? (
                <div className="px-6 py-12 text-center text-[var(--text-muted)]">
                  No filings found for this category.
                </div>
              ) : (
                filteredFilings.map((filing, i) => (
                  <div
                    key={filing.id}
                    className={`flex items-center justify-between gap-4 px-6 py-5 border-b border-[var(--border-subtle)] last:border-0 transition-colors duration-200 hover:bg-white/3 ${
                      i % 2 === 0 ? "bg-transparent" : "bg-white/2"
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-bold border ${
                          typeBadgeColor[filing.type] ??
                          "bg-white/10 text-white border-white/20"
                        }`}
                      >
                        {filing.type}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-[var(--text-primary)] truncate">
                          {filing.title}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          {filing.date}
                        </p>
                      </div>
                    </div>
                    <button className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 border border-white/10 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-all duration-200">
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">View Filing</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GOVERNANCE ───────────────────────────────────────────────────── */}
      <section className="px-6 py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-accent)] mb-3">
                Leadership
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Corporate Governance
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Board of Directors */}
            <Reveal>
              <div className="card-base p-8 h-full">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[var(--brand-accent)]" />
                  </span>
                  Board of Directors
                </h3>
                <ul className="space-y-3">
                  {boardMembers.map((member) => (
                    <li
                      key={member.name}
                      className="flex items-center justify-between py-3 border-b border-[var(--border-subtle)] last:border-0"
                    >
                      <span className="font-semibold text-[var(--text-primary)]">
                        {member.name}
                      </span>
                      <span className="text-sm text-[var(--text-muted)]">
                        {member.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Corporate Governance Links */}
            <Reveal delay={0.1}>
              <div className="card-base p-8 h-full">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[var(--brand-accent)]" />
                  </span>
                  Governance Documents
                </h3>
                <ul className="space-y-2">
                  {governanceLinks.map((link) => (
                    <li key={link.label}>
                      <button className="w-full flex items-center justify-between py-3.5 px-4 rounded-xl bg-white/4 border border-white/8 hover:bg-white/8 hover:border-white/14 transition-all duration-200 group">
                        <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                          {link.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--brand-accent)] transition-colors" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── IR CONTACT ───────────────────────────────────────────────────── */}
      <section className="px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="card-base p-12">
              <div className="w-16 h-16 rounded-2xl bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20 flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-[var(--brand-accent)]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Contact Investor Relations
              </h2>
              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                For investor inquiries, financial data requests, or shareholder
                services, our IR team is here to help.
              </p>

              <div className="space-y-4 mb-10 text-left">
                {[
                  { label: "Email", value: "ir@tesla.com" },
                  { label: "Phone", value: "+1 (650) 681-5000" },
                  { label: "Address", value: "1 Tesla Road, Austin, TX 78725" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 px-5 py-4 rounded-xl bg-white/4 border border-white/8"
                  >
                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] w-16 shrink-0 pt-0.5">
                      {item.label}
                    </span>
                    <span className="text-[var(--text-secondary)] font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <button className="btn-primary px-10 py-3 text-base w-full sm:w-auto">
                Send Inquiry
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
