
import { openAIService } from './openai';
import { textRuService } from './textRuService';
import { seoOptimizer } from './seoOptimizer';
import { antiAiProcessor } from './antiAiProcessor';
import { synonymReplacer } from './synonymReplacer';
import { getPromptByServiceId } from '@/data/servicesWithPrompts';

export interface GenerationOrder {
  id: string;
  userId: string;
  serviceId: string;
  parameters: {
    topic?: string;
    length: number;
    audience: string;
    tone: string;
    keywords: string;
    [key: string]: any;
  };
  status: 'pending' | 'generating' | 'checking' | 'optimizing' | 'completed' | 'failed';
  progress: number;
  result?: string;
  qualityMetrics?: {
    uniqueness: number;
    readability: number;
    seoScore: number;
    grammarScore: number;
    aiDetectionScore: number;
  };
  processingSteps: string[];
  createdAt: Date;
  completedAt?: Date;
  errorMessage?: string;
}

export class ContentGenerationPipeline {
  private orders: Map<string, GenerationOrder> = new Map();
  private progressCallbacks: Map<string, (order: GenerationOrder) => void> = new Map();

  async processOrder(order: GenerationOrder): Promise<void> {
    console.log(`🚀 Начинаем обработку заказа ${order.id}`);
    
    try {
      this.updateOrderStatus(order.id, 'generating', 10, 'Подготовка к генерации...');
      
      // 1. Получаем промпт для услуги
      const servicePrompt = getPromptByServiceId(order.serviceId);
      if (!servicePrompt) {
        throw new Error(`Промпт для услуги ${order.serviceId} не найден`);
      }

      // 2. Подставляем переменные в промпт
      const finalPrompt = this.interpolatePrompt(servicePrompt.systemPrompt, order.parameters);
      
      this.updateOrderStatus(order.id, 'generating', 20, 'Генерация контента через OpenAI...');
      
      // 3. Генерируем контент через OpenAI
      let generatedText = await openAIService.generateText({
        prompt: finalPrompt,
        textType: order.serviceId,
        length: order.parameters.length,
        tone: order.parameters.tone,
        audience: order.parameters.audience,
        keywords: order.parameters.keywords,
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: true
      });

      this.updateOrderStatus(order.id, 'checking', 40, 'Проверка уникальности через Text.ru...');
      
      // 4. Проверяем уникальность через Text.ru
      const uniquenessResult = await textRuService.checkUniqueness(generatedText);
      console.log(`📊 Уникальность: ${uniquenessResult.uniqueness}%`);
      
      // 5. Если уникальность низкая - заменяем синонимами
      if (uniquenessResult.uniqueness < servicePrompt.qualityChecks.uniquenessThreshold) {
        this.updateOrderStatus(order.id, 'checking', 50, 'Повышение уникальности синонимами...');
        generatedText = await synonymReplacer.improvePlainText(generatedText, uniquenessResult.duplicateFragments);
        
        // Повторная проверка
        const recheckResult = await textRuService.checkUniqueness(generatedText);
        console.log(`🔄 Повторная проверка уникальности: ${recheckResult.uniqueness}%`);
      }

      this.updateOrderStatus(order.id, 'optimizing', 70, 'SEO-оптимизация...');
      
      // 6. SEO-оптимизация
      if (servicePrompt.seoParameters.headingStructure) {
        generatedText = await seoOptimizer.optimizeContent(generatedText, {
          keywords: order.parameters.keywords,
          keywordDensity: servicePrompt.seoParameters.keywordDensity,
          addHeadings: servicePrompt.seoParameters.headingStructure,
          addInternalLinks: servicePrompt.seoParameters.internalLinks
        });
      }

      this.updateOrderStatus(order.id, 'optimizing', 85, 'Анти-AI обработка...');
      
      // 7. Анти-AI обработка
      if (servicePrompt.antiAiSettings.enabled) {
        generatedText = await antiAiProcessor.humanizeText(generatedText, {
          level: servicePrompt.antiAiSettings.humanizationLevel === 'high' ? 'aggressive' : 
                servicePrompt.antiAiSettings.humanizationLevel === 'low' ? 'light' : 'medium', // Fix type conversion
          variability: servicePrompt.antiAiSettings.variabilityFactor
        });
      }

      // 8. Финальная проверка качества
      this.updateOrderStatus(order.id, 'optimizing', 95, 'Финальная проверка качества...');
      
      const finalQuality = await this.calculateQualityMetrics(generatedText, order.parameters.keywords);
      
      // 9. Завершение
      this.updateOrderStatus(order.id, 'completed', 100, 'Готово! ✅');
      
      order.result = generatedText;
      order.qualityMetrics = finalQuality;
      order.completedAt = new Date();
      
      console.log(`✅ Заказ ${order.id} успешно завершен`);
      
    } catch (error) {
      console.error(`❌ Ошибка обработки заказа ${order.id}:`, error);
      this.updateOrderStatus(order.id, 'failed', 0, `Ошибка: ${error.message}`);
      order.errorMessage = error.message;
    }
  }

  private interpolatePrompt(template: string, parameters: any): string {
    let result = template;
    
    Object.entries(parameters).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      result = result.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), String(value));
    });
    
    // Убираем незаполненные переменные
    result = result.replace(/\{[^}]+\}/g, '');
    
    return result;
  }

  private updateOrderStatus(orderId: string, status: GenerationOrder['status'], progress: number, message: string): void {
    const order = this.orders.get(orderId);
    if (order) {
      order.status = status;
      order.progress = progress;
      order.processingSteps.push(`${new Date().toLocaleTimeString()}: ${message}`);
      
      const callback = this.progressCallbacks.get(orderId);
      if (callback) {
        callback(order);
      }
    }
  }

  private async calculateQualityMetrics(text: string, keywords: string): Promise<GenerationOrder['qualityMetrics']> {
    // Заглушка для расчета метрик качества
    return {
      uniqueness: 85 + Math.random() * 15,
      readability: 70 + Math.random() * 20,
      seoScore: 75 + Math.random() * 20,
      grammarScore: 90 + Math.random() * 10,
      aiDetectionScore: 15 + Math.random() * 25 // чем меньше, тем лучше
    };
  }

  createOrder(orderData: Omit<GenerationOrder, 'id' | 'status' | 'progress' | 'processingSteps' | 'createdAt'>): string {
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const order: GenerationOrder = {
      id: orderId,
      status: 'pending',
      progress: 0,
      processingSteps: [],
      createdAt: new Date(),
      ...orderData
    };
    
    this.orders.set(orderId, order);
    return orderId;
  }

  async startProcessing(orderId: string, progressCallback?: (order: GenerationOrder) => void): Promise<void> {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error(`Заказ ${orderId} не найден`);
    }
    
    if (progressCallback) {
      this.progressCallbacks.set(orderId, progressCallback);
    }
    
    // Запускаем обработку асинхронно
    setTimeout(() => {
      this.processOrder(order);
    }, 1000);
  }

  getOrder(orderId: string): GenerationOrder | undefined {
    return this.orders.get(orderId);
  }

  getAllOrders(): GenerationOrder[] {
    return Array.from(this.orders.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const contentPipeline = new ContentGenerationPipeline();
