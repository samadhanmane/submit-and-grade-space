
// User types
export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  links?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

// Project types
export type ProjectStatus = 'pending' | 'review' | 'graded' | 'rejected';

export type ProjectCategory = 
  | 'Web Development' 
  | 'Mobile Development' 
  | 'AI/ML' 
  | 'Cybersecurity'
  | 'Game Development'
  | 'Data Science'
  | 'Cloud Computing'
  | 'IoT'
  | 'Other';

export interface ProjectGrading {
  codeQuality?: number;
  documentation?: number;
  innovation?: number;
  functionality?: number;
  totalScore?: number;
  feedback?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  submittedBy: string;
  submittedByName?: string;
  githubLink?: string;
  zipFile?: string;
  status: ProjectStatus;
  grades?: ProjectGrading;
  reviewedBy?: string;
  createdAt: string;
  updatedAt?: string;
}

// Auth context types
export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}
