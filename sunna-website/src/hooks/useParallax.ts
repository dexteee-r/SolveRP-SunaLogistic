'use client'

import { useEffect, useRef } from 'react'

export function useParallax<T extends HTMLElement>(speed: number = 0.3) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Only animate when element is in viewport
        if (rect.bottom > 0 && rect.top < windowHeight) {
          const scrolledPast = windowHeight - rect.top
          const offset = scrolledPast * speed
          el.style.transform = `translateY(${offset}px)`
        }

        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}
