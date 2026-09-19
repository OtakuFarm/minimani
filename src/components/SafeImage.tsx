import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** متنی که در صورت بارگذاری نشدن تصویر (مثلاً در حالت آفلاین) نمایش داده می‌شود */
  fallbackLabel?: string;
}

/**
 * تصویر مقاوم در برابر خطا (Safe Image)
 * ------------------------------------------------------------------
 * تصاویر محصولات از یک سرویس خارجی بارگذاری می‌شوند؛ اگر کاربر نسخه
 * پیش‌نمایش تک‌فایلی را بدون اینترنت باز کند، به‌جای آیکون شکسته‌ی مرورگر
 * یک جای‌گیر (Placeholder) گرافیکی و هم‌رنگ با طراحی سایت نشان داده می‌شود.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  fallbackLabel,
  className,
  onError,
  ...imgProps
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={imgProps.alt}
        className={`skeleton flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-rose-50 via-amber-50 to-teal-50 text-rose-400 select-none ${className ?? ''}`}
      >
        <ImageOff className="w-6 h-6" />
        {fallbackLabel && (
          <span className="text-[10px] font-bold text-stone-500 px-2 text-center leading-tight line-clamp-2">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      {...imgProps}
      className={className}
      onError={(event) => {
        setHasError(true);
        onError?.(event);
      }}
    />
  );
};