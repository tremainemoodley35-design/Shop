import React from 'react';
import { Crown, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-ink border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Crown className="text-gold" size={32} />
            <span className="font-display font-bold text-2xl tracking-tighter gold-glow">
              KING LEGACY
            </span>
          </div>
          <p className="text-white/40 max-w-sm text-sm leading-relaxed">
            The ultimate fusion of royal power, futuristic street culture, and mythological influence. 
            Designed for modern kings, champions, and visionaries.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-xs uppercase tracking-widest mb-6">Navigation</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><a href="#" className="hover:text-gold transition-colors">Collections</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">New Drops</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Limited Edition</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">About the Brand</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-xs uppercase tracking-widest mb-6">Connect</h4>
          <div className="flex gap-6 mb-8">
            <a href="#" className="text-white/60 hover:text-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-white/60 hover:text-gold transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-white/60 hover:text-gold transition-colors"><Youtube size={20} /></a>
          </div>
          <h4 className="font-display font-bold text-xs uppercase tracking-widest mb-4">Newsletter</h4>
          <div className="flex border-b border-white/20 pb-2">
            <input 
              type="email" 
              placeholder="JOIN THE LEGACY" 
              className="bg-transparent border-none outline-none text-xs w-full uppercase tracking-widest"
            />
            <button className="text-gold text-xs font-bold">JOIN</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-[10px] text-white/20 uppercase tracking-[0.2em]">
        <p>© 2026 KING LEGACY. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Shipping & Returns</a>
        </div>
      </div>
    </footer>
  );
};
