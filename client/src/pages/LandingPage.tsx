import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  GitMerge, 
  Users, 
  Lightbulb, 
  GraduationCap, 
  Rocket, 
  ArrowRight,
  Check,
  Play,
  Star,
  ChevronDown
} from "lucide-react";

export default function LandingPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  // If user is logged in, redirect to /projects
  useEffect(() => {
    if (user) {
      navigate("/projects");
    }
  }, [user, navigate]);

  // Animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-background/80 overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNi0yOHY2aDZ2LTZoLTZ6bTAgMTJoNnY2aC02di02em0tMTIgMGg2djZoLTZ2LTZ6bS02IDBoNnY2aC02di02em0xMiAwaC02djZoNnYtNnptLTEyIDBoLTZ2Nmg2di02em0tNiAwdi02aC02djZoNnptMTIgMHYtNmgtNnY2aDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-20 -left-28 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-30 mix-blend-multiply"
          animate={{ 
            x: [0, 30, 0],
            y: [0, 40, 0], 
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-10 -right-28 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl opacity-30 mix-blend-multiply"
          animate={{ 
            x: [0, -50, 0],
            y: [0, 30, 0], 
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-extrabold mb-6"
              variants={item}
            >
              <span className="text-primary">eSchool</span><span className="text-foreground">.ai</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10"
              variants={item}
            >
              Connect with innovative projects and learn from top tech schools in one platform
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
              variants={item}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="px-8 py-6 text-lg group"
                  onClick={() => navigate("/auth")}
                >
                  Get Started
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  className="px-8 py-6 text-lg"
                >
                  Explore Projects
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Video Preview Button */}
            <motion.div
              variants={item}
              className="mb-16"
            >
              <motion.button
                className="flex items-center justify-center mx-auto space-x-3 group"
                onClick={() => setShowVideo(!showVideo)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
                  <Play className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-foreground font-medium">Watch how it works</span>
              </motion.button>
            </motion.div>
            
            {/* Collapsible video section */}
            <motion.div
              className={`${showVideo ? 'block' : 'hidden'} mb-16 rounded-lg overflow-hidden shadow-xl max-w-4xl mx-auto`}
              initial="hidden"
              animate={showVideo ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <div className="relative pb-[56.25%] h-0 bg-black/90 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white/60 text-lg">Demo video would appear here</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Animated Feature Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div 
              className="bg-card rounded-lg p-6 shadow-lg border border-border group"
              variants={fadeIn}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: "rgba(139, 92, 246, 0.3)"
              }}
            >
              <div className="bg-primary/20 p-3 rounded-full w-fit mb-4 group-hover:bg-primary/30 transition-colors">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <GitMerge className="h-6 w-6 text-primary" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold mb-2">Collaborate</h3>
              <p className="text-muted-foreground">Find projects and team up with talented individuals to build amazing products.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card rounded-lg p-6 shadow-lg border border-border group transform md:translate-y-4"
              variants={fadeIn}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: "rgba(139, 92, 246, 0.3)"
              }}
            >
              <div className="bg-primary/20 p-3 rounded-full w-fit mb-4 group-hover:bg-primary/30 transition-colors">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <GraduationCap className="h-6 w-6 text-primary" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold mb-2">Learn</h3>
              <p className="text-muted-foreground">Access educational resources and schools to enhance your skills.</p>
            </motion.div>
            
            <motion.div 
              className="bg-card rounded-lg p-6 shadow-lg border border-border group"
              variants={fadeIn}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: "rgba(139, 92, 246, 0.3)"
              }}
            >
              <div className="bg-primary/20 p-3 rounded-full w-fit mb-4 group-hover:bg-primary/30 transition-colors">
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  <Rocket className="h-6 w-6 text-primary" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold mb-2">Launch</h3>
              <p className="text-muted-foreground">Showcase your ideas and turn them into successful startups.</p>
            </motion.div>
          </motion.div>
          
          {/* Scroll down indicator */}
          <motion.div 
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.button
              className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              onClick={() => {
                window.scrollBy({
                  top: window.innerHeight,
                  behavior: 'smooth'
                });
              }}
            >
              <span className="text-sm mb-2">Scroll to learn more</span>
              <ChevronDown className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20 relative overflow-hidden">
        {/* Background decoration */}
        <motion.div 
          className="absolute top-40 -right-28 w-96 h-96 bg-primary/10 rounded-full blur-3xl mix-blend-multiply"
          animate={{ 
            x: [0, -30, 0],
            y: [0, -20, 0], 
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-16">How eSchool.ai Works</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              className="flex flex-col items-start bg-card/50 p-6 rounded-lg border border-border/50"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                borderColor: "rgba(139, 92, 246, 0.2)"
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-primary">For Project Creators</h3>
              </motion.div>
              
              <ul className="space-y-4">
                {[
                  "Post your innovative startup ideas and projects",
                  "Define the roles you need to fill in your team",
                  "Review applications and build your dream team",
                  "Track project progress and collaborate effectively"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.3 }}
                      className="mr-2 flex-shrink-0 mt-0.5 text-primary"
                    >
                      <Check className="h-6 w-6" />
                    </motion.div>
                    <p>{item}</p>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={() => navigate("/auth")}>
                  Create a Project
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-start bg-card/50 p-6 rounded-lg border border-border/50"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                borderColor: "rgba(139, 92, 246, 0.2)"
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-primary">For Collaborators</h3>
              </motion.div>
              
              <ul className="space-y-4">
                {[
                  "Discover interesting projects that match your skills",
                  "Apply to join teams with your unique expertise",
                  "Enhance your portfolio with real-world projects",
                  "Learn new skills from online schools and workshops"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.3 }}
                      className="mr-2 flex-shrink-0 mt-0.5 text-primary"
                    >
                      <Check className="h-6 w-6" />
                    </motion.div>
                    <p>{item}</p>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={() => navigate("/auth")}>
                  Find Projects
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schools Section Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Educational Partners</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Access high-quality educational content from leading schools in technology, business, design, and more.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* School Card 1 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border hover:shadow-lg transition-all">
              <div className="bg-primary h-2"></div>
              <div className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">TechAcademy</h3>
                <p className="text-muted-foreground mb-4">Advanced courses in programming, AI, and machine learning</p>
                <p className="text-sm text-primary">24 Courses Available</p>
              </div>
            </div>
            
            {/* School Card 2 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border hover:shadow-lg transition-all">
              <div className="bg-primary h-2"></div>
              <div className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">Business Hub</h3>
                <p className="text-muted-foreground mb-4">Startup fundamentals, marketing, and growth strategies</p>
                <p className="text-sm text-primary">18 Courses Available</p>
              </div>
            </div>
            
            {/* School Card 3 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border hover:shadow-lg transition-all">
              <div className="bg-primary h-2"></div>
              <div className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <GitMerge className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">Design Master</h3>
                <p className="text-muted-foreground mb-4">UX/UI design principles and practical applications</p>
                <p className="text-sm text-primary">15 Courses Available</p>
              </div>
            </div>
            
            {/* School Card 4 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border hover:shadow-lg transition-all">
              <div className="bg-primary h-2"></div>
              <div className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">Innovation Lab</h3>
                <p className="text-muted-foreground mb-4">Product development and innovation frameworks</p>
                <p className="text-sm text-primary">12 Courses Available</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/auth")}
            >
              Explore All Schools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create an account today to browse projects, join teams, and access educational content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => navigate("/auth")}
              >
                Sign Up Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8"
                onClick={() => navigate("/auth")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}