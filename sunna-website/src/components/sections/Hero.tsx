'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import SandParticles from '@/components/features/SandParticles'

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
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-sand-50 to-transparent" />
      </div>

      {/* Floating sand particles */}
      <SandParticles />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Suna hourglass symbol */}
        <div className="mb-8 flex justify-center animate-fade-in">
          <Image
            src="/images/icons/sunagakure_symbole.png"
            alt="Symbole de Sunagakure"
            width={96}
            height={96}
            className="w-20 h-20 md:w-24 md:h-24 invert brightness-200 drop-shadow-lg"
          />
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-sand-100 mb-4 animate-fade-in-up drop-shadow-lg">
          SUNAGAKURE
        </h1>

        {/* Subtitle with kanji */}
        <p className="text-sm md:text-base text-sand-200 tracking-[0.3em] uppercase mb-10 animate-fade-in">
          <span className="font-normal">砂隠れの里</span>
          <span className="mx-3 text-accent-gold">&bull;</span>
          Le Village Caché du Sable
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
             style={{ animationDelay: '0.3s' }}>
          <Link href="/hierarchie" className="btn-primary px-8 py-4 text-sm">
            Explorer le village
          </Link>
          <Link href="#rejoindre" className="btn-outline px-8 py-4 text-sm">
            Rejoindre la communauté
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-sand-200 animate-scroll-hint">
        <span className="text-[10px] uppercase tracking-[0.3em]">Découvrir</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  )
}
