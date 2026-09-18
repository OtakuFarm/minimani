import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice, toPersianDigits } from '../utils/format';
import { SafeImage } from './SafeImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, color: string, qty: number) => void;
  onRemoveItem: (productId: string, size: string, color: string) => void;
  onProceedToCheckout: () => void;
  discountCode: string;
  onApplyDiscount: (code: string) => boolean;
  discountAmount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountCode,
  onApplyDiscount,
  discountAmount
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState(discountCode);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(discountAmount > 0);

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 2000000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  const shippingCost = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 65000;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!inputCode.trim()) return;

    const success = onApplyDiscount(inputCode.trim());
    if (success) {
      setCouponSuccess(true);
      setCouponError('');
    } else {
      setCouponSuccess(false);
      setCouponError('کد تخفیف معتبر نیست یا منقضی شده است (کد تستی: MINIMANI)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-300 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-600" />
            <h2 className="font-extrabold text-base sm:text-lg text-stone-900">
              سبد خرید مینی‌مانی ({toPersianDigits(items.length)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping meter */}
        <div className="bg-rose-50/70 p-3.5 border-b border-rose-100 text-xs">
          {remainingForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="text-stone-700">
                تنها <span className="font-bold text-rose-600">{formatPrice(remainingForFreeShipping)}</span> دیگر تا <span className="font-bold text-emerald-600">ارسال رایگان</span> سفارش!
              </div>
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>تبریک! ارسال این سفارش برای شما کاملاً رایگان است.</span>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8 text-stone-300" />
              </div>
              <p className="text-stone-700 font-bold text-sm">سبد خرید شما در حال حاضر خالی است</p>
              <p className="text-xs text-stone-400 mt-1 max-w-xs">
                از میان جدیدترین کالکشن‌های وارداتی و ترک مینی‌مانی لباس‌های موردعلاقه فرزندتان را انتخاب کنید!
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-5 py-2.5 bg-rose-600 text-white rounded-xl font-semibold text-xs shadow-md shadow-rose-200"
              >
                شروع خرید
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                className="flex gap-3 bg-stone-50/70 p-3 rounded-2xl border border-stone-200/80 items-center"
              >
                <SafeImage
                  src={item.product.image}
                  alt={item.product.name}
                  fallbackLabel={item.product.name}
                  className="w-18 h-22 object-cover rounded-xl shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-1">
                    <span className="bg-white px-1.5 py-0.5 rounded-md border border-stone-200">
                      {item.selectedSize}
                    </span>
                    <span>رنگ: {item.selectedColor}</span>
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-xs font-black text-rose-600">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity - 1
                          )
                        }
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold">
                        {toPersianDigits(item.quantity)}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor,
                            item.quantity + 1
                          )
                        }
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)
                      }
                      className="text-stone-400 hover:text-rose-600 p-1"
                      title="حذف از سبد"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50/50 space-y-3">
            {/* Coupon form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="کد تخفیف (تستی: MINIMANI)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="flex-1 bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
              <button
                type="submit"
                className="bg-stone-800 hover:bg-stone-900 text-white text-xs px-3 py-1.5 rounded-xl font-semibold cursor-pointer"
              >
                اعمال
              </button>
            </form>

            {couponError && <p className="text-[11px] text-rose-500">{couponError}</p>}
            {couponSuccess && (
              <p className="text-[11px] text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                کد تخفیف با موفقیت اعمال شد!
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200/60">
              <div className="flex justify-between">
                <span>مجموع اقلام:</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>سود شما از تخفیف:</span>
                  <span>- {formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>هزینه ارسال:</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 font-bold">رایگان</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-stone-900 pt-2 border-t border-stone-200">
                <span>مبلغ نهایی قابل پرداخت:</span>
                <span className="text-rose-600 text-base">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-rose-200 flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.01] cursor-pointer"
            >
              <span>تکمیل خرید و ثبت نهایی آدرس</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
