import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type FilterBarProps = {
  filters: {
    category: string;
    stage: string;
    teamSize: string;
  };
  setFilters: (filters: any) => void;
};

export default function FilterBar({ filters, setFilters }: FilterBarProps) {
  const [projectCount, setProjectCount] = useState(0);
  
  // Get projects for count (in a real app, we'd just get the count from the backend)
  const { data: projects } = useQuery({
    queryKey: ['/api/projects'],
    onSuccess: (data) => {
      setProjectCount(data.length);
    },
  });
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };
  
  const clearFilters = () => {
    setFilters({
      category: '',
      stage: '',
      teamSize: '',
    });
  };
  
  return (
    <div className="bg-[#121216] py-2 border-b border-[#2D2D3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto">
          <div className="flex items-center space-x-2">
            <span className="text-foreground whitespace-nowrap">Filter by:</span>
            <Button 
              variant={filters.category === '' && filters.stage === '' && filters.teamSize === '' ? "default" : "ghost"}
              size="sm"
              className="whitespace-nowrap"
              onClick={clearFilters}
            >
              MY PROJECTS
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={filters.category ? "default" : "outline"} 
                  size="sm" 
                  className="flex items-center whitespace-nowrap"
                >
                  CATEGORY
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                  value={filters.category}
                  onValueChange={(value) => handleFilterChange('category', value)}
                >
                  <DropdownMenuRadioItem value="">All Categories</DropdownMenuRadioItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioItem value="Tech">Technology</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="EdTech">EdTech</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="AI">Artificial Intelligence</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="VR/AR">VR/AR</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Analytics">Analytics</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={filters.stage ? "default" : "outline"} 
                  size="sm" 
                  className="flex items-center whitespace-nowrap"
                >
                  STAGE
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                  value={filters.stage}
                  onValueChange={(value) => handleFilterChange('stage', value)}
                >
                  <DropdownMenuRadioItem value="">All Stages</DropdownMenuRadioItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioItem value="Idea Stage">Idea Stage</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Building MVP">Building MVP</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Active Project">Active Project</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Looking for Co-founder">Looking for Co-founder</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="New Project">New Project</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={filters.teamSize ? "default" : "outline"} 
                  size="sm" 
                  className="flex items-center whitespace-nowrap"
                >
                  TEAM SIZE
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup
                  value={filters.teamSize}
                  onValueChange={(value) => handleFilterChange('teamSize', value)}
                >
                  <DropdownMenuRadioItem value="">Any Size</DropdownMenuRadioItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioItem value="1">Solo (1)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="2-5">Small (2-5)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="6-10">Medium (6-10)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="10+">Large (10+)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Sort by
            </Button>
          </div>
        </div>
        <div className="mt-2 text-muted-foreground text-sm">
          Projects matching filters: {projectCount}
        </div>
      </div>
    </div>
  );
}
