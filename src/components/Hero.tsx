import React from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../AppContext';

export const Hero = () => {
  const { theme } = useAppContext();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          key={theme.heroImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
          src={theme.heroImage} 
          alt="Hero" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-transparent to-ink"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-gold font-display text-sm tracking-[0.3em] uppercase">
            The Crown Chooses You
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-8 gold-glow"
        >
          RULE THE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold">GAME</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="px-10 py-4 bg-gold text-ink font-display font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm">
            Shop Collection
          </button>
          <button className="px-10 py-4 border border-white/20 hover:border-gold transition-all duration-300 font-display font-bold uppercase tracking-widest rounded-sm">
            View Lookbook
          </button>
        </motion.div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <div className="w-[1px] h-20 bg-gradient-to-b from-gold to-transparent"></div>
        <span className="text-[10px] uppercase tracking-[0.5em] vertical-rl">Scroll</span>
      </div>
    </section>
  );
};
