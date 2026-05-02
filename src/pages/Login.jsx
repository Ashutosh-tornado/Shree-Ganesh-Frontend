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

      // 🔥 MOST IMPORTANT
      localStorage.setItem("token", data.token);

      alert("Login successful ✅");

      // 👉 redirect after login
      navigate("/collection");

    } catch (err) {
      console.error(err);
      alert(err.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light relative overflow-hidden pt-20">
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-dark/5 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md px-6 z-10"
      >
        <div className="bg-white/80 backdrop-blur-xl p-10 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-white rounded-sm text-center">
          
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-brand-accent font-medium mb-4 block">Welcome Back</span>
          <h2 className="text-3xl font-serif text-brand-dark mb-8">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="text-left space-y-1 group">
              <label className="text-[10px] font-sans uppercase tracking-widest text-brand-dark/60 font-semibold group-focus-within:text-brand-accent transition-colors">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border-b border-brand-dark/20 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-accent transition-colors placeholder:text-brand-dark/30 font-light"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="text-left space-y-1 group pb-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-sans uppercase tracking-widest text-brand-dark/60 font-semibold group-focus-within:text-brand-accent transition-colors">
                  Password
                </label>
                <a href="#" className="text-[10px] tracking-widest text-brand-dark/40 hover:text-brand-accent transition-colors">Forgot?</a>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent border-b border-brand-dark/20 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-accent transition-colors placeholder:text-brand-dark/30 font-light"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-dark text-white py-4 mt-8"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </Button>

          </form>

          <p className="mt-8 text-xs text-brand-dark/60 font-light">
            Don't have an account? <a href="#" className="font-medium text-brand-dark hover:text-brand-accent transition-colors">Create one</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;