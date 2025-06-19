import React from "react";
import { useTranslation } from 'react-i18next'; 
import { Brain, Server, Code, Database, Lock } from "lucide-react"; 

export default function TechStack() {
  const { t } = useTranslation(); // Obtén la función de traducción

  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-6 max-w-7xl mx-auto">
      <TechCard
        icon={<Brain className="h-12 w-12 text-white" />}
        title={t('tech_llama3_title')} 
        description={t('tech_llama3_description')}
      />
      <TechCard
        icon={<Server className="h-12 w-12 text-white" />}
        title={t('tech_python_flask_title')}
        description={t('tech_python_flask_description')} 
      />
      <TechCard
        icon={<Code className="h-12 w-12 text-white" />}
        title={t('tech_react_vite_title')} 
        description={t('tech_react_vite_description')} 
      />
      {/* Puedes añadir estas tarjetas si quieres que aparezcan en tu TechStack 
      <TechCard
        icon={<Database className="h-12 w-12 text-white" />}
        title={t('tech_vector_db_title')}
        description={t('tech_vector_db_description')}
      />
      <TechCard
        icon={<Lock className="h-12 w-12 text-white" />}
        title={t('tech_enterprise_security_title')}
        description={t('tech_enterprise_security_description')}
      />*/}
    </div>
  );
}

function TechCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex gap-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-center text-primary rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 p-4">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}