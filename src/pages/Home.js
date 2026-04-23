import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiShieldCheck, HiTruck, HiRefresh, HiSupport } from 'react-icons/hi';
import { products, categories } from '../data/products';
import ProductCard from '../components/product/ProductCard';

const features = [
  { icon: HiTruck, title: 'Free Shipping', desc: 'On orders over $99' },
  { icon: HiShieldCheck, title: '2-Year Warranty', desc: 'Full manufacturer warranty' },
  { icon: HiRefresh, title: '30-Day Returns', desc: 'Hassle-free returns' },
  { icon: HiSupport, title: '24/7 Support', desc: 'Expert tech assistance' },
];

const featured = products.filter(p => p.badge === 'Best Seller' || p.badge === 'Top Rated' || p.badge === 'New').slice(0, 4);
const onSale = products.filter(p => p.badge === 'Sale').slice(0, 4);

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                New Arrivals — Spring 2025
              </div>
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-ink leading-tight mb-6 text-balance">
                Premium Tech
                <span className="text-primary-500 block">Delivered Fast</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
                Discover the latest smartphones, laptops, audio gear, and gadgets
                from the world's top brands. Free shipping on orders over $99.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/products" className="btn-primary text-base px-6 py-3">
                  Shop Now <HiArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/products" className="btn-secondary text-base px-6 py-3">
                  View Deals
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 pt-8 border-t border-gray-100">
                {[{ val: '500+', label: 'Products' }, { val: '50K+', label: 'Customers' }, { val: '4.9★', label: 'Rating' }].map(s => (
                  <div key={s.label}>
                    <p className="font-display text-2xl font-bold text-ink">{s.val}</p>
                    <p className="text-gray-400 text-sm">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Product Visual */}
            <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden aspect-square max-w-lg mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"
                  alt="Featured Product"
                  className="w-full h-full object-cover"
                />
                {/* Floating badges */}
                <div className="absolute top-6 left-6 bg-white rounded-2xl shadow-card px-4 py-3">
                  <p className="text-xs text-gray-400 font-medium">Best Seller</p>
                  <p className="font-bold text-ink text-sm">ProMax Ultra 15</p>
                  <p className="text-primary-500 font-bold text-sm">$1,199</p>
                </div>
                <div className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <HiShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Protection</p>
                    <p className="text-xs font-semibold text-ink">2-Year Warranty</p>
                  </div>
                </div>
              </div>
              {/* Decorative blob */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bar */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 px-6 py-5">
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm">{title}</p>
                  <p className="text-gray-400 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-primary-500 text-sm font-semibold mb-1 tracking-wide uppercase">Browse By</p>
            <h2 className="section-title">Categories</h2>
          </div>
          <Link to="/products" className="btn-ghost text-sm hidden sm:flex">
            View All <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.filter(c => c !== 'All').map((cat, i) => (
            <Link key={cat} to={`/products?category=${cat}`}
              className="card p-4 text-center hover:border-primary-200 hover:bg-primary-50 transition-all duration-200 group"
              style={{ animationDelay: `${i * 50}ms` }}>
              <div className="w-10 h-10 bg-gray-100 group-hover:bg-primary-100 rounded-xl mx-auto mb-2 flex items-center justify-center text-lg transition-colors duration-200">
                {['📱','💻','🎵','⌚','📷','🎮','🔌'][i]}
              </div>
              <p className="text-xs font-semibold text-gray-600 group-hover:text-primary-600 transition-colors duration-200 leading-tight">{cat}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-primary-500 text-sm font-semibold mb-1 tracking-wide uppercase">Handpicked</p>
            <h2 className="section-title">Featured Products</h2>
          </div>
          <Link to="/products" className="btn-ghost text-sm hidden sm:flex">
            See All <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Sale Banner */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-3xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-12 py-10 gap-6">
            <div className="text-white text-center lg:text-left">
              <p className="text-primary-200 text-sm font-semibold uppercase tracking-wider mb-2">Limited Time</p>
              <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2">Up to 30% Off</h2>
              <p className="text-primary-100 text-lg">On selected electronics — today only</p>
            </div>
            <Link to="/products?sale=true" className="bg-white text-primary-600 hover:bg-primary-50 font-bold px-8 py-3.5 rounded-xl transition-colors duration-200 flex items-center gap-2 flex-shrink-0">
              Shop the Sale <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* On Sale */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-red-500 text-sm font-semibold mb-1 tracking-wide uppercase">Hot Deals</p>
            <h2 className="section-title">On Sale Now</h2>
          </div>
          <Link to="/products" className="btn-ghost text-sm hidden sm:flex">
            All Deals <HiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {onSale.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}
