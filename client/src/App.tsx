import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProjectDetails from "@/pages/ProjectDetails";
import Dashboard from "@/pages/Dashboard";
import AuthPage from "@/pages/auth-page";
import LandingPage from "@/pages/LandingPage";
import ProjectsPage from "@/pages/ProjectsPage";
import SchoolsPage from "@/pages/SchoolsPage";
import SchoolDetailPage from "@/pages/SchoolDetailPage";
import FeaturesShowcase from "@/pages/FeaturesShowcase";
import CompetitionPage from "@/pages/CompetitionPage";
import ExplorePage from "@/pages/ExplorePage";
import FAQPage from "@/pages/FAQPage";
import BlogPage from "@/pages/BlogPage";
import AdvancedFeaturesPage from "@/pages/AdvancedFeaturesPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/hooks/use-auth";
import { HelpProvider } from "@/hooks/use-help-context";
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-[#121216]">
      <Switch>
        {/* Authentication page route */}
        <Route path="/auth">
          <AuthPage />
        </Route>
        
        {/* Public pages */}
        <Route path="/explore">
          <Navbar />
          <main className="flex-1">
            <ExplorePage />
          </main>
          <Footer />
        </Route>
        
        <Route path="/faq">
          <Navbar />
          <main className="flex-1">
            <FAQPage />
          </main>
          <Footer />
        </Route>
        
        <Route path="/blogs">
          <Navbar />
          <main className="flex-1">
            <BlogPage />
          </main>
          <Footer />
        </Route>
        
        <Route path="/advanced-features">
          <Navbar />
          <main className="flex-1">
            <AdvancedFeaturesPage />
          </main>
          <Footer />
        </Route>
        
        {/* Protected routes that require authentication */}
        <Route path="/projects">
          <Navbar />
          <main className="flex-1">
            <ProtectedRoute path="/projects" component={ProjectsPage} />
          </main>
          <Footer />
        </Route>
        
        <Route path="/projects/:id">
          <Navbar />
          <main className="flex-1">
            <ProtectedRoute path="/projects/:id" component={ProjectDetails} />
          </main>
          <Footer />
        </Route>
        
        <Route path="/dashboard">
          <Navbar />
          <main className="flex-1">
            <ProtectedRoute path="/dashboard" component={Dashboard} />
          </main>
          <Footer />
        </Route>
        
        <Route path="/schools">
          <Navbar />
          <main className="flex-1">
            <SchoolsPage />
          </main>
          <Footer />
        </Route>
        
        <Route path="/schools/:id">
          <Navbar />
          <main className="flex-1">
            <SchoolDetailPage />
          </main>
          <Footer />
        </Route>
        
        <Route path="/home">
          <Navbar />
          <main className="flex-1">
            <ProtectedRoute path="/home" component={Home} />
          </main>
          <Footer />
        </Route>
        
        <Route path="/features">
          <Navbar />
          <main className="flex-1">
            <ProtectedRoute path="/features" component={FeaturesShowcase} />
          </main>
          <Footer />
        </Route>

        <Route path="/competitions">
          <Navbar />
          <main className="flex-1">
            <ProtectedRoute path="/competitions" component={CompetitionPage} />
          </main>
          <Footer />
        </Route>
        
        {/* Landing page as root route - accessible to everyone */}
        <Route path="/">
          <Navbar />
          <main className="flex-1">
            <LandingPage />
          </main>
          <Footer />
        </Route>
        
        {/* 404 Not Found Route */}
        <Route>
          <Navbar />
          <main className="flex-1">
            <NotFound />
          </main>
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <HelpProvider>
            <Toaster />
            <Router />
          </HelpProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
