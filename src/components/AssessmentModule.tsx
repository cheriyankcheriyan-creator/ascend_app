import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, ArrowLeft, Brain, Check, MessageSquare, Lightbulb, HelpCircle, Loader2, SkipForward, Grid, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ASSESSMENT_QUESTIONS } from '../data/mockData';
import { IdentityProfileView } from './IdentityProfileView';
import { RecommendedCareer } from '../types';

interface AssessmentModuleProps {
  onSelectCareerForSkillGap: (career: RecommendedCareer) => void;
  onNavigateToColleges: () => void;
}

interface AdaptiveQuestionData {
  question: string;
  subtitle: string;
  suggestedOptions: {
    label: string;
    description: string;
    value: string;
  }[];
}

export const AssessmentModule: React.FC<AssessmentModuleProps> = ({
  onSelectCareerForSkillGap,
  onNavigateToColleges,
}) => {
  const { user, saveAssessmentResult } = useAuth();
  const [isTakingAssessment, setIsTakingAssessment] = useState<boolean>(!user.assessmentResult);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({});
  const [showQuestionMap, setShowQuestionMap] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStep, setSynthesisStep] = useState('Analyzing your genuine passions across all disciplines...');
  const [error, setError] = useState<string | null>(null);

  // Adaptive follow-up state
  const [isLoadingAdaptive, setIsLoadingAdaptive] = useState(false);
  const [adaptiveQuestion, setAdaptiveQuestion] = useState<AdaptiveQuestionData | null>(null);
  const [isAnsweringAdaptive, setIsAnsweringAdaptive] = useState(false);

  const baseQuestions = ASSESSMENT_QUESTIONS;
  const totalBaseQuestions = baseQuestions.length;
  const totalSteps = totalBaseQuestions + 1; // 25 base questions + 1 adaptive follow-up
  const currentStep = isAnsweringAdaptive ? totalSteps : currentQuestionIndex + 1;
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
    const qId = isAnsweringAdaptive ? 'q_adaptive' : currentQuestion.id;

    if (!isAnsweringAdaptive && currentQuestion.isMultiSelect) {
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
          // Replace first item to keep it seamless
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
    const qId = isAnsweringAdaptive ? 'q_adaptive' : currentQuestion.id;
    setCustomNotes(prev => ({
      ...prev,
      [qId]: text
    }));
  };

  const isCurrentQuestionAnswered = () => {
    const qId = isAnsweringAdaptive ? 'q_adaptive' : currentQuestion.id;
    const ans = selectedAnswers[qId];
    if (Array.isArray(ans)) return ans.length > 0;
    if (typeof ans === 'string') return ans.length > 0;
    return !!customNotes[qId]?.trim();
  };

  const handleNext = async () => {
    // If not answered and not skip, prevent
    if (!isCurrentQuestionAnswered() && !currentQuestion.allowSkip && !isAnsweringAdaptive) return;

    // If on the last base question, generate the tailored adaptive follow-up
    if (!isAnsweringAdaptive && currentQuestionIndex === totalBaseQuestions - 1) {
      await fetchAdaptiveQuestion();
      return;
    }

    // If on the adaptive question, finish and synthesize
    if (isAnsweringAdaptive) {
      finishAssessment();
      return;
    }

    // Move to next question
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleSkip = () => {
    if (!isAnsweringAdaptive && currentQuestionIndex < totalBaseQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (!isAnsweringAdaptive) {
      fetchAdaptiveQuestion();
    } else {
      finishAssessment();
    }
  };

  const handleBack = () => {
    if (isAnsweringAdaptive) {
      setIsAnsweringAdaptive(false);
      return;
    }
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setIsAnsweringAdaptive(false);
    setCurrentQuestionIndex(index);
    setShowQuestionMap(false);
  };

  const fetchAdaptiveQuestion = async () => {
    setIsLoadingAdaptive(true);
    setError(null);
    try {
      const response = await fetch('/api/ai/adaptive-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previousAnswers: selectedAnswers,
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
      if (data.success && data.adaptiveQuestion) {
        setAdaptiveQuestion(data.adaptiveQuestion);
        setIsAnsweringAdaptive(true);
      } else {
        finishAssessment();
      }
    } catch (err) {
      console.warn('Adaptive follow-up failed, synthesizing directly:', err);
      finishAssessment();
    } finally {
      setIsLoadingAdaptive(false);
    }
  };

  const finishAssessment = async () => {
    setIsSynthesizing(true);
    setError(null);

    const steps = [
      'Synthesizing interests across arts, healthcare, sciences, commerce, and crafts...',
      'Mapping your flexible thinking preferences and intrinsic motivators...',
      'Validating your career ambition and exploring cross-domain intersections...',
      'Designing practical weekend simulations so you can test your interests...',
      'Formulating your verified Ascend Multi-Domain Identity Profile...'
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setSynthesisStep(steps[stepIdx]);
      }
    }, 1300);

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
        saveAssessmentResult(data.result);
        setIsTakingAssessment(false);
      } else {
        throw new Error(data.error || 'Failed to synthesize assessment result');
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error('Assessment synthesis failed:', err);
      setError('Connection interrupted while synthesizing profile. Please try again.');
    } finally {
      setIsSynthesizing(false);
    }
  };

  // If user already has a result and isn't taking an assessment, show IdentityProfileView
  if (user.assessmentResult && !isTakingAssessment) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IdentityProfileView
          result={user.assessmentResult}
          onRetake={() => {
            setSelectedAnswers({});
            setCustomNotes({});
            setCurrentQuestionIndex(0);
            setIsAnsweringAdaptive(false);
            setAdaptiveQuestion(null);
            setIsTakingAssessment(true);
          }}
          onSelectCareerForSkillGap={onSelectCareerForSkillGap}
          onNavigateToColleges={onNavigateToColleges}
        />
      </div>
    );
  }

  // Loading state while generating adaptive question
  if (isLoadingAdaptive) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-xs">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">Tailoring Your Next Question</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Ascend is reviewing your responses across all 25 areas to formulate a personalized follow-up exploring your specific curiosity...
          </p>
        </div>
      </div>
    );
  }

  // Synthesis loading state
  if (isSynthesizing) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm">
          <Brain className="w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">Synthesizing Your Multi-Domain Profile</h2>
          <p className="text-sm text-indigo-700 font-semibold animate-pulse">
            {synthesisStep}
          </p>
        </div>

        <div className="w-64 mx-auto h-2.5 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full bg-indigo-600 animate-[pulse_1s_infinite] w-full" />
        </div>

        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Ascend AI · Domain-neutral cognitive assessment evaluating arts, sciences, healthcare, business, humanities, law, education, and trades without stereotyping.
        </p>
      </div>
    );
  }

  // Current display question (base or adaptive)
  const isAdaptive = isAnsweringAdaptive && !!adaptiveQuestion;
  const activeQuestionText = isAdaptive ? adaptiveQuestion!.question : currentQuestion.question;
  const activeSubtitle = isAdaptive ? adaptiveQuestion!.subtitle : currentQuestion.subtitle;
  const activeOptions = isAdaptive ? adaptiveQuestion!.suggestedOptions : currentQuestion.options;
  const activeAllowCustom = isAdaptive ? true : currentQuestion.allowCustomInput;
  const activeCustomPlaceholder = isAdaptive
    ? 'Share your thoughts in your own words...'
    : currentQuestion.customInputPlaceholder || 'Share in your own words...';
  const activeQuestionId = isAdaptive ? 'q_adaptive' : currentQuestion.id;
  const activeCategory = isAdaptive ? 'Adaptive Curiosity Discovery' : currentQuestion.category;
  const activeThemeClass = isAdaptive
    ? 'bg-violet-50 text-violet-700 border-violet-200'
    : getCategoryTheme(currentQuestion.category);

  // Check selection
  const isOptionSelected = (optVal: string) => {
    const val = selectedAnswers[activeQuestionId];
    if (Array.isArray(val)) return val.includes(optVal);
    return val === optVal;
  };

  const isMulti = !isAdaptive && !!currentQuestion.isMultiSelect;
  const maxSelectCount = currentQuestion.maxSelect || 3;
  const currentSelectedCount = Array.isArray(selectedAnswers[activeQuestionId]) ? selectedAnswers[activeQuestionId].length : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in text-slate-800">
      {/* Intro Header */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${activeThemeClass}`}>
            <Compass className="w-3.5 h-3.5" />
            <span>{activeCategory}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuestionMap(!showQuestionMap)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-1.5"
              title="View all 25 questions"
            >
              <Grid className="w-3.5 h-3.5 text-slate-500" />
              <span>Map ({currentStep}/{totalSteps})</span>
              {showQuestionMap ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Question Map Dropdown Drawer */}
        {showQuestionMap && (
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md space-y-2.5 animate-fade-in">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">25-Question Assessment Roadmap</span>
              <span className="text-slate-500 text-[11px]">Click any question to jump and revise</span>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 pt-1">
              {baseQuestions.map((q, idx) => {
                const ans = selectedAnswers[q.id];
                const hasAnswer = (Array.isArray(ans) && ans.length > 0) || (typeof ans === 'string' && ans.length > 0) || !!customNotes[q.id]?.trim();
                const isCurrent = currentQuestionIndex === idx && !isAnsweringAdaptive;

                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`h-8 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center border ${
                      isCurrent
                        ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-200'
                        : hasAnswer
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Discover What You Genuinely Love
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          A domain-neutral assessment spanning arts, sciences, healthcare, business, humanities, law, and hands-on crafts. Answer naturally without pressure.
        </p>

        {/* Progress Bar */}
        <div className="pt-2">
          <div className="flex justify-between text-[11px] text-slate-500 mb-1">
            <span>Progress: {progressPercent}%</span>
            <span>Question {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          {error}
        </div>
      )}

      {/* Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {activeQuestionText}
            </h2>
          </div>

          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            {activeSubtitle}
          </p>

          {isMulti && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold mt-2">
              <span>Select up to {maxSelectCount} choices ({currentSelectedCount}/{maxSelectCount} selected)</span>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {activeOptions.map((option, idx) => {
            const isSelected = isOptionSelected(option.value);
            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(option.value)}
                className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 text-left group ${
                  isSelected
                    ? 'bg-indigo-50/70 border-indigo-500 shadow-xs ring-1 ring-indigo-500'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div
                  className={`mt-0.5 w-5 h-5 ${isMulti ? 'rounded-md' : 'rounded-full'} flex items-center justify-center shrink-0 border transition-all ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-slate-900">
                      {option.label}
                    </p>
                    {'domain' in option && (option as any).domain && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200 shrink-0 hidden sm:inline">
                        {(option as any).domain}
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
        {activeAllowCustom && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
              <span>Or explain in your own words (optional):</span>
            </div>
            <textarea
              value={customNotes[activeQuestionId] || ''}
              onChange={(e) => handleCustomTextChange(e.target.value)}
              placeholder={activeCustomPlaceholder}
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
              disabled={currentQuestionIndex === 0 && !isAnsweringAdaptive}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-600 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {!isAnsweringAdaptive && currentQuestion.allowSkip !== false && (
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
            disabled={!isCurrentQuestionAnswered() && !currentQuestion.allowSkip && !isAnsweringAdaptive}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>
              {isAnsweringAdaptive
                ? 'Synthesize Full Identity Profile'
                : currentQuestionIndex === totalBaseQuestions - 1
                ? 'Continue to Adaptive Follow-Up'
                : 'Next Question'}
            </span>
            <ArrowRight className="w-4 h-4" />
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
