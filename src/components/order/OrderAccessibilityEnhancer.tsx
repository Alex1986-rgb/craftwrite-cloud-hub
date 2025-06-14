
import { useEffect, useRef } from "react";

interface OrderAccessibilityEnhancerProps {
  children: React.ReactNode;
  announcements?: string[];
}

export default function OrderAccessibilityEnhancer({ 
  children, 
  announcements = [] 
}: OrderAccessibilityEnhancerProps) {
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const skipLinkRef = useRef<HTMLAnchorElement>(null);

  // Handle live announcements for screen readers
  useEffect(() => {
    if (announcements.length > 0 && liveRegionRef.current) {
      const latestAnnouncement = announcements[announcements.length - 1];
      liveRegionRef.current.textContent = latestAnnouncement;
    }
  }, [announcements]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip to main content with Alt+M
      if (event.altKey && event.key === 'm') {
        event.preventDefault();
        const mainContent = document.querySelector('main');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Skip to form with Alt+F
      if (event.altKey && event.key === 'f') {
        event.preventDefault();
        const formElement = document.querySelector('form');
        if (formElement) {
          formElement.focus();
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Escape key to return to top
      if (event.key === 'Escape') {
        if (skipLinkRef.current) {
          skipLinkRef.current.focus();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Skip navigation links */}
      <div className="sr-only focus-within:not-sr-only">
        <a 
          ref={skipLinkRef}
          href="#main-content"
          className="fixed top-4 left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
          onFocus={(e) => e.target.scrollIntoView()}
        >
          Перейти к основному содержанию (Alt+M)
        </a>
        <a 
          href="#order-form"
          className="fixed top-4 left-48 z-50 bg-green-600 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-green-300"
          onFocus={(e) => e.target.scrollIntoView()}
        >
          Перейти к форме заказа (Alt+F)
        </a>
      </div>

      {/* Live region for dynamic announcements */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      />

      {/* Assertive live region for critical announcements */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
        role="alert"
        id="critical-announcements"
      />

      {/* High contrast mode detection */}
      <style>
        {`
          @media (prefers-contrast: high) {
            .order-card {
              border: 2px solid currentColor !important;
            }
            .order-button {
              border: 2px solid currentColor !important;
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            .animate-fade-in,
            .animate-pulse,
            .animate-spin {
              animation: none !important;
              transition: none !important;
            }
          }
          
          /* Focus management */
          .focus-trap {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
          }
          
          /* Screen reader only content */
          .sr-only-focusable:focus {
            position: static;
            width: auto;
            height: auto;
            padding: 0;
            margin: 0;
            overflow: visible;
            clip: auto;
            white-space: normal;
          }
        `}
      </style>

      {/* Keyboard shortcuts help */}
      <div className="sr-only" role="region" aria-label="Горячие клавиши">
        <h2>Горячие клавиши для навигации:</h2>
        <ul>
          <li>Alt + M: Перейти к основному содержанию</li>
          <li>Alt + F: Перейти к форме заказа</li>
          <li>Escape: Вернуться в начало страницы</li>
          <li>Tab: Навигация по интерактивным элементам</li>
          <li>Shift + Tab: Навигация назад</li>
          <li>Enter/Space: Активировать кнопки и ссылки</li>
        </ul>
      </div>

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}
