
-- Create product pages table
CREATE TABLE public.product_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_url TEXT NOT NULL UNIQUE,
  page_title TEXT NOT NULL,
  category TEXT NOT NULL,
  manufacturer TEXT,
  filters JSONB DEFAULT '{}',
  link_slots JSONB DEFAULT '[]',
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create SEO texts table
CREATE TABLE public.seo_texts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.product_pages NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('seo', 'landing', 'description', 'technical', 'comparison')),
  meta_title TEXT,
  meta_description TEXT,
  seo_text TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'completed', 'failed')),
  language TEXT NOT NULL DEFAULT 'ru',
  character_count INTEGER DEFAULT 0,
  uniqueness_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create autolinks table
CREATE TABLE public.autolinks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  anchor TEXT NOT NULL,
  url TEXT NOT NULL,
  slot_type TEXT DEFAULT 'content',
  max_inserts INTEGER DEFAULT 1,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create generation logs table
CREATE TABLE public.generation_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.product_pages,
  batch_id UUID,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  text_type TEXT NOT NULL,
  progress_percent INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create SEO templates table
CREATE TABLE public.seo_meta_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  title_template TEXT NOT NULL,
  description_template TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.product_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_texts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.autolinks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_meta_templates ENABLE ROW LEVEL SECURITY;

-- RLS policies for product_pages
CREATE POLICY "Users can view all product pages" ON public.product_pages FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create product pages" ON public.product_pages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own product pages" ON public.product_pages FOR UPDATE USING (created_by = auth.uid() OR public.get_user_role(auth.uid()) = 'admin');
CREATE POLICY "Admins can manage all product pages" ON public.product_pages FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS policies for seo_texts
CREATE POLICY "Users can view SEO texts" ON public.seo_texts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create SEO texts" ON public.seo_texts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update SEO texts for their products" ON public.seo_texts FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.product_pages WHERE id = product_id AND (created_by = auth.uid() OR public.get_user_role(auth.uid()) = 'admin'))
);
CREATE POLICY "Admins can manage all SEO texts" ON public.seo_texts FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS policies for autolinks
CREATE POLICY "Users can view autolinks" ON public.autolinks FOR SELECT USING (true);
CREATE POLICY "Admins can manage autolinks" ON public.autolinks FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS policies for generation_logs
CREATE POLICY "Users can view their generation logs" ON public.generation_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.product_pages WHERE id = product_id AND (created_by = auth.uid() OR public.get_user_role(auth.uid()) = 'admin'))
);
CREATE POLICY "System can manage generation logs" ON public.generation_logs FOR ALL USING (true);

-- RLS policies for seo_meta_templates
CREATE POLICY "Users can view templates" ON public.seo_meta_templates FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage templates" ON public.seo_meta_templates FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Create indexes
CREATE INDEX idx_product_pages_category ON public.product_pages(category);
CREATE INDEX idx_product_pages_manufacturer ON public.product_pages(manufacturer);
CREATE INDEX idx_seo_texts_product_id ON public.seo_texts(product_id);
CREATE INDEX idx_seo_texts_type ON public.seo_texts(type);
CREATE INDEX idx_seo_texts_status ON public.seo_texts(status);
CREATE INDEX idx_generation_logs_batch_id ON public.generation_logs(batch_id);
CREATE INDEX idx_generation_logs_status ON public.generation_logs(status);
CREATE INDEX idx_autolinks_category ON public.autolinks(category);

-- Insert default SEO templates
INSERT INTO public.seo_meta_templates (name, category, title_template, description_template, variables) VALUES
('Кондиционеры', 'кондиционеры', 'Купить {{page_title}} по выгодной цене | Каталог 2025', 'Закажите {{page_title}} с доставкой. Гарантия, цены от {{manufacturer}}. Быстрое оформление — за 1 минуту.', '["page_title", "manufacturer"]'),
('Вентиляция', 'вентиляция', '{{page_title}} - купить с доставкой | Лучшие цены', 'Профессиональное оборудование {{page_title}} от {{manufacturer}}. Гарантия качества, быстрая доставка.', '["page_title", "manufacturer"]'),
('Отопление', 'отопление', '{{page_title}} | Отопительное оборудование с гарантией', 'Качественное отопительное оборудование {{page_title}}. Профессиональный монтаж, сервис, гарантия.', '["page_title", "manufacturer"]');

-- Insert sample autolinks
INSERT INTO public.autolinks (anchor, url, category, max_inserts) VALUES
('инверторный кондиционер', '/konditsionery/invertornye', 'кондиционеры', 2),
('система вентиляции', '/ventilatsia/sistemy', 'вентиляция', 1),
('отопительное оборудование', '/otoplenie/oborudovanie', 'отопление', 1),
('климатическое оборудование', '/klimat/oborudovanie', null, 1);

-- Function to update character count
CREATE OR REPLACE FUNCTION public.update_seo_text_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.seo_text IS NOT NULL THEN
    NEW.character_count = LENGTH(NEW.seo_text);
    NEW.updated_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update stats
CREATE TRIGGER update_seo_text_stats_trigger
  BEFORE UPDATE ON public.seo_texts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_seo_text_stats();
