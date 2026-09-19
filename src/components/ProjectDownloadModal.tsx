import React, { useState } from 'react';
import {
  X,
  Download,
  FileArchive,
  Check,
  Copy,
  Terminal,
  FolderTree,
  Sparkles,
  ExternalLink,
  Globe
} from 'lucide-react';

interface ProjectDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDownloadModal: React.FC<ProjectDownloadModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install && npm run dev');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="project-download-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="project-download-modal-dialog"
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-stone-100 animate-in fade-in zoom-in-95 duration-200 text-right my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 via-amber-500 to-teal-500 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
              <FileArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight">
                دانلود سورس کد پروژه (ZIP)
              </h3>
              <p className="text-xs text-rose-100 font-medium">
                نسخه کامل، تمیز و آماده اجرا روی سیستم شما
              </p>
            </div>
          </div>
          <button
            id="close-download-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors text-white cursor-pointer"
            aria-label="بستن پنجره"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 text-stone-700">
          {/* Main Download CTA Button */}
          <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-right">
              <div className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5 justify-center sm:justify-start">
                <span>فایل آرشیو سورس کد پروژه</span>
                <span className="text-[11px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full font-mono font-bold">
                  ZIP (~85 KB)
                </span>
              </div>
              <p className="text-xs text-stone-500">
                شامل تمام کامپوننت‌های React، تایپ‌اسکریپت، استایل‌ها، عکس‌ها و README
              </p>
            </div>

            <a
              id="direct-download-project-zip-btn"
              href="minimani-store-source.zip"
              download="minimani-store-source.zip"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-md shadow-rose-200 hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>دانلود فایل ZIP</span>
            </a>
          </div>

          {/* Single-file, domain-free preview */}
          <div className="bg-teal-50/60 rounded-2xl p-4 border border-teal-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-right">
              <div className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5 justify-center sm:justify-start">
                <Globe className="w-3.5 h-3.5 text-teal-600" />
                <span>نسخه پیش‌نمایش تک‌فایلی (بدون دامنه)</span>
              </div>
              <p className="text-xs text-stone-500">
                یک فایل HTML مستقل؛ با دوبار کلیک در مرورگر باز می‌شود و به هاست، دامنه یا وب‌سرور نیازی ندارد.
              </p>
            </div>

            <a
              id="open-single-file-preview-btn"
              href="preview.html"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 active:scale-98 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-md shadow-teal-200 hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4" />
              <span>مشاهده پیش‌نمایش</span>
            </a>
          </div>

          {/* Quick Start Instructions */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-rose-500" />
              <span>دستور اجرای پروژه پس از استخراج (اکسترکت):</span>
            </div>
            <div className="bg-stone-900 text-stone-100 p-3 rounded-2xl font-mono text-xs flex items-center justify-between border border-stone-800 dir-ltr">
              <code className="text-emerald-400 font-semibold selection:bg-stone-700">
                npm install &amp;&amp; npm run dev
              </code>
              <button
                id="copy-terminal-command-btn"
                onClick={handleCopy}
                className="ml-2 px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                title="کپی دستور"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">کپی شد</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>کپی</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* What is Included list */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <FolderTree className="w-3.5 h-3.5 text-teal-600" />
              <span>محتویات داخل فایل دانلود:</span>
            </div>
            <ul className="text-xs text-stone-600 space-y-1.5 bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>تمامی صفحات و کامپوننت‌های فرانت‌اند فروشگاه (React 19 + TypeScript)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>کاتالوگ کامل کالاها با عکس‌های باکیفیت و جدول سایزبندی ۱ تا ۱۴ سال</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                <span>سبد خرید، اعمال کد تخفیف، لیست علاقه‌مندی‌ها و تسویه حساب</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>کانفیگ‌های کامل Vite، Tailwind CSS v4، tsconfig و README راهنما</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                <span>اسکریپت ساخت نسخه پیش‌نمایش تک‌فایلی و آفلاین (بدون نیاز به دامنه)</span>
              </li>
            </ul>
          </div>

          {/* AI Studio Native Export notice */}
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-[11px] text-stone-500 leading-relaxed space-y-1">
            <div className="font-semibold text-stone-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>روش دیگر: دانلود از منوی بالای صفحه در AI Studio</span>
            </div>
            <p>
              می‌توانید در محیط هوش مصنوعی Google AI Studio، از منوی تنظیمات (Settings ⚙️) گزینه <strong>Export to ZIP</strong> یا <strong>Export to GitHub</strong> را نیز در هر زمان انتخاب نمایید.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-stone-50 px-6 py-4 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-mono font-medium">
            minimani-store-source.zip
          </span>
          <button
            id="close-modal-bottom-btn"
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
