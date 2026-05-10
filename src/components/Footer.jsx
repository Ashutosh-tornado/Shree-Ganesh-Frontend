import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Share2, Bird, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <footer className="bg-[#110A08] text-white pt-24 pb-12 overflow-hidden border-t border-[#C5A365]/20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="container mx-auto px-6 md:px-12 max-w-7xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* Brand Info */}
          <motion.div variants={fadeUpVariant} className="space-y-6 pr-4">
            <Link to="/">
              <div className="flex flex-col mb-4 group">
                <h2 className="font-serif text-3xl text-white mb-1 transition-colors duration-500 group-hover:text-[#C5A365]">
                  Shree Ganesh
                </h2>
                <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-[#C5A365] font-medium">
                  Dry Fruits
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-loose max-w-xs font-light">
              Curating the finest, premium dry fruits and nuts from around the world. Elevate your daily nutrition with our luxury selection.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#C5A365] hover:text-white hover:border-[#C5A365] transition-all duration-500">
                <Camera size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#C5A365] hover:text-white hover:border-[#C5A365] transition-all duration-500">
                <Share2 size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#C5A365] hover:text-white hover:border-[#C5A365] transition-all duration-500">
                <Bird size={16} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUpVariant} className="lg:pl-8">
            <h3 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A365] mb-8">Explore</h3>
            <ul className="space-y-4">
              <li><Link to="/collection" className="text-sm text-white/60 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform">Our Collection</Link></li>
              <li><Link to="/#story" className="text-sm text-white/60 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform">Heritage & Story</Link></li>
              <li><Link to="#" className="text-sm text-white/60 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform">Corporate Gifting</Link></li>
              <li><Link to="#" className="text-sm text-white/60 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform">Gift Cards</Link></li>
            </ul>
          </motion.div>

          {/* Customer Care */}
          <motion.div variants={fadeUpVariant}>
            <h3 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A365] mb-8">Customer Care</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-sm text-white/60 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform">Track Order</Link></li>
              <li><Link to="#" className="text-sm text-white/60 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform">Shipping & Returns</Link></li>
              <li><Link to="#" className="text-sm text-white/60 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform">FAQ</Link></li>
              <li><Link to="#" className="text-sm text-white/60 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform">Contact Us</Link></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUpVariant}>
            <h3 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#C5A365] mb-8">Contact</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#C5A365] transition-colors duration-500 mt-1 shrink-0">
                  <MapPin size={14} className="text-[#C5A365] group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-white/60 leading-relaxed font-light mt-1.5">123 Luxury Avenue, Fort,<br />Mumbai 400001</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#C5A365] transition-colors duration-500 shrink-0">
                  <Phone size={14} className="text-[#C5A365] group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-white/60 font-light">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#C5A365] transition-colors duration-500 shrink-0">
                  <Mail size={14} className="text-[#C5A365] group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <span className="text-sm text-white/60 font-light">concierge@shreeganesh.com</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div variants={fadeUpVariant} className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-white/40">
            &copy; {new Date().getFullYear()} Shree Ganesh Dry Fruits. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/40">
            <Link to="#" className="hover:text-[#C5A365] transition-colors duration-300">Privacy Policy</Link>
            <Link to="#" className="hover:text-[#C5A365] transition-colors duration-300">Terms of Service</Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
