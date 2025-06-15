
import { openAIService } from './openai';

export interface APIConfig {
  openai?: string;
  claude?: string;
  copyscape?: string;
  semrush?: string;
}

class APIConfigService {
  private apiKeys: APIConfig = {};

  setAPIKeys(config: APIConfig) {
    this.apiKeys = { ...this.apiKeys, ...config };
    if (config.openai) {
      openAIService.setApiKey(config.openai);
    }
  }

  getAPIKeys(): APIConfig {
    return { ...this.apiKeys };
  }

  hasAPIKey(service: keyof APIConfig): boolean {
    return !!this.apiKeys[service];
  }
}

export const apiConfigService = new APIConfigService();
