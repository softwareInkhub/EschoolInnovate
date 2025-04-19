import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  BookOpen, 
  Play,
  Clock,
  Star,
  Check,
  Search,
  Filter,
  ChevronDown,
  BarChart,
  BadgeCheck,
  Video,
  FileText,
  Link2,
  PanelLeft,
  Heart,
  Bookmark,
  Share2,
  Zap,
  Tag,
  Award,
  Globe,
  Flag,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Types
type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: Instructor;
  duration: number; // in minutes
  lessons: number;
  rating: number;
  ratingCount: number;
  enrolledCount: number;
  level: "beginner" | "intermediate" | "advanced";
  tags: string[];
  category: string;
  price: number | null; // null means free
  discountedPrice?: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  progress?: number; // 0-100 for enrolled courses
  isSaved?: boolean;
  lastAccessed?: Date;
};

type Instructor = {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  bio?: string;
  coursesCount?: number;
  studentsCount?: number;
  rating?: number;
};

type Lesson = {
  id: string;
  title: string;
  description?: string;
  duration: number; // in minutes
  type: "video" | "article" | "quiz" | "project";
  isCompleted?: boolean;
  progress?: number; // 0-100
  isLocked?: boolean;
};

type Module = {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  progress?: number; // 0-100
};

type School = {
  id: string;
  name: string;
  description: string;
  logo?: string;
  categories: string[];
  coursesCount: number;
  studentsCount: number;
  rating?: number;
  isFeatured?: boolean;
  isVerified?: boolean;
};

type EducationalContentProps = {
  variant?: "full" | "embed" | "mini";
  defaultTab?: string;
  schoolId?: string;
  categoryFilter?: string;
  userId?: string;
};

export default function EducationalContent({
  variant = "full",
  defaultTab = "explore",
  schoolId,
  categoryFilter,
  userId
}: EducationalContentProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  
  // Mock data for courses
  const courses: Course[] = [
    {
      id: "c1",
      title: "Fundamentals of Machine Learning",
      description: "Learn the core concepts of machine learning and how to build and train models with Python.",
      thumbnail: "",
      instructor: {
        id: "i1",
        name: "Dr. Alex Johnson",
        title: "AI Researcher at TechAcademy",
        avatar: ""
      },
      duration: 420, // 7 hours
      lessons: 24,
      rating: 4.8,
      ratingCount: 1245,
      enrolledCount: 15420,
      level: "beginner",
      tags: ["Machine Learning", "Python", "Data Science"],
      category: "AI & Data Science",
      price: 89.99,
      discountedPrice: 49.99,
      isPopular: true,
      isFeatured: true
    },
    {
      id: "c2",
      title: "React & Redux Mastery",
      description: "Comprehensive guide to building modern web applications with React and Redux.",
      thumbnail: "",
      instructor: {
        id: "i2",
        name: "Emma Chen",
        title: "Senior Frontend Developer",
        avatar: ""
      },
      duration: 720, // 12 hours
      lessons: 45,
      rating: 4.9,
      ratingCount: 2142,
      enrolledCount: 25680,
      level: "intermediate",
      tags: ["React", "Redux", "JavaScript", "Web Development"],
      category: "Web Development",
      price: 99.99,
      isPopular: true
    },
    {
      id: "c3",
      title: "Product Management Essentials",
      description: "Learn how to define, build and launch successful products from ideation to market.",
      thumbnail: "",
      instructor: {
        id: "i3",
        name: "Michael Taylor",
        title: "Product Leader at TechCorp",
        avatar: ""
      },
      duration: 540, // 9 hours
      lessons: 32,
      rating: 4.7,
      ratingCount: 876,
      enrolledCount: 8900,
      level: "beginner",
      tags: ["Product Management", "Business", "Strategy"],
      category: "Business",
      price: 79.99
    },
    {
      id: "c4",
      title: "UI/UX Design Principles",
      description: "Master the fundamentals of user interface and experience design for digital products.",
      thumbnail: "",
      instructor: {
        id: "i4",
        name: "Sarah Parker",
        title: "Lead UX Designer",
        avatar: ""
      },
      duration: 480, // 8 hours
      lessons: 28,
      rating: 4.8,
      ratingCount: 1050,
      enrolledCount: 12500,
      level: "beginner",
      tags: ["UI Design", "UX Design", "Figma", "Design Thinking"],
      category: "Design",
      price: 69.99,
      isNew: true
    },
    {
      id: "c5",
      title: "Blockchain Development",
      description: "Learn to build decentralized applications using blockchain technology.",
      thumbnail: "",
      instructor: {
        id: "i5",
        name: "David Wilson",
        title: "Blockchain Engineer",
        avatar: ""
      },
      duration: 660, // 11 hours
      lessons: 36,
      rating: 4.6,
      ratingCount: 520,
      enrolledCount: 4200,
      level: "advanced",
      tags: ["Blockchain", "Ethereum", "Smart Contracts", "Solidity"],
      category: "Blockchain",
      price: 129.99,
      discountedPrice: 79.99
    },
    {
      id: "c6",
      title: "Introduction to Data Science",
      description: "Comprehensive introduction to data analysis, visualization, and statistical methods.",
      thumbnail: "",
      instructor: {
        id: "i1",
        name: "Dr. Alex Johnson",
        title: "AI Researcher at TechAcademy",
        avatar: ""
      },
      duration: 360, // 6 hours
      lessons: 20,
      rating: 4.7,
      ratingCount: 780,
      enrolledCount: 9800,
      level: "beginner",
      tags: ["Data Science", "Python", "Statistics"],
      category: "AI & Data Science",
      price: null, // Free course
      isFeatured: true
    }
  ];
  
  // Add enrolled courses for the current user
  const enrolledCourses: Course[] = [
    {
      ...courses[0],
      progress: 65,
      lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) // 2 days ago
    },
    {
      ...courses[3],
      progress: 25,
      lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) // 5 days ago
    },
    {
      ...courses[5],
      progress: 100, // Completed
      lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) // 14 days ago
    }
  ];
  
  // Mock data for saved courses
  const savedCourses: Course[] = [
    {
      ...courses[1],
      isSaved: true
    },
    {
      ...courses[4],
      isSaved: true
    }
  ];
  
  // Mock data for course modules and lessons
  const courseModules: Module[] = [
    {
      id: "m1",
      title: "Introduction to Machine Learning",
      description: "Learn the fundamentals and key concepts of machine learning.",
      lessons: [
        {
          id: "l1",
          title: "What is Machine Learning?",
          duration: 12,
          type: "video",
          isCompleted: true
        },
        {
          id: "l2",
          title: "Types of Machine Learning",
          duration: 15,
          type: "video",
          isCompleted: true
        },
        {
          id: "l3",
          title: "Setting Up Your Environment",
          duration: 20,
          type: "article",
          isCompleted: true
        },
        {
          id: "l4",
          title: "Your First ML Model",
          duration: 25,
          type: "video",
          isCompleted: false,
          progress: 50
        }
      ],
      progress: 75
    },
    {
      id: "m2",
      title: "Supervised Learning",
      description: "Explore supervised learning algorithms and their applications.",
      lessons: [
        {
          id: "l5",
          title: "Linear Regression",
          duration: 18,
          type: "video",
          isCompleted: false,
          progress: 30
        },
        {
          id: "l6",
          title: "Classification Methods",
          duration: 22,
          type: "video",
          isLocked: true
        },
        {
          id: "l7",
          title: "Evaluating Model Performance",
          duration: 15,
          type: "quiz",
          isLocked: true
        },
        {
          id: "l8",
          title: "Supervised Learning Project",
          duration: 45,
          type: "project",
          isLocked: true
        }
      ],
      progress: 10
    },
    {
      id: "m3",
      title: "Unsupervised Learning",
      description: "Discover clustering and dimensionality reduction techniques.",
      lessons: [
        {
          id: "l9",
          title: "Introduction to Clustering",
          duration: 20,
          type: "video",
          isLocked: true
        },
        {
          id: "l10",
          title: "K-Means Algorithm",
          duration: 25,
          type: "video",
          isLocked: true
        },
        {
          id: "l11",
          title: "Principal Component Analysis",
          duration: 30,
          type: "video",
          isLocked: true
        },
        {
          id: "l12",
          title: "Unsupervised Learning Quiz",
          duration: 15,
          type: "quiz",
          isLocked: true
        }
      ],
      progress: 0
    }
  ];
  
  // Mock data for schools
  const schools: School[] = [
    {
      id: "s1",
      name: "TechAcademy",
      description: "Advanced courses in programming, AI, and machine learning",
      logo: "",
      categories: ["AI & Data Science", "Web Development", "Mobile Development"],
      coursesCount: 45,
      studentsCount: 25000,
      rating: 4.8,
      isFeatured: true,
      isVerified: true
    },
    {
      id: "s2",
      name: "Business Hub",
      description: "Comprehensive business, marketing, and entrepreneurship education",
      logo: "",
      categories: ["Business", "Marketing", "Entrepreneurship"],
      coursesCount: 32,
      studentsCount: 18000,
      rating: 4.7,
      isFeatured: true,
      isVerified: true
    },
    {
      id: "s3",
      name: "Design Master",
      description: "Leading platform for design education and resources",
      logo: "",
      categories: ["Design", "UI/UX", "Graphic Design"],
      coursesCount: 28,
      studentsCount: 15000,
      rating: 4.9,
      isVerified: true
    },
    {
      id: "s4",
      name: "Blockchain Academy",
      description: "Cutting-edge blockchain and cryptocurrency courses",
      logo: "",
      categories: ["Blockchain", "Cryptocurrency", "Smart Contracts"],
      coursesCount: 18,
      studentsCount: 8500,
      rating: 4.6,
      isNew: true
    }
  ];
  
  // Filter courses based on search query and filters
  const getFilteredCourses = () => {
    let filtered = [...courses];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.description.toLowerCase().includes(query) ||
        course.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(course => 
        course.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by level
    if (selectedLevel !== "all") {
      filtered = filtered.filter(course => 
        course.level === selectedLevel
      );
    }
    
    // Sort courses
    if (selectedSort === "popular") {
      filtered.sort((a, b) => b.enrolledCount - a.enrolledCount);
    } else if (selectedSort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === "newest") {
      // For demo purposes, we'll just randomly sort
      filtered.sort(() => Math.random() - 0.5);
    } else if (selectedSort === "price-low-high") {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (selectedSort === "price-high-low") {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    
    return filtered;
  };
  
  // Get filtered schools
  const getFilteredSchools = () => {
    if (schoolId) {
      return schools.filter(school => school.id === schoolId);
    }
    
    if (selectedCategory !== "all") {
      return schools.filter(school => 
        school.categories.some(category => 
          category.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }
    
    return schools;
  };
  
  // Format duration in minutes to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h` : ""} ${mins > 0 ? `${mins}m` : ""}`;
  };
  
  // Format price with discount if available
  const formatPrice = (price: number | null, discountedPrice?: number) => {
    if (price === null) return "Free";
    if (discountedPrice) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-primary font-medium">${discountedPrice.toFixed(2)}</span>
          <span className="text-muted-foreground line-through text-sm">${price.toFixed(2)}</span>
        </div>
      );
    }
    return `$${price.toFixed(2)}`;
  };
  
  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Enroll in a course
  const enrollInCourse = (courseId: string) => {
    setIsEnrolling(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsEnrolling(false);
      setShowCourseDetails(false);
      
      toast({
        title: "Enrolled Successfully!",
        description: "You have successfully enrolled in this course.",
      });
      
      // Update the active tab to show enrolled courses
      setActiveTab("my-courses");
    }, 1500);
  };
  
  // Save/bookmark a course
  const toggleSaveCourse = (courseId: string) => {
    toast({
      title: "Course Saved",
      description: "The course has been added to your bookmarks.",
    });
  };
  
  // Continue a course
  const continueCourse = (courseId: string) => {
    toast({
      title: "Resuming Course",
      description: "Taking you to where you left off.",
    });
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Get the array of courses based on active tab
  const getTabCourses = () => {
    switch (activeTab) {
      case "my-courses":
        return enrolledCourses;
      case "saved":
        return savedCourses;
      case "explore":
      default:
        return getFilteredCourses();
    }
  };
  
  return (
    <div className="w-full">
      {/* Main content container */}
      <div className={`space-y-6 ${variant === "mini" ? "max-w-2xl mx-auto" : ""}`}>
        {/* Header section */}
        {variant !== "mini" && (
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-2xl font-bold">Learning Hub</h2>
              {schoolId && (
                <Badge className="ml-2 bg-primary/10 text-primary hover:bg-primary/20 border-0">
                  {schools.find(school => school.id === schoolId)?.name}
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-6 max-w-3xl">
              Discover courses from top educational institutions and industry experts to enhance your skills and advance your career.
            </p>
          </div>
        )}
        
        {/* Tabs and search */}
        <div className="flex flex-col md:flex-row items-start gap-4">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className={`${variant === "mini" ? "w-full" : "flex-1"}`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <TabsList className="mb-4 md:mb-0">
                <TabsTrigger value="explore">
                  <Globe className="h-4 w-4 mr-2" />
                  Explore
                </TabsTrigger>
                <TabsTrigger value="my-courses">
                  <BookOpen className="h-4 w-4 mr-2" />
                  My Courses
                </TabsTrigger>
                <TabsTrigger value="saved">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Saved
                </TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className={showFilters ? "bg-primary/10 text-primary" : ""}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <span className="hidden md:inline-block">Sort by:</span>
                      <span className="font-medium">
                        {selectedSort === "popular" ? "Popular" : 
                         selectedSort === "rating" ? "Highest Rated" : 
                         selectedSort === "newest" ? "Newest" :
                         selectedSort === "price-low-high" ? "Price: Low to High" :
                         "Price: High to Low"}
                      </span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setSelectedSort("popular")}>
                      Popular
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedSort("rating")}>
                      Highest Rated
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedSort("newest")}>
                      Newest
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedSort("price-low-high")}>
                      Price: Low to High
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedSort("price-high-low")}>
                      Price: High to Low
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Filters row - visible when showFilters is true */}
            {showFilters && (
              <div className="flex flex-wrap gap-2 mb-6 p-4 border rounded-lg bg-muted/10">
                <div className="flex flex-col gap-1 min-w-[180px]">
                  <label className="text-sm font-medium">Category</label>
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="ai & data science">AI & Data Science</SelectItem>
                      <SelectItem value="web development">Web Development</SelectItem>
                      <SelectItem value="mobile development">Mobile Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-1 min-w-[180px]">
                  <label className="text-sm font-medium">Level</label>
                  <Select 
                    value={selectedLevel} 
                    onValueChange={setSelectedLevel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-1 min-w-[180px]">
                  <label className="text-sm font-medium">Price</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="discounted">On Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Tab content */}
            <TabsContent value="explore" className="pt-2">
              {/* Featured schools section - only shown in explore tab */}
              {!schoolId && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Star className="mr-2 h-5 w-5 text-primary" />
                      Featured Educational Partners
                    </h3>
                    <Button variant="link">View All Schools</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {getFilteredSchools().slice(0, 4).map((school) => (
                      <motion.div 
                        key={school.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Card className="h-full hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                                {school.logo ? (
                                  <img src={school.logo} alt={school.name} className="w-6 h-6" />
                                ) : (
                                  <GraduationCap className="w-6 h-6 text-primary" />
                                )}
                              </div>
                              {school.isVerified && (
                                <Badge variant="outline" className="text-xs bg-primary/5">
                                  <Check className="mr-1 h-3 w-3" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-lg mt-2">{school.name}</CardTitle>
                            <CardDescription className="line-clamp-2">{school.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex flex-wrap gap-1 mb-2">
                              {school.categories.slice(0, 2).map((category, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {category}
                                </Badge>
                              ))}
                              {school.categories.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{school.categories.length - 2}
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between text-xs text-muted-foreground">
                            <div>{school.coursesCount} courses</div>
                            <div>{formatNumber(school.studentsCount)} students</div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Courses section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    {schoolId ? (
                      `Courses by ${schools.find(school => school.id === schoolId)?.name}`
                    ) : (
                      selectedCategory !== "all" ? 
                      `${selectedCategory} Courses` : 
                      "Popular Courses"
                    )}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    {getFilteredCourses().length} courses
                  </div>
                </div>
                
                {getFilteredCourses().length === 0 ? (
                  <div className="text-center py-12 border rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No courses found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                        setSelectedLevel("all");
                        setSelectedSort("popular");
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getFilteredCourses().map((course) => (
                      <motion.div 
                        key={course.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <CourseCard 
                          course={course}
                          onClick={() => {
                            setSelectedCourse(course);
                            setShowCourseDetails(true);
                          }}
                          onEnroll={() => enrollInCourse(course.id)}
                          onSave={() => toggleSaveCourse(course.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="my-courses" className="pt-2">
              {enrolledCourses.length === 0 ? (
                <div className="text-center py-12 border rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No enrolled courses yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore our catalog to find courses that match your interests and career goals.
                  </p>
                  <Button onClick={() => setActiveTab("explore")}>
                    Browse Courses
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* In progress courses */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <Play className="mr-2 h-5 w-5 text-primary" />
                        In Progress
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      {enrolledCourses
                        .filter(course => course.progress && course.progress < 100)
                        .map((course) => (
                          <EnrolledCourseCard 
                            key={course.id}
                            course={course}
                            onContinue={() => continueCourse(course.id)}
                            onClick={() => {
                              setSelectedCourse(course);
                              setShowCourseDetails(true);
                            }}
                          />
                        ))}
                    </div>
                  </div>
                  
                  {/* Completed courses */}
                  {enrolledCourses.filter(course => course.progress === 100).length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center">
                          <Check className="mr-2 h-5 w-5 text-green-500" />
                          Completed
                        </h3>
                      </div>
                      
                      <div className="space-y-4">
                        {enrolledCourses
                          .filter(course => course.progress === 100)
                          .map((course) => (
                            <EnrolledCourseCard 
                              key={course.id}
                              course={course}
                              onContinue={() => {}}
                              onClick={() => {
                                setSelectedCourse(course);
                                setShowCourseDetails(true);
                              }}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved" className="pt-2">
              {savedCourses.length === 0 ? (
                <div className="text-center py-12 border rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                    <Bookmark className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No saved courses</h3>
                  <p className="text-muted-foreground mb-4">
                    Save courses you're interested in to come back to them later.
                  </p>
                  <Button onClick={() => setActiveTab("explore")}>
                    Browse Courses
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedCourses.map((course) => (
                    <motion.div 
                      key={course.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <CourseCard 
                        course={course}
                        onClick={() => {
                          setSelectedCourse(course);
                          setShowCourseDetails(true);
                        }}
                        onEnroll={() => enrollInCourse(course.id)}
                        onSave={() => toggleSaveCourse(course.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Course details dialog */}
      <Dialog open={showCourseDetails} onOpenChange={setShowCourseDetails}>
        {selectedCourse && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="overflow-y-auto">
              <DialogHeader className="mb-6">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl">{selectedCourse.title}</DialogTitle>
                    <DialogDescription className="mt-2">
                      {selectedCourse.description}
                    </DialogDescription>
                  </div>
                  
                  {selectedCourse.isNew && (
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                      New
                    </Badge>
                  )}
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left content */}
                <div className="col-span-2 space-y-6">
                  {/* Course thumbnail */}
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden border">
                    {selectedCourse.thumbnail ? (
                      <img 
                        src={selectedCourse.thumbnail} 
                        alt={selectedCourse.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <Video className="h-12 w-12 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Video preview</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Course overview */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Course Overview</h3>
                    <p className="text-muted-foreground mb-4">
                      {selectedCourse.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Duration</div>
                          <div className="font-medium">{formatDuration(selectedCourse.duration)}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Lessons</div>
                          <div className="font-medium">{selectedCourse.lessons} lessons</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <BarChart className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Level</div>
                          <div className="font-medium capitalize">{selectedCourse.level}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Category</div>
                          <div className="font-medium">{selectedCourse.category}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Course modules and lessons */}
                  {/* Only show if the user is enrolled or the course is free */}
                  {(enrolledCourses.some(c => c.id === selectedCourse.id) || selectedCourse.price === null) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Course Content</h3>
                      <Accordion type="single" collapsible className="border rounded-md">
                        {courseModules.map((module, index) => (
                          <AccordionItem key={module.id} value={module.id}>
                            <AccordionTrigger className="px-4 hover:no-underline">
                              <div className="flex-1 flex justify-between items-center">
                                <div>
                                  <span className="font-medium">{index + 1}. {module.title}</span>
                                  <div className="text-xs text-muted-foreground">
                                    {module.lessons.length} lessons &bull; {formatDuration(
                                      module.lessons.reduce((total, lesson) => total + lesson.duration, 0)
                                    )}
                                  </div>
                                </div>
                                
                                {enrolledCourses.some(c => c.id === selectedCourse.id) && (
                                  <Badge className="mr-4 bg-primary/10 text-primary hover:bg-primary/20 border-0">
                                    {module.progress}% complete
                                  </Badge>
                                )}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pt-2 pb-4">
                              <div className="space-y-3">
                                {module.lessons.map((lesson, lessonIndex) => (
                                  <div 
                                    key={lesson.id}
                                    className={`p-3 rounded-md flex items-center justify-between ${lesson.isCompleted ? 'bg-green-500/5' : 'bg-muted/30'} ${lesson.isLocked ? 'opacity-60' : ''}`}
                                  >
                                    <div className="flex items-center">
                                      <div className="mr-3 w-6 h-6 rounded-full bg-card flex items-center justify-center">
                                        {lesson.isCompleted ? (
                                          <Check className="h-3 w-3 text-green-500" />
                                        ) : lesson.isLocked ? (
                                          <Lock className="h-3 w-3 text-muted-foreground" />
                                        ) : (
                                          <span className="text-xs font-medium">{index + 1}.{lessonIndex + 1}</span>
                                        )}
                                      </div>
                                      <div>
                                        <div className="flex items-center">
                                          <span className="font-medium text-sm">{lesson.title}</span>
                                          {lesson.type === 'video' && (
                                            <Badge variant="outline" className="ml-2 text-xs">Video</Badge>
                                          )}
                                          {lesson.type === 'article' && (
                                            <Badge variant="outline" className="ml-2 text-xs">Article</Badge>
                                          )}
                                          {lesson.type === 'quiz' && (
                                            <Badge variant="outline" className="ml-2 text-xs">Quiz</Badge>
                                          )}
                                          {lesson.type === 'project' && (
                                            <Badge variant="outline" className="ml-2 text-xs">Project</Badge>
                                          )}
                                        </div>
                                        
                                        {lesson.progress !== undefined && lesson.progress > 0 && lesson.progress < 100 && (
                                          <div className="w-24 h-1 mt-1 bg-muted rounded-full overflow-hidden">
                                            <div 
                                              className="h-full bg-primary" 
                                              style={{ width: `${lesson.progress}%` }}
                                            ></div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    
                                    <div className="text-xs text-muted-foreground">
                                      {formatDuration(lesson.duration)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}
                </div>
                
                {/* Right sidebar */}
                <div className="space-y-6">
                  {/* Course price and enrollment */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">
                        {formatPrice(selectedCourse.price, selectedCourse.discountedPrice)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2 space-y-4">
                      {/* Only show enrollment button if user is not already enrolled */}
                      {!enrolledCourses.some(c => c.id === selectedCourse.id) ? (
                        <Button 
                          className="w-full"
                          onClick={() => enrollInCourse(selectedCourse.id)}
                          disabled={isEnrolling}
                        >
                          {isEnrolling ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                              Enrolling...
                            </>
                          ) : (
                            <>
                              Enroll Now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button 
                          className="w-full"
                          onClick={() => continueCourse(selectedCourse.id)}
                        >
                          Continue Learning
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => toggleSaveCourse(selectedCourse.id)}
                      >
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save for Later
                      </Button>
                    </CardContent>
                    <CardFooter className="pt-2 text-xs text-muted-foreground">
                      {selectedCourse.enrolledCount > 0 && (
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          <span>{formatNumber(selectedCourse.enrolledCount)} students enrolled</span>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                  
                  {/* Instructor info */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Instructor</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src={selectedCourse.instructor.avatar} />
                          <AvatarFallback>{selectedCourse.instructor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="font-medium">{selectedCourse.instructor.name}</div>
                          <div className="text-sm text-muted-foreground">{selectedCourse.instructor.title}</div>
                        </div>
                      </div>
                      
                      {selectedCourse.instructor.bio && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {selectedCourse.instructor.bio}
                        </p>
                      )}
                      
                      <div className="flex justify-between text-sm">
                        {selectedCourse.instructor.coursesCount && (
                          <div>
                            <div className="font-medium">{selectedCourse.instructor.coursesCount}</div>
                            <div className="text-xs text-muted-foreground">Courses</div>
                          </div>
                        )}
                        
                        {selectedCourse.instructor.studentsCount && (
                          <div>
                            <div className="font-medium">{formatNumber(selectedCourse.instructor.studentsCount || 0)}</div>
                            <div className="text-xs text-muted-foreground">Students</div>
                          </div>
                        )}
                        
                        {selectedCourse.instructor.rating && (
                          <div>
                            <div className="font-medium flex items-center">
                              {selectedCourse.instructor.rating}
                              <Star className="h-3 w-3 text-amber-500 ml-1" />
                            </div>
                            <div className="text-xs text-muted-foreground">Rating</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Course tags */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Related Topics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourse.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => toggleSaveCourse(selectedCourse.id)}>
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save course</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share course</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* Enrollment actions */}
              {!enrolledCourses.some(c => c.id === selectedCourse.id) ? (
                <Button 
                  onClick={() => enrollInCourse(selectedCourse.id)}
                  disabled={isEnrolling}
                  className="min-w-32"
                >
                  {isEnrolling ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Enrolling...
                    </>
                  ) : (
                    <>
                      Enroll Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  onClick={() => continueCourse(selectedCourse.id)}
                  className="min-w-32"
                >
                  Continue Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

// Course Card Component
type CourseCardProps = {
  course: Course;
  onClick: () => void;
  onEnroll: () => void;
  onSave: () => void;
};

function CourseCard({ course, onClick, onEnroll, onSave }: CourseCardProps) {
  // Format duration from minutes to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h` : ""} ${mins > 0 ? `${mins}m` : ""}`;
  };
  
  // Format price with discount if available
  const formatPrice = (price: number | null, discountedPrice?: number) => {
    if (price === null) return "Free";
    if (discountedPrice) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-primary font-medium">${discountedPrice.toFixed(2)}</span>
          <span className="text-muted-foreground line-through text-sm">${price.toFixed(2)}</span>
        </div>
      );
    }
    return `$${price.toFixed(2)}`;
  };
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={onClick}>
      <div className="aspect-video bg-muted relative overflow-hidden border-b">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-xs text-muted-foreground">Course preview</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {course.isNew && (
            <Badge className="bg-primary/90 text-white border-0 text-xs">
              New
            </Badge>
          )}
          
          {course.isFeatured && (
            <Badge className="bg-amber-500/90 text-white border-0 text-xs">
              Featured
            </Badge>
          )}
        </div>
        
        {/* Save button */}
        <Button
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70"
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
      
      <CardHeader className="p-4 pb-2 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="line-clamp-2 text-lg">{course.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Avatar className="h-5 w-5 mr-1">
                <AvatarImage src={course.instructor.avatar} />
                <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-xs">{course.instructor.name}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 py-0">
        <div className="flex items-center text-sm text-muted-foreground mb-2 gap-2">
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-1" />
            <span className="font-medium">{course.rating}</span>
            <span className="text-xs ml-1">({course.ratingCount})</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{formatDuration(course.duration)}</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-muted-foreground"></div>
          <div className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            <span>{course.lessons} lessons</span>
          </div>
        </div>
        
        <div className="mb-2">
          <Badge variant="outline" className="text-xs capitalize">
            {course.level}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex items-center justify-between mt-auto">
        <div>
          {formatPrice(course.price, course.discountedPrice)}
        </div>
        
        <Button 
          size="sm"
          variant="ghost"
          className="text-primary"
          onClick={(e) => {
            e.stopPropagation();
            onEnroll();
          }}
        >
          {course.price === null ? "Enroll Free" : "Enroll"}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Enrolled Course Card Component
type EnrolledCourseCardProps = {
  course: Course;
  onClick: () => void;
  onContinue: () => void;
};

function EnrolledCourseCard({ course, onClick, onContinue }: EnrolledCourseCardProps) {
  // Format duration from minutes to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h` : ""} ${mins > 0 ? `${mins}m` : ""}`;
  };
  
  // Format date to readable string
  const formatDate = (date?: Date) => {
    if (!date) return "Never accessed";
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return "Today";
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };
  
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-all" onClick={onClick}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-muted aspect-video md:aspect-square relative overflow-hidden">
          {course.thumbnail ? (
            <img 
              src={course.thumbnail} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-xs text-muted-foreground">Course preview</span>
            </div>
          )}
          
          {/* Completion badge */}
          {course.progress === 100 && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-green-500/90 text-white border-0">
                Completed
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4 pb-0 md:col-span-3">
          <div className="flex flex-col h-full">
            <div>
              <h3 className="font-bold text-lg mb-1">{course.title}</h3>
              <div className="text-sm text-muted-foreground mb-2">
                <span>Created by {course.instructor.name}</span>
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                <div className="flex items-center text-sm text-muted-foreground gap-3">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center">
                    <Flag className="h-3 w-3 mr-1" />
                    <span>Last accessed {formatDate(course.lastAccessed)}</span>
                  </div>
                </div>
                
                {course.progress !== 100 && (
                  <Button 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onContinue();
                    }}
                  >
                    Continue Learning
                  </Button>
                )}
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress || 0} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}