import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CreateProjectButtonProps = {
  onClick: () => void;
};

export default function CreateProjectButton({ onClick }: CreateProjectButtonProps) {
  return (
    <div className="fixed bottom-8 right-8 z-40">
      <Button 
        onClick={onClick}
        className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-3 rounded-full flex items-center shadow-lg transition-all duration-200"
      >
        <Plus className="h-5 w-5 mr-2" />
        Create Project
      </Button>
    </div>
  );
}
