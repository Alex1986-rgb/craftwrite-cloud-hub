
import { Service, ServiceCategory, ServiceDifficulty } from "../types/service";
import { SERVICES } from "./serviceData";

export const getServiceBySlug = (slug: string): Service | undefined => {
  return SERVICES.find(service => service.slug === slug);
};

export const getServicesByCategory = (category: ServiceCategory): Service[] => {
  return SERVICES.filter(service => service.category === category);
};

export const getServicesByDifficulty = (difficulty: ServiceDifficulty): Service[] => {
  return SERVICES.filter(service => service.difficulty === difficulty);
};

export const getPopularServices = (minPopularity: number = 4): Service[] => {
  return SERVICES.filter(service => service.popularity >= minPopularity);
};

export const searchServices = (query: string): Service[] => {
  const lowercaseQuery = query.toLowerCase();
  return SERVICES.filter(service => 
    service.name.toLowerCase().includes(lowercaseQuery) ||
    service.desc.toLowerCase().includes(lowercaseQuery) ||
    service.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getServiceCategories = (): ServiceCategory[] => {
  return [...new Set(SERVICES.map(service => service.category as ServiceCategory))];
};

export const getServiceDifficulties = (): ServiceDifficulty[] => {
  return [...new Set(SERVICES.map(service => service.difficulty as ServiceDifficulty))];
};
