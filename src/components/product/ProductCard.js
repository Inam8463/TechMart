import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiStar, HiOutlineShoppingCart, HiHeart } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const badgeColors = {
  'Best Seller': 'bg-amber-100 text-amber-700',
  'New': 'bg-emerald-100 text-emerald-700',
  'Top Rated': 'bg-blue-100 text-blue-700',
  'Sale': 'bg-red-100 text-red-600',
  'Pro': 'bg-purple-100 text-purple-700',
  'Hot': 'bg-orange-100 text-orange-700',
  'Limited': 'bg-pink-100 text-pink-700',
  'Popular': 'bg-indigo-100 text-indigo-700',
};

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const [wished, setWished] = useState(false);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product, product.colors?.[0] || null);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛍️',
      style: { borderRadius: '12px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px' },
    });
  };

  return (
    <Link to={`/products/${product.id}`}
      className="card group block overflow-hidden animate-fade-up"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img src={product.image} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 badge text-xs font-semibold ${badgeColors[product.badge] || 'bg-gray-100 text-gray-700'}`}>
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 badge bg-red-500 text-white">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button onClick={e => { e.preventDefault(); setWished(!wished); }}
          className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-soft transition-all duration-200
            opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
            ${wished ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}>
          <HiHeart className="w-4 h-4" />
        </button>

        {/* Add to Cart */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
          <button onClick={handleAdd}
            className="flex items-center gap-1.5 bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md transition-colors duration-200">
            <HiOutlineShoppingCart className="w-3.5 h-3.5" /> Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 font-medium mb-1">{product.brand}</p>
        <h3 className="font-semibold text-ink text-sm leading-tight mb-2 group-hover:text-primary-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <HiStar key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'}`} />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-ink text-base">${product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-gray-300 text-xs line-through">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          {product.stock <= 5 && (
            <span className="text-xs text-red-500 font-medium">Only {product.stock} left</span>
          )}
        </div>
      </div>
    </Link>
  );
}
