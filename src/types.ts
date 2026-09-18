export interface Product {
  id: string;
  name: string;
  category: 'girls' | 'boys' | 'unisex' | 'baby';
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
  origin: 'ترک' | 'وارداتی';
  ageRange: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  material: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  viewsCount: number;
  salesCount: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export type CategoryFilter = 'all' | 'girls' | 'boys' | 'baby' | 'sale';
export type OriginFilter = 'all' | 'ترک' | 'وارداتی';
export type SortOption = 'newest' | 'bestselling' | 'mostViewed' | 'cheapest' | 'expensive';

export interface SizeRecommendation {
  ageLabel: string;
  suggestedSize: string;
  heightRange: string;
  chest: string;
  waist: string;
}
