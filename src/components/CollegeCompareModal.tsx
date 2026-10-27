import React from 'react';
import { X, Award, MapPin, GraduationCap, Building2, Check, Star, ShieldCheck, ExternalLink } from 'lucide-react';
import { College } from '../types';

interface CollegeCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  colleges: College[];
  onRemoveCollege: (id: string) => void;
}

export const CollegeCompareModal: React.FC<CollegeCompareModalProps> = ({
  isOpen,
  onClose,
  colleges,
  onRemoveCollege,
}) => {
  if (!isOpen || colleges.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-fade-in overflow-y-auto text-slate-800">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Institutional Analysis
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-semibold">
                Comparing {colleges.length} Institutions
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Side-by-Side College &amp; Course Comparison
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-4 px-3 text-xs font-bold text-slate-500 uppercase w-1/4">
                  Evaluation Metric
                </th>
                {colleges.map((college) => (
                  <th key={college.id} className="py-4 px-3 text-left w-1/3 align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {college.district && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center gap-1 w-fit mb-1">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            <span>{college.district}</span>
                          </span>
                        )}
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">{college.shortName}</h3>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{college.location}</p>
                      </div>
                      <button
                        onClick={() => onRemoveCollege(college.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 text-xs"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {/* Institution Type & Affiliation */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Type &amp; Affiliation</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3 space-y-0.5">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold text-[11px]">
                      {c.institutionType}
                    </span>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      {c.affiliatingUniversity || c.state}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Accreditation */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Accreditation / NAAC</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3">
                    <span className="font-bold text-emerald-800 text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{c.accreditation || 'Recognized'}</span>
                    </span>
                  </td>
                ))}
              </tr>

              {/* Annual Merit Fee */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Annual Merit Tuition</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3 space-y-0.5">
                    <p className="font-extrabold text-slate-900 text-sm">
                      {c.tuitionDisplayINR || `₹${c.tuitionInState.toLocaleString('en-IN')}/yr`}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Govt Merit Quota / Subsidized
                    </p>
                  </td>
                ))}
              </tr>

              {/* Admission Route */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Primary Admission Channel</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3">
                    <span className="font-bold text-indigo-700">
                      {c.admissionRequirements.entranceExams?.join(', ') || 'Plus Two Merit (CAP)'}
                    </span>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {c.admissionRequirements.applicationDeadlines.regularDecision}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Median Starting Salary */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Median Starting Package</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3">
                    <span className="font-extrabold text-emerald-800 text-sm">
                      {c.salaryDisplayINR || (c.medianStartingSalary > 0 ? `₹${(c.medianStartingSalary / 100000).toFixed(1)} LPA` : 'Info unavailable')}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Student to Faculty */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Student to Faculty Ratio</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3 font-medium text-slate-800">
                    {c.studentFacultyRatio}
                  </td>
                ))}
              </tr>

              {/* Top Employers */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Key Recruiting Partners</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3">
                    <div className="flex flex-wrap gap-1">
                      {c.alumniOutcomes.topEmployers.slice(0, 4).map((emp, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                          {emp}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Official Portal */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Official Portal</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3">
                    {c.admissionPortalUrl ? (
                      <a
                        href={c.admissionPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-bold"
                      >
                        <span>Admission Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400">Available on site</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Student Rating */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Verified Student Rating</td>
                {colleges.map((c) => {
                  const avgRating = c.reviews.length
                    ? (c.reviews.reduce((a, b) => a + b.rating, 0) / c.reviews.length).toFixed(1)
                    : '4.8';
                  return (
                    <td key={c.id} className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-slate-900">{avgRating} / 5.0</span>
                        <span className="text-[11px] text-slate-500 font-normal">
                          ({c.reviews.length} reviews)
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-2xs"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
