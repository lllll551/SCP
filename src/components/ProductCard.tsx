import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Eye, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { createWhatsAppChatUrl, generateSingleProductWhatsAppMessage } from '../config/storeConfig';

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
  storeName: string;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  whatsappNumber,
  storeName,
  onViewDetails,
  onAddToCart,
}) => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const effectivePrice = product.salePrice ?? product.price;
    const msg = generateSingleProductWhatsAppMessage(
      storeName,
      product.name,
      effectivePrice,
      1
    );
    const url = createWhatsAppChatUrl(whatsappNumber, msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const hasSale = product.salePrice && product.salePrice < product.price;

  return (
    <div className="card-3d-wrap">
      <div 
        onClick={() => onViewDetails(product)}
        className="card-3d group bg-white rounded-3xl border border-stone-200/90 shadow-[0_8px_20px_-4px_rgba(46,8,84,0.08)] flex flex-col justify-between overflow-hidden cursor-pointer relative"
      >
        {/* 1. Image Area with 3D Gloss Sweep and Fallback */}
        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden gloss-reflect">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* 3D Glassmorphic In-Stock Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-white/70">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" aria-hidden="true" />
            <span>{product.availabilityText}</span>
          </div>

          {hasSale && (
            <div className="absolute top-3 right-3 text-[11px] font-bold text-amber-950 bg-gradient-to-r from-amber-300 to-amber-400 px-2.5 py-0.5 rounded-xl shadow-md border border-amber-200/80">
              SAVE Rs. {product.price - (product.salePrice ?? 0)}
            </div>
          )}

          {/* 3D Quick View Overlay */}
          <div className="absolute inset-0 bg-stone-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/95 text-purple-950 text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg border border-purple-100 flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Eye className="w-3.5 h-3.5 text-purple-800" />
              <span>Quick View</span>
            </span>
          </div>
        </div>

        {/* 2. Content Details with Layered Typography */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 bg-gradient-to-b from-white to-stone-50/50">
          
          <div>
            {/* Category Quiet Metadata */}
            <div className="text-[11px] font-semibold uppercase tracking-wider text-purple-900 mb-1 flex items-center justify-between">
              <span className="truncate">{product.categoryName}</span>
              <span className="text-stone-400 font-normal text-[10px] shrink-0">{product.subcategory}</span>
            </div>

            {/* Product Title */}
            <h3 className="font-display font-bold text-sm sm:text-base text-stone-900 group-hover:text-purple-950 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>

            {/* Short Description */}
            <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing & 3D Interactive Buttons */}
          <div className="pt-3 border-t border-stone-100 space-y-3">
            
            {/* Price Baseline */}
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg sm:text-xl font-extrabold text-stone-950 tabular-nums">
                Rs. {(product.salePrice ?? product.price).toLocaleString('en-PK')}
              </span>
              {hasSale && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  Rs. {product.price.toLocaleString('en-PK')}
                </span>
              )}
            </div>

            {/* 3D Action Buttons Row */}
            <div className="grid grid-cols-2 gap-2">
              {/* Order on WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200/90 shadow-xs hover:shadow active:scale-95 transition-all"
                title="Order on WhatsApp: 0314-3084561"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600 shrink-0" />
                <span className="truncate">WhatsApp</span>
              </button>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all ${
                  added
                    ? 'bg-purple-900 text-amber-300 shadow-md'
                    : 'bg-stone-900 hover:bg-purple-950 text-white shadow-sm hover:shadow'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Add to Bag</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
