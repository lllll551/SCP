import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Package, 
} from 'lucide-react';
import { Product, CartItem, StoreSettings } from './types';
import { CATEGORIES } from './data/categories';
import { getStoredProducts, saveStoredProducts, resetStoredProducts } from './data/products';
import { getStoreSettings, saveStoreSettings, createWhatsAppChatUrl } from './config/storeConfig';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { PromotionalBanner } from './components/PromotionalBanner';
import { WhyShopWithUs } from './components/WhyShopWithUs';
import { AboutUs } from './components/AboutUs';
import { LocationAndContact } from './components/LocationAndContact';
import { AdminModal } from './components/AdminModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { FlyingButterfly } from './components/FlyingButterfly';
import { Footer } from './components/Footer';

const CART_STORAGE_KEY = 'saadi_collection_cart_items_v2';

export default function App() {
  // Store Settings & Inventory State
  const [settings, setSettings] = useState<StoreSettings>(() => getStoreSettings());
  const [products, setProducts] = useState<Product[]>(() => getStoredProducts());
  
  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filtering & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<'all' | 'under1000' | '1000to2500' | 'above2500'>('all');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'priceLow' | 'priceHigh'>('featured');
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'new' | 'bestsellers' | 'celebration'>('all');

  // Sync Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Settings & Product Updates from Admin
  const handleSaveSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    saveStoreSettings(newSettings);
  };

  const handleSaveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    saveStoredProducts(newProducts);
  };

  const handleResetProducts = () => {
    const defaultProds = resetStoredProducts();
    setProducts(defaultProds);
  };

  // Navigation helpers
  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubcategory(null);
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateHome = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSearchQuery('');
    setActiveTab('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // 1. Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(query);
        const matchCat = prod.categoryName.toLowerCase().includes(query);
        const matchSub = prod.subcategory.toLowerCase().includes(query);
        const matchDesc = prod.description.toLowerCase().includes(query);
        if (!matchName && !matchCat && !matchSub && !matchDesc) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory && prod.categoryId !== selectedCategory) {
        return false;
      }

      // 3. Subcategory filter
      if (selectedSubcategory && prod.subcategory !== selectedSubcategory) {
        return false;
      }

      // 4. Tab filter (Featured, New, Bestsellers, Celebration)
      if (activeTab === 'featured' && !prod.isFeatured) return false;
      if (activeTab === 'new' && !prod.isNewArrival) return false;
      if (activeTab === 'bestsellers' && !prod.isBestSeller) return false;
      if (activeTab === 'celebration' && !prod.isCelebrationSpecial) return false;

      // 5. In stock only
      if (onlyInStock && !prod.inStock) {
        return false;
      }

      // 6. Price filter
      const effectivePrice = prod.salePrice ?? prod.price;
      if (priceFilter === 'under1000' && effectivePrice >= 1000) return false;
      if (priceFilter === '1000to2500' && (effectivePrice < 1000 || effectivePrice > 2500)) return false;
      if (priceFilter === 'above2500' && effectivePrice <= 2500) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice ?? a.price;
      const priceB = b.salePrice ?? b.price;
      if (sortBy === 'priceLow') return priceA - priceB;
      if (sortBy === 'priceHigh') return priceB - priceA;
      return 0;
    });
  }, [products, searchQuery, selectedCategory, selectedSubcategory, activeTab, onlyInStock, priceFilter, sortBy]);

  // Selected Category Object
  const currentCategoryObj = useMemo(() => {
    return CATEGORIES.find((c) => c.id === selectedCategory) || null;
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 relative">
      
      {/* Flying Butterfly fluttering across the screen */}
      <FlyingButterfly />

      {/* Header with running ticker, official logo, and 03143084561 WhatsApp */}
      <Header
        settings={settings}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSettings={() => setIsAdminOpen(true)}
        onSelectCategory={handleSelectCategory}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        onNavigateHome={handleNavigateHome}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroBanner
          settings={settings}
          onExploreClick={() => handleNavigateSection('categories-section')}
          onWhatsAppClick={() => {
            const url = createWhatsAppChatUrl(
              settings.whatsappNumber,
              'Assalam-o-Alaikum! I would like to explore shopping options at Saadi Collection Point (Pail, Khushab).'
            );
            window.open(url, '_blank', 'noopener,noreferrer');
          }}
        />

        {/* Categories Section (All 9 Categories) */}
        <CategoryGrid
          categories={CATEGORIES}
          selectedCategoryId={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Product Catalog & Filtering Section */}
        <section id="products-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Header of Product Catalog */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
                  {currentCategoryObj ? currentCategoryObj.name : 'Live Store Inventory'}
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  {currentCategoryObj ? currentCategoryObj.name : 'Explore All Products'}
                </h2>
                {currentCategoryObj && (
                  <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
                    {currentCategoryObj.description}
                  </p>
                )}
              </div>

              {/* Reset Category button if filtered */}
              {selectedCategory && (
                <button
                  onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold self-start"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear Category Filter</span>
                </button>
              )}
            </div>

            {/* Subcategories buttons if category is active */}
            {currentCategoryObj && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                    selectedSubcategory === null
                      ? 'bg-purple-950 text-amber-300'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  All {currentCategoryObj.name}
                </button>
                {currentCategoryObj.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                      selectedSubcategory === sub
                        ? 'bg-purple-950 text-amber-300'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}

            {/* Filter Tabs Bar (All, Featured, New Arrivals, Best Sellers, Celebration) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200 text-xs">
              
              {/* Collection Tabs */}
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl overflow-x-auto max-w-full">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === 'all'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setActiveTab('featured')}
                  className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === 'featured'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setActiveTab('new')}
                  className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === 'new'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  New Arrivals
                </button>
                <button
                  onClick={() => setActiveTab('bestsellers')}
                  className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === 'bestsellers'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Best Sellers
                </button>
                <button
                  onClick={() => setActiveTab('celebration')}
                  className={`px-3 py-1.5 font-medium rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === 'celebration'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Celebration Specials
                </button>
              </div>

              {/* Price & Sort Controls */}
              <div className="flex items-center gap-3">
                
                {/* Price Select */}
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value as any)}
                  className="bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-700 font-medium outline-none text-xs"
                >
                  <option value="all">All Prices</option>
                  <option value="under1000">Under Rs. 1,000</option>
                  <option value="1000to2500">Rs. 1,000 – Rs. 2,500</option>
                  <option value="above2500">Above Rs. 2,500</option>
                </select>

                {/* Sort Select */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-700 font-medium outline-none text-xs"
                >
                  <option value="featured">Sort: Recommended</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>

                {/* In stock toggle */}
                <label className="hidden sm:flex items-center gap-1.5 text-stone-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="rounded text-purple-900 focus:ring-purple-900 w-3.5 h-3.5"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Package className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-stone-800 text-lg">
                  No products matched your criteria
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try clearing your search query or price filter to see more items stocked at Saadi Collection Point.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  setPriceFilter('all');
                  setActiveTab('all');
                }}
                className="px-4 py-2 bg-purple-950 text-amber-300 rounded-xl text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  whatsappNumber={settings.whatsappNumber}
                  storeName={settings.storeName}
                  onViewDetails={setSelectedProduct}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

        </section>

        {/* Promotional Banner: “Make Every Occasion Special with Saadi Collection Point.” */}
        <PromotionalBanner
          onExploreCelebration={() => {
            setActiveTab('celebration');
            handleNavigateSection('products-section');
          }}
          onWhatsAppClick={() => {
            const url = createWhatsAppChatUrl(
              settings.whatsappNumber,
              'Assalam-o-Alaikum! I want to inquire about custom celebration and wedding gift packaging at Saadi Collection Point.'
            );
            window.open(url, '_blank', 'noopener,noreferrer');
          }}
        />

        {/* Section 10: Why Shop With Us */}
        <WhyShopWithUs />

        {/* Section 11: About Us Section (containing required exact introduction quote) */}
        <AboutUs
          settings={settings}
          onViewLocation={() => handleNavigateSection('location-section')}
        />

        {/* Section 12: Store Location and Contact Section */}
        <LocationAndContact
          settings={settings}
          onOpenSettings={() => setIsAdminOpen(true)}
        />

      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        categories={CATEGORIES}
        onSelectCategory={handleSelectCategory}
        onNavigateSection={handleNavigateSection}
        onOpenSettings={() => setIsAdminOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp
        whatsappNumber={settings.whatsappNumber}
        storeName={settings.storeName}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        whatsappNumber={settings.whatsappNumber}
        storeName={settings.storeName}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        whatsappNumber={settings.whatsappNumber}
        storeName={settings.storeName}
      />

      {/* Admin / Store Settings Management Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
        products={products}
        onSaveProducts={handleSaveProducts}
        onResetProducts={handleResetProducts}
      />

    </div>
  );
}
