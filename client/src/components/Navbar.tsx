import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Calendar, 
  Mail, 
  Bell, 
  Users, 
  User,
  Menu,
  LogOut,
  HelpCircle,
  Rocket,
  Code,
  BookOpen,
  GraduationCap,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import HelpSettingsModal from '@/components/HelpSettingsModal';
import ContextualHelp from '@/components/ContextualHelp';

// AutoCollapseLink component that will close the mobile menu when clicked
type AutoCollapseLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  setMobileMenuOpen: (open: boolean) => void;
};

const AutoCollapseLink = ({ 
  href,
  children,
  className,
  onClick,
  setMobileMenuOpen
}: AutoCollapseLinkProps) => {
  const handleClick = () => {
    // Close the mobile menu
    setMobileMenuOpen(false);
    
    // Execute any additional onClick handlers
    if (onClick) onClick();
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();
  
  return (
    <nav className="bg-[#121216] border-b border-[#2D2D3A] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo */}
              <div className="h-8 w-8 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <Link href={user ? "/explore" : "/"} className="text-xl font-bold text-white">
                escool.ai
              </Link>
            </div>
            <div className="ml-6 hidden md:flex space-x-2">
              <Link href="/explore">
                <Button variant="ghost" className="transform-gpu transition-gpu hover:scale-105 duration-200">Explore</Button>
              </Link>
              <Link href="/schools">
                <Button variant="ghost" className="transform-gpu transition-gpu hover:scale-105 duration-200">Schools</Button>
              </Link>
              <Link href="/competitions">
                <Button variant="ghost" className="transform-gpu transition-gpu hover:scale-105 duration-200">Competition</Button>
              </Link>
              <Link href="/projects">
                <Button variant="ghost" className="transform-gpu transition-gpu hover:scale-105 duration-200">Projects</Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/faq" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">
              FAQs & Feedback
            </Link>
            <Link href="/blogs" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">
              Blogs
            </Link>
            <div className="relative">
              <Search className="h-4 w-4 absolute right-3 top-2.5 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search Profiles" 
                className="bg-[#1E1E24] border-[#2D2D3A] pr-10 h-9 w-40"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Calendar className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Users className="h-5 w-5" />
            </Button>
            
            {/* Help Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary"
              onClick={() => setIsHelpModalOpen(true)}
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
            
            {user ? (
              <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-9 w-9 p-0">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar ? user.avatar : undefined} alt={user.username} />
                      <AvatarFallback>
                        {user.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => logoutMutation.mutate()}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="default" 
                size="sm"
                onClick={() => navigate("/auth")}
              >
                Login
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-6">
                  {user && (
                    <div className="flex items-center space-x-3 pb-4 mb-2 border-b border-border">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar ? user.avatar : undefined} alt={user.username} />
                        <AvatarFallback>
                          {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase">Main Navigation</p>
                    <div className="space-y-2">
                      <AutoCollapseLink 
                        href={user ? "/explore" : "/"} 
                        className="flex items-center text-base font-medium"
                        setMobileMenuOpen={setIsMobileMenuOpen}
                      >
                        <Rocket className="h-4 w-4 mr-2" />
                        Home
                      </AutoCollapseLink>
                      
                      <AutoCollapseLink 
                        href="/dashboard" 
                        className="flex items-center text-base font-medium"
                        setMobileMenuOpen={setIsMobileMenuOpen}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Dashboard
                      </AutoCollapseLink>
                      
                      <AutoCollapseLink 
                        href="/projects" 
                        className="flex items-center text-base font-medium"
                        setMobileMenuOpen={setIsMobileMenuOpen}
                      >
                        <Code className="h-4 w-4 mr-2" />
                        Projects
                      </AutoCollapseLink>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase">Education</p>
                    <div className="space-y-2">
                      <AutoCollapseLink 
                        href="/schools" 
                        className="flex items-center text-base font-medium"
                        setMobileMenuOpen={setIsMobileMenuOpen}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Schools
                      </AutoCollapseLink>
                      
                      <AutoCollapseLink 
                        href="/courses" 
                        className="flex items-center text-base font-medium"
                        setMobileMenuOpen={setIsMobileMenuOpen}
                      >
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Courses
                      </AutoCollapseLink>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase">Community</p>
                    <div className="space-y-2">
                      <AutoCollapseLink 
                        href="/competitions" 
                        className="flex items-center text-base font-medium"
                        setMobileMenuOpen={setIsMobileMenuOpen}
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Competitions
                      </AutoCollapseLink>
                      
                      <AutoCollapseLink 
                        href="/blogs" 
                        className="flex items-center text-base font-medium"
                        setMobileMenuOpen={setIsMobileMenuOpen}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Blogs
                      </AutoCollapseLink>
                      
                      <AutoCollapseLink 
                        href="/faq" 
                        className="flex items-center text-base font-medium"
                        setMobileMenuOpen={setIsMobileMenuOpen}
                      >
                        <HelpCircle className="h-4 w-4 mr-2" />
                        FAQs & Feedback
                      </AutoCollapseLink>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    {user ? (
                      <Button 
                        className="w-full" 
                        variant="destructive"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          logoutMutation.mutate();
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate("/auth");
                        }}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Help Settings Modal */}
      <HelpSettingsModal 
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </nav>
  );
}
