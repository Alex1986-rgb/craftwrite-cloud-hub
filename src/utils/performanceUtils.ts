
// Утилиты для мониторинга производительности
export const performanceMonitor = {
  disconnect: () => {
    console.log('Performance monitor disconnected');
  }
};

export const preloadCriticalResources = () => {
  console.log('Preloading critical resources');
  // Здесь можно добавить предзагрузку критически важных ресурсов
};

export const optimizeImages = () => {
  console.log('Optimizing images');
  // Здесь можно добавить оптимизацию изображений
};

export const analyzeBundleSize = () => {
  console.log('Analyzing bundle size');
  // Здесь можно добавить анализ размера бандла
};

// Простая реализация метрик производительности
export const trackPerformanceMetrics = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Отслеживание First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          console.log('Performance metric - fcp:', Math.round(entry.startTime));
        }
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log('Performance metric - ttfb:', Math.round(navEntry.responseStart - navEntry.requestStart));
        }
      }
    });
    
    try {
      observer.observe({ entryTypes: ['paint', 'navigation'] });
    } catch (e) {
      console.log('Performance observer not supported');
    }
  }
};
