import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, Truck, ShieldCheck, MapPin, Phone, User, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice, toPersianDigits } from '../utils/format';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalAmount: number;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  totalAmount,
  onOrderCompleted
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    province: 'تهران',
    city: '',
    address: '',
    postalCode: '',
    shippingMethod: 'پیشتاز',
    notes: ''
  });
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('لطفاً فیلدهای ضروری (نام، شماره تماس و آدرس) را تکمیل فرمایید.');
      return;
    }

    const randomTrack = 'MNM-' + Math.floor(100000 + Math.random() * 900000);
    setTrackingNumber(randomTrack);
    setStep('success');
    onOrderCompleted();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative text-right p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
              <Truck className="w-6 h-6 text-rose-600" />
              <div>
                <h3 className="text-lg font-black text-stone-900">مشخصات ارسال و تحویل سفارش</h3>
                <p className="text-xs text-stone-500">لطفاً آدرس دقیق پستی خود را برای ارسال سریع وارد نمایید</p>
              </div>
            </div>

            {/* Order Brief */}
            <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-200/70 mb-5 flex items-center justify-between text-xs">
              <span className="text-stone-700">
                تعداد کالا: <strong className="text-stone-900">{toPersianDigits(items.length)} عدد</strong>
              </span>
              <span className="text-rose-600 font-bold text-sm">
                مبلغ قابل پرداخت: {formatPrice(totalAmount)}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    نام و نام خانوادگی تحویل‌گیرنده *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="مثال: مریم سیفی"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 pr-8 text-xs focus:ring-2 focus:ring-rose-400 focus:bg-white"
                    />
                    <User className="w-4 h-4 text-stone-400 absolute right-2.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    شماره موبایل جهت پیامک رهگیری *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 pr-8 text-xs focus:ring-2 focus:ring-rose-400 focus:bg-white"
                    />
                    <Phone className="w-4 h-4 text-stone-400 absolute right-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">استان</label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    placeholder="مثال: تهران / اصفهان"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">شهر</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="مثال: نجف‌آباد یا تهران"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  آدرس دقیق پستی (خیابان، کوچه، پلاک، واحد) *
                </label>
                <div className="relative">
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="آدرس دقیق برای مامور پست یا تیپاکس..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-rose-400 focus:bg-white"
                  />
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-2.5 bottom-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">کد پستی ۱۰ رقمی</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="اختیاری اما برای پست توصیه می‌شود"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">شیوه ارسال</label>
                  <select
                    value={formData.shippingMethod}
                    onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="پیشتاز">پست پیشتاز سراسری (۲ الی ۴ روز کاری)</option>
                    <option value="تیپاکس">تیپاکس اکسپرس (سریع‌ترین زمان تحویل)</option>
                  </select>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 flex items-center gap-3 text-stone-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>کلیه بسته‌ها با بسته‌بندی ایمن و بیمه غرامت پستی ارسال می‌شوند.</span>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-rose-200 text-sm transition-all hover:scale-[1.01] cursor-pointer mt-4"
              >
                ثبت سفارش و رفتن به درگاه پرداخت امن
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-black text-stone-900">
              سفارش شما در مینی‌مانی با موفقیت ثبت شد! 🎉
            </h3>

            <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              از اعتماد شما به فروشگاه پوشاک کودک مینی‌مانی متشکریم. پیامک تایید سفارش به شماره{' '}
              <strong className="text-stone-800 font-mono">{formData.phone}</strong> ارسال گردید.
            </p>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 max-w-sm mx-auto text-center space-y-1">
              <div className="text-xs text-stone-500">کد رهگیری اختصاصی سفارش:</div>
              <div className="text-lg font-mono font-black text-stone-900 tracking-wider">
                {trackingNumber}
              </div>
              <div className="text-[11px] text-amber-700">
                جهت هرگونه پیگیری می‌توانید با شماره ۰۹۱۳۹۷۲۱۲۷۴ تماس حاصل فرمایید.
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <span>بازگشت به صفحه اصلی فروشگاه</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
