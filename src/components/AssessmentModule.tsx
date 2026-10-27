import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, ArrowLeft, Brain, Check, MessageSquare, Lightbulb, HelpCircle, Loader2 } from 'lucide-react';
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
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({});
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStep, setSynthesisStep] = useState('Analyzing genuine passions and curiosity sparks...');
  const [error, setError] = useState<string | null>(null);

  // Adaptive follow-up state
  const [isLoadingAdaptive, setIsLoadingAdaptive] = useState(false);
  const [adaptiveQuestion, setAdaptiveQuestion] = useState<AdaptiveQuestionData | null>(null);
  const [isAnsweringAdaptive, setIsAnsweringAdaptive] = useState(false);

  const baseQuestions = ASSESSMENT_QUESTIONS;
  const totalBaseQuestions = baseQuestions.length;
  const totalSteps = totalBaseQuestions + 1; // Base questions + 1 adaptive follow-up
  const currentStep = isAnsweringAdaptive ? totalSteps : currentQuestionIndex + 1;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const currentQuestion = baseQuestions[currentQuestionIndex];

  // Stage mapping helper
  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'hobbies_activities':
        return { label: 'Stage 1 · Everyday Curiosities & Hobbies', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'deeper_curiosity':
        return { label: 'Stage 2 · Deeper Why & Contribution', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'thinking_preferences':
        return { label: 'Stage 3 · Flexible Thinking Style', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'career_clarity':
        return { label: 'Stage 4 · Career Ambition & Direction', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      default:
        return { label: 'Discovery Question', color: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  const handleSelectOption = (optionValue: string) => {
    const qId = isAnsweringAdaptive ? 'q_adaptive' : currentQuestion.id;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionValue
    }));
  };

  const handleCustomTextChange = (text: string) => {
    const qId = isAnsweringAdaptive ? 'q_adaptive' : currentQuestion.id;
    setCustomNotes(prev => ({
      ...prev,
      [qId]: text
    }));
  };

  const handleNext = async () => {
    const qId = isAnsweringAdaptive ? 'q_adaptive' : currentQuestion.id;
    const hasSelection = !!selectedAnswers[qId];
    const hasCustomNote = !!customNotes[qId]?.trim();

    if (!hasSelection && !hasCustomNote) return;

    // If we're on the last base question, generate the adaptive follow-up
    if (!isAnsweringAdaptive && currentQuestionIndex === totalBaseQuestions - 1) {
      await fetchAdaptiveQuestion();
      return;
    }

    // If we're on the adaptive question, finish and synthesize
    if (isAnsweringAdaptive) {
      finishAssessment();
      return;
    }

    // Move to next base question
    setCurrentQuestionIndex(prev => prev + 1);
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
        // Fallback straight to finishing if adaptive fetch is empty
        finishAssessment();
      }
    } catch (err) {
      console.warn('Could not load adaptive follow-up, synthesizing directly:', err);
      finishAssessment();
    } finally {
      setIsLoadingAdaptive(false);
    }
  };

  const finishAssessment = async () => {
    setIsSynthesizing(true);
    setError(null);

    const steps = [
      'Unpacking your genuine passions and curiosity sparks...',
      'Mapping your flexible thinking style (intuition, logic, and collaboration)...',
      'Validating your career ambition and finding high-growth intersections...',
      'Designing practical weekend simulations to test your interests...',
      'Synthesizing your verified Ascend Identity Profile...'
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setSynthesisStep(steps[stepIdx]);
      }
    }, 1200);

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
            Ascend is reviewing your answers to ask a personalized follow-up that explores your specific curiosity in greater depth...
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
          <h2 className="text-2xl font-extrabold text-slate-900">Discovering What You Genuinely Love</h2>
          <p className="text-sm text-indigo-700 font-semibold animate-pulse">
            {synthesisStep}
          </p>
        </div>

        <div className="w-64 mx-auto h-2.5 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full bg-indigo-600 animate-[pulse_1s_infinite] w-full" />
        </div>

        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Ascend AI · No generic personality pigeonholing. Grounded purely in your individual passions, flexible thinking tendencies, and aspirations.
        </p>
      </div>
    );
  }

  // Determine current display question (base or adaptive)
  const isAdaptive = isAnsweringAdaptive && !!adaptiveQuestion;
  const activeQuestionText = isAdaptive ? adaptiveQuestion!.question : currentQuestion.question;
  const activeSubtitle = isAdaptive ? adaptiveQuestion!.subtitle : currentQuestion.subtitle;
  const activeOptions = isAdaptive
    ? adaptiveQuestion!.suggestedOptions
    : currentQuestion.options;
  const activeAllowCustom = isAdaptive ? true : currentQuestion.allowCustomInput;
  const activeCustomPlaceholder = isAdaptive
    ? 'Share your thoughts in your own words...'
    : currentQuestion.customInputPlaceholder || 'Share in your own words...';
  const activeQuestionId = isAdaptive ? 'q_adaptive' : currentQuestion.id;
  const stageBadge = isAdaptive
    ? { label: 'Adaptive Stage · Personalized Curiosity Exploration', color: 'bg-violet-50 text-violet-700 border-violet-200' }
    : getStageBadge(currentQuestion.stage);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in text-slate-800">
      {/* Intro Header */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${stageBadge.color}`}>
            <Compass className="w-3.5 h-3.5" />
            <span>{stageBadge.label}</span>
          </div>

          <span className="text-xs text-slate-500 font-mono font-medium">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Discover Your True Passions &amp; Aspirations
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          This is not a generic test with &ldquo;correct&rdquo; answers. We are here to understand what you genuinely love doing, what makes your mind tick, and what future you want to build.
        </p>

        {/* Progress Bar */}
        <div className="pt-3">
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
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {activeQuestionText}
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            {activeSubtitle}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {activeOptions.map((option, idx) => {
            const isSelected = selectedAnswers[activeQuestionId] === option.value;
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
                  className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div className="space-y-1 flex-1">
                  <p className="text-sm font-bold text-slate-900">
                    {option.label}
                  </p>
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
              <span>Or express it in your own words (optional):</span>
            </div>
            <textarea
              value={customNotes[activeQuestionId] || ''}
              onChange={(e) => handleCustomTextChange(e.target.value)}
              placeholder={activeCustomPlaceholder}
              rows={2}
              className="w-full text-xs p-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 placeholder:text-slate-400 resize-none"
            />
            <p className="text-[11px] text-slate-500">
              Feel free to mention specific projects, favorite YouTubers, books, tools, or goals.
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0 && !isAnsweringAdaptive}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-600 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!selectedAnswers[activeQuestionId] && !customNotes[activeQuestionId]?.trim()}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>
              {isAnsweringAdaptive
                ? 'Synthesize Ascend Profile'
                : currentQuestionIndex === totalBaseQuestions - 1
                ? 'Continue to Adaptive Follow-Up'
                : 'Next Question'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Helpful context reassurance */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
        <span>Ascend respects your uniqueness. Preferences are flexible, not static labels.</span>
      </div>
    </div>
  );
};
