import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiShieldCheck, HiCheckCircle, HiArrowLeft } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const steps = ['Shipping', 'Payment', 'Review'];

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [ordered, setOrdered] = useState(false);
  const [loading, setLoading] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '', address: '', city: '', zip: '', country: 'United States',
  });
  const [payment, setPayment] = useState({ card: '', expiry: '', cvv: '', name: '' });

  const tax = total * 0.08;
  const shipping_fee = total > 99 ? 0 : 9.99;
  const grandTotal = total + tax + shipping_fee;

  const handleShippingSubmit = e => { e.preventDefault(); setStep(1); };
  const handlePaymentSubmit = e => { e.preventDefault(); setStep(2); };

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    clearCart();
    setOrdered(true);
    setLoading(false);
  };

  const formatCard = v => v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = v => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);

  if (ordered) return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-fade-up">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiCheckCircle className="w-10 h-10 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-display font-bold text-ink mb-3">Order Placed! 🎉</h1>
        <p className="text-gray-400 mb-2">Thank you for shopping with TechMart.</p>
        <p className="text-gray-400 text-sm mb-8">Order confirmation has been sent to <strong className="text-ink">{shipping.email}</strong></p>
        <div className="card p-4 mb-6 text-left">
          <p className="text-xs text-gray-400 mb-1">Order Total</p>
          <p className="text-2xl font-bold text-ink">${grandTotal.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">Estimated delivery: 3-5 business days</p>
        </div>
        <Link to="/" className="btn-primary">Continue Shopping</Link>
      </div>
    </div>
  );

  if (items.length === 0) return (
    <div className="min-h-screen pt-28 flex flex-col items-center justify-center px-4 text-center">
      <div className="text-5xl mb-4">🛒</div>
      <h2 className="section-title mb-2">Your cart is empty</h2>
      <p className="text-gray-400 mb-6">Add items to your cart before checking out.</p>
      <Link to="/products" className="btn-primary">Browse Products</Link>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)} className="btn-ghost py-1.5 px-3">
            <HiArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="section-title">Checkout</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 ${i <= step ? 'text-primary-500' : 'text-gray-300'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300
                  ${i < step ? 'bg-primary-500 text-white' : i === step ? 'bg-primary-50 border-2 border-primary-500 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="text-sm font-medium hidden sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 rounded transition-colors duration-300 ${i < step ? 'bg-primary-500' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Step 0 — Shipping */}
            {step === 0 && (
              <form onSubmit={handleShippingSubmit} className="card p-6 space-y-4">
                <h2 className="text-lg font-display font-bold text-ink">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">First Name *</label>
                    <input required value={shipping.firstName} onChange={e => setShipping({...shipping, firstName: e.target.value})} className="input-field" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">Last Name *</label>
                    <input required value={shipping.lastName} onChange={e => setShipping({...shipping, lastName: e.target.value})} className="input-field" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1.5">Email *</label>
                  <input required type="email" value={shipping.email} onChange={e => setShipping({...shipping, email: e.target.value})} className="input-field" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1.5">Phone</label>
                  <input value={shipping.phone} onChange={e => setShipping({...shipping, phone: e.target.value})} className="input-field" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1.5">Address *</label>
                  <input required value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} className="input-field" placeholder="123 Main Street" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-ink mb-1.5">City *</label>
                    <input required value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} className="input-field" placeholder="San Francisco" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">ZIP *</label>
                    <input required value={shipping.zip} onChange={e => setShipping({...shipping, zip: e.target.value})} className="input-field" placeholder="94102" />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-3">Continue to Payment</button>
              </form>
            )}

            {/* Step 1 — Payment */}
            {step === 1 && (
              <form onSubmit={handlePaymentSubmit} className="card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-display font-bold text-ink">Payment</h2>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <HiShieldCheck className="w-3.5 h-3.5" /> Secure
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1.5">Cardholder Name *</label>
                  <input required value={payment.name} onChange={e => setPayment({...payment, name: e.target.value})} className="input-field" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink mb-1.5">Card Number *</label>
                  <input required value={payment.card} onChange={e => setPayment({...payment, card: formatCard(e.target.value)})} className="input-field font-mono" placeholder="1234 5678 9012 3456" maxLength={19} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">Expiry *</label>
                    <input required value={payment.expiry} onChange={e => setPayment({...payment, expiry: formatExpiry(e.target.value)})} className="input-field font-mono" placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">CVV *</label>
                    <input required value={payment.cvv} onChange={e => setPayment({...payment, cvv: e.target.value.replace(/\D/g,'').slice(0,4)})} className="input-field font-mono" placeholder="123" maxLength={4} />
                  </div>
                </div>
                <p className="text-xs text-gray-400">🔒 This is a demo — no real payment is processed.</p>
                <button type="submit" className="btn-primary w-full justify-center py-3">Review Order</button>
              </form>
            )}

            {/* Step 2 — Review */}
            {step === 2 && (
              <div className="card p-6">
                <h2 className="text-lg font-display font-bold text-ink mb-5">Review Order</h2>
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.key} className="flex gap-3 items-center p-3 bg-gray-50 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-ink text-sm truncate">{item.name}</p>
                        <p className="text-gray-400 text-xs">Qty: {item.qty}</p>
                      </div>
                      <p className="font-bold text-ink">${(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gray-50 rounded-xl mb-5 text-sm">
                  <p className="font-semibold text-ink mb-1">Shipping to:</p>
                  <p className="text-gray-500">{shipping.firstName} {shipping.lastName} · {shipping.address}, {shipping.city} {shipping.zip}</p>
                </div>

                <button onClick={handlePlaceOrder} disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Placing Order...
                    </span>
                  ) : `Place Order — $${grandTotal.toFixed(2)}`}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-5 sticky top-24">
              <h3 className="font-display font-bold text-ink mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                {items.map(item => (
                  <div key={item.key} className="flex justify-between text-sm">
                    <span className="text-gray-500 truncate flex-1 mr-2">{item.name} ×{item.qty}</span>
                    <span className="font-medium text-ink">${(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm mb-4 pb-4 border-b border-gray-100">
                <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span>${total.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Shipping</span><span className={shipping_fee === 0 ? 'text-emerald-500 font-medium' : ''}>{shipping_fee === 0 ? 'Free' : `$${shipping_fee}`}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between font-bold text-ink text-lg">
                <span>Total</span><span>${grandTotal.toFixed(2)}</span>
              </div>
              {shipping_fee === 0 && (
                <p className="text-xs text-emerald-500 mt-2">✓ Free shipping applied</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
