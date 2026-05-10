import React, { useEffect, useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from '../components/CartItem';
import toast from "react-hot-toast";

const CartPage = () => {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 FETCH CART (Guest + User)
  const fetchCart = async () => {
    try {
      const TOKEN = localStorage.getItem("token");

      // 🟡 GUEST CART
      if (!TOKEN) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        setCartItems(guestCart);
        return;
      }

      // 🟢 USER CART
      const res = await fetch("http://localhost:5000/cart", {
        headers: {
          "Authorization": "Bearer " + TOKEN
        }
      });

      const data = await res.json();

      setCartItems(data.cart || []);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCart();

    const handleCartUpdate = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // 💰 CALCULATIONS
  const subtotal = cartItems.reduce(
    (acc, item) => acc + ((item.productId?.price || item.productId?.price || 0) * item.quantity),
    0
  );

  const shipping = subtotal > 3000 ? 0 : 99;
  const total = subtotal + shipping;

  // 🔐 CHECKOUT HANDLER
  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to continue 🔐");
      navigate("/login");
      return;
    }

    try {
      const loadingToast = toast.loading("Placing your order...");

      const res = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token
        }
      });

      const data = await res.json();

      toast.dismiss(loadingToast);

      if (res.ok) {
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success("Order placed successfully 🎉");
        setTimeout(() => {
          navigate("/success");
        }, 1000);
      } else {
        toast.error(data.message || "Order failed ❌");
      }

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong ❌");
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#FDFBF7] text-[#1C110F]">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAE3D2] pb-8"
        >
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A365] mb-4 block font-bold">Your Selection</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1C110F]">Shopping Bag</h1>
          </div>
          <span className="text-[#1C110F]/60 text-xs font-bold tracking-widest uppercase mb-2 md:mb-0">
            {cartItems.length} Exclusive Items
          </span>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-[#C5A365] border-t-transparent rounded-full animate-spin mb-6" />
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#1C110F]/50 font-bold">Loading Bag...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-8 border border-[#EAE3D2]/50">
              <Lock size={32} className="text-[#C5A365]" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-serif text-[#1C110F] mb-4">Your bag is empty</h2>
            <p className="text-[#1C110F]/60 font-light mb-10 max-w-sm">
              Discover our exclusive collection of premium dry fruits and add your favorites to the bag.
            </p>
            <Link to="/collection" className="group relative overflow-hidden bg-[#1C110F] text-white px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase rounded-sm shadow-[0_10px_30px_rgba(28,17,15,0.15)] inline-flex items-center gap-3">
              <span className="relative z-10">Explore Collection</span>
              <div className="absolute inset-0 bg-[#C5A365] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-0" />
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* LEFT - BAG ITEMS */}
            <div className="flex-grow lg:w-2/3">
              <div className="border-t border-[#EAE3D2]">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item, i) => (
                    <motion.div
                      key={item._id || i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="border-b border-[#EAE3D2]"
                    >
                      <CartItem
                        item={item}
                        refreshCart={fetchCart}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-12">
                <Link to="/collection" className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-[#1C110F]/60 hover:text-[#C5A365] transition-colors group">
                  <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* RIGHT - SUMMARY */}
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-[#EAE3D2]/50 sticky top-32 rounded-sm"
              >
                <h2 className="font-serif text-2xl text-[#1C110F] mb-8">Order Summary</h2>

                <div className="space-y-6 mb-8 text-sm font-light text-[#1C110F]/80">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1C110F]">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#1C110F]">{shipping === 0 ? "Complimentary" : `₹${shipping}`}</span>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-[#EAE3D2] mb-8" />

                <div className="flex justify-between items-end mb-10">
                  <span className="text-xs uppercase tracking-widest font-bold text-[#1C110F]/60">Total</span>
                  <span className="text-3xl font-serif text-[#1C110F]">₹{total.toLocaleString('en-IN')}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full group relative overflow-hidden bg-[#1C110F] text-white py-5 flex items-center justify-center text-[11px] font-bold tracking-[0.2em] uppercase rounded-sm shadow-[0_10px_30px_rgba(28,17,15,0.15)] mb-8"
                >
                  <div className="absolute inset-0 bg-[#C5A365] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-0" />
                  <span className="relative z-10 flex items-center gap-3">
                    <Lock size={14} /> Secure Checkout
                  </span>
                </button>

                <div className="space-y-4 pt-8 border-t border-[#EAE3D2]/50">
                  <div className="flex items-center gap-3 text-xs text-[#1C110F]/60 font-light">
                    <ShieldCheck size={16} className="text-[#C5A365]" strokeWidth={1.5} />
                    Secure encrypted checkout
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#1C110F]/60 font-light">
                    <Truck size={16} className="text-[#C5A365]" strokeWidth={1.5} />
                    Complimentary shipping over ₹3,000
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;