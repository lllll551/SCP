import React from 'react';
import { Store, HeartHandshake, ShieldCheck, MessageCircle, Sparkles } from 'lucide-react';

export const WhyShopWithUs: React.FC = () => {
  const points = [
    {
      icon: Store,
      title: 'All Under One Roof in Pail',
      desc: 'Save time and travel by finding baby essentials, fashion garments, toys, laces, and celebration accessories in one convenient local store.',
      accent: 'from-purple-900 to-indigo-900',
    },
    {
      icon: MessageCircle,
      title: 'Direct WhatsApp Service (0314-3084561)',
      desc: 'Chat directly with our store team on WhatsApp, check in-store stock, ask about sizes, and place customized orders effortlessly.',
      accent: 'from-emerald-700 to-teal-800',
    },
    {
      icon: HeartHandshake,
      title: 'Bridal & Celebration Specialists',
      desc: 'Specialized handcrafted mehndi thaal trays, velvet mithai boxes, festive laces, and curated gift packaging for memorable family milestones.',
      accent: 'from-amber-600 to-amber-800',
    },
    {
      icon: ShieldCheck,
      title: 'Honest Value & Curated Quality',
      desc: 'Tested soft cotton for newborns, durable indoor toys, and honest pricing in Pakistani Rupees for every family.',
      accent: 'from-purple-800 to-pink-900',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-900 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Why Shop with Saadi Collection Point</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            Dedicated to Your Family & Celebrations
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2.5">
            Serving the local community of Pail, Khushab with genuine warmth and premium retail variety.
          </p>
        </div>

        {/* 4 Pillars 3D Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, idx) => {
            const IconComponent = p.icon;
            return (
              <div key={idx} className="card-3d-wrap">
                <div className="card-3d bg-white p-7 rounded-3xl border border-stone-200 shadow-[0_8px_20px_-4px_rgba(46,8,84,0.06)] hover:border-purple-300 transition-all space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.accent} text-white flex items-center justify-center shadow-md`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-base text-stone-900">
                      {p.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  <div className="pt-2 text-[11px] font-bold text-purple-900 flex items-center gap-1">
                    <span>Guaranteed Local Quality</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
