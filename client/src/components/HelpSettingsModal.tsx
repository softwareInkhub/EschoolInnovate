import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useHelpContext } from "@/hooks/use-help-context";
import { BookOpen, Lightbulb, Rocket, Target, Zap, Award, Star, HelpCircle } from "lucide-react";

interface HelpSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Character options
const characterOptions = [
  { value: "random", label: "Random Characters", icon: <HelpCircle className="h-4 w-4" /> },
  { value: "tutor", label: "Professor Pixel", icon: <BookOpen className="h-4 w-4" /> },
  { value: "mentor", label: "Mentor Mindy", icon: <Lightbulb className="h-4 w-4" /> },
  { value: "coach", label: "Coach Spark", icon: <Zap className="h-4 w-4" /> },
  { value: "guide", label: "Guide Gary", icon: <Target className="h-4 w-4" /> },
  { value: "buddy", label: "Buddy Byte", icon: <Star className="h-4 w-4" /> },
  { value: "guru", label: "Guru Grace", icon: <Award className="h-4 w-4" /> },
  { value: "expert", label: "Expert Eddie", icon: <Rocket className="h-4 w-4" /> },
];

export default function HelpSettingsModal({ isOpen, onClose }: HelpSettingsModalProps) {
  const {
    tooltipVisibility,
    setTooltipVisibility,
    characterPreference,
    setCharacterPreference,
    tooltipPosition,
    setTooltipPosition,
    interactiveMode,
    setInteractiveMode,
    resetSeenTooltips
  } = useHelpContext();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Help System Settings</DialogTitle>
          <DialogDescription>
            Customize how the contextual help system appears and behaves throughout the application.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Tooltip Visibility */}
          <div className="space-y-2">
            <Label className="text-base">Tooltip Visibility</Label>
            <RadioGroup 
              value={tooltipVisibility} 
              onValueChange={(value: any) => setTooltipVisibility(value)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="font-normal">Show all tooltips</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="essential" id="essential" />
                <Label htmlFor="essential" className="font-normal">Show only essential tooltips</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none" className="font-normal">Hide all tooltips</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Character Preference */}
          <div className="space-y-2">
            <Label htmlFor="character" className="text-base">Preferred Helper Character</Label>
            <Select 
              value={characterPreference}
              onValueChange={setCharacterPreference}
            >
              <SelectTrigger id="character">
                <SelectValue placeholder="Select a character" />
              </SelectTrigger>
              <SelectContent>
                {characterOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <span className="mr-2">{option.icon}</span>
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Choose which character guides you through the platform.
            </p>
          </div>

          {/* Tooltip Position */}
          <div className="space-y-2">
            <Label htmlFor="position" className="text-base">Tooltip Position</Label>
            <Select 
              value={tooltipPosition}
              onValueChange={setTooltipPosition}
            >
              <SelectTrigger id="position">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Automatic</SelectItem>
                <SelectItem value="top">Top</SelectItem>
                <SelectItem value="bottom">Bottom</SelectItem>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Interactive Mode */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="interactiveMode" className="text-base">Interactive Mode</Label>
              <p className="text-sm text-muted-foreground">
                Allow tooltips to have multiple tips and navigation controls.
              </p>
            </div>
            <Switch 
              id="interactiveMode" 
              checked={interactiveMode}
              onCheckedChange={setInteractiveMode}
            />
          </div>

          {/* Reset Tooltips */}
          <div className="pt-2">
            <Button 
              variant="outline" 
              onClick={resetSeenTooltips}
              className="w-full"
            >
              Reset All Seen Tooltips
            </Button>
            <p className="text-xs text-muted-foreground mt-1 text-center">
              This will show all tooltips again, including those you've previously dismissed.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}