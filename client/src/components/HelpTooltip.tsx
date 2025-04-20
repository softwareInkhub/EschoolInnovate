import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  Lightbulb, 
  BookOpen, 
  Rocket, 
  Target, 
  Zap, 
  Award, 
  Star,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Character types for different contexts
type CharacterType = 
  | "tutor" 
  | "mentor" 
  | "coach" 
  | "guide" 
  | "buddy" 
  | "guru" 
  | "expert" 
  | "wizard";

// Character definitions with personalities and icons
const characterDefinitions: Record<CharacterType, {
  name: string;
  icon: JSX.Element;
  color: string;
  personality: string;
  sound: string;
}> = {
  tutor: {
    name: "Professor Pixel",
    icon: <BookOpen />,
    color: "bg-blue-500",
    personality: "Knowledgeable and patient",
    sound: "ping"
  },
  mentor: {
    name: "Mentor Mindy",
    icon: <Lightbulb />,
    color: "bg-yellow-500",
    personality: "Wise and thoughtful",
    sound: "chime"
  },
  coach: {
    name: "Coach Spark",
    icon: <Zap />,
    color: "bg-purple-500",
    personality: "Energetic and motivating",
    sound: "pop"
  },
  guide: {
    name: "Guide Gary",
    icon: <Target />,
    color: "bg-green-500",
    personality: "Helpful and encouraging",
    sound: "click"
  },
  buddy: {
    name: "Buddy Byte",
    icon: <Star />,
    color: "bg-pink-500",
    personality: "Friendly and casual",
    sound: "boop"
  },
  guru: {
    name: "Guru Grace",
    icon: <Award />,
    color: "bg-indigo-500",
    personality: "Insightful and wise",
    sound: "chime"
  },
  expert: {
    name: "Expert Eddie",
    icon: <Rocket />,
    color: "bg-orange-500",
    personality: "Technical and precise",
    sound: "beep"
  },
  wizard: {
    name: "Wizard Willow",
    icon: <HelpCircle />,
    color: "bg-teal-500",
    personality: "Magical and mysterious",
    sound: "twinkle"
  }
};

interface HelpTooltipProps {
  text: string | string[];
  character?: CharacterType;
  position?: "top" | "bottom" | "left" | "right";
  width?: "sm" | "md" | "lg";
  delay?: number;
  persistent?: boolean;
  interactive?: boolean;
  children: React.ReactNode;
}

export default function HelpTooltip({
  text,
  character = "guide",
  position = "top",
  width = "md",
  delay = 300,
  persistent = false,
  interactive = false,
  children
}: HelpTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const characterInfo = characterDefinitions[character];
  const textArray = Array.isArray(text) ? text : [text];
  const hasMultipleTexts = textArray.length > 1;

  // Configure width classes
  const widthClasses = {
    sm: "max-w-[200px]",
    md: "max-w-[280px]",
    lg: "max-w-[350px]"
  };

  // Configure position classes
  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2"
  };

  // Animation variants
  const tooltipVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: position === "top" ? 10 : position === "bottom" ? -10 : 0,
      x: position === "left" ? 10 : position === "right" ? -10 : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  // Character animation variants
  const characterVariants = {
    idle: {
      y: [0, -3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  function showTooltip() {
    if (!isVisible) {
      setIsVisible(true);
      setHasBeenSeen(true);
    }
  }

  function hideTooltip() {
    if (!persistent) {
      setIsVisible(false);
    }
  }

  function advanceText() {
    if (textIndex < textArray.length - 1) {
      setTextIndex(textIndex + 1);
    } else {
      setTextIndex(0);
    }
  }

  return (
    <div 
      className="relative inline-block z-20"
      onMouseEnter={() => {
        const timer = setTimeout(() => showTooltip(), delay);
        return () => clearTimeout(timer);
      }}
      onMouseLeave={hideTooltip}
      onClick={interactive ? showTooltip : undefined}
    >
      {children}

      {/* Indicator dot if not seen and not visible */}
      {!hasBeenSeen && !isVisible && (
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary -mt-1 -mr-1 animate-pulse" />
      )}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute ${positionClasses[position]} ${widthClasses[width]} z-50`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tooltipVariants}
          >
            <div className="bg-card border border-border shadow-lg rounded-lg overflow-hidden">
              {/* Character Header */}
              <div className={`${characterInfo.color} text-primary-foreground p-3 flex items-center justify-between`}>
                <div className="flex items-center">
                  <motion.div 
                    className="mr-2" 
                    variants={characterVariants}
                    animate="idle"
                  >
                    {characterInfo.icon}
                  </motion.div>
                  <span className="font-medium">{characterInfo.name}</span>
                </div>
                {(persistent || interactive) && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 rounded-full bg-black/10 text-white hover:bg-black/20 hover:text-white"
                    onClick={() => setIsVisible(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              {/* Tooltip Content */}
              <div className="p-3">
                <p className="text-sm text-foreground">{textArray[textIndex]}</p>
                
                {/* Navigation for multiple tips */}
                {hasMultipleTexts && interactive && (
                  <div className="mt-2 flex justify-between items-center">
                    <div className="space-x-1">
                      {textArray.map((_, idx) => (
                        <span 
                          key={idx}
                          className={`inline-block h-1.5 w-1.5 rounded-full ${idx === textIndex ? characterInfo.color : 'bg-muted'}`}
                        />
                      ))}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs"
                      onClick={advanceText}
                    >
                      {textIndex < textArray.length - 1 ? "Next Tip" : "Start Over"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Tooltip Arrow */}
            <div 
              className={`absolute h-2 w-2 rotate-45 bg-card border border-border ${
                position === "top" ? "top-full -translate-y-1 left-1/2 -translate-x-1/2 border-t-0 border-l-0" : 
                position === "bottom" ? "bottom-full translate-y-1 left-1/2 -translate-x-1/2 border-b-0 border-r-0" :
                position === "left" ? "left-full -translate-x-1 top-1/2 -translate-y-1/2 border-l-0 border-t-0" :
                "right-full translate-x-1 top-1/2 -translate-y-1/2 border-r-0 border-b-0"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}