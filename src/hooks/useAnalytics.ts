
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

interface ConversionEvent {
  event_name: string;
  currency?: string;
  value?: number;
  transaction_id?: string;
  items?: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
  }>;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    ym?: (id: number, action: string, params?: any) => void;
  }
}

export function useAnalytics() {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    const trackPageView = () => {
      const path = location.pathname + location.search;
      
      try {
        // Google Analytics 4 - только если доступен
        if (window.gtag && typeof window.gtag === 'function') {
          const gaId = import.meta.env?.VITE_GA_MEASUREMENT_ID;
          if (gaId) {
            window.gtag('config', gaId, {
              page_path: path,
              page_title: document.title,
              page_location: window.location.href
            });
          }
        }

        // Yandex Metrica - только если доступен
        if (window.ym && typeof window.ym === 'function') {
          const yandexId = import.meta.env?.VITE_YANDEX_METRIKA;
          if (yandexId && !isNaN(Number(yandexId))) {
            window.ym(Number(yandexId), 'hit', path);
          }
        }

        console.log('Page view tracked:', path);
      } catch (error) {
        console.warn('Analytics tracking error:', error);
      }
    };

    trackPageView();
  }, [location]);

  // Track custom events
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    try {
      const { action, category, label, value, custom_parameters } = event;

      // Google Analytics 4
      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
          ...custom_parameters
        });
      }

      // Yandex Metrica
      if (window.ym && typeof window.ym === 'function') {
        const yandexId = import.meta.env?.VITE_YANDEX_METRIKA;
        if (yandexId && !isNaN(Number(yandexId))) {
          window.ym(Number(yandexId), 'reachGoal', action);
        }
      }

      console.log('Event tracked:', event);
    } catch (error) {
      console.warn('Event tracking error:', error);
    }
  }, []);

  // Track conversions
  const trackConversion = useCallback((conversion: ConversionEvent) => {
    try {
      // Google Analytics 4 Enhanced Ecommerce
      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', conversion.event_name, {
          currency: conversion.currency || 'RUB',
          value: conversion.value,
          transaction_id: conversion.transaction_id,
          items: conversion.items
        });
      }

      // Yandex Metrica eCommerce
      if (window.ym && typeof window.ym === 'function' && conversion.event_name === 'purchase') {
        const yandexId = import.meta.env?.VITE_YANDEX_METRIKA;
        if (yandexId && !isNaN(Number(yandexId))) {
          window.ym(Number(yandexId), 'reachGoal', 'ORDER_SUCCESS');
        }
      }

      console.log('Conversion tracked:', conversion);
    } catch (error) {
      console.warn('Conversion tracking error:', error);
    }
  }, []);

  // Track user interactions
  const trackInteraction = useCallback((element: string, action: string, details?: any) => {
    trackEvent({
      action: `${element}_${action}`,
      category: 'User Interaction',
      label: element,
      custom_parameters: details
    });
  }, [trackEvent]);

  // Track form submissions
  const trackFormSubmission = useCallback((formName: string, success: boolean, details?: any) => {
    trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'Form',
      label: formName,
      value: success ? 1 : 0,
      custom_parameters: details
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackConversion,
    trackInteraction,
    trackFormSubmission
  };
}
