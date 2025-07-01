
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

interface EmailRequest {
  to: string;
  templateType: 'order_created' | 'order_status_changed' | 'order_completed' | 'form_abandoned' | 'reminder';
  variables: Record<string, any>;
  orderId?: string;
  userId?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, templateType, variables, orderId, userId }: EmailRequest = await req.json();

    console.log('Sending email notification:', { to, templateType, variables });

    // Получаем шаблон из базы данных
    const { data: template, error: templateError } = await supabase
      .from('notification_templates')
      .select('*')
      .eq('type', 'email')
      .eq('event_type', templateType)
      .eq('is_active', true)
      .single();

    if (templateError || !template) {
      throw new Error(`Template not found: ${templateType}`);
    }

    // Заменяем переменные в шаблоне
    let subject = template.subject_template || 'CopyPro Cloud - Уведомление';
    let content = template.content_template;

    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      subject = subject.replace(new RegExp(placeholder, 'g'), String(value));
      content = content.replace(new RegExp(placeholder, 'g'), String(value));
    });

    // Создаем HTML-шаблон с брендингом
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
    .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 14px; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 15px 0; }
    .status { padding: 10px 15px; border-radius: 6px; margin: 15px 0; }
    .status.success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
    .status.info { background: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
    .status.warning { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CopyPro Cloud</h1>
      <p>Профессиональные тексты для вашего бизнеса</p>
    </div>
    <div class="content">
      ${content}
      ${orderId ? `<p><strong>Номер заказа:</strong> ${orderId}</p>` : ''}
      <a href="https://copyprocloud.ru/client/orders" class="button">Перейти в личный кабинет</a>
    </div>
    <div class="footer">
      <p>© 2024 CopyPro Cloud. Все права защищены.</p>
      <p>Если у вас есть вопросы, напишите нам: <a href="mailto:support@copyprocloud.ru">support@copyprocloud.ru</a></p>
    </div>
  </div>
</body>
</html>`;

    // Отправляем email
    const emailResponse = await resend.emails.send({
      from: 'CopyPro Cloud <noreply@copyprocloud.ru>',
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    console.log('Email sent successfully:', emailResponse);

    // Создаем уведомление в базе данных
    if (userId) {
      const { data: notification } = await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          title: subject,
          message: content.replace(/<[^>]*>/g, ''), // Убираем HTML теги
          type: 'email'
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
            metadata: { 
              email_id: emailResponse.data?.id,
              template_type: templateType 
            }
          });
      }
    }

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
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
