import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';
import { SIZE_RECOMMENDATIONS } from '../data/products';
import { toPersianDigits } from '../utils/format';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [selectedAgeIndex, setSelectedAgeIndex] = useState(1);

  const current = SIZE_RECOMMENDATIONS[selectedAgeIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200 text-right p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Ruler className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-stone-900">راهنمای هوشمند انتخاب سایز کودک</h3>
            <p className="text-xs text-stone-500">برای خریدی با خیال آسوده و تنخوری بی‌نقص</p>
          </div>
        </div>

        {/* Age Selector Tabs */}
        <div className="mt-5">
          <label className="block text-xs font-bold text-stone-700 mb-2">
            سن فرزند دلبندتان را انتخاب کنید:
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {SIZE_RECOMMENDATIONS.map((rec, index) => (
              <button
                key={index}
                onClick={() => setSelectedAgeIndex(index)}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                  selectedAgeIndex === index
                    ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-200'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                {rec.ageLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Recommendation Result */}
        <div className="mt-5 bg-gradient-to-tr from-amber-50 to-rose-50 p-5 rounded-2xl border border-amber-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-200/60">
            <span className="text-xs font-bold text-stone-600">سایز پیشنهادی مینی‌مانی:</span>
            <span className="text-sm font-black text-rose-600 bg-white px-3 py-1 rounded-xl shadow-xs border border-rose-100">
              {current.suggestedSize}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/80 p-3 rounded-xl border border-amber-100">
              <span className="text-stone-500 block mb-1">محدوده قد استاندارد:</span>
              <span className="font-bold text-stone-900">{current.heightRange}</span>
            </div>
            <div className="bg-white/80 p-3 rounded-xl border border-amber-100">
              <span className="text-stone-500 block mb-1">دور سینه نرمال:</span>
              <span className="font-bold text-stone-900">{current.chest}</span>
            </div>
            <div className="bg-white/80 p-3 rounded-xl border border-amber-100">
              <span className="text-stone-500 block mb-1">دور کمر تقریبی:</span>
              <span className="font-bold text-stone-900">{current.waist}</span>
            </div>
          </div>
        </div>

        {/* Important Tips for Parents */}
        <div className="mt-6 space-y-2.5 text-xs text-stone-600 bg-stone-50 p-4 rounded-2xl border border-stone-200">
          <div className="font-bold text-stone-900 flex items-center gap-1.5 text-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>نکات طلایی برای انتخاب سایز لباس کودک:</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>قواره لباس‌های ترک:</strong> قواره لباس‌های ترک استاندارد است؛ اگر کودک جثه تپلی دارد پیشنهاد می‌کنیم یک سایز بزرگتر انتخاب نمایید.</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>لباس‌های پاییزه و زمستانه:</strong> برای هودی، دورس و کاپشن معمولاً نیم تا یک سایز آزادتر تنخور زیباتری دارد و امکان پوشیدن لایه‌ای را فراهم می‌کند.</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>ضمانت تعویض:</strong> چنانچه سایز ارسالی مناسب کودک نبود، تا ۷ روز فرصت تعویض سایز بدون دردسر دارید!</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
        >
          متوجه شدم، بازگشت به خرید
        </button>
      </div>
    </div>
  );
};
