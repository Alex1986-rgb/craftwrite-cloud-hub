
export interface APIConfig {
  openaiKey?: string;
  openai?: string; // Add this for backward compatibility
  textruKey?: string;
  anthropicKey?: string;
  geminiKey?: string;
}

class APIConfigService {
  private config: APIConfig = {};

  setAPIKeys(config: APIConfig): void {
    this.config = { ...this.config, ...config };
    
    // Сохраняем в localStorage (только публичные ключи)
    if (config.openaiKey) {
      localStorage.setItem('openai_api_key', config.openaiKey);
    }
    if (config.textruKey) {
      localStorage.setItem('textru_api_key', config.textruKey);
    }
  }

  getAPIKey(service: keyof APIConfig): string | undefined {
    // Сначала проверяем в памяти
    const key = this.config[service];
    if (key) return key;
    
    // Затем в localStorage
    const storageKey = this.getStorageKey(service);
    if (storageKey) {
      return localStorage.getItem(storageKey) || undefined;
    }
    
    return undefined;
  }

  hasAPIKey(service: keyof APIConfig): boolean {
    return !!this.getAPIKey(service);
  }

  removeAPIKey(service: keyof APIConfig): void {
    delete this.config[service];
    const storageKey = this.getStorageKey(service);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  }

  private getStorageKey(service: keyof APIConfig): string | null {
    const keyMap: Record<keyof APIConfig, string> = {
      openaiKey: 'openai_api_key',
      textruKey: 'textru_api_key',
      anthropicKey: 'anthropic_api_key',
      geminiKey: 'gemini_api_key'
    };
    
    return keyMap[service] || null;
  }

  getConfig(): APIConfig {
    return { ...this.config };
  }

  async validateAPIKey(service: keyof APIConfig, key: string): Promise<boolean> {
    // Здесь можно добавить реальную валидацию для каждого сервиса
    console.log(`Validating ${service} API key`);
    return key.length > 10; // Простая проверка
  }
}

export const apiConfigService = new APIConfigService();
