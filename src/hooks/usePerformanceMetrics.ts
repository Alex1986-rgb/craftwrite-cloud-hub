
import { useState, useEffect } from 'react';

interface PerformanceMetrics {
  lcp: number | null;
  inp: number | null; // Заменили fid на inp
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
  isLoading: boolean;
}

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    inp: null, // Заменили fid на inp
    cls: null,
    fcp: null,
    ttfb: null,
    isLoading: true
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateMetrics = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        setMetrics(prev => ({
          ...prev,
          ttfb: navigation.responseStart - navigation.requestStart,
          isLoading: false
        }));
      }
    };

    // Собираем метрики после загрузки страницы
    if (document.readyState === 'complete') {
      updateMetrics();
    } else {
      window.addEventListener('load', updateMetrics);
    }

    // Таймаут для завершения загрузки метрик
    timeoutId = setTimeout(() => {
      setMetrics(prev => ({ ...prev, isLoading: false }));
    }, 5000);

    return () => {
      window.removeEventListener('load', updateMetrics);
      clearTimeout(timeoutId);
    };
  }, []);

  const getMetricRating = (metric: keyof PerformanceMetrics, value: number | null): string => {
    if (value === null) return 'unknown';

    switch (metric) {
      case 'lcp':
        return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
      case 'inp': // Обновили для INP метрики
        return value <= 200 ? 'good' : value <= 500 ? 'needs-improvement' : 'poor';
      case 'cls':
        return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
      case 'fcp':
        return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
      case 'ttfb':
        return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
      default:
        return 'unknown';
    }
  };

  return {
    metrics,
    getMetricRating
  };
};
