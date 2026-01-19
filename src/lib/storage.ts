// LocalStorage utilities for offline-first data persistence

export interface UserProfile {
  id: string;
  createdAt: string;
  isPremium: boolean;
  photoUrl?: string;
  name?: string;
}

export interface JobRiskAssessment {
  id: string;
  date: string;
  industry: string;
  jobRole: string;
  contractType: string;
  experienceLevel: string;
  location: string;
  automationExposure: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  insights: string[];
}

export interface SkillGapAssessment {
  id: string;
  date: string;
  currentSkills: string[];
  desiredRole: string;
  gaps: string[];
  transferableSkills: string[];
  recommendations: string[];
}

export interface AIExposureAssessment {
  id: string;
  date: string;
  jobRole: string;
  exposureScore: number;
  exposureLevel: 'low' | 'medium' | 'high';
  reasons: string[];
  humanCentricSkills: string[];
}

export interface CareerPlan {
  id: string;
  date: string;
  shortTermGoals: string[];
  midTermGoals: string[];
  longTermGoals: string[];
  skills: string[];
  habits: string[];
}

export interface AppData {
  profile: UserProfile | null;
  jobRiskAssessments: JobRiskAssessment[];
  skillGapAssessments: SkillGapAssessment[];
  aiExposureAssessments: AIExposureAssessment[];
  careerPlans: CareerPlan[];
}

const STORAGE_KEY = 'career_shield_data';

export const getAppData = (): AppData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  return {
    profile: null,
    jobRiskAssessments: [],
    skillGapAssessments: [],
    aiExposureAssessments: [],
    careerPlans: [],
  };
};

export const saveAppData = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const initializeProfile = (): UserProfile => {
  const data = getAppData();
  if (!data.profile) {
    data.profile = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      isPremium: false,
    };
    saveAppData(data);
  }
  return data.profile;
};

export const saveJobRiskAssessment = (assessment: Omit<JobRiskAssessment, 'id' | 'date'>): JobRiskAssessment => {
  const data = getAppData();
  const newAssessment: JobRiskAssessment = {
    ...assessment,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  data.jobRiskAssessments.unshift(newAssessment);
  saveAppData(data);
  return newAssessment;
};

export const saveSkillGapAssessment = (assessment: Omit<SkillGapAssessment, 'id' | 'date'>): SkillGapAssessment => {
  const data = getAppData();
  const newAssessment: SkillGapAssessment = {
    ...assessment,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  data.skillGapAssessments.unshift(newAssessment);
  saveAppData(data);
  return newAssessment;
};

export const saveAIExposureAssessment = (assessment: Omit<AIExposureAssessment, 'id' | 'date'>): AIExposureAssessment => {
  const data = getAppData();
  const newAssessment: AIExposureAssessment = {
    ...assessment,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  data.aiExposureAssessments.unshift(newAssessment);
  saveAppData(data);
  return newAssessment;
};

export const saveCareerPlan = (plan: Omit<CareerPlan, 'id' | 'date'>): CareerPlan => {
  const data = getAppData();
  const newPlan: CareerPlan = {
    ...plan,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  data.careerPlans.unshift(newPlan);
  saveAppData(data);
  return newPlan;
};

export const upgradeToPremium = (): void => {
  const data = getAppData();
  if (data.profile) {
    data.profile.isPremium = true;
    saveAppData(data);
  }
};

export const updateProfilePhoto = (photoUrl: string): void => {
  const data = getAppData();
  if (data.profile) {
    data.profile.photoUrl = photoUrl;
    saveAppData(data);
  }
};

export const updateProfileName = (name: string): void => {
  const data = getAppData();
  if (data.profile) {
    data.profile.name = name;
    saveAppData(data);
  }
};

export const generateId = (): string => crypto.randomUUID();
