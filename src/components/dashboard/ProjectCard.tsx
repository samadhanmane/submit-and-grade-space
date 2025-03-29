
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Tag, 
  ExternalLink, 
  Clock, 
  FileCheck,
  FileX
} from "lucide-react";
import { Project } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface ProjectCardProps {
  project: Project;
  isAdmin?: boolean;
}

const ProjectCard = ({ project, isAdmin = false }: ProjectCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "review":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300">
            <FileCheck className="w-3 h-3 mr-1" />
            Under Review
          </Badge>
        );
      case "graded":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300">
            <FileCheck className="w-3 h-3 mr-1" />
            Graded
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-800 border-red-300">
            <FileX className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const detailsPath = isAdmin 
    ? `/admin/project/${project.id}` 
    : `/project/${project.id}`;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
          {getStatusBadge(project.status)}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{project.description}</p>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Tag className="h-4 w-4 mr-2" />
            <span>{project.category}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Submitted {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}</span>
          </div>
          {project.githubLink && (
            <div className="flex items-center text-gray-600">
              <ExternalLink className="h-4 w-4 mr-2" />
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-500 hover:underline"
              >
                GitHub Repository
              </a>
            </div>
          )}
          {isAdmin && project.submittedByName && (
            <div className="flex items-center text-gray-600 font-medium">
              By: {project.submittedByName}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button asChild className="w-full">
          <Link to={detailsPath}>
            {isAdmin ? "Review Project" : "View Details"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
