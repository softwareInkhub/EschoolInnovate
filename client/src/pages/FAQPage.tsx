import { useEffect } from 'react';
import FAQSection from '@/components/FAQSection';

export default function FAQPage() {
  useEffect(() => {
    // Scroll to top of the page on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0b15]">
      <FAQSection />
    </div>
  );
}