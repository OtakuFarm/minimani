import React, { useState } from 'react';
import { X, User, Phone, CheckCircle2 } from 'lucide-react';
import { toPersianDigits } from '../utils/format';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  if (!isOpen) return null;

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('لطفاً شماره موبایل معتبر ۱۱ رقمی وارد نمایید.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('code');
    }, 600);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const userName = name.trim() || 'کاربر عزیز مینی‌مانی';
      onLoginSuccess(userName);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-sm w-full shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200 text-right p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-2 text-2xl font-bold">
            🧸
          </div>
          <h3 className="text-lg font-black text-stone-900">
            {step === 'phone' ? 'ورود یا ثبت‌نام در مینی‌مانی' : 'تایید شماره موبایل'}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {step === 'phone'
              ? 'برای پیگیری سفارش‌ها و دریافت تخفیف‌های اعضا'
              : `کد تایید ۴ رقمی به شماره ${toPersianDigits(phone)} ارسال شد`}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendCode} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                نام و نام خانوادگی (اختیاری):
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: مریم سیفی"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 pr-8 text-xs focus:ring-2 focus:ring-rose-400 focus:bg-white"
                />
                <User className="w-4 h-4 text-stone-400 absolute right-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                شماره موبایل:
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۱۳۹۷۲۱۲۷۴"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 pr-8 text-xs focus:ring-2 focus:ring-rose-400 focus:bg-white font-mono text-left"
                />
                <Phone className="w-4 h-4 text-stone-400 absolute right-2.5 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md shadow-rose-200 transition-all cursor-pointer mt-2"
            >
              {loading ? 'در حال ارسال کد...' : 'دریافت کد تایید یکبار مصرف'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1 text-center">
                کد تایید پیامک شده را وارد کنید (کد تستی: ۱۲۳۴):
              </label>
              <input
                type="text"
                required
                maxLength={4}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="۱۲۳۴"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 text-center text-lg font-mono tracking-widest focus:ring-2 focus:ring-rose-400 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md shadow-rose-200 transition-all cursor-pointer"
            >
              {loading ? 'در حال بررسی...' : 'ورود به حساب کاربری'}
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-xs text-stone-500 hover:text-rose-600 py-1"
            >
              ویرایش شماره موبایل
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
