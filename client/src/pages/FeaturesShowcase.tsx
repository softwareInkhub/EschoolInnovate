import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Rocket, 
  Brain, 
  MessageSquare, 
  Trophy, 
  GraduationCap, 
  HelpCircle,
  ChevronDown,
  Lightbulb,
  CheckSquare,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

// Import our new components
import AnimatedLoader from "@/components/AnimatedLoader";
import ProjectRecommendationEngine from "@/components/ProjectRecommendationEngine";
import ProjectComments from "@/components/ProjectComments";
import AchievementSystem from "@/components/AchievementSystem";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import EducationalContent from "@/components/EducationalContent";

export default function FeaturesShowcase() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("loaders");
  const [showTutorial, setShowTutorial] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="container px-4 mx-auto py-10 max-w-7xl">
      <motion.div 
        className="mb-10"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-3xl font-bold mb-2">escool.ai Platform Features</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Explore the innovative features that make our platform unique. These components enhance user experience and make collaboration more engaging.
        </p>
      </motion.div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
          <TabsTrigger value="loaders" className="data-[state=active]:bg-primary/10">
            <Rocket className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Animated Loaders</span>
            <span className="inline md:hidden">Loaders</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-primary/10">
            <Brain className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">AI Recommendations</span>
            <span className="inline md:hidden">AI</span>
          </TabsTrigger>
          <TabsTrigger value="comments" className="data-[state=active]:bg-primary/10">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Project Comments</span>
            <span className="inline md:hidden">Comments</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-primary/10">
            <Trophy className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Achievement System</span>
            <span className="inline md:hidden">Achievements</span>
          </TabsTrigger>
          <TabsTrigger value="onboarding" className="data-[state=active]:bg-primary/10">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Interactive Onboarding</span>
            <span className="inline md:hidden">Onboarding</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="data-[state=active]:bg-primary/10">
            <GraduationCap className="mr-2 h-4 w-4" />
            <span className="hidden md:inline">Educational Content</span>
            <span className="inline md:hidden">Education</span>
          </TabsTrigger>
        </TabsList>

        {/* Animated Loaders Content */}
        <TabsContent value="loaders" className="space-y-6">
          <FeatureHeader
            title="Animated Loading States"
            description="Playful, context-aware loading animations that engage users during wait times"
            icon={<Rocket className="h-6 w-6" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Startup Loader</CardTitle>
                <CardDescription>Used when loading project creation and startup-related content</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <AnimatedLoader illustration="startup" message="Loading startup data..." />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Idea Loader</CardTitle>
                <CardDescription>Displayed when generating or loading creative content</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <AnimatedLoader illustration="idea" message="Generating ideas..." />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collaboration Loader</CardTitle>
                <CardDescription>Shown when loading team or collaborative features</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <AnimatedLoader illustration="collaboration" message="Loading collaborative space..." />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coding Loader</CardTitle>
                <CardDescription>Appears when loading development-related content</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <AnimatedLoader illustration="coding" message="Loading code snippets..." />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Loader</CardTitle>
                <CardDescription>Used when accessing educational content or courses</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <AnimatedLoader illustration="learning" message="Preparing learning materials..." />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Default Loader</CardTitle>
                <CardDescription>Generic loader used for general loading states</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <AnimatedLoader message="Loading..." />
              </CardContent>
            </Card>
          </div>

          <FeatureAccordion
            items={[
              {
                title: "Why custom loading animations?",
                content: "Custom loading animations improve perceived performance by making wait times more engaging. They also provide context about what's loading, reducing user frustration and increasing platform stickiness."
              },
              {
                title: "Implementation details",
                content: "These loaders are built with Framer Motion for smooth animations and use context-aware illustrations that match the content being loaded. The animations are optimized for performance and include random loading messages for variety."
              },
              {
                title: "Usage guidelines",
                content: "Use these loaders for operations that take more than 300ms. Choose the appropriate loader based on the context (startup, idea, collaboration, etc.) to provide visual continuity with the features being loaded."
              }
            ]}
          />
        </TabsContent>

        {/* AI Recommendations Content */}
        <TabsContent value="ai" className="space-y-6">
          <FeatureHeader
            title="AI-Powered Project Recommendation Engine"
            description="Smart matching algorithm that connects users with relevant projects based on their skills and interests"
            icon={<Brain className="h-6 w-6" />}
          />
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <ProjectRecommendationEngine 
                currentUserSkills={["React", "TypeScript", "UI/UX Design"]}
                currentUserInterests={["Education", "AI/ML"]}
              />
            </CardContent>
          </Card>

          <FeatureAccordion
            items={[
              {
                title: "How does the recommendation system work?",
                content: "The recommendation engine uses a combination of collaborative filtering and content-based filtering. It analyzes user skills, interests, past engagement, and project metadata to suggest the most relevant opportunities. The system continuously improves as users interact with projects."
              },
              {
                title: "Personalization features",
                content: "Users can fine-tune recommendations by adding skills, interests, and preferences including team size, project stage, and time commitment. The system also considers implicit signals like browsing history and application patterns."
              },
              {
                title: "Benefits for project creators and joiners",
                content: "Project creators benefit from higher-quality applications from well-matched collaborators. Project joiners discover opportunities aligned with their skills and interests, increasing successful collaborations and reducing time spent searching for the right project."
              }
            ]}
          />
        </TabsContent>

        {/* Project Comments Content */}
        <TabsContent value="comments" className="space-y-6">
          <FeatureHeader
            title="Collaborative Project Commenting"
            description="Rich discussion system with tagging, solutions marking, and threaded conversations"
            icon={<MessageSquare className="h-6 w-6" />}
          />
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <ProjectComments 
                projectId={1}
                canModerate={true}
              />
            </CardContent>
          </Card>

          <FeatureAccordion
            items={[
              {
                title: "Collaborative features",
                content: "The commenting system includes threaded replies, rich formatting, file attachments, @mentions, and reaction emojis. Comments can be tagged by type (question, feedback, concern, etc.) for easy filtering and organization."
              },
              {
                title: "Moderation capabilities",
                content: "Project owners have additional moderation tools including pinning important comments, marking solutions, hiding/showing comments, and moderate reported content. This helps maintain productive discussions and highlight valuable contributions."
              },
              {
                title: "Integration with workflows",
                content: "Comments are integrated with project workflows, allowing users to create tasks, update milestones, or assign work directly from discussions. Notifications keep team members informed of relevant conversations."
              }
            ]}
          />
        </TabsContent>

        {/* Achievement System Content */}
        <TabsContent value="achievements" className="space-y-6">
          <FeatureHeader
            title="Gamified Achievement System"
            description="Project milestone tracking with achievements, points, and team leaderboards"
            icon={<Trophy className="h-6 w-6" />}
          />
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <AchievementSystem 
                projectId="p1"
                userId="u1"
                isProjectOwner={true}
              />
            </CardContent>
          </Card>

          <FeatureAccordion
            items={[
              {
                title: "Gamification elements",
                content: "The achievement system includes tiers (bronze, silver, gold, platinum), points, progress tracking, and milestone completion rewards. Special achievements recognize exceptional contributions, consistent engagement, and collaborative behaviors."
              },
              {
                title: "Team motivation benefits",
                content: "Gamification increases motivation and engagement by providing clear, achievable goals and visible progress. Team leaderboards foster friendly competition, while personal achievements help users build portfolios showcasing their abilities."
              },
              {
                title: "Skill development tracking",
                content: "Achievements are categorized by skill area, helping users track their development in technical and soft skills. This creates a visual career progression that can be shared with potential collaborators or employers."
              }
            ]}
          />
        </TabsContent>

        {/* Interactive Onboarding Content */}
        <TabsContent value="onboarding" className="space-y-6">
          <FeatureHeader
            title="Interactive Onboarding Tutorial"
            description="Step-by-step guided walkthrough with context-aware tooltips and interactive elements"
            icon={<HelpCircle className="h-6 w-6" />}
          />
          
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <div className="max-w-md mx-auto mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Interactive Tutorial Experience</h3>
                <p className="text-muted-foreground mb-6">
                  Our step-by-step guided tutorial helps users discover platform features with interactive tooltips, highlighting, and guided navigation.
                </p>
                <Button onClick={() => setShowTutorial(true)}>
                  Launch Demo Tutorial
                </Button>
              </div>
              
              <div className="border rounded-lg p-8 bg-muted/20">
                <div className="aspect-video max-w-2xl mx-auto bg-card rounded-lg border border-border shadow-lg overflow-hidden">
                  <img 
                    src="https://via.placeholder.com/800x450?text=Tutorial+Demo+Screenshot" 
                    alt="Tutorial demonstration"
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="outline" size="lg" onClick={() => setShowTutorial(true)}>
                      Preview Tutorial
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <FeatureAccordion
            items={[
              {
                title: "Contextual awareness",
                content: "The tutorial system detects user activity and adjusts guidance accordingly. New users receive comprehensive onboarding, while returning users get targeted help for unused features. Tutorial content adapts to user roles, permissions, and interests."
              },
              {
                title: "Progressive disclosure",
                content: "Information is presented incrementally to avoid overwhelming users. Core features are introduced first, with advanced capabilities revealed as users master basics. Optional steps allow users to skip familiar content."
              },
              {
                title: "Interactive learning elements",
                content: "The tutorial includes interactive elements like clickable hotspots, guided actions, and practice tasks. Users learn by doing, increasing retention and confidence. Progress tracking ensures users can resume tutorials where they left off."
              }
            ]}
          />

          {/* Tutorial dialog */}
          {showTutorial && (
            <OnboardingTutorial
              isOpen={showTutorial}
              onComplete={() => {
                setShowTutorial(false);
                toast({
                  title: "Tutorial Completed",
                  description: "You've successfully completed the onboarding tutorial."
                });
              }}
              onClose={() => setShowTutorial(false)}
              tutorialId="platform-intro"
            />
          )}
        </TabsContent>

        {/* Educational Content */}
        <TabsContent value="education" className="space-y-6">
          <FeatureHeader
            title="Educational Content Integration"
            description="Seamless access to courses, tutorials, and learning resources from partner institutions"
            icon={<GraduationCap className="h-6 w-6" />}
          />
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <EducationalContent 
                variant="mini"
                defaultTab="explore"
              />
            </CardContent>
          </Card>

          <FeatureAccordion
            items={[
              {
                title: "Content partnerships",
                content: "We've partnered with leading educational institutions and content creators to provide high-quality courses across multiple disciplines. Content is curated to ensure relevance to project work and skill development needs."
              },
              {
                title: "Learning integration with projects",
                content: "Educational content is contextually linked to projects, suggesting relevant courses based on project requirements. Team members can recommend learning materials to each other directly within project workflows."
              },
              {
                title: "Progress tracking and credentials",
                content: "Users can track their learning progress across courses, earn certificates, and showcase completed courses on their profiles. Learning achievements integrate with the platform's achievement system."
              }
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Feature header component
function FeatureHeader({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="bg-muted/30 border rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <div className="text-primary">
            {icon}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-1">{title}</h2>
          <p className="text-muted-foreground max-w-3xl">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Feature accordion component
function FeatureAccordion({ items }: { items: { title: string, content: string }[] }) {
  return (
    <Accordion type="single" collapsible className="border rounded-lg">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="px-6 hover:no-underline">
            <div className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-primary" />
              <span>{item.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pt-2 text-muted-foreground">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}