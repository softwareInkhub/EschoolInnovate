import { useEffect, useMemo } from "react";
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

// Default character for unknown contexts
const DEFAULT_CHARACTER = "guide";

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

  // Register this tooltip with the context
  useEffect(() => {
    const tooltipData: TooltipData = {
      id,
      text,
      context,
      isEssential,
      section,
      priority,
      character: getCharacter()
    };
    
    addTooltip(id, tooltipData);
  }, [id, text, context, isEssential, section, priority, addTooltip]);

  // Mark tooltip as seen when component unmounts
  useEffect(() => {
    return () => {
      markTooltipAsSeen(id);
    };
  }, [id, markTooltipAsSeen]);

  // Determine character based on context and preference
  function getCharacter(): string {
    if (characterPreference === "random") {
      return getRandomCharacter();
    }
    
    if (characterPreference !== "random") {
      return characterPreference;
    }
    
    return contextToCharacterMap[context] || DEFAULT_CHARACTER;
  }

  // Get final character type
  const characterType = useMemo(() => getCharacter(), [characterPreference, context]);

  // Determine if we should show this tooltip
  const showTooltip = shouldShowTooltip(id);

  // Determine position (use context preference if set to auto)
  const finalPosition = position || (tooltipPosition === "auto" ? "top" : tooltipPosition);

  // Determine if interactive mode is enabled
  const finalInteractive = interactive !== undefined ? interactive : interactiveMode;

  if (!showTooltip) {
    return children;
  }

  return (
    <HelpTooltip
      text={text}
      character={characterType as any}
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