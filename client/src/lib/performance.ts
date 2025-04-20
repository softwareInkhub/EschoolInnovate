/**
 * Performance utilities for improved site speed and user experience
 * These utilities help with image loading, resource hints, and performance measurement
 */

// Intersection Observer options for lazy loading
const observerOptions = {
  root: null, // viewport is the root
  rootMargin: '100px', // load when within 100px of viewport
  threshold: 0.1, // trigger when 10% visible
};

/**
 * Adds resource hints for critical resources
 * This helps browsers prioritize loading important assets
 */
export function addResourceHints() {
  if (typeof document === 'undefined') return;

  // Preconnect to important domains
  const domains = [
    window.location.origin, // Current domain
  ];

  domains.forEach(domain => {
    // Preconnect hint
    if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = domain;
      document.head.appendChild(preconnect);
    }

    // DNS prefetch as fallback
    if (!document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`)) {
      const dnsPrefetch = document.createElement('link');
      dnsPrefetch.rel = 'dns-prefetch';
      dnsPrefetch.href = domain;
      document.head.appendChild(dnsPrefetch);
    }
  });
}

/**
 * Optimizes images on the page by adding loading, decoding and fetchpriority attributes
 * This improves LCP (Largest Contentful Paint) scores
 */
export function optimizeImages() {
  if (typeof document === 'undefined') return;

  // Find all images on the page
  const images = document.querySelectorAll('img');

  // First image is likely the most important
  const firstImage = document.querySelector('img');
  if (firstImage) {
    firstImage.setAttribute('fetchpriority', 'high');
    firstImage.setAttribute('loading', 'eager');
    firstImage.setAttribute('decoding', 'sync');
  }

  // Set up optimizations for all other images
  images.forEach((img, index) => {
    // Skip the first image as it was already handled
    if (index === 0) return;

    // Add lazy loading to all other images
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add async decoding for better rendering performance
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }

    // For images that are important but not critical, set medium priority
    if (!img.hasAttribute('fetchpriority') && index < 5) {
      img.setAttribute('fetchpriority', 'auto');
    }
  });

  // Set up intersection observer for lazy loaded elements
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If it's an image, load it
          if (entry.target instanceof HTMLImageElement) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              delete img.dataset.src;
            }
          }
          
          // Stop observing after loading
          lazyObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with data-src attribute
    document.querySelectorAll('[data-src]').forEach(el => {
      lazyObserver.observe(el);
    });
  }
}

/**
 * Optimizes font loading to prevent layout shifts
 */
export function optimizeFontLoading() {
  if (typeof document === 'undefined') return;

  // Add font-display: swap to improve perceived performance
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Initializes all performance optimizations
 * Call this on initial page load or when routes change
 */
export function initializePerformanceOptimizations() {
  // Add performance mark for measurement
  if (typeof performance !== 'undefined') {
    performance.mark('optimize-start');
  }

  // Add resource hints
  addResourceHints();
  
  // Optimize images
  optimizeImages();
  
  // Optimize font loading
  optimizeFontLoading();

  // Measure optimization time
  if (typeof performance !== 'undefined') {
    performance.mark('optimize-end');
    performance.measure('performance-optimizations', 'optimize-start', 'optimize-end');
  }
}

/**
 * Sets up performance monitoring for Core Web Vitals
 */
export function monitorPerformance() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // Monitor LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // Monitor FID (First Input Delay)
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    // Monitor CLS (Cumulative Layout Shift)
    const clsObserver = new PerformanceObserver((entryList) => {
      let cls = 0;
      entryList.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      });
      console.log('CLS:', cls);
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.error('Performance monitoring error:', e);
  }
}