import { AlertCircle, Anchor, Infinity as InfinityIcon, Waves } from 'lucide-react'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { site } from '@/lib/site'

const properties = [
  {
    icon: Anchor,
    title: 'Depegs are fixed immediately',
    body: 'If the price ever slips below the peg, redemptions correct it immediately instead of letting the gap linger, so your customer\'s payment keeps its value.',
    tone: 'bg-brand-50 text-brand-600',
  },
  {
    icon: InfinityIcon,
    title: 'Payments are never refused',
    body: 'Earlier designs block minting when the reserve ratio dips. Tectonic has no minimum ratio: it restores health through triggered redemptions rather than turning your customer away mid-checkout.',
    tone: 'bg-gold-50 text-gold-700',
  },
  {
    icon: Waves,
    title: 'Pressure is a fee, not a freeze',
    body: 'When reserves run tight, holders accrue a small daily stability fee that shrinks supply and pulls the ratio back up. The protocol keeps settling payments the whole time.',
    tone: 'bg-ember-50 text-ember-500',
  },
]

export const Tectonic = () => (
  <section id="tectonic" className="scroll-mt-24 border-y border-line bg-surface-subtle py-20 md:py-28">
    <div className="container">
      <SectionHeading
        eyebrow="The protocol underneath"
        title="Built on Tectonic, the stablecoin designed not to depeg."
        description="StablePay settles against Tectonic, developed by Stability Nexus. Three of its design choices let a merchant treat an incoming payment as final."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {properties.map((property, i) => (
          <Reveal key={property.title} delay={i * 0.08}>
            <div className="card-lift h-full bg-white p-6">
              <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${property.tone}`}>
                <property.icon className="h-[22px] w-[22px]" />
              </span>
              <h3 className="mt-5 text-[1.0625rem] font-semibold">{property.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{property.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-gold-200 bg-gold-50/60 p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex gap-3.5">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
            <div>
              <p className="text-[0.9375rem] font-semibold text-ink-900">
                Tectonic is live on the Sepolia testnet
              </p>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-500">
                StablePay settles every payment against the public Tectonic deployment on Ethereum
                Sepolia, so you can integrate and pilot it today with free testnet ETH. The contracts
                are still pre-audit, and mainnet networks will follow.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2 md:flex-col lg:flex-row">
            <a
              href={site.tectonicContracts}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full border border-gold-300 bg-white px-4 text-sm font-medium text-ink-900 transition hover:border-gold-500"
            >
              Track progress
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
)

export default Tectonic
