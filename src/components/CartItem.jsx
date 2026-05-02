import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, refreshCart }) => {

  const TOKEN = localStorage.getItem("token");

  // ➕ Increase quantity
  const increaseQty = async () => {
    await fetch(`http://localhost:5000/cart/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + TOKEN
      },
      body: JSON.stringify({
        quantity: item.quantity + 1
      })
    });

    refreshCart(); // 🔥 re-fetch cart
  };

  // ➖ Decrease quantity
  const decreaseQty = async () => {
    if (item.quantity === 1) return;

    await fetch(`http://localhost:5000/cart/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + TOKEN
      },
      body: JSON.stringify({
        quantity: item.quantity - 1
      })
    });

    refreshCart();
  };

  // ❌ Remove item
  const removeItem = async () => {
    await fetch(`http://localhost:5000/cart/${item._id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + TOKEN
      }
    });

    refreshCart();
  };

  return (
    <div className="flex gap-6 py-10 group">

      {/* Image */}
      <Link to="#" className="shrink-0 w-28 h-36 md:w-40 md:h-48 bg-[#f4f1eb] overflow-hidden relative">
        <img 
          src={item.productId.image} 
          alt={item.productId.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-grow justify-between py-2">

        <div className="flex justify-between items-start gap-4">
          <div>
            <Link to="#">
              <h4 className="font-serif text-lg md:text-xl text-brand-dark hover:text-brand-accent transition-colors duration-300">
                {item.productId.name}
              </h4>
            </Link>
            <p className="text-xs md:text-sm text-brand-dark/50 mt-2 font-light">
              Weight: {item.productId.weight || '500g'}
            </p>
          </div>

          <button 
            onClick={removeItem} 
            className="text-brand-dark/40 hover:text-red-500 transition-colors duration-300 p-2 -mr-2 hover:bg-red-50 rounded-full"
            aria-label="Remove item"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mt-6">

          {/* Quantity */}
          <div className="flex items-center border border-brand-accent/20 bg-white shadow-sm rounded-sm">
            <button 
              onClick={decreaseQty} 
              className="w-10 h-10 flex items-center justify-center text-brand-dark/60 hover:text-brand-dark hover:bg-brand-light/50 transition-colors"
            >
              <Minus size={14} />
            </button>

            <span className="w-10 text-center text-sm font-medium text-brand-dark">
              {item.quantity}
            </span>

            <button 
              onClick={increaseQty} 
              className="w-10 h-10 flex items-center justify-center text-brand-dark/60 hover:text-brand-dark hover:bg-brand-light/50 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-sans font-semibold text-brand-accent text-lg">
              ₹{(item.productId.price * item.quantity).toLocaleString('en-IN')}
            </p>
            {item.quantity > 1 && (
              <p className="text-[10px] text-brand-dark/40 mt-1 uppercase tracking-widest">
                ₹{item.productId.price.toLocaleString('en-IN')} each
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartItem;