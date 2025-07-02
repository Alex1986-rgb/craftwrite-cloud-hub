import { useState, useEffect } from 'react';

interface ModernFormData {
  characterCount: number;
  includeImages: boolean;
  includeInfographics: boolean;
  expertQuotes: boolean;
  statistics: boolean;
  seoLevel: string;
  competitorAnalysis: string;
  lsiKeywords: string[];
  autoGenerateMeta: boolean;
  contentStyle: string;
}

interface PriceBreakdown {
  basePrice: number;
  characterPrice: number;
  lsiKeywordsPrice: number;
  metaGenerationPrice: number;
  additionalServicesPrice: number;
  styleMultiplier: number;
  totalPrice: number;
}

export function useModernSeoArticlePricing(formData: ModernFormData) {
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown>({
    basePrice: 0,
    characterPrice: 0,
    lsiKeywordsPrice: 0,
    metaGenerationPrice: 0,
    additionalServicesPrice: 0,
    styleMultiplier: 1,
    totalPrice: 0
  });

  const calculatePrice = () => {
    let basePrice = 0;
    let characterPrice = 0;
    
    // Базовая цена по количеству символов
    const charCount = formData.characterCount || 3000;
    
    if (charCount <= 3000) {
      basePrice = 1500;
      characterPrice = Math.floor(charCount / 1000) * 500;
    } else if (charCount <= 5000) {
      basePrice = 2000;
      characterPrice = Math.floor((charCount - 3000) / 1000) * 400;
    } else if (charCount <= 10000) {
      basePrice = 3500;
      characterPrice = Math.floor((charCount - 5000) / 1000) * 350;
    } else {
      basePrice = 6000;
      characterPrice = Math.floor((charCount - 10000) / 1000) * 300;
    }

    // Дополнительные услуги
    let additionalServicesPrice = 0;
    if (formData.includeImages) additionalServicesPrice += 800;
    if (formData.includeInfographics) additionalServicesPrice += 1500;
    if (formData.expertQuotes) additionalServicesPrice += 1200;
    if (formData.statistics) additionalServicesPrice += 600;

    // LSI-ключи
    const lsiKeywordsPrice = formData.lsiKeywords?.length ? formData.lsiKeywords.length * 50 : 0;

    // Автогенерация мета-тегов
    const metaGenerationPrice = formData.autoGenerateMeta ? 300 : 0;

    // Множители за стиль и сложность
    let styleMultiplier = 1;
    if (formData.contentStyle === 'expert') styleMultiplier = 1.3;
    if (formData.seoLevel === 'advanced') styleMultiplier *= 1.2;
    if (formData.seoLevel === 'technical') styleMultiplier *= 1.4;
    if (formData.competitorAnalysis === 'basic') styleMultiplier *= 1.1;
    if (formData.competitorAnalysis === 'detailed') styleMultiplier *= 1.25;

    const subtotal = basePrice + characterPrice + additionalServicesPrice + lsiKeywordsPrice + metaGenerationPrice;
    const totalPrice = Math.round(subtotal * styleMultiplier);

    const breakdown: PriceBreakdown = {
      basePrice,
      characterPrice,
      lsiKeywordsPrice,
      metaGenerationPrice,
      additionalServicesPrice,
      styleMultiplier,
      totalPrice
    };

    setPriceBreakdown(breakdown);
    return totalPrice;
  };

  useEffect(() => {
    calculatePrice();
  }, [formData]);

  return { 
    calculatePrice, 
    priceBreakdown,
    getCharacterRange: () => {
      const count = formData.characterCount || 3000;
      if (count <= 3000) return '1000-3000';
      if (count <= 5000) return '3000-5000';
      if (count <= 10000) return '5000-10000';
      return '10000+';
    }
  };
}