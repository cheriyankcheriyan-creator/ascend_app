export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  educationLevel: 'High School Junior' | 'High School Senior' | 'College Freshman' | 'College Sophomore' | 'Career Explorer';
  currentSchool?: string;
  gpa?: string;
  budgetPerYear: number;
  targetLocations: string[];
  interests: string[];
  skills: string[];
  assessmentResult?: AssessmentResult;
  savedCollegeIds: string[];
  enrolledCourseIds: string[];
  courseProgress: Record<string, number>; // courseId -> percentage (0-100)
  completedProjectIds: string[];
  internshipApplications: JobApplication[];
  isPro: boolean;
  proTier?: 'free' | 'pro_student' | 'pro_fellow';
}

export interface JobApplication {
  id: string;
  jobId: string;
  appliedDate: string;
  status: 'Submitted' | 'Under Review' | 'Interview Round' | 'Offer Extended';
  coverNote?: string;
}

export interface AssessmentQuestion {
  id: string;
  stage: 'hobbies_activities' | 'academic_learning' | 'creativity_arts' | 'people_society' | 'business_ventures' | 'science_discovery' | 'practical_craft' | 'thinking_preferences' | 'values_motivations' | 'future_aspirations' | 'career_clarity';
  category: string;
  question: string;
  subtitle: string;
  isMultiSelect?: boolean;
  maxSelect?: number;
  allowCustomInput?: boolean;
  customInputPlaceholder?: string;
  allowSkip?: boolean;
  options: {
    label: string;
    description: string;
    value: string;
    domain?: string;
    tags?: string[];
  }[];
}

export interface AssessmentResult {
  id: string;
  completedAt: string;
  
  // Refined individual identity & multi-domain genuine interests
  archetype: string;
  archetypeTagline: string;
  summary: string;
  strongestInterestAreas: string[];
  secondaryInterestAreas: string[];
  corePassions: string[];
  curiosityDrivers: string[];
  problemsToSolve: string[];
  coreValues: string[];
  skillsToDevelop: string[];
  
  // Flexible thinking style (not rigid personality labels)
  thinkingStyle: {
    approach: string;
    flexiblePreferences: string[];
    collaborationVibe: string;
    description: string;
  };
  
  // Career clarity & validation (distinguishes interest vs career ambition)
  careerClarity: {
    status: 'Refining Specific Ambition' | 'Exploring Multi-Disciplinary Passions' | 'Early Discovery & Testing' | 'Open Exploration';
    existingAmbitions: string;
    counselorValidation: string;
  };

  // Alternative paths (for uncertain or multi-passionate students)
  alternativePaths?: {
    title: string;
    description: string;
    reason: string;
  }[];

  // Recommendations with "Why it fits" and "Practical Simulations"
  recommendedCareers: RecommendedCareer[];
  recommendedMajors: RecommendedMajor[];

  // Vocational spectrum & learning dynamics
  riasecScores: {
    realistic: number;
    investigative: number;
    artistic: number;
    social: number;
    enterprising: number;
    conventional: number;
  };
  workStyle: {
    introversionExtroversionLabel: string;
    introversionExtroversionScore: number;
    collaborationPreference: string;
    environmentType: string;
    problemSolvingApproach: string;
  };
  learningStyle: {
    primaryStyle: string;
    description: string;
    recommendedFormat: string;
  };
  strengths: string[];
  growthAreas: string[];
}

export interface RecommendedCareer {
  id: string;
  title: string;
  matchScore: number;
  industry: string;
  salaryRange: string;
  growthOutlook: string;
  automationResilience: 'High' | 'Very High' | 'Moderate';
  description: string;
  keySkills: string[];
  dayInTheLife: string;
  whyItFitsWhatYouLove?: string;
  practicalSimulation?: {
    title: string;
    description: string;
    tryItThisWeekend: string;
  };
}

export interface RecommendedMajor {
  id: string;
  name: string;
  degreeType: string;
  matchReason: string;
  targetColleges: string[];
  careerAlignment: string[];
}

export interface CollegeReview {
  id: string;
  authorName: string;
  gradYear: string;
  major: string;
  rating: number; // 1-5
  verifiedStatus: boolean;
  verificationSource: string; // e.g. "Verified .edu student (Class of 2025)"
  date: string;
  title: string;
  comment: string;
  pros: string[];
  cons: string[];
  ratingsBreakdown: {
    academics: number;
    campusLife: number;
    careerSupport: number;
    roiValue: number;
  };
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  location: string;
  state: string;
  country: string;
  campusType: 'Urban' | 'Suburban' | 'College Town' | 'Rural';
  ranking: number;
  acceptanceRate: number; // percentage, e.g. 4.5
  tuitionInState: number;
  tuitionOutOfState: number;
  avgFinancialAid: number;
  medianStartingSalary: number;
  studentFacultyRatio: string;
  graduationRate: number; // percentage
  image: string;
  logo: string;
  bannerColor: string;
  description: string;
  popularMajors: string[];
  facilities: string[];
  alumniOutcomes: {
    employmentRate90Days: number;
    topEmployers: string[];
    avg5YearSalary: number;
  };
  admissionRequirements: {
    gpaAverage: string;
    satRange: string;
    actRange: string;
    applicationDeadlines: {
      earlyDecision?: string;
      regularDecision: string;
    };
    keyCriteria: string[];
  };
  reviews: CollegeReview[];
  tags: string[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  partnerBadge: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  isFree: boolean;
  price?: number;
  rating: number;
  reviewCount: number;
  skillsGained: string[];
  syllabus: {
    week: number;
    title: string;
    topics: string[];
  }[];
  practicalProject: {
    title: string;
    description: string;
    deliverable: string;
  };
  certification: {
    type: string;
    accreditation: string;
  };
  recommendedForCareers: string[];
  image: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  type: 'Summer Internship' | 'Fall Co-op' | 'Fellowship' | 'Entry-Level Fulltime';
  stipend: string;
  duration: string;
  deadline: string;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  eligibility: string[];
  matchedCareers: string[];
  spotsAvailable: number;
}
