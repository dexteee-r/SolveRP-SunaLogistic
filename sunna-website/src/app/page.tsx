'use client'

import React from 'react'
import Hero from '@/components/sections/Hero'
import NewsCarousel from '@/components/sections/NewsCarousel'
import { TransitionLink } from '@/components/transitions/SandTransition'
import { Shield, ScrollText, Users, Newspaper, Swords, Clock, HeartHandshake } from 'lucide-react'
import { useScrollReveal, useScrollRevealGroup } from '@/hooks/useScrollReveal'
import AnimatedCounter from '@/components/animations/AnimatedCounter'

const quickAccess = [
  {
    title: 'Hiérarchie du Village',
    desc: 'Du Kazekage au Genin, découvrez la structure de commandement.',
    icon: Shield,
    href: '/hierarchie',
    color: 'text-accent-gold',
    bg: 'bg-accent-gold/10',
  },
  {
    title: 'Lois de Suna',
    desc: 'Le code shinobi qui régit notre village depuis sa fondation.',
    icon: ScrollText,
    href: '/lois',
    color: 'text-accent-red',
    bg: 'bg-accent-red/10',
  },
  {
    title: 'Sections & Divisions',
    desc: 'ANBU, Corps Médical, Marionnettistes et toutes nos forces.',
    icon: Users,
    href: '/sections',
    color: 'text-accent-turquoise',
    bg: 'bg-accent-turquoise/10',
  },
  {
    title: 'Actualités',
    desc: 'Les dernières nouvelles et événements du village.',
    icon: Newspaper,
    href: '/actualites',
    color: 'text-sand-600',
    bg: 'bg-sand-600/10',
  },
]

const stats = [
  { icon: Swords, target: 847, label: 'Shinobis Actifs' },
  { icon: Shield, target: 12453, label: 'Missions Complétées' },
  { icon: Clock, target: 15, label: 'Années de Paix' },
  { icon: HeartHandshake, target: 4, label: 'Alliances' },
]

export default function HomePage() {
  const quoteRef = useScrollReveal<HTMLDivElement>({ duration: 900 })
  const accessRef = useScrollRevealGroup('[data-reveal]', 120)
  const statsRef = useScrollRevealGroup('[data-reveal]', 100)
  const ctaTextRef = useScrollReveal<HTMLDivElement>({ distance: 40 })
  const ctaImgRef = useScrollReveal<HTMLDivElement>({ delay: 200, distance: 40 })

  return (
    <div>
      {/* Hero */}
      <Hero />

      {/* Quote Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/sunagakure_banderole_1.jpg)' }}
        />
        {/* Top fade from previous section */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-sand-50 to-transparent z-[1]" />
        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sand-100/80 to-transparent z-[1]" />
        <div ref={quoteRef} className="container-suna text-center max-w-3xl relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="block h-px w-16 bg-accent-gold/40" />
            <span className="text-accent-gold text-2xl">&loz;</span>
            <span className="block h-px w-16 bg-accent-gold/40" />
          </div>
          <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-sand-50 italic leading-relaxed drop-shadow-md">
            &ldquo;Forgés par le vent, sculptés par le sable, unis par la volonté.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="block h-px w-16 bg-accent-gold/40" />
            <span className="text-accent-gold text-2xl">&loz;</span>
            <span className="block h-px w-16 bg-accent-gold/40" />
          </div>
        </div>
      </section>

      {/* Accès Rapides */}
      <section className="py-20 bg-sand-100/50">
        <div className="container-suna max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl text-center text-sand-900 mb-12 tracking-wide">
            Accès Rapides
          </h2>
          <div ref={accessRef} className="grid grid-cols-2 gap-5">
            {quickAccess.map((item) => (
              <TransitionLink
                key={item.title}
                href={item.href}
                data-reveal
                className="group relative bg-white rounded-2xl border border-sand-200 p-6 md:p-8 text-center
                           shadow-sm hover:shadow-md hover:border-accent-gold/40 transition-all duration-300"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 rounded-full
                              bg-gradient-to-br from-amber-100 via-sand-100 to-amber-50
                              border border-accent-gold/20
                              flex items-center justify-center
                              group-hover:scale-105 transition-transform duration-300">
                  <item.icon className="w-7 h-7 md:w-9 md:h-9 text-amber-700" />
                </div>
                <h3 className="font-display text-sm md:text-base font-bold text-sand-800 mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-sand-500 leading-relaxed">
                  {item.desc}
                </p>
              </TransitionLink>
            ))}
          </div>
        </div>
      </section>

      {/* Dernières Nouvelles */}
      <NewsCarousel />

      {/* Village Statistics */}
      <section className="bg-sand-900 py-16">
        <div className="container-suna">
          <h2 className="font-display text-xl md:text-2xl text-center text-sand-200 mb-12 tracking-wide">
            Village Statistiques
          </h2>
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} data-reveal className="text-center">
                <stat.icon className="w-6 h-6 text-accent-gold mx-auto mb-3" />
                <p className="font-display text-3xl md:text-4xl font-bold text-sand-100 mb-1">
                  <AnimatedCounter target={stat.target} />
                </p>
                <p className="text-xs text-sand-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Rejoignez les rangs */}
      <section id="rejoindre" className="section-padding bg-sand-100/50">
        <div className="container-suna">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div ref={ctaTextRef} className="space-y-6">
              <h2 className="font-display text-3xl md:text-4xl text-sand-900 leading-tight tracking-wide">
                Rejoignez les rangs de Suna
              </h2>
              <p className="text-sand-600 leading-relaxed">
                Que vous soyez un shinobi chevronné ou un aspirant ninja, votre place est parmi nous.
                Rejoignez notre communauté, gravissez les échelons et contribuez à la grandeur
                du Village Caché du Sable.
              </p>
              <TransitionLink href="#" className="btn-turquoise inline-flex px-8 py-4">
                Devenir Shinobi
              </TransitionLink>
            </div>
            <div ref={ctaImgRef} className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
              <img
                src="/images/sunagakure-ninja_picture_2.jpg"
                alt="Shinobis de Sunagakure"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
