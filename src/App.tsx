import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { AssessmentModule } from './components/AssessmentModule';
import { CollegeDiscovery } from './components/CollegeDiscovery';
import { SkillLaunchpad } from './components/SkillLaunchpad';
import { StudentProfileView } from './components/StudentProfileView';
import { AuthModal } from './components/AuthModal';
import { AiMentorModal } from './components/AiMentorModal';
import { ProSubscriptionModal } from './components/ProSubscriptionModal';
import { RecommendedCareer } from './types';
import { Sparkles, Compass, GraduationCap, Briefcase, User, ArrowRight, CheckCircle2 } from 'lucide-react';

function MainApp() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'assessment' | 'colleges' | 'launchpad' | 'profile'>('assessment');
  const [careerFocusForLaunchpad, setCareerFocusForLaunchpad] = useState<RecommendedCareer | undefined>(undefined);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAiMentorOpen, setIsAiMentorOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  const handleSelectCareerForSkillGap = (career: RecommendedCareer) => {
    setCareerFocusForLaunchpad(career);
    setActiveTab('launchpad');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToColleges = () => {
    setActiveTab('colleges');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAiMentor={() => setIsAiMentorOpen(true)}
        onOpenProModal={() => setIsProModalOpen(true)}
      />

      {/* Simplified Student Guidance Path Banner */}
      <div className="bg-white border-b border-slate-200/80 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 sm:gap-2 text-slate-500 font-medium">
              <span className="font-bold text-slate-700">Student Roadmap:</span>

              <button
                onClick={() => setActiveTab('assessment')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                  activeTab === 'assessment' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:text-slate-800'
                }`}
              >
                <span>1. Discover Yourself</span>
                {user.assessmentResult && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </button>

              <span className="text-slate-300">→</span>

              <button
                onClick={() => setActiveTab('colleges')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                  activeTab === 'colleges' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:text-slate-800'
                }`}
              >
                <span>2. Find Your College</span>
                {user.savedCollegeIds.length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 font-bold">
                    {user.savedCollegeIds.length}
                  </span>
                )}
              </button>

              <span className="text-slate-300">→</span>

              <button
                onClick={() => setActiveTab('launchpad')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                  activeTab === 'launchpad' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:text-slate-800'
                }`}
              >
                <span>3. Build Industry Skills</span>
              </button>

              <span className="text-slate-300">→</span>

              <button
                onClick={() => setActiveTab('launchpad')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-emerald-700 font-bold hover:bg-emerald-50"
              >
                <span>4. Get Internship-Ready</span>
              </button>
            </div>

            <div className="text-slate-500 flex items-center gap-1.5">
              <span>Active Student:</span>
              <span className="font-bold text-slate-800">{user.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 pb-20">
        {activeTab === 'assessment' && (
          <AssessmentModule
            onSelectCareerForSkillGap={handleSelectCareerForSkillGap}
            onNavigateToColleges={handleNavigateToColleges}
          />
        )}

        {activeTab === 'colleges' && (
          <CollegeDiscovery />
        )}

        {activeTab === 'launchpad' && (
          <SkillLaunchpad
            initialCareerFocus={careerFocusForLaunchpad}
            onOpenProModal={() => setIsProModalOpen(true)}
          />
        )}

        {activeTab === 'profile' && (
          <StudentProfileView
            onNavigateToAssessment={() => setActiveTab('assessment')}
            onNavigateToColleges={() => setActiveTab('colleges')}
            onNavigateToLaunchpad={() => setActiveTab('launchpad')}
            onOpenProModal={() => setIsProModalOpen(true)}
          />
        )}
      </main>

      {/* Floating AI Counselor Trigger Button */}
      <aside aria-label="AI Career Mentor" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsAiMentorOpen(true)}
          className="group relative flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span>Ask Ascend Mentor</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 font-mono text-indigo-200 border border-slate-700">
            AI
          </span>
        </button>
      </aside>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <AiMentorModal
        isOpen={isAiMentorOpen}
        onClose={() => setIsAiMentorOpen(false)}
      />

      <ProSubscriptionModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />

      {/* Clean Global Light Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="font-bold text-slate-900 tracking-tight">Ascend</span>
            <span>· AI Student Career Guidance &amp; College Discovery</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 font-medium">
            <span>Discover Yourself</span>
            <span>→</span>
            <span>Find Your College</span>
            <span>→</span>
            <span>Build Skills</span>
            <span>→</span>
            <span className="text-emerald-700 font-bold">Land Internships</span>
          </div>

          <div className="text-slate-400 font-medium">
            Grounded with Gemini 3.8 Flash
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
