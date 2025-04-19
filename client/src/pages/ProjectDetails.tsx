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
            <TabsList className="mb-6 w-full grid grid-cols-3">
              <TabsTrigger value="team">TEAM MEMBERS</TabsTrigger>
              <TabsTrigger value="overview">DETAILS</TabsTrigger>
              <TabsTrigger value="comments">COMMENTS (0)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="text-md font-medium mb-1">Description</h4>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </div>
                
                {project.problem && (
                  <div>
                    <h4 className="text-md font-medium mb-1">Problem Statement</h4>
                    <p className="text-muted-foreground text-sm">
                      {project.problem}
                    </p>
                  </div>
                )}
                
                {project.market && (
                  <div>
                    <h4 className="text-md font-medium mb-1">Target Market</h4>
                    <p className="text-muted-foreground text-sm">
                      {project.market}
                    </p>
                  </div>
                )}
                
                {project.competition && (
                  <div>
                    <h4 className="text-md font-medium mb-1">Competition</h4>
                    <p className="text-muted-foreground text-sm">
                      {project.competition}
                    </p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-md font-medium mb-1">Progress</h4>
                  <div className="flex items-center">
                    <Progress value={project.teamSize / project.maxTeamSize * 100} className="flex-1 h-2.5 mr-2" />
                    <span className="text-xs text-muted-foreground">{Math.round(project.teamSize / project.maxTeamSize * 100)}%</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t flex flex-col gap-3 mt-4">
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
                    {roles && Array.isArray(roles) && roles.length > 0 ? (
                      <Button 
                        className="w-full" 
                        disabled={project.teamSize >= project.maxTeamSize || !user}
                        onClick={() => {
                          if (user) {
                            setApplyingForRoleId(roles[0].id);
                            form.setValue('roleId', roles[0].id);
                          } else {
                            window.location.href = '/auth';
                          }
                        }}
                      >
                        {!user ? "Login to Apply" : 
                          project.teamSize >= project.maxTeamSize ? "Team Full" : "Apply Now"}
                      </Button>
                    ) : (
                      <Button 
                        className="w-full" 
                        disabled={project.teamSize >= project.maxTeamSize || !user}
                        onClick={() => {
                          if (!user) {
                            window.location.href = '/auth';
                          }
                        }}
                      >
                        {!user ? "Login to Join" : 
                          project.teamSize >= project.maxTeamSize ? "Team Full" : "Join Now"}
                      </Button>
                    )}
                  </div>
                  
                  {applyingForRoleId && (
                    <div className="mt-4 bg-muted/30 border p-4 rounded-md">
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
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="comments">
              <div className="p-4">
                <div className="text-center py-8">
                  <MessageSquare className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-muted-foreground">No comments yet</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="team">
              <div className="p-4">
                {isLoadingTeam ? (
                  <div className="flex flex-col gap-4 py-2">
                    <div className="h-16 bg-muted-foreground/10 rounded animate-pulse" />
                    <div className="h-16 bg-muted-foreground/10 rounded animate-pulse" />
                  </div>
                ) : !teamMembers || teamMembers.length === 0 ? (
                  <div className="text-center py-6">
                    <Users className="mx-auto h-10 w-10 text-muted-foreground/50 mb-2" />
                    <p className="text-muted-foreground">No team members yet</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 py-2">
                    {teamMembers.map((member) => (
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
                              roles?.find((r) => r.id === member.roleId)?.title || 'MEMBER' : 
                              member.isFounder ? 'FOUNDER' : 'MEMBER'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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