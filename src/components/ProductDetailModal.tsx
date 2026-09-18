import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, RefreshCw, Truck, Check, Ruler } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, toPersianDigits, formatPercent } from '../utils/format';
import { SafeImage } from './SafeImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-600 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-8">
          {/* Gallery / Image side */}
          <div className="space-y-3">
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <SafeImage
                src={activeImage}
                alt={product.name}
                fallbackLabel={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                <span className="bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                  پوشاک {product.origin}
                </span>
                {discountPercent > 0 && (
                  <span className="bg-amber-400 text-stone-900 text-xs font-black px-2.5 py-1 rounded-lg">
                    {formatPercent(discountPercent)} تخفیف ویژه
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail previews */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img ? 'border-rose-500 ring-2 ring-rose-200' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <SafeImage src={img} alt="پیش‌نمایش" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust factors */}
            <div className="bg-amber-50/70 rounded-2xl p-3 border border-amber-200/60 text-xs text-stone-700 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>۱۰۰٪ پنبه طبیعی و ارگانیک، بدون پرزدهی</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-sky-600" />
                <span>ضمانت ۷ روزه تعویض سایز و بازگشت وجه</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>ارسال سریع با پست پیشتاز و تیپاکس</span>
              </div>
            </div>
          </div>

          {/* Details & options side */}
          <div className="flex flex-col justify-between space-y-5 text-right">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
                  رده سنی: {product.ageRange}
                </span>
                <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <span>{toPersianDigits(product.rating)}</span>
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-stone-400 font-normal">
                    ({toPersianDigits(product.reviewsCount)} نظر والدین)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-2">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-black text-rose-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed mt-3 border-t border-b border-stone-100 py-3">
                {product.description}
              </p>

              {/* Material info */}
              <div className="mt-3 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200/70">
                <span className="font-bold text-stone-900">جنس و مشخصات پارچه: </span>
                <span>{product.material}</span>
              </div>

              {/* Color selection */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-2">
                  <span>انتخاب رنگ:</span>
                  <span className="text-rose-600">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-200'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selection */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-2">
                  <span>انتخاب سایز:</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="flex items-center gap-1 text-rose-600 hover:underline cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>جدول راهنمای اندازه</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                  {product.sizes.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'border-rose-500 bg-rose-50 text-rose-700 font-bold ring-2 ring-rose-200'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-stone-800">تعداد:</span>
                <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-sm font-bold">
                    {toPersianDigits(quantity)}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-100 flex gap-2">
              <button
                onClick={handleAdd}
                disabled={addedAnimation}
                className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200 hover:scale-[1.02]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>به سبد خرید اضافه شد!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>افزودن به سبد خرید • {formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
                aria-label="علاقه‌مندی"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
