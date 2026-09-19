#!/usr/bin/env node
/**
 * پاک‌سازی خروجی‌های ساخت — سازگار با ویندوز، مک و لینوکس
 * ------------------------------------------------------------------
 * این فایل جایگزین دستور «rm -rf dist dist-preview preview.html server.js»
 * است که فقط روی مک/لینوکس کار می‌کرد و در ویندوز با خطا متوقف می‌شد.
 *
 * اجرا:
 *   npm run clean        ← حذف خروجی‌های بیلد (dist، dist-preview و ...)
 *   npm run clean:all    ← حذف کامل، شامل فایل پیش‌نمایش و آرشیو سورس
 */
import { existsSync, rmSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const includeCommitted = process.argv.includes('--all');

/** خروجی‌های بیلد که در Git ثبت نشده‌اند (حذف پیش‌فرض) */
const buildOutputs = ['dist', 'dist-preview', 'build', 'coverage', 'node_modules/.vite', 'server.js'];

/**
 * فایل‌های تولیدشده اما ثبت‌شده در Git.
 * پاک کردن پیش‌فرض آن‌ها باعث کثیف شدن وضعیت Git می‌شود،
 * بنابراین فقط با پرچم --all حذف می‌شوند.
 */
const committedArtifacts = [
  'preview.html',
  'public/preview.html',
  'minimani-store-source.zip',
  'public/minimani-store-source.zip'
];

const targets = includeCommitted ? [...buildOutputs, ...committedArtifacts] : buildOutputs;

let removed = 0;
for (const relative of targets) {
  const absolute = path.join(projectRoot, relative);
  if (!existsSync(absolute)) continue;
  const kind = statSync(absolute).isDirectory() ? 'dir ' : 'file';
  rmSync(absolute, { recursive: true, force: true });
  console.log(`   ✔ removed ${kind}  ${relative}`);
  removed += 1;
}

console.log('');
if (removed === 0) {
  console.log('   چیزی برای پاک‌سازی نبود — همه چیز از قبل تمیز است.');
} else {
  console.log(`   ${removed} مورد پاک شد.`);
}

console.log('');
if (includeCommitted) {
  console.log('   توجه: preview.html و آرشیو ZIP در Git ثبت شده‌اند.');
  console.log('   برای بازگرداندن آن‌ها:  git restore .');
} else {
  console.log('   نسخه پیش‌نمایش (preview.html) و آرشیو سورس دست‌نخورده باقی ماندند.');
  console.log('   برای حذف آن‌ها هم:  npm run clean:all');
}