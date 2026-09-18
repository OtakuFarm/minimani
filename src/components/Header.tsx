import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Phone,
  Sparkles,
  Ruler,
  X,
  Menu,
  Download
} from 'lucide-react';
import { CategoryFilter } from '../types';
import { toPersianDigits, formatPrice } from '../utils/format';

interface HeaderProps {
  activeCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onOpenSizeGuide: () => void;
  onOpenContact: () => void;
  onOpenDownload: () => void;
  isLoggedIn: boolean;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  cartTotal,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  onOpenAuth,
  onOpenSizeGuide,
  onOpenContact,
  onOpenDownload,
  isLoggedIn,
  userName
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100/80 shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-rose-500 via-amber-500 to-teal-500 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium shadow-inner flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-rose-100">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200" />
          <span>پوشاک وارداتی و ترک از ۱ تا ۱۴ سال با ضمانت کیفیت</span>
        </div>
        <div className="w-full sm:w-auto text-center font-semibold tracking-wide">
          🎉 ارسال رایگان برای خریدهای بالای ۲٬۰۰۰٬۰۰۰ تومان به سراسر کشور
        </div>
        <div className="flex items-center gap-2">
          <button
            id="header-topbar-download-btn"
            onClick={onOpenDownload}
            className="flex items-center gap-1.5 text-xs bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-full transition-colors cursor-pointer font-bold shadow-xs"
            title="دانلود فایل ZIP پروژه"
          >
            <Download className="w-3.5 h-3.5" />
            <span>دانلود پروژه (ZIP)</span>
          </button>
          <button
            onClick={onOpenContact}
            className="hidden md:flex items-center gap-1.5 text-xs bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
          >
            <Phone className="w-3 h-3" />
            <span>پشتیبانی: ۰۹۱۳۹۷۲۱۲۷۴</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-rose-600 rounded-xl hover:bg-rose-50 cursor-pointer"
              aria-label="منوی موبایل"
            >
              <Menu className="w-6 h-6" />
            </button>

            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white font-extrabold shadow-md shadow-rose-200 group-hover:scale-105 transition-transform">
                <span className="text-xl">🧸</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900 flex items-center gap-1">
                  minimani
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block animate-ping"></span>
                </span>
                <span className="text-[11px] font-semibold text-rose-600 -mt-1 tracking-wider">
                  لباس کودک و نوجوان
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="جستجو در محصولات (هودی، دورس، ست خرس، شلوار جین...)"
                className="w-full bg-stone-100/90 text-stone-800 placeholder-stone-400 text-sm rounded-2xl pr-10 pl-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition-all border border-transparent focus:border-rose-200"
              />
              <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-3 top-3 text-stone-400 hover:text-stone-700 p-0.5 rounded-full hover:bg-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Actions: Download, User, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download Project Source Code */}
            <button
              id="header-download-project-btn"
              onClick={onOpenDownload}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-stone-800 hover:text-rose-600 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors text-xs font-bold border border-amber-200/90 cursor-pointer shadow-2xs"
              title="دانلود سورس کد کامل پروژه (فایل ZIP)"
            >
              <Download className="w-4 h-4 text-rose-500" />
              <span className="hidden sm:inline">دانلود سورس (ZIP)</span>
            </button>

            {/* User Auth */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-3 py-2 text-stone-700 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors text-xs sm:text-sm font-medium border border-stone-200/80 cursor-pointer"
            >
              <User className="w-4 h-4 text-rose-500" />
              <span className="hidden sm:inline">
                {isLoggedIn ? (userName || 'حساب من') : 'ورود / ثبت نام'}
              </span>
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-stone-700 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
              title="علاقه‌مندی‌ها"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {toPersianDigits(wishlistCount)}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 bg-stone-900 hover:bg-rose-600 text-white px-3.5 sm:px-4 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[11px] text-stone-300 group-hover:text-rose-100">سبد خرید</span>
                <span className="text-xs font-bold leading-tight">
                  {cartCount > 0 ? formatPrice(cartTotal) : 'خالی'}
                </span>
              </div>
              {cartCount > 0 && (
                <span className="sm:hidden absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {toPersianDigits(cartCount)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="جستجو در محصولات مینی‌مانی..."
              className="w-full bg-stone-100 text-stone-800 placeholder-stone-400 text-xs rounded-xl pr-9 pl-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <Search className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute left-3 top-2.5 text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Categories */}
        <nav className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-rose-500 text-white shadow-xs shadow-rose-200'
                  : 'text-stone-600 hover:text-rose-600 hover:bg-stone-100'
              }`}
            >
              همه محصولات
            </button>
            <button
              onClick={() => onSelectCategory('girls')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'girls'
                  ? 'bg-rose-500 text-white shadow-xs shadow-rose-200'
                  : 'text-stone-600 hover:text-rose-600 hover:bg-stone-100'
              }`}
            >
              👧 دخترانه
            </button>
            <button
              onClick={() => onSelectCategory('boys')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'boys'
                  ? 'bg-rose-500 text-white shadow-xs shadow-rose-200'
                  : 'text-stone-600 hover:text-rose-600 hover:bg-stone-100'
              }`}
            >
              👦 پسرانه
            </button>
            <button
              onClick={() => onSelectCategory('baby')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'baby'
                  ? 'bg-rose-500 text-white shadow-xs shadow-rose-200'
                  : 'text-stone-600 hover:text-rose-600 hover:bg-stone-100'
              }`}
            >
              👶 نوزادی
            </button>
            <button
              onClick={() => onSelectCategory('sale')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'sale'
                  ? 'bg-rose-500 text-white shadow-xs shadow-rose-200'
                  : 'text-stone-600 hover:text-rose-600 hover:bg-stone-100'
              }`}
            >
              🔥 حراج و تخفیف‌ها
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSizeGuide}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-rose-600 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200/70 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5 text-amber-600" />
              <span>راهنمای سایز هوشمند</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex">
          <div className="w-72 bg-white h-full p-5 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <span className="font-extrabold text-stone-800 text-lg">منوی دسته‌بندی مینی‌مانی</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg bg-stone-100 text-stone-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => { onSelectCategory('all'); setMobileMenuOpen(false); }}
                  className={`text-right px-3 py-2.5 rounded-xl font-medium ${activeCategory === 'all' ? 'bg-rose-50 text-rose-600 font-bold' : 'text-stone-700'}`}
                >
                  همه محصولات
                </button>
                <button
                  onClick={() => { onSelectCategory('girls'); setMobileMenuOpen(false); }}
                  className={`text-right px-3 py-2.5 rounded-xl font-medium ${activeCategory === 'girls' ? 'bg-rose-50 text-rose-600 font-bold' : 'text-stone-700'}`}
                >
                  لباس دخترانه
                </button>
                <button
                  onClick={() => { onSelectCategory('boys'); setMobileMenuOpen(false); }}
                  className={`text-right px-3 py-2.5 rounded-xl font-medium ${activeCategory === 'boys' ? 'bg-rose-50 text-rose-600 font-bold' : 'text-stone-700'}`}
                >
                  لباس پسرانه
                </button>
                <button
                  onClick={() => { onSelectCategory('baby'); setMobileMenuOpen(false); }}
                  className={`text-right px-3 py-2.5 rounded-xl font-medium ${activeCategory === 'baby' ? 'bg-rose-50 text-rose-600 font-bold' : 'text-stone-700'}`}
                >
                  لباس نوزادی
                </button>
                <button
                  onClick={() => { onSelectCategory('sale'); setMobileMenuOpen(false); }}
                  className={`text-right px-3 py-2.5 rounded-xl font-medium ${activeCategory === 'sale' ? 'bg-rose-50 text-rose-600 font-bold' : 'text-stone-700'}`}
                >
                  تخفیف‌ها و پیشنهادات ویژه
                </button>
                <button
                  onClick={() => { onOpenSizeGuide(); setMobileMenuOpen(false); }}
                  className="text-right px-3 py-2.5 rounded-xl font-medium text-amber-700 bg-amber-50"
                >
                  📏 راهنمای سایز بر اساس سن و قد
                </button>
                <button
                  id="mobile-drawer-download-btn"
                  onClick={() => { onOpenDownload(); setMobileMenuOpen(false); }}
                  className="text-right px-3 py-2.5 rounded-xl font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-rose-600" />
                    <span>دانلود سورس کد پروژه (فایل ZIP)</span>
                  </span>
                  <span className="text-[10px] bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-mono font-bold">ZIP</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 text-xs text-stone-500 space-y-2">
              <div className="font-semibold text-stone-700">پشتیبانی و سفارش تلفنی:</div>
              <div className="font-mono text-sm text-stone-800">۰۹۱۳۹۷۲۱۲۷۴</div>
              <div className="text-stone-500">seyfi.maryam@gmail.com</div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
