import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { createWhatsAppChatUrl } from '../config/storeConfig';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
  storeName: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  whatsappNumber,
  storeName,
}) => {
  const [popupOpen, setPopupOpen] = useState(false);

  const handleOpenDirectChat = (customMessage?: string) => {
    const defaultMsg = customMessage || (
      `Assalam-o-Alaikum! I am reaching out to Saadi Collection Point (Pail, Khushab). I would like to inquire about products.`
    );
    const url = createWhatsAppChatUrl(whatsappNumber, defaultMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setPopupOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      
      {/* Quick Inquiry Popup Dialog */}
      {popupOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 fill-white" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">{storeName}</div>
                <div className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>WhatsApp: 0314-3084561</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setPopupOpen(false)}
              className="p-1 hover:bg-emerald-700 rounded-lg text-emerald-100"
              aria-label="Close chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Questions */}
          <div className="p-3.5 space-y-2 text-xs bg-stone-50">
            <p className="text-stone-600 text-[11px]">
              Welcome! How can we assist your shopping today in Pail, Khushab?
            </p>

            <button
              onClick={() => handleOpenDirectChat('Assalam-o-Alaikum! Is newborn baby clothing and rompers available in stock at your Pail store?')}
              className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 border border-stone-200/80 text-stone-700 transition-colors flex items-center justify-between"
            >
              <span>👶 Newborn items inquiry</span>
              <Send className="w-3 h-3 text-emerald-600" />
            </button>

            <button
              onClick={() => handleOpenDirectChat('Assalam-o-Alaikum! I want to inquire about bridal mehndi thaal and wedding favor packing.')}
              className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 border border-stone-200/80 text-stone-700 transition-colors flex items-center justify-between"
            >
              <span>💐 Bridal & Mehndi packing</span>
              <Send className="w-3 h-3 text-emerald-600" />
            </button>

            <button
              onClick={() => handleOpenDirectChat('Assalam-o-Alaikum! Please share your exact shop location near Govt Girls High School, Pail.')}
              className="w-full text-left p-2 rounded-lg bg-white hover:bg-emerald-50 border border-stone-200/80 text-stone-700 transition-colors flex items-center justify-between"
            >
              <span>📍 Store location & directions</span>
              <Send className="w-3 h-3 text-emerald-600" />
            </button>

            <button
              onClick={() => handleOpenDirectChat()}
              className="w-full mt-2 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-center transition-colors shadow-xs"
            >
              Chat on 0314-3084561
            </button>
          </div>
        </div>
      )}

      {/* Primary Floating Action Button */}
      <button
        onClick={() => setPopupOpen(!popupOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 group active:scale-95"
        aria-label="Chat with store on WhatsApp: 0314-3084561"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="font-semibold text-xs sm:text-sm tracking-wide hidden sm:inline">
          Order on WhatsApp (0314-3084561)
        </span>
      </button>
    </div>
  );
};
