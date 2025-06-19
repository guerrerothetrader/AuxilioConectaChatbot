import React from 'react';
import { Link } from 'react-router-dom';
import ParticlesBackground from "./ui/ParticlesBackground";
import { useTranslation } from 'react-i18next'; // Importa useTranslation

const HeroSection = () => { // Renombrado a HeroSection para mayor claridad
  const { t } = useTranslation(); // Obtén la función de traducción

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden text-white">

      {/* Fondo degradado con opacidad separada */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-70" />

      {/* Partículas detrás del contenido */}
      <div className="absolute inset-0 z-10">
        <ParticlesBackground />
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <div className="text-center w-full max-w-3xl">
          <h2 className="text-4xl font-extrabold mb-6 leading-tight">
            {t('hero_title')} {/* Traducido */}
          </h2>
          <p className="mb-8 text-lg text-white/90">
            {t('hero_description')} {/* Traducido */}
          </p>
          <Link to="/chat">
            <button className="bg-white text-blue-600 cursor-pointer font-semibold px-8 py-3 rounded-full shadow-xl hover:bg-blue-100 transition duration-300 text-xl">
              {t('hero_button_text')} {/* Traducido */}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; // Asegúrate de exportar el nombre correcto