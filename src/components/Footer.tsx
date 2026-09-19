import React from 'react';
import { Phone, Mail, ArrowUp, ShieldCheck, RefreshCw, Truck, Heart, MapPin, ExternalLink } from 'lucide-react';
import { InfoModalType } from './InfoModal';

interface FooterProps {
  onOpenInfo: (type: InfoModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInfo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800 text-right mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-stone-800 text-xs">
          <div className="flex items-center gap-3 bg-stone-800/60 p-3.5 rounded-2xl border border-stone-700/50">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">ارسال رایگان</div>
              <div className="text-[11px] text-stone-400">خریدهای بالای ۲ میلیون تومان</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-800/60 p-3.5 rounded-2xl border border-stone-700/50">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">۷ روز ضمانت تعویض</div>
              <div className="text-[11px] text-stone-400">تعویض سایز بدون دغدغه</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-800/60 p-3.5 rounded-2xl border border-stone-700/50">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">ضمانت اصالت اجناس</div>
              <div className="text-[11px] text-stone-400">۱۰۰٪ پوشاک ترک و وارداتی</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-800/60 p-3.5 rounded-2xl border border-stone-700/50">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">مشاوره و پشتیبانی</div>
              <div className="text-[11px] text-stone-400">۰۹۱۳۹۷۲۱۲۷۴</div>
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-stone-800">
          {/* Brand & Introduction */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-rose-500 flex items-center justify-center text-white font-black text-lg">
                🧸
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                minimani
              </span>
            </div>

            <div className="space-y-2 text-xs leading-relaxed text-stone-400">
              <p className="font-bold text-amber-400">معرفی فروشگاه مینی‌مانی:</p>
              <p>
                فروشگاه آنلاین تخصصی <strong>لباس بچه از ۱ تا ۱۴ سال</strong>. ارائه جدیدترین مدل‌های پوشاک <strong>وارداتی</strong> و <strong>ترک</strong> با پارچه‌های نرم و طبیعی پنبه‌ای، مناسب پوست حساس کودکان با بالاترین استانداردهای کیفی.
              </p>
            </div>
          </div>

          {/* Quick Access */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onOpenInfo('contact')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  تماس با ما
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInfo('about')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  درباره ما
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInfo('privacy')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  سیاست حریم خصوصی
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInfo('complaints')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  شکایات و انتقادات
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenInfo('rules')}
                  className="hover:text-rose-400 transition-colors cursor-pointer"
                >
                  قوانین و مقررات فروشگاه
                </button>
              </li>
              <li className="pt-1">
                <a
                  id="footer-preview-btn"
                  href="preview.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-300 text-teal-400 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                  <span>مشاهده پیش‌نمایش سایت</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-white text-sm">ارتباط با ما</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              جهت پیگیری سفارش‌ها، استعلام موجودی یا مشاوره انتخاب سایز با ما در ارتباط باشید:
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span>شماره تماس مستقیم: </span>
                <a
                  href="tel:09139721274"
                  className="font-mono font-bold text-white hover:text-rose-400 dir-ltr inline-block"
                >
                  ۰۹۱۳۹۷۲۱۲۷۴
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>آدرس ایمیل: </span>
                <a
                  href="mailto:seyfi.maryam@gmail.com"
                  className="text-stone-300 hover:text-rose-400 dir-ltr inline-block font-mono"
                >
                  seyfi.maryam@gmail.com
                </a>
              </div>
            </div>

            {/* Back to top button */}
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>برگشت به بالا</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-center sm:text-right leading-relaxed">
            استفاده از مطالب فروشگاه minimani فقط برای مقاصد غیرتجاری و با ذکر منبع بلامانع است. کلیه حقوق این سایت محفوظ می‌باشد.
          </p>
          <div className="text-[11px] text-stone-400 flex items-center gap-1">
            <span>ساخته شده با عشق برای کودکان ایران زمین</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
