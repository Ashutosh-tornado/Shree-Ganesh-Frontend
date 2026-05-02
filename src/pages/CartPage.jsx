import React, { useEffect, useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from '../components/CartItem';
import Button from '../components/Button';

const CartPage = () => {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH CART
  const fetchCart = async () => {
    try {
      const TOKEN = localStorage.getItem("token");

      if (!TOKEN) {
        console.log("No token ❌");
        setCartItems([]);
        return;
      }

      const res = await fetch("http://localhost:5000/cart", {
        headers: {
          "Authorization": "Bearer " + TOKEN
        }
      });

      const data = await res.json();

      console.log("CART DATA:", data); // 🔍 debug

      // ✅ FIX HERE (IMPORTANT)
      setCartItems(data.cart || []);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();

    // 🔥 Auto refresh when cart updates
    const handleCartUpdate = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // 💰 CALCULATIONS (safe)
  const subtotal = cartItems.reduce(
    (acc, item) => acc + ((item.productId?.price || 0) * item.quantity),
    0
  );

  const shipping = subtotal > 3000 ? 0 : 99;
  const total = subtotal + shipping;

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-light">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-accent/20 pb-6"
        >
          <div>
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-brand-accent font-medium mb-2 block">Your Selection</span>
            <h1 className="text-4xl md:text-5xl font-serif text-brand-dark">Shopping Bag</h1>
          </div>
          <span className="text-brand-dark/60 font-light text-sm md:text-base">
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
          </span>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
              <p className="text-brand-dark/50 text-sm uppercase tracking-widest">Loading Bag</p>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center bg-white/50 backdrop-blur-sm border border-brand-accent/10 rounded-sm"
          >
            <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mb-6 text-brand-accent">
              <Lock size={32} strokeWidth={1} />
            </div>
            <h2 className="text-3xl font-serif text-brand-dark mb-4">Your bag is empty</h2>
            <p className="text-brand-dark/60 mb-8 max-w-md font-light">
              Looks like you haven't added any premium dry fruits to your bag yet.
            </p>
            <Button to="/collection" className="bg-brand-dark text-white hover:bg-brand-accent px-8 py-3">
              Explore Collection
            </Button>
          </motion.div>
        ) : (

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* LEFT */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-grow lg:w-2/3"
          >
            <div className="divide-y divide-brand-accent/10 border-b border-brand-accent/10">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CartItem 
                      item={item} 
                      refreshCart={fetchCart} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <Link to="/collection" className="inline-flex items-center text-sm font-bold tracking-[0.1em] uppercase text-brand-dark hover:text-brand-accent transition-colors duration-300 group">
                <ArrowRight size={16} className="mr-2 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={2} />
                Continue Shopping
              </Link>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/3"
          >
            <div className="bg-white p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-brand-accent/10 sticky top-32 rounded-sm">

              <h2 className="text-2xl font-serif text-brand-dark mb-8 border-b border-brand-accent/10 pb-4">Order Summary</h2>

              <div className="space-y-4 mb-8 text-brand-dark/80 font-light">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-medium text-brand-dark">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-medium text-brand-dark">{shipping === 0 ? 'Complimentary' : `₹${shipping}`}</span>
                </div>
              </div>

              <div className="flex justify-between mb-8 text-lg md:text-xl border-t border-brand-accent/10 pt-6">
                <span className="font-serif text-brand-dark">Total</span>
                <span className="font-sans font-semibold text-brand-accent">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <Button className="w-full bg-brand-dark text-white hover:bg-brand-accent transition-colors duration-500 py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-sm shadow-md flex justify-center">
                Secure Checkout
              </Button>

              <div className="mt-8 pt-6 border-t border-brand-accent/10 space-y-4">
                <div className="flex items-center gap-3 text-xs text-brand-dark/60 uppercase tracking-widest">
                  <Lock size={14} className="text-brand-accent" />
                  Secure Encrypted Payment
                </div>
                <div className="flex items-center gap-3 text-xs text-brand-dark/60 uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-brand-accent" />
                  100% Quality Guarantee
                </div>
                {shipping === 0 && (
                  <div className="flex items-center gap-3 text-xs text-brand-dark/60 uppercase tracking-widest">
                    <Truck size={14} className="text-brand-accent" />
                    Complimentary Shipping Applied
                  </div>
                )}
              </div>

            </div>
          </motion.div>

        </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;