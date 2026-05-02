import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import CartPage from './pages/CartPage';

import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';

function App() {
  return (
    <Router>

      <ScrollToTop />

      <div className="flex flex-col min-h-screen bg-brand-light">

        <Navbar />

        <main className="flex-grow">
          <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/collection" element={<CollectionPage />} />

            {/* 🔐 Protected */}
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              } 
            />

            {/* 🔥 Future ready */}
            <Route path="/login" element={<Login></Login>} />
            <Route path="/success" element={<div>Payment Success 🎉</div>} />

          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;