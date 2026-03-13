import React from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ContactPage() {
  return (
    <div className="pb-24">
      {/* Header Section */}
      <section className="bg-primary-dark py-20 text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contactez-nous</h1>
          <p className="text-gray-300 max-w-2xl leading-relaxed">
            Une question ? Une demande administrative ? L'équipe communale est à votre écoute pour vous accompagner dans vos démarches.
          </p>
        </div>
      </section>

      <div className="container-custom -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-serif font-bold text-primary mb-6">Coordonnées</h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg text-accent">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">Adresse</span>
                    <span className="text-gray-600 text-sm">Place de la Mairie 1, 1234 Sunna</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg text-accent">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">Téléphone</span>
                    <span className="text-gray-600 text-sm">+32 (0) 12 34 56 78</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg text-accent">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900 text-sm">Email</span>
                    <span className="text-gray-600 text-sm">contact@sunna.be</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-secondary-dark p-8 rounded-2xl shadow-lg text-white">
              <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent-light" /> Horaires
              </h2>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Lundi - Vendredi</span>
                  <span className="font-bold">08:30 - 12:00</span>
                </li>
                <li className="flex justify-between border-b border-white/10 pb-2">
                  <span>Mercredi</span>
                  <span className="font-bold">14:00 - 18:00</span>
                </li>
                <li className="flex justify-between text-white/50">
                  <span>Samedi - Dimanche</span>
                  <span className="italic">Fermé</span>
                </li>
              </ul>
              <p className="mt-6 text-xs text-white/60 italic">
                * Permanence téléphonique assurée de 08:00 à 17:00.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-primary mb-8">Envoyez-nous un message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-gray-700">Nom complet</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Jean Dupont"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-700">Adresse email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="jean.dupont@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-gray-700">Sujet de votre demande</label>
                <select 
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all bg-white"
                >
                  <option>Demande d'information générale</option>
                  <option>État civil / Population</option>
                  <option>Urbanisme / Travaux</option>
                  <option>Signalement (Voirie, éclairage...)</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-gray-700">Votre message</label>
                <textarea 
                  id="message" 
                  rows={6}
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent/50 focus:border-accent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input type="checkbox" id="rgpd" className="mt-1 accent-accent" />
                <label htmlFor="rgpd" className="text-xs text-gray-500 leading-relaxed">
                  En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées dans le cadre de ma demande et de la relation administrative qui peut en découler.
                </label>
              </div>

              <Button variant="primary" size="lg" className="w-full md:w-auto">
                Envoyer le message
              </Button>
            </form>
          </div>

        </div>
      </div>

      {/* Map Placeholder */}
      <section className="container-custom mt-20">
        <div className="h-96 w-full bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 italic shadow-inner overflow-hidden relative">
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
            [Google Maps Placeholder: Sunna City Hall]
          </div>
          <div className="relative z-10 p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-white">
            <p className="font-bold text-primary">Sunna-les-Vents</p>
            <p className="text-xs text-gray-600">Localisation de l'Hôtel de Ville</p>
          </div>
        </div>
      </section>
    </div>
  )
}
