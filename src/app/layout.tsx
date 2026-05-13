import type { Metadata } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import './globals.css'
import FloatingParticles from '@/components/ui/FloatingParticles'
import LevelUpOverlay from '@/components/ui/LevelUpOverlay'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })

export const metadata: Metadata = {
  title: 'Paladin | Master the History',
  description: 'A premium gamified history learning platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${cinzel.variable} font-sans bg-paladin-charcoal text-white min-h-screen overflow-x-hidden`}>
        <FloatingParticles />
        <LevelUpOverlay />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
