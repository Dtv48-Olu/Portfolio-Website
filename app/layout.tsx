import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Developer Portfolio | Olu Odufowokan',
  description: 'A modern developer portfolio showcasing shipped projects, current work, and future plans.',
  keywords: ['developer', 'portfolio', 'software engineer', 'full stack', 'game development'],
  authors: [{ name: 'Olu Odufowokan' }],
  openGraph: {
    title: 'Developer Portfolio',
    description: 'Explore my shipped projects, current work, and future plans.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {children}
        </div>
      </body>
    </html>
  )
}
