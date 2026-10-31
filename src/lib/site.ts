export const site = {
  name: 'StablePay',
  tagline: 'Accept stablecoins without a payment processor.',
  repo: 'https://github.com/DjedAlliance/StablePay',
  landingRepo: 'https://github.com/DjedAlliance/StablePay-LandingPage',
  docs: '/docs',
  quickStart: '/docs/quick-start',
  tutorial: '/docs/integration-guide',
  sdkRepo: 'https://github.com/DjedAlliance/StablePay/tree/main/stablepay-sdk',
  tectonicContracts: 'https://github.com/StabilityNexus/Tectonic-EVM-Contracts',
  tectonicApp: 'https://stabilitynexus.github.io/Tectonic-EVM-WebUI/',
  stabilityNexus: 'https://stability.nexus/',
  djedAlliance: 'https://djed.one/',
  x: 'https://x.com/StabilityNexus',
  termsOfUse: 'https://github.com/StabilityNexus/Info/blob/main/TermsOfUse.md',
  privacyNotice: 'https://github.com/StabilityNexus/Info/blob/main/PrivacyNotice.md',
  youtube: 'https://www.youtube.com/@StabilityNexus',
} as const

export const nav = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'Developers', href: '/#developers' },
  { label: 'Networks', href: '/#networks' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Docs', href: '/docs' },
] as const
