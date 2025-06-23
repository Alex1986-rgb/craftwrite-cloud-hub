
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

interface Translation {
  key: string;
  locale: string;
  value: string;
  namespace: string;
}

export function useI18nTranslations() {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const loadTranslationsFromDB = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('translations')
        .select('*');

      if (error) throw error;

      // Группируем переводы по языкам и namespace
      const translationsByLang: Record<string, Record<string, Record<string, string>>> = {};
      
      data?.forEach((translation: Translation) => {
        if (!translationsByLang[translation.locale]) {
          translationsByLang[translation.locale] = {};
        }
        if (!translationsByLang[translation.locale][translation.namespace]) {
          translationsByLang[translation.locale][translation.namespace] = {};
        }
        
        // Создаем вложенную структуру для ключей типа "nav.home"
        const keys = translation.key.split('.');
        let current = translationsByLang[translation.locale][translation.namespace];
        
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = translation.value;
      });

      // Добавляем переводы в i18n
      Object.entries(translationsByLang).forEach(([locale, namespaces]) => {
        Object.entries(namespaces).forEach(([namespace, translations]) => {
          i18n.addResourceBundle(locale, namespace, translations, true, true);
        });
      });
      
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTranslationsFromDB();
  }, []);

  return { loading, loadTranslationsFromDB };
}
