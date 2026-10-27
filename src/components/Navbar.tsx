import React, { useState } from 'react';
import { Compass, GraduationCap, Briefcase, User, Sparkles, Crown, LogOut, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: 'assessment' | 'colleges' | 'launchpad' | 'profile';
  setActiveTab: (tab: 'assessment' | 'colleges' | 'launchpad' | 'profile') => void;
  onOpenAuth: () => void;
  onOpenAiMentor: () => void;
  onOpenProModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenAiMentor,
  onOpenProModal
}) => {
  const { user, isAuthenticated, logout, switchDemoUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { id: 'assessment', label: '1. Discover Yourself', sublabel: 'AI Assessment', icon: Compass, badge: user.assessmentResult ? 'Completed' : 'Step 1' },
    { id: 'colleges', label: '2. Find Colleges', sublabel: 'Explore & Compare', icon: GraduationCap, badge: user.savedCollegeIds.length > 0 ? `${user.savedCollegeIds.length} Saved` : null },
    { id: 'launchpad', label: '3. Build Skills & Jobs', sublabel: 'Courses & Internships', icon: Briefcase, badge: 'Launchpad' },
    { id: 'profile', label: '4. My Dashboard', sublabel: 'Portfolio & Tracker', icon: User, badge: null }
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setActiveTab('assessment')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 text-white flex items-center justify-center shadow-md shadow-indigo-100">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">Ascend</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Student Guidance
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">AI Career, College &amp; Internship Launchpad</p>
            </div>
          </div>

          {/* Clean Step Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Ask AI Counselor Button */}
            <button
              onClick={onOpenAiMentor}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">AI Counselor</span>
            </button>

            {/* Pro Badge / Upgrade */}
            {user.isPro ? (
              <div
                onClick={onOpenProModal}
                className="cursor-pointer flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs"
              >
                <Crown className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Student Pro</span>
              </div>
            ) : (
              <button
                onClick={onOpenProModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-2xs transition-all"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Go Pro</span>
              </button>
            )}

            {/* User Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover border border-slate-300"
                  />
                  <span className="text-xs font-semibold text-slate-800 hidden md:inline max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 text-slate-700 animate-fade-in"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-medium">
                          {user.educationLevel}
                        </span>
                        {user.isPro && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-medium">
                            Pro Active
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="py-1">
                      <p className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Switch Student Demo
                      </p>
                      <button
                        onClick={() => {
                          switchDemoUser('alex');
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-50 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-800">Alex Chen</p>
                          <p className="text-[11px] text-slate-500">High School Senior · AI Track</p>
                        </div>
                        {user.id === 'user_alex' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </button>

                      <button
                        onClick={() => {
                          switchDemoUser('priya');
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-50 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-slate-800">Priya Patel</p>
                          <p className="text-[11px] text-slate-500">Freshman · FinTech Track</p>
                        </div>
                        {user.id === 'user_priya' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </button>
                    </div>

                    <div className="border-t border-slate-100 mt-1 pt-1 space-y-0.5">
                      <button
                        onClick={() => {
                          setActiveTab('profile');
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium hover:bg-slate-50 text-slate-700"
                      >
                        My Portfolio &amp; Saved
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium hover:bg-rose-50 text-rose-600 flex items-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-0.5 py-1 px-2 text-xs font-semibold transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px]">{item.label.split('.')[1]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
