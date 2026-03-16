'use client'

import React, { createContext, useContext, useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

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

// ============================================================
// WebGL Sand Storm Particles
// ============================================================
const PARTICLE_COUNT = 15000

function SandParticles({ phase }: { phase: 'enter' | 'exit' | 'idle' }) {
  const meshRef = useRef<THREE.Points>(null)
  const startTimeRef = useRef(0)
  const hasReset = useRef(false)

  const [positions, velocities, randoms] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const vel = new Float32Array(PARTICLE_COUNT * 3)
    const rnd = new Float32Array(PARTICLE_COUNT)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread across viewport space
      pos[i * 3]     = (Math.random() - 0.5) * 12      // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8       // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3       // z depth

      // Wind velocity — predominantly horizontal with vertical turbulence
      vel[i * 3]     = Math.random() * 0.06 + 0.02      // x speed (wind)
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.025    // y turbulence
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01     // z drift

      rnd[i] = Math.random() * Math.PI * 2               // phase offset
    }
    return [pos, vel, rnd]
  }, [])

  // Reset particle positions when transition starts
  useEffect(() => {
    if (phase !== 'idle') {
      hasReset.current = false
      startTimeRef.current = 0
    }
  }, [phase])

  useFrame((state) => {
    if (phase === 'idle' || !meshRef.current) return

    const geo = meshRef.current.geometry
    const posAttr = geo.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    const t = state.clock.elapsedTime

    if (!hasReset.current) {
      startTimeRef.current = t
      hasReset.current = true
      // Reset positions to spread evenly
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        arr[i * 3]     = (Math.random() - 0.5) * 12
        arr[i * 3 + 1] = (Math.random() - 0.5) * 8
        arr[i * 3 + 2] = (Math.random() - 0.5) * 3
      }
    }

    const elapsed = t - startTimeRef.current

    if (phase === 'enter') {
      // Sand storm blowing in — particles rush from right to left
      const intensity = Math.min(elapsed * 2.5, 1) // ramp up quickly
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        arr[i3]     -= velocities[i3] * intensity * 3
        arr[i3 + 1] += Math.sin(t * 3 + randoms[i]) * 0.012 * intensity
        arr[i3 + 2] += Math.cos(t * 2 + randoms[i] * 2) * 0.005

        // Wrap particles that go off-screen
        if (arr[i3] < -7) arr[i3] = 7 + Math.random() * 2
      }
    } else if (phase === 'exit') {
      // Sand disperses — particles drift away in all directions
      const intensity = Math.min(elapsed * 2, 1)
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        const angle = randoms[i]
        arr[i3]     += Math.cos(angle) * velocities[i3] * intensity * 4
        arr[i3 + 1] += Math.sin(angle) * 0.03 * intensity + Math.sin(t * 4 + randoms[i]) * 0.008
        arr[i3 + 2] += velocities[i3 + 2] * intensity * 2
      }
    }

    posAttr.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#C2A378"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

// ============================================================
// Transition Overlay
// ============================================================
function SandOverlay({ phase, onComplete }: { phase: 'enter' | 'exit' | 'idle'; onComplete: () => void }) {
  const [showSymbol, setShowSymbol] = useState(false)

  useEffect(() => {
    if (phase === 'idle') return

    if (phase === 'enter') {
      setShowSymbol(false)
      const symbolTimer = setTimeout(() => setShowSymbol(true), 450)
      const completeTimer = setTimeout(() => onComplete(), 900)
      return () => {
        clearTimeout(symbolTimer)
        clearTimeout(completeTimer)
      }
    }

    if (phase === 'exit') {
      const hideTimer = setTimeout(() => setShowSymbol(false), 200)
      const completeTimer = setTimeout(() => onComplete(), 950)
      return () => {
        clearTimeout(hideTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [phase, onComplete])

  if (phase === 'idle') return null

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Solid sand background — fully opaque to hide page load */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #8B7355, #B4824A, #C2A378, #D2B48C)',
        }}
      />

      {/* WebGL particle storm */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: false }}
        >
          <SandParticles phase={phase} />
        </Canvas>
      </div>

      {/* Sunagakure symbol — spring entrance */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{
          opacity: showSymbol ? 1 : 0,
          transform: showSymbol ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-25deg)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <Image
          src="/images/icons/sunagakure_symbole.png"
          alt="Sunagakure"
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_30px_rgba(180,130,70,0.7)]"
        />
      </div>
    </div>
  )
}

// ============================================================
// Provider
// ============================================================
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

    // Safety timeout
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
      <SandOverlay phase={phase} onComplete={handlePhaseComplete} />
    </TransitionContext.Provider>
  )
}

// ============================================================
// TransitionLink
// ============================================================
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
