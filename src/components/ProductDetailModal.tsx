import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, CheckCircle2, MapPin, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { createWhatsAppChatUrl, generateSingleProductWhatsAppMessage } from '../config/storeConfig';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  whatsappNumber: string;
  storeName: string;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  whatsappNumber,
  storeName,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [added, setAdded] = useState(false);

  const effectivePrice = product.salePrice ?? product.price;
  const totalPrice = effectivePrice * quantity;

  const handleWhatsAppOrder = () => {
    const msg = generateSingleProductWhatsAppMessage(
      storeName,
      product.name,
      effectivePrice,
      quantity,
      customerName,
      customerNote
    );
    const url = createWhatsAppChatUrl(whatsappNumber, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Product Image */}
          <div className="relative bg-stone-100 aspect-square md:aspect-auto h-72 md:h-full overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-md text-xs font-semibold text-emerald-800 border border-emerald-100 shadow-xs">
              {product.availabilityText}
            </div>
          </div>

          {/* Right Column: Information & Ordering Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-3">
              {/* Category Quiet Line */}
              <div className="text-xs font-semibold uppercase tracking-wider text-purple-900">
                <span>{product.categoryName}</span>
                <span className="text-stone-300 mx-2" aria-hidden="true">·</span>
                <span className="text-stone-500 font-normal">{product.subcategory}</span>
              </div>

              {/* Title */}
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                {product.name}
              </h2>

              {/* Price Baseline */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-stone-950 tabular-nums">
                  Rs. {effectivePrice.toLocaleString('en-PK')}
                </span>
                {product.salePrice && product.salePrice < product.price && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    Rs. {product.price.toLocaleString('en-PK')}
                  </span>
                )}
                <span className="text-xs text-stone-500">PKR per item</span>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed pt-2">
                {product.description}
              </p>

              {/* Features List */}
              {product.features && product.features.length > 0 && (
                <div className="pt-2 space-y-1.5">
                  <div className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Highlights:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-stone-600">
                    {product.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-800 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Stepper & Total */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Quantity
                </span>
                <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-stone-200 text-stone-700 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold text-stone-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-stone-200 text-stone-700 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="flex items-center justify-between text-xs text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
                <span>Total Amount for {quantity} item(s):</span>
                <span className="text-sm font-bold text-stone-900 tabular-nums">
                  Rs. {totalPrice.toLocaleString('en-PK')}
                </span>
              </div>

              {/* Optional Quick Customer Inquiry Input */}
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 focus:border-purple-800 outline-none"
                />
                <input
                  type="text"
                  placeholder="Order note / size / question for store owner (Optional)"
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-200 focus:border-purple-800 outline-none"
                />
              </div>

              {/* Primary Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>
                    Order on WhatsApp (Rs. {totalPrice.toLocaleString('en-PK')})
                  </span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-purple-950 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{added ? 'Added to Bag!' : 'Add to Shopping Bag'}</span>
                </button>
              </div>

              {/* Trust Footer */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 pt-1">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>Available for pickup or inquiry in Pail, Khushab (0314-3084561)</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
