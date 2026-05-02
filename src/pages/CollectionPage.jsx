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

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark pt-24">
      <section className="pt-20 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EAE3D2]/50 to-transparent z-0 pointer-events-none" />
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="mx-auto max-w-4xl text-center relative z-10"
        >
          <p className="text-xs font-sans uppercase tracking-[0.4em] text-brand-accent font-medium mb-4">
            Curated For You
          </p>
          <h1 className="mt-2 font-serif text-5xl md:text-7xl text-brand-dark leading-tight">
            The Collection
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-brand-dark/70 font-light">
            Discover our meticulously curated selection of premium nuts and dry fruits,
            sourced for freshness, quality, and luxury gifting.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {['Freshly Packed', 'Pan India Delivery', '100% Quality Checked'].map((item) => (
              <span
                key={item}
                className="rounded-sm border border-brand-accent/20 bg-white/40 backdrop-blur-sm px-5 py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-brand-dark"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="sticky top-[88px] md:top-[104px] z-30 border-y border-brand-accent/10 bg-brand-light/95 backdrop-blur-xl shadow-sm">
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
              className="flex w-full items-center justify-between gap-6 border border-brand-accent/20 bg-white px-6 py-3 text-sm font-medium text-brand-dark transition-all duration-300 hover:border-brand-accent lg:w-auto rounded-sm group"
            >
              <span className="tracking-wide">Sort by: <span className="font-semibold">{currentSortLabel}</span></span>
              <ChevronDown
                size={16}
                strokeWidth={1.5}
                className={`transition-transform duration-500 text-brand-accent group-hover:text-brand-dark ${isSortOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full z-40 mt-2 w-full overflow-hidden border border-brand-accent/20 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] lg:w-64 rounded-sm"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full px-6 py-4 text-left text-sm transition-colors duration-300 hover:bg-brand-light/50 tracking-wide ${
                        sortBy === option.value ? 'bg-brand-light text-brand-accent font-semibold' : 'text-brand-dark/80'
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

      <section className="container mx-auto px-6 py-16 max-w-7xl min-h-[50vh]">
        {loading && (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-10 w-10 animate-spin text-brand-accent" />
          </div>
        )}

        {!loading && error && (
          <div className="rounded-sm border border-red-200 bg-red-50/50 px-8 py-6 text-red-700 text-center max-w-2xl mx-auto backdrop-blur-sm">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-10 flex items-center justify-between text-xs font-bold tracking-[0.1em] uppercase text-brand-dark/50 border-b border-brand-accent/10 pb-4"
            >
              <p>{filteredAndSortedProducts.length} items</p>
              <p className="hidden sm:block">100% Premium Quality</p>
            </motion.div>

            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-32 text-center flex flex-col items-center">
                <p className="font-serif text-2xl text-brand-dark mb-4">
                  No products found
                </p>
                <p className="text-brand-dark/60 font-light">
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