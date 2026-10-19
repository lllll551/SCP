import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <section id="categories-section" className="py-12 sm:py-16 bg-gradient-to-b from-white via-purple-50/20 to-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-900 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Browse Store Departments</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
              Explore All 9 Shopping Categories
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md leading-relaxed">
            From newborn baby garments and cozy wraps to luxury wedding trays and fancy laces, explore everything available at our Pail retail store.
          </p>
        </div>

        {/* 9 Categories 3D Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;

            return (
              <div key={cat.id} className="card-3d-wrap">
                <div
                  onClick={() => onSelectCategory(cat.id)}
                  className={`card-3d group cursor-pointer rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between bg-white relative ${
                    isSelected 
                      ? 'border-purple-900 ring-4 ring-purple-900/15 shadow-2xl' 
                      : 'border-stone-200 shadow-[0_10px_24px_-6px_rgba(46,8,84,0.08)] hover:border-purple-300'
                  }`}
                >
                  {/* Category Image with Gloss Reflection */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-200 gloss-reflect">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    
                    {/* Rich 3D gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-950/30 to-transparent flex items-end p-5">
                      <div>
                        <div className="text-amber-300 text-[11px] font-bold uppercase tracking-widest drop-shadow-sm flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                          <span>Department</span>
                        </div>
                        <h3 className="text-white font-display text-xl sm:text-2xl font-extrabold leading-tight drop-shadow-md">
                          {cat.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Card Content & Subcategories */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5 bg-gradient-to-b from-white to-stone-50/70">
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Subcategories tags */}
                    <div className="pt-2 border-t border-stone-100">
                      <div className="text-[11px] font-bold text-purple-900 uppercase tracking-wider mb-2">
                        Stocked Items:
                      </div>
                      <div className="text-xs text-stone-600 flex flex-wrap gap-x-2 gap-y-1.5">
                        {cat.subcategories.slice(0, 3).map((sub, idx) => (
                          <span key={sub} className="flex items-center gap-1.5 bg-stone-100/80 px-2 py-0.5 rounded-md text-[11px] font-medium text-stone-700">
                            <span>{sub}</span>
                          </span>
                        ))}
                        {cat.subcategories.length > 3 && (
                          <span className="text-purple-800 font-bold text-[11px] self-center">+{cat.subcategories.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-purple-950 group-hover:text-purple-700">
                      <span>{isSelected ? 'Viewing Products Below' : 'Browse All Products'}</span>
                      <div className="w-7 h-7 rounded-full bg-purple-50 group-hover:bg-purple-950 text-purple-900 group-hover:text-amber-300 flex items-center justify-center transition-all">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
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
