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
    <div className="flex gap-8 py-10 group relative">

      {/* Image */}
      <Link to={`/product/${item.productId._id}`} className="shrink-0 w-32 h-40 md:w-40 md:h-48 bg-white border border-[#EAE3D2] overflow-hidden relative rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EAE3D2]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <img 
          src={item.productId.image} 
          alt={item.productId.name} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-1000 ease-out group-hover:scale-110 drop-shadow-md"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-grow justify-between py-2">

        <div className="flex justify-between items-start gap-4">
          <div>
            <Link to={`/product/${item.productId._id}`}>
              <h4 className="font-serif text-xl md:text-2xl text-[#1C110F] mb-1 group-hover:text-[#C5A365] transition-colors duration-300">
                {item.productId.name}
              </h4>
            </Link>
            <p className="text-xs uppercase tracking-widest font-bold text-[#1C110F]/50 mt-2">
              {item.weight || '500g'}
            </p>
          </div>

          <button 
            onClick={removeItem}
            className="text-[#1C110F]/40 hover:text-red-500 transition-colors p-2 -mr-2"
            title="Remove item"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-6">

          {/* Qty */}
          <div className="flex items-center border border-[#EAE3D2] bg-white rounded-sm h-10 overflow-hidden shadow-sm">
            <button 
              onClick={decreaseQty}
              className="w-10 h-full flex items-center justify-center text-[#1C110F]/50 hover:text-[#C5A365] hover:bg-[#FDFBF7] transition-colors"
            >
              <Minus size={14} strokeWidth={2} />
            </button>
            <span className="w-10 text-center font-sans text-xs font-bold text-[#1C110F]">
              {item.quantity}
            </span>
            <button 
              onClick={increaseQty}
              className="w-10 h-full flex items-center justify-center text-[#1C110F]/50 hover:text-[#C5A365] hover:bg-[#FDFBF7] transition-colors"
            >
              <Plus size={14} strokeWidth={2} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-xs text-[#1C110F]/50 line-through mb-1">
              ₹{((item.productId.price + 500) * item.quantity).toLocaleString('en-IN')}
            </p>
            <p className="text-xl font-serif text-[#1C110F]">
              ₹{(item.productId.price * item.quantity).toLocaleString('en-IN')}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartItem;