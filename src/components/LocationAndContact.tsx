import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Settings, MessageCircle } from 'lucide-react';
import { StoreSettings } from '../types';

interface LocationAndContactProps {
  settings: StoreSettings;
  onOpenSettings: () => void;
}

export const LocationAndContact: React.FC<LocationAndContactProps> = ({
  settings,
  onOpenSettings,
}) => {
  const encodedAddress = encodeURIComponent(settings.address);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location-section" className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
            Visit Our Retail Store
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Store Location & Contact Information
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Located conveniently near Govt Girls High School in Pail, Khushab, Punjab.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Business Details Card (Col 5) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              {/* Business Name with Logo Mark */}
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/saadi_store_logo_1792392262367.jpg"
                  alt="Saadi Collection Point Logo"
                  className="w-12 h-12 rounded-xl object-contain border border-stone-200 shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-xs font-semibold text-purple-900 uppercase tracking-wider">
                    Business Name
                  </div>
                  <h3 className="font-display text-xl font-extrabold text-stone-900">
                    {settings.storeName}
                  </h3>
                </div>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-3 pt-4 border-t border-stone-100">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Store Address
                  </div>
                  <div className="text-sm font-medium text-stone-900 mt-1 leading-snug">
                    {settings.address}
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-3 pt-4 border-t border-stone-100">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Opening Hours
                  </div>
                  <div className="text-sm font-semibold text-stone-900 mt-1">
                    {settings.openingHours}
                  </div>
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div className="flex items-start gap-3 pt-4 border-t border-stone-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Official WhatsApp & Phone
                  </div>
                  <a
                    href="https://wa.me/923143084561"
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-bold text-emerald-700 hover:text-emerald-800 tabular-nums block mt-0.5"
                  >
                    0314-3084561
                  </a>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Direct inquiries for product availability, orders, & bridal custom work.
                  </div>
                </div>
              </div>

              {/* Configured Social Media (Hidden if unconfigured as strictly specified) */}
              {(settings.facebookUrl || settings.instagramUrl) && (
                <div className="pt-4 border-t border-stone-100 space-y-2">
                  <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Social Media
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    {settings.facebookUrl && (
                      <a 
                        href={settings.facebookUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-purple-900 hover:underline flex items-center gap-1"
                      >
                        Facebook Page <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {settings.instagramUrl && (
                      <a 
                        href={settings.instagramUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-purple-900 hover:underline flex items-center gap-1"
                      >
                        Instagram Profile <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* "Get Directions" Google Maps CTA */}
            <div className="pt-6 border-t border-stone-100 space-y-2">
              <a
                href={settings.googleMapsQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-purple-950 hover:bg-purple-900 text-amber-300 font-semibold text-sm shadow-xs flex items-center justify-center gap-2 transition-colors text-center"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center justify-between text-xs text-stone-400 px-1">
                <span>Near Govt Girls High School, Pail</span>
                <button
                  onClick={onOpenSettings}
                  className="text-purple-900 hover:underline font-medium"
                >
                  Store Admin & Settings
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Google Map Search Embed (Col 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden flex flex-col">
            <div className="p-4 bg-stone-100/70 border-b border-stone-200 flex items-center justify-between text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-900" />
                <span className="font-semibold text-stone-800">Map Search: Pail, Khushab</span>
              </div>
              <a
                href={settings.googleMapsQueryUrl}
                target="_blank"
                rel="noreferrer"
                className="text-purple-900 hover:underline font-medium"
              >
                Open in Google Maps App ↗
              </a>
            </div>

            <div className="flex-1 min-h-[380px] w-full bg-stone-200 relative">
              <iframe
                title="Saadi Collection Point Store Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            <div className="p-3 bg-stone-50 border-t border-stone-200 text-center text-xs text-stone-500">
              Address: Near Govt Girls High School, Pail, Khushab, Punjab, Pakistan
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
