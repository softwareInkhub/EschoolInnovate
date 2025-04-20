import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Project, Role, TeamMember, Application } from "@shared/schema";

// Get all projects
export function useProjects(): UseQueryResult<Project[], Error> {
  return useQuery({
    queryKey: ["/api/projects"],
  });
}

// Get featured projects
export function useFeaturedProjects(): UseQueryResult<Project[], Error> {
  return useQuery({
    queryKey: ["/api/projects/featured"],
  });
}

// Get filtered projects based on search term and filters
export function useFilteredProjects(
  searchTerm: string, 
  filters: { category: string; stage: string; teamSize: string }
): UseQueryResult<Project[], Error> {
  const { data: allProjects, ...rest } = useProjects();
  
  const filteredData = allProjects?.filter(project => {
    // Search term filter
    const matchesSearch = !searchTerm || 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = !filters.category || filters.category === 'all' || 
      project.category === filters.category;
    
    // Stage filter
    const matchesStage = !filters.stage || filters.stage === 'all' || 
      project.stage === filters.stage;
    
    // Team size filter
    let matchesTeamSize = true;
    if (filters.teamSize && filters.teamSize !== 'all') {
      if (filters.teamSize === 'small') {
        matchesTeamSize = project.maxTeamSize <= 5;
      } else if (filters.teamSize === 'medium') {
        matchesTeamSize = project.maxTeamSize > 5 && project.maxTeamSize <= 10;
      } else if (filters.teamSize === 'large') {
        matchesTeamSize = project.maxTeamSize > 10;
      }
    }
    
    return matchesSearch && matchesCategory && matchesStage && matchesTeamSize;
  });
  
  return {
    ...rest,
    data: filteredData
  } as UseQueryResult<Project[], Error>;
}

// Get a single project by ID
export function useProject(id: number): UseQueryResult<Project, Error> {
  return useQuery({
    queryKey: [`/api/projects/${id}`],
    enabled: !!id,
  });
}

// Get project roles
export function useProjectRoles(projectId: number): UseQueryResult<Role[], Error> {
  return useQuery({
    queryKey: [`/api/projects/${projectId}/roles`],
    enabled: !!projectId,
  });
}

// Get project team members
export function useProjectTeam(projectId: number): UseQueryResult<TeamMember[], Error> {
  return useQuery({
    queryKey: [`/api/projects/${projectId}/team`],
    enabled: !!projectId,
  });
}

// Get applications for a project (for project owners)
export function useProjectApplications(projectId: number): UseQueryResult<Application[], Error> {
  return useQuery({
    queryKey: [`/api/projects/${projectId}/applications`],
    enabled: !!projectId,
  });
}

// Create a new project
export function useCreateProject() {
  return useMutation({
    mutationFn: async (projectData: any) => {
      const response = await apiRequest("POST", "/api/projects", projectData);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects/featured"] });
    },
  });
}

// Update an existing project
export function useUpdateProject(id: number) {
  return useMutation({
    mutationFn: async (projectData: Partial<Project>) => {
      const response = await apiRequest("PATCH", `/api/projects/${id}`, projectData);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${id}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects/featured"] });
    },
  });
}

// Delete a project
export function useDeleteProject() {
  return useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/projects/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects/featured"] });
    },
  });
}

// Apply to a project role
export function useApplyToProject(projectId: number) {
  return useMutation({
    mutationFn: async (applicationData: any) => {
      const response = await apiRequest("POST", `/api/projects/${projectId}/apply`, applicationData);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}/applications`] });
      queryClient.invalidateQueries({ queryKey: ["/api/applications/user"] });
    },
  });
}

// Directly join a project/startup team
export function useJoinProject(projectId: number) {
  return useMutation({
    mutationFn: async (data: { roleId?: number | null }) => {
      const response = await apiRequest("POST", `/api/projects/${projectId}/join`, data);
      return await response.json();
    },
    onSuccess: () => {
      // Invalidate relevant queries to update UI
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}/team`] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
  });
}

// Accept/reject application
export function useUpdateApplicationStatus() {
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PATCH", `/api/applications/${id}`, { status });
      return await response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${data.projectId}/applications`] });
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${data.projectId}/team`] });
      queryClient.invalidateQueries({ queryKey: ["/api/applications/user"] });
    },
  });
}

// Create a new team role
export function useCreateRole(projectId: number) {
  return useMutation({
    mutationFn: async (roleData: any) => {
      const response = await apiRequest("POST", `/api/projects/${projectId}/roles`, roleData);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}/roles`] });
    },
  });
}

// Update a team role
export function useUpdateRole(projectId: number) {
  return useMutation({
    mutationFn: async ({ id, ...roleData }: { id: number } & Partial<Role>) => {
      const response = await apiRequest("PATCH", `/api/roles/${id}`, roleData);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}/roles`] });
    },
  });
}

// Delete a team role
export function useDeleteRole(projectId: number) {
  return useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/roles/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}/roles`] });
    },
  });
}