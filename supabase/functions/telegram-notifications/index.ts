
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TelegramMessage {
  user_id: string;
  message: string;
  type?: 'order_created' | 'order_updated' | 'payment_success' | 'payment_failed';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const telegramBotToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    
    if (!telegramBotToken) {
      console.log('Telegram bot token not configured');
      return new Response(
        JSON.stringify({ error: 'Telegram bot not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { user_id, message, type }: TelegramMessage = await req.json();

    console.log('Sending Telegram notification to user:', user_id);

    // Получаем настройки Telegram для пользователя
    const { data: telegramSettings, error: settingsError } = await supabase
      .from('telegram_integrations')
      .select('chat_id, is_active')
      .eq('user_id', user_id)
      .eq('is_active', true)
      .single();

    if (settingsError || !telegramSettings) {
      console.log('No active Telegram integration found for user:', user_id);
      return new Response(
        JSON.stringify({ error: 'No Telegram integration found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }

    // Проверяем настройки уведомлений
    const { data: notificationSettings } = await supabase
      .from('notification_settings')
      .select('telegram_notifications')
      .eq('user_id', user_id)
      .single();

    if (!notificationSettings?.telegram_notifications) {
      console.log('Telegram notifications disabled for user:', user_id);
      return new Response(
        JSON.stringify({ message: 'Telegram notifications disabled' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Отправляем сообщение через Telegram Bot API
    const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramSettings.chat_id,
        text: message,
        parse_mode: 'HTML'
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      throw new Error(`Telegram API error: ${errorData.description}`);
    }

    // Логируем отправку уведомления
    await supabase.from('activity_logs').insert({
      user_id,
      action: 'telegram_notification_sent',
      entity_type: 'notification',
      details: {
        type,
        chat_id: telegramSettings.chat_id,
        message_length: message.length
      }
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Telegram notification sent successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in telegram-notifications:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send Telegram notification',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
