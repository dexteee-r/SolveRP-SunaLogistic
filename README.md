# Sunagakure — Village Caché du Sable

Site web immersif pour le Village de Suna (砂隠れの里), portail officiel d'une communauté RP Naruto.

## Aperçu

Le site présente Sunagakure comme s'il existait réellement : hiérarchie ninja, divisions spécialisées, lois du village et actualités communautaires. Le design fusionne l'esthétique désertique de Suna avec un web design moderne.

## Pages

- **Accueil** — Hero immersif, accès rapides, carousel d'actualités, statistiques
- **Hiérarchie** — Pyramide interactive des rangs (Kazekage → Genin)
- **Sections & Divisions** — 6 divisions (ANBU, Corps Médical, Marionnettistes, Académie, Renseignements, Corps Barrière) avec sous-pages détaillées et popups
- **Lois de Suna** — Code shinobi en style codex avec 5 onglets
- **Actualités** — News filtrables, newsletter, archives

## Stack

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS
- **3D / Transitions** : React Three Fiber + Three.js (transitions de sable WebGL entre les pages)
- **Animations** : Hooks custom (scroll reveal, counter animé, parallax)
- **Typo** : Cinzel (titres) + Inter (corps)
- **Icônes** : Lucide React

## Lancer en local

```bash
cd sunna-website
npm install --legacy-peer-deps
npm run dev
```

Le site tourne sur `http://localhost:3000`.

> Le flag `--legacy-peer-deps` est nécessaire à cause de conflits de peer deps entre R3F v8 et React 18.

## Structure

```
sunna-website/
├── src/
│   ├── app/              # Pages (App Router)
│   ├── components/       # Composants (layout, sections, transitions)
│   ├── data/             # Données partagées (divisions)
│   └── hooks/            # Hooks custom (scroll, parallax)
├── public/images/        # Assets (images village, symbole Suna)
└── tailwind.config.ts    # Config Tailwind avec palette Suna
```

## Direction Artistique

- **Palette** : Tons sable/désert (#FDF8F3 → #2D2419) + accents Kazekage (or, turquoise, rouge Gaara)
- **Ambiance** : Chaleur du désert, force tranquille, mystère ninja
- **Règle** : Silhouettes uniquement (jamais de visages), positions plutôt que noms de personnages
