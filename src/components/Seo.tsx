
import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: object;
};

const DEFAULT_OG = "https://lovable.dev/opengraph-image-p98pqg.png";

const Seo = ({
  title,
  description,
  keywords,
  ogImage = DEFAULT_OG,
  ogType = "website",
  canonicalUrl,
  structuredData,
}: SeoProps) => {
  useEffect(() => {
    document.title = title;

    // Remove all meta we could have created earlier
    Array.from(document.querySelectorAll("meta[data-seo]")).forEach(m => m.remove());
    Array.from(document.querySelectorAll("link[data-seo]")).forEach(l => l.remove());
    Array.from(document.querySelectorAll("script[data-seo]")).forEach(s => s.remove());

    const setMeta = (name: string, content: string, property: boolean = false) => {
      const tag = document.createElement("meta");
      if (property) {
        tag.setAttribute("property", name);
      } else {
        tag.setAttribute("name", name);
      }
      tag.content = content;
      tag.setAttribute("data-seo", "true");
      document.head.appendChild(tag);
    };

    // Basic meta tags
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("robots", "index, follow");
    setMeta("viewport", "width=device-width, initial-scale=1.0");
    
    // Open Graph tags
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", ogType, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:locale", "ru_RU", true);
    setMeta("og:site_name", "CopyPro Cloud", true);
    
    // Twitter Card tags
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);
    
    // Canonical URL
    if (canonicalUrl) {
      const canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = canonicalUrl;
      canonical.setAttribute("data-seo", "true");
      document.head.appendChild(canonical);
    }
    
    // Structured data
    if (structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(structuredData);
      script.setAttribute("data-seo", "true");
      document.head.appendChild(script);
    }

    return () => {
      Array.from(document.querySelectorAll("meta[data-seo]")).forEach(m => m.remove());
      Array.from(document.querySelectorAll("link[data-seo]")).forEach(l => l.remove());
      Array.from(document.querySelectorAll("script[data-seo]")).forEach(s => s.remove());
    };
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, structuredData]);
  
  return null;
};

export default Seo;
