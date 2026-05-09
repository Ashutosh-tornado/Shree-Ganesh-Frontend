import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Menu,
  X,
  User,
  Search,
  Heart
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
    { name: "Shop", path: "/collection" },
    { name: "Collections", path: "/collection" },
    { name: "Our Story", path: "/about" },
    { name: "Quality", path: "/quality" },
    { name: "Contact", path: "/contact" }
  ];

  const isTransparent = false;
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
      <div className={`max-w-[1400px] mx-auto px-6 transition-all duration-700 flex items-center justify-between ${isScrolled ? 'py-4' : 'py-6 md:py-8'}`}>

        {/* LEFT - LOGO */}
        <div className="flex-1 flex items-center justify-start">
          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden ${navTextColor} hover:${accentColor} transition-colors mr-4`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
          
          <Link to="/" className="flex flex-col group">
            <h1 className={`font-serif text-xl md:text-2xl ${logoColor} transition-colors duration-500`}>
              Shree Ganesh
            </h1>
            <span className={`text-[8px] md:text-[9px] tracking-[0.4em] uppercase ${accentColor} transition-colors duration-500 block font-medium`}>
              Dry Fruits
            </span>
          </Link>
        </div>

        {/* CENTER - NAVIGATION */}
        <nav className="hidden lg:flex items-center justify-center gap-8 flex-[2]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] font-bold tracking-[0.2em] uppercase ${navTextColor} hover:text-[#C5A365] transition-colors duration-300 relative group`}
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#C5A365] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </nav>

        {/* RIGHT - ICONS */}
        <div className="flex-1 flex items-center justify-end gap-5 md:gap-6">
          <button className={`${navTextColor} hover:text-[#C5A365] transition-colors duration-300 hidden md:block`}>
            <Search size={20} strokeWidth={1.5} />
          </button>
          
          <button className={`${navTextColor} hover:text-[#C5A365] transition-colors duration-300 hidden md:block`}>
            <Heart size={20} strokeWidth={1.5} />
          </button>

          <Link
            to="/login"
            className={`${navTextColor} hover:text-[#C5A365] transition-colors duration-300`}
          >
            <User size={20} strokeWidth={1.5} />
          </Link>

          <Link
            to="/cart"
            className={`relative flex items-center justify-center ${navTextColor} hover:text-[#C5A365] transition-colors duration-300 group`}
          >
            <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
            
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-[#C5A365] text-white text-[9px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-sm"
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
                    className="text-xl font-serif text-white hover:text-[#C5A365] transition-colors inline-block tracking-wide"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-6 border-t border-white/10 mt-2 flex gap-6 text-[#C5A365]"
              >
                <Search size={24} strokeWidth={1.5} />
                <Heart size={24} strokeWidth={1.5} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;