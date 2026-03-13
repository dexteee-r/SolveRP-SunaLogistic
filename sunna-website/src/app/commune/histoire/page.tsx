import React from 'react'
import Image from 'next/image'

export default function HistoirePage() {
  return (
    <div className="pb-24">
      {/* Header Section */}
      <section className="bg-secondary-dark py-24 text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Histoire de Sunna</h1>
          <p className="text-gray-300 max-w-3xl leading-relaxed text-lg">
            De ses origines ancestrales à son développement moderne, découvrez le parcours unique d'un village façonné par le vent et la résilience de ses habitants.
          </p>
        </div>
      </section>

      <div className="container-custom -mt-12">
        <div className="bg-white p-8 md:p-16 rounded-2xl shadow-xl space-y-20">
          
          {/* Section 1: Les Origines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-accent font-bold uppercase tracking-widest text-sm">Les Origines</span>
              <h2 className="text-3xl font-serif font-bold text-primary">Un refuge au cœur des dunes</h2>
              <p className="text-gray-600 leading-relaxed">
                Les premières traces de peuplement à Sunna remontent au XIIe siècle. À cette époque, le village n'était qu'un simple relais pour les caravanes traversant les plaines arides du sud. Les premiers habitants apprirent à dompter les vents violents et à exploiter les ressources rares de la région pour bâtir un abri durable.
              </p>
              <p className="text-gray-600 leading-relaxed">
                La légende raconte que le fondateur du village, un sage nommé Suna-no-Taki, aurait choisi cet emplacement précis après avoir découvert une source d'eau miraculeuse dissimulée sous une formation rocheuse singulière.
              </p>
            </div>
            <div className="h-96 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 italic overflow-hidden border border-gray-100">
              [Image: Représentation historique du village]
            </div>
          </div>

          {/* Section 2: Le Développement */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2 space-y-6">
              <span className="text-accent font-bold uppercase tracking-widest text-sm">XVIIIe - XIXe Siècles</span>
              <h2 className="text-3xl font-serif font-bold text-primary">L'essor du commerce du vent</h2>
              <p className="text-gray-600 leading-relaxed">
                Au cours du XVIIIe siècle, Sunna devint un centre important pour l'artisanat du textile et de la poterie. La maîtrise unique des courants d'air permit l'installation de moulins innovants, faisant du village un pionnier dans l'utilisation de l'énergie éolienne.
              </p>
              <blockquote className="border-l-4 border-accent pl-6 py-2 text-xl font-serif italic text-primary-light">
                "À Sunna, le vent n'est pas un ennemi, c'est l'âme même de notre prospérité." 
                <span className="block text-sm font-sans font-bold text-gray-500 mt-2">— Archives communales, 1842</span>
              </blockquote>
            </div>
            <div className="lg:order-1 h-96 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 italic overflow-hidden border border-gray-100">
              [Image: Les anciens moulins de Sunna]
            </div>
          </div>

          {/* Section 3: Aujourd'hui */}
          <div className="space-y-8 pt-10 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-primary">Vers un avenir durable</h2>
            <p className="text-gray-600 leading-relaxed">
              Aujourd'hui, le Village de Sunna allie fièrement son héritage historique à une vision résolument moderne. En préservant son architecture typique et ses traditions séculaires, la commune s'engage dans des projets d'aménagement durable, faisant de Sunna un modèle de village résilient et accueillant au XXIe siècle.
            </p>
            <div className="h-80 w-full bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 italic overflow-hidden border border-gray-100">
              [Image: Vue panoramique actuelle du village]
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
