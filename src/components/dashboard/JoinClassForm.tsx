
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { findClassByKey, joinClassByKey } from "@/utils/mockData";
import { useAuth } from "@/context/AuthContext";

const JoinClassForm = () => {
  const [classKey, setClassKey] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleJoinClass = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!classKey.trim()) {
      toast({
        variant: "destructive",
        title: "Missing class key",
        description: "Please enter a class key to join a class.",
      });
      return;
    }
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not logged in",
        description: "You must be logged in to join a class.",
      });
      return;
    }
    
    setIsJoining(true);
    
    try {
      // Find the class by key first to check if it exists
      const classInfo = findClassByKey(classKey);
      
      if (!classInfo) {
        toast({
          variant: "destructive",
          title: "Invalid class key",
          description: "The class key you entered does not exist.",
        });
        setIsJoining(false);
        return;
      }
      
      // Join the class
      const success = joinClassByKey(user.id, classKey);
      
      if (success) {
        toast({
          title: "Class joined",
          description: `You have successfully joined ${classInfo.name} taught by ${classInfo.teacherName}.`,
        });
        setClassKey("");
      } else {
        toast({
          variant: "destructive",
          title: "Failed to join class",
          description: "There was an error joining the class. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error joining class:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join a Class</CardTitle>
        <CardDescription>
          Enter a class key provided by your teacher to join their class
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleJoinClass} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="classKey">Class Key</Label>
            <Input
              id="classKey"
              placeholder="Enter class key (e.g., ABC123)"
              value={classKey}
              onChange={(e) => setClassKey(e.target.value.toUpperCase())}
              className="uppercase"
              maxLength={6}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleJoinClass} disabled={isJoining} className="w-full">
          {isJoining ? "Joining..." : "Join Class"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JoinClassForm;
