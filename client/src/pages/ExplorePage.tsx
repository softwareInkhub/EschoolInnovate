import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import ContextualHelp from "@/components/ContextualHelp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Rocket, 
  Briefcase, 
  Code, 
  GraduationCap, 
  BookOpen,
  DollarSign,
  Users,
  TrendingUp,
  Filter,
  Plus,
  ArrowRight,
  Star,
  ChevronRight
} from "lucide-react";
import FundingSection from "@/components/FundingSection";
import { useProjects, useFeaturedProjects, useFilteredProjects } from "@/hooks/useProjects";
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

// Project Card Skeleton component
const ProjectCardSkeleton = () => (
  <Card className="h-full border-2">
    <CardHeader className="pb-0 pt-4">
      <div className="h-4 w-2/3 bg-muted rounded animate-pulse mb-2"></div>
      <div className="h-3 w-1/3 bg-muted/50 rounded animate-pulse"></div>
    </CardHeader>
    <CardContent className="py-4">
      <div className="h-3 w-full bg-muted/50 rounded animate-pulse mb-2"></div>
      <div className="h-3 w-full bg-muted/50 rounded animate-pulse mb-2"></div>
      <div className="h-3 w-2/3 bg-muted/50 rounded animate-pulse mb-4"></div>
      
      <div className="flex justify-between items-center">
        <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
        <div className="h-8 w-24 bg-muted rounded animate-pulse"></div>
      </div>
    </CardContent>
  </Card>
);

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

// Educational categories
const eduCategories = [
  "All Categories", "Programming", "AI", "Business", "Design", 
  "Data Science", "Leadership", "Mobile", "Finance"
];

// School data for learning tab
const featuredSchools = [
  {
    id: 1,
    name: "TechAcademy",
    description: "Advanced courses in programming, AI, and machine learning",
    courses: 24,
    students: 12500,
    rating: 4.8,
    icon: <Code className="h-6 w-6 text-primary" />,
    categories: ["Programming", "AI", "Machine Learning", "Web Development"],
    featured: true
  },
  {
    id: 2,
    name: "Business Hub",
    description: "Startup fundamentals, marketing, and growth strategies",
    courses: 18,
    students: 8700,
    rating: 4.6,
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    categories: ["Startups", "Marketing", "Business", "Growth"],
    featured: true
  },
  {
    id: 3,
    name: "Design Master",
    description: "UX/UI design principles and practical applications",
    courses: 15,
    students: 7200,
    rating: 4.7,
    icon: <Rocket className="h-6 w-6 text-primary" />,
    categories: ["UX", "UI", "Design Thinking", "Product Design"],
    featured: false
  },
  {
    id: 4,
    name: "Data Science Academy",
    description: "Data analysis, visualization and machine learning",
    courses: 22,
    students: 9300,
    rating: 4.9,
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    categories: ["Data Analysis", "Python", "Statistics", "R"],
    featured: true
  }
];

export default function ExplorePage() {
  const { user } = useAuth();
  const [mainTab, setMainTab] = useState("projects");
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

  // Simple ProjectCard component
  function ProjectCard({ project }: { project: Project }) {
    return (
      <Card className="h-full hover:shadow-md transition-shadow overflow-hidden border-2 group">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="group-hover:text-primary transition-colors line-clamp-1">
                {project.name}
              </CardTitle>
              <CardDescription className="line-clamp-1">
                {project.category}
                {project.stage && <span className="ml-2 text-xs">• {project.stage}</span>}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            <Badge variant="outline" className="text-xs font-normal">
              {project.category}
            </Badge>
            {project.stage && (
              <Badge variant="outline" className="text-xs font-normal">
                {project.stage}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>{project.teamSize || 0} / {project.maxTeamSize || 'Open'}</span>
            </span>
            <span>Created {new Date(project.createdAt || Date.now()).toLocaleDateString()}</span>
          </div>
        </CardContent>
        
        <CardFooter className="pt-2 border-t flex justify-between items-center">
          <Button variant="ghost" size="sm" className="gap-1 text-xs h-8">
            <span>Details</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
          
          <Button variant="default" size="sm" className="text-xs h-8">
            Join Project
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-muted/30 relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0"></div>
        <div className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full blur-[100px] z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn}>
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
                Explore Everything
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Discover Projects, Learning & <span className="text-primary">Funding</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Join innovative startups, enhance your skills with curated courses, and find funding opportunities to grow your ventures.
            </motion.p>
          </motion.div>
          
          {/* Main Navigation Tabs */}
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-full flex flex-wrap justify-center gap-4">
              <ContextualHelp
                id="explore-projects-tab"
                text={[
                  "Welcome to the Projects & Startups section! Here you can discover innovative ventures to join or support.",
                  "Browse through projects by category, search for specific interests, or filter by project stage.",
                  "Found something exciting? Click on a project card to view details and join the team!"
                ]}
                context="projects"
                interactive={true}
                isEssential={true}
              >
                <Button 
                  variant={mainTab === "projects" ? "default" : "outline"} 
                  size="lg"
                  className="text-base py-6 gap-2 w-full sm:w-auto"
                  onClick={() => setMainTab("projects")}
                >
                  <Rocket className="h-5 w-5" />
                  Projects & Startups
                </Button>
              </ContextualHelp>
              <ContextualHelp
                id="explore-learning-tab"
                text={[
                  "Welcome to the Learning Platform! This is your gateway to high-quality educational content.",
                  "Browse courses from leading schools and institutions in various fields like programming, business, and design.",
                  "Level up your skills and improve your project's success chances with targeted learning!"
                ]}
                context="learning"
                interactive={true}
              >
                <Button 
                  variant={mainTab === "learning" ? "default" : "outline"} 
                  size="lg"
                  className="text-base py-6 gap-2 w-full sm:w-auto"
                  onClick={() => setMainTab("learning")}
                >
                  <GraduationCap className="h-5 w-5" />
                  Learning Platform
                </Button>
              </ContextualHelp>
              <ContextualHelp
                id="explore-funding-tab"
                text={[
                  "Welcome to the Funding section! This is where you can find financial opportunities for your projects.",
                  "Discover grants, angel investors, venture capital, and crowdfunding options for your startup.",
                  "Get connected with potential investors who are looking for innovative ideas like yours!"
                ]}
                context="funding"
                interactive={true}
              >
                <Button 
                  variant={mainTab === "funding" ? "default" : "outline"} 
                  size="lg"
                  className="text-base py-6 gap-2 w-full sm:w-auto"
                  onClick={() => setMainTab("funding")}
                >
                  <DollarSign className="h-5 w-5" />
                  Funding
                </Button>
              </ContextualHelp>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Projects Tab */}
      {mainTab === "projects" && (
        <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-10"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Projects & Startups</h2>
              <ContextualHelp
                id="create-project-button"
                text={[
                  "Ready to start your own project? Click here to create one!",
                  "You'll be asked to provide details like project name, description, category, and team size requirements.",
                  "Once created, your project will be visible to potential collaborators and investors."
                ]}
                context="projects"
                width="md"
                position="left"
              >
                <Button 
                  onClick={openCreateModal}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Project
                </Button>
              </ContextualHelp>
            </div>
            
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Discover innovative projects and startups across various industries. Find opportunities to collaborate, join teams, or support exciting ventures.
            </p>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
              <ContextualHelp
                id="search-projects"
                text={[
                  "Looking for specific projects? Use this search bar to find exactly what you're interested in.",
                  "You can search by project name, keywords in the description, or by technology stack.",
                  "The results will update in real-time as you type!"
                ]}
                context="projects"
                position="bottom"
              >
                <div className="relative flex-1 w-full md:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </ContextualHelp>
              
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
                
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden md:inline">More Filters</span>
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Project listings */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="new">Newest</TabsTrigger>
              {user && <TabsTrigger value="my-projects">My Projects</TabsTrigger>}
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
                  {filteredProjects.data && filteredProjects.data.length > 0 ? (
                    filteredProjects.data.map((project: any) => (
                      <motion.div 
                        key={project.id}
                        variants={fadeIn}
                        className="cursor-pointer"
                        onClick={() => window.location.href = `/projects/${project.id}`}
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
                        Try adjusting your filters or search term to find more projects.
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
          </Tabs>
        </div>
      )}
      
      {/* Learning Platform Tab */}
      {mainTab === "learning" && (
        <div className="container mx-auto py-10 px-4 md:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Learning Platform</h2>
            <p className="text-muted-foreground">
              Access high-quality courses and resources from leading educational partners to enhance your skills and advance your career.
            </p>
          </div>
          
          {/* Featured Schools */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">Featured Schools</h3>
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                <span>View all schools</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredSchools.filter(school => school.featured).map((school) => (
                <Card key={school.id} className="hover:shadow-md transition-shadow border-2 hover:border-primary/30 cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {school.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{school.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-3 w-3 text-amber-500 mr-1" />
                          <span>{school.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-muted-foreground text-sm mb-3">{school.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {school.categories.slice(0, 3).map((category, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs font-normal">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center justify-between">
                      <span>{school.courses} Courses</span>
                      <span>{school.students.toLocaleString()} Students</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 border-t">
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      <span>View Courses</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Funding Tab */}
      {mainTab === "funding" && <FundingSection />}

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