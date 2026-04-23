# 🛍️ TechMart — Electronics & Gadgets Store

A production-ready e-commerce frontend built with **React + Tailwind CSS**.

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the app
npm start
```
Open **http://localhost:3000** 🎉

---

## 🗂️ Project Structure

```
techmart/
├── public/index.html
├── tailwind.config.js    ← Tailwind customization
├── postcss.config.js
└── src/
    ├── index.css         ← Tailwind directives + custom components
    ├── App.js            ← Routes + Providers
    ├── context/
    │   ├── AuthContext.js  ← Login/Register/Logout
    │   └── CartContext.js  ← Cart state management
    ├── data/
    │   └── products.js   ← 12 product catalog
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.js
    │   │   └── Footer.js
    │   ├── cart/
    │   │   └── CartSidebar.js
    │   └── product/
    │       └── ProductCard.js
    └── pages/
        ├── Home.js          ← Hero + categories + featured
        ├── Products.js      ← Listing + filter + search
        ├── ProductDetail.js ← Single product + specs
        ├── Login.js         ← Sign in form
        ├── Register.js      ← Sign up with password strength
        └── Checkout.js      ← 3-step checkout flow
```

---

## ✨ Features

- 🏠 **Home** — Hero banner, categories, featured products, sale section
- 🛍️ **Products** — Filter by category, price range, sort, search
- 📦 **Product Detail** — Color picker, quantity selector, specs table, related products
- 🛒 **Cart Sidebar** — Slide-in cart with quantity management
- 🔐 **Auth** — Register + Login with localStorage (no backend needed)
- 💳 **Checkout** — 3-step: Shipping → Payment → Review → Confirmation
- 📱 **Responsive** — Works perfectly on mobile, tablet, desktop
- 🔔 **Toast Notifications** — Add to cart, login success, errors
- ⚡ **Animations** — Fade-up cards, hover effects, loading spinners

---

## 🎨 Tailwind Usage Examples

```jsx
// Buttons
<button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl">
  Click Me
</button>

// Cards
<div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
  Content
</div>

// Grid layout
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
  ...
</div>

// Custom component classes (defined in index.css)
<button className="btn-primary">Buy Now</button>
<input className="input-field" />
<div className="card">...</div>
```

---

## 🔐 Auth Notes

Auth uses **localStorage** (no backend required for this project). 

To test:
1. Register at `/register`
2. Login at `/login`
3. Use demo: `demo@techmart.com` / `demo123`

---

## 🚀 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or push to GitHub → connect at vercel.com — auto-deploys on every push!
