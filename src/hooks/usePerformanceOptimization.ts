
import { useState, useEffect, useCallback } from 'react';

// Hook for image lazy loading
export const useImageLazyLoad = () => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const loadImage = useCallback((src: string) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, src]));
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const isImageLoaded = useCallback((src: string) => {
    return loadedImages.has(src);
  }, [loadedImages]);

  return { loadImage, isImageLoaded };
};

// Hook for debounced values
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook for throttled functions
export const useThrottle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): T => {
  const [lastCall, setLastCall] = useState<number>(0);

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        setLastCall(now);
        return func(...args);
      }
    }) as T,
    [func, delay, lastCall]
  );
};

// Hook for viewport detection
export const useInViewport = (elementRef: React.RefObject<Element>) => {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef]);

  return isInViewport;
};

// Hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0
  });

  useEffect(() => {
    // Measure page load time
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      setMetrics(prev => ({
        ...prev,
        loadTime: navigation.loadEventEnd - navigation.fetchStart
      }));
    }

    // Measure render time
    const paintEntries = performance.getEntriesByType('paint');
    const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (firstContentfulPaint) {
      setMetrics(prev => ({
        ...prev,
        renderTime: firstContentfulPaint.startTime
      }));
    }
  }, []);

  const measureInteraction = useCallback((startTime: number) => {
    const endTime = performance.now();
    setMetrics(prev => ({
      ...prev,
      interactionTime: endTime - startTime
    }));
  }, []);

  return { metrics, measureInteraction };
};
