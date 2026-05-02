import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const Instagram = LucideIcons.Instagram || LucideIcons.Camera;
  const Facebook = LucideIcons.Facebook || LucideIcons.Share2;
  const Twitter = LucideIcons.Twitter || LucideIcons.Bird;
  const MapPin = LucideIcons.MapPin || LucideIcons.Pin;
  const Phone = LucideIcons.Phone || LucideIcons.PhoneCall;
  const Mail = LucideIcons.Mail || LucideIcons.Inbox;

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
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
    <footer className="bg-brand-dark text-brand-light pt-24 pb-12 overflow-hidden">
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
              <h2 className="font-serif text-3xl text-brand-light mb-2 group inline-block">
                Shree Ganesh<br/>
                <span className="text-[10px] font-sans tracking-[0.35em] uppercase text-brand-accent font-medium block mt-1 group-hover:text-brand-light transition-colors duration-300">Dry Fruits</span>
              </h2>
            </Link>
            <p className="text-sm text-brand-light/60 leading-loose max-w-xs font-light">
              Curating the finest, premium dry fruits and nuts from around the world. Elevate your daily nutrition with our luxury selection.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-sm border border-brand-light/10 flex items-center justify-center text-brand-light hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 hover:-translate-y-1">
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-sm border border-brand-light/10 flex items-center justify-center text-brand-light hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 hover:-translate-y-1">
                <Facebook size={16} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-sm border border-brand-light/10 flex items-center justify-center text-brand-light hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 hover:-translate-y-1">
                <Twitter size={16} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUpVariant} className="lg:pl-8">
            <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-brand-accent mb-8">Explore</h3>
            <ul className="space-y-4">
              <li><Link to="/collection" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors duration-300 inline-block hover:translate-x-1 transform">Our Collection</Link></li>
              <li><Link to="/#story" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors duration-300 inline-block hover:translate-x-1 transform">Heritage & Story</Link></li>
              <li><Link to="#" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors duration-300 inline-block hover:translate-x-1 transform">Corporate Gifting</Link></li>
              <li><Link to="#" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors duration-300 inline-block hover:translate-x-1 transform">Gift Cards</Link></li>
            </ul>
          </motion.div>

          {/* Customer Care */}
          <motion.div variants={fadeUpVariant}>
            <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-brand-accent mb-8">Customer Care</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors duration-300 inline-block hover:translate-x-1 transform">Track Order</Link></li>
              <li><Link to="#" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors duration-300 inline-block hover:translate-x-1 transform">Shipping & Returns</Link></li>
              <li><Link to="#" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors duration-300 inline-block hover:translate-x-1 transform">FAQ</Link></li>
              <li><Link to="#" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors duration-300 inline-block hover:translate-x-1 transform">Contact Us</Link></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeUpVariant}>
            <h3 className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-brand-accent mb-8">Contact</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <MapPin size={18} className="text-brand-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <span className="text-sm text-brand-light/70 leading-relaxed font-light">123 Luxury Avenue, Fort,<br/>Mumbai 400001</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Phone size={18} className="text-brand-accent shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <span className="text-sm text-brand-light/70 font-light">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4 group">
                <Mail size={18} className="text-brand-accent shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <span className="text-sm text-brand-light/70 font-light">concierge@shreeganesh.com</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <motion.div variants={fadeUpVariant} className="pt-8 border-t border-brand-light/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-brand-light/40">
            &copy; {new Date().getFullYear()} Shree Ganesh Dry Fruits. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-brand-light/40">
            <Link to="#" className="hover:text-brand-light transition-colors duration-300">Privacy Policy</Link>
            <Link to="#" className="hover:text-brand-light transition-colors duration-300">Terms of Service</Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
