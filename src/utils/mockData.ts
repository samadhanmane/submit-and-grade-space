
import { Project, UserProfile, ProjectCategory, ProjectStatus } from "@/types";

// Mock users
export const getMockUsers = (): UserProfile[] => {
  return [
    {
      id: "user1",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      profileImage: "https://i.pravatar.cc/150?img=1",
      links: {
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
      },
    },
    {
      id: "user2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      profileImage: "https://i.pravatar.cc/150?img=5",
      links: {
        github: "https://github.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith",
      },
    },
    {
      id: "admin1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      profileImage: "https://i.pravatar.cc/150?img=3",
    },
  ];
};

// Mock projects
export const getMockProjects = (): Project[] => {
  return [
    {
      id: "proj1",
      title: "AI Chatbot Using NLP",
      description: "An AI chatbot that uses natural language processing to understand and respond to user queries. Built with Python, TensorFlow, and NLTK.",
      category: "AI/ML",
      submittedBy: "user1",
      submittedByName: "John Doe",
      githubLink: "https://github.com/johndoe/ai-chatbot",
      zipFile: "https://example.com/files/ai-chatbot.zip",
      status: "graded",
      grades: {
        codeQuality: 9,
        documentation: 8,
        innovation: 10,
        functionality: 8,
        totalScore: 35,
        feedback: "Excellent work on the NLP implementation. The model shows good understanding of context in conversation. The documentation could be more detailed regarding the training process. Overall, a very impressive project that demonstrates strong understanding of AI concepts."
      },
      reviewedBy: "admin1",
      createdAt: "2023-09-15T10:30:00Z",
    },
    {
      id: "proj2",
      title: "E-commerce Website",
      description: "A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and payment integration. Built with React, Node.js, Express, and MongoDB.",
      category: "Web Development",
      submittedBy: "user1",
      submittedByName: "John Doe",
      githubLink: "https://github.com/johndoe/ecommerce-site",
      zipFile: "https://example.com/files/ecommerce.zip",
      status: "pending",
      createdAt: "2023-10-05T14:20:00Z",
    },
    {
      id: "proj3",
      title: "Network Security Scanner",
      description: "A cybersecurity tool that scans networks for vulnerabilities and provides detailed reports with remediation suggestions. Built with Python and uses industry-standard security libraries.",
      category: "Cybersecurity",
      submittedBy: "user2",
      submittedByName: "Jane Smith",
      githubLink: "https://github.com/janesmith/security-scanner",
      zipFile: "https://example.com/files/scanner.zip",
      status: "review",
      createdAt: "2023-10-10T09:45:00Z",
    },
    {
      id: "proj4",
      title: "Mobile Fitness App",
      description: "A cross-platform mobile app that tracks fitness activities, provides workout plans, and monitors health metrics. Built with Flutter and Firebase.",
      category: "Mobile Development",
      submittedBy: "user2",
      submittedByName: "Jane Smith",
      githubLink: "https://github.com/janesmith/fitness-app",
      zipFile: "https://example.com/files/fitness-app.zip",
      status: "graded",
      grades: {
        codeQuality: 7,
        documentation: 9,
        innovation: 8,
        functionality: 9,
        totalScore: 33,
        feedback: "The app has a clean, intuitive UI and works well across different devices. Code organization could be improved for better maintainability. The documentation is excellent, making it easy for others to understand the project structure."
      },
      reviewedBy: "admin1",
      createdAt: "2023-09-20T16:15:00Z",
    },
    {
      id: "proj5",
      title: "Data Visualization Dashboard",
      description: "An interactive dashboard that visualizes complex datasets using various chart types and filtering options. Built with D3.js, React, and Express.",
      category: "Data Science",
      submittedBy: "user1",
      submittedByName: "John Doe",
      githubLink: "https://github.com/johndoe/data-dashboard",
      zipFile: "https://example.com/files/dashboard.zip",
      status: "rejected",
      grades: {
        codeQuality: 5,
        documentation: 3,
        innovation: 6,
        functionality: 4,
        totalScore: 18,
        feedback: "The visualization concepts are interesting, but the implementation has several issues. Many features don't work as expected, and there's minimal documentation. Please review the code quality issues highlighted and resubmit with improved documentation."
      },
      reviewedBy: "admin1",
      createdAt: "2023-10-01T11:10:00Z",
    },
    {
      id: "proj6",
      title: "Augmented Reality Game",
      description: "A mobile AR game that uses the device camera to overlay game elements on the real world. Built with Unity, ARCore, and ARKit.",
      category: "Game Development",
      submittedBy: "user2",
      submittedByName: "Jane Smith",
      githubLink: "https://github.com/janesmith/ar-game",
      zipFile: "https://example.com/files/ar-game.zip",
      status: "review",
      createdAt: "2023-10-12T13:25:00Z",
    },
  ];
};

// Generate a demo user project
export const generateDemoProject = (
  title: string,
  description: string,
  category: ProjectCategory,
  userId: string,
  userName: string,
  githubLink?: string
): Project => {
  return {
    id: `proj-${Date.now()}`,
    title,
    description,
    category,
    submittedBy: userId,
    submittedByName: userName,
    githubLink,
    status: "pending" as ProjectStatus,
    createdAt: new Date().toISOString(),
  };
};
