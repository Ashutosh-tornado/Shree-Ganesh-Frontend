import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search, Heart } from 'lucide-react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const Navbar = () => {
  const [scrollState, setScrollState] = useState('top');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (y < 30) setScrollState('top');
    else if (y < 120) setScrollState('mid');
    else setScrollState('scrolled');
  });

  const isScrolled = scrollState !== 'top';

  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  // Cart count logic (untouched)
  const fetchCartCount = async () => {
    const TOKEN = localStorage.getItem("token");
    if (!TOKEN) {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCartCount(guestCart.length);
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/cart", {
        headers: { Authorization: "Bearer " + TOKEN }
      });
      const data = await res.json();
      setCartCount(data.cart?.length || 0);
    } catch (err) { console.log(err); }
  };

  useEffect(() => {
    fetchCartCount();
    const handleCartUpdate = () => fetchCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/collection" },
    { name: "Collections", path: "/collection" },
    { name: "Our Story", path: "/about" },
    { name: "Quality", path: "/quality" },
    { name: "Contact", path: "/contact" }
  ];

  const isActive = (path) => location.pathname === path;

  // Scroll-driven style states
  const glassBg = {
    top: 'rgba(253,251,247,0.12)',
    mid: 'rgba(253,251,247,0.55)',
    scrolled: 'rgba(253,251,247,0.82)',
  }[scrollState];

  const blurVal = { top: '8px', mid: '18px', scrolled: '28px' }[scrollState];
  const navShadow = {
    top: '0 0 0 0 transparent',
    mid: '0 8px 40px -8px rgba(36,24,15,0.06)',
    scrolled: '0 12px 50px -10px rgba(36,24,15,0.08), 0 2px 12px -2px rgba(197,163,101,0.06)',
  }[scrollState];

  return (
    <>
      {/* Atmospheric halo behind navbar — hero integration */}
      <div className="fixed top-0 left-0 right-0 z-[49] pointer-events-none h-36">
        <motion.div
          animate={{ opacity: isScrolled ? 0 : 0.6 }}
          transition={{ duration: 1.2, ease }}
          className="absolute inset-0 bg-gradient-to-b from-[#fbf8f3]/80 via-[#f8f4ee]/30 to-transparent"
        />
        <motion.div
          animate={{ opacity: isScrolled ? 0 : 0.35 }}
          transition={{ duration: 1.2, ease }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[120px] rounded-full bg-[#d6b985]/20 blur-[100px]"
        />
      </div>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Outer wrapper — floating effect on scroll */}
        <motion.div
          animate={{
            paddingLeft: isScrolled ? '16px' : '0px',
            paddingRight: isScrolled ? '16px' : '0px',
            paddingTop: isScrolled ? '10px' : '0px',
          }}
          transition={{ duration: 0.8, ease }}
        >
          {/* Glass container */}
          <motion.div
            animate={{
              backgroundColor: glassBg,
              boxShadow: navShadow,
              borderRadius: isScrolled ? '20px' : '0px',
            }}
            transition={{ duration: 0.8, ease }}
            className="relative overflow-hidden"
            style={{
              backdropFilter: `blur(${blurVal})`,
              WebkitBackdropFilter: `blur(${blurVal})`,
            }}
          >
            {/* Inner luminous layer — top edge light */}
            <motion.div
              animate={{ opacity: isScrolled ? 0.5 : 0.25 }}
              transition={{ duration: 0.8, ease }}
              className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />

            {/* Bottom border — gold breath */}
            <motion.div
              animate={{
                opacity: isScrolled ? 1 : 0.4,
              }}
              transition={{ duration: 0.8, ease }}
              className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#c79b58]/20 to-transparent"
            />

            {/* Ambient inner glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-48 h-16 rounded-full bg-[#d6b985]/[0.06] blur-[40px]" />
              <div className="absolute top-0 right-1/4 w-32 h-12 rounded-full bg-white/10 blur-[30px]" />
            </div>

            {/* Content */}
            <motion.div
              animate={{
                paddingTop: isScrolled ? '13px' : '24px',
                paddingBottom: isScrolled ? '13px' : '24px',
              }}
              transition={{ duration: 0.7, ease }}
              className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between"
            >
              {/* LEFT — Logo */}
              <div className="flex-1 flex items-center justify-start min-w-0">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="lg:hidden text-[#24180f]/80 hover:text-[#c79b58] transition-colors duration-500 mr-5 flex-shrink-0"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.25, ease }}>
                        <X size={21} strokeWidth={1.2} />
                      </motion.div>
                    ) : (
                      <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.25, ease }}>
                        <Menu size={21} strokeWidth={1.2} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <Link to="/" className="group relative flex flex-col">
                  <motion.span
                    className="font-serif text-[1.25rem] md:text-[1.4rem] text-[#24180f] leading-[1] tracking-[-0.025em]"
                    whileHover={{ letterSpacing: '0em' }}
                    transition={{ duration: 0.6, ease }}
                  >
                    Shree Ganesh
                  </motion.span>
                  <span className="text-[7px] md:text-[8px] tracking-[0.5em] uppercase text-[#b08a55]/80 font-medium mt-[3px] transition-all duration-700 group-hover:text-[#c79b58] group-hover:tracking-[0.6em]">
                    Dry Fruits
                  </span>
                  <span className="absolute -bottom-[6px] left-0 w-0 h-[0.5px] bg-gradient-to-r from-[#c79b58]/60 to-transparent group-hover:w-3/4 transition-all duration-900 ease-out" />
                </Link>
              </div>

              {/* CENTER — Navigation */}
              <nav className="hidden lg:flex items-center justify-center gap-0 flex-[2]">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.path} className="relative px-5 py-3 group">
                    {/* Hover glow behind link */}
                    <span className="absolute inset-0 rounded-full bg-[#c79b58]/0 group-hover:bg-[#c79b58]/[0.04] transition-all duration-700" />

                    <span className={`relative text-[9.5px] font-semibold tracking-[0.24em] uppercase transition-all duration-600 ${
                      isActive(link.path)
                        ? 'text-[#24180f]'
                        : 'text-[#24180f]/45 group-hover:text-[#24180f]/85'
                    }`}>
                      {link.name}
                    </span>

                    {/* Active indicator */}
                    {isActive(link.path) && (
                      <motion.span
                        layoutId="navActiveBar"
                        className="absolute left-1/2 -translate-x-1/2 -bottom-[1px] w-5 h-[1.5px] rounded-full bg-gradient-to-r from-[#c79b58]/80 to-[#d6b985]/40"
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                      />
                    )}

                    {/* Hover underline */}
                    {!isActive(link.path) && (
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-[1px] w-0 h-[0.5px] bg-[#c79b58]/30 group-hover:w-2/3 transition-all duration-600 ease-out" />
                    )}
                  </Link>
                ))}
              </nav>

              {/* RIGHT — Icons */}
              <div className="flex-1 flex items-center justify-end gap-[2px]">
                {/* Search */}
                <NavIcon className="hidden md:flex" ariaLabel="Search">
                  <Search size={17} strokeWidth={1.3} />
                </NavIcon>

                {/* Wishlist */}
                <NavIcon className="hidden md:flex" ariaLabel="Wishlist">
                  <Heart size={17} strokeWidth={1.3} />
                </NavIcon>

                {/* Account */}
                <Link to="/login" aria-label="Account">
                  <NavIcon ariaLabel="Account">
                    <User size={17} strokeWidth={1.3} />
                  </NavIcon>
                </Link>

                {/* Divider */}
                <div className="hidden md:block w-[1px] h-4 bg-[#24180f]/[0.06] mx-2" />

                {/* Cart */}
                <Link to="/cart" className="relative" aria-label="Cart">
                  <NavIcon ariaLabel="Cart">
                    <ShoppingBag size={17} strokeWidth={1.3} />
                  </NavIcon>
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                        className="absolute top-[2px] right-[2px] flex items-center justify-center w-[15px] h-[15px] rounded-full bg-[#24180f] text-[#e8cfa0] text-[7.5px] font-bold ring-[1.5px] ring-[#fdfbf7]/90 shadow-[0_2px_8px_rgba(36,24,15,0.2)]"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="fixed inset-0 z-[51] bg-[#24180f]/25 backdrop-blur-[6px]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '-100%' }}
              transition={{ duration: 0.65, ease }}
              className="fixed top-0 left-0 bottom-0 z-[52] w-[84vw] max-w-[370px] overflow-y-auto overscroll-contain"
              style={{ background: 'linear-gradient(175deg, #1f150f 0%, #24180f 50%, #291d13 100%)' }}
            >
              {/* Ambient glows */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#c79b58]/[0.07] blur-[90px] pointer-events-none" />
              <div className="absolute bottom-32 left-[-20px] w-36 h-36 rounded-full bg-[#c79b58]/[0.04] blur-[70px] pointer-events-none" />
              <div className="absolute top-1/3 right-[-30px] w-24 h-24 rounded-full bg-white/[0.02] blur-[50px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between px-8 pt-8 pb-5">
                <div className="flex flex-col">
                  <span className="font-serif text-[1.15rem] text-white/90 tracking-[-0.015em] leading-[1]">Shree Ganesh</span>
                  <span className="text-[6.5px] tracking-[0.45em] uppercase text-[#c79b58]/50 font-medium mt-[4px]">Dry Fruits</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/15 transition-all duration-500"
                  aria-label="Close menu"
                >
                  <X size={16} strokeWidth={1.2} />
                </motion.button>
              </div>

              <div className="mx-8 h-[0.5px] bg-gradient-to-r from-white/[0.06] via-[#c79b58]/[0.1] to-transparent" />

              {/* Links */}
              <div className="flex flex-col px-8 pt-10 pb-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.55, ease }}
                  >
                    <Link
                      to={link.path}
                      className={`group flex items-center justify-between py-[18px] transition-all duration-500 ${
                        isActive(link.path) ? 'text-[#c79b58]' : 'text-white/55 hover:text-white/90 hover:pl-2'
                      }`}
                    >
                      <span className="font-serif text-[1.65rem] tracking-[-0.02em] leading-[1.1]">{link.name}</span>
                      {isActive(link.path) && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.06 }} className="w-[4px] h-[4px] rounded-full bg-[#c79b58]/80" />
                      )}
                    </Link>
                    {i < navLinks.length - 1 && <div className="h-[0.5px] bg-white/[0.03]" />}
                  </motion.div>
                ))}
              </div>

              <div className="mx-8 h-[0.5px] bg-gradient-to-r from-white/[0.06] via-[#c79b58]/[0.08] to-transparent" />

              {/* Bottom icons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + navLinks.length * 0.06, duration: 0.55, ease }}
                className="px-8 pt-8 pb-12 flex items-center gap-3"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.07] text-[#c79b58]/50 hover:text-[#c79b58]/80 hover:border-[#c79b58]/15 transition-all duration-500">
                  <Search size={16} strokeWidth={1.2} />
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.07] text-[#c79b58]/50 hover:text-[#c79b58]/80 hover:border-[#c79b58]/15 transition-all duration-500">
                  <Heart size={16} strokeWidth={1.2} />
                </div>
                <div className="ml-auto text-[8px] tracking-[0.35em] uppercase text-white/[0.12] font-medium">Premium</div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Refined icon button component
const NavIcon = ({ children, className = '', ariaLabel }) => (
  <motion.div
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.93 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className={`flex items-center justify-center w-9 h-9 rounded-full text-[#24180f]/50 hover:text-[#24180f]/90 hover:bg-[#24180f]/[0.035] transition-all duration-500 cursor-pointer ${className}`}
    aria-label={ariaLabel}
  >
    {children}
  </motion.div>
);

export default Navbar;