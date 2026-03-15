import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TransitionLink } from '@/components/transitions/SandTransition'

const footerSections = [
  {
    title: 'Sections du village',
    links: [
      { name: 'Hiérarchie', href: '/hierarchie' },
      { name: 'Sections & Divisions', href: '/sections' },
      { name: 'Lois de Suna', href: '/lois' },
      { name: 'Actualités', href: '/actualites' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { name: 'Devenir Shinobi', href: '#' },
      { name: 'Archives', href: '/actualites' },
      { name: 'Code Shinobi', href: '/lois' },
      { name: 'Carte du village', href: '#' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { name: 'Mentions légales', href: '#' },
      { name: 'Politique de confidentialité', href: '#' },
      { name: 'Conditions d\'utilisation', href: '#' },
    ],
  },
]

export default function Footer({ noBgImage = false, bgColor }: { noBgImage?: boolean; bgColor?: string }) {
  const isLight = !!bgColor

  return (
    <footer
      className={`relative overflow-hidden ${noBgImage ? '' : 'bg-cover bg-center'}`}
      style={{
        ...(noBgImage ? undefined : { backgroundImage: 'url(/images/sunagakure_banderole_footer_1.jpg)' }),
        ...(bgColor ? { backgroundColor: bgColor } : {}),
      }}
    >
      {/* Top decorative border */}
      <div className={`h-1 bg-gradient-to-r ${isLight ? 'from-transparent via-accent-gold to-transparent' : 'from-sand-900 via-accent-gold to-sand-900'}`} />

      <div className="container-suna py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/icons/sunagakure_symbole.png"
                alt="Symbole de Sunagakure"
                width={32}
                height={32}
                className={`w-8 h-8 ${isLight ? '' : 'invert brightness-200'}`}
              />
              <span className={`font-display text-lg tracking-wider ${isLight ? 'text-sand-900' : 'text-sand-100'}`}>
                SUNAGAKURE
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-sand-600' : 'text-sand-200'}`}>
              Portail officiel du Village Caché du Sable. Forgés par le vent,
              sculptés par le sable, unis par la volonté.
            </p>
            {/* Social links */}
            <div className="flex gap-4 pt-2">
              {['Discord', 'Twitter', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs
                    hover:border-accent-gold hover:text-accent-gold transition-colors
                    ${isLight ? 'border-sand-400 text-sand-600' : 'border-sand-300/30 text-sand-200'}`}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-5">
              <h3 className={`font-display text-sm uppercase tracking-wider ${isLight ? 'text-sand-900' : 'text-sand-100'}`}>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <TransitionLink
                      href={link.href}
                      className={`text-sm transition-colors ${isLight ? 'text-sand-600 hover:text-sand-900' : 'text-sand-200 hover:text-white'}`}
                    >
                      {link.name}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`border-t ${isLight ? 'border-sand-300/40' : 'border-sand-800'}`}>
        <div className="container-suna py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`text-xs ${isLight ? 'text-sand-500' : 'text-sand-300'}`}>
            &copy; {new Date().getFullYear()} Sunagakure no Sato &mdash; Village Caché du Sable
          </p>
          <p className={`text-xs ${isLight ? 'text-sand-400' : 'text-sand-300'}`}>
            砂隠れの里
          </p>
        </div>
      </div>
    </footer>
  )
}
