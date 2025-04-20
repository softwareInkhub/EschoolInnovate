import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { prefetchCriticalData } from "./lib/prefetch";

// Start prefetching important data when page loads
if (typeof window !== 'undefined') {
  // Measure initial load performance
  performance.mark('app-init-start');
  
  // Initialize app
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <ThemeProvider defaultTheme="dark" storageKey="eschool-theme">
      <App />
    </ThemeProvider>
  );
  
  // Start prefetching when browser is idle
  prefetchCriticalData();
  
  // Measure performance
  performance.mark('app-init-end');
  performance.measure('app-initialization', 'app-init-start', 'app-init-end');

  // Add performance optimization hints to images
  document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.setAttribute('decoding', 'async');
      if (!img.getAttribute('fetchpriority')) {
        img.setAttribute('fetchpriority', 'auto');
      }
    });
  });
}
else {
  // SSR version (if needed in the future)
  createRoot(document.getElementById("root")!).render(
    <ThemeProvider defaultTheme="dark" storageKey="eschool-theme">
      <App />
    </ThemeProvider>
  );
}
