import React from 'react';
import { Sparkles, PhoneCall, Gift, Heart, ArrowRight } from 'lucide-react';

interface PromotionalBannerProps {
  onExploreCelebration: () => void;
  onWhatsAppClick: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  onExploreCelebration,
  onWhatsAppClick,
}) => {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 my-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white shadow-2xl border border-purple-800/60 p-8 sm:p-12 lg:p-16">
        
        {/* 3D background lighting effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Celebration & Wedding Specialist</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Make Every Occasion Special with <span className="text-amber-300">Saadi Collection Point.</span>
            </h2>

            <p className="text-sm sm:text-base text-purple-200 max-w-2xl leading-relaxed">
              From baby welcome gifts and birthday balloon arches to traditional mehndi thaal trays, velvet bhaaji boxes, and bridal laces — we help you celebrate life's most cherished family moments.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-purple-300">
              <span className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-amber-300" />
                <span>Custom Gift Wrapping</span>
              </span>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-amber-300" />
                <span>Handmade Bridal Trays</span>
              </span>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Bulk Celebration Orders</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3.5">
            <button
              onClick={onExploreCelebration}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-stone-950 font-extrabold text-sm shadow-xl hover:shadow-2xl hover:scale-102 transition-all flex items-center justify-center gap-2"
            >
              <span>View Celebration Items</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onWhatsAppClick}
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-white font-bold text-sm border border-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>WhatsApp Inquiry: 0314-3084561</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
