
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
      escapeValue: false,
    },

    defaultNS: 'common',
    
    debug: false,
    
    load: 'languageOnly',
    cleanCode: true,
    
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged',
      bindI18nStore: false,
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    }
  });

export default i18n;
