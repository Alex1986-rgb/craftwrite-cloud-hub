
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import StructuredData from "./StructuredData";
import { 
  generateCanonicalUrl, 
  generateMetaDescription, 
  createOrganizationStructuredData,
  type SeoMeta,
  type BreadcrumbItem
} from "@/utils/seoUtils";

interface EnhancedSeoProps extends SeoMeta {
  breadcrumbs?: BreadcrumbItem[];
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
  noindex?: boolean;
  nofollow?: boolean;
}

const DEFAULT_OG_IMAGE = "https://lovable.dev/opengraph-image-p98pqg.png";

export function EnhancedSeo({
  title,
  description,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  canonical,
  robots,
  structuredData,
  breadcrumbs,
  article,
  noindex = false,
  nofollow = false,
}: EnhancedSeoProps) {
  const location = useLocation();
  
  // Генерируем canonical URL если не передан
  const canonicalUrl = canonical || generateCanonicalUrl(location.pathname);
  
  // Обрабатываем description
  const processedDescription = generateMetaDescription(description);
  
  // Формируем robots meta
  const robotsContent = robots || `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;

  useEffect(() => {
    // Устанавливаем title
    document.title = title;

    // Удаляем все предыдущие SEO meta теги
    Array.from(document.querySelectorAll("meta[data-enhanced-seo]")).forEach(m => m.remove());
    Array.from(document.querySelectorAll("link[data-enhanced-seo]")).forEach(l => l.remove());

    const setMeta = (name: string, content: string, property: boolean = false) => {
      const tag = document.createElement("meta");
      if (property) {
        tag.setAttribute("property", name);
      } else {
        tag.setAttribute("name", name);
      }
      tag.content = content;
      tag.setAttribute("data-enhanced-seo", "true");
      document.head.appendChild(tag);
    };

    const setLink = (rel: string, href: string, attributes?: Record<string, string>) => {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      link.setAttribute("data-enhanced-seo", "true");
      
      if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
          link.setAttribute(key, value);
        });
      }
      
      document.head.appendChild(link);
    };

    // Основные meta теги
    setMeta("description", processedDescription);
    setMeta("robots", robotsContent);
    
    if (keywords) {
      setMeta("keywords", keywords);
    }

    // Open Graph теги
    setMeta("og:title", title, true);
    setMeta("og:description", processedDescription, true);
    setMeta("og:type", article ? "article" : "website", true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:site_name", "CopyPro Cloud", true);
    setMeta("og:locale", "ru_RU", true);

    // Twitter Card теги
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", processedDescription);
    setMeta("twitter:image", ogImage);
    setMeta("twitter:site", "@copyprocloud");

    // Article meta теги
    if (article) {
      if (article.publishedTime) {
        setMeta("article:published_time", article.publishedTime, true);
      }
      if (article.modifiedTime) {
        setMeta("article:modified_time", article.modifiedTime, true);
      }
      if (article.author) {
        setMeta("article:author", article.author, true);
      }
      if (article.section) {
        setMeta("article:section", article.section, true);
      }
    }

    // Дополнительные meta теги
    setMeta("theme-color", "#3b82f6");
    setMeta("msapplication-TileColor", "#3b82f6");
    setMeta("apple-mobile-web-app-capable", "yes");
    setMeta("apple-mobile-web-app-status-bar-style", "default");

    // Canonical link
    setLink("canonical", canonicalUrl);

    // Preconnect для производительности
    setLink("preconnect", "https://fonts.googleapis.com");
    setLink("preconnect", "https://fonts.gstatic.com", { crossorigin: "anonymous" });

    return () => {
      Array.from(document.querySelectorAll("meta[data-enhanced-seo]")).forEach(m => m.remove());
      Array.from(document.querySelectorAll("link[data-enhanced-seo]")).forEach(l => l.remove());
    };
  }, [title, processedDescription, keywords, ogImage, canonicalUrl, robotsContent, article]);

  // Подготавливаем структурированные данные
  const allStructuredData = [
    createOrganizationStructuredData(),
    ...(structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [])
  ].filter(Boolean);

  return <StructuredData data={allStructuredData} id="enhanced-seo-structured-data" />;
}

export default EnhancedSeo;
