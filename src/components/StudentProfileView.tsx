import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  Trash2,
  Crown,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { COLLEGES_DATA, COURSES_DATA, INTERNSHIPS_DATA } from '../data/mockData';

interface StudentProfileViewProps {
  onNavigateToAssessment: () => void;
  onNavigateToColleges: () => void;
  onNavigateToLaunchpad: () => void;
  onOpenProModal: () => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  onNavigateToAssessment,
  onNavigateToColleges,
  onNavigateToLaunchpad,
  onOpenProModal
}) => {
  const { user, updateProfile, toggleSaveCollege, updateCourseProgress } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [educationLevel, setEducationLevel] = useState(user.educationLevel);
  const [currentSchool, setCurrentSchool] = useState(user.currentSchool || '');
  const [gpa, setGpa] = useState(user.gpa || '');
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const savedColleges = COLLEGES_DATA.filter(c => user.savedCollegeIds.includes(c.id));
  const enrolledCourses = COURSES_DATA.filter(c => user.enrolledCourseIds.includes(c.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      educationLevel,
      currentSchool,
      gpa
    });
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (!newSkill.trim() || user.skills.includes(newSkill.trim())) return;
    updateProfile({
      skills: [...user.skills, newSkill.trim()]
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateProfile({
      skills: user.skills.filter(s => s !== skillToRemove)
    });
  };

  const handleAddInterest = () => {
    if (!newInterest.trim() || user.interests.includes(newInterest.trim())) return;
    updateProfile({
      interests: [...user.interests, newInterest.trim()]
    });
    setNewInterest('');
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    updateProfile({
      interests: user.interests.filter(i => i !== interestToRemove)
    });
  };

  const handleExportPortfolio = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in text-slate-800">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'}
            alt={user.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-xs"
          />

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
              {user.isPro ? (
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200 flex items-center gap-1 shadow-2xs">
                  <Crown className="w-3.5 h-3.5 text-amber-600" /> Student Pro
                </span>
              ) : (
                <button
                  onClick={onOpenProModal}
                  className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 font-semibold transition-colors"
                >
                  Free Tier · Upgrade Pro
                </button>
              )}
            </div>

            <p className="text-xs text-slate-500 font-medium">
              {user.educationLevel} · {user.currentSchool || 'Lincoln High School'} {user.gpa && `· GPA ${user.gpa}`}
            </p>
            <p className="text-[11px] text-slate-400">{user.email}</p>

            {user.assessmentResult && (
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{user.assessmentResult.archetype}</span>
                </div>
                {user.assessmentResult.strongestInterestAreas?.slice(0, 2).map((domain, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                    {domain}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile Details'}
          </button>
          <button
            onClick={handleExportPortfolio}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs transition-colors flex items-center justify-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Export / Print Portfolio</span>
          </button>
        </div>
      </div>

      {/* Profile Edit Form */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="p-6 rounded-3xl bg-white border border-indigo-200 shadow-xs space-y-4 text-xs animate-fade-in">
          <h3 className="text-sm font-bold text-slate-900">Edit Academic &amp; Personal Info</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Academic Standing</label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-medium"
              >
                <option value="High School Junior">High School Junior</option>
                <option value="High School Senior">High School Senior</option>
                <option value="College Freshman">College Freshman</option>
                <option value="College Sophomore">College Sophomore</option>
                <option value="Career Explorer">Career Explorer</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Current Institution</label>
              <input
                type="text"
                value={currentSchool}
                onChange={(e) => setCurrentSchool(e.target.value)}
                placeholder="e.g. Oakridge STEM Academy"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Cumulative GPA</label>
              <input
                type="text"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                placeholder="e.g. 3.92"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Skills & Interests Manager */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Validated Skills */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Validated Skills ({user.skills.length})</span>
              </h3>
              <p className="text-xs text-slate-500">Used for automated internship match scores and skill-gap gauges.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[60px]">
            {user.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-medium flex items-center gap-1.5"
              >
                <span>{skill}</span>
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-slate-400 hover:text-rose-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill (e.g. PyTorch, Docker, React, SQL)..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            />
            <button
              onClick={handleAddSkill}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Career Interests */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Career &amp; Subject Interests ({user.interests.length})</span>
              </h3>
              <p className="text-xs text-slate-500">Influences your personalized college recommendations.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[60px]">
            {user.interests.map((interest, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 font-medium flex items-center gap-1.5"
              >
                <span>{interest}</span>
                <button
                  onClick={() => handleRemoveInterest(interest)}
                  className="text-indigo-400 hover:text-rose-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Add interest (e.g. Robotics, Quantitative Trading)..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
            />
            <button
              onClick={handleAddInterest}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Saved Colleges Portfolio */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-indigo-600" />
              <span>Saved Institutions &amp; Target Applications ({savedColleges.length})</span>
            </h3>
            <p className="text-xs text-slate-500">Colleges you are actively evaluating for admission.</p>
          </div>

          <button
            onClick={onNavigateToColleges}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold"
          >
            + Explore More Colleges
          </button>
        </div>

        {savedColleges.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No colleges saved yet. Browse our College Discovery tab to bookmark target schools.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedColleges.map((college) => (
              <div
                key={college.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                      Rank #{college.ranking}
                    </span>
                    <button
                      onClick={() => toggleSaveCollege(college.id)}
                      className="text-slate-400 hover:text-rose-600"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{college.name}</h4>
                  <p className="text-xs text-slate-500">{college.location}</p>
                </div>

                <div className="space-y-1 text-xs border-t border-slate-200 pt-2 text-slate-600">
                  <div className="flex justify-between">
                    <span>In-State:</span>
                    <span className="text-slate-900 font-bold">${college.tuitionInState.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Starting Salary:</span>
                    <span className="text-indigo-700 font-bold">${college.medianStartingSalary.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enrolled Courses & Progress */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Enrolled Courses &amp; Skill Credentials ({enrolledCourses.length})</span>
            </h3>
            <p className="text-xs text-slate-500">Industry-oriented programs pursued alongside your degree.</p>
          </div>

          <button
            onClick={onNavigateToLaunchpad}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold"
          >
            + Browse Course Catalog
          </button>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            Not currently enrolled in any micro-courses. Explore the Skill Launchpad to get started!
          </div>
        ) : (
          <div className="space-y-3">
            {enrolledCourses.map((course) => {
              const progress = user.courseProgress[course.id] || 0;
              return (
                <div
                  key={course.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                      {course.partnerBadge}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{course.title}</h4>
                    <p className="text-xs text-slate-500">{course.provider} · {course.duration}</p>
                  </div>

                  <div className="w-full sm:w-60 space-y-1.5 shrink-0">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Progress:</span>
                      <span className="text-slate-900 font-mono font-bold">{progress}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={(e) => updateCourseProgress(course.id, parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Tracked Internship Applications */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-violet-600" />
              <span>Tracked Job &amp; Internship Applications ({user.internshipApplications.length})</span>
            </h3>
            <p className="text-xs text-slate-500">Real-time candidate status and employer recruiter tracking.</p>
          </div>

          <button
            onClick={onNavigateToLaunchpad}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold"
          >
            + Find New Openings
          </button>
        </div>

        {user.internshipApplications.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No active applications yet. Review the student internship board to apply with your profile.
          </div>
        ) : (
          <div className="space-y-3">
            {user.internshipApplications.map((app) => {
              const job = INTERNSHIPS_DATA.find(j => j.id === app.jobId);
              return (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <span className="text-[10px] text-slate-400">Applied on {app.appliedDate}</span>
                    <h4 className="text-sm font-bold text-slate-900">{job?.title || 'Student Engineering Fellow'}</h4>
                    <p className="text-slate-500">{job?.company} · {job?.location}</p>
                    {app.coverNote && (
                      <p className="text-slate-600 text-[11px] mt-1 italic">&ldquo;{app.coverNote}&rdquo;</p>
                    )}
                  </div>

                  <div className="shrink-0">
                    <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{app.status}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
