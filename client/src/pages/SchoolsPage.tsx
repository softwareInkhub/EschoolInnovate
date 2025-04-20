import { useState } from "react";
import { useLocation } from "wouter";
import { useSchools } from "@/hooks/useSchools";
import { School } from "@shared/schema";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Search, Filter, Book, Users, Award, Star, ArrowRight } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SCHOOL_CATEGORIES } from "@/utils/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const SchoolCard = ({ school }: { school: School }) => {
  const [, navigate] = useLocation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="h-full"
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
        <div className="relative aspect-video w-full overflow-hidden">
          <img 
            src={school.image || "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789"} 
            alt={school.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {school.featured && (
            <Badge variant="secondary" className="absolute top-2 right-2 bg-amber-500/90 text-black">
              Featured
            </Badge>
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold">{school.name}</CardTitle>
            {school.rating && (
              <div className="flex items-center gap-1 bg-amber-500/20 p-1 px-2 rounded-md">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span className="text-sm font-semibold">{school.rating}.0</span>
              </div>
            )}
          </div>
          <CardDescription>{school.category}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {school.description}
          </p>
          
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Book className="h-4 w-4 text-muted-foreground" />
              <span>{school.courseCount} Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{school.studentsCount || "500+"} Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span>{school.instructorsCount || "10+"} Instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span>{school.categories?.length || 4} Categories</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => navigate(`/schools/${school.id}`)}
            variant="default"
          >
            <span>Explore School</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const SchoolCardSkeleton = () => (
  <Card className="h-full overflow-hidden flex flex-col">
    <Skeleton className="aspect-video w-full" />
    <CardHeader className="pb-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2 mt-2" />
    </CardHeader>
    <CardContent className="pb-2 flex-grow">
      <Skeleton className="h-4 w-full mt-2" />
      <Skeleton className="h-4 w-full mt-2" />
      <Skeleton className="h-4 w-3/4 mt-2" />
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </CardContent>
    <CardFooter>
      <Skeleton className="h-10 w-full" />
    </CardFooter>
  </Card>
);

export default function SchoolsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  
  const { data: schools, isLoading, error } = useSchools();
  
  const filteredSchools = schools?.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          school.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || school.category === category;
    
    return matchesSearch && matchesCategory;
  }) || [];
  
  const sortedSchools = [...filteredSchools].sort((a, b) => {
    if (sortBy === 'featured') {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    } else if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    } else if (sortBy === 'students') {
      return (b.studentsCount || 0) - (a.studentsCount || 0);
    } else if (sortBy === 'courses') {
      return (b.courseCount || 0) - (a.courseCount || 0);
    }
    
    return 0;
  });
  
  // Header animation
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      } 
    }
  };
  
  const schoolsCount = schools?.length || 0;
  
  const handleApplyClick = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to apply for instructor positions.",
        variant: "destructive",
      });
    } else {
      // For now, just show a toast notification
      toast({
        title: "Application received",
        description: "Thank you for your interest! We'll review your application and get back to you soon.",
      });
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        ref={headerRef}
        variants={headerVariants}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        className="mb-12 text-center"
      >
        <motion.h1 variants={headerVariants} className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-yellow-300">
          Learning Schools
        </motion.h1>
        <motion.p variants={headerVariants} className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          Explore our specialized schools taught by industry experts. Master new skills, 
          advance your career, and connect with a community of learners from around India.
        </motion.p>
        
        <motion.div variants={headerVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button onClick={handleApplyClick} size="lg" variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black">
            Become an Instructor
          </Button>
          <Button onClick={() => document.getElementById('schools-grid')?.scrollIntoView({ behavior: 'smooth' })} size="lg">
            Explore Schools
          </Button>
        </motion.div>
        
        <motion.div variants={headerVariants} className="p-4 bg-card rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search schools by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-48">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {SCHOOL_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="courses">Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold">{sortedSchools.length}</span> of <span className="font-semibold">{schoolsCount}</span> schools
            </p>
          </div>
        </motion.div>
      </motion.div>
      
      <div id="schools-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          // Show loading skeletons
          Array.from({ length: 8 }).map((_, i) => (
            <SchoolCardSkeleton key={i} />
          ))
        ) : error ? (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-red-500">Error loading schools. Please try again later.</p>
          </div>
        ) : sortedSchools.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-lg">No schools found matching your criteria. Try adjusting your filters.</p>
          </div>
        ) : (
          sortedSchools.map(school => (
            <SchoolCard key={school.id} school={school} />
          ))
        )}
      </div>
    </div>
  );
}