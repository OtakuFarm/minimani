import { Product, SizeRecommendation } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'ست خرس کلاه دار پسرانه',
    category: 'boys',
    price: 2300000,
    originalPrice: 2600000,
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80'
    ],
    origin: 'وارداتی',
    ageRange: '۲ تا ۸ سال',
    sizes: ['سایز ۱ (۲-۳ سال)', 'سایز ۲ (۴-۵ سال)', 'سایز ۳ (۶-۷ سال)', 'سایز ۴ (۷-۸ سال)'],
    colors: [
      { name: 'کرم نسکافه‌ای', hex: '#d2b48c' },
      { name: 'سرمه‌ای ملایم', hex: '#2b3a4a' },
      { name: 'سبز سدری', hex: '#708238' }
    ],
    description: 'ست دوتکه بسیار نرم و لطیف با طرح خرس برجسته، کلاه لایه‌دار پشمی و شلوار اسلش راحت با کش نرم ضد حساسیت. مناسب فصل پاییز و زمستان.',
    material: 'دوروس دو نخ توکرکی پنبه اعلا ۱۰۰٪ ضد حساسیت',
    rating: 4.9,
    reviewsCount: 38,
    isNew: true,
    isBestSeller: true,
    viewsCount: 1420,
    salesCount: 89,
    inStock: true
  },
  {
    id: 'p2',
    name: 'ست دخترانه سه نخ ترک',
    category: 'girls',
    price: 3300000,
    originalPrice: 3700000,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80'
    ],
    origin: 'ترک',
    ageRange: '۳ تا ۱۱ سال',
    sizes: ['سایز ۳-۴ سال', 'سایز ۵-۶ سال', 'سایز ۷-۸ سال', 'سایز ۹-۱۱ سال'],
    colors: [
      { name: 'صورتی ملایم پاستلی', hex: '#f8b4b4' },
      { name: 'یاسی روشن', hex: '#d8b4e2' },
      { name: 'شیری خامه‌ای', hex: '#fdf6e2' }
    ],
    description: 'ست فوق‌العاده باکیفیت تولید کشور ترکیه، با بافت سه نخ ضخیم، گلدوزی ظریف، بدون پرزدهی با کشسانی استاندارد برای راحتی بی‌نهایت کودک.',
    material: 'پارچه سه نخ پنبه کج‌راه ترک ضد پرز و ابرفت',
    rating: 5.0,
    reviewsCount: 52,
    isNew: true,
    isBestSeller: true,
    viewsCount: 1890,
    salesCount: 114,
    inStock: true
  },
  {
    id: 'p3',
    name: 'دورس قرمز کالیفرنیا وارداتی',
    category: 'unisex',
    price: 1980000,
    originalPrice: 2200000,
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80'
    ],
    origin: 'وارداتی',
    ageRange: '۴ تا ۱۴ سال',
    sizes: ['سایز ۵-۶ سال', 'سایز ۷-۸ سال', 'سایز ۹-۱۰ سال', 'سایز ۱۱-۱۲ سال', 'سایز ۱۳-۱۴ سال'],
    colors: [
      { name: 'قرمز کالیفرنیا', hex: '#c53030' },
      { name: 'مشکی زغالی', hex: '#262626' },
      { name: 'سفید استخوانی', hex: '#f5f5f4' }
    ],
    description: 'دورس استریت استایل با چاپ ژلاتینی مقاوم کالیفرنیا، تنخور لش و شیک، مناسب ست کردن با انواع شلوارهای جین و کارگو برای دختران و پسران شیک‌پوش.',
    material: 'نخ پنبه سوپر وارداتی با ضمانت شستشو و ثبات رنگ',
    rating: 4.8,
    reviewsCount: 44,
    isNew: true,
    isBestSeller: true,
    viewsCount: 2310,
    salesCount: 130,
    inStock: true
  },
  {
    id: 'p4',
    name: 'هودی سنگشور وارداتی',
    category: 'unisex',
    price: 1980000,
    originalPrice: 2250000,
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80'
    ],
    origin: 'وارداتی',
    ageRange: '۵ تا ۱۳ سال',
    sizes: ['سایز ۵-۶ سال', 'سایز ۷-۸ سال', 'سایز ۹-۱۰ سال', 'سایز ۱۱-۱۲ سال'],
    colors: [
      { name: 'طوسی سنگشور', hex: '#64748b' },
      { name: 'یشمی خاکی', hex: '#475569' },
      { name: 'شکلاتی دودی', hex: '#78350f' }
    ],
    description: 'هودی ضخیم با افکت سنگشور حرفه‌ای، جیب کانگورویی جلو، بند تنظیم کلاه و سرآستین‌های کشباف فشرده که مانع نفوذ باد سرد می‌شود.',
    material: 'پنبه توکرکی فشرده گرم بالا سنگشور شده',
    rating: 4.7,
    reviewsCount: 29,
    isNew: true,
    isBestSeller: true,
    viewsCount: 1750,
    salesCount: 97,
    inStock: true
  },
  {
    id: 'p5',
    name: 'شلوار جین واید لگ یونیسکس وارداتی',
    category: 'unisex',
    price: 2100000,
    originalPrice: 2400000,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80'
    ],
    origin: 'وارداتی',
    ageRange: '۴ تا ۱۴ سال',
    sizes: ['قد ۶۵ (۴-۵ سال)', 'قد ۷۵ (۶-۷ سال)', 'قد ۸۵ (۸-۹ سال)', 'قد ۹۵ (۱۰-۱۲ سال)', 'قد ۱۰۵ (۱۳-۱۴ سال)'],
    colors: [
      { name: 'آبی یخی کلاود', hex: '#93c5fd' },
      { name: 'آبی کلاسیک تیره', hex: '#1d4ed8' },
      { name: 'دودی زغالی', hex: '#374151' }
    ],
    description: 'شلوار جین بگی واید لگ ترند روز با کش مخفی قابل تنظیم دور کمر برای راحتی صددرصدی کودکان. پارچه جین بدون حساسیت و لطیف.',
    material: 'دنیم ۱۰۰٪ پنبه با سنگشویی نرم‌کننده',
    rating: 4.9,
    reviewsCount: 31,
    isNew: false,
    isBestSeller: true,
    viewsCount: 1640,
    salesCount: 82,
    inStock: true
  },
  {
    id: 'p6',
    name: 'کاپشن پفکی ضد آب کلاه خرسی',
    category: 'boys',
    price: 2850000,
    originalPrice: 3200000,
    image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&w=800&q=80',
    origin: 'ترک',
    ageRange: '۲ تا ۷ سال',
    sizes: ['سایز ۲-۳ سال', 'سایز ۴-۵ سال', 'سایز ۶-۷ سال'],
    colors: [
      { name: 'خردلی شاد', hex: '#d97706' },
      { name: 'سرمه‌ای مات', hex: '#1e293b' },
      { name: 'سبز زیتونی', hex: '#3f6212' }
    ],
    description: 'کاپشن سبک و بسیار گرم با آستر خز ببعی، رویه مموری ضد باران و بادگیر با گوش‌های خرسی بامزه روی کلاه.',
    material: 'رویه بارانی مموری و داخل خز تدی بسیار لطیف',
    rating: 5.0,
    reviewsCount: 22,
    isNew: true,
    isBestSeller: false,
    viewsCount: 980,
    salesCount: 45,
    inStock: true
  },
  {
    id: 'p7',
    name: 'پیراهن مجلسی پروانه‌ای دخترانه ترک',
    category: 'girls',
    price: 2950000,
    originalPrice: 3400000,
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
    origin: 'ترک',
    ageRange: '۳ تا ۹ سال',
    sizes: ['سایز ۳-۴ سال', 'سایز ۵-۶ سال', 'سایز ۷-۸ سال', 'سایز ۸-۹ سال'],
    colors: [
      { name: 'کالباسی پرنسسی', hex: '#fda4af' },
      { name: 'سفید مرواریدی', hex: '#ffffff' }
    ],
    description: 'پیراهن شیک مجلسی با دامن چندلایه توری نرم بدون خارش بدن، آستر داخلی ۱۰۰٪ نخ پنبه و پاپیون مخمل پشت کمر.',
    material: 'تور کریستال ترک با آستر پنبه‌ای ارگانیک',
    rating: 4.8,
    reviewsCount: 19,
    isNew: true,
    isBestSeller: false,
    viewsCount: 1120,
    salesCount: 39,
    inStock: true
  },
  {
    id: 'p8',
    name: 'سرهمی بافت نوزادی خرسی ترک',
    category: 'baby',
    price: 1450000,
    originalPrice: 1700000,
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80',
    origin: 'ترک',
    ageRange: '۳ تا ۲۴ ماه',
    sizes: ['۳ تا ۶ ماه', '۶ تا ۱۲ ماه', '۱۲ تا ۱۸ ماه', '۱۸ تا ۲۴ ماه'],
    colors: [
      { name: 'شیری ملایم', hex: '#f5f5f4' },
      { name: 'طوسی فیلی', hex: '#9ca3af' },
      { name: 'قهوه‌ای تدی', hex: '#a16207' }
    ],
    description: 'سرهمی دکمه‌دار جلو با بافت پنبه‌ای کشی بدون الیاف مصنوعی، مناسب پوست حساس نوزاد و محافظت در برابر سرمای فصل.',
    material: 'بافت ریز پنبه ۱۰۰٪ ارگانیک ضد آلرژی',
    rating: 4.9,
    reviewsCount: 27,
    isNew: true,
    isBestSeller: false,
    viewsCount: 890,
    salesCount: 56,
    inStock: true
  }
];

export const SIZE_RECOMMENDATIONS: SizeRecommendation[] = [
  { ageLabel: '۱ تا ۲ سال', suggestedSize: 'سایز ۱ (قد ۸۰-۸۶)', heightRange: '۸۰ تا ۹۰ سانتی‌متر', chest: '۵۲ سانتی‌متر', waist: '۵۰ سانتی‌متر' },
  { ageLabel: '۳ تا ۴ سال', suggestedSize: 'سایز ۲ (قد ۹۲-۹۸)', heightRange: '۹۰ تا ۱۰۲ سانتی‌متر', chest: '۵۶ سانتی‌متر', waist: '۵۳ سانتی‌متر' },
  { ageLabel: '۵ تا ۶ سال', suggestedSize: 'سایز ۳ (قد ۱۰۴-۱۱۰)', heightRange: '۱۰۲ تا ۱۱۵ سانتی‌متر', chest: '۶۰ سانتی‌متر', waist: '۵۶ سانتی‌متر' },
  { ageLabel: '۷ تا ۸ سال', suggestedSize: 'سایز ۴ (قد ۱۱۶-۱۲۲)', heightRange: '۱۱۵ تا ۱۲۸ سانتی‌متر', chest: '۶۴ سانتی‌متر', waist: '۵۹ سانتی‌متر' },
  { ageLabel: '۹ تا ۱۰ سال', suggestedSize: 'سایز ۵ (قد ۱۲۸-۱۳۴)', heightRange: '۱۲۸ تا ۱۴۰ سانتی‌متر', chest: '۷۰ سانتی‌متر', waist: '۶۲ سانتی‌متر' },
  { ageLabel: '۱۱ تا ۱۴ سال', suggestedSize: 'سایز ۶ یا نوجوان (قد ۱۴۰-۱۵۵)', heightRange: '۱۴۰ تا ۱۵۸ سانتی‌متر', chest: '۷۶ سانتی‌متر', waist: '۶۶ سانتی‌متر' }
];
