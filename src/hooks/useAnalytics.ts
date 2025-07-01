
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
      
      // Google Analytics 4
      if (window.gtag) {
        window.gtag('config', process.env.VITE_GA_MEASUREMENT_ID, {
          page_path: path,
          page_title: document.title,
          page_location: window.location.href
        });
      }

      // Yandex Metrica
      if (window.ym) {
        window.ym(Number(process.env.VITE_YANDEX_METRIKA), 'hit', path);
      }

      console.log('Page view tracked:', path);
    };

    trackPageView();
  }, [location]);

  // Track custom events
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    const { action, category, label, value, custom_parameters } = event;

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...custom_parameters
      });
    }

    // Yandex Metrica
    if (window.ym) {
      window.ym(Number(process.env.VITE_YANDEX_METRIKA), 'reachGoal', action);
    }

    console.log('Event tracked:', event);
  }, []);

  // Track conversions
  const trackConversion = useCallback((conversion: ConversionEvent) => {
    // Google Analytics 4 Enhanced Ecommerce
    if (window.gtag) {
      window.gtag('event', conversion.event_name, {
        currency: conversion.currency || 'RUB',
        value: conversion.value,
        transaction_id: conversion.transaction_id,
        items: conversion.items
      });
    }

    // Yandex Metrica eCommerce
    if (window.ym && conversion.event_name === 'purchase') {
      window.ym(Number(process.env.VITE_YANDEX_METRIKA), 'reachGoal', 'ORDER_SUCCESS');
    }

    console.log('Conversion tracked:', conversion);
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

  // Track order funnel
  const trackOrderFunnel = useCallback((step: string, stepNumber: number, details?: any) => {
    trackEvent({
      action: 'order_funnel_step',
      category: 'Order Funnel',
      label: step,
      value: stepNumber,
      custom_parameters: {
        funnel_step: stepNumber,
        step_name: step,
        ...details
      }
    });
  }, [trackEvent]);

  // Track search
  const trackSearch = useCallback((searchTerm: string, results?: number) => {
    trackEvent({
      action: 'search',
      category: 'Search',
      label: searchTerm,
      value: results,
      custom_parameters: {
        search_term: searchTerm,
        results_count: results
      }
    });
  }, [trackEvent]);

  // Track file downloads
  const trackDownload = useCallback((fileName: string, fileType: string) => {
    trackEvent({
      action: 'file_download',
      category: 'Download',
      label: fileName,
      custom_parameters: {
        file_name: fileName,
        file_type: fileType
      }
    });
  }, [trackEvent]);

  // Track social sharing
  const trackSocialShare = useCallback((platform: string, url: string) => {
    trackEvent({
      action: 'social_share',
      category: 'Social',
      label: platform,
      custom_parameters: {
        platform,
        shared_url: url
      }
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackConversion,
    trackInteraction,
    trackFormSubmission,
    trackOrderFunnel,
    trackSearch,
    trackDownload,
    trackSocialShare
  };
}

// Custom hook for A/B testing
export function useABTest(testName: string, variants: string[]) {
  const { trackEvent } = useAnalytics();

  const getVariant = useCallback(() => {
    // Check if user already has a variant assigned
    const savedVariant = localStorage.getItem(`ab_test_${testName}`);
    if (savedVariant && variants.includes(savedVariant)) {
      return savedVariant;
    }

    // Assign random variant
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    localStorage.setItem(`ab_test_${testName}`, randomVariant);

    // Track assignment
    trackEvent({
      action: 'ab_test_assignment',
      category: 'A/B Test',
      label: testName,
      custom_parameters: {
        test_name: testName,
        variant: randomVariant
      }
    });

    return randomVariant;
  }, [testName, variants, trackEvent]);

  const trackConversion = useCallback((conversionName: string) => {
    const variant = getVariant();
    trackEvent({
      action: 'ab_test_conversion',
      category: 'A/B Test',
      label: `${testName}_${conversionName}`,
      custom_parameters: {
        test_name: testName,
        variant,
        conversion_name: conversionName
      }
    });
  }, [testName, getVariant, trackEvent]);

  return {
    variant: getVariant(),
    trackConversion
  };
}
