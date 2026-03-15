import { Product, Collection, ThemeConfig, LocalizationConfig } from './types';

export const PRODUCTS: Product[] = [
  // ... (keeping existing products)
  {
    id: '1',
    name: 'IRON CROWN HOODIE',
    price: 185,
    category: 'Oversized Hoodies',
    image: 'https://picsum.photos/seed/king-hoodie/800/1000',
    description: 'Heavyweight cotton hoodie with embroidered gold crown emblem and cyberpunk accents.',
    isLimited: true
  },
  {
    id: '2',
    name: 'DRAGON THRONE BOMBER',
    price: 450,
    category: 'Royal Armor',
    image: 'https://picsum.photos/seed/king-bomber/800/1000',
    description: 'Satin finish bomber jacket featuring a detailed mythological dragon back-piece.',
    isLimited: true
  },
  {
    id: '3',
    name: 'LEGACY CARGO V1',
    price: 220,
    category: 'Futuristic Cargo',
    image: 'https://picsum.photos/seed/king-cargo/800/1000',
    description: 'Multi-pocket tactical pants with reflective silver piping and reinforced knees.'
  },
  {
    id: '4',
    name: 'WARRIOR COMPRESSION TEE',
    price: 95,
    category: 'Athletic',
    image: 'https://picsum.photos/seed/king-tee/800/1000',
    description: 'Fitted athletic shirt with moisture-wicking technology and lion crest print.'
  },
  {
    id: '5',
    name: 'EMPIRE SNAPBACK',
    price: 65,
    category: 'Accessories',
    image: 'https://picsum.photos/seed/king-cap/800/1000',
    description: 'Premium wool cap with 3D gold embroidery of the King Legacy logo.'
  },
  {
    id: '6',
    name: 'ROYAL BLOODLINE JACKET',
    price: 380,
    category: 'Legendary Collection',
    image: 'https://picsum.photos/seed/king-jacket/800/1000',
    description: 'Deep crimson luxury streetwear jacket with silver hardware.'
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'iron-crown',
    title: 'THE IRON CROWN',
    subtitle: 'Rule the Streets',
    image: 'https://picsum.photos/seed/crown-collection/1200/800',
    tag: 'Limited Drop'
  },
  {
    id: 'dragon-throne',
    title: 'DRAGON THRONE',
    subtitle: 'Mythological Power',
    image: 'https://picsum.photos/seed/dragon-collection/1200/800',
    tag: 'New Season'
  },
  {
    id: 'legacy-kings',
    title: 'LEGACY OF KINGS',
    subtitle: 'Timeless Heritage',
    image: 'https://picsum.photos/seed/kings-collection/1200/800',
    tag: 'Essentials'
  }
];

export const THEMES: ThemeConfig[] = [
  {
    id: 'royal',
    name: 'Royal Gold',
    primary: '#D4AF37',
    secondary: '#4B0082',
    bg: '#050505',
    heroImage: 'https://picsum.photos/seed/king-hero-royal/1920/1080',
    glow: 'rgba(212, 175, 55, 0.5)'
  },
  {
    id: 'cyber',
    name: 'Cyber Neon',
    primary: '#00F0FF',
    secondary: '#FF00FF',
    bg: '#0A0A0F',
    heroImage: 'https://picsum.photos/seed/king-hero-cyber/1920/1080',
    glow: 'rgba(0, 240, 255, 0.5)'
  },
  {
    id: 'crimson',
    name: 'Blood Empire',
    primary: '#990000',
    secondary: '#1A1A1A',
    bg: '#080000',
    heroImage: 'https://picsum.photos/seed/king-hero-crimson/1920/1080',
    glow: 'rgba(153, 0, 0, 0.5)'
  },
  {
    id: 'silver',
    name: 'Silver Knight',
    primary: '#C0C0C0',
    secondary: '#333333',
    bg: '#111111',
    heroImage: 'https://picsum.photos/seed/king-hero-silver/1920/1080',
    glow: 'rgba(192, 192, 192, 0.5)'
  }
];

export const LOCALIZATION_MAP: Record<string, LocalizationConfig> = {
  'US': { lang: 'en', currency: 'USD', symbol: '$', rate: 1 },
  'GB': { lang: 'en', currency: 'GBP', symbol: '£', rate: 0.8 },
  'FR': { lang: 'fr', currency: 'EUR', symbol: '€', rate: 0.95 },
  'DE': { lang: 'de', currency: 'EUR', symbol: '€', rate: 0.95 },
  'ZA': { lang: 'en', currency: 'ZAR', symbol: 'R', rate: 19 },
  'JP': { lang: 'ja', currency: 'JPY', symbol: '¥', rate: 150 },
  'DEFAULT': { lang: 'en', currency: 'USD', symbol: '$', rate: 1 }
};
