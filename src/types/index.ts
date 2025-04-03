
// User types
export type UserRole = 'user' | 'admin' | 'superadmin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  enrolledClasses?: string[]; // Array of class IDs that the user has joined
  links?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  // Additional teacher-specific fields
  createdClasses?: string[]; // Array of class IDs that the teacher created
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

export type ProjectType =
  | 'Assignment'
  | 'Final Project'
  | 'Research'
  | 'Personal Project'
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
  projectType?: ProjectType;
  submittedBy: string;
  submittedByName?: string;
  assignedTeacherId?: string;
  assignedTeacherName?: string;
  classKey?: string;
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
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

// Class types
export interface ClassInfo {
  id: string;
  name: string;
  key: string;
  teacherId: string;
  teacherName: string;
  description?: string;
  createdAt: string;
  students?: string[]; // Array of student IDs enrolled in this class
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
  linkTo?: string;
  type: 'info' | 'success' | 'warning' | 'error';
}
