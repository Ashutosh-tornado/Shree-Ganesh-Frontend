import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const ArrowRight = LucideIcons.ArrowRight || LucideIcons.ChevronRight;
  const ShieldCheck = LucideIcons.ShieldCheck;
  const Leaf = LucideIcons.Leaf;
  const Truck = LucideIcons.Truck;

  const [products, setProducts] = useState([]);

  // 🔥 FETCH PRODUCTS
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => {
        // only top 4 show
        setProducts(data.products.slice(0, 4));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="pt-24">

      {/* HERO */}
      <section className="min-h-[85vh] flex items-center justify-center bg-[#f4ebd8] text-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            Premium Dry Fruits
          </h1>

          <p className="mb-8">
            Fresh • Natural • Luxury
          </p>

          <Button to="/collection">
            Shop Now
          </Button>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-12 bg-white flex justify-center gap-12">
        <div className="text-center">
          <ShieldCheck /> <p>Premium</p>
        </div>
        <div className="text-center">
          <Leaf /> <p>Natural</p>
        </div>
        <div className="text-center">
          <Truck /> <p>Fast Delivery</p>
        </div>
      </section>

      {/* 🔥 FEATURED PRODUCTS */}
      <section className="py-20 px-6">
        <h2 className="text-3xl mb-8 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/collection">
            View All →
          </Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;