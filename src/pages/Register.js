import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match', { style: { borderRadius: '12px', fontFamily: 'DM Sans, sans-serif' } });
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters', { style: { borderRadius: '12px', fontFamily: 'DM Sans, sans-serif' } });
      return;
    }
    setLoading(true);
    try {
      register(form.name, form.email, form.password);
      toast.success('Account created! Welcome to TechMart 🎉', { style: { borderRadius: '12px', fontFamily: 'DM Sans, sans-serif' } });
      navigate('/');
    } catch (err) {
      toast.error(err.message, { style: { borderRadius: '12px', fontFamily: 'DM Sans, sans-serif' } });
    } finally {
      setLoading(false);
    }
  };

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'];
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-emerald-400'];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="card p-8 animate-fade-up">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-ink mb-1">Create account</h1>
            <p className="text-gray-400 text-sm">Join TechMart and start shopping</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Full Name</label>
              <div className="relative">
                <HiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input name="name" type="text" required value={form.name} onChange={handleChange}
                  placeholder="John Doe" className="input-field pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Email</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input name="email" type="email" required value={form.email} onChange={handleChange}
                  placeholder="you@example.com" className="input-field pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input name="password" type={showPass ? 'text' : 'password'} required value={form.password} onChange={handleChange}
                  placeholder="Min. 6 characters" className="input-field pl-10 pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1,2,3].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : 'bg-gray-100'}`} />
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${['', 'text-red-500', 'text-amber-500', 'text-emerald-500'][strength]}`}>
                    {strengthLabel[strength]}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">Confirm Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input name="confirm" type="password" required value={form.confirm} onChange={handleChange}
                  placeholder="Repeat password" className="input-field pl-10" />
              </div>
              {form.confirm && form.password !== form.confirm && (
                <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-3 text-base mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-500 font-semibold hover:text-primary-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
