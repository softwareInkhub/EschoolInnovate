import { useState } from 'react';
import { Link } from 'wouter';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { Project } from '@shared/schema';
import { getStageColor } from '@/lib/project-utils';

type ProjectCardProps = {
  project: Project;
  showDetails?: boolean;
};

export default function ProjectCard({ project, showDetails = false }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(showDetails);
  
  // Get roles for this project
  const { data: roles, isLoading: isLoadingRoles } = useQuery({
    queryKey: [`/api/projects/${project.id}/roles`],
    enabled: isExpanded,
  });
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  const stageColor = getStageColor(project.stage);
  
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="absolute top-2 left-2">
          <Badge className={`bg-${stageColor}-500 hover:bg-${stageColor}-600`}>
            {project.stage}
          </Badge>
        </div>
        <img 
          src={project.banner || "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"} 
          alt={project.name} 
          className="w-full h-48 object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold truncate">{project.name}</h3>
          <Badge variant="outline" className="capitalize">
            {project.category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Team Size</span>
            <div className="flex items-center">
              <span className="text-sm font-medium">{project.teamSize}</span>
              <span className="mx-1 text-muted-foreground">/</span>
              <span className="text-sm">{project.maxTeamSize}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center text-primary hover:text-primary/90"
            onClick={toggleExpanded}
          >
            {isExpanded ? (
              <>
                Hide Details
                <ChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                View Details
                <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
      
      {isExpanded && (
        <div className="bg-muted p-4 border-t">
          <div className="mb-4">
            <h4 className="text-md font-medium mb-2">Roles Needed:</h4>
            {isLoadingRoles ? (
              <div className="animate-pulse flex flex-wrap gap-2">
                <div className="h-6 w-24 bg-muted-foreground/20 rounded"></div>
                <div className="h-6 w-20 bg-muted-foreground/20 rounded"></div>
              </div>
            ) : roles && roles.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {roles.map(role => (
                  <Badge key={role.id} variant="outline" className="bg-primary/10 text-primary">
                    {role.title}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No open roles specified.</p>
            )}
          </div>
          
          <div className="mb-4">
            <h4 className="text-md font-medium mb-2">Project Progress:</h4>
            <div className="flex items-center">
              <Progress value={project.teamSize / project.maxTeamSize * 100} className="flex-1 h-2.5 mr-2" />
              <span className="text-xs text-muted-foreground">{Math.round(project.teamSize / project.maxTeamSize * 100)}%</span>
            </div>
          </div>
          
          {project.problem && (
            <div className="mb-4">
              <h4 className="text-md font-medium mb-2">Problem:</h4>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {project.problem}
              </p>
            </div>
          )}
          
          <div className="flex justify-end">
            <Link href={`/project/${project.id}`}>
              <Button>
                Apply to Join
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Card>
  );
}
