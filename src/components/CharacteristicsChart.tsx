import React, { useState } from 'react';
import {
  CharacteristicScore,
  CharacteristicDimension
} from '../types';
import {
  Sparkles,
  Layers,
  BarChart3,
  Radar,
  Info,
  CheckCircle2,
  TrendingUp,
  Compass,
  Briefcase,
  Lightbulb,
  ShieldAlert,
  ChevronRight,
  HelpCircle,
  Activity
} from 'lucide-react';

interface CharacteristicsChartProps {
  characteristics: CharacteristicScore[];
  studentName?: string;
}

export const CharacteristicsChart: React.FC<CharacteristicsChartProps> = ({
  characteristics,
  studentName = 'Student'
}) => {
  const [viewMode, setViewMode] = useState<'radar' | 'bars' | 'both'>('both');
  const [activeDimension, setActiveDimension] = useState<CharacteristicDimension | null>(
    characteristics[0]?.dimension || 'Creative'
  );
  const [hoveredPoint, setHoveredPoint] = useState<CharacteristicScore | null>(null);

  // Group into categories
  const strongest = characteristics.filter(c => c.level === 'strongest');
  const moderate = characteristics.filter(c => c.level === 'moderate');
  const developing = characteristics.filter(c => c.level === 'developing');
  const inconclusive = characteristics.filter(c => c.level === 'inconclusive');

  // Top 3-5 characteristics for detailed explanation
  const topCharacteristics = (strongest.length >= 3 ? strongest : characteristics.slice(0, 4));
  const activeChar = characteristics.find(c => c.dimension === activeDimension) || characteristics[0];

  // SVG Radar Chart Calculations
  const size = 380;
  const center = size / 2;
  const radius = 135;
  const totalDimensions = characteristics.length;

  // Angles for each dimension (clockwise starting from top)
  const angleStep = (2 * Math.PI) / totalDimensions;

  const points = characteristics.map((char, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (char.score / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);

    const labelR = radius + 28;
    const labelX = center + labelR * Math.cos(angle);
    const labelY = center + labelR * Math.sin(angle);

    return { ...char, angle, x, y, labelX, labelY, r };
  });

  const polygonPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z';

  const getTierColor = (level: string) => {
    switch (level) {
      case 'strongest':
        return {
          badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          bar: 'bg-emerald-500',
          gradient: 'from-emerald-500 to-teal-600',
          border: 'border-emerald-300',
          lightBg: 'bg-emerald-50/70',
          text: 'text-emerald-700'
        };
      case 'moderate':
        return {
          badge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          dot: 'bg-indigo-500',
          bar: 'bg-indigo-500',
          gradient: 'from-indigo-500 to-blue-600',
          border: 'border-indigo-300',
          lightBg: 'bg-indigo-50/70',
          text: 'text-indigo-700'
        };
      case 'developing':
        return {
          badge: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          bar: 'bg-amber-500',
          gradient: 'from-amber-500 to-orange-500',
          border: 'border-amber-200',
          lightBg: 'bg-amber-50/70',
          text: 'text-amber-700'
        };
      default:
        return {
          badge: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
          bar: 'bg-slate-300',
          gradient: 'from-slate-400 to-slate-500',
          border: 'border-slate-200',
          lightBg: 'bg-slate-50',
          text: 'text-slate-600'
        };
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200">
      {/* Header section */}
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50/60 via-white to-indigo-50/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Personalized Characteristics Analysis</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">10 Core Dimensions Evaluated</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Your Individual Characteristics &amp; Cognitive Tendencies
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Derived directly from your voluntary activities, learning flow, problem-solving reflections, and creative answers.
            </p>
          </div>

          {/* View Mode Toggle Controls */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start md:self-center border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('both')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'both' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Overview &amp; Breakdown</span>
              <span className="sm:hidden">Both</span>
            </button>
            <button
              onClick={() => setViewMode('radar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'radar' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Radar className="w-3.5 h-3.5" />
              <span>Radar View</span>
            </button>
            <button
              onClick={() => setViewMode('bars')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'bars' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Bar Scores</span>
            </button>
          </div>
        </div>

        {/* Tier Summary Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5">
          <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-emerald-900">Strongest</span>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white text-emerald-700 shadow-2xs">
              {strongest.length} {strongest.length === 1 ? 'area' : 'areas'} (70-100)
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span className="text-xs font-bold text-indigo-900">Moderate</span>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white text-indigo-700 shadow-2xs">
              {moderate.length} {moderate.length === 1 ? 'area' : 'areas'} (48-69)
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-xs font-bold text-amber-900">Exploration &amp; Growth</span>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-white text-amber-700 shadow-2xs">
              {developing.length} {developing.length === 1 ? 'area' : 'areas'} (&lt;48)
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs font-medium text-slate-700">Scoring Basis</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500">
              15 Answers Analyzed
            </span>
          </div>
        </div>
      </div>

      {/* Main Visualizations Container */}
      <div className="p-6 sm:p-8">
        <div className={`grid gap-8 items-start ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
          {/* Radar Chart (shown in 'radar' or 'both' view) */}
          {(viewMode === 'radar' || viewMode === 'both') && (
            <div className={`flex flex-col items-center justify-center ${viewMode === 'both' ? 'lg:col-span-5' : 'max-w-xl mx-auto w-full'}`}>
              <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-square flex items-center justify-center p-2">
                <svg
                  viewBox={`0 0 ${size} ${size}`}
                  className="w-full h-full drop-shadow-xs select-none"
                  aria-label="Characteristics Radar Chart"
                >
                  {/* Concentric grid rings */}
                  {[0.25, 0.5, 0.75, 1.0].map((scale, idx) => (
                    <polygon
                      key={idx}
                      points={characteristics.map((_, i) => {
                        const angle = i * angleStep - Math.PI / 2;
                        const r = radius * scale;
                        return `${(center + r * Math.cos(angle)).toFixed(1)},${(center + r * Math.sin(angle)).toFixed(1)}`;
                      }).join(' ')}
                      fill={idx === 3 ? '#f8fafc' : 'none'}
                      stroke="#e2e8f0"
                      strokeWidth={idx === 3 ? 1.5 : 1}
                      strokeDasharray={idx === 3 ? 'none' : '3 3'}
                    />
                  ))}

                  {/* Concentric scale markers */}
                  <text x={center + 5} y={center - radius * 0.25} fontSize="9" fill="#94a3b8" fontFamily="sans-serif">25</text>
                  <text x={center + 5} y={center - radius * 0.5} fontSize="9" fill="#94a3b8" fontFamily="sans-serif">50</text>
                  <text x={center + 5} y={center - radius * 0.75} fontSize="9" fill="#94a3b8" fontFamily="sans-serif">75</text>
                  <text x={center + 5} y={center - radius * 1.0} fontSize="9" fill="#64748b" fontFamily="sans-serif">100</text>

                  {/* Spoke axis lines */}
                  {points.map((p, i) => (
                    <line
                      key={i}
                      x1={center}
                      y1={center}
                      x2={center + radius * Math.cos(p.angle)}
                      y2={center + radius * Math.sin(p.angle)}
                      stroke="#cbd5e1"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Data Polygon Fill & Outline */}
                  <path
                    d={polygonPath}
                    fill="url(#radarGradient)"
                    fillOpacity="0.32"
                    stroke="#4f46e5"
                    strokeWidth="2.5"
                    className="transition-all duration-300"
                  />

                  {/* SVG Gradients */}
                  <defs>
                    <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>

                  {/* Data Points */}
                  {points.map((p, i) => {
                    const isSelected = activeDimension === p.dimension;
                    const isHovered = hoveredPoint?.dimension === p.dimension;
                    const tier = getTierColor(p.level);

                    return (
                      <g
                        key={i}
                        className="cursor-pointer group"
                        onClick={() => setActiveDimension(p.dimension)}
                        onMouseEnter={() => setHoveredPoint(p)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        {/* Hover halo */}
                        {(isSelected || isHovered) && (
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r="11"
                            fill="#6366f1"
                            fillOpacity="0.2"
                            className="animate-pulse"
                          />
                        )}
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={isSelected ? 6 : 4.5}
                          fill={p.level === 'strongest' ? '#10b981' : p.level === 'moderate' ? '#4f46e5' : '#f59e0b'}
                          stroke="#ffffff"
                          strokeWidth="2"
                          className="transition-all duration-200"
                        />
                      </g>
                    );
                  })}

                  {/* Dimension Labels */}
                  {points.map((p, i) => {
                    const isSelected = activeDimension === p.dimension;
                    return (
                      <g
                        key={i}
                        className="cursor-pointer"
                        onClick={() => setActiveDimension(p.dimension)}
                      >
                        <text
                          x={p.labelX}
                          y={p.labelY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize={isSelected ? "11" : "10"}
                          fontWeight={isSelected ? "700" : "500"}
                          fill={isSelected ? "#312e81" : "#475569"}
                          className="transition-colors duration-150 select-none"
                        >
                          {p.dimension}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Floating tooltip when hovering point */}
                {hoveredPoint && (
                  <div className="absolute top-2 right-2 bg-slate-900 text-white p-2.5 rounded-xl shadow-lg text-xs pointer-events-none z-20 border border-slate-700 animate-fade-in max-w-[200px]">
                    <div className="font-bold flex items-center justify-between gap-2">
                      <span>{hoveredPoint.dimension}</span>
                      <span className="font-mono text-indigo-300 font-extrabold">{hoveredPoint.score}/100</span>
                    </div>
                    <p className="text-[10px] text-slate-300 pt-1 line-clamp-2">{hoveredPoint.tagline}</p>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-500 text-center mt-1 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-indigo-500" />
                <span>Tap any dimension on the radar to inspect its detailed analysis below</span>
              </p>
            </div>
          )}

          {/* Horizontal Bar Breakdown (shown in 'bars' or 'both' view) */}
          {(viewMode === 'bars' || viewMode === 'both') && (
            <div className={`space-y-3 ${viewMode === 'both' ? 'lg:col-span-7' : 'w-full'}`}>
              <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-100">
                <span className="font-semibold uppercase tracking-wider">Dimension &amp; Score (0-100)</span>
                <span className="font-semibold uppercase tracking-wider">Classification</span>
              </div>

              {characteristics.map((char) => {
                const tier = getTierColor(char.level);
                const isSelected = activeDimension === char.dimension;

                return (
                  <div
                    key={char.dimension}
                    onClick={() => setActiveDimension(char.dimension)}
                    className={`group p-3 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/50 border-indigo-200 ring-1 ring-indigo-200 shadow-2xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${tier.dot}`} />
                        <span className={`text-xs font-bold ${isSelected ? 'text-indigo-900 font-extrabold' : 'text-slate-800'}`}>
                          {char.dimension}
                        </span>
                        <span className="text-[11px] text-slate-400 hidden sm:inline">
                          — {char.tagline}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-mono font-bold text-slate-800">
                          {char.score}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tier.badge}`}>
                          {char.level === 'strongest' && 'Strongest'}
                          {char.level === 'moderate' && 'Moderate'}
                          {char.level === 'developing' && 'Growth Area'}
                          {char.level === 'inconclusive' && 'Inconclusive'}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden relative">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${tier.bar}`}
                        style={{ width: `${Math.max(char.score, 4)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Dimension Spotlight Deep Dive */}
        {activeChar && (
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/40 via-white to-slate-50 border border-indigo-100/80 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100/60">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${getTierColor(activeChar.level).badge} shadow-2xs`}>
                  <Compass className="w-5 h-5 text-indigo-700" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      {activeChar.dimension} Characteristic
                    </h3>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getTierColor(activeChar.level).badge}`}>
                      Score: {activeChar.score}/100 · {activeChar.level === 'strongest' ? 'Strongest Asset' : activeChar.level === 'moderate' ? 'Moderate Tendency' : 'Growth Exploration'}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-900 font-medium">{activeChar.tagline}</p>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeChar.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Sample Activities */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>How This Shows in Daily Life</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  {activeChar.sampleActivities.map((act, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-indigo-500 font-bold">·</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Career Alignment */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Professional Alignment</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeChar.careerAlignment.map((field, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 font-medium border border-indigo-100"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Constructive Growth Recommendation */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Constructive Growth Opportunity</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {activeChar.developmentAdvice}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Top 3-5 Characteristics Explanation Section */}
        <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              Understanding Your Top Characteristics
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your strongest dimensions represent areas where your curiosity, cognitive engagement, and intrinsic motivation peak naturally. Careers and college studies that honor these traits often feel more energizing and fulfilling.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
            {topCharacteristics.map((char) => (
              <div
                key={char.dimension}
                onClick={() => setActiveDimension(char.dimension)}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                    {char.dimension}
                  </span>
                  <span className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {char.score}/100
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                  {char.tagline}
                </p>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                  <span>View full dimension insight</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth & Development Areas (Never Framed as Deficiencies) */}
        {developing.length > 0 && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Exploration &amp; Emerging Capacities (Not Deficiencies)</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              Dimensions like <span className="font-semibold">{developing.map(d => d.dimension).join(', ')}</span> currently show lower frequency in your answers. In the Ascend framework, these are <strong>flexible areas you may choose to explore or practice</strong> if your future goals require them, rather than permanent limitations or weaknesses.
            </p>
          </div>
        )}

        {/* Inconclusive Note if any */}
        {inconclusive.length > 0 && (
          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              Certain dimensions were labeled inconclusive due to limited data in this quick session. As you engage in projects and internships, these areas can be reassessed.
            </span>
          </div>
        )}

        {/* Explicit Ethical & Diagnostic Disclaimer */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 text-[11px] leading-relaxed flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-700">Important Guidance Disclaimer: </span>
            These characteristics and scores represent inferred self-reported preferences, interests, and working styles based on your answers to this guidance assessment. They do <strong>not</strong> represent fixed intelligence, innate capacity, unalterable personality traits, or any medical or psychological diagnosis. Your interests and skills will continually evolve as you gain new experiences.
          </div>
        </div>
      </div>
    </div>
  );
};
