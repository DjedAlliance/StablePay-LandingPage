import React from 'react'
import Button from '@/components/Button'

export default function AboutPage() {
  return (
    <main className="py-12 md:py-20">
      <div className="container px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-4">About StablePay</h1>
          <p className="text-black/70 dark:text-white/70 mb-6">
            StablePay is an open-source SDK that enables merchants to accept payments denominated in Djed stablecoins.
            It provides a lightweight integration path for web applications and merchants, focusing on security,
            reliability and decentralization.
          </p>

          <h2 className="text-2xl font-medium mt-6 mb-3">Core Use Cases</h2>
          <ul className="list-disc pl-5 space-y-2 text-black/70 dark:text-white/70">
            <li>Quickly integrate stablecoin payments into merchant checkout flows.</li>
            <li>Enable borderless payments with low volatility.</li>
            <li>Provide developers with a consistent SDK for payments and settlements.</li>
          </ul>

          <h2 className="text-2xl font-medium mt-6 mb-3">How It Works (High-level)</h2>
          <p className="text-black/70 dark:text-white/70">
            StablePay provides frontend components and SDK APIs that connect to payment backends and on-chain
            settlement systems. Merchants integrate the SDK, present payment options to their customers, and
            rely on the built-in flows to handle confirmation and settlement in Djed stablecoins.
          </p>

          <div className="mt-8">
            <Button onClick={() => window.open('https://github.com/DjedAlliance/StablePay', '_blank')}>View on GitHub</Button>
          </div>
        </div>
      </div>
    </main>
  )
}
