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
    code: `npm install stablepay-sdk

# or
pnpm add stablepay-sdk
yarn add stablepay-sdk`,
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
    'tectonic-local': { stablecoin: 25 },
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
  onTransactionComplete={(receipt) => {
    // The payment is already settled by the time this fires.
    fulfilOrder(receipt.transactionHash)
  }}
/>`,
  },
]

const points = [
  'Ships as ESM and UMD builds, so it works with Vite, Next.js or a plain script tag.',
  'Wallet connection, chain switching and add-chain prompts are handled for you.',
  'Gas is estimated for each transaction instead of being hard-coded.',
  'The completion callback gives you the receipt, ready to pass to your fulfilment code.',
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
            <Button as="a" href={site.repo} target="_blank" rel="noopener noreferrer">
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
