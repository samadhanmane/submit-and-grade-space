
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getClassesByTeacher, addMockClass } from "@/utils/mockData";
import { useAuth } from "@/context/AuthContext";
import { ClassInfo } from "@/types";
import { BookOpen, Copy, Key, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const AdminClasses = () => {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTeacherClasses = async () => {
      setIsLoading(true);
      try {
        if (user) {
          // In a real app, fetch from an API
          const teacherClasses = getClassesByTeacher(user.id);
          setClasses(teacherClasses);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
        toast({
          variant: "destructive",
          title: "Failed to load classes",
          description: "There was an error loading your classes.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeacherClasses();
  }, [user, toast]);

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!className.trim()) {
      toast({
        variant: "destructive",
        title: "Missing class name",
        description: "Please enter a name for your class.",
      });
      return;
    }
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not logged in",
        description: "You must be logged in to create a class.",
      });
      return;
    }
    
    setIsCreating(true);
    
    try {
      // Create a new class
      const newClass = addMockClass({
        name: className,
        teacherId: user.id,
        teacherName: user.name,
        description: classDescription,
      });
      
      // Update local state
      setClasses(prevClasses => [...prevClasses, newClass]);
      
      // Reset form
      setClassName("");
      setClassDescription("");
      setShowForm(false);
      
      toast({
        title: "Class created",
        description: `Your class "${newClass.name}" has been created with key: ${newClass.key}`,
      });
    } catch (error) {
      console.error("Error creating class:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const copyClassKey = (key: string, className: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Class key copied",
      description: `The key for "${className}" has been copied to clipboard.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[240px] p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Manage Classes</h1>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Class
              </Button>
            </div>

            {showForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Create a New Class</CardTitle>
                  <CardDescription>
                    Students will be able to join using the generated class key
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateClass} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="className">Class Name*</Label>
                      <Input
                        id="className"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="Enter a name for your class"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="classDescription">Description (Optional)</Label>
                      <Textarea
                        id="classDescription"
                        value={classDescription}
                        onChange={(e) => setClassDescription(e.target.value)}
                        placeholder="Describe your class"
                        rows={3}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateClass} disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create Class"}
                  </Button>
                </CardFooter>
              </Card>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <CardTitle className="h-6 bg-gray-200 rounded w-3/4"></CardTitle>
                      <CardDescription className="h-4 bg-gray-200 rounded w-1/2"></CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                      <div className="flex space-x-2">
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                        <div className="h-6 bg-gray-200 rounded w-24"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : classes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls) => (
                  <Card key={cls.id}>
                    <CardHeader>
                      <CardTitle>{cls.name}</CardTitle>
                      <CardDescription>
                        Created {formatDistanceToNow(new Date(cls.createdAt), { addSuffix: true })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        {cls.description || "No description provided."}
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="flex items-center bg-blue-50 text-blue-800 border-blue-200">
                          <Key className="h-3.5 w-3.5 mr-1" />
                          Class Key: {cls.key}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => copyClassKey(cls.key, cls.name)}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Student Projects
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-2">No classes yet</h2>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  You haven't created any classes yet. Create your first class by clicking the button below.
                </p>
                <Button onClick={() => setShowForm(true)}>
                  Create Your First Class
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminClasses;
