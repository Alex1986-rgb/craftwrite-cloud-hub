-- Enhanced order management system for landing pages
-- Add order status tracking and workflow management

-- Add order status enum if not exists
DO $$ BEGIN
    CREATE TYPE order_status_type AS ENUM (
        'draft',
        'pending', 
        'payment_pending',
        'payment_confirmed',
        'in_progress',
        'review',
        'revision_requested',
        'completed',
        'cancelled',
        'refunded'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add payment status enum if not exists  
DO $$ BEGIN
    CREATE TYPE payment_status_type AS ENUM (
        'pending',
        'processing', 
        'completed',
        'failed',
        'cancelled',
        'refunded'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Enhanced orders table for landing page projects
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS project_type TEXT DEFAULT 'general',
ADD COLUMN IF NOT EXISTS package_type TEXT, -- 'simple', 'selling', 'premium'
ADD COLUMN IF NOT EXISTS landing_requirements JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS design_preferences JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS content_materials JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS target_audience TEXT,
ADD COLUMN IF NOT EXISTS business_goals TEXT,
ADD COLUMN IF NOT EXISTS timeline_requirements TEXT,
ADD COLUMN IF NOT EXISTS revision_limit INTEGER DEFAULT 3,
ADD COLUMN IF NOT EXISTS current_revisions INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS project_manager_id UUID,
ADD COLUMN IF NOT EXISTS designer_id UUID,
ADD COLUMN IF NOT EXISTS developer_id UUID,
ADD COLUMN IF NOT EXISTS delivery_date DATE,
ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS client_approved BOOLEAN DEFAULT false;

-- Order workflow tracking table
CREATE TABLE IF NOT EXISTS public.order_workflow_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    step_name TEXT NOT NULL,
    step_order INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'skipped'
    assigned_to UUID,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    estimated_duration INTERVAL,
    actual_duration INTERVAL,
    notes TEXT,
    deliverables JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Order comments and communication
CREATE TABLE IF NOT EXISTS public.order_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    author_id UUID NOT NULL,
    author_type TEXT NOT NULL DEFAULT 'admin', -- 'admin', 'client', 'system'
    comment_type TEXT DEFAULT 'general', -- 'general', 'revision', 'approval', 'delivery'
    content TEXT NOT NULL,
    attachments JSONB DEFAULT '[]',
    is_internal BOOLEAN DEFAULT false,
    parent_comment_id UUID REFERENCES public.order_comments(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Landing page packages configuration
CREATE TABLE IF NOT EXISTS public.landing_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_type TEXT UNIQUE NOT NULL, -- 'simple', 'selling', 'premium'
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL, -- in kopecks
    features JSONB NOT NULL DEFAULT '[]',
    included_revisions INTEGER DEFAULT 3,
    delivery_days INTEGER DEFAULT 7,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default landing page packages
INSERT INTO public.landing_packages (package_type, name, description, price, features, included_revisions, delivery_days, sort_order) VALUES
('simple', 'Простой лендинг', 'Базовая одностраничная посадочная страница', 1500000, 
 '["Адаптивный дизайн", "Базовая SEO-оптимизация", "Форма обратной связи", "Подключение к Google Analytics"]'::jsonb, 
 2, 5, 1),
('selling', 'Продающий лендинг', 'Конверсионная посадочная страница с продуманной структурой', 3000000,
 '["Уникальный дизайн", "Продуманная структура продаж", "A/B тестирование элементов", "Интеграция с CRM", "Расширенная аналитика", "SEO-оптимизация"]'::jsonb,
 3, 7, 2),
('premium', 'Премиум лендинг', 'Профессиональная посадочная страница с анимациями и интерактивом', 5000000,
 '["Премиум дизайн с анимациями", "Персональный менеджер проекта", "Копирайтинг и контент-стратегия", "Интеграция с платежными системами", "Мультивариантное тестирование", "Техническая поддержка 3 месяца"]'::jsonb,
 5, 10, 3)
ON CONFLICT (package_type) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    features = EXCLUDED.features,
    updated_at = now();

-- Enhanced payment tracking
ALTER TABLE public.payments
ADD COLUMN IF NOT EXISTS payment_intent_id TEXT,
ADD COLUMN IF NOT EXISTS payment_session_id TEXT,
ADD COLUMN IF NOT EXISTS installment_plan JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS refund_amount INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS refund_reason TEXT,
ADD COLUMN IF NOT EXISTS processing_fee INTEGER DEFAULT 0;

-- Enable RLS
ALTER TABLE public.order_workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_packages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view workflow steps for their orders" ON public.order_workflow_steps
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_workflow_steps.order_id 
        AND (orders.user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role))
    )
);

CREATE POLICY "Admins can manage workflow steps" ON public.order_workflow_steps
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view comments for their orders" ON public.order_comments
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_comments.order_id 
        AND (orders.user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role))
    ) AND (NOT is_internal OR has_role(auth.uid(), 'admin'::app_role))
);

CREATE POLICY "Admins can manage comments" ON public.order_comments
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can add comments to their orders" ON public.order_comments
FOR INSERT WITH CHECK (
    author_id = auth.uid() AND 
    EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_comments.order_id 
        AND orders.user_id = auth.uid()
    )
);

CREATE POLICY "Everyone can view active packages" ON public.landing_packages
FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage packages" ON public.landing_packages
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updating workflow step durations
CREATE OR REPLACE FUNCTION update_workflow_step_duration()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' AND NEW.started_at IS NOT NULL THEN
        NEW.actual_duration = NEW.completed_at - NEW.started_at;
    END IF;
    
    IF NEW.status = 'in_progress' AND OLD.status = 'pending' THEN
        NEW.started_at = now();
    END IF;
    
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_workflow_step_duration ON public.order_workflow_steps;
CREATE TRIGGER trigger_update_workflow_step_duration
    BEFORE UPDATE ON public.order_workflow_steps
    FOR EACH ROW
    EXECUTE FUNCTION update_workflow_step_duration();

-- Function to create default workflow steps for landing page orders
CREATE OR REPLACE FUNCTION create_landing_workflow_steps(order_id UUID, package_type TEXT)
RETURNS VOID AS $$
DECLARE
    step_config JSONB;
BEGIN
    -- Define workflow steps based on package type
    CASE package_type
        WHEN 'simple' THEN
            step_config := '[
                {"name": "Анализ требований", "order": 1, "estimated_hours": 2},
                {"name": "Создание дизайна", "order": 2, "estimated_hours": 8},
                {"name": "Верстка и программирование", "order": 3, "estimated_hours": 12},
                {"name": "Тестирование", "order": 4, "estimated_hours": 4},
                {"name": "Сдача проекта", "order": 5, "estimated_hours": 2}
            ]'::jsonb;
        WHEN 'selling' THEN
            step_config := '[
                {"name": "Анализ ЦА и конкурентов", "order": 1, "estimated_hours": 4},
                {"name": "Стратегия и структура", "order": 2, "estimated_hours": 6},
                {"name": "Дизайн концепция", "order": 3, "estimated_hours": 8},
                {"name": "Создание дизайна", "order": 4, "estimated_hours": 16},
                {"name": "Верстка и интеграции", "order": 5, "estimated_hours": 20},
                {"name": "Настройка аналитики", "order": 6, "estimated_hours": 4},
                {"name": "Тестирование конверсий", "order": 7, "estimated_hours": 6},
                {"name": "Сдача и обучение", "order": 8, "estimated_hours": 4}
            ]'::jsonb;
        WHEN 'premium' THEN
            step_config := '[
                {"name": "Стратегическая сессия", "order": 1, "estimated_hours": 6},
                {"name": "Исследование и аналитика", "order": 2, "estimated_hours": 8},
                {"name": "Контент-стратегия", "order": 3, "estimated_hours": 10},
                {"name": "UX/UI концепция", "order": 4, "estimated_hours": 12},
                {"name": "Дизайн система", "order": 5, "estimated_hours": 16},
                {"name": "Создание дизайна", "order": 6, "estimated_hours": 24},
                {"name": "Анимации и интерактив", "order": 7, "estimated_hours": 16},
                {"name": "Программирование", "order": 8, "estimated_hours": 32},
                {"name": "Интеграции и автоматизация", "order": 9, "estimated_hours": 12},
                {"name": "Тестирование и оптимизация", "order": 10, "estimated_hours": 8},
                {"name": "Запуск и мониторинг", "order": 11, "estimated_hours": 6}
            ]'::jsonb;
        ELSE
            RETURN;
    END CASE;

    -- Insert workflow steps
    INSERT INTO public.order_workflow_steps (order_id, step_name, step_order, estimated_duration)
    SELECT 
        order_id,
        step->>'name',
        (step->>'order')::integer,
        (step->>'estimated_hours')::integer * interval '1 hour'
    FROM jsonb_array_elements(step_config) AS step;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create workflow steps for new landing page orders  
CREATE OR REPLACE FUNCTION handle_new_landing_order()
RETURNS TRIGGER AS $$
BEGIN
    -- Only create workflow for landing page orders
    IF NEW.service_slug = 'landing-page' AND NEW.package_type IS NOT NULL THEN
        PERFORM create_landing_workflow_steps(NEW.id, NEW.package_type);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_create_landing_workflow ON public.orders;
CREATE TRIGGER trigger_create_landing_workflow
    AFTER INSERT ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_landing_order();