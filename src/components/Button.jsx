import React from 'react';
import { cn } from '../utils'; // Assuming a utility for class merging, I'll create it
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className, to, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 ease-in-out tracking-wide uppercase";
  
  const variants = {
    primary: "bg-brand-dark text-brand-accent hover:bg-black hover:shadow-lg",
    secondary: "bg-transparent border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-accent",
    accent: "bg-brand-accent text-brand-dark hover:bg-[#b08d4f] hover:shadow-md",
    ghost: "bg-transparent text-brand-dark hover:text-brand-accent",
  };

  const classes = cn(baseStyles, variants[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
