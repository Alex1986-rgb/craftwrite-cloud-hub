
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ModulBankPaymentRequest {
  orderId: string
  amount: number
  description: string
  customerEmail?: string
  customerPhone?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    if (req.method === 'POST') {
      const { orderId, amount, description, customerEmail, customerPhone } = await req.json() as ModulBankPaymentRequest

      // Получаем настройки ModulBank
      const { data: settings } = await supabaseClient
        .from('system_settings')
        .select('key, value')
        .in('key', ['modulbank_merchant_id', 'modulbank_secret_key', 'modulbank_test_mode'])

      const settingsMap = settings?.reduce((acc, setting) => {
        acc[setting.key] = JSON.parse(setting.value)
        return acc
      }, {} as Record<string, any>) || {}

      const merchantId = settingsMap.modulbank_merchant_id
      const secretKey = settingsMap.modulbank_secret_key
      const testMode = settingsMap.modulbank_test_mode

      if (!merchantId || !secretKey) {
        throw new Error('ModulBank настройки не настроены')
      }

      // Создаем уникальный ID платежа
      const paymentId = `${orderId}_${Date.now()}`
      
      // Формируем данные для ModulBank
      const paymentData = {
        merchant: merchantId,
        order_id: paymentId,
        amount: amount / 100, // ModulBank принимает рубли, у нас копейки
        description: description,
        success_url: `${req.headers.get('origin')}/payment/success`,
        fail_url: `${req.headers.get('origin')}/payment/failed`,
        callback_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/modulbank-callback`,
        test_mode: testMode ? 1 : 0,
        ...(customerEmail && { client_email: customerEmail }),
        ...(customerPhone && { client_phone: customerPhone })
      }

      // Генерируем подпись
      const signString = Object.keys(paymentData)
        .sort()
        .map(key => `${key}=${paymentData[key]}`)
        .join('&') + secretKey

      const encoder = new TextEncoder()
      const data = encoder.encode(signString)
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

      paymentData.signature = signature

      // Создаем запись о платеже
      const { data: payment, error: paymentError } = await supabaseClient
        .from('payments')
        .insert({
          order_id: orderId,
          amount: amount,
          payment_gateway: 'modulbank',
          modulbank_payment_id: paymentId,
          payment_status: 'pending'
        })
        .select()
        .single()

      if (paymentError) {
        throw new Error(`Ошибка создания платежа: ${paymentError.message}`)
      }

      // Формируем URL для редиректа на ModulBank
      const baseUrl = testMode 
        ? 'https://pay.modulbank.ru/pay'
        : 'https://pay.modulbank.ru/pay'

      const params = new URLSearchParams(paymentData as any)
      const paymentUrl = `${baseUrl}?${params.toString()}`

      // Обновляем платеж с URL
      await supabaseClient
        .from('payments')
        .update({ payment_url: paymentUrl })
        .eq('id', payment.id)

      return new Response(
        JSON.stringify({ 
          success: true, 
          payment_url: paymentUrl,
          payment_id: payment.id
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    return new Response('Method not allowed', { status: 405, headers: corsHeaders })

  } catch (error) {
    console.error('ModulBank payment error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
