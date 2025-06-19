import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import primerosAuxiliosImage from '../../public/images/primeros-auxilios.jpg';
import desastresNaturalesImage from '../../public/images/desastres-naturales.webp';
import seguridadPersonalImage from '../../public/images/seguridad-personal.webp';
import emergenciaDomesticaImage from '../../public/images/emergencia-domestica.webp';

const UseCasesSection = ({ onCaseClick }) => {
  const { t } = useTranslation(); 

  const useCasesWithImages = [
    {
      text: t('use_case_first_aid_text'),
      subtitle: t('use_case_first_aid_subtitle'),
      image: primerosAuxiliosImage,
      alt: t('use_case_first_aid_alt'),
      type: 'primeros_auxilios',
    },
    {
      text: t('use_case_natural_disasters_text'),
      subtitle: t('use_case_natural_disasters_subtitle'),
      image: desastresNaturalesImage,
      alt: t('use_case_natural_disasters_alt'),
      type: 'desastres_naturales',
    },
    {
      text: t('use_case_personal_safety_text'),
      subtitle: t('use_case_personal_safety_subtitle'),
      image: seguridadPersonalImage,
      alt: t('use_case_personal_safety_alt'),
      type: 'seguridad_personal',
    },
    {
      text: t('use_case_domestic_emergencies_text'),
      subtitle: t('use_case_domestic_emergencies_subtitle'),
      image: emergenciaDomesticaImage,
      alt: t('use_case_domestic_emergencies_alt'),
      type: 'emergencias_domesticas',
    },
  ];

  return (
    <section id="use-cases" className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('use_cases_title')} 
          </h2>
          <p className="text-lg text-gray-600">
            {/* Usamos Trans para el subtítulo con la etiqueta strong */}
            <Trans
              i18nKey="use_cases_subtitle"
              components={{
                1: <strong className="text-blue-600" />, // Para AuxilioConecta
              }}
            />
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {useCasesWithImages.map((useCase, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer flex flex-col"
              onClick={() => onCaseClick(useCase.type)}
            >
              <div
                className="relative w-full overflow-hidden"
                style={{ paddingTop: '75%' }}
              >
                <img
                  src={useCase.image}
                  alt={useCase.alt} 
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {useCase.text} 
                </h3>
                <p className="text-sm text-gray-600 mt-1">{useCase.subtitle}</p> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;