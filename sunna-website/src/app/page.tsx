import React from 'react'
import Hero from '@/components/sections/Hero'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Wind, Shield, Users, Scroll, MapPin, Search } from 'lucide-react'

export default function HomePage() {
  const news = [
    {
      title: "Cérémonie du Vent d'Or",
      description: "Le Kazekage présidera la cérémonie annuelle honorant les shinobi émérites et les citoyens exemplaires du village.",
      date: "10 Mars 2026",
      category: "Tradition",
      href: "/agenda/ceremonie-vent-or"
    },
    {
      title: "Rénovation de la Grande Muraille",
      description: "La brigade des marionnettistes et le génie civil s'allient pour renforcer les défenses contre les tempêtes de sable millénaires.",
      date: "08 Mars 2026",
      category: "Travaux",
      href: "/agenda/renovation-muraille"
    },
    {
      title: "Nouveau traité commercial avec Konoha",
      description: "Suna renforce ses échanges de ressources médicaux et techniques avec le village de la Feuille.",
      date: "05 Mars 2026",
      category: "Diplomatie",
      href: "/agenda/traite-konoha"
    }
  ]

  const quickAccess = [
    { name: "Académie Shinobi", icon: Wind, href: "/vivre-a-sunna/ecoles" },
    { name: "Conseil des Anciens", icon: Shield, href: "/administration/conseil-communal" },
    { name: "Archives des Parchemins", icon: Scroll, href: "/administration/services" }
  ]

  return (
    <div className="flex flex-col gap-32 pb-32">
      <Hero />

      {/* Quick Access Section */}
      <section className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-30">
          {quickAccess.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className="flex flex-col items-center gap-6 p-10 bg-secondary/90 backdrop-blur-xl border border-primary/20 rounded-3xl hover:border-primary hover:shadow-[0_0_40px_rgba(198,166,100,0.2)] hover:-translate-y-2 transition-all duration-500 text-center group"
            >
              <div className="p-5 bg-primary/5 rounded-2xl group-hover:bg-primary transition-all duration-500 border border-primary/10">
                <item.icon className="w-10 h-10 text-primary group-hover:text-secondary-dark transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">{item.name}</h3>
                <span className="text-[10px] text-primary font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Consulter</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Actualités Section */}
      <section className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
          <div className="text-center md:text-left">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] block mb-4">Actualités Officielles</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Chronique <span className="text-primary italic">du Désert</span></h2>
          </div>
          <Button variant="ghost" className="text-primary hover:text-white group">
            Toutes les archives <Wind className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.map((item) => (
            <Card 
              key={item.title}
              title={item.title}
              description={item.description}
              date={item.date}
              category={item.category}
              href={item.href}
            />
          ))}
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="container-custom flex items-center justify-center gap-8 opacity-20">
        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-primary" />
        <Wind className="w-6 h-6 text-primary" />
        <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-primary" />
      </div>

      {/* Stats/Highlight Section */}
      <section className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Puissance & Tradition</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">Sunnagakure : <br />Pionnier de <span className="text-primary">l'Énergie Éolienne</span></h2>
            <p className="text-primary/60 leading-relaxed font-light text-lg">
              Grâce à notre maîtrise ancestrale des vents, nous transformons la force brute du désert en une source d'énergie inépuisable pour notre village et nos alliés.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <span className="text-3xl font-serif font-bold text-primary">12k+</span>
                <p className="text-[10px] uppercase tracking-widest text-primary/40">Population Shinobi</p>
              </div>
              <div className="space-y-2">
                <span className="text-3xl font-serif font-bold text-primary">850</span>
                <p className="text-[10px] uppercase tracking-widest text-primary/40">Missions de Rang S</p>
              </div>
            </div>
            <Button variant="primary" className="h-14 px-8 font-bold">Lire l'histoire du village</Button>
          </div>
          <div className="aspect-square bg-primary/5 rounded-3xl border border-primary/10 flex items-center justify-center p-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 animate-pulse" />
            <div className="w-full h-full border border-primary/20 rounded-2xl flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-1000">
               <span className="text-[20vw] font-serif text-primary/10 select-none">風</span>
            </div>
            <div className="absolute bottom-10 left-10 p-6 bg-secondary/80 backdrop-blur-xl border border-primary/20 rounded-2xl">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Monument National</p>
              <p className="text-lg font-serif font-bold text-white">Le Grand Palais du Kazekage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 translate-y-12" />
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">Rejoignez la <span className="text-primary italic">Légende</span></h2>
          <p className="text-primary/60 text-lg md:text-xl font-light leading-relaxed">
            Citoyen ou voyageur, votre place est parmi nous. Découvrez nos opportunités, participez à nos festivités et contribuez à l'avenir du Désert.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
            <Button variant="primary" size="lg" className="px-12 font-bold">Portail Citoyen</Button>
            <Button variant="outline" size="lg" className="px-12 text-primary border-primary/30">Guide Touristique</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
