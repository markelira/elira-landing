'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  FCP: number | null;  // First Contentful Paint
  LCP: number | null;  // Largest Contentful Paint
  FID: number | null;  // First Input Delay
  CLS: number | null;  // Cumulative Layout Shift
  TTI: number | null;  // Time to Interactive
  TBT: number | null;  // Total Blocking Time
}

export const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const metrics: PerformanceMetrics = {
      FCP: null,
      LCP: null,
      FID: null,
      CLS: null,
      TTI: null,
      TBT: null,
    };

    // Report metrics to analytics or console
    let hasReported = false;
    const reportMetrics = () => {
      // Only report once to prevent spam
      if (hasReported) return;
      hasReported = true;
      
      // Only log in development mode
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Metrics:', metrics);
      }
      
      // Send to analytics if needed
      if (typeof gtag !== 'undefined') {
        Object.entries(metrics).forEach(([key, value]) => {
          if (value !== null) {
            gtag('event', 'performance', {
              event_category: 'Web Vitals',
              event_label: key,
              value: Math.round(value),
            });
          }
        });
      }
    };

    try {
      // First Contentful Paint
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            metrics.FCP = entry.startTime;
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.LCP = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          metrics.FID = (entry as any).processingStart - entry.startTime;
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            metrics.CLS = clsValue;
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Time to Interactive (simplified)
      const checkTTI = () => {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          metrics.TTI = navigationEntry.loadEventEnd;
        }
      };

      // Report metrics when page is fully loaded
      if (document.readyState === 'complete') {
        checkTTI();
        setTimeout(reportMetrics, 3000); // Wait for LCP
      } else {
        window.addEventListener('load', () => {
          checkTTI();
          setTimeout(reportMetrics, 3000);
        });
      }

      // Report on page visibility change (user leaving)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          reportMetrics();
        }
      });

      // Cleanup
      return () => {
        paintObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    } catch (error) {
      console.error('Performance monitoring not supported:', error);
    }
  }, []);

  return null; // This component doesn't render anything
};

// Hook for measuring component render performance
export const useRenderPerformance = (componentName: string) => {
  useEffect(() => {
    // Disabled by default to prevent performance issues
    // Enable only when actively debugging specific components
    const ENABLE_RENDER_TRACKING = false;
    
    if (!ENABLE_RENDER_TRACKING) return;
    
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Only track slow renders to reduce console spam
      if (renderTime > 50) { // Only log if slower than 50ms
        console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    };
  }, [componentName]);
};

// Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Use the web-vitals library if available
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
    onCLS((metric) => {
      console.log('CLS:', metric.value);
      sendToAnalytics('CLS', metric.value);
    });
    
    onFID((metric) => {
      console.log('FID:', metric.value);
      sendToAnalytics('FID', metric.value);
    });
    
    onFCP((metric) => {
      console.log('FCP:', metric.value);
      sendToAnalytics('FCP', metric.value);
    });
    
    onLCP((metric) => {
      console.log('LCP:', metric.value);
      sendToAnalytics('LCP', metric.value);
    });
    
    onTTFB((metric) => {
      console.log('TTFB:', metric.value);
      sendToAnalytics('TTFB', metric.value);
    });
  }).catch(() => {
    console.log('web-vitals library not available');
  });
};

function sendToAnalytics(metricName: string, value: number) {
  // Send to your analytics endpoint
  if (typeof gtag !== 'undefined') {
    gtag('event', metricName, {
      value: Math.round(value),
      event_category: 'Web Vitals',
      event_label: metricName,
    });
  }
}

// Use existing gtag type from window
const gtag = typeof window !== 'undefined' && 'gtag' in window ? (window as any).gtag : undefined;