import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useSystemSettings } from './useSystemSettings';

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

export function useEnhancedAnalytics() {
  const location = useLocation();
  const { getSetting } = useSystemSettings();

  // Get analytics IDs from settings
  const googleAnalyticsId = getSetting('google_analytics_id', '');
  const yandexMetricaId = getSetting('yandex_metrica_id', '');
  const analyticsEnabled = getSetting('analytics_enabled', true);
  const conversionTrackingEnabled = getSetting('conversion_tracking_enabled', true);

  // Initialize analytics scripts
  useEffect(() => {
    if (!analyticsEnabled) return;

    // Initialize Google Analytics
    if (googleAnalyticsId && !window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
          window.dataLayer?.push(arguments);
        };
        window.gtag('js', new Date().toISOString());
        window.gtag('config', googleAnalyticsId, {
          send_page_view: false // We'll handle page views manually
        });
      };
    }

    // Initialize Yandex Metrica
    if (yandexMetricaId && !window.ym) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${yandexMetricaId}, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
        });
      `;
      document.head.appendChild(script);
    }
  }, [googleAnalyticsId, yandexMetricaId, analyticsEnabled]);

  // Track page views
  useEffect(() => {
    if (!analyticsEnabled) return;

    const trackPageView = () => {
      const path = location.pathname + location.search;
      
      // Google Analytics 4
      if (window.gtag && googleAnalyticsId) {
        window.gtag('config', googleAnalyticsId, {
          page_path: path,
          page_title: document.title,
          page_location: window.location.href
        });
      }

      // Yandex Metrica
      if (window.ym && yandexMetricaId) {
        window.ym(parseInt(yandexMetricaId), 'hit', path);
      }

      console.log('Page view tracked:', path);
    };

    trackPageView();
  }, [location, googleAnalyticsId, yandexMetricaId, analyticsEnabled]);

  // Track custom events
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    if (!analyticsEnabled) return;

    const { action, category, label, value, custom_parameters } = event;

    // Google Analytics 4
    if (window.gtag && googleAnalyticsId) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...custom_parameters
      });
    }

    // Yandex Metrica
    if (window.ym && yandexMetricaId) {
      window.ym(parseInt(yandexMetricaId), 'reachGoal', action, {
        category,
        label,
        value,
        ...custom_parameters
      });
    }

    console.log('Event tracked:', event);
  }, [googleAnalyticsId, yandexMetricaId, analyticsEnabled]);

  // Track conversions
  const trackConversion = useCallback((conversion: ConversionEvent) => {
    if (!analyticsEnabled || !conversionTrackingEnabled) return;

    // Google Analytics 4 Enhanced Ecommerce
    if (window.gtag && googleAnalyticsId) {
      window.gtag('event', conversion.event_name, {
        currency: conversion.currency || 'RUB',
        value: conversion.value,
        transaction_id: conversion.transaction_id,
        items: conversion.items
      });
    }

    // Yandex Metrica eCommerce
    if (window.ym && yandexMetricaId && conversion.event_name === 'purchase') {
      window.ym(parseInt(yandexMetricaId), 'reachGoal', 'ORDER_SUCCESS', {
        order_price: conversion.value,
        currency: conversion.currency || 'RUB'
      });
    }

    console.log('Conversion tracked:', conversion);
  }, [googleAnalyticsId, yandexMetricaId, analyticsEnabled, conversionTrackingEnabled]);

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

  return {
    trackEvent,
    trackConversion,
    trackFormSubmission,
    trackOrderFunnel,
    analyticsEnabled,
    googleAnalyticsId,
    yandexMetricaId
  };
}
