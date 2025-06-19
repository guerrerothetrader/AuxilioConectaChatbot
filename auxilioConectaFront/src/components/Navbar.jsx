import { useState } from "react";
import { Menu, X, MessageSquare, Globe } from "lucide-react";
import { Button } from "./ui/Button";
import React from "react";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Importa useTranslation


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n: i18nInstance } = useTranslation(); // Desestructura t (función de traducción) y la instancia i18n

  const toggleLanguage = () => {
    const newLanguage = i18nInstance.language === 'es' ? 'en' : 'es';
    i18nInstance.changeLanguage(newLanguage); // Cambia el idioma a través de i18n
    // No necesitas actualizar un estado local currentLanguage si i18n lo maneja
    console.log(`Cambiando a idioma: ${newLanguage}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="w-full max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 md:px-8 text-base md:text-lg">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <span className="text-2xl py-2 font-bold text-gray-800">AuxilioConecta</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-gray-700 text-sm font-medium">
          <Link to="/#features" className="hover:text-blue-600 transition">{t('navbar_uses')}</Link>
          <Link to="/#technology" className="hover:text-blue-600 transition">{t('navbar_technology')}</Link>
          <Link to="/#pricing" className="hover:text-blue-600 transition">{t('navbar_learn_more')}</Link>
          <Link to="/contact" className="hover:text-blue-600 transition">{t('navbar_contact')}</Link>
        </nav>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Botón de Cambio de Idioma (Desktop) */}
          <Button
            onClick={toggleLanguage}
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-gray-700 hover:bg-gray-100 hover:text-blue-600 p-6"
          >
            <Globe className="h-4 w-4" />
            {i18nInstance.language === 'es' ? 'English' : 'Español'} {/* Muestra el idioma contrario */}
          </Button>

          <Link to="/login">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 text-sm cursor-pointer p-6 text-gray-700 hover:border-blue-500 hover:text-blue-600"
            >
              {t('navbar_login')}
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-600 text-sm cursor-pointer p-6 text-white hover:bg-blue-200 hover:text-blue-700 rounded-full px-4"
            >
              {t('navbar_register')}
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="w-full max-w-screen-xl mx-auto px-4 md:hidden py-4">
          <nav className="flex flex-col gap-4 text-center">
            <Link to="/#features" className="text-sm font-medium text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>{t('navbar_uses')}</Link>
            <Link to="/#technology" className="text-sm font-medium text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>{t('navbar_technology')}</Link>
            <Link to="/#pricing" className="text-sm font-medium text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>{t('navbar_learn_more')}</Link>
            <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>{t('navbar_contact')}</Link>

            {/* Botón de Cambio de Idioma (Mobile) */}
            <Button
              onClick={() => { toggleLanguage(); setIsMenuOpen(false); }}
              variant="ghost"
              className="w-full flex items-center justify-center gap-1 text-gray-700 hover:bg-gray-100 hover:text-blue-600 text-sm font-medium"
            >
              <Globe className="h-4 w-4" />
              {i18nInstance.language === 'es' ? 'English ' : 'Español'}
            </Button>

            <div className="flex flex-col gap-2 mt-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
                >
                  {t('navbar_login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full">
                  {t('navbar_register')}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}