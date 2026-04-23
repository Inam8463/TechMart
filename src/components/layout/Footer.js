import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-display text-xl">TechMart</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your one-stop destination for premium electronics and cutting-edge gadgets.
            </p>
            <div className="flex gap-3">
              {[FiGithub, FiTwitter, FiInstagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-gray-300">Shop</h4>
            <ul className="space-y-2.5">
              {['All Products', 'Smartphones', 'Laptops', 'Audio', 'Wearables', 'Gaming'].map(item => (
                <li key={item}>
                  <Link to="/products" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-gray-300">Support</h4>
            <ul className="space-y-2.5">
              {['FAQ', 'Shipping Policy', 'Return Policy', 'Track Order', 'Contact Us', 'Warranty'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-gray-300">Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: HiOutlineMail, text: 'support@techmart.com' },
                { icon: HiOutlinePhone, text: '+1 (555) 123-4567' },
                { icon: HiOutlineLocationMarker, text: 'San Francisco, CA 94102' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-gray-400 text-sm">
                  <Icon className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} TechMart. Built with React + Tailwind CSS.</p>
          <div className="flex gap-4 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
