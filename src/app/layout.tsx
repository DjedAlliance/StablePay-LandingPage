import type { Metadata } from 'next'
import { Inter, Fraunces, Caudex } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const caudex = Caudex({
  subsets: ['latin'],
  variable: '--font-caudex',
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'StablePay Landing Page',
  description: 'A landing page for StablePay',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${fraunces.variable} ${caudex.variable} font-inter bg-black text-white antialiased`}
      >
        {/* Root scroll container */}
        <main className="relative min-h-screen overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}
