// Persian numeral converter
const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(n: number | string): string {
  if (n === null || n === undefined) return '';
  return n
    .toString()
    .replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
}

// Format number with thousands separator in Persian
export function formatPrice(price: number): string {
  const parts = price.toLocaleString('en-US').split(',');
  const formatted = parts.map((part) => toPersianDigits(part)).join('٬');
  return `${formatted} تومان`;
}

export function formatPercent(discountPercent: number): string {
  return `${toPersianDigits(discountPercent)}٪`;
}
