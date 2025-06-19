import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationES from './locales/es/translation.json';
import translationEN from './locales/en/translation.json';

i18n
  .use(initReactI18next) // Pasa la instancia de i18n a react-i18next
  .init({
    resources: {
      es: {
        translation: translationES 
      },
      en: {
        translation: translationEN
      }
    },
    lng: 'es', // Idioma por defecto
    fallbackLng: 'es', // Idioma de respaldo si la traducción no existe

    interpolation: {
      escapeValue: false // React ya escapa los valores por defecto
    }
  });

export default i18n;