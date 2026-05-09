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
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
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

  const revealFromSide = (direction = "left") => ({
    hidden: {
      opacity: 0,
      x: direction === "left" ? -50 : 50,
      y: 18,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  });

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
  className="relative overflow-hidden bg-[#f8f4ee]"
>
  {/* background */}
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

  {/* content */}
  <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 pt-28 pb-24 lg:px-10">
    <motion.div
      style={{ y: textY, opacity }}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative z-30 flex max-w-4xl flex-col items-center text-center"
    >
      {/* badge */}
      <motion.div
        variants={fadeUpVariant}
        className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d6b985]/30 bg-white/75 px-5 py-2 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
      >
        <div className="h-2 w-2 rounded-full bg-[#c79b58]" />
        <span className="text-[11px] uppercase tracking-[0.35em] text-[#8b6a3c]">
          Premium Dry Fruits
        </span>
      </motion.div>

      {/* heading */}
      <motion.h1
        variants={fadeUpVariant}
        className="font-serif text-[clamp(4.25rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.055em] text-[#24180f]"
      >
        Luxury snacks
        <span className="block italic font-light text-[#c79b58]">
          crafted naturally.
        </span>
      </motion.h1>

      {/* description */}
      <motion.p
        variants={fadeUpVariant}
        className="mt-7 max-w-2xl text-[17px] leading-8 text-[#5f5348]"
      >
        Handpicked gourmet dry fruits curated for purity, freshness, and a premium snacking experience.
      </motion.p>

      {/* buttons */}
      <motion.div
        variants={fadeUpVariant}
        className="mt-10 flex flex-col gap-4 sm:flex-row"
      >
        <Link
          to="/collection"
          className="group inline-flex items-center justify-center gap-4 rounded-full bg-[#24180f] px-9 py-5 text-xs font-semibold uppercase tracking-[0.32em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black shadow-[0_18px_45px_rgba(36,24,15,0.18)]"
        >
          Shop Collection
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c79b58] text-black transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight size={16} />
          </span>
        </Link>

        <Link
          to="/collection"
          className="inline-flex items-center justify-center rounded-full border border-[#e2d3bf] bg-white/75 px-9 py-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#24180f] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#c79b58] shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
        >
          Explore Products
        </Link>
      </motion.div>

      {/* stats */}
      <motion.div
        variants={fadeUpVariant}
        className="mt-14 grid w-full max-w-md grid-cols-2 gap-4 border-t border-[#d9cfc1] pt-8"
      >
        {[
          { value: "100%", label: "Natural" },
          { value: "24h", label: "Fresh Pack" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[1.5rem] border border-white/50 bg-white/40 px-5 py-5 shadow-[0_12px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl"
          >
            <div className="text-3xl font-semibold text-[#24180f]">
              {item.value}
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.28em] text-[#8f7f6d]">
              {item.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* scroll cue */}
      <motion.div
        variants={fadeUpVariant}
        className="mt-8 text-center"
      >
        <div className="mb-3 text-[10px] uppercase tracking-[0.45em] text-[#8b6a3c]">
          Scroll To Explore
        </div>
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#d6c4ab] bg-white/70 text-[#24180f] backdrop-blur-md shadow-[0_10px_24px_rgba(0,0,0,0.06)]">
          <ArrowRight size={16} className="rotate-90" />
        </div>
      </motion.div>
    </motion.div>

    {/* transition bridge */}
        <div className="pointer-events-none absolute bottom-[-72px] left-0 z-20 h-[180px] w-full overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f3ede4]/55 to-[#f7f1e8]" />
  <div className="absolute left-1/2 top-6 h-[160px] w-[720px] -translate-x-1/2 rounded-full bg-[#d8bc8c]/14 blur-[110px]" />
  <div className="absolute left-1/2 top-10 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-[#d8bc8c]/0 via-[#d8bc8c]/55 to-transparent" />
</div>
  </div>
</section>

 {/* BENEFITS */}
<section className="relative overflow-hidden bg-gradient-to-b from-[#efe8de] via-[#f5f0e8] to-[#f8f5ef] px-6 pt-16 pb-32 text-[#24180f]">

  {/* ambient glow */}
  <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d8bc8c]/10 blur-[140px]" />

  <div className="relative mx-auto max-w-7xl">

    {/* heading */}
    <motion.div
      initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mb-24 text-center"
    >
      <div className="mb-5 text-[11px] uppercase tracking-[0.5em] text-[#b08a55]">
        Why Customers Love Us
      </div>

      <h2 className="font-serif text-5xl leading-[1.05] tracking-[-0.05em] text-[#24180f] md:text-7xl">
        Crafted For A <br />
        Luxury Experience
      </h2>

      <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-[#74685c]">
        Every product is carefully curated to deliver purity,
        freshness, and a refined gourmet snacking experience.
      </p>
    </motion.div>

    {/* cards */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.18,
          },
        },
      }}
      className="grid gap-8 md:grid-cols-3"
    >
      {benefits.map((item, idx) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={idx}
            variants={{
              hidden: {
                opacity: 0,
                y: 70,
                filter: "blur(10px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            whileHover={{
              y: -10,
            }}
            className="group relative overflow-hidden rounded-[2.7rem] border border-white/40 bg-white/45 p-10 shadow-[0_25px_80px_rgba(0,0,0,0.05)] backdrop-blur-2xl transition-all duration-500"
          >

            {/* glass glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_60%)] opacity-80" />

            {/* hover glow */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(214,185,133,0.18),transparent_65%)]" />

            <div className="relative z-10">

              {/* icon */}
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-[#3a2817]/10 bg-[#24180f] text-[#f3d8a3] shadow-[0_14px_40px_rgba(36,24,15,0.18)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_20px_50px_rgba(36,24,15,0.24)]">
                <Icon size={28} strokeWidth={1.8} />
              </div>

              {/* title */}
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#24180f]">
                {item.title}
              </h3>

              {/* description */}
              <p className="mt-6 leading-8 text-[#6f6459]">
                {item.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  </div>
</section>



      {/* WHY CHOOSE US */}
      <section className="relative overflow-hidden bg-[#24180f] px-6 py-28 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,185,133,0.15),transparent_30%)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-20 text-center"
          >
            <motion.div
              variants={revealFromSide("left")}
              className="mb-4 text-xs uppercase tracking-[0.45em] text-[#d8bb8b]"
            >
              Crafted With Care
            </motion.div>
            <motion.h2
              variants={revealFromSide("right")}
              className="font-serif text-5xl tracking-[-0.04em] text-white"
            >
              Luxury In Every Bite
            </motion.h2>
          </motion.div>

          <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {usp.map((item, idx) => {
              const Icon = item.icon;
              const direction = idx % 2 === 0 ? "left" : "right";

              return (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={revealFromSide(direction)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.10)] backdrop-blur-xl"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/10 text-[#f3d8a3] backdrop-blur-xl transition-all duration-300 group-hover:bg-[#c79b58] group-hover:text-black shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <motion.div variants={revealFromSide("left")}>
              <div className="mb-4 text-xs uppercase tracking-[0.45em] text-[#b08a55]">
                Curated Selection
              </div>
              <h2 className="font-serif text-5xl tracking-[-0.04em] text-[#24180f]">
                Featured Products
              </h2>
            </motion.div>

            <motion.div variants={revealFromSide("right")}>
              <Link
                to="/collection"
                className="inline-flex items-center gap-4 rounded-full border border-[#e2d3bf] bg-white px-7 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#24180f] transition-all duration-300 hover:-translate-y-1 hover:border-[#c79b58] shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
              >
                View Collection
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {products.length === 0
              ? skeletonCards.map((_, idx) => {
                  const direction = idx % 2 === 0 ? "left" : "right";

                  return (
                    <motion.div
                      key={idx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-120px" }}
                      variants={revealFromSide(direction)}
                      className="h-[420px] animate-pulse rounded-[2rem] border border-[#ece1d2] bg-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-xl"
                    />
                  );
                })
              : products.map((product, idx) => {
                  const direction = idx % 2 === 0 ? "left" : "right";

                  return (
                    <motion.div
                      key={product._id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-120px" }}
                      variants={revealFromSide(direction)}
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-[2rem] border border-[#ece1d2] bg-white/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-xl"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  );
                })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f7f1e8] px-6 py-32 text-[#24180f]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealFromSide("left")}
          className="mx-auto max-w-5xl rounded-[3rem] border border-white/60 bg-white/55 p-14 text-center shadow-[0_30px_80px_rgba(0,0,0,0.05)] backdrop-blur-xl"
        >
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
            className="mt-12 inline-flex items-center gap-4 rounded-full bg-[#24180f] px-9 py-5 text-xs font-semibold uppercase tracking-[0.32em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black shadow-[0_18px_45px_rgba(36,24,15,0.18)]"
          >
            Shop Now
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c79b58] text-black">
              <ArrowRight size={16} />
            </span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;