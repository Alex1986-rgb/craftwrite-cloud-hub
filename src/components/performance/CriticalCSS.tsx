
import { useEffect } from 'react';

const CriticalCSS: React.FC = () => {
  useEffect(() => {
    // Инлайним критический CSS для above-the-fold контента
    const criticalStyles = `
      /* Critical CSS для hero секции */
      .hero-section {
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      
      /* Critical CSS для навигации */
      .nav-header {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.9);
      }
      
      /* Critical CSS для текста */
      .text-gradient {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      /* Оптимизация шрифтов */
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/fonts/Inter-Regular.woff2') format('woff2');
      }
      
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('/fonts/Inter-SemiBold.woff2') format('woff2');
      }
    `;

    // Создаем style элемент с критическим CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = criticalStyles;
    styleElement.setAttribute('data-critical-css', 'true');
    
    // Вставляем в начало head для приоритета
    document.head.insertBefore(styleElement, document.head.firstChild);

    // Асинхронно загружаем остальные стили
    const loadNonCriticalCSS = () => {
      const links = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
      links.forEach(link => {
        (link as HTMLLinkElement).media = 'all';
      });
    };

    // Загружаем некритический CSS после загрузки страницы
    if (document.readyState === 'complete') {
      loadNonCriticalCSS();
    } else {
      window.addEventListener('load', loadNonCriticalCSS);
    }

    return () => {
      window.removeEventListener('load', loadNonCriticalCSS);
    };
  }, []);

  return null;
};

export default CriticalCSS;
