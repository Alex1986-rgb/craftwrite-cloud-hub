
import { useState, useEffect, useRef, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

const LazySection = ({ 
  children, 
  fallback = null, 
  rootMargin = '100px',
  threshold = 0.1,
  className = ""
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Disconnect observer after loading for performance
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [rootMargin, threshold, hasLoaded]);

  return (
    <div 
      ref={ref} 
      className={`${className} ${isVisible ? 'animate-fade-in' : ''}`}
      style={{ willChange: isVisible ? 'auto' : 'transform' }}
    >
      {isVisible ? children : fallback}
    </div>
  );
};

export default LazySection;
