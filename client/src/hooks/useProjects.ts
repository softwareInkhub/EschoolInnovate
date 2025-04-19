import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { Project, ProjectFormData } from '@shared/schema';

// Hook for fetching all projects
export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });
}

// Hook for fetching featured projects
export function useFeaturedProjects() {
  return useQuery<Project[]>({
    queryKey: ['/api/projects/featured'],
  });
}

// Hook for fetching a single project
export function useProject(id: number | string | undefined) {
  return useQuery<Project>({
    queryKey: [`/api/projects/${id}`],
    enabled: !!id,
  });
}

// Hook for creating a new project
export function useCreateProject() {
  return useMutation({
    mutationFn: (projectData: ProjectFormData) => {
      return apiRequest('POST', '/api/projects', projectData);
    },
    onSuccess: () => {
      // Invalidate relevant queries to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      queryClient.invalidateQueries({ queryKey: ['/api/projects/featured'] });
    },
  });
}

// Hook for updating an existing project
export function useUpdateProject(id: number | string) {
  return useMutation({
    mutationFn: (projectData: Partial<ProjectFormData>) => {
      return apiRequest('PUT', `/api/projects/${id}`, projectData);
    },
    onSuccess: () => {
      // Invalidate relevant queries to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      queryClient.invalidateQueries({ queryKey: ['/api/projects/featured'] });
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${id}`] });
    },
  });
}

// Hook for applying to a project
export function useApplyToProject(projectId: number | string) {
  return useMutation({
    mutationFn: (applicationData: { userId: number, roleId: number, message: string }) => {
      return apiRequest('POST', `/api/projects/${projectId}/apply`, applicationData);
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}`] });
    },
  });
}

// Hook for fetching project roles
export function useProjectRoles(projectId: number | string | undefined) {
  return useQuery({
    queryKey: [`/api/projects/${projectId}/roles`],
    enabled: !!projectId,
  });
}

// Hook for fetching project team members
export function useProjectTeam(projectId: number | string | undefined) {
  return useQuery({
    queryKey: [`/api/projects/${projectId}/team`],
    enabled: !!projectId,
  });
}

// Hook for filtering projects
export function useFilteredProjects(
  searchTerm: string = '',
  filters: { category?: string, stage?: string, teamSize?: string } = {}
) {
  const { data: projects, isLoading, error } = useProjects();
  
  const filteredProjects = projects?.filter((project) => {
    // Filter by search term
    if (searchTerm && !project.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !project.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Filter by category
    if (filters.category && project.category !== filters.category) {
      return false;
    }

    // Filter by stage
    if (filters.stage && project.stage !== filters.stage) {
      return false;
    }

    // Filter by team size
    if (filters.teamSize) {
      if (filters.teamSize === '1' && project.teamSize !== 1) {
        return false;
      } else if (filters.teamSize === '2-5' && (project.teamSize < 2 || project.teamSize > 5)) {
        return false;
      } else if (filters.teamSize === '6-10' && (project.teamSize < 6 || project.teamSize > 10)) {
        return false;
      } else if (filters.teamSize === '10+' && project.teamSize <= 10) {
        return false;
      }
    }

    return true;
  });

  return {
    projects: filteredProjects || [],
    isLoading,
    error,
  };
}
