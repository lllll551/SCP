import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Search, Menu, X, Settings, MapPin, Phone } from 'lucide-react';
import { StoreSettings } from '../types';

interface HeaderProps {
  settings: StoreSettings;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSettings: () => void;
  onSelectCategory: (categoryId: string) => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onNavigateHome: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  cartCount,
  onOpenCart,
  onOpenSettings,
  onSelectCategory,
  onSearchChange,
  searchQuery,
  onNavigateHome,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const text = `Assalam-o-Alaikum! I am reaching out to Saadi Collection Point (Pail, Khushab) regarding products.`;
    window.open(`https://wa.me/923143084561?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const tickerItems = [
    "✨ Welcome to Saadi Collection Point — Everything You Love in One Place!",
    "📍 Near Govt Girls High School, Pail, Khushab",
    "📞 Official WhatsApp: 0314-3084561",
    "👶 Newborn Baby Essentials & Romper Sets",
    "👗 Premium Fashion & Seasonal Garments",
    "✨ Designer Fancy Laces & Gota Borders",
    "💐 Mehndi & Bridal Thaal Trays & Henna Cones",
    "🎈 Birthday Balloons & Celebration Sets",
    "🧸 Educational Toys & Plush Teddy Bears",
    "💡 Modern Electronics & Decorative Fairy Lights",
    "🎁 Luxury Gift Packing & Wedding Favors",
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      
      {/* 1. Continuous Running Top Marquee Bar */}
      <div className="bg-purple-950 text-purple-100 text-xs py-2 overflow-hidden border-b border-purple-900/60 relative select-none">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-[12px] font-medium tracking-wide">
          {/* Double loop for seamless infinite marquee */}
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <span key={idx} className="flex items-center gap-3">
              <span className="text-amber-300 font-semibold">{item}</span>
              <span className="text-purple-400" aria-hidden="true">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. Main Store Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          
          {/* Zone 1: Official Logo & Store Brand Lockup */}
          <button 
            onClick={onNavigateHome}
            className="flex items-center gap-3 text-left group shrink-0"
          >
            {/* Logo Image */}
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shadow-sm border border-stone-200 group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/src/assets/images/saadi_store_logo_1792392262367.jpg"
                alt="Saadi Collection Point Logo"
                className="w-full h-full object-contain p-0.5"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-purple-950 leading-tight">
                Saadi Collection Point
              </div>
              <div className="text-[11px] text-stone-500 font-medium tracking-wide uppercase">
                Retail & Gift Shop · Pail, Khushab
              </div>
            </div>
          </button>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md items-center relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search baby items, laces, toys, gifts, bridal accessories..."
              className="w-full bg-stone-100/90 hover:bg-stone-100 focus:bg-white text-stone-800 text-xs pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-purple-800 focus:ring-2 focus:ring-purple-800/10 outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')} 
                className="absolute right-3 text-stone-400 hover:text-stone-600 text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Desktop Navigation Links (English only) */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold text-stone-700 uppercase tracking-wider">
            <button 
              onClick={() => onNavigateSection('categories-section')}
              className="hover:text-purple-900 transition-colors whitespace-nowrap"
            >
              Collections
            </button>
            <button 
              onClick={() => onSelectCategory('newborn-baby')}
              className="hover:text-purple-900 transition-colors whitespace-nowrap"
            >
              Baby Items
            </button>
            <button 
              onClick={() => onSelectCategory('laces-accessories')}
              className="hover:text-purple-900 transition-colors whitespace-nowrap"
            >
              Laces
            </button>
            <button 
              onClick={() => onSelectCategory('mehndi-bridal')}
              className="hover:text-purple-900 transition-colors whitespace-nowrap"
            >
              Bridal & Mehndi
            </button>
            <button 
              onClick={() => onSelectCategory('marriage-wedding')}
              className="hover:text-purple-900 transition-colors whitespace-nowrap"
            >
              Wedding
            </button>
            <button 
              onClick={() => onNavigateSection('location-section')}
              className="hover:text-purple-900 transition-colors whitespace-nowrap"
            >
              Location
            </button>
          </nav>

          {/* Zone 3: Interactive Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-purple-950 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Search items"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-purple-950 hover:bg-purple-50 rounded-xl transition-colors border border-stone-200"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-950 text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Callout with 03143084561 */}
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all whitespace-nowrap"
              title="Chat on WhatsApp: 0314-3084561"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">0314-3084561</span>
              <span className="sm:hidden">WhatsApp</span>
            </button>

            {/* Store Settings / Owner Portal */}
            <button
              onClick={onOpenSettings}
              className="p-2 text-stone-500 hover:text-purple-950 hover:bg-stone-100 rounded-xl transition-colors"
              title="Store Inventory & Settings"
              aria-label="Store Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-stone-700 hover:text-purple-950 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Collapse */}
        {searchOpen && (
          <div className="lg:hidden mt-3 pt-2 border-t border-stone-200">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products in Pail, Khushab..."
                className="w-full bg-stone-100 text-stone-900 text-xs pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 outline-none focus:border-purple-800"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-200 bg-white px-4 py-5 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="pb-3 border-b border-stone-100">
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                All 9 Shopping Departments
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => { onSelectCategory('newborn-baby'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-stone-50 hover:bg-purple-50 font-medium text-stone-800 hover:text-purple-950"
                >
                  👶 Newborn Baby Items
                </button>
                <button
                  onClick={() => { onSelectCategory('laces-accessories'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-stone-50 hover:bg-purple-50 font-medium text-stone-800 hover:text-purple-950"
                >
                  ✨ Laces & Accessories
                </button>
                <button
                  onClick={() => { onSelectCategory('mehndi-bridal'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-stone-50 hover:bg-purple-50 font-medium text-stone-800 hover:text-purple-950"
                >
                  💐 Mehndi & Bridal Items
                </button>
                <button
                  onClick={() => { onSelectCategory('marriage-wedding'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-stone-50 hover:bg-purple-50 font-medium text-stone-800 hover:text-purple-950"
                >
                  🎁 Wedding Items
                </button>
                <button
                  onClick={() => { onSelectCategory('toys'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-stone-50 hover:bg-purple-50 font-medium text-stone-800 hover:text-purple-950"
                >
                  🧸 Toys & Games
                </button>
                <button
                  onClick={() => { onSelectCategory('gifts'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-stone-50 hover:bg-purple-50 font-medium text-stone-800 hover:text-purple-950"
                >
                  🎀 Gifts & Keepsakes
                </button>
                <button
                  onClick={() => { onSelectCategory('electronic-items'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-stone-50 hover:bg-purple-50 font-medium text-stone-800 hover:text-purple-950"
                >
                  💡 Electronic Items
                </button>
                <button
                  onClick={() => { onSelectCategory('garments-fashion'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-stone-50 hover:bg-purple-50 font-medium text-stone-800 hover:text-purple-950"
                >
                  👗 Garments & Fashion
                </button>
                <button
                  onClick={() => { onSelectCategory('birthday-party'); setMobileMenuOpen(false); }}
                  className="p-2.5 text-left rounded-lg bg-stone-50 hover:bg-purple-50 font-medium text-stone-800 hover:text-purple-950 col-span-2"
                >
                  🎈 Birthday Party Items
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-1 text-sm font-medium text-stone-700">
              <button
                onClick={() => { onNavigateSection('about-section'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 hover:text-purple-900"
              >
                About Saadi Collection Point
              </button>
              <button
                onClick={() => { onNavigateSection('location-section'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 hover:text-purple-900 flex items-center justify-between"
              >
                <span>Store Location & Timings</span>
                <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Pail, Khushab</span>
              </button>
              <button
                onClick={() => { onOpenSettings(); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-purple-950 font-semibold flex items-center gap-2"
              >
                <Settings className="w-4 h-4 text-purple-700" />
                <span>Store Settings & Inventory</span>
              </button>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>Near Govt Girls High School, Pail</span>
              </div>
              <div className="font-semibold text-emerald-700">
                0314-3084561
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
