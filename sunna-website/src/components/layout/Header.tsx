'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { TransitionLink } from '@/components/transitions/SandTransition'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Hiérarchie', href: '/hierarchie' },
    { name: 'Sections & Divisions', href: '/sections' },
    { name: 'Lois de Suna', href: '/lois' },
    { name: 'Actualités', href: '/actualites' },
  ]

  const headerBg = isHome && !isScrolled
    ? 'bg-transparent'
    : 'bg-sand-900/95 backdrop-blur-md shadow-lg'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
      <div className="container-suna">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-20">
          {/* Logo */}
          <TransitionLink href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/icons/sunagakure_symbole.png"
              alt="Symbole de Sunagakure"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div className="flex flex-col">
              <span className="text-lg font-display font-bold text-sand-100 tracking-wider">
                SUNAGAKURE
              </span>
              <span className="text-[9px] text-sand-300 uppercase tracking-[0.25em]">
                Village de Suna
              </span>
            </div>
          </TransitionLink>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <TransitionLink
                key={link.name}
                href={link.href}
                className={`text-xs font-semibold uppercase tracking-widest transition-all relative group
                  ${pathname === link.href
                    ? 'text-accent-gold'
                    : 'text-sand-200 hover:text-sand-100'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-accent-gold transition-all
                  ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </TransitionLink>
            ))}
          </nav>

          {/* Right spacer (desktop) / Mobile Menu Toggle */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-sand-200 hover:text-sand-100 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-sand-900/98 backdrop-blur-lg border-t border-sand-700/30">
            <nav className="flex flex-col p-6 gap-1">
              {navLinks.map((link) => (
                <TransitionLink
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-4 text-sm font-semibold uppercase tracking-wider border-b border-sand-800/50 last:border-0 transition-colors
                    ${pathname === link.href
                      ? 'text-accent-gold'
                      : 'text-sand-200 hover:text-sand-100'
                    }`}
                >
                  {link.name}
                </TransitionLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
