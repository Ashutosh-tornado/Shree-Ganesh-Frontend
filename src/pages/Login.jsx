import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // 🔥 Save token
      localStorage.setItem("token", data.token);

      // 🔥 CART SYNC (VERY IMPORTANT)
      const guestCart = JSON.parse(localStorage.getItem("guestCart"));

      if (guestCart && guestCart.length > 0) {
        for (let item of guestCart) {
          await fetch("http://localhost:5000/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${data.token}`
            },
            body: JSON.stringify({
              productId: item.productId._id,
              quantity: item.quantity
            })
          });
        }

        // 🧹 Clear guest cart
        localStorage.removeItem("guestCart");
      }

      alert("Login successful ✅");

      // 👉 redirect after login
      navigate("/cart");

    } catch (err) {
      console.error(err);
      alert(err.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light relative overflow-hidden pt-20">
      
      {/* Background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-dark/5 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-6 z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl p-10 md:p-12 shadow-lg border rounded-sm text-center">
          
          <span className="text-[10px] tracking-[0.3em] uppercase text-brand-accent mb-4 block">
            Welcome Back
          </span>

          <h2 className="text-3xl font-serif mb-8">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            
            <input
              type="email"
              placeholder="Email"
              className="w-full border-b py-3 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border-b py-3 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-dark text-white py-4 mt-6"
            >
              {loading ? "Logging in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-8 text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-brand-accent cursor-pointer"
            >
              Create one
            </span>
          </p>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;