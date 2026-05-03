import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  const ShoppingBag = LucideIcons.ShoppingBag;
  const Menu = LucideIcons.Menu;
  const X = LucideIcons.X;
  const Search = LucideIcons.Search;

  // 🔥 SCROLL
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

  // 🔥 FETCH CART COUNT
  const fetchCartCount = async () => {
    const TOKEN = localStorage.getItem("token");

    // 🟡 Guest cart
    if (!TOKEN) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCartCount(guestCart.length);
      return;
    }

    // 🟢 User cart
    try {
      const res = await fetch("http://localhost:5000/cart", {
        headers: {
          "Authorization": "Bearer " + TOKEN
        }
      });

      const data = await res.json();
      setCartCount(data.cart?.length || 0);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCartCount();

    // 🔥 listen for updates
    const handleUpdate = () => fetchCartCount();
    window.addEventListener("cartUpdated", handleUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleUpdate);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
     { name: 'Orders', path: '/orders' },
    { name: 'Our Story', path: '/#story' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-brand-light/80 backdrop-blur-xl py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path}>
              {link.name}
            </Link>
          ))}
        </nav>

        <Link to="/">Shree Ganesh</Link>

        {/* 🔥 CART */}
        <Link to="/cart" className="relative">
          <ShoppingBag size={22} />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}>
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;