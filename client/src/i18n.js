import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./language/en.json";
import hiTranslation from "./language/hi.json";

// Language resources
const resources = {
  en: {
    translation: enTranslation, // Use the imported JSON file for English
  },
  hi: {
    translation: hiTranslation, // Use the imported JSON file for Hindi
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  });

export default i18n;
