
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Project } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { getMockProjects } from "@/utils/mockData";
import { useAuth } from "@/context/AuthContext";
import { PlusCircle } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch projects from an API
        // For now, we'll use mock data and filter by current user
        const allProjects = getMockProjects();
        const userProjects = user 
          ? allProjects.filter(p => p.submittedBy === user.id)
          : [];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setProjects(userProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast({
          variant: "destructive",
          title: "Failed to load projects",
          description: "There was an error loading your projects. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [toast, user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[240px] p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Projects</h1>
              <Button asChild>
                <Link to="/submit">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Submit New Project
                </Link>
              </Button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <PlusCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-2">No projects yet</h2>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  You haven't submitted any projects yet. Create your first project by clicking the button below.
                </p>
                <Button asChild>
                  <Link to="/submit">Submit Your First Project</Link>
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
