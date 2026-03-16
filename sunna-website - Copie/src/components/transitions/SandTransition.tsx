'use client'

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// --- Context ---
interface TransitionContextType {
  navigateTo: (href: string) => void
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType>({
  navigateTo: () => {},
  isTransitioning: false,
})

export const useTransition = () => useContext(TransitionContext)

// --- Pre-render soft particle sprites on offscreen canvases ---
interface ParticleSprite {
  canvas: HTMLCanvasElement
  size: number
}

function createParticleSprite(size: number, r: number, g: number, b: number): ParticleSprite {
  const canvas = document.createElement('canvas')
  const padding = 2
  const totalSize = size + padding * 2
  canvas.width = totalSize
  canvas.height = totalSize
  const ctx = canvas.getContext('2d')!
  const center = totalSize / 2
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, size / 2)
  gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`)
  gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.5)`)
  gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.15)`)
  gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, totalSize, totalSize)
  return { canvas, size: totalSize }
}

// Sand color RGB values
const SAND_RGBS: [number, number, number][] = [
  [212, 165, 116], [201, 151, 90], [184, 134, 74], [224, 189, 147],
  [201, 162, 39], [166, 123, 61], [210, 180, 140], [222, 184, 135],
]

// --- Particle ---
interface Particle {
  x: number
  y: number
  spriteIndex: number
  speed: number
  opacity: number
  drift: number
}

function createParticles(width: number, height: number, count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: width + Math.random() * width,
    y: Math.random() * height,
    spriteIndex: Math.floor(Math.random() * SAND_RGBS.length * 3),
    speed: Math.random() * 10 + 5,
    opacity: Math.random() * 0.6 + 0.4,
    drift: (Math.random() - 0.5) * 2,
  }))
}

// --- Easing ---
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// --- Overlay Component ---
function TransitionOverlay({ phase, onComplete }: { phase: 'enter' | 'exit' | 'idle'; onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const spritesRef = useRef<ParticleSprite[]>([])
  const frameRef = useRef<number>(0)
  const progressRef = useRef(0)
  const [showSymbol, setShowSymbol] = useState(false)

  // Pre-render sprites once on mount
  useEffect(() => {
    const sprites: ParticleSprite[] = []
    const sizes = [4, 6, 10]
    for (const [r, g, b] of SAND_RGBS) {
      for (const size of sizes) {
        sprites.push(createParticleSprite(size, r, g, b))
      }
    }
    spritesRef.current = sprites
  }, [])

  useEffect(() => {
    if (phase === 'idle') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particleCount = Math.floor((canvas.width * canvas.height) / 200)
    progressRef.current = 0

    if (phase === 'enter') {
      particlesRef.current = createParticles(canvas.width, canvas.height, particleCount)
      setShowSymbol(false)
    } else {
      particlesRef.current = particlesRef.current.map((p) => ({
        ...p,
        x: Math.random() * canvas.width,
        speed: Math.random() * 10 + 5,
      }))
    }

    const totalFrames = phase === 'enter' ? 130 : 110
    let lastTime = performance.now()
    const sprites = spritesRef.current

    const animate = (now: number) => {
      const delta = Math.min((now - lastTime) / 16.67, 2)
      lastTime = now

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      progressRef.current += delta

      const rawProgress = Math.min(progressRef.current / totalFrames, 1)
      const progress = easeInOutCubic(rawProgress)

      if (phase === 'enter') {
        const curtainX = canvas.width * (1 - progress * 1.3)

        // Solid background — opaque quickly
        if (rawProgress > 0.08) {
          const fillOpacity = Math.min((rawProgress - 0.08) / 0.12, 1)
          ctx.fillStyle = `rgba(180, 130, 70, ${fillOpacity})`
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        // Draw particles using pre-rendered sprites
        if (sprites.length > 0) {
          particlesRef.current.forEach((p) => {
            p.x -= p.speed * (1 + progress * 3) * delta
            p.y += p.drift * delta

            if (p.x > curtainX - canvas.width * 0.5) {
              const sprite = sprites[p.spriteIndex % sprites.length]
              ctx.globalAlpha = p.opacity * Math.min(rawProgress * 2, 1)
              ctx.drawImage(sprite.canvas, (p.x - sprite.size / 2) | 0, (p.y - sprite.size / 2) | 0)
            }
          })
          ctx.globalAlpha = 1
        }

        if (rawProgress >= 0.7) setShowSymbol(true)

        if (rawProgress >= 1) {
          cancelAnimationFrame(frameRef.current)
          onComplete()
          return
        }
      } else {
        const remainingOpacity = Math.max(1 - progress * 1.1, 0)

        ctx.fillStyle = `rgba(180, 130, 70, ${remainingOpacity})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        if (sprites.length > 0) {
          particlesRef.current.forEach((p) => {
            p.x -= p.speed * (1 + progress * 4) * delta
            p.y += p.drift * (1 + progress) * delta

            if (p.x > -20) {
              const sprite = sprites[p.spriteIndex % sprites.length]
              ctx.globalAlpha = p.opacity * remainingOpacity
              ctx.drawImage(sprite.canvas, (p.x - sprite.size / 2) | 0, (p.y - sprite.size / 2) | 0)
            }
          })
          ctx.globalAlpha = 1
        }

        if (rawProgress > 0.2) setShowSymbol(false)

        if (rawProgress >= 1) {
          cancelAnimationFrame(frameRef.current)
          onComplete()
          return
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame((t) => { lastTime = t; animate(t) })

    return () => {
      cancelAnimationFrame(frameRef.current)
    }
  }, [phase, onComplete])

  if (phase === 'idle') return null

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${showSymbol ? 'opacity-100' : 'opacity-0'}`}>
        <Image
          src="/images/icons/sunagakure_symbole.png"
          alt="Sunagakure"
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20 drop-shadow-2xl"
        />
      </div>
    </div>
  )
}

// --- Provider ---
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<'enter' | 'exit' | 'idle'>('idle')
  const pendingHref = useRef<string | null>(null)
  const hasNavigated = useRef(false)
  const prevPathname = useRef(pathname)

  const navigateTo = useCallback((href: string) => {
    if (href === pathname || href === '#') return
    pendingHref.current = href
    hasNavigated.current = false
    setPhase('enter')

    setTimeout(() => {
      if (pendingHref.current && !hasNavigated.current) {
        hasNavigated.current = true
        router.push(pendingHref.current)
        pendingHref.current = null
      }
    }, 1300)
  }, [pathname, router])

  const handlePhaseComplete = useCallback(() => {
    if (phase === 'enter') {
      if (pendingHref.current && !hasNavigated.current) {
        hasNavigated.current = true
        router.push(pendingHref.current)
        pendingHref.current = null
      }
      setPhase('exit')
    } else if (phase === 'exit') {
      setPhase('idle')
    }
  }, [phase, router])

  useEffect(() => {
    if (pathname !== prevPathname.current && phase === 'idle') {
      prevPathname.current = pathname
    }
  }, [pathname, phase])

  return (
    <TransitionContext.Provider value={{ navigateTo, isTransitioning: phase !== 'idle' }}>
      {children}
      <TransitionOverlay phase={phase} onComplete={handlePhaseComplete} />
    </TransitionContext.Provider>
  )
}

// --- TransitionLink ---
export function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Link>) {
  const { navigateTo } = useTransition()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (onClick) onClick(e)
    navigateTo(href as string)
  }

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  )
}
