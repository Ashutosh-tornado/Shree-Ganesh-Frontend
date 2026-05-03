import React, { useEffect, useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
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
      // 🔥 update cart
      window.dispatchEvent(new Event("cartUpdated"));

      toast.success("Order placed successfully 🎉");

      // 🔥 redirect
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
            <span className="text-xs tracking-[0.3em] uppercase text-brand-accent mb-2 block">Your Selection</span>
            <h1 className="text-4xl md:text-5xl font-serif text-brand-dark">Shopping Bag</h1>
          </div>
          <span className="text-brand-dark/60 text-sm">
            {cartItems.length} Items
          </span>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-32">Loading...</div>
        ) : cartItems.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Lock size={40} />
            <h2 className="text-2xl mt-4">Your bag is empty</h2>
            <Button to="/collection">Explore Collection</Button>
          </div>

        ) : (

        <div className="flex flex-col lg:flex-row gap-16">

          {/* LEFT */}
          <div className="flex-grow lg:w-2/3">
            <div>
              <AnimatePresence>
                {cartItems.map((item, i) => (
                  <motion.div key={item._id || i}>
                    <CartItem 
                      item={item} 
                      refreshCart={fetchCart} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-10">
              <Link to="/collection">← Continue Shopping</Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 shadow sticky top-32">

              <h2 className="text-xl mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6 font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <Button onClick={handleCheckout} className="w-full">
                Checkout 🔐
              </Button>

            </div>
          </div>

        </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;