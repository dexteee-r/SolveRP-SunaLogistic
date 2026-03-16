'use client'

import React, { useState } from 'react'
import { useScrollReveal, useScrollRevealGroup } from '@/hooks/useScrollReveal'
import { useParallax } from '@/hooks/useParallax'
import { Shield, Swords, Clock, HeartHandshake } from 'lucide-react'

type AnimationType = 'fade-slide' | 'parallax' | 'kanji-reveal' | 'counter' | 'scale'

const ANIMATIONS: { id: AnimationType; name: string; desc: string }[] = [
  { id: 'fade-slide', name: 'Fade-in + Slide Up', desc: 'Les éléments apparaissent en glissant vers le haut avec un fondu.' },
  { id: 'parallax', name: 'Parallax', desc: 'L\'image de fond se déplace à une vitesse différente du contenu.' },
  { id: 'kanji-reveal', name: 'Reveal Horizontal Kanji', desc: 'Les caractères kanji apparaissent un par un horizontalement.' },
  { id: 'counter', name: 'Counter Animation', desc: 'Les statistiques comptent de 0 jusqu\'à leur valeur finale.' },
  { id: 'scale', name: 'Scale Pyramide', desc: 'Les éléments s\'agrandissent depuis le centre en apparaissant.' },
]

/* ─── 1. Fade-in + Slide Up ─── */
function FadeSlideDemo() {
  const titleRef = useScrollReveal<HTMLHeadingElement>({ duration: 700 })
  const cardsRef = useScrollRevealGroup('[data-reveal]', 120)

  return (
    <div className="space-y-12">
      <h3 ref={titleRef} className="font-display text-2xl text-sand-900 text-center">
        Fade-in + Slide Up
      </h3>
      <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {['ANBU', 'Médical', 'Marionnettistes', 'Éclaireurs'].map((name) => (
          <div
            key={name}
            data-reveal
            className="bg-white rounded-2xl border border-sand-200 p-6 text-center shadow-sm"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-amber-700" />
            </div>
            <p className="font-display text-sm font-bold text-sand-800">{name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── 2. Parallax ─── */
function ParallaxDemo() {
  const bgRef = useParallax<HTMLDivElement>(0.2)

  return (
    <div className="relative h-80 overflow-hidden rounded-2xl">
      <div ref={bgRef} className="absolute inset-0 scale-125 bg-cover bg-center"
           style={{ backgroundImage: 'url(/images/sunagakure_banderole_1.jpg)' }} />
      <div className="relative z-10 flex items-center justify-center h-full">
        <p className="font-display text-3xl text-sand-50 drop-shadow-lg italic">
          &ldquo;Forgés par le vent&rdquo;
        </p>
      </div>
    </div>
  )
}

/* ─── 3. Kanji Reveal ─── */
function KanjiRevealDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const chars = el.querySelectorAll('[data-kanji]')
    chars.forEach((char, i) => {
      const htmlEl = char as HTMLElement
      htmlEl.style.opacity = '0'
      htmlEl.style.transform = 'translateX(-20px)'
      htmlEl.style.transition = `opacity 600ms ease-out ${i * 200}ms, transform 600ms ease-out ${i * 200}ms`
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          chars.forEach((char) => {
            const htmlEl = char as HTMLElement
            htmlEl.style.opacity = '1'
            htmlEl.style.transform = 'translateX(0)'
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const kanjis = ['砂', '隠', 'れ', 'の', '里']

  return (
    <div className="text-center py-8">
      <div ref={containerRef} className="flex items-center justify-center gap-6">
        {kanjis.map((k, i) => (
          <span key={i} data-kanji className="font-display text-5xl md:text-7xl text-accent-gold drop-shadow-md">
            {k}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sand-500 text-sm">Sunagakure no Sato</p>
    </div>
  )
}

/* ─── 4. Counter Animation ─── */
function CounterDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [started, setStarted] = React.useState(false)

  const stats = [
    { icon: Swords, target: 847, label: 'Shinobis Actifs' },
    { icon: Shield, target: 12453, label: 'Missions Complétées' },
    { icon: Clock, target: 15, label: 'Années de Paix' },
    { icon: HeartHandshake, target: 4, label: 'Alliances' },
  ]

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <stat.icon className="w-6 h-6 text-accent-gold mx-auto mb-3" />
          <p className="font-display text-3xl md:text-4xl font-bold text-sand-900 mb-1">
            {started ? <AnimatedCounter target={stat.target} duration={2000} /> : '0'}
          </p>
          <p className="text-xs text-sand-500 uppercase tracking-wider">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

function AnimatedCounter({ target, duration }: { target: number; duration: number }) {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return <>{value.toLocaleString('fr-FR')}</>
}

/* ─── 5. Scale Pyramide ─── */
function ScaleDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const items = el.querySelectorAll('[data-scale]')
    items.forEach((item, i) => {
      const htmlEl = item as HTMLElement
      htmlEl.style.opacity = '0'
      htmlEl.style.transform = 'scale(0.5)'
      htmlEl.style.transition = `opacity 600ms ease-out ${i * 150}ms, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 150}ms`
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((item) => {
            const htmlEl = item as HTMLElement
            htmlEl.style.opacity = '1'
            htmlEl.style.transform = 'scale(1)'
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const ranks = ['Kazekage', 'Jonin', 'Chunin', 'Genin']

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4">
      {ranks.map((rank, i) => (
        <div
          key={rank}
          data-scale
          className="bg-white rounded-xl border border-sand-200 shadow-sm px-8 py-4 text-center"
          style={{ width: `${50 + i * 15}%` }}
        >
          <p className="font-display text-lg font-bold text-sand-800">{rank}</p>
        </div>
      ))}
    </div>
  )
}

/* ─── Page ─── */
export default function TestAnimationsPage() {
  const [active, setActive] = useState<AnimationType>('fade-slide')

  return (
    <div className="min-h-screen bg-sand-50 pt-32 pb-20">
      <div className="container-suna max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl text-sand-900 text-center mb-4 tracking-wide">
          Test des Animations
        </h1>
        <p className="text-center text-sand-500 mb-12">
          Sélectionnez une animation pour la tester. Scrollez vers le bas pour déclencher l&apos;effet.
        </p>

        {/* Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {ANIMATIONS.map((anim) => (
            <button
              key={anim.id}
              onClick={() => setActive(anim.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${active === anim.id
                  ? 'bg-sand-900 text-sand-100'
                  : 'bg-white border border-sand-300 text-sand-600 hover:border-accent-gold'
                }`}
            >
              {anim.name}
            </button>
          ))}
        </div>

        {/* Description */}
        <p className="text-center text-sand-600 mb-8 italic">
          {ANIMATIONS.find((a) => a.id === active)?.desc}
        </p>

        {/* Spacer to allow scroll trigger */}
        <div className="h-40" />

        {/* Demo area */}
        <div className="min-h-[400px]">
          {active === 'fade-slide' && <FadeSlideDemo key="fade-slide" />}
          {active === 'parallax' && <ParallaxDemo key="parallax" />}
          {active === 'kanji-reveal' && <KanjiRevealDemo key="kanji-reveal" />}
          {active === 'counter' && <CounterDemo key="counter" />}
          {active === 'scale' && <ScaleDemo key="scale" />}
        </div>

        {/* Bottom spacer */}
        <div className="h-40" />
      </div>
    </div>
  )
}
