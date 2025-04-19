import { useState } from 'react';
import { Link } from 'wouter';
import { Users, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { Project, Role } from '@shared/schema';
import { getStageColor } from '@/lib/project-utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';

type ProjectCardProps = {
  project: Project;
  showDetails?: boolean;
};

export default function ProjectCard({ project, showDetails = false }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(showDetails);
  const { user } = useAuth();
  
  // Get roles for this project
  const { data: roles, isLoading: isLoadingRoles } = useQuery({
    queryKey: [`/api/projects/${project.id}/roles`],
    enabled: isExpanded,
  });

  // Get team members for this project
  const { data: teamMembers, isLoading: isLoadingTeam } = useQuery({
    queryKey: [`/api/projects/${project.id}/team`],
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
        <div className="bg-muted border-t">
          <Tabs defaultValue="roles" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted rounded-none border-b">
              <TabsTrigger value="team">TEAM MEMBERS</TabsTrigger>
              <TabsTrigger value="details">DETAILS</TabsTrigger>
              <TabsTrigger value="comments">COMMENTS (0)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="team" className="px-4 py-3">
              {isLoadingTeam ? (
                <div className="flex flex-col gap-4 py-2">
                  <div className="h-16 bg-muted-foreground/10 rounded animate-pulse" />
                  <div className="h-16 bg-muted-foreground/10 rounded animate-pulse" />
                </div>
              ) : teamMembers && Array.isArray(teamMembers) && teamMembers.length > 0 ? (
                <div className="flex flex-col gap-4 py-2">
                  {teamMembers.map((member: any) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <Avatar className="h-14 w-14 bg-muted-foreground/20 rounded-md border">
                        <AvatarFallback>
                          {member.user?.username?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {member.user?.username || 'Team Member'}
                        </div>
                        <Badge variant="secondary" className="mt-1">
                          {member.roleId ? 
                            roles?.find((r: Role) => r.id === member.roleId)?.title || 'MEMBER' : 
                            member.isFounder ? 'FOUNDER' : 'MEMBER'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Users className="mx-auto h-10 w-10 text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground">No team members yet</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4 px-4 py-3">
              {project.problem && (
                <div>
                  <h4 className="text-md font-medium mb-1">Problem:</h4>
                  <p className="text-muted-foreground text-sm">
                    {project.problem}
                  </p>
                </div>
              )}
              
              {project.market && (
                <div>
                  <h4 className="text-md font-medium mb-1">Target Market:</h4>
                  <p className="text-muted-foreground text-sm">
                    {project.market}
                  </p>
                </div>
              )}
              
              {project.competition && (
                <div>
                  <h4 className="text-md font-medium mb-1">Competition:</h4>
                  <p className="text-muted-foreground text-sm">
                    {project.competition}
                  </p>
                </div>
              )}
              
              <div>
                <h4 className="text-md font-medium mb-1">Progress:</h4>
                <div className="flex items-center">
                  <Progress value={project.teamSize / project.maxTeamSize * 100} className="flex-1 h-2.5 mr-2" />
                  <span className="text-xs text-muted-foreground">{Math.round(project.teamSize / project.maxTeamSize * 100)}%</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="comments" className="px-4 py-3">
              <div className="text-center py-6">
                <p className="text-muted-foreground">No comments yet</p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="p-4 border-t flex flex-col gap-3">
            <div className="flex items-center">
              <div className="bg-primary w-14 h-14 rounded-md flex items-center justify-center">
                <Plus className="text-primary-foreground h-6 w-6" />
              </div>
              <div className="ml-3">
                {roles && Array.isArray(roles) && roles.length > 0 ? (
                  <div className="flex items-center">
                    <span className="text-lg font-medium mr-2">Apply for</span>
                    <span className="text-lg font-bold">
                      {project.teamSize >= project.maxTeamSize ? "We're full" : roles[0]?.title || "Team Member"}
                    </span>
                    <span className="text-lg ml-1">role</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="text-lg font-medium mr-2">Join this</span>
                    <span className="text-lg font-bold">startup</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Link href={`/projects/${project.id}`}>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
              
              <Link href={`/projects/${project.id}`}>
                <Button className="w-full ml-2" disabled={project.teamSize >= project.maxTeamSize}>
                  {project.teamSize >= project.maxTeamSize ? "Team Full" : "Apply Now"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
