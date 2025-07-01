
export interface PerformanceMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  private constructor() {
    this.initializeObservers();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeObservers() {
    if (typeof window === 'undefined') return;

    try {
      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            if (lastEntry && lastEntry.startTime) {
              this.metrics.lcp = lastEntry.startTime;
              this.sendMetric('lcp', lastEntry.startTime);
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          this.observers.push(lcpObserver);
        } catch (e) {
          console.warn('LCP observer not supported');
        }

        // First Input Delay
        try {
          const fidObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach((entry: any) => {
              if (entry.processingStart && entry.startTime) {
                const fid = entry.processingStart - entry.startTime;
                this.metrics.fid = fid;
                this.sendMetric('fid', fid);
              }
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
          this.observers.push(fidObserver);
        } catch (e) {
          console.warn('FID observer not supported');
        }

        // Cumulative Layout Shift
        try {
          const clsObserver = new PerformanceObserver((entryList) => {
            let clsValue = 0;
            entryList.getEntries().forEach((entry: any) => {
              if (!entry.hadRecentInput && entry.value) {
                clsValue += entry.value;
              }
            });
            this.metrics.cls = clsValue;
            this.sendMetric('cls', clsValue);
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
          this.observers.push(clsObserver);
        } catch (e) {
          console.warn('CLS observer not supported');
        }

        // Navigation timing
        this.measureNavigationTiming();
      }
    } catch (error) {
      console.warn('Performance monitoring initialization failed:', error);
    }
  }

  private measureNavigationTiming() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          try {
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (navigation) {
              const fcp = navigation.loadEventEnd - navigation.loadEventStart;
              const ttfb = navigation.responseStart - navigation.requestStart;
              
              this.metrics.fcp = fcp;
              this.metrics.ttfb = ttfb;
              
              this.sendMetric('fcp', fcp);
              this.sendMetric('ttfb', ttfb);
            }
          } catch (error) {
            console.warn('Navigation timing measurement failed:', error);
          }
        }, 0);
      });
    }
  }

  private sendMetric(name: string, value: number) {
    try {
      // Send to analytics
      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', 'web_vitals', {
          metric_name: name,
          metric_value: Math.round(value),
          metric_rating: this.getMetricRating(name, value)
        });
      }

      console.log(`Performance metric - ${name}:`, Math.round(value));
    } catch (error) {
      console.warn(`Failed to send metric ${name}:`, error);
    }
  }

  private getMetricRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      ttfb: { good: 800, poor: 1800 }
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  disconnect() {
    this.observers.forEach(observer => {
      try {
        observer.disconnect();
      } catch (error) {
        console.warn('Failed to disconnect observer:', error);
      }
    });
    this.observers = [];
  }
}

// Resource loading optimization
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  try {
    const criticalResources = [
      '/fonts/inter.woff2',
      '/images/hero-bg.jpg'
    ];

    criticalResources.forEach(resource => {
      try {
        const link = document.createElement('link');
        link.rel = 'preload';
        
        if (resource.endsWith('.woff2')) {
          link.as = 'font';
          link.type = 'font/woff2';
          link.crossOrigin = 'anonymous';
        } else if (resource.endsWith('.jpg') || resource.endsWith('.png')) {
          link.as = 'image';
        }
        
        link.href = resource;
        document.head.appendChild(link);
      } catch (error) {
        console.warn(`Failed to preload ${resource}:`, error);
      }
    });
  } catch (error) {
    console.warn('Failed to preload critical resources:', error);
  }
}

// Image optimization
export function optimizeImages() {
  if (typeof window === 'undefined') return;

  try {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        const imgElement = img as HTMLImageElement;
        if (imgElement.dataset.src) {
          imgElement.src = imgElement.dataset.src;
        }
      });
    }
  } catch (error) {
    console.warn('Image optimization failed:', error);
  }
}

// Bundle size analysis
export function analyzeBundleSize() {
  if (typeof window === 'undefined' || import.meta.env?.NODE_ENV !== 'development') return;

  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name.includes('.js') || entry.name.includes('.css')) {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (resourceEntry.transferSize && typeof resourceEntry.transferSize === 'number') {
            console.log(`Resource: ${entry.name}, Size: ${(resourceEntry.transferSize / 1024).toFixed(2)}KB`);
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  } catch (error) {
    console.warn('Bundle size analysis failed:', error);
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
