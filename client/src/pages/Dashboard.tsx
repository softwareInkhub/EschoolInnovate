import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectCard from '@/components/ProjectCard';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Dashboard() {
  // For demo purposes, we'll use user ID 1
  const userId = 1;
  
  // Get user data
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: [`/api/users/${userId}`],
  });
  
  // Get projects created by the user
  const { data: projects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['/api/projects'],
  });
  
  // Filter for user's projects (where createdBy = userId)
  const userProjects = projects?.filter(p => p.createdBy === userId) || [];
  
  // In a real app, we would fetch user's applications and team memberships separately
  
  if (isLoadingUser || isLoadingProjects) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-40 bg-gray-700 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-60 bg-gray-700 rounded"></div>
            <div className="h-60 bg-gray-700 rounded"></div>
            <div className="h-60 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* User Profile Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.avatar} alt={user?.username} />
              <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{user?.username}</h1>
              <p className="text-muted-foreground mb-4">{user?.email}</p>
              <p>{user?.bio || "No bio available"}</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold">{userProjects.length}</div>
              <div className="text-muted-foreground">Projects</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Dashboard Tabs */}
      <Tabs defaultValue="my-projects">
        <TabsList className="mb-8">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="teams">My Teams</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-projects">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Projects you've created</h2>
          </div>
          
          {userProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't created any projects yet. Start by creating a new project.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>
                View the status of your applications to join projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  You haven't applied to any projects yet.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="teams">
          <Card>
            <CardHeader>
              <CardTitle>My Teams</CardTitle>
              <CardDescription>
                Projects where you are a team member
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userProjects.map(project => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="relative h-32">
                      <img 
                        src={project.banner || "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"} 
                        alt={project.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="outline" className="bg-primary text-white border-none">
                          Founder
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium truncate">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.stage}</p>
                    </CardContent>
                  </Card>
                ))}
                
                {userProjects.length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">
                      You're not a member of any teams yet.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
