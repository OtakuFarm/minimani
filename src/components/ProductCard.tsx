import React from 'react';
import { Heart, Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, toPersianDigits } from '../utils/format';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0]?.name || '';
    onAddToCart(product, defaultSize, defaultColor);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-2xl border border-stone-200/80 hover:border-rose-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Image Container */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-stone-100">
        <SafeImage
          src={product.image}
          alt={product.name}
          fallbackLabel={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 items-end z-10">
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs ${
              product.origin === 'ترک'
                ? 'bg-rose-500 text-white'
                : 'bg-indigo-600 text-white'
            }`}
          >
            {product.origin}
          </span>
          {discountPercent > 0 && (
            <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-amber-400 text-stone-900 shadow-xs">
              {toPersianDigits(discountPercent)}٪ تخفیف
            </span>
          )}
          {product.isNew && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500 text-white shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              جدید
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 left-2.5 p-2 rounded-full transition-all duration-200 shadow-xs z-10 ${
            isWishlisted
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white/90 text-stone-600 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 justify-center z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-white/95 hover:bg-white text-stone-800 text-xs font-bold py-2 px-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 backdrop-blur-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-rose-500" />
            <span>مشاهده جزئیات</span>
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between text-right">
        <div>
          {/* Age range & category badge */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
            <span className="font-medium bg-stone-100 px-2 py-0.5 rounded-md">
              رده سنی: {product.ageRange}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <span>{toPersianDigits(product.rating)}</span>
              <Star className="w-3 h-3 fill-amber-400" />
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-sm sm:text-base text-stone-900 line-clamp-1 group-hover:text-rose-600 transition-colors">
            {product.name}
          </h3>

          {/* Material note */}
          <p className="text-xs text-stone-500 line-clamp-1 mt-1 font-light">
            {product.material}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-stone-100 mt-3 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[11px] text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm sm:text-base font-black text-rose-600">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="p-2 sm:px-3 sm:py-2 bg-stone-900 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="افزودن سریع به سبد خرید"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">خرید سریع</span>
          </button>
        </div>
      </div>
    </div>
  );
};
