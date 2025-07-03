import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// Enhanced logging for debugging
function logInfo(message: string, data?: any) {
  console.log(`[INFO] ${new Date().toISOString()}: ${message}`, data || '');
}

function logError(message: string, error?: any) {
  console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error || '');
}

function logDebug(message: string, data?: any) {
  console.log(`[DEBUG] ${new Date().toISOString()}: ${message}`, data || '');
}

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
  user_id?: string;
  status: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { order_id } = await req.json();
    
    logInfo(`Starting workflow for order: ${order_id}`);
    
    // Validate input
    if (!order_id) {
      logError('No order_id provided in request');
      throw new Error('Order ID is required');
    }

    // 1. Получаем данные заказа
    logDebug('Fetching order data', { order_id });
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', order_id)
      .single();

    if (orderError || !order) {
      logError('Failed to fetch order', { order_id, error: orderError });
      throw new Error(`Order not found: ${orderError?.message}`);
    }

    logInfo('Order data fetched successfully', { 
      order_id, 
      service: order.service_slug, 
      status: order.status 
    });

    // 2. Генерируем промпт
    logDebug('Generating prompt for order', { order_id, service: order.service_slug });
    const prompt = await generatePrompt(order);
    logInfo('Prompt generated successfully', { order_id, prompt_length: prompt.length });
    
    // 3. Обновляем заказ с промптом
    logDebug('Updating order with prompt', { order_id });
    const { error: updateError } = await supabase
      .from('orders')
      .update({ 
        generated_prompt: prompt,
        status: 'processing'
      })
      .eq('id', order_id);
      
    if (updateError) {
      logError('Failed to update order with prompt', { order_id, error: updateError });
      throw new Error(`Failed to update order: ${updateError.message}`);
    }

    // 4. Генерируем текст
    logDebug('Generating text with AI', { order_id, service: order.service_slug });
    const generatedText = await generateText(prompt, order.service_slug);
    logInfo('Text generated successfully', { order_id, text_length: generatedText.length });
    
    // 5. Сохраняем результат
    logDebug('Saving generated content', { order_id });
    const { error: contentError } = await supabase
      .from('generated_content_versions')
      .insert({
        order_id: order_id,
        content: generatedText,
        content_type: order.service_slug,
        prompt_used: prompt,
        ai_model: 'gpt-4o-mini',
        created_by: order.user_id
      });

    if (contentError) {
      logError('Failed to save generated content', { order_id, error: contentError });
      throw new Error(`Failed to save content: ${contentError.message}`);
    }
    
    logInfo('Content saved successfully', { order_id });

    // 6. Обновляем статус заказа
    logDebug('Updating order status to completed', { order_id });
    const { error: statusError } = await supabase
      .from('orders')
      .update({ 
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('id', order_id);
      
    if (statusError) {
      logError('Failed to update order status', { order_id, error: statusError });
      throw new Error(`Failed to update order status: ${statusError.message}`);
    }

    // 7. Отправляем уведомление
    logDebug('Sending notification', { order_id });
    await sendNotification(order);

    logInfo(`Workflow completed successfully for order: ${order_id}`);

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
    // Дополнительное логирование в БД для мониторинга
    try {
      const order_id_from_body = await req.clone().json().then(data => data?.order_id).catch(() => 'unknown');
      await supabase.from('system_diagnostics').insert({
        check_type: 'edge_function',
        check_name: 'process_order_workflow_error',
        status: 'fail',
        details: {
          order_id: order_id_from_body,
          error_message: error.message,
          timestamp: new Date().toISOString()
        },
        error_message: `Edge Function Error: ${error.message}`
      });
    } catch (dbError) {
      logError('Failed to log error to database', dbError);
    }

    logError('Workflow failed', { 
      error: error.message, 
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

async function generatePrompt(order: OrderData): Promise<string> {
  logDebug('Fetching prompt template', { service_type: order.service_slug });
  
  // Получаем шаблон промпта для услуги
  const { data: template, error: templateError } = await supabase
    .from('prompt_templates')
    .select('*')
    .eq('service_type', order.service_slug)
    .eq('is_active', true)
    .single();

  if (templateError || !template) {
    logError('Template not found, using fallback', { 
      service_type: order.service_slug, 
      error: templateError 
    });
    return createFallbackPrompt(order);
  }
  
  logDebug('Template found', { template_name: template.template_name });

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
    logError('OpenAI API key not configured');
    throw new Error('OpenAI API key not configured');
  }
  
  logDebug('Making request to OpenAI API', { 
    service: serviceSlug, 
    prompt_length: prompt.length 
  });

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
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
    const errorText = await response.text();
    logError('OpenAI API error', { 
      status: response.status, 
      error: errorText 
    });
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const generatedContent = data.choices[0].message.content;
  
  logDebug('OpenAI response received', { 
    content_length: generatedContent.length,
    tokens_used: data.usage?.total_tokens 
  });
  
  return generatedContent;
}

async function sendNotification(order: OrderData) {
  try {
    logDebug('Creating system notification', { order_id: order.id });
    
    // Создаем уведомление в системе только если есть user_id
    if (order.user_id) {
      const { error: notificationError } = await supabase.from('notifications').insert({
        user_id: order.user_id,
        title: 'Текст готов!',
        message: `Ваш заказ "${order.service_name}" выполнен. Текст готов к просмотру.`,
        type: 'success'
      });
      
      if (notificationError) {
        logError('Failed to create notification', { error: notificationError });
      } else {
        logInfo('System notification created successfully', { order_id: order.id });
      }
    }

    // Отправляем email если настроено
    const { data: settings } = await supabase
      .from('notification_settings')
      .select('email_notifications')
      .eq('user_id', order.user_id)
      .single();

    if (settings?.email_notifications || !order.user_id) {
      logDebug('Sending email notification', { email: order.contact_email });
      try {
        await supabase.functions.invoke('send-email-notification', {
          body: {
            to: order.contact_email,
            subject: 'Ваш заказ готов!',
            orderData: order
          }
        });
        logInfo('Email notification sent successfully');
      } catch (emailError) {
        logError('Failed to send email notification', { error: emailError });
      }
    }

  } catch (error) {
    logError('Notification error', { error });
    // Не падаем из-за ошибки уведомлений
  }
}