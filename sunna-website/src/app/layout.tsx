import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Cinzel } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import FooterWrapper from '@/components/layout/FooterWrapper'
import { TransitionProvider } from '@/components/transitions/SandTransition'


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sunagakure | Le Village Caché du Sable',
  description: 'Portail officiel de Sunagakure no Sato — Le Village Caché du Sable. Hiérarchie, divisions, lois et actualités du village.',
  icons: {
    icon: '/favicon/sunagakure_symbole.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <TransitionProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <FooterWrapper />
        </TransitionProvider>
      </body>
    </html>
  )
}
