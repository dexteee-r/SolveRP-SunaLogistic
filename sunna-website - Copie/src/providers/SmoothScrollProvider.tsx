'use client'

import { useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollContextType {
  progress: number
  mouse: { x: number; y: number }
}

export const ScrollContext = createContext<ScrollContextType>({
  progress: 0,
  mouse: { x: 0, y: 0 },
})

// Mutable shared state for R3F (avoids re-renders)
export const scrollState = {
  progress: 0,
  mouse: { x: 0, y: 0 },
}

export function useScrollState() {
  return useContext(ScrollContext)
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // Connect Lenis → GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Track scroll progress
    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      if (maxScroll > 0) {
        scrollState.progress = window.scrollY / maxScroll
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Track mouse
    const onMouseMove = (e: MouseEvent) => {
      scrollState.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      scrollState.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      lenis.destroy()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <>{children}</>
}
