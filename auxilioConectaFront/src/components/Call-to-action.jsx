import React from 'react';
import { useTranslation } from 'react-i18next'; // Importa useTranslation

const CallToActionSection = () => {
  const { t } = useTranslation(); // Obtén la función de traducción

  return (
    <section id="contact" className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16 text-center text-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold mb-4">
          {t('cta_section_title')} {/* Traducido */}
        </h2>
        <p className="mb-8 text-lg">
          {t('cta_section_description')} {/* Traducido */}
        </p>
        <button
          className="bg-white text-xl cursor-pointer text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
          onClick={() => window.location = 'mailto:tuemail@example.com'}
        >
          {t('cta_button_text')} {/* Traducido */}
        </button>
      </div>
    </section>
  );
};

export default CallToActionSection;