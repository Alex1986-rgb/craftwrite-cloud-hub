
import { SmartFilter } from '@/types/advancedOrder';
import { COMMON_FILTERS } from './filters/commonFilters';
import { SEO_FILTERS } from './filters/seoFilters';
import { LANDING_FILTERS } from './filters/landingFilters';
import { EMAIL_FILTERS } from './filters/emailFilters';
import { TELEGRAM_FILTERS } from './filters/telegramFilters';
import { SERVICE_SPECIFIC_QUESTIONS } from './filters/serviceQuestions';

// Export all filters
export { COMMON_FILTERS };
export { SERVICE_SPECIFIC_QUESTIONS };

// Function to get service-specific filters by service slug
export const getServiceSpecificFilters = (serviceSlug: string): SmartFilter[] => {
  switch (serviceSlug) {
    case 'seo-article':
      return SEO_FILTERS;
    case 'landing-page':
      return LANDING_FILTERS;
    case 'email-campaigns':
      return EMAIL_FILTERS;
    case 'telegram-content':
      return TELEGRAM_FILTERS;
    default:
      return [];
  }
};
