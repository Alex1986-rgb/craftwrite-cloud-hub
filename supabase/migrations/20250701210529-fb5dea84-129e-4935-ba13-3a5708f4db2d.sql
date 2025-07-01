
-- Create analytics tables for advanced business intelligence

-- Table for storing detailed conversion funnel analytics
CREATE TABLE public.conversion_funnel_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users,
  step_name TEXT NOT NULL,
  step_number INTEGER NOT NULL,
  entered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  exited_at TIMESTAMP WITH TIME ZONE,
  completed BOOLEAN DEFAULT false,
  conversion_rate DECIMAL(5,2),
  time_spent INTEGER, -- in milliseconds
  device_type TEXT,
  traffic_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for financial analytics and KPIs
CREATE TABLE public.financial_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  revenue DECIMAL(12,2) NOT NULL DEFAULT 0,
  orders_count INTEGER NOT NULL DEFAULT 0,
  avg_order_value DECIMAL(10,2) NOT NULL DEFAULT 0,
  conversion_rate DECIMAL(5,2) NOT NULL DEFAULT 0,
  customer_acquisition_cost DECIMAL(10,2) DEFAULT 0,
  lifetime_value DECIMAL(12,2) DEFAULT 0,
  margin_percentage DECIMAL(5,2) DEFAULT 0,
  refund_rate DECIMAL(5,2) DEFAULT 0,
  service_slug TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for customer lifetime value tracking
CREATE TABLE public.customer_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  first_order_date DATE,
  last_order_date DATE,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(12,2) DEFAULT 0,
  avg_order_value DECIMAL(10,2) DEFAULT 0,
  lifetime_value DECIMAL(12,2) DEFAULT 0,
  satisfaction_score DECIMAL(3,2), -- 1.00 to 5.00
  churn_probability DECIMAL(5,2), -- 0.00 to 100.00
  segment TEXT, -- 'high_value', 'regular', 'at_risk', etc.
  last_calculated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for service performance analytics
CREATE TABLE public.service_performance_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_slug TEXT NOT NULL,
  date DATE NOT NULL,
  orders_count INTEGER DEFAULT 0,
  completed_orders INTEGER DEFAULT 0,
  avg_completion_time INTERVAL,
  avg_quality_rating DECIMAL(3,2),
  revenue DECIMAL(12,2) DEFAULT 0,
  margin DECIMAL(12,2) DEFAULT 0,
  client_satisfaction DECIMAL(3,2),
  repeat_rate DECIMAL(5,2), -- % of repeat customers
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(service_slug, date)
);

-- Table for real-time KPI tracking
CREATE TABLE public.realtime_kpis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kpi_name TEXT NOT NULL,
  kpi_value DECIMAL(15,4) NOT NULL,
  kpi_target DECIMAL(15,4),
  unit TEXT, -- 'currency', 'percentage', 'count', etc.
  category TEXT, -- 'financial', 'operational', 'satisfaction', etc.
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(kpi_name)
);

-- Table for custom reports configuration
CREATE TABLE public.custom_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  report_name TEXT NOT NULL,
  report_config JSONB NOT NULL,
  report_type TEXT NOT NULL, -- 'chart', 'table', 'dashboard'
  schedule JSONB, -- cron-like schedule for automated reports
  last_generated_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all analytics tables
ALTER TABLE public.conversion_funnel_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_performance_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.realtime_kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversion funnel analytics
CREATE POLICY "System can manage conversion analytics" ON public.conversion_funnel_analytics FOR ALL USING (true);
CREATE POLICY "Admins can view all conversion analytics" ON public.conversion_funnel_analytics FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for financial analytics
CREATE POLICY "Admins can manage financial analytics" ON public.financial_analytics FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for customer analytics
CREATE POLICY "Admins can manage customer analytics" ON public.customer_analytics FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can view their own analytics" ON public.customer_analytics FOR SELECT USING (user_id = auth.uid());

-- RLS Policies for service performance
CREATE POLICY "Admins can manage service analytics" ON public.service_performance_analytics FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for realtime KPIs
CREATE POLICY "Admins can manage KPIs" ON public.realtime_kpis FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for custom reports
CREATE POLICY "Users can manage their own reports" ON public.custom_reports FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Admins can view all reports" ON public.custom_reports FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for better performance
CREATE INDEX idx_conversion_funnel_session ON public.conversion_funnel_analytics(session_id);
CREATE INDEX idx_conversion_funnel_date ON public.conversion_funnel_analytics(entered_at);
CREATE INDEX idx_financial_analytics_date ON public.financial_analytics(date);
CREATE INDEX idx_customer_analytics_user ON public.customer_analytics(user_id);
CREATE INDEX idx_service_performance_date ON public.service_performance_analytics(date, service_slug);
CREATE INDEX idx_realtime_kpis_name ON public.realtime_kpis(kpi_name);

-- Function to update customer analytics
CREATE OR REPLACE FUNCTION public.update_customer_analytics()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update customer analytics when orders are completed
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    INSERT INTO public.customer_analytics (user_id, first_order_date, last_order_date, total_orders, total_spent)
    VALUES (
      NEW.user_id,
      NEW.created_at::date,
      NEW.created_at::date,
      1,
      COALESCE(NEW.final_price, NEW.estimated_price, 0)
    )
    ON CONFLICT (user_id) DO UPDATE SET
      last_order_date = NEW.created_at::date,
      total_orders = customer_analytics.total_orders + 1,
      total_spent = customer_analytics.total_spent + COALESCE(NEW.final_price, NEW.estimated_price, 0),
      avg_order_value = (customer_analytics.total_spent + COALESCE(NEW.final_price, NEW.estimated_price, 0)) / (customer_analytics.total_orders + 1),
      last_calculated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$;

-- Function to calculate and update KPIs
CREATE OR REPLACE FUNCTION public.update_realtime_kpis()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update daily revenue
  INSERT INTO public.realtime_kpis (kpi_name, kpi_value, unit, category)
  SELECT 
    'daily_revenue',
    COALESCE(SUM(amount), 0) / 100.0,
    'currency',
    'financial'
  FROM public.payments 
  WHERE payment_status = 'completed' 
    AND created_at::date = CURRENT_DATE
  ON CONFLICT (kpi_name) DO UPDATE SET
    kpi_value = EXCLUDED.kpi_value,
    updated_at = now();

  -- Update conversion rate
  INSERT INTO public.realtime_kpis (kpi_name, kpi_value, unit, category)
  SELECT 
    'conversion_rate',
    CASE 
      WHEN COUNT(*) > 0 THEN (COUNT(*) FILTER (WHERE status = 'completed')::numeric / COUNT(*)) * 100
      ELSE 0
    END,
    'percentage',
    'operational'
  FROM public.orders 
  WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
  ON CONFLICT (kpi_name) DO UPDATE SET
    kpi_value = EXCLUDED.kpi_value,
    updated_at = now();

  -- Update average order value
  INSERT INTO public.realtime_kpis (kpi_name, kpi_value, unit, category)
  SELECT 
    'avg_order_value',
    COALESCE(AVG(amount), 0) / 100.0,
    'currency',
    'financial'
  FROM public.payments 
  WHERE payment_status = 'completed' 
    AND created_at >= CURRENT_DATE - INTERVAL '30 days'
  ON CONFLICT (kpi_name) DO UPDATE SET
    kpi_value = EXCLUDED.kpi_value,
    updated_at = now();
END;
$$;
