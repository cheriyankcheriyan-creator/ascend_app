import { AssessmentQuestion, College, Course, Internship, UserProfile } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1',
    stage: 'hobbies_activities',
    category: 'Interests & Passions',
    question: 'What activities or hobbies do you naturally find yourself doing simply because you enjoy them?',
    subtitle: 'Think about what you do in your free time without anyone grading, judging, or asking you to do it.',
    isMultiSelect: true,
    maxSelect: 3,
    allowCustomInput: true,
    customInputPlaceholder: 'Or describe in your own words what you genuinely love doing...',
    allowSkip: true,
    options: [
      {
        label: 'Creative arts, visual design, sketching, photography, or music',
        description: 'Expressing ideas through aesthetics, storytelling, instruments, or visual media',
        value: 'creative_arts',
        domain: 'Arts & Design',
        tags: ['Design', 'Fine Arts', 'Music']
      },
      {
        label: 'Reading deep articles, exploring history, writing stories, or journaling',
        description: 'Immersing in narratives, examining past civilizations, and articulating thoughts',
        value: 'reading_humanities',
        domain: 'Humanities & Literature',
        tags: ['Literature', 'History', 'Philosophy']
      },
      {
        label: 'Observing nature, caring for animals, gardening, or outdoor exploration',
        description: 'Connecting with the living environment, ecology, wildlife, and natural biology',
        value: 'nature_wildlife',
        domain: 'Biological & Environmental Sciences',
        tags: ['Biology', 'Ecology', 'Outdoors']
      },
      {
        label: 'Cooking, baking, crafting, mechanics, or woodworking hands-on',
        description: 'Working with physical ingredients, tools, materials, and creating tangible results',
        value: 'crafts_culinary_mechanics',
        domain: 'Practical Crafts & Culinary',
        tags: ['Culinary Arts', 'Craftsmanship', 'Mechanics']
      },
      {
        label: 'Organizing events, student clubs, volunteer drives, or social campaigns',
        description: 'Bringing people together around a shared cause, coordinating logistics, and leading',
        value: 'community_leadership',
        domain: 'Public Service & Leadership',
        tags: ['Leadership', 'Advocacy', 'Community']
      },
      {
        label: 'Building projects with software, electronics, robotics, or math puzzles',
        description: 'Tinkering with logic, experimenting with computing, and seeing systems function',
        value: 'computing_electronics',
        domain: 'Technology & Engineering',
        tags: ['Computing', 'Robotics', 'Mathematics']
      }
    ]
  },
  {
    id: 'q2',
    stage: 'hobbies_activities',
    category: 'Curiosity Exploration',
    question: 'When you voluntarily deep-dive into articles, podcasts, or videos, which topic captures your attention first?',
    subtitle: 'Think about the rabbit holes you willingly fall down during late-night curiosity searches.',
    allowCustomInput: true,
    customInputPlaceholder: 'What specific topics or questions do you find yourself researching?',
    allowSkip: true,
    options: [
      {
        label: 'Human psychology, why people make decisions, and interpersonal relationships',
        description: 'Understanding emotions, cognitive biases, mental wellness, and human behavior',
        value: 'psychology_behavior',
        domain: 'Psychology & Behavioral Science',
        tags: ['Psychology', 'Counseling', 'Human Behavior']
      },
      {
        label: 'Breakthrough medical discoveries, human physiology, and healthcare',
        description: 'How the human body functions, combats disease, and how medicines are discovered',
        value: 'medicine_physiology',
        domain: 'Medicine & Healthcare',
        tags: ['Healthcare', 'Medicine', 'Biomedical']
      },
      {
        label: 'Inspiring architecture, interior design, fashion styling, and urban spaces',
        description: 'How physical spaces, buildings, and aesthetic environments shape human lives',
        value: 'architecture_spaces',
        domain: 'Architecture & Spatial Design',
        tags: ['Architecture', 'Urban Planning', 'Fashion']
      },
      {
        label: 'How economies function, stock markets, innovative businesses, and entrepreneurship',
        description: 'Commercial ventures, financial independence, global trade, and strategic businesses',
        value: 'business_economics',
        domain: 'Business & Finance',
        tags: ['Finance', 'Economics', 'Venture']
      },
      {
        label: 'Legal cases, ethical dilemmas, politics, investigative journalism, and human rights',
        description: 'Examining justice, societal fairness, constitutional law, and investigative reporting',
        value: 'law_justice_journalism',
        domain: 'Law, Policy & Journalism',
        tags: ['Law', 'Public Policy', 'Journalism']
      },
      {
        label: 'The cosmos, physics, geology, or evolutionary biology mysteries',
        description: 'First-principles physics, astrophysical marvels, and scientific inquiries into existence',
        value: 'fundamental_sciences',
        domain: 'Physical & Natural Sciences',
        tags: ['Physics', 'Astronomy', 'Earth Sciences']
      }
    ]
  },
  {
    id: 'q3',
    stage: 'hobbies_activities',
    category: 'Flow State & Focus',
    question: 'Think about times when hours flew by without you noticing. What kind of activity were you engaged in?',
    subtitle: 'Your personal "zone of flow" is a powerful indicator of authentic vocational fulfillment.',
    allowCustomInput: true,
    customInputPlaceholder: 'Describe the activity where you completely lose track of time...',
    allowSkip: true,
    options: [
      {
        label: 'Writing an essay, creative story, speech, or articulating complex thoughts in words',
        description: 'Sculpting language, refining tone, and crafting compelling narratives',
        value: 'flow_writing',
        domain: 'Communication & Literature',
        tags: ['Writing', 'Storytelling', 'Communication']
      },
      {
        label: 'Drawing, illustrating, editing video/audio, or arranging visual layouts',
        description: 'Absorbed in visual rhythm, color palettes, typography, and aesthetic balance',
        value: 'flow_design',
        domain: 'Visual Arts & Media',
        tags: ['Visual Art', 'Media Production', 'Creative Flow']
      },
      {
        label: 'Listening to a friend work through a tough problem or mentoring a younger student',
        description: 'Deep empathetic presence, clarifying perspectives, and guiding someone forward',
        value: 'flow_mentoring',
        domain: 'Education & Counseling',
        tags: ['Mentorship', 'Empathy', 'Education']
      },
      {
        label: 'Tinkering with physical parts, repairing broken items, or assembling craft pieces',
        description: 'Tactile problem-solving, understanding mechanical tolerance, and physical construction',
        value: 'flow_tinkering',
        domain: 'Skilled Trades & Mechanics',
        tags: ['Craftsmanship', 'Repair', 'Hands-on']
      },
      {
        label: 'Conducting an experiment, analyzing dataset tables, or solving mathematical riddles',
        description: 'Methodical deduction, finding hidden correlations, and arriving at proof',
        value: 'flow_analytical',
        domain: 'Data & Mathematical Rigor',
        tags: ['Data Analysis', 'Mathematics', 'Scientific Inquiry']
      },
      {
        label: 'Planning a group event, structuring budgets, or negotiating a fair agreement',
        description: 'Strategic orchestration, timeline management, and goal accomplishment',
        value: 'flow_strategy',
        domain: 'Project Management & Strategy',
        tags: ['Coordination', 'Strategy', 'Planning']
      }
    ]
  },
  {
    id: 'q4',
    stage: 'academic_learning',
    category: 'Academic Preferences',
    question: 'Which school subjects or academic areas have you enjoyed most (or wished you could study deeper)?',
    subtitle: 'Select up to 3 fields that stimulate your intellect, even if they aren’t your easiest classes.',
    isMultiSelect: true,
    maxSelect: 3,
    allowCustomInput: true,
    customInputPlaceholder: 'Tell us which specific academic disciplines fascinate you...',
    allowSkip: true,
    options: [
      {
        label: 'Literature, Creative Writing, Languages, or World History',
        description: 'Human stories, linguistics, philosophical ideas, and cultural heritage',
        value: 'subj_humanities',
        domain: 'Humanities & Social Sciences',
        tags: ['Literature', 'Languages', 'History']
      },
      {
        label: 'Biology, Anatomy, Health Sciences, or Chemistry',
        description: 'Living organisms, cellular mechanisms, pharmacological chemistry, and healthcare',
        value: 'subj_biomedical',
        domain: 'Life Sciences & Medicine',
        tags: ['Biology', 'Chemistry', 'Anatomy']
      },
      {
        label: 'Fine Arts, Graphic Design, Film, or Theater Arts',
        description: 'Aesthetic creation, performance, visual storytelling, and cinematic arts',
        value: 'subj_arts_media',
        domain: 'Creative Arts & Performing Media',
        tags: ['Fine Arts', 'Film', 'Theater']
      },
      {
        label: 'Business Studies, Accounting, Economics, or Entrepreneurship',
        description: 'Commerce, financial balance sheets, market dynamics, and organizational leadership',
        value: 'subj_commerce',
        domain: 'Business & Economics',
        tags: ['Economics', 'Accounting', 'Commerce']
      },
      {
        label: 'Mathematics, Physics, Engineering, or Computer Science',
        description: 'Formal logic, calculus, physical mechanics, and quantitative computation',
        value: 'subj_stem_physical',
        domain: 'STEM & Physical Sciences',
        tags: ['Physics', 'Mathematics', 'Engineering']
      },
      {
        label: 'Environmental Science, Agriculture, Earth Systems, or Geography',
        description: 'Planetary ecosystems, sustainable agriculture, climate geography, and conservation',
        value: 'subj_environmental',
        domain: 'Environmental Science & Agriculture',
        tags: ['Ecology', 'Earth Science', 'Sustainability']
      }
    ]
  },
  {
    id: 'q5',
    stage: 'academic_learning',
    category: 'Cognitive Learning Mode',
    question: 'How do complex concepts or new ideas click most easily in your mind?',
    subtitle: 'Understanding your individual cognitive processing style.',
    allowCustomInput: true,
    customInputPlaceholder: 'How do you learn best when tackling difficult material?',
    allowSkip: false,
    options: [
      {
        label: 'Through compelling real-world stories, human biographies, and contextual case studies',
        description: 'You understand ideas best when anchored in real people, motivations, and historical context',
        value: 'mode_narrative',
        domain: 'Contextual & Narrative',
        tags: ['Case Studies', 'Storytelling']
      },
      {
        label: 'Through hands-on trial-and-error, tactile experimentation, and building models',
        description: 'You need to physically test, touch, or assemble something to truly grasp the mechanics',
        value: 'mode_kinesthetic',
        domain: 'Kinesthetic & Experimental',
        tags: ['Hands-on', 'Physical Prototyping']
      },
      {
        label: 'Through visual diagrams, flowcharts, infographics, and spatial maps',
        description: 'You see relationships visually and organize thoughts through spatial clarity',
        value: 'mode_visual',
        domain: 'Visual & Spatial',
        tags: ['Visual Learning', 'Mind-mapping']
      },
      {
        label: 'Through formal step-by-step logic, mathematical formulas, and rigorous deductions',
        description: 'You appreciate objective proof, systematic axioms, and unambiguous definitions',
        value: 'mode_analytical',
        domain: 'Analytical & Deductive',
        tags: ['Formal Logic', 'Systematic Deduction']
      },
      {
        label: 'Through interactive discussions, lively debates, and questioning assumptions with peers',
        description: 'Your best insights emerge in dialogue, hearing opposing perspectives, and defending ideas',
        value: 'mode_dialogic',
        domain: 'Social & Collaborative',
        tags: ['Discussion', 'Debate', 'Dialectic']
      }
    ]
  },
  {
    id: 'q6',
    stage: 'creativity_arts',
    category: 'Creative Expression',
    question: 'How do you most naturally express your imagination and creative voice?',
    subtitle: 'Creativity exists across all disciplines, from media and design to innovation.',
    allowCustomInput: true,
    customInputPlaceholder: 'What creative outlets or mediums feel most natural to you?',
    allowSkip: true,
    options: [
      {
        label: 'Visual aesthetics: Photography, digital illustration, graphic design, fashion, or styling',
        description: 'Curating mood boards, visual composition, spatial balance, and aesthetic identity',
        value: 'creative_visual',
        domain: 'Visual Design & Aesthetics',
        tags: ['Visual Design', 'Photography', 'Styling']
      },
      {
        label: 'Written language: Fiction, investigative articles, poetry, podcast scripts, or essays',
        description: 'Capturing nuance, expressing internal emotions, and communicating stories vividly',
        value: 'creative_writing',
        domain: 'Writing & Literary Arts',
        tags: ['Creative Writing', 'Journalism', 'Podcasting']
      },
      {
        label: 'Auditory and physical performance: Music, singing, theater, dance, or public speaking',
        description: 'Embodied presence, expressive timing, sonic harmony, and audience connection',
        value: 'creative_performance',
        domain: 'Performing Arts & Music',
        tags: ['Music', 'Theater', 'Public Speaking']
      },
      {
        label: 'Spatial and environmental design: Architecture, landscape layouts, or physical spaces',
        description: 'Shaping physical environments, interior balance, and architectural atmosphere',
        value: 'creative_spatial',
        domain: 'Architecture & Spatial Design',
        tags: ['Architecture', 'Interior Design', 'Environment']
      },
      {
        label: 'Conceptual innovation: Inventing new business ideas, social campaigns, or novel services',
        description: 'Connecting unexpected dots to envision better ways people can live, work, and collaborate',
        value: 'creative_venture',
        domain: 'Entrepreneurial Innovation',
        tags: ['Innovation', 'Campaigns', 'Venture Design']
      }
    ]
  },
  {
    id: 'q7',
    stage: 'people_society',
    category: 'Human Relationships',
    question: 'In social groups, teams, or communities, which role feels most genuine and energizing to you?',
    subtitle: 'How you naturally connect and contribute among people.',
    options: [
      {
        label: 'The empathetic listener and counselor: People naturally confide in you for guidance',
        description: 'Creating a safe emotional space, validating feelings, and offering thoughtful personal counsel',
        value: 'role_counselor',
        domain: 'Psychology & Counseling',
        tags: ['Counseling', 'Empathy', 'Listening']
      },
      {
        label: 'The inspiring leader or facilitator: You rally people around a common vision and purpose',
        description: 'Articulating goals, motivating team members, assigning roles, and keeping energy high',
        value: 'role_facilitator',
        domain: 'Leadership & Management',
        tags: ['Leadership', 'Team Building']
      },
      {
        label: 'The educator or explainer: You love breaking down hard ideas so anyone can understand',
        description: 'Patience, clear communication, illuminating complex concepts, and encouraging growth',
        value: 'role_educator',
        domain: 'Education & Pedagogy',
        tags: ['Teaching', 'Mentorship', 'Education']
      },
      {
        label: 'The perceptive observer: You study social dynamics, group motives, and cultural trends',
        description: 'Observing unspoken body language, interpersonal undercurrents, and sociological trends',
        value: 'role_observer',
        domain: 'Sociology & Anthropology',
        tags: ['Observation', 'Sociology', 'Culture']
      },
      {
        label: 'The dedicated individual contributor: You collaborate best with high mutual autonomy',
        description: 'Reliable, thoughtful peer who delivers excellent craft without needing micromanagement',
        value: 'role_autonomous_craft',
        domain: 'Independent Craft',
        tags: ['Autonomy', 'Focus', 'Reliability']
      }
    ]
  },
  {
    id: 'q8',
    stage: 'people_society',
    category: 'Societal Mission',
    question: 'Which societal mission or community challenge stirs the strongest desire in you to contribute?',
    subtitle: 'What kind of difference in the world would give your life deep meaning?',
    allowCustomInput: true,
    customInputPlaceholder: 'What specific human or global problem do you care most about?',
    allowSkip: true,
    options: [
      {
        label: 'Healing illness, mental health advocacy, and expanding accessible healthcare for all',
        description: 'Curing disease, supporting mental resilience, and serving vulnerable patients',
        value: 'mission_health_wellness',
        domain: 'Healthcare & Wellness',
        tags: ['Healthcare', 'Mental Health', 'Public Health']
      },
      {
        label: 'Defending human rights, equal legal justice, civic transparency, and ethical governance',
        description: 'Protecting the marginalized, upholding civil liberties, and reforming legal systems',
        value: 'mission_law_justice',
        domain: 'Law & Human Rights',
        tags: ['Civil Rights', 'Legal Justice', 'Policy']
      },
      {
        label: 'Protecting wild ecosystems, oceans, endangered wildlife, and reversing climate degradation',
        description: 'Ecological conservation, biodiversity defense, renewable energy, and sustainable stewardship',
        value: 'mission_conservation_climate',
        domain: 'Ecology & Environmental Protection',
        tags: ['Conservation', 'Climate Action', 'Wildlife']
      },
      {
        label: 'Transforming education, coaching the next generation, and closing the opportunity gap',
        description: 'Unlocking human potential through inspiring schools, mentorship, and youth empowerment',
        value: 'mission_education_youth',
        domain: 'Education & Community Uplift',
        tags: ['Education', 'Youth Development', 'Opportunity']
      },
      {
        label: 'Enriching cultural life through community arts, independent journalism, and storytelling',
        description: 'Preserving historical memory, holding institutions accountable, and inspiring imagination',
        value: 'mission_arts_journalism',
        domain: 'Arts, Culture & Journalism',
        tags: ['Journalism', 'Culture', 'Free Expression']
      },
      {
        label: 'Spurring economic opportunity, ethical enterprise, and sustainable local businesses',
        description: 'Creating jobs, fostering financial literacy, and building resilient economic infrastructure',
        value: 'mission_economic_enterprise',
        domain: 'Economic Development',
        tags: ['Economics', 'Enterprise', 'Financial Literacy']
      }
    ]
  },
  {
    id: 'q9',
    stage: 'business_ventures',
    category: 'Commercial Curiosity',
    question: 'What aspect of commerce, organizations, or business enterprise interests you most?',
    subtitle: 'Exploring how you relate to economic activity and markets.',
    allowCustomInput: true,
    customInputPlaceholder: 'Tell us how you view business, startups, or financial markets...',
    allowSkip: true,
    options: [
      {
        label: 'Building and launching an independent venture, studio, clinic, or brand from scratch',
        description: 'Entrepreneurial independence, taking measured risks, and shaping an organization',
        value: 'biz_entrepreneurship',
        domain: 'Entrepreneurship & Venture',
        tags: ['Startups', 'Venture Creation', 'Independence']
      },
      {
        label: 'Understanding consumer psychology, branding, advertising, and cultural storytelling',
        description: 'Why people buy, how brand identities resonate, and crafting persuasive communications',
        value: 'biz_marketing_branding',
        domain: 'Marketing & Brand Strategy',
        tags: ['Marketing', 'Consumer Psychology', 'Branding']
      },
      {
        label: 'Financial investments, wealth creation, macroeconomic trends, and risk management',
        description: 'Capital allocation, financial valuation, equities, accounting, and wealth building',
        value: 'biz_finance_markets',
        domain: 'Finance & Investments',
        tags: ['Finance', 'Capital Allocation', 'Markets']
      },
      {
        label: 'Managing operational logistics, organizing supply chains, and leading complex projects',
        description: 'Ensuring efficiency, managing budgets, vendor relations, and executing flawlessly',
        value: 'biz_operations_logistics',
        domain: 'Operations & Management',
        tags: ['Operations', 'Logistics', 'Execution']
      },
      {
        label: 'I am not primarily motivated by commercial business—I care more about public service or pure craft',
        description: 'Driven by scientific discovery, artistic expression, healing, teaching, or non-profit missions',
        value: 'biz_non_commercial',
        domain: 'Public Good & Non-Commercial',
        tags: ['Public Service', 'Pure Craft', 'Non-Profit']
      }
    ]
  },
  {
    id: 'q10',
    stage: 'science_discovery',
    category: 'Scientific Curiosity',
    question: 'When you think about the natural and physical world, what questions captivate you most?',
    subtitle: 'Scientific curiosity spans living biology, chemical reactions, ecology, and the cosmos.',
    allowCustomInput: true,
    customInputPlaceholder: 'What mysteries of nature or the physical world spark your curiosity?',
    allowSkip: true,
    options: [
      {
        label: 'How the human body, nervous system, genetics, and diseases function and heal',
        description: 'Cellular biology, neuroscience, pharmacology, immunology, and regenerative medicine',
        value: 'sci_biomedical_genetics',
        domain: 'Biomedicine & Neuroscience',
        tags: ['Genetics', 'Neuroscience', 'Medicine']
      },
      {
        label: 'How living ecosystems, animal behavior, plant biology, and oceans sustain life',
        description: 'Ecological food webs, marine biology, zoology, soil health, and environmental flora',
        value: 'sci_ecology_wildlife',
        domain: 'Ecology & Marine Biology',
        tags: ['Ecology', 'Wildlife', 'Marine Science']
      },
      {
        label: 'The fundamental laws of the cosmos: Quantum physics, chemistry, astronomy, and gravity',
        description: 'First principles of matter, planetary motion, astrophysics, and atomic structures',
        value: 'sci_physics_cosmology',
        domain: 'Physics & Astronomy',
        tags: ['Physics', 'Astronomy', 'Chemistry']
      },
      {
        label: 'How mathematical equations and computational models can reveal hidden truths',
        description: 'Statistical distributions, algorithmic modeling, topology, and predictive mathematics',
        value: 'sci_math_modeling',
        domain: 'Applied Mathematics',
        tags: ['Mathematics', 'Statistics', 'Modeling']
      },
      {
        label: 'I find human culture, languages, ethics, and arts more intriguing than natural sciences',
        description: 'Humanities, literature, creative arts, and philosophical studies resonate far more',
        value: 'sci_prefer_humanities',
        domain: 'Humanities & Culture',
        tags: ['Humanities', 'Culture', 'Philosophy']
      }
    ]
  },
  {
    id: 'q11',
    stage: 'practical_craft',
    category: 'Hands-on & Physical Craft',
    question: 'How important is working with your physical hands, tools, or physical materials in your ideal career?',
    subtitle: 'Recognizing your tactile engagement preference.',
    options: [
      {
        label: 'Essential: I get restless sitting all day; I need to touch, craft, build, or operate tools',
        description: 'Culinary arts, carpentry, surgery, mechanics, agriculture, physical therapy, architecture',
        value: 'hands_on_essential',
        domain: 'Tactile & Practical Craft',
        tags: ['Hands-on', 'Craft', 'Physical Engagement']
      },
      {
        label: 'Balanced: I enjoy a mix of computer/desk work, physical movement, and hands-on tasks',
        description: 'Clinical consultations, product design prototyping, architecture visits, sports coaching',
        value: 'hands_on_balanced',
        domain: 'Hybrid Engagement',
        tags: ['Balanced Rhythm', 'Movement']
      },
      {
        label: 'Minimal: I am happiest working primarily with ideas, language, numbers, or conversations at a desk',
        description: 'Writing, law, financial modeling, counseling, strategy, research, and analysis',
        value: 'hands_on_minimal',
        domain: 'Conceptual & Desk-Based',
        tags: ['Conceptual', 'Intellectual', 'Desk-Based']
      }
    ]
  },
  {
    id: 'q12',
    stage: 'thinking_preferences',
    category: 'Thinking & Problem-Solving',
    question: 'How does your mind naturally navigate difficult, ambiguous problems with no obvious answer?',
    subtitle: 'Exploring your flexible cognitive problem-solving approach.',
    allowCustomInput: true,
    customInputPlaceholder: 'How do you usually approach tough, confusing problems?',
    allowSkip: false,
    options: [
      {
        label: 'Intuitive & imaginative: Connecting unexpected dots, exploring possibilities, and trusting creative leaps',
        description: 'You see parallels across disciplines, envision alternative futures, and question assumptions',
        value: 'think_intuitive_lateral',
        domain: 'Creative & Lateral Thinking',
        tags: ['Intuition', 'Lateral Thinking', 'Vision']
      },
      {
        label: 'Systematic & empirical: Gathering data, verifying evidence, and breaking problems into logical steps',
        description: 'You look for statistical backing, causal clarity, logical consistency, and empirical proof',
        value: 'think_systematic_empirical',
        domain: 'Analytical & Empirical Thinking',
        tags: ['Empirical', 'Logic', 'Analytical']
      },
      {
        label: 'Empathetic & human-centered: Understanding how real people feel, their motives, and social context',
        description: 'You evaluate impact through human empathy, emotional wellness, and community harmony',
        value: 'think_empathetic_human',
        domain: 'Human-Centered Thinking',
        tags: ['Empathy', 'Human Impact', 'Psychology']
      },
      {
        label: 'Pragmatic & action-oriented: Testing quick experiments to see what works practically right now',
        description: 'You prefer actionable progress, rapid iteration, and learning from immediate physical feedback',
        value: 'think_pragmatic_action',
        domain: 'Pragmatic Experimentation',
        tags: ['Action-Oriented', 'Pragmatism', 'Iteration']
      }
    ]
  },
  {
    id: 'q13',
    stage: 'values_motivations',
    category: 'Workplace Rhythm & Setting',
    question: 'What kind of daily work setting and social rhythm would sustain your energy long-term?',
    subtitle: 'How you thrive best day-to-day without feeling drained.',
    options: [
      {
        label: 'A quiet, autonomous space where I can focus deeply with minimal interruptions',
        description: 'Dedicated sanctuary time for writing, research, analytical modeling, or focused art',
        value: 'env_quiet_autonomous',
        domain: 'Deep Focus & Autonomy',
        tags: ['Deep Focus', 'Autonomy', 'Sanctuary']
      },
      {
        label: 'A lively, collaborative team environment with frequent human interaction and brainstorming',
        description: 'Energetic war-rooms, team camaraderie, rapid feedback, and communal energy',
        value: 'env_lively_collaborative',
        domain: 'Collaborative & Social',
        tags: ['Team Collaboration', 'Lively Energy']
      },
      {
        label: 'A balanced rhythm: Focused independent mornings and collaborative, interactive afternoons',
        description: 'The sweet spot between private deep work and high-signal team design sessions',
        value: 'env_balanced_hybrid',
        domain: 'Flexible Hybrid Rhythm',
        tags: ['Hybrid Rhythm', 'Balanced Focus']
      },
      {
        label: 'An active, on-the-move setting: Fieldwork, hospitals, travel, nature, or bustling kitchens/studios',
        description: 'Dynamic scenery, physical mobility, changing daily challenges, and hands-on presence',
        value: 'env_active_mobile',
        domain: 'Mobile & On-the-Move',
        tags: ['On-the-move', 'Fieldwork', 'Dynamic']
      }
    ]
  },
  {
    id: 'q14',
    stage: 'values_motivations',
    category: 'Core Life Values',
    question: 'When you reflect on your future at age 60, what will have mattered most to you in your work and life?',
    subtitle: 'Select up to 3 core values that define true personal success for you.',
    isMultiSelect: true,
    maxSelect: 3,
    allowCustomInput: true,
    customInputPlaceholder: 'What values matter most to you in your future life?',
    allowSkip: false,
    options: [
      {
        label: 'Making a lasting positive difference in individual human lives and lifting communities',
        description: 'Healing, teaching, defending civil rights, and leaving the world kinder and more just',
        value: 'val_social_impact',
        domain: 'Social Impact & Service',
        tags: ['Service', 'Human Uplift']
      },
      {
        label: 'Creative autonomy and the freedom to express my authentic vision and original ideas',
        description: 'Living true to your creative voice without corporate conformity or rigid constraints',
        value: 'val_creative_freedom',
        domain: 'Creative Freedom & Authenticity',
        tags: ['Autonomy', 'Creativity']
      },
      {
        label: 'Achieving financial security, wealth creation, and complete economic independence',
        description: 'Providing generously for family, building assets, and enjoying financial peace of mind',
        value: 'val_financial_independence',
        domain: 'Financial Independence & Security',
        tags: ['Financial Security', 'Wealth']
      },
      {
        label: 'Advancing scientific discovery, expanding human knowledge, and mastering a rigorous craft',
        description: 'Contributing to fundamental research, technical breakthroughs, or scholarly literature',
        value: 'val_intellectual_mastery',
        domain: 'Scholarly & Scientific Mastery',
        tags: ['Mastery', 'Discovery']
      },
      {
        label: 'Leadership, building respected institutions, and influencing cultural or industrial standards',
        description: 'Founding companies, guiding public policy, and leaving an enduring organizational legacy',
        value: 'val_leadership_influence',
        domain: 'Leadership & Cultural Influence',
        tags: ['Influence', 'Legacy']
      },
      {
        label: 'Balance, personal well-being, adventure, and ample time for family and personal passions',
        description: 'Refusing to let work consume life; prioritizing health, relationships, nature, and joy',
        value: 'val_work_life_harmony',
        domain: 'Well-being & Life Harmony',
        tags: ['Balance', 'Family', 'Well-being']
      }
    ]
  },
  {
    id: 'q15',
    stage: 'career_clarity',
    category: 'Career Ambition Clarity',
    question: 'How would you honestly describe your current thoughts about your future career ambition?',
    subtitle: 'This helps Ascend validate and refine your genuine aspirations rather than guessing.',
    allowCustomInput: true,
    customInputPlaceholder: 'If you already have a target dream role or field in mind, tell us what it is...',
    allowSkip: false,
    options: [
      {
        label: 'Focused Ambition: I have a specific career or discipline in mind and want to validate and prepare for it',
        description: 'You know your target area (e.g., medicine, criminal law, journalism, graphic design, venture creation) and want the fastest path',
        value: 'focused_ambition',
        domain: 'Target Validation',
        tags: ['Validation', 'Skill Roadmaps']
      },
      {
        label: 'Multi-Disciplinary: I love two or more distinct fields (e.g., biology + art, or psychology + business) and want a hybrid path',
        description: 'You want to see how diverse passions intersect into novel trajectories (e.g., medical illustration, behavioral economics, eco-architecture)',
        value: 'multidisciplinary_intersection',
        domain: 'Hybrid Trajectories',
        tags: ['Hybrid Trajectories', 'Cross-Disciplinary']
      },
      {
        label: 'Early Curiosity: I know what topics and activities I enjoy, but haven’t connected them to careers yet',
        description: 'You want to see how what you love translates into practical, rewarding, and fulfilling career options',
        value: 'early_curiosity',
        domain: 'Career Exploration',
        tags: ['Exploration', 'Industry Translation']
      },
      {
        label: 'Open Explorer: I am open-minded and want to discover exciting paths I might never have considered before',
        description: 'You are eager to explore diverse professional landscapes across arts, sciences, public service, and commerce',
        value: 'open_horizon',
        domain: 'Broad Discovery',
        tags: ['Broad Discovery', 'Open Horizon']
      }
    ]
  }
];

import { KERALA_COLLEGES_DATA } from './keralaColleges';
export { KERALA_COLLEGES_DATA, KERALA_DISTRICTS, AFFILIATING_UNIVERSITIES, INSTITUTION_TYPES, ACADEMIC_STREAMS, getKeralaColleges, getRecommendedKeralaColleges } from './keralaColleges';
export const COLLEGES_DATA: College[] = KERALA_COLLEGES_DATA;

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
    targetLocations: ['Thiruvananthapuram', 'Ernakulam', 'Kozhikode', 'Thrissur'],
    interests: ['Artificial Intelligence', 'Robotics', 'Game Systems', 'Algorithmic Puzzles'],
    skills: ['Python', 'Data Structures & Algorithms', 'Git', 'Linear Algebra & Calculus', 'React'],
    savedCollegeIds: ['cet-trivandrum', 'nit-calicut', 'cusat-kochi'],
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
      strongestInterestAreas: ['Physical & Computing Systems', 'Autonomous Robotics', 'Mathematical Modeling'],
      secondaryInterestAreas: ['Spatial & Industrial Design', 'Science & Experimental Discovery'],
      coreValues: ['Technical Craft & Mastery', 'Autonomy & Creative Freedom', 'Solving High-Leverage Problems'],
      skillsToDevelop: ['Distributed Systems Profiling', 'Neural Network Latency Optimization', 'Translating Complex Tech to Non-Engineers'],
      alternativePaths: [
        {
          title: 'Biomedical Robotics & Neural Prosthetics',
          description: 'Applying your passion for mechanical interfaces and sensor fusion to medical assistive devices and neural prosthetics.',
          reason: 'Combines your curiosity for biological systems with tactile robotics and real human clinical impact.'
        },
        {
          title: 'Sustainable Infrastructure & Clean Grid Modeling',
          description: 'Designing fault-tolerant physical grid sensors and renewable energy distribution networks.',
          reason: 'Channels your interest in large-scale modular architecture toward ecological sustainability.'
        }
      ],
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
          targetColleges: ['College of Engineering Trivandrum (CET)', 'NIT Calicut', 'CUSAT Kochi', 'Model Engineering College'],
          careerAlignment: ['AI/ML Engineer', 'Systems Architect', 'Software Engineer']
        },
        {
          id: 'm-eecs',
          name: 'Electrical Engineering & Computer Sciences (EECS)',
          degreeType: 'B.S. in EECS',
          matchReason: 'Bridges hardware, robotics sensors, and high-performance low-level systems software.',
          targetColleges: ['GEC Thrissur', 'TKM College of Engineering', 'IIT Palakkad', 'IIIT Kottayam'],
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
    savedCollegeIds: ['rajagiri-social-sciences', 'st-teresas-kochi', 'cms-college-kottayam'],
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
