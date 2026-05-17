import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export default function OurStoryPage() {
  const containerRef = useRef(null);
  
  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const floatingY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div ref={containerRef} className="bg-[#fbf9f6] text-[#24180f] overflow-hidden selection:bg-[#c79b58] selection:text-white font-sans">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Visual with Parallax & Scale */}
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1b120c]/60 via-[#1b120c]/40 to-[#fbf9f6] z-10" />
          <img
            src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Saffron Luxury threads"
          />
        </motion.div>

        {/* Ambient Radial Golden Glows */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-[#c79b58]/15 blur-[160px] rounded-full" />
        </div>

        {/* Hero Typography */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-20 text-center px-6 max-w-6xl mt-12"
        >
          <motion.p
            variants={fadeUp}
            className="uppercase tracking-[0.6em] text-[#e5c48d] text-[10px] md:text-xs font-semibold mb-6"
          >
            Est. 1998 — The Pinnacle of Purity
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-5xl md:text-8xl lg:text-[9.5rem] font-light leading-[0.9] tracking-[-0.03em] text-white"
          >
            Curating
            <span className="block text-[#e5c48d] italic font-serif font-light mt-3">Pure Indulgence</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-12 max-w-2xl mx-auto text-white/80 text-lg md:text-xl font-light leading-relaxed tracking-wide"
          >
            A rich heritage dedicated to sourcing the rarest, most exceptional dry fruits and nuts globally, crafted for the true connoisseur.
          </motion.p>
        </motion.div>

        {/* Elegant Infinite Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <span className="uppercase text-[9px] tracking-[0.4em] text-white/50 font-medium">Discover</span>
          <div className="w-[1px] h-20 bg-white/20 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full bg-[#e5c48d]"
            />
          </div>
        </div>
      </section>

      {/* 2. THE CONNOISSEUR'S HERITAGE (EDITORIAL GRID) */}
      <section className="relative py-32 lg:py-48 px-6 lg:px-16 max-w-[1400px] mx-auto z-20">
        
        {/* Subtle Decorative Floating Element */}
        <motion.div style={{ y: floatingY1 }} className="absolute right-10 top-24 w-72 h-72 rounded-full bg-[#c79b58]/5 blur-[80px] pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Text Content Block */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:col-span-5 space-y-10"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <span className="h-[1px] w-12 bg-[#c79b58]" />
              <p className="uppercase tracking-[0.45em] text-[#b08a55] text-[10px] font-bold">The Heritage</p>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] font-light"
            >
              An Unwavering
              <span className="block italic text-[#b08a55] font-serif mt-2 font-light">Quest for Perfection</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="space-y-6 text-[#24180f]/75 text-base md:text-lg leading-relaxed font-light"
            >
              <p>
                Shree Ganesh Dry Fruits was founded with a singular, uncompromising vision: to elevate dry fruits from simple nutrition into a premium sensory experience.
              </p>
              <p className="border-l-[1.5px] border-[#c79b58]/40 pl-6 italic text-[#b08a55] font-serif">
                "We do not search for the abundant; we curate the rare."
              </p>
              <p>
                From the fertile foothills of California for our almonds, to the historic high-altitude orchards of Kashmir for our pristine saffron threads, we establish direct partnerships with boutique growers who share our devotion to authenticity.
              </p>
            </motion.div>
          </motion.div>

          {/* Luxury Imagery Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full border border-[#c79b58]/15 animate-spin-slow pointer-events-none" style={{ animationDuration: '30s' }} />
            <div className="absolute -bottom-16 -right-16 w-[450px] h-[450px] rounded-full bg-[#c79b58]/[0.03] blur-xl pointer-events-none" />

            <div className="relative group overflow-hidden rounded-[2.5rem] lg:rounded-[3.5rem] shadow-[0_30px_80px_rgba(36,24,15,0.08)] bg-white border border-[#c79b58]/10 p-3">
              <div className="overflow-hidden rounded-[2.2rem] lg:rounded-[3.2rem] relative">
                {/* Visual overlay */}
                <div className="absolute inset-0 bg-[#24180f]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 1.6, ease }}
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2070&auto=format&fit=crop"
                  alt="Luxury Gift Packing Saffron Cashews"
                  className="w-full h-[550px] lg:h-[720px] object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. THE TRILOGY OF PURITY (Luxury Interactive Cards) */}
      <section className="relative py-24 bg-[#1b120c] text-[#fbf9f6] overflow-hidden">
        <motion.div style={{ y: floatingY2 }} className="absolute -left-20 top-1/4 w-96 h-96 rounded-full bg-[#c79b58]/5 blur-[100px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="uppercase tracking-[0.5em] text-[#e5c48d] text-[10px] font-semibold mb-4">Our Core Philosophy</p>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-[-0.02em]">The Trilogy of Excellence</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Impeccable Sourcing",
                desc: "We scan the globe for micro-climates that produce the most flavor-dense, nutrient-rich varieties, accepting only the top 1% of each harvest.",
                img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=2070"
              },
              {
                number: "02",
                title: "Rigorous Curation",
                desc: "Each individual dry fruit is hand-sorted and calibrated for size, color, moisture level, and pristine structure in our state-of-the-art facility.",
                img: "https://images.unsplash.com/photo-1508061253366-f7da158b6d96?q=80&w=2070"
              },
              {
                number: "03",
                title: "Luxury Preservation",
                desc: "Packed using premium inert-gas chambers and sealed in custom glass decanters or textured gold tins to preserve absolute cellular freshness.",
                img: "https://images.unsplash.com/photo-1620060938670-65983758b279?q=80&w=2070"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 65 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: idx * 0.15, ease }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-[2.2rem] bg-[#271c14] border border-white/5 p-8 lg:p-12 hover:border-[#c79b58]/30 transition-all duration-500"
              >
                {/* Elegant overlay image background on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700 pointer-events-none scale-105 group-hover:scale-100 duration-1000">
                  <img src={item.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1b120c]/60 to-[#1b120c] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <span className="font-serif text-[#e5c48d] text-4xl lg:text-5xl font-light opacity-30 group-hover:opacity-100 transition-opacity duration-500">{item.number}</span>
                    <h3 className="font-serif text-xl lg:text-2xl text-white mt-6 mb-4 font-light tracking-wide">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                  
                  {/* Subtle golden horizontal line that expands on hover */}
                  <div className="mt-10 h-[1.5px] bg-[#c79b58]/20 relative w-full overflow-hidden">
                    <div className="absolute left-0 top-0 h-full bg-[#e5c48d] w-0 group-hover:w-full transition-all duration-700 ease-[0.16,1,0.3,1]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BRAND STORYTELLING NUMBERS SECTION */}
      <section className="relative py-28 px-6 lg:px-16 bg-[#fbf9f6]">
        <div className="max-w-[1400px] mx-auto border-y border-[#c79b58]/20 py-16 grid md:grid-cols-3 gap-12 text-center">
          {[
            { value: "25+", label: "Years of Heritage", sub: "Preserving ancient traditions of luxury dry fruits curation" },
            { value: "100%", label: "Purity Certified", sub: "Zero compromise on quality, preservatives, or chemical additives" },
            { value: "15+", label: "Global Origins Sourced", sub: "Handpicked from exclusive farms across California, Iran, Afghanistan, and Kashmir" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15, ease }}
              className="space-y-4 px-4"
            >
              <h3 className="font-serif text-5xl lg:text-6xl text-[#b08a55] tracking-tight font-light">{stat.value}</h3>
              <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#24180f]">{stat.label}</p>
              <p className="text-[#24180f]/50 text-xs font-light max-w-[260px] mx-auto leading-relaxed">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. BESPOKE LUXURY EXPERIENCE CTA */}
      <section className="relative py-32 lg:py-44 overflow-hidden bg-[#fbf9f6]">
        {/* Soft elegant glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#c79b58]/10 blur-[180px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-center justify-center gap-4"
          >
            <span className="h-[1px] w-8 bg-[#c79b58]" />
            <p className="uppercase tracking-[0.5em] text-[#b08a55] text-[10px] font-bold">Unveil the Collection</p>
            <span className="h-[1px] w-8 bg-[#c79b58]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1, ease }}
            className="font-serif text-4xl md:text-7xl leading-tight font-light tracking-[-0.03em]"
          >
            Elevate Your Senses to the
            <span className="block italic text-[#8b6535] mt-2 font-light">Ultimate Standard</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="max-w-2xl mx-auto text-[#24180f]/65 text-base md:text-lg font-light leading-relaxed"
          >
            Explore our curated gift boxes, gourmet culinary pairings, and organic selections designed to leave an unforgettable impression.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            className="pt-6"
          >
            <button className="group relative px-10 py-5 rounded-full overflow-hidden bg-[#24180f] text-white text-[11px] font-semibold uppercase tracking-[0.3em] shadow-[0_20px_45px_rgba(36,24,15,0.15)] hover:shadow-[0_20px_55px_rgba(199,155,88,0.25)] transition-all duration-500">
              <span className="absolute inset-0 bg-gradient-to-r from-[#c79b58] to-[#e5c48d] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              <span className="relative z-10 flex items-center gap-3">
                Experience the collection
                <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
