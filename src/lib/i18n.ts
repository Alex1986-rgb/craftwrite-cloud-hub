
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

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'ru', // default language
    fallbackLng: 'ru',
    
    interpolation: {
      escapeValue: false, // react already does escaping
    },

    defaultNS: 'common',
  });

export default i18n;
