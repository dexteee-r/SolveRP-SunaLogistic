'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Home, ChevronRight, ArrowRight, X, Users } from 'lucide-react'
import { useScrollReveal, useScrollRevealGroup } from '@/hooks/useScrollReveal'
import { divisions, directors, type Division } from '@/data/divisions'
import { TransitionLink } from '@/components/transitions/SandTransition'

export default function SectionsPage() {
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null)

  const quoteRef = useScrollReveal<HTMLQuoteElement>({ duration: 800 })
  const divisionsRef = useScrollRevealGroup('[data-reveal]', 150)
  const directorsRef = useScrollRevealGroup('[data-reveal]', 80)

  const closePopup = useCallback(() => setSelectedDivision(null), [])

  useEffect(() => {
    if (selectedDivision) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedDivision])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [closePopup])

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
      <section className="relative py-12 md:py-16 bg-sand-100 overflow-hidden">
        <div className="container-suna relative z-10 text-center">
          <p className="text-5xl md:text-6xl font-display text-sand-800/20 mb-3 select-none">部隊</p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-sand-900 tracking-wider mb-3">
            SECTIONS & DIVISIONS
          </h1>
          <p className="text-sand-600 max-w-xl mx-auto text-sm">
            Les corps spécialisés au service de Suna
          </p>
        </div>
      </section>

      {/* Quote */}
      <section className="py-10 bg-sand-50">
        <div className="container-suna">
          <blockquote ref={quoteRef} className="font-display text-xl md:text-2xl text-sand-700 italic text-center max-w-3xl mx-auto">
            &ldquo;Chaque division est un pilier de notre force.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Division Showcases */}
      <section className="bg-sand-100/30">
        <div ref={divisionsRef} className="container-suna py-8">
          {divisions.map((div, i) => {
            const Icon = div.icon
            return (
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
                    <Icon className={`w-20 h-20 ${div.iconColor} opacity-20`} />
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
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedDivision(div)}
                      className="inline-flex items-center gap-2 text-sm text-accent-turquoise hover:text-accent-turquoise/80 transition-colors font-semibold"
                    >
                      Aperçu rapide <ArrowRight className="w-4 h-4" />
                    </button>
                    <TransitionLink
                      href={`/sections/${div.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-sand-500 hover:text-accent-gold transition-colors font-semibold"
                    >
                      Page complète <ArrowRight className="w-4 h-4" />
                    </TransitionLink>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Directeurs de Division */}
      <section className="section-padding bg-sand-50">
        <div className="container-suna">
          <h2 className="font-display text-2xl md:text-3xl text-center text-sand-900 mb-12 tracking-wide">
            Directeurs de Division
          </h2>
          <div ref={directorsRef} className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {directors.map((dir) => {
              const DirIcon = dir.icon
              return (
                <div key={dir.title} data-reveal className="card-suna p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sand-100 flex items-center justify-center">
                    <DirIcon className={`w-7 h-7 ${dir.color}`} />
                  </div>
                  <h3 className="font-display text-sm font-bold text-sand-800 mb-1">{dir.title}</h3>
                  <p className="text-xs text-sand-500">{dir.division}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popup / Modal */}
      {selectedDivision && (() => {
        const Icon = selectedDivision.icon
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closePopup}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-sand-900/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
              className="relative bg-sand-50 rounded-2xl border border-sand-200 shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-sand-200 hover:bg-sand-300 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-sand-700" />
              </button>

              {/* Header */}
              <div className="p-6 md:p-8 border-b border-sand-200 bg-sand-100/50">
                <div className="flex items-center gap-5">
                  <div className={`w-16 h-16 rounded-xl ${selectedDivision.bgColor} border-2 ${selectedDivision.color} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-8 h-8 ${selectedDivision.iconColor}`} />
                  </div>
                  <div>
                    <span className={`inline-block px-2 py-0.5 ${selectedDivision.badge} text-[9px] font-bold uppercase tracking-wider rounded mb-1`}>
                      Division {selectedDivision.number}
                    </span>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-sand-900 tracking-wide">
                      {selectedDivision.fullName}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Mission */}
                <div>
                  <h3 className="font-display text-sm font-bold text-sand-800 uppercase tracking-wider mb-3">Mission</h3>
                  <p className="text-sand-600 leading-relaxed text-sm">{selectedDivision.details.mission}</p>
                </div>

                {/* Spécialités */}
                <div>
                  <h3 className="font-display text-sm font-bold text-sand-800 uppercase tracking-wider mb-3">Spécialités</h3>
                  <ul className="space-y-2">
                    {selectedDivision.details.specialites.map((spec) => (
                      <li key={spec} className="flex items-start gap-2 text-sm text-sand-600">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${selectedDivision.badge.split(' ')[0]}`} />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Infos rapides */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg border border-sand-200 p-4">
                    <p className="text-[10px] text-sand-400 uppercase tracking-wider mb-1">Effectif</p>
                    <p className="text-sm text-sand-700 font-semibold">{selectedDivision.details.effectif}</p>
                  </div>
                  <div className="bg-white rounded-lg border border-sand-200 p-4">
                    <p className="text-[10px] text-sand-400 uppercase tracking-wider mb-1">Direction</p>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-sand-400" />
                      <p className="text-sm text-sand-700 font-semibold">{selectedDivision.details.directeur}</p>
                    </div>
                  </div>
                </div>

                {/* Link to full page */}
                <div className="pt-2">
                  <TransitionLink
                    href={`/sections/${selectedDivision.slug}`}
                    className="btn-primary w-full justify-center"
                  >
                    Voir la page complète
                  </TransitionLink>
                </div>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
