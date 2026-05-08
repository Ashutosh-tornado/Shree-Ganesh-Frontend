import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Menu,
  X,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // 🔥 Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // 🔥 Cart count
  const fetchCartCount = async () => {
    const TOKEN = localStorage.getItem("token");

    // Guest cart
    if (!TOKEN) {
      const guestCart =
        JSON.parse(localStorage.getItem("guestCart")) || [];

      setCartCount(guestCart.length);
      return;
    }

    // Logged in cart
    try {
      const res = await fetch("http://localhost:5000/cart", {
        headers: {
          Authorization: "Bearer " + TOKEN
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

    const handleCartUpdate = () => fetchCartCount();

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "Orders", path: "/orders" }
  ];

  const isTransparent = isHomePage && !isScrolled;
  const navTextColor = isTransparent ? "text-white" : "text-[#1C110F]";
  const navBgColor = isTransparent ? "bg-transparent" : "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.03)]";
  const logoColor = isTransparent ? "text-white" : "text-[#1C110F]";
  const accentColor = isTransparent ? "text-white/70" : "text-[#C5A365]";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b ${isTransparent ? 'border-white/10' : 'border-transparent'} ${navBgColor}`}
    >
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-700 flex items-center justify-between ${isScrolled ? 'py-4' : 'py-6 md:py-8'}`}>

        {/* LEFT */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu */}
          <button
            className={`md:hidden ${navTextColor} hover:${accentColor} transition-colors`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-bold tracking-[0.2em] uppercase ${navTextColor} hover:text-[#C5A365] transition-colors duration-300 relative group`}
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#C5A365] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            ))}
          </nav>
        </div>

        {/* CENTER LOGO */}
        <Link
          to="/"
          className="flex-shrink-0 flex flex-col items-center justify-center group"
        >
          {/* USER INSTRUCTION: Replace src with the uploaded logo image */}
          {/* <img src="/logo.png" alt="Shree Ganesh Logo" className="h-12 object-contain" /> */}
          
          <div className="text-center leading-none transform transition-transform duration-500 group-hover:scale-105">
            <h1 className={`font-serif text-2xl md:text-3xl ${logoColor} transition-colors duration-500`}>
              Shree Ganesh
            </h1>
            <span className={`text-[9px] md:text-[10px] tracking-[0.4em] uppercase ${accentColor} transition-colors duration-500 mt-2 block font-medium`}>
              Dry Fruits
            </span>
          </div>
        </Link>

        {/* RIGHT */}
        <div className="flex flex-1 items-center justify-end gap-6 md:gap-8">
          {/* Account */}
          <Link
            to="/login"
            className={`hidden md:flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase ${navTextColor} hover:text-[#C5A365] transition-colors duration-300`}
          >
            <User size={18} strokeWidth={1.5} />
            <span className="hidden lg:block">Account</span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className={`relative flex items-center justify-center ${navTextColor} hover:text-[#C5A365] transition-colors duration-300 group`}
          >
            <ShoppingBag size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
            
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-[#C5A365] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1C110F] border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col py-8 px-6 gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                >
                  <Link
                    to={link.path}
                    className="text-2xl font-serif text-white hover:text-[#C5A365] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-6 border-t border-white/10 mt-2"
              >
                <Link
                  to="/login"
                  className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-[#C5A365]"
                >
                  <User size={20} />
                  Sign In / Register
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;