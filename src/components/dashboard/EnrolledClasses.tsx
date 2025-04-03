
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getClassesByStudent } from "@/utils/mockData";
import { useAuth } from "@/context/AuthContext";
import { ClassInfo } from "@/types";
import { BookOpen, CalendarClock, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const EnrolledClasses = () => {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      setIsLoading(true);
      try {
        if (user) {
          // In a real app, we would fetch from an API
          // For now, use mock data
          const enrolledClasses = getClassesByStudent(user.id);
          setClasses(enrolledClasses);
        }
      } catch (error) {
        console.error("Error fetching enrolled classes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledClasses();
  }, [user]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></CardTitle>
          <CardDescription className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 border rounded-md animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Classes</CardTitle>
        <CardDescription>
          Classes you are enrolled in
        </CardDescription>
      </CardHeader>
      <CardContent>
        {classes.length > 0 ? (
          <div className="space-y-4">
            {classes.map((cls) => (
              <div key={cls.id} className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-lg mb-1">{cls.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{cls.description}</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
                    <UserCheck className="h-3 w-3" />
                    {cls.teacherName}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200">
                    <BookOpen className="h-3 w-3" />
                    Key: {cls.key}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 bg-gray-50 text-gray-700 border-gray-200">
                    <CalendarClock className="h-3 w-3" />
                    Joined {formatDistanceToNow(new Date(cls.createdAt), { addSuffix: true })}
                  </Badge>
                </div>
                <div className="mt-3">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/submit">Submit Project for this Class</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <BookOpen className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <h3 className="text-lg font-medium">No classes yet</h3>
            <p className="text-sm text-gray-500 mb-4">
              You haven't joined any classes yet. Use a class key to join one.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnrolledClasses;
