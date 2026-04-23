import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineSearch, HiOutlineUser, HiOutlineMenu, HiX, HiOutlineLogout, HiChevronDown } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [userMenu, setUserMenu] = useState(false);
  const { count, setIsOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setUserMenu(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100' : 'bg-white border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-display text-xl text-ink">TechMart</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  ${location.pathname === l.to ? 'text-primary-500 bg-primary-50' : 'text-gray-600 hover:text-ink hover:bg-gray-50'}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl w-56 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:w-72 transition-all duration-300"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button onClick={() => setIsOpen(true)} className="relative p-2 text-gray-600 hover:text-ink hover:bg-gray-100 rounded-xl transition-colors duration-200">
              <HiOutlineShoppingBag className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-fade-in">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {/* User */}
            {user ? (
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user.name[0].toUpperCase()}</span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-ink">{user.name.split(' ')[0]}</span>
                  <HiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${userMenu ? 'rotate-180' : ''}`} />
                </button>
                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-ink">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button onClick={() => { logout(); setUserMenu(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors duration-200">
                      <HiOutlineLogout className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm px-4 py-2">
                <HiOutlineUser className="w-4 h-4" /> Sign In
              </Link>
            )}

            {/* Mobile Toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
              {mobileOpen ? <HiX className="w-5 h-5" /> : <HiOutlineMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-1 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            </form>
            {navLinks.map(l => (
              <Link key={l.to} to={l.to}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${location.pathname === l.to ? 'text-primary-500 bg-primary-50' : 'text-gray-600 hover:text-ink hover:bg-gray-50'}`}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
