'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import SandParticles from '@/components/features/SandParticles'

const TITLE = 'SUNAGAKURE'

const letterVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 150, damping: 20 },
  },
}

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/sunagakure_village-pov_1_v3.png"
          alt="Vue panoramique de Sunagakure"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-sand-50 to-transparent" />
      </div>

      {/* Floating sand particles */}
      <SandParticles />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Suna symbol — scale + fade entrance */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
        >
          <Image
            src="/images/icons/sunagakure_symbole.png"
            alt="Symbole de Sunagakure"
            width={192}
            height={192}
            className="w-40 h-40 md:w-48 md:h-48 drop-shadow-lg"
          />
        </motion.div>

        {/* Title — letter-by-letter stagger with blur */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-sand-100 mb-4 drop-shadow-lg"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
          }}
        >
          {TITLE.split('').map((letter, i) => (
            <motion.span key={i} className="inline-block" variants={letterVariants}>
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle with kanji */}
        <motion.p
          className="text-sm md:text-base text-sand-200 tracking-[0.3em] uppercase mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <span className="font-normal">砂隠れの里</span>
          <span className="mx-3 text-accent-gold">&bull;</span>
          Le Village Caché du Sable
        </motion.p>

        {/* CTA Buttons — slide up */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5, ease: [0, 0, 0.2, 1] }}
        >
          <Link href="/hierarchie" className="btn-primary px-8 py-4 text-sm">
            Explorer le village
          </Link>
          <Link href="#rejoindre" className="btn-outline px-8 py-4 text-sm">
            Rejoindre la communauté
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-sand-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Découvrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
