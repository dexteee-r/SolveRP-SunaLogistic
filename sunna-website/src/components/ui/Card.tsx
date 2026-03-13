import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Wind } from 'lucide-react'

interface CardProps {
  title: string
  description: string
  image?: string
  category?: string
  date?: string
  href: string
}

export default function Card({ title, description, image, category, date, href }: CardProps) {
  return (
    <Link 
      href={href} 
      className="group flex flex-col bg-white rounded-2xl border border-secondary/10 overflow-hidden hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 relative"
    >
      {image && (
        <div className="relative aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-primary/20 animate-pulse" />
          <div className="w-full h-full bg-secondary-light/30 flex items-center justify-center text-primary/40 group-hover:scale-110 transition-transform duration-700">
            <Wind className="w-16 h-16 opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent" />
          </div>
          {category && (
            <span className="absolute top-4 left-4 px-4 py-1.5 bg-primary text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-lg shadow-lg">
              {category}
            </span>
          )}
        </div>
      )}
      <div className="p-8 flex flex-col flex-grow relative">
        {date && <time className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest mb-3 block">{date}</time>}
        <h3 className="text-xl font-serif font-bold text-secondary mb-4 group-hover:text-primary-dark transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-sm text-secondary/60 leading-relaxed mb-8 flex-grow font-medium">
          {description}
        </p>
        <div className="flex items-center gap-3 text-xs font-bold text-primary-dark group-hover:gap-5 transition-all uppercase tracking-widest">
          Consulter le dossier <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}
