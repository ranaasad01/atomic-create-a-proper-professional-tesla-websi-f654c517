"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Tag, Star, Filter, ChevronRight, Package, Truck, RotateCcw, BadgeCheck } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer, heroEntrance } from "@/lib/motion";

// ─── Types ──────────────────────────────────────────────────────────────────

type Category = "All" | "Apparel" | "Accessories" | "Lifestyle" | "Charging" | "Scale Models";

interface Product {
  id: string;
  name: string;
  category: Exclude<Category, "All">;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: "New" | "Best Seller" | "Sale";
}

// ─── Data ───────────────────────────────────────────────────────────────────

const FILTER_TABS: Category[] = ["All", "Apparel", "Accessories", "Lifestyle", "Charging", "Scale Models"];

const products: Product[] = [
  {
    id: "p1",
    name: "Tesla Logo Tee",
    category: "Apparel",
    price: 35,
    rating: 4.8,
    reviewCount: 1240,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    badge: "Best Seller",
  },
  {
    id: "p2",
    name: "Cybertruck Cap",
    category: "Apparel",
    price: 40,
    rating: 4.7,
    reviewCount: 832,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    badge: "New",
  },
  {
    id: "p3",
    name: "Tesla Wireless Charger",
    category: "Accessories",
    price: 79,
    rating: 4.6,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
  },
  {
    id: "p4",
    name: "Model S Die-Cast",
    category: "Scale Models",
    price: 149,
    rating: 4.9,
    reviewCount: 423,
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&q=80",
    badge: "Best Seller",
  },
  {
    id: "p5",
    name: "Tesla Tumbler",
    category: "Lifestyle",
    price: 45,
    rating: 4.7,
    reviewCount: 988,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
  },
  {
    id: "p6",
    name: "Wall Connector",
    category: "Charging",
    price: 475,
    rating: 4.9,
    reviewCount: 3210,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    badge: "Best Seller",
  },
  {
    id: "p7",
    name: "Tesla Jacket",
    category: "Apparel",
    price: 195,
    originalPrice: 240,
    rating: 4.8,
    reviewCount: 654,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    badge: "Sale",
  },
  {
    id: "p8",
    name: "Tesla Backpack",
    category: "Lifestyle",
    price: 125,
    rating: 4.6,
    reviewCount: 445,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    badge: "New",
  },
  {
    id: "p9",
    name: "Mobile Connector",
    category: "Charging",
    price: 230,
    rating: 4.8,
    reviewCount: 2100,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
  },
  {
    id: "p10",
    name: "Tesla Sunglasses",
    category: "Lifestyle",
    price: 85,
    originalPrice: 110,
    rating: 4.5,
    reviewCount: 312,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    badge: "Sale",
  },
  {
    id: "p11",
    name: "Cybertruck Tee",
    category: "Apparel",
    price: 38,
    rating: 4.7,
    reviewCount: 720,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    badge: "New",
  },
  {
    id: "p12",
    name: "Model Y Scale Model",
    category: "Scale Models",
    price: 129,
    rating: 4.8,
    reviewCount: 289,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80",
  },
];

const shippingFeatures = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary shipping on all orders over $75. Fast delivery to your door.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns on all merchandise. No questions asked.",
  },
  {
    icon: BadgeCheck,
    title: "Authentic Products",
    description: "Every item is official Tesla merchandise, designed and quality-tested by Tesla.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-[var(--text-muted)]"
          }`}
        />
      ))}
    </div>
  );
}

function BadgePill({ badge }: { badge: NonNullable<Product["badge"]> }) {
  const isAccent = badge === "New" || badge === "Sale";
  return (
    <span
      className={`absolute top-3 left-3 z-10 px-2.5 py-1 text-xs font-semibold rounded-full ${
        isAccent
          ? "bg-[var(--brand-accent)] text-white"
          : "bg-white/10 text-[var(--text-primary)] border border-[var(--border-medium)]"
      }`}
    >
      {badge}
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="card-base flex flex-col overflow-hidden group"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[var(--bg-secondary)]">
        {product.badge && <BadgePill badge={product.badge} />}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category tag */}
        <div className="flex items-center gap-1.5">
          <Tag className="w-3 h-3 text-[var(--brand-accent)]" />
          <span className="text-xs font-medium text-[var(--brand-accent)] uppercase tracking-wider">
            {product.category}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-[var(--text-muted)]">
            ({product.reviewCount.toLocaleString("en-US")})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-base font-bold text-[var(--text-primary)]">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[var(--text-muted)] line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={`mt-2 w-full py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            added
              ? "bg-green-600 text-white"
              : "bg-white/8 border border-[var(--border-medium)] text-[var(--text-primary)] hover:bg-[var(--brand-accent)] hover:border-[var(--brand-accent)] hover:text-white"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <main className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[var(--brand-accent)]/10 blur-[100px]" />
        </div>

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
            Official Merchandise
          </motion.p>

          <motion.h1
            variants={heroEntrance}
            className="text-5xl md:text-7xl font-black tracking-tight text-[var(--text-primary)] mb-6"
          >
            Tesla{" "}
            <span className="gradient-text-accent">Shop</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Authentic Tesla merchandise, apparel, and vehicle accessories — designed to complement your Tesla lifestyle.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#products"
              className="btn-primary flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              Shop Now
            </a>
            <a
              href="#products"
              className="btn-secondary flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                setActiveFilter("Accessories");
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Accessories
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FILTER TABS ───────────────────────────────────────────────────── */}
      <section id="products" className="max-w-7xl mx-auto px-6 pt-16 pb-6">
        <Reveal>
          <div className="flex items-center gap-3 mb-3 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === tab
                    ? "bg-[var(--brand-accent)] text-white shadow-[0_0_20px_var(--brand-accent-glow)]"
                    : "bg-white/6 border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </Reveal>
      </section>

      {/* ── PRODUCTS GRID ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          key={activeFilter}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 text-[var(--text-muted)]">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">No products found in this category.</p>
          </div>
        )}
      </section>

      {/* ── FEATURED COLLECTION ───────────────────────────────────────────── */}
      <section className="bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <Reveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-accent)] mb-4">
                  Exclusive Collection
                </p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-6">
                  Cybertruck{" "}
                  <span className="gradient-text-accent">Collection</span>
                </h2>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                  Celebrate the most iconic vehicle ever built with exclusive Cybertruck-themed apparel, accessories, and collectibles. Each piece is crafted to reflect the bold, angular design language of the Cybertruck itself.
                </p>
                <button
                  onClick={() => {
                    setActiveFilter("Apparel");
                    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-primary flex items-center gap-2"
                >
                  Shop Collection
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

            {/* Image */}
            <Reveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]">
                <img
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?w=900&q=80"
                  alt="Cybertruck Collection"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="px-3 py-1.5 rounded-full bg-[var(--brand-accent)] text-white text-xs font-bold uppercase tracking-wider">
                    Limited Edition
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SHIPPING INFO ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <h2 className="text-center text-2xl font-bold text-[var(--text-primary)] mb-12">
            Why Shop Tesla?
          </h2>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {shippingFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="card-base p-8 flex flex-col items-center text-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--brand-accent)]/10 border border-[var(--brand-accent)]/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[var(--brand-accent)]" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </main>
  );
}
