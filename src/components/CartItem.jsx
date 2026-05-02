import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, refreshCart }) => {

  const TOKEN = localStorage.getItem("token");

  // 🟡 GUEST CART UPDATE
  const updateGuestCart = (newQty) => {
    let cart = JSON.parse(localStorage.getItem("guestCart")) || [];

    cart = cart.map((cartItem) => {
      if (cartItem.productId._id === item.productId._id) {
        return { ...cartItem, quantity: newQty };
      }
      return cartItem;
    });

    localStorage.setItem("guestCart", JSON.stringify(cart));
    refreshCart();
  };

  const removeGuestItem = () => {
    let cart = JSON.parse(localStorage.getItem("guestCart")) || [];

    cart = cart.filter(
      (cartItem) => cartItem.productId._id !== item.productId._id
    );

    localStorage.setItem("guestCart", JSON.stringify(cart));
    refreshCart();
  };

  // ➕ Increase
  const increaseQty = async () => {
    if (!TOKEN) {
      updateGuestCart(item.quantity + 1);
      return;
    }

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

    refreshCart();
  };

  // ➖ Decrease
  const decreaseQty = async () => {
    if (item.quantity === 1) return;

    if (!TOKEN) {
      updateGuestCart(item.quantity - 1);
      return;
    }

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

  // ❌ Remove
  const removeItem = async () => {
    if (!TOKEN) {
      removeGuestItem();
      return;
    }

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
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-grow justify-between py-2">

        <div className="flex justify-between">
          <div>
            <h4 className="font-serif text-lg text-brand-dark">
              {item.productId.name}
            </h4>
            <p className="text-sm text-brand-dark/50">
              {item.productId.weight || '500g'}
            </p>
          </div>

          <button onClick={removeItem}>
            <X size={18} />
          </button>
        </div>

        <div className="flex justify-between mt-4">

          {/* Qty */}
          <div className="flex items-center border px-2">
            <button onClick={decreaseQty}><Minus size={14} /></button>
            <span className="px-3">{item.quantity}</span>
            <button onClick={increaseQty}><Plus size={14} /></button>
          </div>

          {/* Price */}
          <p>
            ₹{(item.productId.price * item.quantity).toLocaleString('en-IN')}
          </p>

        </div>
      </div>
    </div>
  );
};

export default CartItem;