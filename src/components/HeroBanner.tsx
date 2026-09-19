import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, RefreshCw, Truck, Award, ArrowLeft } from 'lucide-react';
import { CategoryFilter } from '../types';
import { SafeImage } from './SafeImage';

interface HeroBannerProps {
  onSelectCategory: (cat: CategoryFilter) => void;
  onOpenSizeGuide: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  onOpenSizeGuide
}) => {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } }
  };
  const pop = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } }
  };
  const float = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: [0, -8, 0], transition: { opacity: { duration: 0.5 }, y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const } } }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 via-amber-50/40 to-transparent pt-4 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Card */}
        <div className="relative rounded-3xl gradient-pan bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white p-6 sm:p-10 md:p-12 overflow-hidden shadow-xl shadow-rose-200/50">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-300/20 rounded-full blur-2xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-right">
              <motion.div variants={item} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-rose-50 border border-white/20">
                <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
                <span>کالکشن جدید پاییز و زمستان مینی‌مانی</span>
              </motion.div>

              <motion.h1 variants={item} className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight sm:leading-snug">
                شیک‌ترین لباس‌های <span className="underline decoration-amber-300 decoration-wavy">ترک و وارداتی</span> برای فرزندان دلبندتان
              </motion.h1>

              <motion.p variants={item} className="text-sm sm:text-base text-rose-50 max-w-xl leading-relaxed">
                تخصصی‌ترین فروشگاه پوشاک کودک و نوجوان از ۱ تا ۱۴ سال. تمامی کارها با پارچه ۱۰۰٪ پنبه ضد حساسیت، دوخت درجه یک و تضمین تنخور عالی عرضه می‌شوند.
              </motion.p>

              <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectCategory('all')}
                  className="flex items-center gap-2 bg-white text-rose-600 hover:bg-amber-50 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
                >
                  <span>مشاهده همه محصولات</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenSizeGuide}
                  className="flex items-center gap-2 bg-rose-700/60 hover:bg-rose-700/80 text-white border border-white/30 px-5 py-3 rounded-2xl font-semibold text-sm transition-all cursor-pointer"
                >
                  <span>راهنمای انتخاب سایز</span>
                </button>
              </motion.div>

              {/* Badges */}
              <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 text-xs">
                <div className="bg-black/10 backdrop-blur-xs rounded-xl p-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>تضمین اصالت ترک و وارداتی</span>
                </div>
                <div className="bg-black/10 backdrop-blur-xs rounded-xl p-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>پارچه ضد حساسیت</span>
                </div>
                <div className="bg-black/10 backdrop-blur-xs rounded-xl p-2 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>۷ روز ضمانت تعویض سایز</span>
                </div>
                <div className="bg-black/10 backdrop-blur-xs rounded-xl p-2 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>ارسال سریع و مطمئن</span>
                </div>
              </motion.div>
            </div>

            {/* Visual preview badges */}
            <motion.div variants={pop} className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40 rotate-1 hover:rotate-0 transition-transform duration-300">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80"
                    alt="لباس کودک مینی‌مانی"
                    fallbackLabel="ست خرس کلاه دار پسرانه"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="bg-amber-400 text-stone-900 text-xs font-black px-2.5 py-1 rounded-lg w-max mb-1.5">
                      پرطرفدارترین ست فصل
                    </span>
                    <span className="font-bold text-lg">ست خرس کلاه دار پسرانه</span>
                    <span className="text-sm font-light text-rose-100">دو نخ پنبه توکرکی وارداتی</span>
                  </div>
                </div>

                {/* Floating pill badge */}
                <motion.div variants={float} className="absolute -bottom-4 -left-4 bg-white text-stone-800 rounded-2xl p-3 shadow-xl border border-rose-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                    ۱-۱۴
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-stone-900">سایزبندی کامل</div>
                    <div className="text-[11px] text-stone-500">از نوزادی تا نوجوانی</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick Category Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            whileHover={{ y: -4 }}
            onClick={() => onSelectCategory('girls')}
            className="group relative rounded-2xl p-5 bg-gradient-to-tr from-rose-100/90 to-pink-50 border border-rose-200/80 hover:shadow-md transition-[border-color,box-shadow] cursor-pointer flex items-center justify-between overflow-hidden"
          >
            <div>
              <span className="text-xs font-bold text-rose-600 bg-white/80 px-2.5 py-1 rounded-full">کالکشن پرنسسی</span>
              <h3 className="text-lg font-black text-stone-900 mt-2 group-hover:text-rose-600 transition-colors">
                دنیای دخترانه
              </h3>
              <p className="text-xs text-stone-600 mt-1">پیراهن، هودی، دورس و ست‌های شیک</p>
            </div>
            <div className="text-4xl transform group-hover:scale-110 transition-transform">
              👧
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            whileHover={{ y: -4 }}
            onClick={() => onSelectCategory('boys')}
            className="group relative rounded-2xl p-5 bg-gradient-to-tr from-sky-100/90 to-blue-50 border border-sky-200/80 hover:shadow-md transition-[border-color,box-shadow] cursor-pointer flex items-center justify-between overflow-hidden"
          >
            <div>
              <span className="text-xs font-bold text-sky-600 bg-white/80 px-2.5 py-1 rounded-full">استایل اسپرت و کژوال</span>
              <h3 className="text-lg font-black text-stone-900 mt-2 group-hover:text-sky-600 transition-colors">
                دنیای پسرانه
              </h3>
              <p className="text-xs text-stone-600 mt-1">ست خرسی، کاپشن، جین و هودی سنگشور</p>
            </div>
            <div className="text-4xl transform group-hover:scale-110 transition-transform">
              👦
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
            whileHover={{ y: -4 }}
            onClick={() => onSelectCategory('baby')}
            className="group relative rounded-2xl p-5 bg-gradient-to-tr from-amber-100/90 to-orange-50 border border-amber-200/80 hover:shadow-md transition-[border-color,box-shadow] cursor-pointer flex items-center justify-between overflow-hidden"
          >
            <div>
              <span className="text-xs font-bold text-amber-700 bg-white/80 px-2.5 py-1 rounded-full">نرم‌ترین الیاف ارگانیک</span>
              <h3 className="text-lg font-black text-stone-900 mt-2 group-hover:text-amber-700 transition-colors">
                دنیای نوزادی
              </h3>
              <p className="text-xs text-stone-600 mt-1">سرهمی بافت، بادی، بلوز و شلوار نوزاد</p>
            </div>
            <div className="text-4xl transform group-hover:scale-110 transition-transform">
              👶
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
