"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag, Search, ExternalLink } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = "All" | "Press Release" | "Blog" | "Product Update" | "Company News";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: Exclude<Category, "All">;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  author: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const articles: Article[] = [
  {
    id: "1",
    title: "Tesla Delivers Record 1.8 Million Vehicles in 2023",
    excerpt:
      "Tesla achieved record deliveries of 1.8 million vehicles in 2023, representing a 38% year-over-year increase. The milestone underscores Tesla's continued dominance in the global electric vehicle market and its ability to scale production across multiple Gigafactories worldwide.",
    category: "Press Release",
    date: "January 2, 2024",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=80",
    featured: true,
    author: "Tesla Communications",
  },
  {
    id: "2",
    title: "Cybertruck Production Ramps at Gigafactory Texas",
    excerpt:
      "Gigafactory Texas is scaling Cybertruck production rapidly, with thousands of units rolling off the line each week. The stainless-steel exoskeleton and revolutionary manufacturing process set a new benchmark for automotive production.",
    category: "Product Update",
    date: "December 15, 2023",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    featured: false,
    author: "Tesla Engineering",
  },
  {
    id: "3",
    title: "Tesla Energy Reaches 10 GWh Deployed Worldwide",
    excerpt:
      "Tesla Energy has surpassed 10 gigawatt-hours of energy storage deployed globally, powering homes, businesses, and utilities with clean, reliable energy through Powerwall and Megapack installations.",
    category: "Company News",
    date: "December 10, 2023",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    featured: false,
    author: "Tesla Energy Team",
  },
  {
    id: "4",
    title: "Full Self-Driving V12 Now Available to All Customers",
    excerpt:
      "Tesla's Full Self-Driving V12, powered by an end-to-end neural network, is now rolling out to all FSD subscribers. The latest version demonstrates a significant leap in autonomous driving capability across diverse road conditions.",
    category: "Product Update",
    date: "December 5, 2023",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
    featured: false,
    author: "Tesla Autopilot Team",
  },
  {
    id: "5",
    title: "Tesla Opens 50,000th Supercharger Globally",
    excerpt:
      "Tesla's Supercharger network has reached a historic milestone of 50,000 connectors worldwide, cementing its position as the world's largest and most reliable fast-charging network for electric vehicles.",
    category: "Press Release",
    date: "November 28, 2023",
    readTime: "2 min read",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    featured: false,
    author: "Tesla Communications",
  },
  {
    id: "6",
    title: "Model 3 Highland Wins European Car of the Year",
    excerpt:
      "The refreshed Model 3 Highland has been awarded European Car of the Year, praised by judges for its exceptional range, refined interior, and advanced technology suite that sets a new standard for electric sedans.",
    category: "Company News",
    date: "November 20, 2023",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    featured: false,
    author: "Tesla Communications",
  },
  {
    id: "7",
    title: "Tesla AI Day 2024: Optimus Robot Update",
    excerpt:
      "At Tesla AI Day 2024, the company unveiled the latest iteration of the Optimus humanoid robot, now capable of performing complex assembly tasks autonomously. Elon Musk outlined a path to commercial deployment within two years.",
    category: "Blog",
    date: "November 10, 2023",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    featured: false,
    author: "Tesla AI Research",
  },
  {
    id: "8",
    title: "Q4 2023 Earnings: Record Revenue and Profitability",
    excerpt:
      "Tesla reported record Q4 2023 revenue of $25.2 billion and GAAP net income of $7.9 billion, driven by strong vehicle deliveries, energy storage deployments, and continued improvements in manufacturing efficiency.",
    category: "Press Release",
    date: "January 24, 2024",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    featured: false,
    author: "Tesla Investor Relations",
  },
  {
    id: "9",
    title: "Tesla Gigafactory Mexico Breaks Ground",
    excerpt:
      "Tesla has officially broken ground on its newest Gigafactory in Monterrey, Mexico. The facility is expected to produce next-generation vehicles and will be Tesla's largest factory by production capacity when fully operational.",
    category: "Company News",
    date: "October 30, 2023",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    featured: false,
    author: "Tesla Communications",
  },
  {
    id: "10",
    title: "New Tesla App Features: Energy Monitoring 2.0",
    excerpt:
      "The latest Tesla app update introduces Energy Monitoring 2.0, giving homeowners unprecedented insight into their solar generation, Powerwall storage, and home energy consumption with real-time charts and AI-powered recommendations.",
    category: "Blog",
    date: "October 15, 2023",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    featured: false,
    author: "Tesla Software Team",
  },
  {
    id: "11",
    title: "Tesla Wins NHTSA 5-Star Safety Rating Across All Models",
    excerpt:
      "Every Tesla vehicle in the current lineup has received a 5-star safety rating from the National Highway Traffic Safety Administration, reinforcing Tesla's commitment to building the safest cars on the road.",
    category: "Press Release",
    date: "October 5, 2023",
    readTime: "2 min read",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    featured: false,
    author: "Tesla Safety Team",
  },
  {
    id: "12",
    title: "The Road to Sustainable Energy: 2024 Impact Report",
    excerpt:
      "Tesla's 2024 Impact Report details the company's progress toward its mission of accelerating the world's transition to sustainable energy, including CO₂ savings, energy deployed, and the path to a fully renewable future.",
    category: "Blog",
    date: "September 20, 2023",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    featured: false,
    author: "Tesla Sustainability",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Press Release",
  "Blog",
  "Product Update",
  "Company News",
];

const CATEGORY_COLORS: Record<Exclude<Category, "All">, string> = {
  "Press Release": "bg-[var(--brand-accent)]/15 text-[var(--brand-accent)] border-[var(--brand-accent)]/30",
  Blog: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Product Update": "bg-green-500/15 text-green-400 border-green-500/30",
  "Company News": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
};

const brandAssets = [
  { label: "Logo Files", description: "SVG, PNG, EPS formats" },
  { label: "Brand Guidelines", description: "Colors, typography, usage" },
  { label: "Executive Photos", description: "High-resolution portraits" },
  { label: "Vehicle Images", description: "Studio & lifestyle photography" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: Exclude<Category, "All"> }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
        CATEGORY_COLORS[category]
      }`}
    >
      <Tag className="w-3 h-3" />
      {category}
    </span>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="card-base overflow-hidden flex flex-col group cursor-pointer">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />
      </div>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <CategoryBadge category={article.category} />
        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
        </div>
        <h3 className="text-[var(--text-primary)] font-bold text-base leading-snug line-clamp-2 group-hover:text-[var(--brand-accent)] transition-colors duration-200">
          {article.title}
        </h3>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-1 text-[var(--brand-accent)] text-sm font-semibold mt-auto pt-1">
          Read More
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function NewsroomPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const featuredArticle = articles.find((a) => a.featured)!;
  const remainingArticles = articles.filter((a) => !a.featured);

  const filteredArticles =
    activeCategory === "All"
      ? remainingArticles
      : remainingArticles.filter((a) => a.category === activeCategory);

  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[var(--brand-accent)]/6 blur-[100px]" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl mx-auto w-full"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-accent)] mb-4"
          >
            Tesla Newsroom
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none"
          >
            Tesla Newsroom
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-xl mx-auto"
          >
            The latest news, press releases, and stories from Tesla.
          </motion.p>

          {/* Search bar */}
          <motion.div variants={fadeInUp} className="relative max-w-lg mx-auto mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-5 py-3.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-medium)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-accent)] transition-colors duration-200 text-sm"
            />
          </motion.div>

          {/* Category filter tabs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[var(--brand-accent)] text-white border-[var(--brand-accent)] shadow-[0_0_20px_var(--brand-accent-glow)]"
                    : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-medium)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── FEATURED ARTICLE ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <Reveal>
          <div className="card-base overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="relative lg:w-[60%] overflow-hidden">
                <div className="aspect-video lg:aspect-auto lg:h-full min-h-[280px]">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg-card)]/60 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent lg:hidden" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-[40%] p-8 lg:p-10 flex flex-col justify-center gap-5">
                <div className="flex items-center gap-3">
                  <CategoryBadge category={featuredArticle.category} />
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-accent)] bg-[var(--brand-accent)]/10 px-2.5 py-1 rounded-full border border-[var(--brand-accent)]/20">
                    Featured
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredArticle.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black leading-tight text-[var(--text-primary)]">
                  {featuredArticle.title}
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base line-clamp-4">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <div className="w-6 h-6 rounded-full bg-[var(--brand-accent)]/20 flex items-center justify-center">
                    <span className="text-[var(--brand-accent)] font-bold text-xs">
                      {featuredArticle.author.charAt(0)}
                    </span>
                  </div>
                  <span>{featuredArticle.author}</span>
                </div>

                <div className="pt-2">
                  <Link
                    href="/newsroom"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── ARTICLES GRID ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <Reveal>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              {activeCategory === "All" ? "Latest Stories" : activeCategory}
            </h2>
            <span className="text-sm text-[var(--text-muted)]">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
            </span>
          </div>
        </Reveal>

        {filteredArticles.length === 0 ? (
          <Reveal>
            <div className="text-center py-20">
              <p className="text-[var(--text-muted)] text-lg">
                No articles found in this category.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-4 btn-secondary"
              >
                View All Articles
              </button>
            </div>
          </Reveal>
        ) : (
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredArticles.map((article) => (
              <motion.div key={article.id} variants={fadeInUp}>
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ── PRESS RESOURCES ──────────────────────────────────────────────── */}
      <section className="bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-black text-center mb-16">
              Press Resources
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Media Contact */}
            <Reveal delay={0}>
              <div className="card-base p-8 h-full">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                  Media Contact
                </h3>
                <p className="text-[var(--text-muted)] text-sm mb-6">
                  For press inquiries, interview requests, and media assets, reach out to our communications team.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--brand-accent)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[var(--brand-accent)] text-xs font-bold">@</span>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Email</p>
                      <a
                        href="mailto:press@tesla.com"
                        className="text-[var(--text-primary)] text-sm font-medium hover:text-[var(--brand-accent)] transition-colors duration-200"
                      >
                        press@tesla.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--brand-accent)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[var(--brand-accent)] text-xs font-bold">#</span>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-0.5">Phone</p>
                      <a
                        href="tel:+16502272000"
                        className="text-[var(--text-primary)] text-sm font-medium hover:text-[var(--brand-accent)] transition-colors duration-200"
                      >
                        +1 (650) 227-2000
                      </a>
                    </div>
                  </div>
                </div>

                <button className="btn-primary w-full justify-center">
                  Download Press Kit
                </button>
              </div>
            </Reveal>

            {/* Brand Assets */}
            <Reveal delay={0.1}>
              <div className="card-base p-8 h-full">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                  Brand Assets
                </h3>
                <p className="text-[var(--text-muted)] text-sm mb-6">
                  Official Tesla brand assets for media use. Please review our brand guidelines before use.
                </p>

                <div className="space-y-3">
                  {brandAssets.map((asset) => (
                    <div
                      key={asset.label}
                      className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-all duration-200 group cursor-pointer"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--brand-accent)] transition-colors duration-200">
                          {asset.label}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          {asset.description}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--brand-accent)] transition-colors duration-200 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[var(--brand-accent)]/6 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-accent)] mb-4">
              Newsletter
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Stay Informed
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-10">
              Get the latest Tesla news delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-medium)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-accent)] transition-colors duration-200 text-sm"
              />
              <button className="btn-primary whitespace-nowrap px-6">
                Subscribe
              </button>
            </div>

            <p className="text-xs text-[var(--text-muted)]">
              By subscribing, you agree to Tesla&apos;s{" "}
              <Link
                href="/"
                className="underline hover:text-[var(--text-secondary)] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              . Unsubscribe at any time.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
