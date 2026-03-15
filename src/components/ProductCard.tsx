import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Plus } from 'lucide-react';
import { useAppContext } from '../AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice } = useAppContext();

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="aspect-[3/4] overflow-hidden bg-zinc-900 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {product.isLimited && (
          <div className="absolute top-4 left-4 bg-crimson text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
            Limited Drop
          </div>
        )}

        <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="bg-white text-ink p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Plus size={24} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="font-display text-sm tracking-wider uppercase group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">
            {product.category}
          </p>
        </div>
        <span className="font-display font-bold text-gold">
          {formatPrice(product.price)}
        </span>
      </div>
    </motion.div>
  );
};
