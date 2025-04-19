import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  GitMerge, 
  Users, 
  Search, 
  Filter, 
  ArrowRight,
  Star,
  Check,
  X,
  Plus,
  Rocket,
  Activity
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects, useFilteredProjects, useFeaturedProjects } from "@/hooks/useProjects";
import { Project } from "@shared/schema";
import CreateProjectModal from "@/components/CreateProjectModal";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Category and filter data
const categories = [
  { id: "all", name: "All Categories" },
  { id: "EdTech", name: "EdTech" },
  { id: "FinTech", name: "FinTech" },
  { id: "AI", name: "AI/ML" },
  { id: "HealthTech", name: "HealthTech" },
  { id: "Sustainability", name: "Sustainability" },
  { id: "Social Impact", name: "Social Impact" },
  { id: "E-commerce", name: "E-commerce" },
  { id: "Other", name: "Other" }
];

const projectStages = [
  { id: "all", name: "All Stages" },
  { id: "Idea", name: "Idea" },
  { id: "Concept", name: "Concept" },
  { id: "Validation", name: "Validation" },
  { id: "Building MVP", name: "Building MVP" },
  { id: "Launch Ready", name: "Launch Ready" },
  { id: "Scaling", name: "Scaling" }
];

const teamSizes = [
  { id: "all", name: "Any Size" },
  { id: "1", name: "Small (1-5)" },
  { id: "2", name: "Medium (6-10)" },
  { id: "3", name: "Large (10+)" }
];

export default function ProjectsPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    stage: "all",
    teamSize: "all"
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Fetch projects data
  const { data: projects, isLoading, error } = useProjects();
  const { data: featuredProjects = [], isLoading: isFeaturedLoading } = useFeaturedProjects();
  const filteredProjects = useFilteredProjects(searchTerm, filters);
  
  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  
  // Get user's own projects
  const myProjects = projects?.filter(p => p.createdBy === user?.id) || [];
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8 min-h-screen">
      {/* Header section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold mb-2">Explore Projects</h1>
        <p className="text-muted-foreground text-lg mb-6">
          Discover innovative projects and find opportunities to collaborate with other entrepreneurs, developers, and creatives.
        </p>
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative flex-1 w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select
              value={filters.category}
              onValueChange={(value) => setFilters({...filters, category: value})}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={filters.stage}
              onValueChange={(value) => setFilters({...filters, stage: value})}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Project Stage" />
              </SelectTrigger>
              <SelectContent>
                {projectStages.map(stage => (
                  <SelectItem key={stage.id} value={stage.id}>{stage.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={filters.teamSize}
              onValueChange={(value) => setFilters({...filters, teamSize: value})}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Team Size" />
              </SelectTrigger>
              <SelectContent>
                {teamSizes.map(size => (
                  <SelectItem key={size.id} value={size.id}>{size.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={openCreateModal}
            className="w-full md:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </div>
      </motion.div>
      
      {/* Projects tabs section */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          {user && <TabsTrigger value="my-projects">My Projects</TabsTrigger>}
          {user && <TabsTrigger value="applications">My Applications</TabsTrigger>}
        </TabsList>
        
        {/* All Projects Tab */}
        <TabsContent value="all">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-destructive">Error loading projects. Please try again later.</p>
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.data.length > 0 ? (
                filteredProjects.data.map((project) => (
                  <motion.div 
                    key={project.id}
                    variants={fadeIn}
                    className="cursor-pointer"
                    onClick={() => setLocation(`/projects/${project.id}`)}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No projects found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-4">
                    We couldn't find any projects matching your search criteria. Try adjusting your filters or search term.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({category: 'all', stage: 'all', teamSize: 'all'});
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </TabsContent>
        
        {/* Featured Projects Tab */}
        <TabsContent value="featured">
          {isFeaturedLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(3).fill(0).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredProjects.length > 0 ? (
                featuredProjects.map((project) => (
                  <motion.div 
                    key={project.id}
                    variants={fadeIn}
                    className="cursor-pointer"
                    onClick={() => setLocation(`/projects/${project.id}`)}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Star className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No featured projects</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    There are no featured projects at the moment. Check back later or browse all projects.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </TabsContent>
        
        {/* My Projects Tab */}
        {user && (
          <TabsContent value="my-projects">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(3).fill(0).map((_, i) => (
                  <ProjectCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {myProjects.length > 0 ? (
                  myProjects.map((project) => (
                    <motion.div 
                      key={project.id}
                      variants={fadeIn}
                      className="cursor-pointer"
                      onClick={() => setLocation(`/projects/${project.id}`)}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Rocket className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No projects yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-4">
                      You haven't created any projects yet. Start your journey by creating your first project.
                    </p>
                    <Button onClick={openCreateModal}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Project
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </TabsContent>
        )}
        
        {/* My Applications Tab */}
        {user && (
          <TabsContent value="applications">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="col-span-full text-center py-16">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Activity className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-2">No applications yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  You haven't applied to any projects yet. Explore projects and submit applications to join teams.
                </p>
                <Button variant="outline" onClick={() => setLocation('/projects')}>
                  Explore Projects
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        )}
      </Tabs>
      
      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <CreateProjectModal 
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
        />
      )}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow overflow-hidden border-2 group">
      {project.isFeatured && (
        <div className="bg-primary/10 w-full py-1.5 px-3 text-xs font-medium flex items-center justify-center text-primary">
          <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
          Featured Project
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="group-hover:text-primary transition-colors line-clamp-1">
              {project.name}
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs font-normal">
                {project.category}
              </Badge>
              <span className="mx-2 text-muted-foreground text-xs">•</span>
              <span className="text-xs text-muted-foreground">
                {project.stage}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {project.description}
        </p>
        
        <div className="flex items-center text-xs text-muted-foreground mt-2">
          <Users className="h-3.5 w-3.5 mr-1" />
          <span>{project.teamSize}/{project.maxTeamSize} members</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 border-t flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Created {new Date(project.createdAt).toLocaleDateString()}
        </span>
        
        <Button variant="ghost" size="sm" className="gap-1 text-xs h-8">
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProjectCardSkeleton() {
  return (
    <Card className="h-full border-2">
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      
      <CardContent className="pb-3">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        
        <Skeleton className="h-3 w-1/3 mt-4" />
      </CardContent>
      
      <CardFooter className="pt-2 border-t flex justify-between items-center">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-24" />
      </CardFooter>
    </Card>
  );
}