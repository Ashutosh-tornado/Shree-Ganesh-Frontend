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
    window.scrollTo(0, 0);
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

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C110F] pt-24 font-sans selection:bg-[#C5A365] selection:text-white">
      {/* HEADER SECTION */}
      <section className="pt-20 pb-16 px-6 relative overflow-hidden bg-[#1C110F] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C5A365]/10 to-transparent z-0 pointer-events-none" />
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="mx-auto max-w-4xl text-center relative z-10"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#C5A365]/50" />
            <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#C5A365] font-bold">
              Curated For You
            </p>
            <div className="w-12 h-[1px] bg-[#C5A365]/50" />
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8">
            The Collection
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-white/70 font-light">
            Discover our meticulously curated selection of premium nuts and dry fruits,
            sourced for freshness, quality, and luxury gifting.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {['Freshly Packed', 'Pan India Delivery', '100% Quality Checked'].map((item) => (
              <span
                key={item}
                className="rounded-sm border border-[#C5A365]/30 bg-white/5 backdrop-blur-md px-5 py-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#C5A365]"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FILTER & SORT BAR */}
      <section className="sticky top-[80px] md:top-[90px] z-30 border-b border-[#EAE3D2] bg-[#FDFBF7]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
        <div className="container mx-auto px-6 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between max-w-7xl">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="relative w-full lg:w-auto">
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="flex w-full items-center justify-between gap-6 border border-[#EAE3D2] bg-white px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-[#1C110F] transition-all duration-300 hover:border-[#C5A365] lg:w-auto rounded-sm group shadow-sm"
            >
              <span>Sort by: <span className="text-[#C5A365] ml-2">{currentSortLabel}</span></span>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={`transition-transform duration-500 text-[#C5A365] group-hover:text-[#1C110F] ${isSortOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full z-40 mt-2 w-full overflow-hidden border border-[#EAE3D2] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] lg:w-64 rounded-sm"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full px-6 py-4 text-left text-[11px] uppercase tracking-widest transition-colors duration-300 hover:bg-[#FDFBF7] ${
                        sortBy === option.value ? 'bg-[#FDFBF7] text-[#C5A365] font-bold' : 'text-[#1C110F]/70 font-semibold'
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

      {/* PRODUCTS GRID */}
      <section className="container mx-auto px-6 py-20 max-w-7xl min-h-[60vh]">
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 h-full">
            <div className="w-12 h-12 border-4 border-[#C5A365] border-t-transparent rounded-full animate-spin mb-6" />
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1C110F]/50">Loading Collection...</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-sm border border-red-200 bg-red-50 px-8 py-6 text-red-700 text-center max-w-2xl mx-auto shadow-sm">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12 flex items-center justify-between text-[10px] font-bold tracking-[0.2em] uppercase text-[#1C110F]/50 border-b border-[#EAE3D2] pb-6"
            >
              <p>{filteredAndSortedProducts.length} Exclusive Items</p>
              <p className="hidden sm:block text-[#C5A365]">100% Premium Quality</p>
            </motion.div>

            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 30 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-32 text-center flex flex-col items-center">
                <div className="w-24 h-24 bg-[#EAE3D2]/50 rounded-full flex items-center justify-center mb-8">
                  <span className="text-4xl">🍂</span>
                </div>
                <p className="font-serif text-3xl text-[#1C110F] mb-4">
                  No products found
                </p>
                <p className="text-[#1C110F]/60 font-light text-lg">
                  Try adjusting your filters to see more results.
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