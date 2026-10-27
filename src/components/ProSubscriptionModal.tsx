import React, { useState } from 'react';
import { X, Crown, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

interface ProSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProSubscriptionModal: React.FC<ProSubscriptionModalProps> = ({ isOpen, onClose }) => {
  const { user, upgradeToPro } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      upgradeToPro('pro_student');
      setIsProcessing(false);
      setSuccess(true);
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 800);
  };

  const proFeatures = [
    'Unlimited AI Career Counselor deep sessions & resume teardowns',
    'Direct recruiter verified badge on student internship applications',
    'Industry-partner accredited course certificate credentials',
    '1-on-1 AI Technical & Behavioral mock interview simulator',
    'Early-access notifications for top summer internships & fellowships',
    'College admission essay diagnostic & quantitative odds analysis'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in text-slate-800">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
        {/* Banner */}
        <div className="relative p-6 sm:p-8 bg-amber-50/70 border-b border-amber-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 rounded-lg bg-amber-100 border border-amber-200 text-amber-700">
              <Crown className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-amber-800">
              Ascend Student Pro Pass
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">
            Accelerate Your College &amp; Career Trajectory
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Industry partnerships providing accredited certifications, verified recruiter visibility, and personal AI guidance.
          </p>

          {/* Billing Switcher */}
          <div className="mt-4 inline-flex p-1 rounded-xl bg-white border border-amber-200 text-xs shadow-2xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                billingCycle === 'monthly' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly ($9.99/mo)
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual ($79/yr)</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-900 uppercase font-extrabold">Save 34%</span>
            </button>
          </div>
        </div>

        {/* Feature List */}
        <div className="p-6 sm:p-8 space-y-5 bg-white">
          <div className="space-y-3">
            {proFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="font-medium">{feat}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            {user.isPro ? (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You hold an active Student Pro membership. Enjoy all perks!</span>
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={isProcessing || success}
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Activating Pro Pass...</span>
                ) : success ? (
                  <span>✓ Pro Pass Activated!</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Unlock Student Pro (Instant Simulation)</span>
                  </>
                )}
              </button>
            )}

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 mt-3 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Simulated frictionless demo checkout · No card required</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
