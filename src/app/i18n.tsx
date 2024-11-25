import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from '../../public/locales/en/common.json'; // Import translations
import frCommon from '../../public/locales/fr/common.json'; // Import translations

// Initialize i18next instance
i18next.use(initReactI18next).init({
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  resources: {
    en: {
      common: enCommon, // Load English translations
    },
    fr: {
      common: frCommon, // Load French translations
    },
  },
  interpolation: {
    escapeValue: false, // Not needed for React
  },
});

export default i18next;
