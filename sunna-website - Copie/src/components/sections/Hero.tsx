'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const kanjiRef = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const symbolRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const decorLeftRef = useRef<HTMLDivElement>(null)
  const decorRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    // Symbol fades in with scale
    tl.fromTo(symbolRef.current,
      { opacity: 0, scale: 0.5, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
    )

    // Title — letter by letter reveal
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll('.hero-letter')
      tl.fromTo(letters,
        { opacity: 0, y: 80, rotateX: -90 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.8, ease: 'power4.out',
          stagger: 0.04,
        },
        '-=0.6'
      )
    }

    // Kanji glow reveal
    tl.fromTo(kanjiRef.current,
      { opacity: 0, scale: 0.8, filter: 'blur(6px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    )

    // Subtitle
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.3'
    )

    // Decorative lines
    tl.fromTo([decorLeftRef.current, decorRightRef.current],
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
      '-=0.5'
    )

    // CTA buttons
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )

    // Scroll hint
    tl.fromTo(scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )

    return () => { tl.kill() }
  }, [])

  // Split title into individual letters for animation
  const titleText = 'SUNAGAKURE'
  const titleLetters = titleText.split('').map((letter, i) => (
    <span
      key={i}
      className="hero-letter inline-block"
      style={{ display: 'inline-block' }}
    >
      {letter}
    </span>
  ))

  return (
    <section ref={sectionRef} className="hero-cinematic">
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen">

        {/* Symbol */}
        <div ref={symbolRef} className="mb-8 opacity-0">
          <Image
            src="/images/icons/sunagakure_symbole.png"
            alt="Symbole de Sunagakure"
            width={96}
            height={96}
            className="w-20 h-20 md:w-24 md:h-24 drop-shadow-[0_0_30px_rgba(201,162,39,0.5)]"
            style={{}}
          />
        </div>

        {/* Title — cinematic letter reveal */}
        <h1
          ref={titleRef}
          className="font-display text-[2.5rem] sm:text-[4rem] md:text-[7rem] lg:text-[9rem] font-bold tracking-[0.15em] text-sand-50 mb-3 leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)] whitespace-nowrap"
          style={{ perspective: '800px' }}
        >
          {titleLetters}
        </h1>

        {/* Decorative lines + Kanji */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div ref={decorLeftRef} className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-accent-gold/60 origin-right" />
          <span
            ref={kanjiRef}
            className="text-accent-gold text-lg md:text-xl tracking-[0.4em] opacity-0 drop-shadow-[0_0_15px_rgba(201,162,39,0.6)]"
          >
            砂隠れの里
          </span>
          <div ref={decorRightRef} className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-accent-gold/60 origin-left" />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-sm md:text-base text-sand-200/80 tracking-[0.2em] uppercase mb-12 opacity-0 max-w-lg"
        >
          Le Village Caché du Sable
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <a href="/hierarchie" className="hero-btn-primary">
            Explorer le village
          </a>
          <a href="#rejoindre" className="hero-btn-outline">
            Rejoindre la communauté
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollHintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-sand-200/60 opacity-0">
        <span className="text-[10px] uppercase tracking-[0.3em] font-body">Découvrir</span>
        <ChevronDown className="w-5 h-5 animate-scroll-hint" />
      </div>
    </section>
  )
}
