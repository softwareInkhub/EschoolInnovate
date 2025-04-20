import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle, Plus, Minus, Search, MapPin, Users, BookOpen, CheckCircle2, PieChart,
  Lightbulb, GraduationCap, Code, Brush, Zap, Award, Building2, Verified, Blocks,
  XCircle, CircleDashed, Briefcase, Sprout, BarChart3, Building, X, ChevronLeft
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  
  const allFaqs = [
    {
      category: "General",
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          id: "what-is-eschool",
          question: "What is eSchool.ai?",
          answer: (
            <div className="space-y-4">
              <p>
                eSchool.ai is India's premier platform that brings together innovators, entrepreneurs, and skilled professionals to collaborate on startups and innovative projects. We're creating a unique ecosystem where ideas meet talent, and dreams transform into successful ventures.
              </p>
              <p>
                Our platform serves two primary purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>A marketplace for startup ideas where entrepreneurs can list their projects and find the perfect team members</li>
                <li>A learning hub with various schools (tech, business, design) where members can acquire new skills relevant to today's startup ecosystem</li>
              </ul>
              <p>
                eSchool.ai is designed to address the unique challenges of the Indian startup ecosystem by facilitating meaningful connections and providing resources for growth.
              </p>
            </div>
          )
        },
        {
          id: "how-is-it-different",
          question: "How is eSchool.ai different from other platforms?",
          answer: (
            <div className="space-y-4">
              <p>
                eSchool.ai stands apart from other platforms in several key ways:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-muted/30 p-4 rounded-lg flex items-start">
                  <MapPin className="h-5 w-5 text-[#f6c000] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">India-Focused</h4>
                    <p className="text-sm text-muted-foreground">Built specifically addressing challenges faced by Indian entrepreneurs and startups</p>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg flex items-start">
                  <Users className="h-5 w-5 text-[#f6c000] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Dual Purpose</h4>
                    <p className="text-sm text-muted-foreground">Combines team building with skill development in one integrated platform</p>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg flex items-start">
                  <BookOpen className="h-5 w-5 text-[#f6c000] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Educational Component</h4>
                    <p className="text-sm text-muted-foreground">Structured learning paths to develop skills needed in today's startup environment</p>
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#f6c000] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Quality Assurance</h4>
                    <p className="text-sm text-muted-foreground">Verification processes to ensure high-quality projects and team members</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "who-can-use",
          question: "Who can use eSchool.ai?",
          answer: (
            <div className="space-y-4">
              <p>
                eSchool.ai is designed for a diverse range of individuals within the Indian innovation ecosystem:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-[#f6c000] text-xs font-bold">1</span>
                  </div>
                  <div>
                    <span className="font-medium">Entrepreneurs & Innovators</span> - People with startup ideas looking to build teams
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-[#f6c000] text-xs font-bold">2</span>
                  </div>
                  <div>
                    <span className="font-medium">Professionals & Freelancers</span> - Skilled individuals looking to join promising startups
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-[#f6c000] text-xs font-bold">3</span>
                  </div>
                  <div>
                    <span className="font-medium">Students & Graduates</span> - Young talent seeking hands-on startup experience
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-[#f6c000] text-xs font-bold">4</span>
                  </div>
                  <div>
                    <span className="font-medium">Mentors & Advisors</span> - Experienced professionals willing to guide new ventures
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-[#f6c000] text-xs font-bold">5</span>
                  </div>
                  <div>
                    <span className="font-medium">Investors</span> - People looking to support promising Indian startups
                  </div>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground italic mt-4">
                Note: While eSchool.ai is focused on the Indian startup ecosystem, we welcome participants from around the world interested in connecting with Indian innovation.
              </p>
            </div>
          )
        },
        {
          id: "does-it-cost",
          question: "Does it cost anything to use eSchool.ai?",
          answer: (
            <div className="space-y-4">
              <p>
                eSchool.ai offers a tiered membership structure to accommodate different needs:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <h4 className="font-medium text-lg mb-2">Free Membership</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Browse projects and teams</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Create a basic profile</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Apply to 3 projects monthly</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Access basic learning resources</span>
                    </li>
                  </ul>
                  <p className="text-lg font-bold text-center">₹0</p>
                </div>
                
                <div className="border border-primary/50 rounded-lg p-4 bg-primary/5 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                  <h4 className="font-medium text-lg mb-2">Premium Membership</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>All Free features</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Create and manage projects</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Unlimited applications</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Full access to all schools</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Priority matching algorithm</span>
                    </li>
                  </ul>
                  <p className="text-lg font-bold text-primary text-center">₹499/month</p>
                </div>
                
                <div className="border border-[#f6c000]/50 rounded-lg p-4 bg-[#f6c000]/5">
                  <h4 className="font-medium text-lg mb-2">Startup Package</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>All Premium features</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Investor introduction</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Dedicated mentorship</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Team of 5 included</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Promotional opportunities</span>
                    </li>
                  </ul>
                  <p className="text-lg font-bold text-[#f6c000] text-center">₹2,999/month</p>
                </div>
              </div>
              <p className="text-sm text-center mt-4">
                We also offer special discounts for students and educational institutions across India. 
                <span className="text-primary font-medium ml-1 cursor-pointer hover:underline">Contact us</span> to learn more.
              </p>
            </div>
          )
        },
      ]
    },
    {
      category: "Projects & Ideas",
      icon: <Lightbulb className="h-5 w-5" />,
      questions: [
        {
          id: "find-team-members",
          question: "How can I find quality team members for my project?",
          answer: (
            <div className="space-y-4">
              <p>
                Finding the right team members for your startup is crucial for success. eSchool.ai helps you connect with qualified professionals through:
              </p>
              <ol className="space-y-4 mt-4">
                <li className="flex">
                  <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">1</div>
                  <div>
                    <h4 className="font-medium">Detailed Project Listing</h4>
                    <p className="text-muted-foreground text-sm">Create a comprehensive project profile specifying your idea, vision, and required roles with specific skills. The more detailed your listing, the better matches you'll find.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">2</div>
                  <div>
                    <h4 className="font-medium">AI-Powered Matching</h4>
                    <p className="text-muted-foreground text-sm">Our platform uses advanced algorithms to suggest potential team members based on skills, experience, and compatibility with your project needs.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">3</div>
                  <div>
                    <h4 className="font-medium">Application Review</h4>
                    <p className="text-muted-foreground text-sm">Review applications from interested candidates, examine their profiles, portfolios, and previous work to assess their fit.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">4</div>
                  <div>
                    <h4 className="font-medium">Virtual Interviews</h4>
                    <p className="text-muted-foreground text-sm">Conduct virtual interviews with potential team members directly through our platform to discuss your vision and their role.</p>
                  </div>
                </li>
              </ol>
              <div className="bg-muted/30 p-4 rounded-lg mt-4">
                <h4 className="font-medium flex items-center text-[#f6c000]">
                  <MapPin className="h-4 w-4 mr-2" />
                  India-Specific Advantage
                </h4>
                <p className="text-sm mt-1">
                  Our platform is particularly strong in connecting you with talent across different regions of India, from major tech hubs to emerging talent pools in Tier 2 and Tier 3 cities. This allows you to build diverse teams with complementary skill sets and perspectives.
                </p>
              </div>
            </div>
          )
        },
        {
          id: "join-project",
          question: "How do I join a project?",
          answer: (
            <div className="space-y-4">
              <p>
                Joining an exciting startup project on eSchool.ai is straightforward:
              </p>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="border border-border rounded-lg p-4 flex">
                  <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-[#f6c000] flex items-center justify-center text-black font-medium">1</div>
                  <div>
                    <h4 className="font-medium">Find Projects That Interest You</h4>
                    <p className="text-sm text-muted-foreground mt-1">Browse through available projects using filters for industry, location within India, required skills, and project stage.</p>
                  </div>
                </div>
                <div className="border border-border rounded-lg p-4 flex">
                  <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-[#f6c000] flex items-center justify-center text-black font-medium">2</div>
                  <div>
                    <h4 className="font-medium">Review Project Details</h4>
                    <p className="text-sm text-muted-foreground mt-1">Examine the project's mission, team structure, commitment expectations, and whether it aligns with your interests and career goals.</p>
                  </div>
                </div>
                <div className="border border-border rounded-lg p-4 flex">
                  <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-[#f6c000] flex items-center justify-center text-black font-medium">3</div>
                  <div>
                    <h4 className="font-medium">Submit an Application</h4>
                    <p className="text-sm text-muted-foreground mt-1">Apply through our platform with your profile, highlighting relevant skills and explaining why you'd be a good fit for the specific role.</p>
                  </div>
                </div>
                <div className="border border-border rounded-lg p-4 flex">
                  <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-[#f6c000] flex items-center justify-center text-black font-medium">4</div>
                  <div>
                    <h4 className="font-medium">Interview Process</h4>
                    <p className="text-sm text-muted-foreground mt-1">If selected, you'll be invited to interview with the project founder or team leads to discuss the opportunity further.</p>
                  </div>
                </div>
                <div className="border border-border rounded-lg p-4 flex">
                  <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-[#f6c000] flex items-center justify-center text-black font-medium">5</div>
                  <div>
                    <h4 className="font-medium">Join the Team</h4>
                    <p className="text-sm text-muted-foreground mt-1">Upon acceptance, you'll gain access to the project's workspace, communication channels, and resources to begin contributing.</p>
                  </div>
                </div>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg mt-2">
                <p className="text-sm italic">
                  <span className="font-semibold">Pro Tip:</span> Customize each application for the specific project and highlight any experience you have that's relevant to India's unique market conditions and challenges.
                </p>
              </div>
            </div>
          )
        },
        {
          id: "get-started",
          question: "How do I get started with a new team?",
          answer: (
            <div className="space-y-4">
              <p>
                After forming or joining a team on eSchool.ai, here's how to effectively get started:
              </p>
              
              <div className="mt-4 space-y-6">
                <div>
                  <h4 className="font-medium text-lg mb-2 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 text-[#f6c000]">1</div>
                    Onboarding Process
                  </h4>
                  <ul className="ml-11 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Complete your team profile with all member details and roles</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Set up communication channels (platform chat, optional external tools)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Schedule an initial kickoff meeting with all team members</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 text-[#f6c000]">2</div>
                    Project Planning
                  </h4>
                  <ul className="ml-11 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Refine project vision and objectives with team input</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Create a roadmap with clear milestones and timelines</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Assign initial tasks based on individual strengths</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 text-[#f6c000]">3</div>
                    Team Building
                  </h4>
                  <ul className="ml-11 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Establish regular meeting cadence (daily/weekly updates)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Create team norms and communication protocols</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Consider virtual team-building activities for remote teams</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-[#f6c000]/5 p-4 rounded-lg border border-[#f6c000]/20 mt-4">
                <h4 className="font-medium flex items-center mb-2">
                  <MapPin className="h-5 w-5 mr-2 text-[#f6c000]" />
                  India-Specific Resources
                </h4>
                <p className="text-sm">
                  eSchool.ai provides specialized resources for Indian startups including:
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm flex items-center">
                    <PieChart className="h-4 w-4 text-[#f6c000] mr-2" />
                    <span>Templates for Indian business registration and compliance</span>
                  </li>
                  <li className="text-sm flex items-center">
                    <PieChart className="h-4 w-4 text-[#f6c000] mr-2" />
                    <span>Access to mentors familiar with specific Indian market segments</span>
                  </li>
                  <li className="text-sm flex items-center">
                    <PieChart className="h-4 w-4 text-[#f6c000] mr-2" />
                    <span>Region-specific market insights and consumer behavior data</span>
                  </li>
                </ul>
              </div>
            </div>
          )
        },
        {
          id: "equity-arrangements",
          question: "How are equity arrangements handled?",
          answer: (
            <div className="space-y-4">
              <p>
                Equity distribution is a critical aspect of any startup. eSchool.ai facilitates fair and transparent equity arrangements through:
              </p>
              
              <div className="bg-muted/30 p-5 rounded-lg mt-4">
                <h4 className="font-medium text-lg mb-3">Platform Guidance and Tools</h4>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0 text-primary">1</div>
                    <div>
                      <h5 className="font-medium">Equity Templates</h5>
                      <p className="text-sm text-muted-foreground">We provide standard equity agreement templates tailored for Indian startups that comply with local regulations.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0 text-primary">2</div>
                    <div>
                      <h5 className="font-medium">Equity Calculator</h5>
                      <p className="text-sm text-muted-foreground">Our built-in calculator helps determine fair equity splits based on various factors like role, experience, time commitment, and capital contribution.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0 text-primary">3</div>
                    <div>
                      <h5 className="font-medium">Vesting Schedule Creator</h5>
                      <p className="text-sm text-muted-foreground">Tools to establish vesting schedules with customizable cliff periods and milestones specific to your project's needs.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 flex-shrink-0 text-primary">4</div>
                    <div>
                      <h5 className="font-medium">Legal Resource Network</h5>
                      <p className="text-sm text-muted-foreground">Access to legal professionals across India who specialize in startup equity structures at preferred rates for members.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-lg mb-3">Best Practices We Recommend</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-border p-4 rounded-lg">
                    <h5 className="font-medium flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      Founder-Friendly Vesting
                    </h5>
                    <p className="text-sm mt-1">
                      Standard 4-year vesting with a 1-year cliff, adjusted for Indian startup timelines and milestones.
                    </p>
                  </div>
                  <div className="border border-border p-4 rounded-lg">
                    <h5 className="font-medium flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      Clear Documentation
                    </h5>
                    <p className="text-sm mt-1">
                      Formalize all equity arrangements in writing, with proper legal review before implementation.
                    </p>
                  </div>
                  <div className="border border-border p-4 rounded-lg">
                    <h5 className="font-medium flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      Dynamic Equity Splits
                    </h5>
                    <p className="text-sm mt-1">
                      Consider contribution-based equity that adjusts based on ongoing involvement and milestone achievement.
                    </p>
                  </div>
                  <div className="border border-border p-4 rounded-lg">
                    <h5 className="font-medium flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      Regular Reviews
                    </h5>
                    <p className="text-sm mt-1">
                      Schedule quarterly equity reviews to ensure fairness as the project evolves and roles change.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#f6c000]/5 p-4 rounded-lg border border-[#f6c000]/20 mt-6">
                <p className="text-sm italic">
                  <span className="font-semibold">Important Note:</span> While eSchool.ai provides tools and guidance, we recommend consulting with a legal professional familiar with Indian startup law before finalizing any equity arrangements. Regulations vary across states in India and are subject to change.
                </p>
              </div>
            </div>
          )
        },
      ]
    },
    {
      category: "Learning & Development",
      icon: <GraduationCap className="h-5 w-5" />,
      questions: [
        {
          id: "learning-schools",
          question: "What learning schools are available on eSchool.ai?",
          answer: (
            <div className="space-y-4">
              <p>
                eSchool.ai offers a diverse range of specialized schools to help you develop skills crucial for success in India's startup ecosystem:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors group">
                  <div className="h-32 bg-gradient-to-r from-purple-900 to-primary flex items-center justify-center">
                    <Code className="h-12 w-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-lg mb-2">Tech School</h4>
                    <p className="text-sm text-muted-foreground mb-3">Master technical skills essential for building innovative products.</p>
                    <div className="space-y-1 mb-4">
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Full-stack web & mobile development</span>
                      </div>
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>AI, ML & data science fundamentals</span>
                      </div>
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Cloud architecture & DevOps</span>
                      </div>
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Blockchain & Web3 applications</span>
                      </div>
                    </div>
                    <div className="text-xs flex items-center text-muted-foreground">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span>25,000+ enrolled students from across India</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors group">
                  <div className="h-32 bg-gradient-to-r from-blue-900 to-blue-500 flex items-center justify-center">
                    <PieChart className="h-12 w-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-lg mb-2">Business School</h4>
                    <p className="text-sm text-muted-foreground mb-3">Develop entrepreneurial mindset and business acumen.</p>
                    <div className="space-y-1 mb-4">
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Startup fundamentals & lean methodology</span>
                      </div>
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Indian market analysis & strategy</span>
                      </div>
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Financial planning & funding options</span>
                      </div>
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Marketing & customer acquisition</span>
                      </div>
                    </div>
                    <div className="text-xs flex items-center text-muted-foreground">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span>18,500+ enrolled students from across India</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors group">
                  <div className="h-32 bg-gradient-to-r from-green-900 to-green-500 flex items-center justify-center">
                    <Brush className="h-12 w-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-lg mb-2">Design School</h4>
                    <p className="text-sm text-muted-foreground mb-3">Create user-centric products with compelling interfaces.</p>
                    <div className="space-y-1 mb-4">
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>UI/UX design principles & practices</span>
                      </div>
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Design thinking & user research</span>
                      </div>
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Visual design & brand identity</span>
                      </div>
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Prototyping & interaction design</span>
                      </div>
                    </div>
                    <div className="text-xs flex items-center text-muted-foreground">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span>12,000+ enrolled students from across India</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-colors group">
                  <div className="h-32 bg-gradient-to-r from-orange-900 to-orange-500 flex items-center justify-center">
                    <Zap className="h-12 w-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-lg mb-2">Innovation School</h4>
                    <p className="text-sm text-muted-foreground mb-3">Develop creative problem-solving and innovation mindset.</p>
                    <div className="space-y-1 mb-4">
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Creative problem-solving techniques</span>
                      </div>
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Product innovation & ideation</span>
                      </div>
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Frugal innovation (Jugaad)</span>
                      </div>
                      <div className="text-xs flex items-center">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 flex-shrink-0" />
                        <span>Market adaptation strategies</span>
                      </div>
                    </div>
                    <div className="text-xs flex items-center text-muted-foreground">
                      <Users className="h-3.5 w-3.5 mr-1" />
                      <span>10,500+ enrolled students from across India</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-lg mb-3">India-Specific Learning Paths</h4>
                <div className="bg-[#f6c000]/5 p-4 rounded-lg border border-[#f6c000]/20">
                  <p className="text-sm">
                    In addition to our core schools, we offer specialized learning paths focused on India's unique market opportunities:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="text-sm flex items-start">
                      <MapPin className="h-4 w-4 text-[#f6c000] mr-2 mt-0.5 flex-shrink-0" />
                      <span><span className="font-medium">Rural Tech Solutions</span> - Building for Bharat: Developing solutions for India's rural markets</span>
                    </li>
                    <li className="text-sm flex items-start">
                      <MapPin className="h-4 w-4 text-[#f6c000] mr-2 mt-0.5 flex-shrink-0" />
                      <span><span className="font-medium">Vernacular Technology</span> - Creating products for India's diverse linguistic landscape</span>
                    </li>
                    <li className="text-sm flex items-start">
                      <MapPin className="h-4 w-4 text-[#f6c000] mr-2 mt-0.5 flex-shrink-0" />
                      <span><span className="font-medium">Digital India Initiatives</span> - Aligning startups with government digital transformation programs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "certification",
          question: "Are the courses certified? Will they help my career?",
          answer: (
            <div className="space-y-4">
              <p>
                eSchool.ai's courses are designed to provide both practical skills and recognized credentials that can significantly boost your career prospects in India's competitive startup ecosystem.
              </p>
              
              <div className="mt-4">
                <h4 className="font-medium text-lg mb-3">Certification System</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-medium flex items-center mb-2">
                      <Award className="h-5 w-5 text-[#f6c000] mr-2" />
                      eSchool.ai Credentials
                    </h5>
                    <p className="text-sm">
                      Upon course completion, you'll receive eSchool.ai digital certificates that outline specific skills mastered and projects completed. These can be shared directly to LinkedIn or other professional platforms.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-medium flex items-center mb-2">
                      <Building2 className="h-5 w-5 text-[#f6c000] mr-2" />
                      Industry Partnerships
                    </h5>
                    <p className="text-sm">
                      We've partnered with leading Indian companies and industry associations to ensure our certifications are recognized and valued by employers across the country.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-medium flex items-center mb-2">
                      <Verified className="h-5 w-5 text-[#f6c000] mr-2" />
                      Skill Verification
                    </h5>
                    <p className="text-sm">
                      Our certifications include skill verification through practical assessments and real-world projects, making them more valuable than traditional knowledge-based certificates.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h5 className="font-medium flex items-center mb-2">
                      <Blocks className="h-5 w-5 text-[#f6c000] mr-2" />
                      Blockchain Certificates
                    </h5>
                    <p className="text-sm">
                      All certificates are secured using blockchain technology, ensuring they're tamper-proof and can be independently verified by employers.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-lg mb-3">Career Impact</h4>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-3 border-b border-border">
                    <div className="p-3 font-medium text-sm border-r border-border">Benefit</div>
                    <div className="p-3 font-medium text-sm border-r border-border">Traditional Courses</div>
                    <div className="p-3 font-medium text-sm">eSchool.ai Courses</div>
                  </div>
                  
                  <div className="grid grid-cols-3 border-b border-border">
                    <div className="p-3 text-sm border-r border-border">Portfolio Building</div>
                    <div className="p-3 text-sm border-r border-border">
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="p-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 border-b border-border">
                    <div className="p-3 text-sm border-r border-border">Industry Relevance</div>
                    <div className="p-3 text-sm border-r border-border">
                      <CircleDashed className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="p-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 border-b border-border">
                    <div className="p-3 text-sm border-r border-border">Network Building</div>
                    <div className="p-3 text-sm border-r border-border">
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="p-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 border-b border-border">
                    <div className="p-3 text-sm border-r border-border">Team Experience</div>
                    <div className="p-3 text-sm border-r border-border">
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="p-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3">
                    <div className="p-3 text-sm border-r border-border">Startup Readiness</div>
                    <div className="p-3 text-sm border-r border-border">
                      <CircleDashed className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="p-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mt-6">
                <h4 className="font-medium mb-2">India Advantage</h4>
                <p className="text-sm">
                  Our courses are specifically designed to address skills gaps in India's job market, with particular focus on emerging sectors like fintech, healthtech, edtech, and clean energy. According to our research, professionals with eSchool.ai certifications show a 32% higher interview success rate and 28% higher starting salaries when applying to Indian startups.
                </p>
              </div>
              
              <blockquote className="border-l-4 border-[#f6c000] pl-4 italic text-muted-foreground mt-6">
                <p className="text-sm">
                  "The practical, project-based learning at eSchool.ai helped me transition from a traditional IT role to leading product development at a fintech startup in Bangalore. The certification was valuable, but the actual skills and connections I gained were invaluable."
                </p>
                <footer className="text-sm font-medium mt-2">
                  - Priya Sharma, Product Manager at PayNow India
                </footer>
              </blockquote>
            </div>
          )
        },
      ]
    },
    {
      category: "Funding & Investment",
      icon: <Briefcase className="h-5 w-5" />,
      questions: [
        {
          id: "funding-opportunities",
          question: "What funding opportunities are available through eSchool.ai?",
          answer: (
            <div className="space-y-4">
              <p>
                eSchool.ai connects promising Indian startups with funding opportunities through several channels designed to address different stages of growth:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-card border border-border rounded-lg p-5 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <Sprout className="h-6 w-6 text-green-500" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Seed Funding</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Early-stage funding for concept validation and initial market entry.
                  </p>
                  <ul className="space-y-2">
                    <li className="text-xs flex items-start">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Monthly pitch competitions with prizes up to ₹10 lakh</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Angel investor network with focus on early-stage Indian startups</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Connections to government startup grants and schemes</span>
                    </li>
                  </ul>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Typical range: ₹5 lakh - ₹50 lakh
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-5 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Growth Capital</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Funding for startups with proven traction ready to scale operations.
                  </p>
                  <ul className="space-y-2">
                    <li className="text-xs flex items-start">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Quarterly investor demo days with institutional investors</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Partnerships with Indian VC firms specializing in Series A</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Preparation and due diligence support for fundraising</span>
                    </li>
                  </ul>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Typical range: ₹1 crore - ₹7 crore
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-5 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-purple-500" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Strategic Partnerships</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Corporate partnerships and joint ventures for established startups.
                  </p>
                  <ul className="space-y-2">
                    <li className="text-xs flex items-start">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Corporate innovation partnerships with Indian conglomerates</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>International expansion support and global investor access</span>
                    </li>
                    <li className="text-xs flex items-start">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>M&A advisory and strategic exit planning</span>
                    </li>
                  </ul>
                  <div className="mt-4 text-xs text-muted-foreground">
                    Strategic partnerships and Series B+ investments
                  </div>
                </div>
              </div>
              
              <div className="bg-[#f6c000]/5 p-5 rounded-lg border border-[#f6c000]/20 mt-6">
                <h4 className="font-medium text-lg mb-3 flex items-center">
                  <MapPin className="h-5 w-5 text-[#f6c000] mr-2" />
                  India-Specific Funding Advantages
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 mt-0.5 text-[#f6c000] text-xs font-bold">1</div>
                    <div>
                      <span className="font-medium">Government Scheme Navigation</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Expert guidance on accessing funding through Startup India, SIDBI, and other government initiatives specifically for Indian entrepreneurs.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 mt-0.5 text-[#f6c000] text-xs font-bold">2</div>
                    <div>
                      <span className="font-medium">Regional Investor Networks</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Connections to regional angel networks and investors in emerging startup hubs like Ahmedabad, Pune, Jaipur, and beyond, not just metro cities.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-[#f6c000]/20 flex items-center justify-center mr-3 mt-0.5 text-[#f6c000] text-xs font-bold">3</div>
                    <div>
                      <span className="font-medium">Diaspora Investment</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Specialized channels to connect with NRI investors and India-focused venture funds operating globally.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-lg mb-3">Funding Success Metrics</h4>
                <div className="flex flex-wrap gap-6 justify-between">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">₹120+ Cr</div>
                    <div className="text-sm text-muted-foreground">Total funding raised</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">180+</div>
                    <div className="text-sm text-muted-foreground">Startups funded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">65%</div>
                    <div className="text-sm text-muted-foreground">Success rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">45+</div>
                    <div className="text-sm text-muted-foreground">Investor partners</div>
                  </div>
                </div>
              </div>
            </div>
          )
        },
      ]
    },
  ];
  
  const filteredFaqs = allFaqs.flatMap(category => 
    category.questions.filter(faq => 
      searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="py-16 md:py-24 bg-[#0a0b15] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-grid-pattern"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
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
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#ccc] mb-8">
            Find answers to common questions about eSchool.ai and how we're transforming India's startup ecosystem
          </p>
          
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              placeholder="Search questions..." 
              className="pl-10 py-6 border-primary/20 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {searchQuery && (
            <div className="mb-6">
              <p className="text-muted-foreground">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} found for "{searchQuery}"
              </p>
            </div>
          )}
          
          {searchQuery === "" ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {allFaqs.map((category, idx) => (
                <motion.div
                  key={idx}
                  className={`p-4 rounded-lg cursor-pointer flex items-center justify-center flex-col text-center border transition-colors
                    ${activeQuestion?.startsWith(category.category.toLowerCase()) 
                      ? 'bg-primary/10 border-primary' 
                      : 'border-border bg-card hover:border-primary/50'
                    }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onClick={() => setActiveQuestion(category.category.toLowerCase())}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                    {category.icon}
                  </div>
                  <h4 className="font-medium">{category.category}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {category.questions.length} questions
                  </p>
                </motion.div>
              ))}
            </div>
          ) : null}
          
          {searchQuery === "" && activeQuestion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground" 
                onClick={() => setActiveQuestion(null)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                All categories
              </Button>
            </motion.div>
          )}
          
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Accordion type="single" collapsible className="w-full">
              {(searchQuery === "" 
                ? allFaqs.find(c => c.category.toLowerCase() === activeQuestion)?.questions || 
                  (activeQuestion === null ? allFaqs.flatMap(c => c.questions) : [])
                : filteredFaqs
              ).map((faq, idx) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <AccordionItem value={faq.id} className="border-b border-border">
                    <AccordionTrigger className="text-lg font-medium py-6 text-white hover:text-primary hover:no-underline transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#ccc]">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            Still have questions? We're here to help.
          </p>
          <Button 
            size="lg" 
            className="bg-[#f6c000] hover:bg-[#e6b000] text-black rounded-md h-12 px-8 text-lg font-medium"
          >
            Contact Support
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQSection;