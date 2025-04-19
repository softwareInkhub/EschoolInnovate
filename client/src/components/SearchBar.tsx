import { Search, X } from 'lucide-react';

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  const handleClear = () => {
    setSearchTerm('');
  };
  
  return (
    <div className="bg-[#121216] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search for a specific project..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1E1E24] rounded-md py-3 px-4 pr-10 text-sm border border-[#2D2D3A] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {searchTerm ? (
              <button onClick={handleClear} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            ) : (
              <Search className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
