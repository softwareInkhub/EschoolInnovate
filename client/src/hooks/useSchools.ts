import { useQuery } from "@tanstack/react-query";
import { School, Course, Instructor } from "@shared/schema";

interface EnrichedCourse extends Course {
  instructor: Instructor;
  modules: Array<{
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

export function useSchools() {
  return useQuery<School[]>({
    queryKey: ["/api/schools"],
  });
}

export function useFeaturedSchools() {
  return useQuery<School[]>({
    queryKey: ["/api/schools/featured"],
  });
}

export function useSchool(id: number | null) {
  return useQuery<School>({
    queryKey: ["/api/schools", id],
    enabled: !!id,
  });
}

export function useSchoolCourses(schoolId: number | null) {
  return useQuery<Course[]>({
    queryKey: ["/api/schools", schoolId, "courses"],
    enabled: !!schoolId,
  });
}

export function useSchoolInstructors(schoolId: number | null) {
  return useQuery<Instructor[]>({
    queryKey: ["/api/schools", schoolId, "instructors"],
    enabled: !!schoolId,
  });
}

export function useCourses() {
  return useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });
}

export function useFeaturedCourses() {
  return useQuery<Course[]>({
    queryKey: ["/api/courses/featured"],
  });
}

export function usePopularCourses() {
  return useQuery<Course[]>({
    queryKey: ["/api/courses/popular"],
  });
}

export function useNewCourses() {
  return useQuery<Course[]>({
    queryKey: ["/api/courses/new"],
  });
}

export function useCourse(id: number | null) {
  return useQuery<EnrichedCourse>({
    queryKey: ["/api/courses", id],
    enabled: !!id,
  });
}

export function useInstructors() {
  return useQuery<Instructor[]>({
    queryKey: ["/api/instructors"],
  });
}

export function useInstructor(id: number | null) {
  return useQuery<Instructor>({
    queryKey: ["/api/instructors", id],
    enabled: !!id,
  });
}