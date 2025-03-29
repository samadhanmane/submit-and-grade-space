
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Download, 
  Github, 
  Calendar, 
  Tag, 
  Clock,
  FileText,
  User
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import GradingForm from "@/components/admin/GradingForm";
import { Project } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { getMockProjects } from "@/utils/mockData";

const ProjectReview = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
            description: "The requested project does not exist.",
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

  const handleSubmitGrades = async (grades: any) => {
    // In a real app, we would submit the grades to an API
    // For now, we'll just simulate a successful submission
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Grades submitted",
        description: "The project has been graded successfully.",
      });
      
      // Update local state to reflect the change
      if (project) {
        setProject({
          ...project,
          status: "graded",
          grades: grades,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error submitting the grades. Please try again.",
      });
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
                <div className="grid grid-cols-1 gap-6">
                  <div className="h-40 bg-gray-200 rounded"></div>
                  <div className="h-60 bg-gray-200 rounded"></div>
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
                The project you're looking for doesn't exist.
              </p>
              <Button onClick={() => navigate("/admin/dashboard")}>
                Back to Dashboard
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
            <div className="flex items-center mb-6">
              <Button 
                variant="outline" 
                size="icon" 
                className="mr-4"
                onClick={() => navigate("/admin/dashboard")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{project.title}</h1>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="bg-gray-50">
                    {project.status === "pending" ? (
                      <Clock className="mr-1 h-3 w-3 text-yellow-500" />
                    ) : project.status === "review" ? (
                      <Clock className="mr-1 h-3 w-3 text-blue-500" />
                    ) : project.status === "graded" ? (
                      <FileText className="mr-1 h-3 w-3 text-green-500" />
                    ) : (
                      <FileText className="mr-1 h-3 w-3 text-red-500" />
                    )}
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>

            <Tabs defaultValue="details" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Project Details</TabsTrigger>
                <TabsTrigger value="grading" disabled={project.status === "graded"}>
                  {project.status === "graded" ? "Already Graded" : "Grade Project"}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                    <CardDescription>
                      Detailed information about the submitted project
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-gray-500 mr-2" />
                          <div>
                            <div className="text-sm text-gray-500">Submitted By</div>
                            <div className="font-medium">{project.submittedByName || "Unknown User"}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Tag className="h-5 w-5 text-gray-500 mr-2" />
                          <div>
                            <div className="text-sm text-gray-500">Category</div>
                            <div className="font-medium">{project.category}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                          <div>
                            <div className="text-sm text-gray-500">Submitted On</div>
                            <div className="font-medium">
                              {format(new Date(project.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-gray-500 mr-2" />
                          <div>
                            <div className="text-sm text-gray-500">Status</div>
                            <div className="font-medium capitalize">{project.status}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Description</h3>
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
                      </div>
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
                    
                    {project.status === "graded" && project.grades && (
                      <>
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Grading Results</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
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
                          
                          <div className="bg-gray-50 p-4 rounded mb-4">
                            <div className="flex justify-between items-center">
                              <h4 className="text-base font-medium">Total Score</h4>
                              <div className="text-lg font-bold">
                                {project.grades.totalScore}/40
                                <span className="text-sm font-normal text-gray-500 ml-2">
                                  ({Math.round((project.grades.totalScore || 0) / 40 * 100)}%)
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-base font-medium mb-2">Feedback</h4>
                            <div className="bg-gray-50 p-4 rounded">
                              <p className="text-gray-700 whitespace-pre-line">{project.grades.feedback}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="grading">
                <GradingForm project={project} onSubmit={handleSubmitGrades} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectReview;
