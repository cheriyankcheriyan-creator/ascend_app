import React from 'react';
import { X, Award, DollarSign, Briefcase, GraduationCap, Building2, Check, Star } from 'lucide-react';
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
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Institutional Comparison
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-semibold">
                Comparing {colleges.length} Institutions
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Side-by-Side College Analysis
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
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-4 px-3 text-xs font-bold text-slate-500 uppercase w-1/4">
                  Evaluation Metric
                </th>
                {colleges.map((college) => (
                  <th key={college.id} className="py-4 px-3 text-left w-1/3 align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                          #{college.ranking} National
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-1">{college.shortName}</h3>
                        <p className="text-xs text-slate-500">{college.location}</p>
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
              {/* Acceptance Rate */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Acceptance Rate</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3">
                    <span className="font-bold text-slate-900 text-sm">{c.acceptanceRate}%</span>
                    <span className="text-[11px] text-slate-500 ml-1">
                      ({c.acceptanceRate < 10 ? 'Highly Selective' : c.acceptanceRate < 20 ? 'Selective' : 'Moderate'})
                    </span>
                  </td>
                ))}
              </tr>

              {/* Annual Tuition */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Annual Tuition (In / Out of State)</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3 space-y-0.5">
                    <p className="font-bold text-slate-900">
                      ${c.tuitionInState.toLocaleString()} <span className="text-[11px] text-slate-500 font-normal">in-state</span>
                    </p>
                    <p className="text-slate-600">
                      ${c.tuitionOutOfState.toLocaleString()} <span className="text-[11px] text-slate-500">out-of-state</span>
                    </p>
                  </td>
                ))}
              </tr>

              {/* Avg Financial Aid */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Avg Need-Based Aid</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3">
                    <span className="font-bold text-emerald-700">
                      ${c.avgFinancialAid.toLocaleString()} / year
                    </span>
                  </td>
                ))}
              </tr>

              {/* Median Starting Salary */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Median Starting Salary</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3">
                    <span className="font-extrabold text-indigo-700 text-sm">
                      ${c.medianStartingSalary.toLocaleString()}
                    </span>
                  </td>
                ))}
              </tr>

              {/* 5-Year Salary */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Avg 5-Year Alumni Earnings</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3">
                    <span className="font-bold text-slate-800">
                      ${c.alumniOutcomes.avg5YearSalary.toLocaleString()}
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

              {/* Admitted Student Profile */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Admitted Student Profile</td>
                {colleges.map((c) => (
                  <td key={c.id} className="py-3.5 px-3 space-y-0.5">
                    <p className="text-slate-800 font-medium">GPA: {c.admissionRequirements.gpaAverage}</p>
                    <p className="text-slate-500">SAT: {c.admissionRequirements.satRange}</p>
                  </td>
                ))}
              </tr>

              {/* Top Employers */}
              <tr>
                <td className="py-3.5 px-3 font-semibold text-slate-600">Top Employers</td>
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

              {/* Student Review Rating */}
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
