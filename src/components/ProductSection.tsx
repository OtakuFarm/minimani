import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, TrendingUp, Flame, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { Product, CategoryFilter, OriginFilter, SortOption } from '../types';
import { ProductCard } from './ProductCard';
import { toPersianDigits } from '../utils/format';

interface ProductSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  activeCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  activeCategory,
  onSelectCategory
}) => {
  const [originFilter, setOriginFilter] = useState<OriginFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showAllGrid, setShowAllGrid] = useState(false);

  // Filter products
  const filteredProducts = products.filter((item) => {
    // Category filter
    if (activeCategory === 'girls' && item.category !== 'girls' && item.category !== 'unisex') return false;
    if (activeCategory === 'boys' && item.category !== 'boys' && item.category !== 'unisex') return false;
    if (activeCategory === 'baby' && item.category !== 'baby') return false;
    if (activeCategory === 'sale' && !item.originalPrice) return false;

    // Origin filter
    if (originFilter !== 'all' && item.origin !== originFilter) return false;

    return true;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    if (sortBy === 'bestselling') return b.salesCount - a.salesCount;
    if (sortBy === 'mostViewed') return b.viewsCount - a.viewsCount;
    if (sortBy === 'cheapest') return a.price - b.price;
    if (sortBy === 'expensive') return b.price - a.price;
    return 0;
  });

  // Specific curated shelves from prompt
  const newestProducts = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const girlsCollection = products.filter((p) => p.category === 'girls' || p.category === 'unisex');
  const boysCollection = products.filter((p) => p.category === 'boys' || p.category === 'unisex');

  const isWishlisted = (id: string) => wishlist.some((w) => w.id === id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* If a specific category tab is active or search active, show filtered catalogue */}
      {activeCategory !== 'all' ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <h2 className="text-2xl font-black text-stone-900 flex items-center gap-2">
                {activeCategory === 'girls' && '👧 کالکشن لباس دخترانه'}
                {activeCategory === 'boys' && '👦 کالکشن لباس پسرانه'}
                {activeCategory === 'baby' && '👶 کالکشن لباس نوزادی'}
                {activeCategory === 'sale' && '🔥 تخفیف‌ها و حراج ویژه'}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                نمایش {toPersianDigits(sortedProducts.length)} محصول باکیفیت ترک و وارداتی
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Origin toggle */}
              <div className="flex bg-stone-100 p-1 rounded-xl">
                <button
                  onClick={() => setOriginFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    originFilter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                  }`}
                >
                  همه مبداها
                </button>
                <button
                  onClick={() => setOriginFilter('ترک')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    originFilter === 'ترک' ? 'bg-rose-500 text-white shadow-xs' : 'text-stone-500'
                  }`}
                >
                  فقط ترک
                </button>
                <button
                  onClick={() => setOriginFilter('وارداتی')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    originFilter === 'وارداتی' ? 'bg-indigo-600 text-white shadow-xs' : 'text-stone-500'
                  }`}
                >
                  فقط وارداتی
                </button>
              </div>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-stone-100 border-none rounded-xl px-3 py-2 text-stone-700 font-semibold focus:ring-2 focus:ring-rose-400"
              >
                <option value="newest">مرتب‌سازی: جدیدترین‌ها</option>
                <option value="bestselling">پرفروش‌ترین‌ها</option>
                <option value="mostViewed">پربازدیدترین‌ها</option>
                <option value="cheapest">ارزان‌ترین</option>
                <option value="expensive">گران‌ترین</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isWishlisted={isWishlisted(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-16 text-stone-500">
              <p className="font-bold text-sm">موردی با فیلترهای انتخابی یافت نشد.</p>
              <button
                onClick={() => {
                  setOriginFilter('all');
                  onSelectCategory('all');
                }}
                className="mt-3 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold"
              >
                نمایش تمام محصولات
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Home Page Sections */
        <>
          {/* 1. جدیدترین محصولات (Newest Products) */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  <span>جدیدترین مدل‌های پاییزه و زمستانه</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  جدیدترین محصولات مینی‌مانی
                </h2>
              </div>

              <button
                onClick={() => setShowAllGrid(true)}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 bg-rose-50/80 hover:bg-rose-100 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <span>مشاهده همه</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {newestProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  isWishlisted={isWishlisted(product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </section>

          {/* 2. پرفروش‌ترین محصولات (Best Sellers) */}
          <section className="space-y-6 bg-gradient-to-tr from-amber-50/60 to-rose-50/30 p-6 sm:p-8 rounded-3xl border border-amber-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full mb-1">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>محبوب‌ترین انتخاب والدین</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  پرفروش‌ترین محصولات
                </h2>
              </div>

              <button
                onClick={() => {
                  setSortBy('bestselling');
                  setShowAllGrid(true);
                }}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-700 hover:text-rose-600 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-stone-200 transition-colors cursor-pointer"
              >
                <span>مشاهده پرفروش‌ها</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {bestSellers.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  isWishlisted={isWishlisted(product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </section>

          {/* 3. دخترانه (Girls Collection Highlight) */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full mb-1">
                  <span>👧 دنیای لباس دخترانه</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  کالکشن پرنسسی و اسپرت دخترانه
                </h2>
              </div>

              <button
                onClick={() => onSelectCategory('girls')}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <span>مشاهده همه دخترانه</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {girlsCollection.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  isWishlisted={isWishlisted(product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </section>

          {/* 4. پسرانه (Boys Collection Highlight) */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full mb-1">
                  <span>👦 دنیای لباس پسرانه</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  کالکشن اسپرت، هودی و ست پسرانه
                </h2>
              </div>

              <button
                onClick={() => onSelectCategory('boys')}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-sky-600 hover:text-sky-700 bg-sky-50 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <span>مشاهده همه پسرانه</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {boysCollection.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  isWishlisted={isWishlisted(product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </section>

          {/* Full Catalogue Section */}
          <section className="space-y-6 pt-6 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-stone-900">
                  تمامی محصولات فروشگاه مینی‌مانی
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  کیفیت عالی، دوخت تمیز، پارچه ارگانیک و قواره استاندارد
                </p>
              </div>

              {/* Origin toggle */}
              <div className="flex bg-stone-100 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setOriginFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    originFilter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                  }`}
                >
                  همه
                </button>
                <button
                  onClick={() => setOriginFilter('ترک')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    originFilter === 'ترک' ? 'bg-rose-500 text-white shadow-xs' : 'text-stone-500'
                  }`}
                >
                  فقط ترک
                </button>
                <button
                  onClick={() => setOriginFilter('وارداتی')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    originFilter === 'وارداتی' ? 'bg-indigo-600 text-white shadow-xs' : 'text-stone-500'
                  }`}
                >
                  فقط وارداتی
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  isWishlisted={isWishlisted(product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
