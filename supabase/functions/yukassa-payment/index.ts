
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
  order_id: string;
  user_email: string;
  return_url: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const yukassaShopId = Deno.env.get('YUKASSA_SHOP_ID');
    const yukassaSecretKey = Deno.env.get('YUKASSA_SECRET_KEY');
    
    if (!yukassaShopId || !yukassaSecretKey) {
      throw new Error('YuKassa credentials not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    if (req.method === 'POST') {
      // Создание платежа
      const { amount, currency, description, order_id, user_email, return_url }: PaymentRequest = await req.json();

      console.log('Creating YuKassa payment for order:', order_id);

      // Создаем платеж через YuKassa API
      const idempotenceKey = crypto.randomUUID();
      
      const yukassaResponse = await fetch('https://api.yookassa.ru/v3/payments', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${yukassaShopId}:${yukassaSecretKey}`)}`,
          'Content-Type': 'application/json',
          'Idempotence-Key': idempotenceKey,
        },
        body: JSON.stringify({
          amount: {
            value: amount.toFixed(2),
            currency: currency
          },
          payment_method_data: {
            type: "bank_card"
          },
          confirmation: {
            type: "redirect",
            return_url: return_url
          },
          description: description,
          metadata: {
            order_id: order_id
          },
          receipt: {
            customer: {
              email: user_email
            },
            items: [{
              description: description,
              quantity: "1.00",
              amount: {
                value: amount.toFixed(2),
                currency: currency
              },
              vat_code: 1
            }]
          }
        }),
      });

      if (!yukassaResponse.ok) {
        const errorData = await yukassaResponse.json();
        throw new Error(`YuKassa API error: ${errorData.description || yukassaResponse.statusText}`);
      }

      const paymentData = await yukassaResponse.json();

      // Логируем создание платежа
      await supabase.from('activity_logs').insert({
        action: 'yukassa_payment_created',
        entity_type: 'payment',
        entity_id: order_id,
        details: {
          payment_id: paymentData.id,
          amount,
          currency,
          status: paymentData.status
        }
      });

      return new Response(
        JSON.stringify({
          payment_id: paymentData.id,
          confirmation_url: paymentData.confirmation.confirmation_url,
          status: paymentData.status
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );

    } else if (req.method === 'PUT') {
      // Webhook для обработки статусов платежа
      const paymentData = await req.json();
      
      console.log('YuKassa webhook received:', paymentData.type);

      if (paymentData.type === 'payment.succeeded') {
        const payment = paymentData.object;
        const orderId = payment.metadata?.order_id;

        if (orderId) {
          // Обновляем статус заказа
          await supabase
            .from('orders')
            .update({ 
              status: 'paid',
              final_price: Math.round(parseFloat(payment.amount.value) * 100)
            })
            .eq('id', orderId);

          // Создаем уведомление для пользователя
          const { data: order } = await supabase
            .from('orders')
            .select('user_id')
            .eq('id', orderId)
            .single();

          if (order?.user_id) {
            await supabase.rpc('create_notification', {
              p_user_id: order.user_id,
              p_title: 'Платеж успешно обработан',
              p_message: `Платеж по заказу #${orderId} успешно обработан. Мы приступаем к выполнению вашего заказа.`,
              p_type: 'success'
            });

            // Отправляем Telegram уведомление
            try {
              await fetch(`${supabaseUrl}/functions/v1/telegram-notifications`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${supabaseKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  user_id: order.user_id,
                  message: `💰 <b>Платеж успешно обработан</b>\n\nЗаказ: #${orderId}\nСумма: ${payment.amount.value} ${payment.amount.currency}\n\nМы приступаем к выполнению вашего заказа!`,
                  type: 'payment_success'
                }),
              });
            } catch (telegramError) {
              console.error('Failed to send Telegram notification:', telegramError);
            }
          }
        }
      }

      return new Response(
        JSON.stringify({ received: true }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

  } catch (error) {
    console.error('Error in yukassa-payment:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Payment processing failed',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
