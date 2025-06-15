
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

export interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

interface AnalyticsData {
  metric_name: string;
  metric_value: number;
  metric_rating: string;
  page_url: string;
  user_agent: string;
  timestamp: number;
}

// Отправка метрик в аналитику (можно настроить на свой сервис)
const sendToAnalytics = (metric: WebVitalsMetric) => {
  const data: AnalyticsData = {
    metric_name: metric.name,
    metric_value: metric.value,
    metric_rating: metric.rating,
    page_url: window.location.href,
    user_agent: navigator.userAgent,
    timestamp: Date.now()
  };

  // Отправляем через beacon API для надежности
  if ('sendBeacon' in navigator) {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    navigator.sendBeacon('/api/analytics/web-vitals', blob);
  } else {
    // Fallback для старых браузеров
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      keepalive: true
    }).catch(console.error);
  }

  // Логируем в консоль для разработки
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric);
  }
};

// Инициализация мониторинга Web Vitals
export const initWebVitals = () => {
  getCLS(sendToAnalytics);
  getFCP(sendToAnalytics);
  getFID(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
};

// Утилиты для оптимизации
export const preloadCriticalResources = () => {
  // Предзагружаем критические шрифты
  const criticalFonts = [
    '/fonts/Inter-Regular.woff2',
    '/fonts/Inter-Medium.woff2',
    '/fonts/Inter-SemiBold.woff2'
  ];

  criticalFonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = font;
    document.head.appendChild(link);
  });

  // Предзагружаем критические изображения
  const criticalImages = [
    '/images/hero-bg.webp',
    '/images/logo.webp'
  ];

  criticalImages.forEach(image => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = image;
    document.head.appendChild(link);
  });
};

// Оптимизация рендеринга
export const optimizeRendering = () => {
  // Включаем paint holding для лучшего LCP
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  }
};
