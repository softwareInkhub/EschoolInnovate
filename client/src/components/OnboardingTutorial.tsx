import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  X,
  Check,
  Info,
  HelpCircle,
  Play,
  Lightbulb,
  Book,
  Award,
  Flag,
  Lock,
  PenTool,
  Eye,
  SkipForward
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type TutorialStep = {
  id: string;
  title: string;
  description: string;
  selector?: string; // CSS selector for element to highlight
  position?: "top" | "bottom" | "left" | "right"; // Position of tooltip relative to element
  actions?: {
    text: string;
    action: () => void;
  }[];
  hint?: string;
  isOptional?: boolean;
  skipText?: string;
  docsLink?: string;
};

type OnboardingTutorialProps = {
  isOpen: boolean;
  onComplete: () => void;
  onClose: () => void;
  tutorialId: string; // Unique identifier for this tutorial flow
};

export default function OnboardingTutorial({
  isOpen,
  onComplete,
  onClose,
  tutorialId
}: OnboardingTutorialProps) {
  const { toast } = useToast();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [tutorialProgress, setTutorialProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(isOpen);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [highlightedElementRect, setHighlightedElementRect] = useState<DOMRect | null>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Get tutorial steps based on tutorialId
  const tutorialSteps = getTutorialSteps(tutorialId);
  const currentStep = tutorialSteps[currentStepIndex];
  
  // Calculate progress
  useEffect(() => {
    setTutorialProgress(((currentStepIndex + 1) / tutorialSteps.length) * 100);
  }, [currentStepIndex, tutorialSteps.length]);
  
  // Handle visibility changes
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);
  
  // Handle element positioning
  useEffect(() => {
    if (!isOpen || !currentStep.selector) return;
    
    // Find the element to highlight
    const targetElement = document.querySelector(currentStep.selector);
    if (!targetElement) return;
    
    // Get element position
    const rect = targetElement.getBoundingClientRect();
    setHighlightedElementRect(rect);
    
    // Position tooltip relative to the element
    positionTooltip(rect, currentStep.position || "bottom");
    
    // Add a small delay before showing the tooltip
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isOpen, currentStep, currentStepIndex]);
  
  // Position tooltip relative to highlighted element
  const positionTooltip = (elementRect: DOMRect, position: string) => {
    if (!tooltipRef.current) return;
    
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const margin = 12; // Margin between element and tooltip
    
    let top = 0;
    let left = 0;
    
    switch (position) {
      case "top":
        top = elementRect.top - tooltipRect.height - margin;
        left = elementRect.left + (elementRect.width / 2) - (tooltipRect.width / 2);
        break;
      case "bottom":
        top = elementRect.bottom + margin;
        left = elementRect.left + (elementRect.width / 2) - (tooltipRect.width / 2);
        break;
      case "left":
        top = elementRect.top + (elementRect.height / 2) - (tooltipRect.height / 2);
        left = elementRect.left - tooltipRect.width - margin;
        break;
      case "right":
        top = elementRect.top + (elementRect.height / 2) - (tooltipRect.height / 2);
        left = elementRect.right + margin;
        break;
    }
    
    // Make sure tooltip is within viewport
    if (left < 0) left = margin;
    if (top < 0) top = margin;
    if (left + tooltipRect.width > window.innerWidth) {
      left = window.innerWidth - tooltipRect.width - margin;
    }
    if (top + tooltipRect.height > window.innerHeight) {
      top = window.innerHeight - tooltipRect.height - margin;
    }
    
    setTooltipPosition({ top, left });
  };
  
  // Proceed to next step
  const handleNextStep = () => {
    if (currentStepIndex < tutorialSteps.length - 1) {
      setShowTooltip(false);
      setTimeout(() => {
        setCurrentStepIndex(currentStepIndex + 1);
      }, 300);
    } else {
      handleCompleteTutorial();
    }
  };
  
  // Go back to previous step
  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setShowTooltip(false);
      setTimeout(() => {
        setCurrentStepIndex(currentStepIndex - 1);
      }, 300);
    }
  };
  
  // Skip current step
  const handleSkipStep = () => {
    if (currentStep.isOptional) {
      handleNextStep();
    }
  };
  
  // Complete the tutorial
  const handleCompleteTutorial = () => {
    setIsVisible(false);
    
    setTimeout(() => {
      onComplete();
      
      toast({
        title: "Tutorial Completed!",
        description: "You've successfully completed the tutorial.",
      });
    }, 300);
  };
  
  // Close the tutorial
  const handleCloseTutorial = () => {
    setIsVisible(false);
    
    setTimeout(() => {
      onClose();
    }, 300);
  };
  
  // Save tutorial progress (mock implementation)
  const saveTutorialProgress = (completedTutorialId: string) => {
    // In a real app, this would save to a database
    localStorage.setItem(`tutorial_${completedTutorialId}_completed`, "true");
  };
  
  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const tooltipVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      y: -10, 
      transition: { duration: 0.3 }
    }
  };
  
  const highlightVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 overflow-hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Tutorial header */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center">
              <div className="bg-card shadow-lg rounded-full px-4 py-1.5 flex items-center gap-2 border">
                <div className="flex items-center">
                  <Book className="h-4 w-4 text-primary mr-2" />
                  <span className="font-medium">Tutorial</span>
                </div>
                
                <div className="h-4 w-px bg-border mx-1"></div>
                
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">{currentStepIndex + 1}/{tutorialSteps.length}</span>
                </div>
                
                <div className="h-4 w-px bg-border mx-1"></div>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={handleCloseTutorial}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Help button */}
            <div className="fixed top-4 right-4 z-50">
              <Button 
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full bg-card"
                onClick={() => {
                  toast({
                    title: "Help",
                    description: "This is a step-by-step tutorial to guide you through the platform. You can exit at any time by clicking the X button.",
                  });
                }}
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Highlighted element */}
            {currentStep.selector && highlightedElementRect && (
              <motion.div
                ref={highlightRef}
                className="absolute rounded-lg"
                style={{
                  top: highlightedElementRect.top - 4 + window.scrollY,
                  left: highlightedElementRect.left - 4 + window.scrollX,
                  width: highlightedElementRect.width + 8,
                  height: highlightedElementRect.height + 8,
                  boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.75)",
                  zIndex: 51
                }}
                variants={highlightVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            )}
            
            {/* Tooltip */}
            <AnimatePresence mode="wait">
              {showTooltip && (
                <motion.div
                  ref={tooltipRef}
                  className="fixed bg-card border rounded-lg shadow-lg p-4 max-w-xs z-60"
                  style={{
                    top: tooltipPosition.top,
                    left: tooltipPosition.left,
                    zIndex: 52
                  }}
                  variants={tooltipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-medium">{currentStep.title}</h3>
                      {currentStep.isOptional && (
                        <Badge variant="outline" className="text-xs font-normal">
                          Optional
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {currentStep.description}
                    </p>
                    
                    {currentStep.hint && (
                      <div className="bg-primary/10 border border-primary/20 rounded-md p-2 flex gap-2">
                        <Lightbulb className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-xs">{currentStep.hint}</div>
                      </div>
                    )}
                    
                    {currentStep.actions && currentStep.actions.length > 0 && (
                      <div className="space-y-2">
                        {currentStep.actions.map((action, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant="outline"
                            className="w-full justify-start"
                            onClick={action.action}
                          >
                            <Play className="h-3 w-3 mr-2" />
                            {action.text}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-2">
                        {currentStepIndex > 0 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handlePrevStep}
                          >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Back
                          </Button>
                        )}
                        
                        {currentStep.isOptional && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleSkipStep}
                          >
                            <SkipForward className="h-4 w-4 mr-1" />
                            {currentStep.skipText || "Skip"}
                          </Button>
                        )}
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={handleNextStep}
                      >
                        {currentStepIndex === tutorialSteps.length - 1 ? (
                          <>
                            Complete
                            <Check className="h-4 w-4 ml-1" />
                          </>
                        ) : (
                          <>
                            Next
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {currentStep.docsLink && (
                      <div className="text-xs text-center">
                        <a 
                          href={currentStep.docsLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Learn more in the documentation
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Progress bar */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-card border rounded-full shadow-lg px-3 py-2 w-48">
                <Progress value={tutorialProgress} className="h-1.5" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Get tutorial steps based on tutorial ID
function getTutorialSteps(tutorialId: string): TutorialStep[] {
  switch (tutorialId) {
    case "platform-intro":
      return [
        {
          id: "intro",
          title: "Welcome to escool.ai!",
          description: "This quick tutorial will guide you through the main features of our platform. Let's get started!",
          position: "bottom",
          hint: "You can exit this tutorial at any time by clicking the X button in the top right."
        },
        {
          id: "projects-navigation",
          title: "Discover Projects",
          description: "Browse through exciting projects and find opportunities to collaborate with other creators.",
          selector: "nav a[href='/projects']",
          position: "bottom",
          actions: [
            { 
              text: "View Projects",
              action: () => {
                // In a real app, this would navigate to the projects page
                console.log("Navigate to projects");
              }
            }
          ]
        },
        {
          id: "create-project",
          title: "Create Your Own Project",
          description: "Have an idea? Start your own project and recruit team members to help bring it to life.",
          selector: "button:has(.plus-icon), button:contains('Create Project')",
          position: "bottom",
          isOptional: true,
          skipText: "I'll do this later",
          actions: [
            { 
              text: "Start Creating",
              action: () => {
                // In a real app, this would open the create project modal
                console.log("Open create project modal");
              }
            }
          ]
        },
        {
          id: "schools-section",
          title: "Educational Resources",
          description: "Access high-quality educational content from our partner institutions to enhance your skills.",
          selector: "nav a[href='/schools']",
          position: "bottom",
          actions: [
            { 
              text: "Browse Schools",
              action: () => {
                // In a real app, this would navigate to the schools page
                console.log("Navigate to schools");
              }
            }
          ]
        },
        {
          id: "achievements",
          title: "Track Your Progress",
          description: "Complete milestones and earn achievements as you make progress on your projects.",
          selector: ".achievement-section, div:has(> .award-icon)",
          position: "right",
          hint: "Achievements help you showcase your skills and accomplishments to potential collaborators."
        },
        {
          id: "profile",
          title: "Your Profile",
          description: "Customize your profile to showcase your skills, interests, and project history.",
          selector: "header .avatar, header .user-menu",
          position: "bottom",
          isOptional: true,
          skipText: "I'll update later",
        },
        {
          id: "complete",
          title: "You're All Set!",
          description: "You've completed the tour of escool.ai. You're now ready to start exploring projects and learning new skills!",
          actions: [
            { 
              text: "Start Exploring",
              action: () => {
                // In a real app, this would complete the tutorial
                console.log("Complete tutorial");
              }
            }
          ]
        }
      ];
    
    case "project-creation":
      return [
        {
          id: "project-intro",
          title: "Create Your Project",
          description: "Let's walk through the process of creating a new project on eSchool.ai.",
          position: "bottom"
        },
        {
          id: "project-title",
          title: "Project Title",
          description: "Give your project a clear, concise title that describes what you're building.",
          selector: "input[name='title'], #project-title",
          position: "bottom",
          hint: "A good title helps potential collaborators understand your project at a glance."
        },
        {
          id: "project-description",
          title: "Project Description",
          description: "Provide a detailed description of your project, including its goals and potential impact.",
          selector: "textarea[name='description'], #project-description",
          position: "right",
          hint: "Be specific about the problem you're solving and how your project addresses it."
        },
        {
          id: "project-category",
          title: "Project Category",
          description: "Select the category that best fits your project to help others find it more easily.",
          selector: "select[name='category'], #project-category",
          position: "bottom"
        },
        {
          id: "project-team",
          title: "Team Size",
          description: "Specify how many team members you're looking for to help with your project.",
          selector: "input[name='maxTeamSize'], #team-size",
          position: "bottom"
        },
        {
          id: "project-skills",
          title: "Required Skills",
          description: "Add the skills that team members should have to contribute effectively to your project.",
          selector: "div[name='skills'], #skills-selector",
          position: "bottom",
          hint: "Be specific about the technical and non-technical skills you need."
        },
        {
          id: "project-submit",
          title: "Create Project",
          description: "Review your project details and click 'Create Project' to publish it to the platform.",
          selector: "button[type='submit'], #create-button",
          position: "top"
        }
      ];
      
    case "project-milestone":
      return [
        {
          id: "milestone-intro",
          title: "Project Milestones",
          description: "Milestones help track progress and break down your project into manageable steps.",
          position: "bottom"
        },
        {
          id: "milestone-section",
          title: "Milestones Section",
          description: "This section displays all the milestones for your project.",
          selector: ".milestones-tab, #milestones-section",
          position: "bottom"
        },
        {
          id: "create-milestone",
          title: "Create a Milestone",
          description: "Click here to add a new milestone to your project.",
          selector: "button:contains('Add Milestone'), .add-milestone-button",
          position: "bottom",
          actions: [
            { 
              text: "Create Milestone",
              action: () => {
                // In a real app, this would open the add milestone modal
                console.log("Open add milestone modal");
              }
            }
          ]
        },
        {
          id: "milestone-status",
          title: "Milestone Status",
          description: "Track the status of each milestone to monitor project progress.",
          selector: ".milestone-status, .status-badge",
          position: "right",
          hint: "You can mark milestones as 'In Progress', 'Completed', or 'Overdue'."
        },
        {
          id: "milestone-achievement",
          title: "Milestone Achievements",
          description: "Completing milestones can unlock achievements for you and your team.",
          selector: ".achievement-badge, .icon-trophy",
          position: "left",
          hint: "Achievements showcase your accomplishments and help build your profile."
        }
      ];
      
    default:
      return [
        {
          id: "default",
          title: "Welcome to the Tutorial",
          description: "This is a default tutorial step. Please provide a valid tutorial ID.",
          position: "bottom"
        }
      ];
  }
}