import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { prefetchCriticalData } from "./lib/prefetch";
import { initializePerformanceOptimizations, monitorPerformance } from "./lib/performance";

// Start performance optimization when page loads
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
  
  // Start optimizations when browser is idle
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      // Start data prefetching
      prefetchCriticalData();
      
      // Initialize other performance optimizations
      initializePerformanceOptimizations();
      
      // Set up performance monitoring if in development
      if (process.env.NODE_ENV === 'development') {
        monitorPerformance();
      }
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      prefetchCriticalData();
      initializePerformanceOptimizations();
      
      if (process.env.NODE_ENV === 'development') {
        monitorPerformance();
      }
    }, 1000);
  }
  
  // Measure performance
  performance.mark('app-init-end');
  performance.measure('app-initialization', 'app-init-start', 'app-init-end');

  // Navigation performance tracking
  if ('PerformanceObserver' in window) {
    try {
      const navObserver = new PerformanceObserver((list) => {
        const perfEntries = list.getEntries();
        if (perfEntries.length > 0) {
          const lastNav = perfEntries[perfEntries.length - 1];
          console.log(`Navigation time: ${lastNav.duration.toFixed(2)}ms`);
        }
      });
      navObserver.observe({ type: 'navigation', buffered: true });
    } catch (e) {
      console.error('Navigation performance observer error:', e);
    }
  }
}
else {
  // SSR version (if needed in the future)
  createRoot(document.getElementById("root")!).render(
    <ThemeProvider defaultTheme="dark" storageKey="eschool-theme">
      <App />
    </ThemeProvider>
  );
}
