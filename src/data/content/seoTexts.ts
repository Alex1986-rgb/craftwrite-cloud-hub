
// Main SEO texts export file
import { CONTENT_MARKETING_SEO } from "./seo/contentMarketing";
import { LANDING_PAGES_SEO } from "./seo/landingPages";
import { WEB_COPYWRITING_SEO } from "./seo/webCopywriting";
import { SALES_SCRIPTS_SEO } from "./seo/salesScripts";
import { ECOMMERCE_SEO } from "./seo/ecommerce";
import { SOCIAL_MEDIA_SEO } from "./seo/socialMedia";
import { EMAIL_MARKETING_SEO } from "./seo/emailMarketing";
import { BUSINESS_DOCUMENTS_SEO } from "./seo/businessDocuments";
import { AUTOMATION_SEO } from "./seo/automation";
import { VIDEO_CONTENT_SEO } from "./seo/videoContent";
import { TECHNICAL_DOCS_SEO } from "./seo/technicalDocs";

export const SEO_TEXTS = {
  // Content Marketing
  ...CONTENT_MARKETING_SEO,
  
  // Landing Pages
  ...LANDING_PAGES_SEO,
  
  // Web Copywriting
  ...WEB_COPYWRITING_SEO,
  
  // Sales Scripts
  ...SALES_SCRIPTS_SEO,
  
  // E-commerce
  ...ECOMMERCE_SEO,
  
  // Social Media
  ...SOCIAL_MEDIA_SEO,
  
  // Email Marketing
  ...EMAIL_MARKETING_SEO,
  
  // Business Documents
  ...BUSINESS_DOCUMENTS_SEO,
  
  // Automation
  ...AUTOMATION_SEO,
  
  // Video Content
  ...VIDEO_CONTENT_SEO,
  
  // Technical Documentation
  ...TECHNICAL_DOCS_SEO,

  // Additional services with placeholder texts (to be expanded)
  "telegram-channel": `**Telegram-канал: стратегия контента для максимального охвата и монетизации**`,
  
  // Default fallback for any missing services
  "seo-article": CONTENT_MARKETING_SEO["seo-article"] || `**SEO-статьи - ваш путь на первые позиции поисковых систем**`,
  "case-study": CONTENT_MARKETING_SEO["case-study"] || `**Кейс-стади - истории успеха, которые убеждают лучше любой рекламы**`,
  "commercial-proposal": BUSINESS_DOCUMENTS_SEO["commercial-proposal"],
  "press-release": BUSINESS_DOCUMENTS_SEO["press-release"],  
  "presentation": BUSINESS_DOCUMENTS_SEO["presentation"],
  "chatbot-script": AUTOMATION_SEO["chatbot-script"],
  "video-script": VIDEO_CONTENT_SEO["video-script"],
  "technical-text": TECHNICAL_DOCS_SEO["technical-text"]
};

// For backward compatibility - export individual categories
export {
  CONTENT_MARKETING_SEO,
  LANDING_PAGES_SEO,
  WEB_COPYWRITING_SEO,
  SALES_SCRIPTS_SEO,
  ECOMMERCE_SEO,
  SOCIAL_MEDIA_SEO,
  EMAIL_MARKETING_SEO,
  BUSINESS_DOCUMENTS_SEO,
  AUTOMATION_SEO,
  VIDEO_CONTENT_SEO,
  TECHNICAL_DOCS_SEO
};
