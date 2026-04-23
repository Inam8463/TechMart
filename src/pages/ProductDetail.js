import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { HiStar, HiArrowLeft, HiShieldCheck, HiTruck, HiRefresh, HiOutlineShoppingCart, HiHeart } from 'react-icons/hi';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { addItem, setIsOpen } = useCart();
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);

  if (!product) return (
    <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-center px-4">
      <div className="text-5xl mb-4">😕</div>
      <h2 className="section-title mb-2">Product Not Found</h2>
      <p className="text-gray-400 mb-6">This product doesn't exist or has been removed.</p>
      <Link to="/products" className="btn-primary">Back to Products</Link>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product, selectedColor);
    toast.success(`Added ${qty}x ${product.name} to cart!`, {
      icon: '🛍️',
      style: { borderRadius: '12px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px' },
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <button onClick={() => navigate(-1)} className="btn-ghost py-1.5 px-3 text-sm">
            <HiArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-gray-300">/</span>
          <Link to="/products" className="text-gray-400 hover:text-ink transition-colors">{product.category}</Link>
          <span className="text-gray-300">/</span>
          <span className="text-ink font-medium truncate">{product.name}</span>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.badge && (
                <span className="absolute top-4 left-4 badge bg-primary-50 text-primary-600 text-sm px-3 py-1">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-4 badge bg-red-500 text-white text-sm px-3 py-1">
                  -{discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex-1">
              <p className="text-primary-500 font-semibold text-sm mb-1">{product.brand}</p>
              <h1 className="text-3xl font-display font-bold text-ink mb-3 text-balance">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="font-semibold text-ink">{product.rating}</span>
                <span className="text-gray-400 text-sm">({product.reviews.toLocaleString()} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100">
                <span className="text-4xl font-display font-bold text-ink">${product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-300 line-through">${product.originalPrice.toLocaleString()}</span>
                )}
                {discount > 0 && (
                  <span className="badge bg-red-50 text-red-500 text-sm">Save ${(product.originalPrice - product.price).toLocaleString()}</span>
                )}
              </div>

              <p className="text-gray-500 leading-relaxed mb-6">{product.description}</p>

              {/* Color */}
              {product.colors?.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-ink mb-2">Color</p>
                  <div className="flex gap-2">
                    {product.colors.map(color => (
                      <button key={color} onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${selectedColor === color ? 'border-primary-500 scale-110' : 'border-transparent hover:border-gray-300'}`}
                        style={{ background: color }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-ink mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-4 py-2.5 hover:bg-gray-50 text-gray-600 transition-colors font-bold">−</button>
                    <span className="px-4 py-2.5 font-semibold text-ink min-w-[3rem] text-center border-x border-gray-200">{qty}</span>
                    <button onClick={() => setQty(Math.min(product.stock, qty + 1))}
                      className="px-4 py-2.5 hover:bg-gray-50 text-gray-600 transition-colors font-bold">+</button>
                  </div>
                  <span className={`text-sm font-medium ${product.stock <= 5 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {product.stock <= 5 ? `Only ${product.stock} left!` : 'In Stock ✓'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <button onClick={handleBuyNow} className="btn-primary flex-1 py-3 justify-center text-base">
                  Buy Now
                </button>
                <button onClick={handleAddToCart} className="btn-secondary flex-1 py-3 justify-center text-base">
                  <HiOutlineShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <button onClick={() => setWished(!wished)}
                  className={`p-3 rounded-xl border transition-all duration-200 ${wished ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400'}`}>
                  <HiHeart className="w-5 h-5" />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: HiTruck, text: 'Free Shipping' },
                  { icon: HiShieldCheck, text: '2-Year Warranty' },
                  { icon: HiRefresh, text: '30-Day Returns' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-xl text-center">
                    <Icon className="w-5 h-5 text-primary-500" />
                    <p className="text-xs font-medium text-gray-600 leading-tight">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mb-16">
          <h2 className="text-xl font-display font-bold text-ink mb-5">Specifications</h2>
          <div className="card overflow-hidden">
            {Object.entries(product.specs).map(([key, val], i) => (
              <div key={key} className={`flex px-6 py-4 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <span className="w-40 text-sm text-gray-400 font-medium flex-shrink-0">{key}</span>
                <span className="text-sm text-ink font-semibold">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-display font-bold text-ink mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
