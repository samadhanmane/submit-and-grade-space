
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Upload, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { getMockProjects } from "@/utils/mockData";

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch user projects from an API
        // For now, we'll use mock data
        const data = getMockProjects().filter(p => p.submittedBy === user?.id);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProjects();
    }
  }, [user]);

  // Get counts for dashboard stats
  const projectCount = projects.length;
  const pendingCount = projects.filter(p => p.status === "pending").length;
  const gradedCount = projects.filter(p => p.status === "graded").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[240px] p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <Button asChild>
                <Link to="/submit">
                  <Upload className="mr-2 h-4 w-4" />
                  Submit New Project
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Total Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-2xl font-bold">{projectCount}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Pending Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-2xl font-bold">{pendingCount}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Graded Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-2xl font-bold">{gradedCount}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="h-[250px] animate-pulse">
                      <CardHeader className="pb-2">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/6 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/6"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.slice(0, 3).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <div className="rounded-full bg-gray-100 p-3 mb-4">
                      <Upload className="h-6 w-6 text-gray-500" />
                    </div>
                    <CardTitle className="mb-2">No Projects Yet</CardTitle>
                    <CardDescription className="text-center mb-4">
                      You haven't submitted any projects yet. Get started by creating your first project.
                    </CardDescription>
                    <Button asChild>
                      <Link to="/submit">Submit Your First Project</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {projects.length > 3 && (
                <div className="flex justify-center mt-4">
                  <Button asChild variant="outline">
                    <Link to="/projects">View All Projects</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
