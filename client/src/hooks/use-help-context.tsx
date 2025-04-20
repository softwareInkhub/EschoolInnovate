import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

// Types and interfaces
type TooltipVisibility = "all" | "essential" | "none";
type TooltipCharacterPreference = "random" | string;
type TooltipPosition = "auto" | "top" | "bottom" | "left" | "right";

interface HelpContextProps {
  tooltipVisibility: TooltipVisibility;
  setTooltipVisibility: (visibility: TooltipVisibility) => void;
  characterPreference: TooltipCharacterPreference;
  setCharacterPreference: (character: TooltipCharacterPreference) => void;
  tooltipPosition: TooltipPosition;
  setTooltipPosition: (position: TooltipPosition) => void;
  interactiveMode: boolean;
  setInteractiveMode: (interactive: boolean) => void;
  seenTooltips: Set<string>;
  markTooltipAsSeen: (tooltipId: string) => void;
  resetSeenTooltips: () => void;
  addTooltip: (tooltipId: string, tooltipData: TooltipData) => void;
  getTooltip: (tooltipId: string) => TooltipData | undefined;
  isTooltipImportant: (tooltipId: string) => boolean;
  shouldShowTooltip: (tooltipId: string) => boolean;
}

export interface TooltipData {
  id: string;
  text: string | string[];
  character?: string;
  isEssential?: boolean;
  section?: string;
  context?: string;
  priority?: number;
}

// Create context
const HelpContext = createContext<HelpContextProps | undefined>(undefined);

// Provider component
interface HelpProviderProps {
  children: ReactNode;
  initialVisibility?: TooltipVisibility;
  initialCharacter?: TooltipCharacterPreference;
  initialPosition?: TooltipPosition;
  initialInteractiveMode?: boolean;
}

export function HelpProvider({
  children,
  initialVisibility = "all",
  initialCharacter = "random",
  initialPosition = "auto",
  initialInteractiveMode = true,
}: HelpProviderProps) {
  // State for user preferences
  const [tooltipVisibility, setTooltipVisibility] = useState<TooltipVisibility>(
    () => {
      const saved = localStorage.getItem("tooltip-visibility");
      return saved ? (saved as TooltipVisibility) : initialVisibility;
    }
  );
  
  const [characterPreference, setCharacterPreference] = useState<TooltipCharacterPreference>(
    () => {
      const saved = localStorage.getItem("tooltip-character");
      return saved ? saved : initialCharacter;
    }
  );
  
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>(
    () => {
      const saved = localStorage.getItem("tooltip-position");
      return saved ? (saved as TooltipPosition) : initialPosition;
    }
  );
  
  const [interactiveMode, setInteractiveMode] = useState<boolean>(
    () => {
      const saved = localStorage.getItem("tooltip-interactive");
      return saved ? saved === "true" : initialInteractiveMode;
    }
  );

  // Track seen tooltips
  const [seenTooltips, setSeenTooltips] = useState<Set<string>>(
    () => {
      const saved = localStorage.getItem("seen-tooltips");
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    }
  );

  // Tooltip data
  const [tooltips, setTooltips] = useState<Record<string, TooltipData>>({});

  // Persist settings to localStorage
  useEffect(() => {
    localStorage.setItem("tooltip-visibility", tooltipVisibility);
  }, [tooltipVisibility]);

  useEffect(() => {
    localStorage.setItem("tooltip-character", characterPreference);
  }, [characterPreference]);

  useEffect(() => {
    localStorage.setItem("tooltip-position", tooltipPosition);
  }, [tooltipPosition]);

  useEffect(() => {
    localStorage.setItem("tooltip-interactive", String(interactiveMode));
  }, [interactiveMode]);

  useEffect(() => {
    localStorage.setItem("seen-tooltips", JSON.stringify(Array.from(seenTooltips)));
  }, [seenTooltips]);

  // Methods - memoized to prevent unnecessary re-renders
  const markTooltipAsSeen = useCallback((tooltipId: string) => {
    setSeenTooltips((prev) => {
      const newSet = new Set(prev);
      newSet.add(tooltipId);
      return newSet;
    });
  }, []);

  const resetSeenTooltips = () => {
    setSeenTooltips(new Set<string>());
  };

  const addTooltip = useCallback((tooltipId: string, tooltipData: TooltipData) => {
    setTooltips((prev) => {
      // Only update if tooltip doesn't exist or has changed
      const existing = prev[tooltipId];
      if (existing && 
          JSON.stringify(existing) === JSON.stringify(tooltipData)) {
        return prev; // No change needed
      }
      
      return {
        ...prev,
        [tooltipId]: tooltipData,
      };
    });
  }, []);

  const getTooltip = (tooltipId: string) => {
    return tooltips[tooltipId];
  };

  const isTooltipImportant = useCallback((tooltipId: string) => {
    return tooltips[tooltipId]?.isEssential || false;
  }, [tooltips]);

  // Memoize the shouldShowTooltip function to avoid unnecessary re-renders
  const shouldShowTooltip = useCallback((tooltipId: string) => {
    // Already seen this tooltip
    if (seenTooltips.has(tooltipId)) {
      return false;
    }

    // Check visibility settings
    switch (tooltipVisibility) {
      case "all":
        return true;
      case "essential":
        return isTooltipImportant(tooltipId);
      case "none":
        return false;
      default:
        return false;
    }
  }, [seenTooltips, tooltipVisibility, isTooltipImportant]);

  const value = {
    tooltipVisibility,
    setTooltipVisibility,
    characterPreference,
    setCharacterPreference,
    tooltipPosition,
    setTooltipPosition,
    interactiveMode,
    setInteractiveMode,
    seenTooltips,
    markTooltipAsSeen,
    resetSeenTooltips,
    addTooltip,
    getTooltip,
    isTooltipImportant,
    shouldShowTooltip,
  };

  return <HelpContext.Provider value={value}>{children}</HelpContext.Provider>;
}

// Custom hook for using the context
export function useHelpContext() {
  const context = useContext(HelpContext);
  if (context === undefined) {
    throw new Error("useHelpContext must be used within a HelpProvider");
  }
  return context;
}