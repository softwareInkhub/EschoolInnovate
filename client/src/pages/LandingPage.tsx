import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import CountUp from "react-countup";
import { 
  GitMerge, 
  Users, 
  Lightbulb, 
  GraduationCap, 
  Rocket, 
  ArrowRight,
  Check,
  Star,
  ArrowDown,
  ChevronRight,
  ArrowUpRight,
  Globe,
  Code,
  Briefcase,
  User,
  Shield,
  Sparkles,
  RefreshCw,
  Brain,
  Zap
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

const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// SVG Wave Components
const WaveTop = ({ className = "", fill = "currentColor" }) => (
  <div className={`w-full overflow-hidden ${className}`}>
    <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 120L48 110C96 100 192 80 288 75C384 70 480 80 576 80C672 80 768 70 864 70C960 70 1056 80 1152 85C1248 90 1344 90 1392 90L1440 90V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V120Z" fill={fill} fillOpacity="0.1" />
      <path d="M0 80L48 75C96 70 192 60 288 55C384 50 480 50 576 60C672 70 768 90 864 95C960 100 1056 90 1152 80C1248 70 1344 60 1392 55L1440 50V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V80Z" fill={fill} fillOpacity="0.1" />
    </svg>
  </div>
);

const WaveBottom = ({ className = "", fill = "currentColor" }) => (
  <div className={`w-full overflow-hidden rotate-180 ${className}`}>
    <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 120L48 110C96 100 192 80 288 75C384 70 480 80 576 80C672 80 768 70 864 70C960 70 1056 80 1152 85C1248 90 1344 90 1392 90L1440 90V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V120Z" fill={fill} fillOpacity="0.1" />
      <path d="M0 80L48 75C96 70 192 60 288 55C384 50 480 50 576 60C672 70 768 90 864 95C960 100 1056 90 1152 80C1248 70 1344 60 1392 55L1440 50V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V80Z" fill={fill} fillOpacity="0.1" />
    </svg>
  </div>
);

// Animation and UI interaction related components

// Counter component using the react-countup library
const CounterAnimation = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  return (
    <span ref={ref}>
      {inView ? (
        <CountUp 
          end={end} 
          duration={duration}
          enableScrollSpy={true}
          separator=","
          decimals={0} 
        />
      ) : (
        0
      )}
    </span>
  );
};

export default function LandingPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  
  // Animation-related state and effects

  // If user is logged in, redirect to /projects
  useEffect(() => {
    if (user) {
      navigate("/projects");
    }
  }, [user, navigate]);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center overflow-hidden pt-20 pb-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80 z-10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0"></div>
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute left-1/2 top-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full blur-[100px] z-0"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.6, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -top-10 -right-10 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[80px] z-0"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute -bottom-10 -left-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px] z-0"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.6, 0.5]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <div className="relative z-20 container mx-auto px-4 pt-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
                <Sparkles className="mr-2 h-4 w-4" />
                The Future of Collaboration is Here
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary"
            >
              Connect, Create &<br />
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                className="relative inline-block text-foreground"
              >
                Launch Your Ideas
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.7, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                />
              </motion.span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              eSchool.ai brings together innovators, learners, and creators to build remarkable projects and acquire new skills in a collaborative environment.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                className="h-14 px-8 text-lg font-medium rounded-xl group relative overflow-hidden"
                onClick={() => navigate("/auth")}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-primary transition-all duration-300 transform group-hover:translate-x-full opacity-30"></span>
                <span className="relative flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button 
                variant="outline" 
                className="h-14 px-8 text-lg font-medium rounded-xl group"
                onClick={() => navigate("/auth")}
              >
                <span className="flex items-center">
                  Explore Projects
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating card-based mockup */}
          <motion.div 
            className="relative mx-auto max-w-5xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.5, 
              duration: 0.8,
              type: "spring",
              stiffness: 50
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-30 h-20 bottom-0 top-auto"></div>
              
              <div className="relative z-20 bg-card shadow-2xl rounded-3xl border border-border overflow-hidden">
                <div className="p-2 border-b border-border bg-muted/30">
                  <div className="flex items-center">
                    <div className="flex space-x-2 ml-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mx-auto text-xs font-medium">eSchool.ai Platform</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-12 h-[380px] md:h-[420px] overflow-hidden">
                  {/* Sidebar */}
                  <div className="col-span-3 border-r border-border p-4 bg-muted/30">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-medium">Dylan Cooper</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-2 rounded-md bg-primary/10 text-primary text-sm flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        <span>Dashboard</span>
                      </div>
                      <div className="p-2 rounded-md text-sm flex items-center text-muted-foreground">
                        <Code className="h-4 w-4 mr-2" />
                        <span>Projects</span>
                      </div>
                      <div className="p-2 rounded-md text-sm flex items-center text-muted-foreground">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span>Applications</span>
                      </div>
                      <div className="p-2 rounded-md text-sm flex items-center text-muted-foreground">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        <span>Learning</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Main content */}
                  <div className="col-span-9 p-6 overflow-y-auto">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">Featured Projects</h2>
                      <p className="text-muted-foreground text-sm">Discover trending projects to join</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          title: "AI-Powered Finance Assistant",
                          category: "Artificial Intelligence",
                          members: 8,
                          max: 12,
                          progress: 70
                        },
                        {
                          title: "Sustainable Energy Tracker",
                          category: "CleanTech",
                          members: 5,
                          max: 10,
                          progress: 45
                        },
                        {
                          title: "Mental Health Platform",
                          category: "HealthTech",
                          members: 9,
                          max: 15,
                          progress: 60
                        },
                        {
                          title: "EdTech Learning System",
                          category: "Education",
                          members: 7,
                          max: 12,
                          progress: 80
                        }
                      ].map((project, index) => (
                        <div key={index} className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 hover:shadow-lg transition-all">
                          <h3 className="font-medium mb-1 line-clamp-1">{project.title}</h3>
                          <div className="text-xs text-muted-foreground mb-3">{project.category}</div>
                          
                          <div className="w-full h-1.5 bg-muted rounded-full mb-2">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between items-center text-xs">
                            <span>{project.members}/{project.max} members</span>
                            <span className="text-primary">{project.progress}% complete</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-10 -right-10 bg-card shadow-xl rounded-xl border border-border p-4 w-52 z-30"
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">New Project</div>
                    <div className="text-xs text-muted-foreground">Just submitted</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>AI-powered content creation platform looking for team members</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-10 -left-10 bg-card shadow-xl rounded-xl border border-border p-4 w-52 z-30"
                initial={{ opacity: 0, x: -20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Application</div>
                    <div className="text-xs text-muted-foreground">Accepted</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>You've been accepted to the Sustainable Energy project!</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex flex-col items-center cursor-pointer" onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }}>
              <span className="text-sm mb-2">Scroll to explore</span>
              <motion.div
                animate={{ 
                  y: [0, 5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowDown className="h-5 w-5" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-20 bg-muted/20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { 
                label: "Active Projects", 
                value: 1500, 
                icon: <Rocket className="h-6 w-6 text-primary" /> 
              },
              { 
                label: "Active Users", 
                value: 12000, 
                icon: <Users className="h-6 w-6 text-primary" /> 
              },
              { 
                label: "Schools", 
                value: 25, 
                icon: <GraduationCap className="h-6 w-6 text-primary" /> 
              },
              { 
                label: "Success Rate", 
                value: 92, 
                suffix: "%", 
                icon: <Star className="h-6 w-6 text-primary" /> 
              }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-card border border-border p-6 rounded-2xl text-center hover:shadow-lg transition-all"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                whileHover={{ y: -5, borderColor: "rgba(139, 92, 246, 0.5)" }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">
                  <CounterAnimation end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <WaveBottom fill="currentColor" className="absolute bottom-0 left-0 w-full" />
      </section>

      {/* Features section */}
      <section className="py-24 relative overflow-hidden">
        <WaveTop fill="currentColor" className="absolute top-0 left-0 w-full" />
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
              Platform Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground">
              eSchool.ai provides all the tools necessary for successful collaboration and learning in one integrated platform.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
            <motion.div
              initial="hidden"
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-video bg-muted relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
                  <div className="relative z-10 p-6 flex flex-col items-center justify-center text-center">
                    <GraduationCap className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Advanced Learning Paths</h3>
                    <p className="text-muted-foreground">Follow structured courses and learning paths to enhance your skills</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      "Personalized learning recommendations",
                      "Progress tracking and certifications",
                      "Expert-led courses in various domains",
                      "Interactive learning materials and quizzes"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start">
                        <div className="mr-3 mt-0.5 text-primary">
                          <Check className="h-5 w-5" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeInRight}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">Learn from Industry Experts</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Access curated content and courses designed by professionals to help you master the skills required in today's job market.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["AI & Machine Learning", "Web Development", "UI/UX Design", "Product Management", "Data Science"].map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="rounded-xl"
                  onClick={() => navigate("/auth")}
                >
                  Browse Courses
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="space-y-8 order-2 md:order-1"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">Build Your Dream Team</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Find the perfect collaborators for your projects or join existing teams to work on innovative ideas together.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "Skill-based matching algorithm",
                    "Collaborative project management tools",
                    "Team communication channels",
                    "Progress tracking and milestone management"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="rounded-xl"
                  onClick={() => navigate("/auth")}
                >
                  Start Collaborating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeInRight}
              className="order-1 md:order-2"
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
                <div className="aspect-video bg-muted relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
                  <div className="relative z-10 p-6 flex flex-col items-center justify-center text-center">
                    <Users className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
                    <p className="text-muted-foreground">Work together efficiently with powerful collaboration tools</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["3 Active Projects", "12 Team Members", "4 Completed Milestones"].map((stat, i) => (
                      <span key={i} className="px-3 py-1 text-xs rounded-full bg-muted">
                        {stat}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { role: "UI Designer", filled: true },
                      { role: "Backend Developer", filled: true },
                      { role: "Marketing Specialist", filled: false },
                      { role: "Data Scientist", filled: false }
                    ].map((role, i) => (
                      <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50">
                        <span>{role.role}</span>
                        <span className={`text-xs ${role.filled ? 'text-green-500' : 'text-amber-500'}`}>
                          {role.filled ? 'Filled' : 'Open Position'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <WaveBottom fill="currentColor" className="absolute bottom-0 left-0 w-full" />
      </section>

      {/* Schools/Partners Section */}
      <section className="py-24 bg-muted/20 relative overflow-hidden">
        <WaveTop fill="currentColor" className="absolute top-0 left-0 w-full" />
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
              Educational Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Learn from the Best Schools
            </h2>
            <p className="text-lg text-muted-foreground">
              Our partner institutions provide world-class educational content to help you develop your skills and advance your career.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <Code className="h-6 w-6 text-primary" />,
                title: "TechAcademy",
                description: "Advanced courses in programming, AI, and machine learning",
                courses: 24
              },
              {
                icon: <Briefcase className="h-6 w-6 text-primary" />,
                title: "Business Hub",
                description: "Startup fundamentals, marketing, and growth strategies",
                courses: 18
              },
              {
                icon: <Lightbulb className="h-6 w-6 text-primary" />,
                title: "Design Master",
                description: "UX/UI design principles and practical applications",
                courses: 15
              },
              {
                icon: <Shield className="h-6 w-6 text-primary" />,
                title: "Innovation Lab",
                description: "Product development and innovation frameworks",
                courses: 12
              }
            ].map((school, index) => (
              <motion.div 
                key={index}
                className="group"
                variants={fadeIn}
              >
                <Tilt 
                  tiltMaxAngleX={5} 
                  tiltMaxAngleY={5} 
                  perspective={1000}
                  scale={1.02}
                  transitionSpeed={1500}
                  className="h-full"
                >
                  <div className="bg-card hover:bg-card/80 border border-border hover:border-primary/30 rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col shadow-md hover:shadow-xl">
                    <div className="p-6 border-b border-border group-hover:border-primary/20 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-4 transition-colors">
                        {school.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{school.title}</h3>
                      <p className="text-muted-foreground mb-2">{school.description}</p>
                    </div>
                    
                    <div className="p-6 mt-auto">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-primary">{school.courses} Courses</span>
                        <div className="rounded-full bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                          <ArrowUpRight className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-xl"
              onClick={() => navigate("/auth")}
            >
              Browse All Schools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <WaveTop fill="currentColor" className="absolute top-0 left-0 w-full" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="absolute left-1/2 top-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full blur-[100px] z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="bg-gradient-to-r from-card to-card border border-border rounded-3xl p-8 md:p-14 max-w-5xl mx-auto shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Ready to Join Our Community?
                </motion.h2>
                
                <motion.p 
                  className="text-lg text-muted-foreground mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Create an account today to browse projects, join teams, and access our educational content library.
                </motion.p>
                
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <Button 
                    size="lg" 
                    className="w-full md:w-auto rounded-xl"
                    onClick={() => navigate("/auth")}
                  >
                    Sign Up Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
              
              <div className="relative">
                <Tilt
                  tiltMaxAngleX={3}
                  tiltMaxAngleY={3}
                  perspective={800}
                  scale={1.02}
                  transitionSpeed={1500}
                >
                  <motion.div 
                    className="bg-muted/30 border border-border rounded-2xl p-6 relative z-10"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                  <div className="space-y-4 mb-6">
                    {[
                      "Access to 1,500+ projects and ideas",
                      "Join a community of 12,000+ creators",
                      "Learn from 25+ educational partners",
                      "Build your portfolio with real projects",
                      "Connect with industry professionals"
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-card overflow-hidden">
                          <div className={`w-full h-full bg-primary/${30 + i * 15}`}></div>
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">Join 500+ members this month</span>
                  </div>
                </motion.div>
                </Tilt>
                
                <motion.div 
                  className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-xl z-0"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* The grid pattern is defined in the CSS */}
    </div>
  );
}