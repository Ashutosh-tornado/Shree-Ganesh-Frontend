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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const productY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const floatY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const floatY3 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

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
      {/* SECTION 1 — CINEMATIC HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0A0604] perspective-[1000px]">
        {/* Cinematic Background & Lighting */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A] via-[#0A0604] to-[#0A0604]" />
          {/* Ambient Glow */}
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#C5A365]/10 rounded-full mix-blend-screen filter blur-[120px]" />
          {/* Volumetric God Rays */}
          <div className="absolute top-[-20%] right-1/4 w-[40vw] h-[150vh] bg-gradient-to-b from-[#FFF1C5]/5 to-transparent rotate-45 transform origin-top blur-3xl mix-blend-screen pointer-events-none" />
          {/* Gold Highlights */}
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] mix-blend-screen" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,6,4,0.85)_100%)] pointer-events-none" />
        </div>

        {/* Massive Luxury Typography (Parallax Background) */}
        <motion.div 
          style={{ y: backgroundY, opacity: textOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 overflow-hidden mix-blend-overlay"
        >
          <div className="text-center w-full leading-[0.85] opacity-10">
            <h1 className="text-[12vw] font-serif font-bold text-[#C5A365] whitespace-nowrap tracking-tighter">PURE LUXURY</h1>
            <h1 className="text-[10vw] font-serif font-bold text-[#EAE3D2] whitespace-nowrap tracking-widest ml-12">NATURE'S FINEST</h1>
            <h1 className="text-[14vw] font-serif font-bold text-[#8B5E34] whitespace-nowrap tracking-tighter -ml-12">AUTHENTIC</h1>
          </div>
        </motion.div>

        {/* Main Product Presentation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
           {/* Ground Contact Shadow */}
           <div className="absolute bottom-[20%] w-[500px] h-12 bg-black/80 blur-xl rounded-[100%] z-0 transform translate-y-16" />
           
           <motion.div 
             style={{ y: productY }}
             animate={{ y: [0, -15, 0] }}
             transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
             className="relative z-10 w-[80%] max-w-[450px] aspect-[3/4] flex items-center justify-center ml-[20%] md:ml-[30%]"
           >
             <img 
               src="/products/mixed-dry-fruits.webp" 
               alt="Premium Mixed Dry Fruits"
               className="w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)] pointer-events-auto"
             />
           </motion.div>
        </div>

        {/* Floating Dry Fruits */}
        <div className="absolute inset-0 z-20 pointer-events-none">
           {/* Almonds */}
           <motion.img 
             style={{ y: floatY1 }} animate={{ rotate: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
             src="/products/almonds.webp" className="absolute top-[20%] left-[45%] w-32 object-contain drop-shadow-2xl blur-[2px] opacity-80" 
           />
           <motion.img 
             style={{ y: floatY2 }} animate={{ rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
             src="/products/almonds.webp" className="absolute bottom-[25%] right-[15%] w-24 object-contain drop-shadow-2xl blur-[1px] opacity-90" 
           />
           {/* Cashews */}
           <motion.img 
             style={{ y: floatY3 }} animate={{ rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
             src="/products/cashews.webp" className="absolute top-[35%] right-[25%] w-40 object-contain drop-shadow-2xl blur-[3px] opacity-70" 
           />
           {/* Pistachios */}
           <motion.img 
             style={{ y: floatY1 }} animate={{ rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
             src="/products/pistachios.webp" className="absolute bottom-[15%] left-[35%] w-28 object-contain drop-shadow-2xl blur-[1px] opacity-80" 
           />
           
           {/* Foreground out-of-focus elements */}
           <motion.img 
             style={{ y: backgroundY }}
             src="/products/cashews.webp" className="absolute bottom-[-5%] left-[-5%] w-64 object-contain drop-shadow-3xl blur-[12px] opacity-30" 
           />
        </div>

        {/* Text Content */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-start pointer-events-none">
          <motion.div 
            style={{ y: textY, opacity }}
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-xl md:max-w-2xl mt-16 pointer-events-auto"
          >
            <motion.div variants={fadeUpVariant} className="mb-6">
              <span className="font-serif text-[#EAE3D2]/80 text-sm tracking-widest uppercase block mb-4">Shree Ganesh Dry Fruits</span>
              <div className="inline-block border border-[#C5A365]/30 bg-[#C5A365]/5 backdrop-blur-sm px-4 py-1.5 rounded-full">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A365] font-semibold">
                  Nature's Finest
                </span>
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeUpVariant} className="text-6xl md:text-7xl lg:text-8xl font-serif mb-6 text-white leading-[1.05] drop-shadow-lg">
              PURE<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37] italic font-light">
                LUXURY
              </span>
            </motion.h1>

            <motion.p variants={fadeUpVariant} className="mb-10 text-[#EAE3D2]/80 max-w-md text-base md:text-lg font-light leading-relaxed drop-shadow-md">
              Handpicked from the finest farms. 100% natural premium dry fruits crafted for purity, taste, and richness.
            </motion.p>

            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-5">
              <Link to="/collection" className="group relative overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#C5A365] text-[#110A08] px-8 py-4 rounded-full font-bold tracking-[0.15em] uppercase text-xs transition-all duration-500 shadow-[0_10px_30px_rgba(197,163,101,0.2)] hover:shadow-[0_15px_40px_rgba(197,163,101,0.4)] hover:-translate-y-1">
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-0" />
              </Link>
              <Link to="/collection" className="group relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold tracking-[0.15em] uppercase text-xs transition-all duration-500 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1">
                <span className="relative z-10">Explore Collection</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30 pointer-events-none"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 border border-white/20 rounded-full flex justify-center p-1"
          >
            <motion.div 
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-2 bg-[#C5A365] rounded-full"
            />
          </motion.div>
          <span className="text-[9px] tracking-widest uppercase text-white/40">Scroll to Explore</span>
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