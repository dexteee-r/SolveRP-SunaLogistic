'use client'

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// WebGL particle storm — loaded client-side only (Three.js can't run on the server)
const SandStorm = dynamic(() => import('./SandStorm'), { ssr: false })

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
        <SandStorm phase={phase} />
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
          width={160}
          height={160}
          className="w-32 h-32 md:w-40 md:h-40 drop-shadow-[0_0_30px_rgba(180,130,70,0.7)]"
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
