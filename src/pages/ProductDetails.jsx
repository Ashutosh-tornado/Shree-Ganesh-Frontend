import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, ShieldCheck, Truck, Star, Award, Heart } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

import toast from "react-hot-toast";

const ProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState("500g");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://localhost:5000/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data.product))
      .catch(err => console.log(err));
  }, [id]);

  // 🔥 ADD TO CART
  const addToCart = async () => {
    try {
      const TOKEN = localStorage.getItem("token");

      // 🔐 LOGIN REQUIRED
      if (!TOKEN) {
        let cart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const existingItem = cart.find((item) => item.productId._id === product._id);

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.push({ productId: product, quantity });
        }

        localStorage.setItem("guestCart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success("Added to cart 🛒");
        return;
      }

      // 🟢 LOGGED IN USER
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
          productId: product._id,
          quantity,
          weight: selectedWeight
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Added to cart 🛒");

    } catch (err) {
      console.log(err);
      toast.error("Error adding to cart ❌");
    }
  };

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#C5A365] border-t-transparent rounded-full animate-spin" />
          <h1 className="text-xl font-sans tracking-[0.2em] uppercase mt-8 text-[#1C110F]">Curating...</h1>
        </div>
      </div>
    );
  }

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT IMAGE GALLERY */}
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUpVariant}
            className="sticky top-32"
          >
            <div className="relative aspect-[4/5] bg-white overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-[#EAE3D2] flex items-center justify-center p-12 group rounded-sm">
              <div className="absolute inset-0 bg-gradient-to-b from-[#EAE3D2]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              {product.tag && (
                <div className="absolute top-6 left-6 z-10">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 bg-[#1C110F] text-[#C5A365] shadow-lg rounded-sm">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT DETAILS */}
          <motion.div 
            initial="hidden" animate="visible" variants={fadeUpVariant}
            className="py-10"
          >
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-[1px] bg-[#C5A365]" />
                <p className="uppercase tracking-[0.3em] text-[10px] text-[#C5A365] font-bold">
                  {product.category || "Premium Dry Fruits"}
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1C110F] leading-[1.1] mb-6">
                {product.name}
              </h1>

              <div className="flex items-center gap-6 mb-8">
                <p className="text-3xl font-sans font-light text-[#1C110F]">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
                <span className="bg-[#EAE3D2]/50 text-[#8B5E34] px-4 py-1 text-[10px] uppercase tracking-widest font-bold border border-[#EAE3D2] rounded-sm">
                  In Stock
                </span>
              </div>
            </div>

            <div className="prose prose-lg text-[#1C110F]/70 font-light leading-relaxed mb-12">
              <p>{product.description}</p>
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C5A365]/30 to-transparent mb-12" />

            {/* WEIGHT */}
            <div className="mb-10">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-5 text-[#1C110F]/60">
                Select Weight
              </h3>
              <div className="flex flex-wrap gap-4">
                {["250g", "500g", "1kg"].map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`px-8 py-4 text-[11px] uppercase tracking-widest font-bold transition-all duration-500 rounded-sm
                    ${
                      selectedWeight === weight
                        ? "bg-[#1C110F] text-[#C5A365] border border-[#1C110F] shadow-[0_10px_30px_rgba(28,17,15,0.2)]"
                        : "bg-white text-[#1C110F] border border-[#EAE3D2] hover:border-[#C5A365]"
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mb-12">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-5 text-[#1C110F]/60">
                Quantity
              </h3>
              <div className="inline-flex items-center border border-[#EAE3D2] bg-white rounded-sm h-14">
                <button
                  onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                  className="w-14 h-full flex items-center justify-center text-[#1C110F]/50 hover:text-[#C5A365] transition-colors"
                >
                  <Minus size={16} strokeWidth={2} />
                </button>
                <span className="w-14 text-center font-sans text-sm font-semibold text-[#1C110F]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-14 h-full flex items-center justify-center text-[#1C110F]/50 hover:text-[#C5A365] transition-colors"
                >
                  <Plus size={16} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button
                onClick={addToCart}
                className="flex-1 relative group overflow-hidden bg-[#1C110F] text-white py-5 px-8 text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm shadow-[0_10px_40px_rgba(28,17,15,0.2)]"
              >
                <div className="absolute inset-0 bg-[#C5A365] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-0" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <ShoppingBag size={16} />
                  Add To Cart
                </span>
              </button>

              <button
                className="flex-1 bg-white border border-[#EAE3D2] hover:border-[#1C110F] text-[#1C110F] py-5 px-8 text-[11px] uppercase tracking-[0.2em] font-bold transition-colors duration-500 rounded-sm"
              >
                Buy Now
              </button>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-[#EAE3D2]/50 pt-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EAE3D2]/30 flex items-center justify-center text-[#C5A365] shrink-0">
                  <Truck size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#1C110F] mb-1">Free Delivery</h4>
                  <p className="text-xs text-[#1C110F]/60 font-light leading-relaxed">Fast & secure delivery across India on all premium orders.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EAE3D2]/30 flex items-center justify-center text-[#C5A365] shrink-0">
                  <ShieldCheck size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#1C110F] mb-1">Premium Quality</h4>
                  <p className="text-xs text-[#1C110F]/60 font-light leading-relaxed">Handpicked and thoroughly inspected for the finest quality.</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;