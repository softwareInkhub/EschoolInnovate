import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import CountUp from "react-countup";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
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
  Zap,
  MapPin,
  Building2,
  Brush
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
      navigate("/explore");
    }
  }, [user, navigate]);

  return (
    <div className="bg-[#0a0b15]">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center overflow-hidden pt-20 pb-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-[#0a0b15] z-10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] z-0"></div>
        
        {/* Animated stars/space background */}
        <div className="absolute inset-0 overflow-hidden z-[5]">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Rocket animations */}
        <motion.div
          className="absolute z-[6] opacity-30"
          style={{
            top: "15%",
            right: "10%",
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 16.5L3 18L4.5 19.5L6 18L4.5 16.5Z" fill="#6d28d9" />
            <path d="M13 5C13 4.44772 13.4477 4 14 4H15C15.5523 4 16 4.44772 16 5V6C16 6.55228 15.5523 7 15 7H14C13.4477 7 13 6.55228 13 6V5Z" fill="#6d28d9" />
            <path d="M9 10V12M12 7V13M15 10V12" stroke="#6d28d9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 21C7.8 16.28 5.5 12.5 5.5 9.17C5.5 4.6 9.33 2 12 2C14.67 2 18.5 4.6 18.5 9.17C18.5 12.5 16.2 16.28 12 21Z" stroke="#6d28d9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute z-[6] opacity-30"
          style={{
            bottom: "20%",
            left: "15%",
          }}
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 16.5L3 18L4.5 19.5L6 18L4.5 16.5Z" fill="#6d28d9" />
            <path d="M13 5C13 4.44772 13.4477 4 14 4H15C15.5523 4 16 4.44772 16 5V6C16 6.55228 15.5523 7 15 7H14C13.4477 7 13 6.55228 13 6V5Z" fill="#6d28d9" />
            <path d="M9 10V12M12 7V13M15 10V12" stroke="#6d28d9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 21C7.8 16.28 5.5 12.5 5.5 9.17C5.5 4.6 9.33 2 12 2C14.67 2 18.5 4.6 18.5 9.17C18.5 12.5 16.2 16.28 12 21Z" stroke="#6d28d9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        
        <div className="relative z-20 container mx-auto px-4 pt-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="mb-2">
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-white mb-4">
                ESCHOOL.AI
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
            >
              Find your Team Members and<br />
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="relative inline-block"
              >
                Grow your Startup Idea
              </motion.span>
            </motion.h1>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                className="h-12 px-8 text-lg font-medium bg-[#f6c000] hover:bg-[#e6b000] text-black rounded-md"
                onClick={() => navigate("/auth")}
              >
                <span className="relative flex items-center">
                  Join eSchool
                </span>
              </Button>
            </motion.div>
            
            {/* User circles */}
            <motion.div 
              variants={fadeIn}
              className="flex justify-center mb-2"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0b15] bg-[#d8d8d8] overflow-hidden relative">
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${i+10}.jpg`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.p 
              variants={fadeIn}
              className="text-[#ccc] mb-6"
            >
              <span className="font-bold">77,004 action takers</span> have joined eSchool
            </motion.p>
          </motion.div>
          
          {/* "From Idea to Funded Startup" Path */}
          <motion.div
            className="relative w-full mx-auto mt-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="relative bg-gradient-to-r from-purple-900/40 via-purple-700/40 to-purple-900/40 rounded-xl p-8 overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjMgMCAxMiA1LjM3IDEyIDEyaC02YzAgMy4zMS0yLjY5IDYtNiA2djZjNi42MyAwIDEyLTUuMzcgMTItMTJoNnptLTYgMTJjLTMuMzEgMC02IDIuNjktNiA2aDZ2LTZ6IiBmaWxsLW9wYWNpdHk9Ii4xIiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
              
              <div className="flex flex-col md:flex-row items-center justify-center text-center">
                <div className="flex items-center justify-center mb-4 md:mb-0">
                  <span className="text-[#f6c000] font-bold text-xl mr-2">From</span>
                  <motion.span className="text-[#f6c000] font-bold text-2xl mr-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Idea
                  </motion.span>
                  <span className="text-white text-xl mr-2">to</span>
                  <span className="text-[#f6c000] font-bold text-xl mr-2">Funded</span>
                  <motion.span className="text-[#f6c000] font-bold text-2xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    Startup
                  </motion.span>
                </div>
                
                <div className="mx-8 text-white opacity-60">or</div>
                
                <div className="flex items-center text-center">
                  <motion.span className="text-[#f6c000] font-bold text-xl mr-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                  >
                    Build
                  </motion.span>
                  <span className="text-white text-xl mr-2">or</span>
                  <motion.span className="text-[#f6c000] font-bold text-xl mr-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
                  >
                    Join
                  </motion.span>
                  <span className="text-white text-xl">Your</span>
                  <motion.span className="text-[#f6c000] font-bold text-2xl ml-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
                  >
                    Dream Team
                  </motion.span>
                </div>
              </div>
              
              <div className="text-center mt-4 text-white/70 text-sm">
                Kickstart your journey with the right team, advice and investor exposure - All in one place.
              </div>
            </div>
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
      
      {/* Two Options Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0b15] z-0"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* I have an idea */}
            <motion.div 
              className="bg-purple-900/30 rounded-xl p-8 border border-purple-800/30 hover:border-[#f6c000]/50 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate("/auth")}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#f6c000] rounded-full flex items-center justify-center mr-4">
                  <Lightbulb className="h-5 w-5 text-black" />
                </div>
                <h3 className="text-xl font-bold text-[#f6c000]">I have an idea</h3>
              </div>
              
              <div className="space-y-6 text-white/80">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 w-6 h-6 flex-shrink-0 flex items-center justify-center bg-purple-800/50 rounded-full text-[#f6c000]">
                    1
                  </div>
                  <p className="text-sm">Create a project card</p>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 mt-1 w-6 h-6 flex-shrink-0 flex items-center justify-center bg-purple-800/50 rounded-full text-[#f6c000]">
                    2
                  </div>
                  <p className="text-sm">Select team members with roles</p>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 mt-1 w-6 h-6 flex-shrink-0 flex items-center justify-center bg-purple-800/50 rounded-full text-[#f6c000]">
                    3
                  </div>
                  <p className="text-sm">Turn vision into a funded startup together</p>
                </div>
              </div>
            </motion.div>
            
            {/* I want to join a project */}
            <motion.div 
              className="bg-purple-900/30 rounded-xl p-8 border border-purple-800/30 hover:border-[#f6c000]/50 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate("/auth")}
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#f6c000] rounded-full flex items-center justify-center mr-4">
                  <Users className="h-5 w-5 text-black" />
                </div>
                <h3 className="text-xl font-bold text-[#f6c000]">I want to join a project</h3>
              </div>
              
              <div className="space-y-6 text-white/80">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 w-6 h-6 flex-shrink-0 flex items-center justify-center bg-purple-800/50 rounded-full text-[#f6c000]">
                    1
                  </div>
                  <p className="text-sm">Browse interesting projects</p>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 mt-1 w-6 h-6 flex-shrink-0 flex items-center justify-center bg-purple-800/50 rounded-full text-[#f6c000]">
                    2
                  </div>
                  <p className="text-sm">Apply to your favorite team with skills</p>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 mt-1 w-6 h-6 flex-shrink-0 flex items-center justify-center bg-purple-800/50 rounded-full text-[#f6c000]">
                    3
                  </div>
                  <p className="text-sm">Make a difference in new team from day one</p>
                </div>
              </div>
            </motion.div>
          </div>
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
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Blog Section */}
      <BlogSection />
      
      {/* India-specific callout */}
      <section className="py-16 bg-gradient-to-b from-[#0a0b15] to-[#170d30] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-grid-pattern"></div>
        
        {/* India map outline SVG */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-5">
          <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M300,10 C420,10 520,110 590,230 C540,280 500,350 510,430 C450,500 370,550 300,590 C230,550 150,500 90,430 C100,350 60,280 10,230 C80,110 180,10 300,10 Z" fill="white"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="flex flex-col md:flex-row items-center gap-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="md:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f6c000]/20 mr-4">
                    <MapPin className="h-5 w-5 text-[#f6c000]" />
                  </div>
                  <span className="text-[#f6c000] font-medium">Made for India</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Building the Future of <br/>Indian Innovation
                </h2>
                <p className="text-[#ccc] mb-6">
                  eSchool.ai is designed specifically for India's unique startup ecosystem, addressing local challenges and opportunities while connecting talent across the country.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-[#f6c000]" />
                    </div>
                    <div>
                      <span className="font-medium text-white">Pan-India Network</span>
                      <p className="text-sm text-[#ccc]">Connect with talent and opportunities across metros and tier 2/3 cities</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-[#f6c000]" />
                    </div>
                    <div>
                      <span className="font-medium text-white">Local Ecosystem Integration</span>
                      <p className="text-sm text-[#ccc]">Access to government schemes, regulations, and India-specific funding channels</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-[#f6c000]" />
                    </div>
                    <div>
                      <span className="font-medium text-white">Vernacular Support</span>
                      <p className="text-sm text-[#ccc]">Interface and resources available in multiple Indian languages</p>
                    </div>
                  </li>
                </ul>
                <Button 
                  className="h-12 px-6 bg-[#f6c000] hover:bg-[#e6b000] text-black rounded-md"
                  onClick={() => navigate("/auth")}
                >
                  Join the Movement
                </Button>
              </div>
              
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-[#f6c000]/20 rounded-2xl blur-[50px]"></div>
                  <div className="relative bg-[#0f0f1a]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <div className="text-2xl font-bold text-[#f6c000] mb-1">100+</div>
                        <div className="text-xs text-white/70">Cities across India</div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <div className="text-2xl font-bold text-[#f6c000] mb-1">50K+</div>
                        <div className="text-xs text-white/70">Indian entrepreneurs</div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <div className="text-2xl font-bold text-[#f6c000] mb-1">₹120Cr+</div>
                        <div className="text-xs text-white/70">Funding facilitated</div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <div className="text-2xl font-bold text-[#f6c000] mb-1">28+</div>
                        <div className="text-xs text-white/70">State innovation hubs</div>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-4 bg-gradient-to-r from-[#f6c000]/10 to-primary/10 rounded-lg">
                      <h4 className="font-medium text-white mb-2">eSchool.ai India Impact</h4>
                      <p className="text-sm text-white/70 mb-3">
                        Supporting the next generation of Indian startups that are solving local problems with global potential
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#170d30] overflow-hidden relative">
                              <img 
                                src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i+20}.jpg`}
                                alt="User"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          <div className="w-8 h-8 rounded-full bg-[#f6c000]/20 flex items-center justify-center border-2 border-[#170d30] text-[#f6c000] text-xs font-bold">
                            +12K
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-[#f6c000] hover:text-[#f6c000] hover:bg-[#f6c000]/10"
                        >
                          <span className="flex items-center">
                            Success Stories
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* The grid pattern is defined in the CSS */}
    </div>
  );
}