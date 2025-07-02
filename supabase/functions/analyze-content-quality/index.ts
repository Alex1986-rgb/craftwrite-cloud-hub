import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisRequest {
  orderId: string;
  content: string;
}

interface QualityMetrics {
  uniqueness: number;
  readability: number;
  seoScore: number;
  keywordDensity: number;
  sentimentScore: number;
  structureScore: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, content }: AnalysisRequest = await req.json();

    console.log(`Analyzing content for order: ${orderId}`);

    // Анализ уникальности (имитация)
    const uniqueness = analyzeUniqueness(content);
    
    // Анализ читаемости
    const readability = analyzeReadability(content);
    
    // SEO анализ
    const seoScore = analyzeSEO(content);
    
    // Анализ плотности ключевых слов
    const keywordDensity = analyzeKeywordDensity(content);
    
    // Анализ тональности
    const sentimentScore = analyzeSentiment(content);
    
    // Анализ структуры
    const structureScore = analyzeStructure(content);

    const metrics: QualityMetrics = {
      uniqueness,
      readability,
      seoScore,
      keywordDensity,
      sentimentScore,
      structureScore
    };

    // Общая оценка качества
    const overallScore = Math.round(
      (uniqueness + readability + seoScore + keywordDensity + sentimentScore + structureScore) / 6
    );

    // Генерация рекомендаций
    const suggestions = generateSuggestions(metrics);

    console.log(`Analysis completed for order ${orderId}. Overall score: ${overallScore}%`);

    return new Response(JSON.stringify({
      metrics,
      overallScore,
      suggestions,
      analysisId: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-content-quality function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Ошибка анализа качества контента'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function analyzeUniqueness(content: string): number {
  // Имитация проверки уникальности
  // В реальности здесь был бы запрос к API сервиса проверки уникальности
  const length = content.length;
  const wordsCount = content.split(/\s+/).length;
  
  // Простая оценка на основе длины и количества уникальных слов
  const uniqueWords = new Set(content.toLowerCase().split(/\s+/)).size;
  const uniquenessRatio = uniqueWords / wordsCount;
  
  return Math.min(Math.round(uniquenessRatio * 100 + Math.random() * 10), 100);
}

function analyzeReadability(content: string): number {
  // Анализ читаемости (упрощенная формула)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = content.split(/\s+/);
  const syllables = countSyllables(content);
  
  // Упрощенная формула Флеша
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;
  
  const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
  
  // Конвертируем в процентную шкалу от 0 до 100
  return Math.max(0, Math.min(100, Math.round(fleschScore)));
}

function analyzeSEO(content: string): number {
  let score = 0;
  const text = content.toLowerCase();
  
  // Проверка наличия заголовков
  if (content.includes('# ') || content.includes('<h')) score += 20;
  
  // Проверка длины контента
  if (content.length > 300) score += 20;
  if (content.length > 1000) score += 10;
  
  // Проверка структуры (абзацы)
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
  if (paragraphs.length > 2) score += 15;
  
  // Проверка ключевых слов (упрощенно)
  const keywordIndicators = ['важно', 'качество', 'лучший', 'профессиональный'];
  const foundKeywords = keywordIndicators.filter(keyword => text.includes(keyword));
  score += foundKeywords.length * 5;
  
  // Проверка призывов к действию
  const ctaIndicators = ['заказать', 'связаться', 'получить', 'узнать'];
  const foundCTA = ctaIndicators.filter(cta => text.includes(cta));
  score += foundCTA.length * 10;
  
  return Math.min(100, score);
}

function analyzeKeywordDensity(content: string): number {
  // Анализ плотности ключевых слов
  const words = content.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  
  // Находим наиболее часто встречающиеся слова (исключая стоп-слова)
  const stopWords = ['и', 'в', 'на', 'с', 'по', 'для', 'от', 'до', 'из', 'к', 'о', 'об', 'за', 'под', 'над'];
  const filteredWords = words.filter(word => !stopWords.includes(word) && word.length > 2);
  
  const wordCount: { [key: string]: number } = {};
  filteredWords.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  // Находим самое частое слово
  const maxCount = Math.max(...Object.values(wordCount));
  const density = (maxCount / totalWords) * 100;
  
  // Оптимальная плотность 2-5%
  if (density >= 2 && density <= 5) return 90 + Math.random() * 10;
  if (density >= 1 && density < 2) return 70 + Math.random() * 15;
  if (density > 5 && density <= 8) return 60 + Math.random() * 20;
  
  return 40 + Math.random() * 30;
}

function analyzeSentiment(content: string): number {
  // Простой анализ тональности
  const positiveWords = ['отличный', 'качественный', 'профессиональный', 'лучший', 'эффективный', 'успешный'];
  const negativeWords = ['плохой', 'ужасный', 'неэффективный', 'провальный'];
  
  const text = content.toLowerCase();
  const positiveCount = positiveWords.filter(word => text.includes(word)).length;
  const negativeCount = negativeWords.filter(word => text.includes(word)).length;
  
  const sentiment = positiveCount - negativeCount;
  
  // Конвертируем в оценку от 0 до 100
  return Math.max(0, Math.min(100, 75 + sentiment * 5));
}

function analyzeStructure(content: string): number {
  let score = 0;
  
  // Проверка наличия заголовков
  if (content.includes('# ') || content.includes('## ')) score += 25;
  
  // Проверка абзацев
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
  if (paragraphs.length >= 3) score += 25;
  
  // Проверка списков
  if (content.includes('- ') || content.includes('* ') || /\d+\.\s/.test(content)) score += 20;
  
  // Проверка длины абзацев
  const avgParagraphLength = paragraphs.reduce((sum, p) => sum + p.length, 0) / paragraphs.length;
  if (avgParagraphLength > 100 && avgParagraphLength < 500) score += 20;
  
  // Проверка заключения
  const lastParagraph = paragraphs[paragraphs.length - 1] || '';
  if (lastParagraph.includes('заключени') || lastParagraph.includes('итог') || lastParagraph.includes('резюм')) {
    score += 10;
  }
  
  return Math.min(100, score);
}

function countSyllables(text: string): number {
  // Упрощенный подсчет слогов для русского языка
  const vowels = 'аеёиоуыэюя';
  let count = 0;
  
  for (const char of text.toLowerCase()) {
    if (vowels.includes(char)) count++;
  }
  
  return Math.max(1, count);
}

function generateSuggestions(metrics: QualityMetrics): string[] {
  const suggestions: string[] = [];
  
  if (metrics.uniqueness < 70) {
    suggestions.push('Увеличьте уникальность текста, добавив больше оригинального контента');
  }
  
  if (metrics.readability < 60) {
    suggestions.push('Упростите структуру предложений для улучшения читаемости');
  }
  
  if (metrics.seoScore < 70) {
    suggestions.push('Добавьте больше ключевых слов и улучшите SEO-структуру');
  }
  
  if (metrics.keywordDensity < 50) {
    suggestions.push('Оптимизируйте плотность ключевых слов (2-5% от общего объема)');
  }
  
  if (metrics.structureScore < 70) {
    suggestions.push('Улучшите структуру текста: добавьте заголовки, списки и абзацы');
  }
  
  if (metrics.sentimentScore < 60) {
    suggestions.push('Используйте более позитивную лексику для улучшения тональности');
  }
  
  if (suggestions.length === 0) {
    suggestions.push('Отличная работа! Качество контента на высоком уровне');
  }
  
  return suggestions;
}