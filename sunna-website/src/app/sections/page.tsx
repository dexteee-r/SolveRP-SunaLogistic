'use client'

import React from 'react'
import Link from 'next/link'
import { Home, ChevronRight, Eye, Heart, Puzzle, GraduationCap, Search, ShieldCheck, Users, ArrowRight } from 'lucide-react'
import { useScrollReveal, useScrollRevealGroup } from '@/hooks/useScrollReveal'
import AnimatedCounter from '@/components/animations/AnimatedCounter'

const divisions = [
  {
    number: '1',
    name: 'ANBU',
    fullName: 'Forces Spéciales ANBU',
    desc: 'L\'unité d\'élite opérant dans l\'ombre. Les ANBU exécutent les missions les plus dangereuses : assassinats ciblés, espionnage infiltré et protection rapprochée du Kazekage. Leur identité est un secret absolu.',
    icon: Eye,
    color: 'border-division-anbu',
    bgColor: 'bg-division-anbu/5',
    iconColor: 'text-division-anbu',
    badge: 'bg-division-anbu text-sand-100',
  },
  {
    number: '2',
    name: 'Corps Médical',
    fullName: 'Division Médicale de Suna',
    desc: 'Les ninjas médecins sont la colonne vertébrale du village. Spécialisés dans le ninjutsu médical et l\'antidote aux poisons du désert, ils soignent les blessés sur le terrain et gèrent l\'hôpital central de Suna.',
    icon: Heart,
    color: 'border-division-medical',
    bgColor: 'bg-division-medical/5',
    iconColor: 'text-division-medical',
    badge: 'bg-division-medical text-white',
  },
  {
    number: '3',
    name: 'Brigade des Marionnettistes',
    fullName: 'Brigade des Arts Marionnettistes',
    desc: 'Tradition unique de Sunagakure. Les marionnettistes utilisent le Kugutsu no Jutsu pour contrôler des marionnettes de combat. Cet art ancestral fait la fierté et la force militaire distinctive de notre village.',
    icon: Puzzle,
    color: 'border-division-puppet',
    bgColor: 'bg-division-puppet/5',
    iconColor: 'text-division-puppet',
    badge: 'bg-division-puppet text-white',
  },
  {
    number: '4',
    name: 'Académie Ninja',
    fullName: 'Académie de Formation Shinobi',
    desc: 'L\'académie forme la prochaine génération de shinobis. Du taijutsu de base aux techniques spécialisées du désert, chaque aspirant y apprend les fondamentaux avant de devenir Genin.',
    icon: GraduationCap,
    color: 'border-division-academy',
    bgColor: 'bg-division-academy/5',
    iconColor: 'text-division-academy',
    badge: 'bg-division-academy text-white',
  },
  {
    number: '5',
    name: 'Renseignements',
    fullName: 'Division du Renseignement',
    desc: 'Le réseau d\'intelligence de Suna. Collecte d\'informations, contre-espionnage, analyse stratégique et déchiffrement de codes ennemis. Leurs rapports guident les décisions du Kazekage.',
    icon: Search,
    color: 'border-division-intelligence',
    bgColor: 'bg-division-intelligence/5',
    iconColor: 'text-division-intelligence',
    badge: 'bg-division-intelligence text-white',
  },
  {
    number: '6',
    name: 'Corps Barrière',
    fullName: 'Division de Détection et Barrière',
    desc: 'Gardiens du village, ils maintiennent la barrière de détection sensorielle qui protège Sunagakure. Spécialisés en fūinjutsu et ninjutsu sensoriel, ils sont la première ligne de défense.',
    icon: ShieldCheck,
    color: 'border-division-barrier',
    bgColor: 'bg-division-barrier/5',
    iconColor: 'text-division-barrier',
    badge: 'bg-division-barrier text-sand-900',
  },
]

const directors = [
  { title: 'Directeur ANBU', division: 'ANBU', icon: Eye, color: 'text-division-anbu' },
  { title: 'Directeur Médical', division: 'Corps Médical', icon: Heart, color: 'text-division-medical' },
  { title: 'Directeur des Marionnettes', division: 'Marionnettistes', icon: Puzzle, color: 'text-division-puppet' },
  { title: 'Directeur Académie', division: 'Académie', icon: GraduationCap, color: 'text-division-academy' },
  { title: 'Directeur Renseignements', division: 'Renseignements', icon: Search, color: 'text-division-intelligence' },
  { title: 'Directeur Barrière', division: 'Corps Barrière', icon: ShieldCheck, color: 'text-division-barrier' },
]

const steps = [
  { step: '01', title: 'Affectation', desc: 'Assignation selon aptitudes après l\'examen Genin' },
  { step: '02', title: 'Formation Spécialisée', desc: 'Apprentissage des techniques propres à la division' },
  { step: '03', title: 'Missions de Division', desc: 'Opérations terrain sous supervision d\'un supérieur' },
  { step: '04', title: 'Progression', desc: 'Montée en grade basée sur les performances et l\'expérience' },
]

export default function SectionsPage() {
  const quoteRef = useScrollReveal<HTMLQuoteElement>({ duration: 800 })
  const statsRef = useScrollRevealGroup('[data-reveal]', 100)
  const divisionsRef = useScrollRevealGroup('[data-reveal]', 150)
  const directorsRef = useScrollRevealGroup('[data-reveal]', 80)
  const stepsRef = useScrollRevealGroup('[data-reveal]', 120)
  const ctaRef = useScrollReveal<HTMLDivElement>({ duration: 700 })

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <nav className="bg-sand-100 border-b border-sand-200 py-3">
        <div className="container-suna flex items-center gap-2 text-xs text-sand-500">
          <Link href="/" className="hover:text-sand-700 transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Accueil
          </Link>
          <ChevronRight className="w-3 h-3 text-sand-300" />
          <span className="text-sand-700 font-semibold">Sections & Divisions</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-sand-300/30 to-sand-100 overflow-hidden">
        <div className="container-suna relative z-10 text-center">
          <p className="text-6xl md:text-8xl font-display text-sand-800/20 mb-4 select-none">部隊</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-sand-900 tracking-wider mb-4">
            SECTIONS & DIVISIONS
          </h1>
          <p className="text-sand-600 max-w-xl mx-auto">
            Les corps spécialisés au service de Suna
          </p>
        </div>
      </section>

      {/* Quote + Stats */}
      <section className="section-padding bg-sand-50">
        <div className="container-suna">
          <blockquote ref={quoteRef} className="font-display text-xl md:text-2xl text-sand-700 italic text-center mb-12 max-w-3xl mx-auto">
            &ldquo;Chaque division est un pilier de notre force.&rdquo;
          </blockquote>
          <div ref={statsRef} className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div data-reveal className="text-center p-4 rounded-xl bg-sand-100">
              <p className="font-display text-2xl font-bold text-sand-800">
                <AnimatedCounter target={6} duration={1200} />
              </p>
              <p className="text-xs text-sand-500 uppercase tracking-wider">Divisions</p>
            </div>
            <div data-reveal className="text-center p-4 rounded-xl bg-sand-100">
              <p className="font-display text-2xl font-bold text-sand-800">
                <AnimatedCounter target={23} duration={1500} />
              </p>
              <p className="text-xs text-sand-500 uppercase tracking-wider">Unités</p>
            </div>
            <div data-reveal className="text-center p-4 rounded-xl bg-sand-100">
              <p className="font-display text-2xl font-bold text-sand-800">
                <AnimatedCounter target={1200} duration={2000} suffix="+" />
              </p>
              <p className="text-xs text-sand-500 uppercase tracking-wider">Membres</p>
            </div>
          </div>
        </div>
      </section>

      {/* Division Showcases */}
      <section className="bg-sand-100/30">
        <div ref={divisionsRef} className="container-suna py-8">
          {divisions.map((div, i) => (
            <div
              key={div.name}
              data-reveal
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12
                         ${i < divisions.length - 1 ? 'border-b border-sand-200' : ''}`}
            >
              {/* Image placeholder - alternates sides */}
              <div className={`h-64 lg:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-sand-200 to-sand-300/30 relative
                             ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div.icon className={`w-20 h-20 ${div.iconColor} opacity-20`} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-sand-300/30 to-transparent" />
              </div>

              {/* Text content */}
              <div className={`space-y-4 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className={`inline-block px-3 py-1 ${div.badge} text-[10px] font-bold uppercase tracking-wider rounded`}>
                  Division {div.number}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-sand-900 tracking-wide">
                  {div.number}) {div.name}
                </h3>
                <p className="text-sand-600 leading-relaxed">{div.desc}</p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-sm text-sand-500 hover:text-accent-gold transition-colors font-semibold"
                >
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Directeurs de Division */}
      <section className="section-padding bg-sand-50">
        <div className="container-suna">
          <h2 className="font-display text-2xl md:text-3xl text-center text-sand-900 mb-12 tracking-wide">
            Directeurs de Division
          </h2>
          <div ref={directorsRef} className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {directors.map((dir) => (
              <div key={dir.title} data-reveal className="card-suna p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sand-100 flex items-center justify-center">
                  <dir.icon className={`w-7 h-7 ${dir.color}`} />
                </div>
                <h3 className="font-display text-sm font-bold text-sand-800 mb-1">{dir.title}</h3>
                <p className="text-xs text-sand-500">{dir.division}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnement */}
      <section className="section-padding bg-sand-100/50">
        <div className="container-suna">
          <h2 className="font-display text-2xl md:text-3xl text-center text-sand-900 mb-4 tracking-wide">
            Fonctionnement
          </h2>
          <p className="text-center text-sand-500 mb-12 text-sm">Comment ça marche</p>
          <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} data-reveal className="relative">
                <div className="card-suna p-6 text-center h-full">
                  <span className="font-display text-3xl font-bold text-sand-200 block mb-3">{s.step}</span>
                  <h3 className="font-display text-sm font-bold text-sand-800 mb-2">{s.title}</h3>
                  <p className="text-xs text-sand-500 leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-5 w-4 h-4 text-sand-300 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sand-900 py-16">
        <div ref={ctaRef} className="container-suna text-center">
          <div className="flex justify-center gap-3 mb-6">
            {divisions.map((div) => (
              <div.icon key={div.name} className={`w-5 h-5 ${div.iconColor} opacity-60`} />
            ))}
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-sand-100 mb-4 tracking-wide">
            Trouvez votre voie
          </h2>
          <p className="text-sand-500 mb-8 max-w-lg mx-auto text-sm">
            Chaque shinobi a une place dans nos rangs. Découvrez quelle division correspond
            à vos compétences et rejoignez l&apos;élite de Sunagakure.
          </p>
          <Link href="#" className="btn-turquoise px-10 py-4">
            Postuler maintenant
          </Link>
        </div>
      </section>
    </div>
  )
}
