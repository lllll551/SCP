import React from 'react';
import { Store, MapPin } from 'lucide-react';
import { StoreSettings } from '../types';

interface AboutUsProps {
  settings: StoreSettings;
  onViewLocation: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({
  settings,
  onViewLocation,
}) => {
  return (
    <section id="about-section" className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="bg-gradient-to-br from-stone-50 via-purple-50/30 to-amber-50/20 p-8 sm:p-12 rounded-3xl border border-stone-200/90 shadow-sm relative overflow-hidden">
          
          <div className="max-w-3xl space-y-6">
            
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-900">
              <Store className="w-4 h-4 text-purple-800" />
              <span>About Our Store · Pail, Khushab</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Welcome to Saadi Collection Point
            </h2>

            {/* Exact Required Brand Statement */}
            <blockquote className="text-base sm:text-lg text-stone-700 leading-relaxed font-normal italic border-l-2 border-purple-800/40 pl-4 py-1">
              “Welcome to Saadi Collection Point, your local destination for baby essentials, fashionable garments, beautiful gifts, toys, laces, electronic items, and accessories for birthdays, mehndi, and weddings. We bring a variety of everyday essentials and special-occasion items together in one convenient place. Visit us near Govt Girls High School, Pail, Khushab, and explore our collections.”
            </blockquote>

            {/* Action button */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onViewLocation}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-amber-300 font-semibold text-xs sm:text-sm shadow-xs transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>View Store Location & Hours</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
