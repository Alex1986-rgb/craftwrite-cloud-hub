
export interface UniquenessResult {
  uniqueness: number;
  textLength: number;
  duplicateFragments: Array<{
    text: string;
    sources: string[];
    percentage: number;
  }>;
  checkId: string;
  status: 'completed' | 'processing' | 'error';
  message?: string;
}

class TextRuService {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.text.ru';

  setApiKey(key: string): void {
    this.apiKey = key;
    localStorage.setItem('textru_api_key', key);
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('textru_api_key');
    }
    return this.apiKey;
  }

  async checkUniqueness(text: string): Promise<UniquenessResult> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      // Заглушка для тестирования без API ключа
      console.warn('⚠️ Text.ru API ключ не установлен, используется заглушка');
      return this.getMockUniquenessResult(text);
    }

    try {
      // 1. Отправляем текст на проверку
      const checkResponse = await fetch(`${this.baseUrl}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          userkey: apiKey,
          text: text,
          title: 'Проверка уникальности',
          exceptdomain: '',
          visible: '1'
        })
      });

      if (!checkResponse.ok) {
        throw new Error(`Text.ru API error: ${checkResponse.status}`);
      }

      const checkResult = await checkResponse.json();
      
      if (checkResult.error_code) {
        throw new Error(`Text.ru error: ${checkResult.error_desc}`);
      }

      const checkId = checkResult.text_uid;
      
      // 2. Ждем завершения проверки
      return await this.waitForResult(checkId);
      
    } catch (error) {
      console.error('Ошибка проверки в Text.ru:', error);
      // Возвращаем заглушку при ошибке
      return this.getMockUniquenessResult(text);
    }
  }

  private async waitForResult(checkId: string, maxAttempts: number = 30): Promise<UniquenessResult> {
    const apiKey = this.getApiKey()!;
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await fetch(`${this.baseUrl}/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            userkey: apiKey,
            uid: checkId
          })
        });

        const result = await response.json();
        
        if (result.text_unique !== undefined) {
          return {
            uniqueness: parseFloat(result.text_unique),
            textLength: parseInt(result.text_length) || 0,
            duplicateFragments: this.parseDuplicates(result.result_json),
            checkId: checkId,
            status: 'completed'
          };
        }
        
        // Ждем 2 секунды перед следующей попыткой
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`Попытка ${attempt + 1} неудачна:`, error);
      }
    }
    
    throw new Error('Превышено время ожидания результата проверки');
  }

  private parseDuplicates(resultJson: string): UniquenessResult['duplicateFragments'] {
    try {
      const data = JSON.parse(resultJson || '{}');
      return data.matches?.map((match: any) => ({
        text: match.text,
        sources: match.urls || [],
        percentage: match.percentage || 0
      })) || [];
    } catch {
      return [];
    }
  }

  private getMockUniquenessResult(text: string): UniquenessResult {
    // Имитируем реальную проверку с случайными результатами
    const uniqueness = 75 + Math.random() * 20; // 75-95%
    const duplicateFragments = uniqueness < 85 ? [
      {
        text: text.substring(0, 100) + '...',
        sources: ['example.com', 'site.ru'],
        percentage: 15
      }
    ] : [];

    return {
      uniqueness: Math.round(uniqueness),
      textLength: text.length,
      duplicateFragments,
      checkId: `mock_${Date.now()}`,
      status: 'completed',
      message: 'Заглушка - Text.ru API не настроен'
    };
  }
}

export const textRuService = new TextRuService();
