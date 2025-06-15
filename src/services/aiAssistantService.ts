
interface UserProfile {
  experience: 'новичок' | 'средний' | 'эксперт';
  preferredStyle: 'официальный' | 'дружелюбный' | 'продающий' | 'информативный';
  interests: string[];
  commonMistakes: string[];
}

interface SmartRecommendation {
  id: string;
  type: 'improvement' | 'optimization' | 'learning' | 'style';
  title: string;
  description: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  category: 'seo' | 'readability' | 'conversion' | 'style' | 'structure';
  suggestion: string;
  example?: string;
  learnMore?: string;
}

interface ContextualHint {
  trigger: string;
  message: string;
  type: 'tip' | 'warning' | 'suggestion';
  priority: number;
}

export class AIAssistantService {
  private static userProfile: UserProfile = {
    experience: 'средний',
    preferredStyle: 'дружелюбный',
    interests: [],
    commonMistakes: []
  };

  static setUserProfile(profile: Partial<UserProfile>) {
    this.userProfile = { ...this.userProfile, ...profile };
  }

  static generateSmartRecommendations(
    text: string, 
    textType: string, 
    qualityAnalysis?: any
  ): SmartRecommendation[] {
    const recommendations: SmartRecommendation[] = [];

    // SEO рекомендации
    if (textType === 'seo-article') {
      recommendations.push(...this.getSEORecommendations(text, qualityAnalysis));
    }

    // Рекомендации по читабельности
    recommendations.push(...this.getReadabilityRecommendations(text));

    // Рекомендации по конверсии
    if (['landing', 'email', 'product'].includes(textType)) {
      recommendations.push(...this.getConversionRecommendations(text, textType));
    }

    // Персональные рекомендации
    recommendations.push(...this.getPersonalizedRecommendations(text));

    return recommendations.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.importance] - priorityOrder[a.importance];
    });
  }

  private static getSEORecommendations(text: string, analysis?: any): SmartRecommendation[] {
    const recommendations: SmartRecommendation[] = [];

    // Проверка заголовков
    const hasH1 = /^#\s/.test(text);
    if (!hasH1) {
      recommendations.push({
        id: 'missing-h1',
        type: 'optimization',
        title: 'Отсутствует основной заголовок',
        description: 'Добавьте заголовок H1 для лучшего SEO',
        importance: 'high',
        category: 'seo',
        suggestion: 'Начните статью с основного заголовка, используя # в Markdown',
        example: '# Ваш основной заголовок статьи'
      });
    }

    // Проверка структуры
    const headingsCount = (text.match(/^#{1,6}\s/gm) || []).length;
    const textLength = text.length;
    if (textLength > 2000 && headingsCount < 3) {
      recommendations.push({
        id: 'poor-structure',
        type: 'improvement',
        title: 'Улучшите структуру текста',
        description: 'Добавьте больше подзаголовков для длинного текста',
        importance: 'medium',
        category: 'structure',
        suggestion: 'Разбейте текст на логические блоки с подзаголовками H2-H3',
        example: '## Подзаголовок раздела\n\n### Более детальный подраздел'
      });
    }

    return recommendations;
  }

  private static getReadabilityRecommendations(text: string): SmartRecommendation[] {
    const recommendations: SmartRecommendation[] = [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.reduce((acc, s) => acc + s.split(' ').length, 0) / sentences.length;

    if (avgSentenceLength > 20) {
      recommendations.push({
        id: 'long-sentences',
        type: 'improvement',
        title: 'Упростите предложения',
        description: 'Слишком длинные предложения ухудшают читабельность',
        importance: 'medium',
        category: 'readability',
        suggestion: 'Разбейте длинные предложения на более короткие (до 15-20 слов)',
        example: 'Вместо: "Этот продукт, который был разработан нашей командой..." → "Наша команда разработала этот продукт. Он обладает..."'
      });
    }

    // Проверка пассивного залога
    const passiveIndicators = ['был', 'была', 'было', 'были', 'будет', 'является'];
    const passiveCount = passiveIndicators.reduce((count, indicator) => {
      return count + (text.match(new RegExp(`\\b${indicator}\\b`, 'gi')) || []).length;
    }, 0);

    if (passiveCount > sentences.length * 0.3) {
      recommendations.push({
        id: 'passive-voice',
        type: 'improvement',
        title: 'Используйте активный залог',
        description: 'Много пассивных конструкций делают текст скучным',
        importance: 'low',
        category: 'style',
        suggestion: 'Замените пассивные конструкции на активные',
        example: 'Вместо: "Товар был доставлен" → "Мы доставили товар"'
      });
    }

    return recommendations;
  }

  private static getConversionRecommendations(text: string, textType: string): SmartRecommendation[] {
    const recommendations: SmartRecommendation[] = [];

    // Проверка призывов к действию
    const ctaIndicators = ['купить', 'заказать', 'получить', 'скачать', 'подписаться', 'связаться'];
    const hasCTA = ctaIndicators.some(cta => text.toLowerCase().includes(cta));

    if (!hasCTA) {
      recommendations.push({
        id: 'missing-cta',
        type: 'optimization',
        title: 'Добавьте призыв к действию',
        description: 'Четкий CTA увеличивает конверсию',
        importance: 'high',
        category: 'conversion',
        suggestion: 'Завершите текст ясным призывом к действию',
        example: textType === 'landing' 
          ? '"Закажите консультацию прямо сейчас!"' 
          : '"Подпишитесь на обновления"'
      });
    }

    // Проверка социальных доказательств
    const socialProofIndicators = ['отзыв', 'клиент', 'результат', 'успех', '%', 'увеличил'];
    const hasSocialProof = socialProofIndicators.some(proof => text.toLowerCase().includes(proof));

    if (!hasSocialProof && textType === 'landing') {
      recommendations.push({
        id: 'missing-social-proof',
        type: 'improvement',
        title: 'Добавьте социальные доказательства',
        description: 'Отзывы и результаты повышают доверие',
        importance: 'medium',
        category: 'conversion',
        suggestion: 'Включите статистику, отзывы или кейсы клиентов',
        example: '"95% наших клиентов получили результат уже в первый месяц"'
      });
    }

    return recommendations;
  }

  private static getPersonalizedRecommendations(text: string): SmartRecommendation[] {
    const recommendations: SmartRecommendation[] = [];

    // Рекомендации для новичков
    if (this.userProfile.experience === 'новичок') {
      recommendations.push({
        id: 'beginner-tip',
        type: 'learning',
        title: 'Совет для начинающих',
        description: 'Изучите базовые принципы копирайтинга',
        importance: 'low',
        category: 'style',
        suggestion: 'Фокусируйтесь на одной главной идее в каждом абзаце',
        learnMore: 'Читайте о формуле AIDA: Внимание → Интерес → Желание → Действие'
      });
    }

    // Стилистические рекомендации
    if (this.userProfile.preferredStyle === 'продающий') {
      const benefitWords = ['выгода', 'преимущество', 'экономия', 'результат'];
      const hasBenefits = benefitWords.some(word => text.toLowerCase().includes(word));
      
      if (!hasBenefits) {
        recommendations.push({
          id: 'sales-focus',
          type: 'style',
          title: 'Усильте выгоды для клиента',
          description: 'В продающем тексте важно подчеркнуть преимущества',
          importance: 'medium',
          category: 'conversion',
          suggestion: 'Добавьте больше конкретных выгод для клиента',
          example: '"Вы сэкономите 30% времени на задачах"'
        });
      }
    }

    return recommendations;
  }

  static getContextualHints(currentText: string, cursor: number): ContextualHint[] {
    const hints: ContextualHint[] = [];
    const textBeforeCursor = currentText.substring(0, cursor);
    const currentParagraph = textBeforeCursor.split('\n').pop() || '';

    // Подсказки в процессе написания
    if (currentParagraph.length > 200 && !currentParagraph.includes('.')) {
      hints.push({
        trigger: 'long-paragraph',
        message: '💡 Длинный абзац без точек. Разбейте его на предложения для лучшей читабельности',
        type: 'tip',
        priority: 2
      });
    }

    if (currentParagraph.toLowerCase().includes('очень') || currentParagraph.toLowerCase().includes('много')) {
      hints.push({
        trigger: 'weak-words',
        message: '⚠️ Избегайте слабых слов как "очень", "много". Используйте более конкретные определения',
        type: 'warning',
        priority: 1
      });
    }

    if (currentParagraph.match(/\b\w{15,}\b/)) {
      hints.push({
        trigger: 'complex-words',
        message: '📝 Обнаружены сложные слова. Упростите формулировки для лучшего понимания',
        type: 'suggestion',
        priority: 1
      });
    }

    return hints.sort((a, b) => b.priority - a.priority);
  }

  static getWritingTips(textType: string): string[] {
    const generalTips = [
      'Пишите короткими предложениями (10-15 слов)',
      'Используйте активный залог вместо пассивного',
      'Начинайте абзацы с ключевой идеи',
      'Проверяйте текст на орфографию и пунктуацию'
    ];

    const specificTips: { [key: string]: string[] } = {
      'seo-article': [
        'Включите ключевые слова в заголовки',
        'Используйте синонимы и LSI-слова',
        'Оптимальная плотность ключевых слов: 1-2%',
        'Добавьте внутренние ссылки'
      ],
      'landing': [
        'Начните с проблемы клиента',
        'Предложите решение с конкретными выгодами',
        'Добавьте социальные доказательства',
        'Завершите четким призывом к действию'
      ],
      'email': [
        'Создайте цепляющую тему письма',
        'Персонализируйте обращение',
        'Используйте короткие абзацы',
        'Добавьте один четкий CTA'
      ],
      'social': [
        'Начните с вопроса или интриги',
        'Используйте эмодзи для эмоций',
        'Добавьте хештеги (2-5 штук)',
        'Призывайте к взаимодействию'
      ]
    };

    return [...generalTips, ...(specificTips[textType] || [])];
  }

  static analyzeWritingStyle(text: string): {
    complexity: 'простой' | 'средний' | 'сложный';
    tone: 'формальный' | 'неформальный' | 'нейтральный';
    suggestions: string[];
  } {
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = words.length / sentences.length;

    // Определение сложности
    let complexity: 'простой' | 'средний' | 'сложный' = 'средний';
    if (avgWordsPerSentence < 12) complexity = 'простой';
    if (avgWordsPerSentence > 18) complexity = 'сложный';

    // Определение тональности
    const formalWords = ['однако', 'следовательно', 'необходимо', 'осуществлять'];
    const informalWords = ['круто', 'классно', 'супер', 'офигенно'];
    
    const formalCount = formalWords.reduce((count, word) => 
      count + (text.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length, 0);
    const informalCount = informalWords.reduce((count, word) => 
      count + (text.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length, 0);

    let tone: 'формальный' | 'неформальный' | 'нейтральный' = 'нейтральный';
    if (formalCount > informalCount) tone = 'формальный';
    if (informalCount > formalCount) tone = 'неформальный';

    const suggestions: string[] = [];
    if (complexity === 'сложный') {
      suggestions.push('Упростите предложения для лучшей читабельности');
    }
    if (tone === 'формальный' && this.userProfile.preferredStyle === 'дружелюбный') {
      suggestions.push('Сделайте тон более дружелюбным для целевой аудитории');
    }

    return { complexity, tone, suggestions };
  }
}
