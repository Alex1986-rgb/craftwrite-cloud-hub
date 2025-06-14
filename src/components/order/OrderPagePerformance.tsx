
import { memo, useEffect } from "react";

interface OrderPagePerformanceProps {
  children: React.ReactNode;
}

const OrderPagePerformance = memo(function OrderPagePerformance({ children }: OrderPagePerformanceProps) {
  useEffect(() => {
    // Add critical CSS to head if not already present
    const existingStyle = document.getElementById('order-critical-styles');
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = 'order-critical-styles';
      style.textContent = `
        .hero-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }

    // Add meta tags for performance
    const existingColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (!existingColorScheme) {
      const colorScheme = document.createElement('meta');
      colorScheme.name = 'color-scheme';
      colorScheme.content = 'light';
      document.head.appendChild(colorScheme);
    }

    const existingThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!existingThemeColor) {
      const themeColor = document.createElement('meta');
      themeColor.name = 'theme-color';
      themeColor.content = '#667eea';
      document.head.appendChild(themeColor);
    }

    // Performance observer for Core Web Vitals
    if ('PerformanceObserver' in window && !window.orderPageObserver) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', (entry as any).processingStart - entry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            if (!(entry as any).hadRecentInput) {
              console.log('CLS:', (entry as any).value);
            }
          }
        }
      });
      
      try {
        observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
        (window as any).orderPageObserver = observer;
      } catch (e) {
        console.log('Performance observer not supported');
      }
    }

    return () => {
      // Cleanup is handled globally to avoid removing shared resources
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
});

export default OrderPagePerformance;
