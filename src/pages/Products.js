import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HiAdjustments, HiX } from 'react-icons/hi';
import { products, categories } from '../data/products';
import ProductCard from '../components/product/ProductCard';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [showFilters, setShowFilters] = useState(false);
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory);
    if (search) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, sort, priceRange, search]);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          {search ? (
            <div>
              <h1 className="section-title mb-1">Search: "{search}"</h1>
              <p className="text-gray-400">{filtered.length} results found</p>
            </div>
          ) : (
            <div>
              <h1 className="section-title mb-1">
                {activeCategory === 'All' ? 'All Products' : activeCategory}
              </h1>
              <p className="text-gray-400">{filtered.length} products</p>
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters — Desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-ink text-sm mb-3">Categories</h3>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 font-medium
                        ${activeCategory === cat ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:text-ink hover:bg-gray-50'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-ink text-sm mb-3">Max Price: <span className="text-primary-500">${priceRange[1].toLocaleString()}</span></h3>
                <input type="range" min="0" max="4000" step="50"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-primary-500" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$0</span><span>$4,000</span>
                </div>
              </div>

              {/* Reset */}
              <button onClick={() => { setActiveCategory('All'); setPriceRange([0, 4000]); setSort('featured'); }}
                className="w-full btn-secondary text-sm py-2">
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <button onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden btn-secondary text-sm py-2">
                <HiAdjustments className="w-4 h-4" /> Filters
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-400 hidden sm:block">Sort by:</span>
                <select value={sort} onChange={e => setSort(e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium text-ink">
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-ink">Filters</h3>
                  <button onClick={() => setShowFilters(false)}><HiX className="w-5 h-5 text-gray-400" /></button>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                        ${activeCategory === cat ? 'bg-primary-500 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Max Price: <strong>${priceRange[1].toLocaleString()}</strong></p>
                  <input type="range" min="0" max="4000" step="50" value={priceRange[1]}
                    onChange={e => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-primary-500" />
                </div>
              </div>
            )}

            {/* Active Filters */}
            {(activeCategory !== 'All' || priceRange[1] < 4000 || search) && (
              <div className="flex flex-wrap gap-2 mb-5">
                {activeCategory !== 'All' && (
                  <span className="badge bg-primary-50 text-primary-600 gap-1 cursor-pointer" onClick={() => setActiveCategory('All')}>
                    {activeCategory} <HiX className="w-3 h-3" />
                  </span>
                )}
                {priceRange[1] < 4000 && (
                  <span className="badge bg-primary-50 text-primary-600 gap-1 cursor-pointer" onClick={() => setPriceRange([0, 4000])}>
                    Under ${priceRange[1].toLocaleString()} <HiX className="w-3 h-3" />
                  </span>
                )}
                {search && (
                  <span className="badge bg-primary-50 text-primary-600">Search: "{search}"</span>
                )}
              </div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">🔍</div>
                <h3 className="font-semibold text-ink mb-2">No products found</h3>
                <p className="text-gray-400 text-sm mb-4">Try adjusting your filters</p>
                <button onClick={() => { setActiveCategory('All'); setPriceRange([0, 4000]); }}
                  className="btn-primary text-sm">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
