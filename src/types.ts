export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  isLimited?: boolean;
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

export type ThemeType = 'royal' | 'cyber' | 'crimson' | 'silver';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  primary: string;
  secondary: string;
  bg: string;
  heroImage: string;
  glow: string;
}

export interface LocalizationConfig {
  lang: string;
  currency: string;
  symbol: string;
  rate: number;
}
