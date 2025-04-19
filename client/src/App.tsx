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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-[#121216]">
      <Switch>
        {/* Authentication page route */}
        <Route path="/auth">
          <AuthPage />
        </Route>
        
        {/* Landing page - accessible to everyone */}
        <Route path="/">
          <Navbar />
          <main className="flex-1">
            <LandingPage />
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
        
        <Route path="/project/:id">
          <Navbar />
          <main className="flex-1">
            <ProtectedRoute path="/project/:id" component={ProjectDetails} />
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
            <ProtectedRoute path="/schools" component={SchoolsPage} />
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
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
