#!/usr/bin/env node
/**
 * ساخت «نسخه پیش‌نمایش تک‌فایلی و بدون دامنه» سایت مینی‌مانی
 * ------------------------------------------------------------------
 * خروجی نهایی: preview.html  (یک نسخه کپی هم در public/preview.html قرار می‌گیرد)
 *
 * اجرا:
 *   npm run build:preview            ← تصاویر آنلاین (نیاز به اینترنت برای عکس‌ها)
 *   npm run build:preview:offline    ← نسخه ۱۰۰٪ آفلاین، تصاویر داخل فایل جای می‌گیرند
 *
 * نکته: این فایل نیازی به دامنه، هاست، Node.js یا وب‌سرور ندارد؛
 * کاربر کافی است آن را دوبار کلیک کند تا در مرورگر باز شود.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '..');
const distDir = path.join(projectRoot, 'dist-preview');
const fileName = 'preview.html';
const inlineImages = process.argv.includes('--offline');
const targets = [path.join(projectRoot, fileName), path.join(projectRoot, 'public', fileName)];
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

/* ---------- ۱) بیلد با Vite ---------- */
const viteBin = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');
if (!fs.existsSync(viteBin)) {
  console.error('✖ وابستگی‌ها نصب نشده است. ابتدا «npm install» را اجرا کنید.');
  process.exit(1);
}
console.log('۱) بیلد تک‌فایلی با Vite ...');
const build = spawnSync(process.execPath, [viteBin, 'build', '--config', 'vite.preview.config.ts'], {
  cwd: projectRoot,
  stdio: 'inherit'
});
if (build.status !== 0) {
  console.error('✖ بیلد با خطا متوقف شد.');
  process.exit(build.status ?? 1);
}

/* ---------- ۲) خواندن فایل‌های تولیدشده ---------- */
const indexPath = path.join(distDir, 'index.html');
const jsPath = path.join(distDir, 'app.js');
const cssPath = path.join(distDir, 'app.css');
if (!fs.existsSync(indexPath) || !fs.existsSync(jsPath)) {
  console.error(`✖ فایل‌های خروجی در «${distDir}» پیدا نشدند.`);
  process.exit(1);
}

let appJs = fs.readFileSync(jsPath, 'utf8');
let appCss = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';
let page = fs.readFileSync(indexPath, 'utf8');

/* ---------- ۳) (اختیاری) درون‌ریزی تصاویر برای اجرای کاملاً آفلاین ---------- */
if (inlineImages) {
  console.log('۲) دانلود و درون‌ریزی تصاویر محصولات (حالت آفلاین) ...');
  appJs = await embedRemoteImages(appJs);
} else {
  console.log('۲) تصاویر به‌صورت لینک خارجی باقی می‌مانند (برای دیدن عکس‌ها اینترنت لازم است).');
}

/* ---------- ۴) درون‌ریزی CSS و JS داخل یک فایل HTML ---------- */
page = page
  .replace(/<script\b[^>]*\bsrc="(?!https?:)[^"]*"[^>]*>\s*<\/script>\s*/gi, '')
  .replace(/<link\b[^>]*\brel=["']stylesheet["'][^>]*href="(?!https?:)[^"]*"[^>]*>\s*/gi, '');

const stamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
const banner = [
  '<!--',
  '  minimani | نسخه پیش‌نمایش تک‌فایلی (Single-File Preview)',
  `  زمان ساخت: ${stamp}`,
  `  حالت تصاویر: ${inlineImages ? 'آفلاین (تصاویر داخل همین فایل)' : 'آنلاین (لینک تصاویر خارجی)'}`,
  '  این فایل به دامنه، هاست یا وب‌سرور نیازی ندارد؛ فقط آن را در مرورگر باز کنید.',
  '-->'
].join('\n');

const styleTag = appCss ? `<style>\n${appCss.replace(/<\/style/gi, '<\\/style')}\n</style>` : '';
const scriptTag = [
  '<script>',
  `console.info('minimani · single-file preview build · offlineImages=${inlineImages}');`,
  appJs.replace(/<\/script/gi, '<\\/script'),
  '</script>'
].join('\n');

/**
 * تزریق محتوا بدون استفاده از String.replace
 * (چون کد مینیفای‌شده شامل الگوهایی مثل $& و $' است و replace رشته‌ای آنها را
 *  به‌عنوان الگوی جایگزینی تفسیر کرده و فایل را چند برابر می‌کند)
 */
page = insertAfter(page, '<head>', `\n${banner}`);
if (styleTag) page = insertBefore(page, '</head>', `${styleTag}\n`);
page = insertBefore(page, '</body>', `${scriptTag}\n`);

/* ---------- ۵) نوشتن خروجی ---------- */
const bytes = Buffer.byteLength(page, 'utf8');
for (const target of targets) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, page, 'utf8');
  console.log(`   ✔ ${path.relative(projectRoot, target)} (${kb(bytes)})`);
}

console.log('');
console.log(`تمام شد! برای مشاهده پیش‌نمایش، فایل «${fileName}» را دوبار کلیک کنید.`);

/* ---------- کمک‌تابع‌های تزریق محتوا در HTML ---------- */
function insertAfter(html, marker, content) {
  const index = html.indexOf(marker);
  if (index === -1) return html + content;
  const end = index + marker.length;
  return html.slice(0, end) + content + html.slice(end);
}

function insertBefore(html, marker, content) {
  const index = html.lastIndexOf(marker);
  if (index === -1) return html + content;
  return html.slice(0, index) + content + html.slice(index);
}

/* ------------------------------------------------------------------ */
/* تبدیل لینک تصاویر خارجی به data URI تا سایت ۱۰۰٪ آفلاین کار کند    */
/* ------------------------------------------------------------------ */
async function embedRemoteImages(code) {
  const urls = [...new Set(code.match(/https:\/\/images\.unsplash\.com\/[^\s"'`]+/g) ?? [])];
  if (urls.length === 0) {
    console.log('   ! هیچ تصویر خارجی برای درون‌ریزی پیدا نشد.');
    return code;
  }

  const map = new Map();
  const batchSize = 4;
  for (let i = 0; i < urls.length; i += batchSize) {
    const results = await Promise.all(
      urls.slice(i, i + batchSize).map(async (url) => {
        try {
          const res = await fetch(toPreviewSize(url), { headers: { Accept: 'image/jpeg,image/*' } });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const buffer = Buffer.from(await res.arrayBuffer());
          const type = (res.headers.get('content-type') || 'image/jpeg').split(';')[0];
          return [url, `data:${type};base64,${buffer.toString('base64')}`];
        } catch (error) {
          console.warn(`   ! درون‌ریزی این تصویر ناموفق بود: ${url} (${error.message})`);
          return null;
        }
      })
    );
    for (const item of results) if (item) map.set(item[0], item[1]);
    process.stdout.write(`   ... ${Math.min(i + batchSize, urls.length)}/${urls.length}\r`);
  }
  process.stdout.write('\n');

  let output = code;
  for (const [url, dataUri] of map) output = output.split(url).join(dataUri);
  console.log(`   ✔ ${map.size} تصویر داخل فایل جای گرفت (حجم نهایی سنگین‌تر میشود).`);
  return output;
}

/** اندازه کوچک‌تر و یکسان برای تصاویر پیش‌نمایش تا حجم فایل معقول بماند */
function toPreviewSize(raw) {
  try {
    const url = new URL(raw);
    url.searchParams.set('w', '480');
    url.searchParams.set('q', '70');
    url.searchParams.set('fm', 'jpg');
    url.searchParams.set('fit', 'crop');
    return url.toString();
  } catch {
    return raw;
  }
}