'use client'

import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import NewsCarousel from '@/components/sections/NewsCarousel'
import { TransitionLink } from '@/components/transitions/SandTransition'
import { Shield, ScrollText, Users, Newspaper, Swords, Clock, HeartHandshake } from 'lucide-react'
import AnimatedCounter from '@/components/animations/AnimatedCounter'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Dynamic import for 3D scene — no SSR
// const DesertScene = dynamic(() => import('@/components/canvas/DesertScene'), {
//   ssr: false,
// })
const DesertScene = dynamic(() => import('@/components/canvas/NarutoDesertPro'), {
  ssr: false,
})

const quickAccess = [
  {
    title: 'Hiérarchie du Village',
    desc: 'Du Kazekage au Genin, découvrez la structure de commandement.',
    icon: Shield,
    href: '/hierarchie',
  },
  {
    title: 'Lois de Suna',
    desc: 'Le code shinobi qui régit notre village depuis sa fondation.',
    icon: ScrollText,
    href: '/lois',
  },
  {
    title: 'Sections & Divisions',
    desc: 'ANBU, Corps Médical, Marionnettistes et toutes nos forces.',
    icon: Users,
    href: '/sections',
  },
  {
    title: 'Actualités',
    desc: 'Les dernières nouvelles et événements du village.',
    icon: Newspaper,
    href: '/actualites',
  },
]

const stats = [
  { icon: Swords, target: 847, label: 'Shinobis Actifs', suffix: '' },
  { icon: Shield, target: 12453, label: 'Missions Complétées', suffix: '' },
  { icon: Clock, target: 15, label: 'Années de Paix', suffix: '' },
  { icon: HeartHandshake, target: 4, label: 'Alliances', suffix: '' },
]

export default function HomePage() {
  const quoteRef = useRef<HTMLDivElement>(null)
  const accessRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const ctaSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // === QUOTE SECTION — dramatic reveal ===
      gsap.fromTo('.quote-diamond', {
        scaleX: 0,
      }, {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.quote-section', start: 'top 80%' },
      })

      gsap.fromTo('.quote-text', {
        opacity: 0,
        y: 60,
        filter: 'blur(8px)',
      }, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.quote-section', start: 'top 75%' },
      })

      gsap.fromTo('.quote-line', {
        scaleX: 0,
      }, {
        scaleX: 1,
        duration: 1.0,
        ease: 'power3.inOut',
        stagger: 0.1,
        scrollTrigger: { trigger: '.quote-section', start: 'top 75%' },
      })

      // === ACCESS CARDS — staggered cinematic reveal ===
      gsap.fromTo('.access-title', {
        opacity: 0,
        y: 40,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.access-section', start: 'top 80%' },
      })

      gsap.fromTo('.access-card', {
        opacity: 0,
        y: 70,
        scale: 0.9,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.access-section', start: 'top 75%' },
      })

      // === STATS — dramatic count reveal ===
      gsap.fromTo('.stats-title', {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-section', start: 'top 85%' },
      })

      gsap.fromTo('.stat-item', {
        opacity: 0,
        y: 50,
        scale: 0.8,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.4)',
        stagger: 0.1,
        scrollTrigger: { trigger: '.stats-section', start: 'top 80%' },
      })

      // === CTA SECTION ===
      gsap.fromTo('.cta-text', {
        opacity: 0,
        x: -60,
      }, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
      })

      gsap.fromTo('.cta-image', {
        opacity: 0,
        x: 60,
        scale: 0.95,
      }, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div>
      {/* 3D Desert Background */}
      <DesertScene />

      {/* Hero */}
      <Hero />

      {/* Quote Section */}
      <section className="quote-section py-24 md:py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/sunagakure_banderole_1.jpg)' }}
        />
        <div className="absolute inset-0 bg-sand-900/50 backdrop-blur-sm" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sand-900/40 to-transparent z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sand-900/30 to-transparent z-[1]" />
        <div ref={quoteRef} className="container-suna text-center max-w-3xl relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="quote-line block h-px w-20 bg-gradient-to-r from-transparent to-accent-gold/60 origin-right" />
            <span className="quote-diamond text-accent-gold text-2xl drop-shadow-[0_0_10px_rgba(201,162,39,0.5)]">&loz;</span>
            <span className="quote-line block h-px w-20 bg-gradient-to-l from-transparent to-accent-gold/60 origin-left" />
          </div>
          <blockquote className="quote-text font-display text-2xl md:text-3xl lg:text-4xl text-sand-50 italic leading-relaxed drop-shadow-lg">
            &ldquo;Forgés par le vent, sculptés par le sable, unis par la volonté.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="quote-line block h-px w-20 bg-gradient-to-r from-transparent to-accent-gold/60 origin-right" />
            <span className="quote-diamond text-accent-gold text-2xl drop-shadow-[0_0_10px_rgba(201,162,39,0.5)]">&loz;</span>
            <span className="quote-line block h-px w-20 bg-gradient-to-l from-transparent to-accent-gold/60 origin-left" />
          </div>
        </div>
      </section>

      {/* Accès Rapides */}
      <section className="access-section py-24 bg-sand-900/30 backdrop-blur-md relative">
        <div className="container-suna max-w-3xl">
          <h2 className="access-title font-display text-2xl md:text-3xl text-center text-sand-100 mb-14 tracking-wide drop-shadow-lg">
            Accès Rapides
          </h2>
          <div ref={accessRef} className="grid grid-cols-2 gap-5">
            {quickAccess.map((item) => (
              <TransitionLink
                key={item.title}
                href={item.href}
                className="access-card group relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 md:p-8 text-center
                           shadow-sm hover:shadow-xl hover:shadow-accent-gold/10 hover:border-accent-gold/40 hover:bg-white/20
                           hover:-translate-y-1 transition-all duration-500"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 rounded-full
                              bg-white/10 border border-white/20
                              flex items-center justify-center
                              group-hover:scale-110 group-hover:bg-white/20 group-hover:shadow-lg group-hover:shadow-accent-gold/20
                              transition-all duration-500">
                  <item.icon className="w-7 h-7 md:w-9 md:h-9 text-accent-gold group-hover:text-amber-300 transition-colors duration-300" />
                </div>
                <h3 className="font-display text-sm md:text-base font-bold text-sand-100 mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-sand-300/80 leading-relaxed">
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
      <section className="stats-section bg-sand-900/50 backdrop-blur-lg py-20 relative overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-sand-900/30 via-transparent to-sand-900/30" />
        <div className="container-suna relative z-10">
          <h2 className="stats-title font-display text-xl md:text-2xl text-center text-sand-200 mb-14 tracking-wide">
            Village Statistiques
          </h2>
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item text-center group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent-gold/10 flex items-center justify-center
                              group-hover:bg-accent-gold/20 group-hover:scale-110 transition-all duration-500">
                  <stat.icon className="w-5 h-5 text-accent-gold" />
                </div>
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
      <section id="rejoindre" className="cta-section section-padding bg-sand-900/30 backdrop-blur-md relative overflow-hidden">
        <div className="container-suna">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="cta-text space-y-6">
              <h2 className="font-display text-3xl md:text-4xl text-sand-100 leading-tight tracking-wide drop-shadow-lg">
                Rejoignez les rangs de Suna
              </h2>
              <p className="text-sand-300 leading-relaxed text-base md:text-lg">
                Que vous soyez un shinobi chevronné ou un aspirant ninja, votre place est parmi nous.
                Rejoignez notre communauté, gravissez les échelons et contribuez à la grandeur
                du Village Caché du Sable.
              </p>
              <TransitionLink href="#" className="btn-turquoise inline-flex px-8 py-4 hover:shadow-lg hover:shadow-accent-turquoise/20 transition-all duration-500">
                Devenir Shinobi
              </TransitionLink>
            </div>
            <div className="cta-image relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/sunagakure-ninja_picture_2.jpg"
                alt="Shinobis de Sunagakure"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sand-900/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
