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
    <div className="flex gap-6 py-8 border-b border-brand-dark/10">

      {/* Image */}
      <Link to="#" className="shrink-0 w-24 h-32 md:w-32 md:h-40 bg-[#f9f8f6] overflow-hidden">
        <img 
          src={item.productId.image} 
          alt={item.productId.name} 
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-grow justify-between py-1">

        <div className="flex justify-between items-start gap-4">
          <div>
            <h4 className="font-serif text-lg text-brand-dark">
              {item.productId.name}
            </h4>
            <p className="text-sm text-brand-dark/50 mt-1">
              {item.productId.weight || '500g'}
            </p>
          </div>

          <button onClick={removeItem} className="text-red-500">
            <X size={20} />
          </button>
        </div>

        <div className="flex justify-between items-end mt-4">

          {/* Quantity */}
          <div className="flex items-center border border-brand-dark/20">
            <button onClick={decreaseQty} className="w-8 h-8 flex items-center justify-center">
              <Minus size={14} />
            </button>

            <span className="w-8 text-center">
              {item.quantity}
            </span>

            <button onClick={increaseQty} className="w-8 h-8 flex items-center justify-center">
              <Plus size={14} />
            </button>
          </div>

          {/* Price */}
          <p className="font-medium">
            ₹{(item.productId.price * item.quantity).toLocaleString('en-IN')}
          </p>

        </div>
      </div>
    </div>
  );
};

export default CartItem;