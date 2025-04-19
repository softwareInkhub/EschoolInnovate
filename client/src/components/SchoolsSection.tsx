import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function SchoolsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  
  const { data: schools, isLoading } = useQuery({
    queryKey: ['/api/schools'],
  });
  
  const totalPages = schools ? Math.ceil(schools.length / itemsPerPage) : 0;
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };
  
  const displaySchools = schools?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  
  if (isLoading) {
    return (
      <section className="py-8 bg-[#121216]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Learning Schools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-[#1E1E24] rounded-lg overflow-hidden">
                  <div className="h-40 bg-[#2D2D3A]"></div>
                  <div className="p-4">
                    <div className="h-5 bg-[#2D2D3A] rounded w-2/3 mb-3"></div>
                    <div className="h-4 bg-[#2D2D3A] rounded mb-3"></div>
                    <div className="flex justify-between">
                      <div className="h-5 bg-[#2D2D3A] rounded w-16"></div>
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
          <h2 className="text-2xl font-bold">Learning Schools</h2>
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

        {displaySchools && displaySchools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displaySchools.map((school) => (
              <Card key={school.id} className="overflow-hidden hover:shadow-lg transition-all duration-200">
                <div className="relative">
                  <img 
                    src={school.image || `https://images.unsplash.com/photo-1581092918056-0c4c3acd3789`} 
                    alt={school.name} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-lg font-semibold text-white">{school.name}</h3>
                    <p className="text-sm text-white/70">{school.category}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm mb-3">{school.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-primary/20 text-primary">
                      {school.courseCount} Courses
                    </Badge>
                    <Button variant="link" className="p-0 h-auto">View Courses</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No schools available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
