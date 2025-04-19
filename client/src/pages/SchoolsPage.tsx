import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Code, 
  Briefcase, 
  Lightbulb, 
  Shield,
  Star,
  ArrowRight,
  ChevronRight,
  Users,
  BookOpen,
  GraduationCap
} from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
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

export default function SchoolsPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  // Redirect to auth if not logged in
  if (!user) {
    navigate("/auth");
    return null;
  }

  // Featured schools data
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
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      categories: ["UX", "UI", "Design Thinking", "Product Design"],
      featured: false
    },
    {
      id: 4,
      name: "Innovation Lab",
      description: "Product development and innovation frameworks",
      courses: 12,
      students: 5800,
      rating: 4.5,
      icon: <Shield className="h-6 w-6 text-primary" />,
      categories: ["Innovation", "Product Development", "Prototyping"],
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
    },
    {
      id: 6,
      name: "Leadership Institute",
      description: "Leadership skills and management techniques",
      courses: 14,
      students: 6100,
      rating: 4.4,
      icon: <Users className="h-6 w-6 text-primary" />,
      categories: ["Leadership", "Management", "Team Building"],
      featured: false
    },
    {
      id: 7,
      name: "Mobile Development Center",
      description: "iOS, Android, and cross-platform mobile development",
      courses: 19,
      students: 8200,
      rating: 4.7,
      icon: <Code className="h-6 w-6 text-primary" />,
      categories: ["iOS", "Android", "React Native", "Flutter"],
      featured: true
    },
    {
      id: 8,
      name: "Finance & Economics",
      description: "Financial analysis, economics, and investment strategies",
      courses: 16,
      students: 5900,
      rating: 4.5,
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      categories: ["Finance", "Economics", "Investing", "Trading"],
      featured: false
    }
  ];

  // Available categories for filtering
  const categories = [
    "All Categories", "Programming", "AI", "Business", "Design", 
    "Data Science", "Leadership", "Mobile", "Finance"
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Header section */}
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
                Educational Partners
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Learn from World-Class <span className="text-primary">Educational Partners</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Access high-quality courses and resources from leading institutions to enhance your skills and advance your career.
            </motion.p>
          </motion.div>
          
          {/* Filter controls */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {categories.map((category, index) => (
              <Button 
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Schools listing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Featured schools */}
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Featured Schools</h2>
              <Button variant="outline" size="sm" className="gap-1">
                <span>View all</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {featuredSchools.filter(school => school.featured).map((school) => (
                <motion.div 
                  key={school.id}
                  variants={fadeIn}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/30 group"
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
                        <ChevronRight className="h-4 w-4 text-primary" />
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
          
          {/* All schools */}
          <div>
            <h2 className="text-2xl font-bold mb-8">All Schools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSchools.map((school) => (
                <div 
                  key={school.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/30 flex items-center p-4 gap-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {school.icon}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{school.name}</h3>
                      <div className="flex items-center text-xs">
                        <Star className="h-3 w-3 text-amber-500 mr-1" />
                        <span>{school.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{school.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary">{school.courses} Courses</span>
                      <Button size="sm" variant="ghost" className="h-7 px-2">
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}