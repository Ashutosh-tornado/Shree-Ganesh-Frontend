import React from 'react';
import { cn } from '../utils';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-full",
            activeCategory === category
              ? "bg-brand-dark text-white shadow-md"
              : "bg-white text-brand-dark hover:bg-brand-dark/5 border border-brand-dark/10"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
