-- Создаем новую таблицу для настроек AI-генерации
CREATE TABLE public.ai_generation_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Включаем RLS
ALTER TABLE public.ai_generation_settings ENABLE ROW LEVEL SECURITY;

-- Политика для админов
CREATE POLICY "Only admins can manage AI generation settings" 
ON public.ai_generation_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Триггер для updated_at
CREATE TRIGGER update_ai_generation_settings_updated_at
BEFORE UPDATE ON public.ai_generation_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Вставляем базовые настройки
INSERT INTO public.ai_generation_settings (setting_key, setting_value) VALUES
('character_pricing', '{
  "1000-3000": {"base_price": 1500, "per_1000_chars": 500},
  "3000-5000": {"base_price": 2000, "per_1000_chars": 400},
  "5000-10000": {"base_price": 3500, "per_1000_chars": 350},
  "10000+": {"base_price": 6000, "per_1000_chars": 300}
}'),
('lsi_keywords_config', '{
  "enabled": true,
  "max_suggestions": 15,
  "auto_generate": true,
  "price_per_keyword": 50
}'),
('meta_generation_config', '{
  "enabled": true,
  "auto_generate_title": true,
  "auto_generate_description": true,
  "title_max_length": 60,
  "description_max_length": 160,
  "price": 300
}'),
('ai_prompt_templates', '{
  "seo_article": {
    "base_prompt": "Напиши SEO-оптимизированную статью на {{characterCount}} символов по теме \"{{articleTopic}}\". Используй ключевые слова: {{keywords}}. LSI-ключи: {{lsiKeywords}}. Целевая аудитория: {{targetAudience}}. Стиль: {{contentStyle}}. Включи в текст {{metaTitle}} как заголовок и раскрой тему для {{metaDescription}}.",
    "variables": ["characterCount", "articleTopic", "keywords", "lsiKeywords", "targetAudience", "contentStyle", "metaTitle", "metaDescription"]
  }
}')
ON CONFLICT (setting_key) DO NOTHING;