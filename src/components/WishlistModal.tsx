import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/format';
import { SafeImage } from './SafeImage';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-stone-200 relative text-right p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-extrabold text-base text-stone-900">
              لیست علاقه‌مندی‌های من ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-10 text-stone-400">
              <Heart className="w-12 h-12 text-stone-200 mx-auto mb-2" />
              <p className="text-sm font-bold text-stone-700">هنوز کالایی به علاقه‌مندی‌ها اضافه نشده است</p>
              <p className="text-xs text-stone-400 mt-1">با زدن قلب روی هر محصول آن را اینجا ذخیره کنید</p>
            </div>
          ) : (
            wishlist.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.35, ease: 'easeOut' }}
                className="flex items-center gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200"
              >
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  fallbackLabel={item.name}
                  className="w-16 h-20 object-cover rounded-xl shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                    {item.name}
                  </h4>
                  <div className="text-xs text-stone-500 mt-0.5">
                    رده سنی: {item.ageRange} | ساخت {item.origin}
                  </div>
                  <div className="text-xs font-black text-rose-600 mt-1">
                    {formatPrice(item.price)}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onAddToCart(item, item.sizes[0], item.colors[0]?.name || '');
                    }}
                    className="p-2 bg-stone-900 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    title="افزودن به سبد خرید"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(item)}
                    className="p-2 text-stone-400 hover:text-rose-600 rounded-xl hover:bg-white transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
