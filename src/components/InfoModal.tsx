import React from 'react';
import { X, Phone, Mail, MapPin, Clock, ShieldCheck, FileText, AlertCircle } from 'lucide-react';

export type InfoModalType = 'about' | 'contact' | 'privacy' | 'complaints' | 'rules' | null;

interface InfoModalProps {
  type: InfoModalType;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const renderContent = () => {
    switch (type) {
      case 'about':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <span className="text-xl">🧸</span>
              درباره فروشگاه لباس کودک مینی‌مانی (minimani)
            </h3>
            <p>
              فروشگاه <strong>مینی‌مانی</strong> با هدف تامین پوشاک باکیفیت، شیک و ضد حساسیت برای کودکان و نوجوانان از ۱ تا ۱۴ سال فعالیت خود را آغاز نموده است. ما به خوبی آگاهیم که پوست کودکان تا چه اندازه حساس است و سلامت و راحتی فرزندان دلبند شما اولویت اول ماست.
            </p>
            <p>
              تمامی اجناس موجود در فروشگاه به صورت مستقیم و بدون واسطه از <strong>کشور ترکیه</strong> و برترین تولیدکنندگان <strong>وارداتی</strong> تهیه شده و دارای ضمانت کیفیت، ثبات رنگ پس از شستشو و دوخت تمیز صنعتی هستند.
            </p>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-stone-800 space-y-1.5 text-xs">
              <div className="font-bold text-amber-900">ویژگی‌های متمایز مینی‌مانی:</div>
              <div>• استفاده از الیاف طبیعی و ۱۰۰٪ پنبه ارگانیک</div>
              <div>• قواره استاندارد با جدول دقیق سایزبندی برای انتخاب بدون خطای والدین</div>
              <div>• تعویض سایز آسان تا ۷ روز پس از تحویل سفارش</div>
              <div>• ارسال سریع به تمام نقاط ایران با پست پیشتاز و تیپاکس</div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-rose-600" />
              ارتباط با ما و اطلاعات پشتیبانی
            </h3>
            <p>
              همکاران ما در مینی‌مانی مشتاقانه آماده پاسخگویی به پرسش‌ها، مشاوره انتخاب سایز و راهنمایی شما عزیزان هستند:
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-500">شماره تماس مستقیم و مشاوره واتساپ:</div>
                  <a href="tel:09139721274" className="text-base font-black text-stone-900 font-mono hover:text-rose-600 dir-ltr inline-block">
                    ۰۹۱۳۹۷۲۱۲۷۴
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-500">آدرس پست الکترونیکی:</div>
                  <a href="mailto:seyfi.maryam@gmail.com" className="text-sm font-semibold text-stone-900 hover:text-rose-600 dir-ltr inline-block">
                    seyfi.maryam@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-500">ساعات پاسخگویی:</div>
                  <div className="text-xs font-bold text-stone-900">
                    شنبه تا پنج‌شنبه از ساعت ۹:۰۰ صبح الی ۲۱:۰۰ شب
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              سیاست حفظ حریم خصوصی
            </h3>
            <p>
              فروشگاه مینی‌مانی متعهد به حفاظت از اطلاعات شخصی کاربران گرامی می‌باشد. کلیه اطلاعات دریافتی شامل شماره تماس، آدرس پستی و مشخصات هویتی صرفاً برای پردازش سفارش، ارسال بسته پستی و اطلاع‌رسانی پیامکی کد رهگیری استفاده می‌شود.
            </p>
            <p>
              اطلاعات حساب بانکی شما در درگاه‌های رسمی بانکی دارای پروتکل SSL ثبت شده و هیچ‌گونه دسترسی به اطلاعات مالی شما در سرورهای فروشگاه وجود ندارد.
            </p>
          </div>
        );

      case 'complaints':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              رسیدگی به شکایات و پیشنهادات
            </h3>
            <p>
              رضایت کامل شما اولویت ماست. در صورتی که هرگونه مغایرت، تاخیر در تحویل بسته یا انتقادی دارید، می‌توانید مستقیماً با مدیریت فروشگاه در ارتباط باشید:
            </p>
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <div>• پیام مستقیم در واتساپ یا تماس: <strong>۰۹۱۳۹۷۲۱۲۷۴</strong></div>
              <div>• ارسال ایمیل به: <strong>seyfi.maryam@gmail.com</strong> با عنوان «شکایات»</div>
              <div>• پاسخگویی ظرف حداکثر ۲۴ ساعت کاری انجام خواهد شد.</div>
            </div>
          </div>
        );

      case 'rules':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <h3 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              قوانین، مقررات و شرایط تعویض سایز
            </h3>
            <div className="space-y-2 text-xs">
              <p><strong>۱. تعویض سایز:</strong> مشتریان محترم تا ۷ روز پس از دریافت بسته فرصت دارند در صورت نامناسب بودن سایز، درخواست تعویض ثبت نمایند (کالا باید دارای برچسب سالم، بدون بوی عطر یا آثار شستشو باشد).</p>
              <p><strong>۲. ارسال مرسوله:</strong> ارسال از طریق شرکت ملی پست جمهوری اسلامی ایران و تیپاکس صورت می‌پذیرد و کد رهگیری مرسوله پس از ارسال به شماره مشتری پیامک می‌شود.</p>
              <p><strong>۳. اصالت کالا:</strong> کلیه محصولات عرضه شده تحت عنوان «ترک» و «وارداتی» با ضمانت تطابق با توضیحات ارائه می‌گردند.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-lg w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200 text-right p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {renderContent()}

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl cursor-pointer"
        >
          بستن پنجره
        </button>
      </div>
    </div>
  );
};
