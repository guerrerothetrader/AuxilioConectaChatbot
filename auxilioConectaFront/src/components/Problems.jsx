import React from 'react';
import { useTranslation, Trans } from 'react-i18next'; // Importa useTranslation y Trans

const ProblemSection = () => {
  const { t } = useTranslation(); // Obtén la función de traducción

  const painPoints = [
    {
      icon: '⚠️',
      title: t('problem_panic_confusion_title'), // Traducido
      description: t('problem_panic_confusion_description'), // Traducido
    },
    {
      icon: '🚨',
      title: t('problem_every_second_counts_title'), // Traducido
      description: t('problem_every_second_counts_description'), // Traducido
    },
    {
      icon: '❓',
      title: t('problem_dangerous_misinformation_title'), // Traducido
      description: t('problem_dangerous_misinformation_description'), // Traducido
    },
  ];

  return (
    <section id="problem" className="w-full bg-gray-100 py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('problem_section_title')} {/* Traducido */}
          </h2>
          <p className="text-lg text-gray-600">
            {t('problem_section_subtitle')} {/* Traducido */}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{point.title}</h3>
              <p className="text-gray-600 text-sm">{point.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center mt-16 text-lg text-gray-700 max-w-3xl mx-auto">
          {/* Usamos Trans para la solución del problema */}
          <Trans
            i18nKey="problem_solution_text"
            components={{
              1: <strong className="text-blue-600" />, // Para AuxilioConecta
            }}
          />
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;