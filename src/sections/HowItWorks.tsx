import { ArrowRight, BadgeCheck, Code2, Wallet } from 'lucide-react'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'

const steps = [
  {
    icon: Code2,
    title: 'Embed the widget',
    body: 'Install the SDK and give it your receiving address and your price. It is a React component rather than a hosted redirect, so checkout stays on your site.',
    accent: 'text-brand-600 bg-brand-50',
  },
  {
    icon: Wallet,
    title: 'Your customer signs once',
    body: 'They pick a network and a token and connect their wallet. If they pay in the native coin, StablePay converts your price at the Tectonic oracle rate and refreshes it just before signing.',
    accent: 'text-gold-700 bg-gold-50',
  },
  {
    icon: BadgeCheck,
    title: 'You are paid on-chain',
    body: 'The transaction is the settlement. Nothing clears later and nothing sits in escrow: the stablecoins are in your wallet by the time the receipt comes back.',
    accent: 'text-ember-500 bg-ember-50',
  },
]

const Node = ({
  title,
  sub,
  tone,
}: {
  title: string
  sub: string
  tone: 'neutral' | 'brand' | 'gold'
}) => {
  const tones = {
    neutral: 'border-line bg-white',
    brand: 'border-brand-200 bg-brand-50',
    gold: 'border-gold-200 bg-gold-50',
  } as const
  return (
    <div className={`w-full rounded-2xl border px-4 py-3.5 text-center shadow-xs lg:w-auto lg:min-w-[8rem] ${tones[tone]}`}>
      <p className="text-sm font-semibold text-ink-900">{title}</p>
      <p className="mt-0.5 text-xs text-ink-400">{sub}</p>
    </div>
  )
}

const Connector = ({ label }: { label: string }) => (
  <div className="flex shrink-0 flex-col items-center gap-1 py-1 lg:flex-1 lg:py-0">
    <span className="whitespace-nowrap rounded-full bg-white px-2 py-0.5 font-mono text-[0.6875rem] text-ink-400 ring-1 ring-line">
      {label}
    </span>
    <div className="flex w-full items-center justify-center">
      <span className="hidden h-px flex-1 bg-line lg:block" />
      <ArrowRight className="h-4 w-4 rotate-90 text-ink-300 lg:rotate-0" />
    </div>
  </div>
)

const Flow = ({
  label,
  note,
  children,
}: {
  label: string
  note: string
  children: React.ReactNode
}) => (
  <div className="rounded-2xl border border-line bg-surface-subtle p-5 md:p-6">
    <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h4 className="text-[0.9375rem] font-semibold text-ink-900">{label}</h4>
      <p className="text-xs text-ink-400">{note}</p>
    </div>
    <div className="flex flex-col items-center lg:flex-row">{children}</div>
  </div>
)

export const HowItWorks = () => (
  <section id="how-it-works" className="scroll-mt-24 py-20 md:py-28">
    <div className="container">
      <SectionHeading
        eyebrow="How it works"
        title="Three steps, with no server for you to run."
        description="The widget talks to smart contracts from the browser. There is no StablePay backend to sign up for, go down, or hold your money."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.08}>
            <div className="card-lift h-full p-6">
              <div className="flex items-center gap-3">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${step.accent}`}>
                  <step.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs font-medium text-ink-300">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="card mt-6 p-6 md:p-8">
          <h3 className="text-lg font-semibold">Both ways to pay settle in a single transaction</h3>
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-500">
            If your customer already holds the stablecoin, it transfers straight to you. If they only
            hold the chain&rsquo;s native coin, Tectonic mints stablecoins to your address inside the
            same transaction, so they never have to swap first.
          </p>

          <div className="mt-6 grid gap-4">
            <Flow label="Customer holds stablecoins" note="ERC-20 transfer">
              <Node title="Customer wallet" sub="holds SC" tone="neutral" />
              <Connector label="transfer(you, 25 SC)" />
              <Node title="Your wallet" sub="+25.00 SC" tone="gold" />
            </Flow>

            <Flow label="Customer holds only the native coin" note="mint on payment">
              <Node title="Customer wallet" sub="holds ETH" tone="neutral" />
              <Connector label="mint(you)" />
              <Node title="Tectonic" sub="reserve + oracle" tone="brand" />
              <Connector label="mints SC" />
              <Node title="Your wallet" sub="+25.00 SC" tone="gold" />
            </Flow>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
)

export default HowItWorks
