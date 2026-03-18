import { TransitionLink } from '@/components/transitions/SandTransition'
import { Home, ChevronRight } from 'lucide-react'
import HierarchyScroll from '@/components/sections/HierarchyScroll'

export default function HierarchiePage() {
  return (
    <div className="pt-20" style={{ backgroundColor: '#f4e5cc' }}>
      {/* Breadcrumb */}
      <nav className="border-b border-sand-300/30 py-3">
        <div className="container-suna flex items-center gap-2 text-xs text-sand-500">
          <TransitionLink href="/" className="hover:text-sand-700 transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Accueil
          </TransitionLink>
          <ChevronRight className="w-3 h-3 text-sand-300" />
          <span className="text-sand-700 font-semibold">Hiérarchie</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/sunagakure_desert-pov_1.jpg)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(244,229,204,0.8), rgba(244,229,204,0.6), #f4e5cc)' }} />

        <div className="container-suna relative z-10 text-center">
          <p className="text-6xl md:text-8xl font-display text-sand-800/20 mb-4 select-none">組織</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-sand-900 tracking-wider mb-4">
            HIÉRARCHIE
          </h1>
          <p className="text-sand-600 max-w-xl mx-auto">
            Missions et responsabilités du Village Caché du Sable
          </p>
        </div>
      </section>

      {/* Contenu principal — Sticky Scroll Asymétrique */}
      <HierarchyScroll />
    </div>
  )
}
