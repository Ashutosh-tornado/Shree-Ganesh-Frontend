import React, { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import Button from '../components/Button';

const CartPage = () => {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH CART
  const fetchCart = async () => {
    try {
      const TOKEN = localStorage.getItem("token");

      if (!TOKEN) {
        console.log("No token ❌");
        setCartItems([]);
        return;
      }

      const res = await fetch("http://localhost:5000/cart", {
        headers: {
          "Authorization": "Bearer " + TOKEN
        }
      });

      const data = await res.json();

      console.log("CART DATA:", data); // 🔍 debug

      // ✅ FIX HERE (IMPORTANT)
      setCartItems(data.cart || []);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();

    // 🔥 Auto refresh when cart updates
    const handleCartUpdate = () => fetchCart();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // 💰 CALCULATIONS (safe)
  const subtotal = cartItems.reduce(
    (acc, item) => acc + ((item.productId?.price || 0) * item.quantity),
    0
  );

  const shipping = subtotal > 3000 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-light">
      <div className="container mx-auto px-6 md:px-12">

        <h1 className="text-4xl font-serif text-brand-dark mb-12">Your Bag</h1>

        {loading ? (
          <p>Loading...</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty 🛒</p>
        ) : (

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* LEFT */}
          <div className="flex-grow lg:w-2/3">
            <div className="border-t border-brand-dark/10">
              {cartItems.map((item) => (
                <CartItem 
                  key={item._id} 
                  item={item} 
                  refreshCart={fetchCart} 
                />
              ))}
            </div>

            <div className="mt-8">
              <Link to="/collection">
                Continue Shopping →
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 shadow sticky top-32">

              <h2 className="text-xl mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6 font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>

              <Button className="w-full">
                Pay Now 💰
              </Button>

              <div className="mt-4 text-xs flex items-center gap-2">
                <Lock size={12} />
                Secure Checkout
              </div>

            </div>
          </div>

        </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;