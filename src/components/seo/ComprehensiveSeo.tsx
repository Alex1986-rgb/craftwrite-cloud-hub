
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import StructuredData from "./StructuredData";
import { 
  generateCanonicalUrl, 
  generateMetaDescription, 
  createOrganizationStructuredData,
  createWebsiteStructuredData,
  type SeoMeta,
  type BreadcrumbItem
} from "@/utils/seoUtils";

interface LocalSeoData {
  businessName?: string;
  address?: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  phone?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
}

interface ComprehensiveSeoProps extends SeoMeta {
  breadcrumbs?: BreadcrumbItem[];
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  localSeo?: LocalSeoData;
  noindex?: boolean;
  nofollow?: boolean;
  hreflang?: Record<string, string>;
  alternateUrls?: Record<string, string>;
}

const DEFAULT_OG_IMAGE = "https://lovable.dev/opengraph-image-p98pqg.png";
const YANDEX_VERIFICATION = "yandex_verification_code";
const GOOGLE_VERIFICATION = "google_verification_code";

export function ComprehensiveSeo({
  title,
  description,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  canonical,
  robots,
  structuredData,
  breadcrumbs,
  article,
  localSeo,
  noindex = false,
  nofollow = false,
  hreflang,
  alternateUrls,
}: ComprehensiveSeoProps) {
  const location = useLocation();
  
  const canonicalUrl = canonical || generateCanonicalUrl(location.pathname);
  const processedDescription = generateMetaDescription(description);
  const robotsContent = robots || `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;

  useEffect(() => {
    document.title = title;

    // Remove all previous SEO meta tags
    Array.from(document.querySelectorAll("meta[data-comprehensive-seo]")).forEach(m => m.remove());
    Array.from(document.querySelectorAll("link[data-comprehensive-seo]")).forEach(l => l.remove());

    const setMeta = (name: string, content: string, property: boolean = false) => {
      const tag = document.createElement("meta");
      if (property) {
        tag.setAttribute("property", name);
      } else {
        tag.setAttribute("name", name);
      }
      tag.content = content;
      tag.setAttribute("data-comprehensive-seo", "true");
      document.head.appendChild(tag);
    };

    const setLink = (rel: string, href: string, attributes?: Record<string, string>) => {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      link.setAttribute("data-comprehensive-seo", "true");
      
      if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
          link.setAttribute(key, value);
        });
      }
      
      document.head.appendChild(link);
    };

    // Basic meta tags
    setMeta("description", processedDescription);
    setMeta("robots", robotsContent);
    setMeta("googlebot", robotsContent);
    setMeta("bingbot", robotsContent);
    setMeta("yandex", robotsContent);
    
    if (keywords) {
      setMeta("keywords", keywords);
    }

    // Verification tags
    setMeta("google-site-verification", GOOGLE_VERIFICATION);
    setMeta("yandex-verification", YANDEX_VERIFICATION);

    // Open Graph tags
    setMeta("og:title", title, true);
    setMeta("og:description", processedDescription, true);
    setMeta("og:type", article ? "article" : "website", true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:image:alt", title, true);
    setMeta("og:site_name", "CopyPro Cloud", true);
    setMeta("og:locale", "ru_RU", true);
    setMeta("og:locale:alternate", "en_US", true);

    // Twitter Card tags
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", processedDescription);
    setMeta("twitter:image", ogImage);
    setMeta("twitter:image:alt", title);
    setMeta("twitter:site", "@copyprocloud");
    setMeta("twitter:creator", "@copyprocloud");

    // WhatsApp and Telegram optimization
    setMeta("whatsapp:title", title);
    setMeta("whatsapp:description", processedDescription);
    setMeta("whatsapp:image", ogImage);

    // VKontakte tags
    setMeta("vk:title", title);
    setMeta("vk:description", processedDescription);
    setMeta("vk:image", ogImage);

    // Article meta tags
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
      if (article.tags) {
        article.tags.forEach(tag => {
          setMeta("article:tag", tag, true);
        });
      }
    }

    // Mobile optimization
    setMeta("theme-color", "#3b82f6");
    setMeta("msapplication-TileColor", "#3b82f6");
    setMeta("apple-mobile-web-app-capable", "yes");
    setMeta("apple-mobile-web-app-status-bar-style", "default");
    setMeta("apple-mobile-web-app-title", "CopyPro Cloud");
    setMeta("mobile-web-app-capable", "yes");

    // Performance hints
    setMeta("dns-prefetch-control", "on");
    setMeta("preconnect", "https://fonts.googleapis.com");
    setMeta("preconnect", "https://fonts.gstatic.com");

    // Canonical link
    setLink("canonical", canonicalUrl);

    // Hreflang links
    if (hreflang) {
      Object.entries(hreflang).forEach(([lang, url]) => {
        setLink("alternate", url, { hreflang: lang });
      });
    }

    // Alternate URLs
    if (alternateUrls) {
      Object.entries(alternateUrls).forEach(([type, url]) => {
        setLink("alternate", url, { type });
      });
    }

    // RSS feed
    setLink("alternate", "/rss.xml", { type: "application/rss+xml", title: "CopyPro Cloud Blog" });

    // Favicon and icons
    setLink("icon", "/favicon.ico", { sizes: "any" });
    setLink("icon", "/icon.svg", { type: "image/svg+xml" });
    setLink("apple-touch-icon", "/apple-touch-icon.png");
    setLink("manifest", "/manifest.json");

    // Auto-generate alt tags for images without them
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach((img: Element) => {
      const htmlImg = img as HTMLImageElement;
      const src = htmlImg.src;
      const filename = src.split('/').pop()?.split('.')[0] || '';
      const generatedAlt = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      htmlImg.alt = generatedAlt;
    });

    return () => {
      Array.from(document.querySelectorAll("meta[data-comprehensive-seo]")).forEach(m => m.remove());
      Array.from(document.querySelectorAll("link[data-comprehensive-seo]")).forEach(l => l.remove());
    };
  }, [title, processedDescription, keywords, ogImage, canonicalUrl, robotsContent, article, hreflang, alternateUrls]);

  // Prepare structured data
  const allStructuredData = [
    createOrganizationStructuredData(),
    createWebsiteStructuredData(),
    ...(localSeo ? [createLocalBusinessStructuredData(localSeo)] : []),
    ...(structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [])
  ].filter(Boolean);

  return <StructuredData data={allStructuredData} id="comprehensive-seo-structured-data" />;
}

const createLocalBusinessStructuredData = (localSeo: LocalSeoData) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": localSeo.businessName || "CopyPro Cloud",
    "address": localSeo.address ? {
      "@type": "PostalAddress",
      "streetAddress": localSeo.address.street,
      "addressLocality": localSeo.address.city,
      "addressRegion": localSeo.address.region,
      "postalCode": localSeo.address.postalCode,
      "addressCountry": localSeo.address.country
    } : undefined,
    "telephone": localSeo.phone,
    "geo": localSeo.geo ? {
      "@type": "GeoCoordinates",
      "latitude": localSeo.geo.latitude,
      "longitude": localSeo.geo.longitude
    } : undefined,
    "url": generateCanonicalUrl('/'),
    "sameAs": [
      "https://t.me/copyprocloud",
      "https://vk.com/copyprocloud"
    ]
  };
};

export default ComprehensiveSeo;
