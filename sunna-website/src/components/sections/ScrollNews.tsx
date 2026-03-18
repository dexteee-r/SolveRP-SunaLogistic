"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Circle } from "@phosphor-icons/react";
import { ChevronDown } from "lucide-react";

const RECENT_NEWS = [
  {
    id: "01",
    date: "12 MARS 2026",
    title: "La Voie du Vent : Défis et Triomphes de la Nouvelle Génération",
    excerpt:
      "Un regard approfondi sur les accomplissements exceptionnels de la promotion 2026 de l'Académie Ninja. Entre traditions ancestrales et innovations techniques, cette nouvelle génération redéfinit ce que signifie porter le bandeau du sable.",
  },
  {
    id: "02",
    date: "10 MARS 2026",
    title: "Suna et Konoha Renouvellent le Pacte d'Alliance",
    excerpt:
      "Les deux villages renforcent leur coopération militaire et médicale pour une nouvelle ère de paix durable. Le traité a été signé en présence des deux Kage lors d'une cérémonie au sommet.",
  },
  {
    id: "03",
    date: "08 MARS 2026",
    title: "Nouvelle Unité de Reconnaissance Déployée en Zone Frontière",
    excerpt:
      "Le Kazekage autorise le déploiement d'une unité spéciale aux confins du Pays du Vent. L'opération vise à sécuriser les routes commerciales face aux menaces croissantes.",
  },
  {
    id: "04",
    date: "05 MARS 2026",
    title: "Examen Chūnin : Résultats et Nouveaux Promus",
    excerpt:
      "Quinze Genin obtiennent leur promotion après un examen particulièrement exigeant cette année. Le Conseil salue le niveau de compétence et la détermination des candidats.",
  },
];

const OLDER_NEWS = [
  {
    id: "05",
    date: "03 MARS 2026",
    title: "Célébration Annuelle du Festival du Sable",
    excerpt:
      "Le village se prépare pour le plus grand événement culturel et festif de l'année. Trois jours de célébrations, de démonstrations martiales et de spectacles de marionnettes.",
  },
  {
    id: "06",
    date: "01 MARS 2026",
    title: "Portrait de la Brigade des Marionnettistes : Tradition et Innovation",
    excerpt:
      "Comment l'art ancestral du Kugutsu évolue avec les nouvelles techniques de combat modernes. Une plongée au cœur de la division la plus emblématique de Suna.",
  },
  {
    id: "07",
    date: "28 FÉV 2026",
    title: "Mission de Rang S Accomplie avec Succès",
    excerpt:
      "Une équipe d'élite revient d'une mission critique aux confins du Pays de la Terre. Les détails restent classifiés par ordre du Kazekage.",
  },
  {
    id: "08",
    date: "22 FÉV 2026",
    title: "Renforcement de la Barrière Sensorielle du Village",
    excerpt:
      "Le Corps Barrière déploie un nouveau système de détection qui étend le périmètre de surveillance de 40%. Une avancée majeure pour la sécurité de Sunagakure.",
  },
];

// Le parchemin se déroule vers le bas via scaleY (origin-top)
const unrollVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren" as const,
      staggerChildren: 0.18,
      delayChildren: 0.4,
    },
  },
};

// Les textes apparaissent en cascade après le déroulement
const itemVariants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// Anciennes actus qui apparaissent en cascade
const olderItemVariants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: i * 0.15,
    },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

// Le rouleau du bas tombe avec le déroulement
const jikuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.0,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function NewsArticle({ item, isLast }: { item: typeof RECENT_NEWS[0]; isLast: boolean }) {
  return (
    <div className={`relative pb-12 ${!isLast ? "border-b border-stone-200" : ""}`}>
      {/* Lien interactif avec gestion du Hover et du Focus (Accessibilité) */}
      <motion.a
        href={`/chroniques/${item.id}`}
        className="block group outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-sm"
        whileHover="hover"
        whileFocus="hover"
        initial="rest"
        animate="rest"
      >
        {/* Bloc de contenu qui se décale physiquement */}
        <motion.div
          variants={{
            rest: { x: 0 },
            hover: {
              x: 12,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            },
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Circle
              weight="fill"
              className="text-red-700 w-2 h-2 transition-transform duration-300 group-hover:scale-125"
            />
            <time className="text-xs sm:text-sm font-mono tracking-widest text-red-700 uppercase">
              {item.date}
            </time>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif text-stone-900 mb-3 leading-snug transition-colors duration-300 group-hover:text-black">
            {item.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-[65ch]">
            {item.excerpt}
          </p>
        </motion.div>
      </motion.a>
    </div>
  );
}

export default function ScrollNews() {
  const [started, setStarted] = useState(false);
  const [showOlder, setShowOlder] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 1480);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-stone-100 min-h-[100dvh] flex flex-col items-center pt-8 pb-24 px-4 overflow-hidden">

      {/* Corde de suspension (Kakeo) */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        width="120"
        height="40"
        viewBox="0 0 120 40"
        className="text-stone-500 mb-[-2px]"
      >
        <path d="M0,40 L60,0 L120,40" stroke="currentColor" strokeWidth="2" fill="none" />
      </motion.svg>

      {/* Conteneur fixe pour la baguette supérieure */}
      <div className="flex flex-col items-center w-full max-w-4xl">

        {/* Baguette supérieure en bois (Ten) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full h-4 bg-gradient-to-r from-stone-800 via-stone-600 to-stone-800 rounded-t-sm shadow-[0_5px_15px_rgba(0,0,0,0.2)] z-20 relative"
        />

        {/* Le corps du parchemin qui se déroule vers le bas */}
        <motion.div
          variants={unrollVariants}
          initial="hidden"
          animate={started ? "visible" : "hidden"}
          className="w-[94%] origin-top"
        >
          {/* Tissu de bordure extérieur (Hyousou) */}
          <div className="bg-[#d6d3d1] p-4 sm:p-8 md:p-12 shadow-2xl relative border-x border-stone-400">

            {/* Liseré interne tissu/papier */}
            <div className="bg-[#e7e5e4] p-1 sm:p-3 border border-stone-300 shadow-inner">

              {/* Le Papier Central (Honshi) */}
              <div className="bg-[#FAF9F6] shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] p-6 sm:p-12 md:p-16 relative">

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight mb-16 text-center"
                >
                  Chroniques
                </motion.h1>

                {/* Actualités récentes */}
                <div className="flex flex-col gap-12">
                  {RECENT_NEWS.map((item, index) => (
                    <motion.article key={item.id} variants={itemVariants}>
                      <NewsArticle
                        item={item}
                        isLast={!showOlder && index === RECENT_NEWS.length - 1}
                      />
                    </motion.article>
                  ))}
                </div>

                {/* Anciennes actualités */}
                <AnimatePresence>
                  {showOlder && (
                    <div className="flex flex-col gap-12 mt-12">
                      {OLDER_NEWS.map((item, index) => (
                        <motion.article
                          key={item.id}
                          custom={index}
                          variants={olderItemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <NewsArticle
                            item={item}
                            isLast={index === OLDER_NEWS.length - 1}
                          />
                        </motion.article>
                      ))}
                    </div>
                  )}
                </AnimatePresence>

                {/* Flèche vers le bas */}
                <motion.div variants={itemVariants} className="mt-12 flex justify-center">
                  <button
                    onClick={() => setShowOlder(!showOlder)}
                    className="group flex flex-col items-center gap-2 text-stone-400 hover:text-red-700 transition-colors duration-300"
                  >
                    <span className="text-xs font-mono tracking-widest uppercase">
                      {showOlder ? "Masquer les archives" : "Anciennes chroniques"}
                    </span>
                    <motion.div
                      animate={{
                        y: [0, 6, 0],
                        rotate: showOlder ? 180 : 0,
                      }}
                      transition={{
                        y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                        rotate: { duration: 0.3 },
                      }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* Rouleau inférieur lourd (Jiku) */}
        <motion.div
          variants={jikuVariants}
          initial="hidden"
          animate={started ? "visible" : "hidden"}
          className="w-full h-8 bg-gradient-to-r from-stone-800 via-stone-600 to-stone-800 shadow-[0_20px_40px_rgba(0,0,0,0.3)] z-20 relative flex items-center justify-between rounded-full mt-[-2px]"
        >
          <div className="w-4 h-10 bg-stone-900 rounded-l-full -ml-2 border-r border-stone-700" />
          <div className="w-4 h-10 bg-stone-900 rounded-r-full -mr-2 border-l border-stone-700" />
        </motion.div>

      </div>
    </section>
  );
}
