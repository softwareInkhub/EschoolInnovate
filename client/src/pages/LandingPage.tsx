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
  Check
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
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-background/80">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNi0yOHY2aDZ2LTZoLTZ6bTAgMTJoNnY2aC02di02em0tMTIgMGg2djZoLTZ2LTZ6bS02IDBoNnY2aC02di02em0xMiAwaC02djZoNnYtNnptLTEyIDBoLTZ2Nmg2di02em0tNiAwdi02aC02djZoNnptMTIgMHYtNmgtNnY2aDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6">
              eSchool<span className="text-foreground">.ai</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Connect with innovative projects and learn from top tech schools in one platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                className="px-8 py-6 text-lg"
                onClick={() => navigate("/auth")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="px-8 py-6 text-lg">
                Explore Projects
              </Button>
            </div>
          </div>
          
          {/* Animated Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-border">
              <div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
                <GitMerge className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Collaborate</h3>
              <p className="text-muted-foreground">Find projects and team up with talented individuals to build amazing products.</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-border transform md:translate-y-4">
              <div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Learn</h3>
              <p className="text-muted-foreground">Access educational resources and schools to enhance your skills.</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-border">
              <div className="bg-primary/20 p-3 rounded-full w-fit mb-4">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Launch</h3>
              <p className="text-muted-foreground">Showcase your ideas and turn them into successful startups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">How eSchool.ai Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col items-start">
              <h3 className="text-2xl font-bold mb-6 text-primary">For Project Creators</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <p>Post your innovative startup ideas and projects</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <p>Define the roles you need to fill in your team</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <p>Review applications and build your dream team</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <p>Track project progress and collaborate effectively</p>
                </li>
              </ul>
              <Button className="mt-8" onClick={() => navigate("/auth")}>
                Create a Project
              </Button>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-2xl font-bold mb-6 text-primary">For Collaborators</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <p>Discover interesting projects that match your skills</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <p>Apply to join teams with your unique expertise</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <p>Enhance your portfolio with real-world projects</p>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <p>Learn new skills from online schools and workshops</p>
                </li>
              </ul>
              <Button className="mt-8" onClick={() => navigate("/auth")}>
                Find Projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Schools Section Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Educational Partners</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Access high-quality educational content from leading schools in technology, business, design, and more.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* School Card 1 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border hover:shadow-lg transition-all">
              <div className="bg-primary h-2"></div>
              <div className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">TechAcademy</h3>
                <p className="text-muted-foreground mb-4">Advanced courses in programming, AI, and machine learning</p>
                <p className="text-sm text-primary">24 Courses Available</p>
              </div>
            </div>
            
            {/* School Card 2 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border hover:shadow-lg transition-all">
              <div className="bg-primary h-2"></div>
              <div className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">Business Hub</h3>
                <p className="text-muted-foreground mb-4">Startup fundamentals, marketing, and growth strategies</p>
                <p className="text-sm text-primary">18 Courses Available</p>
              </div>
            </div>
            
            {/* School Card 3 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border hover:shadow-lg transition-all">
              <div className="bg-primary h-2"></div>
              <div className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <GitMerge className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">Design Master</h3>
                <p className="text-muted-foreground mb-4">UX/UI design principles and practical applications</p>
                <p className="text-sm text-primary">15 Courses Available</p>
              </div>
            </div>
            
            {/* School Card 4 */}
            <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border hover:shadow-lg transition-all">
              <div className="bg-primary h-2"></div>
              <div className="p-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">Innovation Lab</h3>
                <p className="text-muted-foreground mb-4">Product development and innovation frameworks</p>
                <p className="text-sm text-primary">12 Courses Available</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/auth")}
            >
              Explore All Schools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create an account today to browse projects, join teams, and access educational content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => navigate("/auth")}
              >
                Sign Up Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8"
                onClick={() => navigate("/auth")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}