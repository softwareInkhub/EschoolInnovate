import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@shared/schema';

type AllProjectsSectionProps = {
  searchTerm: string;
  filters: {
    category: string;
    stage: string;
    teamSize: string;
  };
};

export default function AllProjectsSection({ searchTerm, filters }: AllProjectsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Get all projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  // Filter projects based on search term and filters
  const filteredProjects = projects?.filter((project: Project) => {
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
  }) || [];

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  // Generate page numbers array for pagination
  const pageNumbers = [];
  const maxVisiblePages = 5;
  
  if (totalPages <= maxVisiblePages) {
    // If we have fewer pages than the max we want to show, display all
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Complex logic to show current page, some before and after, and ellipsis
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Always show first page
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('ellipsis-start');
      }
    }
    
    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }
    
    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis-end');
      }
      pageNumbers.push(totalPages);
    }
  }

  if (isLoading) {
    return (
      <section className="py-8 bg-[#121216]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">All Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-[#1E1E24] rounded-lg overflow-hidden">
                  <div className="h-48 bg-[#2D2D3A]"></div>
                  <div className="p-4">
                    <div className="h-6 bg-[#2D2D3A] rounded w-2/3 mb-4"></div>
                    <div className="h-4 bg-[#2D2D3A] rounded mb-2"></div>
                    <div className="h-4 bg-[#2D2D3A] rounded w-5/6 mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-5 bg-[#2D2D3A] rounded w-20"></div>
                      <div className="h-5 bg-[#2D2D3A] rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-[#121216]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">All Projects</h2>

        {displayProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        aria-disabled={currentPage === 1}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {pageNumbers.map((pageNumber, index) => (
                      <PaginationItem key={index}>
                        {pageNumber === 'ellipsis-start' || pageNumber === 'ellipsis-end' ? (
                          <span className="px-3 py-1 text-muted-foreground mx-1">...</span>
                        ) : (
                          <PaginationLink
                            onClick={() => setCurrentPage(Number(pageNumber))}
                            isActive={currentPage === pageNumber}
                          >
                            {pageNumber}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        aria-disabled={currentPage === totalPages}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              {searchTerm || Object.values(filters).some(Boolean) ? 
                "Try adjusting your search or filters." : 
                "There are no projects available at the moment."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
