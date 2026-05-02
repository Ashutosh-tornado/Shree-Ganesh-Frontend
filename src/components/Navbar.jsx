import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const ShoppingBag = LucideIcons.ShoppingBag || LucideIcons.ShoppingBasket || LucideIcons.Briefcase;
  const Menu = LucideIcons.Menu || LucideIcons.Layout;
  const X = LucideIcons.X || LucideIcons.Plus;
  const Search = LucideIcons.Search || LucideIcons.ZoomIn;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Our Story', path: '/#story' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-brand-light/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-4" : "bg-transparent py-6 md:py-8"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        <button 
          className="md:hidden text-brand-dark hover:text-brand-accent transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-xs font-semibold tracking-[0.1em] uppercase text-brand-dark hover:text-brand-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-brand-accent transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
            </Link>
          ))}
        </nav>

        <Link to="/" className="text-center absolute left-1/2 -translate-x-1/2 group">
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-brand-dark group-hover:text-brand-accent transition-colors duration-500">
            Shree Ganesh<br/>
            <span className="text-[10px] md:text-xs font-sans tracking-[0.35em] uppercase text-brand-accent font-medium block mt-1">Dry Fruits</span>
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          <button className="text-brand-dark hover:text-brand-accent transition-colors hidden sm:block">
            <Search size={22} strokeWidth={1.5} />
          </button>
          <Link to="/cart" className="text-brand-dark hover:text-brand-accent transition-all duration-300 relative group hover:scale-110">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="absolute -top-1.5 -right-1.5 bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
              2
            </span>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-brand-light/95 backdrop-blur-xl shadow-lg border-t border-brand-accent/10 md:hidden flex flex-col items-center py-8"
          >
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-lg font-serif tracking-wide text-brand-dark hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
