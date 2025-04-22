import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/hooks/use-auth";
import { HelpProvider } from "@/hooks/use-help-context";
import { ProtectedRoute } from "@/lib/protected-route";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Eagerly load critical components
import LandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";
import ExplorePage from "@/pages/ExplorePage";
import SchoolsPage from "@/pages/SchoolsPage";
import SchoolsPartnershipPage from "@/pages/SchoolsPartnershipPage";
import ProjectsPage from "@/pages/ProjectsPage";
import CompetitionPage from "@/pages/CompetitionPage";
import CoursesPage from "@/pages/CoursesPage";

// Lazy load less critical components
const Home = lazy(() => import("@/pages/Home"));
const ProjectDetails = lazy(() => import("@/pages/ProjectDetails"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const SchoolDetailPage = lazy(() => import("@/pages/SchoolDetailPage"));
const FeaturesShowcase = lazy(() => import("@/pages/FeaturesShowcase"));
const FAQPage = lazy(() => import("@/pages/FAQPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const AdvancedFeaturesPage = lazy(() => import("@/pages/AdvancedFeaturesPage"));

// Import the loading component
import { PageLoading } from "@/components/ui/page-loading";

// Common layout component to maintain consistent structure
const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </>
);

function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-[#121216]">
      <Switch>
        {/* Authentication page route - directly loaded */}
        <Route path="/auth">
          <PageLayout>
            <AuthPage />
          </PageLayout>
        </Route>
        
        {/* Public pages */}
        <Route path="/explore">
          <PageLayout>
            <ExplorePage />
          </PageLayout>
        </Route>
        
        <Route path="/faq">
          <PageLayout>
            <FAQPage />
          </PageLayout>
        </Route>
        
        <Route path="/blogs">
          <PageLayout>
            <BlogPage />
          </PageLayout>
        </Route>
        
        <Route path="/advanced-features">
          <PageLayout>
            <AdvancedFeaturesPage />
          </PageLayout>
        </Route>
        
        {/* Protected routes that require authentication */}
        <Route path="/projects">
          <PageLayout>
            <ProtectedRoute path="/projects" component={ProjectsPage} />
          </PageLayout>
        </Route>
        
        <Route path="/projects/:id">
          <PageLayout>
            <ProtectedRoute path="/projects/:id" component={ProjectDetails} />
          </PageLayout>
        </Route>
        
        <Route path="/dashboard">
          <PageLayout>
            <ProtectedRoute path="/dashboard" component={Dashboard} />
          </PageLayout>
        </Route>
        
        <Route path="/schools">
          <PageLayout>
            <SchoolsPage />
          </PageLayout>
        </Route>

        <Route path="/schools/partnership">
          <PageLayout>
            <SchoolsPartnershipPage />
          </PageLayout>
        </Route>
        
        <Route path="/schools/:id">
          <PageLayout>
            <SchoolDetailPage />
          </PageLayout>
        </Route>
        
        <Route path="/courses">
          <PageLayout>
            <CoursesPage />
          </PageLayout>
        </Route>
        
        <Route path="/home">
          <PageLayout>
            <ProtectedRoute path="/home" component={Home} />
          </PageLayout>
        </Route>
        
        <Route path="/features">
          <PageLayout>
            <ProtectedRoute path="/features" component={FeaturesShowcase} />
          </PageLayout>
        </Route>

        <Route path="/competitions">
          <PageLayout>
            <ProtectedRoute path="/competitions" component={CompetitionPage} />
          </PageLayout>
        </Route>
        
        {/* Landing page as root route - directly loaded for best performance */}
        <Route path="/">
          <PageLayout>
            <LandingPage />
          </PageLayout>
        </Route>
        
        {/* 404 Not Found Route */}
        <Route>
          <PageLayout>
            <NotFound />
          </PageLayout>
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
