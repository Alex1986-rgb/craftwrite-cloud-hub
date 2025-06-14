
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
  itemProp?: string;
  fetchPriority?: "high" | "low" | "auto";
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
  srcSet,
  itemProp,
  fetchPriority = "auto"
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
    <figure className={cn("relative overflow-hidden", className)} role="img" aria-label={ariaLabel || alt}>
      {isLoading && !hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse flex items-center justify-center"
          aria-label="Загрузка изображения"
          role="status"
        >
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" aria-hidden="true"></div>
          <span className="sr-only">Загружается изображение: {alt}</span>
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        title={title}
        width={width}
        height={height}
        loading={priority ? "eager" : loading}
        fetchPriority={priority ? "high" : fetchPriority}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "object-cover transition-all duration-500 ease-out",
          isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100",
          hasError && imageSrc === fallbackSrc ? "filter grayscale" : ""
        )}
        itemProp={itemProp}
        aria-label={ariaLabel || alt}
        role={role}
        sizes={sizes}
        srcSet={srcSet}
        decoding="async"
        crossOrigin="anonymous"
      />
      
      {hasError && imageSrc === fallbackSrc && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-500 text-sm border border-gray-200"
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="text-center px-4 py-2">
            <div className="text-2xl mb-2" aria-hidden="true">📷</div>
            <span className="block font-medium">Изображение недоступно</span>
            <span className="text-xs text-gray-400 mt-1 block">({alt})</span>
          </div>
        </div>
      )}
      
      {/* Structured data for image */}
      {!hasError && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageObject",
              "url": imageSrc,
              "description": alt,
              "width": width,
              "height": height,
              "encodingFormat": "image/jpeg"
            })
          }}
        />
      )}
    </figure>
  );
}
