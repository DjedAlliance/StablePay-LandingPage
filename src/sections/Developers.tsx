import Link from 'next/link'
import { Check } from 'lucide-react'
import Button from '@/components/Button'
import CodeCard, { type Snippet } from '@/components/CodeCard'
import Reveal from '@/components/Reveal'
import { site } from '@/lib/site'

const snippets: Snippet[] = [
  {
    id: 'install',
    label: 'Install',
    file: 'terminal',
    lang: 'bash',
    code: `git clone https://github.com/DjedAlliance/StablePay.git

# from your app, next to the clone
npm install --install-links \\
  ../StablePay/tectonic-sdk ../StablePay/stablepay-sdk`,
  },
  {
    id: 'configure',
    label: 'Configure',
    file: 'checkout.jsx',
    lang: 'jsx',
    code: `import StablePay from 'stablepay-sdk'

// Your address and your price. Nothing is registered anywhere.
const config = new StablePay.Config({
  receivingAddress: '0xYourMerchantAddress',
  amounts: {
    sepolia: { stablecoin: 25 },
  },
})

const networkSelector = new StablePay.NetworkSelector(config)`,
  },
  {
    id: 'render',
    label: 'Render',
    file: 'checkout.jsx',
    lang: 'jsx',
    code: `<StablePay.Widget
  networkSelector={networkSelector}
  onTransactionComplete={(payment) => {
    // Hand the hash to your server, which confirms it on-chain.
    confirmOrder(orderId, payment.txHash)
  }}
/>`,
  },
]

const points = [
  'Ships as ESM and UMD builds for Vite or Next.js, and can be bundled into a drop-in script for any website.',
  'Wallet connection, chain switching and add-chain prompts are handled for you.',
  'Gas is estimated for each transaction instead of being hard-coded.',
  'The completion callback hands you the transaction hash, ready for your server to verify on-chain.',
]

export const Developers = () => (
  <section id="developers" className="scroll-mt-24 py-20 md:py-28">
    <div className="container">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">For developers</p>
          <h2 className="text-display-md">Integrate in an afternoon, not a quarter.</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-500">
            No merchant application, no API keys, no webhook endpoint to stand up and secure. You
            install a package, pass it an address and a price, and render a component.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-500">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-50">
                  <Check className="h-3 w-3 text-forest-500" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button as={Link} href={site.docs}>
              Read the docs
            </Button>
            <Button as="a" href={site.sdkRepo} target="_blank" rel="noopener noreferrer" variant="secondary">
              Browse the SDK
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <CodeCard snippets={snippets} />
        </Reveal>
      </div>
    </div>
  </section>
)

export default Developers
