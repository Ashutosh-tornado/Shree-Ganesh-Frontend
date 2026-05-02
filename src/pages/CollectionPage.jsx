import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

const sortOptions = [
  { value: 'popular', label: 'Popular' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
];

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await fetch('http://localhost:5000/products');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || 'Failed to load products');
        }

        setProducts(Array.isArray(data.products) ? data.products : []);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category).filter(Boolean))];
    return ['All', ...uniqueCategories];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
      default:
        break;
    }

    return result;
  }, [products, activeCategory, sortBy]);

  const currentSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label || 'Popular';

  return (
    <div className="min-h-screen bg-[#f7f1dd] text-[#3b1f1b]">
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8a6a5c]">
            Premium Dry Fruits
          </p>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl text-[#3b1f1b]">
            The Collection
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-sm md:text-lg leading-8 text-[#6d5348]">
            Discover our meticulously curated selection of premium nuts and dry fruits,
            sourced for freshness, quality, and gifting.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {['Freshly Packed', 'Pan India Delivery', '100% Quality Checked'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#d7c6a3] bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#6d5348]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-30 border-y border-[#d9c7a7]/50 bg-[#f7f1dd]/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="relative w-full lg:w-auto">
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="flex w-full items-center justify-between gap-4 border border-[#d6c6a6] bg-white px-5 py-3 text-sm font-medium text-[#3b1f1b] shadow-sm transition hover:bg-[#f9f4e6] lg:w-auto"
            >
              <span>Sort by: {currentSortLabel}</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full z-40 mt-2 w-full overflow-hidden border border-[#e0d0b1] bg-white shadow-xl lg:w-64"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full px-5 py-3 text-left text-sm transition hover:bg-[#f9f4e6] ${
                        sortBy === option.value ? 'bg-[#f4ebd8] font-semibold' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-[#6d5348]" />
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6 flex items-center justify-between text-sm text-[#7b5b4f]">
              <p>{filteredAndSortedProducts.length} products</p>
              <p className="hidden sm:block">Curated premium selection</p>
            </div>

            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, scale: 0.96, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-24 text-center">
                <p className="text-lg text-[#7b5b4f]">
                  No products found in this category.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default CollectionPage;