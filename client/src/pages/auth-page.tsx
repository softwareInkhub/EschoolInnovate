import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Lock,
  User,
  Mail,
  KeyRound,
  Shield,
  Check,
  Rocket,
  Lightbulb,
  GitMerge,
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Login schema
const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

// Registration schema
const registerSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

export default function AuthPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<string>("login");

  // If user is already logged in, redirect to projects page
  if (user) {
    navigate("/projects");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel (Form) */}
      <motion.div 
        className="w-full md:w-1/2 flex-shrink-0 flex items-center justify-center p-6 md:p-12 bg-background"
        initial="hidden"
        animate="visible"
        variants={fadeInLeft}
      >
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Welcome to <span className="text-primary">eSchool.ai</span></h1>
            <p className="text-muted-foreground">Sign in to your account or create a new one to get started</p>
          </div>
          
          <Tabs 
            defaultValue="login" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Create Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
      
      {/* Right panel (Details) */}
      <motion.div 
        className="w-full md:w-1/2 bg-gradient-to-br from-primary/10 via-background to-primary/5 relative hidden md:flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInRight}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>
        <div className="absolute left-1/2 top-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full blur-[80px] z-0"></div>
        
        <div className="relative z-10 max-w-md mx-8 p-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="text-3xl font-bold mb-6">Join Our Innovative Community</h2>
          <p className="text-muted-foreground mb-8">
            Connect with passionate creators, find exciting projects, and access world-class educational resources to accelerate your growth.
          </p>
          
          <div className="space-y-4 mb-12">
            {[
              { icon: <GitMerge className="h-5 w-5 text-primary" />, text: "Collaborate on cutting-edge projects" },
              { icon: <Rocket className="h-5 w-5 text-primary" />, text: "Accelerate your idea from concept to launch" },
              { icon: <BookOpen className="h-5 w-5 text-primary" />, text: "Access premium educational content" },
              { icon: <Lightbulb className="h-5 w-5 text-primary" />, text: "Connect with like-minded innovators" }
            ].map((item, i) => (
              <div key={i} className="flex items-start">
                <div className="mr-3 mt-0.5">
                  {item.icon}
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          
          <div className="p-4 border border-border bg-card/50 rounded-lg">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">Jessica Wilson</div>
                <div className="text-sm text-muted-foreground">UX Designer</div>
              </div>
            </div>
            <p className="text-sm italic">
              "eSchool.ai helped me connect with an amazing team of developers. Together we built a product that now has over 10,000 users!"
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function LoginForm() {
  const { loginMutation } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  
  function onSubmit(data: LoginFormValues) {
    console.log("Login form submitted:", data);
    loginMutation.mutate(data, {
      onSuccess: () => {
        console.log("Login successful, redirecting to /projects");
        navigate("/projects");
      }
    });
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Enter your username" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input type="password" placeholder="Enter your password" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Button variant="link" className="p-0 h-auto text-primary" type="button">
              Forgot password?
            </Button>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <div className="flex items-center">
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
              Signing in...
            </div>
          ) : (
            <div className="flex items-center">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}

function RegisterForm() {
  const { registerMutation } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });
  
  function onSubmit(data: RegisterFormValues) {
    // Remove confirmPassword as it's not part of the API
    const { confirmPassword, ...registrationData } = data;
    
    console.log("Register form submitted:", registrationData);
    registerMutation.mutate(registrationData, {
      onSuccess: () => {
        console.log("Registration successful, redirecting to /projects");
        navigate("/projects");
      },
      onError: (error) => {
        console.error("Registration error:", error);
      }
    });
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Choose a username" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Enter your email" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input type="password" placeholder="Create a password" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input type="password" placeholder="Confirm your password" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="text-sm text-muted-foreground mt-4">
          By registering, you agree to our Terms of Service and Privacy Policy.
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? (
            <div className="flex items-center">
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
              Creating account...
            </div>
          ) : (
            <div className="flex items-center">
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}