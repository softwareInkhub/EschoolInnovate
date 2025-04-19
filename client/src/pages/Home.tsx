import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import CreateProjectButton from '@/components/CreateProjectButton';
import CreateProjectModal from '@/components/CreateProjectModal';
import FeaturedProjects from '@/components/FeaturedProjects';
import SchoolsSection from '@/components/SchoolsSection';
import AllProjectsSection from '@/components/AllProjectsSection';

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    stage: '',
    teamSize: '',
  });

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <FeaturedProjects />
      <SchoolsSection />
      <AllProjectsSection searchTerm={searchTerm} filters={filters} />
      <CreateProjectButton onClick={() => setIsCreateModalOpen(true)} />
      <CreateProjectModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
}
