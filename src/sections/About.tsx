import React from 'react'

/**
 * About section — brief overview of StablePay for onboarding users and contributors.
 */
export const About = () => {
  return (
    <section id="about" className="py-12 md:py-20">
      <div className="container px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-900/60 border border-black/5 dark:border-white/5 rounded-2xl p-6 sm:p-10 shadow-md backdrop-blur-md">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-black dark:text-white">About StablePay</h2>
              <p className="text-base sm:text-lg text-black/70 dark:text-white/75 max-w-2xl mx-auto">
                StablePay is an open, developer-friendly payments solution focused on reliable, predictable value transfer. It helps applications accept and manage stable-value payments with minimal integration work and clear developer tooling.
              </p>
            </div>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-medium text-black dark:text-white">Core Use Cases</h3>
                <ul className="list-inside space-y-2 text-black/70 dark:text-white/75">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 h-3 w-3 rounded-full bg-black/80 dark:bg-white" />
                    <span>Accept stable-value token payments in web and mobile apps</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 h-3 w-3 rounded-full bg-black/80 dark:bg-white" />
                    <span>Automate recurring and subscription-style flows</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 h-3 w-3 rounded-full bg-black/80 dark:bg-white" />
                    <span>Provide transparent payment rails for marketplaces and services</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-medium text-black dark:text-white">How It Works (High level)</h3>
                <ul className="list-inside space-y-2 text-black/70 dark:text-white/75">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 h-3 w-3 rounded-full bg-black/80 dark:bg-white" />
                    <span>Integrate via a small SDK or HTTP endpoints for payment creation and verification.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 h-3 w-3 rounded-full bg-black/80 dark:bg-white" />
                    <span>Payments are denominated in stable assets and settled via on-chain or off-chain relayers depending on configuration.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 h-3 w-3 rounded-full bg-black/80 dark:bg-white" />
                    <span>Developers receive webhooks and tooling to reconcile and monitor payment state.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-black/60 dark:text-white/60 mb-4">For contributors: read the repository README and developer docs for architecture, API reference, and local development instructions.</p>
              <a href="https://github.com/DjedAlliance/StablePay" target="_blank" rel="noreferrer" className="inline-block bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-95 transition">View repository</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
