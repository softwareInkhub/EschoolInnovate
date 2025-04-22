import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import CountUp from "react-countup";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { 
  GraduationCap, 
  Building2, 
  LucideSchool,
  Book, 
  Users, 
  Award, 
  Star, 
  MapPin, 
  BookOpen, 
  Lightbulb,
  Briefcase,
  Globe,
  ArrowRight,
  Check,
  Heart,
  TrendingUp,
  RefreshCw,
  Send,
  CheckCircle,
  Zap,
  User,
  Sparkles,
  Rocket,
  ExternalLink,
  ChevronRight,
  BarChart3,
  Target,
  MessageSquare,
  Phone,
  Mail,
  Link2,
  Share2,
  Network,
  GanttChartSquare,
  Building,
  Handshake
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

// Validation schema for the partnership application form
const partnershipFormSchema = z.object({
  institutionName: z.string().min(3, {
    message: "Institution name must be at least 3 characters.",
  }),
  contactName: z.string().min(3, {
    message: "Contact name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  institutionType: z.string({
    required_error: "Please select an institution type.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  yearFounded: z.string().regex(/^\d{4}$/, {
    message: "Please enter a valid year (e.g., 2010).",
  }),
  enrollmentSize: z.string({
    required_error: "Please select enrollment size.",
  }),
  partnershipGoals: z.string().min(20, {
    message: "Please share your goals in at least 20 characters.",
  }),
  interestAreas: z.array(z.string()).min(1, {
    message: "Please select at least one area of interest.",
  }),
  heardFrom: z.string().optional(),
});

type PartnershipFormValues = z.infer<typeof partnershipFormSchema>;

// Partner logo data
const partnerLogos = [
  { name: "IIT Delhi", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/220px-Indian_Institute_of_Technology_Delhi_Logo.svg.png" },
  { name: "Delhi University", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/34/University_of_Delhi.svg/220px-University_of_Delhi.svg.png" },
  { name: "Amity University", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Amity_University_logo.svg/220px-Amity_University_logo.svg.png" },
  { name: "BITS Pilani", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/220px-BITS_Pilani-Logo.svg.png" },
  { name: "IIM Ahmedabad", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/IIM_Ahmedabad_Logo.svg/220px-IIM_Ahmedabad_Logo.svg.png" },
  { name: "VIT Vellore", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Vellore_Institute_of_Technology_seal_2017.svg/220px-Vellore_Institute_of_Technology_seal_2017.svg.png" }
];

// Testimonial data
const testimonials = [
  {
    name: "Dr. Rajesh Sharma",
    position: "Director, Delhi School of Economics",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    quote: "escool.ai has transformed how we approach digital learning. Their platform has enabled us to reach thousands of students nationwide while maintaining educational quality and standards."
  },
  {
    name: "Prof. Sunita Patel",
    position: "Dean of Engineering, VIT Vellore",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    quote: "The analytics and insights from escool.ai's platform have been invaluable for curriculum development. We've seen a 40% increase in student engagement and better learning outcomes."
  },
  {
    name: "Dr. Vikram Mehta",
    position: "Chancellor, Amity University",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    quote: "Partnering with escool.ai has given our university a competitive edge in the digital education landscape. Their team's responsiveness and technology expertise has made this collaboration seamless."
  }
];

// Benefits data
const benefits = [
  {
    icon: <Globe className="h-10 w-10 text-[#f6c000]" />,
    title: "Expanded Reach",
    description: "Connect with students across India and beyond. Our platform helps you break geographical barriers and extend your educational impact."
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-[#f6c000]" />,
    title: "Innovative Teaching",
    description: "Access cutting-edge educational technology and pedagogical approaches that enhance both online and offline learning experiences."
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-[#f6c000]" />,
    title: "Data-Driven Insights",
    description: "Leverage advanced analytics to understand student engagement, learning patterns, and opportunities for curriculum improvement."
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-[#f6c000]" />,
    title: "Revenue Growth",
    description: "Create new revenue streams through online courses, specialized programs, and access to a broader student demographic."
  },
  {
    icon: <Target className="h-10 w-10 text-[#f6c000]" />,
    title: "Industry Connections",
    description: "Gain access to our network of industry partners for student placements, collaborative research, and real-world project opportunities."
  },
  {
    icon: <Sparkles className="h-10 w-10 text-[#f6c000]" />,
    title: "Brand Enhancement",
    description: "Elevate your institution's reputation as a forward-thinking, technology-embracing educational leader in the digital age."
  }
];

// FAQ data
const faqs = [
  {
    question: "What does it cost to partner with escool.ai?",
    answer: "Partnership arrangements are flexible and designed to be mutually beneficial. We offer various models including revenue-sharing, subscription-based, and custom arrangements based on your institution's specific needs and goals."
  },
  {
    question: "How long does the integration process take?",
    answer: "The typical integration timeline is 4-6 weeks, which includes platform customization, content migration, staff training, and testing. Our dedicated implementation team works closely with your institution to ensure a smooth transition."
  },
  {
    question: "Can we maintain our branding on the platform?",
    answer: "Absolutely! We provide white-labeling options that allow you to maintain your institution's visual identity, including logos, colors, and other branding elements, while leveraging our powerful platform infrastructure."
  },
  {
    question: "What kind of support does escool.ai provide to partners?",
    answer: "Our partners receive comprehensive support including dedicated account management, technical assistance, regular platform updates, faculty training, content development guidance, and marketing collaboration opportunities."
  },
  {
    question: "How does escool.ai ensure the quality of online education?",
    answer: "We implement rigorous quality assurance measures including learning outcome tracking, engagement analytics, regular content reviews, and feedback mechanisms. Our platform is designed to promote interactive learning and meaningful assessment."
  }
];

// Program options
const programOptions = [
  {
    title: "Curriculum Integration",
    description: "Blend digital learning with traditional classroom experiences",
    features: [
      "Customized learning pathways",
      "Interactive digital textbooks",
      "Real-time progress tracking",
      "AI-powered content recommendations"
    ]
  },
  {
    title: "Full Online Programs",
    description: "Launch complete degree or certificate programs online",
    features: [
      "Comprehensive course development",
      "Virtual classrooms and labs",
      "Proctored examination systems",
      "Global student enrollment management"
    ]
  },
  {
    title: "Professional Development",
    description: "Upskill faculty and staff with targeted training",
    features: [
      "Digital pedagogy workshops",
      "Technology integration training",
      "Learning experience design",
      "Assessment strategy development"
    ]
  }
];

// Collaboration opportunities
const collaborationOptions = [
  {
    icon: <GanttChartSquare className="h-10 w-10 text-[#f6c000]" />,
    title: "Research Partnerships",
    description: "Collaborate on cutting-edge research in educational technology, pedagogy, and learning sciences with our team of experts and industry partners.",
    features: [
      "Access to research grants and funding",
      "Joint publication opportunities",
      "Collaborative innovation labs",
      "Student research internships"
    ]
  },
  {
    icon: <Handshake className="h-10 w-10 text-[#f6c000]" />,
    title: "Industry Collaborations",
    description: "Connect with leading corporations and startups looking to engage with talented students and faculty for projects, internships, and recruitment.",
    features: [
      "Corporate-sponsored hackathons",
      "Industry mentorship programs",
      "Applied research projects",
      "Recruitment partnerships"
    ]
  },
  {
    icon: <BookOpen className="h-10 w-10 text-[#f6c000]" />,
    title: "Content Co-creation",
    description: "Develop high-quality educational content together with our instructional designers and learning experts to deliver exceptional learning experiences.",
    features: [
      "Co-branded course offerings",
      "Shared intellectual property",
      "Multi-format content development",
      "Revenue sharing models"
    ]
  }
];

// Networking benefits
const networkingBenefits = [
  {
    icon: <Building className="h-10 w-10 text-[#f6c000]" />,
    title: "Institution Network",
    description: "Join our growing network of 200+ educational institutions from across India, sharing best practices and collaborative opportunities."
  },
  {
    icon: <Users className="h-10 w-10 text-[#f6c000]" />,
    title: "Educator Community",
    description: "Connect with thousands of educators, instructional designers, and education technology experts through our exclusive partner community."
  },
  {
    icon: <Briefcase className="h-10 w-10 text-[#f6c000]" />,
    title: "Industry Connections",
    description: "Gain privileged access to our corporate partners looking for talent, collaborative projects, and educational partnerships."
  },
  {
    icon: <Share2 className="h-10 w-10 text-[#f6c000]" />,
    title: "Global Outreach",
    description: "Expand your global presence through our international partnerships with universities and educational organizations worldwide."
  }
];

// Why escool
const whyEscoolReasons = [
  {
    icon: <Award className="h-8 w-8 text-[#f6c000]" />,
    title: "Education Excellence",
    description: "Our platform is built by educators for educators, with a deep understanding of pedagogical best practices and learning methodologies."
  },
  {
    icon: <Rocket className="h-8 w-8 text-[#f6c000]" />,
    title: "Technology Innovation",
    description: "We leverage cutting-edge AI, data analytics, and interactive technologies to create engaging, effective learning experiences."
  },
  {
    icon: <Users className="h-8 w-8 text-[#f6c000]" />,
    title: "Learner-Centered Approach",
    description: "Every feature of our platform is designed with the learner experience in mind, ensuring high engagement and completion rates."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-[#f6c000]" />,
    title: "Growth Focused",
    description: "We're committed to helping our partners grow their educational impact, reach, and revenue through innovative solutions."
  },
  {
    icon: <Globe className="h-8 w-8 text-[#f6c000]" />,
    title: "India-First Mindset",
    description: "Built specifically for the Indian educational landscape, addressing unique challenges and opportunities of our diverse education system."
  }
];

// Contact information
const contactInfo = {
  phone: "+91 98765 43210",
  email: "partnerships@escool.ai",
  address: "91 Innovation Hub, Koramangala, Bangalore 560034, India",
  socialLinks: [
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "Facebook", url: "https://facebook.com" }
  ]
};

// Counter animation component
const CounterAnimation = ({ end, suffix = "", prefix = "", duration = 2.5 }: { 
  end: number, 
  suffix?: string,
  prefix?: string,
  duration?: number 
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  return (
    <span ref={ref} className="font-bold text-3xl md:text-4xl lg:text-5xl text-[#f6c000]">
      {prefix}
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
      {suffix}
    </span>
  );
};

// Wave divider component
const WaveDivider = ({ className = "", inverted = false }: { className?: string, inverted?: boolean }) => (
  <div className={`w-full overflow-hidden ${inverted ? "rotate-180" : ""} ${className}`}>
    <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 120L48 110C96 100 192 80 288 75C384 70 480 80 576 80C672 80 768 70 864 70C960 70 1056 80 1152 85C1248 90 1344 90 1392 90L1440 90V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V120Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M0 80L48 75C96 70 192 60 288 55C384 50 480 50 576 60C672 70 768 90 864 95C960 100 1056 90 1152 80C1248 70 1344 60 1392 55L1440 50V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V80Z" fill="currentColor" fillOpacity="0.1" />
    </svg>
  </div>
);

export default function SchoolsPartnershipPage() {
  const [activeTab, setActiveTab] = useState("benefits");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const partnersRef = useRef<HTMLDivElement>(null);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(timer);
  }, []);

  // Animation controls
  const controls = useAnimation();
  
  // Sections in-view detection
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const { ref: benefitsRef, inView: benefitsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const { ref: programsRef, inView: programsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });
  
  const { ref: testimonialRef, inView: testimonialInView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  const { ref: faqRef, inView: faqInView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  const { ref: formRef, inView: formInView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  const { ref: collaborationRef, inView: collaborationInView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  const { ref: contactRef, inView: contactInView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  const { ref: whyEscoolRef, inView: whyEscoolInView } = useInView({
    triggerOnce: true, 
    threshold: 0.2
  });
  
  const { ref: networkingRef, inView: networkingInView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  // Scroll to partners section
  const scrollToPartners = () => {
    partnersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Form handling
  const form = useForm<PartnershipFormValues>({
    resolver: zodResolver(partnershipFormSchema),
    defaultValues: {
      institutionName: "",
      contactName: "",
      email: "",
      phone: "",
      institutionType: "",
      city: "",
      state: "",
      yearFounded: "",
      enrollmentSize: "",
      partnershipGoals: "",
      interestAreas: [],
      heardFrom: ""
    }
  });

  function onSubmit(data: PartnershipFormValues) {
    console.log(data);
    toast({
      title: "Application Submitted",
      description: "Thank you for your interest in partnering with escool.ai! Our team will contact you soon.",
    });
    form.reset();
  }
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="bg-[#0a0b15] min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-16 md:pb-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] z-0"></div>
        
        {/* Animated stars/dots background */}
        <div className="absolute inset-0 overflow-hidden z-[5]">
          {[...Array(30)].map((_, i) => (
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
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={heroRef}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerChildren}
          >
            <motion.div className="max-w-3xl" variants={fadeIn}>
              <Badge className="mb-4 bg-[#f6c000]/20 text-[#f6c000] hover:bg-[#f6c000]/30">
                <MapPin className="mr-1 h-3 w-3" />
                For Institutions Across India
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">
                Transform <span className="text-[#f6c000]">Education</span> Together with <span className="text-[#f6c000]">escool.ai</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                Join India's most innovative educational partnership platform. Expand your institution's reach, enhance learning experiences, and prepare students for the future of work.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-[#f6c000] hover:bg-[#e6b000] text-black font-medium text-lg px-8"
                  onClick={scrollToPartners}
                >
                  Become a Partner
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={() => setActiveTab("programs")}
                >
                  Explore Programs
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                <span>Trusted by:</span>
                <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
                  {partnerLogos.slice(0, 3).map((partner, index) => (
                    <img 
                      key={index}
                      src={partner.logo}
                      alt={partner.name}
                      className="h-8 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    />
                  ))}
                  <Badge variant="outline" className="text-xs border-gray-700">
                    +40 more
                  </Badge>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 lg:w-2/5 relative"
              variants={fadeIn}
            >
              <Tilt
                className="w-full"
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.02}
                transitionSpeed={1500}
                gyroscope={true}
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-[#f6c000] rounded-2xl blur opacity-30"></div>
                  <Card className="relative bg-[#0f1025]/80 backdrop-blur border-white/10 rounded-2xl overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="bg-[#f6c000] p-1.5 rounded-full">
                            <GraduationCap className="h-5 w-5 text-black" />
                          </div>
                          <span className="font-semibold">escool.ai Partnership</span>
                        </div>
                        <Badge className="bg-green-600/20 text-green-500">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Accepting Applications
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="p-2 bg-gradient-to-r from-purple-500/10 to-[#f6c000]/10 rounded-lg mb-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-300">Partnership Benefits</span>
                          <Badge variant="outline" className="text-xs">Premium</Badge>
                        </div>
                        <div className="space-y-2">
                          {[
                            "Digital Transformation Support", 
                            "Student Engagement Analytics", 
                            "AI-Enhanced Learning Tools",
                            "Industry Placement Network"
                          ].map((benefit, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                                <Check className="h-3 w-3" />
                              </div>
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-sm text-gray-300 mb-2">Current Partners Include</h3>
                        <div className="flex -space-x-2">
                          {partnerLogos.slice(0, 5).map((partner, i) => (
                            <div key={i} className="w-8 h-8 rounded-full border border-white/20 overflow-hidden bg-white">
                              <img 
                                src={partner.logo}
                                alt={partner.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ))}
                          <div className="w-8 h-8 rounded-full bg-[#f6c000]/20 text-[#f6c000] font-semibold text-xs flex items-center justify-center border border-white/20">
                            +30
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center border-t border-white/10 bg-white/5 pt-3 pb-3">
                      <div className="text-xs text-gray-400">
                        <span className="text-white font-semibold">94%</span> partner satisfaction rate
                      </div>
                      <Button size="sm" className="bg-[#f6c000] hover:bg-[#e6b000] text-black">
                        Apply Now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </Tilt>
            </motion.div>
          </motion.div>
        </div>
        
        <WaveDivider className="text-white mt-12" />
      </section>
      
      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-[#0c0c18]">
        <div className="container mx-auto px-4">
          <motion.div
            ref={statsRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              India's Leading Educational Partnership Platform
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Join the ranks of India's most prestigious educational institutions that are already transforming how they deliver education.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              },
              hidden: {}
            }}
          >
            <motion.div
              variants={fadeIn}
              className="flex flex-col items-center"
            >
              <div className="mb-4 w-16 h-16 bg-[#f6c000]/10 rounded-full flex items-center justify-center">
                <Building2 className="h-8 w-8 text-[#f6c000]" />
              </div>
              <CounterAnimation end={200} suffix="+" />
              <p className="text-gray-300 mt-2">Partner Institutions</p>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              className="flex flex-col items-center"
            >
              <div className="mb-4 w-16 h-16 bg-[#f6c000]/10 rounded-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-[#f6c000]" />
              </div>
              <CounterAnimation end={3500} suffix="+" />
              <p className="text-gray-300 mt-2">Courses Offered</p>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              className="flex flex-col items-center"
            >
              <div className="mb-4 w-16 h-16 bg-[#f6c000]/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-[#f6c000]" />
              </div>
              <CounterAnimation end={1.8} suffix="M+" />
              <p className="text-gray-300 mt-2">Students Reached</p>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              className="flex flex-col items-center"
            >
              <div className="mb-4 w-16 h-16 bg-[#f6c000]/10 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-[#f6c000]" />
              </div>
              <CounterAnimation end={65} suffix="%" />
              <p className="text-gray-300 mt-2">Engagement Increase</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Main content tabs */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-2xl md:grid-cols-3">
                <TabsTrigger value="benefits" className="text-sm md:text-base">
                  <Zap className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Partnership Benefits
                </TabsTrigger>
                <TabsTrigger value="programs" className="text-sm md:text-base">
                  <Rocket className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Program Options
                </TabsTrigger>
                <TabsTrigger value="join" className="text-sm md:text-base">
                  <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  How to Join
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Benefits Content */}
            <TabsContent value="benefits">
              <motion.div
                ref={benefitsRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                animate={benefitsInView ? "visible" : "hidden"}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  },
                  hidden: {}
                }}
              >
                {benefits.map((benefit, index) => (
                  <motion.div key={index} variants={fadeIn}>
                    <Tilt
                      tiltMaxAngleX={5}
                      tiltMaxAngleY={5}
                      perspective={1000}
                      scale={1.02}
                      transitionSpeed={1500}
                      className="h-full"
                    >
                      <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                        <CardHeader className="pb-2">
                          <div className="mb-4">{benefit.icon}</div>
                          <CardTitle className="text-xl">{benefit.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300">{benefit.description}</p>
                        </CardContent>
                      </Card>
                    </Tilt>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="text-center mt-12">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={() => setActiveTab("join")}
                  className="bg-[#f6c000] hover:bg-[#e6b000] text-black"
                >
                  Start Your Partnership Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </TabsContent>
            
            {/* Programs Content */}
            <TabsContent value="programs">
              <motion.div
                ref={programsRef}
                className="flex flex-col gap-8"
                initial="hidden"
                animate={programsInView ? "visible" : "hidden"}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.2
                    }
                  },
                  hidden: {}
                }}
              >
                {programOptions.map((program, index) => (
                  <motion.div key={index} variants={fadeIn}>
                    <Card className="border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-2xl text-[#f6c000]">{program.title}</CardTitle>
                        <CardDescription className="text-gray-300 text-lg">
                          {program.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            {program.features.slice(0, 2).map((feature, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <div className="h-5 w-5 mt-0.5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0">
                                  <Check className="h-3 w-3" />
                                </div>
                                <span className="text-gray-200">{feature}</span>
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            {program.features.slice(2).map((feature, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <div className="h-5 w-5 mt-0.5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0">
                                  <Check className="h-3 w-3" />
                                </div>
                                <span className="text-gray-200">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="border-[#f6c000] text-[#f6c000] hover:bg-[#f6c000] hover:text-black">
                          Request Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="bg-gradient-to-r from-purple-900/30 via-[#f6c000]/30 to-purple-900/30 p-6 rounded-xl mt-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Customized Partnership Solutions</h3>
                    <p className="text-gray-300">
                      Beyond these standard options, we offer tailored partnerships designed to address your institution's unique challenges and opportunities.
                    </p>
                  </div>
                  <Button 
                    className="bg-[#f6c000] hover:bg-[#e6b000] text-black whitespace-nowrap"
                    onClick={() => setActiveTab("join")}
                  >
                    Discuss Custom Options
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* How to Join Content */}
            <TabsContent value="join">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-white mb-4">Partnership Process</h2>
                  <p className="text-gray-300">
                    Join escool.ai in just a few steps. Our streamlined process ensures a smooth onboarding experience.
                  </p>
                </div>
                
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#f6c000] via-purple-500 to-[#f6c000]/50 transform -translate-x-1/2"></div>
                  
                  <div className="space-y-12">
                    {[
                      {
                        title: "Submit Application",
                        description: "Fill out our partnership application form with information about your institution and goals.",
                        icon: <Send className="h-6 w-6 text-[#0a0b15]" />
                      },
                      {
                        title: "Consultation",
                        description: "Our team will contact you to discuss your specific needs and partnership options.",
                        icon: <MessageSquare className="h-6 w-6 text-[#0a0b15]" />
                      },
                      {
                        title: "Custom Proposal",
                        description: "Receive a tailored partnership proposal designed to meet your institution's objectives.",
                        icon: <BookOpen className="h-6 w-6 text-[#0a0b15]" />
                      },
                      {
                        title: "Onboarding",
                        description: "Once approved, our dedicated team will guide you through the implementation process.",
                        icon: <Rocket className="h-6 w-6 text-[#0a0b15]" />
                      }
                    ].map((step, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-start gap-8">
                          <div className="relative flex items-center justify-center z-10">
                            <div className="w-16 h-16 rounded-full bg-[#f6c000] flex items-center justify-center shadow-lg">
                              {step.icon}
                            </div>
                          </div>
                          
                          <motion.div 
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex-1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <h3 className="text-xl font-semibold text-white mb-2">
                              Step {index + 1}: {step.title}
                            </h3>
                            <p className="text-gray-300">{step.description}</p>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center mt-12">
                  <Button 
                    size="lg" 
                    className="bg-[#f6c000] hover:bg-[#e6b000] text-black"
                    onClick={scrollToPartners}
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Why escool Section */}
      <section className="py-16 md:py-24 bg-[#0a0b15] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            ref={whyEscoolRef}
            initial="hidden"
            animate={whyEscoolInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <Badge className="mb-4 bg-[#f6c000]/20 text-[#f6c000]">
                Our Difference
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Why Partner with <span className="text-[#f6c000]">escool.ai</span>?
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Our platform is uniquely designed to address the challenges and opportunities facing Indian educational institutions today.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyEscoolReasons.map((reason, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="bg-white/5 rounded-lg p-6 border border-white/10 hover:border-[#f6c000]/30 transition-all duration-300 hover:bg-gradient-to-br hover:from-[#0c0c18] hover:to-[#0f1025]"
                >
                  <div className="bg-[#f6c000]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                  <p className="text-gray-400">{reason.description}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={fadeIn} className="mt-12 flex justify-center">
              <Button 
                size="lg" 
                className="bg-[#f6c000] hover:bg-[#e6b000] text-black"
                onClick={scrollToPartners}
              >
                Become a Partner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <WaveDivider className="text-[#0c0c18] mt-16" />
      </section>
      
      {/* Collaboration Opportunities Section */}
      <section className="py-12 md:py-24 bg-[#0c0c18] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            ref={collaborationRef}
            initial="hidden"
            animate={collaborationInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <Badge className="mb-4 bg-[#f6c000]/20 text-[#f6c000]">
                <Handshake className="mr-1 h-3 w-3" />
                Collaborative Opportunities
              </Badge>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Join forces with escool.ai to create groundbreaking educational experiences and expand your institution's impact.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex flex-col gap-8">
              {collaborationOptions.map((option, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="relative"
                >
                  <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-5 hover:border-[#f6c000]/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-[#f6c000]/10 p-2 rounded-lg">
                        {option.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white">{option.title}</h3>
                    </div>
                    
                    <p className="text-gray-400 mb-4 text-sm md:text-base">{option.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {option.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-[#f6c000] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-xs md:text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/10 mt-2">
                      Learn More
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="hidden md:block">
              <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                {collaborationOptions.map((option, index) => (
                  <motion.div 
                    key={`desktop-${index}`}
                    variants={fadeIn}
                    className="relative hidden md:block"
                  >
                    <Tilt
                      tiltMaxAngleX={5}
                      tiltMaxAngleY={5}
                      perspective={1000}
                      scale={1.02}
                      transitionSpeed={1500}
                      className="h-full"
                    >
                      <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-[#f6c000]/30 transition-all duration-300">
                        <div className="mb-4">{option.icon}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                        <p className="text-gray-400 mb-6">{option.description}</p>
                        
                        <div className="space-y-2 mb-6">
                          {option.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-[#f6c000] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                          Learn More
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </Tilt>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
        <WaveDivider className="text-[#0a0b15] mt-12 md:mt-16" />
      </section>
      
      {/* Networking Benefits Section */}
      <section className="py-16 md:py-24 bg-[#0a0b15] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            ref={networkingRef}
            initial="hidden"
            animate={networkingInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="max-w-7xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <Badge className="mb-4 bg-[#f6c000]/20 text-[#f6c000]">
                <Network className="mr-1 h-3 w-3" />
                Networking Benefits
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Connect with India's Educational Ecosystem
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Gain access to a powerful network of educational institutions, industry partners, and innovation leaders across India.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {networkingBenefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="flex gap-6"
                >
                  <div className="bg-[#f6c000]/10 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        <WaveDivider className="text-[#0c0c18] mt-16" />
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-[#0c0c18] relative overflow-hidden">
        <WaveDivider className="text-[#0a0b15] absolute top-0 left-0 right-0" />
        
        <motion.div
          ref={testimonialRef}
          className="container mx-auto px-4 max-w-6xl relative z-10"
          initial={{ opacity: 0 }}
          animate={testimonialInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#f6c000]/20 text-[#f6c000] hover:bg-[#f6c000]/30">
              <Star className="mr-1 h-3 w-3" />
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Hear from Our Partners
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Leading institutions across India have transformed their educational approach with escool.ai.
            </p>
          </div>
          
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#f6c000]">
                    <img 
                      src={testimonials[currentTestimonial].avatar} 
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#f6c000] text-[#f6c000]" />
                      ))}
                    </div>
                    
                    <blockquote className="text-xl italic text-gray-200 mb-6 relative">
                      <span className="absolute -top-4 -left-2 text-4xl text-[#f6c000] opacity-50">"</span>
                      {testimonials[currentTestimonial].quote}
                      <span className="absolute -bottom-4 -right-2 text-4xl text-[#f6c000] opacity-50">"</span>
                    </blockquote>
                    
                    <div>
                      <p className="font-semibold text-white text-lg">{testimonials[currentTestimonial].name}</p>
                      <p className="text-gray-400">{testimonials[currentTestimonial].position}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentTestimonial === index ? "bg-[#f6c000]" : "bg-gray-600 hover:bg-gray-400"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-center">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="flex justify-center">
                <img 
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </motion.div>
        
        <WaveDivider className="text-[#0a0b15] absolute bottom-0 left-0 right-0 inverted" />
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] z-0"></div>
        
        <motion.div
          ref={faqRef}
          className="container mx-auto px-4 max-w-4xl relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Get answers to common questions about partnering with escool.ai.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm">
                <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium text-white hover:text-[#f6c000]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-4">
              Don't see your question here?
            </p>
            <Button 
              variant="outline" 
              className="border-[#f6c000] text-[#f6c000] hover:bg-[#f6c000] hover:text-black"
            >
              Contact Our Team
            </Button>
          </div>
        </motion.div>
      </section>
      
      {/* Partnership Application Form */}
      <section
        ref={partnersRef}
        id="become-partner"
        className="py-16 md:py-24 bg-[#0c0c18] relative"
      >
        <WaveDivider className="text-[#0a0b15] absolute top-0 left-0 right-0" />
        
        <motion.div
          ref={formRef}
          className="container mx-auto px-4 max-w-6xl relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#f6c000]/20 text-[#f6c000] hover:bg-[#f6c000]/30">
              <Rocket className="mr-1 h-3 w-3" />
              Limited Spots Available
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Apply for Partnership
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Submit your institution's information to start the partnership process. Our team will contact you to discuss next steps.
            </p>
          </div>
          
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="institutionName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Delhi College of Engineering" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="institutionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select institution type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="university">University</SelectItem>
                              <SelectItem value="college">College</SelectItem>
                              <SelectItem value="institute">Institute</SelectItem>
                              <SelectItem value="school">School</SelectItem>
                              <SelectItem value="edtech">EdTech Company</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Dr. Rajesh Sharma" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. info@yourinstitution.edu" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. +91 98765 43210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. New Delhi" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Delhi" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="yearFounded"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year Founded *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 1982" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="enrollmentSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Student Enrollment Size *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select enrollment size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under500">Under 500</SelectItem>
                              <SelectItem value="500-1000">500-1,000</SelectItem>
                              <SelectItem value="1000-5000">1,000-5,000</SelectItem>
                              <SelectItem value="5000-10000">5,000-10,000</SelectItem>
                              <SelectItem value="10000-20000">10,000-20,000</SelectItem>
                              <SelectItem value="over20000">Over 20,000</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="interestAreas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Areas of Interest *</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {[
                            "Digital Curriculum",
                            "Online Degree Programs",
                            "Faculty Training",
                            "Student Engagement",
                            "AI Education Tools",
                            "Analytics & Insights",
                            "Career Services",
                            "Educational Content",
                            "Research Collaboration"
                          ].map((area) => (
                            <div key={area} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={area}
                                value={area}
                                className="h-4 w-4"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const checked = e.target.checked;
                                  
                                  if (checked) {
                                    field.onChange([...(field.value || []), value]);
                                  } else {
                                    field.onChange(
                                      field.value?.filter((val) => val !== value) || []
                                    );
                                  }
                                }}
                                checked={field.value?.includes(area) || false}
                              />
                              <label htmlFor={area} className="text-sm text-gray-300">
                                {area}
                              </label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="partnershipGoals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partnership Goals and Objectives *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please share what you hope to achieve through this partnership..."
                            className="h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="heardFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How did you hear about us?</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Conference, Recommendation, Search" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <Button type="button" variant="outline" className="border-white/20 text-white">
                      Save Draft
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#f6c000] hover:bg-[#e6b000] text-black"
                      size="lg"
                    >
                      Submit Application
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#f6c000]/20 flex items-center justify-center">
                <Zap className="h-8 w-8 text-[#f6c000]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Fast-Track Your Application</h3>
                <p className="text-gray-300">
                  Want to discuss partnership options right away? Schedule a direct consultation with our partnerships team to explore opportunities immediately.
                </p>
              </div>
              <Button className="whitespace-nowrap bg-purple-600 hover:bg-purple-700">
                <Globe className="mr-2 h-4 w-4" />
                Schedule Call
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Connect with Us Section */}
      <section className="py-16 md:py-24 bg-[#0a0b15] relative overflow-hidden">
        <motion.div
          ref={contactRef}
          className="container mx-auto px-4 max-w-7xl"
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
          variants={staggerChildren}
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <Badge className="mb-4 bg-[#f6c000]/20 text-[#f6c000]">
              <MessageSquare className="mr-1 h-3 w-3" />
              Connect with Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Get in Touch with Our Partnership Team
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Have questions or want to discuss partnership opportunities directly? Our dedicated team is ready to assist you.
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#f6c000]/30 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#f6c000]/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-[#f6c000]" />
                </div>
                <CardTitle className="text-white">Call Us</CardTitle>
                <CardDescription className="text-gray-400">
                  Speak directly with our partnership team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#f6c000] font-semibold text-lg">
                  {contactInfo.phone}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Available Monday to Friday, 9am - 6pm IST
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Schedule a Call
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#f6c000]/30 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#f6c000]/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-[#f6c000]" />
                </div>
                <CardTitle className="text-white">Email Us</CardTitle>
                <CardDescription className="text-gray-400">
                  Send us your inquiry anytime
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#f6c000] font-semibold text-lg break-all">
                  {contactInfo.email}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  We typically respond within 24 hours
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10" asChild>
                  <a href={`mailto:${contactInfo.email}`}>
                    Send Email
                  </a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#f6c000]/30 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#f6c000]/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-[#f6c000]" />
                </div>
                <CardTitle className="text-white">Visit Us</CardTitle>
                <CardDescription className="text-gray-400">
                  Stop by our headquarters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white font-medium">
                  {contactInfo.address}
                </p>
                <div className="flex gap-3 mt-4">
                  {contactInfo.socialLinks.map((link, index) => (
                    <Button key={index} size="icon" variant="outline" className="rounded-full border-white/20 h-10 w-10 p-0" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <Link2 className="h-4 w-4" />
                        <span className="sr-only">{link.name}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Get Directions
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-16 md:py-24 relative bg-gradient-to-b from-[#0c0c18] to-[#0a0b15]">
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <div className="mb-8">
            <GraduationCap className="h-16 w-16 text-[#f6c000] mx-auto mb-6" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Shape the Future of Education in India
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join forces with escool.ai to transform educational experiences and create new opportunities for students across the nation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#f6c000] hover:bg-[#e6b000] text-black text-lg px-8"
              onClick={scrollToPartners}
            >
              Apply for Partnership
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white text-lg px-8"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Download Brochure
            </Button>
          </div>
          
          <div className="mt-16 flex justify-center gap-2 text-white">
            <p>Have questions? Contact us at</p>
            <a href="mailto:partnerships@escool.ai" className="text-[#f6c000] hover:underline">
              partnerships@escool.ai
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}