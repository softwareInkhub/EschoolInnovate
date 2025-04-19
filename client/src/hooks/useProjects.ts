import { 
  useQuery, 
  useMutation, 
  UseQueryResult, 
  UseMutationResult 
} from "@tanstack/react-query";
import { Project, InsertProject, ProjectFormData } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Hook to get all projects
export function useProjects(): UseQueryResult<Project[], Error> {
  return useQuery<Project[], Error>({
    queryKey: ["/api/projects"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook to get featured projects
export function useFeaturedProjects(): UseQueryResult<Project[], Error> {
  return useQuery<Project[], Error>({
    queryKey: ["/api/projects/featured"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook to get a single project by ID
export function useProject(id: number | string | undefined): UseQueryResult<Project, Error> {
  return useQuery<Project, Error>({
    queryKey: ["/api/projects", id],
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id, // Only run the query if id is provided
  });
}

// Hook to create a new project
export function useCreateProject(): UseMutationResult<Project, Error, ProjectFormData> {
  const { toast } = useToast();
  
  return useMutation<Project, Error, ProjectFormData>({
    mutationFn: (projectData: ProjectFormData) => {
      console.log("Creating project with data:", projectData);
      
      return apiRequest("POST", "/api/projects", projectData)
        .then(res => res.json());
    },
    onSuccess: (project: Project) => {
      // Invalidate relevant queries to update the UI
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects/featured"] });
      
      toast({
        title: "Project created",
        description: "Your project has been created successfully!",
      });
    },
    onError: (error: Error) => {
      console.error("Failed to create project:", error);
      
      toast({
        title: "Failed to create project",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  });
}

// Hook to update an existing project
export function useUpdateProject(id: number | string): UseMutationResult<Project, Error, Partial<ProjectFormData>> {
  const { toast } = useToast();
  
  return useMutation<Project, Error, Partial<ProjectFormData>>({
    mutationFn: (projectData: Partial<ProjectFormData>) => {
      return apiRequest("PUT", `/api/projects/${id}`, projectData)
        .then(res => res.json());
    },
    onSuccess: (project: Project) => {
      // Invalidate relevant queries to update the UI
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects", id] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects/featured"] });
      
      toast({
        title: "Project updated",
        description: "Your project has been updated successfully!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update project",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  });
}

// Hook to apply to a project
export function useApplyToProject(projectId: number | string): UseMutationResult<any, Error, any> {
  const { toast } = useToast();
  
  return useMutation<any, Error, any>({
    mutationFn: (applicationData: any) => {
      return apiRequest("POST", `/api/projects/${projectId}/apply`, applicationData)
        .then(res => res.json());
    },
    onSuccess: () => {
      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to submit application",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  });
}

// Hook to get roles for a project
export function useProjectRoles(projectId: number | string | undefined) {
  return useQuery({
    queryKey: ["/api/projects", projectId, "roles"],
    queryFn: () => apiRequest("GET", `/api/projects/${projectId}/roles`).then(res => res.json()),
    enabled: !!projectId, // Only run the query if projectId is provided
  });
}

// Hook to get team members for a project
export function useProjectTeam(projectId: number | string | undefined) {
  return useQuery({
    queryKey: ["/api/projects", projectId, "team"],
    queryFn: () => apiRequest("GET", `/api/projects/${projectId}/team`).then(res => res.json()),
    enabled: !!projectId, // Only run the query if projectId is provided
  });
}

// Hook to get filtered projects
export function useFilteredProjects(
  searchTerm: string = "",
  filters: { category: string; stage: string; teamSize: string } = { category: "all", stage: "all", teamSize: "all" }
) {
  const projectsQuery = useProjects();
  
  const filteredProjects = projectsQuery.data?.filter(project => {
    // Filter by search term
    if (searchTerm && 
        !project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !project.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (filters.category !== "all" && 
        project.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }
    
    // Filter by stage
    if (filters.stage !== "all" && 
        project.stage.toLowerCase() !== filters.stage.toLowerCase()) {
      return false;
    }
    
    // Filter by team size
    if (filters.teamSize !== "all") {
      const size = parseInt(filters.teamSize);
      if (size === 1 && project.teamSize > 5) return false;
      if (size === 2 && (project.teamSize <= 5 || project.teamSize > 10)) return false;
      if (size === 3 && project.teamSize <= 10) return false;
    }
    
    return true;
  });
  
  return {
    ...projectsQuery,
    data: filteredProjects || [],
  };
}