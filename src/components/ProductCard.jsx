import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils';

const ProductCard = ({ product }) => {

  const addToCart = async () => {
    try {

      // 🔥 always get fresh token
      const TOKEN = localStorage.getItem("token");

      console.log("TOKEN:", TOKEN);

      // ❌ No token
     if (!TOKEN) {
  alert("Please login first ❌");
  window.location.href = "/login"; // 🔥 redirect
  return;
}

      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN.trim()}`
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1
        })
      });

      const data = await res.json();
      console.log("RESPONSE:", data);

      // ❌ API error
      if (!res.ok) {
        throw new Error(data.message || "Failed to add");
      }

      alert("Added to cart 🛒");

    } catch (err) {
      console.error("ADD TO CART ERROR:", err.message);

      if (err.message === "Invalid token ❌") {
        alert("Session expired, please login again 🔐");
        localStorage.removeItem("token");
      } else {
        alert("Error adding to cart ❌");
      }
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
    >

      {/* Tags */}
      {product.tag && (
        <div className="absolute top-4 left-4 z-10">
          <span className={cn(
            "text-[10px] font-bold tracking-wider uppercase px-3 py-1.5",
            product.tag === 'Best Seller' ? "bg-brand-accent text-white" :
            product.tag === 'New Arrival' ? "bg-brand-dark text-brand-light" :
            product.tag === 'Premium Selection' ? "bg-black text-brand-accent" :
            "bg-white/90 text-brand-dark backdrop-blur-sm shadow-sm"
          )}>
            {product.tag}
          </span>
        </div>
      )}

      {/* Image */}
      <Link to="#" className="relative aspect-[4/5] overflow-hidden bg-[#f9f8f6]">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6 md:p-8">
        
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="font-serif text-xl text-brand-dark">
            {product.name}
          </h3>

          <span className="font-medium text-brand-dark">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>
        
        <p className="text-sm text-brand-dark/60 mb-6 flex-grow">
          {product.description}
        </p>

        {/* 🔥 BUTTON */}
        <button 
          onClick={addToCart}
          className="w-full relative overflow-hidden group/btn bg-transparent border border-brand-dark/10 hover:border-brand-dark py-3.5 flex items-center justify-center transition-all duration-300"
        >
          <div className="absolute inset-0 w-0 bg-brand-dark transition-all duration-300 ease-out group-hover/btn:w-full"></div>

          <span className="relative flex items-center text-xs font-bold tracking-widest uppercase text-brand-dark group-hover/btn:text-white">
            <Plus size={14} className="mr-2" /> Add to Cart
          </span>
        </button>

      </div>
    </motion.div>
  );
};

export default ProductCard;