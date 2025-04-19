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

export default function ProjectsPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Redirect to auth if not logged in
  if (!user) {
    navigate("/auth");
    return null;
  }

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "AI-Powered Finance Assistant",
      description: "Building an AI assistant that helps users manage their finances, track expenses, and provide personalized financial advice.",
      category: "Artificial Intelligence",
      stage: "Development",
      progress: 70,
      members: 8,
      maxMembers: 12,
      tags: ["AI", "Finance", "Machine Learning"],
      owner: {
        name: "Alex Johnson",
        avatar: null
      },
      featured: true
    },
    {
      id: 2,
      title: "Sustainable Energy Tracker",
      description: "A platform to track and optimize energy consumption for homes and businesses, promoting sustainable energy practices.",
      category: "CleanTech",
      stage: "Planning",
      progress: 45,
      members: 5,
      maxMembers: 10,
      tags: ["Sustainability", "Energy", "IoT"],
      owner: {
        name: "Emma Chen",
        avatar: null
      },
      featured: true
    },
    {
      id: 3,
      title: "Mental Health Platform",
      description: "Creating a comprehensive platform for mental health support, including resources, therapy connections, and community support.",
      category: "HealthTech",
      stage: "Development",
      progress: 60,
      members: 9,
      maxMembers: 15,
      tags: ["Health", "Psychology", "Support"],
      owner: {
        name: "Michael Taylor",
        avatar: null
      },
      featured: true
    },
    {
      id: 4,
      title: "EdTech Learning System",
      description: "An interactive learning platform using gamification and AI to personalize education for K-12 students.",
      category: "Education",
      stage: "Testing",
      progress: 80,
      members: 7,
      maxMembers: 12,
      tags: ["Education", "AI", "Gamification"],
      owner: {
        name: "Sarah Parker",
        avatar: null
      },
      featured: true
    },
    {
      id: 5,
      title: "AR Shopping Experience",
      description: "Developing an augmented reality application to enhance online shopping with virtual try-ons and product visualization.",
      category: "Augmented Reality",
      stage: "Development",
      progress: 65,
      members: 6,
      maxMembers: 10,
      tags: ["AR", "E-commerce", "Mobile"],
      owner: {
        name: "David Wilson",
        avatar: null
      },
      featured: false
    },
    {
      id: 6,
      title: "Food Waste Reduction App",
      description: "An app that connects restaurants and grocery stores with local food banks to reduce food waste and help those in need.",
      category: "Social Impact",
      stage: "Planning",
      progress: 30,
      members: 4,
      maxMembers: 8,
      tags: ["Social Good", "Sustainability", "Food"],
      owner: {
        name: "Jessica Lee",
        avatar: null
      },
      featured: false
    },
    {
      id: 7,
      title: "Decentralized Social Network",
      description: "Building a blockchain-based social network that gives users control over their data and content ownership.",
      category: "Blockchain",
      stage: "Concept",
      progress: 20,
      members: 3,
      maxMembers: 12,
      tags: ["Blockchain", "Web3", "Privacy"],
      owner: {
        name: "Ryan Smith",
        avatar: null
      },
      featured: false
    },
    {
      id: 8,
      title: "Autonomous Delivery Robots",
      description: "Developing small-scale autonomous robots for last-mile delivery in urban environments.",
      category: "Robotics",
      stage: "Development",
      progress: 55,
      members: 7,
      maxMembers: 14,
      tags: ["Robotics", "AI", "Logistics"],
      owner: {
        name: "Chris Zhang",
        avatar: null
      },
      featured: false
    }
  ];

  // Filter categories
  const categories = ["All Categories", "AI", "CleanTech", "HealthTech", "Education", "Blockchain", "Robotics"];
  const stages = ["All Stages", "Concept", "Planning", "Development", "Testing", "Launch"];

  // Filter projects based on search term and active tab
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "featured") return matchesSearch && project.featured;
    if (activeTab === "recent") return matchesSearch; // In a real app, we'd filter by date
    if (activeTab === "popular") return matchesSearch; // In a real app, we'd filter by popularity
    
    return matchesSearch;
  });

  return (
    <div className="bg-background min-h-screen">
      {/* Header section */}
      <section className="pt-20 pb-12 bg-muted/30 relative overflow-hidden border-b border-border">
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
                Project Explorer
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Discover <span className="text-primary">Innovative Projects</span> to Join
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              Browse through exciting projects, find teams to collaborate with, or start your own venture.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                onClick={() => {}}
                className="rounded-xl gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Project
              </Button>
              <Button 
                variant="outline" 
                className="rounded-xl gap-2"
              >
                <GitMerge className="h-4 w-4" />
                My Projects
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search and filter section */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search projects..." 
                className="pl-10 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[160px] rounded-lg">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category, index) => (
                      <SelectItem key={index} value={category.toLowerCase().replace(/\s+/g, '')}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-[160px] rounded-lg">
                    <SelectValue placeholder="Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage, index) => (
                      <SelectItem key={index} value={stage.toLowerCase().replace(/\s+/g, '')}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" className="rounded-lg">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects listing */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs 
            defaultValue="all" 
            className="mb-8"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex justify-between items-center mb-6">
              <TabsList className="rounded-xl">
                <TabsTrigger value="all" className="rounded-lg">All Projects</TabsTrigger>
                <TabsTrigger value="featured" className="rounded-lg">Featured</TabsTrigger>
                <TabsTrigger value="recent" className="rounded-lg">Recent</TabsTrigger>
                <TabsTrigger value="popular" className="rounded-lg">Popular</TabsTrigger>
              </TabsList>
              
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredProjects.length}</span> projects
              </div>
            </div>
            
            <TabsContent value="all">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="featured">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="recent">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="popular">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project }: { project: any }) {
  const getStatusColor = (stage: string) => {
    switch(stage) {
      case 'Concept': return 'text-blue-400';
      case 'Planning': return 'text-amber-400';
      case 'Development': return 'text-violet-400';
      case 'Testing': return 'text-emerald-400';
      case 'Launch': return 'text-green-400';
      default: return 'text-muted-foreground';
    }
  };
  
  const getStatusBg = (stage: string) => {
    switch(stage) {
      case 'Concept': return 'bg-blue-400/10';
      case 'Planning': return 'bg-amber-400/10';
      case 'Development': return 'bg-violet-400/10';
      case 'Testing': return 'bg-emerald-400/10';
      case 'Launch': return 'bg-green-400/10';
      default: return 'bg-muted';
    }
  };

  return (
    <motion.div variants={fadeIn}>
      <Card className="overflow-hidden hover:shadow-md transition-all hover:border-primary/30 h-full flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="mb-1">{project.title}</CardTitle>
              <CardDescription>{project.category}</CardDescription>
            </div>
            {project.featured && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pb-4 flex-1">
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.map((tag: string, idx: number) => (
              <Badge key={idx} variant="outline" className="rounded-full font-normal">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Progress</span>
                <span className={getStatusColor(project.stage)}>{project.stage}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Team</span>
                <span>{project.members}/{project.maxMembers} members</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full">
                <div 
                  className="h-full bg-emerald-500 rounded-full" 
                  style={{ width: `${(project.members/project.maxMembers) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t bg-muted/20 flex justify-between pt-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-xs font-medium">
              {project.owner.name.charAt(0)}
            </div>
            <span className="text-sm">{project.owner.name}</span>
          </div>
          
          <Button size="sm" className="gap-1 rounded-lg">
            <span>View</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}