import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AssessmentResult, JobApplication } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  login: (email: string) => Promise<boolean>;
  signup: (name: string, email: string, educationLevel: UserProfile['educationLevel']) => Promise<boolean>;
  switchDemoUser: (personaKey: 'alex' | 'priya') => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  saveAssessmentResult: (result: AssessmentResult) => void;
  toggleSaveCollege: (collegeId: string) => void;
  enrollCourse: (courseId: string) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  submitInternshipApplication: (jobId: string, coverNote?: string) => void;
  upgradeToPro: (tier?: 'pro_student' | 'pro_fellow') => void;
}

const STORAGE_KEY = 'ascent_student_profile_v1';

const defaultGuestUser: UserProfile = {
  id: 'user_guest',
  name: 'Taylor Reed',
  email: 'taylor.reed@highschool.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  educationLevel: 'High School Senior',
  currentSchool: 'Lincoln High School',
  gpa: '3.82',
  budgetPerYear: 45000,
  targetLocations: ['California', 'Massachusetts', 'New York'],
  interests: ['Computer Science', 'Artificial Intelligence', 'Robotics'],
  skills: ['Python', 'Git', 'Problem Solving'],
  savedCollegeIds: ['stanford', 'uc-berkeley'],
  enrolledCourseIds: ['course-dl-ai'],
  courseProgress: { 'course-dl-ai': 25 },
  completedProjectIds: [],
  internshipApplications: [],
  isPro: false,
  proTier: 'free'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed reading saved profile:', e);
    }
    // Default to Alex demo user so the evaluator starts with a rich, pre-loaded profile!
    return DEMO_USERS.alex;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to persist user profile:', e);
    }
  }, [user]);

  const login = async (email: string): Promise<boolean> => {
    // Check if matching demo
    if (email.toLowerCase().includes('priya')) {
      setUser(DEMO_USERS.priya);
      setIsAuthenticated(true);
      return true;
    }
    if (email.toLowerCase().includes('alex')) {
      setUser(DEMO_USERS.alex);
      setIsAuthenticated(true);
      return true;
    }

    // Generic user login
    setUser(prev => ({
      ...prev,
      email,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())
    }));
    setIsAuthenticated(true);
    return true;
  };

  const signup = async (
    name: string,
    email: string,
    educationLevel: UserProfile['educationLevel']
  ): Promise<boolean> => {
    const newUser: UserProfile = {
      id: 'user_' + Date.now(),
      name,
      email,
      educationLevel,
      budgetPerYear: 40000,
      targetLocations: ['California', 'New York', 'Texas'],
      interests: ['Computer Science', 'Engineering'],
      skills: ['Python', 'Git'],
      savedCollegeIds: [],
      enrolledCourseIds: [],
      courseProgress: {},
      completedProjectIds: [],
      internshipApplications: [],
      isPro: false,
      proTier: 'free'
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const switchDemoUser = (personaKey: 'alex' | 'priya') => {
    if (DEMO_USERS[personaKey]) {
      setUser(DEMO_USERS[personaKey]);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setUser({
      ...defaultGuestUser,
      id: 'user_logged_out',
      name: 'Guest Explorer',
      email: 'guest@ascend.edu',
      savedCollegeIds: [],
      enrolledCourseIds: [],
      courseProgress: {},
      internshipApplications: [],
      assessmentResult: undefined
    });
    setIsAuthenticated(false);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const saveAssessmentResult = (result: AssessmentResult) => {
    setUser(prev => ({
      ...prev,
      assessmentResult: result
    }));
  };

  const toggleSaveCollege = (collegeId: string) => {
    setUser(prev => {
      const exists = prev.savedCollegeIds.includes(collegeId);
      const updatedSaved = exists
        ? prev.savedCollegeIds.filter(id => id !== collegeId)
        : [...prev.savedCollegeIds, collegeId];
      return {
        ...prev,
        savedCollegeIds: updatedSaved
      };
    });
  };

  const enrollCourse = (courseId: string) => {
    setUser(prev => {
      if (prev.enrolledCourseIds.includes(courseId)) return prev;
      return {
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, courseId],
        courseProgress: {
          ...prev.courseProgress,
          [courseId]: 5
        }
      };
    });
  };

  const updateCourseProgress = (courseId: string, progress: number) => {
    setUser(prev => ({
      ...prev,
      courseProgress: {
        ...prev.courseProgress,
        [courseId]: Math.min(100, Math.max(0, progress))
      }
    }));
  };

  const submitInternshipApplication = (jobId: string, coverNote?: string) => {
    setUser(prev => {
      const existing = prev.internshipApplications.find(a => a.jobId === jobId);
      if (existing) return prev;

      const newApp: JobApplication = {
        id: 'app_' + Date.now(),
        jobId,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'Submitted',
        coverNote: coverNote || 'Excited to apply through the Ascend Career Launchpad!'
      };

      return {
        ...prev,
        internshipApplications: [newApp, ...prev.internshipApplications]
      };
    });
  };

  const upgradeToPro = (tier: 'pro_student' | 'pro_fellow' = 'pro_student') => {
    setUser(prev => ({
      ...prev,
      isPro: true,
      proTier: tier
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        switchDemoUser,
        logout,
        updateProfile,
        saveAssessmentResult,
        toggleSaveCollege,
        enrollCourse,
        updateCourseProgress,
        submitInternshipApplication,
        upgradeToPro
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
