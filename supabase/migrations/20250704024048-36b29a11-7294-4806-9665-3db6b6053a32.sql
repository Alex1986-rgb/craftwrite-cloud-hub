-- Создание системы персонального AI-менеджера
-- 1. Таблица для AI-персон и их специализаций
CREATE TABLE public.ai_personas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL, -- 'personal_manager', 'copywriter', 'seo_expert', 'marketer'
  avatar_url TEXT,
  description TEXT NOT NULL,
  expertise_areas JSONB NOT NULL DEFAULT '[]'::jsonb,
  personality_traits JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Таблица для персональных диалогов с AI-менеджером
CREATE TABLE public.ai_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  persona_id UUID REFERENCES public.ai_personas(id) ON DELETE SET NULL,
  conversation_type TEXT NOT NULL DEFAULT 'general', -- 'general', 'project_planning', 'order_consultation', 'task_management'
  title TEXT,
  context JSONB NOT NULL DEFAULT '{}'::jsonb, -- Контекст разговора, данные пользователя
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_message_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Таблица для сообщений в диалогах
CREATE TABLE public.ai_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.ai_conversations(id) ON DELETE CASCADE NOT NULL,
  sender_type TEXT NOT NULL, -- 'user', 'ai'
  content TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text', -- 'text', 'task', 'recommendation', 'reminder'
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb, -- Дополнительные данные: эмоции, теги, приоритет
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Таблица для задач от персонального менеджера
CREATE TABLE public.ai_manager_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID REFERENCES public.ai_conversations(id) ON DELETE SET NULL,
  task_title TEXT NOT NULL,
  task_description TEXT,
  task_type TEXT NOT NULL DEFAULT 'general', -- 'order_followup', 'content_review', 'strategy_discussion', 'general'
  priority INTEGER NOT NULL DEFAULT 1, -- 1-5, где 5 - критический
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'cancelled'
  due_date TIMESTAMP WITH TIME ZONE,
  related_order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  assigned_by_persona_id UUID REFERENCES public.ai_personas(id) ON DELETE SET NULL,
  completion_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 5. Таблица для персональных рекомендаций
CREATE TABLE public.ai_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  persona_id UUID REFERENCES public.ai_personas(id) ON DELETE SET NULL,
  recommendation_type TEXT NOT NULL, -- 'service_upgrade', 'content_strategy', 'workflow_optimization', 'cost_saving'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  action_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  priority_score INTEGER NOT NULL DEFAULT 1, -- 1-10
  estimated_impact TEXT, -- 'high', 'medium', 'low'
  implementation_effort TEXT, -- 'easy', 'moderate', 'complex'
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'implemented', 'dismissed', 'expired'
  related_data JSONB NOT NULL DEFAULT '{}'::jsonb, -- Связанные заказы, метрики и т.д.
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. Таблица для отслеживания прогресса пользователя
CREATE TABLE public.user_progress_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  total_orders INTEGER NOT NULL DEFAULT 0,
  completed_orders INTEGER NOT NULL DEFAULT 0,
  total_spent NUMERIC NOT NULL DEFAULT 0,
  avg_order_value NUMERIC NOT NULL DEFAULT 0,
  satisfaction_score NUMERIC, -- 1-5 на основе отзывов
  engagement_score INTEGER NOT NULL DEFAULT 0, -- Рассчитывается на основе активности
  preferred_services JSONB NOT NULL DEFAULT '[]'::jsonb,
  communication_style TEXT, -- 'formal', 'casual', 'professional'
  goals JSONB NOT NULL DEFAULT '[]'::jsonb, -- Цели пользователя
  challenges JSONB NOT NULL DEFAULT '[]'::jsonb, -- Выявленные проблемы
  last_interaction_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Включаем RLS для всех таблиц
ALTER TABLE public.ai_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_manager_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress_tracking ENABLE ROW LEVEL SECURITY;

-- RLS политики для ai_personas
CREATE POLICY "Everyone can view active AI personas" 
ON public.ai_personas FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage AI personas" 
ON public.ai_personas FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS политики для ai_conversations
CREATE POLICY "Users can view their own conversations" 
ON public.ai_conversations FOR SELECT 
USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can create their own conversations" 
ON public.ai_conversations FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own conversations" 
ON public.ai_conversations FOR UPDATE 
USING (user_id = auth.uid());

-- RLS политики для ai_messages
CREATE POLICY "Users can view messages in their conversations" 
ON public.ai_messages FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.ai_conversations 
  WHERE ai_conversations.id = ai_messages.conversation_id 
  AND (ai_conversations.user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role))
));

CREATE POLICY "Users can create messages in their conversations" 
ON public.ai_messages FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.ai_conversations 
  WHERE ai_conversations.id = ai_messages.conversation_id 
  AND ai_conversations.user_id = auth.uid()
));

CREATE POLICY "Users can update their own messages" 
ON public.ai_messages FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.ai_conversations 
  WHERE ai_conversations.id = ai_messages.conversation_id 
  AND ai_conversations.user_id = auth.uid()
));

-- RLS политики для ai_manager_tasks
CREATE POLICY "Users can view their own tasks" 
ON public.ai_manager_tasks FOR SELECT 
USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can create tasks for users" 
ON public.ai_manager_tasks FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own tasks" 
ON public.ai_manager_tasks FOR UPDATE 
USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

-- RLS политики для ai_recommendations
CREATE POLICY "Users can view their own recommendations" 
ON public.ai_recommendations FOR SELECT 
USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can create recommendations" 
ON public.ai_recommendations FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own recommendations" 
ON public.ai_recommendations FOR UPDATE 
USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

-- RLS политики для user_progress_tracking
CREATE POLICY "Users can view their own progress" 
ON public.user_progress_tracking FOR SELECT 
USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can manage user progress" 
ON public.user_progress_tracking FOR ALL 
USING (true);

-- Создаем индексы для производительности
CREATE INDEX idx_ai_conversations_user_id ON public.ai_conversations(user_id);
CREATE INDEX idx_ai_conversations_last_message ON public.ai_conversations(last_message_at DESC);
CREATE INDEX idx_ai_messages_conversation_id ON public.ai_messages(conversation_id);
CREATE INDEX idx_ai_messages_created_at ON public.ai_messages(created_at DESC);
CREATE INDEX idx_ai_manager_tasks_user_id ON public.ai_manager_tasks(user_id);
CREATE INDEX idx_ai_manager_tasks_status ON public.ai_manager_tasks(status);
CREATE INDEX idx_ai_manager_tasks_due_date ON public.ai_manager_tasks(due_date);
CREATE INDEX idx_ai_recommendations_user_id ON public.ai_recommendations(user_id);
CREATE INDEX idx_ai_recommendations_status ON public.ai_recommendations(status);

-- Триггеры для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_personas_updated_at BEFORE UPDATE ON public.ai_personas
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_conversations_updated_at BEFORE UPDATE ON public.ai_conversations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_manager_tasks_updated_at BEFORE UPDATE ON public.ai_manager_tasks
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_recommendations_updated_at BEFORE UPDATE ON public.ai_recommendations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_progress_tracking_updated_at BEFORE UPDATE ON public.user_progress_tracking
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Заполняем начальные данные персон AI-менеджеров
INSERT INTO public.ai_personas (name, role, description, expertise_areas, personality_traits) VALUES
(
  'Анна Петрова',
  'personal_manager',
  'Ваш персональный менеджер по копирайтингу с 8-летним опытом. Специализируется на стратегическом планировании контента и повышении конверсий.',
  '["content_strategy", "conversion_optimization", "client_relations", "project_management"]'::jsonb,
  '{"communication_style": "professional_friendly", "approach": "analytical", "personality": "supportive"}'::jsonb
),
(
  'Максим Орлов',
  'seo_expert',
  'SEO-эксперт и аналитик. Поможет с продвижением контента и анализом эффективности.',
  '["seo_optimization", "keyword_research", "analytics", "technical_seo"]'::jsonb,
  '{"communication_style": "technical", "approach": "data_driven", "personality": "detail_oriented"}'::jsonb
),
(
  'Екатерина Смирнова',
  'copywriter',
  'Креативный копирайтер и специалист по нейромаркетингу. Создает тексты, которые продают.',
  '["creative_writing", "neuromarketing", "storytelling", "brand_voice"]'::jsonb,
  '{"communication_style": "creative", "approach": "emotional", "personality": "inspiring"}'::jsonb
),
(
  'Дмитрий Волков',
  'marketer',
  'Маркетинг-стратег с фокусом на digital-продвижение и воронки продаж.',
  '["digital_marketing", "funnel_optimization", "advertising", "automation"]'::jsonb,
  '{"communication_style": "strategic", "approach": "results_focused", "personality": "ambitious"}'::jsonb
);

-- Функция для автоматического создания прогресс-трекинга при регистрации пользователя
CREATE OR REPLACE FUNCTION public.create_user_progress_tracking()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_progress_tracking (user_id, engagement_score)
  VALUES (NEW.id, 10) -- Начальный балл вовлеченности
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер для создания прогресс-трекинга
CREATE TRIGGER create_user_progress_tracking_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_user_progress_tracking();

-- Функция для обновления прогресса пользователя при изменении заказов
CREATE OR REPLACE FUNCTION public.update_user_progress_on_order_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Обновляем при завершении заказа
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    INSERT INTO public.user_progress_tracking (
      user_id, 
      total_orders, 
      completed_orders, 
      total_spent, 
      avg_order_value,
      last_interaction_at
    ) 
    VALUES (
      NEW.user_id,
      1,
      1,
      COALESCE(NEW.final_price, NEW.estimated_price, 0),
      COALESCE(NEW.final_price, NEW.estimated_price, 0),
      now()
    )
    ON CONFLICT (user_id) DO UPDATE SET
      total_orders = user_progress_tracking.total_orders + 1,
      completed_orders = user_progress_tracking.completed_orders + 1,
      total_spent = user_progress_tracking.total_spent + COALESCE(NEW.final_price, NEW.estimated_price, 0),
      avg_order_value = (user_progress_tracking.total_spent + COALESCE(NEW.final_price, NEW.estimated_price, 0)) / (user_progress_tracking.completed_orders + 1),
      last_interaction_at = now(),
      updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер для обновления прогресса при изменении заказов
CREATE TRIGGER update_user_progress_on_order_change_trigger
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_user_progress_on_order_change();