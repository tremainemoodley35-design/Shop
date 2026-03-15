import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CollectionGrid } from './components/CollectionSection';
import { Footer } from './components/Footer';
import { PRODUCTS, COLLECTIONS } from './constants';
import { Crown } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-ink selection:bg-gold selection:text-ink">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-ink flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center gap-4"
            >
              <Crown className="text-gold" size={64} />
              <h1 className="text-4xl font-display font-bold tracking-[0.5em] gold-glow">
                KING LEGACY
              </h1>
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden mt-4">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gold"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />

        {/* Collections Section */}
        <CollectionGrid collections={COLLECTIONS} />

        {/* Featured Products */}
        <section className="py-24 px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
                  New Arrivals
                </span>
                <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">
                  LEGENDARY <br /> COLLECTION
                </h2>
              </div>
              <button className="text-xs font-bold uppercase tracking-widest border-b-2 border-gold pb-2 hover:text-gold transition-colors">
                View All Products
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Brand Statement */}
        <section className="py-48 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-white whitespace-nowrap select-none">
              KING LEGACY KING LEGACY
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif italic mb-8 leading-tight">
                "True power isn't inherited. It's built through the legacy you leave behind in the streets."
              </h2>
              <div className="w-12 h-[1px] bg-gold mx-auto mb-8"></div>
              <p className="text-gold font-display text-sm tracking-[0.5em] uppercase">
                Legacy Never Dies
              </p>
            </motion.div>
          </div>
        </section>

        {/* Limited Drop Teaser */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto glass-morphism p-12 md:p-24 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <div className="w-24 h-24 border border-gold/20 rounded-full flex items-center justify-center animate-spin-slow">
                <span className="text-[8px] text-gold uppercase tracking-widest">Limited • Drop • 100 • Pieces •</span>
              </div>
            </div>

            <div className="max-w-2xl">
              <span className="text-crimson text-xs font-bold uppercase tracking-[0.3em] mb-6 block">
                Next Drop: 03.25.26
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8">
                THE ROYAL <br /> BLOODLINE
              </h2>
              <p className="text-white/60 text-lg mb-12 leading-relaxed">
                Our most exclusive drop yet. Only 100 pieces worldwide. 
                Hand-crafted luxury meets futuristic warrior aesthetics.
              </p>
              <button className="px-12 py-5 bg-white text-ink font-display font-bold uppercase tracking-widest hover:bg-gold transition-all">
                Get Early Access
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
