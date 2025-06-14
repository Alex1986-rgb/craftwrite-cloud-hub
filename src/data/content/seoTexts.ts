
// Main SEO texts export file
import { CONTENT_MARKETING_SEO } from "./seo/contentMarketing";
import { SELLING_COPY_SEO } from "./seo/sellingCopy";
import { ECOMMERCE_SEO } from "./seo/ecommerce";
import { SOCIAL_MEDIA_SEO } from "./seo/socialMedia";
import { EMAIL_MARKETING_SEO } from "./seo/emailMarketing";
import { BUSINESS_DOCUMENTS_SEO } from "./seo/businessDocuments";

export const SEO_TEXTS = {
  // Content Marketing
  ...CONTENT_MARKETING_SEO,
  
  // Selling Copy
  ...SELLING_COPY_SEO,
  
  // E-commerce
  ...ECOMMERCE_SEO,
  
  // Social Media
  ...SOCIAL_MEDIA_SEO,
  
  // Email Marketing
  ...EMAIL_MARKETING_SEO,
  
  // Business Documents
  ...BUSINESS_DOCUMENTS_SEO
};

// For backward compatibility - export individual categories
export {
  CONTENT_MARKETING_SEO,
  SELLING_COPY_SEO,
  ECOMMERCE_SEO,
  SOCIAL_MEDIA_SEO,
  EMAIL_MARKETING_SEO,
  BUSINESS_DOCUMENTS_SEO
};
