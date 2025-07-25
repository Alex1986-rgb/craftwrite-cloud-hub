
import { useOrderForm } from '@/contexts/OrderFormContext';

export function useOrderPricing() {
  const { form } = useOrderForm();

  const calculateEstimatedPrice = (): number => {
    let basePrice = 0;
    
    // Character-based pricing logic (price per 1000 characters)
    const characterCount = (form as any).characterCount || 5000;
    const pricePerThousandChars = getPricePerThousandCharacters(form.service);
    
    basePrice = Math.round((characterCount / 1000) * pricePerThousandChars);

    // Service-based minimum pricing
    const serviceMinimum = getServiceMinimum(form.service);
    basePrice = Math.max(basePrice, serviceMinimum);

    // Deadline modifiers
    if (form.deadline === 'urgent') {
      basePrice *= 1.5;
    } else if (form.deadline === 'express') {
      basePrice *= 1.3;
    }

    // Additional services
    const additionalPrice = form.additionalServices.length * 2000;

    // Competitor analysis
    const competitorAnalysisPrice = (form as any).competitorDomains?.length > 0 ? 3000 : 0;

    // LSI keywords bonus
    const lsiPrice = (form as any).lsiKeywords?.length > 0 ? 1500 : 0;

    // Meta data optimization
    const metaDataPrice = (form as any).metaData?.metaTitle || (form as any).metaData?.metaDescription ? 1000 : 0;

    // Content structure bonus
    const contentStructurePrice = (form as any).contentQuestions?.length > 0 ? 800 : 0;

    return Math.round(basePrice + additionalPrice + competitorAnalysisPrice + lsiPrice + metaDataPrice + contentStructurePrice);
  };

  const getPricePerThousandCharacters = (service: string): number => {
    switch (service) {
      case 'landing-page':
        return 800;
      case 'sales-letter':
        return 700;
      case 'email-sequence':
        return 600;
      case 'chatbot-scripts':
        return 500;
      case 'seo-article':
        return 400;
      case 'product-description':
        return 350;
      case 'social-media':
        return 1200; // Higher rate for short-form content
      case 'blog-post':
        return 450;
      case 'press-release':
        return 550;
      default:
        return 500;
    }
  };

  const getServiceMinimum = (service: string): number => {
    switch (service) {
      case 'landing-page':
        return 15000;
      case 'sales-letter':
        return 12000;
      case 'email-sequence':
        return 8000;
      case 'chatbot-scripts':
        return 3000;
      case 'seo-article':
        return 2000;
      case 'product-description':
        return 1000;
      case 'social-media':
        return 500;
      case 'blog-post':
        return 2500;
      case 'press-release':
        return 2000;
      default:
        return 2000;
    }
  };

  const getEstimatedDeliveryTime = (): string => {
    const characterCount = (form as any).characterCount || 5000;
    let baseDays = Math.ceil(characterCount / 2500); // ~1 day per 2500 characters
    
    // Service complexity modifiers
    if (form.service === 'landing-page' || form.service === 'sales-letter') {
      baseDays += 1;
    }
    
    // Competitor analysis adds time
    if ((form as any).competitorDomains?.length > 0) {
      baseDays += 1;
    }

    // LSI keywords research time
    if ((form as any).lsiKeywords?.length > 0 && (form as any).lsiKeywordMode === 'auto') {
      baseDays += 1;
    }

    // Content structure development time
    if ((form as any).contentQuestions?.length > 5) {
      baseDays += 1;
    }

    switch (form.deadline) {
      case 'urgent':
        return '1-2 дня';
      case 'express':
        return '3-4 дня';
      case 'standard':
        return `${baseDays}-${baseDays + 2} дней`;
      default:
        return `${baseDays}-${baseDays + 1} дней`;
    }
  };

  return {
    calculateEstimatedPrice,
    getEstimatedDeliveryTime
  };
}
