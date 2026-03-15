'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const news = [
  {
    title: 'Cérémonie du Vent d\'Or annoncée',
    desc: 'Le Kazekage présidera la cérémonie annuelle honorant les shinobi émérites du village.',
    date: '10 Mars 2026',
    category: 'Tradition',
    href: '/actualites',
  },
  {
    title: 'Rénovation de la Grande Muraille',
    desc: 'La brigade des marionnettistes et le génie civil s\'allient pour renforcer les défenses.',
    date: '08 Mars 2026',
    category: 'Travaux',
    href: '/actualites',
  },
  {
    title: 'Le traité de paix avec Konoha renouvelé',
    desc: 'Suna renforce ses échanges de ressources médicales et techniques avec le village de la Feuille.',
    date: '05 Mars 2026',
    category: 'Diplomatie',
    href: '/actualites',
  },
]

export default function NewsCarousel() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % news.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + news.length) % news.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section className="section-padding bg-sand-50">
      <div className="container-suna">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-display text-2xl md:text-3xl text-sand-900 tracking-wide">
            Dernières Nouvelles de Suna
          </h2>
          <Link href="/actualites" className="hidden md:flex items-center gap-2 text-sm text-sand-500 hover:text-accent-gold transition-colors">
            Tout voir <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {news.map((item) => (
              <div key={item.title} className="w-full flex-shrink-0 px-2">
                <Link href={item.href} className="card-suna overflow-hidden group block">
                  <div className="h-48 bg-gradient-to-br from-sand-200 to-sand-300/50 relative">
                    <div className="absolute inset-0 bg-sand-400/10 group-hover:bg-sand-400/20 transition-colors" />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-sand-900/80 text-sand-100 text-[10px] font-bold uppercase tracking-wider rounded">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <time className="text-[11px] text-sand-400 uppercase tracking-wider">{item.date}</time>
                    <h3 className="font-display text-base font-bold text-sand-800 mt-2 mb-3 group-hover:text-sand-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-sand-500 leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 border border-sand-200 shadow-sm
                       flex items-center justify-center text-sand-600 hover:text-sand-900 hover:bg-white transition-all z-10"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 border border-sand-200 shadow-sm
                       flex items-center justify-center text-sand-600 hover:text-sand-900 hover:bg-white transition-all z-10"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {news.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-accent-gold w-6' : 'bg-sand-300 hover:bg-sand-400'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/actualites" className="btn-outline text-sm">Toutes les actualités</Link>
        </div>
      </div>
    </section>
  )
}
