import { useProject, useProjectRoles, useProjectTeam } from '@/hooks/useProjects';
import { useParams } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { getStageColor, getProgressPercentage, formatDate } from '@/lib/project-utils';
import { 
  Users, 
  Link2, 
  Calendar, 
  Star, 
  MessageSquare, 
  AlertTriangle,
  CheckCircle,
  Loader2,
  PlusCircle
} from 'lucide-react';

// Application form schema
const applicationFormSchema = z.object({
  message: z.string().min(10, {
    message: "Your application message must be at least 10 characters.",
  }),
  roleId: z.number(),
  projectId: z.number(),
});

type FormValues = z.infer<typeof applicationFormSchema>;

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [applyingForRoleId, setApplyingForRoleId] = useState<number | null>(null);
  const projectId = parseInt(id || "0");
  
  // Get project data
  const { data: project, isLoading: isLoadingProject, error } = useProject(projectId);
  
  // Get roles data
  const { data: roles, isLoading: isLoadingRoles } = useProjectRoles(projectId);
  
  // Get team members data
  const { data: teamMembers, isLoading: isLoadingTeam } = useProjectTeam(projectId);
  
  // Form for application
  const form = useForm<FormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      message: '',
      roleId: 0,
      projectId: projectId,
    },
  });
  
  async function onSubmit(data: FormValues) {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to apply for this role.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await apiRequest('POST', `/api/projects/${projectId}/apply`, data);
      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      });
      setApplyingForRoleId(null);
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to submit application",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  }
  
  if (isLoadingProject) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h3 className="text-xl font-medium">Loading project details...</h3>
        </div>
      </div>
    );
  }
  
  if (error || !project) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center py-20">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h1 className="text-2xl font-bold mb-2">Project not found</h1>
            <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const stageColor = getStageColor(project.stage);
  const progress = getProgressPercentage(project.stage);
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Project Banner & Header */}
      <div className="mb-8">
        <div className="relative rounded-lg overflow-hidden mb-6 bg-gradient-to-r from-primary/20 to-accent/30 h-64">
          {project.banner && (
            <img 
              src={project.banner} 
              alt={project.name} 
              className="w-full h-full object-cover opacity-70"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center mb-2">
              <Badge className="mr-2 bg-primary hover:bg-primary">
                {project.category}
              </Badge>
              <Badge variant="outline" className={`text-${stageColor}-500 border-${stageColor}-500/50`}>
                {project.stage}
              </Badge>
              {project.isFeatured && (
                <Badge className="ml-2 bg-amber-500/80 hover:bg-amber-500 flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Featured
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.name}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Created {project.createdAt ? formatDate(project.createdAt) : "Recently"}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{project.teamSize} of {project.maxTeamSize} team members</span>
              </div>
              {project.website && (
                <div className="flex items-center">
                  <Link2 className="h-4 w-4 mr-1" />
                  <a 
                    href={project.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline"
                  >
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="roles">Roles</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Problem Statement</h3>
                    <p className="text-muted-foreground">{project.problem || "No problem statement provided."}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Target Market</h3>
                    <p className="text-muted-foreground">{project.market || "No market information provided."}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Competition</h3>
                    <p className="text-muted-foreground">{project.competition || "No competition information provided."}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="roles">
              <Card>
                <CardHeader>
                  <CardTitle>Open Positions</CardTitle>
                  <CardDescription>
                    Join the team and help make this project successful
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingRoles ? (
                    <div className="space-y-4">
                      <div className="h-24 rounded-md bg-muted animate-pulse" />
                      <div className="h-24 rounded-md bg-muted animate-pulse" />
                    </div>
                  ) : !roles || roles.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                      <h3 className="text-lg font-medium mb-2">No open positions</h3>
                      <p className="text-muted-foreground">
                        There are no roles open for applications at the moment.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {roles.map((role) => (
                        <Card key={role.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="p-4 pb-0">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                  <h3 className="text-lg font-semibold">{role.title}</h3>
                                  <p className="text-muted-foreground mt-1">{role.description}</p>
                                  
                                  {/* Optional skills display if available */}
                                </div>
                                
                                {user && !applyingForRoleId && (
                                  <Button 
                                    className="shrink-0" 
                                    onClick={() => {
                                      setApplyingForRoleId(role.id);
                                      form.setValue('roleId', role.id);
                                    }}
                                  >
                                    Apply Now
                                  </Button>
                                )}
                              </div>
                            </div>
                            
                            {applyingForRoleId === role.id && (
                              <div className="p-4 mt-4 bg-muted/30 border-t">
                                <Form {...form}>
                                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                      control={form.control}
                                      name="message"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Application Message</FormLabel>
                                          <FormControl>
                                            <Textarea 
                                              placeholder="Describe why you're a good fit for this role and what relevant skills/experience you have..." 
                                              {...field}
                                              className="min-h-[120px]"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <div className="flex justify-end gap-2">
                                      <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={() => setApplyingForRoleId(null)}
                                      >
                                        Cancel
                                      </Button>
                                      <Button 
                                        type="submit"
                                        disabled={form.formState.isSubmitting}
                                      >
                                        {form.formState.isSubmitting ? (
                                          <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                          </>
                                        ) : (
                                          <>
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Submit Application
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  </form>
                                </Form>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Meet the people behind this project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingTeam ? (
                    <div className="space-y-4">
                      <div className="h-16 rounded-md bg-muted animate-pulse" />
                      <div className="h-16 rounded-md bg-muted animate-pulse" />
                    </div>
                  ) : !teamMembers || teamMembers.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                      <h3 className="text-lg font-medium mb-2">No team members</h3>
                      <p className="text-muted-foreground">
                        There are no team members assigned to this project yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {teamMembers.map((member) => (
                        <div 
                          key={member.id} 
                          className="flex items-center gap-4 p-3 rounded-md hover:bg-accent/40 transition-colors"
                        >
                          <Avatar className="h-12 w-12 border-2 border-muted">
                            <AvatarFallback>
                              {"U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium truncate">
                                Team Member
                              </span>
                              {member.isFounder && (
                                <Badge variant="secondary" className="text-xs">Founder</Badge>
                              )}
                              {member.roleId && (
                                <Badge variant="outline" className="text-xs">
                                  {roles?.find(r => r.id === member.roleId)?.title || 'Team Member'}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              Project contributor
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Stage</h4>
                  <Badge 
                    variant="outline" 
                    className={`bg-${stageColor}/10 text-${stageColor} border-${stageColor}/30`}
                  >
                    {project.stage}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Team Size</h4>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="font-medium">{project.teamSize}</span>
                    <span className="text-muted-foreground mx-1">/</span>
                    <span className="text-muted-foreground">{project.maxTeamSize}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-1">Available Roles</h4>
                <div className="flex items-center">
                  <span className="font-medium text-lg">
                    {roles?.length || 0}
                  </span>
                  <span className="text-muted-foreground ml-1">positions</span>
                </div>
              </div>
              
              {project.website && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-1">Website</h4>
                    <a 
                      href={project.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:underline flex items-center"
                    >
                      <Link2 className="h-4 w-4 mr-1" />
                      Visit Website
                    </a>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Join the Team</CardTitle>
              <CardDescription>
                Apply to become a part of this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!user ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">
                    You need to be logged in to apply for roles
                  </p>
                  <Button onClick={() => window.location.href = '/auth'}>
                    Log In to Apply
                  </Button>
                </div>
              ) : !roles || roles.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">
                    No open positions available right now
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Select a role to apply for:
                  </p>
                  <div className="space-y-2">
                    {roles.map((role) => (
                      <Button 
                        key={role.id} 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          setApplyingForRoleId(role.id);
                          form.setValue('roleId', role.id);
                          
                          // Scroll to the roles tab
                          document.querySelector('[data-value="roles"]')?.scrollIntoView({
                            behavior: 'smooth'
                          });
                        }}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        {role.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}