import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Menu,
  X,
  UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();

  // 🔥 Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

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

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            className="md:hidden"
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
          >
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm tracking-wide text-brand-dark hover:text-brand-accent transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* CENTER LOGO */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2"
        >
          <div className="text-center leading-tight">
            <h1 className="font-serif text-2xl text-brand-dark">
              Shree Ganesh
            </h1>

            <span className="text-[10px] tracking-[0.35em] uppercase text-brand-accent">
              Dry Fruits
            </span>
          </div>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-5">

          {/* Signup */}
          <Link
            to="/signup"
            className="hidden md:flex items-center gap-2 border border-brand-dark/10 hover:border-brand-accent px-4 py-2 text-sm transition rounded-full hover:bg-brand-accent hover:text-white"
          >
            <UserPlus size={16} />
            Signup
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative hover:scale-110 transition"
          >
            <ShoppingBag size={22} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t mt-4"
          >
            <div className="flex flex-col p-6 gap-5">

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-lg text-brand-dark"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/signup"
                className="border border-brand-dark text-center py-3 rounded-full"
              >
                Signup
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;