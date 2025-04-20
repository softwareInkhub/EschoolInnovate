import { useEffect } from 'react';
import BlogSection from '@/components/BlogSection';

export default function BlogPage() {
  useEffect(() => {
    // Scroll to top of the page on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0b15]">
      <BlogSection />
    </div>
  );
}