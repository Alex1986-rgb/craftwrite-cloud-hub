
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

interface PushRequest {
  userId?: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  url?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, title, body, data, url }: PushRequest = await req.json();

    console.log('Sending push notification:', { userId, title, body });

    // Получаем подписки пользователя
    const { data: subscriptions, error } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error) {
      throw new Error(`Failed to get subscriptions: ${error.message}`);
    }

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(JSON.stringify({ message: 'No active subscriptions found' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const payload = JSON.stringify({
      title,
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      data: {
        url: url || '/',
        ...data
      }
    });

    const results = [];
    
    // Отправляем push-уведомления
    for (const subscription of subscriptions) {
      try {
        const pushResponse = await fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: {
            'Authorization': `key=${Deno.env.get('FCM_SERVER_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: subscription.endpoint.split('/').pop(),
            notification: {
              title,
              body,
              icon: '/favicon.ico',
            },
            data: data || {}
          }),
        });

        if (pushResponse.ok) {
          results.push({ success: true, subscription: subscription.id });
        } else {
          results.push({ success: false, subscription: subscription.id, error: await pushResponse.text() });
        }
      } catch (pushError) {
        console.error('Push notification error:', pushError);
        results.push({ success: false, subscription: subscription.id, error: pushError.message });
      }
    }

    // Создаем уведомление в базе данных
    if (userId) {
      const { data: notification } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          title,
          message: body,
          type: 'push'
        })
        .select('id')
        .single();

      // Записываем аналитику
      if (notification) {
        await supabase
          .from('notification_analytics')
          .insert({
            notification_id: notification.id,
            event_type: 'sent',
            metadata: { results }
          });
      }
    }

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error sending push notification:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
