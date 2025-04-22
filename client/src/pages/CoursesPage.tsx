import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Loader2, Star, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'framer-motion';
import { Course } from '@shared/schema';
import { ParallaxTilt } from '@/components/ui/parallax-tilt';

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState('all');
  
  const { data: allCourses, isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
    staleTime: 60 * 1000, // 1 minute
  });
  
  const { data: featuredCourses } = useQuery<Course[]>({
    queryKey: ['/api/courses/featured'],
    staleTime: 60 * 1000, // 1 minute
  });
  
  const { data: popularCourses } = useQuery<Course[]>({
    queryKey: ['/api/courses/popular'],
    staleTime: 60 * 1000, // 1 minute
  });
  
  const { data: newCourses } = useQuery<Course[]>({
    queryKey: ['/api/courses/new'],
    staleTime: 60 * 1000, // 1 minute
  });
  
  const displayCourses = () => {
    switch (activeTab) {
      case 'featured':
        return featuredCourses || [];
      case 'popular':
        return popularCourses || [];
      case 'new':
        return newCourses || [];
      default:
        return allCourses || [];
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 mb-20 min-h-screen">
      <AnimatedSection>
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
            Discover Courses for Skill Development
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            Explore our wide range of courses designed to help you master new skills, advance your career, and bring your startup ideas to life.
          </p>
        </div>
      </AnimatedSection>
      
      <AnimatedSection delay={0.1}>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button 
            variant={activeTab === 'all' ? "default" : "outline"} 
            onClick={() => setActiveTab('all')}
            className="rounded-full px-6"
          >
            All Courses
          </Button>
          <Button 
            variant={activeTab === 'featured' ? "default" : "outline"} 
            onClick={() => setActiveTab('featured')}
            className="rounded-full px-6"
          >
            Featured
          </Button>
          <Button 
            variant={activeTab === 'popular' ? "default" : "outline"} 
            onClick={() => setActiveTab('popular')}
            className="rounded-full px-6"
          >
            Popular
          </Button>
          <Button 
            variant={activeTab === 'new' ? "default" : "outline"} 
            onClick={() => setActiveTab('new')}
            className="rounded-full px-6"
          >
            New Releases
          </Button>
        </div>
      </AnimatedSection>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayCourses().length > 0 ? (
            displayCourses().map((course, index) => (
              <AnimatedSection key={course.id} delay={0.05 * (index % 4)}>
                <ParallaxTilt>
                  <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 border border-border h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="bg-primary/10">
                          {course.category}
                        </Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                          <span className="text-sm">{course.rating?.toFixed(1) || "New"}</span>
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow pb-2">
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <User className="h-4 w-4 mr-1" />
                        <span>
                          {course.instructorId ? 
                            `Instructor #${course.instructorId}` : 
                            'School Staff'}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration || '8 hours'} of content</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/schools/${course.schoolId}/courses/${course.id}`}>
                        <Button variant="default" className="w-full">
                          View Course
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </ParallaxTilt>
              </AnimatedSection>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-muted-foreground">No courses found in this category.</p>
              <p className="text-muted-foreground mt-2">Please check back later or try another category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}