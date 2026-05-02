import React from 'react';
import { cn } from '../utils';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className, to, ...props }) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] transition-all duration-500 ease-out uppercase rounded-sm overflow-hidden group";
  
  const variants = {
    primary: "bg-brand-dark text-white hover:bg-brand-accent hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]",
    secondary: "bg-transparent border border-brand-dark/20 text-brand-dark hover:border-brand-dark hover:bg-brand-dark hover:text-white",
    accent: "bg-brand-accent text-brand-dark hover:bg-brand-dark hover:text-white hover:shadow-md",
    ghost: "bg-transparent text-brand-dark hover:text-brand-accent",
  };

  const classes = cn(baseStyles, variants[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        <span className="relative z-10 flex items-center justify-center">{children}</span>
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </button>
  );
};

export default Button;
