import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D4A574', // Sable doré
          light: '#E8D4B8',  // Sable clair
          dark: '#8B5A2B',   // Terre brûlée
        },
        secondary: {
          DEFAULT: '#5C4A3D', // Ombre fraîche
          light: '#C4956A',  // Ocre désertique
          dark: '#2D2419',   // Nuit désert
        },
        accent: {
          DEFAULT: '#C9A227', // Or Kazekage
          light: '#4ECDC4',  // Turquoise œil
          dark: '#8B2323',   // Rouge Gaara
        },
        suna: {
          dawn: '#F5D6BA',      // Ciel aube
          dusk: '#D4785C',      // Crépuscule
          kankuro: '#6B4C7A',   // Violet Kankuro
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
