
import { Project, UserProfile } from "@/types";

let mockProjects: Project[] = [
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
    createdAt: "2023-09-15T10:30:00Z"
  },
  {
    id: "proj2",
    title: "E-commerce Platform",
    description: "A fully functional e-commerce platform with user authentication, product catalog, shopping cart, and checkout process. Built with React, Node.js, and MongoDB.",
    category: "Web Development",
    submittedBy: "user2",
    submittedByName: "Jane Smith",
    githubLink: "https://github.com/janesmith/ecommerce-platform",
    zipFile: "https://example.com/files/ecommerce-platform.zip",
    status: "review",
    createdAt: "2023-10-01T14:20:00Z"
  },
  {
    id: "proj3",
    title: "Mobile Task Manager",
    description: "A mobile task management application that allows users to create, organize, and track their tasks. Built with React Native and Firebase.",
    category: "Mobile Development",
    submittedBy: "user1",
    submittedByName: "John Doe",
    githubLink: "https://github.com/johndoe/mobile-task-manager",
    zipFile: "https://example.com/files/mobile-task-manager.zip",
    status: "pending",
    createdAt: "2023-10-05T09:15:00Z"
  },
  {
    id: "proj4",
    title: "Cybersecurity Threat Detection System",
    description: "A system that detects and prevents cybersecurity threats using machine learning algorithms. Built with Python, Scikit-learn, and Keras.",
    category: "Cybersecurity",
    submittedBy: "user3",
    submittedByName: "Alice Johnson",
    githubLink: "https://github.com/alicejohnson/cybersecurity-threat-detection",
    zipFile: "https://example.com/files/cybersecurity-threat-detection.zip",
    status: "graded",
    grades: {
      codeQuality: 7,
      documentation: 6,
      innovation: 8,
      functionality: 9,
      totalScore: 30,
      feedback: "The project demonstrates a solid understanding of machine learning techniques applied to cybersecurity. The threat detection model is effective, but the documentation needs improvement. Consider adding more details about the data sources and feature engineering process."
    },
    reviewedBy: "admin2",
    createdAt: "2023-10-10T16:40:00Z"
  },
  {
    id: "proj5",
    title: "3D Game with Unity",
    description: "A 3D game developed with Unity, featuring immersive environments and engaging gameplay. Programmed in C#.",
    category: "Game Development",
    submittedBy: "user2",
    submittedByName: "Jane Smith",
    githubLink: "https://github.com/janesmith/unity-3d-game",
    zipFile: "https://example.com/files/unity-3d-game.zip",
    status: "rejected",
    createdAt: "2023-10-12T11:00:00Z"
  },
  {
    id: "proj6",
    title: "Data Analysis of Sales Data",
    description: "Analysis of sales data using Python and Pandas to identify trends and insights. Includes visualizations with Matplotlib and Seaborn.",
    category: "Data Science",
    submittedBy: "user3",
    submittedByName: "Alice Johnson",
    githubLink: "https://github.com/alicejohnson/sales-data-analysis",
    zipFile: "https://example.com/files/sales-data-analysis.zip",
    status: "pending",
    createdAt: "2023-10-15T13:55:00Z"
  },
  {
    id: "proj7",
    title: "Cloud Computing Project",
    description: "A project demonstrating cloud computing concepts using AWS services. Includes deployment and scaling strategies.",
    category: "Cloud Computing",
    submittedBy: "user1",
    submittedByName: "John Doe",
    githubLink: "https://github.com/johndoe/cloud-computing-project",
    zipFile: "https://example.com/files/cloud-computing-project.zip",
    status: "review",
    createdAt: "2023-10-18T08:25:00Z"
  },
  {
    id: "proj8",
    title: "IoT Smart Home Automation",
    description: "An IoT project for smart home automation using Raspberry Pi and various sensors. Controlled via a web interface.",
    category: "IoT",
    submittedBy: "user4",
    submittedByName: "Bob Williams",
    githubLink: "https://github.com/bobwilliams/iot-smart-home",
    zipFile: "https://example.com/files/iot-smart-home.zip",
    status: "graded",
    grades: {
      codeQuality: 8,
      documentation: 7,
      innovation: 9,
      functionality: 10,
      totalScore: 34,
      feedback: "Excellent IoT project with a well-designed web interface. The sensor integration is seamless, and the automation logic is robust. The documentation is clear and concise. Consider adding more security features to protect against unauthorized access. Overall, a very impressive project that demonstrates strong understanding of IoT concepts."
    },
    reviewedBy: "admin1",
    createdAt: "2023-10-20T17:10:00Z"
  },
  {
    id: "proj9",
    title: "Other Project Example",
    description: "An example project that falls into the 'Other' category. This could be anything that doesn't fit into the other categories.",
    category: "Other",
    submittedBy: "user4",
    submittedByName: "Bob Williams",
    githubLink: "https://github.com/bobwilliams/other-project",
    zipFile: "https://example.com/files/other-project.zip",
    status: "pending",
    createdAt: "2023-10-22T12:30:00Z"
  }
];

// Mock user data
const mockUsers: UserProfile[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
  },
  {
    id: "user3",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "user",
  },
  {
    id: "user4",
    name: "Bob Williams",
    email: "bob@example.com",
    role: "user",
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "admin2",
    name: "Super Admin",
    email: "superadmin@example.com",
    role: "admin",
  }
];

export const getMockProjects = (): Project[] => {
  return [...mockProjects];
};

// Function to get mock users
export const getMockUsers = (): UserProfile[] => {
  return [...mockUsers];
};

// New function to add a project to the mock data
export const addMockProject = (project: Omit<Project, "id" | "createdAt">): Project => {
  const newProject: Project = {
    ...project,
    id: `proj${mockProjects.length + 1}`,
    createdAt: new Date().toISOString()
  };
  
  mockProjects.push(newProject);
  console.log("Project added to mock data:", newProject);
  console.log("Updated projects list:", mockProjects);
  
  return newProject;
};
