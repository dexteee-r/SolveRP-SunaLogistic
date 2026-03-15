'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Home, ChevronRight, FileText, Shield, Swords, AlertTriangle, ScrollText, Eye, Heart, Handshake, ShieldCheck, Sword, Scale } from 'lucide-react'

const tabs = [
  { id: 'code', label: 'Code Fondamental', icon: FileText },
  { id: 'devoirs', label: 'Devoirs du Shinobi', icon: Shield },
  { id: 'missions', label: 'Règles de Mission', icon: Swords },
  { id: 'sanctions', label: 'Sanctions', icon: AlertTriangle },
  { id: 'protocoles', label: 'Protocoles', icon: ScrollText },
]

const articles = [
  {
    numeral: 'I',
    title: 'Article 1. Loyauté au Village',
    content: 'Tout shinobi de Sunagakure doit placer les intérêts du village au-dessus de ses intérêts personnels. La loyauté envers le Kazekage et le village est la valeur suprême qui guide chaque action et décision.',
  },
  {
    numeral: 'II',
    title: 'Article 2. Protéger les secrets',
    content: 'Les techniques, stratégies et informations classifiées du village ne doivent jamais être divulguées à des entités extérieures. La trahison de cette règle est passible des sanctions les plus sévères.',
  },
  {
    numeral: 'III',
    title: 'Article 3. Respecter la hiérarchie',
    content: 'L\'obéissance à la chaîne de commandement est fondamentale. Les ordres d\'un supérieur doivent être exécutés avec diligence, sauf s\'ils contreviennent directement aux intérêts vitaux du village.',
  },
  {
    numeral: 'IV',
    title: 'Article 4. Servir avec honneur',
    content: 'Chaque mission doit être accomplie avec intégrité et professionnalisme. Un shinobi de Suna représente le village dans toutes ses actions, qu\'il soit en mission ou au repos.',
  },
  {
    numeral: 'V',
    title: 'Article 5. Compléter sa mission',
    content: 'Une fois acceptée, une mission doit être menée à terme. L\'abandon sans raison valable est considéré comme un acte de déshonneur. En cas d\'impossibilité, un rapport détaillé est obligatoire.',
  },
]

const devoirs = [
  { icon: Eye, title: 'Rapport continu', desc: 'Rapporter tout élément suspect au commandement sans délai.' },
  { icon: Heart, title: 'Maintenir la paix', desc: 'Préserver l\'harmonie au sein du village et avec les alliés.' },
  { icon: Shield, title: 'Protéger les civils', desc: 'La protection des habitants non-combattants est sacrée.' },
  { icon: Handshake, title: 'Maintenir les alliances', desc: 'Respecter les traités et accords avec les villages alliés.' },
  { icon: ShieldCheck, title: 'Vigilance', desc: 'Rester en alerte permanente face aux menaces extérieures.' },
  { icon: Sword, title: 'Défend Village', desc: 'Prendre les armes pour la défense du village si nécessaire.' },
]

const sanctions = [
  { level: 1, name: 'Avertissement', desc: 'Rappel à l\'ordre officiel inscrit au dossier du shinobi', color: 'bg-accent-gold/20 border-accent-gold text-accent-gold' },
  { level: 2, name: 'Rétrogradation', desc: 'Perte d\'un ou plusieurs grades avec période probatoire', color: 'bg-orange-100 border-orange-400 text-orange-700' },
  { level: 3, name: 'Emprisonnement', desc: 'Incarcération dans la prison souterraine de Suna', color: 'bg-red-100 border-red-400 text-red-700' },
  { level: 4, name: 'Exil', desc: 'Bannissement définitif du village et du Pays du Vent', color: 'bg-sand-900/10 border-sand-900 text-sand-900' },
]

export default function LoisPage() {
  const [activeTab, setActiveTab] = useState('code')

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <nav className="bg-sand-100 border-b border-sand-200 py-3">
        <div className="container-suna flex items-center gap-2 text-xs text-sand-500">
          <Link href="/" className="hover:text-sand-700 transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" /> Accueil
          </Link>
          <ChevronRight className="w-3 h-3 text-sand-300" />
          <span className="text-sand-700 font-semibold">Lois de Suna</span>
        </div>
      </nav>

      {/* Hero - Parchment style */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-sand-200 to-sand-100 overflow-hidden">
        {/* Parchment texture */}
        <div className="absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="container-suna relative z-10 text-center">
          <p className="text-6xl md:text-8xl font-display text-sand-800/20 mb-4 select-none">法律</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-sand-900 tracking-wider mb-4">
            LES LOIS DE SUNA
          </h1>
          <p className="text-sand-600 max-w-xl mx-auto">
            Le Code Shinobi du Village Caché du Sable
          </p>
        </div>
      </section>

      {/* Préambule */}
      <section className="section-padding bg-sand-50">
        <div className="container-suna max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl text-center text-sand-900 mb-8 tracking-wide">
            Préambule
          </h2>
          <div className="bg-white rounded-2xl border border-sand-200 p-8 md:p-12 shadow-sm">
            <p className="text-sand-700 leading-loose text-lg">
              <span className="font-display text-5xl float-left mr-3 mt-1 leading-none text-accent-gold">L</span>
              es lois du Village de Suna, établies par les premiers Kazekage, forment le socle immuable de notre
              société shinobi. Chaque citoyen, du plus humble Genin au Kazekage lui-même, est soumis à ces
              règles qui garantissent la paix, la justice et la prospérité de Sunagakure. Ces lois ont été transmises
              de génération en génération, adaptées aux défis de chaque époque mais toujours fidèles à l&apos;esprit
              du village que nos ancêtres ont bâti dans les sables du désert.
            </p>
            <p className="text-right text-sm text-sand-500 mt-6 italic">— Premier Kazekage</p>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="bg-sand-100/50 border-y border-sand-200 sticky top-20 z-30">
        <div className="container-suna">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all
                  ${activeTab === tab.id
                    ? 'bg-sand-900 text-sand-100'
                    : 'text-sand-600 hover:bg-sand-200'
                  }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="section-padding bg-sand-50">
        <div className="container-suna max-w-4xl">
          {/* Code Fondamental */}
          {activeTab === 'code' && (
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-sand-900 mb-10 tracking-wide">
                I. Code Fondamental
              </h2>
              <div className="space-y-8">
                {articles.map((article) => (
                  <div key={article.numeral} className="flex gap-6">
                    <span className="font-display text-4xl md:text-5xl text-sand-300/60 font-bold leading-none select-none min-w-[3rem] text-right">
                      {article.numeral}
                    </span>
                    <div className="border-l-2 border-sand-200 pl-6 pb-2">
                      <h3 className="font-display text-lg font-bold text-sand-800 mb-3">
                        {article.title}
                      </h3>
                      <p className="text-sand-600 leading-relaxed">{article.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Devoirs du Shinobi */}
          {activeTab === 'devoirs' && (
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-sand-900 mb-10 tracking-wide">
                II. Devoirs du Shinobi
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {devoirs.map((devoir) => (
                  <div key={devoir.title} className="card-suna p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-sand-100 flex items-center justify-center">
                      <devoir.icon className="w-6 h-6 text-sand-600" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-sand-800 mb-2">{devoir.title}</h3>
                    <p className="text-xs text-sand-500 leading-relaxed">{devoir.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Règles de Mission */}
          {activeTab === 'missions' && (
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-sand-900 mb-10 tracking-wide">
                III. Règles de Mission
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Acceptation', desc: 'Toute mission assignée par le bureau des missions doit être acceptée dans les 24 heures. Un refus doit être justifié par écrit au supérieur hiérarchique.' },
                  { title: 'Équipement', desc: 'Le shinobi est responsable de son équipement. Vérification obligatoire avant chaque départ. Le village fournit le matériel standard, les outils spécialisés sont à la charge de la division.' },
                  { title: 'Rapport de mission', desc: 'Un rapport détaillé doit être soumis dans les 48 heures suivant le retour. Il doit inclure : objectifs atteints, obstacles rencontrés, renseignements collectés et état de l\'équipe.' },
                  { title: 'Règle du sacrifice', desc: 'La mission prime sur l\'individu, mais la vie d\'un camarade n\'est jamais sacrifiable par commodité. Le Kazekage actuel a réformé cette règle ancestrale pour valoriser la vie de chaque shinobi.' },
                ].map((rule) => (
                  <div key={rule.title} className="bg-white rounded-xl border border-sand-200 p-6">
                    <h3 className="font-display text-base font-bold text-sand-800 mb-2">{rule.title}</h3>
                    <p className="text-sm text-sand-600 leading-relaxed">{rule.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sanctions */}
          {activeTab === 'sanctions' && (
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-sand-900 mb-10 tracking-wide">
                IV. Sanctions
              </h2>
              <div className="flex flex-col gap-4">
                {sanctions.map((s, i) => (
                  <div key={s.name} className="flex items-stretch gap-4">
                    <div className={`flex flex-col items-center justify-center w-20 shrink-0 rounded-xl border-2 ${s.color} p-3`}>
                      <span className="font-display text-xl font-bold">{s.level}</span>
                    </div>
                    <div className="flex-grow bg-white rounded-xl border border-sand-200 p-5">
                      <h3 className="font-display text-base font-bold text-sand-800 mb-1">{s.name}</h3>
                      <p className="text-sm text-sand-600">{s.desc}</p>
                    </div>
                    {i < sanctions.length - 1 && (
                      <div className="hidden md:flex items-center">
                        <ChevronRight className="w-5 h-5 text-sand-300 rotate-90 md:rotate-0" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Protocoles */}
          {activeTab === 'protocoles' && (
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-sand-900 mb-10 tracking-wide">
                V. Protocoles
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Protocole d\'Alerte Tempête', desc: 'En cas de tempête de sable de niveau 3 ou supérieur, tous les shinobis disponibles sont mobilisés pour la protection des civils. Le Corps Barrière prend le commandement tactique.' },
                  { title: 'Protocole d\'Invasion', desc: 'Activation immédiate de la barrière maximale. Évacuation des civils vers les abris souterrains. Déploiement des ANBU en première ligne. Communication chiffrée uniquement.' },
                  { title: 'Protocole Diplomatique', desc: 'Tout contact avec des shinobis étrangers doit être signalé. Les délégations sont escortées par minimum deux Chūnin. Aucune technique ne doit être démontrée sans autorisation.' },
                  { title: 'Protocole Médical d\'Urgence', desc: 'En cas de blessés multiples, le Corps Médical active le plan triage. Priorité aux cas critiques. Réquisition possible de tous les ninjas ayant des bases de ninjutsu médical.' },
                ].map((proto) => (
                  <div key={proto.title} className="bg-white rounded-xl border border-sand-200 p-6">
                    <h3 className="font-display text-base font-bold text-sand-800 mb-2">{proto.title}</h3>
                    <p className="text-sm text-sand-600 leading-relaxed">{proto.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Official Seal */}
      <section className="py-16 bg-sand-100/50">
        <div className="container-suna text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full border-4 border-accent-gold/30 flex items-center justify-center bg-sand-50">
              <Scale className="w-10 h-10 text-accent-gold" />
            </div>
            <p className="font-display text-sm text-sand-600 tracking-wider">
              Approuvé par le Conseil de Suna
            </p>
            <p className="text-xs text-sand-400">
              Scellé le 1er Septembre 2022
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
