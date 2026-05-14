import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DEMO_CREDENTIALS = [
  { role: 'Admin', email: 'admin@eps.school', password: 'admin123', color: 'bg-navy-800' },
  { role: 'Teacher', email: 'teacher@eps.school', password: 'teacher123', color: 'bg-indigo-600' },
  { role: 'Student', email: 'student@eps.school', password: 'student123', color: 'bg-gold-600' },
];

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (cred: typeof DEMO_CREDENTIALS[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-600/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gold-500 rounded-2xl mb-4 shadow-lg"
          >
            <GraduationCap className="w-8 h-8 text-navy-900" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white font-display">EPS School</h1>
          <p className="text-navy-200 mt-1 text-sm">Management Portal</p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-glass">
          <h2 className="text-xl font-bold text-white mb-6">Sign in to your account</h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-xl p-3 mb-5 text-red-200 text-sm"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-navy-300 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-navy-300 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-300 hover:text-white transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
              ) : 'Sign In'}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6">
            <p className="text-navy-300 text-xs text-center mb-3">Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_CREDENTIALS.map((cred) => (
                <button
                  key={cred.role}
                  onClick={() => fillDemo(cred)}
                  className="text-xs py-2 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all border border-white/10 hover:border-white/30"
                >
                  {cred.role}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-navy-400 text-xs mt-6">
          © 2024 EPS School Management System
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
