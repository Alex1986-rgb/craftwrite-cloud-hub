import { useEffect } from 'react';
import { useSystemSettings } from '@/hooks/useSystemSettings';

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
    ym?: (id: number, action: string, target?: string, params?: any) => void;
    dataLayer?: any[];
  }
}

let globalSettings: Record<string, any> = {};

export default function AnalyticsTracker() {
  const { getSetting } = useSystemSettings();

  useEffect(() => {
    // Сохраняем настройки глобально для использования в других функциях
    globalSettings = {
      gaEnabled: getSetting('google_analytics_enabled'),
      gaId: getSetting('google_analytics_id'),
      ymEnabled: getSetting('yandex_metrika_enabled'),
      ymId: getSetting('yandex_metrika_id')
    };

    // Загружаем Google Analytics
    if (globalSettings.gaEnabled && globalSettings.gaId) {
      // Загружаем скрипт Google Analytics
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${globalSettings.gaId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${globalSettings.gaId}');
      `;
      document.head.appendChild(script2);

      // Устанавливаем глобальную функцию gtag
      window.gtag = function(command: string, targetId: string, config?: any) {
        if (window.dataLayer) {
          window.dataLayer.push(arguments);
        }
      };
    }

    // Загружаем Яндекс.Метрику
    if (globalSettings.ymEnabled && globalSettings.ymId) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${globalSettings.ymId}, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
        });
      `;
      document.head.appendChild(script);

      // Добавляем noscript элемент
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${globalSettings.ymId}" style="position:absolute; left:-9999px;" alt="" /></div>`;
      document.body.appendChild(noscript);
    }
  }, [getSetting]);

  return null;
}

// Функции для отслеживания событий
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  // Google Analytics
  if (window.gtag && globalSettings.gaEnabled) {
    window.gtag('event', eventName, parameters);
  }
  
  // Яндекс.Метрика
  if (window.ym && globalSettings.ymEnabled) {
    const ymId = parseInt(globalSettings.ymId || '0');
    if (ymId) {
      window.ym(ymId, 'reachGoal', eventName, parameters);
    }
  }
};

export const trackPageView = (page: string) => {
  // Google Analytics
  if (window.gtag && globalSettings.gaEnabled) {
    window.gtag('event', 'page_view', {
      page_path: page
    });
  }
  
  // Яндекс.Метрика автоматически отслеживает просмотры страниц
};

export const trackConversion = (orderId: string, value: number) => {
  trackEvent('purchase', {
    transaction_id: orderId,
    value: value,
    currency: 'RUB'
  });
};