import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Leaf,
  Truck,
  Star,
  Award,
  Heart,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const pageProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts((data?.products || []).slice(0, 4));
      })
      .catch((err) => console.log(err));
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const benefits = [
    {
      icon: Heart,
      title: "Heart Healthy",
      desc: "Packed with nutrients, fiber, and healthy fats for smarter snacking.",
    },
    {
      icon: Sparkles,
      title: "Premium Quality",
      desc: "Only carefully selected dry fruits with a gourmet finish.",
    },
    {
      icon: ShieldCheck,
      title: "Fresh & Hygienic",
      desc: "Packed carefully for freshness, safety, and a premium experience.",
    },
  ];

  const usp = [
    { icon: Leaf, title: "100% Natural" },
    { icon: Award, title: "Handpicked Quality" },
    { icon: Truck, title: "Fast Delivery" },
    { icon: ShieldCheck, title: "Hygienic Packing" },
    { icon: Star, title: "Authentic Taste" },
    { icon: Heart, title: "Fresh Selection" },
  ];

  const skeletonCards = Array.from({ length: 4 });

  return (
    <div className="overflow-hidden bg-[#f8f4ee] text-[#24180f] selection:bg-[#c79b58] selection:text-white">
      <motion.div
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-[#c79b58] via-[#e5d1ae] to-[#24180f]"
        style={{ scaleX: pageProgress }}
      />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-[#f8f4ee]"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,185,133,0.22),transparent_30%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.75),transparent_18%),linear-gradient(to_bottom,#fbf8f3,#f3ede4)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.04),transparent_25%)]" />
          <motion.div
            style={{ y: heroY }}
            className="absolute right-[-10%] top-[-10%] h-[38rem] w-[38rem] rounded-full bg-[#d6b985]/25 blur-[120px]"
          />
          <div className="absolute left-[-12%] bottom-[-15%] h-[28rem] w-[28rem] rounded-full bg-black/5 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] [background-size:70px_70px]" />
        </div>

        <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 lg:px-10">
          <motion.div
            style={{ y: textY, opacity }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-30 flex max-w-2xl flex-col items-center text-center"
          >
            <motion.div
              variants={fadeUpVariant}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d6b985]/30 bg-white/75 px-4 py-2 backdrop-blur-md"
            >
              <div className="h-2 w-2 rounded-full bg-[#c79b58]" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-[#8b6a3c]">
                Premium Dry Fruits
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariant}
              className="font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.88] tracking-[-0.05em] text-[#24180f]"
            >
              Luxury snacks
              <span className="block italic text-[#c79b58]">
                crafted naturally.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariant}
              className="mt-8 max-w-xl text-base leading-8 text-[#5f5348] sm:text-lg"
            >
              Handpicked gourmet dry fruits curated for purity, freshness, and
              a premium snacking experience.
            </motion.p>

            <motion.div
              variants={fadeUpVariant}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                to="/collection"
                className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#24180f] px-8 py-5 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black"
              >
                Shop Collection
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c79b58] text-black transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </span>
              </Link>

              <Link
                to="/collection"
                className="inline-flex items-center justify-center rounded-full border border-[#e2d3bf] bg-white/75 px-8 py-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#24180f] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#c79b58]"
              >
                Explore Products
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUpVariant}
              className="mt-14 grid w-full max-w-lg grid-cols-3 gap-4 border-t border-[#d9cfc1] pt-8"
            >
              {[
                { value: "100%", label: "Natural" },
                { value: "24h", label: "Fresh Pack" },
                { value: "4.9★", label: "Ratings" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-2xl font-semibold text-[#24180f]">
                    {item.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-[#8f7f6d]">
                    {item.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 text-center">
            <div className="mb-3 text-[10px] uppercase tracking-[0.45em] text-[#8b6a3c]">
              Scroll To Explore
            </div>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#d6c4ab] bg-white/70 text-[#24180f] backdrop-blur-md">
              <ArrowRight size={16} className="rotate-90" />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-[#f7f1e8] px-6 py-28 text-[#24180f]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-4 text-xs uppercase tracking-[0.45em] text-[#b08a55]">
              Why Customers Love Us
            </div>
            <h2 className="font-serif text-5xl tracking-[-0.04em] text-[#24180f]">
              Premium Gourmet Experience
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-[2.5rem] border border-[#eadfce] bg-white/80 p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl"
                >
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#24180f] text-[#f3d8a3] transition-all duration-300 group-hover:scale-105">
                    <Icon size={28} />
                  </div>

                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#24180f]">
                    {item.title}
                  </h3>

                  <p className="mt-5 leading-8 text-[#6c6258]">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="relative overflow-hidden bg-[#24180f] px-6 py-28 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,185,133,0.15),transparent_30%)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <div className="mb-4 text-xs uppercase tracking-[0.45em] text-[#d8bb8b]">
              Crafted With Care
            </div>
            <h2 className="font-serif text-5xl tracking-[-0.04em] text-white">
              Luxury In Every Bite
            </h2>
          </div>

          <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {usp.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#f3d8a3] backdrop-blur-xl transition-all duration-300 group-hover:bg-[#c79b58] group-hover:text-black">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-8 text-white/60">
                    Designed for a premium gourmet shopping experience with
                    freshness, quality, and trust.
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-[#fcf8f3] px-6 py-28 text-[#24180f]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 text-xs uppercase tracking-[0.45em] text-[#b08a55]">
                Curated Selection
              </div>
              <h2 className="font-serif text-5xl tracking-[-0.04em] text-[#24180f]">
                Featured Products
              </h2>
            </div>

            <Link
              to="/collection"
              className="inline-flex items-center gap-4 rounded-full border border-[#e2d3bf] bg-white px-7 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#24180f] transition-all duration-300 hover:-translate-y-1 hover:border-[#c79b58]"
            >
              View Collection
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {products.length === 0
              ? skeletonCards.map((_, idx) => (
                  <div
                    key={idx}
                    className="h-[420px] animate-pulse rounded-[2rem] border border-[#ece1d2] bg-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.04)]"
                  />
                ))
              : products.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-[2rem] border border-[#ece1d2] bg-white/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-xl"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f7f1e8] px-6 py-32 text-[#24180f]">
        <div className="mx-auto max-w-5xl rounded-[3rem] border border-[#e8dcca] bg-white/80 p-14 text-center shadow-[0_30px_80px_rgba(0,0,0,0.05)] backdrop-blur-xl">
          <div className="mb-4 text-xs uppercase tracking-[0.45em] text-[#b08a55]">
            Gourmet Dry Fruits
          </div>
          <h2 className="font-serif text-5xl leading-tight tracking-[-0.04em] text-[#24180f]">
            Elevate your daily snacking experience.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-[#6b6158]">
            Explore premium almonds, cashews, pistachios, and handcrafted
            gourmet blends curated for luxury and health.
          </p>

          <Link
            to="/collection"
            className="mt-12 inline-flex items-center gap-4 rounded-full bg-[#24180f] px-9 py-5 text-xs font-semibold uppercase tracking-[0.32em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black"
          >
            Shop Now
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c79b58] text-black">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;