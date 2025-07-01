
import { useCallback } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  custom_parameters?: Record<string, any>;
}

export function useAnalytics() {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Console log для отладки
    console.log('Analytics Event:', event);
    
    // Если есть gtag, используем его
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        ...event.custom_parameters
      });
    }
  }, []);

  const trackInteraction = useCallback((action: string, category: string, data?: any) => {
    trackEvent({
      action,
      category,
      label: data?.label || data?.title,
      custom_parameters: data
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackInteraction
  };
}
