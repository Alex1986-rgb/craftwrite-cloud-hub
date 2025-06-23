
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GenerationRequest {
  prompt: string;
  service_type: string;
  target_audience?: string;
  tone?: string;
  length?: number;
  keywords?: string[];
  additional_requirements?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Получаем данные запроса
    const { prompt, service_type, target_audience, tone, length, keywords, additional_requirements }: GenerationRequest = await req.json();

    console.log('Generating text for:', { service_type, prompt: prompt.substring(0, 100) });

    // Формируем системный промпт
    const systemPrompt = `Вы - профессиональный копирайтер с экспертизой в ${service_type}. 
    ${target_audience ? `Целевая аудитория: ${target_audience}.` : ''}
    ${tone ? `Тон: ${tone}.` : ''}
    ${keywords ? `Ключевые слова для включения: ${keywords.join(', ')}.` : ''}
    ${additional_requirements ? `Дополнительные требования: ${additional_requirements}` : ''}
    
    Создайте качественный, уникальный текст, который соответствует всем требованиям.`;

    // Запрос к OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: length || 1500,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.statusText}`);
    }

    const result = await openaiResponse.json();
    const generatedText = result.choices[0]?.message?.content;

    if (!generatedText) {
      throw new Error('No text generated');
    }

    // Логируем использование API
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id;
    }

    // Сохраняем лог генерации
    await supabase.from('activity_logs').insert({
      user_id: userId,
      action: 'ai_text_generated',
      entity_type: 'ai_generation',
      details: {
        service_type,
        prompt_length: prompt.length,
        generated_length: generatedText.length,
        model: 'gpt-4'
      }
    });

    return new Response(
      JSON.stringify({ 
        text: generatedText,
        metadata: {
          model: 'gpt-4',
          tokens_used: result.usage?.total_tokens,
          service_type
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in ai-text-generation:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Text generation failed',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
