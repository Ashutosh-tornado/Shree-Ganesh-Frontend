import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils';

import toast from "react-hot-toast";

const ProductCard = ({ product }) => {

  const addToCart = async () => {
    try {
      const TOKEN = localStorage.getItem("token");
      console.log("TOKEN:", TOKEN);

      // 🟡 GUEST USER FLOW
      if (!TOKEN) {
        let cart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const existingItem = cart.find((item) => item.productId._id === product._id);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({ productId: product, quantity: 1 });
        }

        localStorage.setItem("guestCart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success("Added to cart 🛒");
        return;
      }

      // 🟢 LOGGED IN USER FLOW
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1
        })
      });

      const data = await res.json();
      console.log("RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to add");
      }

      toast.success("Added to cart 🛒");
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      console.error("ADD TO CART ERROR:", err.message);
      if (err.message === "Invalid token ❌") {
        toast.error("Session expired, please login again 🔐");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        toast.error("Error adding to cart ❌");
      }
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-white overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(197,163,101,0.15)] border border-[#EAE3D2]/50 hover:border-[#C5A365]/30 transition-all duration-700 h-full rounded-sm"
    >

      {/* Tags */}
      {product.tag && (
        <div className="absolute top-4 left-4 z-10">
          <span
            className={cn(
              "text-[9px] font-bold tracking-[0.2em] uppercase px-4 py-2 backdrop-blur-md rounded-sm border",
              product.tag === 'Best Seller'
                ? "bg-[#1C110F]/90 text-[#C5A365] border-[#C5A365]/20 shadow-lg"
                : product.tag === 'New Arrival'
                  ? "bg-[#C5A365]/90 text-white border-transparent shadow-lg"
                  : product.tag === 'Premium Selection'
                    ? "bg-[#8B5E34]/90 text-white border-transparent shadow-lg"
                    : "bg-white/90 text-[#1C110F] border-[#1C110F]/10 shadow-sm"
            )}
          >
            {product.tag}
          </span>
        </div>
      )}

      {/* IMAGE */}
      <Link
        to={`/product/${product._id}`}
        className="relative aspect-[4/5] overflow-hidden bg-[#FDFBF7] flex items-center justify-center p-6"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#EAE3D2]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-2xl mix-blend-multiply"
        />
      </Link>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow p-6 border-t border-[#EAE3D2]/50 bg-white relative">
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#C5A365]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="mb-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A365] font-semibold mb-2 block">
            {product.weight || "Premium Selection"}
          </span>
          <div className="flex justify-between items-start gap-4">
            <Link to={`/product/${product._id}`}>
              <h3 className="font-serif text-xl text-[#1C110F] font-medium leading-snug group-hover:text-[#C5A365] transition-colors duration-500">
                {product.name}
              </h3>
            </Link>
            <span className="font-sans text-sm md:text-base font-semibold text-[#8B5E34] tracking-wide whitespace-nowrap mt-1">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <p className="text-xs md:text-sm text-[#1C110F]/60 mb-6 flex-grow leading-relaxed font-light line-clamp-2">
          {product.description}
        </p>

        {/* ADD TO CART */}
        <button
          onClick={addToCart}
          className="w-full relative overflow-hidden group/btn bg-[#FDFBF7] border border-[#EAE3D2] hover:border-[#C5A365] py-4 flex items-center justify-center transition-all duration-500 rounded-sm"
        >
          <div className="absolute inset-0 w-0 bg-[#C5A365] transition-all duration-500 ease-out group-hover/btn:w-full"></div>
          <span className="relative flex items-center text-[10px] font-bold tracking-[0.2em] uppercase text-[#1C110F] group-hover/btn:text-white transition-colors duration-500">
            <Plus
              size={14}
              className="mr-2 transition-transform duration-500 group-hover/btn:rotate-90"
              strokeWidth={2}
            />
            Add to Cart
          </span>
        </button>
      </div>

    </motion.div>
  );
};

export default ProductCard;