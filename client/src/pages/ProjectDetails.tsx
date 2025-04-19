import { useQuery } from '@tanstack/react-query';
import { useParams } from 'wouter';
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
import { applicationFormSchema } from '@shared/schema';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { getStageColor, getProgressPercentage } from '@/lib/project-utils';

// Application form schema
const formSchema = applicationFormSchema.extend({
  message: z.string().min(10, {
    message: "Your application message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [applyingForRoleId, setApplyingForRoleId] = useState<number | null>(null);
  
  // Get project data
  const { data: project, isLoading: isLoadingProject } = useQuery({
    queryKey: [`/api/projects/${id}`],
  });
  
  // Get roles data
  const { data: roles, isLoading: isLoadingRoles } = useQuery({
    queryKey: [`/api/projects/${id}/roles`],
  });
  
  // Get team members data
  const { data: teamMembers, isLoading: isLoadingTeam } = useQuery({
    queryKey: [`/api/projects/${id}/team`],
  });
  
  // Form for application
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
      userId: 1, // TODO: Replace with actual user ID from auth
      roleId: 0,
      projectId: parseInt(id),
    },
  });
  
  async function onSubmit(data: FormValues) {
    try {
      await apiRequest('POST', `/api/projects/${id}/apply`, data);
      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      });
      setApplyingForRoleId(null);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-700 rounded-lg mb-6"></div>
          <div className="h-10 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-2/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-40 bg-gray-700 rounded"></div>
            <div className="h-40 bg-gray-700 rounded"></div>
            <div className="h-40 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Project not found</h1>
              <p className="text-muted-foreground">The project you're looking for doesn't exist or has been removed.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const stageColor = getStageColor(project.stage);
  const progress = getProgressPercentage(project.stage);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Project Banner & Header */}
      <div className="relative mb-6">
        <div className="relative h-64 rounded-lg overflow-hidden">
          <img 
            src={project.banner || "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"} 
            alt={project.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <Badge className={`bg-${stageColor}-500 hover:bg-${stageColor}-600 mb-2`}>
              {project.stage}
            </Badge>
            <h1 className="text-3xl font-bold text-white mb-1">{project.name}</h1>
            <div className="flex items-center text-white/80">
              <span>Created by:</span>
              <div className="ml-2 flex -space-x-2">
                {teamMembers?.filter(member => member.isFounder).map((founder, index) => (
                  <Avatar key={index} className="h-6 w-6 border-2 border-background">
                    <AvatarImage src={founder.user?.avatar} alt={founder.user?.username} />
                    <AvatarFallback>{founder.user?.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="roles">Open Roles</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6">{project.description}</p>
                  
                  <h3 className="text-lg font-semibold mb-2">Problem Statement</h3>
                  <p className="mb-6">{project.problem || "No problem statement provided."}</p>
                  
                  <h3 className="text-lg font-semibold mb-2">Market Opportunity</h3>
                  <p className="mb-6">{project.market || "No market information provided."}</p>
                  
                  <h3 className="text-lg font-semibold mb-2">Competition</h3>
                  <p>{project.competition || "No competition information provided."}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="roles">
              <Card>
                <CardHeader>
                  <CardTitle>Open Roles</CardTitle>
                  <CardDescription>Join the team and help build this project</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingRoles ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-16 bg-gray-700 rounded"></div>
                      <div className="h-16 bg-gray-700 rounded"></div>
                      <div className="h-16 bg-gray-700 rounded"></div>
                    </div>
                  ) : roles && roles.length > 0 ? (
                    <div className="space-y-4">
                      {roles.map((role) => (
                        <Card key={role.id} className="bg-background/50">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                              <div>
                                <h3 className="text-lg font-semibold">{role.title}</h3>
                                <p className="text-sm text-muted-foreground">{role.description}</p>
                              </div>
                              {applyingForRoleId === role.id ? (
                                <Button variant="ghost" size="sm" onClick={() => setApplyingForRoleId(null)}>
                                  Cancel
                                </Button>
                              ) : (
                                <Button 
                                  size="sm" 
                                  onClick={() => {
                                    setApplyingForRoleId(role.id);
                                    form.setValue('roleId', role.id);
                                  }}
                                >
                                  Apply Now
                                </Button>
                              )}
                            </div>
                            
                            {applyingForRoleId === role.id && (
                              <div className="mt-4">
                                <Form {...form}>
                                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                      control={form.control}
                                      name="message"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Why are you a good fit for this role?</FormLabel>
                                          <FormControl>
                                            <Textarea 
                                              placeholder="Tell the team about your skills and experience..." 
                                              className="resize-none" 
                                              {...field} 
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <div className="flex justify-end space-x-2">
                                      <Button variant="outline" type="button" onClick={() => setApplyingForRoleId(null)}>
                                        Cancel
                                      </Button>
                                      <Button type="submit" disabled={form.formState.isSubmitting}>
                                        Submit Application
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
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No open roles available at the moment.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>The people behind this project</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingTeam ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-16 bg-gray-700 rounded"></div>
                      <div className="h-16 bg-gray-700 rounded"></div>
                    </div>
                  ) : teamMembers && teamMembers.length > 0 ? (
                    <div className="space-y-4">
                      {teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center p-2 rounded-md hover:bg-accent">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src={member.user?.avatar} alt={member.user?.username} />
                            <AvatarFallback>{member.user?.username.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold">{member.user?.username}</h3>
                              {member.isFounder && (
                                <Badge variant="outline" className="ml-2 text-xs bg-primary/10">Founder</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{member.user?.bio || "No bio available"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No team members found.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium">Team Size</span>
                  <div className="flex items-center">
                    <span className="text-xl font-semibold">{project.teamSize}</span>
                    <span className="mx-1 text-muted-foreground">/</span>
                    <span className="text-muted-foreground">{project.maxTeamSize}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium">Category</span>
                  <Badge variant="outline" className="w-fit">
                    {project.category}
                  </Badge>
                </div>
                
                {project.website && (
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-medium">Website</span>
                    <a 
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate"
                    >
                      {project.website}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Join Project</CardTitle>
              <CardDescription>Apply to become part of this team</CardDescription>
            </CardHeader>
            <CardContent>
              {roles && roles.length > 0 ? (
                <ScrollArea className="h-40 rounded-md">
                  {roles.map((role) => (
                    <div key={role.id} className="mb-2 last:mb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{role.title}</span>
                        <Button size="sm" variant="outline" onClick={() => {
                          setApplyingForRoleId(role.id);
                          form.setValue('roleId', role.id);
                          document.getElementById('roles-tab')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                          Apply
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </ScrollArea>
              ) : (
                <div className="text-center py-2">
                  <p className="text-muted-foreground">No open roles at the moment</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={!roles || roles.length === 0}>
                View All Open Positions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
