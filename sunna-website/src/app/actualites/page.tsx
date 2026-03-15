'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Home, ChevronRight, Mail, Star, Users, MessageCircle, ChevronLeft, ChevronDown, User } from 'lucide-react'

const categories = ['All actus', 'Missions', 'Diplomatie', 'Formation', 'Événements']

const featuredArticle = {
  title: 'La Voie du Vent : Défis et Triomphes de la Nouvelle Génération',
  desc: 'Un regard approfondi sur les accomplissements exceptionnels de la promotion 2026 de l\'Académie Ninja de Sunagakure. Entre traditions ancestrales et innovations techniques, cette nouvelle génération de shinobis redéfinit ce que signifie porter le bandeau du sable.',
  author: 'Conseil des Anciens',
  date: '12 Mars 2026',
  category: 'Formation',
}

const sidebarNews = [
  {
    title: 'Suna et Konoha Renouvellent le Pacte d\'Alliance',
    date: '10 Mars 2026',
    category: 'Diplomatie',
  },
  {
    title: 'Nouvelle Unité de Reconnaissance Déployée en Zone Frontière',
    date: '08 Mars 2026',
    category: 'Missions',
  },
  {
    title: 'Célébration Annuelle du Festival du Sable Publié',
    date: '06 Mars 2026',
    category: 'Événements',
  },
  {
    title: 'Portrait de la Brigade des Marionnettistes : Tradition et Innovation',
    date: '04 Mars 2026',
    category: 'Formation',
  },
]

const allNews = [
  {
    title: 'Suna et Konoha Renouvellent le Pacte d\'Alliance',
    desc: 'Les deux villages renforcent leur coopération militaire et médicale pour une nouvelle ère de paix durable.',
    date: '10 Mars 2026',
    category: 'Diplomatie',
  },
  {
    title: 'Nouvelle Unité de Reconnaissance Déployée en Zone Frontière',
    desc: 'Le Kazekage autorise le déploiement d\'une unité spéciale aux confins du Pays du Vent.',
    date: '08 Mars 2026',
    category: 'Missions',
  },
  {
    title: 'Examen Chūnin : Résultats et Nouveaux Promus',
    desc: 'Quinze Genin obtiennent leur promotion après un examen particulièrement exigeant cette année.',
    date: '05 Mars 2026',
    category: 'Formation',
  },
  {
    title: 'Célébration Annuelle du Festival du Sable',
    desc: 'Le village se prépare pour le plus grand événement culturel et festif de l\'année.',
    date: '03 Mars 2026',
    category: 'Événements',
  },
  {
    title: 'Portrait de la Brigade des Marionnettistes',
    desc: 'Comment l\'art ancestral du Kugutsu évolue avec les nouvelles techniques de combat modernes.',
    date: '01 Mars 2026',
    category: 'Formation',
  },
  {
    title: 'Mission de Rang S Accomplie avec Succès',
    desc: 'Une équipe d\'élite revient d\'une mission critique. Les détails restent classifiés par le Kazekage.',
    date: '28 Fév 2026',
    category: 'Missions',
  },
]

const communityHighlights = [
  { icon: Star, title: 'Mission spotlight', desc: 'Équipe 7 : Mission de rang A accomplie avec succès au Pays de la Terre.' },
  { icon: Users, title: 'Communauté', desc: 'Le programme de mentorat inter-divisions accueille 30 nouveaux participants.' },
  { icon: MessageCircle, title: 'Reconnaissance', desc: 'Prix d\'excellence décerné au Corps Médical pour innovation en antidotes.' },
]

const archives = ['Mars 2026', 'Fév 2026', 'Jan 2026', 'Déc 2025', 'Nov 2025', 'Oct 2025', 'Sep 2025', 'Août 2025']

export default function ActualitesPage() {
  const [activeCategory, setActiveCategory] = useState('All actus')

  const filteredNews = activeCategory === 'All actus'
    ? allNews
    : allNews.filter(n => n.category === activeCategory)

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
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background gradient simulating eagle/sunrise scene */}
        <div className="absolute inset-0 bg-gradient-to-b from-sand-400/40 via-sand-300/30 to-sand-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-sand-900/10 to-transparent" />
        {/* Eagle silhouettes */}
        <div className="absolute top-8 right-1/4 opacity-10">
          <svg viewBox="0 0 120 60" className="w-32 h-16" fill="currentColor">
            <path d="M60 30 Q50 10 30 15 Q10 20 0 10 Q5 25 20 25 Q10 30 0 35 Q20 30 35 35 Q50 40 60 30Z" className="text-sand-900"/>
            <path d="M60 30 Q70 10 90 15 Q110 20 120 10 Q115 25 100 25 Q110 30 120 35 Q100 30 85 35 Q70 40 60 30Z" className="text-sand-900"/>
          </svg>
        </div>
        <div className="container-suna relative z-10 text-center">
          <p className="text-6xl md:text-8xl font-display text-sand-800/20 mb-4 select-none">報告</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-sand-900 tracking-wider mb-4">
            ACTUALITÉS
          </h1>
          <p className="text-sand-600 max-w-xl mx-auto">
            Les nouvelles du Village Caché du Sable
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-sand-100/50 border-b border-sand-200 sticky top-20 z-30">
        <div className="container-suna">
          <div className="flex overflow-x-auto gap-2 py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all
                  ${activeCategory === cat
                    ? 'bg-accent-turquoise text-white'
                    : 'bg-sand-200/60 text-sand-600 hover:bg-sand-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured + Sidebar Layout */}
      <section className="section-padding bg-sand-50">
        <div className="container-suna">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Article - Left (2 cols) */}
            <div className="lg:col-span-2">
              <span className="inline-block px-3 py-1 bg-accent-turquoise text-white text-[10px] font-bold uppercase tracking-wider rounded mb-6">
                À la Une
              </span>
              <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm">
                {/* Image placeholder */}
                <div className="h-64 md:h-80 bg-gradient-to-br from-sand-300/50 via-sand-200 to-sky-dawn/40 relative">
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-sand-900/60 to-transparent" />
                  {/* Pagination dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span className="w-2 h-2 rounded-full bg-white/40" />
                    <span className="w-2 h-2 rounded-full bg-white/40" />
                  </div>
                  {/* Arrows */}
                  <button className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h2 className="font-display text-xl md:text-2xl font-bold text-sand-900 leading-tight mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-sand-600 leading-relaxed mb-6">{featuredArticle.desc}</p>
                  <div className="flex items-center gap-3 text-xs text-sand-500">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-sand-200 flex items-center justify-center">
                        <User className="w-3 h-3 text-sand-500" />
                      </div>
                      <span>Par {featuredArticle.author}</span>
                    </div>
                    <span>&bull;</span>
                    <span>{featuredArticle.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Right (1 col) */}
            <div>
              <h3 className="font-display text-lg font-bold text-sand-900 mb-6 tracking-wide">
                Dernières Nouvelles
              </h3>
              <div className="space-y-4">
                {sidebarNews.map((news) => (
                  <Link key={news.title} href="#" className="block group">
                    <div className="flex gap-4 p-3 rounded-xl hover:bg-sand-100 transition-colors">
                      {/* Small image placeholder */}
                      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-sand-200 to-sand-300/40 shrink-0" />
                      <div className="flex-grow min-w-0">
                        <span className="text-[10px] font-semibold text-accent-turquoise uppercase tracking-wider">
                          {news.category}
                        </span>
                        <h4 className="text-sm font-semibold text-sand-800 mt-1 leading-snug group-hover:text-sand-600 transition-colors line-clamp-2">
                          {news.title}
                        </h4>
                        <time className="text-[11px] text-sand-400 mt-1 block">{news.date}</time>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All News Grid */}
      <section className="section-padding bg-sand-100/30">
        <div className="container-suna">
          <h2 className="font-display text-xl md:text-2xl text-sand-900 mb-8 tracking-wide">
            Dernières Nouvelles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <Link key={news.title} href="#" className="card-suna overflow-hidden group">
                {/* Image placeholder */}
                <div className="h-44 bg-gradient-to-br from-sand-200 to-sand-300/30 relative">
                  <span className="absolute top-3 left-3 px-3 py-1 bg-sand-900/80 text-sand-100 text-[10px] font-bold uppercase tracking-wider rounded">
                    {news.category}
                  </span>
                </div>
                <div className="p-5">
                  <time className="text-[11px] text-sand-400 uppercase tracking-wider">{news.date}</time>
                  <h3 className="font-display text-base font-bold text-sand-800 mt-2 mb-2 group-hover:text-sand-600 transition-colors leading-snug">
                    {news.title}
                  </h3>
                  <p className="text-sm text-sand-500 leading-relaxed line-clamp-2">{news.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup - Parchment style */}
      <section className="py-16 bg-sand-50">
        <div className="container-suna max-w-3xl">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Parchment background */}
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
            {/* Scroll illustration placeholder */}
            <div className="flex justify-center">
              <div className="relative w-64 h-48">
                {/* Simple scroll shape */}
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

            {/* Archive links */}
            <div>
              <h2 className="font-display text-xl md:text-2xl text-sand-900 mb-6 tracking-wide">
                Archives
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {archives.map((month) => (
                  <Link
                    key={month}
                    href="#"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityHighlights.map((item) => (
              <div key={item.title} className="card-suna p-6">
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
