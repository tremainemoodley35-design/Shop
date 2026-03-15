import React from 'react';
import { motion } from 'motion/react';
import { Collection } from '../types';

interface CollectionCardProps {
  collection: Collection;
  isLarge?: boolean;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection, isLarge }) => {
  return (
    <div className={`relative overflow-hidden group ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <img 
        src={collection.image} 
        alt={collection.title}
        className="w-full h-full object-cover aspect-square md:aspect-auto transition-transform duration-1000 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <span className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
          {collection.tag}
        </span>
        <h2 className={`font-display font-bold tracking-tighter leading-none mb-2 ${isLarge ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}>
          {collection.title}
        </h2>
        <p className="text-white/60 text-xs uppercase tracking-widest mb-6">
          {collection.subtitle}
        </p>
        <button className="text-white text-xs font-bold uppercase tracking-widest border-b border-white/20 pb-1 hover:border-gold hover:text-gold transition-all">
          Explore Collection
        </button>
      </div>
    </div>
  );
};

export const CollectionGrid: React.FC<{ collections: Collection[] }> = ({ collections }) => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <CollectionCard collection={collections[0]} isLarge />
        <CollectionCard collection={collections[1]} />
        <CollectionCard collection={collections[2]} />
      </div>
    </section>
  );
};
