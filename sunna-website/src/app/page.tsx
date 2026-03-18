'use client'

import React from 'react'
import Hero from '@/components/sections/Hero'
import NewsCarousel from '@/components/sections/NewsCarousel'
import { TransitionLink } from '@/components/transitions/SandTransition'
import { Shield, ScrollText, Users, Newspaper, Swords, HeartHandshake } from 'lucide-react'
import { motion } from 'framer-motion'
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
    desc: 'ANBU, Corps Médical, Koan et toutes nos forces.',
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
  { icon: HeartHandshake, target: 4, label: 'Alliances' },
]

const QUOTE_WORDS = '\u201CForg\u00E9s par le vent, sculpt\u00E9s par le sable, unis par la volont\u00E9.\u201D'.split(' ')

/* --- Animation variants --- */

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
}

const cardEntrance = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
}

const wordReveal = {
  hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  },
}

const statItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
}

const statIcon = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <Hero />

      {/* Quote Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/sunagakure_banderole_1.jpg)' }}
        />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-sand-50 to-transparent z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sand-100/80 to-transparent z-[1]" />

        <motion.div
          className="container-suna text-center max-w-3xl relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {/* Top decorator — lines expand + diamond pulses */}
          <motion.div className="flex items-center justify-center gap-4 mb-8" variants={slideUp}>
            <motion.span
              className="block h-px bg-accent-gold/40"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            />
            <motion.span
              className="text-accent-gold text-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              &loz;
            </motion.span>
            <motion.span
              className="block h-px bg-accent-gold/40"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Quote — word-by-word reveal with blur */}
          <motion.blockquote
            className="font-display text-2xl md:text-3xl lg:text-4xl text-sand-50 italic leading-relaxed drop-shadow-md"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
          >
            {QUOTE_WORDS.map((word, i) => (
              <motion.span key={i} className="inline-block mr-[0.3em]" variants={wordReveal}>
                {word}
              </motion.span>
            ))}
          </motion.blockquote>

          {/* Bottom decorator */}
          <motion.div className="flex items-center justify-center gap-4 mt-8" variants={slideUp}>
            <motion.span
              className="block h-px bg-accent-gold/40"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            />
            <motion.span
              className="text-accent-gold text-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            >
              &loz;
            </motion.span>
            <motion.span
              className="block h-px bg-accent-gold/40"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Accès Rapides */}
      <section className="py-20 bg-sand-100/50">
        <div className="container-suna max-w-3xl">
          <motion.h2
            className="font-display text-2xl md:text-3xl text-center text-sand-900 mb-12 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Accès Rapides
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-5%' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {quickAccess.map((item) => (
              <motion.div key={item.title} variants={cardEntrance}>
                <TransitionLink
                  href={item.href}
                  className="group relative bg-white rounded-2xl border border-sand-200 p-6 md:p-8 text-center
                             shadow-sm hover:shadow-md hover:border-accent-gold/40 transition-all duration-300 block"
                >
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 rounded-full
                              bg-gradient-to-br from-amber-100 via-sand-100 to-amber-50
                              border border-accent-gold/20
                              flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  >
                    <item.icon className="w-7 h-7 md:w-9 md:h-9 text-amber-700" />
                  </motion.div>
                  <h3 className="font-display text-sm md:text-base font-bold text-sand-800 mb-2 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-sand-500 leading-relaxed">
                    {item.desc}
                  </p>
                </TransitionLink>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dernières Nouvelles */}
      <NewsCarousel />

      {/* Village Statistics */}
      <section className="bg-sand-900 py-16">
        <div className="container-suna">
          <motion.h2
            className="font-display text-xl md:text-2xl text-center text-sand-200 mb-12 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Village Statistiques
          </motion.h2>
          <motion.div
            className="grid grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-5%' }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} className="text-center" variants={statItem}>
                <motion.div className="flex justify-center mb-3" variants={statIcon}>
                  <stat.icon className="w-6 h-6 text-accent-gold" />
                </motion.div>
                <p className="font-display text-3xl md:text-4xl font-bold text-sand-100 mb-1">
                  <AnimatedCounter target={stat.target} />
                </p>
                <p className="text-xs text-sand-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA - Rejoignez les rangs */}
      <section id="rejoindre" className="section-padding bg-sand-100/50">
        <div className="container-suna">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
            >
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
            </motion.div>
            <motion.div
              className="relative h-80 lg:h-96 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0, 0, 0.2, 1] }}
            >
              <motion.img
                src="/images/sunagakure-ninja_picture_2.jpg"
                alt="Shinobis de Sunagakure"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
