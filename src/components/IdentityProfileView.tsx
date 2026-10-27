import React, { useState } from 'react';
import {
  Sparkles,
  Brain,
  Compass,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Zap,
  BookOpen,
  Building2,
  TrendingUp,
  ChevronRight,
  Heart,
  Lightbulb,
  Target,
  PlayCircle,
  HelpCircle,
  Flame,
  Layers,
  Users,
  CompassIcon,
  Shield,
  Award,
  GitBranch,
  Star
} from 'lucide-react';
import { AssessmentResult, RecommendedCareer } from '../types';
import confetti from 'canvas-confetti';
import { CharacteristicsChart } from './CharacteristicsChart';
import { calculateCharacteristicsScores } from '../utils/scoring';

interface IdentityProfileViewProps {
  result: AssessmentResult;
  onRetake: () => void;
  onSelectCareerForSkillGap: (career: RecommendedCareer) => void;
  onNavigateToColleges: () => void;
}

export const IdentityProfileView: React.FC<IdentityProfileViewProps> = ({
  result,
  onRetake,
  onSelectCareerForSkillGap,
  onNavigateToColleges,
}) => {
  const [selectedCareer, setSelectedCareer] = useState<RecommendedCareer>(result.recommendedCareers[0]);
  const [copied, setCopied] = useState(false);
  const [showVocationalDetails, setShowVocationalDetails] = useState(false);

  React.useEffect(() => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, []);

  const handleShareOrCopy = () => {
    const text = `Ascend Identity Profile: ${result.archetype} - "${result.archetypeTagline}". Primary Domains: ${(result.strongestInterestAreas || []).join(', ')}. Top Career: ${result.recommendedCareers[0]?.title}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const riasecList = [
    { key: 'realistic', label: 'Realistic (Hands-on & Practical Craft)', score: result.riasecScores?.realistic || 65, color: 'bg-emerald-500' },
    { key: 'investigative', label: 'Investigative (Rigor & Intellectual Analysis)', score: result.riasecScores?.investigative || 85, color: 'bg-indigo-600' },
    { key: 'artistic', label: 'Artistic (Creative Synthesis & Expression)', score: result.riasecScores?.artistic || 75, color: 'bg-pink-500' },
    { key: 'social', label: 'Social (Human Guidance & Healing)', score: result.riasecScores?.social || 70, color: 'bg-sky-500' },
    { key: 'enterprising', label: 'Enterprising (Strategy & Enterprise)', score: result.riasecScores?.enterprising || 65, color: 'bg-amber-500' },
    { key: 'conventional', label: 'Conventional (Precision & Systematic Order)', score: result.riasecScores?.conventional || 55, color: 'bg-teal-600' }
  ];

  // Safeguard arrays
  const strongestInterests = result.strongestInterestAreas || ['Arts & Creative Expression', 'Humanities & Culture'];
  const secondaryInterests = result.secondaryInterestAreas || ['Social Sciences', 'Life Sciences'];
  const corePassions = result.corePassions || ['Exploring creative pursuits', 'Understanding human behavior', 'Meaningful community impact'];
  const curiosityDrivers = result.curiosityDrivers || ['First-principles inquiry', 'Understanding motives and patterns'];
  const problemsToSolve = result.problemsToSolve || ['Expanding human potential', 'Empowering communities through creative and practical solutions'];
  const coreValues = result.coreValues || ['Creative Autonomy', 'Human Compassion', 'Lifelong Mastery'];
  const skillsToDevelop = result.skillsToDevelop || ['Portfolio Curation', 'Domain Fundamentals', 'Cross-Disciplinary Synthesis'];
  const alternativePaths = result.alternativePaths || [];

  const characteristics = (result.characteristics && result.characteristics.length > 0)
    ? result.characteristics
    : calculateCharacteristicsScores({}, undefined, {
        archetype: result.archetype,
        strongestInterestAreas: result.strongestInterestAreas,
        riasecScores: result.riasecScores
      });

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      {/* Hero Archetype Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50/90 via-white to-slate-50 border border-indigo-100 p-6 sm:p-8 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/70 border border-indigo-200 text-indigo-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Multi-Domain Identity Profile</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600">All Academic &amp; Creative Disciplines</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              {result.archetype}
            </h1>

            <p className="text-sm sm:text-base text-indigo-900 font-medium leading-relaxed">
              &ldquo;{result.archetypeTagline}&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {result.summary}
            </p>

            {/* Primary & Secondary Interest Domains Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Primary Domains:</span>
              {strongestInterests.map((interest, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-xl bg-white text-indigo-800 font-bold border border-indigo-200 shadow-2xs"
                >
                  {interest}
                </span>
              ))}
              {secondaryInterests.length > 0 && (
                <>
                  <span className="text-slate-300">|</span>
                  <span className="text-xs font-medium text-slate-500">Secondary:</span>
                  {secondaryInterests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-medium border border-slate-200"
                    >
                      {interest}
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={handleShareOrCopy}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className={`w-4 h-4 ${copied ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{copied ? 'Profile Copied!' : 'Share Profile'}</span>
            </button>
            <button
              onClick={onRetake}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake 15 Questions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Career Clarity & Ambition Validation Card */}
      {result.careerClarity && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Career Ambition &amp; Direction Status</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800">
              {result.careerClarity.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <p className="text-xs font-bold text-slate-800 mb-1">Your Stated Focus / Ambition:</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {result.careerClarity.existingAmbitions}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
              <p className="text-xs font-bold text-indigo-900 mb-1">Counselor Validation &amp; Guidance:</p>
              <p className="text-xs text-indigo-800/90 leading-relaxed">
                {result.careerClarity.counselorValidation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 1. Personalized Characteristics Analysis Chart */}
      <CharacteristicsChart characteristics={characteristics} />

      {/* Grid: What You Genuinely Love & Flexible Thinking Style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Genuine Passions & Curiosity Drivers */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">What You Genuinely Love Doing</h3>
              <p className="text-xs text-slate-500">Voluntary exploration, favorite activities, and curiosity sparks</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Core Passions &amp; Free-Time Flow:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {corePassions.map((passion, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 font-medium"
                  >
                    {passion}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-indigo-600" />
                <span>What Sparks Your Deeper Curiosity:</span>
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pl-1">
                {curiosityDrivers.map((driver, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                <span>Missions &amp; Challenges You Care About:</span>
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 pl-1">
                {problemsToSolve.map((problem, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Flexible Thinking Style & Core Values (No rigid personality boxes) */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Individual Thinking Style &amp; Values</h3>
                <p className="text-xs text-slate-500">Flexible cognitive tendencies — not rigid personality labels</p>
              </div>
            </div>

            {/* Approach */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 mb-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  {result.thinkingStyle?.approach || 'Analytical & Imaginative Explorer'}
                </span>
                <span className="text-indigo-600 text-[11px] font-semibold">
                  Cognitive Blend
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {result.thinkingStyle?.description || result.workStyle?.problemSolvingApproach || 'You combine creative intuition with structured evaluation.'}
              </p>
            </div>

            {/* Flexible Preferences */}
            {result.thinkingStyle?.flexiblePreferences && (
              <div className="space-y-1.5 mb-3">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  How You Naturally Process Ideas:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {result.thinkingStyle.flexiblePreferences.map((pref, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 font-medium"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Core Values */}
            <div className="space-y-1.5 mb-3">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <span>What Matters Most in Life &amp; Work:</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {coreValues.map((val, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-medium"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>

            {/* Collaboration Rhythm */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>Collaboration Dynamic:</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {result.thinkingStyle?.collaborationVibe || result.workStyle?.collaborationPreference || 'Balanced independent craft with purposeful group alignment.'}
              </p>
            </div>
          </div>

          {/* Strengths & Skills to Develop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1.5">Current Strengths</p>
              <div className="flex flex-wrap gap-1">
                {result.strengths.slice(0, 3).map((s, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider mb-1.5">Skills to Develop</p>
              <div className="flex flex-wrap gap-1">
                {skillsToDevelop.slice(0, 3).map((g, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 font-medium"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Paths (Acknowledging Multi-Disciplinary Passions & Uncertainty) */}
      {alternativePaths.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-violet-50 text-violet-700 border border-violet-100">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Alternative &amp; Cross-Disciplinary Trajectories</h3>
                <p className="text-xs text-slate-500">Acknowledging multi-disciplinary interests and keeping options open</p>
              </div>
            </div>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
              Flexible Exploration
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {alternativePaths.map((path, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-600" />
                  <h4 className="text-sm font-bold text-slate-900">{path.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {path.description}
                </p>
                <p className="text-[11px] text-violet-700 pt-1 font-medium">
                  <span className="font-bold">Why consider this:</span> {path.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Career Trajectories */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>Recommended Diverse Career Trajectories</span>
            </h2>
            <p className="text-xs text-slate-500">
              Grounded in what you love doing across all academic, creative, professional, and vocational domains.
            </p>
          </div>
          <span className="text-xs text-slate-500">
            Click any career to inspect details and try the weekend simulation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.recommendedCareers.map((career) => {
            const isSelected = selectedCareer?.id === career.id;
            return (
              <div
                key={career.id}
                onClick={() => setSelectedCareer(career)}
                className={`p-5 rounded-3xl cursor-pointer transition-all border text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-50/50 border-indigo-400 shadow-sm ring-1 ring-indigo-400'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                      {career.industry}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {career.matchScore}% Match
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
                    {career.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {career.description}
                  </p>

                  {/* Why it fits tag */}
                  {career.whyItFitsWhatYouLove && (
                    <div className="p-2.5 rounded-xl bg-white border border-indigo-100 text-[11px] text-indigo-900 mb-3">
                      <span className="font-bold text-indigo-700">Why it fits you: </span>
                      <span className="line-clamp-2">{career.whyItFitsWhatYouLove}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Salary Range:</span>
                    <span className="text-slate-900 font-semibold">{career.salaryRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">AI Automation Resilience:</span>
                    <span className="text-indigo-700 font-semibold">{career.automationResilience}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Career Deep Dive & Practical Career Simulation */}
        {selectedCareer && (
          <div className="p-6 rounded-3xl bg-white border border-indigo-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Deep-Dive Career Inspection
                </span>
                <h3 className="text-xl font-bold text-slate-900">{selectedCareer.title}</h3>
                <p className="text-xs text-slate-500">{selectedCareer.growthOutlook}</p>
              </div>

              <button
                onClick={() => onSelectCareerForSkillGap(selectedCareer)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Bridge Skill Gaps in Launchpad</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Why It Fits Banner */}
            {selectedCareer.whyItFitsWhatYouLove && (
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-800">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Why This Trajectory Fits What You Love:</span>
                </div>
                <p className="text-xs text-indigo-900/90 leading-relaxed">
                  {selectedCareer.whyItFitsWhatYouLove}
                </p>
              </div>
            )}

            {/* Practical Weekend Career Simulation */}
            {selectedCareer.practicalSimulation && (
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <PlayCircle className="w-4 h-4 text-emerald-600" />
                    <span>Practical Career Simulation (Test Your Interest Before Committing)</span>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    Mini-Project
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {selectedCareer.practicalSimulation.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {selectedCareer.practicalSimulation.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-emerald-200/80 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-emerald-700">Try this weekend: </span>
                  <span>{selectedCareer.practicalSimulation.tryItThisWeekend}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="text-xs font-bold text-slate-800 mb-1">A Day in the Life:</p>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedCareer.dayInTheLife}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="text-xs font-bold text-slate-800 mb-2">Core Industry Skills to Master:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareer.keySkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 font-medium shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recommended College Majors & Pathways */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <span>Recommended College Majors &amp; Pathways</span>
            </h2>
            <p className="text-xs text-slate-500">
              Undergraduate degree pathways tailored to nurture your genuine interests across universities.
            </p>
          </div>

          <button
            onClick={onNavigateToColleges}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
          >
            <span>Explore Colleges</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.recommendedMajors.map((major) => (
            <div
              key={major.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                    {major.degreeType}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1.5">{major.name}</h3>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {major.matchReason}
              </p>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] text-slate-500 font-semibold mb-1.5">Strongest Academic Programs:</p>
                <div className="flex flex-wrap gap-1.5">
                  {major.targetColleges.map((college, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                    >
                      {college}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggleable Vocational Spectrum (Holland RIASEC as optional reference) */}
      <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-xs">
        <button
          onClick={() => setShowVocationalDetails(!showVocationalDetails)}
          className="w-full flex items-center justify-between text-left text-xs text-slate-600 hover:text-slate-900 font-medium"
        >
          <span className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-slate-800">View Holland RIASEC Vocational Dimensions</span>
            <span className="text-slate-400">· (Standard industry reference spectrum)</span>
          </span>
          <span className="text-indigo-600 font-semibold">
            {showVocationalDetails ? 'Hide Details' : 'Expand Details'}
          </span>
        </button>

        {showVocationalDetails && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {riasecList.map(item => (
                <div key={item.key} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-700 font-semibold">{item.label}</span>
                    <span className="text-slate-900 font-bold font-mono">{item.score}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 italic">
              *Used as a loose vocational affinity indicator, not a deterministic label.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
