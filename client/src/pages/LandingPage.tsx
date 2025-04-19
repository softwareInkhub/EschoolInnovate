import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { 
  GitMerge, 
  Users, 
  Lightbulb, 
  GraduationCap, 
  Rocket, 
  ArrowRight,
  Check,
  BrainCircuit,
  Code,
  LineChart,
  Eye,
  UserCircle,
  Gift,
  Trophy,
  Heart,
  Star
} from "lucide-react";

export default function LandingPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  // If user is logged in, redirect to /projects
  useEffect(() => {
    if (user) {
      navigate("/projects");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col">
      {/* Hero Section with animated background and floating avatars */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90 py-20">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background"></div>

        {/* Animated floating avatars */}
        <div className="absolute top-1/4 left-1/5 w-14 h-14 rounded-full bg-primary/20 animate-float-slow">
          <div className="absolute inset-1 rounded-full bg-card flex items-center justify-center text-primary">
            <Code className="h-6 w-6" />
          </div>
        </div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-primary/20 animate-float-medium">
          <div className="absolute inset-1 rounded-full bg-card flex items-center justify-center text-primary">
            <BrainCircuit className="h-5 w-5" />
          </div>
        </div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 rounded-full bg-primary/20 animate-float">
          <div className="absolute inset-1 rounded-full bg-card flex items-center justify-center text-primary">
            <LineChart className="h-7 w-7" />
          </div>
        </div>
        <div className="absolute top-2/3 right-1/5 w-10 h-10 rounded-full bg-primary/20 animate-float-fast">
          <div className="absolute inset-1 rounded-full bg-card flex items-center justify-center text-primary">
            <Eye className="h-4 w-4" />
          </div>
        </div>
        
        {/* Main content */}
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6 mb-8">
            <div className="inline-block animate-bounce-slow mb-4">
              <div className="bg-primary/20 text-primary p-2 rounded-full">
                <Rocket className="h-6 w-6" />
              </div>
            </div>
            <h1 className="font-bold tracking-tighter text-3xl md:text-5xl lg:text-6xl mb-4">
              <span className="text-primary">WELCOME TO</span>
            </h1>
            <h1 className="font-extrabold tracking-tighter text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-pulse-slow">
              eSchool.ai
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl mt-4">
              Find your Team Members and Grow your Startup Idea
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className="h-12 px-8 text-lg" onClick={() => navigate("/auth")}>
                Join eSchool.ai
              </Button>
            </div>
            
            {/* User count animation */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-8 py-4">
              <div className="flex -space-x-4">
                {/* Floating avatars */}
                <div className="w-12 h-12 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center animate-float-slow">
                  <UserCircle className="h-8 w-8 text-primary" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center animate-float-medium">
                  <UserCircle className="h-8 w-8 text-primary" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center animate-float">
                  <UserCircle className="h-8 w-8 text-primary" />
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center animate-float-fast">
                  <UserCircle className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-xl font-bold text-primary">2,758</h4>
                <p className="text-muted-foreground">action takers have joined eSchool.ai</p>
              </div>
            </div>
          </div>
          
          {/* Feature highlight */}
          <div className="max-w-3xl mx-auto mt-12 bg-card/40 backdrop-blur-sm border border-border p-6 rounded-xl">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
              From Idea to Funded Startup 🚀 Build or Join Your Dream Team
            </h2>
            <p className="text-center text-muted-foreground mb-4">
              Kickstart your journey with the right team, advice and investor exposure - All in one place.
            </p>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="h-6 w-6 rotate-90 text-muted-foreground" />
        </div>
      </section>

      {/* Process Blocks */}
      <section className="py-20 bg-muted/10">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* I have an idea */}
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <h3 className="font-bold text-primary text-2xl mb-6">I have an idea</h3>
              <ol className="space-y-6">
                <li className="flex items-start">
                  <div className="mr-4 bg-primary/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Create a project card</h4>
                    <p className="text-muted-foreground">Share your vision and outline the key details of your project</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 bg-primary/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Select team members with roles</h4>
                    <p className="text-muted-foreground">Define the roles you need and review applications from talented individuals</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 bg-primary/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Turn vision into a funded startup together</h4>
                    <p className="text-muted-foreground">Collaborate effectively and showcase your project to potential investors</p>
                  </div>
                </li>
              </ol>
              <div className="mt-8">
                <Button 
                  className="w-full"
                  onClick={() => navigate("/auth")}
                >
                  Start Your Project
                </Button>
              </div>
            </div>
            
            {/* I want to join a project */}
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <h3 className="font-bold text-primary text-2xl mb-6">I want to join a project</h3>
              <ol className="space-y-6">
                <li className="flex items-start">
                  <div className="mr-4 bg-primary/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Browse interesting projects</h4>
                    <p className="text-muted-foreground">Find projects that match your skills, interests, and career goals</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 bg-primary/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Apply to your favorite team with skills</h4>
                    <p className="text-muted-foreground">Showcase your expertise and demonstrate why you're a perfect fit</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 bg-primary/20 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Make a difference in new team from day one</h4>
                    <p className="text-muted-foreground">Contribute to projects that matter and build your portfolio</p>
                  </div>
                </li>
              </ol>
              <div className="mt-8">
                <Button 
                  className="w-full"
                  onClick={() => navigate("/auth")}
                >
                  Find Projects
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-xl font-semibold text-primary mb-4">No more back-and-forth DM´s to team up!</p>
            <p className="text-muted-foreground">Our platform streamlines the entire collaboration process</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/10">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What you get access to when you join eSchool.ai:</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              You don't need any prior connections, the journey starts from here!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.03]">
              <div className="bg-primary/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Be Part of Meaningful Startups</h3>
              <p className="text-muted-foreground">Build or join teams, transform ideas into reality, and achieve success with like-minded action-takers!</p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.03]">
              <div className="bg-primary/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Monthly Hackathons</h3>
              <p className="text-muted-foreground">Compete against other teams, secure top spots on the leaderboard, and win prizes together!</p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.03]">
              <div className="bg-primary/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">STARTUP SPOTLIGHT</h3>
              <p className="text-muted-foreground">Top teams each quarter get a chance to pitch to investors and receive valuable feedback!</p>
            </div>
            
            {/* Benefit 4 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.03]">
              <div className="bg-primary/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Gift className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Get Help Throughout the Project</h3>
              <p className="text-muted-foreground">Coaches assist your team with getting started, completing the project, and bringing your startup to market!</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Images */}
      <section className="py-20 bg-card/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-16">How does it work?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Image 1 with text overlay */}
            <div className="relative rounded-xl overflow-hidden bg-primary/5 aspect-[4/3] hover:shadow-xl transition-all duration-300 hover:scale-[1.03] group">
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent flex flex-col justify-end p-6">
                <div className="mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">1</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">Create your project</h3>
                <p className="text-muted-foreground opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Define your vision, set goals, and specify the team roles you need
                </p>
              </div>
            </div>
            
            {/* Image 2 with text overlay */}
            <div className="relative rounded-xl overflow-hidden bg-primary/5 aspect-[4/3] hover:shadow-xl transition-all duration-300 hover:scale-[1.03] group">
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent flex flex-col justify-end p-6">
                <div className="mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">2</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">Build your team</h3>
                <p className="text-muted-foreground opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Review applications and select the best talents to join your project
                </p>
              </div>
            </div>
            
            {/* Image 3 with text overlay */}
            <div className="relative rounded-xl overflow-hidden bg-primary/5 aspect-[4/3] hover:shadow-xl transition-all duration-300 hover:scale-[1.03] group">
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent flex flex-col justify-end p-6">
                <div className="mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">3</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">Launch your startup</h3>
                <p className="text-muted-foreground opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Collaborate efficiently, showcase your progress, and attract investors
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join our community today!</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create an account now and start your journey to building or joining amazing projects
            </p>
            <Button 
              size="lg" 
              className="text-lg px-10 py-6"
              onClick={() => navigate("/auth")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}