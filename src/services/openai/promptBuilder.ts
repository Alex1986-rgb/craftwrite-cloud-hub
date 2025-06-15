
import { GenerationParams } from './types';

export class PromptBuilder {
  static buildSystemPrompt(params: GenerationParams): string {
    const typeMap: Record<string, string> = {
      'seo-article': 'SEO-оптимизированную статью',
      'landing': 'продающий текст для лендинга',
      'email': 'текст для email-рассылки',
      'social': 'пост для социальных сетей',
      'product': 'описание товара',
      'blog': 'статью для блога',
      'press-release': 'пресс-релиз'
    };

    const toneMap: Record<string, string> = {
      'professional': 'профессиональном',
      'friendly': 'дружелюбном',
      'formal': 'официальном',
      'casual': 'неформальном',
      'persuasive': 'убедительном',
      'informative': 'информативном'
    };

    const audienceMap: Record<string, string> = {
      'b2b': 'бизнес-аудитории (B2B)',
      'b2c': 'потребителей (B2C)',
      'experts': 'экспертов в области',
      'beginners': 'новичков',
      'general': 'широкой аудитории'
    };

    let systemPrompt = `Ты профессиональный копирайтер. Создай ${typeMap[params.textType] || 'текст'} в ${toneMap[params.tone] || 'нейтральном'} тоне для ${audienceMap[params.audience] || 'целевой аудитории'}.

Требования:
- Объем: примерно ${params.length} символов
- Язык: русский`;

    if (params.keywords) {
      systemPrompt += `\n- Ключевые слова для включения: ${params.keywords}`;
    }

    if (params.seoOptimized) {
      systemPrompt += '\n- Оптимизируй для поисковых систем (SEO)';
    }

    if (params.includeCTA) {
      systemPrompt += '\n- Включи призыв к действию (CTA)';
    }

    if (params.includeEmoji) {
      systemPrompt += '\n- Используй эмодзи для повышения вовлеченности';
    }

    systemPrompt += '\n\nСоздай качественный, уникальный текст, который будет эффективно решать поставленную задачу.';

    return systemPrompt;
  }
}
