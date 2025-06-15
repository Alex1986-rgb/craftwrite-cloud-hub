
import { useSeoMeta } from '@/hooks/useSeoMeta';
import { useSocialMeta } from '@/hooks/useSocialMeta';
import { StructuredData } from './StructuredData';
import { generateCanonicalUrl } from '@/utils/seoUtils';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG } from '@/config/seoConfig';

interface ComprehensiveSeoProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  robots?: string;
  structuredData?: any;
  noindex?: boolean;
  nofollow?: boolean;
}

export function ComprehensiveSeo({
  title,
  description,
  keywords,
  ogImage = SEO_CONFIG.defaultImage,
  canonical,
  robots,
  structuredData,
  noindex = false,
  nofollow = false,
}: ComprehensiveSeoProps) {
  const location = useLocation();
  
  const canonicalUrl = canonical || generateCanonicalUrl(location.pathname);
  const robotsContent = robots || `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;

  // Use custom hooks for meta management
  useSeoMeta({
    title,
    description,
    keywords,
    robots: robotsContent,
    canonical: canonicalUrl
  });

  useSocialMeta({
    title,
    description,
    image: ogImage,
    url: canonicalUrl
  });

  // Prepare structured data
  const allStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": SEO_CONFIG.organization.name,
      "description": SEO_CONFIG.organization.description,
      "url": SEO_CONFIG.baseUrl
    },
    ...(structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [])
  ].filter(Boolean);

  return <StructuredData data={allStructuredData} id="comprehensive-seo-structured-data" />;
}

export default ComprehensiveSeo;
