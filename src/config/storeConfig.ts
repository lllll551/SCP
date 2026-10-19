import { StoreSettings } from '../types';

/**
 * Saadi Collection Point - Central Store Configuration
 * Official WhatsApp: 03143084561 (+92 314 3084561)
 */

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: "Saadi Collection Point",
  storeNameUrdu: "Saadi Collection Point",
  tagline: "Baby Essentials, Fashion, Gifts, Toys & Celebration Accessories",
  taglineUrdu: "Baby Essentials, Fashion, Gifts, Toys & Celebration Accessories",
  address: "Near Govt Girls High School, Pail, Khushab, Punjab, Pakistan",
  addressUrdu: "Near Govt Girls High School, Pail, Khushab, Punjab, Pakistan",
  locationArea: "Near Govt Girls High School, Pail",
  city: "Pail",
  district: "Khushab",
  province: "Punjab",
  country: "Pakistan",
  whatsappNumber: "0314-3084561",
  contactPhone: "0314-3084561",
  openingHours: "9:00 AM – 9:00 PM (Monday to Sunday)",
  openingHoursUrdu: "9:00 AM – 9:00 PM (Monday to Sunday)",
  googleMapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Near Govt Girls High School, Pail, Khushab, Punjab, Pakistan"),
  facebookUrl: "",
  instagramUrl: "",
  isConfiguredWhatsApp: true,
};

const STORAGE_KEY = 'saadi_collection_store_settings_v2';

export function getStoreSettings(): StoreSettings {
  if (typeof window === 'undefined') return DEFAULT_STORE_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STORE_SETTINGS;
    const parsed = JSON.parse(raw);
    // Ensure the updated official phone number is always applied
    return { 
      ...DEFAULT_STORE_SETTINGS, 
      ...parsed, 
      whatsappNumber: parsed.whatsappNumber && parsed.whatsappNumber !== '+92 300 0000000' ? parsed.whatsappNumber : "0314-3084561",
      contactPhone: parsed.contactPhone && parsed.contactPhone !== '+92 300 0000000' ? parsed.contactPhone : "0314-3084561",
      isConfiguredWhatsApp: true 
    };
  } catch {
    return DEFAULT_STORE_SETTINGS;
  }
}

export function saveStoreSettings(settings: StoreSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error("Failed to save store settings to localStorage", err);
  }
}

/**
 * Sanitizes phone number to international WhatsApp format (e.g. 923143084561)
 */
export function formatWhatsAppNumberForLink(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return '92' + digits.slice(1);
  }
  if (!digits.startsWith('92') && digits.length === 10) {
    return '92' + digits;
  }
  return digits || '923143084561';
}

/**
 * Builds official WhatsApp click-to-chat URL with properly encoded message
 */
export function createWhatsAppChatUrl(phone: string, text: string): string {
  const cleanPhone = formatWhatsAppNumberForLink(phone);
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Generates an inquiry message for a single product order
 */
export function generateSingleProductWhatsAppMessage(
  storeName: string,
  productName: string,
  price: number,
  quantity: number = 1,
  customerName?: string,
  notes?: string
): string {
  const total = price * quantity;
  let msg = `*Assalam-o-Alaikum ${storeName}!* 👋\n\n`;
  msg += `I would like to place an order / inquire about this item:\n\n`;
  msg += `🛍️ *Product:* ${productName}\n`;
  msg += `📦 *Quantity:* ${quantity}\n`;
  msg += `💵 *Price per item:* Rs. ${price.toLocaleString('en-PK')}\n`;
  msg += `💰 *Total Amount:* Rs. ${total.toLocaleString('en-PK')}\n\n`;
  
  if (customerName && customerName.trim()) {
    msg += `👤 *Customer Name:* ${customerName.trim()}\n`;
  }
  if (notes && notes.trim()) {
    msg += `📝 *Notes/Questions:* ${notes.trim()}\n`;
  }

  msg += `\nPlease confirm availability and pickup / delivery details from your Pail, Khushab store. Thank you!`;
  return msg;
}

/**
 * Generates a full itemized cart order message for WhatsApp
 */
export function generateCartWhatsAppMessage(
  storeName: string,
  items: { productName: string; price: number; quantity: number }[],
  subtotal: number,
  customerName?: string,
  customerPhone?: string,
  notes?: string
): string {
  let msg = `*Assalam-o-Alaikum ${storeName}!* 🛍️\n\n`;
  msg += `I would like to place an order from your store (Near Govt Girls High School, Pail):\n\n`;
  msg += `*--- Order Items ---*\n`;
  
  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    msg += `${index + 1}. *${item.productName}*\n`;
    msg += `   Qty: ${item.quantity} × Rs. ${item.price.toLocaleString('en-PK')} = Rs. ${itemTotal.toLocaleString('en-PK')}\n`;
  });

  msg += `\n*Total Amount:* Rs. ${subtotal.toLocaleString('en-PK')}\n\n`;

  if (customerName && customerName.trim()) {
    msg += `👤 *Customer:* ${customerName.trim()}\n`;
  }
  if (customerPhone && customerPhone.trim()) {
    msg += `📞 *Phone:* ${customerPhone.trim()}\n`;
  }
  if (notes && notes.trim()) {
    msg += `📝 *Instructions / Delivery or Pickup:* ${notes.trim()}\n`;
  }

  msg += `\nPlease confirm my order. Thank you!`;
  return msg;
}
