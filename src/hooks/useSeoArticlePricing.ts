
interface FormData {
  wordCount: string;
  includeImages: boolean;
  includeInfographics: boolean;
  expertQuotes: boolean;
  statistics: boolean;
  seoLevel: string;
  competitorAnalysis: string;
}

export function useSeoArticlePricing(formData: FormData) {
  const calculatePrice = () => {
    let basePrice = 0;
    
    // Базовая цена по объему
    switch (formData.wordCount) {
      case '1000-2000':
        basePrice = 2500;
        break;
      case '2000-3000':
        basePrice = 4000;
        break;
      case '3000-5000':
        basePrice = 6500;
        break;
      case '5000+':
        basePrice = 9000;
        break;
      default:
        basePrice = 2500;
    }

    // Дополнительные услуги
    if (formData.includeImages) basePrice += 800;
    if (formData.includeInfographics) basePrice += 1500;
    if (formData.expertQuotes) basePrice += 1200;
    if (formData.statistics) basePrice += 600;

    // Множители за сложность
    if (formData.seoLevel === 'advanced') basePrice *= 1.2;
    if (formData.seoLevel === 'technical') basePrice *= 1.4;
    if (formData.competitorAnalysis === 'basic') basePrice *= 1.1;
    if (formData.competitorAnalysis === 'detailed') basePrice *= 1.25;

    return Math.round(basePrice);
  };

  return { calculatePrice };
}
