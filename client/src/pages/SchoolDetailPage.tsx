import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useSchool, useSchoolCourses, useSchoolInstructors } from "@/hooks/useSchools";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Book, 
  Users, 
  Award, 
  Star, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Globe, 
  Twitter, 
  Linkedin, 
  Youtube 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function SchoolDetailPage() {
  const [, params] = useRoute("/schools/:id");
  const schoolId = params?.id ? parseInt(params.id) : null;
  
  const { data: school, isLoading: isLoadingSchool, error: schoolError } = useSchool(schoolId);
  const { data: courses, isLoading: isLoadingCourses } = useSchoolCourses(schoolId);
  const { data: instructors, isLoading: isLoadingInstructors } = useSchoolInstructors(schoolId);
  
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Animations
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 }
    }
  };
  
  if (isLoadingSchool) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="h-64 w-full md:w-1/3 rounded-xl" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
          
          <Skeleton className="h-12 w-full max-w-md" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }
  
  if (schoolError || !school) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl text-center">
        <h1 className="text-3xl font-bold mb-4">School Not Found</h1>
        <p className="text-muted-foreground mb-8">The school you're looking for doesn't exist or there was an error loading it.</p>
        <Button onClick={() => navigate("/schools")}>
          Back to Schools
        </Button>
      </div>
    );
  }
  
  const stats = [
    { label: "Students", value: school.studentsCount || "500+", icon: <Users className="h-5 w-5 text-amber-500" /> },
    { label: "Instructors", value: school.instructorsCount || "10+", icon: <Award className="h-5 w-5 text-amber-500" /> },
    { label: "Courses", value: school.courseCount || "5+", icon: <Book className="h-5 w-5 text-amber-500" /> },
    { label: "Established", value: school.established || "2020", icon: <Calendar className="h-5 w-5 text-amber-500" /> },
    { label: "Location", value: school.location || "India", icon: <MapPin className="h-5 w-5 text-amber-500" /> },
    { label: "Rating", value: `${school.rating || 4}/5`, icon: <Star className="h-5 w-5 text-amber-500" /> },
  ];
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.div
        ref={headerRef}
        variants={headerVariants}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div variants={itemVariants} className="w-full md:w-1/3">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={school.banner || school.image || "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789"} 
                alt={school.name} 
                className="w-full h-64 object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">{school.name}</h1>
              
              {school.rating && (
                <div className="flex items-center gap-1 bg-amber-500/20 p-2 px-3 rounded-md">
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  <span className="text-lg font-semibold">{school.rating}.0</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center mb-4">
              <Badge className="bg-amber-500/90 text-black mr-2">{school.category}</Badge>
              {school.featured && <Badge variant="outline" className="border-amber-500 text-amber-500">Featured</Badge>}
            </div>
            
            <p className="text-muted-foreground mb-6">{school.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {school.socialLinks && (
                <>
                  {school.socialLinks.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={school.socialLinks.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-4 w-4" />
                        Website
                      </a>
                    </Button>
                  )}
                  
                  {school.socialLinks.twitter && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={school.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="mr-2 h-4 w-4" />
                        Twitter
                      </a>
                    </Button>
                  )}
                  
                  {school.socialLinks.linkedin && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={school.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  
                  {school.socialLinks.youtube && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={school.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                        <Youtube className="mr-2 h-4 w-4" />
                        YouTube
                      </a>
                    </Button>
                  )}
                </>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  {stat.icon}
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="font-semibold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div variants={itemVariants} className="mt-8">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="instructors">Instructors</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-amber-500" />
                      About {school.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{school.description}</p>
                    
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {school.categories?.map((category, index) => (
                          <Badge key={index} variant="secondary">{category}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-500" />
                      Key Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="bg-amber-500/20 p-1 rounded-full mt-0.5">
                          <Award className="h-4 w-4 text-amber-500" />
                        </div>
                        <span>Expert instructors with industry experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-amber-500/20 p-1 rounded-full mt-0.5">
                          <Book className="h-4 w-4 text-amber-500" />
                        </div>
                        <span>Comprehensive curriculum with practical projects</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-amber-500/20 p-1 rounded-full mt-0.5">
                          <Users className="h-4 w-4 text-amber-500" />
                        </div>
                        <span>Active learning community and networking opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-amber-500/20 p-1 rounded-full mt-0.5">
                          <MapPin className="h-4 w-4 text-amber-500" />
                        </div>
                        <span>Based in {school.location || "India"} with global reach</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Featured Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoadingCourses ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i} className="h-full overflow-hidden flex flex-col">
                        <Skeleton className="aspect-video w-full" />
                        <CardHeader className="pb-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/2 mt-2" />
                        </CardHeader>
                        <CardContent className="pb-2 flex-grow">
                          <Skeleton className="h-4 w-full mt-2" />
                          <Skeleton className="h-4 w-full mt-2" />
                        </CardContent>
                        <CardFooter>
                          <Skeleton className="h-10 w-full" />
                        </CardFooter>
                      </Card>
                    ))
                  ) : courses && courses.length > 0 ? (
                    courses
                      .filter(course => course.featured)
                      .slice(0, 3)
                      .map(course => (
                        <Card key={course.id} className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                          <div className="relative aspect-video w-full overflow-hidden">
                            <img 
                              src={course.thumbnail || "https://images.unsplash.com/photo-1593720213428-28a5b9e94613"} 
                              alt={course.title} 
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            {course.isNew && (
                              <Badge variant="secondary" className="absolute top-2 right-2 bg-amber-500/90 text-black">
                                New
                              </Badge>
                            )}
                          </div>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                              {course.rating && (
                                <div className="flex items-center gap-1 bg-amber-500/20 p-1 px-2 rounded-md">
                                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                  <span className="text-sm font-semibold">{course.rating}.0</span>
                                </div>
                              )}
                            </div>
                            <CardDescription>{course.category}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2 flex-grow">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {course.description}
                            </p>
                            
                            <div className="mt-4 flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span>{Math.floor(course.duration / 60)} hrs</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-normal">
                                  {course.level}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              className="w-full" 
                              onClick={() => navigate(`/courses/${course.id}`)}
                              variant="default"
                            >
                              <span>View Course</span>
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-muted-foreground">No featured courses available yet.</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 text-center">
                  <Button 
                    onClick={() => setActiveTab("courses")} 
                    variant="outline"
                    className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black"
                  >
                    View All Courses
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="courses" className="mt-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">All Courses</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Most Popular
                  </Button>
                  <Button variant="outline" size="sm">
                    Newest
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoadingCourses ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="h-full overflow-hidden flex flex-col">
                      <Skeleton className="aspect-video w-full" />
                      <CardHeader className="pb-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2 mt-2" />
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <Skeleton className="h-4 w-full mt-2" />
                        <Skeleton className="h-4 w-full mt-2" />
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-10 w-full" />
                      </CardFooter>
                    </Card>
                  ))
                ) : courses && courses.length > 0 ? (
                  courses.map(course => (
                    <Card key={course.id} className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <img 
                          src={course.thumbnail || "https://images.unsplash.com/photo-1593720213428-28a5b9e94613"} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {course.isNew && (
                          <Badge variant="secondary" className="absolute top-2 right-2 bg-amber-500/90 text-black">
                            New
                          </Badge>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                          {course.rating && (
                            <div className="flex items-center gap-1 bg-amber-500/20 p-1 px-2 rounded-md">
                              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              <span className="text-sm font-semibold">{course.rating}.0</span>
                            </div>
                          )}
                        </div>
                        <CardDescription>{course.category}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {course.description}
                        </p>
                        
                        <div className="mt-4 flex justify-between items-center text-sm">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span>{Math.floor(course.duration / 60)} hrs</span>
                          </div>
                          <Badge variant="outline" className="font-normal">
                            {course.level}
                          </Badge>
                          {course.price && (
                            <div className="font-semibold">
                              {course.discountedPrice ? (
                                <>
                                  <span className="line-through text-muted-foreground mr-1">₹{course.price}</span>
                                  <span className="text-amber-500">₹{course.discountedPrice}</span>
                                </>
                              ) : (
                                <span>₹{course.price}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={() => navigate(`/courses/${course.id}`)}
                          variant="default"
                        >
                          <span>View Course</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">No courses available for this school yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="instructors" className="mt-6">
              <h2 className="text-2xl font-bold mb-6">Our Instructors</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoadingInstructors ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="h-full">
                      <CardHeader className="flex flex-col items-center text-center">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <Skeleton className="h-6 w-40 mt-4" />
                        <Skeleton className="h-4 w-24 mt-2" />
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                      </CardContent>
                    </Card>
                  ))
                ) : instructors && instructors.length > 0 ? (
                  instructors.map(instructor => (
                    <Card key={instructor.id} className="h-full hover:shadow-lg transition-all duration-300">
                      <CardHeader className="flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={instructor.avatar || ""} alt={instructor.name} />
                          <AvatarFallback className="bg-amber-500/20 text-amber-700">
                            {instructor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className="mt-4">{instructor.name}</CardTitle>
                        <CardDescription>{instructor.title}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-4">
                          {instructor.bio}
                        </p>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center gap-1 text-sm">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span>{instructor.coursesCount || "2+"} Courses</span>
                          </div>
                          
                          {instructor.rating && (
                            <div className="flex items-center gap-1 bg-amber-500/20 p-1 px-2 rounded-md">
                              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                              <span className="text-xs font-semibold">{instructor.rating}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-center gap-4 pt-0">
                        {instructor.socialLinks && (
                          <>
                            {instructor.socialLinks.website && (
                              <a href={instructor.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-amber-500">
                                <Globe className="h-5 w-5" />
                              </a>
                            )}
                            {instructor.socialLinks.twitter && (
                              <a href={instructor.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-amber-500">
                                <Twitter className="h-5 w-5" />
                              </a>
                            )}
                            {instructor.socialLinks.linkedin && (
                              <a href={instructor.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-amber-500">
                                <Linkedin className="h-5 w-5" />
                              </a>
                            )}
                          </>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">No instructors available for this school yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}