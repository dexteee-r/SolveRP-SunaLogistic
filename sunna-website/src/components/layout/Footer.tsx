import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-white">Village de Sunna</h2>
            <p className="text-sm leading-relaxed">
              Le site officiel du village de Sunna. Un espace dédié aux citoyens et aux visiteurs pour découvrir notre patrimoine et accéder à nos services administratifs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-accent transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold uppercase tracking-wider text-sm">Liens Rapides</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/commune" className="hover:text-white transition-colors">Découvrir le village</Link></li>
              <li><Link href="/administration" className="hover:text-white transition-colors">Administration communale</Link></li>
              <li><Link href="/agenda" className="hover:text-white transition-colors">Agenda des événements</Link></li>
              <li><Link href="/tourisme" className="hover:text-white transition-colors">Tourisme & Loisirs</Link></li>
            </ul>
          </div>

          {/* Useful Docs */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold uppercase tracking-wider text-sm">Démarches</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/administration/documents" className="hover:text-white transition-colors">Formulaires & Documents</Link></li>
              <li><Link href="/urbanisme" className="hover:text-white transition-colors">Permis d'urbanisme</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Signaler un problème</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold uppercase tracking-wider text-sm">Nous Contacter</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Place de la Mairie 1, <br />1234 Sunna-les-Vents</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+32 (0) 12 34 56 78</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>contact@sunna.be</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Administration Communale de Sunna. Tous droits réservés.</p>
          <p>Réalisé avec passion pour notre village.</p>
        </div>
      </div>
    </footer>
  )
}
