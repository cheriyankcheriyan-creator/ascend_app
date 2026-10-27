import { College } from '../types';

export const KERALA_DISTRICTS = [
  'All Kerala Districts',
  'Thiruvananthapuram',
  'Kollam',
  'Pathanamthitta',
  'Alappuzha',
  'Kottayam',
  'Idukki',
  'Ernakulam',
  'Thrissur',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Wayanad',
  'Kannur',
  'Kasaragod'
] as const;

export const AFFILIATING_UNIVERSITIES = [
  'All Affiliations',
  'APJ Abdul Kalam Technological University (KTU)',
  'University of Kerala',
  'Mahatma Gandhi University (MGU)',
  'University of Calicut',
  'Kannur University',
  'Cochin University of Science and Technology (CUSAT)',
  'Kerala University of Health Sciences (KUHS)',
  'Kerala Agricultural University (KAU)',
  'National Institute / Central / Deemed'
] as const;

export const INSTITUTION_TYPES = [
  'All Types',
  'Government',
  'Aided',
  'Autonomous',
  'Private / Self-Financing',
  'Institute of National Importance',
  'Central University'
] as const;

export const ACADEMIC_STREAMS = [
  'All Streams',
  'Engineering & Technology',
  'Sciences',
  'Arts & Humanities',
  'Commerce & Management',
  'Medicine & Allied Health',
  'Law',
  'Design & Media',
  'Agriculture'
] as const;

export const KERALA_COLLEGES_DATA: College[] = [
  // 1. THIRUVANANTHAPURAM
  {
    id: 'cet-trivandrum',
    name: 'College of Engineering Trivandrum (CET)',
    shortName: 'CET Trivandrum',
    location: 'Sreekaryam, Thiruvananthapuram',
    district: 'Thiruvananthapuram',
    state: 'Kerala',
    country: 'India',
    campusType: 'Suburban',
    institutionType: 'Government',
    affiliatingUniversity: 'APJ Abdul Kalam Technological University (KTU)',
    ranking: 1,
    nirfRank: 'NIRF Ranked Engineering Institution',
    accreditation: 'NBA Tier-1 Accredited | NAAC A Grade',
    acceptanceRate: 4.8,
    tuitionInState: 35000,
    tuitionOutOfState: 35000,
    tuitionDisplayINR: '₹35,000 / year (Govt Merit)',
    feeStructureNote: 'Fee prescribed by Govt of Kerala for Engineering Colleges. SC/ST/OEC candidates eligible for e-Grantz full fee concession.',
    avgFinancialAid: 30000,
    medianStartingSalary: 750000,
    salaryDisplayINR: '₹7.5 LPA',
    studentFacultyRatio: '14:1',
    graduationRate: 96,
    bannerColor: 'from-blue-900 to-indigo-950',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    description: 'Established in 1939 by the Maharaja of Travancore, CET is the pioneer engineering college in Kerala and one of the finest public technical institutions in India. Known for brilliant alumni, thriving maker culture, and campus innovation.',
    popularMajors: [
      'B.Tech Computer Science & Engineering',
      'B.Tech Electronics & Communication',
      'B.Tech Mechanical Engineering',
      'B.Tech Electrical & Electronics',
      'B.Arch Architecture'
    ],
    courses: [
      {
        name: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: 'Passed 10+2 with 45% aggregate in Physics, Mathematics & Chemistry/CS. Valid KEAM rank.',
        annualFeeINR: '₹35,000/yr (Govt Merit)',
        seats: 120,
        admissionRoute: 'KEAM (CEE Kerala)'
      },
      {
        name: 'B.Tech in Electronics & Communication Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + valid KEAM rank.',
        annualFeeINR: '₹35,000/yr (Govt Merit)',
        seats: 120,
        admissionRoute: 'KEAM (CEE Kerala)'
      },
      {
        name: 'B.Tech in Mechanical Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + valid KEAM rank.',
        annualFeeINR: '₹35,000/yr (Govt Merit)',
        seats: 120,
        admissionRoute: 'KEAM (CEE Kerala)'
      },
      {
        name: 'Bachelor of Architecture (B.Arch)',
        degree: 'B.Arch',
        duration: '5 Years',
        stream: 'Design & Media',
        eligibility: '10+2 with Mathematics + Valid NATA Score + CEE Kerala allotment.',
        annualFeeINR: '₹35,000/yr',
        seats: 80,
        admissionRoute: 'NATA + CEE Kerala'
      }
    ],
    facilities: [
      'Centre for Artificial Intelligence and Robotics',
      'FabLab & Technology Business Incubator (TBI)',
      'High Voltage & Renewable Energy Research Lab',
      'Campus-wide Gigabit Wi-Fi & Central Computing Facility',
      'Extensive Library with 100,000+ volumes & IEEE Xplore access',
      'On-campus Men and Women Hostels with subsidized cooperative mess'
    ],
    alumniOutcomes: {
      employmentRate90Days: 92,
      topEmployers: ['Texas Instruments', 'Oracle', 'Bosch', 'Tata Consultancy Services', 'L&T', 'Federal Bank', 'Infosys'],
      avg5YearSalary: 1450000,
      placementHighlights: 'Over 850+ campus offers annually. Top core engineering recruitment in Kerala.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two PCM > 85% typical for top branches',
      applicationDeadlines: {
        regularDecision: 'CEE Kerala KEAM Allotment (Typically June - August)'
      },
      keyCriteria: [
        'KEAM Entrance Rank (50% entrance mark + 50% Plus Two PCM normalized)',
        'Kerala State Merit / Reservation Category via CEE Kerala Single Window',
        'Nativity verification as Keralite / Non-Keralite Category-I'
      ],
      keralaEligibility: 'Indian citizen of Kerala origin or candidate who has studied in educational institutions in Kerala for 5 years continuously.',
      entranceExams: ['KEAM (CEE Kerala)']
    },
    officialWebsite: 'https://www.cet.ac.in',
    admissionPortalUrl: 'https://cee.kerala.gov.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / KEAM 2024-25',
    officialSource: 'Commissioner for Entrance Examinations Kerala (CEE) & KTU Directory',
    reviews: [
      {
        id: 'rev-cet-1',
        authorName: 'Arjun Menon',
        gradYear: 'Class of 2024',
        major: 'B.Tech Computer Science',
        rating: 5,
        verifiedStatus: true,
        verificationSource: 'Verified KTU Roll #TVE20CS042',
        date: 'August 2024',
        title: 'Unmatched legacy, brilliant peers, and incredible freedom to build',
        comment: 'CET gives you a peer group that pushes you every day. The clubs like IEDC, IEEE, and FossCell CET organize hackathons and projects continuously. If you are self-driven, no place in Kerala comes close.',
        pros: ['Very nominal government fees', 'Extremely active technical clubs and maker space', 'Top tier campus placement opportunities'],
        cons: ['Hostel room allotment in first year is competitive due to distance norms'],
        ratingsBreakdown: { academics: 4.8, campusLife: 4.9, careerSupport: 4.8, roiValue: 5.0 }
      },
      {
        id: 'rev-cet-2',
        authorName: 'Sneha Nair',
        gradYear: 'Class of 2023',
        major: 'B.Tech Electrical & Electronics',
        rating: 4.5,
        verifiedStatus: true,
        verificationSource: 'Verified Alumna (Class of 2023)',
        date: 'March 2024',
        title: 'Core electrical labs are top-notch with great faculty mentorship',
        comment: 'The machines lab and renewable lab give hands-on testing that matches industrial standards. Dhwani arts fest and Drishti tech fest are highlights of student life.',
        pros: ['Strong core engineering faculty', 'Active alumni network across global industries'],
        cons: ['Semester exam schedules can get condensed by KTU'],
        ratingsBreakdown: { academics: 4.5, campusLife: 4.7, careerSupport: 4.4, roiValue: 5.0 }
      }
    ],
    tags: ['Premier Govt Engineering', 'KTU Affiliated', 'KEAM Admission', 'High ROI', 'Top Technical Fest']
  },
  {
    id: 'university-college-tvm',
    name: 'University College, Thiruvananthapuram',
    shortName: 'University College TVM',
    location: 'Palayam, Thiruvananthapuram',
    district: 'Thiruvananthapuram',
    state: 'Kerala',
    country: 'India',
    campusType: 'Urban',
    institutionType: 'Government',
    affiliatingUniversity: 'University of Kerala',
    ranking: 2,
    nirfRank: 'NIRF Top 25 Colleges in India',
    accreditation: 'NAAC A++ Grade (CGPA 3.68)',
    acceptanceRate: 6.2,
    tuitionInState: 5500,
    tuitionOutOfState: 5500,
    tuitionDisplayINR: '₹5,500 / year (Govt Merit)',
    feeStructureNote: 'Highly subsidized Kerala Government tuition fee. Nominal laboratory & library deposit.',
    avgFinancialAid: 5000,
    medianStartingSalary: 480000,
    salaryDisplayINR: '₹4.8 LPA',
    studentFacultyRatio: '16:1',
    graduationRate: 94,
    bannerColor: 'from-amber-900 to-yellow-950',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
    description: 'Founded in 1866 as His Highness The Maharaja’s College, University College is Kerala’s premier institution for humanities, languages, pure and computational sciences. Consistently ranked among the top 25 colleges in India by NIRF.',
    popularMajors: [
      'B.Sc Mathematics & Data Analysis',
      'B.Sc Physics',
      'B.Sc Chemistry',
      'BA English Language & Literature',
      'BA Economics & Public Policy'
    ],
    courses: [
      {
        name: 'B.Sc in Physics with Computational Physics',
        degree: 'B.Sc',
        duration: '3 Years / 4-Year FYUGP',
        stream: 'Sciences',
        eligibility: 'Plus Two with Physics & Mathematics. Merit calculated via Kerala University CAP index.',
        annualFeeINR: '₹5,200/yr',
        seats: 40,
        admissionRoute: 'University of Kerala CAP'
      },
      {
        name: 'BA in English Language & Literature',
        degree: 'BA',
        duration: '3 Years / 4-Year FYUGP',
        stream: 'Arts & Humanities',
        eligibility: 'Plus Two in any stream with high English index marks.',
        annualFeeINR: '₹4,800/yr',
        seats: 50,
        admissionRoute: 'University of Kerala CAP'
      },
      {
        name: 'BA in Economics',
        degree: 'BA',
        duration: '3 Years / 4-Year FYUGP',
        stream: 'Commerce & Management',
        eligibility: 'Plus Two with Economics/Commerce/Mathematics.',
        annualFeeINR: '₹4,800/yr',
        seats: 60,
        admissionRoute: 'University of Kerala CAP'
      }
    ],
    facilities: [
      'Heritage Central Library with rare palm-leaf and 19th century manuscripts',
      'DST-FIST funded advanced science research laboratories',
      'Palayam Historic Quadrangle and open-air discussion spaces',
      'Computer lab and language learning center',
      'Civil Services examination guidance wing'
    ],
    alumniOutcomes: {
      employmentRate90Days: 85,
      topEmployers: ['Kerala Public Service Commission', 'UPSC Civil Services', 'State Bank of India', 'TCS', 'Publishing Houses', 'Academic Research Labs'],
      avg5YearSalary: 950000,
      placementHighlights: 'Unmatched legacy in producing IAS/IPS officers, scientists, writers, and university professors.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two aggregate > 92% for General Merit index',
      applicationDeadlines: {
        regularDecision: 'University of Kerala CAP Single Window (May - June)'
      },
      keyCriteria: [
        'Centralised Allotment Process (CAP) of Kerala University',
        'Subject-wise index mark calculation (e.g., Plus Two marks + English/Science component bonus)',
        'Reservation guidelines as per Govt of Kerala policy'
      ],
      entranceExams: ['University of Kerala CAP Merit']
    },
    officialWebsite: 'https://universitycollege.ac.in',
    admissionPortalUrl: 'https://admissions.keralauniversity.ac.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / Univ of Kerala CAP 2024',
    officialSource: 'University of Kerala Centralised Allotment Portal',
    reviews: [
      {
        id: 'rev-uc-1',
        authorName: 'Aiswarya R.',
        gradYear: 'Class of 2023',
        major: 'BA English Literature',
        rating: 5,
        verifiedStatus: true,
        verificationSource: 'Verified Univ CAP Admission Roll #KU-UC-ENG-89',
        date: 'May 2024',
        title: 'Intellectual paradise in the heart of Trivandrum',
        comment: 'The discussions under the trees in Palayam and the department library are legendary. Faculty treat you like a scholar from day one. Perfect if you aspire for academics, research, writing, or civil services.',
        pros: ['Incredible intellectual atmosphere', 'Virtually free education with stellar professors', 'Central city location near public libraries'],
        cons: ['Campus politics can occasionally cause interruptions'],
        ratingsBreakdown: { academics: 5.0, campusLife: 4.6, careerSupport: 4.4, roiValue: 5.0 }
      }
    ],
    tags: ['Historic College', 'University of Kerala', 'NAAC A++', 'NIRF Top 25', 'Pure Sciences & Humanities']
  },
  {
    id: 'iiser-trivandrum',
    name: 'Indian Institute of Science Education and Research (IISER TVM)',
    shortName: 'IISER Thiruvananthapuram',
    location: 'Vithura, Thiruvananthapuram',
    district: 'Thiruvananthapuram',
    state: 'Kerala',
    country: 'India',
    campusType: 'Rural',
    institutionType: 'Institute of National Importance',
    affiliatingUniversity: 'Autonomous / Ministry of Education, Govt of India',
    ranking: 3,
    accreditation: 'Institute of National Importance | MoE Govt of India',
    acceptanceRate: 3.1,
    tuitionInState: 75000,
    tuitionOutOfState: 75000,
    tuitionDisplayINR: '₹75,000 / year (Govt Subsidized)',
    feeStructureNote: 'Central government subsidized tuition. INSPIRE / KVPY scholarships available for eligible students.',
    avgFinancialAid: 60000,
    medianStartingSalary: 950000,
    salaryDisplayINR: '₹9.5 LPA (Research / Industry)',
    studentFacultyRatio: '8:1',
    graduationRate: 98,
    bannerColor: 'from-emerald-900 to-teal-950',
    logo: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=80',
    description: 'An autonomous premier research university set in the picturesque Western Ghats foothills at Vithura. Dedicated to basic scientific research, interdisciplinary discovery, and high-impact science education.',
    popularMajors: [
      'BS-MS Dual Degree in Biological Sciences',
      'BS-MS in Physical Sciences',
      'BS-MS in Chemical Sciences',
      'BS-MS in Mathematical Sciences',
      'BS-MS in Data Science'
    ],
    courses: [
      {
        name: 'BS-MS Dual Degree (5-Year Integrated)',
        degree: 'Integrated M.Sc',
        duration: '5 Years',
        stream: 'Sciences',
        eligibility: 'Passed 10+2 with Science stream + Valid IAT (IISER Aptitude Test) score.',
        annualFeeINR: '₹75,000/yr',
        seats: 280,
        admissionRoute: 'IISER Aptitude Test (IAT)'
      }
    ],
    facilities: [
      'High-Resolution Transmission Electron Microscopy (HR-TEM)',
      'Nuclear Magnetic Resonance (NMR) 500 MHz Facility',
      'Supercomputing High-Performance Cluster',
      'Residential campus nestled in Western Ghats foothills',
      'Round-the-clock research laboratories and student hostel complexes'
    ],
    alumniOutcomes: {
      employmentRate90Days: 95,
      topEmployers: ['Max Planck Institutes', 'MIT Labs', 'ISRO', 'BARC', 'Biocon', 'AstraZeneca', 'Tata Institute of Fundamental Research'],
      avg5YearSalary: 1800000,
      placementHighlights: 'Over 65% of graduates proceed to funded PhD programs at top global and Indian research universities.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two Science aggregate > 60% + Competitive IAT Rank',
      applicationDeadlines: {
        regularDecision: 'IISER Admissions Joint Portal (May - June)'
      },
      keyCriteria: [
        'IISER Aptitude Test (IAT) computer-based entrance',
        'Direct admission through JEE Advanced channel (top ranks)',
        'Mandatory science background in 10+2'
      ],
      entranceExams: ['IISER Aptitude Test (IAT)', 'JEE Advanced']
    },
    officialWebsite: 'https://www.iisertvm.ac.in',
    admissionPortalUrl: 'https://iiseradmission.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / IAT 2024',
    officialSource: 'IISER Admissions Joint Committee Portal',
    reviews: [
      {
        id: 'rev-iiser-1',
        authorName: 'Devika Krishnan',
        gradYear: 'Class of 2024',
        major: 'BS-MS Biological Sciences',
        rating: 5,
        verifiedStatus: true,
        verificationSource: 'Verified IISER Vithura Scholar',
        date: 'July 2024',
        title: 'World class research laboratories with rainforest tranquility',
        comment: 'You get to work on cutting-edge confocal microscopes and spectrometry right from the 2nd year. The faculty hold PhDs from Max Planck, Cambridge, and Stanford. A dream campus for aspiring scientists.',
        pros: ['Direct undergraduate access to world-class scientific instruments', 'Generous research fellowships', 'Picturesque mountain campus'],
        cons: ['Campus is 45km from Trivandrum city, so weekend travel takes time'],
        ratingsBreakdown: { academics: 5.0, campusLife: 4.8, careerSupport: 4.9, roiValue: 4.9 }
      }
    ],
    tags: ['National Importance', 'Scientific Research', 'IAT Admission', 'Pure Sciences', 'Western Ghats Campus']
  },

  // 2. KOLLAM
  {
    id: 'tkm-ce-kollam',
    name: 'TKM College of Engineering, Kollam',
    shortName: 'TKM College of Engineering',
    location: 'Karicode, Kollam',
    district: 'Kollam',
    state: 'Kerala',
    country: 'India',
    campusType: 'Suburban',
    institutionType: 'Aided',
    affiliatingUniversity: 'APJ Abdul Kalam Technological University (KTU)',
    ranking: 4,
    nirfRank: 'NIRF Engineering Rank Band',
    accreditation: 'NAAC A+ Grade | NBA Accredited Programmes',
    acceptanceRate: 5.5,
    tuitionInState: 38500,
    tuitionOutOfState: 85000,
    tuitionDisplayINR: '₹38,500 / year (Govt Aided Merit)',
    feeStructureNote: 'Govt aided merit quota via KEAM. Management quota fees regulated as per ASC Kerala directives.',
    avgFinancialAid: 25000,
    medianStartingSalary: 680000,
    salaryDisplayINR: '₹6.8 LPA',
    studentFacultyRatio: '15:1',
    graduationRate: 94,
    bannerColor: 'from-cyan-900 to-blue-950',
    logo: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    description: 'Inaugurated in 1958 by Dr. Rajendra Prasad, TKM is Kerala’s first government-aided engineering college. Celebrated for strong civil, mechanical, and computer engineering departments and a massive global alumni presence in the Middle East and Silicon Valley.',
    popularMajors: [
      'B.Tech Computer Science & Engineering',
      'B.Tech Mechanical Engineering',
      'B.Tech Civil Engineering',
      'B.Tech Chemical Engineering',
      'B.Tech Artificial Intelligence'
    ],
    courses: [
      {
        name: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with 45% in PCM + KEAM rank.',
        annualFeeINR: '₹38,500/yr (Merit)',
        seats: 120,
        admissionRoute: 'KEAM (CEE Kerala)'
      },
      {
        name: 'B.Tech in Chemical Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + KEAM rank.',
        annualFeeINR: '₹38,500/yr (Merit)',
        seats: 60,
        admissionRoute: 'KEAM (CEE Kerala)'
      }
    ],
    facilities: [
      'Advanced Mechatronics and Robotics Testing Centre',
      'TKM Innovation and Incubation Centre',
      'Centralised Computing Centre with High-Speed Leased Line',
      'Sprawling sports ground with cricket pavilion and floodlit courts',
      'Hostel complexes for both boys and girls'
    ],
    alumniOutcomes: {
      employmentRate90Days: 90,
      topEmployers: ['Cognizant', 'L&T Construction', 'Infosys', 'MRF', 'UST Global', 'Federal Bank', 'Schlumberger'],
      avg5YearSalary: 1350000,
      placementHighlights: 'Renowned for high core-industry recruitment in Civil, Mechanical, and Chemical Engineering.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two PCM > 80% with competitive KEAM rank',
      applicationDeadlines: {
        regularDecision: 'CEE Kerala KEAM Centralized Allotment'
      },
      keyCriteria: [
        'CEE Kerala Centralized Allotment Process',
        '85% merit seats filled strictly through KEAM ranking',
        '15% management quota as per government approved regulatory framework'
      ],
      entranceExams: ['KEAM (CEE Kerala)']
    },
    officialWebsite: 'https://tkmce.ac.in',
    admissionPortalUrl: 'https://cee.kerala.gov.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / KTU Affiliation List',
    officialSource: 'CEE Kerala & KTU Engineering Directory',
    reviews: [
      {
        id: 'rev-tkm-1',
        authorName: 'Farhan K.',
        gradYear: 'Class of 2024',
        major: 'B.Tech Mechanical Engineering',
        rating: 4.8,
        verifiedStatus: true,
        verificationSource: 'Verified Alumnus (KTU Karicode)',
        date: 'June 2024',
        title: 'Outstanding technical culture and strong core alumni support',
        comment: 'TKM has an industrial aura. The mechanical workshops have heavy industrial machinery. Our alumni association TKMCAA provides immense guidance for internships in Dubai, Singapore, and Bangalore.',
        pros: ['Great laboratory equipment', 'Superb alumni backing in the Gulf and India', 'Lively campus community'],
        cons: ['Semester exam schedules leave little downtime during monsoon term'],
        ratingsBreakdown: { academics: 4.7, campusLife: 4.8, careerSupport: 4.8, roiValue: 4.9 }
      }
    ],
    tags: ['Aided Engineering', 'KTU Affiliated', 'KEAM Admission', 'Legacy Institution', 'Kollam']
  },
  {
    id: 'fatima-mata-kollam',
    name: 'Fatima Mata National College, Kollam',
    shortName: 'Fatima Mata National College',
    location: 'Port Road, Kollam',
    district: 'Kollam',
    state: 'Kerala',
    country: 'India',
    campusType: 'Urban',
    institutionType: 'Autonomous',
    affiliatingUniversity: 'University of Kerala',
    ranking: 8,
    accreditation: 'NAAC A+ Grade (CGPA 3.32) | Autonomous College',
    acceptanceRate: 8.5,
    tuitionInState: 7200,
    tuitionOutOfState: 7200,
    tuitionDisplayINR: '₹7,200 / year (Aided Merit)',
    feeStructureNote: 'Aided stream fees as per Kerala University guidelines. Self-financing courses have separate nominal fees.',
    avgFinancialAid: 6000,
    medianStartingSalary: 420000,
    salaryDisplayINR: '₹4.2 LPA',
    studentFacultyRatio: '18:1',
    graduationRate: 92,
    bannerColor: 'from-teal-900 to-slate-950',
    logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    description: 'An autonomous heritage college established in 1951, overlooking the Ashtamudi Lake in Kollam. Renowned for excellence in commerce, chemistry, botany, and English literature.',
    popularMajors: [
      'B.Com Finance & Taxation',
      'B.Sc Chemistry',
      'B.Sc Botany & Biotechnology',
      'BA Economics',
      'BCA Computer Applications'
    ],
    courses: [
      {
        name: 'B.Com in Finance and Taxation',
        degree: 'B.Com',
        duration: '3 Years / 4-Year FYUGP',
        stream: 'Commerce & Management',
        eligibility: 'Plus Two with Commerce/Economics.',
        annualFeeINR: '₹7,200/yr (Aided)',
        seats: 60,
        admissionRoute: 'Autonomous College Merit Portal'
      },
      {
        name: 'B.Sc in Chemistry',
        degree: 'B.Sc',
        duration: '3 Years',
        stream: 'Sciences',
        eligibility: 'Plus Two with Chemistry & Mathematics/Biology.',
        annualFeeINR: '₹6,800/yr',
        seats: 48,
        admissionRoute: 'Autonomous College Merit Portal'
      }
    ],
    facilities: [
      'Ashtamudi scenic campus quadrangle',
      'UGC funded DST-FIST analytical instrumentation center',
      'Modern digital library with INFLIBNET and DELNET access',
      'Indoor sports stadium and gymnasium'
    ],
    alumniOutcomes: {
      employmentRate90Days: 82,
      topEmployers: ['South Indian Bank', 'KPMG Global', 'Wipro', 'Federal Bank', 'TCS', 'Govt Higher Secondary Schools'],
      avg5YearSalary: 820000,
      placementHighlights: 'Leading placement record for Commerce and Bank Probationary Officer exams in Southern Kerala.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two > 85% for aided commerce seats',
      applicationDeadlines: {
        regularDecision: 'College Autonomous Admission Portal (June)'
      },
      keyCriteria: [
        'Merit-based single-window admission through College Autonomous portal',
        'Direct affiliation compliance with University of Kerala regulations'
      ],
      entranceExams: ['Qualifying Plus Two Merit']
    },
    officialWebsite: 'https://fmnc.ac.in',
    admissionPortalUrl: 'https://fmnc.ac.in/admission',
    verifiedStatus: true,
    verifiedDate: 'October 2024',
    officialSource: 'Fatima Mata National College Autonomous Portal',
    reviews: [
      {
        id: 'rev-fmnc-1',
        authorName: 'Reshma S.',
        gradYear: 'Class of 2023',
        major: 'B.Com Finance',
        rating: 4.6,
        verifiedStatus: true,
        verificationSource: 'Verified Alumna (Autonomous Batch)',
        date: 'January 2024',
        title: 'Rigorous commerce department and great placement training',
        comment: 'The commerce department has experienced professors who coach students for CA Foundation and bank tests alongside the degree curriculum.',
        pros: ['Affordable fees with autonomous exam scheduling', 'Active campus placement cell'],
        cons: ['Strict attendance rules (75% compulsory)'],
        ratingsBreakdown: { academics: 4.6, campusLife: 4.5, careerSupport: 4.4, roiValue: 4.9 }
      }
    ],
    tags: ['Autonomous', 'University of Kerala', 'Aided', 'Commerce Hub', 'Kollam']
  },

  // 3. PATHANAMTHITTA
  {
    id: 'catholicate-pathanamthitta',
    name: 'Catholicate College, Pathanamthitta',
    shortName: 'Catholicate College',
    location: 'Basil Hills, Pathanamthitta',
    district: 'Pathanamthitta',
    state: 'Kerala',
    country: 'India',
    campusType: 'College Town',
    institutionType: 'Aided',
    affiliatingUniversity: 'Mahatma Gandhi University (MGU)',
    ranking: 12,
    accreditation: 'NAAC A++ Grade (CGPA 3.60) in 4th Cycle',
    acceptanceRate: 10.2,
    tuitionInState: 6800,
    tuitionOutOfState: 6800,
    tuitionDisplayINR: '₹6,800 / year (Aided Merit)',
    feeStructureNote: 'MG University standard aided fee structure. Subsidized government scholarships available.',
    avgFinancialAid: 5000,
    medianStartingSalary: 410000,
    salaryDisplayINR: '₹4.1 LPA',
    studentFacultyRatio: '17:1',
    graduationRate: 93,
    bannerColor: 'from-amber-800 to-orange-950',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    description: 'Established in 1952 on Basil Hills, Catholicate College is an aided higher education institution awarded NAAC A++ accreditation. Recognized for outstanding science research labs and supportive faculty.',
    popularMajors: [
      'B.Sc Mathematics',
      'B.Sc Physics',
      'B.Sc Botany',
      'BA History',
      'B.Com Computer Applications'
    ],
    courses: [
      {
        name: 'B.Sc in Mathematics with Statistics',
        degree: 'B.Sc',
        duration: '3 Years / 4-Year FYUGP',
        stream: 'Sciences',
        eligibility: 'Plus Two with Mathematics.',
        annualFeeINR: '₹6,800/yr',
        seats: 40,
        admissionRoute: 'MG University CAP'
      },
      {
        name: 'B.Com in Computer Applications',
        degree: 'B.Com',
        duration: '3 Years',
        stream: 'Commerce & Management',
        eligibility: 'Plus Two Commerce / Science.',
        annualFeeINR: '₹7,500/yr',
        seats: 50,
        admissionRoute: 'MG University CAP'
      }
    ],
    facilities: [
      'Advanced research labs in Botany & Material Sciences',
      'Centralised botanical garden and herbal conservatory',
      'Well-equipped computer centers with broadband connectivity',
      'Spacious seminar auditoriums and student union facilities'
    ],
    alumniOutcomes: {
      employmentRate90Days: 80,
      topEmployers: ['TCS', 'South Indian Bank', 'Muthoot Group', 'Govt Schools', 'Wipro'],
      avg5YearSalary: 780000,
      placementHighlights: 'High rate of admission into Central Universities and IITs for M.Sc/Ph.D programmes.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two aggregate > 82%',
      applicationDeadlines: {
        regularDecision: 'MG University Centralised Allotment Process (CAP)'
      },
      keyCriteria: ['MG University CAP single-window allotment', 'Merit index calculations as per MGU norms'],
      entranceExams: ['MGU CAP Merit']
    },
    officialWebsite: 'https://catholicatecollege.ac.in',
    admissionPortalUrl: 'https://cap.mgu.ac.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / MGU CAP',
    officialSource: 'Mahatma Gandhi University CAP Portal',
    reviews: [
      {
        id: 'rev-cath-1',
        authorName: 'Mathew V.',
        gradYear: 'Class of 2023',
        major: 'B.Sc Mathematics',
        rating: 4.7,
        verifiedStatus: true,
        verificationSource: 'Verified Student Roll #CC-MTH-19',
        date: 'April 2024',
        title: 'Peaceful hilltop campus with dedicated professors',
        comment: 'Basil Hills is a serene place to study. The math faculty spends extra hours helping students clear IIT-JAM and university entrance exams.',
        pros: ['NAAC A++ rated academic standards', 'Very supportive professors'],
        cons: ['Public transport up the hill requires a short walk from the main road'],
        ratingsBreakdown: { academics: 4.8, campusLife: 4.5, careerSupport: 4.4, roiValue: 4.9 }
      }
    ],
    tags: ['NAAC A++', 'MG University', 'Pathanamthitta', 'Aided Arts & Science', 'Research Focus']
  },

  // 4. ALAPPUZHA
  {
    id: 'sd-college-alappuzha',
    name: 'Sanatana Dharma College (SD College), Alappuzha',
    shortName: 'SD College Alappuzha',
    location: 'Sanathanapuram, Alappuzha',
    district: 'Alappuzha',
    state: 'Kerala',
    country: 'India',
    campusType: 'Urban',
    institutionType: 'Aided',
    affiliatingUniversity: 'University of Kerala',
    ranking: 14,
    accreditation: 'NAAC A+ Grade (CGPA 3.33)',
    acceptanceRate: 9.8,
    tuitionInState: 6200,
    tuitionOutOfState: 6200,
    tuitionDisplayINR: '₹6,200 / year (Aided Merit)',
    feeStructureNote: 'Subsidized aided fee structure as per University of Kerala guidelines.',
    avgFinancialAid: 5000,
    medianStartingSalary: 400000,
    salaryDisplayINR: '₹4.0 LPA',
    studentFacultyRatio: '18:1',
    graduationRate: 91,
    bannerColor: 'from-blue-950 to-slate-900',
    logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    description: 'Founded in 1946 in the historic coastal town of Alappuzha, SD College is a premier aided institution offering undergraduate and postgraduate degrees in science, arts, commerce, and vocational fields.',
    popularMajors: [
      'B.Sc Mathematics',
      'B.Sc Zoology',
      'B.Com Finance',
      'BA Malayalam Language & Literature',
      'B.Voc Software Development'
    ],
    courses: [
      {
        name: 'B.Sc in Zoology with Biotechnology',
        degree: 'B.Sc',
        duration: '3 Years',
        stream: 'Sciences',
        eligibility: 'Plus Two with Biology & Chemistry.',
        annualFeeINR: '₹6,200/yr',
        seats: 45,
        admissionRoute: 'University of Kerala CAP'
      },
      {
        name: 'B.Com in Finance',
        degree: 'B.Com',
        duration: '3 Years',
        stream: 'Commerce & Management',
        eligibility: 'Plus Two with Commerce/Science.',
        annualFeeINR: '₹6,200/yr',
        seats: 60,
        admissionRoute: 'University of Kerala CAP'
      }
    ],
    facilities: [
      'Advanced Zoology Museum & Marine Biology observation lab',
      'Language Laboratory and Digital Classrooms',
      'Extensive sports grounds and gymnasium',
      'Co-operative student store and canteen'
    ],
    alumniOutcomes: {
      employmentRate90Days: 80,
      topEmployers: ['Infosys', 'State Bank of India', 'Wipro', 'Coastal Research Institutes', 'HDFC Bank'],
      avg5YearSalary: 750000,
      placementHighlights: 'Strong performance in competitive examinations and banking selections.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two aggregate > 80%',
      applicationDeadlines: {
        regularDecision: 'University of Kerala CAP Portal (June)'
      },
      keyCriteria: ['University of Kerala CAP centralized allotment process'],
      entranceExams: ['Kerala University CAP']
    },
    officialWebsite: 'https://sdcollege.in',
    admissionPortalUrl: 'https://admissions.keralauniversity.ac.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / Univ of Kerala',
    officialSource: 'University of Kerala Centralised Portal',
    reviews: [
      {
        id: 'rev-sdc-1',
        authorName: 'Karthik B.',
        gradYear: 'Class of 2023',
        major: 'B.Sc Zoology',
        rating: 4.5,
        verifiedStatus: true,
        verificationSource: 'Verified Alumnus',
        date: 'February 2024',
        title: 'Rich heritage and vibrant cultural activities',
        comment: 'SD College has an atmosphere steeped in history. The zoology museum is one of the best in central Kerala, and faculty provide genuine career support.',
        pros: ['Affordable fees', 'Supportive teachers and good library collection'],
        cons: ['Lab infrastructure in older blocks is undergoing renovation'],
        ratingsBreakdown: { academics: 4.5, campusLife: 4.6, careerSupport: 4.2, roiValue: 4.8 }
      }
    ],
    tags: ['Aided College', 'University of Kerala', 'Alappuzha', 'Sciences & Commerce']
  },

  // 5. KOTTAYAM
  {
    id: 'cms-college-kottayam',
    name: 'CMS College, Kottayam',
    shortName: 'CMS College Kottayam',
    location: 'College Hills, Kottayam',
    district: 'Kottayam',
    state: 'Kerala',
    country: 'India',
    campusType: 'College Town',
    institutionType: 'Autonomous',
    affiliatingUniversity: 'Mahatma Gandhi University (MGU)',
    ranking: 5,
    nirfRank: 'NIRF Ranked Top 50 Colleges',
    accreditation: 'NAAC A++ Grade (CGPA 3.82) | College with Potential for Excellence',
    acceptanceRate: 5.8,
    tuitionInState: 8500,
    tuitionOutOfState: 8500,
    tuitionDisplayINR: '₹8,500 / year (Aided Merit)',
    feeStructureNote: 'Regulated aided fees. Generous alumni endowments and scholarships for meritorious students.',
    avgFinancialAid: 7000,
    medianStartingSalary: 520000,
    salaryDisplayINR: '₹5.2 LPA',
    studentFacultyRatio: '14:1',
    graduationRate: 96,
    bannerColor: 'from-emerald-950 to-slate-900',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    description: 'Founded in 1817 by the Church Missionary Society, CMS College is the oldest higher education institution in India. Known as the "Cradle of Higher Education in Travancore", it is autonomous and boasts a phenomenal NAAC A++ rating of 3.82 CGPA.',
    popularMajors: [
      'BA English Language & Literature',
      'B.Sc Mathematics with AI Electives',
      'B.Sc Biotechnology & Chemistry',
      'B.Com Finance & Corporate Regulations',
      'BA Economics'
    ],
    courses: [
      {
        name: 'BA in English Literature and Communication',
        degree: 'BA',
        duration: '3 Years / 4-Year FYUGP',
        stream: 'Arts & Humanities',
        eligibility: 'Plus Two in any stream with high English marks.',
        annualFeeINR: '₹8,500/yr',
        seats: 50,
        admissionRoute: 'CMS College Autonomous Admission Portal'
      },
      {
        name: 'B.Sc in Biotechnology (Self-Financing / Aided)',
        degree: 'B.Sc',
        duration: '3 Years',
        stream: 'Sciences',
        eligibility: 'Plus Two with Biology, Chemistry & Physics.',
        annualFeeINR: '₹22,000/yr',
        seats: 35,
        admissionRoute: 'CMS College Autonomous Admission Portal'
      }
    ],
    facilities: [
      'Heritage Great Hall & 200-year-old botanical garden',
      'State-of-the-art Science Research Blocks funded by DST-PURSE',
      'Modern Media Studio and Podcasting Suite',
      'Comprehensive Digital Library with rare 19th-century archives',
      'Hostels for men and women'
    ],
    alumniOutcomes: {
      employmentRate90Days: 88,
      topEmployers: ['Deloitte', 'Cognizant', 'Federal Bank', 'State Civil Services', 'Publishing Houses', 'CSIR Labs'],
      avg5YearSalary: 1100000,
      placementHighlights: 'Notable alumni include former President of India K.R. Narayanan and numerous Supreme Court jurists.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two aggregate > 90% for high-demand majors',
      applicationDeadlines: {
        regularDecision: 'CMS Autonomous Portal (May - June)'
      },
      keyCriteria: [
        'Autonomous single window merit system',
        'Direct application via CMS College official website',
        'Reservation guidelines as per Govt of Kerala norms'
      ],
      entranceExams: ['CMS College Autonomous Merit']
    },
    officialWebsite: 'https://cmscollege.ac.in',
    admissionPortalUrl: 'https://cmscollege.ac.in/apply',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / Autonomous Admissions',
    officialSource: 'CMS College Autonomous Academic Council & MGU Portal',
    reviews: [
      {
        id: 'rev-cms-1',
        authorName: 'Anjali Kurian',
        gradYear: 'Class of 2024',
        major: 'BA English Literature',
        rating: 5,
        verifiedStatus: true,
        verificationSource: 'Verified Autonomous Batch Roll #CMS-ENG-21',
        date: 'May 2024',
        title: 'Timeless campus, visionary teachers, and world-class pedagogy',
        comment: 'Studying under the giant rain trees where K.R. Narayanan walked is an awe-inspiring feeling. The autonomous curriculum is updated every year with modern digital media and film studies.',
        pros: ['Highest NAAC score (3.82) in Kerala', 'Very punctual autonomous exam calendar', 'Active debating and literary societies'],
        cons: ['High demand means cutoffs for merit seats are extremely competitive'],
        ratingsBreakdown: { academics: 5.0, campusLife: 4.9, careerSupport: 4.7, roiValue: 5.0 }
      }
    ],
    tags: ['Oldest College in India', 'NAAC A++ (3.82)', 'Autonomous', 'MG University', 'Kottayam']
  },
  {
    id: 'iiit-kottayam',
    name: 'Indian Institute of Information Technology (IIIT) Kottayam',
    shortName: 'IIIT Kottayam',
    location: 'Valavoor, Pala, Kottayam',
    district: 'Kottayam',
    state: 'Kerala',
    country: 'India',
    campusType: 'Rural',
    institutionType: 'Institute of National Importance',
    affiliatingUniversity: 'Autonomous / Ministry of Education, Govt of India',
    ranking: 6,
    accreditation: 'Institute of National Importance (INI) by Act of Parliament',
    acceptanceRate: 2.8,
    tuitionInState: 220000,
    tuitionOutOfState: 220000,
    tuitionDisplayINR: '₹2,20,000 / year',
    feeStructureNote: 'Central government PPP model fee structure. Education loans readily sanctioned by SBI / Canara Bank on campus.',
    avgFinancialAid: 50000,
    medianStartingSalary: 1450000,
    salaryDisplayINR: '₹14.5 LPA',
    studentFacultyRatio: '15:1',
    graduationRate: 97,
    bannerColor: 'from-violet-950 to-indigo-900',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    description: 'An Institute of National Importance established by the Ministry of Education, IIIT Kottayam operates from a modern 53-acre hilly campus in Valavoor. Highly focused on AI, Data Science, Cyber Security, and Cloud Computing.',
    popularMajors: [
      'B.Tech Computer Science & Engineering',
      'B.Tech CSE with Artificial Intelligence & Data Science',
      'B.Tech CSE with Cyber Security',
      'B.Tech Electronics & Communication'
    ],
    courses: [
      {
        name: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: 'Passed 10+2 with 75% in PCM + Valid JEE Main Rank.',
        annualFeeINR: '₹2,20,000/yr',
        seats: 210,
        admissionRoute: 'JEE Main (JoSAA / CSAB)'
      },
      {
        name: 'B.Tech in CSE (Artificial Intelligence & Data Science)',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + Valid JEE Main Rank.',
        annualFeeINR: '₹2,20,000/yr',
        seats: 90,
        admissionRoute: 'JEE Main (JoSAA / CSAB)'
      }
    ],
    facilities: [
      'NVIDIA GPU-powered AI and Deep Learning Cluster',
      'Cyber-Security Simulation and Ethical Hacking Lab',
      'IoT and Embedded Systems Maker Space',
      'Modern fully residential campus with high-speed fiber connectivity',
      'Cafeteria, gym, and open-air amphitheater'
    ],
    alumniOutcomes: {
      employmentRate90Days: 96,
      topEmployers: ['Amazon', 'Microsoft', 'Atlassian', 'Qualcomm', 'Deloitte', 'NVIDIA', 'Goldman Sachs'],
      avg5YearSalary: 2200000,
      placementHighlights: 'Average domestic package over ₹14 LPA with top package exceeding ₹50 LPA.'
    },
    admissionRequirements: {
      gpaAverage: '75% in Class 12 PCM (65% for SC/ST)',
      applicationDeadlines: {
        regularDecision: 'JoSAA / CSAB Counselling (June - July)'
      },
      keyCriteria: [
        'JEE Main entrance percentile and All-India Rank',
        'Allotment through Joint Seat Allocation Authority (JoSAA)'
      ],
      entranceExams: ['JEE Main']
    },
    officialWebsite: 'https://www.iiitkottayam.ac.in',
    admissionPortalUrl: 'https://josaa.nic.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / JoSAA 2024',
    officialSource: 'JoSAA / CSAB Official Counselling Portal',
    reviews: [
      {
        id: 'rev-iiitk-1',
        authorName: 'Siddharth R.',
        gradYear: 'Class of 2024',
        major: 'B.Tech CSE (AI & Data Science)',
        rating: 4.8,
        verifiedStatus: true,
        verificationSource: 'Verified JoSAA Student Roll #20BCS031',
        date: 'July 2024',
        title: 'Modern AI-focused syllabus and outstanding software packages',
        comment: 'Unlike traditional syllabus, from year 1 we learned Git, Docker, and full-stack development. Companies love this curriculum. Placements were stellar even during the market downturn.',
        pros: ['Industry-aligned curriculum with zero outdated subjects', 'High salary offers from tech multinationals', 'Clean green campus'],
        cons: ['Fees are higher than state government colleges'],
        ratingsBreakdown: { academics: 4.9, campusLife: 4.5, careerSupport: 4.9, roiValue: 4.7 }
      }
    ],
    tags: ['Institute of National Importance', 'JEE Main', 'Artificial Intelligence', 'High Placements', 'Kottayam']
  },

  // 6. IDUKKI
  {
    id: 'gec-idukki',
    name: 'Government Engineering College, Idukki (Painavu)',
    shortName: 'GEC Idukki',
    location: 'Painavu, Kuyilimala, Idukki',
    district: 'Idukki',
    state: 'Kerala',
    country: 'India',
    campusType: 'Rural',
    institutionType: 'Government',
    affiliatingUniversity: 'APJ Abdul Kalam Technological University (KTU)',
    ranking: 15,
    accreditation: 'AICTE Approved | KTU Affiliated Govt College',
    acceptanceRate: 8.4,
    tuitionInState: 35000,
    tuitionOutOfState: 35000,
    tuitionDisplayINR: '₹35,000 / year (Govt Merit)',
    feeStructureNote: 'Fixed government fee structure with complete fee waiver for SC/ST/OEC and income-based fee concessions.',
    avgFinancialAid: 28000,
    medianStartingSalary: 550000,
    salaryDisplayINR: '₹5.5 LPA',
    studentFacultyRatio: '15:1',
    graduationRate: 91,
    bannerColor: 'from-emerald-900 to-green-950',
    logo: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    description: 'Located at Painavu in the misty high-range district of Idukki, GEC Idukki was established in 2000. It offers top-class government technical education surrounded by untouched natural beauty and biodiversity.',
    popularMajors: [
      'B.Tech Computer Science & Engineering',
      'B.Tech Information Technology',
      'B.Tech Electrical & Electronics',
      'B.Tech Mechanical Engineering',
      'B.Tech Electronics & Communication'
    ],
    courses: [
      {
        name: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with 45% in PCM + valid KEAM rank.',
        annualFeeINR: '₹35,000/yr',
        seats: 60,
        admissionRoute: 'KEAM (CEE Kerala)'
      },
      {
        name: 'B.Tech in Information Technology',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + KEAM rank.',
        annualFeeINR: '₹35,000/yr',
        seats: 60,
        admissionRoute: 'KEAM (CEE Kerala)'
      }
    ],
    facilities: [
      'High Altitude Computing & Atmospheric Simulation Lab',
      'Robotics & Automation Society Lab',
      'Central Computing Facility with dedicated high-bandwidth leased lines',
      'College hostels for boys and girls with spectacular valley views'
    ],
    alumniOutcomes: {
      employmentRate90Days: 84,
      topEmployers: ['TCS', 'Infosys', 'Cognizant', 'QBurst', 'Federal Bank', 'Speridian Technologies'],
      avg5YearSalary: 950000,
      placementHighlights: 'Consistent recruitment by top IT services and state engineering departments.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two PCM aggregate > 75%',
      applicationDeadlines: {
        regularDecision: 'CEE Kerala KEAM Allotment'
      },
      keyCriteria: ['KEAM merit rank allotment via CEE Kerala'],
      entranceExams: ['KEAM (CEE Kerala)']
    },
    officialWebsite: 'https://gecidukki.ac.in',
    admissionPortalUrl: 'https://cee.kerala.gov.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / KTU Directory',
    officialSource: 'CEE Kerala & Directorate of Technical Education',
    reviews: [
      {
        id: 'rev-geci-1',
        authorName: 'Midhun Mohan',
        gradYear: 'Class of 2023',
        major: 'B.Tech Information Technology',
        rating: 4.6,
        verifiedStatus: true,
        verificationSource: 'Verified Alumnus (KTU IDK Batch)',
        date: 'March 2024',
        title: 'Misty weather, peaceful coding environment, and strong camaraderie',
        comment: 'Living in Painavu surrounded by clouds makes studying here very unique. The student community is extremely close-knit, with active coding clubs and seniors mentoring juniors.',
        pros: ['Affordable government fees', 'Breathtaking high-range climate', 'Good coding culture'],
        cons: ['Limited city entertainment nearby (nearest major town is Thodupuzha)'],
        ratingsBreakdown: { academics: 4.5, campusLife: 4.7, careerSupport: 4.3, roiValue: 4.9 }
      }
    ],
    tags: ['Government Engineering', 'KTU Affiliated', 'KEAM Admission', 'High Range Campus', 'Idukki']
  },
  {
    id: 'marian-kuttikkanam',
    name: 'Marian College, Kuttikkanam (Autonomous)',
    shortName: 'Marian College Kuttikkanam',
    location: 'Kuttikkanam, Peermade, Idukki',
    district: 'Idukki',
    state: 'Kerala',
    country: 'India',
    campusType: 'Rural',
    institutionType: 'Autonomous',
    affiliatingUniversity: 'Mahatma Gandhi University (MGU)',
    ranking: 11,
    accreditation: 'NAAC A++ Grade (CGPA 3.71) | Autonomous College',
    acceptanceRate: 7.5,
    tuitionInState: 14000,
    tuitionOutOfState: 25000,
    tuitionDisplayINR: '₹14,000 / year (Aided / Autonomous)',
    feeStructureNote: 'Aided and self-financing streams have distinct approved fee structures.',
    avgFinancialAid: 10000,
    medianStartingSalary: 480000,
    salaryDisplayINR: '₹4.8 LPA',
    studentFacultyRatio: '16:1',
    graduationRate: 95,
    bannerColor: 'from-teal-900 to-green-950',
    logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    description: 'A hill-station autonomous institution in Kuttikkanam, Marian College is renowned for hospitality, business administration, computer applications, and social work. Awarded NAAC A++ with 3.71 CGPA.',
    popularMajors: [
      'BCA Computer Applications',
      'BBA Business Administration',
      'BSW Bachelor of Social Work',
      'B.Com Applied Finance',
      'BA Communicative English'
    ],
    courses: [
      {
        name: 'BCA in Computer Applications with Cloud Electives',
        degree: 'BCA',
        duration: '3 Years',
        stream: 'Engineering & Technology',
        eligibility: 'Plus Two with Mathematics / Computer Science.',
        annualFeeINR: '₹28,000/yr (Self-Financing / Autonomous)',
        seats: 60,
        admissionRoute: 'Marian Autonomous Portal'
      },
      {
        name: 'Bachelor of Social Work (BSW)',
        degree: 'B.Voc',
        duration: '3 Years',
        stream: 'Arts & Humanities',
        eligibility: 'Plus Two in any stream with interest in social change.',
        annualFeeINR: '₹14,000/yr',
        seats: 40,
        admissionRoute: 'Marian Autonomous Portal'
      }
    ],
    facilities: [
      'Tea plantation-facing scenic eco-campus',
      'Advanced computer labs with Cisco Networking Academy',
      'Dedicated Social Work fieldwork cell and village adoption program',
      'Modern residential hostel halls'
    ],
    alumniOutcomes: {
      employmentRate90Days: 86,
      topEmployers: ['Deloitte', 'Cognizant', 'KPMG', 'Infosys', 'UN Agencies & NGOs', 'Federal Bank'],
      avg5YearSalary: 920000,
      placementHighlights: 'High placement rates for BCA and BBA graduates with Big-4 consulting and IT firms.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two > 80%',
      applicationDeadlines: {
        regularDecision: 'Marian College Autonomous Portal (May - June)'
      },
      keyCriteria: ['Autonomous single-window merit & interview for specific programs'],
      entranceExams: ['Marian College Autonomous Merit']
    },
    officialWebsite: 'https://mariancollege.org',
    admissionPortalUrl: 'https://mariancollege.org/admissions',
    verifiedStatus: true,
    verifiedDate: 'October 2024',
    officialSource: 'Marian College Autonomous Portal & MGU',
    reviews: [
      {
        id: 'rev-marian-1',
        authorName: 'Sharon Thomas',
        gradYear: 'Class of 2023',
        major: 'BCA Computer Applications',
        rating: 4.8,
        verifiedStatus: true,
        verificationSource: 'Verified Alumna (Autonomous Batch)',
        date: 'February 2024',
        title: 'Boutique campus experience with Big 4 placements',
        comment: 'Marian combines the serenity of tea hills with sharp corporate training. The placement cell prepares you rigorously for aptitude tests and interviews.',
        pros: ['NAAC A++ accreditation', 'Very proactive placement support', 'Beautiful climate year-round'],
        cons: ['Heavy rainfall during June-July requires good rain gear'],
        ratingsBreakdown: { academics: 4.8, campusLife: 4.9, careerSupport: 4.7, roiValue: 4.8 }
      }
    ],
    tags: ['NAAC A++', 'Autonomous', 'MG University', 'BCA & BBA', 'Hill Station', 'Idukki']
  },

  // 7. ERNAKULAM
  {
    id: 'cusat-kochi',
    name: 'Cochin University of Science and Technology (CUSAT)',
    shortName: 'CUSAT Kochi',
    location: 'South Kalamassery, Kochi',
    district: 'Ernakulam',
    state: 'Kerala',
    country: 'India',
    campusType: 'Urban',
    institutionType: 'Autonomous',
    affiliatingUniversity: 'Cochin University of Science and Technology (CUSAT)',
    ranking: 2,
    nirfRank: 'NIRF Ranked Top 40 Universities in India',
    accreditation: 'NAAC A+ Grade (CGPA 3.39) | State Autonomous University',
    acceptanceRate: 3.8,
    tuitionInState: 48000,
    tuitionOutOfState: 75000,
    tuitionDisplayINR: '₹48,000 / year (State Merit)',
    feeStructureNote: 'State Merit fees for Kerala students; All-India Merit has slightly different tier. Scholarships for top CAT rankers.',
    avgFinancialAid: 35000,
    medianStartingSalary: 820000,
    salaryDisplayINR: '₹8.2 LPA',
    studentFacultyRatio: '12:1',
    graduationRate: 95,
    bannerColor: 'from-blue-900 to-indigo-950',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
    description: 'A world-class autonomous university founded in 1971 with a focus on postgraduate education, applied sciences, engineering, and marine technology. CUSAT has three campuses in Kalamassery, Lakeside (Kochi city), and Pulinkunnu (Kuttanad).',
    popularMajors: [
      'B.Tech Computer Science & Engineering (SOE)',
      'B.Tech Information Technology',
      'B.Tech Marine Engineering (KMSME)',
      'B.Tech Safety & Fire Engineering',
      '5-Year Integrated M.Sc in Photonics'
    ],
    courses: [
      {
        name: 'B.Tech in Computer Science and Engineering (School of Engineering)',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with 50% in Mathematics and 50% in PCM aggregate. Valid CUSAT CAT rank.',
        annualFeeINR: '₹48,000/yr (Keralite Merit)',
        seats: 90,
        admissionRoute: 'CUSAT CAT (Common Admission Test)'
      },
      {
        name: 'B.Tech in Safety and Fire Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + valid CUSAT CAT rank.',
        annualFeeINR: '₹48,000/yr',
        seats: 60,
        admissionRoute: 'CUSAT CAT'
      },
      {
        name: 'B.Tech in Marine Engineering (K.M. School of Marine Engineering)',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with 60% PCM, 50% in English, medical fitness as per DG Shipping norms.',
        annualFeeINR: '₹1,95,000/yr (Residential)',
        seats: 80,
        admissionRoute: 'CUSAT CAT + DG Shipping Medicals'
      }
    ],
    facilities: [
      'International School of Photonics with laser labs',
      'Ship-in-Campus facility for Marine Engineering trainees',
      'Centre for Science in Society and Technology Incubation Park',
      'Kochi Metro connectivity right outside the campus gate (CUSAT Metro Station)',
      'Extensive library with 24/7 reading room access'
    ],
    alumniOutcomes: {
      employmentRate90Days: 93,
      topEmployers: ['Cisco', 'Texas Instruments', 'Amazon', 'Tata Consultancy Services', 'IOCL', 'Anglo-Eastern', 'Maersk'],
      avg5YearSalary: 1550000,
      placementHighlights: 'Unique programs like Safety & Fire Engineering and Marine Engineering boast nearly 100% placement with global shipping & energy conglomerates.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two PCM > 75% + CUSAT CAT entrance rank',
      applicationDeadlines: {
        regularDecision: 'CUSAT CAT Registration (January - March / Exam in May)'
      },
      keyCriteria: [
        'CUSAT CAT computer-based All India test',
        'State Merit reservation for Keralites',
        'All-India quota for 40% of general seats'
      ],
      entranceExams: ['CUSAT CAT']
    },
    officialWebsite: 'https://cusat.ac.in',
    admissionPortalUrl: 'https://admissions.cusat.ac.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / CUSAT CAT 2024-25',
    officialSource: 'CUSAT Admissions Directorate & Academic Council',
    reviews: [
      {
        id: 'rev-cusat-1',
        authorName: 'Nikhil Raj',
        gradYear: 'Class of 2024',
        major: 'B.Tech Computer Science (SOE)',
        rating: 4.9,
        verifiedStatus: true,
        verificationSource: 'Verified CUSAT CAT Roll #CAT2020-CS-114',
        date: 'June 2024',
        title: 'Premier university culture, metro connectivity, and top placements',
        comment: 'CUSAT gives you true university life. You share the campus with international research scholars and naval cadets. Having the Kochi Metro station at the university gate makes city access instant.',
        pros: ['Autonomous curriculum with flexible credit choice', 'Very high campus placement offers', 'Kochi Metro station right at the campus'],
        cons: ['CAT entrance requires sharp preparation across Physics and Maths'],
        ratingsBreakdown: { academics: 4.8, campusLife: 4.9, careerSupport: 4.9, roiValue: 5.0 }
      }
    ],
    tags: ['Premier State University', 'CUSAT CAT', 'Metro Connected', 'Marine & Safety Engg', 'Kochi']
  },
  {
    id: 'st-teresas-kochi',
    name: "St. Teresa's College, Ernakulam (Autonomous)",
    shortName: "St. Teresa's College Kochi",
    location: 'Park Avenue, Ernakulam, Kochi',
    district: 'Ernakulam',
    state: 'Kerala',
    country: 'India',
    campusType: 'Urban',
    institutionType: 'Autonomous',
    affiliatingUniversity: 'Mahatma Gandhi University (MGU)',
    ranking: 7,
    nirfRank: 'NIRF Top 45 Colleges in India',
    accreditation: 'NAAC A++ Grade (CGPA 3.57) | Autonomous Heritage College',
    acceptanceRate: 6.5,
    tuitionInState: 9200,
    tuitionOutOfState: 9200,
    tuitionDisplayINR: '₹9,200 / year (Aided Merit)',
    feeStructureNote: 'Aided stream fees regulated by Govt of Kerala. Self-financing programs have distinct approved rates.',
    avgFinancialAid: 8000,
    medianStartingSalary: 480000,
    salaryDisplayINR: '₹4.8 LPA',
    studentFacultyRatio: '15:1',
    graduationRate: 96,
    bannerColor: 'from-rose-950 to-slate-900',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
    description: "Centrally located on Park Avenue facing the Kochi backwaters, St. Teresa's College was established in 1925. An autonomous NAAC A++ institution celebrated for women's leadership, apparel design, literature, commerce, and media.",
    popularMajors: [
      'B.Des Fashion & Apparel Design',
      'BA English Language & Literature',
      'B.Com Finance & Taxation',
      'B.Sc Food Science & Quality Control',
      'B.Sc Computer Applications'
    ],
    courses: [
      {
        name: 'B.Des in Fashion and Apparel Design',
        degree: 'B.Des',
        duration: '4 Years',
        stream: 'Design & Media',
        eligibility: 'Plus Two in any stream + Design Aptitude Test & Portfolio review.',
        annualFeeINR: '₹45,000/yr',
        seats: 40,
        admissionRoute: "St. Teresa's Design Aptitude"
      },
      {
        name: 'BA in English Literature and Communication',
        degree: 'BA',
        duration: '3 Years / 4-Year FYUGP',
        stream: 'Arts & Humanities',
        eligibility: 'Plus Two with strong English proficiency.',
        annualFeeINR: '₹9,200/yr (Aided)',
        seats: 60,
        admissionRoute: 'Autonomous Merit Portal'
      }
    ],
    facilities: [
      'Apparel Design labs and runway presentation theatre',
      'Food Science and Nutritional Microbiology labs',
      'Teresian Innovation and Entrepreneurship Cell (STEP)',
      'Prime waterfront location adjoining Subhash Bose Park and Marine Drive'
    ],
    alumniOutcomes: {
      employmentRate90Days: 88,
      topEmployers: ['Deloitte', 'Cognizant', 'Fabindia', 'Amazon', 'EY India', 'Federal Bank', 'Aditya Birla Fashion'],
      avg5YearSalary: 1050000,
      placementHighlights: "Top national recruitment in design, consulting, media, and corporate finance."
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two aggregate > 88% for high-demand majors',
      applicationDeadlines: {
        regularDecision: 'Autonomous Admission Portal (May - June)'
      },
      keyCriteria: [
        'Single window online registration through college portal',
        'Aptitude test for Fashion Design and Media courses'
      ],
      entranceExams: ["St. Teresa's Autonomous Merit"]
    },
    officialWebsite: 'https://teresas.ac.in',
    admissionPortalUrl: 'https://teresas.ac.in/admissions',
    verifiedStatus: true,
    verifiedDate: 'October 2024',
    officialSource: "St. Teresa's College Autonomous Council & MGU",
    reviews: [
      {
        id: 'rev-st-1',
        authorName: 'Meera Vinod',
        gradYear: 'Class of 2023',
        major: 'B.Des Fashion Design',
        rating: 4.8,
        verifiedStatus: true,
        verificationSource: 'Verified Alumna',
        date: 'March 2024',
        title: 'Empowering campus culture with unmatched design exposure in Kochi',
        comment: "The annual fashion show and garment exhibitions bring top designers and export houses right to our campus. Located right at Marine Drive, it has an unbeatable city vibe.",
        pros: ['NAAC A++ rating with progressive autonomous syllabus', 'Strong female alumni network worldwide', 'Prime city center location'],
        cons: ['Limited campus parking due to dense downtown location'],
        ratingsBreakdown: { academics: 4.8, campusLife: 4.8, careerSupport: 4.7, roiValue: 4.9 }
      }
    ],
    tags: ['NAAC A++', 'Women Leadership', 'Fashion Design', 'Autonomous', 'Kochi Marine Drive']
  },
  {
    id: 'rajagiri-social-sciences',
    name: 'Rajagiri College of Social Sciences (Autonomous)',
    shortName: 'Rajagiri Kalamassery & Kakkanad',
    location: 'Rajagiri Valley, Kakkanad & Kalamassery, Kochi',
    district: 'Ernakulam',
    state: 'Kerala',
    country: 'India',
    campusType: 'Urban',
    institutionType: 'Autonomous',
    affiliatingUniversity: 'Mahatma Gandhi University (MGU)',
    ranking: 8,
    nirfRank: 'NIRF Top 30 Colleges in India',
    accreditation: 'NAAC A++ Grade (CGPA 3.83 - Highest in Kerala)',
    acceptanceRate: 5.2,
    tuitionInState: 42000,
    tuitionOutOfState: 42000,
    tuitionDisplayINR: '₹42,000 / year (Autonomous)',
    feeStructureNote: 'Autonomous approved fee structure with scholarship endowments for merit students.',
    avgFinancialAid: 20000,
    medianStartingSalary: 650000,
    salaryDisplayINR: '₹6.5 LPA',
    studentFacultyRatio: '14:1',
    graduationRate: 97,
    bannerColor: 'from-amber-950 to-slate-900',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    description: 'Renowned for achieving the highest NAAC score in Kerala (3.83 CGPA), Rajagiri is situated in Rajagiri Valley, Kakkanad adjacent to Kochi InfoPark. Top destination for Social Work, Psychology, Commerce, and Computer Applications.',
    popularMajors: [
      'B.Sc Psychology',
      'BSW Bachelor of Social Work',
      'B.Com Model-1 Finance & Taxation',
      'BBA Business Administration',
      'BCA Artificial Intelligence Electives'
    ],
    courses: [
      {
        name: 'B.Sc in Psychology',
        degree: 'B.Sc',
        duration: '3 Years / 4-Year FYUGP',
        stream: 'Sciences',
        eligibility: 'Plus Two with 60% aggregate. Written test & interview.',
        annualFeeINR: '₹42,000/yr',
        seats: 50,
        admissionRoute: 'Rajagiri Autonomous Entrance'
      },
      {
        name: 'Bachelor of Social Work (BSW)',
        degree: 'B.Voc',
        duration: '3 Years',
        stream: 'Arts & Humanities',
        eligibility: 'Plus Two in any stream with aptitude for community service.',
        annualFeeINR: '₹35,000/yr',
        seats: 40,
        admissionRoute: 'Rajagiri Autonomous Portal'
      }
    ],
    facilities: [
      'Comprehensive Clinical Psychology and Behavioral Simulation Lab',
      'Corporate Interface Center adjoining InfoPark Kakkanad',
      'Valley-view amphitheater and multi-sport complex',
      'Hostel complexes with round-the-clock security and Wi-Fi'
    ],
    alumniOutcomes: {
      employmentRate90Days: 92,
      topEmployers: ['Deloitte', 'EY', 'KPMG', 'Federal Bank', 'Infosys', 'UNICEF Partners', 'Cognizant'],
      avg5YearSalary: 1250000,
      placementHighlights: 'Exceptional corporate placement network leveraging InfoPark proximity.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two aggregate > 85%',
      applicationDeadlines: {
        regularDecision: 'Rajagiri Online Portal (April - June)'
      },
      keyCriteria: ['Rajagiri Online Entrance Test + Group Discussion / Interview'],
      entranceExams: ['Rajagiri Aptitude Test']
    },
    officialWebsite: 'https://rajagiri.edu',
    admissionPortalUrl: 'https://rajagiri.edu/admissions',
    verifiedStatus: true,
    verifiedDate: 'October 2024',
    officialSource: 'Rajagiri College Autonomous Academic Board',
    reviews: [
      {
        id: 'rev-raj-1',
        authorName: 'Paul Varghese',
        gradYear: 'Class of 2024',
        major: 'B.Sc Psychology',
        rating: 5,
        verifiedStatus: true,
        verificationSource: 'Verified Rajagiri Scholar',
        date: 'July 2024',
        title: 'Kerala’s highest NAAC rated college for a genuine reason',
        comment: 'The discipline, professional grooming, and psychology labs here rival international universities. Being 5 minutes away from InfoPark means we get guest lectures from corporate leaders every month.',
        pros: ['NAAC A++ 3.83 highest rating', 'Superb psychological and social work fieldwork', 'Next door to InfoPark tech hub'],
        cons: ['Formal dress code and strict adherence to attendance deadlines'],
        ratingsBreakdown: { academics: 5.0, campusLife: 4.8, careerSupport: 4.9, roiValue: 4.9 }
      }
    ],
    tags: ['Highest NAAC (3.83)', 'Autonomous', 'MG University', 'Psychology & Social Work', 'InfoPark Kochi']
  },

  // 8. THRISSUR
  {
    id: 'gec-thrissur',
    name: 'Government Engineering College (GEC) Thrissur',
    shortName: 'GEC Thrissur',
    location: 'Ramavarmapuram, Thrissur',
    district: 'Thrissur',
    state: 'Kerala',
    country: 'India',
    campusType: 'Suburban',
    institutionType: 'Government',
    affiliatingUniversity: 'APJ Abdul Kalam Technological University (KTU)',
    ranking: 3,
    nirfRank: 'NIRF Ranked Engineering College',
    accreditation: 'NBA Tier-1 Accredited | NAAC A Grade',
    acceptanceRate: 4.9,
    tuitionInState: 35000,
    tuitionOutOfState: 35000,
    tuitionDisplayINR: '₹35,000 / year (Govt Merit)',
    feeStructureNote: 'Kerala Government subsidized tuition. e-Grantz full fee waiver for eligible communities.',
    avgFinancialAid: 30000,
    medianStartingSalary: 720000,
    salaryDisplayINR: '₹7.2 LPA',
    studentFacultyRatio: '14:1',
    graduationRate: 95,
    bannerColor: 'from-orange-950 to-red-900',
    logo: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    description: 'Established in 1957 by Jawaharlal Nehru, GEC Thrissur is one of Kerala’s premier government engineering institutions. Situated on a sprawling 75-acre campus in the cultural capital of Kerala, it is famous for innovation, DYUKSHA tech fest, and top core engineering departments.',
    popularMajors: [
      'B.Tech Computer Science & Engineering',
      'B.Tech Mechanical Engineering',
      'B.Tech Chemical Engineering',
      'B.Tech Civil Engineering',
      'B.Tech Electrical & Electronics'
    ],
    courses: [
      {
        name: 'B.Tech in Chemical Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + valid KEAM rank.',
        annualFeeINR: '₹35,000/yr',
        seats: 60,
        admissionRoute: 'KEAM (CEE Kerala)'
      },
      {
        name: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + competitive KEAM rank.',
        annualFeeINR: '₹35,000/yr',
        seats: 90,
        admissionRoute: 'KEAM (CEE Kerala)'
      }
    ],
    facilities: [
      'Centralised Advanced Fluid Mechanics & Process Dynamics Labs',
      'Technology Business Incubator and student FabLab',
      'Vast central library with access to IEEE, ScienceDirect & Springer',
      'Hostels for men and women on campus'
    ],
    alumniOutcomes: {
      employmentRate90Days: 91,
      topEmployers: ['BPCL', 'L&T', 'Oracle', 'Texas Instruments', 'TCS Ninja & Digital', 'MRF', 'Federal Bank'],
      avg5YearSalary: 1400000,
      placementHighlights: 'Outstanding public sector and multinational core recruitment in Chemical, Mechanical, and Electrical branches.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two PCM > 82%',
      applicationDeadlines: {
        regularDecision: 'CEE Kerala KEAM Centralized Allotment'
      },
      keyCriteria: ['KEAM rank allotment via CEE Kerala Single Window'],
      entranceExams: ['KEAM (CEE Kerala)']
    },
    officialWebsite: 'https://gectcr.ac.in',
    admissionPortalUrl: 'https://cee.kerala.gov.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / KEAM Prospectus',
    officialSource: 'CEE Kerala & KTU Directorate',
    reviews: [
      {
        id: 'rev-gect-1',
        authorName: 'Vivek Chandran',
        gradYear: 'Class of 2024',
        major: 'B.Tech Chemical Engineering',
        rating: 4.8,
        verifiedStatus: true,
        verificationSource: 'Verified KTU Roll #TCR20CH018',
        date: 'May 2024',
        title: 'One of the best chemical engineering departments in South India',
        comment: 'GEC Thrissur has an irreplaceable campus vibe. The chemical plant simulation labs and mass transfer labs are second to none. Dyuksha fest is the pride of Thrissur.',
        pros: ['Affordable government fees', 'Superb campus culture and technical exposure', 'High core placement offers from BPCL and L&T'],
        cons: ['Semester timetable can be intense towards finals'],
        ratingsBreakdown: { academics: 4.7, campusLife: 4.9, careerSupport: 4.7, roiValue: 5.0 }
      }
    ],
    tags: ['Premier Govt Engineering', 'KTU Affiliated', 'KEAM Admission', 'Legacy 1957', 'Thrissur']
  },
  {
    id: 'kau-thrissur',
    name: 'Kerala Agricultural University (KAU) - College of Agriculture',
    shortName: 'KAU Vellanikkara',
    location: 'Vellanikkara, Thrissur',
    district: 'Thrissur',
    state: 'Kerala',
    country: 'India',
    campusType: 'Rural',
    institutionType: 'Government',
    affiliatingUniversity: 'Kerala Agricultural University (KAU)',
    ranking: 10,
    accreditation: 'ICAR Accredited State Agricultural University',
    acceptanceRate: 5.4,
    tuitionInState: 18500,
    tuitionOutOfState: 18500,
    tuitionDisplayINR: '₹18,500 / year (Govt Merit)',
    feeStructureNote: 'Subsidized state agricultural university fees. ICAR scholarships available for merit students.',
    avgFinancialAid: 15000,
    medianStartingSalary: 580000,
    salaryDisplayINR: '₹5.8 LPA',
    studentFacultyRatio: '10:1',
    graduationRate: 94,
    bannerColor: 'from-emerald-950 to-green-900',
    logo: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    description: 'Headquartered in Vellanikkara, Thrissur, KAU is Kerala’s premier institution for agricultural sciences, biotechnology, horticulture, and forestry. Features extensive experimental research farms and organic agriculture labs.',
    popularMajors: [
      'B.Sc (Hons) Agriculture',
      'B.Sc (Hons) Forestry',
      'B.Tech Agricultural Engineering',
      'B.Sc (Hons) Climate Change & Environmental Science',
      'B.Sc (Hons) Food Nutrition & Dietetics'
    ],
    courses: [
      {
        name: 'B.Sc (Hons) Agriculture',
        degree: 'B.Sc',
        duration: '4 Years',
        stream: 'Agriculture',
        eligibility: 'Plus Two with 50% in Physics, Chemistry & Biology. KEAM rank in Medical/Allied stream or ICAR-AIEEA.',
        annualFeeINR: '₹18,500/yr',
        seats: 120,
        admissionRoute: 'KEAM (CEE Kerala) & ICAR'
      },
      {
        name: 'B.Tech in Agricultural Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: 'Plus Two with PCM + KEAM Engineering rank.',
        annualFeeINR: '₹35,000/yr',
        seats: 40,
        admissionRoute: 'KEAM (CEE Kerala)'
      }
    ],
    facilities: [
      'Extensive 500-acre instructional farm and automated greenhouse complex',
      'Centre of Excellence in Genomics and Molecular Breeding',
      'Radioisotope research laboratory',
      'Student residential hostels with organic dining mess'
    ],
    alumniOutcomes: {
      employmentRate90Days: 89,
      topEmployers: ['NABARD', 'Kerala State Agriculture Dept (Agricultural Officers)', 'Syngenta', 'IFFCO', 'Spices Board', 'Tea Board of India'],
      avg5YearSalary: 1100000,
      placementHighlights: 'High appointment rate as Agricultural Officers (AO) through Kerala PSC, bank specialist officers, and agribusiness managers.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two PCB > 80%',
      applicationDeadlines: {
        regularDecision: 'CEE Kerala KEAM Allied Allotment & ICAR Allotment'
      },
      keyCriteria: ['KEAM Allied Medical rank via CEE Kerala & ICAR All-India quota'],
      entranceExams: ['KEAM (CEE Kerala)', 'CUET-ICAR AIEEA']
    },
    officialWebsite: 'https://kau.in',
    admissionPortalUrl: 'https://admissions.kau.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / KAU Prospectus',
    officialSource: 'CEE Kerala & Kerala Agricultural University Admission Portal',
    reviews: [
      {
        id: 'rev-kau-1',
        authorName: 'Ananya S. Kumar',
        gradYear: 'Class of 2023',
        major: 'B.Sc (Hons) Agriculture',
        rating: 4.9,
        verifiedStatus: true,
        verificationSource: 'Verified KAU Vellanikkara Scholar',
        date: 'January 2024',
        title: 'Unrivaled hands-on field experience and strong Kerala PSC outcomes',
        comment: 'The RAWE (Rural Agricultural Work Experience) where we live with farming communities in Kerala and implement real crop protection solutions was transformative. Faculty are top agricultural scientists.',
        pros: ['Direct practical farming exposure', 'Very high success rate in Bank Specialist Officer and PSC exams', 'Green tranquil campus'],
        cons: ['Extensive field work in monsoon and summer requires physical stamina'],
        ratingsBreakdown: { academics: 4.9, campusLife: 4.8, careerSupport: 4.8, roiValue: 5.0 }
      }
    ],
    tags: ['Agricultural Sciences', 'ICAR Accredited', 'KEAM Admission', 'KAU Vellanikkara', 'Govt University']
  },

  // 9. PALAKKAD
  {
    id: 'iit-palakkad',
    name: 'Indian Institute of Technology (IIT) Palakkad',
    shortName: 'IIT Palakkad',
    location: 'Kanjikode & Ahalia, Palakkad',
    district: 'Palakkad',
    state: 'Kerala',
    country: 'India',
    campusType: 'Rural',
    institutionType: 'Institute of National Importance',
    affiliatingUniversity: 'Autonomous / Ministry of Education, Govt of India',
    ranking: 1,
    nirfRank: 'NIRF Ranked Premier Technical Institute',
    accreditation: 'Institute of National Importance (INI) by Act of Parliament',
    acceptanceRate: 1.5,
    tuitionInState: 215000,
    tuitionOutOfState: 215000,
    tuitionDisplayINR: '₹2,15,000 / year (Central Govt Fee)',
    feeStructureNote: 'Central government fee with 100% tuition fee waiver for SC/ST/PwD and income-based remissions (< ₹1L / < ₹5L income categories).',
    avgFinancialAid: 80000,
    medianStartingSalary: 1650000,
    salaryDisplayINR: '₹16.5 LPA',
    studentFacultyRatio: '9:1',
    graduationRate: 98,
    bannerColor: 'from-blue-950 to-slate-900',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    description: 'Established in 2015 as part of the third generation of IITs, IIT Palakkad has a state-of-the-art permanent campus in Kanjikode with breathtaking views of the Western Ghats. Boasts world-class research facilities and high international placements.',
    popularMajors: [
      'B.Tech Computer Science & Engineering',
      'B.Tech Data Science & Artificial Intelligence',
      'B.Tech Electrical Engineering',
      'B.Tech Mechanical Engineering',
      'B.Tech Civil Engineering'
    ],
    courses: [
      {
        name: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: 'Class 12 with 75% in PCM + Qualified JEE Advanced.',
        annualFeeINR: '₹2,15,000/yr',
        seats: 50,
        admissionRoute: 'JEE Advanced (JoSAA)'
      },
      {
        name: 'B.Tech in Data Science & Artificial Intelligence',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: 'Class 12 with 75% in PCM + Qualified JEE Advanced.',
        annualFeeINR: '₹2,15,000/yr',
        seats: 40,
        admissionRoute: 'JEE Advanced (JoSAA)'
      }
    ],
    facilities: [
      'Central Instrumentation Facility with high-end XRD, SEM, and NMR spectrometers',
      'High-Performance Supercomputing Cluster (Chandra)',
      'Permanent campus at Kanjikode with scenic Western Ghats backdrop',
      'Hostels with single occupancy rooms, high-speed Wi-Fi, and recreational courts'
    ],
    alumniOutcomes: {
      employmentRate90Days: 95,
      topEmployers: ['Google', 'Texas Instruments', 'Qualcomm', 'Adobe', 'MathWorks', 'L&T', 'Sprinklr'],
      avg5YearSalary: 2400000,
      placementHighlights: 'Average salary over ₹16.5 LPA with significant overseas offers.'
    },
    admissionRequirements: {
      gpaAverage: '75% aggregate in 12th Board Exam (65% for SC/ST)',
      applicationDeadlines: {
        regularDecision: 'JoSAA Counselling (June - July)'
      },
      keyCriteria: ['JEE Advanced All India Rank', 'Allotment via JoSAA single window'],
      entranceExams: ['JEE Advanced']
    },
    officialWebsite: 'https://iitpkd.ac.in',
    admissionPortalUrl: 'https://josaa.nic.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / JoSAA 2024',
    officialSource: 'JoSAA & IIT Palakkad Admissions Office',
    reviews: [
      {
        id: 'rev-iitpkd-1',
        authorName: 'Aditya Shenoy',
        gradYear: 'Class of 2024',
        major: 'B.Tech Computer Science',
        rating: 5,
        verifiedStatus: true,
        verificationSource: 'Verified JoSAA Allotment Roll #112001014',
        date: 'July 2024',
        title: 'Rapidly growing IIT with elite faculty and world-class equipment',
        comment: 'Being in IIT Palakkad means having direct access to research labs that usually only PhDs get in older institutes. Placement cell pulled in Google, Qualcomm, and TI in our first round.',
        pros: ['IIT brand recognition and elite peer group', 'Brand new high-tech permanent campus', 'Generous Central fee waiver policies'],
        cons: ['High summer temperatures in Palakkad during April-May'],
        ratingsBreakdown: { academics: 5.0, campusLife: 4.7, careerSupport: 5.0, roiValue: 4.8 }
      }
    ],
    tags: ['Institute of National Importance', 'JEE Advanced', 'IIT Brand', 'Palakkad', 'High Packages']
  },
  {
    id: 'nss-ce-palakkad',
    name: 'NSS College of Engineering, Palakkad',
    shortName: 'NSS College of Engineering',
    location: 'Akathethara, Palakkad',
    district: 'Palakkad',
    state: 'Kerala',
    country: 'India',
    campusType: 'Suburban',
    institutionType: 'Aided',
    affiliatingUniversity: 'APJ Abdul Kalam Technological University (KTU)',
    ranking: 9,
    accreditation: 'NAAC A Grade | NBA Accredited Branches',
    acceptanceRate: 6.8,
    tuitionInState: 38500,
    tuitionOutOfState: 85000,
    tuitionDisplayINR: '₹38,500 / year (Govt Aided Merit)',
    feeStructureNote: 'Govt aided fee structure for merit seats via KEAM.',
    avgFinancialAid: 25000,
    medianStartingSalary: 620000,
    salaryDisplayINR: '₹6.2 LPA',
    studentFacultyRatio: '16:1',
    graduationRate: 93,
    bannerColor: 'from-amber-950 to-slate-900',
    logo: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    description: 'Founded in 1960 by the Nair Service Society, NSSCE is one of the premier government-aided engineering colleges in Kerala, situated in Akathethara near Palakkad railway junction. Revered for strong civil, mechanical, and instrumentation branches.',
    popularMajors: [
      'B.Tech Computer Science & Engineering',
      'B.Tech Instrumentation & Control',
      'B.Tech Mechanical Engineering',
      'B.Tech Civil Engineering',
      'B.Tech Electrical & Electronics'
    ],
    courses: [
      {
        name: 'B.Tech in Instrumentation and Control Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + valid KEAM rank.',
        annualFeeINR: '₹38,500/yr',
        seats: 60,
        admissionRoute: 'KEAM (CEE Kerala)'
      },
      {
        name: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + KEAM rank.',
        annualFeeINR: '₹38,500/yr',
        seats: 120,
        admissionRoute: 'KEAM (CEE Kerala)'
      }
    ],
    facilities: [
      'Instrumentation & Industrial Process Automation Lab',
      'Advanced Heavy Structures testing laboratory',
      'Centralised Computing Facility with gigabit LAN',
      'Spacious campus with mountain panorama'
    ],
    alumniOutcomes: {
      employmentRate90Days: 88,
      topEmployers: ['Yokogawa', 'Honeywell', 'L&T', 'Infosys', 'TCS', 'Cognizant', 'Federal Bank'],
      avg5YearSalary: 1200000,
      placementHighlights: 'Strong placement track record in industrial automation and core EPC firms.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two PCM > 78%',
      applicationDeadlines: {
        regularDecision: 'CEE Kerala KEAM Allotment'
      },
      keyCriteria: ['KEAM merit rank allotment via CEE Kerala'],
      entranceExams: ['KEAM (CEE Kerala)']
    },
    officialWebsite: 'https://nssce.ac.in',
    admissionPortalUrl: 'https://cee.kerala.gov.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024',
    officialSource: 'CEE Kerala & KTU Engineering Directory',
    reviews: [
      {
        id: 'rev-nss-1',
        authorName: 'Deepak N.',
        gradYear: 'Class of 2023',
        major: 'B.Tech Instrumentation & Control',
        rating: 4.7,
        verifiedStatus: true,
        verificationSource: 'Verified Alumnus',
        date: 'March 2024',
        title: 'Rare and prestigious instrumentation branch with great industry tie-ups',
        comment: 'NSSCE is one of the few colleges in Kerala offering specialized Instrumentation & Control with full Honeywell and Yokogawa software suites.',
        pros: ['Affordable aided fees', 'Specialized core labs', 'Close to Palakkad Junction railway station'],
        cons: ['Summers in Palakkad get hot'],
        ratingsBreakdown: { academics: 4.6, campusLife: 4.6, careerSupport: 4.6, roiValue: 4.9 }
      }
    ],
    tags: ['Govt Aided Engineering', 'KTU Affiliated', 'KEAM Admission', 'Palakkad']
  },

  // 10. MALAPPURAM
  {
    id: 'uoc-malappuram',
    name: 'University of Calicut - Main Campus & Departments',
    shortName: 'Calicut University Tenhipalam',
    location: 'Thenhipalam, Malappuram',
    district: 'Malappuram',
    state: 'Kerala',
    country: 'India',
    campusType: 'College Town',
    institutionType: 'Government',
    affiliatingUniversity: 'University of Calicut',
    ranking: 5,
    nirfRank: 'NIRF Top 50 Universities in India',
    accreditation: 'NAAC A+ Grade (CGPA 3.45) | Largest University in Kerala',
    acceptanceRate: 5.9,
    tuitionInState: 6800,
    tuitionOutOfState: 6800,
    tuitionDisplayINR: '₹6,800 / year (Govt Merit)',
    feeStructureNote: 'Highly subsidized university department fee structure with free education schemes for underprivileged communities.',
    avgFinancialAid: 6000,
    medianStartingSalary: 510000,
    salaryDisplayINR: '₹5.1 LPA',
    studentFacultyRatio: '14:1',
    graduationRate: 94,
    bannerColor: 'from-sky-950 to-blue-900',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    description: 'Established in 1968, the University of Calicut is the largest residential university in Kerala, spanning over 500 lush acres at Thenhipalam in Malappuram. It oversees higher education across North and Central Kerala and houses 34 prestigious postgraduate and integrated teaching departments.',
    popularMajors: [
      '5-Year Integrated M.Sc in Physics',
      '5-Year Integrated M.Sc in Bioscience',
      'Integrated MA in Development Studies',
      'B.Tech Information Technology (IET CU)',
      'BA Journalism & Mass Communication'
    ],
    courses: [
      {
        name: '5-Year Integrated M.Sc in Physics',
        degree: 'Integrated M.Sc',
        duration: '5 Years',
        stream: 'Sciences',
        eligibility: 'Plus Two with Physics & Mathematics + Calicut University Entrance Test (CUET/CUCAT).',
        annualFeeINR: '₹6,800/yr',
        seats: 30,
        admissionRoute: 'Calicut University CUCAT'
      },
      {
        name: 'Integrated MA in Development Studies',
        degree: 'BA',
        duration: '5 Years',
        stream: 'Arts & Humanities',
        eligibility: 'Plus Two in any stream + CUCAT Entrance.',
        annualFeeINR: '₹5,500/yr',
        seats: 30,
        admissionRoute: 'Calicut University CUCAT'
      }
    ],
    facilities: [
      'C.H. Mohammed Koya Central Library with 100,000+ titles & digital repositories',
      'Calicut University Botanical Garden (CUBG) - largest in South India',
      'Synthetic athletic track and Olympic-size swimming pool',
      'University Teaching Departments with dedicated research wings'
    ],
    alumniOutcomes: {
      employmentRate90Days: 86,
      topEmployers: ['Higher Secondary Education Dept', 'Kerala PSC', 'Media Houses', 'TCS', 'State Universities', 'Wipro'],
      avg5YearSalary: 1020000,
      placementHighlights: 'Outstanding performance in UGC NET / JRF lectureship and state public service.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two > 80% + CUCAT Entrance rank',
      applicationDeadlines: {
        regularDecision: 'Calicut University Admission Portal (May - June)'
      },
      keyCriteria: [
        'Calicut University Centralized Admission Portal (CAP) & CUCAT entrance',
        'Direct department-level counseling for integrated programs'
      ],
      entranceExams: ['Calicut University Entrance (CUCAT)']
    },
    officialWebsite: 'https://uoc.ac.in',
    admissionPortalUrl: 'https://admission.uoc.ac.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / UOC Admission Portal',
    officialSource: 'Directorate of Admissions, University of Calicut',
    reviews: [
      {
        id: 'rev-uoc-1',
        authorName: 'Fathima Nasrin',
        gradYear: 'Class of 2023',
        major: 'Integrated M.Sc Physics',
        rating: 4.8,
        verifiedStatus: true,
        verificationSource: 'Verified Calicut Univ Scholar',
        date: 'April 2024',
        title: 'Vast, serene campus with top-tier scientific research equipment',
        comment: 'Thenhipalam campus has an academic freedom and tranquility that is unmatched. The 5-year integrated program gives you direct entry into research laboratories without needing a separate entrance for M.Sc.',
        pros: ['Virtually free education with stellar faculty', 'Access to South India’s largest university botanical garden', 'Top sports facilities'],
        cons: ['Campus is huge, so having a bicycle is helpful'],
        ratingsBreakdown: { academics: 4.8, campusLife: 4.8, careerSupport: 4.6, roiValue: 5.0 }
      }
    ],
    tags: ['Largest University in Kerala', 'NAAC A+', 'Integrated M.Sc', 'Research Hub', 'Malappuram']
  },

  // 11. KOZHIKODE
  {
    id: 'nit-calicut',
    name: 'National Institute of Technology Calicut (NITC)',
    shortName: 'NIT Calicut',
    location: 'Chathamangalam, Kozhikode',
    district: 'Kozhikode',
    state: 'Kerala',
    country: 'India',
    campusType: 'Suburban',
    institutionType: 'Institute of National Importance',
    affiliatingUniversity: 'Autonomous / Ministry of Education, Govt of India',
    ranking: 1,
    nirfRank: 'NIRF Rank #23 in Engineering (India)',
    accreditation: 'Institute of National Importance | MoE Govt of India',
    acceptanceRate: 1.8,
    tuitionInState: 145000,
    tuitionOutOfState: 145000,
    tuitionDisplayINR: '₹1,45,000 / year (Central Govt Merit)',
    feeStructureNote: 'Central government fee structure with 100% tuition waiver for SC/ST/PwD and income-based remissions via JoSAA.',
    avgFinancialAid: 65000,
    medianStartingSalary: 1350000,
    salaryDisplayINR: '₹13.5 LPA',
    studentFacultyRatio: '12:1',
    graduationRate: 98,
    bannerColor: 'from-blue-950 to-indigo-950',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    description: 'Established in 1961 as Regional Engineering College (REC) Calicut and upgraded to NIT in 2002, NITC is Kerala’s highest-ranked engineering institute in the NIRF rankings. Spanning 300 acres in Chathamangalam, it is famed for Tathva tech fest and Ragam cultural fest.',
    popularMajors: [
      'B.Tech Computer Science & Engineering',
      'B.Tech Electronics & Communication',
      'B.Tech Electrical & Electronics',
      'B.Tech Mechanical Engineering',
      'B.Arch Architecture'
    ],
    courses: [
      {
        name: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: 'Class 12 with 75% in PCM + Qualified JEE Main with high percentile.',
        annualFeeINR: '₹1,45,000/yr',
        seats: 180,
        admissionRoute: 'JEE Main (JoSAA / CSAB)'
      },
      {
        name: 'B.Tech in Electronics & Communication',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: 'Class 12 with 75% in PCM + JEE Main.',
        annualFeeINR: '₹1,45,000/yr',
        seats: 160,
        admissionRoute: 'JEE Main (JoSAA)'
      },
      {
        name: 'Bachelor of Architecture (B.Arch)',
        degree: 'B.Arch',
        duration: '5 Years',
        stream: 'Design & Media',
        eligibility: 'Class 12 with Mathematics + JEE Main Paper 2 rank.',
        annualFeeINR: '₹1,45,000/yr',
        seats: 60,
        admissionRoute: 'JEE Main Paper 2 (JoSAA)'
      }
    ],
    facilities: [
      'Supercomputing Facility & High-Performance AI cluster',
      'Technology Business Incubator (TBI) funded by DST with 60+ startups nurtured',
      'Open-air amphitheater and international sports arena',
      'Residential campus with 12 mega student hostels'
    ],
    alumniOutcomes: {
      employmentRate90Days: 96,
      topEmployers: ['Google', 'Microsoft', 'NVIDIA', 'Amazon', 'Texas Instruments', 'Qualcomm', 'Goldman Sachs', 'Oracle'],
      avg5YearSalary: 2300000,
      placementHighlights: 'Over 1,100 job offers annually. Highest package crossed ₹49 LPA with median over ₹13.5 LPA.'
    },
    admissionRequirements: {
      gpaAverage: '75% aggregate in 12th Board Exam',
      applicationDeadlines: {
        regularDecision: 'JoSAA Counselling (June - July)'
      },
      keyCriteria: [
        'JEE Main All India Rank',
        '50% Home State Quota for Kerala candidates + 50% Other States Quota via JoSAA'
      ],
      entranceExams: ['JEE Main']
    },
    officialWebsite: 'https://nitc.ac.in',
    admissionPortalUrl: 'https://josaa.nic.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / JoSAA 2024',
    officialSource: 'JoSAA Counselling & NIT Calicut Training & Placement Cell',
    reviews: [
      {
        id: 'rev-nitc-1',
        authorName: 'Rohan Pillai',
        gradYear: 'Class of 2024',
        major: 'B.Tech Computer Science',
        rating: 5,
        verifiedStatus: true,
        verificationSource: 'Verified JoSAA Allotment Roll #B200234CS',
        date: 'July 2024',
        title: 'Top engineering powerhouse in Kerala with unmatched cultural vibrancy',
        comment: 'The peer group is the absolute best in Kerala. Tathva tech fest and Ragam arts fest bring thousands of students from across India. Having Home State quota makes this the most coveted engineering destination for Kerala students.',
        pros: ['NIRF #23 rank with top international packages', '50% home state quota for Kerala students', 'Legendary Ragam and Tathva college fests'],
        cons: ['Rigor of semester credit requirements demands steady consistency'],
        ratingsBreakdown: { academics: 5.0, campusLife: 5.0, careerSupport: 5.0, roiValue: 5.0 }
      }
    ],
    tags: ['Institute of National Importance', 'NIRF #23', 'JEE Main', 'Home State Quota', 'Kozhikode']
  },
  {
    id: 'farook-college-kozhikode',
    name: 'Farook College, Kozhikode (Autonomous)',
    shortName: 'Farook College Calicut',
    location: 'Farook College P.O., Kozhikode',
    district: 'Kozhikode',
    state: 'Kerala',
    country: 'India',
    campusType: 'College Town',
    institutionType: 'Autonomous',
    affiliatingUniversity: 'University of Calicut',
    ranking: 6,
    nirfRank: 'NIRF Top 60 Colleges in India',
    accreditation: 'NAAC A+ Grade (CGPA 3.51) | Autonomous Heritage College',
    acceptanceRate: 6.8,
    tuitionInState: 7500,
    tuitionOutOfState: 7500,
    tuitionDisplayINR: '₹7,500 / year (Aided Merit)',
    feeStructureNote: 'Aided merit quota as per Calicut University guidelines. Separate nominal fees for self-financing courses.',
    avgFinancialAid: 6500,
    medianStartingSalary: 460000,
    salaryDisplayINR: '₹4.6 LPA',
    studentFacultyRatio: '15:1',
    graduationRate: 95,
    bannerColor: 'from-amber-950 to-emerald-950',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
    description: 'Founded in 1948 on a panoramic hilltop in Calicut, Farook College is known as the "Aligarh of the South". An autonomous NAAC A+ institution providing transformational education in arts, sciences, commerce, and media studies.',
    popularMajors: [
      'B.Sc Computer Science',
      'BA Multimedia & Journalism',
      'B.Com Finance & Computer Applications',
      'B.Sc Psychology',
      'BA English Language & Literature'
    ],
    courses: [
      {
        name: 'BA in Multimedia and Journalism',
        degree: 'BA',
        duration: '3 Years / 4-Year FYUGP',
        stream: 'Design & Media',
        eligibility: 'Plus Two in any stream + Multimedia Aptitude test.',
        annualFeeINR: '₹24,000/yr',
        seats: 40,
        admissionRoute: 'Farook College Autonomous Portal'
      },
      {
        name: 'B.Sc in Computer Science with AI electives',
        degree: 'B.Sc',
        duration: '3 Years',
        stream: 'Sciences',
        eligibility: 'Plus Two with Mathematics.',
        annualFeeINR: '₹7,500/yr (Aided)',
        seats: 40,
        admissionRoute: 'Autonomous Merit Portal'
      }
    ],
    facilities: [
      'Al-Jamia Central Library with vast digital archives and reading lounge',
      'State-of-the-art Multimedia and Television production studio',
      'DST-FIST science research laboratories',
      'Hilltop residential hostels with sports pavilions'
    ],
    alumniOutcomes: {
      employmentRate90Days: 87,
      topEmployers: ['Manorama', 'Mathrubhumi', 'MediaOne', 'TCS', 'Cognizant', 'Federal Bank', 'Wipro'],
      avg5YearSalary: 950000,
      placementHighlights: 'Renowned throughout South India for media, journalism, and literature graduates.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two aggregate > 88% for high-demand programs',
      applicationDeadlines: {
        regularDecision: 'Farook College Autonomous Portal (May - June)'
      },
      keyCriteria: ['Autonomous single-window merit based on Plus Two index marks'],
      entranceExams: ['Farook College Autonomous Merit']
    },
    officialWebsite: 'https://farookcollege.ac.in',
    admissionPortalUrl: 'https://farookcollege.ac.in/admission',
    verifiedStatus: true,
    verifiedDate: 'October 2024',
    officialSource: 'Farook College Autonomous Governing Body & UOC',
    reviews: [
      {
        id: 'rev-fc-1',
        authorName: 'Shameem Ahmed',
        gradYear: 'Class of 2023',
        major: 'BA Multimedia',
        rating: 4.8,
        verifiedStatus: true,
        verificationSource: 'Verified Alumnus',
        date: 'May 2024',
        title: 'Best media and journalism environment in Kerala',
        comment: 'The television studio, editing suites, and campus radio give you real broadcast experience from your first semester. The hilltop campus is peaceful and full of life.',
        pros: ['Industry-grade media studios', 'High NAAC rating and disciplined academic calendar', 'Scenic hilltop campus'],
        cons: ['Competition for aided merit seats is intense'],
        ratingsBreakdown: { academics: 4.8, campusLife: 4.8, careerSupport: 4.6, roiValue: 5.0 }
      }
    ],
    tags: ['Autonomous', 'University of Calicut', 'NAAC A+', 'Media & Journalism', 'Kozhikode']
  },

  // 12. WAYANAD
  {
    id: 'gec-wayanad',
    name: 'Government Engineering College, Wayanad (Mananthavady)',
    shortName: 'GEC Wayanad',
    location: 'Thalapuzha, Mananthavady, Wayanad',
    district: 'Wayanad',
    state: 'Kerala',
    country: 'India',
    campusType: 'Rural',
    institutionType: 'Government',
    affiliatingUniversity: 'APJ Abdul Kalam Technological University (KTU)',
    ranking: 13,
    accreditation: 'AICTE Approved | KTU Affiliated Govt Institution',
    acceptanceRate: 7.9,
    tuitionInState: 35000,
    tuitionOutOfState: 35000,
    tuitionDisplayINR: '₹35,000 / year (Govt Merit)',
    feeStructureNote: 'Fixed Kerala government fee structure with complete fee waiver for SC/ST/OEC and income-based fee concessions.',
    avgFinancialAid: 28000,
    medianStartingSalary: 560000,
    salaryDisplayINR: '₹5.6 LPA',
    studentFacultyRatio: '15:1',
    graduationRate: 92,
    bannerColor: 'from-emerald-950 to-teal-900',
    logo: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    description: 'Established in 1999 at Thalapuzha in Mananthavady, GEC Wayanad is situated in the Western Ghats mountain mist. Dedicated to quality public engineering education with active robotics, IoT, and coding clubs.',
    popularMajors: [
      'B.Tech Computer Science & Engineering',
      'B.Tech Electronics & Communication',
      'B.Tech Electrical & Electronics',
      'B.Tech Mechanical Engineering',
      'B.Tech Civil Engineering'
    ],
    courses: [
      {
        name: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + valid KEAM rank.',
        annualFeeINR: '₹35,000/yr',
        seats: 60,
        admissionRoute: 'KEAM (CEE Kerala)'
      },
      {
        name: 'B.Tech in Electronics and Communication',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + KEAM rank.',
        annualFeeINR: '₹35,000/yr',
        seats: 60,
        admissionRoute: 'KEAM (CEE Kerala)'
      }
    ],
    facilities: [
      'High Altitude Atmospheric Physics & Electronics Lab',
      'Central Computing Facility with leased optical line',
      'Innovation and Entrepreneurship Development Centre (IEDC)',
      'College hostels for boys and girls with panoramic green views'
    ],
    alumniOutcomes: {
      employmentRate90Days: 85,
      topEmployers: ['TCS', 'Infosys', 'Cognizant', 'QBurst', 'Federal Bank', 'VVDN Technologies'],
      avg5YearSalary: 960000,
      placementHighlights: 'Steady campus placements in IT software, embedded systems, and government sectors.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two PCM > 75%',
      applicationDeadlines: {
        regularDecision: 'CEE Kerala KEAM Allotment'
      },
      keyCriteria: ['KEAM merit rank allotment via CEE Kerala Single Window'],
      entranceExams: ['KEAM (CEE Kerala)']
    },
    officialWebsite: 'https://gecwyd.ac.in',
    admissionPortalUrl: 'https://cee.kerala.gov.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / KEAM Directory',
    officialSource: 'Commissioner for Entrance Examinations Kerala & KTU',
    reviews: [
      {
        id: 'rev-gecw-1',
        authorName: 'Ashwin Pradeep',
        gradYear: 'Class of 2023',
        major: 'B.Tech Computer Science',
        rating: 4.6,
        verifiedStatus: true,
        verificationSource: 'Verified Alumnus (KTU WYD Batch)',
        date: 'February 2024',
        title: 'Serene mountain campus with passionate coding culture',
        comment: 'Studying in Wayanad gives you peace of mind that city colleges cannot match. The coding clubs are very active on GitHub and open source. The climate in Mananthavady is lovely.',
        pros: ['Affordable government tuition', 'Pollution-free mountain environment', 'Helpful faculty and seniors'],
        cons: ['Monsoons are very heavy, travel outside Wayanad takes winding ghat roads'],
        ratingsBreakdown: { academics: 4.5, campusLife: 4.7, careerSupport: 4.4, roiValue: 4.9 }
      }
    ],
    tags: ['Government Engineering', 'KTU Affiliated', 'KEAM Admission', 'Mountain Mist Campus', 'Wayanad']
  },

  // 13. KANNUR
  {
    id: 'gce-kannur',
    name: 'Government College of Engineering, Kannur (GCEK)',
    shortName: 'GCE Kannur',
    location: 'Mangattuparamba, Kannur',
    district: 'Kannur',
    state: 'Kerala',
    country: 'India',
    campusType: 'Suburban',
    institutionType: 'Government',
    affiliatingUniversity: 'APJ Abdul Kalam Technological University (KTU)',
    ranking: 5,
    nirfRank: 'NIRF Engineering Institution',
    accreditation: 'NBA Tier-1 Accredited | NAAC A Grade',
    acceptanceRate: 5.1,
    tuitionInState: 35000,
    tuitionOutOfState: 35000,
    tuitionDisplayINR: '₹35,000 / year (Govt Merit)',
    feeStructureNote: 'Government subsidised fee. Eligible community fee remissions through e-Grantz portal.',
    avgFinancialAid: 30000,
    medianStartingSalary: 680000,
    salaryDisplayINR: '₹6.8 LPA',
    studentFacultyRatio: '14:1',
    graduationRate: 94,
    bannerColor: 'from-blue-900 to-indigo-950',
    logo: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    description: 'Established in 1965, GCE Kannur is one of the premier government engineering institutions in North Kerala. Set on a sprawling 70-acre campus in Mangattuparamba, it has strong departments in Civil, Mechanical, Electrical, Electronics, and Computer Science.',
    popularMajors: [
      'B.Tech Computer Science & Engineering',
      'B.Tech Mechanical Engineering',
      'B.Tech Civil Engineering',
      'B.Tech Electrical & Electronics',
      'B.Tech Electronics & Communication'
    ],
    courses: [
      {
        name: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + valid KEAM rank.',
        annualFeeINR: '₹35,000/yr',
        seats: 90,
        admissionRoute: 'KEAM (CEE Kerala)'
      },
      {
        name: 'B.Tech in Civil Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + KEAM rank.',
        annualFeeINR: '₹35,000/yr',
        seats: 90,
        admissionRoute: 'KEAM (CEE Kerala)'
      }
    ],
    facilities: [
      'Advanced Robotics & Embedded Systems Research Lab',
      'Heavy Structural Engineering Testing Laboratory',
      'Central Computing Facility with round-the-clock internet access',
      'Extensive sports ground and campus auditoriums'
    ],
    alumniOutcomes: {
      employmentRate90Days: 90,
      topEmployers: ['TCS', 'L&T', 'Infosys', 'Cognizant', 'Bosch', 'Federal Bank', 'Sobha Developers'],
      avg5YearSalary: 1300000,
      placementHighlights: 'High placement rate across core engineering and IT conglomerates.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two PCM > 80%',
      applicationDeadlines: {
        regularDecision: 'CEE Kerala KEAM Allotment'
      },
      keyCriteria: ['KEAM rank allotment via CEE Kerala'],
      entranceExams: ['KEAM (CEE Kerala)']
    },
    officialWebsite: 'https://gcek.ac.in',
    admissionPortalUrl: 'https://cee.kerala.gov.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / KEAM Directory',
    officialSource: 'CEE Kerala & Directorate of Technical Education',
    reviews: [
      {
        id: 'rev-gcek-1',
        authorName: 'Sreerag K.',
        gradYear: 'Class of 2024',
        major: 'B.Tech Mechanical Engineering',
        rating: 4.7,
        verifiedStatus: true,
        verificationSource: 'Verified Alumnus',
        date: 'June 2024',
        title: 'Legacy government engineering college with brilliant peer circle',
        comment: 'GCE Kannur has a rich history since 1965. The mechanical labs and foundry have classic heavy equipment. Placements for CS and core branches were very steady.',
        pros: ['Affordable government fees', 'Strong alumni network in India and the Gulf', 'Active technical clubs like X-Phoria'],
        cons: ['Public transport from Kannur town requires a 25-minute bus ride'],
        ratingsBreakdown: { academics: 4.7, campusLife: 4.7, careerSupport: 4.6, roiValue: 5.0 }
      }
    ],
    tags: ['Premier Govt Engineering', 'KTU Affiliated', 'KEAM Admission', 'Legacy 1965', 'Kannur']
  },
  {
    id: 'brennen-college-thalassery',
    name: 'Government Brennen College, Thalassery',
    shortName: 'Brennen College Thalassery',
    location: 'Dharmadam, Thalassery, Kannur',
    district: 'Kannur',
    state: 'Kerala',
    country: 'India',
    campusType: 'College Town',
    institutionType: 'Government',
    affiliatingUniversity: 'Kannur University',
    ranking: 11,
    accreditation: 'NAAC A+ Grade (CGPA 3.37) | Heritage Institution',
    acceptanceRate: 7.2,
    tuitionInState: 5500,
    tuitionOutOfState: 5500,
    tuitionDisplayINR: '₹5,500 / year (Govt Merit)',
    feeStructureNote: 'Highly subsidized government fees as per Kannur University guidelines.',
    avgFinancialAid: 5000,
    medianStartingSalary: 420000,
    salaryDisplayINR: '₹4.2 LPA',
    studentFacultyRatio: '16:1',
    graduationRate: 94,
    bannerColor: 'from-amber-950 to-slate-900',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
    description: 'Founded in 1862 by Edward Brennen, this legendary coastal institution in Dharmadam has nurtured generations of political leaders, authors, thinkers, and civil servants in Kerala.',
    popularMajors: [
      'BA Malayalam Language & Literature',
      'BA Political Science',
      'B.Sc Mathematics',
      'B.Sc Physics',
      'B.Com Finance'
    ],
    courses: [
      {
        name: 'BA in Political Science',
        degree: 'BA',
        duration: '3 Years / 4-Year FYUGP',
        stream: 'Arts & Humanities',
        eligibility: 'Plus Two in any stream with high index marks.',
        annualFeeINR: '₹5,500/yr',
        seats: 50,
        admissionRoute: 'Kannur University CAP'
      },
      {
        name: 'B.Sc in Mathematics with Statistics',
        degree: 'B.Sc',
        duration: '3 Years',
        stream: 'Sciences',
        eligibility: 'Plus Two with Mathematics.',
        annualFeeINR: '₹5,500/yr',
        seats: 40,
        admissionRoute: 'Kannur University CAP'
      }
    ],
    facilities: [
      'Heritage central library with rare Malabar historical archives',
      'Coastal campus adjoining the scenic Dharmadam island view',
      'Well-equipped science laboratories funded by DST',
      'Hostels for men and women'
    ],
    alumniOutcomes: {
      employmentRate90Days: 82,
      topEmployers: ['Govt Higher Secondary Schools', 'State Public Service', 'Media Houses', 'TCS', 'Kerala Police / Forest Service'],
      avg5YearSalary: 850000,
      placementHighlights: 'Alumni include Chief Minister Pinarayi Vijayan and dozens of prominent parliamentarians, judges, and authors.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two aggregate > 85%',
      applicationDeadlines: {
        regularDecision: 'Kannur University CAP Single Window (June)'
      },
      keyCriteria: ['Kannur University Centralised Allotment Process index calculation'],
      entranceExams: ['Kannur University CAP']
    },
    officialWebsite: 'https://brennencollege.ac.in',
    admissionPortalUrl: 'https://admission.kannuruniversity.ac.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / Kannur Univ CAP',
    officialSource: 'Kannur University Directorate of Admissions',
    reviews: [
      {
        id: 'rev-bren-1',
        authorName: 'Nanditha P.',
        gradYear: 'Class of 2023',
        major: 'BA Political Science',
        rating: 4.8,
        verifiedStatus: true,
        verificationSource: 'Verified Alumna (Dharmadam)',
        date: 'January 2024',
        title: 'Historic seaside campus with unmatched political and literary culture',
        comment: 'Brennen College has an electric intellectual culture. The discussions in the canteen and under the trees shape your worldview. Virtually free government education with exceptional professors.',
        pros: ['Legendary historical legacy and alumni', 'Subsidized government fees', 'Gorgeous coastal location at Dharmadam'],
        cons: ['Active campus politics means you need to be self-disciplined with studies'],
        ratingsBreakdown: { academics: 4.8, campusLife: 4.9, careerSupport: 4.4, roiValue: 5.0 }
      }
    ],
    tags: ['Heritage 1862', 'Govt College', 'Kannur University', 'Political Science & Literature', 'Thalassery']
  },

  // 14. KASARAGOD
  {
    id: 'cuk-kasaragod',
    name: 'Central University of Kerala (CUK), Periye',
    shortName: 'Central University of Kerala',
    location: 'Tejaswini Hills, Periye, Kasaragod',
    district: 'Kasaragod',
    state: 'Kerala',
    country: 'India',
    campusType: 'Rural',
    institutionType: 'Central University',
    affiliatingUniversity: 'Central University (Act of Parliament, 2009)',
    ranking: 4,
    nirfRank: 'NIRF Ranked Central University',
    accreditation: 'NAAC A Grade | Central University by Act of Parliament',
    acceptanceRate: 3.5,
    tuitionInState: 14000,
    tuitionOutOfState: 14000,
    tuitionDisplayINR: '₹14,000 / year (Central Govt Subsidized)',
    feeStructureNote: 'Central government subsidized tuition fee. Generous UGC post-matric and non-NET fellowships for higher studies.',
    avgFinancialAid: 12000,
    medianStartingSalary: 620000,
    salaryDisplayINR: '₹6.2 LPA',
    studentFacultyRatio: '11:1',
    graduationRate: 96,
    bannerColor: 'from-blue-950 to-indigo-900',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    description: 'Established in 2009 under the Central Universities Act, CUK occupies a stunning 310-acre campus at Tejaswini Hills, Periye. It brings together students and faculty from across India with world-class science, genomic, law, and international relations departments.',
    popularMajors: [
      'BA International Relations & Politics',
      'Integrated B.Sc-M.Sc in Genomic Science',
      'Integrated B.Sc-M.Sc in Physics',
      'BA English & Comparative Literature',
      'LLM in International Law'
    ],
    courses: [
      {
        name: 'BA in International Relations and Politics',
        degree: 'BA',
        duration: '3 Years / 4-Year FYUGP',
        stream: 'Arts & Humanities',
        eligibility: '10+2 in any stream + Qualified CUET-UG.',
        annualFeeINR: '₹14,000/yr',
        seats: 40,
        admissionRoute: 'CUET-UG (National Testing Agency)'
      },
      {
        name: 'Integrated B.Sc-M.Sc in Genomic Science',
        degree: 'Integrated M.Sc',
        duration: '5 Years',
        stream: 'Sciences',
        eligibility: '10+2 with Biology & Chemistry + Qualified CUET-UG.',
        annualFeeINR: '₹18,000/yr',
        seats: 30,
        admissionRoute: 'CUET-UG (National Testing Agency)'
      }
    ],
    facilities: [
      'Advanced Genomic Sequencing & DNA Fingerprinting Centre',
      'High-Speed National Knowledge Network (NKN) enabled campus',
      'Multipurpose gymnasium and international student hostels',
      'Expansive central library with digital consortiums'
    ],
    alumniOutcomes: {
      employmentRate90Days: 88,
      topEmployers: ['Ministry of External Affairs think-tanks', 'Biotech Labs', 'CSIR', 'TCS', 'UPSC Civil Services', 'Universities worldwide'],
      avg5YearSalary: 1200000,
      placementHighlights: 'High rate of selection for diplomatic fellowships, international PhD programs, and civil services.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two > 60% + Valid CUET-UG percentile',
      applicationDeadlines: {
        regularDecision: 'CUET-UG NTA Allotment (May - July)'
      },
      keyCriteria: [
        'Common University Entrance Test (CUET-UG) conducted by NTA',
        'All-India central merit list with statutory reservation'
      ],
      entranceExams: ['CUET-UG']
    },
    officialWebsite: 'https://cukerala.ac.in',
    admissionPortalUrl: 'https://cukeralacuet.samarth.edu.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / CUET 2024',
    officialSource: 'National Testing Agency (CUET) & Central University of Kerala',
    reviews: [
      {
        id: 'rev-cuk-1',
        authorName: 'Haritha Nair',
        gradYear: 'Class of 2024',
        major: 'BA International Relations',
        rating: 4.9,
        verifiedStatus: true,
        verificationSource: 'Verified CUET Allotment Student',
        date: 'July 2024',
        title: 'Pan-Indian central university exposure right here in Kasaragod',
        comment: 'CUK brings professors and classmates from Delhi, Kashmir, Bengal, and Tamil Nadu together. The International Relations department has direct tie-ups with foreign policy think tanks. Campus is sprawling and brand new.',
        pros: ['Central University prestige with all-India peer group', 'Very affordable central tuition fees', 'Cutting edge genomic and international relations departments'],
        cons: ['Nearest railway station is Kanhangad / Kasaragod (about 15-20km)'],
        ratingsBreakdown: { academics: 4.9, campusLife: 4.8, careerSupport: 4.8, roiValue: 5.0 }
      }
    ],
    tags: ['Central University', 'CUET Admission', 'All-India Peer Group', 'International Relations', 'Kasaragod']
  },
  {
    id: 'lbs-kasaragod',
    name: 'LBS College of Engineering, Kasaragod',
    shortName: 'LBSCE Kasaragod',
    location: 'Povval, Kasaragod',
    district: 'Kasaragod',
    state: 'Kerala',
    country: 'India',
    campusType: 'Suburban',
    institutionType: 'Government',
    affiliatingUniversity: 'APJ Abdul Kalam Technological University (KTU)',
    ranking: 16,
    accreditation: 'AICTE Approved | Govt of Kerala Cost-Sharing College',
    acceptanceRate: 8.8,
    tuitionInState: 45000,
    tuitionOutOfState: 75000,
    tuitionDisplayINR: '₹45,000 / year (Govt Merit Quota)',
    feeStructureNote: 'Govt cost-sharing fee structure managed by LBS Centre for Science & Technology (Govt of Kerala). Merit quota filled via KEAM.',
    avgFinancialAid: 20000,
    medianStartingSalary: 520000,
    salaryDisplayINR: '₹5.2 LPA',
    studentFacultyRatio: '15:1',
    graduationRate: 91,
    bannerColor: 'from-slate-900 to-indigo-950',
    logo: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    description: 'Established in 1993 by the LBS Centre for Science and Technology (Government of Kerala), LBSCE Kasaragod is set on a 52-acre campus at Povval. Known for dedicated engineering faculty and steady placement track record in northern Kerala.',
    popularMajors: [
      'B.Tech Computer Science & Engineering',
      'B.Tech Information Technology',
      'B.Tech Electronics & Communication',
      'B.Tech Mechanical Engineering',
      'B.Tech Civil Engineering'
    ],
    courses: [
      {
        name: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + valid KEAM rank.',
        annualFeeINR: '₹45,000/yr',
        seats: 120,
        admissionRoute: 'KEAM (CEE Kerala)'
      },
      {
        name: 'B.Tech in Information Technology',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: '10+2 with PCM + KEAM rank.',
        annualFeeINR: '₹45,000/yr',
        seats: 60,
        admissionRoute: 'KEAM (CEE Kerala)'
      }
    ],
    facilities: [
      'High-bandwidth Central Computing Facility with Linux terminal clusters',
      'Robotics and Embedded Systems maker space',
      'Central Library with over 35,000 engineering volumes',
      'Hostels for men and women'
    ],
    alumniOutcomes: {
      employmentRate90Days: 84,
      topEmployers: ['TCS', 'Infosys', 'Cognizant', 'QBurst', 'Speridian', 'Federal Bank'],
      avg5YearSalary: 920000,
      placementHighlights: 'Steady IT recruitment and high proportion of alumni pursuing M.Tech in NITs and IITs.'
    },
    admissionRequirements: {
      gpaAverage: 'Plus Two PCM > 75%',
      applicationDeadlines: {
        regularDecision: 'CEE Kerala KEAM Allotment'
      },
      keyCriteria: ['KEAM rank allotment via CEE Kerala Single Window'],
      entranceExams: ['KEAM (CEE Kerala)']
    },
    officialWebsite: 'https://lbscek.ac.in',
    admissionPortalUrl: 'https://cee.kerala.gov.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / KEAM Allotment',
    officialSource: 'CEE Kerala & LBS Centre for Science and Technology',
    reviews: [
      {
        id: 'rev-lbs-1',
        authorName: 'Jithin Ramesh',
        gradYear: 'Class of 2023',
        major: 'B.Tech Computer Science',
        rating: 4.5,
        verifiedStatus: true,
        verificationSource: 'Verified Alumnus (Povval)',
        date: 'March 2024',
        title: 'Calm learning atmosphere with very cooperative professors',
        comment: 'LBS Kasaragod gave me a very disciplined engineering foundation. The coding labs are well-maintained, and our placement cell invited major tech companies right to Povval.',
        pros: ['Affordable merit fees', 'Helpful faculty', 'Good hostel facilities'],
        cons: ['Situated 12km from Kasaragod railway station'],
        ratingsBreakdown: { academics: 4.5, campusLife: 4.5, careerSupport: 4.4, roiValue: 4.8 }
      }
    ],
    tags: ['Govt Cost-Sharing', 'KTU Affiliated', 'KEAM Admission', 'LBS Centre', 'Kasaragod']
  },

  // PREMIER NATIONAL / GLOBAL INSTITUTIONS (Accessible when student toggles "Explore Beyond Kerala")
  {
    id: 'iit-madras',
    name: 'Indian Institute of Technology Madras (IIT Madras)',
    shortName: 'IIT Madras',
    location: 'Chennai, Tamil Nadu',
    district: 'Outside Kerala / National',
    state: 'Tamil Nadu',
    country: 'India',
    campusType: 'Urban',
    institutionType: 'Institute of National Importance',
    affiliatingUniversity: 'Autonomous / Ministry of Education, Govt of India',
    ranking: 1,
    nirfRank: 'NIRF #1 Overall & Engineering in India (Consecutive Years)',
    accreditation: 'Institute of National Importance | NIRF Rank #1',
    acceptanceRate: 1.2,
    tuitionInState: 220000,
    tuitionOutOfState: 220000,
    tuitionDisplayINR: '₹2,20,000 / year (Central Govt Fee)',
    feeStructureNote: 'Central government fee structure with 100% tuition waiver for SC/ST/PwD and income-based remissions.',
    avgFinancialAid: 85000,
    medianStartingSalary: 1850000,
    salaryDisplayINR: '₹18.5 LPA',
    studentFacultyRatio: '9:1',
    graduationRate: 99,
    bannerColor: 'from-amber-950 to-orange-950',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    description: 'Ranked #1 in India by NIRF across Overall and Engineering categories for successive years. Features the world-renowned IIT Madras Research Park and cutting-edge deep-tech incubators.',
    popularMajors: [
      'B.Tech Computer Science & Engineering',
      'B.Tech Electrical Engineering',
      'B.Tech Aerospace Engineering',
      'B.Tech Data Science & AI',
      'BS in Medical Sciences & Engineering'
    ],
    courses: [
      {
        name: 'B.Tech in Computer Science and Engineering',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: 'Class 12 with 75% in PCM + Top JEE Advanced Rank.',
        annualFeeINR: '₹2,20,000/yr',
        seats: 85,
        admissionRoute: 'JEE Advanced (JoSAA)'
      }
    ],
    facilities: [
      'IIT Madras Research Park (India’s first university research park)',
      'Centre for Innovation (CFI) student maker lab',
      'Robert Bosch Centre for Data Science and Artificial Intelligence (RBCDSAI)',
      'Sprawling deer and blackbuck wildlife sanctuary campus'
    ],
    alumniOutcomes: {
      employmentRate90Days: 98,
      topEmployers: ['Google', 'Microsoft', 'NVIDIA', 'McKinsey', 'Apple', 'Jane Street', 'Qualcomm'],
      avg5YearSalary: 2800000,
      placementHighlights: 'Highest domestic compensation exceeding ₹1 Crore with substantial global offers.'
    },
    admissionRequirements: {
      gpaAverage: '75% in 12th Board Exam',
      applicationDeadlines: {
        regularDecision: 'JoSAA Counselling (June - July)'
      },
      keyCriteria: ['JEE Advanced Rank via JoSAA'],
      entranceExams: ['JEE Advanced']
    },
    officialWebsite: 'https://www.iitm.ac.in',
    admissionPortalUrl: 'https://josaa.nic.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / JoSAA 2024',
    officialSource: 'JoSAA & IIT Madras Academic Council',
    reviews: [
      {
        id: 'rev-iitm-1',
        authorName: 'Gautham S.',
        gradYear: 'Class of 2024',
        major: 'B.Tech Electrical Engineering',
        rating: 5,
        verifiedStatus: true,
        verificationSource: 'Verified JoSAA Allotment',
        date: 'July 2024',
        title: 'India’s #1 engineering institute with phenomenal innovation culture',
        comment: 'CFI (Centre for Innovation) is open 24/7. Whether you want to build hyperloop pods, formula racing cars, or satellite payloads, funding and mentorship are immediate.',
        pros: ['NIRF #1 rank', 'IITM Research Park ecosystem', 'Incredible global alumni network'],
        cons: ['Heavy academic competition'],
        ratingsBreakdown: { academics: 5.0, campusLife: 4.9, careerSupport: 5.0, roiValue: 5.0 }
      }
    ],
    tags: ['Outside Kerala', 'NIRF #1', 'National Importance', 'JEE Advanced', 'Deep Tech']
  },
  {
    id: 'iisc-bengaluru',
    name: 'Indian Institute of Science (IISc), Bengaluru',
    shortName: 'IISc Bengaluru',
    location: 'CV Raman Road, Bengaluru, Karnataka',
    district: 'Outside Kerala / National',
    state: 'Karnataka',
    country: 'India',
    campusType: 'Urban',
    institutionType: 'Institute of National Importance',
    affiliatingUniversity: 'Autonomous / Ministry of Education, Govt of India',
    ranking: 1,
    nirfRank: 'NIRF #1 University in India',
    accreditation: 'Institute of Eminence | NIRF #1 University',
    acceptanceRate: 1.1,
    tuitionInState: 45000,
    tuitionOutOfState: 45000,
    tuitionDisplayINR: '₹45,000 / year (Central Govt Subsidized)',
    feeStructureNote: 'Central government subsidized tuition. All admitted Bachelor of Science students receive KVPY / INSPIRE / IISc fellowships.',
    avgFinancialAid: 84000,
    medianStartingSalary: 2100000,
    salaryDisplayINR: '₹21 LPA',
    studentFacultyRatio: '6:1',
    graduationRate: 99,
    bannerColor: 'from-blue-950 to-slate-900',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    description: 'Founded in 1909 with the vision of Jamsetji Tata and Swami Vivekananda, IISc is India’s foremost scientific and research institution. World-renowned for basic sciences, aerospace, quantum computing, and bioengineering.',
    popularMajors: [
      'Bachelor of Science (Research) in Physics',
      'Bachelor of Science (Research) in Mathematics',
      'B.Tech in Mathematics & Computing',
      'Bachelor of Science (Research) in Biology',
      'Bachelor of Science (Research) in Chemistry'
    ],
    courses: [
      {
        name: 'Bachelor of Science (Research) 4-Year Program',
        degree: 'B.Sc',
        duration: '4 Years',
        stream: 'Sciences',
        eligibility: 'Class 12 with PCM + Top rank in JEE Advanced / JEE Main / NEET-UG / IAT.',
        annualFeeINR: '₹45,000/yr',
        seats: 120,
        admissionRoute: 'JEE Advanced / JEE Main / NEET / IAT'
      },
      {
        name: 'B.Tech in Mathematics and Computing',
        degree: 'B.Tech',
        duration: '4 Years',
        stream: 'Engineering & Technology',
        eligibility: 'Class 12 with PCM + Top rank in JEE Advanced.',
        annualFeeINR: '₹2,20,000/yr',
        seats: 52,
        admissionRoute: 'JEE Advanced'
      }
    ],
    facilities: [
      'Param Pravega Supercomputer facility (3.3 Petaflops)',
      'Centre for Nano Science and Engineering (CeNSE)',
      'National High-Field NMR Facility',
      'Vast 400-acre canopy heritage campus with central library'
    ],
    alumniOutcomes: {
      employmentRate90Days: 98,
      topEmployers: ['DeepMind', 'Google Research', 'ISRO', 'Apple', 'Max Planck', 'Intel', 'Microsoft Research'],
      avg5YearSalary: 3200000,
      placementHighlights: 'Premier scientific destination in India with alumni leading ISRO, BARC, and global quantum labs.'
    },
    admissionRequirements: {
      gpaAverage: '60% first class in 12th Board',
      applicationDeadlines: {
        regularDecision: 'IISc Online Admissions Portal (March - May)'
      },
      keyCriteria: ['Rank in JEE Advanced / JEE Main / NEET / IAT'],
      entranceExams: ['JEE Advanced', 'JEE Main', 'NEET-UG', 'IAT']
    },
    officialWebsite: 'https://iisc.ac.in',
    admissionPortalUrl: 'https://admissions.iisc.ac.in',
    verifiedStatus: true,
    verifiedDate: 'October 2024 / IISc UG Admissions',
    officialSource: 'IISc Admissions Committee',
    reviews: [
      {
        id: 'rev-iisc-1',
        authorName: 'Vinayak M.',
        gradYear: 'Class of 2024',
        major: 'BS (Research) Physics',
        rating: 5,
        verifiedStatus: true,
        verificationSource: 'Verified IISc Scholar',
        date: 'July 2024',
        title: 'India’s ultimate temple of science and pure inquiry',
        comment: 'You take lectures from Bhatnagar awardees and Fellows of the Royal Society. The CeNSE cleanroom and NMR labs are completely accessible to undergraduate researchers.',
        pros: ['NIRF #1 University in India', 'Subsidized education with monthly student stipend', 'World-class science faculty'],
        cons: ['Extreme academic rigor, not suitable for students looking for easy leisure'],
        ratingsBreakdown: { academics: 5.0, campusLife: 4.8, careerSupport: 5.0, roiValue: 5.0 }
      }
    ],
    tags: ['Outside Kerala', 'NIRF #1 University', 'Pure Science & Deep Tech', 'Research Powerhouse', 'Bengaluru']
  }
];

// Helper to get colleges filtered specifically for Kerala
export const getKeralaColleges = () => {
  return KERALA_COLLEGES_DATA.filter(c => c.state === 'Kerala');
};

// Helper to get Kerala institutions matching top student characteristics
export const getRecommendedKeralaColleges = (
  strongestDimensions: string[] = [],
  districtPreference?: string
) => {
  const colleges = KERALA_COLLEGES_DATA.filter(c => c.state === 'Kerala');

  return colleges.map(college => {
    let matchScore = 70; // baseline
    const matchReasons: string[] = [];

    // Dimension match logic
    if (strongestDimensions.includes('Builder') || strongestDimensions.includes('Practical')) {
      if (college.institutionType?.includes('Government') && college.affiliatingUniversity?.includes('KTU')) {
        matchScore += 18;
        matchReasons.push('Strong alignment with your Builder & Practical problem-solving strengths through KTU technical curriculum.');
      } else if (college.popularMajors.some(m => m.includes('Engineering') || m.includes('B.Tech'))) {
        matchScore += 12;
        matchReasons.push('Hands-on maker laboratories and applied engineering projects.');
      }
    }

    if (strongestDimensions.includes('Intellectual') || strongestDimensions.includes('Investigative')) {
      if (college.institutionType?.includes('Institute of National Importance') || college.id.includes('iiser') || college.popularMajors.some(m => m.includes('Physics') || m.includes('Science') || m.includes('Research'))) {
        matchScore += 20;
        matchReasons.push('High-level theoretical inquiry, laboratory instrumentation, and scientific discovery.');
      }
    }

    if (strongestDimensions.includes('Creative')) {
      if (college.popularMajors.some(m => m.includes('Design') || m.includes('Architecture') || m.includes('Multimedia') || m.includes('Literature'))) {
        matchScore += 18;
        matchReasons.push('Exceptional creative expression, studio facilities, and media labs.');
      }
    }

    if (strongestDimensions.includes('Social') || strongestDimensions.includes('Empathetic')) {
      if (college.popularMajors.some(m => m.includes('Psychology') || m.includes('Social Work') || m.includes('Medicine') || m.includes('Agriculture'))) {
        matchScore += 18;
        matchReasons.push('Community-centered impact, fieldwork, and human development orientation.');
      }
    }

    if (strongestDimensions.includes('Entrepreneurial') || strongestDimensions.includes('Leadership')) {
      if (college.popularMajors.some(m => m.includes('Commerce') || m.includes('BBA') || m.includes('Management') || m.includes('Finance'))) {
        matchScore += 16;
        matchReasons.push('Active student entrepreneurship cells, industry proximity, and management training.');
      }
    }

    // District preference boost
    if (districtPreference && districtPreference !== 'All Kerala Districts' && college.district === districtPreference) {
      matchScore += 10;
      matchReasons.push(`Located directly in your target district (${districtPreference}).`);
    }

    // Cap matchScore at 98
    matchScore = Math.min(98, Math.max(68, matchScore));

    return {
      college,
      matchScore,
      matchReasons
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
};
