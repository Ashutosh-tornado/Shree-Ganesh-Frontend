import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { ArrowRight, ShieldCheck, Leaf, Truck, Star, Award, Heart } = LucideIcons;

  const [products, setProducts] = useState([]);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // 🔥 FETCH PRODUCTS
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => {
        // only top 4 show
        setProducts(data.products.slice(0, 4));
      })
      .catch(err => console.log(err));
  }, []);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-[#1C110F] text-brand-light font-sans selection:bg-brand-accent selection:text-white">
      {/* SECTION 1 — HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#2A1810] to-[#110A08]">
        {/* Cinematic Lighting & Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C5A365] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8B5E34] rounded-full mix-blend-screen filter blur-[150px] opacity-20" />
        </div>

        {/* Floating Elements (Parallax) */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute top-[15%] left-[10%] w-12 h-12 rounded-full border border-[#C5A365] opacity-20 blur-[1px]" />
          <div className="absolute top-[40%] right-[15%] w-24 h-24 rounded-full bg-gradient-to-tr from-[#C5A365] to-transparent opacity-10 blur-sm" />
          <div className="absolute bottom-[20%] left-[20%] w-16 h-16 rounded-full border border-white opacity-10 blur-[2px]" />
          <Leaf className="absolute top-[30%] left-[25%] text-[#C5A365] opacity-20 w-8 h-8 -rotate-45" />
          <Leaf className="absolute top-[60%] right-[25%] text-[#8B5E34] opacity-20 w-12 h-12 rotate-12" />
        </motion.div>

        {/* Background Huge Typography */}
        <motion.div 
          style={{ y: backgroundY, opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
        >
          <h1 className="text-[15vw] font-serif font-bold text-white/[0.03] whitespace-nowrap tracking-tighter">
            SHREE GANESH
          </h1>
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ y: textY, opacity }}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center px-6"
        >
          <motion.div variants={fadeUpVariant} className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-[#C5A365]" />
            <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#C5A365] font-semibold">
              Nature's Finest
            </span>
            <div className="w-12 h-[1px] bg-[#C5A365]" />
          </motion.div>
          
          <motion.h1 variants={fadeUpVariant} className="text-6xl md:text-8xl lg:text-9xl font-serif mb-6 text-white leading-[1.05]">
            PURE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37] italic font-light pr-4">
              LUXURY
            </span>
          </motion.h1>

          <motion.p variants={fadeUpVariant} className="mb-12 text-[#EAE3D2] max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Handpicked from the finest farms. 100% natural premium dry fruits crafted for purity, taste, and richness.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-6">
            <Link to="/collection" className="group relative overflow-hidden bg-[#C5A365] text-[#1C110F] px-10 py-4 font-bold tracking-[0.2em] uppercase text-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(197,163,101,0.4)]">
              <span className="relative z-10">Shop Now</span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-0" />
            </Link>
            <Link to="/collection" className="group flex items-center justify-center gap-3 px-10 py-4 border border-white/20 text-white font-bold tracking-[0.2em] uppercase text-sm transition-all duration-500 hover:border-[#C5A365] hover:text-[#C5A365] hover:bg-[#C5A365]/5">
              Explore Collection
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-widest uppercase text-white/50">Scroll</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-[#C5A365]"
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 — BENEFITS OF DRY FRUITS */}
      <section className="py-32 bg-[#FDFBF7] text-brand-dark relative z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { icon: Heart, title: "Heart Healthy", desc: "Packed with healthy fats and antioxidants to support cardiovascular wellness." },
              { icon: Star, title: "Premium Nutrition", desc: "A concentrated source of essential vitamins, minerals, and natural energy." },
              { icon: ShieldCheck, title: "Immunity Support", desc: "Rich in zinc and vitamin E to naturally boost your body's defenses." }
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeUpVariant} className="group relative p-10 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(197,163,101,0.15)] transition-all duration-700 overflow-hidden border border-[#EAE3D2]/50">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A365]/0 to-[#C5A365]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-[#1C110F] flex items-center justify-center mb-8 text-[#C5A365] group-hover:scale-110 group-hover:bg-[#C5A365] group-hover:text-white transition-all duration-700 shadow-lg group-hover:shadow-xl">
                    <item.icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl text-brand-dark mb-4">{item.title}</h3>
                  <p className="text-brand-dark/60 font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — OUR USP / WHY CHOOSE US */}
      <section className="py-32 bg-[#1C110F] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C5A365]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#8B5E34]/20 to-transparent" />
        </div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <span className="text-xs font-sans tracking-[0.4em] uppercase text-[#C5A365] mb-4 block font-semibold">Our Promise</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white">
              Why Choose Us
            </h2>
          </div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            {[
              { icon: Leaf, title: "100% Premium Quality" },
              { icon: Award, title: "Finest Farms Sourced" },
              { icon: Truck, title: "Freshly Packed" },
              { icon: ShieldCheck, title: "Hygienically Sealed" },
              { icon: Star, title: "Authentic Taste" },
              { icon: Heart, title: "Carefully Selected" }
            ].map((usp, idx) => (
              <motion.div key={idx} variants={fadeUpVariant} className="flex items-start gap-6 group">
                <div className="shrink-0 w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#C5A365] group-hover:bg-[#C5A365] group-hover:border-[#C5A365] group-hover:text-white transition-all duration-500">
                  <usp.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-white mb-2 group-hover:text-[#C5A365] transition-colors duration-300">{usp.title}</h4>
                  <p className="text-white/50 text-sm font-light leading-relaxed">Experience the highest standard of luxury and purity in every single bite.</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — FEATURED PRODUCTS */}
      <section className="py-32 px-6 bg-[#FDFBF7] relative z-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="container mx-auto max-w-7xl"
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-sans tracking-[0.4em] uppercase text-[#C5A365] mb-4 block font-semibold">Handpicked</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1C110F]">
                Featured Products
              </h2>
            </div>
            <Link to="/collection" className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-[#1C110F] hover:text-[#C5A365] transition-colors duration-300 group border-b border-[#1C110F] hover:border-[#C5A365] pb-2">
              View Entire Collection 
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          >
            {products.map(product => (
              <motion.div key={product._id} variants={fadeUpVariant}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

export default HomePage;