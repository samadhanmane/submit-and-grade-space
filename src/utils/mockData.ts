import { UserProfile, ClassInfo, Project, ProjectCategory, ProjectType } from "@/types";

// Mock project categories and types
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Web Development",
  "Mobile Development",
  "AI/ML",
  "Cybersecurity",
  "Game Development",
  "Data Science",
  "Cloud Computing",
  "IoT",
  "Other",
];

export const PROJECT_TYPES: ProjectType[] = [
  "Assignment",
  "Final Project",
  "Research",
  "Personal Project",
  "Other",
];

// Mock users (replace with API calls in a real app)
export const getMockUsers = (): UserProfile[] => {
  // Check if we have stored users
  const storedUsers = localStorage.getItem('mockUsers');
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }

  // Initial set of users
  const users: UserProfile[] = [
    {
      id: 'user-1',
      name: 'John Student',
      email: 'student@example.com',
      role: 'user',
      enrolledClasses: ['class-1', 'class-2'],
      profileImage: 'https://i.pravatar.cc/150?u=user-1',
    },
    {
      id: 'user-2',
      name: 'Jane Teacher',
      email: 'teacher@example.com',
      role: 'admin',
      profileImage: 'https://i.pravatar.cc/150?u=user-2',
      createdClasses: ['class-1']
    },
    {
      id: 'user-3',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'superadmin',
      profileImage: 'https://i.pravatar.cc/150?u=user-3',
    },
    {
      id: 'user-4',
      name: 'Sarah Student',
      email: 'sarah@example.com',
      role: 'user',
      enrolledClasses: ['class-1'],
      profileImage: 'https://i.pravatar.cc/150?u=user-4',
    },
    {
      id: 'user-5',
      name: 'Mike Professor',
      email: 'mike@example.com',
      role: 'admin',
      profileImage: 'https://i.pravatar.cc/150?u=user-5',
      createdClasses: ['class-2', 'class-3']
    }
  ];

  // Store the users
  localStorage.setItem('mockUsers', JSON.stringify(users));
  
  return users;
};

export const getMockTeachers = (): UserProfile[] => {
  const users = getMockUsers();
  return users.filter(user => user.role === 'admin');
};

// Mock classes (replace with API calls in a real app)
let mockClasses: ClassInfo[] = [
  {
    id: 'class-1',
    name: 'Web Development 101',
    key: 'WD101-A2Z9',
    teacherId: 'user-2',
    teacherName: 'Jane Teacher',
    description: 'Introduction to web development with HTML, CSS, and JavaScript.',
    createdAt: new Date().toISOString(),
    students: ['user-1', 'user-4'],
  },
  {
    id: 'class-2',
    name: 'Mobile App Development',
    key: 'MAD201-B8XY',
    teacherId: 'user-5',
    teacherName: 'Mike Professor',
    description: 'Learn to build native mobile apps for iOS and Android.',
    createdAt: new Date().toISOString(),
    students: ['user-1'],
  },
  {
    id: 'class-3',
    name: 'Data Science Fundamentals',
    key: 'DSF301-C6UV',
    teacherId: 'user-5',
    teacherName: 'Mike Professor',
    description: 'Explore the basics of data science with Python.',
    createdAt: new Date().toISOString(),
  },
];

export const getMockClasses = (): ClassInfo[] => mockClasses;

export const getClassesByTeacher = (teacherId: string): ClassInfo[] => {
  return mockClasses.filter(cls => cls.teacherId === teacherId);
};

export const getClassesByStudent = (studentId: string): ClassInfo[] => {
  return mockClasses.filter(cls => cls.students?.includes(studentId));
};

export const addMockClass = (newClassInfo: Omit<ClassInfo, 'id' | 'key' | 'createdAt'>): ClassInfo => {
  const newClass: ClassInfo = {
    id: `class-${Date.now()}`,
    key: generateClassKey(),
    createdAt: new Date().toISOString(),
    ...newClassInfo,
  };
  mockClasses = [...mockClasses, newClass];
  return newClass;
};

// Mock projects (replace with API calls in a real app)
let mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Personal Website',
    description: 'A personal website built with React.',
    category: 'Web Development',
    projectType: 'Personal Project',
    submittedBy: 'user-1',
    submittedByName: 'John Student',
    assignedTeacherId: 'user-2',
    assignedTeacherName: 'Jane Teacher',
    classKey: 'WD101-A2Z9',
    githubLink: 'https://github.com/john-student/personal-website',
    status: 'graded',
    grades: {
      codeQuality: 85,
      documentation: 90,
      innovation: 75,
      functionality: 95,
      totalScore: 86.25,
      feedback: 'Great job on the website! The design is clean and the code is well-organized.',
    },
    reviewedBy: 'user-2',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'project-2',
    title: 'Mobile App for Task Management',
    description: 'A mobile app for managing tasks built with React Native.',
    category: 'Mobile Development',
    projectType: 'Final Project',
    submittedBy: 'user-1',
    submittedByName: 'John Student',
    assignedTeacherId: 'user-5',
    assignedTeacherName: 'Mike Professor',
    classKey: 'MAD201-B8XY',
    githubLink: 'https://github.com/john-student/task-management-app',
    status: 'review',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'project-3',
    title: 'AI-Powered Chatbot',
    description: 'An AI-powered chatbot built with Python and TensorFlow.',
    category: 'AI/ML',
    projectType: 'Research',
    submittedBy: 'user-4',
    submittedByName: 'Sarah Student',
    assignedTeacherId: 'user-2',
    assignedTeacherName: 'Jane Teacher',
    classKey: 'WD101-A2Z9',
    githubLink: 'https://github.com/sarah-student/ai-chatbot',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

export const getMockProjects = (): Project[] => mockProjects;

export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(project => project.id === id);
};

export const addMockProject = (newProjectInfo: Omit<Project, 'id' | 'createdAt'>): Project => {
  const newProject: Project = {
    id: `project-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...newProjectInfo,
  };
  mockProjects = [...mockProjects, newProject];
  return newProject;
};

// Helper function to generate a random class key
const generateClassKey = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  for (let i = 0; i < 8; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
};
