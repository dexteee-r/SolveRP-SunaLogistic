import React from 'react'
import { FileText, Users, Building2, HardHat, Heart, Leaf, ShieldCheck, GraduationCap } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ServicesPage() {
  const services = [
    {
      title: "Population & État Civil",
      icon: Users,
      description: "Cartes d'identité, passeports, mariages, naissances, décès et changements d'adresse.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Urbanisme & Aménagement",
      icon: Building2,
      description: "Permis d'urbanisme, plans de secteur, cadastre et conseils en rénovation urbaine.",
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Travaux & Voirie",
      icon: HardHat,
      description: "Entretien des routes, éclairage public, chantiers en cours et signalement de problèmes.",
      color: "bg-gray-100 text-gray-700"
    },
    {
      title: "Enseignement & Jeunesse",
      icon: GraduationCap,
      description: "Inscriptions scolaires, garderies, plaines de vacances et conseil communal des enfants.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Affaires Sociales & Santé",
      icon: Heart,
      description: "Aide sociale (CPAS), services aux seniors, handicap et permanences de santé.",
      color: "bg-red-50 text-red-600"
    },
    {
      title: "Environnement & Énergie",
      icon: Leaf,
      description: "Gestion des déchets, primes énergie, entretien des parcs et développement durable.",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Sécurité & Prévention",
      icon: ShieldCheck,
      description: "Police locale, pompiers, plan d'urgence communal et médiation citoyenne.",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      title: "Documents Administratifs",
      icon: FileText,
      description: "Accès aux règlements communaux, PV du conseil et téléchargement de formulaires.",
      color: "bg-amber-50 text-amber-600"
    }
  ]

  return (
    <div className="pb-24">
      {/* Header Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Services Communaux</h1>
          <p className="text-gray-300 max-w-2xl leading-relaxed">
            Retrouvez toutes les informations et démarches relatives aux différents départements de l'administration de Sunna.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container-custom mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start group">
              <div className={`p-4 rounded-xl mb-6 transition-transform group-hover:scale-110 ${service.color}`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              <Button variant="ghost" size="sm" className="px-0 font-bold group-hover:translate-x-2 transition-transform">
                En savoir plus →
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* E-guichet CTA */}
      <section className="container-custom mt-24">
        <div className="bg-secondary-dark rounded-3xl p-10 md:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Gagnez du temps avec l'E-guichet</h2>
              <p className="text-gray-300 leading-relaxed">
                De nombreuses démarches peuvent désormais être effectuées directement en ligne : certificats de résidence, composition de ménage, extraits de casier judiciaire, etc.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="accent" size="lg">Accéder au Guichet En Ligne</Button>
                <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10">Comment ça marche ?</Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="w-72 h-72 bg-white/10 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-sm">
                <FileText className="w-32 h-32 text-accent-light opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
