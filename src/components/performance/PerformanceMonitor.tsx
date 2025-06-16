
import React, { useEffect } from 'react';
import { initWebVitals, preloadCriticalResources, optimizeRendering } from '@/utils/webVitals';

interface PerformanceMonitorProps {
  children: React.ReactNode;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ children }) => {
  useEffect(() => {
    // Инициализируем мониторинг Web Vitals
    initWebVitals();
    
    // Предзагружаем критические ресурсы
    preloadCriticalResources();
    
    // Оптимизируем рендеринг
    optimizeRendering();

    // Регистрируем Service Worker для кэширования
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }

    // Оптимизация для мобильных устройств
    const optimizeMobile = () => {
      if (window.innerWidth <= 768) {
        // Отключаем hover эффекты на мобильных
        document.documentElement.classList.add('mobile-device');
        
        // Оптимизируем viewport для производительности
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
        }
      }
    };

    optimizeMobile();
    window.addEventListener('resize', optimizeMobile);

    return () => {
      window.removeEventListener('resize', optimizeMobile);
    };
  }, []);

  return <>{children}</>;
};

export default PerformanceMonitor;
