import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Star, 
  Trophy, 
  Target, 
  Calendar, 
  Flag, 
  Users, 
  Zap, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Sparkles,
  BarChart3,
  Eye
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  progress: number;
  total: number;
  category: "project" | "collaboration" | "learning" | "special";
  unlocked: boolean;
  unlockedAt?: Date;
  level: "bronze" | "silver" | "gold" | "platinum"; // Difficulty/prestige level
  rarity: number; // 0-100% rarity score (how many users have it)
};

type Milestone = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "in_progress" | "completed" | "overdue";
  progress: number;
  achievementId?: string; // Associated achievement if any
};

type TeamMember = {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  level: number;
  achievements: number;
  points: number;
};

type ProjectStatus = {
  totalMilestones: number;
  completedMilestones: number;
  upcomingMilestones: number;
  overdueMillestones: number;
  progress: number;
  daysActive: number;
  teamSize: number;
};

type AchievementSystemProps = {
  projectId: string | number;
  userId?: string | number;
  isProjectOwner?: boolean;
};

export default function AchievementSystem({ 
  projectId, 
  userId, 
  isProjectOwner = false 
}: AchievementSystemProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("milestones");
  const [showNewAchievementDialog, setShowNewAchievementDialog] = useState(false);
  const [achievementToShow, setAchievementToShow] = useState<Achievement | null>(null);
  const [showAchievementDetails, setShowAchievementDetails] = useState(false);
  
  // Mock data for the project status
  const projectStatus: ProjectStatus = {
    totalMilestones: 12,
    completedMilestones: 5,
    upcomingMilestones: 6,
    overdueMillestones: 1,
    progress: 42,
    daysActive: 28,
    teamSize: 8
  };
  
  // Mock data for milestones
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "m1",
      projectId: projectId.toString(),
      title: "Project Plan and Requirements",
      description: "Complete initial project plan and gather requirements from stakeholders",
      dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
      status: "completed",
      progress: 100,
      achievementId: "a1"
    },
    {
      id: "m2",
      projectId: projectId.toString(),
      title: "Design Phase",
      description: "Complete wireframes and design mockups for core features",
      dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      status: "completed",
      progress: 100,
      achievementId: "a2"
    },
    {
      id: "m3",
      projectId: projectId.toString(),
      title: "Backend API Development",
      description: "Develop core API endpoints and database schema",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
      status: "in_progress",
      progress: 75
    },
    {
      id: "m4",
      projectId: projectId.toString(),
      title: "Frontend Implementation",
      description: "Implement UI components and integrate with API",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8), // 8 days from now
      status: "in_progress",
      progress: 40
    },
    {
      id: "m5",
      projectId: projectId.toString(),
      title: "User Testing",
      description: "Conduct user testing and gather feedback",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days from now
      status: "pending",
      progress: 0
    },
    {
      id: "m6",
      projectId: projectId.toString(),
      title: "Initial Prototype Delivery",
      description: "Deliver working prototype to client",
      dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      status: "overdue",
      progress: 80
    }
  ]);
  
  // Mock data for achievements
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "a1",
      name: "Foundation Builder",
      description: "Successfully completed the project planning phase",
      icon: "Flag",
      points: 50,
      progress: 1,
      total: 1,
      category: "project",
      unlocked: true,
      unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      level: "bronze",
      rarity: 75
    },
    {
      id: "a2",
      name: "Design Virtuoso",
      description: "Completed the design phase with exceptional quality",
      icon: "Star",
      points: 75,
      progress: 1,
      total: 1,
      category: "project",
      unlocked: true,
      unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      level: "silver",
      rarity: 45
    },
    {
      id: "a3",
      name: "Code Warrior",
      description: "Complete backend development milestone ahead of schedule",
      icon: "Zap",
      points: 100,
      progress: 75,
      total: 100,
      category: "project",
      unlocked: false,
      level: "gold",
      rarity: 25
    },
    {
      id: "a4",
      name: "Team Player",
      description: "Collaborate with at least 5 team members on the project",
      icon: "Users",
      points: 50,
      progress: 4,
      total: 5,
      category: "collaboration",
      unlocked: false,
      level: "bronze",
      rarity: 60
    },
    {
      id: "a5",
      name: "Perfect Streak",
      description: "Complete 5 milestones without missing any deadlines",
      icon: "Calendar",
      points: 150,
      progress: 2,
      total: 5,
      category: "project",
      unlocked: false,
      level: "gold",
      rarity: 15
    },
    {
      id: "a6",
      name: "Project Champion",
      description: "Successfully complete all project milestones",
      icon: "Trophy",
      points: 250,
      progress: 2,
      total: 6,
      category: "project",
      unlocked: false,
      level: "platinum",
      rarity: 5
    }
  ]);
  
  // Mock team members data
  const teamMembers: TeamMember[] = [
    {
      id: "u1",
      name: "Alex Johnson",
      avatar: "",
      role: "Project Lead",
      level: 12,
      achievements: 24,
      points: 1250
    },
    {
      id: "u2",
      name: "Emma Chen",
      avatar: "",
      role: "Backend Developer",
      level: 8,
      achievements: 15,
      points: 820
    },
    {
      id: "u3",
      name: "Michael Taylor",
      avatar: "",
      role: "Frontend Developer",
      level: 7,
      achievements: 12,
      points: 680
    },
    {
      id: "u4",
      name: "Sarah Parker",
      avatar: "",
      role: "UX Designer",
      level: 9,
      achievements: 18,
      points: 950
    }
  ];
  
  // Mock function to complete a milestone
  const completeMilestone = (id: string) => {
    setMilestones(prev => 
      prev.map(milestone => 
        milestone.id === id 
          ? { 
              ...milestone, 
              status: "completed" as const, 
              progress: 100 
            } 
          : milestone
      )
    );
    
    // Check if milestone has an associated achievement
    const milestone = milestones.find(m => m.id === id);
    if (milestone?.achievementId) {
      unlockAchievement(milestone.achievementId);
    }
    
    // Check if completing this milestone triggers any other achievements
    checkForNewAchievements();
    
    toast({
      title: "Milestone completed!",
      description: "Great job! You've made progress on your project.",
    });
  };
  
  // Mock function to unlock an achievement
  const unlockAchievement = (id: string) => {
    const achievement = achievements.find(a => a.id === id);
    if (!achievement || achievement.unlocked) return;
    
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === id 
          ? { 
              ...achievement, 
              unlocked: true,
              progress: achievement.total,
              unlockedAt: new Date()
            } 
          : achievement
      )
    );
    
    // Show achievement unlocked notification/dialog
    setAchievementToShow(achievements.find(a => a.id === id) || null);
    setShowNewAchievementDialog(true);
  };
  
  // Check for any new achievements that should be unlocked
  const checkForNewAchievements = () => {
    // Count completed milestones
    const completedCount = milestones.filter(m => m.status === "completed").length;
    
    // Perfect streak achievement
    const perfectStreak = achievements.find(a => a.id === "a5");
    if (perfectStreak && !perfectStreak.unlocked) {
      const noOverdue = milestones.filter(m => m.status === "overdue").length === 0;
      if (noOverdue && completedCount > perfectStreak.progress) {
        setAchievements(prev => 
          prev.map(a => 
            a.id === "a5" 
              ? { ...a, progress: completedCount } 
              : a
          )
        );
        
        if (completedCount >= perfectStreak.total) {
          unlockAchievement("a5");
        }
      }
    }
    
    // Project Champion achievement
    const projectChampion = achievements.find(a => a.id === "a6");
    if (projectChampion && !projectChampion.unlocked) {
      if (completedCount > projectChampion.progress) {
        setAchievements(prev => 
          prev.map(a => 
            a.id === "a6" 
              ? { ...a, progress: completedCount } 
              : a
          )
        );
        
        if (completedCount >= projectChampion.total) {
          unlockAchievement("a6");
        }
      }
    }
  };
  
  // Get achievement icon component
  const getAchievementIcon = (iconName: string, className: string = "h-5 w-5") => {
    switch (iconName) {
      case "Flag":
        return <Flag className={className} />;
      case "Star":
        return <Star className={className} />;
      case "Trophy":
        return <Trophy className={className} />;
      case "Target":
        return <Target className={className} />;
      case "Calendar":
        return <Calendar className={className} />;
      case "Users":
        return <Users className={className} />;
      case "Zap":
        return <Zap className={className} />;
      default:
        return <Award className={className} />;
    }
  };
  
  // Get color for achievement level
  const getAchievementLevelColor = (level: string) => {
    switch (level) {
      case "bronze":
        return "text-amber-600";
      case "silver":
        return "text-slate-400";
      case "gold":
        return "text-amber-400";
      case "platinum":
        return "text-cyan-300";
      default:
        return "text-muted-foreground";
    }
  };
  
  // Get background color for achievement level
  const getAchievementLevelBg = (level: string) => {
    switch (level) {
      case "bronze":
        return "bg-amber-600/10";
      case "silver":
        return "bg-slate-400/10";
      case "gold":
        return "bg-amber-400/10";
      case "platinum":
        return "bg-cyan-300/10";
      default:
        return "bg-muted";
    }
  };
  
  // Get milestone status color
  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "in_progress":
        return "text-blue-500";
      case "pending":
        return "text-amber-500";
      case "overdue":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };
  
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
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };
  
  // Format date to readable string
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return "Today";
    } else if (days === 1) {
      return "Yesterday";
    } else if (days > 1 && days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };
  
  // Format due date for milestones
  const formatDueDate = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) {
      return `Overdue by ${Math.abs(days)} day${Math.abs(days) !== 1 ? "s" : ""}`;
    } else if (days === 0) {
      return "Due today";
    } else if (days === 1) {
      return "Due tomorrow";
    } else if (days < 7) {
      return `Due in ${days} days`;
    } else {
      return `Due ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    }
  };
  
  return (
    <div className="w-full space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Target className="mr-2 h-5 w-5 text-primary" />
              Project Progress
            </CardTitle>
            <CardDescription>
              Track milestones and overall completion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Completion</span>
                  <span className="font-medium">{projectStatus.progress}%</span>
                </div>
                <Progress value={projectStatus.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{projectStatus.completedMilestones}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{projectStatus.upcomingMilestones}</div>
                  <div className="text-xs text-muted-foreground">Upcoming</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Award className="mr-2 h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
            <CardDescription>
              Your team's accomplishments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Unlocked</span>
                  <span className="font-medium">
                    {achievements.filter(a => a.unlocked).length}/{achievements.length}
                  </span>
                </div>
                <Progress 
                  value={achievements.filter(a => a.unlocked).length / achievements.length * 100} 
                  className="h-2" 
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-muted/50 rounded-lg p-2 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className={`w-6 h-6 rounded-full ${getAchievementLevelBg("bronze")} flex items-center justify-center`}>
                      <Award className={`h-3 w-3 ${getAchievementLevelColor("bronze")}`} />
                    </div>
                  </div>
                  <div className="text-xs font-medium">
                    {achievements.filter(a => a.level === "bronze" && a.unlocked).length}/
                    {achievements.filter(a => a.level === "bronze").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Bronze</div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-2 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className={`w-6 h-6 rounded-full ${getAchievementLevelBg("silver")} flex items-center justify-center`}>
                      <Award className={`h-3 w-3 ${getAchievementLevelColor("silver")}`} />
                    </div>
                  </div>
                  <div className="text-xs font-medium">
                    {achievements.filter(a => a.level === "silver" && a.unlocked).length}/
                    {achievements.filter(a => a.level === "silver").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Silver</div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-2 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className={`w-6 h-6 rounded-full ${getAchievementLevelBg("gold")} flex items-center justify-center`}>
                      <Award className={`h-3 w-3 ${getAchievementLevelColor("gold")}`} />
                    </div>
                  </div>
                  <div className="text-xs font-medium">
                    {achievements.filter(a => a.level === "gold" && a.unlocked).length}/
                    {achievements.filter(a => a.level === "gold").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Gold</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main tabs section */}
      <Card>
        <CardHeader className="pb-0">
          <Tabs 
            defaultValue="milestones" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-4">
              <TabsTrigger value="milestones" className="text-sm">
                <Flag className="h-4 w-4 mr-2" />
                Milestones
              </TabsTrigger>
              <TabsTrigger value="achievements" className="text-sm">
                <Trophy className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="text-sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Team Leaderboard
              </TabsTrigger>
            </TabsList>
            
            {/* Milestones tab */}
            <TabsContent value="milestones" className="mt-0">
              <CardContent className="p-4">
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {milestones.map((milestone) => (
                    <motion.div 
                      key={milestone.id}
                      variants={itemVariants}
                      className={`border p-4 rounded-lg ${milestone.status === "overdue" ? "border-red-500/30 bg-red-500/5" : "border-border"} ${milestone.status === "completed" ? "bg-green-500/5" : ""}`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium flex items-center">
                                {milestone.title}
                                {milestone.achievementId && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="ml-2 text-primary">
                                          <Award className="h-4 w-4" />
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Completing this milestone will unlock an achievement</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
                            </div>
                            <Badge className={`
                              ${milestone.status === "completed" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : ""}
                              ${milestone.status === "in_progress" ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" : ""}
                              ${milestone.status === "pending" ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" : ""}
                              ${milestone.status === "overdue" ? "bg-red-500/10 text-red-500 hover:bg-red-500/20" : ""}
                              border-0
                            `}>
                              {milestone.status === "in_progress" ? "In Progress" : 
                               milestone.status === "completed" ? "Completed" :
                               milestone.status === "overdue" ? "Overdue" : "Pending"}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-xs">
                              <span className={getMilestoneStatusColor(milestone.status)}>
                                {formatDueDate(milestone.dueDate)}
                              </span>
                              <span>{milestone.progress}% complete</span>
                            </div>
                            <Progress value={milestone.progress} className="h-1.5" />
                          </div>
                        </div>
                        
                        {isProjectOwner && milestone.status !== "completed" && (
                          <Button 
                            size="sm" 
                            variant={milestone.status === "overdue" ? "destructive" : "default"}
                            className="whitespace-nowrap"
                            onClick={() => completeMilestone(milestone.id)}
                          >
                            Mark as Complete
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </TabsContent>
            
            {/* Achievements tab */}
            <TabsContent value="achievements" className="mt-0">
              <CardContent className="p-4">
                {achievements.length === 0 ? (
                  <div className="text-center py-8">
                    <Trophy className="h-12 w-12 text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No Achievements Yet</h3>
                    <p className="text-muted-foreground">
                      Complete project milestones to unlock achievements and earn points.
                    </p>
                  </div>
                ) : (
                  <div>
                    {/* Achievement categories */}
                    <div className="mb-6 space-y-6">
                      {/* Progress section */}
                      <div>
                        <h3 className="text-lg font-medium mb-3 flex items-center">
                          <Target className="h-5 w-5 mr-2 text-primary" />
                          In Progress
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {achievements
                            .filter(achievement => !achievement.unlocked && achievement.progress > 0)
                            .map(achievement => (
                              <motion.div 
                                key={achievement.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`border rounded-lg p-4 ${getAchievementLevelBg(achievement.level)} border-${achievement.level}`}
                                onClick={() => {
                                  setAchievementToShow(achievement);
                                  setShowAchievementDetails(true);
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`w-10 h-10 rounded-full bg-card flex items-center justify-center flex-shrink-0`}>
                                    {getAchievementIcon(achievement.icon, `h-5 w-5 ${getAchievementLevelColor(achievement.level)}`)}
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <h4 className="font-medium text-sm mb-1">{achievement.name}</h4>
                                      <Badge variant="outline" className={`text-xs font-normal ${getAchievementLevelColor(achievement.level)}`}>
                                        {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                                      </Badge>
                                    </div>
                                    
                                    <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                                    
                                    <div className="space-y-1">
                                      <div className="flex justify-between text-xs">
                                        <span>Progress</span>
                                        <span>{achievement.progress}/{achievement.total}</span>
                                      </div>
                                      <Progress value={(achievement.progress / achievement.total) * 100} className="h-1.5" />
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                            
                          {achievements.filter(achievement => !achievement.unlocked && achievement.progress > 0).length === 0 && (
                            <div className="col-span-full text-center py-4 border rounded-lg bg-muted/30 text-muted-foreground text-sm">
                              No achievements in progress
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Unlocked section */}
                      <div>
                        <h3 className="text-lg font-medium mb-3 flex items-center">
                          <Sparkles className="h-5 w-5 mr-2 text-amber-400" />
                          Unlocked Achievements
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {achievements
                            .filter(achievement => achievement.unlocked)
                            .map(achievement => (
                              <motion.div 
                                key={achievement.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`border rounded-lg p-4 ${getAchievementLevelBg(achievement.level)} border-${achievement.level}`}
                                onClick={() => {
                                  setAchievementToShow(achievement);
                                  setShowAchievementDetails(true);
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`w-10 h-10 rounded-full bg-card flex items-center justify-center flex-shrink-0`}>
                                    {getAchievementIcon(achievement.icon, `h-5 w-5 ${getAchievementLevelColor(achievement.level)}`)}
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <h4 className="font-medium text-sm mb-1">{achievement.name}</h4>
                                      <Badge variant="outline" className={`text-xs font-normal ${getAchievementLevelColor(achievement.level)}`}>
                                        {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                                      </Badge>
                                    </div>
                                    
                                    <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                                    
                                    <div className="flex items-center justify-between">
                                      <div className="text-xs text-primary">
                                        +{achievement.points} points
                                      </div>
                                      {achievement.unlockedAt && (
                                        <div className="text-xs text-muted-foreground">
                                          Unlocked {formatDate(achievement.unlockedAt)}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                            
                          {achievements.filter(achievement => achievement.unlocked).length === 0 && (
                            <div className="col-span-full text-center py-4 border rounded-lg bg-muted/30 text-muted-foreground text-sm">
                              No achievements unlocked yet
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Locked section */}
                      <div>
                        <h3 className="text-lg font-medium mb-3 flex items-center">
                          <Lock className="h-5 w-5 mr-2 text-muted-foreground" />
                          Locked Achievements
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {achievements
                            .filter(achievement => !achievement.unlocked && achievement.progress === 0)
                            .map(achievement => (
                              <motion.div 
                                key={achievement.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="border rounded-lg p-4 bg-muted/30"
                                onClick={() => {
                                  setAchievementToShow(achievement);
                                  setShowAchievementDetails(true);
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center opacity-50 flex-shrink-0">
                                    {getAchievementIcon(achievement.icon, "h-5 w-5 text-muted-foreground")}
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <h4 className="font-medium text-sm mb-1">{achievement.name}</h4>
                                      <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                                        {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)}
                                      </Badge>
                                    </div>
                                    
                                    <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                                    
                                    <div className="text-xs text-muted-foreground/70">
                                      +{achievement.points} points
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                            
                          {achievements.filter(achievement => !achievement.unlocked && achievement.progress === 0).length === 0 && (
                            <div className="col-span-full text-center py-4 border rounded-lg bg-muted/30 text-muted-foreground text-sm">
                              All achievements are either unlocked or in progress
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </TabsContent>
            
            {/* Leaderboard tab */}
            <TabsContent value="leaderboard" className="mt-0">
              <CardContent className="p-4">
                <div className="space-y-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Team Rankings</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent align="end">
                          <p className="max-w-xs text-sm">
                            Points are earned by completing milestones and unlocking achievements.
                            Your level increases as you earn more points.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="space-y-3">
                    {teamMembers
                      .sort((a, b) => b.points - a.points)
                      .map((member, index) => (
                        <div 
                          key={member.id}
                          className={`border rounded-lg p-4 flex items-center gap-3 ${index === 0 ? "bg-amber-400/5 border-amber-400/30" : ""}`}
                        >
                          <div className="w-8 flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center">
                              <div className="font-medium">{member.name}</div>
                              {index === 0 && (
                                <Badge className="ml-2 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 border-0">
                                  Top Contributor
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">{member.role}</div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <div className="font-medium text-primary">{member.points} pts</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Trophy className="w-3 h-3 mr-1" />
                              <span>{member.achievements} achievements</span>
                            </div>
                          </div>
                          
                          <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0">
                            <div className="text-lg font-bold">
                              {member.level}
                            </div>
                            <div className="text-xs ml-0.5 -mt-1">LVL</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
      
      {/* New Achievement Dialog */}
      <Dialog open={showNewAchievementDialog} onOpenChange={setShowNewAchievementDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-xl">
              <Sparkles className="mr-2 h-5 w-5 text-amber-400" />
              Achievement Unlocked!
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center p-4">
            {achievementToShow && (
              <>
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ 
                    scale: [0.5, 1.2, 1],
                    opacity: 1
                  }}
                  transition={{ duration: 0.8 }}
                  className={`w-20 h-20 rounded-full ${getAchievementLevelBg(achievementToShow.level)} flex items-center justify-center mb-4`}
                >
                  {getAchievementIcon(achievementToShow.icon, `h-10 w-10 ${getAchievementLevelColor(achievementToShow.level)}`)}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <h3 className="text-xl font-bold mb-2">{achievementToShow.name}</h3>
                  <p className="text-muted-foreground mb-4">{achievementToShow.description}</p>
                  
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <Badge className={`${getAchievementLevelBg(achievementToShow.level)} ${getAchievementLevelColor(achievementToShow.level)} border-0`}>
                      {achievementToShow.level.charAt(0).toUpperCase() + achievementToShow.level.slice(1)} Tier
                    </Badge>
                    <Badge className="bg-primary/10 text-primary border-0">
                      +{achievementToShow.points} Points
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-4">
                    Only {achievementToShow.rarity}% of users have earned this achievement
                  </div>
                </motion.div>
              </>
            )}
          </div>
          
          <DialogFooter className="flex justify-center">
            <Button
              onClick={() => setShowNewAchievementDialog(false)}
              className="w-full"
            >
              <Eye className="mr-2 h-4 w-4" />
              View All Achievements
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Achievement Details Dialog */}
      <Dialog open={showAchievementDetails} onOpenChange={setShowAchievementDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-primary" />
              Achievement Details
            </DialogTitle>
          </DialogHeader>
          
          {achievementToShow && (
            <div className="py-2">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-full ${getAchievementLevelBg(achievementToShow.level)} flex items-center justify-center flex-shrink-0 ${!achievementToShow.unlocked ? "opacity-50" : ""}`}>
                  {getAchievementIcon(achievementToShow.icon, `h-7 w-7 ${achievementToShow.unlocked ? getAchievementLevelColor(achievementToShow.level) : "text-muted-foreground"}`)}
                </div>
                
                <div>
                  <h3 className="text-lg font-bold">{achievementToShow.name}</h3>
                  <p className="text-muted-foreground">{achievementToShow.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className={`${getAchievementLevelBg(achievementToShow.level)} ${getAchievementLevelColor(achievementToShow.level)} border-0`}>
                      {achievementToShow.level.charAt(0).toUpperCase() + achievementToShow.level.slice(1)}
                    </Badge>
                    <Badge variant="outline">
                      {achievementToShow.category.charAt(0).toUpperCase() + achievementToShow.category.slice(1)}
                    </Badge>
                    <Badge className="bg-primary/10 text-primary border-0">
                      {achievementToShow.points} Points
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>
                      {achievementToShow.progress}/{achievementToShow.total} 
                      {achievementToShow.unlocked && " (Completed)"}
                    </span>
                  </div>
                  <Progress 
                    value={(achievementToShow.progress / achievementToShow.total) * 100} 
                    className="h-2" 
                  />
                </div>
                
                <div className="bg-muted/30 p-3 rounded-lg">
                  <div className="text-sm font-medium mb-1">Rarity</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${achievementToShow.rarity}%` }}
                      />
                    </div>
                    <div className="text-sm">{achievementToShow.rarity}%</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {achievementToShow.rarity < 10 ? "Very rare! Only a few users have unlocked this." : 
                     achievementToShow.rarity < 30 ? "Uncommon. You're among the dedicated few." :
                     achievementToShow.rarity < 60 ? "Moderately common achievement." :
                     "Common achievement that most active users earn."}
                  </div>
                </div>
                
                {achievementToShow.unlocked && achievementToShow.unlockedAt && (
                  <div className="text-sm text-muted-foreground">
                    Unlocked on {achievementToShow.unlockedAt.toLocaleDateString("en-US", { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              onClick={() => setShowAchievementDetails(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}