"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Star, ShieldChevron, UsersThree, Crosshair, GraduationCap } from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

const HIERARCHY_DATA = [
  {
    id: "kazekage",
    role: "Le Cinquième Kazekage",
    title: "L'Ombre du Vent",
    icon: Star,
    description:
      "Dirigeant suprême du village, le Kazekage est le shinobi le plus puissant. Il prend les décisions stratégiques, gère la diplomatie avec les autres grandes nations et protège tous les citoyens au péril de sa vie.",
    stats: [
      { label: "Autorité", value: "Absolue" },
      { label: "Objectif", value: "Prospérité & Paix" },
    ],
  },
  {
    id: "commandant-gounin",
    role: "Commandant Gounin",
    title: "Le Bras Droit du Kage",
    icon: ShieldChevron,
    description:
      "Bras droit du Kazekage et commandant suprême des forces militaires de Sunagakure. Il coordonne l'ensemble des opérations et assure le relais entre le Kazekage et les troupes sur le terrain.",
    stats: [
      { label: "Autorité", value: "Militaire suprême" },
      { label: "Rôle", value: "Commandement des forces" },
    ],
  },
  {
    id: "conseil",
    role: "Conseil du Vent",
    title: "Les Sages du Désert",
    icon: ShieldChevron,
    description:
      "Vétérans ayant servi avec distinction sous les précédents Kage. Ils consultent le Kazekage sur les affaires politiques, militaires et diplomatiques. Leur voix pèse lourd dans les décisions de crise.",
    stats: [
      { label: "Rôle", value: "Consultatif" },
      { label: "Influence", value: "Majeure" },
    ],
  },
  {
    id: "jonin",
    role: "Jōnin & Unités Spéciales",
    title: "L'Élite Militaire",
    icon: Crosshair,
    description:
      "Les ninjas les plus compétents du village. Ils dirigent les missions de rang S, commandent les unités spéciales et supervisent la formation des Genin. Ce rang inclut également les forces spéciales directement rattachées au Kazekage.",
    subDivisions: [
      { name: "ANBU", desc: "Forces spéciales d'élite, opérations secrètes." },
      { name: "Koan", desc: "Maîtres marionnettistes, division tactique." },
      { name: "Medical Corps", desc: "Ninjas médecins, soutien de terrain." },
    ],
  },
  {
    id: "chunin",
    role: "Chūnin",
    title: "Officiers Intermédiaires",
    icon: UsersThree,
    description:
      "Ayant prouvé leur leadership lors de l'examen Chūnin, ils dirigent des équipes et supervisent les missions de rang B et C. Ils sont l'épine dorsale des forces armées de Sunagakure.",
    stats: [
      { label: "Missions", value: "Rang B & C" },
      { label: "Responsabilité", value: "Chefs d'escouade" },
    ],
  },
  {
    id: "tokubetsu-jonin",
    role: "Tokubetsu Jōnin",
    title: "Spécialistes d'Élite",
    icon: Crosshair,
    description:
      "Ninjas ayant atteint un niveau d'expertise exceptionnel dans un domaine spécifique sans pour autant posséder toutes les compétences d'un Jōnin complet. Leur spécialisation en fait des atouts irremplaçables pour les missions requérant une expertise pointue.",
    stats: [
      { label: "Rang", value: "Jōnin spécialisé" },
      { label: "Missions", value: "Rang A (spécialité)" },
    ],
  },
  {
    id: "genin",
    role: "Genin",
    title: "Aspirants Ninja",
    icon: GraduationCap,
    description:
      "Diplômés de l'Académie, organisés en équipes de trois sous la tutelle d'un Jōnin. Ils effectuent des missions de rang D (travaux manuels, aide au village) pour forger leur esprit d'équipe.",
    stats: [
      { label: "Formation", value: "Continue" },
      { label: "Missions", value: "Rang D" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// Composant isolé pour garantir 60fps sans re-render du parent
function ParallaxIcon({ Icon }: { Icon: PhosphorIcon }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [25, -25]);
  const rotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-15, 15]);

  return (
    <div
      ref={containerRef}
      className="w-16 h-16 rounded-full bg-stone-200/50 flex items-center justify-center mb-4 border border-stone-300 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)] overflow-hidden relative"
    >
      <motion.div
        style={{ y, rotate }}
        className="text-stone-800 drop-shadow-sm"
      >
        <Icon weight="duotone" className="w-8 h-8" />
      </motion.div>
    </div>
  );
}

export default function HierarchyScroll() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-24">
      <div className="flex flex-col gap-32">
        {HIERARCHY_DATA.map((rank) => (
          <motion.div
            key={rank.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
          >
            {/* Colonne de Gauche : Sticky Header */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-4"
            >
              <ParallaxIcon Icon={rank.icon} />
              <h2 className="text-sm font-mono tracking-widest text-amber-700 uppercase">
                {rank.title}
              </h2>
              <h3 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
                {rank.role}
              </h3>
            </motion.div>

            {/* Colonne de Droite : Contenu et Détails */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-8 flex flex-col gap-8 pt-2 lg:pt-14"
            >
              <p className="text-lg text-stone-600 leading-relaxed max-w-[65ch]">
                {rank.description}
              </p>

              {/* Statistiques */}
              {rank.stats && (
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-stone-300/50">
                  {rank.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                        {stat.label}
                      </span>
                      <span className="text-lg font-medium text-stone-900">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Divisions spéciales (Bento minimaliste) */}
              {rank.subDivisions && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-stone-300/50">
                  {rank.subDivisions.map((sub, i) => (
                    <div
                      key={i}
                      className="p-5 bg-stone-100/50 border border-stone-200 rounded-xl hover:bg-stone-100 transition-colors duration-300"
                    >
                      <h4 className="text-stone-900 font-serif text-lg mb-1">
                        {sub.name}
                      </h4>
                      <p className="text-sm text-stone-600 leading-relaxed">
                        {sub.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
