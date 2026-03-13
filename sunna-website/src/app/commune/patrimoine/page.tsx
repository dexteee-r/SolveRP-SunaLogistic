import React from 'react'
import Image from 'next/image'

export default function PatrimoinePage() {
  const sites = [
    {
      name: "Le Grand Moulin d'Éole",
      location: "Colline du Vent",
      description: "Construit en 1745, ce moulin est l'un des rares encore en état de fonctionnement. Témoin de l'ingéniosité de nos ancêtres, il abrite aujourd'hui un musée du vent et des énergies renouvelables.",
      category: "Historique"
    },
    {
      name: "L'Hôtel de Ville de Sunna",
      location: "Place de la Mairie",
      description: "Un chef-d'œuvre architectural du XIXe siècle, reconnaissable à sa tour de grès rouge. Ses boiseries intérieures et ses plafonds peints retracent les grandes étapes de la vie communale.",
      category: "Public"
    },
    {
      name: "Le Rocher du Sage",
      location: "Vallée Inférieure",
      description: "Une formation géologique étonnante sculptée par l'érosion éolienne. Ce site naturel est devenu un symbole de la protection du village contre les tempêtes de sable anciennes.",
      category: "Naturel"
    },
    {
      name: "Le Vieux Marché aux Épices",
      location: "Quartier Historique",
      description: "Ancien cœur battant du commerce caravanier. Ses arcades de pierre accueillent aujourd'hui des artisans locaux et des événements culturels saisonniers.",
      category: "Urbain"
    }
  ]

  return (
    <div className="pb-24">
      {/* Header Section */}
      <section className="bg-primary py-24 text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Notre Patrimoine</h1>
          <p className="text-gray-300 max-w-3xl leading-relaxed text-lg">
            De la pierre sculptée par le temps aux monuments qui racontent notre histoire commune, parcourez les sites emblématiques de Sunna.
          </p>
        </div>
      </section>

      <div className="container-custom mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {sites.map((site) => (
            <div key={site.name} className="flex flex-col gap-6 group">
              <div className="h-80 w-full bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 italic overflow-hidden border border-gray-100 relative shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                [Image: {site.name}]
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                  {site.category}
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {site.name}
                  </h2>
                  <span className="text-xs text-accent font-bold uppercase tracking-widest">
                    {site.location}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {site.description}
                </p>
                <button className="text-primary text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-primary/20 pb-1 hover:border-primary transition-all">
                  Voir sur la carte
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-24 bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-100 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-primary mb-6">Protéger & Valoriser</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            La commission du patrimoine de Sunna veille à la conservation et à la restauration de ces sites. Si vous souhaitez en savoir plus sur les visites guidées ou le programme de mécénat, contactez le service Culture.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-primary-light transition-colors">
              Service Culture
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
