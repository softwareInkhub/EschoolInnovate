import { useEffect } from "react";
import HelpTooltip from "./HelpTooltip";
import { useHelpContext, TooltipData } from "@/hooks/use-help-context";

// Character mapping for different contexts
const contextToCharacterMap: Record<string, string> = {
  projects: "mentor",
  startups: "mentor",
  learning: "tutor",
  education: "tutor",
  funding: "expert",
  invest: "expert",
  collaboration: "coach",
  team: "coach", 
  profile: "buddy",
  account: "buddy",
  competitions: "wizard",
  challenges: "wizard",
  general: "guide",
  technical: "guru"
};

// Character randomizer
const characters = ["tutor", "mentor", "coach", "guide", "buddy", "guru", "expert", "wizard"];
function getRandomCharacter(): string {
  return characters[Math.floor(Math.random() * characters.length)];
}

interface ContextualHelpProps {
  id: string;
  text: string | string[];
  context?: string;
  position?: "top" | "bottom" | "left" | "right";
  width?: "sm" | "md" | "lg";
  isEssential?: boolean;
  persistent?: boolean;
  interactive?: boolean;
  delay?: number;
  section?: string;
  priority?: number;
  children: React.ReactNode;
}

// Simple function to get character based on preference and context
function getCharacterForContext(preference: string, context: string): string {
  if (preference === "random") {
    return contextToCharacterMap[context] || getRandomCharacter();
  }
  return preference;
}

export default function ContextualHelp({
  id,
  text,
  context = "general",
  position,
  width = "md",
  isEssential = false,
  persistent = false, 
  interactive,
  delay = 300,
  section,
  priority = 5,
  children
}: ContextualHelpProps) {
  const {
    addTooltip,
    markTooltipAsSeen,
    shouldShowTooltip,
    characterPreference,
    tooltipPosition,
    interactiveMode
  } = useHelpContext();

  // Register tooltip once when component mounts
  useEffect(() => {
    // Character is determined once at registration time
    const character = getCharacterForContext(characterPreference, context);
    
    const tooltipData: TooltipData = {
      id,
      text,
      context,
      isEssential,
      section,
      priority,
      character
    };
    
    addTooltip(id, tooltipData);
    
    // Only mark as seen when unmounting
    return () => {
      markTooltipAsSeen(id);
    };
  }, [
    id, 
    text, 
    context, 
    isEssential, 
    section, 
    priority, 
    characterPreference, 
    addTooltip, 
    markTooltipAsSeen
  ]);

  // Check if tooltip should be shown
  if (!shouldShowTooltip(id)) {
    return children;
  }

  // Derive final values for tooltip display
  const finalPosition = position || (tooltipPosition === "auto" ? "top" : tooltipPosition);
  const finalInteractive = interactive !== undefined ? interactive : interactiveMode;
  const displayCharacter = getCharacterForContext(characterPreference, context);

  return (
    <HelpTooltip
      text={text}
      character={displayCharacter as any}
      position={finalPosition}
      width={width}
      delay={delay}
      persistent={persistent}
      interactive={finalInteractive}
    >
      {children}
    </HelpTooltip>
  );
}