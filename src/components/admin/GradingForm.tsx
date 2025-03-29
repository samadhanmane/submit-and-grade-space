
import { useState } from "react";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

interface GradingFormProps {
  project: Project;
  onSubmit: (grades: any) => void;
}

const GradingForm = ({ project, onSubmit }: GradingFormProps) => {
  const [codeQuality, setCodeQuality] = useState<number>(project.grades?.codeQuality || 0);
  const [documentation, setDocumentation] = useState<number>(project.grades?.documentation || 0);
  const [innovation, setInnovation] = useState<number>(project.grades?.innovation || 0);
  const [functionality, setFunctionality] = useState<number>(project.grades?.functionality || 0);
  const [feedback, setFeedback] = useState<string>(project.grades?.feedback || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const calculateTotalScore = () => {
    return codeQuality + documentation + innovation + functionality;
  };

  const handleSubmit = () => {
    // Validate that all rubrics have been graded
    if (codeQuality === 0 || documentation === 0 || innovation === 0 || functionality === 0) {
      toast({
        variant: "destructive",
        title: "Incomplete grading",
        description: "Please assign a score to all rubric criteria.",
      });
      return;
    }

    // Validate that feedback is provided
    if (!feedback.trim()) {
      toast({
        variant: "destructive", 
        title: "Missing feedback",
        description: "Please provide feedback for the student.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const grades = {
        codeQuality,
        documentation,
        innovation,
        functionality,
        totalScore: calculateTotalScore(),
        feedback,
      };

      onSubmit(grades);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission error",
        description: "There was an error submitting the grades. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderScoreOptions = (
    value: number,
    onChange: (value: number) => void,
    name: string
  ) => (
    <RadioGroup
      value={value.toString()}
      onValueChange={(value) => onChange(parseInt(value))}
      className="flex space-x-1"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
        <div key={score} className="flex flex-col items-center">
          <RadioGroupItem
            value={score.toString()}
            id={`${name}-${score}`}
            className="peer sr-only"
          />
          <Label
            htmlFor={`${name}-${score}`}
            className="h-9 w-9 rounded-full flex items-center justify-center border cursor-pointer
              peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white"
          >
            {score}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Project: {project.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Grading Rubric</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-base">Code Quality</Label>
                <span className="font-medium">{codeQuality}/10</span>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                {renderScoreOptions(codeQuality, setCodeQuality, "code-quality")}
              </div>
            </div>
            <Separator />
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-base">Documentation</Label>
                <span className="font-medium">{documentation}/10</span>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                {renderScoreOptions(documentation, setDocumentation, "documentation")}
              </div>
            </div>
            <Separator />
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-base">Innovation</Label>
                <span className="font-medium">{innovation}/10</span>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                {renderScoreOptions(innovation, setInnovation, "innovation")}
              </div>
            </div>
            <Separator />
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-base">Functionality</Label>
                <span className="font-medium">{functionality}/10</span>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                {renderScoreOptions(functionality, setFunctionality, "functionality")}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="feedback" className="text-base">Feedback</Label>
            <span className="text-sm text-gray-500">Required</span>
          </div>
          <Textarea
            id="feedback"
            placeholder="Provide detailed feedback on the project's strengths and areas for improvement..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={6}
          />
        </div>

        <div className="pt-4 bg-gray-50 p-4 rounded">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Total Score</h3>
            <span className="text-xl font-bold">{calculateTotalScore()}/40</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t p-6">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Grades"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GradingForm;
