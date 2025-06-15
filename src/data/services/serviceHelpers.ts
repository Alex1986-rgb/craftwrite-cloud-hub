
import { Service, ServiceCategory, ServiceDifficulty } from "../types/service";
import { UNIFIED_SERVICES } from "./unifiedServiceData";

export const getServiceBySlug = (slug: string): Service | undefined => {
  return UNIFIED_SERVICES.find(service => service.slug === slug);
};

export const getServicesByCategory = (category: ServiceCategory): Service[] => {
  return UNIFIED_SERVICES.filter(service => service.category === category);
};

export const getServicesByDifficulty = (difficulty: ServiceDifficulty): Service[] => {
  return UNIFIED_SERVICES.filter(service => service.difficulty === difficulty);
};

export const getPopularServices = (minPopularity: number = 4): Service[] => {
  return UNIFIED_SERVICES.filter(service => service.popularity >= minPopularity);
};

export const searchServices = (query: string): Service[] => {
  const lowercaseQuery = query.toLowerCase();
  return UNIFIED_SERVICES.filter(service => 
    service.name.toLowerCase().includes(lowercaseQuery) ||
    service.desc.toLowerCase().includes(lowercaseQuery) ||
    service.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getServiceCategories = (): ServiceCategory[] => {
  return [...new Set(UNIFIED_SERVICES.map(service => service.category as ServiceCategory))];
};

export const getServiceDifficulties = (): ServiceDifficulty[] => {
  return [...new Set(UNIFIED_SERVICES.map(service => service.difficulty as ServiceDifficulty))];
};
