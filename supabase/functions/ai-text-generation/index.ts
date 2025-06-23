
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { prompt, service_type, target_audience, tone, length, keywords, additional_requirements } = await req.json()

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Формируем системный промпт в зависимости от типа услуги
    let systemPrompt = 'Ты профессиональный копирайтер. '
    
    switch (service_type) {
      case 'seo-article':
        systemPrompt += 'Создавай SEO-оптимизированные статьи с правильной структурой и ключевыми словами.'
        break
      case 'landing':
        systemPrompt += 'Создавай продающие тексты для лендингов, которые конвертируют посетителей в клиентов.'
        break
      case 'email':
        systemPrompt += 'Создавай эффективные email-рассылки с высоким уровнем открытий и кликов.'
        break
      case 'social':
        systemPrompt += 'Создавай вирусный контент для социальных сетей, который привлекает внимание и вовлекает аудиторию.'
        break
      default:
        systemPrompt += 'Создавай качественный контент в соответствии с техническим заданием.'
    }

    if (target_audience) {
      systemPrompt += ` Целевая аудитория: ${target_audience}.`
    }
    if (tone) {
      systemPrompt += ` Тон: ${tone}.`
    }
    if (length) {
      systemPrompt += ` Объем: ${length} символов.`
    }
    if (keywords) {
      systemPrompt += ` Используй ключевые слова: ${keywords.join(', ')}.`
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: Math.ceil((length || 5000) * 1.5),
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.3,
        presence_penalty: 0.1
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`)
    }

    const data = await response.json()
    const generatedText = data.choices[0]?.message?.content

    if (!generatedText) {
      throw new Error('No text generated from OpenAI')
    }

    return new Response(
      JSON.stringify({ 
        text: generatedText.trim(),
        metadata: {
          model: 'gpt-4.1-2025-04-14',
          tokens_used: data.usage?.total_tokens,
          service_type
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in ai-text-generation function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
