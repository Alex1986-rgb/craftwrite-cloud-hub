
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Импортируем переводы
import enCommon from '@/locales/en/common.json';
import ruCommon from '@/locales/ru/common.json';
import enNotifications from '@/locales/en/notifications.json';
import ruNotifications from '@/locales/ru/notifications.json';

const resources = {
  en: {
    common: enCommon,
    notifications: enNotifications,
  },
  ru: {
    common: ruCommon,
    notifications: ruNotifications,
  },
};

// Получаем язык из localStorage или используем русский по умолчанию
const getStoredLanguage = () => {
  try {
    return localStorage?.getItem('language') || 'ru';
  } catch {
    return 'ru';
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage(),
    fallbackLng: 'ru',
    
    interpolation: {
      escapeValue: false, // react already does escaping
    },

    defaultNS: 'common',
    
    // Дебаг только в development
    debug: false, // Отключаем дебаг для избежания проблем
    
    // Добавляем настройки для предотвращения ошибок загрузки
    load: 'languageOnly',
    cleanCode: true,
    
    react: {
      useSuspense: false, // Отключаем Suspense для предотвращения белого экрана
    }
  });

export default i18n;
