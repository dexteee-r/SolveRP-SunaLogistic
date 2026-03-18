import { Eye, Heart, Puzzle, GraduationCap, Search, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Division {
  number: string
  slug: string
  name: string
  fullName: string
  desc: string
  icon: LucideIcon
  color: string
  bgColor: string
  iconColor: string
  badge: string
  details: {
    mission: string
    specialites: string[]
    effectif: string
    directeur: string
    histoire: string
  }
}

export const divisions: Division[] = [
  {
    number: '1',
    slug: 'anbu',
    name: 'ANBU',
    fullName: 'Forces Spéciales ANBU',
    desc: 'L\'unité d\'élite opérant dans l\'ombre. Les ANBU exécutent les missions les plus dangereuses : assassinats ciblés, espionnage infiltré et protection rapprochée du Kazekage. Leur identité est un secret absolu.',
    icon: Eye,
    color: 'border-division-anbu',
    bgColor: 'bg-division-anbu/5',
    iconColor: 'text-division-anbu',
    badge: 'bg-division-anbu text-sand-100',
    details: {
      mission: 'Les ANBU sont les agents de l\'ombre de Sunagakure. Directement sous les ordres du Kazekage, ils mènent des opérations classifiées allant de la reconnaissance en territoire ennemi à l\'élimination de menaces critiques. Chaque membre porte un masque animal et abandonne son identité civile lors des missions.',
      specialites: [
        'Assassinat et élimination ciblée',
        'Espionnage et infiltration profonde',
        'Protection rapprochée du Kazekage',
        'Contre-espionnage et interrogatoire',
        'Opérations en zone hostile',
      ],
      effectif: 'Classifié — estimation : 40-60 agents actifs',
      directeur: 'Commandant ANBU (identité classifiée)',
      histoire: 'Fondées par le Deuxième Kazekage, les Forces ANBU de Suna ont été restructurées après la Quatrième Grande Guerre Ninja. Sous l\'impulsion du Kazekage actuel, l\'unité a adopté une doctrine de précision plutôt que de force brute, réduisant les pertes en mission de 60%.',
    },
  },
  {
    number: '2',
    slug: 'corps-medical',
    name: 'Corps Médical',
    fullName: 'Division Médicale de Suna',
    desc: 'Les ninjas médecins sont la colonne vertébrale du village. Spécialisés dans le ninjutsu médical et l\'antidote aux poisons du désert, ils soignent les blessés sur le terrain et gèrent l\'hôpital central de Suna.',
    icon: Heart,
    color: 'border-division-medical',
    bgColor: 'bg-division-medical/5',
    iconColor: 'text-division-medical',
    badge: 'bg-division-medical text-white',
    details: {
      mission: 'La Division Médicale assure la santé de tous les habitants de Sunagakure, civils comme shinobis. Ses membres sont formés au ninjutsu médical avancé et à la médecine traditionnelle du désert. Le Corps gère l\'hôpital central, les postes de soins avancés et les laboratoires de recherche en antidotes.',
      specialites: [
        'Ninjutsu médical avancé et chirurgie de terrain',
        'Recherche et développement d\'antidotes',
        'Médecine des poisons du désert',
        'Soutien médical en mission',
        'Formation des futurs médecins-ninjas',
      ],
      effectif: '~120 membres dont 30 chirurgiens de terrain',
      directeur: 'Directeur du Corps Médical',
      histoire: 'Inspirée par les enseignements de Chiyo-basama, la Division Médicale de Suna a longtemps été spécialisée dans les poisons et antidotes. Aujourd\'hui, elle rivalise avec la division médicale de Konoha grâce à des échanges de connaissances instaurés par le traité d\'alliance.',
    },
  },
  {
    number: '3',
    slug: 'koan',
    name: 'Koan',
    fullName: 'Division Koan',
    desc: 'Tradition unique de Sunagakure. Les marionnettistes utilisent le Kugutsu no Jutsu pour contrôler des marionnettes de combat. Cet art ancestral fait la fierté et la force militaire distinctive de notre village.',
    icon: Puzzle,
    color: 'border-division-puppet',
    bgColor: 'bg-division-puppet/5',
    iconColor: 'text-division-puppet',
    badge: 'bg-division-puppet text-white',
    details: {
      mission: 'La division Koan perpétue l\'art ancestral du Kugutsu no Jutsu, technique de combat exclusive à Sunagakure. Ses membres conçoivent, entretiennent et manient des marionnettes de combat sophistiquées. La division sert à la fois d\'unité offensive et de centre de recherche en ingénierie ninja.',
      specialites: [
        'Kugutsu no Jutsu — contrôle de marionnettes',
        'Conception et fabrication de marionnettes de combat',
        'Mécanismes à poison et pièges cachés',
        'Combat à distance stratégique',
        'Ingénierie ninja et prototypes',
      ],
      effectif: '~45 marionnettistes actifs dont 8 maîtres artisans',
      directeur: 'Directeur de la Division Koan',
      histoire: 'L\'art des marionnettes de Suna remonte aux origines du village. Perfectionné par des maîtres comme Sasori du Sable Rouge et Chiyo, cet art a connu un renouveau sous la direction de Kankurō. La Brigade intègre aujourd\'hui des technologies modernes à la tradition ancestrale.',
    },
  },
  {
    number: '4',
    slug: 'academie',
    name: 'Académie Ninja',
    fullName: 'Académie de Formation Shinobi',
    desc: 'L\'académie forme la prochaine génération de shinobis. Du taijutsu de base aux techniques spécialisées du désert, chaque aspirant y apprend les fondamentaux avant de devenir Genin.',
    icon: GraduationCap,
    color: 'border-division-academy',
    bgColor: 'bg-division-academy/5',
    iconColor: 'text-division-academy',
    badge: 'bg-division-academy text-white',
    details: {
      mission: 'L\'Académie Ninja de Sunagakure est le creuset où se forgent les futurs shinobis du village. Les instructeurs, tous vétérans expérimentés, enseignent les arts fondamentaux du combat, la survie en milieu désertique et les valeurs du village. L\'académie identifie aussi les aptitudes spéciales des élèves pour les orienter vers la division appropriée.',
      specialites: [
        'Formation au taijutsu, ninjutsu et genjutsu de base',
        'Survie en environnement désertique',
        'Techniques de camouflage et embuscade dans le sable',
        'Théorie stratégique et tactique',
        'Évaluation des aptitudes et orientation',
      ],
      effectif: '~25 instructeurs, 150-200 élèves par promotion',
      directeur: 'Directeur de l\'Académie Ninja',
      histoire: 'L\'Académie a été réformée en profondeur après l\'alliance avec Konoha. Le nouveau programme intègre des échanges inter-villages et met l\'accent sur le travail d\'équipe plutôt que la compétition individuelle. Le taux de réussite à l\'examen Genin a augmenté de 35% depuis ces réformes.',
    },
  },
  {
    number: '5',
    slug: 'renseignements',
    name: 'Renseignements',
    fullName: 'Division du Renseignement',
    desc: 'Le réseau d\'intelligence de Suna. Collecte d\'informations, contre-espionnage, analyse stratégique et déchiffrement de codes ennemis. Leurs rapports guident les décisions du Kazekage.',
    icon: Search,
    color: 'border-division-intelligence',
    bgColor: 'bg-division-intelligence/5',
    iconColor: 'text-division-intelligence',
    badge: 'bg-division-intelligence text-white',
    details: {
      mission: 'La Division du Renseignement est les yeux et les oreilles de Sunagakure au-delà de ses murs. Ses agents opèrent un réseau d\'informateurs à travers le continent, analysent les menaces potentielles et fournissent au Kazekage les données nécessaires à la prise de décision stratégique. La division travaille en étroite collaboration avec les ANBU.',
      specialites: [
        'Collecte d\'informations et réseau d\'informateurs',
        'Contre-espionnage et sécurité interne',
        'Analyse stratégique et géopolitique',
        'Cryptographie et déchiffrement',
        'Surveillance des frontières à distance',
      ],
      effectif: '~80 analystes et agents de terrain',
      directeur: 'Directeur de la Division du Renseignement',
      histoire: 'Longtemps considérée comme secondaire par rapport aux forces de combat, la Division du Renseignement a prouvé sa valeur lors de la Quatrième Grande Guerre en détectant des mouvements ennemis critiques. Depuis, son budget et ses effectifs ont doublé.',
    },
  },
  {
    number: '6',
    slug: 'corps-barriere',
    name: 'Corps Barrière',
    fullName: 'Division de Détection et Barrière',
    desc: 'Gardiens du village, ils maintiennent la barrière de détection sensorielle qui protège Sunagakure. Spécialisés en fūinjutsu et ninjutsu sensoriel, ils sont la première ligne de défense.',
    icon: ShieldCheck,
    color: 'border-division-barrier',
    bgColor: 'bg-division-barrier/5',
    iconColor: 'text-division-barrier',
    badge: 'bg-division-barrier text-sand-900',
    details: {
      mission: 'Le Corps Barrière maintient en permanence le bouclier sensoriel qui enveloppe Sunagakure. Ce réseau de détection, alimenté par le chakra de ses membres en rotation continue, détecte toute intrusion dans un rayon de plusieurs kilomètres. Le Corps est aussi responsable des sceaux de protection et des systèmes d\'alerte du village.',
      specialites: [
        'Maintien de la barrière sensorielle 24h/24',
        'Fūinjutsu défensif et sceaux de protection',
        'Ninjutsu sensoriel longue portée',
        'Systèmes d\'alerte et protocoles d\'évacuation',
        'Renforcement des fortifications du village',
      ],
      effectif: '~60 membres en rotation sur 3 équipes',
      directeur: 'Directeur du Corps Barrière',
      histoire: 'Le Corps Barrière a été fondé après une attaque surprise dévastatrice sur le village dans les premières années de son existence. Depuis, aucun ennemi n\'a franchi la barrière sans être détecté. Le système actuel est le plus sophistiqué de tous les villages cachés.',
    },
  },
]

export function getDivisionBySlug(slug: string): Division | undefined {
  return divisions.find(d => d.slug === slug)
}

export const directors = [
  { title: 'Directeur ANBU', division: 'ANBU', icon: Eye, color: 'text-division-anbu' },
  { title: 'Directeur Médical', division: 'Corps Médical', icon: Heart, color: 'text-division-medical' },
  { title: 'Directeur Koan', division: 'Koan', icon: Puzzle, color: 'text-division-puppet' },
  { title: 'Directeur Académie', division: 'Académie', icon: GraduationCap, color: 'text-division-academy' },
  { title: 'Directeur Renseignements', division: 'Renseignements', icon: Search, color: 'text-division-intelligence' },
  { title: 'Directeur Barrière', division: 'Corps Barrière', icon: ShieldCheck, color: 'text-division-barrier' },
]
