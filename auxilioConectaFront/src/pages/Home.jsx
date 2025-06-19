// src/pages/Home.jsx

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // <--- Importa useTranslation

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TechStack from '../components/Tech-stack';
import CallToActionSection from '../components/Call-to-action';
import Hero from '../components/Hero';
import HowItWorksSection from '../components/How-it-works';
import ProblemSection from '../components/Problems';
import UseCasesSection from '../components/Uses-case';
import SimulationSection from '../components/SimulationSection';
import ParticlesBackground from "../components/ui/ParticlesBackground";
import ParticlesBackground2 from "../components/ui/ParticlesBackground2";


function Home() {
  const { t } = useTranslation(); // <--- Obtén la función de traducción

  const [showSimulations, setShowSimulations] = useState(false);
  const [selectedUseCaseType, setSelectedUseCaseType] = useState(null);

  const handleCaseClick = (useCaseType) => {
    setSelectedUseCaseType(useCaseType);
    setShowSimulations(true);
    setTimeout(() => {
      const simulationsElement = document.getElementById('simulations');
      if (simulationsElement) {
        simulationsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  const handleBackToUseCases = () => {
    setShowSimulations(false);
    setSelectedUseCaseType(null);
    setTimeout(() => {
      const useCasesElement = document.getElementById('use-cases');
      if (useCasesElement) {
        useCasesElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <>
      <section className="relative h-[750px] overflow-hidden">
        <ParticlesBackground color="#38bdf8" particleCount={60} />
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <Hero />
        </div>
      </section>

      <ProblemSection /> <br />
      <HowItWorksSection />

      {/* Sección "Nuestra Tecnología" */}
      <section className="relative h-[500px] overflow-hidden">
        <ParticlesBackground color="#38bdf8" particleCount={60} />
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-700">
            {t('section_title_our_technology')} {/* <--- Texto traducido aquí */}
          </h1>
        </div>
      </section>

      <TechStack /><br /><br /><br />

      <section className="relative h-[500px] overflow-hidden">
        <ParticlesBackground color="#38bdf8" particleCount={60} />
        <div className="relative z-10 flex items-center justify-center h-full text-white" />
      </section>

      <CallToActionSection />

      {showSimulations ? (
        <SimulationSection
          selectedUseCaseType={selectedUseCaseType}
          onBackToUseCases={handleBackToUseCases}
        />
      ) : (
        <UseCasesSection onCaseClick={handleCaseClick} />
      )}

      <section className="relative h-[500px] overflow-hidden">
        <ParticlesBackground2 color="#38bdf8" particleCount={60} />
      </section>
    </>
  );
}

export default Home;