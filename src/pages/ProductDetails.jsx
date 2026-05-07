import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, ShieldCheck, Truck } from "lucide-react";

import toast from "react-hot-toast";

const ProductDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [selectedWeight, setSelectedWeight] = useState("500g");

  useEffect(() => {

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

        toast.error("Please login first 🔐");

        setTimeout(() => {
          navigate("/login");
        }, 800);

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

      // 🚀 REDIRECT TO CART
      setTimeout(() => {
        navigate("/cart");
      }, 800);

    } catch (err) {

      console.log(err);

      toast.error("Error adding to cart ❌");

    }

  };

  if (!product) {

    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-serif">Loading...</h1>
      </div>
    );

  }

  return (

    <div className="pt-32 pb-20 px-6 bg-[#f8f5ef] min-h-screen">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

        {/* LEFT IMAGE */}
        <div className="sticky top-32">

          <div className="bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover hover:scale-105 transition-transform duration-700"
            />

          </div>

        </div>

        {/* RIGHT DETAILS */}
        <div>

          <p className="uppercase tracking-[0.3em] text-xs text-brand-accent font-semibold mb-4">
            Premium Dry Fruits
          </p>

          <h1 className="text-4xl md:text-5xl font-serif text-brand-dark leading-tight mb-6">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">

            <p className="text-3xl font-bold text-brand-accent">
              ₹{product.price}
            </p>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              In Stock
            </span>

          </div>

          <p className="text-brand-dark/70 leading-relaxed text-lg mb-10">
            {product.description}
          </p>

          {/* WEIGHT */}
          <div className="mb-10">

            <h3 className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-brand-dark">
              Select Weight
            </h3>

            <div className="flex flex-wrap gap-4">

              {["250g", "500g", "1kg"].map((weight) => (

                <button
                  key={weight}
                  onClick={() => setSelectedWeight(weight)}
                  className={`px-6 py-3 rounded-full border transition-all duration-300 text-sm font-medium
                  
                  ${
                    selectedWeight === weight
                      ? "bg-brand-dark text-white border-brand-dark shadow-lg"
                      : "bg-white border-gray-300 text-brand-dark hover:border-brand-dark"
                  }
                  
                  `}
                >
                  {weight}
                </button>

              ))}

            </div>

          </div>

          {/* QUANTITY */}
          <div className="mb-10">

            <h3 className="text-sm uppercase tracking-[0.2em] font-semibold mb-4 text-brand-dark">
              Quantity
            </h3>

            <div className="flex items-center gap-5">

              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white">

                <button
                  onClick={() =>
                    setQuantity(prev => prev > 1 ? prev - 1 : 1)
                  }
                  className="w-14 h-14 flex items-center justify-center hover:bg-gray-100 transition"
                >
                  <Minus size={18} />
                </button>

                <span className="w-14 text-center font-semibold text-lg">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-14 h-14 flex items-center justify-center hover:bg-gray-100 transition"
                >
                  <Plus size={18} />
                </button>

              </div>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">

            <button
              onClick={addToCart}
              className="flex-1 bg-brand-dark text-white py-5 rounded-full text-sm uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition shadow-lg"
            >
              Add To Cart
            </button>

            <button
              className="flex-1 border border-brand-dark text-brand-dark py-5 rounded-full text-sm uppercase tracking-[0.2em] font-semibold hover:bg-brand-dark hover:text-white transition"
            >
              Buy Now
            </button>

          </div>

          {/* FEATURES */}
          <div className="space-y-5 border-t border-gray-200 pt-10">

            <div className="flex items-center gap-4">

              <Truck className="text-brand-accent" />

              <div>
                <h4 className="font-semibold text-brand-dark">
                  Free Delivery
                </h4>

                <p className="text-sm text-brand-dark/60">
                  Fast delivery across India
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <ShieldCheck className="text-brand-accent" />

              <div>
                <h4 className="font-semibold text-brand-dark">
                  Premium Quality
                </h4>

                <p className="text-sm text-brand-dark/60">
                  Handpicked luxury dry fruits
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default ProductDetails;