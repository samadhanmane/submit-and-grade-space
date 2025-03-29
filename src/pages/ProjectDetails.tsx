
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Download, 
  Github, 
  Calendar, 
  ClipboardList, 
  Tag, 
  Clock, 
  CheckCircle,
  XCircle,
  FileText
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Project } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { getMockProjects } from "@/utils/mockData";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch project details from an API
        // For now, we'll use mock data
        const data = getMockProjects().find(p => p.id === id);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (data) {
          setProject(data);
        } else {
          toast({
            variant: "destructive",
            title: "Project not found",
            description: "The requested project does not exist or you don't have access to it.",
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast({
          variant: "destructive",
          title: "Failed to load project",
          description: "There was an error loading the project details.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id, toast]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300 py-1 px-2">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </Badge>
        );
      case "review":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300 py-1 px-2">
            <Clock className="w-3 h-3 mr-1" />
            Under Review
          </Badge>
        );
      case "graded":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300 py-1 px-2">
            <CheckCircle className="w-3 h-3 mr-1" />
            Graded
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-800 border-red-300 py-1 px-2">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-[240px] p-6">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="h-32 bg-gray-200 rounded mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-40 bg-gray-200 rounded"></div>
                  <div className="h-40 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-[240px] p-6">
            <div className="max-w-4xl mx-auto text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Project Not Found</h2>
              <p className="text-gray-600 mb-6">
                The project you're looking for doesn't exist or you don't have access to it.
              </p>
              <Button asChild>
                <Link to="/projects">View Your Projects</Link>
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[240px] p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold">{project.title}</h1>
                <div className="flex items-center mt-2">
                  {getStatusBadge(project.status)}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button asChild variant="outline">
                  <Link to="/projects">Back to Projects</Link>
                </Button>
                {(project.status === "pending" || project.status === "review") && (
                  <Button asChild variant="destructive">
                    <Link to={`/project/${project.id}/edit`}>Edit Project</Link>
                  </Button>
                )}
              </div>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <Tag className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">Category</div>
                        <div className="font-medium">{project.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">Submitted On</div>
                        <div className="font-medium">
                          {format(new Date(project.createdAt), "MMM d, yyyy")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ClipboardList className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <div className="text-sm text-gray-500">Status</div>
                        <div className="font-medium capitalize">{project.status}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    {project.zipFile && (
                      <Button className="flex-1" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download Project Files
                      </Button>
                    )}
                    
                    {project.githubLink && (
                      <Button className="flex-1" variant="outline" asChild>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View GitHub Repository
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {project.status === "graded" && project.grades && (
              <Card>
                <CardHeader>
                  <CardTitle>Evaluation Results</CardTitle>
                  <CardDescription>
                    Your project has been graded based on the following criteria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Code Quality</span>
                            <span className="text-sm font-medium">{project.grades.codeQuality}/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(project.grades.codeQuality || 0) * 10}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Documentation</span>
                            <span className="text-sm font-medium">{project.grades.documentation}/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(project.grades.documentation || 0) * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Innovation</span>
                            <span className="text-sm font-medium">{project.grades.innovation}/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(project.grades.innovation || 0) * 10}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Functionality</span>
                            <span className="text-sm font-medium">{project.grades.functionality}/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(project.grades.functionality || 0) * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">Total Score</h3>
                        <div className="text-xl font-bold">
                          {project.grades.totalScore}/40
                          <span className="text-sm font-normal text-gray-500 ml-2">
                            ({Math.round((project.grades.totalScore || 0) / 40 * 100)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Feedback</h3>
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-gray-700 whitespace-pre-line">{project.grades.feedback}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetails;
