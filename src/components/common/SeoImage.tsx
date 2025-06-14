
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SeoImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  priority?: boolean;
  fallbackSrc?: string;
  ariaLabel?: string;
  role?: string;
  sizes?: string;
  srcSet?: string;
}

export default function SeoImage({
  src,
  alt,
  title,
  className,
  width,
  height,
  loading = "lazy",
  priority = false,
  fallbackSrc = "/placeholder.svg",
  ariaLabel,
  role,
  sizes,
  srcSet
}: SeoImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && !hasError && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          aria-label="Загрузка изображения"
          role="status"
        >
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="sr-only">Загружается изображение</span>
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        title={title}
        width={width}
        height={height}
        loading={priority ? "eager" : loading}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          hasError && imageSrc === fallbackSrc ? "filter grayscale" : ""
        )}
        itemProp="image"
        aria-label={ariaLabel || alt}
        role={role}
        sizes={sizes}
        srcSet={srcSet}
        decoding="async"
      />
      
      {hasError && imageSrc === fallbackSrc && (
        <div 
          className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500 text-sm"
          role="alert"
          aria-live="polite"
        >
          <span className="text-center px-2">
            Изображение недоступно
            <br />
            <span className="text-xs text-gray-400">({alt})</span>
          </span>
        </div>
      )}
    </div>
  );
}
