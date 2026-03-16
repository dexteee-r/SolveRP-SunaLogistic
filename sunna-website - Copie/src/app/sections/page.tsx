'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Home, ChevronRight, Eye, Heart, Puzzle, GraduationCap, Search, ShieldCheck, Users, ArrowRight } from 'lucide-react'
import AnimatedCounter from '@/components/animations/AnimatedCounter'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const divisions = [
  { number: '1', name: 'ANBU', fullName: 'Forces Spéciales ANBU', desc: 'L\'unité d\'élite opérant dans l\'ombre. Les ANBU exécutent les missions les plus dangereuses : assassinats ciblés, espionnage infiltré et protection rapprochée du Kazekage. Leur identité est un secret absolu.', icon: Eye, color: 'border-division-anbu', bgColor: 'bg-division-anbu/5', iconColor: 'text-division-anbu', badge: 'bg-division-anbu text-sand-100' },
  { number: '2', name: 'Corps Médical', fullName: 'Division Médicale de Suna', desc: 'Les ninjas médecins sont la colonne vertébrale du village. Spécialisés dans le ninjutsu médical et l\'antidote aux poisons du désert, ils soignent les blessés sur le terrain et gèrent l\'hôpital central de Suna.', icon: Heart, color: 'border-division-medical', bgColor: 'bg-division-medical/5', iconColor: 'text-division-medical', badge: 'bg-division-medical text-white' },
  { number: '3', name: 'Brigade des Marionnettistes', fullName: 'Brigade des Arts Marionnettistes', desc: 'Tradition unique de Sunagakure. Les marionnettistes utilisent le Kugutsu no Jutsu pour contrôler des marionnettes de combat. Cet art ancestral fait la fierté et la force militaire distinctive de notre village.', icon: Puzzle, color: 'border-division-puppet', bgColor: 'bg-division-puppet/5', iconColor: 'text-division-puppet', badge: 'bg-division-puppet text-white' },
  { number: '4', name: 'Académie Ninja', fullName: 'Académie de Formation Shinobi', desc: 'L\'académie forme la prochaine génération de shinobis. Du taijutsu de base aux techniques spécialisées du désert, chaque aspirant y apprend les fondamentaux avant de devenir Genin.', icon: GraduationCap, color: 'border-division-academy', bgColor: 'bg-division-academy/5', iconColor: 'text-division-academy', badge: 'bg-division-academy text-white' },
  { number: '5', name: 'Renseignements', fullName: 'Division du Renseignement', desc: 'Le réseau d\'intelligence de Suna. Collecte d\'informations, contre-espionnage, analyse stratégique et déchiffrement de codes ennemis. Leurs rapports guident les décisions du Kazekage.', icon: Search, color: 'border-division-intelligence', bgColor: 'bg-division-intelligence/5', iconColor: 'text-division-intelligence', badge: 'bg-division-intelligence text-white' },
  { number: '6', name: 'Corps Barrière', fullName: 'Division de Détection et Barrière', desc: 'Gardiens du village, ils maintiennent la barrière de détection sensorielle qui protège Sunagakure. Spécialisés en fūinjutsu et ninjutsu sensoriel, ils sont la première ligne de défense.', icon: ShieldCheck, color: 'border-division-barrier', bgColor: 'bg-division-barrier/5', iconColor: 'text-division-barrier', badge: 'bg-division-barrier text-sand-900' },
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
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo('.hero-kanji', { opacity: 0, scale: 0.6, filter: 'blur(10px)' },
        { opacity: 0.2, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.2 })
      gsap.fromTo('.hero-title', { opacity: 0, y: 40, letterSpacing: '0.5em' },
        { opacity: 1, y: 0, letterSpacing: '0.15em', duration: 1.0, ease: 'power4.out', delay: 0.5 })
      gsap.fromTo('.hero-subtitle', { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.8 })

      // Quote
      gsap.fromTo('.section-quote', { opacity: 0, y: 40, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.section-quote', start: 'top 80%' } })

      // Stats
      gsap.fromTo('.stat-box', { opacity: 0, y: 40, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.3)', stagger: 0.1,
          scrollTrigger: { trigger: '.stats-row', start: 'top 85%' } })

      // Division showcases — alternate slide directions
      document.querySelectorAll('.division-showcase').forEach((el, i) => {
        const fromLeft = i % 2 === 0
        gsap.fromTo(el, { opacity: 0, x: fromLeft ? -80 : 80 },
          { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' } })
      })

      // Directors
      gsap.fromTo('.director-card', { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.directors-grid', start: 'top 80%' } })

      // Steps
      gsap.fromTo('.step-card', { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.2)', stagger: 0.12,
          scrollTrigger: { trigger: '.steps-grid', start: 'top 80%' } })

      // CTA
      gsap.fromTo('.cta-content', { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta-content', start: 'top 85%' } })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="pt-20">
      <nav className="bg-sand-100 border-b border-sand-200 py-3">
        <div className="container-suna flex items-center gap-2 text-xs text-sand-500">
          <Link href="/" className="hover:text-sand-700 transition-colors flex items-center gap-1"><Home className="w-3 h-3" /> Accueil</Link>
          <ChevronRight className="w-3 h-3 text-sand-300" />
          <span className="text-sand-700 font-semibold">Sections & Divisions</span>
        </div>
      </nav>

      <section className="relative py-20 md:py-28 bg-gradient-to-b from-sand-300/30 to-sand-100 overflow-hidden">
        <div className="container-suna relative z-10 text-center">
          <p className="hero-kanji text-6xl md:text-8xl font-display text-sand-800/20 mb-4 select-none opacity-0">部隊</p>
          <h1 className="hero-title font-display text-4xl md:text-5xl lg:text-6xl font-bold text-sand-900 tracking-wider mb-4 opacity-0">SECTIONS & DIVISIONS</h1>
          <p className="hero-subtitle text-sand-600 max-w-xl mx-auto opacity-0">Les corps spécialisés au service de Suna</p>
        </div>
      </section>

      <section className="section-padding bg-sand-50">
        <div className="container-suna">
          <blockquote className="section-quote font-display text-xl md:text-2xl text-sand-700 italic text-center mb-12 max-w-3xl mx-auto">&ldquo;Chaque division est un pilier de notre force.&rdquo;</blockquote>
          <div className="stats-row grid grid-cols-3 gap-4 max-w-xl mx-auto">
            {[{ val: 6, label: 'Divisions' }, { val: 23, label: 'Unités' }, { val: 1200, label: 'Membres', suffix: '+' }].map((s) => (
              <div key={s.label} className="stat-box text-center p-4 rounded-xl bg-sand-100">
                <p className="font-display text-2xl font-bold text-sand-800"><AnimatedCounter target={s.val} duration={s.val > 100 ? 2000 : 1200} suffix={s.suffix} /></p>
                <p className="text-xs text-sand-500 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-100/30">
        <div className="container-suna py-8">
          {divisions.map((div, i) => (
            <div key={div.name} className={`division-showcase grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12 ${i < divisions.length - 1 ? 'border-b border-sand-200' : ''}`}>
              <div className={`h-64 lg:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-sand-200 to-sand-300/30 relative ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="absolute inset-0 flex items-center justify-center"><div.icon className={`w-20 h-20 ${div.iconColor} opacity-20`} /></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-sand-300/30 to-transparent" />
              </div>
              <div className={`space-y-4 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className={`inline-block px-3 py-1 ${div.badge} text-[10px] font-bold uppercase tracking-wider rounded`}>Division {div.number}</span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-sand-900 tracking-wide">{div.number}) {div.name}</h3>
                <p className="text-sand-600 leading-relaxed">{div.desc}</p>
                <Link href="#" className="inline-flex items-center gap-2 text-sm text-sand-500 hover:text-accent-gold transition-colors duration-300 font-semibold">En savoir plus <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-sand-50">
        <div className="container-suna">
          <h2 className="font-display text-2xl md:text-3xl text-center text-sand-900 mb-12 tracking-wide">Directeurs de Division</h2>
          <div className="directors-grid grid grid-cols-2 md:grid-cols-3 gap-6">
            {directors.map((dir) => (
              <div key={dir.title} className="director-card card-suna p-6 text-center hover:shadow-xl hover:shadow-accent-gold/10 transition-all duration-500">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sand-100 flex items-center justify-center group-hover:scale-110 transition-transform"><dir.icon className={`w-7 h-7 ${dir.color}`} /></div>
                <h3 className="font-display text-sm font-bold text-sand-800 mb-1">{dir.title}</h3>
                <p className="text-xs text-sand-500">{dir.division}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-sand-100/50">
        <div className="container-suna">
          <h2 className="font-display text-2xl md:text-3xl text-center text-sand-900 mb-4 tracking-wide">Fonctionnement</h2>
          <p className="text-center text-sand-500 mb-12 text-sm">Comment ça marche</p>
          <div className="steps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="step-card relative">
                <div className="card-suna p-6 text-center h-full hover:shadow-xl transition-all duration-500">
                  <span className="font-display text-3xl font-bold text-sand-200 block mb-3">{s.step}</span>
                  <h3 className="font-display text-sm font-bold text-sand-800 mb-2">{s.title}</h3>
                  <p className="text-xs text-sand-500 leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && <ArrowRight className="hidden lg:block absolute top-1/2 -right-5 w-4 h-4 text-sand-300 -translate-y-1/2" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-900 py-16">
        <div className="cta-content container-suna text-center">
          <div className="flex justify-center gap-3 mb-6">
            {divisions.map((div) => (<div.icon key={div.name} className={`w-5 h-5 ${div.iconColor} opacity-60`} />))}
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-sand-100 mb-4 tracking-wide">Trouvez votre voie</h2>
          <p className="text-sand-500 mb-8 max-w-lg mx-auto text-sm">Chaque shinobi a une place dans nos rangs. Découvrez quelle division correspond à vos compétences et rejoignez l&apos;élite de Sunagakure.</p>
          <Link href="#" className="btn-turquoise px-10 py-4 hover:shadow-lg hover:shadow-accent-turquoise/20 transition-all duration-500">Postuler maintenant</Link>
        </div>
      </section>
    </div>
  )
}
