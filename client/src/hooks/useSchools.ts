import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { School, InsertSchool } from '@shared/schema';

// Hook for fetching all schools
export function useSchools() {
  return useQuery<School[]>({
    queryKey: ['/api/schools'],
  });
}

// Hook for fetching a single school
export function useSchool(id: number | string | undefined) {
  return useQuery<School>({
    queryKey: [`/api/schools/${id}`],
    enabled: !!id,
  });
}

// Hook for creating a new school
export function useCreateSchool() {
  return useMutation({
    mutationFn: (schoolData: InsertSchool) => {
      return apiRequest('POST', '/api/schools', schoolData);
    },
    onSuccess: () => {
      // Invalidate schools query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['/api/schools'] });
    },
  });
}

// Hook for filtering schools by category
export function useFilteredSchools(category: string = '') {
  const { data: schools, isLoading, error } = useSchools();
  
  const filteredSchools = category 
    ? schools?.filter(school => school.category === category)
    : schools;

  return {
    schools: filteredSchools || [],
    isLoading,
    error,
    categories: schools 
      ? [...new Set(schools.map(school => school.category))]
      : [],
  };
}

// Hook for paginating schools
export function usePaginatedSchools(itemsPerPage: number = 4) {
  const { data: schools, isLoading, error } = useSchools();
  
  const totalPages = schools ? Math.ceil(schools.length / itemsPerPage) : 0;
  
  const getPageItems = (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return schools?.slice(startIndex, startIndex + itemsPerPage) || [];
  };

  return {
    schools,
    isLoading,
    error,
    totalPages,
    getPageItems,
  };
}
