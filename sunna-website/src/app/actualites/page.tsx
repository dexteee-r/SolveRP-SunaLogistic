'use client'

import React from 'react'
import Link from 'next/link'
import { Home, ChevronRight, Mail, Star, Users, MessageCircle } from 'lucide-react'
import { useScrollReveal, useScrollRevealGroup } from '@/hooks/useScrollReveal'
import ScrollNews from '@/components/sections/ScrollNews'


const communityHighlights = [
  { icon: Star, title: 'Mission spotlight', desc: 'Équipe 7 : Mission de rang A accomplie avec succès au Pays de la Terre.' },
  { icon: Users, title: 'Communauté', desc: 'Le programme de mentorat inter-divisions accueille 30 nouveaux participants.' },
  { icon: MessageCircle, title: 'Reconnaissance', desc: 'Prix d\'excellence décerné au Corps Médical pour innovation en antidotes.' },
]

const archives = ['Mars 2026', 'Fév 2026', 'Jan 2026', 'Déc 2025', 'Nov 2025', 'Oct 2025', 'Sep 2025', 'Août 2025']

export default function ActualitesPage() {
  const newsletterRef = useScrollReveal<HTMLDivElement>({ duration: 800 })
  const communityRef = useScrollRevealGroup('[data-reveal]', 120)
  const archivesRef = useScrollRevealGroup('[data-reveal]', 60)

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <nav className="bg-sand-100 border-b border-sand-200 py-3">
        <div className="container-suna flex items-center gap-2 text-xs text-sand-500">
          <Link href="/" className="hover:text-sand-700 transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Accueil
          </Link>
          <ChevronRight className="w-3 h-3 text-sand-300" />
          <span className="text-sand-700 font-semibold">Actualités</span>
        </div>
      </nav>

      {/* Hero with eagle background */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-sand-100" />
        <div className="absolute top-8 right-1/4 opacity-10">
          <svg viewBox="0 0 120 60" className="w-32 h-16" fill="currentColor">
            <path d="M60 30 Q50 10 30 15 Q10 20 0 10 Q5 25 20 25 Q10 30 0 35 Q20 30 35 35 Q50 40 60 30Z" className="text-sand-900"/>
            <path d="M60 30 Q70 10 90 15 Q110 20 120 10 Q115 25 100 25 Q110 30 120 35 Q100 30 85 35 Q70 40 60 30Z" className="text-sand-900"/>
          </svg>
        </div>
        <div className="container-suna relative z-10 text-center">
          <p className="text-5xl md:text-6xl font-display text-sand-800/20 mb-3 select-none">報告</p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-sand-900 tracking-wider mb-3">
            ACTUALITÉS
          </h1>
          <p className="text-sand-600 max-w-xl mx-auto text-sm">
            Les nouvelles du Village Caché du Sable
          </p>
        </div>
      </section>

      {/* Kakemono — Chroniques du Village */}
      <ScrollNews />

      {/* Newsletter Signup */}
      <section className="py-16 bg-sand-50">
        <div className="container-suna max-w-3xl">
          <div ref={newsletterRef} className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sand-200 via-sand-100 to-sand-200" />
            <div className="absolute inset-0 opacity-[0.03]"
                 style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

            <div className="relative z-10 p-8 md:p-12 text-center">
              <Mail className="w-10 h-10 text-sand-600 mx-auto mb-4" />
              <h2 className="font-display text-2xl md:text-3xl text-sand-900 mb-3 tracking-wide">
                Recevez les Messages du Vent
              </h2>
              <p className="text-sand-600 mb-8 text-sm max-w-md mx-auto">
                Inscrivez-vous pour recevoir les dernières nouvelles de Sunagakure
                directement par faucon messager... ou par email.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-grow px-4 py-3 rounded-lg bg-white border border-sand-300 text-sand-800 placeholder-sand-400
                           focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all text-sm"
                />
                <button type="submit" className="btn-primary whitespace-nowrap px-6 py-3">
                  S&apos;inscrire
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Archives */}
      <section className="section-padding bg-sand-100/50">
        <div className="container-suna">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative w-64 h-48">
                <div className="absolute inset-x-4 inset-y-0 bg-gradient-to-b from-sand-300/40 via-sand-200 to-sand-300/40 rounded-lg border border-sand-300/50" />
                <div className="absolute top-0 left-0 right-0 h-6 bg-sand-400/30 rounded-t-full" />
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-sand-400/30 rounded-b-full" />
                <div className="absolute inset-x-8 inset-y-8 flex flex-col gap-2 justify-center">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-1.5 bg-sand-400/20 rounded" style={{ width: `${70 + Math.random() * 30}%` }} />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl text-sand-900 mb-6 tracking-wide">
                Archives
              </h2>
              <div ref={archivesRef} className="grid grid-cols-2 gap-3">
                {archives.map((month) => (
                  <Link
                    key={month}
                    href="#"
                    data-reveal
                    className="px-4 py-3 rounded-lg bg-white border border-sand-200 text-sm text-sand-600 hover:bg-sand-100 hover:text-sand-800 hover:border-sand-300 transition-all"
                  >
                    {month}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Échos de la Communauté */}
      <section className="section-padding bg-sand-50">
        <div className="container-suna">
          <h2 className="font-display text-xl md:text-2xl text-center text-sand-900 mb-8 tracking-wide">
            Échos de la Communauté
          </h2>
          <div ref={communityRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityHighlights.map((item) => (
              <div key={item.title} data-reveal className="card-suna p-6">
                <item.icon className="w-6 h-6 text-accent-gold mb-3" />
                <h3 className="font-display text-sm font-bold text-sand-800 mb-2">{item.title}</h3>
                <p className="text-sm text-sand-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
