'use client'

import React, { useEffect, useRef } from 'react'
import { TransitionLink } from '@/components/transitions/SandTransition'
import { Home, ChevronRight, Star, Shield, Swords, Users, GraduationCap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pyramidLevels = [
  { rank: 'Kazekage', kanji: '風影', slots: 1, color: 'from-yellow-500 to-amber-600', textColor: 'text-white' },
  { rank: 'Conseillers', kanji: '長老', slots: 3, color: 'from-amber-500 to-amber-600', textColor: 'text-white' },
  { rank: 'Jōnin Elite', kanji: '上忍', slots: 4, color: 'from-sand-400 to-sand-500', textColor: 'text-white' },
  { rank: 'Jōnin', kanji: '上忍', slots: 5, color: 'from-sand-500 to-sand-600', textColor: 'text-white' },
  { rank: 'Tokubetsu Jōnin', kanji: '特別上忍', slots: 6, color: 'from-sand-600 to-sand-700', textColor: 'text-sand-100' },
  { rank: 'Chūnin', kanji: '中忍', slots: 8, color: 'from-sand-700 to-sand-800', textColor: 'text-sand-200' },
  { rank: 'Genin', kanji: '下忍', slots: 10, color: 'from-sand-800 to-sand-900', textColor: 'text-sand-300' },
]

const ranksDetail = [
  { kanji: '風影', title: 'Kazekage', subtitle: 'L\'Ombre du Vent', icon: Star, desc: 'Dirigeant suprême du village, le Kazekage est le shinobi le plus puissant. Il prend les décisions stratégiques et protège tous les citoyens.', iconColor: 'text-accent-gold', borderColor: 'border-accent-gold' },
  { kanji: '長老', title: 'Conseil des Anciens', subtitle: 'Les Sages du Désert', icon: Shield, desc: 'Vétérans ayant servi avec distinction. Ils conseillent le Kazekage sur les affaires politiques, militaires et diplomatiques.', iconColor: 'text-sand-500', borderColor: 'border-sand-400' },
  { kanji: '上忍', title: 'Jōnin Elite', subtitle: 'Maîtres de Guerre', icon: Swords, desc: 'Les ninjas les plus compétents après le Kazekage. Ils dirigent les missions de rang S et commandent les unités spéciales.', iconColor: 'text-sand-600', borderColor: 'border-sand-500' },
  { kanji: '中忍', title: 'Chūnin', subtitle: 'Officiers Intermédiaires', icon: Users, desc: 'Ayant prouvé leur leadership lors de l\'examen Chūnin, ils dirigent des équipes et supervisent les missions de rang B et C.', iconColor: 'text-sand-700', borderColor: 'border-sand-600' },
  { kanji: '下忍', title: 'Genin', subtitle: 'Aspirants Ninja', icon: GraduationCap, desc: 'Diplômés de l\'Académie, organisés en équipes de trois sous la tutelle d\'un Jōnin. Ils effectuent des missions de rang D.', iconColor: 'text-sand-800', borderColor: 'border-sand-700' },
]

const specialDivisions = [
  { name: 'ANBU', desc: 'Forces spéciales d\'élite', href: '/sections' },
  { name: 'Puppet Brigade', desc: 'Maîtres marionnettistes', href: '/sections' },
  { name: 'Medical Corps', desc: 'Ninjas médecins', href: '/sections' },
]

export default function HierarchiePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero kanji cinematic reveal
      gsap.fromTo('.hero-kanji', {
        opacity: 0, scale: 0.6, filter: 'blur(10px)',
      }, {
        opacity: 0.2, scale: 1, filter: 'blur(0px)',
        duration: 1.2, ease: 'power3.out', delay: 0.2,
      })

      gsap.fromTo('.hero-title', {
        opacity: 0, y: 40, letterSpacing: '0.5em',
      }, {
        opacity: 1, y: 0, letterSpacing: '0.15em',
        duration: 1.0, ease: 'power4.out', delay: 0.5,
      })

      gsap.fromTo('.hero-subtitle', {
        opacity: 0, y: 20,
      }, {
        opacity: 1, y: 0,
        duration: 0.7, ease: 'power3.out', delay: 0.8,
      })

      // Pyramid levels — dramatic scale-in from center
      gsap.fromTo('.pyramid-level', {
        opacity: 0, scale: 0.3, y: 30,
      }, {
        opacity: 1, scale: 1, y: 0,
        duration: 0.6, ease: 'back.out(1.4)',
        stagger: 0.1,
        scrollTrigger: { trigger: '.pyramid-section', start: 'top 75%' },
      })

      // Spotlight card — slide in
      gsap.fromTo('.spotlight-card', {
        opacity: 0, y: 60, scale: 0.95,
      }, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.spotlight-card', start: 'top 80%' },
      })

      // Rank detail cards — staggered rise
      gsap.fromTo('.rank-card', {
        opacity: 0, y: 50, scale: 0.9,
      }, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6, ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.ranks-section', start: 'top 80%' },
      })

      // Special divisions — fade slide
      gsap.fromTo('.division-link', {
        opacity: 0, y: 30,
      }, {
        opacity: 1, y: 0,
        duration: 0.5, ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.divisions-section', start: 'top 85%' },
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="pt-20" style={{ backgroundColor: '#f4e5cc' }}>
      {/* Breadcrumb */}
      <nav className="border-b border-sand-300/30 py-3">
        <div className="container-suna flex items-center gap-2 text-xs text-sand-500">
          <TransitionLink href="/" className="hover:text-sand-700 transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Accueil
          </TransitionLink>
          <ChevronRight className="w-3 h-3 text-sand-300" />
          <span className="text-sand-700 font-semibold">Hiérarchie</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/sunagakure_desert-pov_1.jpg)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(244,229,204,0.8), rgba(244,229,204,0.6), #f4e5cc)' }} />
        <div className="container-suna relative z-10 text-center">
          <p className="hero-kanji text-6xl md:text-8xl font-display text-sand-800/20 mb-4 select-none opacity-0">組織</p>
          <h1 className="hero-title font-display text-4xl md:text-5xl lg:text-6xl font-bold text-sand-900 tracking-wider mb-4 opacity-0">
            HIÉRARCHIE
          </h1>
          <p className="hero-subtitle text-sand-600 max-w-xl mx-auto opacity-0">
            Missions et responsabilités du Village Caché du Sable
          </p>
        </div>
      </section>

      {/* Pyramid Section */}
      <section className="pyramid-section relative py-20 md:py-28 overflow-hidden">
        <div className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none">
          <span className="font-display text-[14rem] md:text-[22rem] text-sand-900 leading-none writing-vertical">風</span>
        </div>
        <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none">
          <span className="font-display text-[14rem] md:text-[22rem] text-sand-900 leading-none writing-vertical">影</span>
        </div>
        <div className="container-suna relative z-10">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-x-0 top-0 bottom-0 flex justify-center pointer-events-none">
              <div className="w-full max-w-3xl h-full" style={{ background: 'linear-gradient(to bottom, rgba(201,162,39,0.08) 0%, rgba(180,130,70,0.15) 100%)', clipPath: 'polygon(50% 0%, 95% 100%, 5% 100%)' }} />
            </div>
            <div className="relative flex flex-col items-center gap-2 md:gap-3 py-8">
              {pyramidLevels.map((level, idx) => (
                <div key={level.rank} className="pyramid-level flex flex-col items-center gap-1">
                  {idx === 0 && <span className="text-[10px] text-sand-500 uppercase tracking-widest mb-1">{level.kanji}</span>}
                  <div className="flex gap-1.5 md:gap-2">
                    {Array.from({ length: level.slots }).map((_, i) => (
                      <div key={i} className={`bg-gradient-to-b ${level.color} ${level.textColor} rounded-md shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-default flex items-center justify-center w-8 h-8 md:w-11 md:h-11 text-[8px] md:text-[10px]`} title={level.rank}>
                        <span className="font-display font-bold">{level.kanji.charAt(0)}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-[9px] md:text-[10px] text-sand-500 uppercase tracking-wider mt-0.5">{level.rank}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kazekage Spotlight */}
      <section className="py-16 md:py-20">
        <div className="container-suna max-w-4xl">
          <div className="spotlight-card bg-white rounded-2xl border border-sand-200 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
              <div className="relative min-h-[280px] bg-cover bg-center" style={{ backgroundImage: 'url(/images/sunagakure_desert-pov_1.jpg)' }}>
                <div className="absolute inset-0 bg-sand-900/40" />
                <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                  <div className="w-28 h-44 bg-sand-900/60 rounded-t-full" />
                </div>
              </div>
              <div className="p-8 md:p-10">
                <div className="border-b border-sand-200 pb-4 mb-6">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-sand-900 tracking-wide">Le Cinquième Kazekage</h2>
                  <p className="text-sm text-sand-500 mt-1">Le Cinquième Kazekage est l&apos;actuel dirigeant et commandant en chef du Village Caché du Sable.</p>
                </div>
                <ul className="space-y-3 text-sm text-sand-600">
                  <li className="flex items-start gap-2"><span className="text-accent-gold font-bold mt-0.5">&#9670;</span><span><strong>Rôle principal :</strong> Diriger les forces armées et la diplomatie</span></li>
                  <li className="flex items-start gap-2"><span className="text-accent-gold font-bold mt-0.5">&#9670;</span><span><strong>Compétences :</strong> Maîtrise absolue du Sabaku</span></li>
                  <li className="flex items-start gap-2"><span className="text-accent-gold font-bold mt-0.5">&#9670;</span><span><strong>Objectif :</strong> Garantir la paix et la prospérité du village</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rangs en Détail */}
      <section className="ranks-section py-16 md:py-20">
        <div className="container-suna">
          <h2 className="font-display text-2xl md:text-3xl text-center text-sand-900 mb-12 tracking-wide">Les Rangs en Détail</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {ranksDetail.map((rank) => (
              <div key={rank.title} className={`rank-card bg-white rounded-xl border border-sand-200 p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 border-t-4 ${rank.borderColor}`}>
                <span className="block text-2xl md:text-3xl text-sand-300 font-display mb-2 select-none">{rank.kanji}</span>
                <rank.icon className={`w-7 h-7 mx-auto mb-3 ${rank.iconColor}`} />
                <h3 className="font-display text-sm font-bold text-sand-800 mb-1">{rank.title}</h3>
                <p className="text-[10px] text-sand-400 uppercase tracking-wider mb-3">{rank.subtitle}</p>
                <p className="text-xs text-sand-500 leading-relaxed">{rank.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisions Spéciales */}
      <section className="divisions-section relative py-16">
        <div className="container-suna relative z-10">
          <h2 className="font-display text-xl md:text-2xl text-center text-sand-900 mb-3 tracking-wide">Divisions Spéciales</h2>
          <p className="text-sm text-sand-600 text-center mb-10">Unités d&apos;élite rattachées directement au Kazekage</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {specialDivisions.map((div) => (
              <TransitionLink key={div.name} href={div.href} className="division-link px-8 py-5 rounded-xl bg-white/60 border border-sand-300 hover:bg-white hover:border-accent-gold/40 hover:shadow-lg hover:shadow-accent-gold/10 transition-all duration-500 group text-center min-w-[180px] shadow-sm">
                <p className="font-display text-sm font-bold tracking-wider text-sand-800 mb-1 group-hover:text-accent-gold transition-colors">{div.name}</p>
                <p className="text-xs text-sand-500">{div.desc}</p>
              </TransitionLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
