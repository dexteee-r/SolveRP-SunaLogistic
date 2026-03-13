import React from 'react'
import { Calendar as CalendarIcon, MapPin, Clock, Filter } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function AgendaPage() {
  const events = [
    {
      title: "Marché des Producteurs Locaux",
      date: "15 Mars 2026",
      time: "08:00 - 13:00",
      location: "Place de la Mairie",
      category: "Commerce",
      description: "Venez découvrir les saveurs de notre terroir. Légumes de saison, fromages artisanaux et artisanat local."
    },
    {
      title: "Conférence : Sunna face au défi climatique",
      date: "20 Mars 2026",
      time: "19:30",
      location: "Salle Polyvalente",
      category: "Environnement",
      description: "Une soirée d'échange sur les projets durables de la commune et comment chaque citoyen peut agir au quotidien."
    },
    {
      title: "Grande Chasse aux Œufs",
      date: "05 Avril 2026",
      time: "10:00 - 12:00",
      location: "Parc du Château",
      category: "Famille",
      description: "Le rendez-vous annuel pour les petits et les grands. Inscription souhaitée avant le 30 mars."
    },
    {
      title: "Conseil Communal",
      date: "12 Avril 2026",
      time: "20:00",
      location: "Hôtel de Ville",
      category: "Citoyenneté",
      description: "Séance publique du conseil communal. L'ordre du jour est disponible sur l'e-guichet."
    },
    {
      title: "Festival 'Les Vents de Sunna'",
      date: "15-17 Mai 2026",
      time: "Tout le week-end",
      location: "Divers lieux",
      category: "Culture",
      description: "Musique, théâtre de rue et installations artistiques à travers tout le village."
    }
  ]

  return (
    <div className="pb-24">
      {/* Header Section */}
      <section className="bg-secondary-dark py-20 text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Agenda du Village</h1>
              <p className="text-gray-300 max-w-2xl leading-relaxed">
                Ne manquez rien de la vie locale. Événements culturels, sportifs, réunions citoyennes et festivités.
              </p>
            </div>
            <Button variant="accent" className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" /> Proposer un événement
            </Button>
          </div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="container-custom mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" /> Filtrer par
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Catégorie</h3>
                  <div className="space-y-3">
                    {["Tous", "Culture", "Sport", "Environnement", "Famille", "Citoyenneté"].map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Période</h3>
                  <div className="space-y-3">
                    {["Ce week-end", "Ce mois-ci", "Prochains 3 mois"].map((period) => (
                      <label key={period} className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="period" className="w-4 h-4 border-gray-300 text-primary focus:ring-primary" />
                        <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">{period}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Events List */}
          <div className="lg:w-3/4 space-y-6">
            {events.map((event) => (
              <div key={event.title} className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8">
                {/* Date Box */}
                <div className="flex flex-row md:flex-col items-center justify-center bg-gray-50 rounded-xl p-4 md:w-32 shrink-0">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary-light">Mars</span>
                  <span className="text-3xl font-serif font-bold text-primary">15</span>
                </div>

                <div className="flex-grow space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest rounded-full mb-2">
                        {event.category}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-gray-900">{event.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-6 text-sm text-gray-500 pt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" /> {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" /> {event.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <Button variant="outline" size="sm">Détails</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
