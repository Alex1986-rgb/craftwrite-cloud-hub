import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();
    console.log(`AI Content Enhancer: Processing ${action} request`);

    let result;
    
    switch (action) {
      case 'generate-lsi-keywords':
        result = await generateLSIKeywords(data);
        break;
      case 'generate-meta-tags':
        result = await generateMetaTags(data);
        break;
      case 'analyze-content':
        result = await analyzeContent(data);
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('AI Content Enhancer error:', error);
    
    // Return fallback response for LSI keywords
    if (error.message && error.message.includes('generate-lsi-keywords')) {
      const fallbackLSI = generateFallbackLSI(data);
      return new Response(JSON.stringify({ success: true, result: fallbackLSI }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      fallback: true 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateLSIKeywords(data: any) {
  const { mainKeywords, topic, maxKeywords = 15 } = data;
  
  if (!openAIApiKey) {
    console.log('OpenAI API key not available, using fallback');
    return generateFallbackLSI({ mainKeywords, topic });
  }

  const prompt = `
    Анализируй тему "${topic}" и основные ключевые слова: ${mainKeywords.join(', ')}.
    
    Сгенерируй ${maxKeywords} LSI-ключевых слов (семантически связанных) в формате JSON:
    [
      {"keyword": "ключевое слово", "relevance": 0.9, "category": "основные"},
      {"keyword": "синоним", "relevance": 0.8, "category": "синонимы"},
      {"keyword": "смежная тема", "relevance": 0.7, "category": "смежные"}
    ]
    
    Категории: основные, синонимы, смежные, технические, коммерческие
    Relevance: от 0.5 до 1.0
    
    Верни ТОЛЬКО валидный JSON массив, без дополнительного текста.
  `;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Ты эксперт по SEO и семантическому анализу. Отвечай только валидным JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const aiResponse = await response.json();
  const generatedText = aiResponse.choices[0].message.content;
  
  try {
    // Extract JSON from response
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    return Array.isArray(parsed) ? parsed : [];
  } catch (parseError) {
    console.error('JSON parsing error:', parseError);
    return generateFallbackLSI({ mainKeywords, topic });
  }
}

async function generateMetaTags(data: any) {
  const { topic, keywords, characterCount, targetAudience } = data;
  
  if (!openAIApiKey) {
    console.log('OpenAI API key not available, using fallback');
    return generateFallbackMetaTags({ topic, keywords });
  }

  const prompt = `
    Создай SEO-оптимизированные мета-теги для статьи:
    
    Тема: "${topic}"
    Ключевые слова: ${keywords.join(', ')}
    Объем статьи: ${characterCount} символов
    ${targetAudience ? `Целевая аудитория: ${targetAudience}` : ''}
    
    Требования:
    - Title: максимум 60 символов, включи главное ключевое слово
    - Description: максимум 160 символов, призыв к действию
    
    Ответ в JSON:
    {
      "title": "SEO-заголовок",
      "description": "SEO-описание с призывом к действию"
    }
    
    Верни ТОЛЬКО валидный JSON, без дополнительного текста.
  `;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Ты эксперт по SEO. Создавай эффективные мета-теги. Отвечай только валидным JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const aiResponse = await response.json();
  const generatedText = aiResponse.choices[0].message.content;
  
  try {
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    return {
      title: parsed.title || generateFallbackTitle(topic, keywords[0]),
      description: parsed.description || generateFallbackDescription(topic, keywords),
      length: {
        title: (parsed.title || '').length,
        description: (parsed.description || '').length
      }
    };
  } catch (parseError) {
    console.error('JSON parsing error:', parseError);
    return generateFallbackMetaTags({ topic, keywords });
  }
}

async function analyzeContent(data: any) {
  const { topic, keywords, characterCount, targetAudience } = data;
  
  const [lsiKeywords, metaTags] = await Promise.all([
    generateLSIKeywords({ mainKeywords: keywords, topic }),
    generateMetaTags({ topic, keywords, characterCount, targetAudience })
  ]);

  const suggestions = generateContentSuggestions(topic, characterCount, keywords);

  return {
    lsiKeywords,
    metaTags,
    suggestions
  };
}

// Fallback functions
function generateFallbackLSI({ mainKeywords, topic }: any) {
  const fallbackKeywords = [
    ...mainKeywords.map((k: string) => ({ 
      keyword: `${k} цена`, 
      relevance: 0.8, 
      category: 'коммерческие' 
    })),
    ...mainKeywords.map((k: string) => ({ 
      keyword: `как ${k}`, 
      relevance: 0.7, 
      category: 'смежные' 
    })),
    { keyword: `${topic} отзывы`, relevance: 0.6, category: 'коммерческие' },
    { keyword: `${topic} советы`, relevance: 0.7, category: 'смежные' },
    { keyword: `лучший ${topic}`, relevance: 0.8, category: 'основные' },
    { keyword: `профессиональный ${topic}`, relevance: 0.7, category: 'основные' }
  ];
  
  return fallbackKeywords.slice(0, 10);
}

function generateFallbackTitle(topic: string, mainKeyword: string): string {
  return `${topic}: ${mainKeyword} - полное руководство 2024`;
}

function generateFallbackDescription(topic: string, keywords: string[]): string {
  return `Узнайте всё о ${topic}. ${keywords.slice(0, 2).join(', ')} и многое другое. Экспертные советы и практические рекомендации.`;
}

function generateFallbackMetaTags({ topic, keywords }: any) {
  const title = generateFallbackTitle(topic, keywords[0] || topic);
  const description = generateFallbackDescription(topic, keywords);
  
  return {
    title,
    description,
    length: {
      title: title.length,
      description: description.length
    }
  };
}

function generateContentSuggestions(topic: string, characterCount: number, keywords: string[]) {
  return [
    `Рекомендуем включить статистику по теме "${topic}"`,
    `Добавьте примеры использования для: ${keywords.slice(0, 2).join(', ')}`,
    `При объеме ${characterCount} символов оптимально 3-5 подзаголовков`,
    'Не забудьте про призыв к действию в конце статьи',
    'Рекомендуем добавить FAQ раздел для лучшего SEO'
  ].slice(0, 3);
}