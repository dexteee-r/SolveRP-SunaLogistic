'use client'

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Home, ChevronRight, ArrowLeft, Users } from 'lucide-react'
import { getDivisionBySlug, divisions } from '@/data/divisions'
import { useScrollReveal, useScrollRevealGroup } from '@/hooks/useScrollReveal'
import { TransitionLink } from '@/components/transitions/SandTransition'

export default function DivisionPage() {
  const params = useParams()
  const slug = params.slug as string
  const division = getDivisionBySlug(slug)

  const heroRef = useScrollReveal<HTMLDivElement>({ duration: 800 })
  const missionRef = useScrollReveal<HTMLDivElement>({ duration: 700 })
  const specsRef = useScrollRevealGroup('[data-reveal]', 100)
  const histoireRef = useScrollReveal<HTMLDivElement>({ duration: 700 })

  if (!division) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-6xl text-sand-300 mb-4">404</p>
          <p className="text-sand-600 mb-6">Division introuvable</p>
          <TransitionLink href="/sections" className="btn-primary">
            Retour aux sections
          </TransitionLink>
        </div>
      </div>
    )
  }

  const Icon = division.icon
  const currentIndex = divisions.findIndex(d => d.slug === slug)
  const prevDiv = currentIndex > 0 ? divisions[currentIndex - 1] : null
  const nextDiv = currentIndex < divisions.length - 1 ? divisions[currentIndex + 1] : null

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <nav className="bg-sand-100 border-b border-sand-200 py-3">
        <div className="container-suna flex items-center gap-2 text-xs text-sand-500">
          <Link href="/" className="hover:text-sand-700 transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Accueil
          </Link>
          <ChevronRight className="w-3 h-3 text-sand-300" />
          <TransitionLink href="/sections" className="hover:text-sand-700 transition-colors">
            Sections & Divisions
          </TransitionLink>
          <ChevronRight className="w-3 h-3 text-sand-300" />
          <span className="text-sand-700 font-semibold">{division.name}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-16 md:py-20 bg-sand-100 overflow-hidden">
        <div ref={heroRef} className="container-suna relative z-10">
          <TransitionLink
            href="/sections"
            className="inline-flex items-center gap-2 text-sm text-sand-500 hover:text-sand-700 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Toutes les divisions
          </TransitionLink>

          <div className="flex items-center gap-6">
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${division.bgColor} border-2 ${division.color} flex items-center justify-center shrink-0`}>
              <Icon className={`w-10 h-10 md:w-12 md:h-12 ${division.iconColor}`} />
            </div>
            <div>
              <span className={`inline-block px-3 py-1 ${division.badge} text-[10px] font-bold uppercase tracking-wider rounded mb-2`}>
                Division {division.number}
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-sand-900 tracking-wider">
                {division.fullName}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-sand-50">
        <div className="container-suna max-w-4xl">
          <div ref={missionRef}>
            <h2 className="font-display text-2xl md:text-3xl text-sand-900 mb-6 tracking-wide">
              Mission
            </h2>
            <p className="text-sand-600 leading-loose text-lg">
              {division.details.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Spécialités + Infos */}
      <section className="section-padding bg-sand-100/30">
        <div className="container-suna max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Spécialités */}
            <div>
              <h2 className="font-display text-xl md:text-2xl text-sand-900 mb-6 tracking-wide">
                Spécialités
              </h2>
              <div ref={specsRef} className="space-y-3">
                {division.details.specialites.map((spec) => (
                  <div key={spec} data-reveal className="flex items-start gap-3 p-4 bg-white rounded-xl border border-sand-200">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${division.badge.split(' ')[0]}`} />
                    <p className="text-sand-700 text-sm leading-relaxed">{spec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Infos */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-sand-200 p-6">
                <h3 className="font-display text-sm font-bold text-sand-800 mb-2 uppercase tracking-wider">Effectif</h3>
                <p className="text-sand-600">{division.details.effectif}</p>
              </div>
              <div className="bg-white rounded-xl border border-sand-200 p-6">
                <h3 className="font-display text-sm font-bold text-sand-800 mb-2 uppercase tracking-wider">Direction</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-sand-500" />
                  </div>
                  <p className="text-sand-600">{division.details.directeur}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="section-padding bg-sand-50">
        <div className="container-suna max-w-4xl">
          <div ref={histoireRef}>
            <h2 className="font-display text-2xl md:text-3xl text-sand-900 mb-6 tracking-wide">
              Histoire
            </h2>
            <div className="bg-white rounded-2xl border border-sand-200 p-8 md:p-10">
              <p className="text-sand-600 leading-loose">
                {division.details.histoire}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation between divisions */}
      <section className="py-12 bg-sand-100/50 border-t border-sand-200">
        <div className="container-suna">
          <div className="flex justify-between items-center">
            {prevDiv ? (
              <TransitionLink
                href={`/sections/${prevDiv.slug}`}
                className="flex items-center gap-3 text-sand-600 hover:text-sand-900 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <p className="text-[10px] text-sand-400 uppercase tracking-wider">Précédent</p>
                  <p className="font-display text-sm font-bold">{prevDiv.name}</p>
                </div>
              </TransitionLink>
            ) : <div />}

            {nextDiv ? (
              <TransitionLink
                href={`/sections/${nextDiv.slug}`}
                className="flex items-center gap-3 text-sand-600 hover:text-sand-900 transition-colors group text-right"
              >
                <div>
                  <p className="text-[10px] text-sand-400 uppercase tracking-wider">Suivant</p>
                  <p className="font-display text-sm font-bold">{nextDiv.name}</p>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </TransitionLink>
            ) : <div />}
          </div>
        </div>
      </section>
    </div>
  )
}
