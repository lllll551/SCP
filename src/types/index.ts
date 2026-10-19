export interface Category {
  id: string;
  name: string;
  urduName: string;
  slug: string;
  description: string;
  urduDescription: string;
  image: string;
  subcategories: string[];
  itemCount?: number;
}

export interface Product {
  id: string;
  name: string;
  urduName?: string;
  categoryId: string;
  categoryName: string;
  subcategory: string;
  price: number;
  salePrice?: number;
  description: string;
  urduDescription?: string;
  inStock: boolean;
  availabilityText: string;
  image: string;
  features?: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isCelebrationSpecial?: boolean;
  isCustom?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreSettings {
  storeName: string;
  storeNameUrdu: string;
  tagline: string;
  taglineUrdu: string;
  address: string;
  addressUrdu: string;
  locationArea: string;
  city: string;
  district: string;
  province: string;
  country: string;
  whatsappNumber: string;
  contactPhone: string;
  openingHours: string;
  openingHoursUrdu: string;
  googleMapsQueryUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  isConfiguredWhatsApp: boolean;
}
