import React from 'react';
import { useTranslation, Trans } from 'react-i18next'; // Importa Trans

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    { id: 1, title: t('how_it_works_step_1_title'), icon: '💬' },
    { id: 2, title: t('how_it_works_step_2_title'), icon: '⚙️' },
    { id: 3, title: t('how_it_works_step_3_title'), icon: '🗒️' },
  ];

  return (
    <section id="how-it-works" className="w-full bg-white py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          {t('how_it_works_title')}
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="bg-gray-100 rounded-xl shadow-md p-6 flex flex-col items-center text-center w-64">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h4 className="text-lg font-semibold text-gray-700">{step.title}</h4>
              </div>
              {index < steps.length - 1 && (
                <div className="text-3xl hidden md:block">👉🏽</div>
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto">
          {/* Aquí usamos el componente Trans */}
          <Trans
            i18nKey="how_it_works_description" // La clave de traducción
            components={{
              1: <strong className="text-blue-600" />, // Para AuxilioConecta
              2: <strong className="text-blue-600" />, // Para Llama 3
              3: <strong className="text-blue-600" />, // Para Python
            }}
          />
        </p>
      </div>
    </section>
  );
};

export default HowItWorksSection;