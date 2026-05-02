import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const Footer = () => {
  const Instagram = LucideIcons.Instagram || LucideIcons.Camera;
  const Facebook = LucideIcons.Facebook || LucideIcons.Share2;
  const Twitter = LucideIcons.Twitter || LucideIcons.Bird;
  const MapPin = LucideIcons.MapPin || LucideIcons.Pin;
  const Phone = LucideIcons.Phone || LucideIcons.PhoneCall;
  const Mail = LucideIcons.Mail || LucideIcons.Inbox;

  return (
    <footer className="bg-brand-dark text-brand-light pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-brand-accent mb-4">Shree Ganesh</h2>
            <p className="text-sm text-brand-light/80 leading-relaxed max-w-xs">
              Curating the finest, premium dry fruits and nuts from around the world. Elevate your daily nutrition with our luxury selection.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-brand-light/20 flex items-center justify-center text-brand-light hover:bg-brand-accent hover:border-brand-accent transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-light/20 flex items-center justify-center text-brand-light hover:bg-brand-accent hover:border-brand-accent transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-light/20 flex items-center justify-center text-brand-light hover:bg-brand-accent hover:border-brand-accent transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans text-sm font-semibold tracking-wider uppercase text-brand-light mb-6">Explore</h3>
            <ul className="space-y-4">
              <li><Link to="/collection" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors">Our Collection</Link></li>
              <li><Link to="/#story" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors">Heritage & Story</Link></li>
              <li><Link to="#" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors">Corporate Gifting</Link></li>
              <li><Link to="#" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-sans text-sm font-semibold tracking-wider uppercase text-brand-light mb-6">Customer Care</h3>
            <ul className="space-y-4">
              <li><Link to="#" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors">Track Order</Link></li>
              <li><Link to="#" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors">Shipping & Returns</Link></li>
              <li><Link to="#" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors">FAQ</Link></li>
              <li><Link to="#" className="text-sm text-brand-light/70 hover:text-brand-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-sans text-sm font-semibold tracking-wider uppercase text-brand-light mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-accent shrink-0 mt-0.5" />
                <span className="text-sm text-brand-light/70">123 Luxury Avenue, Fort, Mumbai 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-accent shrink-0" />
                <span className="text-sm text-brand-light/70">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-accent shrink-0" />
                <span className="text-sm text-brand-light/70">concierge@shreeganesh.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-light/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-light/50">
            &copy; {new Date().getFullYear()} Shree Ganesh Dry Fruits. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-brand-light/50">
            <Link to="#" className="hover:text-brand-light transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-brand-light transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
