
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
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

    const { orderId, orderData, promptText } = await req.json()

    // Получаем настройки Telegram администратора
    const { data: adminSettings } = await supabaseClient
      .from('admin_telegram_settings')
      .select('chat_id')
      .eq('is_active', true)
      .single()

    if (!adminSettings) {
      throw new Error('Настройки Telegram администратора не найдены')
    }

    // Формируем сообщение для Telegram
    const message = `🆕 <b>Новый заказ #${orderId.slice(-8)}</b>

👤 <b>Клиент:</b> ${orderData.contact_name}
📧 <b>Email:</b> ${orderData.contact_email}
📱 <b>Телефон:</b> ${orderData.contact_phone || 'Не указан'}

🎯 <b>Услуга:</b> ${orderData.service_name}
💰 <b>Бюджет:</b> ${orderData.estimated_price ? (orderData.estimated_price / 100) + '₽' : 'Не указан'}
⏰ <b>Дедлайн:</b> ${orderData.deadline || 'Не указан'}

📝 <b>Описание:</b>
${orderData.details}

${orderData.additional_requirements ? `📋 <b>Дополнительные требования:</b>\n${orderData.additional_requirements}\n` : ''}

🤖 <b>ПРОМПТ ДЛЯ OPENAI:</b>
<code>${promptText}</code>

📊 <b>Действия:</b>
• Написать текст
• Отправить клиенту
• Обновить статус заказа`

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${Deno.env.get('TELEGRAM_BOT_TOKEN')}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: adminSettings.chat_id,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      }
    )

    if (!telegramResponse.ok) {
      const error = await telegramResponse.json()
      throw new Error(`Ошибка отправки в Telegram: ${error.description}`)
    }

    // Обновляем заказ - отмечаем что уведомление отправлено
    await supabaseClient
      .from('orders')
      .update({
        telegram_sent_at: new Date().toISOString(),
        generated_prompt: promptText
      })
      .eq('id', orderId)

    return new Response(
      JSON.stringify({ success: true, message: 'Уведомление отправлено' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Ошибка отправки уведомления:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
