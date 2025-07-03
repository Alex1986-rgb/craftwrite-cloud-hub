import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  order_id: string;
  amount: number;
  currency: string;
  description: string;
  return_url?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { order_id, amount, currency, description, return_url }: PaymentRequest = await req.json();

    console.log('Creating payment for order:', order_id, 'amount:', amount);

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', order_id)
      .single();

    if (orderError || !order) {
      throw new Error('Заказ не найден');
    }

    // Get payment settings
    const { data: settings } = await supabase
      .from('system_settings')
      .select('key, value')
      .in('key', ['default_payment_gateway', 'modulbank_active', 'yookassa_active']);

    const settingsMap = Object.fromEntries(
      settings?.map(s => [s.key, s.value]) || []
    );

    const defaultGateway = settingsMap.default_payment_gateway || 'modulbank';
    
    // Create payment record
    const paymentData = {
      order_id,
      user_id: order.user_id,
      amount,
      currency: currency.toUpperCase(),
      payment_gateway: defaultGateway,
      payment_status: 'pending',
      payment_method: null,
      gateway_payment_id: null,
    };

    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert([paymentData])
      .select()
      .single();

    if (paymentError) {
      throw new Error('Ошибка создания платежа: ' + paymentError.message);
    }

    // For now, create a mock payment URL since we don't have real payment integration
    // In production, this would integrate with actual payment providers
    const baseUrl = req.headers.get('origin') || 'https://copypro.cloud';
    const paymentUrl = `${baseUrl}/payment-mock?payment_id=${payment.id}&amount=${amount}&currency=${currency}&description=${encodeURIComponent(description)}`;

    // Update payment record with payment URL
    await supabase
      .from('payments')
      .update({ 
        payment_url: paymentUrl,
        payment_session_id: `session_${Date.now()}_${payment.id}`
      })
      .eq('id', payment.id);

    // Update order status to payment_pending
    await supabase
      .from('orders')
      .update({ 
        status: 'payment_pending',
        payment_status: 'pending'
      })
      .eq('id', order_id);

    // Create notification for admins
    await supabase.functions.invoke('telegram-order-notifications', {
      body: {
        order_id,
        event_type: 'payment_created',
        message: `🆕 Создан платеж на сумму ${amount/100} ${currency} для заказа #${order_id.slice(0, 8)}`
      }
    });

    console.log('Payment created successfully:', payment.id);

    return new Response(
      JSON.stringify({
        success: true,
        payment_id: payment.id,
        payment_url: paymentUrl,
        amount,
        currency,
        order_id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('Error creating payment:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Ошибка создания платежа'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});