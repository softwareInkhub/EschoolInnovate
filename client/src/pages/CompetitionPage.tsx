import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import CountUp from "react-countup";
import {
  Trophy,
  Calendar,
  Users,
  Clock,
  Star,
  Zap,
  Award,
  Flag,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  User,
  Shield,
  Heart,
  Rocket,
  Check
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

// Counter component using the react-countup library
const CounterAnimation = ({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
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
          suffix={suffix}
        />
      ) : (
        0
      )}
    </span>
  );
};

// Mock competition data
const competitionData = [
  {
    id: "1",
    title: "AI Innovation Challenge 2025",
    description: "Create groundbreaking AI solutions that address real-world problems in education, healthcare, or climate action.",
    startDate: "June 1, 2025",
    endDate: "August 15, 2025",
    registrationDeadline: "May 20, 2025",
    participantsCount: 1240,
    prizesTotal: "$50,000",
    organizerName: "EduTech Foundation",
    organizerLogo: "🏆",
    categories: ["Artificial Intelligence", "Machine Learning", "Data Science"],
    eligibility: "Open to college students and recent graduates globally",
    level: "Advanced",
    banner: "ai-challenge",
    featured: true,
    prizeBreakdown: [
      { place: "1st Place", amount: "$25,000", extras: "Mentorship from industry leaders" },
      { place: "2nd Place", amount: "$15,000", extras: "AWS credits worth $10,000" },
      { place: "3rd Place", amount: "$10,000", extras: "Opportunity to pitch to investors" }
    ]
  },
  {
    id: "2",
    title: "CleanTech Sustainability Hackathon",
    description: "Develop innovative technologies that promote sustainable living and reduce environmental impact.",
    startDate: "July 10, 2025",
    endDate: "July 12, 2025",
    registrationDeadline: "July 1, 2025",
    participantsCount: 750,
    prizesTotal: "$30,000",
    organizerName: "GreenFuture Initiative",
    organizerLogo: "🌱",
    categories: ["Sustainability", "GreenTech", "Environmental Science"],
    eligibility: "Open to all innovators and developers",
    level: "Intermediate",
    banner: "cleantech-hackathon",
    featured: true,
    prizeBreakdown: [
      { place: "1st Place", amount: "$15,000", extras: "Product development support" },
      { place: "2nd Place", amount: "$10,000", extras: "Marketing assistance" },
      { place: "3rd Place", amount: "$5,000", extras: "Mentorship program" }
    ]
  },
  {
    id: "3",
    title: "EdTech Innovation Award",
    description: "Reimagine education through technology with creative solutions that enhance learning experiences.",
    startDate: "May 15, 2025",
    endDate: "September 30, 2025",
    registrationDeadline: "May 1, 2025",
    participantsCount: 980,
    prizesTotal: "$45,000",
    organizerName: "Future of Learning Consortium",
    organizerLogo: "📚",
    categories: ["Education", "Technology", "Learning Design"],
    eligibility: "Teachers, developers, and education enthusiasts",
    level: "All levels",
    banner: "edtech-award",
    featured: false,
    prizeBreakdown: [
      { place: "1st Place", amount: "$20,000", extras: "Pilot program in partner schools" },
      { place: "2nd Place", amount: "$15,000", extras: "Professional development opportunities" },
      { place: "3rd Place", amount: "$10,000", extras: "Publication in education journals" }
    ]
  },
  {
    id: "4",
    title: "Healthcare Innovation Challenge",
    description: "Design solutions that address pressing healthcare challenges and improve patient outcomes.",
    startDate: "August 5, 2025",
    endDate: "October 15, 2025",
    registrationDeadline: "July 25, 2025",
    participantsCount: 865,
    prizesTotal: "$60,000",
    organizerName: "MedTech Alliance",
    organizerLogo: "💉",
    categories: ["Healthcare", "MedTech", "Patient Care"],
    eligibility: "Healthcare professionals, engineers, designers",
    level: "Advanced",
    banner: "healthcare-challenge",
    featured: true,
    prizeBreakdown: [
      { place: "1st Place", amount: "$30,000", extras: "Clinical trial opportunities" },
      { place: "2nd Place", amount: "$20,000", extras: "Regulatory guidance support" },
      { place: "3rd Place", amount: "$10,000", extras: "Industry networking events" }
    ]
  }
];

export default function CompetitionPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [expandedCompetition, setExpandedCompetition] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const filteredCompetitions = filter === "all" 
    ? competitionData 
    : competitionData.filter(comp => comp.featured);

  const toggleExpand = (id: string) => {
    setExpandedCompetition(expandedCompetition === id ? null : id);
  };

  // We'll allow viewing without being logged in, but certain actions will require login
  const isLoggedIn = !!user;

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0"></div>
        <div className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full blur-[100px] z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-12"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
                <Trophy className="mr-2 h-4 w-4" />
                Competitions & Challenges
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Put Your Skills to the Test
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-primary">
                Win Big Rewards
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Participate in exciting competitions, showcase your talents, collaborate with others, and win prizes while building your portfolio.
            </motion.p>
            
            <motion.div 
              variants={fadeIn} 
              className="flex flex-wrap gap-4 justify-center mt-8 mb-8"
            >
              <Button 
                variant={filter === "all" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setFilter("all")}
              >
                All Competitions
              </Button>
              <Button 
                variant={filter === "featured" ? "default" : "outline"}
                className="rounded-full"
                onClick={() => setFilter("featured")}
              >
                Featured Events
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {[
              { icon: <Trophy className="h-6 w-6 text-primary" />, value: 32, label: "Active Competitions" },
              { icon: <Users className="h-6 w-6 text-primary" />, value: 12800, label: "Participants" },
              { icon: <Zap className="h-6 w-6 text-primary" />, value: 350, label: "Winning Projects" },
              { icon: <Award className="h-6 w-6 text-primary" />, value: 5, suffix: "M+", label: "Prize Money" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-1">
                  <CounterAnimation end={stat.value} suffix={stat.suffix || ""} />
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Competitions Listing */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8">
            {filteredCompetitions.map((competition) => (
              <Tilt
                key={competition.id}
                tiltMaxAngleX={2}
                tiltMaxAngleY={2}
                scale={1.01}
                transitionSpeed={1500}
                tiltEnable={expandedCompetition !== competition.id}
                className="cursor-pointer"
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className={`bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 ${
                    expandedCompetition === competition.id ? 'shadow-xl' : 'shadow-md hover:shadow-lg'
                  }`}
                >
                  <div 
                    className="flex flex-col lg:flex-row"
                    onClick={() => toggleExpand(competition.id)}
                  >
                    {/* Left side with banner image */}
                    <div className="lg:w-1/4 bg-muted/40 p-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border">
                      <div className="text-6xl">{competition.organizerLogo}</div>
                    </div>
                    
                    {/* Right side with details */}
                    <div className="lg:w-3/4 p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold mb-2 md:mb-0">{competition.title}</h3>
                        <div className="flex items-center space-x-2">
                          {competition.featured && (
                            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </span>
                          )}
                          <span className="px-3 py-1 bg-muted text-xs rounded-full">
                            {competition.level}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-6">{competition.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                          <div>
                            <div className="text-sm font-medium">Duration</div>
                            <div className="text-sm text-muted-foreground">{competition.startDate} - {competition.endDate}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-muted-foreground mr-2" />
                          <div>
                            <div className="text-sm font-medium">Participants</div>
                            <div className="text-sm text-muted-foreground">{competition.participantsCount.toLocaleString()}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Trophy className="h-5 w-5 text-muted-foreground mr-2" />
                          <div>
                            <div className="text-sm font-medium">Prize Pool</div>
                            <div className="text-sm text-muted-foreground">{competition.prizesTotal}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {competition.categories.map((category, index) => (
                          <span key={index} className="px-3 py-1 bg-muted text-xs rounded-full">
                            {category}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center mt-2 justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(competition.id);
                          }}
                        >
                          {expandedCompetition === competition.id ? 'View Less' : 'View Details'}
                          <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${
                            expandedCompetition === competition.id ? 'rotate-180' : ''
                          }`} />
                        </Button>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isLoggedIn) {
                                navigate("/auth");
                              } else {
                                // Handle apply for logged in users
                              }
                            }}
                          >
                            {isLoggedIn ? 'Apply Now' : 'Login to Apply'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded section */}
                  {expandedCompetition === competition.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border p-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-bold mb-4">Competition Details</h4>
                          
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium mb-2">Eligibility</h5>
                              <p className="text-muted-foreground text-sm">{competition.eligibility}</p>
                            </div>
                            
                            <div>
                              <h5 className="font-medium mb-2">Important Dates</h5>
                              <div className="space-y-2">
                                <div className="flex items-start">
                                  <Clock className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                                  <div>
                                    <span className="text-sm font-medium">Registration Deadline:</span>
                                    <span className="text-sm text-muted-foreground ml-2">{competition.registrationDeadline}</span>
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <Flag className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                                  <div>
                                    <span className="text-sm font-medium">Start Date:</span>
                                    <span className="text-sm text-muted-foreground ml-2">{competition.startDate}</span>
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <Flag className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                                  <div>
                                    <span className="text-sm font-medium">End Date:</span>
                                    <span className="text-sm text-muted-foreground ml-2">{competition.endDate}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-medium mb-2">Organizer</h5>
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center mr-3">
                                  <User className="h-4 w-4" />
                                </div>
                                <span>{competition.organizerName}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-bold mb-4">Prizes & Rewards</h4>
                          
                          <div className="space-y-4">
                            {competition.prizeBreakdown.map((prize, index) => (
                              <div 
                                key={index} 
                                className={`p-4 rounded-lg border ${
                                  index === 0 ? 'bg-amber-500/10 border-amber-500/20' :
                                  index === 1 ? 'bg-slate-300/10 border-slate-300/20' :
                                  'bg-orange-700/10 border-orange-700/20'
                                }`}
                              >
                                <div className="flex justify-between items-center mb-2">
                                  <div className="font-bold">{prize.place}</div>
                                  <div className="text-lg font-bold">{prize.amount}</div>
                                </div>
                                <div className="text-sm text-muted-foreground">{prize.extras}</div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-6">
                            <Button 
                              className="w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isLoggedIn) {
                                  navigate("/auth");
                                } else {
                                  // Handle apply action for logged in users
                                }
                              }}
                            >
                              {isLoggedIn ? 'Apply for this Competition' : 'Login to Apply'}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 mt-8">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-card border border-border rounded-2xl p-8 md:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-[80px] z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Own Competition?</h2>
                <p className="text-muted-foreground mb-6">
                  If you have an exciting challenge idea, you can create and host your own competition on our platform, 
                  reaching thousands of talented participants worldwide.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="rounded-xl"
                    onClick={() => {
                      if (!isLoggedIn) {
                        navigate("/auth");
                      } else {
                        // Handle create competition
                      }
                    }}
                  >
                    {isLoggedIn ? 'Create Competition' : 'Login to Create'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    Learn More
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-xl border border-border">
                <h3 className="font-bold mb-4">Benefits of Hosting</h3>
                
                <div className="space-y-3">
                  {[
                    "Access to a global talent pool",
                    "Discover innovative solutions",
                    "Promote your brand and mission",
                    "Engage with the community",
                    "Full platform support and tools"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex -space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-card overflow-hidden">
                        <div className={`w-full h-full bg-primary/${30 + i * 10}`}></div>
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs">+8</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Join 45+ organizations hosting competitions
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}