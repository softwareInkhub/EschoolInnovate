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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-[#121216]">
      <Switch>
        <Route path="/auth">
          <AuthPage />
        </Route>
        
        <Route>
          <Navbar />
          <main className="flex-1">
            <Switch>
              <ProtectedRoute path="/" component={Home} />
              <ProtectedRoute path="/project/:id" component={ProjectDetails} />
              <ProtectedRoute path="/dashboard" component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
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
