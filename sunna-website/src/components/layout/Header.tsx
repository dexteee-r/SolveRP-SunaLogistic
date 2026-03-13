'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Wind } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Hiérarchie', href: '/hierarchie' },
    { name: 'Sections', href: '/sections' },
    { name: 'Lois de Suna', href: '/lois' },
    { name: 'Infos & Évènements', href: '/agenda' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-primary/20 shadow-lg">
      <div className="container-custom">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors border border-primary/20">
              <Wind className="w-8 h-8 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold text-white tracking-wider">Village de Sunna</span>
              <span className="text-[10px] text-primary/80 uppercase tracking-[0.3em] font-bold">L'Ombre du Vent</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-bold text-primary-light uppercase tracking-widest hover:text-accent transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
            <button className="p-2 text-primary-light hover:text-accent transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-primary-light hover:text-accent transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-24 left-0 w-full bg-secondary border-b border-primary/20 animate-in slide-in-from-top duration-300 shadow-2xl">
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-4 text-sm font-bold text-primary-light border-b border-white/5 last:border-0 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
