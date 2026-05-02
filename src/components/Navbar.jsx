import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { cn } from '../utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const ShoppingBag = LucideIcons.ShoppingBag || LucideIcons.ShoppingBasket || LucideIcons.Briefcase;
  const Menu = LucideIcons.Menu || LucideIcons.Layout;
  const X = LucideIcons.X || LucideIcons.Plus;
  const Search = LucideIcons.Search || LucideIcons.ZoomIn;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Our Story', path: '/#story' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-brand-light/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        <button 
          className="md:hidden text-brand-dark"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-sm font-medium tracking-wide uppercase text-brand-dark hover:text-brand-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <Link to="/" className="text-center absolute left-1/2 -translate-x-1/2">
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-brand-dark">
            Shree Ganesh<br/>
            <span className="text-xs md:text-sm font-sans tracking-[0.3em] uppercase text-brand-accent font-normal block mt-1">Dry Fruits</span>
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          <button className="text-brand-dark hover:text-brand-accent transition-colors hidden sm:block">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link to="/cart" className="text-brand-dark hover:text-brand-accent transition-colors relative group">
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span className="absolute -top-1.5 -right-1.5 bg-brand-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </Link>
        </div>
      </div>

      <div 
        className={cn(
          "fixed inset-0 bg-brand-light z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center pt-20",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-2xl font-serif text-brand-dark hover:text-brand-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
