export interface Solution {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string; // lucide icon name
  impactMetric: string;
  useCase: string;
}

export interface Problem {
  id: string;
  title: string;
  challenge: string;
  consequence: string;
  iconName: string;
}

export interface WhyBenefit {
  title: string;
  description: string;
  accentText: string;
}

export interface IndustryCategory {
  title: string;
  subCategory: string;
  examples: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
    description: string;
  }[];
}

export interface BookingSubmission {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  employeeCount: string;
  biggestPainPoint: string;
  date: string;
  timeSlot: string;
}
