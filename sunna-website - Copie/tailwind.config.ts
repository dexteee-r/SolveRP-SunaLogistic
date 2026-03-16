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
        sand: {
          50:  '#FDF8F3',
          100: '#F5E6D3',
          200: '#E8D4B8',
          300: '#D4A574',
          400: '#C4956A',
          500: '#A67C52',
          600: '#8B5A2B',
          700: '#6B4423',
          800: '#5C4A3D',
          900: '#2D2419',
        },
        sky: {
          dawn:   '#F5D6BA',
          dusk:   '#D4785C',
          sunset: '#C65D3B',
        },
        accent: {
          red:       '#8B2323',
          turquoise: '#4ECDC4',
          gold:      '#C9A227',
          purple:    '#6B4C7A',
        },
        division: {
          anbu:         '#2D2419',
          medical:      '#5D8A4B',
          puppet:       '#6B4C7A',
          academy:      '#4ECDC4',
          intelligence: '#8B2323',
          barrier:      '#C9A227',
        },
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 3s infinite',
        'sand-drift': 'sandDrift 30s infinite linear',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scroll-hint': 'scrollHint 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sandDrift: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-3%, -3%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scrollHint: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(10px)', opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
export default config
