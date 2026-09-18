import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

/**
 * کانفیگ مخصوص ساخت «نسخه پیش‌نمایش تک‌فایلی» (Single-File Preview)
 * -----------------------------------------------------------------
 * هدف: تولید یک فایل HTML کاملاً مستقل که بدون هیچ دامنه، هاست یا وب‌سروری
 * فقط با دوبار کلیک روی آن در مرورگر باز می‌شود (پروتکل file://).
 *
 * برای رسیدن به این هدف:
 *   ۱. همه مسیرها نسبی می‌شوند (base: './')
 *   ۲. کد به فرمت IIFE کامپایل می‌شود تا محدودیت ES Module در file:// مشکلی ایجاد نکند
 *   ۳. CSS و JS به‌صورت درون‌ریزی‌شده (inline) داخل همان یک فایل قرار می‌گیرند
 *
 * ساخت خروجی:  npm run build:preview
 *               npm run build:preview:offline   (نسخه ۱۰۰٪ آفلاین همراه تصاویر)
 */
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.'),
    },
  },
  build: {
    outDir: 'dist-preview',
    emptyOutDir: true,
    cssCodeSplit: false,
    modulePreload: false,
    assetsInlineLimit: 100000000,
    target: 'es2018',
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'app.js',
        chunkFileNames: 'app.js',
        assetFileNames: 'app.[ext]',
      },
    },
  },
});