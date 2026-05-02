import React from 'react';
import { cn } from '../utils';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-6 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 rounded-sm relative overflow-hidden group",
            activeCategory === category
              ? "bg-brand-dark text-brand-light shadow-[0_4px_10px_rgba(0,0,0,0.1)] border border-brand-dark"
              : "bg-transparent text-brand-dark hover:text-white border border-brand-dark/20 hover:border-brand-dark"
          )}
        >
          {activeCategory !== category && (
            <div className="absolute inset-0 bg-brand-dark w-0 transition-all duration-300 ease-out group-hover:w-full"></div>
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
