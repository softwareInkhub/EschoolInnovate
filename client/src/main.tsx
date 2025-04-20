import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { prefetchCriticalData } from "./lib/prefetch";

// Start app initialization
if (typeof window !== 'undefined') {
  // Measure initial load performance
  if (typeof performance !== 'undefined') {
    performance.mark('app-init-start');
  }
  
  // Initialize app
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <ThemeProvider defaultTheme="dark" storageKey="eschool-theme">
      <App />
    </ThemeProvider>
  );
  
  // Start prefetching critical data
  prefetchCriticalData();
  
  // Measure performance
  if (typeof performance !== 'undefined') {
    performance.mark('app-init-end');
    performance.measure('app-initialization', 'app-init-start', 'app-init-end');
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
