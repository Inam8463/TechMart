import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      login(form.email, form.password);
      toast.success('Welcome back!', { icon: '👋', style: { borderRadius: '12px', fontFamily: 'DM Sans, sans-serif' } });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message, { style: { borderRadius: '12px', fontFamily: 'DM Sans, sans-serif' } });
    } finally {
      setLoading(false);
    }
  };

  const loginDemo = () => {
    setForm({ email: 'demo@techmart.com', password: 'demo123' });
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card p-8 animate-fade-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-ink mb-1">Welcome back</h1>
            <p className="text-gray-400 text-sm">Sign in to your TechMart account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Email</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input name="email" type="email" required value={form.email} onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-field pl-10" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-ink">Password</label>
                <a href="#" className="text-xs text-primary-500 hover:text-primary-600 font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input name="password" type={showPass ? 'text' : 'password'} required value={form.password} onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-3 text-base mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Demo */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl">
            <p className="text-xs text-amber-700 font-medium mb-1.5">🧪 Demo Account</p>
            <p className="text-xs text-amber-600 font-mono mb-2">demo@techmart.com / demo123</p>
            <button onClick={loginDemo} className="text-xs text-amber-700 font-semibold underline">Fill automatically →</button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-500 font-semibold hover:text-primary-600 transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
