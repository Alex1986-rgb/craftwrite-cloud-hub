
-- Создаём таблицу для аналитики умной формы заказов
CREATE TABLE public.smart_order_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id UUID NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('step_enter', 'step_exit', 'step_complete', 'form_abandon', 'form_submit')),
  step_number INTEGER NOT NULL CHECK (step_number >= 1 AND step_number <= 5),
  step_name TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  time_spent INTEGER NULL, -- в миллисекундах
  form_data JSONB NULL,
  user_agent TEXT NULL,
  url TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Создаём индексы для оптимизации запросов аналитики
CREATE INDEX idx_smart_order_analytics_session ON public.smart_order_analytics(session_id);
CREATE INDEX idx_smart_order_analytics_event_type ON public.smart_order_analytics(event_type);
CREATE INDEX idx_smart_order_analytics_step ON public.smart_order_analytics(step_number);
CREATE INDEX idx_smart_order_analytics_timestamp ON public.smart_order_analytics(timestamp);

-- Настраиваем RLS для аналитики
ALTER TABLE public.smart_order_analytics ENABLE ROW LEVEL SECURITY;

-- Разрешаем всем создавать записи аналитики (для анонимных пользователей)
CREATE POLICY "Anyone can insert analytics data" 
  ON public.smart_order_analytics 
  FOR INSERT 
  WITH CHECK (true);

-- Только админы могут читать аналитику
CREATE POLICY "Only admins can view analytics" 
  ON public.smart_order_analytics 
  FOR SELECT 
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Создаём функцию для получения метрик воронки
CREATE OR REPLACE FUNCTION public.get_funnel_analytics(
  start_date TIMESTAMP WITH TIME ZONE DEFAULT (now() - interval '30 days'),
  end_date TIMESTAMP WITH TIME ZONE DEFAULT now()
)
RETURNS TABLE (
  step_number INTEGER,
  step_name TEXT,
  total_entries INTEGER,
  total_exits INTEGER,
  total_completions INTEGER,
  average_time_spent NUMERIC,
  conversion_rate NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.step_number,
    a.step_name,
    COUNT(CASE WHEN a.event_type = 'step_enter' THEN 1 END)::INTEGER as total_entries,
    COUNT(CASE WHEN a.event_type = 'step_exit' THEN 1 END)::INTEGER as total_exits,
    COUNT(CASE WHEN a.event_type = 'step_complete' THEN 1 END)::INTEGER as total_completions,
    ROUND(AVG(CASE WHEN a.time_spent IS NOT NULL THEN a.time_spent END) / 1000.0, 2) as average_time_spent,
    ROUND(
      (COUNT(CASE WHEN a.event_type = 'step_complete' THEN 1 END)::NUMERIC / 
       NULLIF(COUNT(CASE WHEN a.event_type = 'step_enter' THEN 1 END), 0)) * 100, 
      2
    ) as conversion_rate
  FROM public.smart_order_analytics a
  WHERE a.timestamp BETWEEN start_date AND end_date
  GROUP BY a.step_number, a.step_name
  ORDER BY a.step_number;
END;
$$;
