
import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Генерируем WebP и AVIF версии
  const generateOptimizedSrc = (originalSrc: string, format: 'webp' | 'avif' | 'original') => {
    if (format === 'original') return originalSrc;
    
    // Простая замена расширения для демо (в реальном проекте нужен image CDN)
    const baseSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '');
    return `${baseSrc}.${format}`;
  };

  // Intersection Observer для lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Определяем лучший формат изображения
  useEffect(() => {
    if (!isInView) return;

    const checkFormat = async () => {
      // Проверяем поддержку AVIF
      const avifSupported = await checkImageSupport('data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=');
      
      // Проверяем поддержку WebP
      const webpSupported = await checkImageSupport('data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA');

      if (avifSupported) {
        setCurrentSrc(generateOptimizedSrc(src, 'avif'));
      } else if (webpSupported) {
        setCurrentSrc(generateOptimizedSrc(src, 'webp'));
      } else {
        setCurrentSrc(src);
      }
    };

    checkFormat();
  }, [isInView, src]);

  const checkImageSupport = (testSrc: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = testSrc;
    });
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    // Fallback к оригинальному изображению
    setCurrentSrc(src);
  };

  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height }}
        aria-label={`Loading ${alt}`}
      />
    );
  }

  return (
    <picture>
      <source srcSet={generateOptimizedSrc(src, 'avif')} type="image/avif" />
      <source srcSet={generateOptimizedSrc(src, 'webp')} type="image/webp" />
      <img
        ref={imgRef}
        src={currentSrc || src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  );
};

export default OptimizedImage;
