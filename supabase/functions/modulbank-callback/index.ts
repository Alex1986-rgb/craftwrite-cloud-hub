
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const formData = await req.formData()
    const callbackData: Record<string, string> = {}
    
    for (const [key, value] of formData.entries()) {
      callbackData[key] = value.toString()
    }

    console.log('ModulBank callback received:', callbackData)

    // Получаем secret key для проверки подписи
    const { data: settings } = await supabaseClient
      .from('system_settings')
      .select('value')
      .eq('key', 'modulbank_secret_key')
      .single()

    if (!settings?.value) {
      throw new Error('ModulBank secret key not found')
    }

    const secretKey = JSON.parse(settings.value)

    // Проверяем подпись
    const { signature, ...dataForSign } = callbackData
    const signString = Object.keys(dataForSign)
      .sort()
      .map(key => `${key}=${dataForSign[key]}`)
      .join('&') + secretKey

    const encoder = new TextEncoder()
    const data = encoder.encode(signString)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const expectedSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    if (signature !== expectedSignature) {
      console.error('Invalid signature')
      return new Response('Invalid signature', { status: 400 })
    }

    // Обновляем статус платежа
    const paymentStatus = callbackData.state === 'COMPLETE' ? 'completed' : 'failed'
    
    const { error: updateError } = await supabaseClient
      .from('payments')
      .update({
        payment_status: paymentStatus,
        callback_data: callbackData,
        completed_at: paymentStatus === 'completed' ? new Date().toISOString() : null
      })
      .eq('modulbank_payment_id', callbackData.order_id)

    if (updateError) {
      console.error('Error updating payment:', updateError)
      return new Response('Error updating payment', { status: 500 })
    }

    // Если платеж успешен, обновляем статус заказа
    if (paymentStatus === 'completed') {
      const { data: payment } = await supabaseClient
        .from('payments')
        .select('order_id')
        .eq('modulbank_payment_id', callbackData.order_id)
        .single()

      if (payment?.order_id) {
        await supabaseClient
          .from('orders')
          .update({ payment_status: 'paid' })
          .eq('id', payment.order_id)
      }
    }

    return new Response('OK', { status: 200 })

  } catch (error) {
    console.error('ModulBank callback error:', error)
    return new Response('Internal server error', { status: 500 })
  }
})
