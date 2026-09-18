import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, CategoryFilter } from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductSection } from './components/ProductSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AuthModal } from './components/AuthModal';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';
import { InfoModal, InfoModalType } from './components/InfoModal';
import { ProjectDownloadModal } from './components/ProjectDownloadModal';
import { Check, Sparkles } from 'lucide-react';

export function App() {
  // Navigation & Search State
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [sizeGuideModalOpen, setSizeGuideModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<InfoModalType>(null);

  // User State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Cart State (Persisted)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('minimani_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted)
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('minimani_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Discount code state
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('minimani_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('minimani_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    selectedSize: string,
    selectedColor: string,
    quantity: number = 1
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedSize, selectedColor, quantity }];
      }
    });

    showToast(`«${product.name}» به سبد خرید اضافه شد`);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (
    productId: string,
    size: string,
    color: string,
    qty: number
  ) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId, size, color);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`«${product.name}» از علاقه‌مندی‌ها حذف شد`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`«${product.name}» به علاقه‌مندی‌ها افزوده شد`);
        return [...prev, product];
      }
    });
  };

  // Discount code application
  const handleApplyDiscount = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'MINIMANI' || clean === 'MINI10') {
      const subtotal = cart.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
      setDiscountCode(clean);
      setDiscountAmount(Math.round(subtotal * 0.1));
      return true;
    } else if (clean === 'YALDA') {
      setDiscountCode(clean);
      setDiscountAmount(150000);
      return true;
    }
    return false;
  };

  const handleOrderCompleted = () => {
    setCart([]);
    setDiscountCode('');
    setDiscountAmount(0);
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const freeShipping = cartSubtotal >= 2000000 || cart.length === 0;
  const shippingFee = freeShipping ? 0 : 65000;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Filtered by search query if any
  const displayedProducts = PRODUCTS.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.origin.includes(q) ||
      p.ageRange.includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/20 text-stone-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-in slide-in-from-bottom-5 border border-stone-700">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setCartDrawerOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setWishlistModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenSizeGuide={() => setSizeGuideModalOpen(true)}
        onOpenContact={() => setInfoModalType('contact')}
        onOpenDownload={() => setDownloadModalOpen(true)}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Only show hero banner on default view without search query */}
        {!searchQuery && activeCategory === 'all' && (
          <HeroBanner
            onSelectCategory={setActiveCategory}
            onOpenSizeGuide={() => setSizeGuideModalOpen(true)}
          />
        )}

        {/* Product Catalog */}
        <ProductSection
          products={displayedProducts}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={(p, sz, cl) => handleAddToCart(p, sz, cl, 1)}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenInfo={(type) => setInfoModalType(type)}
        onOpenDownload={() => setDownloadModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, sz, cl, qty) => handleAddToCart(p, sz, cl, qty)}
        isWishlisted={quickViewProduct ? wishlist.some((w) => w.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={() => setSizeGuideModalOpen(true)}
      />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setCartDrawerOpen(false);
          setCheckoutModalOpen(true);
        }}
        discountCode={discountCode}
        onApplyDiscount={handleApplyDiscount}
        discountAmount={discountAmount}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        items={cart}
        totalAmount={cartTotal}
        onOrderCompleted={handleOrderCompleted}
      />

      <SizeGuideModal
        isOpen={sizeGuideModalOpen}
        onClose={() => setSizeGuideModalOpen(false)}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(name) => {
          setIsLoggedIn(true);
          setUserName(name);
          showToast(`خوش آمدید، ${name}!`);
        }}
      />

      <WishlistModal
        isOpen={wishlistModalOpen}
        onClose={() => setWishlistModalOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p, sz, cl) => {
          handleAddToCart(p, sz, cl, 1);
          setWishlistModalOpen(false);
          setCartDrawerOpen(true);
        }}
      />

      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />

      <ProjectDownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
}

export default App;
