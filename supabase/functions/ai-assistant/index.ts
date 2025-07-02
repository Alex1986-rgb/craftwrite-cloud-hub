
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompts = {
  general: `Ты профессиональный AI-ассистент по копирайтингу CopyPro Cloud. 
Помогаешь клиентам с:
- Созданием текстов
- SEO-оптимизацией
- Маркетинговыми стратегиями
- Анализом контента

Отвечай дружелюбно, профессионально и конкретно. Используй примеры когда это уместно.`,

  copywriting: `Ты эксперт-копирайтер с 10+ лет опыта. Специализируешься на:
- Продающих текстах и лендингах
- Email-маркетинге
- Социальных сетях
- Формулах AIDA, PAS, QUEST

Давай практические советы с примерами. Анализируй тексты пользователей конструктивно.`,

  seo: `Ты SEO-эксперт и специалист по контент-маркетингу. Помогаешь с:
- Подбором ключевых слов
- Структурой SEO-статей
- Мета-тегами и заголовками
- Техническим SEO для текстов

Объясняй сложные концепции простым языком. Ссылайся на актуальные требования поисковиков.`,

  marketing: `Ты стратег контент-маркетинга. Специализируешься на:
- Анализе целевой аудитории
- Воронках продаж
- Стратегии контента
- Метриках эффективности

Предлагай конкретные решения и инструменты. Учитывай российский рынок.`
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, context, capability = 'general', conversation_history = [] } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Build conversation context
    const systemPrompt = systemPrompts[capability as keyof typeof systemPrompts] || systemPrompts.general;
    
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversation_history.slice(-4).map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    console.log('AI Assistant request:', { capability, message: message.substring(0, 100) });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.3,
        presence_penalty: 0.1
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Update context with new information
    const updatedContext = {
      ...context,
      last_capability: capability,
      interaction_count: (context.interaction_count || 0) + 1,
      last_interaction: new Date().toISOString()
    };

    console.log('AI Assistant response generated successfully');

    return new Response(
      JSON.stringify({ 
        response: aiResponse.trim(),
        context: updatedContext,
        usage: {
          tokens: data.usage?.total_tokens || 0,
          model: 'gpt-4.1-2025-04-14'
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-assistant function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        response: 'Извините, произошла ошибка. Попробуйте еще раз или обратитесь к нашим специалистам.'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
