import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import CartPage from './pages/CartPage';

import ScrollToTop from './components/ScrollToTop';

import Login from './pages/Login';
import Signup from "./pages/Signup";
import Success from "./pages/Success";

import { Toaster } from "react-hot-toast";


import Orders from "./pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";

import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Router>

      <ScrollToTop />

      <div className="flex flex-col min-h-screen bg-brand-light">

        <Navbar />

        <Toaster position="top-right"

          toastOptions={{
            style: {
              background: "#2f1b14",
              color: "#fff",
              fontSize: "14px",
              borderRadius: "8px"
            },
            success: {
              iconTheme: {
                primary: "#d4a373",
                secondary: "#fff"
              }
            }
          }}

        />

        <main className="flex-grow">
          <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/collection" element={<CollectionPage />} />

            {/* 🛒 Cart is now PUBLIC (Guest + Logged in both) */}
            <Route path="/cart" element={<CartPage />} />

            {/* 🔐 Auth pages */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route path="/product/:id" element={<ProductDetails />} />

            {/* 📦 Orders (IMPORTANT 🔥) */}
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />

            <Route path="/success" element={<Success />} />

            {/* ✅ Payment success */}
            <Route path="/success" element={<div>Payment Success 🎉</div>} />

          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;