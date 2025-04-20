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
  HelpCircle
} from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/use-auth';
import HelpSettingsModal from '@/components/HelpSettingsModal';
import ContextualHelp from '@/components/ContextualHelp';

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
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
                <Button variant="default" className="bg-primary hover:bg-primary/90">EXPLORE</Button>
              </Link>
              <Link href="/competitions">
                <Button variant="ghost">COMPETITION</Button>
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
            
            {/* Help Button with Tooltip */}
            <ContextualHelp
              id="help-button-tooltip"
              text="Click here to customize your help experience and manage tooltip settings"
              context="general"
              position="bottom"
            >
              <Button 
                variant="ghost" 
                size="icon"
                className="text-primary"
                onClick={() => setIsHelpModalOpen(true)}
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </ContextualHelp>
            
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
            <Sheet>
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
                  
                  <Link href={user ? "/explore" : "/"} className="text-lg font-medium">
                    Home
                  </Link>
                  <Link href="/dashboard" className="text-lg font-medium">
                    Dashboard
                  </Link>
                  <Link href="/competitions" className="text-lg font-medium">
                    Competitions
                  </Link>
                  <Link href="/faq" className="text-lg font-medium">
                    FAQs & Feedback
                  </Link>
                  <Link href="/blogs" className="text-lg font-medium">
                    Blogs
                  </Link>
                  
                  <div className="pt-4 border-t border-border">
                    {user ? (
                      <Button 
                        className="w-full" 
                        variant="destructive"
                        onClick={() => logoutMutation.mutate()}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        onClick={() => navigate("/auth")}
                      >
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
