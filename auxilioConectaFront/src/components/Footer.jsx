import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Importa useTranslation

export default function Footer() {
  const { t } = useTranslation(); // Obtén la función de traducción

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-5 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

          {/* Logo y Descripción */}
          <div className="space-y-6">
            <a href="/" className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-3xl">AuxilioConecta</span> {/* Mantener el nombre de la marca sin traducir */}
            </a>
            <p className="text-sm text-muted-foreground">
              {t('footer_description')} {/* Traducido */}
            </p>
            <p className="text-xs text-muted-foreground">
              <strong className="text-blue-600 underline">{t('footer_important_note').split(':')[0]}:</strong> {/* Parte "Importante" traducida */}
              {t('footer_important_note').split(':')[1]} {/* El resto del texto traducido */}
            </p>
          </div>

          {/* Recursos */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-foreground">{t('footer_resources_title')}</h4> {/* Traducido */}
            <ul className="text-muted-foreground space-y-2 text-sm text-gray-600">
              <li><a href="/features" className="hover:text-foreground">{t('footer_features')}</a></li> {/* Traducido */}
              <li><a href="/pricing" className="hover:text-foreground">{t('footer_pricing')}</a></li> {/* Traducido */}
              <li><a href="/integrations" className="hover:text-foreground">{t('footer_integrations')}</a></li> {/* Traducido */}
              <li><a href="/changelog" className="hover:text-foreground">{t('footer_changelog')}</a></li> {/* Traducido */}
            </ul>
          </div>

          {/* Soporte */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-foreground">{t('footer_support_title')}</h4> {/* Traducido */}
            <ul className="text-muted-foreground space-y-2 text-sm text-gray-600">
              <li><a href="/faq" className="hover:text-foreground">{t('footer_faq')}</a></li> {/* Traducido */}
              <li><a href="/contact" className="hover:text-foreground">{t('footer_contact')}</a></li> {/* Traducido */}
              <li><a href="/docs" className="hover:text-foreground">{t('footer_documentation')}</a></li> {/* Traducido */}
              <li><a href="/status" className="hover:text-foreground">{t('footer_system_status')}</a></li> {/* Traducido */}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-foreground">{t('footer_legal_title')}</h4> {/* Traducido */}
            <ul className="text-muted-foreground space-y-2 text-sm text-gray-600">
              <li><a href="/terms" className="hover:text-foreground">{t('footer_terms')}</a></li> {/* Traducido */}
              <li><a href="/privacy" className="hover:text-foreground">{t('footer_privacy')}</a></li> {/* Traducido */}
              <li><a href="/cookies" className="hover:text-foreground">{t('footer_cookies')}</a></li> {/* Traducido */}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}