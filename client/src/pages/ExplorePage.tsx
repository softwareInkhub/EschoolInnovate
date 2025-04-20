import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
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
  ChevronDown,
  Filter,
  Plus,
  ArrowRight,
  Star
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

// Educational categories
const eduCategories = [
  "All Categories", "Programming", "AI", "Business", "Design", 
  "Data Science", "Leadership", "Mobile", "Finance"
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
  
  // Featured schools data (same as in SchoolsPage)
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
      id: 5,
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
            <Tabs defaultValue="projects" className="w-full" onValueChange={setMainTab}>
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="projects" className="text-base py-3">
                  <Rocket className="h-4 w-4 mr-2" />
                  Projects & Startups
                </TabsTrigger>
                <TabsTrigger value="learning" className="text-base py-3">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Learning Platform
                </TabsTrigger>
                <TabsTrigger value="funding" className="text-base py-3">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Funding
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content Section - Projects Tab */}
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
              <Button 
                onClick={openCreateModal}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Project
              </Button>
            </div>
            
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Discover innovative projects and startups across various industries. Find opportunities to collaborate, join teams, or support exciting ventures.
            </p>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
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
                        onClick={() => window.location.href = `/projects/${project.id}`}
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

            {/* Other tabs would have similar content */}
            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.data?.slice(0, 3).map((project: any) => (
                  <div 
                    key={project.id}
                    className="cursor-pointer"
                    onClick={() => window.location.href = `/projects/${project.id}`}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Project statistics */}
          <div className="mt-16 mb-8">
            <h3 className="text-xl font-bold mb-6">Project Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{projects?.length || 0}</h3>
                    <p className="text-muted-foreground">Active Projects</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">1,500+</h3>
                    <p className="text-muted-foreground">Team Members</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">42</h3>
                    <p className="text-muted-foreground">Tech Categories</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">85%</h3>
                    <p className="text-muted-foreground">Success Rate</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Need help creating a project? */}
          <Card className="bg-muted/30 mt-12">
            <CardContent className="p-8 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Rocket className="h-10 w-10 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Ready to Launch Your Project?</h3>
                <p className="text-muted-foreground mb-4">
                  Create your project to find collaborators, get feedback, and bring your ideas to life.
                </p>
                <Button onClick={openCreateModal} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Learning Platform Tab */}
      {mainTab === "learning" && (
        <section className="py-10">
          <div className="container mx-auto px-4">
            <motion.div 
              className="mb-12"
              initial="hidden"
              animate="visible" 
              variants={fadeIn}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Learning Platform</h2>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Browse All Courses
                </Button>
              </div>
              
              <p className="text-muted-foreground mb-8 max-w-3xl">
                Access high-quality courses and resources from leading educational partners to enhance your skills and advance your career.
              </p>
              
              {/* Filter controls */}
              <div className="flex flex-wrap items-center gap-2 mb-12">
                {eduCategories.map((category, index) => (
                  <Button 
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>
            
            {/* Featured schools */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Featured Schools</h2>
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  <span>View all schools</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {featuredSchools.filter(school => school.featured).map((school) => (
                  <motion.div 
                    key={school.id}
                    variants={fadeIn}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/30 group cursor-pointer"
                  >
                    <div className="p-6 border-b border-border">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            {school.icon}
                          </div>
                          <div>
                            <h3 className="font-bold">{school.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Star className="h-3 w-3 text-amber-500 mr-1" />
                              <span>{school.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="h-7 w-7 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 text-sm">{school.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {school.categories.slice(0, 3).map((category, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs rounded-full bg-muted">
                            {category}
                          </span>
                        ))}
                        {school.categories.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-muted">
                            +{school.categories.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="px-6 py-4 bg-muted/20 flex justify-between items-center">
                      <div className="text-xs">
                        <div>{school.courses} Courses</div>
                        <div className="text-muted-foreground">{school.students.toLocaleString()} Students</div>
                      </div>
                      <Button variant="secondary" size="sm" className="rounded-lg">
                        View Courses
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Featured courses */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Popular Courses</h2>
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  <span>View all courses</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(4).fill(0).map((_, i) => (
                  <Card key={i} className="overflow-hidden border-2 hover:border-primary/30 transition-all cursor-pointer group">
                    <div className="h-40 bg-muted overflow-hidden">
                      <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          {i % 2 === 0 ? 
                            <Code className="h-6 w-6 text-primary" /> : 
                            i % 3 === 0 ? 
                              <DollarSign className="h-6 w-6 text-primary" /> : 
                              <GraduationCap className="h-6 w-6 text-primary" />
                          }
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary">Featured</Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs font-normal">
                          {i % 2 === 0 ? "Programming" : i % 3 === 0 ? "Business" : "Data Science"}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {i % 2 === 0 ? "Advanced Web Development" : 
                          i % 3 === 0 ? "Startup Growth Strategies" : 
                          "Machine Learning Fundamentals"}
                      </h3>
                      
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {i % 2 === 0 ? 
                          "Master modern web development with React, Node.js, and cloud deployment." : 
                          i % 3 === 0 ? 
                            "Learn proven strategies to grow your startup from early stage to scale." : 
                            "Build practical machine learning models with Python and TensorFlow."}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Star className="h-3 w-3 text-amber-500 mr-1 fill-amber-500" />
                          <Star className="h-3 w-3 text-amber-500 mr-1 fill-amber-500" />
                          <Star className="h-3 w-3 text-amber-500 mr-1 fill-amber-500" />
                          <Star className="h-3 w-3 text-amber-500 mr-1 fill-amber-500" />
                          <Star className="h-3 w-3 text-amber-500 mr-1 fill-amber-500" />
                          <span className="text-xs ml-1 text-muted-foreground">(324)</span>
                        </div>
                        
                        <div className="text-sm font-semibold">
                          {i % 2 === 0 ? "Free" : "$49.99"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Learning paths */}
            <Card className="bg-muted/30 mb-16">
              <CardHeader>
                <CardTitle>Personalized Learning Paths</CardTitle>
                <CardDescription>Curated course collections to master specific skills</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border rounded-lg p-5 hover:border-primary transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Full-Stack Development</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    From frontend to backend, master the entire web development stack
                  </p>
                  <div className="text-xs mb-3">
                    <span className="text-primary">12 courses</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">6 months</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full justify-between">
                    <span>View Path</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="bg-card border rounded-lg p-5 hover:border-primary transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Startup Founder</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Essential skills for launching and growing a successful startup
                  </p>
                  <div className="text-xs mb-3">
                    <span className="text-primary">10 courses</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">4 months</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full justify-between">
                    <span>View Path</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="bg-card border rounded-lg p-5 hover:border-primary transition-all cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">AI & Machine Learning</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Comprehensive training in AI fundamentals and applications
                  </p>
                  <div className="text-xs mb-3">
                    <span className="text-primary">15 courses</span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">8 months</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full justify-between">
                    <span>View Path</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Join as educator */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-8 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">Become an Educator</h3>
                  <p className="text-muted-foreground mb-4">
                    Share your expertise, create courses, and help others learn while earning income.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button className="gap-2">
                      Apply as Educator
                    </Button>
                    <Button variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
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
          Created {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Recently"}
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
        <div className="h-6 bg-muted-foreground/10 rounded w-3/4 animate-pulse mb-2"></div>
        <div className="h-4 bg-muted-foreground/10 rounded w-1/2 animate-pulse"></div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="h-4 bg-muted-foreground/10 rounded w-full animate-pulse mb-2"></div>
        <div className="h-4 bg-muted-foreground/10 rounded w-full animate-pulse mb-2"></div>
        <div className="h-4 bg-muted-foreground/10 rounded w-2/3 animate-pulse mb-4"></div>
        
        <div className="h-3 bg-muted-foreground/10 rounded w-1/3 animate-pulse"></div>
      </CardContent>
      
      <CardFooter className="pt-2 border-t flex justify-between items-center">
        <div className="h-3 bg-muted-foreground/10 rounded w-1/4 animate-pulse"></div>
        <div className="h-6 bg-muted-foreground/10 rounded w-1/4 animate-pulse"></div>
      </CardFooter>
    </Card>
  );
}