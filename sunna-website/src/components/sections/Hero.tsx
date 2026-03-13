import React from 'react'
import Button from '@/components/ui/Button'
import { ArrowDown, Wind } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-primary-light">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-suna-dawn rounded-full mix-blend-multiply filter blur-[150px] animate-pulse delay-1000" />
      </div>
      
      {/* Background Large Kanji */}
      <div className="absolute inset-0 opacity-10 z-0">
         <div className="w-full h-full flex items-center justify-center text-secondary/30 text-[40vw] font-serif leading-none select-none">
          砂
        </div>
      </div>

      <div className="container-custom relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in zoom-in duration-1000">
          <div className="flex flex-col items-center gap-4">
            <span className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-secondary border-2 border-secondary/20 rounded-full bg-white/10 backdrop-blur-sm">
              Sunagakure | L'Ombre du Vent
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-none tracking-tight">
            <span className="text-secondary drop-shadow-sm">Le Village </span>
            <br />
            <span className="text-primary-dark italic">du Sable</span>
          </h1>

          <p className="text-lg md:text-xl text-secondary/80 max-w-2xl mx-auto leading-relaxed">
            Bienvenue sur le portail officiel de Sunna. Entre traditions ancestrales shinobi et modernité municipale, découvrez le cœur battant du Pays du Vent.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <Button variant="primary" size="lg" className="px-10 h-16 shadow-xl hover:shadow-primary/20">
              Découvrir la Commune
            </Button>
            <Button variant="outline" size="lg" className="h-16 px-10 bg-white/20 backdrop-blur-sm hover:bg-white/40 border-secondary/20 text-secondary">
              Administration & Services
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-secondary/40 animate-bounce cursor-pointer group">
        <span className="text-[10px] uppercase tracking-[0.5em] group-hover:text-secondary transition-colors font-bold">Explorer</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  )
}
