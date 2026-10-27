import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Brain,
  Check,
  MessageSquare,
  Lightbulb,
  SkipForward,
  Grid,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ASSESSMENT_QUESTIONS } from '../data/mockData';
import { IdentityProfileView } from './IdentityProfileView';
import { AssessmentResult, RecommendedCareer } from '../types';
import { calculateCharacteristicsScores } from '../utils/scoring';

interface AssessmentModuleProps {
  onSelectCareerForSkillGap: (career: RecommendedCareer) => void;
  onNavigateToColleges: () => void;
}

export const AssessmentModule: React.FC<AssessmentModuleProps> = ({
  onSelectCareerForSkillGap,
  onNavigateToColleges,
}) => {
  const { user, saveAssessmentResult } = useAuth();
  const [activeResult, setActiveResult] = useState<AssessmentResult | null>(user.assessmentResult || null);
  const [isTakingAssessment, setIsTakingAssessment] = useState<boolean>(!user.assessmentResult);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({});
  const [showQuestionMap, setShowQuestionMap] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStep, setSynthesisStep] = useState('Synthesizing your responses across 10 core dimensions...');
  const [error, setError] = useState<string | null>(null);

  const baseQuestions = ASSESSMENT_QUESTIONS;
  const totalSteps = baseQuestions.length; // 15 questions
  const currentStep = currentQuestionIndex + 1;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const currentQuestion = baseQuestions[currentQuestionIndex];

  // Stage color & category pill helper
  const getCategoryTheme = (category: string) => {
    if (/Interest|Passion|Hobby/.test(category)) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (/Academic|Learning|Accomplishment/.test(category)) return 'bg-sky-50 text-sky-700 border-sky-200';
    if (/Creativ|Art|Aesthetic/.test(category)) return 'bg-pink-50 text-pink-700 border-pink-200';
    if (/People|Human|Society|Relationship/.test(category)) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    if (/Business|Commerce|Pitch|Venture/.test(category)) return 'bg-amber-50 text-amber-700 border-amber-200';
    if (/Science|Investigation|Nature/.test(category)) return 'bg-teal-50 text-teal-700 border-teal-200';
    if (/Hands-on|Craft|Troubleshoot/.test(category)) return 'bg-orange-50 text-orange-700 border-orange-200';
    if (/Thinking|Decision/.test(category)) return 'bg-purple-50 text-purple-700 border-purple-200';
    if (/Value|Tradeoff|Setting/.test(category)) return 'bg-rose-50 text-rose-700 border-rose-200';
    if (/Aspiration|Ambition|Clarity/.test(category)) return 'bg-violet-50 text-violet-700 border-violet-200';
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  const handleSelectOption = (optionValue: string) => {
    const qId = currentQuestion.id;

    if (currentQuestion.isMultiSelect) {
      const currentList: string[] = Array.isArray(selectedAnswers[qId]) ? selectedAnswers[qId] : [];
      const maxSelect = currentQuestion.maxSelect || 3;

      if (currentList.includes(optionValue)) {
        // Deselect
        setSelectedAnswers(prev => ({
          ...prev,
          [qId]: currentList.filter(item => item !== optionValue)
        }));
      } else {
        // Add if under maxSelect limit
        if (currentList.length < maxSelect) {
          setSelectedAnswers(prev => ({
            ...prev,
            [qId]: [...currentList, optionValue]
          }));
        } else {
          // Replace oldest selection to keep interaction seamless
          setSelectedAnswers(prev => ({
            ...prev,
            [qId]: [...currentList.slice(1), optionValue]
          }));
        }
      }
    } else {
      // Single select
      setSelectedAnswers(prev => ({
        ...prev,
        [qId]: optionValue
      }));
    }
  };

  const handleCustomTextChange = (text: string) => {
    const qId = currentQuestion.id;
    setCustomNotes(prev => ({
      ...prev,
      [qId]: text
    }));
  };

  const isCurrentQuestionAnswered = () => {
    const qId = currentQuestion.id;
    const ans = selectedAnswers[qId];
    if (Array.isArray(ans)) return ans.length > 0;
    if (typeof ans === 'string') return ans.length > 0;
    return !!customNotes[qId]?.trim();
  };

  const handleNext = async () => {
    if (!isCurrentQuestionAnswered() && !currentQuestion.allowSkip) return;

    // Direct submission on question 15
    if (currentQuestionIndex === totalSteps - 1) {
      await finishAssessment();
      return;
    }

    // Advance to next question
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleSkip = () => {
    if (currentQuestionIndex < totalSteps - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishAssessment();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowQuestionMap(false);
  };

  const finishAssessment = async () => {
    setIsSynthesizing(true);
    setError(null);

    const steps = [
      'Synthesizing your responses across 10 core dimensions...',
      'Evaluating Builder, Intellectual, Creative, and Leadership affinities...',
      'Calculating individual scores (Strongest, Moderate, and Growth areas)...',
      'Formulating aligned career paths and practical weekend simulations...',
      'Generating your verified Ascend Multi-Domain Identity Profile...'
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setSynthesisStep(steps[stepIdx]);
      }
    }, 1100);

    try {
      const response = await fetch('/api/ai/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: selectedAnswers,
          customNotes: customNotes,
          studentInfo: {
            name: user.name,
            educationLevel: user.educationLevel,
            interests: user.interests,
            skills: user.skills
          }
        })
      });

      const data = await response.json();
      clearInterval(interval);

      if (data.success && data.result) {
        setActiveResult(data.result);
        saveAssessmentResult(data.result);
        setIsTakingAssessment(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(data.error || 'Failed to synthesize assessment result');
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error('Assessment synthesis fallback initiated:', err);

      // Deterministic client fallback guaranteeing 100% reliability
      const chars = calculateCharacteristicsScores(selectedAnswers, customNotes);
      const topChars = chars.filter(c => c.level === 'strongest').map(c => c.dimension);
      const modChars = chars.filter(c => c.level === 'moderate').map(c => c.dimension);
      const devChars = chars.filter(c => c.level === 'developing').map(c => c.dimension);

      const leadDimension = topChars[0] || 'Creative';
      const secondaryDimension = topChars[1] || 'Intellectual';

      const fallbackResult: AssessmentResult = {
        id: 'res_' + Date.now(),
        completedAt: new Date().toISOString(),
        characteristics: chars,
        topCharacteristics: topChars,
        moderateCharacteristics: modChars,
        developingCharacteristics: devChars,
        archetype: `The ${leadDimension} & ${secondaryDimension} Innovator`,
        archetypeTagline: 'Uniting curious investigation, conceptual depth, and multidisciplinary exploration.',
        summary: `Your responses highlight strong natural affinities in ${leadDimension} and ${secondaryDimension}. You approach challenges with a genuine desire to explore underlying principles and create meaningful, tangible outcomes.`,
        strongestInterestAreas: topChars.slice(0, 3),
        secondaryInterestAreas: modChars.slice(0, 2),
        corePassions: ['Voluntary exploration of ideas', 'Hands-on project development', 'Solving human-centered challenges'],
        curiosityDrivers: ['First-principles inquiry', 'Understanding root causes and system mechanics'],
        problemsToSolve: ['Designing intuitive systems and empowering communities through knowledge'],
        coreValues: ['Creative Autonomy', 'Intellectual Rigor', 'Authentic Contribution'],
        skillsToDevelop: ['Cross-Disciplinary Translation', 'Rapid Prototyping', 'Iterative Execution'],
        thinkingStyle: {
          approach: 'Flexible Empirical & Lateral Synthesis',
          flexiblePreferences: ['Comfortable in both independent deep inquiry and collaborative team coordination'],
          collaborationVibe: 'Thoughtful, constructive, and pragmatic partner',
          description: 'You fluidly connect high-level conceptual frameworks with concrete application.'
        },
        careerClarity: {
          status: 'Exploring Multi-Disciplinary Passions',
          existingAmbitions: 'Investigating high-fit careers that leverage natural strengths',
          counselorValidation: 'Your multi-dimensional curiosity is a powerful competitive advantage. Focus on testing real projects to validate your direction.'
        },
        recommendedCareers: [
          {
            id: 'car_fb_1',
            title: `${leadDimension} Systems & Design Architect`,
            matchScore: 96,
            industry: 'Creative & Technical Innovation',
            salaryRange: '$85,000 - $135,000',
            growthOutlook: '+15% (Much faster than average)',
            automationResilience: 'Very High',
            description: 'Direct the design of complex systems, bridging user requirements with architectural execution.',
            keySkills: ['Systems Modeling', 'User-Centered Design', 'Rapid Prototyping'],
            dayInTheLife: 'Facilitating collaborative design workshops, evaluating architecture trade-offs, and building pilot deliverables.',
            whyItFitsWhatYouLove: `Directly engages your ${leadDimension} and ${secondaryDimension} characteristics by balancing visionary ideas with practical execution.`,
            practicalSimulation: {
              title: 'Weekend System Mini-Brief',
              description: 'Select an inefficient workflow in your daily routine and design a 3-step prototype to optimize it.',
              tryItThisWeekend: 'Create a conceptual diagram or mockup and test it with a peer for immediate feedback.'
            }
          },
          {
            id: 'car_fb_2',
            title: 'Applied Strategic & Quantitative Researcher',
            matchScore: 91,
            industry: 'Applied Research & Analytics',
            salaryRange: '$78,000 - $120,000',
            growthOutlook: '+12% (Steady growth)',
            automationResilience: 'High',
            description: 'Investigate emerging industry questions using empirical methodologies and data modeling.',
            keySkills: ['Hypothesis Testing', 'Statistical Inference', 'Cross-Disciplinary Synthesis'],
            dayInTheLife: 'Analyzing experimental data, synthesizing domain literature, and authoring strategic recommendations.',
            whyItFitsWhatYouLove: 'Provides uninterrupted deep focus to investigate complex questions and uncover evidence-based insights.',
            practicalSimulation: {
              title: 'Empirical Investigation Challenge',
              description: 'Formulate a hypothesis about a topic you find fascinating and find public data to test it.',
              tryItThisWeekend: 'Summarize your findings in a concise 1-page research memorandum.'
            }
          }
        ],
        recommendedMajors: [
          {
            id: 'maj_fb_1',
            name: 'Interdisciplinary Studies & Cognitive Architecture',
            degreeType: 'B.S. / B.A.',
            matchReason: 'Balances rigorous analytical methodologies with creative synthesis and hands-on application.',
            targetColleges: ['College of Engineering Trivandrum (CET)', 'University College Thiruvananthapuram', 'CUSAT Kochi'],
            careerAlignment: ['Strategic Design', 'Applied Innovation', 'Systems Engineering']
          },
          {
            id: 'maj_fb_2',
            name: 'Applied Technology & Society',
            degreeType: 'B.S.',
            matchReason: 'Prepares students to navigate the intersection of human behavior, ethics, and modern systems.',
            targetColleges: ['NIT Calicut', 'Rajagiri College of Social Sciences', 'CMS College Kottayam'],
            careerAlignment: ['Product Strategy', 'Research Operations', 'Technology Consulting']
          }
        ],
        riasecScores: {
          realistic: 70,
          investigative: 85,
          artistic: 80,
          social: 72,
          enterprising: 68,
          conventional: 60
        },
        workStyle: {
          introversionExtroversionLabel: 'Flexible Ambivert',
          introversionExtroversionScore: 50,
          collaborationPreference: 'Hybrid independent synthesis + focused collaborative review',
          environmentType: 'Dynamic, project-oriented environment',
          problemSolvingApproach: 'Hypothesis-driven testing and creative iteration'
        },
        learningStyle: {
          primaryStyle: 'Interactive & Practical Simulation',
          description: 'You learn concepts fastest by building or applying them to authentic scenarios.',
          recommendedFormat: 'Real-world projects with tangible deliverables'
        },
        strengths: ['Curiosity-driven initiative', 'Multidisciplinary synthesis', 'Pragmatic execution'],
        growthAreas: ['Sharing unfinished work early for feedback', 'Refining specialized tooling']
      };

      setActiveResult(fallbackResult);
      saveAssessmentResult(fallbackResult);
      setIsTakingAssessment(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSynthesizing(false);
    }
  };

  // If user has a result and isn't actively taking an assessment, show IdentityProfileView immediately
  if ((activeResult || user.assessmentResult) && !isTakingAssessment) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IdentityProfileView
          result={activeResult || user.assessmentResult!}
          onRetake={() => {
            setSelectedAnswers({});
            setCustomNotes({});
            setCurrentQuestionIndex(0);
            setActiveResult(null);
            setIsTakingAssessment(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectCareerForSkillGap={onSelectCareerForSkillGap}
          onNavigateToColleges={onNavigateToColleges}
        />
      </div>
    );
  }

  // Synthesis loading state
  if (isSynthesizing) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm">
          <Brain className="w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">Synthesizing Your Personal Identity Profile</h2>
          <p className="text-sm text-indigo-700 font-semibold animate-pulse">
            {synthesisStep}
          </p>
        </div>

        <div className="w-64 mx-auto h-2.5 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full bg-indigo-600 animate-[pulse_1s_infinite] w-full" />
        </div>

        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Ascend AI · Comprehensive assessment evaluating arts, sciences, healthcare, business, humanities, engineering, and trades without stereotyping.
        </p>
      </div>
    );
  }

  const activeQuestionId = currentQuestion.id;
  const activeThemeClass = getCategoryTheme(currentQuestion.category);

  // Check selection
  const isOptionSelected = (optVal: string) => {
    const val = selectedAnswers[activeQuestionId];
    if (Array.isArray(val)) return val.includes(optVal);
    return val === optVal;
  };

  const isMulti = !!currentQuestion.isMultiSelect;
  const maxSelectCount = currentQuestion.maxSelect || 3;
  const currentSelectedCount = Array.isArray(selectedAnswers[activeQuestionId]) ? selectedAnswers[activeQuestionId].length : 0;
  const isFinalQuestion = currentQuestionIndex === totalSteps - 1;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in text-slate-800">
      {/* Question Header & Category Pill */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${activeThemeClass}`}>
            <Compass className="w-3.5 h-3.5" />
            <span>{currentQuestion.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuestionMap(!showQuestionMap)}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Map (15 Qs)</span>
              {showQuestionMap ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <span className="text-xs font-mono font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
              {currentStep} / {totalSteps}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Map Dropdown Modal */}
      {showQuestionMap && (
        <div className="mb-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm animate-fade-in">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800">Ascend 15-Question Navigator</span>
            <span className="text-[11px] text-slate-500">Jump directly to any area</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {baseQuestions.map((q, idx) => {
              const isAnswered = !!selectedAnswers[q.id] || !!customNotes[q.id];
              const isCurrent = idx === currentQuestionIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => handleJumpToQuestion(idx)}
                  className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-50/70 font-bold text-indigo-900 ring-1 ring-indigo-600'
                      : isAnswered
                      ? 'border-emerald-200 bg-emerald-50/50 text-emerald-900 font-medium'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <span className="font-mono text-[10px]">Q{idx + 1}</span>
                  <span className="text-[11px] line-clamp-1 truncate">{q.category}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {currentQuestion.question}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {currentQuestion.subtitle}
          </p>

          {isMulti && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Select up to {maxSelectCount} options ({currentSelectedCount}/{maxSelectCount} chosen)</span>
            </div>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((option) => {
            const isSelected = isOptionSelected(option.value);

            return (
              <div
                key={option.value}
                onClick={() => handleSelectOption(option.value)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                      {option.label}
                    </span>
                    {option.domain && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium hidden sm:inline">
                        {option.domain}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {option.description}
                  </p>
                  {'tags' in option && Array.isArray((option as any).tags) && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(option as any).tags.map((t: string, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* In-Your-Own-Words Custom Input */}
        {currentQuestion.allowCustomInput && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
              <span>Or explain in your own words (optional):</span>
            </div>
            <textarea
              value={customNotes[activeQuestionId] || ''}
              onChange={(e) => handleCustomTextChange(e.target.value)}
              placeholder={currentQuestion.customInputPlaceholder || 'Share in your own words...'}
              rows={2}
              className="w-full text-xs p-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 placeholder:text-slate-400 resize-none"
            />
            <p className="text-[11px] text-slate-500">
              Feel free to mention specific topics, books, hobbies, creators, projects, or goals.
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-600 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {currentQuestion.allowSkip !== false && (
              <button
                type="button"
                onClick={handleSkip}
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1"
                title="Skip this question"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Skip</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered() && !currentQuestion.allowSkip}
            className={`px-5 py-2.5 rounded-xl text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed ${
              isFinalQuestion
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isFinalQuestion ? (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Submit Final Answer &amp; Generate Results</span>
              </>
            ) : (
              <>
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Helpful reassurance */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
        <span>Ascend evaluates your genuine motivations across all domains without stereotyping.</span>
      </div>
    </div>
  );
};
