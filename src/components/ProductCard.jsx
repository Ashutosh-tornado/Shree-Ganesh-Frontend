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

        const existingItem = cart.find(
          (item) => item.productId._id === product._id
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            productId: product,
            quantity: 1
          });
        }

        localStorage.setItem("guestCart", JSON.stringify(cart));

        // 🔥 update navbar/cart instantly
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
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="group relative flex flex-col bg-brand-light overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-transparent hover:border-brand-accent/20 transition-all duration-500 rounded-sm"
    >

      {/* Tags */}
      {product.tag && (
        <div className="absolute top-4 left-4 z-10">
          <span
            className={cn(
              "text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-2 backdrop-blur-md rounded-sm",
              product.tag === 'Best Seller'
                ? "bg-brand-accent/90 text-white shadow-lg"
                : product.tag === 'New Arrival'
                  ? "bg-brand-dark/90 text-brand-light shadow-lg"
                  : product.tag === 'Premium Selection'
                    ? "bg-black/90 text-brand-accent shadow-lg"
                    : "bg-white/80 text-brand-dark shadow-sm"
            )}
          >
            {product.tag}
          </span>
        </div>
      )}

      {/* IMAGE */}
      <Link
        to={`/product/${product._id}`}
        className="relative aspect-[4/5] overflow-hidden bg-[#f4f1eb]"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
      </Link>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow p-6 md:p-8">

        <div className="flex justify-between items-start mb-3 gap-4">

          {/* PRODUCT NAME CLICKABLE */}
          <Link to={`/product/${product._id}`}>

            <h3 className="font-serif text-lg md:text-xl text-brand-dark font-medium leading-snug hover:text-brand-accent transition-colors duration-300">

              {product.name}

            </h3>

          </Link>

          <span className="font-sans text-sm md:text-base font-semibold text-brand-accent tracking-wide whitespace-nowrap">
            ₹{product.price.toLocaleString('en-IN')}
          </span>

        </div>

        <p className="text-xs md:text-sm text-brand-dark/70 mb-8 flex-grow leading-relaxed font-light">
          {product.description}
        </p>

        {/* ADD TO CART */}
        <button
          onClick={addToCart}
          className="w-full relative overflow-hidden group/btn bg-brand-light border border-brand-accent/30 hover:border-brand-accent py-4 flex items-center justify-center transition-all duration-500 rounded-sm shadow-sm hover:shadow-md"
        >

          <div className="absolute inset-0 w-0 bg-brand-accent transition-all duration-500 ease-out group-hover/btn:w-full"></div>

          <span className="relative flex items-center text-xs font-bold tracking-[0.2em] uppercase text-brand-dark group-hover/btn:text-white transition-colors duration-500">

            <Plus
              size={16}
              className="mr-2 transition-transform duration-500 group-hover/btn:rotate-90"
              strokeWidth={1.5}
            />

            Add to Cart

          </span>

        </button>

      </div>

    </motion.div>
  );
};

export default ProductCard;