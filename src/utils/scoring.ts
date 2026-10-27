import { CharacteristicDimension, CharacteristicScore } from '../types';

interface DimensionProfileDef {
  dimension: CharacteristicDimension;
  tagline: string;
  description: string;
  sampleActivities: string[];
  careerAlignment: string[];
  developmentAdvice: string;
}

export const DIMENSION_DEFINITIONS: Record<CharacteristicDimension, DimensionProfileDef> = {
  Builder: {
    dimension: 'Builder',
    tagline: 'Constructing, assembling, and hands-on problem-solving',
    description: 'You gain deep satisfaction from turning concepts into tangible, functional reality—whether assembling physical mechanisms, coding responsive architectures, or constructing spaces.',
    sampleActivities: [
      'Prototyping physical gadgets, woodcraft, or electronic circuits',
      'Architecting software modules, 3D models, or structural designs',
      'Troubleshooting and repairing complex machinery or equipment'
    ],
    careerAlignment: ['Mechanical / Electrical Engineering', 'Architecture & Industrial Design', 'Full-Stack Software Architecture', 'Robotics & Mechatronics'],
    developmentAdvice: 'Explore rapid prototyping workshops, fabrication labs (Makerspaces), and CAD/physical simulation tools to expand your toolset.'
  },
  Intellectual: {
    dimension: 'Intellectual',
    tagline: 'Analyzing, deep researching, and synthesizing complex ideas',
    description: 'You are energized by rigorous conceptual inquiry, examining underlying principles, questioning conventions, and connecting non-obvious ideas across multiple fields.',
    sampleActivities: [
      'Dissecting dense philosophical, economic, or scientific texts',
      'Synthesizing cross-disciplinary research papers and case studies',
      'Debating fundamental assumptions and formulating theoretical models'
    ],
    careerAlignment: ['Academic Research & Higher Education', 'Strategic Policy & Think-Tanks', 'Data Science & Quantitative Analysis', 'Bioethics & Philosophy'],
    developmentAdvice: 'Engage in independent synthesis writing, literature reviews, or research symposiums to practice articulating high-level concepts.'
  },
  Creative: {
    dimension: 'Creative',
    tagline: 'Imagining, designing, visual storytelling, and aesthetic innovation',
    description: 'Your mind operates in vivid possibilities, metaphorical thinking, and aesthetic expression. You bring emotional resonance, novel perspectives, and originality to projects.',
    sampleActivities: [
      'Developing visual identities, digital illustration, and multimedia art',
      'Crafting compelling narratives, screenplays, or thought-provoking essays',
      'Directing audio, visual, or experiential performances'
    ],
    careerAlignment: ['Brand Design & UI/UX Experience', 'Creative Direction & Filmmaking', 'Narrative Writing & Editorial Media', 'Game Design & Immersive Media'],
    developmentAdvice: 'Build an experimental personal portfolio and practice publishing speculative, unconstrained creative concepts.'
  },
  Social: {
    dimension: 'Social',
    tagline: 'Connecting with people, communicating, teaching, and collaborative synergy',
    description: 'You thrive when collaborating with diverse personalities, facilitating group energy, coaching peers, and communicating ideas clearly to inspire action.',
    sampleActivities: [
      'Mentoring younger students or facilitating group study circles',
      'Coordinating community events, workshops, or student initiatives',
      'Translating complex information into engaging, accessible presentations'
    ],
    careerAlignment: ['Education & Instructional Coaching', 'Public Relations & Strategic Communications', 'Community Management & Engagement', 'Human Resources & Talent Development'],
    developmentAdvice: 'Facilitate interactive workshops, peer mentorship cohorts, or collaborative student clubs to sharpen your relational facilitation skills.'
  },
  Entrepreneurial: {
    dimension: 'Entrepreneurial',
    tagline: 'Spotting opportunities, taking initiative, and launching ventures',
    description: 'You naturally identify unmet needs, assess calculated risks, assemble resources, and translate embryonic ideas into operational initiatives or market-ready services.',
    sampleActivities: [
      'Pitching novel business or project concepts to potential backers',
      'Testing minimum viable products or student marketplace initiatives',
      'Negotiating partnerships and analyzing unit economics or market demand'
    ],
    careerAlignment: ['Startup Founder / Venture Builder', 'Product Management & Commercial Strategy', 'Venture Capital & Seed Investing', 'Growth Marketing & Business Development'],
    developmentAdvice: 'Run small-scale micro-experiments (like launching a campus service or newsletter) to experience the full venture feedback cycle.'
  },
  Organizational: {
    dimension: 'Organizational',
    tagline: 'Structuring operations, managing workflows, and maintaining systems',
    description: 'You bring clarity out of chaos by designing scalable workflows, optimizing schedules, managing fine-grained logistics, and ensuring dependable execution.',
    sampleActivities: [
      'Designing streamlined project timelines, kanban boards, and task matrices',
      'Managing operational budgets, supply logistics, and event checklists',
      'Auditing procedures to identify and eliminate operational bottlenecks'
    ],
    careerAlignment: ['Operations Management & Logistics', 'Technical Project / Program Management', 'Financial Auditing & Compliance', 'Healthcare Administration'],
    developmentAdvice: 'Experiment with modern workflow automation tools (e.g., Notion systems, Zapier/Make) to elevate organizational structure into automated efficiency.'
  },
  Investigative: {
    dimension: 'Investigative',
    tagline: 'Scientific exploration, experimental testing, and discovering evidence',
    description: 'You are compelled to understand how natural, physical, and computational systems function by generating hypotheses, gathering empirical evidence, and testing variables.',
    sampleActivities: [
      'Conducting controlled laboratory experiments or ecological field studies',
      'Formulating statistical hypotheses and verifying data anomalies',
      'Investigating root causes of system failures through systematic observation'
    ],
    careerAlignment: ['Biomedical & Clinical Science', 'Environmental & Climate Science', 'Forensic & Investigative Analysis', 'Astrophysics & Pure Sciences'],
    developmentAdvice: 'Participate in citizen science projects, laboratory internships, or data-driven science fairs to hone rigorous experimental protocols.'
  },
  Leadership: {
    dimension: 'Leadership',
    tagline: 'Guiding vision, making pivotal decisions, and coordinating teams',
    description: 'You naturally step into roles of stewardship, articulating a shared vision, aligning team strengths, resolving roadblocks, and accepting responsibility for outcomes.',
    sampleActivities: [
      'Leading a multidisciplinary student team through a tight deadline',
      'Navigating differing opinions to reach a decisive, principled consensus',
      'Representing student bodies or organizations in high-stakes forums'
    ],
    careerAlignment: ['Executive Leadership & Public Administration', 'Strategy Consulting & Organizational Transformation', 'Nonprofit Executive Direction', 'Civic & Political Leadership'],
    developmentAdvice: 'Take on project lead responsibilities in high-ambiguity situations where success depends on rallying and supporting team members.'
  },
  Practical: {
    dimension: 'Practical',
    tagline: 'Applying concrete knowledge to real-world situations for tangible results',
    description: 'You prioritize pragmatic utility, asking "does it actually work in practice?" You favor actionable solutions that deliver direct, measurable, and reliable impact.',
    sampleActivities: [
      'Implementing immediate, cost-effective solutions to daily problems',
      'Translating theoretical guidelines into field-ready operational handbooks',
      'Executing hands-on tasks with high craftsmanship and efficiency'
    ],
    careerAlignment: ['Applied Engineering & Quality Assurance', 'Construction Management & Civil Infrastructure', 'Emergency Medical & Paramedic Services', 'Agriculture & Environmental Resource Management'],
    developmentAdvice: 'Undertake real-world apprenticeships or field internships where you can observe how theoretical blueprints fare under physical constraints.'
  },
  Empathetic: {
    dimension: 'Empathetic',
    tagline: 'Understanding human emotion, offering support, and human-centered care',
    description: 'You possess acute sensitivity to what others are experiencing emotionally and psychologically. You are motivated to alleviate distress, advocate for dignity, and foster psychological safety.',
    sampleActivities: [
      'Providing non-judgmental listening and emotional support to peers in distress',
      'Advocating for underserved groups and designing accessible accommodations',
      'Mediating interpersonal conflicts with compassion and fairness'
    ],
    careerAlignment: ['Clinical Psychology & Mental Health Counseling', 'Pediatric & Palliative Healthcare', 'Social Work & Restorative Justice', 'Human-Centered UX Research & Advocacy'],
    developmentAdvice: 'Practice active listening in peer support networks and explore volunteer roles in crisis hotlines or community care programs.'
  }
};

// Maps question option values to dimension weight affinities
const OPTION_AFFINITIES: Record<string, Partial<Record<CharacteristicDimension, number>>> = {
  // Q1: Interests & Passions
  creative_arts: { Creative: 18, Intellectual: 6 },
  reading_humanities: { Intellectual: 18, Empathetic: 8, Creative: 6 },
  nature_wildlife: { Investigative: 18, Practical: 8 },
  crafts_culinary_mechanics: { Builder: 20, Practical: 14 },
  community_leadership: { Social: 16, Leadership: 18, Empathetic: 10 },
  computing_electronics: { Builder: 16, Intellectual: 14, Investigative: 10 },

  // Q2: Curiosity Exploration
  psychology_behavior: { Empathetic: 18, Intellectual: 14, Social: 10 },
  medicine_physiology: { Investigative: 16, Empathetic: 14, Practical: 10 },
  architecture_spaces: { Builder: 16, Creative: 14, Practical: 8 },
  business_economics: { Entrepreneurial: 20, Leadership: 10, Organizational: 10 },
  law_justice_journalism: { Intellectual: 16, Social: 12, Leadership: 10 },
  fundamental_sciences: { Investigative: 20, Intellectual: 16 },

  // Q3: Flow State & Focus
  flow_writing: { Creative: 16, Intellectual: 14 },
  flow_design: { Creative: 18, Builder: 10 },
  flow_mentoring: { Empathetic: 16, Social: 16, Leadership: 10 },
  flow_tinkering: { Builder: 18, Practical: 16 },
  flow_analytical: { Intellectual: 18, Investigative: 14, Organizational: 8 },
  flow_strategy: { Leadership: 16, Entrepreneurial: 16, Organizational: 12 },

  // Q4: Academic Preferences
  subj_humanities: { Intellectual: 16, Creative: 10, Empathetic: 8 },
  subj_biomedical: { Investigative: 18, Practical: 10, Empathetic: 8 },
  subj_arts_media: { Creative: 20, Social: 8 },
  subj_commerce: { Entrepreneurial: 18, Organizational: 12, Leadership: 8 },
  subj_stem_physical: { Investigative: 16, Builder: 14, Intellectual: 12 },
  subj_environmental: { Investigative: 14, Practical: 12, Empathetic: 8 },

  // Q5: Cognitive Learning Mode
  mode_narrative: { Creative: 14, Empathetic: 12, Intellectual: 8 },
  mode_kinesthetic: { Practical: 18, Builder: 16 },
  mode_visual: { Creative: 16, Builder: 8 },
  mode_analytical: { Intellectual: 18, Investigative: 14, Organizational: 10 },
  mode_dialogic: { Social: 18, Leadership: 10, Empathetic: 10 },

  // Q6: Creative Expression
  creative_visual: { Creative: 20, Builder: 8 },
  creative_writing: { Creative: 20, Intellectual: 12 },
  creative_performance: { Creative: 18, Social: 14, Leadership: 8 },
  creative_spatial: { Builder: 18, Creative: 14, Practical: 10 },
  creative_venture: { Entrepreneurial: 20, Leadership: 14, Creative: 8 },

  // Q7: Human Relationships
  role_counselor: { Empathetic: 20, Social: 14 },
  role_facilitator: { Social: 18, Leadership: 14, Organizational: 10 },
  role_educator: { Social: 18, Empathetic: 14, Intellectual: 10 },
  role_observer: { Intellectual: 16, Investigative: 14 },
  role_autonomous_craft: { Builder: 16, Practical: 14, Creative: 8 },

  // Q8: Societal Mission
  mission_health_wellness: { Empathetic: 18, Investigative: 12, Practical: 10 },
  mission_law_justice: { Intellectual: 14, Leadership: 14, Social: 12 },
  mission_conservation_climate: { Investigative: 16, Practical: 12, Empathetic: 8 },
  mission_education_youth: { Social: 18, Empathetic: 16, Leadership: 10 },
  mission_arts_journalism: { Creative: 18, Intellectual: 12, Social: 8 },
  mission_economic_enterprise: { Entrepreneurial: 20, Leadership: 12, Organizational: 10 },

  // Q9: Commercial Curiosity
  biz_entrepreneurship: { Entrepreneurial: 20, Leadership: 14, Builder: 8 },
  biz_marketing_branding: { Creative: 14, Social: 14, Entrepreneurial: 12 },
  biz_finance_markets: { Intellectual: 14, Organizational: 14, Entrepreneurial: 12 },
  biz_operations_logistics: { Organizational: 20, Practical: 16, Leadership: 8 },
  biz_non_commercial: { Empathetic: 14, Investigative: 10, Social: 10 },

  // Q10: Scientific Curiosity
  sci_biomedical_genetics: { Investigative: 20, Intellectual: 14, Empathetic: 8 },
  sci_ecology_wildlife: { Investigative: 18, Practical: 12 },
  sci_physics_cosmology: { Intellectual: 20, Investigative: 18 },
  sci_math_modeling: { Intellectual: 20, Organizational: 12, Investigative: 12 },
  sci_prefer_humanities: { Creative: 12, Social: 12, Empathetic: 12 },

  // Q11: Hands-on & Physical Craft
  hands_on_essential: { Practical: 22, Builder: 22 },
  hands_on_balanced: { Practical: 14, Builder: 12, Intellectual: 10 },
  hands_on_minimal: { Intellectual: 16, Creative: 10, Social: 8 },

  // Q12: Thinking & Problem-Solving
  think_intuitive_lateral: { Creative: 18, Entrepreneurial: 12 },
  think_systematic_empirical: { Intellectual: 18, Investigative: 16, Organizational: 12 },
  think_empathetic_human: { Empathetic: 20, Social: 16 },
  think_pragmatic_action: { Practical: 20, Builder: 14, Leadership: 12 },

  // Q13: Workplace Rhythm & Setting
  env_quiet_autonomous: { Intellectual: 12, Builder: 10, Creative: 10 },
  env_lively_collaborative: { Social: 18, Leadership: 14 },
  env_balanced_hybrid: { Organizational: 12, Practical: 10 },
  env_active_mobile: { Practical: 16, Builder: 12, Entrepreneurial: 10 },

  // Q14: Core Life Values
  val_social_impact: { Empathetic: 18, Social: 14, Leadership: 8 },
  val_creative_freedom: { Creative: 20, Entrepreneurial: 10 },
  val_financial_independence: { Entrepreneurial: 18, Practical: 10, Organizational: 10 },
  val_intellectual_mastery: { Intellectual: 20, Investigative: 14 },
  val_leadership_influence: { Leadership: 20, Entrepreneurial: 12, Social: 10 },
  val_work_life_harmony: { Organizational: 12, Empathetic: 8 },

  // Q15: Career Ambition Clarity
  focused_ambition: { Leadership: 10, Entrepreneurial: 10, Organizational: 8 },
  multidisciplinary_intersection: { Creative: 12, Intellectual: 12 },
  early_curiosity: { Investigative: 10, Social: 8 },
  open_horizon: { Creative: 10, Social: 8 }
};

export function calculateCharacteristicsScores(
  answers: Record<string, any>,
  customNotes?: Record<string, string>,
  profileContext?: {
    archetype?: string;
    strongestInterestAreas?: string[];
    riasecScores?: Record<string, number>;
  }
): CharacteristicScore[] {
  const allDimensions: CharacteristicDimension[] = [
    'Builder',
    'Intellectual',
    'Creative',
    'Social',
    'Entrepreneurial',
    'Organizational',
    'Investigative',
    'Leadership',
    'Practical',
    'Empathetic'
  ];

  // Base raw score accumulator
  const rawScores: Record<CharacteristicDimension, number> = {
    Builder: 0,
    Intellectual: 0,
    Creative: 0,
    Social: 0,
    Entrepreneurial: 0,
    Organizational: 0,
    Investigative: 0,
    Leadership: 0,
    Practical: 0,
    Empathetic: 0
  };

  let totalSelections = 0;

  // Process answers
  Object.entries(answers).forEach(([_qId, val]) => {
    const values = Array.isArray(val) ? val : [val];
    values.forEach(v => {
      if (typeof v === 'string' && OPTION_AFFINITIES[v]) {
        totalSelections++;
        const affinities = OPTION_AFFINITIES[v];
        Object.entries(affinities).forEach(([dim, weight]) => {
          if (dim in rawScores && typeof weight === 'number') {
            rawScores[dim as CharacteristicDimension] += weight;
          }
        });
      }
    });
  });

  // If no direct question answers available but profileContext has RIASEC data, calibrate smoothly
  if (totalSelections === 0 && profileContext?.riasecScores) {
    const r = profileContext.riasecScores;
    rawScores.Builder = Math.round((r.realistic || 60) * 0.7);
    rawScores.Practical = Math.round((r.realistic || 60) * 0.8);
    rawScores.Investigative = Math.round((r.investigative || 60) * 0.85);
    rawScores.Intellectual = Math.round((r.investigative || 60) * 0.8);
    rawScores.Creative = Math.round((r.artistic || 60) * 0.85);
    rawScores.Social = Math.round((r.social || 60) * 0.8);
    rawScores.Empathetic = Math.round((r.social || 60) * 0.85);
    rawScores.Entrepreneurial = Math.round((r.enterprising || 60) * 0.85);
    rawScores.Leadership = Math.round((r.enterprising || 60) * 0.75);
    rawScores.Organizational = Math.round((r.conventional || 60) * 0.8);
    totalSelections = 15;
  }

  // Evaluate text notes if provided (gentle contextual bonus)
  if (customNotes) {
    const textCorpus = Object.values(customNotes).join(' ').toLowerCase();
    if (/(build|code|craft|make|hardware|mechanic|robot|wood)/.test(textCorpus)) {
      rawScores.Builder += 10;
      rawScores.Practical += 6;
    }
    if (/(research|analy|theory|philosophy|read|history|study)/.test(textCorpus)) {
      rawScores.Intellectual += 10;
      rawScores.Investigative += 6;
    }
    if (/(art|design|music|paint|story|film|creative|express)/.test(textCorpus)) {
      rawScores.Creative += 12;
    }
    if (/(teach|community|people|talk|group|friend|social)/.test(textCorpus)) {
      rawScores.Social += 10;
    }
    if (/(startup|business|sell|money|invest|venture|pitch)/.test(textCorpus)) {
      rawScores.Entrepreneurial += 12;
    }
    if (/(plan|organize|system|detail|structure|schedule)/.test(textCorpus)) {
      rawScores.Organizational += 12;
    }
    if (/(experiment|science|biology|physics|lab|evidence|nature)/.test(textCorpus)) {
      rawScores.Investigative += 12;
    }
    if (/(lead|direct|manage|decide|captain|guide)/.test(textCorpus)) {
      rawScores.Leadership += 12;
    }
    if (/(real|hands-on|pragmatic|fix|tangible|action)/.test(textCorpus)) {
      rawScores.Practical += 12;
    }
    if (/(help|listen|feel|empathy|support|mental health|care)/.test(textCorpus)) {
      rawScores.Empathetic += 12;
    }
  }

  // Check if answers were insufficient to prevent treating omissions as weaknesses
  const isInsufficient = totalSelections < 4;

  // Maximum realistic accumulation per dimension across 15 questions is ~70-95
  const results: CharacteristicScore[] = allDimensions.map(dimension => {
    const def = DIMENSION_DEFINITIONS[dimension];
    const raw = rawScores[dimension];

    if (isInsufficient && raw === 0) {
      return {
        dimension,
        score: 0,
        level: 'inconclusive' as const,
        tagline: def.tagline,
        description: `Insufficient response data recorded for ${dimension}. This does not reflect a lack of ability, but an unexplored area in this quick session.`,
        sampleActivities: def.sampleActivities,
        careerAlignment: def.careerAlignment,
        developmentAdvice: 'Explore an activity in this area to discover how naturally it aligns with your style.'
      };
    }

    // Normalization to 0 - 100
    // Using a baseline curve: a score of 60 raw maps to ~88, 35 raw maps to ~65, 15 raw maps to ~40
    let normalized = Math.min(96, Math.round(25 + Math.sqrt(raw * 55)));
    if (raw === 0) {
      normalized = 28; // neutral baseline, not zero
    }

    // Classification per requirements:
    // Strongest: 70+
    // Moderate: 48 - 69
    // Comparatively lower / development exploration: < 48
    let level: 'strongest' | 'moderate' | 'developing' | 'inconclusive' = 'moderate';
    if (normalized >= 70) {
      level = 'strongest';
    } else if (normalized < 48) {
      level = 'developing';
    }

    return {
      dimension,
      score: normalized,
      level,
      tagline: def.tagline,
      description: def.description,
      sampleActivities: def.sampleActivities,
      careerAlignment: def.careerAlignment,
      developmentAdvice: def.developmentAdvice
    };
  });

  // Sort descending by score
  return results.sort((a, b) => b.score - a.score);
}
