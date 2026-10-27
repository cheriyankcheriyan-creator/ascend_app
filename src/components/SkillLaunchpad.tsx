import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  BookOpen,
  Zap,
  Target,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { COURSES_DATA, INTERNSHIPS_DATA } from '../data/mockData';
import { Course, Internship, RecommendedCareer } from '../types';
import confetti from 'canvas-confetti';

interface SkillLaunchpadProps {
  initialCareerFocus?: RecommendedCareer;
  onOpenProModal: () => void;
}

export const SkillLaunchpad: React.FC<SkillLaunchpadProps> = ({
  initialCareerFocus,
  onOpenProModal
}) => {
  const { user, enrollCourse, updateCourseProgress, submitInternshipApplication } = useAuth();

  const availableCareers = [
    'AI / Machine Learning Systems Engineer',
    'Full-Stack Software Engineer',
    'Autonomous Robotics Software Engineer',
    'Bioinformatics Scientist',
    'Quantitative Financial Analyst',
    'Cloud Solutions Architect'
  ];

  const defaultCareer =
    initialCareerFocus?.title ||
    user.assessmentResult?.recommendedCareers[0]?.title ||
    availableCareers[0];

  const [selectedCareerTitle, setSelectedCareerTitle] = useState<string>(defaultCareer);
  const [activeSubTab, setActiveSubTab] = useState<'analyzer' | 'courses' | 'internships'>('analyzer');
  const [courseFilter, setCourseFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [internshipFilter, setInternshipFilter] = useState<string>('all');

  // AI Skill Gap State
  const [isAnalyzingGap, setIsAnalyzingGap] = useState(false);
  const [aiGapRoadmap, setAiGapRoadmap] = useState<any>(null);

  // Application Modal state
  const [selectedJobForApply, setSelectedJobForApply] = useState<Internship | null>(null);
  const [applicationCoverNote, setApplicationCoverNote] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Modal for Course Syllabus
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);

  const careerSkillRequirements: Record<string, string[]> = {
    'AI / Machine Learning Systems Engineer': [
      'Python',
      'Data Structures & Algorithms',
      'PyTorch',
      'Transformer Architecture',
      'Linear Algebra & Calculus',
      'Vector Databases',
      'Model Optimization'
    ],
    'Full-Stack Software Engineer': [
      'TypeScript',
      'React 19',
      'Node.js & Express',
      'PostgreSQL',
      'Git',
      'Docker',
      'AWS Lambda'
    ],
    'Autonomous Robotics Software Engineer': [
      'Python',
      'C++',
      'ROS2',
      'Linear Algebra & Calculus',
      'Computer Vision',
      'Control Systems'
    ],
    'Bioinformatics Scientist': [
      'Python',
      'BioPython',
      'Biostatistics',
      'Genomics Basics',
      'Data Visualization',
      'AlphaFold Analysis'
    ],
    'Quantitative Financial Analyst': [
      'Python',
      'Probability & Statistics',
      'Linear Algebra & Calculus',
      'Time Series Econometrics',
      'Sharpe & Sortino Optimization',
      'Financial Modeling'
    ],
    'Cloud Solutions Architect': [
      'AWS IAM & VPC',
      'Docker',
      'Terraform',
      'Microservices',
      'Git',
      'High Availability Architecture'
    ]
  };

  const targetRequiredSkills = careerSkillRequirements[selectedCareerTitle] || careerSkillRequirements['AI / Machine Learning Systems Engineer'];

  const possessedSkills = useMemo(() => {
    return targetRequiredSkills.filter(skill =>
      user.skills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    );
  }, [targetRequiredSkills, user.skills]);

  const missingSkills = useMemo(() => {
    return targetRequiredSkills.filter(skill =>
      !user.skills.some(userSkill => userSkill.toLowerCase() === skill.toLowerCase())
    );
  }, [targetRequiredSkills, user.skills]);

  const matchPercentage = Math.round((possessedSkills.length / targetRequiredSkills.length) * 100);

  const handleGenerateAiGap = async () => {
    setIsAnalyzingGap(true);
    try {
      const res = await fetch('/api/ai/skill-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetCareerTitle: selectedCareerTitle,
          currentSkills: user.skills
        })
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAiGapRoadmap(data.analysis);
      }
    } catch (e) {
      console.error('Gap generation error:', e);
    } finally {
      setIsAnalyzingGap(false);
    }
  };

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter(course => {
      if (courseFilter === 'free') return course.isFree;
      if (courseFilter === 'premium') return !course.isFree;
      return true;
    });
  }, [courseFilter]);

  const filteredInternships = useMemo(() => {
    return INTERNSHIPS_DATA.filter(job => {
      if (internshipFilter === 'all') return true;
      if (internshipFilter === 'hybrid') return job.workMode === 'Hybrid' || job.workMode === 'Remote';
      if (internshipFilter === 'summer') return job.type.includes('Summer');
      return true;
    });
  }, [internshipFilter]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForApply) return;

    submitInternshipApplication(selectedJobForApply.id, applicationCoverNote);
    setApplicationSubmitted(true);
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    setTimeout(() => {
      setApplicationSubmitted(false);
      setSelectedJobForApply(null);
      setApplicationCoverNote('');
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-slate-800">
      {/* Launchpad Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Step 3 · Bridge College to Industry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Skill Development &amp; Career Launchpad
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
            Analyze skill gaps against verified 2026 industry requirements, pursue accredited micro-courses, and directly apply to premier student internships.
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex rounded-2xl bg-slate-100/90 p-1.5 border border-slate-200">
          <button
            onClick={() => setActiveSubTab('analyzer')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 ${
              activeSubTab === 'analyzer'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Skill-Gap Analyzer</span>
          </button>
          <button
            onClick={() => setActiveSubTab('courses')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 ${
              activeSubTab === 'courses'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Industry Courses</span>
          </button>
          <button
            onClick={() => setActiveSubTab('internships')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 ${
              activeSubTab === 'internships'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Internships Board</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: SKILL-GAP ANALYZER */}
      {activeSubTab === 'analyzer' && (
        <div className="space-y-6">
          {/* Target Role Selector & Gauge */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Target Trajectory Benchmark
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {selectedCareerTitle}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Comparing your current validated skills ({user.skills.length} skills) against 2026 hiring criteria.
                </p>
              </div>

              {/* Selector */}
              <div className="w-full md:w-72">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Switch Target Career:
                </label>
                <select
                  value={selectedCareerTitle}
                  onChange={(e) => {
                    setSelectedCareerTitle(e.target.value);
                    setAiGapRoadmap(null);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-semibold focus:border-indigo-500 focus:bg-white focus:outline-none"
                >
                  {availableCareers.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Gauge & Missing Skills Breakout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Readiness Percentage */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500">Current Industry Readiness</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-extrabold text-slate-900 font-mono">{matchPercentage}%</span>
                    <span className="text-xs text-emerald-700 font-bold">Match</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {matchPercentage >= 70
                      ? 'Strong foundation! Ready for entry-level internship applications.'
                      : 'Developing competency. Focus on closing the 2 highest priority skills.'}
                  </p>
                </div>

                <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden mt-4">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-700"
                    style={{ width: `${matchPercentage}%` }}
                  />
                </div>
              </div>

              {/* Acquired Skills */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-900">
                    Validated In Your Profile ({possessedSkills.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {possessedSkills.length > 0 ? (
                    possessedSkills.map((s, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium"
                      >
                        ✓ {s}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">None yet verified in target area.</p>
                  )}
                </div>
              </div>

              {/* Missing High-Priority Skills */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-slate-900">
                    Target Skills to Acquire ({missingSkills.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-medium"
                    >
                      + {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Roadmap Trigger */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">
                Want a personalized week-by-week learning trajectory and capstone project to close this gap?
              </p>
              <button
                onClick={handleGenerateAiGap}
                disabled={isAnalyzingGap}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isAnalyzingGap ? 'Generating AI Roadmap...' : 'Generate 6-Week Gap Roadmap'}</span>
              </button>
            </div>
          </div>

          {/* AI Gap Roadmap Display */}
          {aiGapRoadmap && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-indigo-200 shadow-xs space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                    Tailored AI Learning Trajectory
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    Strategic 6-Week Gap Bridging Plan
                  </h3>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                  {aiGapRoadmap.readinessLevel}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                💡 <span className="font-bold text-slate-900">Counselor Advice:</span> {aiGapRoadmap.strategicAdvice}
              </p>

              {/* Phased Roadmap Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiGapRoadmap.phasedRoadmap.map((phaseItem: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-indigo-700">{phaseItem.phase}</span>
                        <span className="text-slate-500 font-medium">{phaseItem.duration}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{phaseItem.title}</h4>
                      <div>
                        <span className="text-[11px] text-slate-500 font-semibold block mb-1">Focus Competencies:</span>
                        <div className="flex flex-wrap gap-1">
                          {phaseItem.focusSkills.map((fs: string, i: number) => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                              {fs}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                        Capstone Deliverable:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">{phaseItem.milestoneProject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: INDUSTRY COURSES CATALOG */}
      {activeSubTab === 'courses' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Industry-Oriented Course Offerings
              </span>
            </div>

            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
              <button
                onClick={() => setCourseFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  courseFilter === 'all' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Courses ({COURSES_DATA.length})
              </button>
              <button
                onClick={() => setCourseFilter('free')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  courseFilter === 'free' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Free Tracks
              </button>
              <button
                onClick={() => setCourseFilter('premium')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  courseFilter === 'premium' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Partner Accredited ($)
              </button>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isEnrolled = user.enrolledCourseIds.includes(course.id);
              const progress = user.courseProgress[course.id] || 0;

              return (
                <div
                  key={course.id}
                  className="rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group shadow-xs"
                >
                  {/* Image Banner */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 shadow-2xs">
                        {course.partnerBadge}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs ${
                          course.isFree
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-400 text-slate-950 font-extrabold'
                        }`}
                      >
                        {course.isFree ? '100% Free' : `$${course.price}`}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-[11px] text-indigo-200 font-semibold">{course.provider}</p>
                      <h3 className="text-base font-bold text-white tracking-tight leading-snug line-clamp-1 drop-shadow-md">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between text-slate-500">
                        <span>Duration: {course.duration}</span>
                        <span>Level: {course.level}</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Skills Mastered:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {course.skillsGained.slice(0, 3).map((sk, idx) => (
                            <span key={idx} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Capstone Preview */}
                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block mb-0.5">
                          Practical Capstone:
                        </span>
                        <p className="text-xs text-slate-800 font-semibold line-clamp-1">{course.practicalProject.title}</p>
                      </div>
                    </div>

                    {/* Progress Slider if Enrolled */}
                    {isEnrolled && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <div className="flex justify-between text-xs">
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled
                          </span>
                          <span className="text-slate-900 font-mono font-bold">{progress}% Complete</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={progress}
                          onChange={(e) => updateCourseProgress(course.id, parseInt(e.target.value, 10))}
                          className="w-full accent-emerald-600 cursor-pointer"
                          title="Drag to update learning progress"
                        />
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCourseForDetail(course)}
                        className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-xs transition-colors"
                      >
                        Syllabus &amp; Specs
                      </button>

                      {!isEnrolled ? (
                        <button
                          onClick={() => {
                            enrollCourse(course.id);
                            try { confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } }); } catch (e) {}
                          }}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all"
                        >
                          Enroll Now
                        </button>
                      ) : (
                        <span className="text-[11px] px-2 py-1 text-slate-400 font-semibold">In Progress</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: INTERNSHIPS & ENTRY-LEVEL JOB BOARD */}
      {activeSubTab === 'internships' && (
        <div className="space-y-6">
          {/* Header & Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Verified Student Opportunities
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Computed against your acquired skill profile. Apply directly with your Ascend portfolio.
              </p>
            </div>

            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs">
              <button
                onClick={() => setInternshipFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  internshipFilter === 'all' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Roles
              </button>
              <button
                onClick={() => setInternshipFilter('hybrid')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  internshipFilter === 'hybrid' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hybrid / Remote
              </button>
              <button
                onClick={() => setInternshipFilter('summer')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  internshipFilter === 'summer' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Summer Internships
              </button>
            </div>
          </div>

          {/* Internships List */}
          <div className="space-y-4">
            {filteredInternships.map((job) => {
              const matchedSkillsCount = job.requiredSkills.filter(req =>
                user.skills.some(userSkill => userSkill.toLowerCase() === req.toLowerCase())
              ).length;
              const jobMatch = Math.round((matchedSkillsCount / job.requiredSkills.length) * 100);

              const hasApplied = user.internshipApplications.some(a => a.jobId === job.id);

              return (
                <div
                  key={job.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={job.companyLogo}
                      alt={job.company}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                    />

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{job.company}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                          {job.workMode}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold">
                          {job.type}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{job.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                        {job.description}
                      </p>

                      {/* Required Skills Check */}
                      <div className="pt-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Required Qualifications:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {job.requiredSkills.map((req, idx) => {
                            const isMet = user.skills.some(s => s.toLowerCase() === req.toLowerCase());
                            return (
                              <span
                                key={idx}
                                className={`text-xs px-2.5 py-0.5 rounded-md font-semibold flex items-center gap-1 ${
                                  isMet
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                                }`}
                              >
                                {isMet ? '✓' : '•'} {req}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side Stats & Apply */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right space-y-0.5 text-xs">
                      <p className="font-extrabold text-emerald-700 text-sm">{job.stipend}</p>
                      <p className="text-slate-500">{job.duration} · Deadline: {job.deadline}</p>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 pt-1">
                        <span>Profile Match:</span>
                        <span className="font-mono font-extrabold text-indigo-700">{jobMatch}%</span>
                      </div>
                    </div>

                    {hasApplied ? (
                      <span className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Application Submitted
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedJobForApply(job)}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all flex items-center gap-2"
                      >
                        <span>Apply with Portfolio</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal: Job Application Simulator */}
      {selectedJobForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in text-slate-800">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Direct Student Application
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedJobForApply.title}
                </h3>
                <p className="text-xs text-slate-500">{selectedJobForApply.company} · {selectedJobForApply.location}</p>
              </div>

              <button
                onClick={() => setSelectedJobForApply(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApply} className="p-6 space-y-4 text-xs">
              {applicationSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Application Successfully Submitted!</h4>
                  <p className="text-xs text-slate-600">
                    Your candidate profile, GPA ({user.gpa || '3.9'}), and verified project portfolio have been transmitted to the {selectedJobForApply.company} University Recruiting portal.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <p className="text-slate-800 font-bold">Attached Ascend Student Credentials:</p>
                    <p className="text-slate-600">Candidate: <span className="text-slate-900 font-medium">{user.name} ({user.email})</span></p>
                    <p className="text-slate-600">Standing: <span className="text-slate-900 font-medium">{user.educationLevel}</span></p>
                    <p className="text-slate-600">Skills Profile: <span className="text-slate-900 font-medium">{user.skills.join(', ')}</span></p>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Candidate Note / Why you are excited for this role (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={applicationCoverNote}
                      onChange={(e) => setApplicationCoverNote(e.target.value)}
                      placeholder="Share a link to your top project or what draws you to this team..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedJobForApply(null)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Application</span>
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Modal: Course Syllabus & Specs */}
      {selectedCourseForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in text-slate-800">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  {selectedCourseForDetail.partnerBadge}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {selectedCourseForDetail.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedCourseForDetail.provider} · {selectedCourseForDetail.duration} · Level: {selectedCourseForDetail.level}
                </p>
              </div>

              <button
                onClick={() => setSelectedCourseForDetail(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Curriculum Modules &amp; Syllabus
                </h4>
                <div className="space-y-2">
                  {selectedCourseForDetail.syllabus.map((mod, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>Week {mod.week}: {mod.title}</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">
                        Topics: {mod.topics.join(' · ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-800">
                  Practical Capstone Project Deliverable
                </span>
                <p className="text-sm font-bold text-slate-900">{selectedCourseForDetail.practicalProject.title}</p>
                <p className="text-slate-700 leading-relaxed">{selectedCourseForDetail.practicalProject.description}</p>
                <p className="text-xs text-indigo-800 font-bold pt-1">
                  Deliverable: {selectedCourseForDetail.practicalProject.deliverable}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Certification Accreditation
                </span>
                <p className="text-slate-800 font-semibold">{selectedCourseForDetail.certification.accreditation}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setSelectedCourseForDetail(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Close
              </button>
              {!user.enrolledCourseIds.includes(selectedCourseForDetail.id) && (
                <button
                  onClick={() => {
                    enrollCourse(selectedCourseForDetail.id);
                    setSelectedCourseForDetail(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
