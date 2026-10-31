import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://djedalliance.github.io/StablePay-LandingPage/'),
  title: {
    default: 'StablePay: accept stablecoins without a payment processor',
    template: '%s · StablePay',
  },
  description:
    'StablePay is an open-source checkout widget that settles payments directly against Tectonic stablecoin contracts. There is no backend and no custody: your customer signs one transaction and you are paid.',
  keywords: [
    'stablecoin payments',
    'crypto checkout',
    'Tectonic protocol',
    'decentralized payments',
    'merchant SDK',
    'Stability Nexus',
    'Djed Alliance',
  ],
  openGraph: {
    type: 'website',
    title: 'StablePay: accept stablecoins without a payment processor',
    description:
      'An open-source checkout widget that settles payments directly against Tectonic contracts, with no backend and no custody.',
    siteName: 'StablePay',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StablePay: accept stablecoins without a payment processor',
    description:
      'An open-source checkout widget that settles payments directly against Tectonic contracts.',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.variable,
          mono.variable,
          'bg-white font-sans text-ink-700 antialiased selection:bg-brand-100'
        )}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
