import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, signup, switchDemoUser } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'demo'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [educationLevel, setEducationLevel] = useState<UserProfile['educationLevel']>('High School Senior');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        if (!email) {
          setError('Please provide your student email address.');
          setLoading(false);
          return;
        }
        await login(email);
        onClose();
      } else if (mode === 'signup') {
        if (!name || !email) {
          setError('Please fill in your name and email.');
          setLoading(false);
          return;
        }
        await signup(name, email, educationLevel);
        onClose();
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in text-slate-800">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="relative p-6 bg-slate-50 border-b border-slate-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-700">
              Ascend Student Portal
            </span>
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
            {mode === 'login' ? 'Welcome Back, Student' : mode === 'signup' ? 'Create Student Account' : 'Instant Demo Personas'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'login'
              ? 'Access your personalized assessments, saved colleges, and learning paths.'
              : mode === 'signup'
              ? 'Start your journey: Discover yourself, find top colleges, and build career-ready skills.'
              : 'Test Ascend immediately with pre-configured student trajectories.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex rounded-xl bg-slate-200/80 p-1 mt-4 text-xs font-semibold">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                mode === 'login' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                mode === 'signup' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => { setMode('demo'); setError(''); }}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                mode === 'demo' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Demo Personas
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {mode === 'demo' ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Choose a pre-filled persona to test features like AI assessment reports, college comparisons, and skill-gap analyzers:
              </p>

              <button
                type="button"
                onClick={() => {
                  switchDemoUser('alex');
                  onClose();
                }}
                className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 text-left transition-all flex items-center justify-between group shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Alex"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">Alex Chen</p>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-indigo-100 text-indigo-800 font-bold">
                        Pro Student
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">High School Senior · AI &amp; Robotics Track</p>
                    <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">✓ Assessment completed · 3 Saved colleges</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                type="button"
                onClick={() => {
                  switchDemoUser('priya');
                  onClose();
                }}
                className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 text-left transition-all flex items-center justify-between group shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                    alt="Priya"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">Priya Patel</p>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 font-bold">
                        Explorer
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">Freshman · FinTech &amp; Data Track</p>
                    <p className="text-[11px] text-indigo-700 font-semibold mt-0.5">✓ Enrolled in Quant Finance course</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </button>

              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>You can switch profiles anytime in the top-right menu.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none text-sm text-slate-900 placeholder-slate-400"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Student Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@school.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none text-sm text-slate-900 placeholder-slate-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  {mode === 'login' && (
                    <span className="text-[11px] text-indigo-600 hover:underline cursor-pointer font-medium">
                      Forgot?
                    </span>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none text-sm text-slate-900 placeholder-slate-400"
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Academic Level</label>
                  <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none text-sm text-slate-900 font-medium"
                  >
                    <option value="High School Junior">High School Junior</option>
                    <option value="High School Senior">High School Senior</option>
                    <option value="College Freshman">College Freshman</option>
                    <option value="College Sophomore">College Sophomore</option>
                    <option value="Career Explorer">Career Explorer / Graduate</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In to Ascend' : 'Begin My Guidance Journey'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Demo Footer Prompt */}
          {mode !== 'demo' && (
            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => setMode('demo')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>Want to test immediately? Try our demo personas</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
