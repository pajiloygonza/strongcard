import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        // добавь остальные переводы
      },
    },
    pl: {
      translation: {
        welcome: "Witamy",
      },
    },
    ru: {
      translation: {
        welcome: "Добро пожаловать",
      },
    },
  },
  lng: "en", // язык по умолчанию
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
