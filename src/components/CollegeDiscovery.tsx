import React, { useState, useMemo } from 'react';
import {
  Search,
  Bookmark,
  BookmarkCheck,
  Building2,
  GraduationCap,
  Star,
  MapPin,
  TrendingUp,
  CheckCircle2,
  X,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { COLLEGES_DATA } from '../data/mockData';
import { College, CollegeReview } from '../types';
import { CollegeCompareModal } from './CollegeCompareModal';

export const CollegeDiscovery: React.FC = () => {
  const { user, toggleSaveCollege } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajorFilter, setSelectedMajorFilter] = useState('All');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('All');
  const [maxBudget, setMaxBudget] = useState<number>(70000);
  const [selectedCampusType, setSelectedCampusType] = useState('All');
  const [selectedCollegeForDetail, setSelectedCollegeForDetail] = useState<College | null>(null);

  // Compare selection (up to 3)
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Review submission simulation
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewMajor, setNewReviewMajor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewPros, setNewReviewPros] = useState('');
  const [newReviewCons, setNewReviewCons] = useState('');
  const [reviewSubmittedSuccess, setReviewSubmittedSuccess] = useState(false);

  // Filtering
  const filteredColleges = useMemo(() => {
    return COLLEGES_DATA.filter((college) => {
      const matchesSearch =
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.popularMajors.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
        college.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedMajorFilter !== 'All') {
        const hasMajor = college.popularMajors.some(m =>
          m.toLowerCase().includes(selectedMajorFilter.toLowerCase())
        );
        if (!hasMajor) return false;
      }

      if (selectedRegionFilter !== 'All' && college.state !== selectedRegionFilter) {
        return false;
      }

      if (selectedCampusType !== 'All' && college.campusType !== selectedCampusType) {
        return false;
      }

      if (college.tuitionInState > maxBudget && college.tuitionOutOfState > maxBudget) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedMajorFilter, selectedRegionFilter, maxBudget, selectedCampusType]);

  const toggleCompare = (collegeId: string) => {
    if (compareList.includes(collegeId)) {
      setCompareList(prev => prev.filter(id => id !== collegeId));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare a maximum of 3 colleges simultaneously.');
        return;
      }
      setCompareList(prev => [...prev, collegeId]);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCollegeForDetail || !newReviewAuthor || !newReviewComment) return;

    const newRev: CollegeReview = {
      id: 'rev_' + Date.now(),
      authorName: newReviewAuthor,
      gradYear: 'Class of 2026',
      major: newReviewMajor || 'Undergraduate Student',
      rating: newReviewRating,
      verifiedStatus: true,
      verificationSource: 'Verified Student (.edu authenticated)',
      date: 'Just now',
      title: newReviewTitle || 'Student Experience Review',
      comment: newReviewComment,
      pros: newReviewPros ? newReviewPros.split(',').map(s => s.trim()) : ['Strong academic environment'],
      cons: newReviewCons ? newReviewCons.split(',').map(s => s.trim()) : ['Rigorous schedule'],
      ratingsBreakdown: {
        academics: newReviewRating,
        campusLife: Math.max(1, newReviewRating - 0.5),
        careerSupport: newReviewRating,
        roiValue: newReviewRating
      }
    };

    selectedCollegeForDetail.reviews.unshift(newRev);
    setReviewSubmittedSuccess(true);
    setNewReviewAuthor('');
    setNewReviewMajor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    setNewReviewPros('');
    setNewReviewCons('');
    setTimeout(() => setReviewSubmittedSuccess(false), 4000);
  };

  const collegesForComparison = useMemo(() => {
    return COLLEGES_DATA.filter(c => compareList.includes(c.id));
  }, [compareList]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-slate-800">
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Step 2 · Higher-Ed Discovery &amp; Verified Reviews</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            College &amp; Course Discovery
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
            Explore premier universities calibrated to your career ambitions. Evaluate real acceptance data, verified student reviews, tuition after aid, and alumni employment metrics.
          </p>
        </div>

        {/* Personalized match notification if assessment is complete */}
        {user.assessmentResult && (
          <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex items-center gap-3 shadow-2xs">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-indigo-900">AI Recommendation Active</p>
              <p className="text-slate-600">
                Prioritizing top programs for <span className="text-indigo-700 font-semibold">{user.assessmentResult.archetype}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Search and Filters Bar */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by university name, major (e.g. AI, Robotics, FinTech), city, or tag..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none text-sm text-slate-900 placeholder-slate-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Filter Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Major Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Field of Study / Major
            </label>
            <select
              value={selectedMajorFilter}
              onChange={(e) => setSelectedMajorFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:border-indigo-500 focus:bg-white focus:outline-none"
            >
              <option value="All">All Disciplines</option>
              <option value="Computer Science">Computer Science &amp; AI</option>
              <option value="Engineering">Robotics &amp; Engineering</option>
              <option value="Data">Data Science &amp; Analytics</option>
              <option value="Bio">Biomedical &amp; Health</option>
              <option value="Business">Business &amp; Finance</option>
            </select>
          </div>

          {/* Region / State Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              State / Region
            </label>
            <select
              value={selectedRegionFilter}
              onChange={(e) => setSelectedRegionFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:border-indigo-500 focus:bg-white focus:outline-none"
            >
              <option value="All">All States</option>
              <option value="California">California</option>
              <option value="Massachusetts">Massachusetts</option>
              <option value="Pennsylvania">Pennsylvania</option>
              <option value="Georgia">Georgia</option>
              <option value="Michigan">Michigan</option>
              <option value="Texas">Texas</option>
              <option value="Indiana">Indiana</option>
            </select>
          </div>

          {/* Campus Type */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Campus Setting
            </label>
            <select
              value={selectedCampusType}
              onChange={(e) => setSelectedCampusType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:border-indigo-500 focus:bg-white focus:outline-none"
            >
              <option value="All">All Campus Types</option>
              <option value="Urban">Urban / Metro</option>
              <option value="Suburban">Suburban</option>
              <option value="College Town">College Town</option>
            </select>
          </div>

          {/* Max Budget Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Max Tuition Budget
              </label>
              <span className="text-xs font-mono text-indigo-700 font-bold">
                ${maxBudget.toLocaleString()}/yr
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={65000}
              step={5000}
              value={maxBudget}
              onChange={(e) => setMaxBudget(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* College List Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span className="font-medium">Showing {filteredColleges.length} Verified Institutions</span>
          {compareList.length > 0 && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
            >
              <span>Compare Selected ({compareList.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {filteredColleges.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No colleges match your current filters</h3>
            <p className="text-xs text-slate-500">Try adjusting your budget or selecting &ldquo;All Disciplines&rdquo;.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMajorFilter('All');
                setSelectedRegionFilter('All');
                setMaxBudget(70000);
                setSelectedCampusType('All');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college) => {
              const isSaved = user.savedCollegeIds.includes(college.id);
              const isCompared = compareList.includes(college.id);
              const avgReviewRating = college.reviews.length
                ? (college.reviews.reduce((a, b) => a + b.rating, 0) / college.reviews.length).toFixed(1)
                : '4.8';

              return (
                <div
                  key={college.id}
                  className="rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group shadow-xs"
                >
                  {/* Card Image Banner */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 shadow-2xs">
                        #{college.ranking} National
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-600/90 backdrop-blur-md text-white">
                        {college.campusType}
                      </span>
                    </div>

                    {/* Save Bookmark Button */}
                    <button
                      onClick={() => toggleSaveCollege(college.id)}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
                        isSaved
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-white/80 text-slate-700 hover:text-slate-950 hover:bg-white'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save to my college list'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    {/* College Title and Location */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-bold text-white tracking-tight leading-snug drop-shadow-md">
                        {college.name}
                      </h3>
                      <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-indigo-300" />
                        <span>{college.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Card Body Metrics */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Acceptance Rate</span>
                        <p className="font-extrabold text-slate-900 text-sm mt-0.5">{college.acceptanceRate}%</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Median Starting</span>
                        <p className="font-extrabold text-indigo-700 text-sm mt-0.5">
                          ${college.medianStartingSalary.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>In-State Tuition:</span>
                        <span className="font-bold text-slate-800">${college.tuitionInState.toLocaleString()}/yr</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Avg Aid Package:</span>
                        <span className="font-bold text-emerald-700">
                          ${college.avgFinancialAid.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Popular Majors Tags */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Highlighted Majors
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {college.popularMajors.slice(0, 3).map((m, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium truncate max-w-[200px]"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Verified Reviews Count */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{avgReviewRating}</span>
                        <span className="text-slate-500 font-normal">
                          ({college.reviews.length} reviews)
                        </span>
                      </div>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                        Ratio: {college.studentFacultyRatio}
                      </span>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCollegeForDetail(college)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-900 font-semibold text-xs transition-colors text-center"
                      >
                        Profile &amp; Reviews
                      </button>

                      <button
                        onClick={() => toggleCompare(college.id)}
                        className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                          isCompared
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                            : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300'
                        }`}
                        title={isCompared ? 'Remove from compare' : 'Add to side-by-side comparison'}
                      >
                        <Layers className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Comparison Tray */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white border border-indigo-200 shadow-2xl rounded-2xl px-5 py-3 flex items-center gap-4 text-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-900">
              {compareList.length} of 3 selected for comparison
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-all"
            >
              Compare Now
            </button>
            <button
              onClick={() => setCompareList([])}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium p-1"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Modal: Full College Detail & Verified Reviews */}
      {selectedCollegeForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-fade-in overflow-y-auto text-slate-800">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="relative p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
              <button
                onClick={() => setSelectedCollegeForDetail(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                      Rank #{selectedCollegeForDetail.ranking} in National Universities
                    </span>
                    <span className="text-xs text-slate-500">· {selectedCollegeForDetail.campusType}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {selectedCollegeForDetail.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {selectedCollegeForDetail.location} · Student-Faculty: {selectedCollegeForDetail.studentFacultyRatio} · Grad Rate: {selectedCollegeForDetail.graduationRate}%
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveCollege(selectedCollegeForDetail.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      user.savedCollegeIds.includes(selectedCollegeForDetail.id)
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>
                      {user.savedCollegeIds.includes(selectedCollegeForDetail.id)
                        ? 'Saved in Portfolio'
                        : 'Save to List'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
              {/* Overview & Core Stats */}
              <div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedCollegeForDetail.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Acceptance Rate</span>
                    <p className="text-base font-extrabold text-slate-900 mt-0.5">
                      {selectedCollegeForDetail.acceptanceRate}%
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Median Starting</span>
                    <p className="text-base font-extrabold text-indigo-700 mt-0.5">
                      ${selectedCollegeForDetail.medianStartingSalary.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">In-State Tuition</span>
                    <p className="text-base font-extrabold text-slate-900 mt-0.5">
                      ${selectedCollegeForDetail.tuitionInState.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Avg Financial Aid</span>
                    <p className="text-base font-extrabold text-emerald-700 mt-0.5">
                      ${selectedCollegeForDetail.avgFinancialAid.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Admission Standards & Deadlines */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>Admission Standards &amp; Timelines</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Average Admitted GPA:</span>
                    <p className="font-bold text-slate-900 text-sm">{selectedCollegeForDetail.admissionRequirements.gpaAverage}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Middle 50% SAT Score:</span>
                    <p className="font-bold text-slate-900 text-sm">{selectedCollegeForDetail.admissionRequirements.satRange}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Middle 50% ACT Score:</span>
                    <p className="font-bold text-slate-900 text-sm">{selectedCollegeForDetail.admissionRequirements.actRange}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs space-y-1">
                  <p className="text-slate-600">
                    Regular Decision Deadline:{' '}
                    <span className="text-slate-900 font-bold">
                      {selectedCollegeForDetail.admissionRequirements.applicationDeadlines.regularDecision}
                    </span>
                  </p>
                  {selectedCollegeForDetail.admissionRequirements.applicationDeadlines.earlyDecision && (
                    <p className="text-slate-600">
                      Early Option:{' '}
                      <span className="text-indigo-700 font-bold">
                        {selectedCollegeForDetail.admissionRequirements.applicationDeadlines.earlyDecision}
                      </span>
                    </p>
                  )}
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-800 block mb-1">Key Evaluation Factors:</span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {selectedCollegeForDetail.admissionRequirements.keyCriteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Research Facilities & Alumni Placements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-violet-600" />
                    <span>Campus Facilities &amp; Labs</span>
                  </h3>
                  <ul className="text-xs text-slate-700 space-y-1.5">
                    {selectedCollegeForDetail.facilities.map((fac, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-violet-600 font-bold">•</span>
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Alumni Placement Outcomes</span>
                  </h3>
                  <p className="text-xs text-slate-700">
                    <span className="font-extrabold text-slate-900">
                      {selectedCollegeForDetail.alumniOutcomes.employmentRate90Days}%
                    </span>{' '}
                    employed or in graduate study within 90 days of commencement.
                  </p>
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold block mb-1">Top Hiring Employers:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCollegeForDetail.alumniOutcomes.topEmployers.map((emp, i) => (
                        <span key={i} className="text-xs px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                          {emp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 pt-1">
                    5-Year Median Salary: <span className="text-emerald-700 font-bold">${selectedCollegeForDetail.alumniOutcomes.avg5YearSalary.toLocaleString()}</span>
                  </p>
                </div>
              </div>

              {/* Authentic Student & Alumni Reviews */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span>Authentic Student &amp; Alumni Reviews</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Verified through institutional email validation and alumni networks.
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {selectedCollegeForDetail.reviews.length} Verified Submissions
                  </span>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {selectedCollegeForDetail.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">{rev.authorName}</span>
                            <span className="text-xs text-slate-500">· {rev.gradYear} ({rev.major})</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-[11px] font-semibold text-emerald-700">
                              {rev.verificationSource}
                            </span>
                            <span className="text-slate-300 text-[10px]">·</span>
                            <span className="text-[11px] text-slate-400">{rev.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-slate-900">{rev.rating} / 5.0</span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">&ldquo;{rev.title}&rdquo;</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
                        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                            Key Pros
                          </span>
                          <ul className="text-slate-700 space-y-0.5">
                            {rev.pros.map((p, i) => (
                              <li key={i}>+ {p}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                          <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block mb-1">
                            Key Cons
                          </span>
                          <ul className="text-slate-700 space-y-0.5">
                            {rev.cons.map((c, i) => (
                              <li key={i}>- {c}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit New Review Form */}
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">Are you a student or alumni? Leave a Verified Review</h4>
                  {reviewSubmittedSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                      ✓ Thank you! Your review has been verified and added to the college profile.
                    </div>
                  )}

                  <form onSubmit={handleAddReview} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="e.g. Maya Chen"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Major &amp; Class</label>
                        <input
                          type="text"
                          required
                          value={newReviewMajor}
                          onChange={(e) => setNewReviewMajor(e.target.value)}
                          placeholder="e.g. CS &amp; AI (Class of 2026)"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-slate-600 font-semibold mb-1">Review Headline</label>
                        <input
                          type="text"
                          required
                          value={newReviewTitle}
                          onChange={(e) => setNewReviewTitle(e.target.value)}
                          placeholder="e.g. Great research culture, fast-paced quarters"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Overall Rating</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium"
                        >
                          <option value={5}>5.0 - Exceptional</option>
                          <option value={4}>4.0 - Very Good</option>
                          <option value={3}>3.0 - Average</option>
                          <option value={2}>2.0 - Below Expectations</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Your Honest Review &amp; Experience</label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Detail academics, professor accessibility, career fair recruiting, and campus atmosphere..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Key Pros (comma separated)</label>
                        <input
                          type="text"
                          value={newReviewPros}
                          onChange={(e) => setNewReviewPros(e.target.value)}
                          placeholder="e.g. Great alumni network, lab access"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Key Cons (comma separated)</label>
                        <input
                          type="text"
                          value={newReviewCons}
                          onChange={(e) => setNewReviewCons(e.target.value)}
                          placeholder="e.g. Cold winters, competitive curve"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors shadow-2xs"
                      >
                        Publish Verified Review
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedCollegeForDetail(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-2xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      <CollegeCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        colleges={collegesForComparison}
        onRemoveCollege={(id) => setCompareList(prev => prev.filter(c => c !== id))}
      />
    </div>
  );
};
