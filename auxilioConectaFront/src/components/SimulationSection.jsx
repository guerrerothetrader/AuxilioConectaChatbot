// src/components/SimulationSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Importa useTranslation

// Importa tus imágenes
import maniobraHeimlichImage from '../../public/images/maniobra-heimlich.webp';
import heridasImage from '../../public/images/heridas.webp';
import primerosAuxiliosImage from '../../public/images/primeros-auxilios.jpg'; // Usada también para Paro Cardíaco
import desastresNaturalesImage from '../../public/images/desastres-naturales.webp'; // Usada también para Incendios Forestales
import inundacionImage from '../../public/images/inundacion.webp';
import terremotoImage from '../../public/images/terremoto.webp';
import intoxiImage from '../../public/images/intoxi.webp';
import inconsImage from '../../public/images/incons.webp'; // Asumo que es para convulsiones
import quemadurasImage from '../../public/images/quemaduras.jpg';
import fracturaImage from '../../public/images/fractura.webp';
import gasImage from '../../public/images/gas.webp';
// Necesitarás una imagen para "Picaduras y Mordeduras" si no la tienes, o usa una genérica.
// Asumo que la ruta 'public/images/' en tu original para Picaduras no era completa.
// Dejaré la ruta como estaba, pero recuerda que necesita un nombre de archivo.


const SimulationSection = ({ selectedUseCaseType, onBackToUseCases }) => {
  const { t } = useTranslation();

  // Define las simulaciones para cada tipo de caso de uso
  // Ahora usan las claves de traducción
  const simulationsData = {
    primeros_auxilios: [
      {
        title: t('simulation_title_choking'),
        description: t('simulation_desc_choking'),
        image: maniobraHeimlichImage,
        alt: t('simulation_alt_choking'),
        initialPrompt: t('emergency_choking_prompt'),
      },
      {
        title: t('simulation_title_wounds'),
        description: t('simulation_desc_wounds'),
        image: heridasImage,
        alt: t('simulation_alt_wounds'),
        initialPrompt: t('emergency_wounds_prompt'),
      },
      {
        title: t('simulation_title_cardiac_arrest'),
        description: t('simulation_desc_cardiac_arrest'),
        image: primerosAuxiliosImage, // Revisa si esta es la imagen correcta para RCP
        alt: t('simulation_alt_cardiac_arrest'),
        initialPrompt: t('emergency_cardiac_arrest_prompt'),
      },
    ],
    desastres_naturales: [
      {
        title: t('simulation_title_forest_fires'),
        description: t('simulation_desc_forest_fires'),
        image: desastresNaturalesImage, // Revisa si esta es la imagen correcta para Incendios
        alt: t('simulation_alt_forest_fires'),
        initialPrompt: t('emergency_forest_fire_prompt'),
      },
      {
        title: t('simulation_title_floods'),
        description: t('simulation_desc_floods'),
        image: inundacionImage,
        alt: t('simulation_alt_floods'),
        initialPrompt: t('emergency_floods_prompt'),
      },
      {
        title: t('simulation_title_earthquakes'),
        description: t('simulation_desc_earthquakes'),
        image: terremotoImage,
        alt: t('simulation_alt_earthquakes'),
        initialPrompt: t('emergency_earthquake_prompt'),
      },
    ],
    seguridad_personal: [
      {
        title: t('simulation_title_bites_stings'),
        description: t('simulation_desc_bites_stings'),
        image: 'public/images/picaduras.webp', // <--- ASEGÚRATE DE QUE TIENES ESTA IMAGEN O AJUSTA LA RUTA
        alt: t('simulation_alt_bites_stings'),
        initialPrompt: t('emergency_bites_stings_prompt'),
      },
      {
        title: t('simulation_title_poisoning'),
        description: t('simulation_desc_poisoning'),
        image: intoxiImage,
        alt: t('simulation_alt_poisoning'),
        initialPrompt: t('emergency_poisoning_prompt'),
      },
      {
        title: t('simulation_title_seizures'),
        description: t('simulation_desc_seizures'),
        image: inconsImage,
        alt: t('simulation_alt_seizures'),
        initialPrompt: t('emergency_seizures_prompt'),
      },
    ],
    emergencias_domesticas: [
      {
        title: t('simulation_title_burns'),
        description: t('simulation_desc_burns'),
        image: quemadurasImage,
        alt: t('simulation_alt_burns'),
        initialPrompt: t('emergency_burns_prompt'),
      },
      {
        title: t('simulation_title_fractures_sprains'),
        description: t('simulation_desc_fractures_sprains'),
        image: fracturaImage,
        alt: t('simulation_alt_fractures_sprains'),
        initialPrompt: t('emergency_fractures_sprains_prompt'),
      },
      {
        title: t('simulation_title_gas_leak'),
        description: t('simulation_desc_gas_leak'),
        image: gasImage,
        alt: t('simulation_alt_gas_leak'),
        initialPrompt: t('emergency_gas_leak_prompt'),
      },
    ],
  };

  // Función para obtener el título de la sección basado en el tipo
  // Ahora usa 't' para traducir los títulos de sección
  const getSectionTitle = (type) => {
    switch (type) {
      case 'primeros_auxilios': return t('simulation_section_title_first_aid');
      case 'desastres_naturales': return t('simulation_section_title_natural_disasters');
      case 'seguridad_personal': return t('simulation_section_title_personal_safety');
      case 'emergencias_domesticas': return t('simulation_section_title_domestic_emergencies');
      default: return t('simulation_section_title_default');
    }
  };


  const currentSimulations = simulationsData[selectedUseCaseType] || [];

  return (
    <section id="simulations" className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {getSectionTitle(selectedUseCaseType)}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t('simulation_section_subtitle')} 
          </p>
        </div>

        {currentSimulations.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {currentSimulations.map((sim, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col items-center p-6 text-center"
              >
                <img
                  src={sim.image}
                  alt={sim.alt}
                  className="w-72 h-72 object-cover rounded-md mb-6 shadow-md border-2 border-blue-100"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {sim.title}
                </h3>
                <p className="text-md text-gray-600 mb-4">
                  {sim.description}
                </p>
                <Link
                  to="/chat"
                  state={{ initialPrompt: sim.initialPrompt }}
                >
                  <button className="bg-blue-600 cursor-pointer text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 shadow-lg">
                    {t('simulation_start_button')} 
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl">
            {t('simulation_no_available')} 
          </p>
        )}

        <div className="text-center mt-12">
          <button
            onClick={onBackToUseCases}
            className="text-blue-600 cursor-pointer hover:text-blue-800 font-semibold text-lg flex items-center justify-center mx-auto"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            {t('simulation_back_to_use_cases')} 
          </button>
        </div>
      </div>
    </section>
  );
};

export default SimulationSection;