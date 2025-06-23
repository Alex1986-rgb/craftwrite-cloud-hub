
-- Create bulk SEO projects table
CREATE TABLE public.bulk_seo_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  order_id UUID REFERENCES public.orders,
  project_name TEXT NOT NULL,
  total_pages INTEGER NOT NULL DEFAULT 0,
  processed_pages INTEGER NOT NULL DEFAULT 0,
  failed_pages INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  settings JSONB NOT NULL DEFAULT '{}',
  price_per_page INTEGER NOT NULL DEFAULT 5000, -- в копейках (50₽)
  total_price INTEGER NOT NULL DEFAULT 0,
  file_url TEXT,
  export_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create bulk SEO pages table
CREATE TABLE public.bulk_seo_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.bulk_seo_projects NOT NULL,
  url TEXT NOT NULL,
  page_title TEXT,
  meta_title TEXT,
  meta_description TEXT,
  html_content TEXT,
  keywords JSONB DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message TEXT,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create SEO generation tasks queue
CREATE TABLE public.seo_generation_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.bulk_seo_projects NOT NULL,
  page_id UUID REFERENCES public.bulk_seo_pages NOT NULL,
  task_type TEXT NOT NULL CHECK (task_type IN ('analyze_page', 'generate_seo', 'generate_content')),
  priority INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  retry_count INTEGER NOT NULL DEFAULT 0,
  max_retries INTEGER NOT NULL DEFAULT 3,
  error_message TEXT,
  result JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create SEO templates table
CREATE TABLE public.seo_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  template_type TEXT NOT NULL CHECK (template_type IN ('meta_title', 'meta_description', 'content')),
  template_content TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.bulk_seo_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bulk_seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_generation_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_templates ENABLE ROW LEVEL SECURITY;

-- RLS policies for bulk_seo_projects
CREATE POLICY "Users can view their own projects" ON public.bulk_seo_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own projects" ON public.bulk_seo_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own projects" ON public.bulk_seo_projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all projects" ON public.bulk_seo_projects FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS policies for bulk_seo_pages
CREATE POLICY "Users can view pages from their projects" ON public.bulk_seo_pages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.bulk_seo_projects WHERE id = project_id AND user_id = auth.uid())
);
CREATE POLICY "System can manage pages" ON public.bulk_seo_pages FOR ALL USING (true);

-- RLS policies for seo_generation_tasks
CREATE POLICY "System can manage tasks" ON public.seo_generation_tasks FOR ALL USING (true);

-- RLS policies for seo_templates
CREATE POLICY "Everyone can view active templates" ON public.seo_templates FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage templates" ON public.seo_templates FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create indexes for performance
CREATE INDEX idx_bulk_seo_projects_user_id ON public.bulk_seo_projects(user_id);
CREATE INDEX idx_bulk_seo_projects_status ON public.bulk_seo_projects(status);
CREATE INDEX idx_bulk_seo_pages_project_id ON public.bulk_seo_pages(project_id);
CREATE INDEX idx_bulk_seo_pages_status ON public.bulk_seo_pages(status);
CREATE INDEX idx_seo_generation_tasks_status ON public.seo_generation_tasks(status);
CREATE INDEX idx_seo_generation_tasks_priority ON public.seo_generation_tasks(priority DESC);

-- Add some default SEO templates
INSERT INTO public.seo_templates (name, description, template_type, template_content, variables) VALUES
('Стандартный мета-заголовок', 'Базовый шаблон для мета-заголовков', 'meta_title', '{page_title} | {site_name}', '["page_title", "site_name"]'),
('SEO мета-описание', 'Шаблон для SEO мета-описаний', 'meta_description', 'Узнайте больше о {topic}. {description} ⭐ Профессиональные услуги от экспертов.', '["topic", "description"]'),
('Контентный блок', 'Шаблон для SEO-контента страницы', 'content', '<h2>О {topic}</h2><p>{intro_text}</p><p>Наши преимущества:</p><ul><li>Профессиональный подход</li><li>Быстрые сроки</li><li>Гарантия качества</li></ul>', '["topic", "intro_text"]');

-- Function to update project statistics
CREATE OR REPLACE FUNCTION public.update_bulk_seo_project_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.status != NEW.status THEN
    UPDATE public.bulk_seo_projects SET
      processed_pages = (
        SELECT COUNT(*) FROM public.bulk_seo_pages 
        WHERE project_id = NEW.project_id AND status = 'completed'
      ),
      failed_pages = (
        SELECT COUNT(*) FROM public.bulk_seo_pages 
        WHERE project_id = NEW.project_id AND status = 'failed'
      ),
      updated_at = now()
    WHERE id = NEW.project_id;
    
    -- Check if project is completed
    IF (SELECT processed_pages + failed_pages FROM public.bulk_seo_projects WHERE id = NEW.project_id) = 
       (SELECT total_pages FROM public.bulk_seo_projects WHERE id = NEW.project_id) THEN
      UPDATE public.bulk_seo_projects SET 
        status = 'completed',
        completed_at = now()
      WHERE id = NEW.project_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating project statistics
CREATE TRIGGER update_bulk_seo_stats_trigger
  AFTER UPDATE ON public.bulk_seo_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_bulk_seo_project_stats();
