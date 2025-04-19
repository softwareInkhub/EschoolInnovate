import { Link } from 'wouter';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121216] border-t border-[#2D2D3A] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-8 w-8 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <Link href="/">
              <a className="text-lg font-bold">eSchool.ai</a>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center">
            <Link href="/privacy">
              <a className="text-muted-foreground hover:text-foreground px-3 py-1 text-sm">Privacy Policy</a>
            </Link>
            <Link href="/terms">
              <a className="text-muted-foreground hover:text-foreground px-3 py-1 text-sm">Terms and Conditions</a>
            </Link>
            <a 
              href="https://discord.gg/eschool" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-foreground px-3 py-1 text-sm"
            >
              Join our community!
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-muted-foreground text-xs">
          &copy; {currentYear} eSchool.ai - All rights reserved
        </div>
      </div>
    </footer>
  );
}
