import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Brain, Star, ArrowRight, TrendingUp, Tag, Filter, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

// Mock type definition for a project
type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  stage: string;
  matchScore: number;
  skills: string[];
  members: number;
  maxMembers: number;
  owner: {
    name: string;
    avatar?: string;
  };
  tags: string[];
};

type ProjectRecommendationEngineProps = {
  currentUserInterests?: string[];
  currentUserSkills?: string[];
};

export default function ProjectRecommendationEngine({
  currentUserInterests = [],
  currentUserSkills = []
}: ProjectRecommendationEngineProps) {
  const { toast } = useToast();
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [skills, setSkills] = useState<string[]>(currentUserSkills);
  const [interests, setInterests] = useState<string[]>(currentUserInterests);
  const [teamSizePreference, setTeamSizePreference] = useState<[number]>([8]); // 1-15
  const [projectStagePreference, setProjectStagePreference] = useState("any");
  const [timeCommitment, setTimeCommitment] = useState("medium");
  const [preferRemote, setPreferRemote] = useState(true);
  const [recommendations, setRecommendations] = useState<Project[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Mock project data - in a real app this would come from an API
  const mockProjects: Project[] = [
    {
      id: 1,
      title: "AI-Powered Finance Assistant",
      description: "Building an AI assistant that helps users manage finances, track expenses, and provide financial advice",
      category: "Finance",
      stage: "Development",
      matchScore: 92,
      skills: ["Machine Learning", "Python", "Financial Analysis", "NLP"],
      members: 8,
      maxMembers: 12,
      owner: {
        name: "Alex Johnson"
      },
      tags: ["AI", "Finance", "Machine Learning"]
    },
    {
      id: 2,
      title: "Sustainable Energy Tracker",
      description: "A platform to track and optimize energy consumption for homes and businesses, promoting sustainable practices",
      category: "Environment",
      stage: "Planning",
      matchScore: 85,
      skills: ["Data Visualization", "IoT", "React", "Node.js"],
      members: 5,
      maxMembers: 10,
      owner: {
        name: "Emma Chen"
      },
      tags: ["Sustainability", "Energy", "IoT"]
    },
    {
      id: 3,
      title: "Mental Health Platform",
      description: "Creating a comprehensive platform for mental health support with resources, therapy connections, and community",
      category: "Healthcare",
      stage: "Development",
      matchScore: 78,
      skills: ["React", "Psychology", "UX Design", "Node.js"],
      members: 9,
      maxMembers: 15,
      owner: {
        name: "Michael Taylor"
      },
      tags: ["Health", "Psychology", "Support"]
    },
    {
      id: 4,
      title: "AR Shopping Experience",
      description: "Developing an augmented reality application to enhance online shopping with virtual try-ons and visualization",
      category: "Retail",
      stage: "Development",
      matchScore: 73,
      skills: ["AR Development", "3D Modeling", "Swift", "Mobile Development"],
      members: 6,
      maxMembers: 10,
      owner: {
        name: "David Wilson"
      },
      tags: ["AR", "E-commerce", "Mobile"]
    },
    {
      id: 5,
      title: "Decentralized Social Network",
      description: "Building a blockchain-based social network that gives users control over their data and content ownership",
      category: "Social Media",
      stage: "Concept",
      matchScore: 68,
      skills: ["Blockchain", "Smart Contracts", "React", "Node.js"],
      members: 3,
      maxMembers: 12,
      owner: {
        name: "Ryan Smith"
      },
      tags: ["Blockchain", "Web3", "Privacy"]
    }
  ];

  // Categories extracted from the project data
  const categories = ["All Categories", "Finance", "Environment", "Healthcare", "Retail", "Social Media", "Education", "Transport"];
  
  // Common skills for suggestions
  const popularSkills = [
    "JavaScript", "Python", "React", "Node.js", "Machine Learning", "UI/UX Design", 
    "Product Management", "Data Analysis", "Mobile Development", "Blockchain"
  ];
  
  // Common interests for suggestions
  const popularInterests = [
    "AI/ML", "Climate Tech", "Health Tech", "Blockchain", "Education", "Social Impact", 
    "Fintech", "Data Science", "Mobile Apps", "Web Development"
  ];

  // Handle skill input
  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  // Handle interest input
  const addInterest = (interest: string) => {
    if (interest && !interests.includes(interest)) {
      setInterests([...interests, interest]);
      setInterestInput("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  // Simulate the AI analyzing preferences and returning recommendations
  const analyzeAndRecommend = () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter and sort projects based on user preferences
      const filtered = mockProjects
        .filter(project => {
          if (selectedCategory !== "all" && 
              project.category.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
          
          if (projectStagePreference !== "any" && 
              project.stage.toLowerCase() !== projectStagePreference.toLowerCase()) {
            return false;
          }
          
          if (project.members >= project.maxMembers) {
            return false;
          }
          
          return true;
        })
        // Sort by match score (in a real app, this would be calculated by the backend)
        .sort((a, b) => b.matchScore - a.matchScore);
      
      setRecommendations(filtered);
      setIsAnalyzing(false);
      
      toast({
        title: "Recommendations ready!",
        description: `Found ${filtered.length} projects that match your preferences.`,
      });
    }, 2000);
  };

  // Initial recommendations on component mount
  useEffect(() => {
    analyzeAndRecommend();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mb-2 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
            <Brain className="w-4 h-4 mr-2" />
            <span>AI-Powered Recommendations</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Find Your Perfect Project Match</h2>
          <p className="text-muted-foreground">Our AI engine analyzes your skills and preferences to recommend the most suitable projects</p>
        </div>
        
        {/* Main search and filter area */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2 text-primary" />
              Refine Your Project Search
            </CardTitle>
            <CardDescription>
              Tell us more about what you're looking for to get tailored recommendations
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              {/* Skills section */}
              <div>
                <Label className="mb-2 block">Your Skills</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add a skill (e.g., JavaScript, UX Design)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addSkill(skillInput);
                        e.preventDefault();
                      }
                    }}
                  />
                  <Button 
                    onClick={() => addSkill(skillInput)}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-2 py-1 gap-1">
                      {skill}
                      <button 
                        onClick={() => removeSkill(skill)}
                        className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"
                      >
                        ✕
                      </button>
                    </Badge>
                  ))}
                  {skills.length === 0 && (
                    <div className="text-sm text-muted-foreground italic">Add some skills to improve recommendations</div>
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground mb-2">Suggested skills:</div>
                <div className="flex flex-wrap gap-2">
                  {popularSkills
                    .filter(skill => !skills.includes(skill))
                    .slice(0, 5)
                    .map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary/5"
                        onClick={() => addSkill(skill)}
                      >
                        + {skill}
                      </Badge>
                    ))}
                </div>
              </div>
              
              {/* Interests section */}
              <div>
                <Label className="mb-2 block">Your Interests</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add an interest (e.g., AI, Healthcare)"
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addInterest(interestInput);
                        e.preventDefault();
                      }
                    }}
                  />
                  <Button 
                    onClick={() => addInterest(interestInput)}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="px-2 py-1 gap-1">
                      {interest}
                      <button 
                        onClick={() => removeInterest(interest)}
                        className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"
                      >
                        ✕
                      </button>
                    </Badge>
                  ))}
                  {interests.length === 0 && (
                    <div className="text-sm text-muted-foreground italic">Add some interests to improve recommendations</div>
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground mb-2">Suggested interests:</div>
                <div className="flex flex-wrap gap-2">
                  {popularInterests
                    .filter(interest => !interests.includes(interest))
                    .slice(0, 5)
                    .map((interest) => (
                      <Badge 
                        key={interest} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary/5"
                        onClick={() => addInterest(interest)}
                      >
                        + {interest}
                      </Badge>
                    ))}
                </div>
              </div>
              
              {/* Basic filters - Category */}
              <div>
                <Label className="mb-2 block">Project Category</Label>
                <Select 
                  value={selectedCategory} 
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.toLowerCase().replace(/\s+/g, '-')} value={category.toLowerCase().replace(/\s+/g, '-')}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Advanced filters - collapsible */}
              <Collapsible
                open={isAdvancedFiltersOpen}
                onOpenChange={setIsAdvancedFiltersOpen}
                className="border rounded-lg p-4"
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex w-full justify-between items-center p-2">
                    <div className="flex items-center">
                      <Filter className="w-4 h-4 mr-2" />
                      <span>Advanced Preferences</span>
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {isAdvancedFiltersOpen ? "Hide" : "Show"}
                    </div>
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-4 pt-4">
                  {/* Team size preference */}
                  <div>
                    <Label className="mb-2 block">
                      Preferred Team Size (max {teamSizePreference[0]} members)
                    </Label>
                    <Slider
                      defaultValue={[8]}
                      max={15}
                      min={1}
                      step={1}
                      onValueChange={(value) => setTeamSizePreference(value as [number])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <div>Small (1-5)</div>
                      <div>Medium (6-10)</div>
                      <div>Large (11-15)</div>
                    </div>
                  </div>
                  
                  {/* Project stage preference */}
                  <div>
                    <Label className="mb-2 block">Project Stage</Label>
                    <Select 
                      value={projectStagePreference} 
                      onValueChange={setProjectStagePreference}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select project stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Stage</SelectItem>
                        <SelectItem value="concept">Concept</SelectItem>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="testing">Testing</SelectItem>
                        <SelectItem value="launch">Launch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Time commitment */}
                  <div>
                    <Label className="mb-2 block">Time Commitment</Label>
                    <Select 
                      value={timeCommitment} 
                      onValueChange={setTimeCommitment}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select time commitment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (1-5 hrs/week)</SelectItem>
                        <SelectItem value="medium">Medium (5-10 hrs/week)</SelectItem>
                        <SelectItem value="high">High (10+ hrs/week)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Remote preference */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="remote-preference">Prefer Remote Collaboration</Label>
                    <Switch
                      id="remote-preference"
                      checked={preferRemote}
                      onCheckedChange={setPreferRemote}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              {/* Analysis button */}
              <Button 
                onClick={analyzeAndRecommend}
                className="w-full"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Analyzing Your Preferences...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze and Recommend Projects
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Recommendations */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Star className="text-amber-500 w-5 h-5 mr-2" />
            Recommended Projects
            {isAnalyzing && <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
          </h3>
          
          {recommendations.length === 0 && !isAnalyzing ? (
            <Card className="p-8 text-center">
              <div className="text-muted-foreground">
                No matching projects found. Try adjusting your filters.
              </div>
            </Card>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {recommendations.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <RecommendedProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

type RecommendedProjectCardProps = {
  project: Project;
};

function RecommendedProjectCard({ project }: RecommendedProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="mb-1">{project.title}</CardTitle>
            <CardDescription>{project.category}</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="px-2 py-1 bg-primary/10 text-primary rounded-md flex items-center text-sm font-medium">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {project.matchScore}% Match
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Compatibility score based on your skills and preferences</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {project.description}
        </p>
        
        <div className="mb-3">
          <div className="text-xs text-muted-foreground mb-1">Relevant Skills</div>
          <div className="flex flex-wrap gap-1">
            {project.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Team</span>
            <span>{project.members}/{project.maxMembers} members</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full">
            <div 
              className="h-full bg-emerald-500 rounded-full" 
              style={{ width: `${(project.members/project.maxMembers) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t mt-2 pt-2 flex justify-between">
        <div className="flex items-center text-sm">
          <Tag className="w-3 h-3 mr-1 text-muted-foreground" />
          <span className="text-muted-foreground">{project.stage}</span>
        </div>
        <Button size="sm" className="h-8">
          View Project
          <ArrowRight className="ml-1 w-3 h-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}