
// Main services export file
export type { Service, ServiceCategory, ServiceDifficulty, TextExample, SeoMetrics } from "./types/service";
export { UNIFIED_SERVICES as SERVICES } from "./services/unifiedServiceData";
export {
  getServiceBySlug,
  getServicesByCategory,
  getServicesByDifficulty,
  getPopularServices,
  searchServices,
  getServiceCategories,
  getServiceDifficulties
} from "./services/serviceHelpers";
