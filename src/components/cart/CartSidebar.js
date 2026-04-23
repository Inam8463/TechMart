import React from 'react';
import { Link } from 'react-router-dom';
import { HiX, HiOutlineShoppingBag, HiPlus, HiMinus, HiTrash } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, total, count } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
        onClick={() => setIsOpen(false)} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <HiOutlineShoppingBag className="w-5 h-5 text-primary-500" />
            <h2 className="font-display text-lg text-ink">Your Cart</h2>
            {count > 0 && (
              <span className="badge bg-primary-50 text-primary-600">{count} items</span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200">
            <HiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <HiOutlineShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="font-semibold text-ink mb-1">Your cart is empty</h3>
              <p className="text-gray-400 text-sm mb-6">Add some awesome tech to get started</p>
              <button onClick={() => setIsOpen(false)}
                className="btn-primary text-sm">Browse Products</button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.key} className="flex gap-4 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-ink text-sm leading-tight truncate">{item.name}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{item.brand}</p>
                    {item.selectedColor && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-3 h-3 rounded-full border border-gray-200" style={{ background: item.selectedColor }} />
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-ink text-sm">${(item.price * item.qty).toLocaleString()}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQty(item.key, item.qty - 1)}
                          className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-primary-500 hover:text-primary-500 transition-colors duration-200">
                          <HiMinus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold text-ink">{item.qty}</span>
                        <button onClick={() => updateQty(item.key, item.qty + 1)}
                          className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-primary-500 hover:text-primary-500 transition-colors duration-200">
                          <HiPlus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.key)}
                    className="self-start p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors duration-200">
                    <HiTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Subtotal</span>
              <span className="font-bold text-ink text-lg">${total.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-400">Shipping and taxes calculated at checkout</p>
            <Link to="/checkout" onClick={() => setIsOpen(false)}
              className="btn-primary w-full justify-center text-sm py-3">
              Proceed to Checkout
            </Link>
            <button onClick={() => setIsOpen(false)} className="btn-secondary w-full justify-center text-sm">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
