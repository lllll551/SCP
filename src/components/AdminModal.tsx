import React, { useState } from 'react';
import { X, Settings, Plus, Save, RotateCcw, Download, Upload, Trash2, Edit3, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product, StoreSettings } from '../types';
import { CATEGORIES } from '../data/categories';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: StoreSettings;
  onSaveSettings: (settings: StoreSettings) => void;
  products: Product[];
  onSaveProducts: (products: Product[]) => void;
  onResetProducts: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  products,
  onSaveProducts,
  onResetProducts,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'store' | 'products' | 'add'>('store');
  
  // Settings Form State
  const [formData, setFormData] = useState<StoreSettings>({ ...settings });
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    categoryId: CATEGORIES[0].id,
    subcategory: CATEGORIES[0].subcategories[0],
    price: 1000,
    salePrice: undefined,
    description: '',
    inStock: true,
    availabilityText: 'In Stock (Pail Store)',
    image: CATEGORIES[0].image,
    features: ['100% Quality Checked', 'Pail Store Pickup Available'],
  });
  const [productSuccess, setProductSuccess] = useState(false);

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...formData,
      isConfiguredWhatsApp: true,
    };
    onSaveSettings(updated);
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 2000);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const cat = CATEGORIES.find((c) => c.id === newProduct.categoryId) || CATEGORIES[0];
    const created: Product = {
      id: 'custom-' + Date.now(),
      name: newProduct.name,
      categoryId: cat.id,
      categoryName: cat.name,
      subcategory: newProduct.subcategory || cat.subcategories[0],
      price: Number(newProduct.price),
      salePrice: newProduct.salePrice ? Number(newProduct.salePrice) : undefined,
      description: newProduct.description || `${newProduct.name} available at Saadi Collection Point, Pail, Khushab.`,
      inStock: newProduct.inStock ?? true,
      availabilityText: newProduct.availabilityText || 'In Stock (Pail Store)',
      image: newProduct.image || cat.image,
      features: newProduct.features || ['Available at Pail Store'],
      isCustom: true,
      isNewArrival: true,
    };

    onSaveProducts([created, ...products]);
    setProductSuccess(true);
    setTimeout(() => setProductSuccess(false), 2000);
    // Reset form
    setNewProduct({
      name: '',
      categoryId: CATEGORIES[0].id,
      subcategory: CATEGORIES[0].subcategories[0],
      price: 1000,
      description: '',
      inStock: true,
      availabilityText: 'In Stock (Pail Store)',
      image: CATEGORIES[0].image,
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this product?')) {
      onSaveProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleUpdateProductPrice = (id: string, newPrice: number, inStock: boolean) => {
    onSaveProducts(
      products.map((p) => (p.id === id ? { ...p, price: newPrice, inStock } : p))
    );
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'saadi_collection_inventory.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          onSaveProducts(parsed);
          alert('Inventory catalog imported successfully!');
        } else {
          alert('Invalid JSON file format. Must be an array of products.');
        }
      } catch {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/70 backdrop-blur-xs">
      
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-900 text-amber-300 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-stone-900">
                Store Owner Management Panel
              </h2>
              <div className="text-xs text-stone-500">
                Official WhatsApp: {formData.whatsappNumber} · Store Location: Pail, Khushab
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Guidance Banner */}
        <div className="bg-amber-50 px-6 py-3 border-b border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Catalog Note:</span> You can edit prices, stock status, or add new products. All changes are saved directly in your browser, and you can export/import JSON backups.
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 px-6 bg-white gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('store')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'store'
                ? 'border-purple-900 text-purple-950'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Store Information & WhatsApp
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-purple-900 text-purple-950'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Manage Existing Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'add'
                ? 'border-purple-900 text-purple-950'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            + Add New Product
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: Store Settings Form */}
          {activeTab === 'store' && (
            <form onSubmit={handleSaveStoreSettings} className="space-y-5 max-w-2xl">
              {settingsSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Store settings updated and saved successfully!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-200 outline-none focus:border-purple-800"
                  required
                />
              </div>

              <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-3">
                <div className="text-xs font-bold text-purple-950 uppercase tracking-wider">
                  Official WhatsApp & Call Numbers
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      WhatsApp Number (Ordering)
                    </label>
                    <input
                      type="text"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      placeholder="0314-3084561"
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white outline-none focus:border-purple-800 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone Number (Call)
                    </label>
                    <input
                      type="text"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="0314-3084561"
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-white outline-none focus:border-purple-800 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Store Physical Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-200 outline-none focus:border-purple-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={formData.openingHours}
                  onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-200 outline-none focus:border-purple-800"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-amber-300 font-semibold text-xs flex items-center gap-2 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Store Configuration</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Manage Existing Products */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200 text-xs">
                <div className="text-stone-600">
                  Showing <span className="font-bold">{products.length}</span> stocked products across all 9 categories.
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportJSON}
                    className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center gap-1.5 font-medium transition-colors"
                    title="Export catalog as JSON backup"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Catalog</span>
                  </button>

                  <label className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center gap-1.5 font-medium transition-colors cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import JSON</span>
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                  </label>

                  <button
                    onClick={() => {
                      if (confirm('Reset catalog back to initial default items?')) {
                        onResetProducts();
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 flex items-center gap-1.5 font-medium transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </div>

              <div className="divide-y divide-stone-100">
                {products.map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-stone-900 truncate">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {p.categoryName} · {p.subcategory}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-bold text-stone-900 tabular-nums">
                          Rs. {p.price.toLocaleString('en-PK')}
                        </div>
                        <div className={`text-[10px] font-semibold ${p.inStock ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const newPrice = prompt(`Enter new PKR price for "${p.name}":`, String(p.price));
                          if (newPrice !== null && !isNaN(Number(newPrice)) && Number(newPrice) > 0) {
                            const newInStock = confirm(`Is this item currently in stock?\nClick OK for In Stock, Cancel for Out of Stock.`);
                            handleUpdateProductPrice(p.id, Number(newPrice), newInStock);
                          }
                        }}
                        className="p-1.5 text-stone-500 hover:text-purple-900 hover:bg-stone-100 rounded-lg"
                        title="Edit price or stock status"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Add New Product */}
          {activeTab === 'add' && (
            <form onSubmit={handleAddProduct} className="space-y-4 max-w-2xl">
              {productSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>New product added to store catalog!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  value={newProduct.name || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Baby Winter Romper Set"
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-200 outline-none focus:border-purple-800"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newProduct.categoryId}
                    onChange={(e) => {
                      const selectedCat = CATEGORIES.find((c) => c.id === e.target.value) || CATEGORIES[0];
                      setNewProduct({
                        ...newProduct,
                        categoryId: selectedCat.id,
                        subcategory: selectedCat.subcategories[0],
                        image: selectedCat.image,
                      });
                    }}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white outline-none focus:border-purple-800"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Subcategory
                  </label>
                  <select
                    value={newProduct.subcategory}
                    onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white outline-none focus:border-purple-800"
                  >
                    {(CATEGORIES.find((c) => c.id === newProduct.categoryId)?.subcategories || []).map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Price in PKR (Rs.) *
                  </label>
                  <input
                    type="number"
                    value={newProduct.price || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    placeholder="1200"
                    min="1"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-200 outline-none focus:border-purple-800 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Sale Price in PKR (Optional)
                  </label>
                  <input
                    type="number"
                    value={newProduct.salePrice || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, salePrice: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="Optional discount price"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-200 outline-none focus:border-purple-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Product Description
                </label>
                <textarea
                  value={newProduct.description || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={2}
                  placeholder="Details about quality, material, or color options..."
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-200 outline-none focus:border-purple-800"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-amber-300 font-semibold text-xs flex items-center gap-2 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product to Inventory</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
