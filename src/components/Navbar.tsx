import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, Search, Crown, Palette, Shield } from 'lucide-react';
import { useAppContext } from '../AppContext';
import { THEMES } from '../constants';
import { ThemeType } from '../types';
import { Auth } from './Auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { AdminDashboard } from './AdminDashboard';

export const Navbar = () => {
  const { theme, setTheme } = useAppContext();
  const [showThemes, setShowThemes] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (u) {
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        setIsAdmin(userDoc.exists() && userDoc.data().role === 'admin');
      } else {
        setIsAdmin(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between glass-morphism">
        <div className="flex items-center gap-8">
          <button className="text-white hover:text-gold transition-colors">
            <Menu size={24} />
          </button>
          <div className="hidden md:flex gap-6 text-xs font-display tracking-widest uppercase">
            <a href="#" className="hover:text-gold transition-colors">Collections</a>
            <a href="#" className="hover:text-gold transition-colors">New Drops</a>
            <div className="relative">
              <button 
                onClick={() => setShowThemes(!showThemes)}
                className="hover:text-gold transition-colors flex items-center gap-2"
              >
                <Palette size={14} />
                Themes
              </button>
              <AnimatePresence>
                {showThemes && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-4 p-4 glass-morphism min-w-[200px] flex flex-col gap-2"
                  >
                    {THEMES.map(t => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id as ThemeType);
                          setShowThemes(false);
                        }}
                        className={`text-left text-[10px] uppercase tracking-widest p-2 hover:bg-white/10 transition-colors flex items-center justify-between ${theme.id === t.id ? 'text-gold' : ''}`}
                      >
                        {t.name}
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.primary }}></div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {isAdmin && (
              <button 
                onClick={() => setShowAdmin(true)}
                className="text-crimson hover:text-white transition-colors flex items-center gap-2"
              >
                <Shield size={14} />
                Admin
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Crown className="text-gold" size={28} />
          <span className="font-display font-bold text-xl tracking-tighter gold-glow">
            KING LEGACY
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button className="hidden sm:block text-white hover:text-gold transition-colors">
            <Search size={20} />
          </button>
          <Auth />
          <button className="text-white hover:text-gold transition-colors relative">
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-gold text-ink text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </nav>

      {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}
    </>
  );
};
