import React from 'react';
import { ArrowRight, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';
import { StoreSettings } from '../types';

interface HeroBannerProps {
  settings: StoreSettings;
  onExploreClick: () => void;
  onWhatsAppClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  settings,
  onExploreClick,
  onWhatsAppClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100/90 via-white to-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Location Trust Tag */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-900">
              <span className="inline-flex items-center gap-1.5 text-amber-700">
                <MapPin className="w-3.5 h-3.5" />
                <span>Pail, Khushab Retail Store</span>
              </span>
              <span className="text-stone-300" aria-hidden="true">·</span>
              <span className="text-stone-600">Near Govt Girls High School</span>
            </div>

            {/* Primary Hero Heading */}
            <div className="space-y-3">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-stone-900 tracking-tight leading-[1.15] text-balance">
                Discover Everything <span className="text-purple-900">You Love!</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
                Baby Essentials, Fashion, Gifts, Toys & Celebration Accessories — All Under One Roof.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-amber-300 font-semibold text-sm sm:text-base shadow-sm hover:shadow transition-all group"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onWhatsAppClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base shadow-sm transition-all"
                title="WhatsApp 0314-3084561"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Shop on WhatsApp (0314-3084561)</span>
              </button>
            </div>

            {/* Local Store Trust Highlights */}
            <div className="pt-4 border-t border-stone-200/80 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified In-Store Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fair Prices in PKR</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom Gift & Bridal Packing</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-purple-950/20 shadow-xl bg-stone-900 group">
              <img
                src="/src/assets/images/saadi_hero_banner_1792391582902.jpg"
                alt="Saadi Collection Point Storefront in Pail Khushab"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Scrim with store mark */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-bold mb-1">
                  <span>SAADI COLLECTION POINT</span>
                  <span className="text-purple-300" aria-hidden="true">·</span>
                  <span>PAIL, KHUSHAB</span>
                </div>
                <p className="text-xs text-stone-200 line-clamp-2">
                  Serving families and shoppers across Pail, Khushab with curated essentials and celebration accessories.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
