'use client'

import { useEffect, useRef } from 'react'

interface ScrollRevealOptions {
  threshold?: number
  delay?: number
  duration?: number
  distance?: number
}

export function useScrollReveal<T extends HTMLElement>({
  threshold = 0.15,
  delay = 0,
  duration = 700,
  distance = 30,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Initial hidden state
    el.style.opacity = '0'
    el.style.transform = `translateY(${distance}px)`
    el.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, delay, duration, distance])

  return ref
}

// For multiple children with stagger
export function useScrollRevealGroup(selector: string, staggerMs = 100) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = container.querySelectorAll(selector)
    children.forEach((child, i) => {
      const el = child as HTMLElement
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = `opacity 700ms ease-out ${i * staggerMs}ms, transform 700ms ease-out ${i * staggerMs}ms`
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child) => {
            const el = child as HTMLElement
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          })
          observer.unobserve(container)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [selector, staggerMs])

  return containerRef
}

// Scale reveal for pyramid-like elements
export function useScrollRevealScale(selector: string, staggerMs = 150) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = container.querySelectorAll(selector)
    children.forEach((child, i) => {
      const el = child as HTMLElement
      el.style.opacity = '0'
      el.style.transform = 'scale(0.5)'
      el.style.transition = `opacity 600ms ease-out ${i * staggerMs}ms, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * staggerMs}ms`
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child) => {
            const el = child as HTMLElement
            el.style.opacity = '1'
            el.style.transform = 'scale(1)'
          })
          observer.unobserve(container)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [selector, staggerMs])

  return containerRef
}
