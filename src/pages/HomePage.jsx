import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const ArrowRight = LucideIcons.ArrowRight || LucideIcons.ChevronRight;
  const ShieldCheck = LucideIcons.ShieldCheck;
  const Leaf = LucideIcons.Leaf;
  const Truck = LucideIcons.Truck;

  const [products, setProducts] = useState([]);

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="pt-24 bg-brand-light">

      {/* HERO */}
      <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden bg-[#EAE3D2] text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent z-0 pointer-events-none" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.span variants={fadeUpVariant} className="text-xs md:text-sm font-sans tracking-[0.3em] uppercase text-brand-dark/60 mb-6 font-medium">
            Discover the finest selection
          </motion.span>
          
          <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 text-brand-dark leading-[1.1] font-medium">
            Premium<br/><span className="italic font-light">Dry Fruits</span>
          </motion.h1>

          <motion.p variants={fadeUpVariant} className="mb-12 text-brand-dark/70 max-w-lg mx-auto text-lg md:text-xl font-light">
            Sourced globally, delivered fresh. Elevate your daily nutrition with our luxury collection.
          </motion.p>

          <motion.div variants={fadeUpVariant}>
            <Button to="/collection" className="bg-brand-dark text-white hover:bg-brand-accent transition-colors duration-500 px-10 py-4 text-sm tracking-widest">
              Explore Collection
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* TRUST */}
      <section className="py-20 bg-white">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl"
        >
          {[
            { icon: ShieldCheck, title: "Premium Quality", desc: "Handpicked for excellence" },
            { icon: Leaf, title: "100% Natural", desc: "No artificial additives" },
            { icon: Truck, title: "Fast Delivery", desc: "Freshness guaranteed" }
          ].map((item, idx) => (
            <motion.div key={idx} variants={fadeUpVariant} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mb-6 text-brand-accent group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-500">
                <item.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-brand-dark mb-2">{item.title}</h3>
              <p className="text-brand-dark/60 font-light">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 🔥 FEATURED PRODUCTS */}
      <section className="py-24 px-6 bg-brand-light">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="container mx-auto max-w-7xl"
        >
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-brand-accent mb-4 font-medium">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark">
              Featured Products
            </h2>
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

          <div className="text-center mt-16">
            <Link to="/collection" className="inline-flex items-center text-sm font-bold tracking-[0.2em] uppercase text-brand-dark hover:text-brand-accent transition-colors duration-300 group">
              View Entire Collection 
              <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default HomePage;