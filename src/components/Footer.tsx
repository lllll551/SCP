import React from 'react';
import { MapPin, MessageCircle, Settings, ExternalLink } from 'lucide-react';
import { StoreSettings, Category } from '../types';

interface FooterProps {
  settings: StoreSettings;
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  categories,
  onSelectCategory,
  onNavigateSection,
  onOpenSettings,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand & Logo (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/saadi_store_logo_1792392262367.jpg"
                alt="Saadi Collection Point Logo"
                className="w-12 h-12 rounded-xl object-contain bg-white p-0.5 border border-stone-700 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-display text-lg font-bold text-white tracking-tight block">
                  {settings.storeName}
                </span>
                <span className="text-xs text-amber-400 font-medium">
                  Retail & Gift Store · Pail, Khushab
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Your trusted local destination in Pail, Khushab for baby essentials, fashion, gifts, toys, laces, electronic accessories, and celebration items for birthdays, mehndi, and weddings.
            </p>

            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href="https://wa.me/923143084561" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-emerald-300 font-semibold text-emerald-400"
                >
                  WhatsApp: 0314-3084561
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Categories (Col 5) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              All 9 Product Categories
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCategory(c.id)}
                  className="text-left text-stone-400 hover:text-amber-300 transition-colors truncate"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Links & Store Portal (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Store Information
            </div>
            <div className="flex flex-col space-y-2 text-xs text-stone-400">
              <button
                onClick={() => onNavigateSection('about-section')}
                className="text-left hover:text-white transition-colors"
              >
                About Saadi Collection Point
              </button>
              <button
                onClick={() => onNavigateSection('location-section')}
                className="text-left hover:text-white transition-colors"
              >
                Store Location & Timings
              </button>
              <a
                href={settings.googleMapsQueryUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                Directions on Google Maps <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={onOpenSettings}
                className="text-left text-purple-300 hover:text-amber-300 transition-colors pt-2 flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Store Owner Admin Mode</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Saadi Collection Point. Pail, Khushab, Punjab, Pakistan. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-stone-400">Currency: Pakistani Rupee (PKR / Rs.)</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-medium">WhatsApp: 0314-3084561</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
