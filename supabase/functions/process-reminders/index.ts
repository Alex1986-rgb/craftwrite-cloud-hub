
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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing reminders...');

    // Получаем просроченные напоминания
    const { data: reminders, error } = await supabase
      .from('notification_reminders')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString())
      .limit(50);

    if (error) {
      throw new Error(`Failed to get reminders: ${error.message}`);
    }

    if (!reminders || reminders.length === 0) {
      return new Response(JSON.stringify({ message: 'No reminders to process' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    console.log(`Processing ${reminders.length} reminders`);

    const processed = [];

    for (const reminder of reminders) {
      try {
        let notificationSent = false;

        // Определяем тип уведомления и отправляем соответствующее
        switch (reminder.reminder_type) {
          case 'form_abandoned':
            // Отправляем email-напоминание о незавершенной форме
            if (reminder.user_id) {
              await supabase.functions.invoke('send-email-notification', {
                body: {
                  to: reminder.metadata.email || '',
                  templateType: 'form_abandoned',
                  variables: {
                    service_name: reminder.metadata.service_name || 'услуга',
                    progress_percent: reminder.metadata.progress_percent || 50,
                    contact_name: reminder.metadata.contact_name || 'Клиент'
                  },
                  userId: reminder.user_id
                }
              });
              notificationSent = true;
            }
            break;

          case 'order_pending':
            // Напоминание о неоплаченном заказе
            if (reminder.user_id) {
              await supabase.functions.invoke('send-email-notification', {
                body: {
                  to: reminder.metadata.email || '',
                  templateType: 'reminder',
                  variables: {
                    order_id: reminder.metadata.order_id || '',
                    service_name: reminder.metadata.service_name || '',
                    contact_name: reminder.metadata.contact_name || 'Клиент'
                  },
                  userId: reminder.user_id,
                  orderId: reminder.metadata.order_id
                }
              });
              notificationSent = true;
            }
            break;

          case 'payment_pending':
            // Напоминание об оплате
            if (reminder.user_id) {
              await supabase.functions.invoke('send-push-notification', {
                body: {
                  userId: reminder.user_id,
                  title: 'Напоминание об оплате',
                  body: `Заказ №${reminder.metadata.order_id} ожидает оплаты`,
                  url: '/client/orders'
                }
              });
              notificationSent = true;
            }
            break;
        }

        // Обновляем статус напоминания
        if (notificationSent) {
          await supabase
            .from('notification_reminders')
            .update({
              status: 'sent',
              sent_at: new Date().toISOString()
            })
            .eq('id', reminder.id);

          processed.push({ id: reminder.id, status: 'sent' });
        } else {
          processed.push({ id: reminder.id, status: 'failed', error: 'No valid recipient' });
        }

      } catch (reminderError) {
        console.error(`Error processing reminder ${reminder.id}:`, reminderError);
        processed.push({ id: reminder.id, status: 'failed', error: reminderError.message });
      }
    }

    console.log(`Processed ${processed.length} reminders`);

    return new Response(JSON.stringify({ processed }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error processing reminders:', error);
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
