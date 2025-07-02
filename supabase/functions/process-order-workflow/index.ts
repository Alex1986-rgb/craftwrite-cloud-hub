import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderData {
  id: string;
  service_slug: string;
  service_name: string;
  details: string;
  additional_requirements?: string;
  service_options?: any;
  technical_specification?: any;
  contact_name: string;
  contact_email: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order_id } = await req.json();
    
    console.log(`Starting workflow for order: ${order_id}`);

    // 1. Получаем данные заказа
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', order_id)
      .single();

    if (orderError || !order) {
      throw new Error(`Order not found: ${orderError?.message}`);
    }

    // 2. Генерируем промпт
    const prompt = await generatePrompt(order);
    
    // 3. Обновляем заказ с промптом
    await supabase
      .from('orders')
      .update({ 
        generated_prompt: prompt,
        status: 'processing'
      })
      .eq('id', order_id);

    // 4. Генерируем текст
    const generatedText = await generateText(prompt, order.service_slug);
    
    // 5. Сохраняем результат
    const { error: contentError } = await supabase
      .from('generated_content_versions')
      .insert({
        order_id: order_id,
        content: generatedText,
        content_type: order.service_slug,
        prompt_used: prompt,
        ai_model: 'gpt-4.1-2025-04-14',
        created_by: order.user_id
      });

    if (contentError) {
      throw new Error(`Failed to save content: ${contentError.message}`);
    }

    // 6. Обновляем статус заказа
    await supabase
      .from('orders')
      .update({ 
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('id', order_id);

    // 7. Отправляем уведомление
    await sendNotification(order);

    console.log(`Workflow completed for order: ${order_id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        order_id,
        content_generated: true 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error: any) {
    console.error('Workflow error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

async function generatePrompt(order: OrderData): Promise<string> {
  // Получаем шаблон промпта для услуги
  const { data: template } = await supabase
    .from('prompt_templates')
    .select('*')
    .eq('service_type', order.service_slug)
    .eq('is_active', true)
    .single();

  if (!template) {
    // Fallback промпт если шаблон не найден
    return createFallbackPrompt(order);
  }

  // Подставляем переменные из заказа
  let prompt = template.prompt_template;
  const variables = template.variables || [];

  // Подстановка основных переменных
  prompt = prompt.replace(/\{\{service_name\}\}/g, order.service_name);
  prompt = prompt.replace(/\{\{details\}\}/g, order.details);
  prompt = prompt.replace(/\{\{additional_requirements\}\}/g, order.additional_requirements || '');
  prompt = prompt.replace(/\{\{contact_name\}\}/g, order.contact_name);

  // Подстановка из service_options
  if (order.service_options) {
    for (const [key, value] of Object.entries(order.service_options)) {
      const placeholder = `{{${key}}}`;
      prompt = prompt.replace(new RegExp(placeholder, 'g'), String(value));
    }
  }

  // Анализ ключевых слов из технического задания
  const keywords = extractKeywords(order.details + ' ' + (order.additional_requirements || ''));
  prompt = prompt.replace(/\{\{keywords\}\}/g, keywords.join(', '));

  return prompt;
}

function extractKeywords(text: string): string[] {
  // Простая экстракция ключевых слов
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter(word => !['этот', 'который', 'потому', 'через', 'можно', 'нужно', 'должен'].includes(word));
  
  // Убираем дубликаты и берем первые 10
  return [...new Set(words)].slice(0, 10);
}

function createFallbackPrompt(order: OrderData): string {
  const keywords = extractKeywords(order.details);
  
  return `Создай профессиональный текст для услуги "${order.service_name}".

Техническое задание:
${order.details}

${order.additional_requirements ? `Дополнительные требования:
${order.additional_requirements}` : ''}

Ключевые слова для включения: ${keywords.join(', ')}

Требования к тексту:
- Профессиональный стиль
- SEO-оптимизированный
- Целевая аудитория: потенциальные клиенты
- Призыв к действию
- Уникальный контент

Создай качественный, продающий текст объемом 1500-2000 символов.`;
}

async function generateText(prompt: string, serviceSlug: string): Promise<string> {
  const openAIKey = Deno.env.get('OPENAI_API_KEY');
  
  if (!openAIKey) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-2025-04-14',
      messages: [
        {
          role: 'system',
          content: 'Ты профессиональный копирайтер. Создавай качественные, уникальные тексты согласно техническому заданию.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function sendNotification(order: OrderData) {
  try {
    // Создаем уведомление в системе
    await supabase.from('notifications').insert({
      user_id: order.user_id,
      title: 'Текст готов!',
      message: `Ваш заказ "${order.service_name}" выполнен. Текст готов к просмотру.`,
      type: 'success'
    });

    // Отправляем email если настроено
    const { data: settings } = await supabase
      .from('notification_settings')
      .select('email_notifications')
      .eq('user_id', order.user_id)
      .single();

    if (settings?.email_notifications) {
      await supabase.functions.invoke('send-email-notification', {
        body: {
          to: order.contact_email,
          subject: 'Ваш заказ готов!',
          orderData: order
        }
      });
    }

  } catch (error) {
    console.error('Notification error:', error);
    // Не падаем из-за ошибки уведомлений
  }
}