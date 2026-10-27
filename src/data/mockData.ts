import { AssessmentQuestion, College, Course, Internship, UserProfile } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1',
    stage: 'hobbies_activities',
    question: 'What activities, hobbies, or projects do you find yourself doing simply because you enjoy them?',
    subtitle: 'Think about what you do in your free time without anyone asking or grading you.',
    allowCustomInput: true,
    customInputPlaceholder: 'Or tell us in your own words what you genuinely love doing...',
    options: [
      {
        label: 'Building tangible things with code, electronics, robotics, or game modding',
        description: 'Hands-on creation, testing how parts fit together, and seeing digital or physical systems come alive',
        value: 'building_systems',
        tags: ['Engineering', 'Computing', 'Robotics']
      },
      {
        label: 'Exploring deep topics (science, economics, nature, history) through deep-dive videos & articles',
        description: 'Unraveling why things happen, hunting for patterns, and satisfying intellectual curiosity',
        value: 'exploring_knowledge',
        tags: ['Research', 'Biotech', 'Analytics']
      },
      {
        label: 'Expressing ideas through visual art, UI design, creative writing, music, or digital media',
        description: 'Aesthetic synthesis, storytelling, and designing experiences that evoke emotional resonance',
        value: 'creative_expression',
        tags: ['Design', 'Media', 'UI/UX']
      },
      {
        label: 'Organizing initiatives, strategizing with peers, debating ideas, or launching student projects',
        description: 'Persuading stakeholders, bringing people together around an idea, and driving execution',
        value: 'initiative_leadership',
        tags: ['Strategy', 'Entrepreneurship', 'Leadership']
      },
      {
        label: 'Directly mentoring others, listening to personal stories, volunteering, or community support',
        description: 'Human empathy, individual empowerment, and making someone’s day tangibly better',
        value: 'helping_people',
        tags: ['Healthcare', 'Education', 'Social Impact']
      }
    ]
  },
  {
    id: 'q2',
    stage: 'deeper_curiosity',
    question: 'When a topic or challenge deeply excites you, what is the core spark behind your fascination?',
    subtitle: 'Looking past the surface activity into what energizes your mind.',
    allowCustomInput: true,
    customInputPlaceholder: 'What specific questions or challenges make you want to learn more?',
    options: [
      {
        label: 'The thrill of deconstructing complex mechanisms to understand how they work under the hood',
        description: 'First-principles curiosity, reverse engineering, and optimizing logic',
        value: 'under_the_hood',
        tags: ['Deep Tech', 'Systems Architecture']
      },
      {
        label: 'The joy of bringing an original concept from pure imagination into a working reality',
        description: 'Zero-to-one creative agency and translating abstract inspiration into a tangible creation',
        value: 'zero_to_one_creation',
        tags: ['Innovation', 'Design Thinking']
      },
      {
        label: 'Finding an elegant, data-backed solution to a frustrating real-world bottleneck',
        description: 'Empirical problem-solving, measurable efficiency gains, and quantitative clarity',
        value: 'empirical_bottleneck',
        tags: ['Quantitative Analysis', 'Product Strategy']
      },
      {
        label: 'Unlocking breakthrough scientific or ethical insights that expand human capability',
        description: 'Pushing the boundary of what medicine, technology, or society can achieve',
        value: 'breakthrough_discovery',
        tags: ['Biomedical', 'Frontier AI', 'Research']
      }
    ]
  },
  {
    id: 'q3',
    stage: 'deeper_curiosity',
    question: 'If you were given 6 months of complete freedom and resources, what problem would you want to tackle?',
    subtitle: 'Your personal impulse for meaningful contribution.',
    allowCustomInput: true,
    customInputPlaceholder: 'Describe the dream project or mission you would love to bring into the world...',
    options: [
      {
        label: 'Engineer an autonomous AI tool, robotics system, or software infrastructure that empowers millions',
        description: 'Technical leverage, high reliability, and building tools of the future',
        value: 'engineer_autonomous_tool',
        tags: ['AI Software', 'Robotics Systems']
      },
      {
        label: 'Discover novel biological therapies, climate technologies, or scientific models in a lab',
        description: 'Experimental rigor, biological health impact, and ecological sustainability',
        value: 'scientific_health_climate',
        tags: ['Genomics', 'CleanTech', 'Medicine']
      },
      {
        label: 'Launch a mission-driven tech company or design studio addressing unmet consumer or business needs',
        description: 'Entrepreneurial independence, product-market fit, and team building',
        value: 'launch_venture',
        tags: ['Venture Creation', 'Product Leadership']
      },
      {
        label: 'Transform educational access, public healthcare equality, or civic community tools',
        description: 'Direct human uplift, systemic societal fairness, and empathetic design',
        value: 'societal_uplift',
        tags: ['Public Health', 'EdTech', 'Social Innovation']
      }
    ]
  },
  {
    id: 'q4',
    stage: 'thinking_preferences',
    question: 'How does your mind naturally like to explore challenges and process new ideas?',
    subtitle: 'Understanding your flexible cognitive tendencies—not a rigid personality label.',
    allowCustomInput: true,
    customInputPlaceholder: 'How do you usually like to think through difficult problems?',
    options: [
      {
        label: 'Structured & Evidence-Driven: Analyzing data, testing hypotheses, and finding empirical proof',
        description: 'You appreciate objective clarity, logical consistency, and step-by-step verification',
        value: 'structured_evidence',
        tags: ['Analytical Rigor', 'Quantitative Modeling']
      },
      {
        label: 'Intuitive & Lateral: Connecting unexpected concepts, questioning assumptions, and imagining possibilities',
        description: 'You see non-obvious parallels across disciplines and spark novel conceptual angles',
        value: 'intuitive_lateral',
        tags: ['Creative Synthesis', 'Strategic Vision']
      },
      {
        label: 'Practical & Experimental: Jumping in, tinkering with working prototypes, and learning from trial-and-error',
        description: 'You learn fastest through immediate hands-on friction and tactile iteration',
        value: 'practical_experimentation',
        tags: ['Prototyping', 'Rapid Iteration']
      },
      {
        label: 'Human-Centered & Empathic: Examining user motivations, interpersonal dynamics, and social impact',
        description: 'You prioritize how real humans think, feel, struggle, and thrive',
        value: 'human_centered',
        tags: ['Human Experience', 'Product Design']
      }
    ]
  },
  {
    id: 'q5',
    stage: 'thinking_preferences',
    question: 'What work rhythm and collaboration dynamic leaves you feeling most energized?',
    subtitle: 'How you like to structure your focus without being pigeonholed.',
    options: [
      {
        label: 'Deep Solo Immersion: Uninterrupted sanctuary time to build, write, or solve complex puzzles',
        description: 'Peak productivity in dedicated flow state; social energy recharges best during independent crafting',
        value: 'deep_solo_flow',
        tags: ['Autonomous Craft', 'Deep Focus']
      },
      {
        label: 'Balanced Rhythm: Independent building sprints punctuated by purposeful peer design reviews',
        description: 'The sweet spot between autonomous ownership and rich, high-signal collaboration',
        value: 'balanced_rhythm',
        tags: ['Ambivert Builder', 'Agile Co-creation']
      },
      {
        label: 'Collaborative War-Rooms: Fast-paced whiteboard sessions, lively debate, and shared team energy',
        description: 'Your best ideas spark in real-time conversation and collective momentum',
        value: 'collaborative_momentum',
        tags: ['Team Co-working', 'Active Dialog']
      }
    ]
  },
  {
    id: 'q6',
    stage: 'career_clarity',
    question: 'Where do you currently stand regarding your future career ambition?',
    subtitle: 'This helps us validate and refine your genuine aspirations rather than guessing.',
    allowCustomInput: true,
    customInputPlaceholder: 'If you already have a target dream role or field in mind, tell us what it is...',
    options: [
      {
        label: 'Focused Ambition: I have a specific career or discipline in mind and want to validate and prepare for it',
        description: 'You know your target area (e.g. AI systems, biotech research, surgery, quantitative finance) and want the fastest path',
        value: 'focused_ambition',
        tags: ['Validation', 'Skill Gap Focus']
      },
      {
        label: 'Multi-Disciplinary: I have two or more strong passions and want to see how they intersect',
        description: 'You might love both computer science and psychology, or biology and design, and want a hybrid trajectory',
        value: 'multidisciplinary_intersection',
        tags: ['Hybrid Trajectories', 'Cross-Disciplinary']
      },
      {
        label: 'Early Curiosity: I know what topics I enjoy learning, but haven’t connected them to careers yet',
        description: 'You want to see how what you love translates into practical, well-paying industries',
        value: 'early_curiosity',
        tags: ['Exploration', 'Industry Translation']
      },
      {
        label: 'Open Horizon: I’m open-minded and want to discover exciting trajectories I might not know exist',
        description: 'You are ready to explore frontier emerging fields and novel paths',
        value: 'open_horizon',
        tags: ['Broad Discovery', 'Emerging Fields']
      }
    ]
  }
];

export const COLLEGES_DATA: College[] = [
  {
    id: 'stanford',
    name: 'Stanford University',
    shortName: 'Stanford',
    location: 'Stanford, California',
    state: 'California',
    country: 'United States',
    campusType: 'Suburban',
    ranking: 3,
    acceptanceRate: 3.9,
    tuitionInState: 62484,
    tuitionOutOfState: 62484,
    avgFinancialAid: 58200,
    medianStartingSalary: 108000,
    studentFacultyRatio: '5:1',
    graduationRate: 95,
    bannerColor: 'from-red-900 to-rose-950',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    description: 'World-renowned for its proximity to Silicon Valley venture ecosystems, cutting-edge AI and biomedical labs, and unparalleled entrepreneurial culture.',
    popularMajors: [
      'Computer Science & AI',
      'Symbolic Systems',
      'Management Science & Engineering',
      'Bioengineering',
      'Economics'
    ],
    facilities: [
      'Stanford AI Lab (SAIL)',
      'Huang Engineering Center & MakerSpaces',
      'Stanford Linear Accelerator (SLAC)',
      'StartX Student Incubator',
      'Arrillaga Family Sports & Wellness Centers'
    ],
    alumniOutcomes: {
      employmentRate90Days: 94,
      topEmployers: ['Google', 'Apple', 'NVIDIA', 'OpenAI', 'McKinsey & Co', 'Stripe'],
      avg5YearSalary: 165000
    },
    admissionRequirements: {
      gpaAverage: '3.96 Unweighted',
      satRange: '1500 - 1570',
      actRange: '34 - 36',
      applicationDeadlines: {
        earlyDecision: 'November 1 (Restrictive Early Action)',
        regularDecision: 'January 5'
      },
      keyCriteria: [
        'Intellectual vitality demonstrated outside the classroom',
        'Demonstrated leadership & passion projects',
        'Strong recommendation letters highlighting curiosity'
      ]
    },
    reviews: [
      {
        id: 'rev-st-1',
        authorName: 'Elena Rostova',
        gradYear: 'Class of 2025',
        major: 'Computer Science (AI Track)',
        rating: 5,
        verifiedStatus: true,
        verificationSource: 'Verified Stanford .edu student',
        date: 'October 12, 2025',
        title: 'Incredible tech ecosystem, but manage your imposter syndrome',
        comment: 'The access to professors and founders is unmatched. My sophomore project turned into a funded research fellowship. However, the culture can feel intensely driven, so you must define your own pace.',
        pros: ['Direct pipeline to top tech & venture capital', 'Undergraduate research funding is plentiful', 'Weather and gorgeous campus'],
        cons: ['High living costs in Palo Alto', 'Quarter system is relentless'],
        ratingsBreakdown: { academics: 5, campusLife: 4.5, careerSupport: 5, roiValue: 4.8 }
      },
      {
        id: 'rev-st-2',
        authorName: 'Marcus T. Vance',
        gradYear: 'Class of 2024 (Alumni)',
        major: 'Bioengineering',
        rating: 4.8,
        verifiedStatus: true,
        verificationSource: 'Verified Stanford Alumni (LinkedIn Verified)',
        date: 'July 18, 2025',
        title: 'Cross-disciplinary research that bridges medicine and engineering',
        comment: 'Faculty in ChEM-H and Bio-X actively encourage undergraduates to run experiments. Landed my role at Genentech through alumni referral networks.',
        pros: ['World-class lab facilities', 'Interdisciplinary collaboration', 'Strong career center advisory'],
        cons: ['Selective upper-division lab capacity'],
        ratingsBreakdown: { academics: 5, campusLife: 4.6, careerSupport: 5, roiValue: 4.7 }
      }
    ],
    tags: ['Silicon Valley', 'Top AI Program', 'High ROI', 'Entrepreneurship']
  },
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology',
    shortName: 'MIT',
    location: 'Cambridge, Massachusetts',
    state: 'Massachusetts',
    country: 'United States',
    campusType: 'Urban',
    ranking: 1,
    acceptanceRate: 4.0,
    tuitionInState: 60156,
    tuitionOutOfState: 60156,
    avgFinancialAid: 61000,
    medianStartingSalary: 112000,
    studentFacultyRatio: '3:1',
    graduationRate: 96,
    bannerColor: 'from-stone-900 to-red-950',
    logo: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80',
    description: 'The global benchmark for scientific and mathematical rigor, quantitative innovation, robotics, and problem-solving at planetary scale.',
    popularMajors: [
      'Course 6-3: Computer Science',
      'Course 6-4: Artificial Intelligence & Decision Making',
      'Course 2: Mechanical Engineering',
      'Course 18C: Mathematics with Computer Science',
      'Course 20: Biological Engineering'
    ],
    facilities: [
      'MIT CSAIL (Computer Science and AI Lab)',
      'MIT Media Lab',
      'Koch Institute for Integrative Cancer Research',
      'The Martin Trust Center for MIT Entrepreneurship',
      'D-Lab humanitarian innovation hubs'
    ],
    alumniOutcomes: {
      employmentRate90Days: 96,
      topEmployers: ['Google Brain', 'Microsoft Research', 'NASA JPL', 'Citadel', 'SpaceX', 'DeepMind'],
      avg5YearSalary: 172000
    },
    admissionRequirements: {
      gpaAverage: '3.98 Unweighted',
      satRange: '1520 - 1580',
      actRange: '35 - 36',
      applicationDeadlines: {
        earlyDecision: 'November 1 (Early Action)',
        regularDecision: 'January 1'
      },
      keyCriteria: [
        'Exceptional mathematical curiosity and STEM achievements',
        'Collaborative spirit and "Mens et Manus" (Mind and Hand) philosophy',
        'Resilience in solving tough unsolved problems'
      ]
    },
    reviews: [
      {
        id: 'rev-mit-1',
        authorName: 'Jason K. Miller',
        gradYear: 'Class of 2026',
        major: 'Electrical Engineering & CS',
        rating: 4.9,
        verifiedStatus: true,
        verificationSource: 'Verified MIT .edu student',
        date: 'September 29, 2025',
        title: 'Hardest work of your life, but you learn that you can build anything',
        comment: 'Psets will test your limits, but the culture is purely collaborative rather than cutthroat. Everyone works together in the lounges at 2 AM to crack problem sets.',
        pros: ['Brilliant, humble peer community', 'Undergraduate Research Opportunities Program (UROP) is unmatched', 'Recruiting fairs are incredible'],
        cons: ['Heavy workload during midterms', 'Boston winters are harsh'],
        ratingsBreakdown: { academics: 5, campusLife: 4.2, careerSupport: 5, roiValue: 5.0 }
      }
    ],
    tags: ['STEM Benchmark', 'High Quantitative Rigor', 'Robotics', 'DeepTech']
  },
  {
    id: 'cmu',
    name: 'Carnegie Mellon University',
    shortName: 'Carnegie Mellon',
    location: 'Pittsburgh, Pennsylvania',
    state: 'Pennsylvania',
    country: 'United States',
    campusType: 'Urban',
    ranking: 22,
    acceptanceRate: 11.2,
    tuitionInState: 62260,
    tuitionOutOfState: 62260,
    avgFinancialAid: 45000,
    medianStartingSalary: 104000,
    studentFacultyRatio: '6:1',
    graduationRate: 92,
    bannerColor: 'from-red-900 to-neutral-900',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
    description: 'Renowned as the birthplace of autonomous driving and cognitive science, offering the prestigious School of Computer Science and Human-Computer Interaction Institute.',
    popularMajors: [
      'Computer Science',
      'Artificial Intelligence (BS in AI)',
      'Human-Computer Interaction (HCI)',
      'Electrical & Computer Engineering',
      'Computational Finance'
    ],
    facilities: [
      'Robotics Institute (National Robotics Engineering Center)',
      'Gates Center for Computer Science',
      'Entertainment Technology Center (ETC)',
      'Center for Neural Basis of Cognition'
    ],
    alumniOutcomes: {
      employmentRate90Days: 95,
      topEmployers: ['Meta', 'Uber ATG / Aurora', 'Google', 'Apple', 'NVIDIA', 'Jane Street'],
      avg5YearSalary: 158000
    },
    admissionRequirements: {
      gpaAverage: '3.91 Unweighted',
      satRange: '1500 - 1560',
      actRange: '34 - 36',
      applicationDeadlines: {
        earlyDecision: 'November 1 (ED 1) / January 3 (ED 2)',
        regularDecision: 'January 3'
      },
      keyCriteria: [
        'Dedicated interest and demonstrated ability in chosen college',
        'Strong performance in rigorous calculus and computing curricula'
      ]
    },
    reviews: [
      {
        id: 'rev-cmu-1',
        authorName: 'Priyam Patel',
        gradYear: 'Class of 2025',
        major: 'BS in Artificial Intelligence',
        rating: 4.8,
        verifiedStatus: true,
        verificationSource: 'Verified CMU .edu student',
        date: 'November 14, 2025',
        title: 'Number 1 curriculum for AI and Systems software in the nation',
        comment: 'You will implement neural nets from raw C++ matrices and learn the deep math behind LLMs and reinforcement learning. Companies hire CMU grads knowing they are day-one production ready.',
        pros: ['Curriculum is 2 years ahead of industry standards', 'HCI program is exceptional', 'Great tech recruiting on campus'],
        cons: ['Pittsburgh gray winters', 'Demanding project deadlines'],
        ratingsBreakdown: { academics: 5, campusLife: 4.0, careerSupport: 4.9, roiValue: 4.8 }
      }
    ],
    tags: ['#1 School of CS', 'Robotics Pioneer', 'HCI & UX', 'Systems Software']
  },
  {
    id: 'uc-berkeley',
    name: 'University of California, Berkeley',
    shortName: 'UC Berkeley',
    location: 'Berkeley, California',
    state: 'California',
    country: 'United States',
    campusType: 'Urban',
    ranking: 15,
    acceptanceRate: 11.6,
    tuitionInState: 14780,
    tuitionOutOfState: 44846,
    avgFinancialAid: 24000,
    medianStartingSalary: 96000,
    studentFacultyRatio: '19:1',
    graduationRate: 93,
    bannerColor: 'from-amber-700 to-blue-900',
    logo: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop&q=80',
    description: 'Premier public research university famed for world-changing open source tech (BSD Unix, Apache Spark, RISC-V) and dynamic social activism.',
    popularMajors: [
      'EECS (Electrical Engineering & Computer Sciences)',
      'Data Science',
      'Economics & Haas Business',
      'Integrative Biology',
      'Mechanical Engineering'
    ],
    facilities: [
      'Berkeley AI Research (BAIR) Lab',
      'Lawrence Berkeley National Laboratory',
      'Sutardja Dai Hall (CITRIS)',
      'Berkeley SkyDeck Startup Accelerator'
    ],
    alumniOutcomes: {
      employmentRate90Days: 92,
      topEmployers: ['Google', 'Tesla', 'Amazon', 'Salesforce', 'Bloomberg', 'Genentech'],
      avg5YearSalary: 150000
    },
    admissionRequirements: {
      gpaAverage: '3.90 Unweighted',
      satRange: 'Test-Free / Holistic UC Review',
      actRange: 'Test-Free / Holistic UC Review',
      applicationDeadlines: {
        regularDecision: 'November 30 (UC System Application)'
      },
      keyCriteria: [
        'Rigorous A-G course completion and academic trend',
        'Personal Insight Questions demonstrating resilience and initiative'
      ]
    },
    reviews: [
      {
        id: 'rev-cal-1',
        authorName: 'Sarah Lin',
        gradYear: 'Class of 2025',
        major: 'Data Science & EECS',
        rating: 4.7,
        verifiedStatus: true,
        verificationSource: 'Verified UC Berkeley .edu student',
        date: 'August 24, 2025',
        title: 'Unbelievable public institution value, especially for in-state',
        comment: 'Classes can be massive (CS61A had 1,500 students), but the student teaching assistants are rockstars and student clubs build real production apps.',
        pros: ['Incredible in-state ROI', 'Proximity to San Francisco tech hubs', 'Passionate and diverse student body'],
        cons: ['Large class sizes in lower division', 'Competitive enrollment for capped courses'],
        ratingsBreakdown: { academics: 4.8, campusLife: 4.5, careerSupport: 4.7, roiValue: 5.0 }
      }
    ],
    tags: ['Public Ivy', 'Open Source Hub', 'Top Data Science', 'San Francisco Bay']
  },
  {
    id: 'georgia-tech',
    name: 'Georgia Institute of Technology',
    shortName: 'Georgia Tech',
    location: 'Atlanta, Georgia',
    state: 'Georgia',
    country: 'United States',
    campusType: 'Urban',
    ranking: 33,
    acceptanceRate: 16.0,
    tuitionInState: 12852,
    tuitionOutOfState: 33964,
    avgFinancialAid: 18000,
    medianStartingSalary: 92000,
    studentFacultyRatio: '18:1',
    graduationRate: 91,
    bannerColor: 'from-amber-600 to-yellow-900',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
    description: 'A powerhouse in engineering and computing known for exceptional cooperative education (Co-op) programs that graduate students with extensive corporate experience.',
    popularMajors: [
      'Computer Science (Threads Curriculum)',
      'Industrial & Systems Engineering',
      'Mechanical Engineering',
      'Biomedical Engineering (joint with Emory)',
      'Aerospace Engineering'
    ],
    facilities: [
      'Klaus Advanced Computing Building',
      'Invention Studio (Free student-run 24/7 maker space)',
      'Georgia Tech Research Institute (GTRI)',
      'Tech Square Midtown innovation cluster'
    ],
    alumniOutcomes: {
      employmentRate90Days: 94,
      topEmployers: ['Microsoft', 'Delta Air Lines', 'Lockheed Martin', 'Amazon', 'Home Depot Tech', 'Capital One'],
      avg5YearSalary: 142000
    },
    admissionRequirements: {
      gpaAverage: '3.88 Unweighted',
      satRange: '1410 - 1530',
      actRange: '31 - 35',
      applicationDeadlines: {
        earlyDecision: 'October 15 (EA 1 GA Residents) / November 1 (EA 2)',
        regularDecision: 'January 4'
      },
      keyCriteria: [
        'Advanced math progression through AP Calculus BC or Multivariable',
        'Demonstrated practical hands-on building experience'
      ]
    },
    reviews: [
      {
        id: 'rev-gt-1',
        authorName: 'Darnell Washington',
        gradYear: 'Class of 2024 (Alumni)',
        major: 'Computer Science (Systems & Intelligence)',
        rating: 4.8,
        verifiedStatus: true,
        verificationSource: 'Verified Georgia Tech Alumni',
        date: 'September 15, 2025',
        title: 'The Co-op program completely funded my degree and landed my job',
        comment: 'Did 3 alternating semesters of co-op at Microsoft Atlanta. By the time I graduated, I had 1.5 years of professional engineering experience on my resume.',
        pros: ['Outstanding career fair and corporate ties', 'Affordable tuition', 'Vibrant Midtown Atlanta scene'],
        cons: ['Rigorous grading curves in core engineering'],
        ratingsBreakdown: { academics: 4.7, campusLife: 4.3, careerSupport: 5.0, roiValue: 5.0 }
      }
    ],
    tags: ['Top Co-op Program', 'Engineering Leader', 'High Value ROI', 'Atlanta Tech']
  },
  {
    id: 'umich',
    name: 'University of Michigan, Ann Arbor',
    shortName: 'Univ. of Michigan',
    location: 'Ann Arbor, Michigan',
    state: 'Michigan',
    country: 'United States',
    campusType: 'College Town',
    ranking: 21,
    acceptanceRate: 17.7,
    tuitionInState: 17786,
    tuitionOutOfState: 57273,
    avgFinancialAid: 26000,
    medianStartingSalary: 88000,
    studentFacultyRatio: '15:1',
    graduationRate: 93,
    bannerColor: 'from-blue-900 to-amber-600',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=80',
    description: 'Celebrated for having one of the largest and most fiercely loyal alumni networks in the world, top-10 programs across 20+ disciplines, and unmatched campus spirit.',
    popularMajors: [
      'Computer Science & Engineering',
      'Ross School of Business (BBA)',
      'Biomedical Engineering',
      'Data Analytics & Statistics',
      'Neuroscience'
    ],
    facilities: [
      'North Campus Duderstadt Center',
      'Mcity Autonomous Vehicle Testing Facility',
      'Michigan Medicine hospital complexes',
      'Center for Entrepreneurship (CFE)'
    ],
    alumniOutcomes: {
      employmentRate90Days: 93,
      topEmployers: ['Google', 'Ford', 'Goldman Sachs', 'Deloitte', 'General Motors', 'Amazon'],
      avg5YearSalary: 138000
    },
    admissionRequirements: {
      gpaAverage: '3.90 Unweighted',
      satRange: '1380 - 1530',
      actRange: '31 - 34',
      applicationDeadlines: {
        earlyDecision: 'November 1 (Early Action)',
        regularDecision: 'February 1'
      },
      keyCriteria: [
        'Curricular breadth with rigorous AP/IB courses',
        'Strong community involvement and school leadership'
      ]
    },
    reviews: [
      {
        id: 'rev-um-1',
        authorName: 'Maya Thorne',
        gradYear: 'Class of 2025',
        major: 'BBA & Computer Science dual',
        rating: 4.9,
        verifiedStatus: true,
        verificationSource: 'Verified UMich .edu student',
        date: 'October 2, 2025',
        title: 'The alumni network opens doors in every major city on earth',
        comment: 'You can reach out to Michigan alumni anywhere on LinkedIn and they will reply within hours. Ann Arbor is the quintessential college town with amazing energy.',
        pros: ['Massive global alumni network', 'Exciting athletics and campus spirit', 'Top business and engineering combination'],
        cons: ['Out-of-state tuition is comparable to private universities'],
        ratingsBreakdown: { academics: 4.8, campusLife: 5.0, careerSupport: 4.9, roiValue: 4.5 }
      }
    ],
    tags: ['Huge Alumni Network', 'Top College Town', 'Dual Business & Tech', 'School Spirit']
  },
  {
    id: 'ut-austin',
    name: 'University of Texas at Austin',
    shortName: 'UT Austin',
    location: 'Austin, Texas',
    state: 'Texas',
    country: 'United States',
    campusType: 'Urban',
    ranking: 30,
    acceptanceRate: 18.0,
    tuitionInState: 11698,
    tuitionOutOfState: 41070,
    avgFinancialAid: 15500,
    medianStartingSalary: 86000,
    studentFacultyRatio: '18:1',
    graduationRate: 88,
    bannerColor: 'from-orange-800 to-amber-950',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    description: 'Located in the heart of "Silicon Hills" Austin tech boom, with elite Turing Scholars computer science honors and McCombs business school.',
    popularMajors: [
      'Turing Scholars CS Program',
      'Electrical & Computer Engineering',
      'McCombs BBA (Finance/MIS)',
      'Biomedical Engineering',
      'Advertising & Media Tech'
    ],
    facilities: [
      'Gates Dell Complex for Computer Science',
      'Texas Advanced Computing Center (TACC Frontera supercomputer)',
      'Engineering Education and Research Center (EERC)',
      'Longhorn Startup Lab'
    ],
    alumniOutcomes: {
      employmentRate90Days: 91,
      topEmployers: ['Dell Technologies', 'Tesla', 'Apple Austin', 'Meta', 'AMD', 'Oracle'],
      avg5YearSalary: 135000
    },
    admissionRequirements: {
      gpaAverage: '3.86 Unweighted',
      satRange: '1280 - 1510',
      actRange: '29 - 34',
      applicationDeadlines: {
        earlyDecision: 'November 1 (Priority Action)',
        regularDecision: 'December 1'
      },
      keyCriteria: [
        'Top 6% automatic Texas admission rule (major competitive review applies)',
        'Major-specific portfolio or demonstrated passion'
      ]
    },
    reviews: [
      {
        id: 'rev-ut-1',
        authorName: 'Carlos Ramirez',
        gradYear: 'Class of 2026',
        major: 'Electrical & Computer Engineering',
        rating: 4.8,
        verifiedStatus: true,
        verificationSource: 'Verified UT Austin .edu student',
        date: 'September 10, 2025',
        title: 'Austin tech boom is right outside your doorstep',
        comment: 'I can take the bus from campus straight to Dell or Apple for my internship. The city culture, live music, and startup events make it unbeatable.',
        pros: ['Silicon Hills location advantages', 'Supercomputer research access', 'Affordable in-state rates'],
        cons: ['Traffic in Austin', 'Competitive entry for top engineering majors'],
        ratingsBreakdown: { academics: 4.7, campusLife: 4.8, careerSupport: 4.8, roiValue: 4.9 }
      }
    ],
    tags: ['Silicon Hills', 'TACC Supercomputing', 'Vibrant Tech City', 'Low In-State Cost']
  },
  {
    id: 'purdue',
    name: 'Purdue University',
    shortName: 'Purdue',
    location: 'West Lafayette, Indiana',
    state: 'Indiana',
    country: 'United States',
    campusType: 'College Town',
    ranking: 43,
    acceptanceRate: 50.0,
    tuitionInState: 9992,
    tuitionOutOfState: 28794,
    avgFinancialAid: 12000,
    medianStartingSalary: 84000,
    studentFacultyRatio: '14:1',
    graduationRate: 83,
    bannerColor: 'from-amber-700 to-neutral-900',
    logo: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80',
    description: 'Renowned for freezing tuition for 13 consecutive years, offering exceptional value, and producing more astronauts and aviation engineers than almost any other university.',
    popularMajors: [
      'Aerospace & Aeronautical Engineering',
      'Computer Science',
      'Mechanical Engineering',
      'Data Mine Living Learning Community',
      'Semiconductor & Chip Engineering'
    ],
    facilities: [
      'Birck Nanotechnology Center & Cleanrooms',
      'Zucrow Laboratories for Aerospace Propulsion',
      'Lawson Computer Science Building',
      'The Data Mine Learning Community'
    ],
    alumniOutcomes: {
      employmentRate90Days: 92,
      topEmployers: ['Boeing', 'NASA', 'Rolls-Royce', 'Amazon', 'Intel', 'Eli Lilly'],
      avg5YearSalary: 128000
    },
    admissionRequirements: {
      gpaAverage: '3.75 Unweighted',
      satRange: '1210 - 1450',
      actRange: '27 - 34',
      applicationDeadlines: {
        earlyDecision: 'November 1 (Early Action - Highly Recommended for CS/Eng)',
        regularDecision: 'January 15'
      },
      keyCriteria: [
        'Rigorous STEM background and solid math trajectory',
        'Demonstrated hands-on engineering mindset'
      ]
    },
    reviews: [
      {
        id: 'rev-pur-1',
        authorName: 'Nadia Chowdhury',
        gradYear: 'Class of 2025',
        major: 'Aeronautics & Astronautics',
        rating: 4.7,
        verifiedStatus: true,
        verificationSource: 'Verified Purdue .edu student',
        date: 'October 19, 2025',
        title: 'Tuition freeze makes this one of the smartest financial choices in America',
        comment: 'Graduating with almost zero debt while getting offers from aerospace contractors and tech firms. The cleanrooms and wind tunnels here are second to none.',
        pros: ['Frozen tuition since 2012', 'Top-tier aerospace and mechanical labs', 'Strong midwestern community'],
        cons: ['West Lafayette is a quiet rural college town'],
        ratingsBreakdown: { academics: 4.8, campusLife: 4.0, careerSupport: 4.7, roiValue: 5.0 }
      }
    ],
    tags: ['Tuition Freeze Champion', 'Cradle of Astronauts', 'Aerospace Leader', 'Exceptional ROI']
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'course-dl-ai',
    title: 'Deep Learning & Modern AI Engineering Specialization',
    provider: 'DeepLearning.AI in partnership with Stanford Online',
    partnerBadge: 'Industry Accredited',
    level: 'Intermediate',
    duration: '8 Weeks (6 hrs/week)',
    isFree: false,
    price: 49,
    rating: 4.9,
    reviewCount: 3840,
    skillsGained: ['PyTorch', 'Transformer Architecture', 'LLM Fine-tuning', 'Vector Databases', 'Model Optimization'],
    syllabus: [
      { week: 1, title: 'Neural Networks and Deep Matrix Calculations', topics: ['Forward & Backpropagation', 'Activation Functions', 'Weight Initialization'] },
      { week: 2, title: 'Optimizing Deep Systems', topics: ['AdamW, RMSprop', 'Batch Normalization', 'Regularization & Dropout'] },
      { week: 3, title: 'Convolutional Vision & Spatial Models', topics: ['ResNets', 'Object Detection', 'Latent Diffusion Architectures'] },
      { week: 4, title: 'Attention & Transformers', topics: ['Self-Attention Mechanism', 'Transformer Encoders & Decoders', 'HuggingFace Ecosystem'] },
      { week: 5, title: 'RAG & Vector Embeddings', topics: ['Chroma/Pinecone integration', 'Chunking Strategies', 'Semantic Retrieval'] },
      { week: 6, title: 'Fine-Tuning Open Source LLMs', topics: ['LoRA / QLoRA', 'Instruction Tuning Datasets', 'Evaluation Metrics'] },
      { week: 7, title: 'Production Deployment & Quantization', topics: ['vLLM', 'ONNX Runtime', 'Latency Profiling & Caching'] },
      { week: 8, title: 'Capstone: End-to-End Multimodal Agent', topics: ['Agentic Workflows', 'Tool Calling', 'Live System Demo'] }
    ],
    practicalProject: {
      title: 'Autonomous Multimodal Research Agent',
      description: 'Build and deploy a full-stack AI research agent that queries live documents, synthesizes answers with citations, and exposes a high-throughput API.',
      deliverable: 'GitHub Repository + Live Streamlit/Next.js Demo + Benchmarking Report'
    },
    certification: {
      type: 'Verified Professional Certificate',
      accreditation: 'Stanford Online / DeepLearning.AI Credential'
    },
    recommendedForCareers: ['AI/ML Engineer', 'Research Scientist', 'Data Scientist', 'Robotics Software Engineer'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'course-fullstack-cloud',
    title: 'Full-Stack Modern Web & Cloud Architecture',
    provider: 'Meta Professional Education & AWS Training',
    partnerBadge: 'Industry Partner',
    level: 'Beginner',
    duration: '10 Weeks (5 hrs/week)',
    isFree: true,
    price: 0,
    rating: 4.8,
    reviewCount: 5210,
    skillsGained: ['TypeScript', 'React 19', 'Node.js & Express', 'PostgreSQL', 'Docker', 'AWS Lambda'],
    syllabus: [
      { week: 1, title: 'Modern JavaScript & TypeScript Rigor', topics: ['ESNext Features', 'Strict Typing', 'Async/Await Event Loop'] },
      { week: 2, title: 'React 19 Hooks & State Architecture', topics: ['Custom Hooks', 'Context & Stores', 'Performance Profiling'] },
      { week: 3, title: 'Tailwind CSS & Design Systems', topics: ['Utility-First CSS', 'Responsive Grid Systems', 'Dark Mode & Theming'] },
      { week: 4, title: 'RESTful & GraphQL API Design', topics: ['Express Middleware', 'Authentication & JWT', 'Schema Validation'] },
      { week: 5, title: 'Relational Database Engineering', topics: ['PostgreSQL', 'Indexing & Query Plans', 'Transactions & ORMs'] },
      { week: 6, title: 'Containerization & Docker', topics: ['Dockerfiles', 'Multi-stage Builds', 'Docker Compose'] },
      { week: 7, title: 'Cloud Infrastructure & Serverless', topics: ['AWS S3, EC2, Lambda', 'CI/CD Pipelines with GitHub Actions'] },
      { week: 8, title: 'System Security & OWASP Top 10', topics: ['CSRF/XSS Mitigation', 'Rate Limiting', 'Secret Management'] },
      { week: 9, title: 'Automated Testing & End-to-End Suite', topics: ['Vitest, Playwright', 'Test Coverage', 'Mocking APIs'] },
      { week: 10, title: 'Capstone: Scalable Collaborative Platform', topics: ['Real-time WebSockets', 'Production Cloud Run Deployment'] }
    ],
    practicalProject: {
      title: 'Real-time Collaborative Whiteboard & Workspace',
      description: 'Engineer a multi-user collaborative workspace with live WebSocket synchronization, persistent database backups, and automated CI/CD.',
      deliverable: 'Production Cloud Deployment URL with GitHub Source'
    },
    certification: {
      type: 'Open Source Certification',
      accreditation: 'Meta Authorized Skill Credential'
    },
    recommendedForCareers: ['Full-Stack Software Engineer', 'Frontend Engineer', 'Cloud Solutions Architect'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'course-aws-cloud',
    title: 'AWS Certified Cloud Solutions Architect Track',
    provider: 'Amazon Web Services Training & Certification',
    partnerBadge: 'Official AWS Certification Track',
    level: 'Intermediate',
    duration: '6 Weeks (5 hrs/week)',
    isFree: false,
    price: 39,
    rating: 4.85,
    reviewCount: 2940,
    skillsGained: ['AWS IAM & VPC', 'High Availability Architecture', 'Terraform', 'Microservices', 'Cost Optimization'],
    syllabus: [
      { week: 1, title: 'Cloud Foundation & Security IAM', topics: ['Least Privilege Roles', 'VPC Subnetting & Gateways'] },
      { week: 2, title: 'Compute & Auto-Scaling', topics: ['EC2, ECS, Fargate', 'Auto-Scaling Groups', 'Application Load Balancers'] },
      { week: 3, title: 'Storage & Database Architecture', topics: ['S3 Lifecycle Rules', 'Aurora Serverless', 'DynamoDB Partitioning'] },
      { week: 4, title: 'Infrastructure as Code with Terraform', topics: ['Declarative Config', 'State Management', 'Reusable Modules'] },
      { week: 5, title: 'Disaster Recovery & Multi-Region', topics: ['RTO/RPO Metrics', 'Route 53 Failover Routing', 'Cross-Region Replication'] },
      { week: 6, title: 'Practice Exams & Mock Scenarios', topics: ['Case Study Walkthroughs', 'Architectural Trade-offs'] }
    ],
    practicalProject: {
      title: 'Fault-Tolerant Multi-Tier Cloud Infrastructure',
      description: 'Provision a production-grade 3-tier VPC architecture with automated failover and Terraform scripts.',
      deliverable: 'Terraform Codebase + Architecture Diagram + Cost Analysis'
    },
    certification: {
      type: 'Industry Certification Voucher Included',
      accreditation: 'AWS Certified Solutions Architect Associate Prep'
    },
    recommendedForCareers: ['Cloud Solutions Architect', 'DevOps / Platform Engineer', 'Cybersecurity Specialist'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'course-biotech-data',
    title: 'Computational Biology & Genomics Data Science',
    provider: 'Harvard Online & Broad Institute',
    partnerBadge: 'Academic Research Partner',
    level: 'Intermediate',
    duration: '7 Weeks (6 hrs/week)',
    isFree: true,
    price: 0,
    rating: 4.9,
    reviewCount: 1670,
    skillsGained: ['BioPython', 'Genomic Variant Calling', 'CRISPR Target Modeling', 'R for Biostatistics', 'AlphaFold Analysis'],
    syllabus: [
      { week: 1, title: 'Molecular Biology for Coders', topics: ['Central Dogma', 'DNA Sequencing Technologies', 'FASTA/FASTQ Formats'] },
      { week: 2, title: 'Bioinformatics Algorithms in Python', topics: ['Sequence Alignment (Needleman-Wunsch)', 'BLAST Algorithms'] },
      { week: 3, title: 'Genomics Pipeline Engineering', topics: ['GATK Best Practices', 'VCF Variant Parsing', 'Mutation Analysis'] },
      { week: 4, title: 'Structural Biology & AlphaFold', topics: ['Protein 3D Coordinates (PDB)', 'AlphaFold2 Confidence Scores', 'PyMOL'] },
      { week: 5, title: 'Single-Cell RNA-Seq Analysis', topics: ['Seurat / Scanpy', 'Dimensionality Reduction (t-SNE/UMAP)', 'Cell Clustering'] },
      { week: 6, title: 'Machine Learning for Drug Discovery', topics: ['QSAR Models', 'Molecular Graph Neural Networks (GNNs)'] },
      { week: 7, title: 'Capstone: Cancer Mutation Biomarker Discovery', topics: ['TCGA Clinical Data Integration', 'Survival Analysis Modeling'] }
    ],
    practicalProject: {
      title: 'Automated Genomic Variant Classifier',
      description: 'Analyze real-world whole-exome sequencing data to classify benign vs pathogenic oncological mutations using supervised learning.',
      deliverable: 'Interactive Jupyter Notebook + Scientific Poster Summary'
    },
    certification: {
      type: 'Academic Micro-Credential',
      accreditation: 'HarvardX Verified Certificate'
    },
    recommendedForCareers: ['Bioinformatics Scientist', 'Biomedical Engineer', 'Health Informatics Specialist'],
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'course-uiux-systems',
    title: 'Human-Centered UI/UX Design & Product Strategy',
    provider: 'Figma Education & Nielsen Norman Group Fellow',
    partnerBadge: 'Design Excellence',
    level: 'Beginner',
    duration: '5 Weeks (4 hrs/week)',
    isFree: true,
    price: 0,
    rating: 4.88,
    reviewCount: 3120,
    skillsGained: ['Figma Variables & AutoLayout', 'Design Systems', 'Usability Testing', 'Wireframing', 'Accessibility (WCAG)'],
    syllabus: [
      { week: 1, title: 'Foundations of Human-Computer Interaction', topics: ['Affordances, Mental Models, Hick’s & Fitts’s Laws'] },
      { week: 2, title: 'Mastering Figma Components & AutoLayout', topics: ['Tokens, Variants, Responsive Constraints, Component Props'] },
      { week: 3, title: 'Conducting Qualitative Usability Tests', topics: ['User Interviews, Synthesizing Affinity Maps, Journey Mapping'] },
      { week: 4, title: 'Accessibility & Design System Governance', topics: ['Color Contrast Ratios, Screen Reader Semantics, Token Specs'] },
      { week: 5, title: 'Capstone: Mobile Health Experience Case Study', topics: ['Interactive High-Fidelity Prototype with Micro-interactions'] }
    ],
    practicalProject: {
      title: 'End-to-End Product Design Case Study',
      description: 'Conduct user research, synthesize insights, build a tokenized design system in Figma, and conduct 3 usability rounds.',
      deliverable: 'Behance / Notion Portfolio Case Study + Figma Link'
    },
    certification: {
      type: 'Design Portfolio Credential',
      accreditation: 'Figma Certified Creator Partner'
    },
    recommendedForCareers: ['UI/UX Product Designer', 'Product Manager', 'Frontend Engineer'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'course-quant-finance',
    title: 'Quantitative Finance & Algorithmic Trading Systems',
    provider: 'QuantConnect & Chicago Quantitative Institute',
    partnerBadge: 'FinTech Accredited',
    level: 'Advanced',
    duration: '8 Weeks (6 hrs/week)',
    isFree: false,
    price: 59,
    rating: 4.92,
    reviewCount: 1420,
    skillsGained: ['Python for Finance', 'Time Series Econometrics', 'Sharpe & Sortino Optimization', 'Backtesting Engine', 'Risk Hedging'],
    syllabus: [
      { week: 1, title: 'Financial Markets & Order Books', topics: ['Limit Order Books', 'Market Microstructure', 'Tick Data Handling'] },
      { week: 2, title: 'Time Series & Statistical Arbitrage', topics: ['Stationarity & Cointegration', 'Augmented Dickey-Fuller Test'] },
      { week: 3, title: 'Portfolio Theory & Mean-Variance Optimization', topics: ['Markowitz Efficient Frontier', 'Capital Asset Pricing Model (CAPM)'] },
      { week: 4, title: 'Factor Models & Risk Attribution', topics: ['Fama-French 5-Factor', 'Value at Risk (VaR)', 'Stress Testing'] },
      { week: 5, title: 'High-Performance Backtesting Engine', topics: ['Slippage, Transaction Costs, Lookahead Bias Prevention'] },
      { week: 6, title: 'Machine Learning for Alpha Generation', topics: ['Feature Engineering from Order Flow', 'XGBoost & LightGBM on L2 Data'] },
      { week: 7, title: 'Execution Algorithms', topics: ['TWAP, VWAP, Implementation Shortfall'] },
      { week: 8, title: 'Capstone: Live Paper Trading Strategy', topics: ['API Integration with Broker Sandbox', 'Performance Dashboard'] }
    ],
    practicalProject: {
      title: 'Statistical Arbitrage Pairs Trading Engine',
      description: 'Build a production backtested pairs-trading bot with cointegration testing, dynamic position sizing, and risk stops.',
      deliverable: 'Python Codebase + Teardown Performance Report'
    },
    certification: {
      type: 'FinTech Quantitative Credential',
      accreditation: 'CQI Certified Quantitative Associate'
    },
    recommendedForCareers: ['Quantitative Financial Analyst', 'Financial Tech Engineer', 'Data Scientist'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80'
  }
];

export const INTERNSHIPS_DATA: Internship[] = [
  {
    id: 'intern-google-step',
    title: 'STEP Software Engineering Intern (Summer 2027)',
    company: 'Google',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&auto=format&fit=crop&q=80',
    location: 'Mountain View, CA / New York, NY',
    workMode: 'Hybrid',
    type: 'Summer Internship',
    stipend: '$8,200 / month + Housing Stipend',
    duration: '12 Weeks (May – August)',
    deadline: 'December 1, 2026',
    description: 'Designed specifically for undergraduate first- and second-year students with a passion for computer science. Work on production systems with a dedicated mentor and build core features.',
    responsibilities: [
      'Collaborate on a software project with a team of Google engineers and STEP peers',
      'Design, test, deploy, and maintain software tools that power Google Search, Cloud, or Android',
      'Participate in professional development workshops and mentorship circles'
    ],
    requiredSkills: ['Python', 'Java or C++', 'Data Structures & Algorithms', 'Git'],
    preferredSkills: ['TypeScript', 'Linux Command Line', 'Cloud Fundamentals'],
    eligibility: ['Enrolled in a Bachelor’s degree in CS, Computer Engineering, or related STEM', 'Freshman or Sophomore standing'],
    matchedCareers: ['Software Engineer', 'AI/ML Engineer', 'Systems Architect'],
    spotsAvailable: 45
  },
  {
    id: 'intern-tesla-vision',
    title: 'Autopilot & Robotics Vision Fellow',
    company: 'Tesla',
    companyLogo: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=120&auto=format&fit=crop&q=80',
    location: 'Palo Alto, CA / Austin, TX',
    workMode: 'On-site',
    type: 'Summer Internship',
    stipend: '$8,600 / month + Relocation',
    duration: '14 Weeks (June – September)',
    deadline: 'January 15, 2027',
    description: 'Join the Tesla Autopilot neural network team developing real-time computer vision models that run in-car on custom silicon to navigate complex edge cases.',
    responsibilities: [
      'Train and profile computer vision models for 3D occupancy and trajectory prediction',
      'Analyze failure modes from fleet telemetry and curate training datasets',
      'Optimize tensor kernels for low-latency inference on Tesla FSD Computer'
    ],
    requiredSkills: ['Python', 'PyTorch', 'Computer Vision', 'Linear Algebra & Calculus'],
    preferredSkills: ['C++', 'CUDA', 'Transformer Architectures', 'ROS2'],
    eligibility: ['Undergraduate junior, senior, or Master’s student in CS, Robotics, or EE', 'Demonstrated deep learning project portfolio'],
    matchedCareers: ['AI/ML Engineer', 'Robotics Software Engineer', 'Research Scientist'],
    spotsAvailable: 12
  },
  {
    id: 'intern-stripe-frontend',
    title: 'Frontend Product Engineering Intern',
    company: 'Stripe',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA / Seattle, WA (Remote Option)',
    workMode: 'Hybrid',
    type: 'Summer Internship',
    stipend: '$8,400 / month + $9k Housing Allowance',
    duration: '12 Weeks',
    deadline: 'December 15, 2026',
    description: 'Help build Stripe Dashboard interfaces and checkout experiences used by millions of businesses around the globe. High emphasis on design polish, latency, and accessibility.',
    responsibilities: [
      'Write modular, well-tested TypeScript and React components',
      'Partner closely with product designers to implement pixel-perfect micro-interactions',
      'Improve frontend performance, bundle size, and telemetry monitoring'
    ],
    requiredSkills: ['TypeScript', 'React', 'CSS Architecture & Design Systems', 'Web Fundamentals'],
    preferredSkills: ['Next.js', 'GraphQL', 'Accessibility Standards', 'Figma'],
    eligibility: ['Currently pursuing a degree in CS, Software Engineering, or Design Tech', 'Graduating in 2027 or 2028'],
    matchedCareers: ['Full-Stack Software Engineer', 'UI/UX Product Designer', 'Frontend Engineer'],
    spotsAvailable: 18
  },
  {
    id: 'intern-genentech-bio',
    title: 'Computational Biology & Oncology Co-op',
    company: 'Genentech (Roche Group)',
    companyLogo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=120&auto=format&fit=crop&q=80',
    location: 'South San Francisco, CA',
    workMode: 'Hybrid',
    type: 'Fall Co-op',
    stipend: '$7,200 / month',
    duration: '6 Months (July – December)',
    deadline: 'February 1, 2027',
    description: 'Work alongside oncology research teams to analyze single-cell RNA sequencing datasets and identify novel therapeutic drug targets.',
    responsibilities: [
      'Develop bioinformatics data pipelines for high-throughput genomic assays',
      'Apply dimensionality reduction and statistical models to distinguish tumor microenvironments',
      'Present findings to cross-functional biologists and computational chemists'
    ],
    requiredSkills: ['Python or R', 'Biostatistics', 'Data Visualization', 'Genomics Basics'],
    preferredSkills: ['Scanpy / Seurat', 'Machine Learning', 'Linux / Bash'],
    eligibility: ['Undergraduate with coursework in molecular biology, bioinformatics, or data science'],
    matchedCareers: ['Bioinformatics Scientist', 'Biomedical Engineer', 'Data Scientist'],
    spotsAvailable: 8
  },
  {
    id: 'intern-goldman-quant',
    title: 'Quantitative Strategy Summer Analyst',
    company: 'Goldman Sachs',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
    location: 'New York, NY',
    workMode: 'On-site',
    type: 'Summer Internship',
    stipend: '$8,750 / month',
    duration: '10 Weeks',
    deadline: 'November 20, 2026',
    description: 'Work with the Strats team developing quantitative mathematical models to price complex financial derivatives, manage portfolio risk, and build automated execution strategies.',
    responsibilities: [
      'Model market risk and financial instruments using statistical tools',
      'Optimize trading algorithms and evaluate execution benchmarks',
      'Collaborate with traders to structure data-driven hedging solutions'
    ],
    requiredSkills: ['Python or C++', 'Probability & Statistics', 'Calculus', 'Algorithmic Problem Solving'],
    preferredSkills: ['Financial Modeling', 'Stochastic Calculus', 'SQL'],
    eligibility: ['Pursuing Bachelor’s or Master’s in Math, CS, Physics, Financial Engineering, or Economics'],
    matchedCareers: ['Quantitative Financial Analyst', 'Financial Tech Engineer', 'Data Scientist'],
    spotsAvailable: 15
  }
];

export const DEMO_USERS: Record<string, UserProfile> = {
  alex: {
    id: 'user_alex',
    name: 'Alex Chen',
    email: 'alex.chen@highschool.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    educationLevel: 'High School Senior',
    currentSchool: 'Oakridge STEM Academy',
    gpa: '3.94',
    budgetPerYear: 50000,
    targetLocations: ['California', 'Massachusetts', 'Pennsylvania', 'Washington'],
    interests: ['Artificial Intelligence', 'Robotics', 'Game Systems', 'Algorithmic Puzzles'],
    skills: ['Python', 'Data Structures & Algorithms', 'Git', 'Linear Algebra & Calculus', 'React'],
    savedCollegeIds: ['stanford', 'cmu', 'uc-berkeley'],
    enrolledCourseIds: ['course-dl-ai', 'course-fullstack-cloud'],
    courseProgress: {
      'course-dl-ai': 45,
      'course-fullstack-cloud': 80
    },
    completedProjectIds: ['Full-Stack Modern Web & Cloud Architecture'],
    internshipApplications: [
      {
        id: 'app-1',
        jobId: 'intern-google-step',
        appliedDate: '2026-10-15',
        status: 'Under Review',
        coverNote: 'Excited to apply my open-source full-stack experience to STEP infrastructure!'
      }
    ],
    isPro: true,
    proTier: 'pro_student',
    assessmentResult: {
      id: 'res_alex_1',
      completedAt: '2026-10-24T18:30:00Z',
      archetype: 'The Systems Architect & Frontier Builder',
      archetypeTagline: 'Translating complex theoretical logic into high-impact, autonomous physical and digital systems.',
      summary: 'Alex demonstrates an extraordinary blend of curiosity-driven problem solving and hands-on engineering craft. You thrive when given large, ambiguous systems that you can deconstruct into clean, modular components. Your natural work rhythm balances deep, uninterrupted focus blocks with high-leverage peer design reviews.',
      corePassions: [
        'Building interactive code, robotic prototypes, and automated systems',
        'Deconstructing how autonomous algorithms work under the hood',
        'Tinkering with hardware-software interfaces and performance optimization'
      ],
      curiosityDrivers: [
        'Fascinated by how neural networks learn and make autonomous decisions',
        'Energized by turning abstract mathematics into physical motion and real-time responses'
      ],
      problemsToSolve: [
        'Creating intelligent software infrastructure that empowers millions of builders',
        'Designing autonomous perception systems for vehicles and search-and-rescue robotics'
      ],
      thinkingStyle: {
        approach: 'Structured Logic with Rapid Prototyping',
        flexiblePreferences: [
          'Prefers concrete proof-of-concept demos over purely theoretical debate',
          'Thrives during deep solo building sessions interspersed with focused peer reviews',
          'Driven by technical craftsmanship, first-principles logic, and demonstrable leverage'
        ],
        collaborationVibe: 'Autonomous Deep Focus with High-Signal Peer Reviews',
        description: 'You naturally think in modular architectures. You prefer understanding the root mechanics before designing, then building tactile prototypes to validate assumptions.'
      },
      careerClarity: {
        status: 'Refining Specific Ambition',
        existingAmbitions: 'AI / Machine Learning Systems & Autonomous Robotics',
        counselorValidation: 'Your passion for building systems and computational thinking directly validates your target career in AI and robotics software engineering. Rather than generic career pivots, your focus should be on building 2 portfolio-grade neural network deployments and preparing for undergraduate research.'
      },
      riasecScores: {
        realistic: 78,
        investigative: 92,
        artistic: 48,
        social: 55,
        enterprising: 68,
        conventional: 70
      },
      workStyle: {
        introversionExtroversionLabel: 'Focused Ambivert (Deep Builder)',
        introversionExtroversionScore: 38,
        collaborationPreference: 'Autonomous deep sprints followed by structured peer review syncs',
        environmentType: 'Frontier AI & Robotics labs with high technical autonomy',
        problemSolvingApproach: 'First-principles logic combined with empirical prototyping'
      },
      learningStyle: {
        primaryStyle: 'Kinesthetic Systems Builder',
        description: 'You assimilate concepts fastest when writing live code, running benchmarks, and dissecting working reference architectures.',
        recommendedFormat: 'Hands-on project repos, interactive sandboxes, and competitive hackathons'
      },
      strengths: [
        'Algorithmic systems thinking & root-cause debugging',
        'Sustained deep focus during complex architectural design',
        'Speed of acquiring new technical frameworks and APIs',
        'Quantitative modeling of performance tradeoffs'
      ],
      growthAreas: [
        'Translating deeply technical solutions to non-technical business stakeholders',
        'Balancing ideal architectural perfectionism with speed to market'
      ],
      recommendedCareers: [
        {
          id: 'c-ai-eng',
          title: 'AI / Machine Learning Systems Engineer',
          matchScore: 96,
          industry: 'Artificial Intelligence & Robotics',
          salaryRange: '$140,000 – $225,000',
          growthOutlook: '+38% growth over next 5 years (Exceptional)',
          automationResilience: 'Very High',
          description: 'Architect, optimize, and deploy neural network pipelines, foundational model inference engines, and autonomous decision systems.',
          keySkills: ['PyTorch', 'Transformer Architectures', 'CUDA / GPU Optimization', 'Distributed Systems', 'Python'],
          dayInTheLife: 'Profiles latency bottlenecks in a transformer inference engine, runs distributed training checkpoints on 64 GPUs, and collaborates with product leads to test agentic reasoning.',
          whyItFitsWhatYouLove: 'Directly channels your voluntary passion for understanding how intelligence works under the hood, allowing you to build autonomous models that operate at planetary scale.',
          practicalSimulation: {
            title: 'Build a Micro-Transformer from Scratch',
            description: 'Implement a minimal attention mechanism in Python and train it to generate Shakespearean text or solve arithmetic.',
            tryItThisWeekend: 'Follow Andrej Karpathy’s "nanoGPT" repo: build, train on a free Google Colab GPU, and observe token probabilities in 3 hours.'
          }
        },
        {
          id: 'c-soft-eng',
          title: 'Systems & Infrastructure Software Engineer',
          matchScore: 92,
          industry: 'Cloud Infrastructure & High-Performance Computing',
          salaryRange: '$130,000 – $210,000',
          growthOutlook: '+25% growth over next 5 years (High)',
          automationResilience: 'High',
          description: 'Design fault-tolerant distributed databases, low-latency microservices, and large-scale cloud networking backbones.',
          keySkills: ['Go / Rust / C++', 'Distributed Consensus (Raft/Paxos)', 'Kubernetes', 'Linux Kernels', 'Networking'],
          dayInTheLife: 'Simulates network partition recovery in a distributed cache cluster, drafts an architectural RFC, and benchmarks query latency.',
          whyItFitsWhatYouLove: 'Feeds your love of modular deconstruction, high performance, and crafting rock-solid tools that millions of other developers rely on.',
          practicalSimulation: {
            title: 'Design an In-Memory Key-Value Store',
            description: 'Write a concurrent key-value store in Go or Rust with TTL eviction and benchmark its read/write latency under heavy load.',
            tryItThisWeekend: 'Build a mini-Redis clone with basic GET/SET/DEL commands and test concurrent thread-safety using Go channels.'
          }
        },
        {
          id: 'c-robotics',
          title: 'Autonomous Robotics Software Engineer',
          matchScore: 88,
          industry: 'Autonomous Vehicles & Industrial Automation',
          salaryRange: '$135,000 – $215,000',
          growthOutlook: '+30% growth over next 5 years (Very High)',
          automationResilience: 'Very High',
          description: 'Develop computer vision perception, sensor fusion (LiDAR/Radar), and trajectory planning algorithms for mobile robots.',
          keySkills: ['C++', 'ROS2', 'SLAM & Kalman Filtering', 'Point Cloud Processing', 'Control Systems'],
          dayInTheLife: 'Tests obstacle avoidance on physical robot testbeds in the warehouse, tunes occupancy grid maps, and runs hardware-in-the-loop tests.',
          whyItFitsWhatYouLove: 'Connects software logic directly to the physical world, fulfilling your drive to create machines that perceive, reason, and navigate real space.',
          practicalSimulation: {
            title: 'Simulate Robot Navigation in WebGL/ROS',
            description: 'Set up an autonomous turtlebot in a simulated 2D maze using A* pathfinding to reach targets while evading dynamic obstacles.',
            tryItThisWeekend: 'Open the browser-based Webots robot simulator or Python Pygame to code a basic obstacle-avoiding LiDAR agent.'
          }
        }
      ],
      recommendedMajors: [
        {
          id: 'm-cs-ai',
          name: 'Computer Science with AI / Systems Concentration',
          degreeType: 'B.S. in Computer Science',
          matchReason: 'Direct alignment with your highest Investigative and Realistic cognitive scores and software aptitude.',
          targetColleges: ['Stanford University', 'Carnegie Mellon University', 'MIT', 'UC Berkeley'],
          careerAlignment: ['AI/ML Engineer', 'Systems Architect', 'Software Engineer']
        },
        {
          id: 'm-eecs',
          name: 'Electrical Engineering & Computer Sciences (EECS)',
          degreeType: 'B.S. in EECS',
          matchReason: 'Bridges hardware, robotics sensors, and high-performance low-level systems software.',
          targetColleges: ['UC Berkeley', 'MIT', 'Georgia Tech', 'Purdue'],
          careerAlignment: ['Robotics Engineer', 'Autonomous Systems Lead', 'Embedded Hardware Architect']
        }
      ]
    }
  },
  priya: {
    id: 'user_priya',
    name: 'Priya Patel',
    email: 'priya.patel@college.edu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    educationLevel: 'College Freshman',
    currentSchool: 'Midwest State University',
    gpa: '3.88',
    budgetPerYear: 35000,
    targetLocations: ['New York', 'Illinois', 'Georgia', 'Texas'],
    interests: ['FinTech', 'Data Analytics', 'Quantitative Trading', 'Economics'],
    skills: ['Python', 'SQL', 'Excel Financial Modeling', 'Statistics', 'Tableau'],
    savedCollegeIds: ['umich', 'ut-austin', 'georgia-tech'],
    enrolledCourseIds: ['course-quant-finance', 'course-fullstack-cloud'],
    courseProgress: {
      'course-quant-finance': 30,
      'course-fullstack-cloud': 60
    },
    completedProjectIds: [],
    internshipApplications: [
      {
        id: 'app-2',
        jobId: 'intern-goldman-quant',
        appliedDate: '2026-10-18',
        status: 'Submitted',
        coverNote: 'Passionate about algorithmic factor research and econometric modeling.'
      }
    ],
    isPro: false,
    proTier: 'free'
  }
};
