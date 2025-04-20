import { useQuery } from "@tanstack/react-query";
import { School, Course, Instructor } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";

// Interface for Course with additional properties used in UI
export interface EnrichedCourse extends Course {
  level?: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  isNew?: boolean;
  discountedPrice?: number;
  instructor?: Instructor;
  modules?: Array<{
    id: number;
    title: string;
    description: string | null;
    courseId: number;
    order: number;
    lessons: Array<{
      id: number;
      title: string;
      description: string | null;
      moduleId: number;
      order: number;
      duration: number;
      type: string;
      content: string | null;
      videoUrl: string | null;
      attachments: Array<{ name: string; url: string; type: string }> | null;
      preview: boolean | null;
    }>;
  }>;
}

// Get all schools
export function useSchools() {
  return useQuery<School[]>({
    queryKey: ['/api/schools'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get featured schools
export function useFeaturedSchools() {
  return useQuery<School[]>({
    queryKey: ['/api/schools/featured'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get a specific school by ID
export function useSchool(id: number | null) {
  return useQuery<School | undefined>({
    queryKey: ['/api/schools', id],
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get courses for a specific school
export function useSchoolCourses(schoolId: number | null) {
  return useQuery<Course[]>({
    queryKey: ['/api/schools', schoolId, 'courses'],
    enabled: !!schoolId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get instructors for a specific school
export function useSchoolInstructors(schoolId: number | null) {
  return useQuery<Instructor[]>({
    queryKey: ['/api/schools', schoolId, 'instructors'],
    enabled: !!schoolId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get all courses
export function useCourses() {
  return useQuery<Course[]>({
    queryKey: ['/api/courses'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get featured courses
export function useFeaturedCourses() {
  return useQuery<Course[]>({
    queryKey: ['/api/courses/featured'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get popular courses
export function usePopularCourses() {
  return useQuery<Course[]>({
    queryKey: ['/api/courses/popular'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get new courses
export function useNewCourses() {
  return useQuery<Course[]>({
    queryKey: ['/api/courses/new'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get a specific course by ID
export function useCourse(id: number | null) {
  return useQuery<EnrichedCourse | undefined>({
    queryKey: ['/api/courses', id],
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get all instructors
export function useInstructors() {
  return useQuery<Instructor[]>({
    queryKey: ['/api/instructors'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get a specific instructor by ID
export function useInstructor(id: number | null) {
  return useQuery<Instructor | undefined>({
    queryKey: ['/api/instructors', id],
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}