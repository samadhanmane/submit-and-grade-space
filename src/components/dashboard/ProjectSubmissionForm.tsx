import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Upload, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

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
  const [githubLink, setGithubLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

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
    
    if (!title || !description || !category) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file uploaded",
        description: "Please upload a ZIP file of your project.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, we would upload the file and submit the form data to the server
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a mock project
      if (user) {
        console.log("Submitting project:", {
          title,
          description,
          category,
          githubLink,
          submittedBy: user.id,
          submittedByName: user.name,
          status: "pending"
        });
      }
      
      toast({
        title: "Project submitted",
        description: "Your project has been submitted successfully.",
      });
      
      // Navigate to the projects page where the user can see their submitted project
      navigate("/projects");
    } catch (error) {
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
          
          <div className="space-y-2">
            <Label htmlFor="githubLink">GitHub Repository Link (Optional)</Label>
            <Input
              id="githubLink"
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="https://github.com/yourusername/yourproject"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectFile">Project ZIP File*</Label>
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
