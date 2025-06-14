
// Main services export file
export type { Service, ServiceCategory, ServiceDifficulty } from "./types/service";
export { SERVICES } from "./services/serviceData";
export {
  getServiceBySlug,
  getServicesByCategory,
  getServicesByDifficulty,
  getPopularServices,
  searchServices,
  getServiceCategories,
  getServiceDifficulties
} from "./services/serviceHelpers";
