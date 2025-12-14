import type { Metadata } from 'next'
import { Inter, Caudex } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const caudex = Caudex({
  subsets: ['latin'],
  variable: '--font-caudex',
  display: 'swap',
  weight: ['400', '700'],
})

const siteConfig = {
  name: 'StablePay',
  description:
    'An open-source SDK enabling merchants to accept payments in Djed stablecoins. Secure, stable, and decentralized payment solution.',
  url: 'https://stablepay.io',
  ogImage: '/og-image.png',
  twitterHandle: '@stablepay',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Accept Djed Stablecoin Payments`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'StablePay',
    'Djed',
    'stablecoin',
    'cryptocurrency payments',
    'merchant SDK',
    'decentralized payments',
    'Cardano',
    'blockchain payments',
    'crypto payment gateway',
  ],
  authors: [{ name: 'StablePay Team' }],
  creator: 'StablePay',
  publisher: 'StablePay',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Accept Djed Stablecoin Payments`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Decentralized Payment Solution`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - Accept Djed Stablecoin Payments`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={twMerge(
          inter.variable,
          caudex.variable,
          'font-inter bg-black text-white antialiased'
        )}
      >
        {children}
      </body>
    </html>
  )
}
