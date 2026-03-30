import type { Metadata } from 'next'
import { Inter, Caudex } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Removed unused Fraunces font to avoid unnecessary load

const caudex = Caudex({
  subsets: ['latin'],
  variable: '--font-caudex',
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'StablePay — Open-source SDK for Djed stablecoins',
  description: 'An open-source SDK enabling merchants to accept payments in Djed stablecoins.',
  keywords: ['StablePay', 'Djed', 'stablecoin', 'payments', 'SDK'],
  authors: [{ name: 'Djed Alliance' }],
  openGraph: {
    title: 'StablePay — Open-source SDK for Djed stablecoins',
    description: 'An open-source SDK enabling merchants to accept payments in Djed stablecoins.',
    url: 'https://github.com/DjedAlliance/StablePay-LandingPage',
    siteName: 'StablePay',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'StablePay — Open-source SDK',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StablePay — Open-source SDK for Djed stablecoins',
    description: 'An open-source SDK enabling merchants to accept payments in Djed stablecoins.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

// Configure theme color and viewport-related settings via export
export const viewport = {
  // Theme color used by some browsers and OS UI when using file-based favicons
  themeColor: '#0ea5a1',
}

/**
 * RootLayout wraps all pages and provides global styles and fonts.
 * It also exports `viewport` and `metadata` used by Next.js.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.variable,
          caudex.variable,
          'font-inter antialiased bg-white text-black dark:bg-black dark:text-white'
        )}
      >
        {children}
      </body>
    </html>
  )
}
