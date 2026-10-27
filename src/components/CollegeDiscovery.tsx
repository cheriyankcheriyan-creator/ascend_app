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
  Layers,
  ExternalLink,
  Info,
  SlidersHorizontal,
  Compass,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  KERALA_COLLEGES_DATA,
  KERALA_DISTRICTS,
  AFFILIATING_UNIVERSITIES,
  INSTITUTION_TYPES,
  ACADEMIC_STREAMS,
  getRecommendedKeralaColleges
} from '../data/keralaColleges';
import { College, CollegeReview } from '../types';
import { CollegeCompareModal } from './CollegeCompareModal';

export const CollegeDiscovery: React.FC = () => {
  const { user, toggleSaveCollege } = useAuth();

  // Scope: 'kerala' by default, or 'all' for exploring beyond Kerala
  const [regionScope, setRegionScope] = useState<'kerala' | 'all'>('kerala');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Kerala Districts');
  const [selectedAffiliation, setSelectedAffiliation] = useState<string>('All Affiliations');
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<string>('All Types');
  const [selectedStream, setSelectedStream] = useState<string>('All Streams');
  const [maxBudgetINR, setMaxBudgetINR] = useState<number>(250000);

  // Detail Modal & Comparison state
  const [selectedCollegeForDetail, setSelectedCollegeForDetail] = useState<College | null>(null);
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

  // Personalized recommendations if assessment is completed
  const recommendedKeralaList = useMemo(() => {
    if (!user.assessmentResult) return [];
    const topDimensions = (user.assessmentResult.topCharacteristics || []).map(String);
    return getRecommendedKeralaColleges(topDimensions, selectedDistrict).slice(0, 3);
  }, [user.assessmentResult, selectedDistrict]);

  // Main filtered list
  const filteredColleges = useMemo(() => {
    return KERALA_COLLEGES_DATA.filter((college) => {
      // 1. Region Scope filter
      if (regionScope === 'kerala' && college.state !== 'Kerala') {
        return false;
      }

      // 2. Search query match
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const matchesName = college.name.toLowerCase().includes(query) || college.shortName.toLowerCase().includes(query);
        const matchesLocation = college.location.toLowerCase().includes(query) || (college.district && college.district.toLowerCase().includes(query));
        const matchesMajors = college.popularMajors.some(m => m.toLowerCase().includes(query));
        const matchesAffiliation = college.affiliatingUniversity?.toLowerCase().includes(query);
        const matchesCourses = college.courses?.some(c => c.name.toLowerCase().includes(query) || c.stream.toLowerCase().includes(query));
        const matchesTags = college.tags.some(t => t.toLowerCase().includes(query));

        if (!matchesName && !matchesLocation && !matchesMajors && !matchesAffiliation && !matchesCourses && !matchesTags) {
          return false;
        }
      }

      // 3. District filter (for Kerala)
      if (selectedDistrict !== 'All Kerala Districts') {
        if (college.district !== selectedDistrict) {
          return false;
        }
      }

      // 4. Affiliation filter
      if (selectedAffiliation !== 'All Affiliations') {
        if (selectedAffiliation === 'National Institute / Central / Deemed') {
          if (!college.institutionType?.includes('National Importance') && !college.institutionType?.includes('Central')) {
            return false;
          }
        } else if (college.affiliatingUniversity !== selectedAffiliation) {
          return false;
        }
      }

      // 5. Institution Type filter
      if (selectedInstitutionType !== 'All Types') {
        if (college.institutionType !== selectedInstitutionType) {
          return false;
        }
      }

      // 6. Academic Stream filter
      if (selectedStream !== 'All Streams') {
        const hasStreamInCourses = college.courses?.some(c => c.stream === selectedStream);
        const hasStreamInMajors = college.popularMajors.some(m => {
          if (selectedStream === 'Engineering & Technology') return m.includes('B.Tech') || m.includes('Engineering') || m.includes('Computer');
          if (selectedStream === 'Sciences') return m.includes('B.Sc') || m.includes('Physics') || m.includes('Science') || m.includes('Mathematics');
          if (selectedStream === 'Arts & Humanities') return m.includes('BA') || m.includes('Literature') || m.includes('Social Work') || m.includes('History');
          if (selectedStream === 'Commerce & Management') return m.includes('B.Com') || m.includes('BBA') || m.includes('Finance') || m.includes('Economics');
          if (selectedStream === 'Agriculture') return m.includes('Agriculture') || m.includes('Forestry');
          if (selectedStream === 'Design & Media') return m.includes('Design') || m.includes('Architecture') || m.includes('Media') || m.includes('Multimedia');
          return true;
        });

        if (!hasStreamInCourses && !hasStreamInMajors) {
          return false;
        }
      }

      // 7. Budget filter (tuitionInState in INR)
      if (college.tuitionInState > maxBudgetINR) {
        return false;
      }

      return true;
    });
  }, [regionScope, searchQuery, selectedDistrict, selectedAffiliation, selectedInstitutionType, selectedStream, maxBudgetINR]);

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
      gradYear: 'Class of 2025',
      major: newReviewMajor || 'Undergraduate Student',
      rating: newReviewRating,
      verifiedStatus: true,
      verificationSource: 'Verified Student (Institutional Portal Record)',
      date: 'Just now',
      title: newReviewTitle || 'Student Experience Review',
      comment: newReviewComment,
      pros: newReviewPros ? newReviewPros.split(',').map(s => s.trim()) : ['Supportive academic faculty', 'Affordable fee structure'],
      cons: newReviewCons ? newReviewCons.split(',').map(s => s.trim()) : ['Demanding semester examination schedule'],
      ratingsBreakdown: {
        academics: newReviewRating,
        campusLife: Math.max(1, newReviewRating - 0.5),
        careerSupport: newReviewRating,
        roiValue: 5.0
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
    setTimeout(() => setReviewSubmittedSuccess(false), 4500);
  };

  const collegesForComparison = useMemo(() => {
    return KERALA_COLLEGES_DATA.filter(c => compareList.includes(c.id));
  }, [compareList]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedDistrict('All Kerala Districts');
    setSelectedAffiliation('All Affiliations');
    setSelectedInstitutionType('All Types');
    setSelectedStream('All Streams');
    setMaxBudgetINR(250000);
    setRegionScope('kerala');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-slate-800">
      {/* Top Banner & Orientation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kerala-First Higher Education Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Kerala College &amp; Course Discovery
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1 leading-relaxed">
            Explore authentic institutions across all 14 Kerala districts. Verified admission pathways via CEE Kerala (KEAM), University CAP single-window systems, and CUSAT CAT with official fee structures and honest student insights.
          </p>
        </div>

        {/* Region Scope Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 self-start md:self-auto shrink-0">
          <button
            onClick={() => {
              setRegionScope('kerala');
              setSelectedDistrict('All Kerala Districts');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              regionScope === 'kerala'
                ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌴 Kerala Colleges ({KERALA_COLLEGES_DATA.filter(c => c.state === 'Kerala').length})
          </button>
          <button
            onClick={() => setRegionScope('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              regionScope === 'all'
                ? 'bg-white text-indigo-700 shadow-xs border border-indigo-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Explore Beyond Kerala ({KERALA_COLLEGES_DATA.length})
          </button>
        </div>
      </div>

      {/* Personalized Match Banner (if assessment complete) */}
      {user.assessmentResult && recommendedKeralaList.length > 0 && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-indigo-50/80 border border-emerald-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    Personalized Kerala Institution Matches for {user.name}
                  </h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {user.assessmentResult.archetype}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Calibrated to your strongest characteristics: <span className="font-semibold text-slate-800">{user.assessmentResult.topCharacteristics?.slice(0, 3).join(', ')}</span>
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold text-emerald-800 self-start sm:self-auto bg-white/80 px-3 py-1 rounded-xl border border-emerald-200">
              Top 3 Algorithmic Recommendations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {recommendedKeralaList.map(({ college, matchScore, matchReasons }) => (
              <div
                key={college.id}
                onClick={() => setSelectedCollegeForDetail(college)}
                className="p-4 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {matchScore}% Identity Match
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {college.district}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{college.shortName}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{college.affiliatingUniversity}</p>
                </div>

                <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <span className="font-semibold text-emerald-800">Why it fits: </span>
                  {matchReasons[0] || 'Matches your academic and cognitive profile.'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by college name, district, course (e.g. B.Tech, B.Sc, Psychology), affiliation, or KEAM..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white focus:outline-none text-sm text-slate-900 placeholder-slate-400 transition-colors"
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

        {/* Filter Selectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* 1. Kerala District Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>District (14 Districts)</span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:border-emerald-500 focus:bg-white focus:outline-none"
            >
              {KERALA_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Affiliating University */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Affiliating University
            </label>
            <select
              value={selectedAffiliation}
              onChange={(e) => setSelectedAffiliation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:border-emerald-500 focus:bg-white focus:outline-none"
            >
              {AFFILIATING_UNIVERSITIES.map((aff) => (
                <option key={aff} value={aff}>
                  {aff}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Institution Type */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Institution Type
            </label>
            <select
              value={selectedInstitutionType}
              onChange={(e) => setSelectedInstitutionType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:border-emerald-500 focus:bg-white focus:outline-none"
            >
              {INSTITUTION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Academic Stream */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
              Academic Stream
            </label>
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium focus:border-emerald-500 focus:bg-white focus:outline-none"
            >
              {ACADEMIC_STREAMS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Max Annual Tuition Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Max Tuition Budget
              </label>
              <span className="text-xs font-mono text-emerald-800 font-bold">
                {maxBudgetINR >= 250000 ? 'All Budgets' : `₹${maxBudgetINR.toLocaleString('en-IN')}/yr`}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={250000}
              step={10000}
              value={maxBudgetINR}
              onChange={(e) => setMaxBudgetINR(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹10k</span>
              <span>₹50k</span>
              <span>₹1L</span>
              <span>₹2.5L+</span>
            </div>
          </div>
        </div>

        {/* Quick Tag Pills */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Popular Filters:
            </span>
            <button
              onClick={() => {
                setSelectedAffiliation('APJ Abdul Kalam Technological University (KTU)');
                setSelectedInstitutionType('Government');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
            >
              Govt Engineering (KTU)
            </button>
            <button
              onClick={() => {
                setSelectedInstitutionType('Autonomous');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
            >
              Autonomous Colleges (NAAC A++)
            </button>
            <button
              onClick={() => {
                setSelectedStream('Sciences');
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
            >
              Pure Sciences &amp; Research
            </button>
            <button
              onClick={() => {
                setMaxBudgetINR(35000);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
            >
              Subsidized Govt Fee (&lt; ₹35,000)
            </button>
          </div>

          {(searchQuery || selectedDistrict !== 'All Kerala Districts' || selectedAffiliation !== 'All Affiliations' || selectedInstitutionType !== 'All Types' || selectedStream !== 'All Streams' || maxBudgetINR < 250000) && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* College List Header & Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">
              Showing {filteredColleges.length} Verified Institutions
            </span>
            <span>·</span>
            <span>
              {regionScope === 'kerala' ? 'Kerala-First Directory' : 'All India Database'}
            </span>
          </div>

          {compareList.length > 0 && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Compare Selected ({compareList.length} of 3)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {filteredColleges.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No institutions match your selected criteria</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try choosing &ldquo;All Kerala Districts&rdquo; or adjusting your fee budget limit.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white transition-colors"
            >
              Reset All Filters
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
                  className="rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group shadow-xs"
                >
                  {/* Card Banner Image */}
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={college.image}
                      alt={college.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                      {college.district && (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-emerald-900 shadow-2xs flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-700" />
                          <span>{college.district}</span>
                        </span>
                      )}
                      {college.institutionType && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                          {college.institutionType}
                        </span>
                      )}
                    </div>

                    {/* Save Bookmark */}
                    <button
                      onClick={() => toggleSaveCollege(college.id)}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
                        isSaved
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-white/80 text-slate-700 hover:text-slate-950 hover:bg-white'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save to my college list'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    {/* College Title and Location */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug drop-shadow-md">
                        {college.name}
                      </h3>
                      <p className="text-[11px] text-slate-200 mt-0.5 line-clamp-1">
                        {college.affiliatingUniversity || college.location}
                      </p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Annual Merit Fee</span>
                        <p className="font-extrabold text-slate-900 text-xs mt-0.5">
                          {college.tuitionDisplayINR || `₹${college.tuitionInState.toLocaleString('en-IN')}/yr`}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Median Starting</span>
                        <p className="font-extrabold text-emerald-800 text-xs mt-0.5">
                          {college.salaryDisplayINR || (college.medianStartingSalary > 0 ? `₹${(college.medianStartingSalary / 100000).toFixed(1)} LPA` : 'Info unavailable')}
                        </p>
                      </div>
                    </div>

                    {/* Accreditation and Admission Route */}
                    <div className="space-y-1.5 text-xs">
                      {college.accreditation && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-700">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="font-medium truncate">{college.accreditation}</span>
                        </div>
                      )}

                      {college.admissionRequirements?.entranceExams && college.admissionRequirements.entranceExams.length > 0 && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                          <GraduationCap className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span>Admission via <strong className="text-slate-800">{college.admissionRequirements.entranceExams.join(', ')}</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Popular Degrees */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Highlighted Courses
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

                    {/* Verified Reviews Count & Official Status */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-amber-600 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{avgReviewRating}</span>
                        <span className="text-slate-500 font-normal">
                          ({college.reviews.length} reviews)
                        </span>
                      </div>

                      <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold border border-emerald-100">
                        ✓ Verified Info
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCollegeForDetail(college)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-900 font-semibold text-xs transition-colors text-center"
                      >
                        Profile, Fees &amp; Courses
                      </button>

                      <button
                        onClick={() => toggleCompare(college.id)}
                        className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                          isCompared
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white border border-emerald-200 shadow-2xl rounded-2xl px-5 py-3 flex items-center gap-4 text-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-bold text-slate-900">
              {compareList.length} of 3 selected for comparison
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition-all"
            >
              Compare Side-by-Side
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

      {/* Full College Detail Modal */}
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
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    {selectedCollegeForDetail.district && (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-700" />
                        <span>{selectedCollegeForDetail.district} District</span>
                      </span>
                    )}
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                      {selectedCollegeForDetail.institutionType}
                    </span>
                    {selectedCollegeForDetail.accreditation && (
                      <span className="text-xs text-slate-600 font-medium">
                        · {selectedCollegeForDetail.accreditation}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {selectedCollegeForDetail.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {selectedCollegeForDetail.location} · {selectedCollegeForDetail.affiliatingUniversity}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveCollege(selectedCollegeForDetail.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      user.savedCollegeIds.includes(selectedCollegeForDetail.id)
                        ? 'bg-emerald-700 text-white shadow-xs'
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

              {/* Official External Links Bar */}
              <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                {selectedCollegeForDetail.admissionPortalUrl && (
                  <a
                    href={selectedCollegeForDetail.admissionPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-2xs transition-colors"
                  >
                    <span>Official Admission Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {selectedCollegeForDetail.officialWebsite && (
                  <a
                    href={selectedCollegeForDetail.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-semibold transition-colors"
                  >
                    <span>College Website</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                )}

                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    Verified: {selectedCollegeForDetail.verifiedDate || 'October 2024'} ({selectedCollegeForDetail.officialSource || 'Kerala Higher Ed Portal'})
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
              {/* Overview */}
              <div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedCollegeForDetail.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Annual Merit Tuition</span>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {selectedCollegeForDetail.tuitionDisplayINR || `₹${selectedCollegeForDetail.tuitionInState.toLocaleString('en-IN')}`}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Median Starting Salary</span>
                    <p className="text-sm font-extrabold text-emerald-800 mt-0.5">
                      {selectedCollegeForDetail.salaryDisplayINR || (selectedCollegeForDetail.medianStartingSalary > 0 ? `₹${(selectedCollegeForDetail.medianStartingSalary / 100000).toFixed(1)} LPA` : 'Info unavailable')}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Faculty Ratio</span>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {selectedCollegeForDetail.studentFacultyRatio}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Graduation Rate</span>
                    <p className="text-sm font-extrabold text-emerald-700 mt-0.5">
                      {selectedCollegeForDetail.graduationRate}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Courses & Degrees Table */}
              {selectedCollegeForDetail.courses && selectedCollegeForDetail.courses.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-700" />
                    <span>Academic Courses &amp; Degree Programs</span>
                  </h3>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                        <tr>
                          <th className="py-3 px-3">Degree / Course Name</th>
                          <th className="py-3 px-3">Stream</th>
                          <th className="py-3 px-3">Duration</th>
                          <th className="py-3 px-3">Eligibility Criteria</th>
                          <th className="py-3 px-3">Admission Route</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedCollegeForDetail.courses.map((course, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/60">
                            <td className="py-2.5 px-3 font-semibold text-slate-900">
                              {course.name}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">
                                {course.stream}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">{course.duration}</td>
                            <td className="py-2.5 px-3 text-slate-600 max-w-xs">{course.eligibility}</td>
                            <td className="py-2.5 px-3 font-semibold text-emerald-800">
                              {course.admissionRoute}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Fee Structure Transparency Box */}
              {selectedCollegeForDetail.feeStructureNote && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Fee Transparency &amp; Scholarships: </span>
                    <span>{selectedCollegeForDetail.feeStructureNote}</span>
                  </div>
                </div>
              )}

              {/* Admission Criteria & Kerala Domicile */}
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Admission Requirements &amp; Timelines</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block mb-0.5">Eligibility Standards:</span>
                    <p className="font-bold text-slate-900">{selectedCollegeForDetail.admissionRequirements.gpaAverage}</p>
                    {selectedCollegeForDetail.admissionRequirements.keralaEligibility && (
                      <p className="text-slate-600 mt-1">{selectedCollegeForDetail.admissionRequirements.keralaEligibility}</p>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-500 font-semibold block mb-0.5">Application &amp; Allotment Timeline:</span>
                    <p className="font-bold text-slate-900">
                      {selectedCollegeForDetail.admissionRequirements.applicationDeadlines.regularDecision}
                    </p>
                    {selectedCollegeForDetail.admissionRequirements.entranceExams && (
                      <p className="text-emerald-800 font-semibold mt-1">
                        Mandatory Entrance: {selectedCollegeForDetail.admissionRequirements.entranceExams.join(', ')}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-800 block mb-1">Key Allotment Factors:</span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {selectedCollegeForDetail.admissionRequirements.keyCriteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Facilities & Placements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                    <span>Campus Facilities &amp; Labs</span>
                  </h3>
                  <ul className="text-xs text-slate-700 space-y-1.5">
                    {selectedCollegeForDetail.facilities.map((fac, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Placement &amp; Outcomes</span>
                  </h3>
                  <p className="text-xs text-slate-700">
                    <span className="font-extrabold text-slate-900">
                      {selectedCollegeForDetail.alumniOutcomes.employmentRate90Days}%
                    </span>{' '}
                    employment or postgraduate qualification rate within 90 days.
                  </p>
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold block mb-1">Top Recruiting Organizations:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCollegeForDetail.alumniOutcomes.topEmployers.map((emp, i) => (
                        <span key={i} className="text-xs px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-medium">
                          {emp}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedCollegeForDetail.alumniOutcomes.placementHighlights && (
                    <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200">
                      {selectedCollegeForDetail.alumniOutcomes.placementHighlights}
                    </p>
                  )}
                </div>
              </div>

              {/* Verified Reviews Section */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span>Authentic Student &amp; Alumni Reviews</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Attributed with university registration numbers or student portal credentials.
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
                  <h4 className="text-sm font-bold text-slate-900">
                    Are you currently studying here or an alumnus? Share a Review
                  </h4>
                  {reviewSubmittedSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                      ✓ Thank you! Your review has been added to the college directory.
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
                          placeholder="e.g. Arun Nair"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Course &amp; Class Year</label>
                        <input
                          type="text"
                          required
                          value={newReviewMajor}
                          onChange={(e) => setNewReviewMajor(e.target.value)}
                          placeholder="e.g. B.Tech Mechanical (Class of 2025)"
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
                          placeholder="e.g. Excellent core engineering labs and active maker culture"
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
                          <option value={5}>5.0 - Outstanding</option>
                          <option value={4}>4.0 - Very Good</option>
                          <option value={3}>3.0 - Decent</option>
                          <option value={2}>2.0 - Needs Improvement</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Your Honest Review</label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Detail the academics, faculty guidance, hostel food, library access, and campus placements..."
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
                          placeholder="e.g. Low government fee, active technical clubs"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Key Cons (comma separated)</label>
                        <input
                          type="text"
                          value={newReviewCons}
                          onChange={(e) => setNewReviewCons(e.target.value)}
                          placeholder="e.g. Distance from main town, fast exam schedules"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-colors shadow-2xs"
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
