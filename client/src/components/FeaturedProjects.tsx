import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard';

export default function FeaturedProjects() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  
  const { data: featuredProjects, isLoading } = useQuery({
    queryKey: ['/api/projects/featured'],
  });
  
  const totalPages = featuredProjects ? Math.ceil(featuredProjects.length / itemsPerPage) : 0;
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };
  
  const displayProjects = featuredProjects?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  
  if (isLoading) {
    return (
      <section className="py-8 bg-[#121216]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevPage}
              disabled={totalPages <= 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextPage}
              disabled={totalPages <= 1}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {displayProjects && displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured projects available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
