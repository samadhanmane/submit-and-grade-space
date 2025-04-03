import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectCategory, ProjectType, UserProfile, ClassInfo } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Upload, X, BookOpen, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { addMockProject, getMockTeachers, getMockClasses, PROJECT_TYPES, getClassesByStudent } from "@/utils/mockData";

const PROJECT_CATEGORIES: ProjectCategory[] = [
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

const ProjectSubmissionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "">("");
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [githubLink, setGithubLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teachers, setTeachers] = useState<UserProfile[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [enrolledClasses, setEnrolledClasses] = useState<ClassInfo[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [githubError, setGithubError] = useState("");
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Fetch teachers and classes
    const fetchTeachersAndClasses = async () => {
      try {
        const teacherData = getMockTeachers();
        const classData = getMockClasses();
        
        setTeachers(teacherData);
        setClasses(classData);
        
        if (user) {
          const userClasses = getClassesByStudent(user.id);
          setEnrolledClasses(userClasses);
        }
      } catch (error) {
        console.error("Error fetching teachers and classes:", error);
      }
    };
    
    fetchTeachersAndClasses();
  }, [user]);

  const validateGithubUrl = (url: string) => {
    if (!url) return true; // Empty is ok (optional field)
    
    // Basic GitHub URL validation
    const githubUrlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-._]+\/?$/;
    return githubUrlPattern.test(url);
  };

  const handleGithubLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setGithubLink(url);
    
    if (url && !validateGithubUrl(url)) {
      setGithubError("Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo)");
    } else {
      setGithubError("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      // Check if file is a zip
      if (selectedFile.type !== "application/zip" && !selectedFile.name.endsWith('.zip')) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a ZIP file.",
        });
        return;
      }
      
      // Check file size (max 50MB)
      if (selectedFile.size > 50 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Maximum file size is 50MB.",
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!title || !description || !category || !projectType) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    // Validate file or GitHub link
    if (!file && !githubLink) {
      toast({
        variant: "destructive",
        title: "Missing project files",
        description: "Please either upload a ZIP file or provide a GitHub repository link.",
      });
      return;
    }
    
    // Validate GitHub URL if provided
    if (githubLink && !validateGithubUrl(githubLink)) {
      toast({
        variant: "destructive",
        title: "Invalid GitHub URL",
        description: "Please provide a valid GitHub repository URL.",
      });
      return;
    }
    
    // Validate teacher or class selection
    if (!selectedTeacher && !selectedClass) {
      toast({
        variant: "destructive",
        title: "Missing teacher or class",
        description: "Please select either a teacher or a class for your project submission.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate a successful submission with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (user) {
        // Get teacher info based on selection
        let teacherId = "";
        let teacherName = "";
        let classKey = "";
        
        if (selectedClass) {
          const selectedClassInfo = classes.find(cls => cls.id === selectedClass);
          if (selectedClassInfo) {
            teacherId = selectedClassInfo.teacherId;
            teacherName = selectedClassInfo.teacherName;
            classKey = selectedClassInfo.key;
          }
        } else if (selectedTeacher) {
          const selectedTeacherInfo = teachers.find(teacher => teacher.id === selectedTeacher);
          if (selectedTeacherInfo) {
            teacherId = selectedTeacherInfo.id;
            teacherName = selectedTeacherInfo.name;
          }
        }
        
        // Create a mock project and add it to our mock data store
        const newProject = addMockProject({
          title,
          description,
          category: category as ProjectCategory,
          projectType: projectType as ProjectType,
          githubLink,
          submittedBy: user.id,
          submittedByName: user.name,
          assignedTeacherId: teacherId,
          assignedTeacherName: teacherName,
          classKey,
          zipFile: file ? URL.createObjectURL(file) : undefined, // This creates a temporary URL for the uploaded file
          status: "pending"
        });
        
        console.log("Project submitted:", newProject);
      }
      
      toast({
        title: "Project submitted",
        description: "Your project has been submitted successfully.",
      });
      
      // Navigate to the projects page where the user can see their submitted project
      navigate("/projects");
    } catch (error) {
      console.error("Error submitting project:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error submitting your project. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Submit a New Project</CardTitle>
        <CardDescription>
          Upload your project files and provide details for evaluation
        </CardDescription>
      </CardHeader>
    
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title*</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title for your project"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category*</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as ProjectCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectType">Project Type*</Label>
            <Select value={projectType} onValueChange={(value) => setProjectType(value as ProjectType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description*</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project, its goals, features, and technologies used"
            rows={4}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolledClasses.length > 0 ? (
            <div className="space-y-2">
              <Label htmlFor="enrolledClass">Submit to One of Your Classes</Label>
              <Select value={selectedClass} onValueChange={(value) => {
                setSelectedClass(value);
                if (value) setSelectedTeacher(""); // Clear teacher selection if class is selected
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {enrolledClasses.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} - Teacher: {cls.teacherName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="teacher">Select Teacher*</Label>
              <Select value={selectedTeacher} onValueChange={(value) => {
                setSelectedTeacher(value);
                if (value) setSelectedClass(""); // Clear class selection if teacher is selected
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {enrolledClasses.length > 0 ? (
            <div className="space-y-2">
              <Label htmlFor="teacher">Or Select a Different Teacher</Label>
              <Select value={selectedTeacher} onValueChange={(value) => {
                setSelectedTeacher(value);
                if (value) setSelectedClass(""); // Clear class selection if teacher is selected
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground flex items-center mt-1">
                <BookOpen className="h-3 w-3 mr-1" />
                Select either a class or a teacher
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="class">Or Select Class (If you have a key)</Label>
              <Select value={selectedClass} onValueChange={(value) => {
                setSelectedClass(value);
                if (value) setSelectedTeacher(""); // Clear teacher selection if class is selected
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} ({cls.key})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        
        <div className="space-y-2">
          <Label htmlFor="githubLink">GitHub Repository Link</Label>
          <Input
            id="githubLink"
            type="url"
            value={githubLink}
            onChange={handleGithubLinkChange}
            placeholder="https://github.com/yourusername/yourproject"
            className={githubError ? "border-red-500" : ""}
          />
          {githubError && (
            <p className="text-sm text-red-500 flex items-center mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              {githubError}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="projectFile">Project ZIP File</Label>
          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop your ZIP file here, or click to browse
              </p>
              <p className="text-xs text-gray-500 mb-2">
                Max file size: 50MB
              </p>
              <Input
                id="projectFile"
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("projectFile")?.click()}
              >
                Browse Files
              </Button>
            </div>
          ) : (
            <div className="border border-gray-300 rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded mr-3">
                  <Upload className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearFile}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}
          <p className="text-sm text-muted-foreground flex items-center mt-1">
            <AlertCircle className="h-3 w-3 mr-1" />
            Either a GitHub link or a ZIP file is required
          </p>
        </div>
      </form>
    </CardContent>
    
    <CardFooter className="flex justify-end gap-2 border-t p-6">
      <Button variant="outline" onClick={() => navigate("/projects")}>
        Cancel
      </Button>
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Project"}
      </Button>
    </CardFooter>
  </Card>
  );
};

export default ProjectSubmissionForm;
