import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { createWhatsAppChatUrl, generateCartWhatsAppMessage } from '../config/storeConfig';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  whatsappNumber: string;
  storeName: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  whatsappNumber,
  storeName,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  const subtotal = items.reduce((acc, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const handleWhatsAppCheckout = () => {
    const formattedItems = items.map((item) => ({
      productName: item.product.name,
      price: item.product.salePrice ?? item.product.price,
      quantity: item.quantity,
    }));

    const message = generateCartWhatsAppMessage(
      storeName,
      formattedItems,
      subtotal,
      customerName,
      customerPhone,
      customerNotes
    );

    const url = createWhatsAppChatUrl(whatsappNumber, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Background click dismiss */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-over Drawer Panel */}
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-900 text-amber-300 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-stone-900 text-base">
                Shopping Bag
              </h2>
              <div className="text-xs text-stone-500">
                {items.length} {items.length === 1 ? 'item' : 'items'} selected
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-display font-semibold text-stone-800 text-base">
                  Your shopping bag is empty
                </p>
                <p className="text-xs text-stone-500 max-w-xs">
                  Explore baby items, laces, toys, gifts, and wedding collections to add to your order.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-purple-950 text-amber-300 text-xs font-semibold hover:bg-purple-900 transition-colors"
              >
                Start Browsing Collections
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const itemPrice = item.product.salePrice ?? item.product.price;
                const lineTotal = itemPrice * item.quantity;

                return (
                  <div
                    key={item.product.id}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 flex items-start gap-3"
                  >
                    {/* Item Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-stone-200 shrink-0 border border-stone-200"
                      referrerPolicy="no-referrer"
                    />

                    {/* Details & Controls */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-stone-900 leading-snug truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 mt-0.5">
                        Rs. {itemPrice.toLocaleString('en-PK')} each
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-200/50">
                        {/* Stepper */}
                        <div className="flex items-center border border-stone-200 rounded-lg bg-white overflow-hidden text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 hover:bg-stone-100 text-stone-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 font-bold text-stone-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-stone-100 text-stone-600"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <span className="text-xs font-bold text-stone-900 tabular-nums">
                          Rs. {lineTotal.toLocaleString('en-PK')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Clear Cart Button */}
              <div className="text-right pt-1">
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-stone-400 hover:text-stone-700 underline"
                >
                  Clear all items
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer: Subtotal and WhatsApp Ordering */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
            
            {/* Optional Customer Contact Fields */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                Your Order Info (Optional):
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white outline-none focus:border-purple-800"
                />
                <input
                  type="tel"
                  placeholder="Your Phone / City"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white outline-none focus:border-purple-800"
                />
              </div>
              <input
                type="text"
                placeholder="Pickup or delivery note for Saadi Collection..."
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white outline-none focus:border-purple-800"
              />
            </div>

            {/* Subtotal Calculation */}
            <div className="pt-2 border-t border-stone-200/80 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600">Subtotal:</span>
                <span className="font-extrabold text-stone-950 font-display text-lg tabular-nums">
                  Rs. {subtotal.toLocaleString('en-PK')}
                </span>
              </div>
              <div className="text-[11px] text-stone-400">
                Direct WhatsApp confirmation with Saadi Collection Point (0314-3084561).
              </div>
            </div>

            {/* Submit to WhatsApp Button */}
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Complete Order on WhatsApp (0314-3084561)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
